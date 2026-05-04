import {
  ArrowDown,
  ArrowRight,
  CheckCircle2,
  CircleDollarSign,
  Cpu,
  Database,
  Droplets,
  Factory,
  Globe,
  Network,
  Recycle,
  Rocket,
  Search,
  TrendingUp,
} from "lucide-react";
import { SlideHeading, SlideLayout } from "../SlideLayout";

const PHASES = [
  {
    letter: "A",
    title: "Piloto Agro-Circular",
    sub: "Planta Piloto de Biogás",
    icon: Factory,
    color: "from-orange-400 to-orange-600",
    bg: "bg-orange-50 border-orange-300",
    bullets: ["Macrogranja porcina + digestor anaerobio", "Validación operativa local"],
  },
  {
    letter: "B",
    title: "Módulo W2E",
    sub: "Energía de residuos",
    icon: Recycle,
    color: "from-sky-400 to-sky-600",
    bg: "bg-sky-50 border-sky-300",
    bullets: ["Cogeneración eléctrica (CHP)", "Inyección al CPD vecino"],
  },
  {
    letter: "C",
    title: "Módulo E2W",
    sub: "Recuperación de agua",
    icon: Droplets,
    color: "from-cyan-400 to-cyan-600",
    bg: "bg-cyan-50 border-cyan-300",
    bullets: ["Tratamiento del digestato", "Agua para riego e industria"],
  },
  {
    letter: "D",
    title: "Expansión Regional",
    sub: "Red de módulos",
    icon: Network,
    color: "from-slate-400 to-slate-600",
    bg: "bg-slate-50 border-slate-300",
    bullets: ["Replicación en otros hubs", "Estándar abierto y escalable"],
  },
];

const OPERATIONAL_LAYERS = [
  { icon: Cpu, label: "Monitoreo y ajuste · Gemelo digital + IA", sub: "Telemetría continua · alertas predictivas" },
  { icon: CheckCircle2, label: "Puesta en marcha y control de calidad", sub: "Validación de KPIs por fase" },
  { icon: CircleDollarSign, label: "Operación comercial — energía · agua · gate fees", sub: "PPA con CPDs + ingresos por residuos", highlight: true },
  { icon: Globe, label: "Escalado replicable a nuevos hubs", sub: "Modelo modular auto-financiable" },
];

interface Props {
  compact?: boolean;
}

export function Slide6Roadmap({ compact = false }: Props) {
  return (
    <SlideLayout variant="light">
      <div className="flex-1 px-10 py-8 flex flex-col gap-3">
        <SlideHeading>
          <span className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="MegaWattle"
              className="w-10 h-10 object-contain"
            />
            <span>Proceso de implementación · W2E2W</span>
          </span>
        </SlideHeading>

        {/* Fila superior: Identificación → Gemelo Digital → Decisión */}
        <div className="flex items-stretch gap-3">
          <SidePill
            icon={Search}
            title="Identificación"
            sub="del problema"
            color="bg-amber-100 border-amber-300 text-amber-800"
          />
          <Connector />
          <CentralBox compact={compact} />
          <Connector />
          <SidePill
            icon={Rocket}
            title="Decisión"
            sub="de inversión"
            color="bg-emerald-100 border-emerald-300 text-emerald-800"
          />
        </div>

        <div className="flex justify-center -my-1">
          <ArrowDown className="w-5 h-5 text-slate-400" />
        </div>

        {/* 4 Fases — crecen para llenar espacio con bullets */}
        <div className="grid grid-cols-4 gap-3 flex-1">
          {PHASES.map((p) => (
            <PhaseCard key={p.letter} phase={p} compact={compact} />
          ))}
        </div>

        {/* Capas operativas — barras con descripción */}
        <div className="flex flex-col gap-2">
          {OPERATIONAL_LAYERS.map((layer, i) => (
            <OperationalLayer key={i} {...layer} compact={compact} />
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

function SidePill({
  icon: Icon,
  title,
  sub,
  color,
}: {
  icon: any;
  title: string;
  sub: string;
  color: string;
}) {
  return (
    <div className={`flex flex-col items-center justify-center px-4 py-3 rounded-xl border-2 ${color} text-center min-w-[150px]`}>
      <Icon className="w-6 h-6 mb-1" />
      <span className="text-sm font-bold leading-tight">{title}</span>
      <span className="text-[11px] opacity-80 leading-tight">{sub}</span>
    </div>
  );
}

function CentralBox({ compact }: { compact?: boolean }) {
  return (
    <div className="flex-1 bg-gradient-to-br from-slate-800 via-slate-900 to-[#0078D4] text-white rounded-xl px-5 py-3 shadow-lg flex flex-col">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-8 h-8 rounded-md bg-white/15 flex items-center justify-center">
          <Cpu className="w-4 h-4 text-cyan-300" />
        </div>
        <h4 className="font-bold text-base">Gemelo Digital en Azure</h4>
        <span className="ml-auto text-[10px] uppercase tracking-wider text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full">
          Capa transversal
        </span>
      </div>
      {!compact && (
        <div className="grid grid-cols-3 gap-2">
          <SubPill icon={Database} label="Análisis · Residuos & demanda" />
          <SubPill icon={TrendingUp} label="Simulación y optimización" />
          <SubPill icon={CheckCircle2} label="Validación financiera" />
        </div>
      )}
    </div>
  );
}

function SubPill({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1.5 bg-white/10 rounded-md px-2 py-1.5">
      <Icon className="w-3.5 h-3.5 text-cyan-300 shrink-0" />
      <span className="text-[11px] text-slate-200 leading-tight">{label}</span>
    </div>
  );
}

function Connector() {
  return (
    <div className="flex items-center text-slate-400">
      <ArrowRight className="w-6 h-6" strokeWidth={2.5} />
    </div>
  );
}

function PhaseCard({
  phase,
  compact,
}: {
  phase: (typeof PHASES)[number];
  compact?: boolean;
}) {
  const Icon = phase.icon;
  return (
    <div className={`rounded-xl border-2 ${phase.bg} p-4 shadow-sm flex flex-col`}>
      <div className="flex items-center justify-between mb-2">
        <div
          className={`w-12 h-12 rounded-lg bg-gradient-to-br ${phase.color} flex items-center justify-center shadow text-white font-black text-xl`}
        >
          {phase.letter}
        </div>
        <Icon className="w-7 h-7 text-slate-500" />
      </div>
      <div className="text-[10px] uppercase tracking-wide text-slate-500 font-bold mb-0.5">
        Fase {phase.letter}
      </div>
      <h4 className="font-bold text-base text-slate-900 leading-tight">{phase.title}</h4>
      <p className="text-xs text-slate-600 italic mt-1 leading-tight">{phase.sub}</p>
      {!compact && (
        <ul className="mt-3 space-y-1">
          {phase.bullets.map((b, i) => (
            <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 leading-tight">
              <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function OperationalLayer({
  icon: Icon,
  label,
  sub,
  highlight,
  compact,
}: {
  icon: any;
  label: string;
  sub: string;
  highlight?: boolean;
  compact?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 px-5 py-3 rounded-xl border ${
        highlight
          ? "bg-gradient-to-r from-emerald-100 to-sky-100 border-emerald-300 shadow-sm"
          : "bg-white border-slate-200"
      }`}
    >
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          highlight ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
        }`}
      >
        <Icon className="w-5 h-5" />
      </div>
      <div className="flex-1">
        <div className={`text-sm leading-tight ${highlight ? "font-semibold text-emerald-900" : "text-slate-800 font-medium"}`}>
          {label}
        </div>
        {!compact && (
          <div className={`text-xs leading-tight mt-0.5 ${highlight ? "text-emerald-700/80" : "text-slate-500"}`}>
            {sub}
          </div>
        )}
      </div>
    </div>
  );
}
