function populateCcaaSelect() {
  const sel = document.getElementById("filter-ccaa");
  const ccaas = [...new Set(state.cpds.map((c) => c.ccaa))].sort();
  ccaas.forEach((c) => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    sel.appendChild(opt);
  });
}

function populateProvinciaSelect(ccaa) {
  const sel = document.getElementById("filter-provincia");
  sel.innerHTML = '<option value="">— Todas —</option>';
  const provs = [
    ...new Set(
      state.cpds.filter((c) => !ccaa || c.ccaa === ccaa).map((c) => c.provincia)
    ),
  ]
    .filter(Boolean)
    .sort();
  provs.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p;
    opt.textContent = p;
    sel.appendChild(opt);
  });
}

function renderCpdList() {
  const ccaa = document.getElementById("filter-ccaa").value;
  const prov = document.getElementById("filter-provincia").value;
  const list = document.getElementById("cpd-list");
  const filtered = state.cpds.filter((c) => {
    if (ccaa && c.ccaa !== ccaa) return false;
    if (prov && c.provincia !== prov) return false;
    return true;
  });
  list.innerHTML = "";
  if (filtered.length === 0) {
    list.innerHTML = '<p class="text-slate-400 italic text-xs">Sin resultados</p>';
    return;
  }
  filtered.forEach((c) => {
    const div = document.createElement("div");
    div.className =
      "cpd-item " + (state.selectedCpdIds.has(c.id) ? "selected" : "");
    div.innerHTML = `
      <div class="font-medium">${c.nombre}</div>
      <div class="text-xs text-slate-500">${c.operador} · ${c.consumo_anual_gwh.toLocaleString()} GWh/año</div>
    `;
    div.onclick = () => toggleCpdSelection(c.id);
    list.appendChild(div);
  });
}

function toggleCpdSelection(id) {
  if (state.selectedCpdIds.has(id)) {
    state.selectedCpdIds.delete(id);
  } else {
    if (state.selectedCpdIds.size >= 2) {
      const first = state.selectedCpdIds.values().next().value;
      state.selectedCpdIds.delete(first);
    }
    state.selectedCpdIds.add(id);
  }
  renderCpdList();
}

document.getElementById("filter-ccaa").addEventListener("change", (e) => {
  populateProvinciaSelect(e.target.value);
  renderCpdList();
});
document
  .getElementById("filter-provincia")
  .addEventListener("change", renderCpdList);

const radioInput = document.getElementById("filter-radio");
const radioValue = document.getElementById("radio-value");
radioInput.addEventListener("input", () => {
  radioValue.textContent = radioInput.value;
});

document.getElementById("btn-match").addEventListener("click", async () => {
  if (state.selectedCpdIds.size === 0) {
    alert("Selecciona al menos un CPD");
    return;
  }
  const body = {
    cpd_ids: [...state.selectedCpdIds],
    radio_km: parseFloat(radioInput.value),
    tipo_animal: document.getElementById("filter-animal").value || null,
  };
  const res = await fetch("/api/match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  state.lastMatch = data;
  drawMatchVisuals(data);
  renderResults(data);
});

document.querySelectorAll(".preset-btn").forEach((btn) => {
  btn.addEventListener("click", () => loadPreset(btn.dataset.preset));
});

const PRESETS = {
  aragon: { ccaa: "Aragón", radio_km: 50, tipo_animal: null },
  madrid: { ccaa: "Madrid", radio_km: 80, tipo_animal: null },
  cataluna: { ccaa: "Cataluña", radio_km: 50, tipo_animal: null },
  "castilla-leon": { ccaa: "Castilla y León", radio_km: 60, tipo_animal: null },
};

async function loadPreset(name) {
  const p = PRESETS[name];
  if (!p) return;
  document.getElementById("filter-ccaa").value = p.ccaa;
  populateProvinciaSelect(p.ccaa);
  document.getElementById("filter-animal").value = p.tipo_animal || "";
  radioInput.value = p.radio_km;
  radioValue.textContent = p.radio_km;
  // selecciona automáticamente todos los CPDs de la CCAA del preset
  state.selectedCpdIds = new Set(
    state.cpds.filter((c) => c.ccaa === p.ccaa).map((c) => c.id)
  );
  renderCpdList();
  document.getElementById("btn-match").click();
}
