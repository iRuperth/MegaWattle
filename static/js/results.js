function fmt(n, decimals = 0) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return Number(n).toLocaleString("es-ES", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

function renderResults(data) {
  const panel = document.getElementById("results-panel");
  panel.classList.remove("hidden");
  const summary = document.getElementById("results-summary");
  const tables = document.getElementById("results-tables");
  document.getElementById("ai-panel").classList.add("hidden");

  const blocks = data.por_cpd.map((entry) => {
    const cpd = state.cpds.find((c) => c.id === entry.cpd_id) || {};
    return `
      <div class="border rounded-lg p-3">
        <div class="flex items-baseline justify-between mb-2">
          <h3 class="font-bold text-base">${cpd.nombre || entry.cpd_id}</h3>
          <span class="text-xs text-slate-500">Consumo: ${fmt(cpd.consumo_anual_gwh, 1)} GWh/año</span>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-5 gap-2">
          <div class="kpi-card">
            <div class="kpi-value">${fmt(entry.metricas.porcentaje_cubierto, 1)}%</div>
            <div class="kpi-label">Demanda cubierta</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${fmt(entry.metricas.energia_mwh_anio)}</div>
            <div class="kpi-label">MWh/año</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${fmt(entry.metricas.co2eq_evitado_t)}</div>
            <div class="kpi-label">t CO₂eq/año</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${entry.granjas.length}</div>
            <div class="kpi-label">Granjas</div>
          </div>
          <div class="kpi-card">
            <div class="kpi-value">${fmt(entry.metricas.payback_anios, 1)}</div>
            <div class="kpi-label">Payback (años)</div>
          </div>
        </div>
      </div>
    `;
  });
  summary.innerHTML = blocks.join("");

  const tablesHtml = data.por_cpd
    .map((entry) => {
      const cpd = state.cpds.find((c) => c.id === entry.cpd_id) || {};
      const rows = entry.granjas
        .slice(0, 12)
        .map(
          (g) =>
            `<tr>
              <td>${g.nombre}</td>
              <td>${g.tipo_animal}</td>
              <td>${fmt(g.distancia_km, 1)}</td>
              <td>${fmt(g.cabezas_agregadas)}</td>
              <td>${fmt(g.mwh_aportados)}</td>
              <td>${fmt(g.porcentaje_cpd, 2)}%</td>
            </tr>`
        )
        .join("");
      return `
        <div class="mt-4">
          <h4 class="text-sm font-semibold mb-1">Granjas que alimentan a ${cpd.nombre || entry.cpd_id}</h4>
          <div class="overflow-x-auto">
            <table class="contrib">
              <thead><tr><th>Municipio</th><th>Animal</th><th>km</th><th>Cabezas</th><th>MWh/año</th><th>% CPD</th></tr></thead>
              <tbody>${rows || '<tr><td colspan="6" class="italic text-slate-400">Sin granjas en el radio</td></tr>'}</tbody>
            </table>
          </div>
        </div>
      `;
    })
    .join("");
  tables.innerHTML = tablesHtml;
}
