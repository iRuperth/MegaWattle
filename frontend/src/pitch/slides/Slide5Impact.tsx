import { Car, Cloud, Droplets, Trees, Zap } from "lucide-react";
import { SlideHeading, SlideLayout } from "../SlideLayout";

interface Props {
  compact?: boolean;
}

export function Slide5Impact({ compact = false }: Props) {
  return (
    <SlideLayout variant="light">
      <div className="flex-1 px-12 py-10 flex flex-col">
        <SlideHeading>Impacto medible</SlideHeading>
        {!compact && (
          <p className="text-lg text-slate-600 mb-5 max-w-4xl">
            Escenario calculado por la propia plataforma:{" "}
            <strong>Microsoft Aragón</strong> + 9 macrogranjas porcinas en 100 km.
          </p>
        )}

        {/* Big metrics */}
        <div className="grid grid-cols-2 gap-5 mb-5">
          <BigMetric
            icon={Cloud}
            value="424.514"
            unit="t CO₂eq/año"
            label="Emisiones evitadas"
            color="from-emerald-500 to-emerald-600"
            subtitle="incluye el metano capturado del estiércol (GWP 28× CO₂)"
            compact={compact}
          />
          <BigMetric
            icon={Zap}
            value="76.814"
            unit="MWh/año"
            label="Energía limpia generada"
            color="from-sky-500 to-sky-600"
            subtitle="suficiente para alimentar 22.000 hogares"
            compact={compact}
          />
        </div>

        {/* Hero comparison — más grande */}
        <div className="relative bg-gradient-to-br from-[#0A192F] via-[#102A43] to-[#0E2A47] text-white rounded-3xl p-10 mb-5 overflow-hidden flex-1 flex items-center">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
          <div className="absolute -left-10 -top-10 w-64 h-64 bg-sky-400/10 rounded-full blur-3xl" />
          <div className="relative grid grid-cols-3 gap-8 items-center w-full">
            <div className="col-span-2">
              <p className="text-sm uppercase tracking-[0.4em] text-emerald-300 mb-3 font-semibold">
                Equivalencia visual
              </p>
              <p className="text-6xl font-black leading-tight mb-2">
                Como sacar <span className="text-emerald-400">92.000 coches</span>
              </p>
              <p className="text-3xl font-bold text-slate-200 mb-4">
                de circulación cada año
              </p>
              {!compact && (
                <p className="text-base text-slate-400 leading-relaxed max-w-2xl">
                  O plantar 1,6 millones de árboles maduros — solo con el estiércol
                  que hoy contamina los acuíferos de Aragón.
                </p>
              )}
            </div>
            <div className="flex justify-center">
              <Car className="w-44 h-44 text-emerald-400" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        {/* ODS row */}
        <div className="grid grid-cols-4 gap-3">
          <OdsCard num="6" title="Agua limpia" icon={Droplets} color="bg-[#26BDE2]" />
          <OdsCard num="7" title="Energía limpia" icon={Zap} color="bg-[#FFB900]" />
          <OdsCard num="11" title="Comunidades sostenibles" icon={Trees} color="bg-[#FD9D24]" />
          <OdsCard num="12" title="Producción responsable" icon={Cloud} color="bg-[#BF8B2E]" />
        </div>
      </div>
    </SlideLayout>
  );
}

function BigMetric({
  icon: Icon,
  value,
  unit,
  label,
  subtitle,
  color,
  compact,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  unit: string;
  label: string;
  subtitle: string;
  color: string;
  compact?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className="text-sm uppercase tracking-wide text-slate-500 font-semibold">
          {label}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shadow`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-6xl font-black text-slate-900 tabular-nums">{value}</span>
        <span className="text-base font-medium text-slate-500">{unit}</span>
      </div>
      {!compact && <p className="text-sm text-slate-500 mt-2">{subtitle}</p>}
    </div>
  );
}

function OdsCard({
  num,
  title,
  icon: Icon,
  color,
}: {
  num: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}) {
  return (
    <div className={`${color} text-white rounded-xl p-3 flex items-center gap-3`}>
      <div className="bg-white/20 rounded-lg w-11 h-11 flex items-center justify-center">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <div className="text-[11px] uppercase tracking-wide opacity-80">ODS {num}</div>
        <div className="text-base font-bold leading-tight">{title}</div>
      </div>
    </div>
  );
}
