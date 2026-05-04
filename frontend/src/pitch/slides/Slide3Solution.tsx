import { ArrowRight, Cloud, Factory, type LucideIcon, Recycle, Server, Zap } from "lucide-react";
import { SlideHeading, SlideLayout } from "../SlideLayout";

interface Props {
  compact?: boolean;
}

export function Slide3Solution({ compact = false }: Props) {
  return (
    <SlideLayout variant="light">
      <div className="flex-1 px-12 py-10 flex flex-col">
        <SlideHeading>MegaWattle — el puente energético circular</SlideHeading>
        {!compact && (
          <p className="text-lg text-slate-600 mb-5 max-w-4xl">
            Sistema <strong>Waste-to-Energy</strong> que digiere los purines
            contaminantes y los convierte en electricidad limpia para los centros
            de datos cercanos. Mismo problema, misma solución, una sola
            infraestructura.
          </p>
        )}

        {/* Flow diagram — fills available space */}
        <div className="bg-white/80 backdrop-blur rounded-3xl border border-slate-200 p-8 mb-5 shadow-sm flex-1 flex items-stretch">
          <div className="flex items-stretch justify-between gap-3 w-full">
            <FlowNode
              icon={Recycle}
              label="Residuo"
              sub="Purines + estiércol"
              detail={!compact ? "MAPA · 52 nodos" : undefined}
              color="bg-amber-100 text-amber-800 border-amber-300"
            />
            <FlowArrow />
            <FlowNode
              icon={Factory}
              label="Planta MegaWattle"
              sub="Digestión anaerobia + cogeneración"
              detail={!compact ? "CHP eléctrica η=0,38" : undefined}
              color="bg-emerald-100 text-emerald-800 border-emerald-300"
              big
            />
            <FlowArrow />
            <FlowNode
              icon={Server}
              label="Centro de datos"
              sub="Energía limpia 24/7"
              detail={!compact ? "30 CPDs reales" : undefined}
              color="bg-sky-100 text-sky-800 border-sky-300"
            />
          </div>
        </div>

        {/* 3 pillars — bigger */}
        <div className="grid grid-cols-3 gap-4">
          <Pillar
            icon={Recycle}
            title="Transforma"
            desc={compact ? null : "El estiércol que contamina acuíferos se digiere a biogás → electricidad."}
            color="emerald"
          />
          <Pillar
            icon={Server}
            title="Abastece"
            desc={compact ? null : "Energía local 24/7 para hyperscalers, sin presionar la red eléctrica."}
            color="sky"
          />
          <Pillar
            icon={Cloud}
            title="Reduce"
            desc={compact ? null : "Captura el metano (GWP 28× CO₂) que de otro modo escapa a la atmósfera."}
            color="violet"
          />
        </div>

        {!compact && (
          <div className="mt-4 bg-gradient-to-r from-emerald-50 to-sky-50 border border-emerald-200 rounded-xl p-3 text-sm text-slate-700">
            <strong className="text-emerald-700">Diferencial:</strong> única solución que
            conecta el problema rural con la presión urbana en una <em>sola</em>{" "}
            infraestructura. No es reciclaje — es economía circular sistémica.
          </div>
        )}
      </div>
    </SlideLayout>
  );
}

function FlowNode({
  icon: Icon,
  label,
  sub,
  detail,
  color,
  big,
}: {
  icon: LucideIcon;
  label: string;
  sub: string;
  detail?: string;
  color: string;
  big?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center justify-center px-6 py-8 rounded-2xl border-2 ${color} ${
        big ? "flex-[1.4] shadow-xl scale-105" : "flex-1"
      }`}
    >
      <Icon className={big ? "w-24 h-24 mb-4" : "w-20 h-20 mb-3"} strokeWidth={1.6} />
      <span className={big ? "text-3xl font-black mb-1" : "text-2xl font-bold mb-1"}>{label}</span>
      <span className={big ? "text-base opacity-80 leading-tight" : "text-sm opacity-75 leading-tight"}>
        {sub}
      </span>
      {detail && (
        <span className="text-xs opacity-60 mt-3 px-3 py-1 bg-white/60 rounded-full font-mono">
          {detail}
        </span>
      )}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="flex flex-col items-center justify-center text-slate-400 px-2 shrink-0">
      <ArrowRight className="w-12 h-12" strokeWidth={2.5} />
      <Zap className="w-4 h-4 mt-1" />
    </div>
  );
}

function Pillar({
  icon: Icon,
  title,
  desc,
  color,
}: {
  icon: LucideIcon;
  title: string;
  desc: string | null;
  color: "emerald" | "sky" | "violet";
}) {
  const cls = {
    emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
    sky: "bg-sky-50 border-sky-200 text-sky-700",
    violet: "bg-violet-50 border-violet-200 text-violet-700",
  }[color];
  return (
    <div className={`rounded-xl border ${cls} p-5`}>
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-7 h-7" />
        <h4 className="font-bold text-xl">{title}</h4>
      </div>
      {desc && <p className="text-base text-slate-700 leading-relaxed">{desc}</p>}
    </div>
  );
}
