import { useMemo } from "react";
import L from "leaflet";
import {
  Circle,
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
} from "react-leaflet";
import { useStore } from "../lib/store";

const SPAIN_CENTER: [number, number] = [40.0, -3.7];

function makeIcon(className: string) {
  return L.divIcon({
    className: "",
    html: `<div class="${className}"></div>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
  });
}

const ICON_CPD = makeIcon("cpd-marker");
const ICON_CPD_SELECTED = makeIcon("cpd-marker selected");
const ICON_GRANJA = makeIcon("granja-marker");

function fmt(n: number, d = 0) {
  return n.toLocaleString("es-ES", { minimumFractionDigits: d, maximumFractionDigits: d });
}

export function MapView() {
  const { cpds, ccaa, provincia, selectedCpdIds, match, toggleCpd, radioKm } = useStore();

  const visibleCpds = useMemo(
    () =>
      cpds.filter(
        (c) => (!ccaa || c.ccaa === ccaa) && (!provincia || c.provincia === provincia)
      ),
    [cpds, ccaa, provincia]
  );

  const granjasInMatch = useMemo(() => {
    if (!match) return [];
    return match.por_cpd.flatMap((p) =>
      p.granjas.map((g) => ({ ...g, cpd_id: p.cpd_id }))
    );
  }, [match]);

  const lines = useMemo(() => {
    if (!match) return [];
    return match.por_cpd.flatMap((p) => {
      const cpd = cpds.find((c) => c.id === p.cpd_id);
      if (!cpd) return [];
      return p.granjas.map((g) => ({
        from: [g.lat, g.lon] as [number, number],
        to: [cpd.lat, cpd.lon] as [number, number],
        id: `${cpd.id}-${g.id}`,
      }));
    });
  }, [match, cpds]);

  const radiusCircles = useMemo(() => {
    if (!match) return [];
    return match.por_cpd
      .map((p) => cpds.find((c) => c.id === p.cpd_id))
      .filter(Boolean) as typeof cpds;
  }, [match, cpds]);

  return (
    <MapContainer
      center={SPAIN_CENTER}
      zoom={6}
      className="h-full w-full"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; CARTO'
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
      />

      {radiusCircles.map((c) => (
        <Circle
          key={`r-${c.id}`}
          center={[c.lat, c.lon]}
          radius={radioKm * 1000}
          pathOptions={{
            color: "#0ea5e9",
            fillColor: "#0ea5e9",
            fillOpacity: 0.05,
            weight: 1,
            dashArray: "4 6",
          }}
        />
      ))}

      {lines.map((l) => (
        <Polyline
          key={l.id}
          positions={[l.from, l.to]}
          pathOptions={{
            color: "#10b981",
            weight: 1.5,
            opacity: 0.7,
            dashArray: "4 4",
          }}
        />
      ))}

      {visibleCpds.map((c) => (
        <Marker
          key={c.id}
          position={[c.lat, c.lon]}
          icon={selectedCpdIds.has(c.id) ? ICON_CPD_SELECTED : ICON_CPD}
          eventHandlers={{ click: () => toggleCpd(c.id) }}
        >
          <Popup>
            <div className="text-sm">
              <div className="font-bold">{c.nombre}</div>
              <div className="text-xs text-slate-600">{c.operador} · {c.ciudad}</div>
              <div className="mt-1 text-xs">
                Consumo: <strong>{fmt(c.consumo_anual_gwh, 1)} GWh/año</strong>
              </div>
              <button
                onClick={() => toggleCpd(c.id)}
                className="mt-2 text-xs text-sky-600 underline"
              >
                {selectedCpdIds.has(c.id) ? "Deseleccionar" : "Seleccionar"}
              </button>
            </div>
          </Popup>
        </Marker>
      ))}

      {granjasInMatch.map((g) => (
        <Marker key={g.id} position={[g.lat, g.lon]} icon={ICON_GRANJA}>
          <Popup>
            <div className="text-sm">
              <div className="font-bold">{g.nombre}</div>
              <div className="text-xs text-slate-600 capitalize">
                {g.tipo_animal} · {fmt(g.cabezas_agregadas)} cabezas
              </div>
              <div className="mt-1 text-xs">
                Aporta: <strong>{fmt(g.mwh_aportados)} MWh/año</strong>
              </div>
              <div className="text-xs">
                Distancia: {fmt(g.distancia_km, 1)} km
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
