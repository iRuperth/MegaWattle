// Inicialización del mapa de España
const SPAIN_CENTER = [40.0, -3.7];
const SPAIN_ZOOM = 6;

const map = L.map("map").setView(SPAIN_CENTER, SPAIN_ZOOM);
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap",
  maxZoom: 18,
}).addTo(map);

const ICON_CPD = L.divIcon({
  className: "cpd-icon",
  html: '<div style="background:#2563eb;width:18px;height:18px;border-radius:50%;border:2px solid white;box-shadow:0 1px 4px rgba(0,0,0,0.3);"></div>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

const ICON_GRANJA = L.divIcon({
  className: "granja-icon",
  html: '<div style="background:#10b981;width:14px;height:14px;border-radius:50%;border:2px solid white;box-shadow:0 1px 3px rgba(0,0,0,0.3);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

const cpdLayer = L.layerGroup().addTo(map);
const granjaLayer = L.layerGroup().addTo(map);
const matchLayer = L.layerGroup().addTo(map);

const state = {
  cpds: [],
  granjas: [],
  selectedCpdIds: new Set(),
  lastMatch: null,
};

async function loadCpds() {
  const res = await fetch("/api/cpds");
  state.cpds = await res.json();
  renderCpdMarkers();
  populateCcaaSelect();
  renderCpdList();
}

function renderCpdMarkers() {
  cpdLayer.clearLayers();
  state.cpds.forEach((c) => {
    const m = L.marker([c.lat, c.lon], { icon: ICON_CPD })
      .bindPopup(
        `<strong>${c.nombre}</strong><br/>` +
          `${c.operador} · ${c.ciudad || ""}<br/>` +
          `Consumo: ${c.consumo_anual_gwh} GWh/año<br/>` +
          `<button class="cpd-popup-select text-blue-600 underline" data-id="${c.id}">Seleccionar</button>`
      )
      .addTo(cpdLayer);
    m.on("popupopen", () => {
      setTimeout(() => {
        const btn = document.querySelector(".cpd-popup-select");
        if (btn) btn.onclick = () => toggleCpdSelection(btn.dataset.id);
      }, 50);
    });
  });
}

function clearMatchVisuals() {
  matchLayer.clearLayers();
  granjaLayer.clearLayers();
}

function drawMatchVisuals(matchData) {
  clearMatchVisuals();
  if (!matchData || !matchData.por_cpd) return;
  matchData.por_cpd.forEach((entry) => {
    const cpd = state.cpds.find((c) => c.id === entry.cpd_id);
    if (!cpd) return;
    L.circle([cpd.lat, cpd.lon], {
      radius: matchData.radio_km * 1000,
      color: "#2563eb",
      fillColor: "#2563eb",
      fillOpacity: 0.05,
      weight: 1,
    }).addTo(matchLayer);
    entry.granjas.forEach((g) => {
      L.marker([g.lat, g.lon], { icon: ICON_GRANJA })
        .bindPopup(
          `<strong>${g.nombre}</strong><br/>` +
            `${g.tipo_animal} · ${g.cabezas_agregadas.toLocaleString()} cabezas<br/>` +
            `Aporta: ${Math.round(g.mwh_aportados).toLocaleString()} MWh/año<br/>` +
            `Distancia: ${g.distancia_km.toFixed(1)} km`
        )
        .addTo(granjaLayer);
      L.polyline(
        [
          [g.lat, g.lon],
          [cpd.lat, cpd.lon],
        ],
        { color: "#10b981", weight: 1.5, opacity: 0.7, dashArray: "4 4" }
      ).addTo(matchLayer);
    });
  });
}

loadCpds();
