const aiPanel = document.getElementById("ai-panel");
const btnAi = document.getElementById("btn-ai");

let chartInstances = [];

function destroyCharts() {
  chartInstances.forEach((c) => c.destroy());
  chartInstances = [];
}

function renderAiAnalysis(data) {
  destroyCharts();
  aiPanel.classList.remove("hidden");
  const modeBadge =
    data._modo === "cache"
      ? '<span class="bg-emerald-100 text-emerald-700 text-xs px-2 py-0.5 rounded">cache preset</span>'
      : data._modo === "fallback"
      ? '<span class="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded">offline</span>'
      : '<span class="bg-sky-100 text-sky-700 text-xs px-2 py-0.5 rounded">IA en vivo</span>';
  aiPanel.innerHTML = `
    <div class="flex items-baseline justify-between mb-3">
      <h3 class="text-lg font-bold">Análisis generado por IA</h3>
      ${modeBadge}
    </div>
    <div class="ai-section">
      <p class="italic text-slate-700">${data.resumen_ejecutivo || ""}</p>
    </div>
    <div class="ai-section">
      <h4>Viabilidad técnica · ${(data.viabilidad_tecnica || {}).valoracion || "—"}</h4>
      <p class="text-sm">${(data.viabilidad_tecnica || {}).explicacion || ""}</p>
      <ul class="list-disc ml-6 text-sm mt-2">
        ${((data.viabilidad_tecnica || {}).puntos_clave || []).map((p) => `<li>${p}</li>`).join("")}
      </ul>
    </div>
    <div class="ai-section">
      <h4>Impacto ambiental</h4>
      <p class="text-sm mb-2">${(data.impacto_ambiental || {}).narrativa || ""}</p>
      <p class="text-sm font-semibold text-emerald-700">${(data.impacto_ambiental || {}).comparacion_visual || ""}</p>
      <div class="mt-3" style="max-width: 480px;"><canvas id="chart-amb"></canvas></div>
    </div>
    <div class="ai-section">
      <h4>Viabilidad económica</h4>
      <p class="text-sm mb-2">${(data.viabilidad_economica || {}).narrativa || ""}</p>
      <div class="mt-3" style="max-width: 360px;"><canvas id="chart-eco"></canvas></div>
    </div>
    <div class="ai-section">
      <h4>Recomendaciones</h4>
      <ul class="list-disc ml-6 text-sm">
        ${(data.recomendaciones || []).map((r) => `<li>${r}</li>`).join("")}
      </ul>
    </div>
    <div class="ai-section">
      <h4>Riesgos</h4>
      <ul class="list-disc ml-6 text-sm">
        ${(data.riesgos || []).map((r) => `<li>${r}</li>`).join("")}
      </ul>
    </div>
    <div class="text-xs text-slate-500 mt-3">
      Fuentes citadas: ${(data.fuentes_citadas || []).join(" · ")}
    </div>
  `;
  try {
    const ambSpec = (data.impacto_ambiental || {}).chart;
    if (ambSpec) {
      chartInstances.push(
        new Chart(document.getElementById("chart-amb"), ambSpec)
      );
    }
    const ecoSpec = (data.viabilidad_economica || {}).chart;
    if (ecoSpec) {
      chartInstances.push(
        new Chart(document.getElementById("chart-eco"), ecoSpec)
      );
    }
  } catch (err) {
    console.warn("Error renderizando charts", err);
  }
}

btnAi.addEventListener("click", async () => {
  if (!state.lastMatch) return;
  const ccaa = document.getElementById("filter-ccaa").value || null;
  const tipo = document.getElementById("filter-animal").value || null;
  btnAi.disabled = true;
  btnAi.textContent = "Analizando con IA…";
  try {
    const res = await fetch("/api/ai/analizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        parametros: {
          ccaa,
          tipo_animal: tipo,
          radio_km: parseFloat(document.getElementById("filter-radio").value),
          cpd_ids: [...state.selectedCpdIds],
        },
        resultados: state.lastMatch,
      }),
    });
    const data = await res.json();
    renderAiAnalysis(data);
  } catch (err) {
    aiPanel.classList.remove("hidden");
    aiPanel.innerHTML = `<p class="text-red-600">Error generando análisis: ${err.message}</p>`;
  } finally {
    btnAi.disabled = false;
    btnAi.textContent = "Generar análisis con IA";
  }
});
