import { useMemo } from "react";
import { Server } from "lucide-react";
import { useStore } from "../lib/store";

export function CpdList() {
  const { cpds, ccaa, provincia, selectedCpdIds, toggleCpd } = useStore();

  const filtered = useMemo(
    () =>
      cpds.filter(
        (c) => (!ccaa || c.ccaa === ccaa) && (!provincia || c.provincia === provincia)
      ),
    [cpds, ccaa, provincia]
  );

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center">2</span>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
          Elegir CPD ({selectedCpdIds.size}/2)
        </h2>
      </div>
      <div className="space-y-1.5 max-h-[205px] overflow-y-auto pr-1">
        {filtered.length === 0 ? (
          <p className="text-xs italic text-slate-400 py-3 text-center">Sin resultados</p>
        ) : (
          filtered.map((c) => {
            const sel = selectedCpdIds.has(c.id);
            return (
              <button
                key={c.id}
                onClick={() => toggleCpd(c.id)}
                className={`w-full text-left rounded-lg px-3 py-2 transition border ${
                  sel
                    ? "bg-amber-50 border-amber-300 ring-2 ring-amber-200"
                    : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                }`}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`mt-0.5 w-4 h-4 rounded border-2 flex items-center justify-center transition ${
                      sel ? "bg-amber-500 border-amber-500" : "border-slate-300"
                    }`}
                  >
                    {sel && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8l3 3 7-7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-1.5">
                      <Server className="w-3 h-3 text-sky-600 shrink-0" />
                      <span className="font-semibold text-sm truncate">{c.nombre}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {c.operador} · <span className="font-medium text-slate-700">
                        {c.consumo_anual_gwh.toLocaleString("es-ES")} GWh/año
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </section>
  );
}
