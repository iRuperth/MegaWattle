import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { AlertTriangle, Brain, Check, Leaf, Lightbulb, TrendingUp } from "lucide-react";
import { Bar, Doughnut } from "react-chartjs-2";
import { useStore } from "../lib/store";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const VALORACION_COLORS: Record<string, string> = {
  alta: "bg-emerald-100 text-emerald-700 border-emerald-200",
  media: "bg-amber-100 text-amber-700 border-amber-200",
  baja: "bg-rose-100 text-rose-700 border-rose-200",
};

const MODE_BADGE: Record<string, { label: string; cls: string }> = {
  live: { label: "IA en vivo", cls: "bg-sky-100 text-sky-700 border-sky-200" },
  cache: { label: "Cache preset", cls: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  fallback: { label: "Modo offline", cls: "bg-amber-100 text-amber-700 border-amber-200" },
};

export function AiAnalysisPanel() {
  const ai = useStore((s) => s.ai);
  if (!ai) return null;

  const modo = ai._modo || "fallback";
  const modeInfo = MODE_BADGE[modo];
  const valCls = VALORACION_COLORS[ai.viabilidad_tecnica?.valoracion] || VALORACION_COLORS.media;

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 mt-4 animate-fade-in shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sky-500 to-violet-500 flex items-center justify-center shadow">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold leading-tight">Análisis IA</h3>
            <p className="text-xs text-slate-500">Análisis generado con IA</p>
          </div>
        </div>
        <span className={`text-[10px] px-2 py-1 rounded-md border font-medium uppercase tracking-wide ${modeInfo.cls}`}>
          {modeInfo.label}
        </span>
      </div>

      <p className="italic text-slate-700 border-l-4 border-violet-400 pl-4 py-2 bg-violet-50/40 rounded-r mb-4">
        {ai.resumen_ejecutivo}
      </p>

      <Section title="Viabilidad técnica" icon={Check}>
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs uppercase font-bold px-2 py-1 rounded border ${valCls}`}>
            {ai.viabilidad_tecnica?.valoracion}
          </span>
        </div>
        <p className="text-sm text-slate-700 mb-2">{ai.viabilidad_tecnica?.explicacion}</p>
        <ul className="text-sm text-slate-700 space-y-1">
          {(ai.viabilidad_tecnica?.puntos_clave || []).map((p, i) => (
            <li key={i} className="flex items-start gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
              <span>{p}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Impacto ambiental" icon={Leaf}>
        <p className="text-sm text-slate-700 mb-2">{ai.impacto_ambiental?.narrativa}</p>
        {ai.impacto_ambiental?.comparacion_visual && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-3">
            <p className="text-sm font-semibold text-emerald-800">
              💡 {ai.impacto_ambiental.comparacion_visual}
            </p>
          </div>
        )}
        {ai.impacto_ambiental?.chart && (
          <div className="max-w-md">
            <Bar
              data={ai.impacto_ambiental.chart.data}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } },
                ...(ai.impacto_ambiental.chart.options || {}),
              }}
            />
          </div>
        )}
      </Section>

      <Section title="Viabilidad económica" icon={TrendingUp}>
        <p className="text-sm text-slate-700 mb-2">{ai.viabilidad_economica?.narrativa}</p>
        {ai.viabilidad_economica?.chart && (
          <div className="max-w-xs mx-auto">
            <Doughnut
              data={ai.viabilidad_economica.chart.data}
              options={{ responsive: true, ...(ai.viabilidad_economica.chart.options || {}) }}
            />
          </div>
        )}
      </Section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <Section title="Recomendaciones" icon={Lightbulb} compact>
          <ul className="text-sm space-y-1">
            {(ai.recomendaciones || []).map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-violet-500 font-bold mt-0.5">→</span>
                <span className="text-slate-700">{r}</span>
              </li>
            ))}
          </ul>
        </Section>
        <Section title="Riesgos" icon={AlertTriangle} compact>
          <ul className="text-sm space-y-1">
            {(ai.riesgos || []).map((r, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-amber-500 font-bold mt-0.5">!</span>
                <span className="text-slate-700">{r}</span>
              </li>
            ))}
          </ul>
        </Section>
      </div>

      {ai.fuentes_citadas?.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-100">
          <p className="text-xs text-slate-500">
            <strong className="text-slate-600">Fuentes:</strong> {ai.fuentes_citadas.join(" · ")}
          </p>
        </div>
      )}
    </div>
  );
}

interface SectionProps {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  compact?: boolean;
}
function Section({ title, icon: Icon, children, compact }: SectionProps) {
  return (
    <div className={`border-l-4 border-sky-300 pl-4 py-1 ${compact ? "" : "mb-4"}`}>
      <div className="flex items-center gap-1.5 mb-2">
        <Icon className="w-4 h-4 text-sky-600" />
        <h4 className="font-semibold text-slate-800">{title}</h4>
      </div>
      {children}
    </div>
  );
}
