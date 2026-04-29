import { useEffect, useState } from "react";
import { Activity, Cloud, Leaf, Sparkles, Wheat } from "lucide-react";
import { useStore } from "../lib/store";

function fmt(n: number | null | undefined, d = 0) {
  if (n === null || n === undefined || isNaN(n)) return "—";
  return Number(n).toLocaleString("es-ES", {
    minimumFractionDigits: d,
    maximumFractionDigits: d,
  });
}

const KPI_CARDS = [
  { key: "porcentaje_cubierto", label: "% demanda", icon: Activity, color: "sky", suffix: "%", decimals: 1 },
  { key: "energia_mwh_anio", label: "MWh/año", icon: Cloud, color: "emerald", decimals: 0 },
  { key: "co2eq_evitado_t", label: "t CO₂eq/año", icon: Leaf, color: "green", decimals: 0 },
  { key: "n_granjas", label: "Granjas", icon: Wheat, color: "amber", decimals: 0 },
] as const;

const COLOR_MAP: Record<string, string> = {
  sky: "from-sky-50 to-sky-100 border-sky-200 text-sky-700",
  emerald: "from-emerald-50 to-emerald-100 border-emerald-200 text-emerald-700",
  green: "from-green-50 to-green-100 border-green-200 text-green-700",
  amber: "from-amber-50 to-amber-100 border-amber-200 text-amber-700",
  violet: "from-violet-50 to-violet-100 border-violet-200 text-violet-700",
};

export function ResultsPanel() {
  const { match, cpds, runAi, aiLoading } = useStore();
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!aiLoading) {
      setElapsed(0);
      return;
    }
    const start = Date.now();
    const id = setInterval(() => setElapsed(Math.floor((Date.now() - start) / 1000)), 250);
    return () => clearInterval(id);
  }, [aiLoading]);

  if (!match) return null;

  return (
    <div className="px-4 py-4 animate-slide-up">
      <div className="space-y-4">
        {match.por_cpd.map((entry) => {
          const cpd = cpds.find((c) => c.id === entry.cpd_id);
          return (
            <div
              key={entry.cpd_id}
              className="bg-gradient-to-br from-slate-50 to-white border border-slate-200 rounded-xl p-4"
            >
              <div className="flex items-baseline justify-between mb-3">
                <h3 className="font-bold text-base text-slate-900">{cpd?.nombre || entry.cpd_id}</h3>
                <span className="text-xs text-slate-500">
                  Consumo: <span className="font-semibold text-slate-700">{fmt(cpd?.consumo_anual_gwh, 1)} GWh/año</span>
                </span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-3">
                {KPI_CARDS.map((card) => {
                  const v = (entry.metricas as any)[card.key];
                  const Icon = card.icon;
                  return (
                    <div
                      key={card.key}
                      className={`bg-gradient-to-br ${COLOR_MAP[card.color]} border rounded-lg p-3`}
                    >
                      <div className="flex items-center gap-1.5 mb-1">
                        <Icon className="w-3.5 h-3.5 opacity-70" />
                        <span className="text-[10px] uppercase tracking-wide font-semibold opacity-70">
                          {card.label}
                        </span>
                      </div>
                      <div className="text-xl font-bold text-slate-900">
                        {fmt(v, card.decimals)}
                        {(card as any).suffix || ""}
                      </div>
                    </div>
                  );
                })}
              </div>

              {entry.granjas.length > 0 ? (
                <details className="text-sm">
                  <summary className="cursor-pointer font-medium text-slate-700 hover:text-slate-900 select-none">
                    Granjas que alimentan ({entry.granjas.length})
                  </summary>
                  <div className="mt-2 overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-50 text-slate-600 uppercase tracking-wide">
                          <th className="px-2 py-1.5 text-left font-semibold">Municipio</th>
                          <th className="px-2 py-1.5 text-left font-semibold">Animal</th>
                          <th className="px-2 py-1.5 text-right font-semibold">km</th>
                          <th className="px-2 py-1.5 text-right font-semibold">Cabezas</th>
                          <th className="px-2 py-1.5 text-right font-semibold">MWh/año</th>
                          <th className="px-2 py-1.5 text-right font-semibold">% CPD</th>
                        </tr>
                      </thead>
                      <tbody>
                        {entry.granjas.slice(0, 12).map((g) => (
                          <tr key={g.id} className="border-t border-slate-100">
                            <td className="px-2 py-1.5 font-medium">{g.municipio}</td>
                            <td className="px-2 py-1.5 capitalize">{g.tipo_animal}</td>
                            <td className="px-2 py-1.5 text-right">{fmt(g.distancia_km, 1)}</td>
                            <td className="px-2 py-1.5 text-right">{fmt(g.cabezas_agregadas)}</td>
                            <td className="px-2 py-1.5 text-right font-medium">{fmt(g.mwh_aportados)}</td>
                            <td className="px-2 py-1.5 text-right">{fmt(g.porcentaje_cpd, 2)}%</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </details>
              ) : (
                <p className="text-xs text-slate-400 italic">Sin granjas en el radio seleccionado.</p>
              )}
            </div>
          );
        })}

        <div className="relative">
          <button
            onClick={() => runAi()}
            disabled={aiLoading}
            className="relative w-full bg-gradient-to-r from-sky-600 to-violet-600 hover:from-sky-700 hover:to-violet-700 disabled:opacity-90 text-white font-semibold rounded-xl py-3 flex items-center justify-center gap-2 shadow-md transition overflow-hidden"
          >
            {aiLoading && (
              <span
                className="absolute left-0 top-0 h-full bg-white/20 transition-[width] duration-300 ease-linear"
                style={{ width: `${Math.min((elapsed / 45) * 100, 95)}%` }}
              />
            )}
            <span className="relative flex items-center gap-2">
              {aiLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Analizando con IA · {elapsed}s
                  {elapsed > 30 && <span className="text-xs opacity-80">(casi listo…)</span>}
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" /> Generar análisis con IA
                </>
              )}
            </span>
          </button>
          {aiLoading && (
            <p className="text-xs text-slate-500 text-center mt-1.5">
              Generando informe estructurado · suele tardar 15-45 s según el modelo
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
