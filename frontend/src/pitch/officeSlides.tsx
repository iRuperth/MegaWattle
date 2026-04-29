import {
  AlertTriangle,
  ArrowRight,
  Brain,
  Car,
  Cloud,
  Code2,
  Cpu,
  Database,
  Droplets,
  Factory,
  Github,
  Globe,
  MapPin,
  Recycle,
  Rocket,
  Search,
  Server,
  Sparkles,
  Target,
  TrendingUp,
  Video,
  Wand2,
  Zap,
} from "lucide-react";
import { OfficeHeading, OfficeLayout } from "./OfficeLayout";

/* ════════════════════════════════════════
 * Slide 1 — Portada Office
 * ════════════════════════════════════════ */
export function OfficeSlide1Title() {
  return (
    <OfficeLayout slideNumber={1} totalSlides={8}>
      <div className="flex-1 px-16 pt-24 pb-16 flex">
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-sm uppercase tracking-[0.3em] text-[#0078D4] font-semibold mb-3">
            Hackathon League for Social Good · 2026
          </p>
          <h1 className="text-7xl font-black tracking-tight text-slate-900 leading-none mb-4">
            MegaWattle
          </h1>
          <p className="text-2xl text-slate-600 mb-8 max-w-xl">
            Transformando residuos en energía para el futuro
          </p>
          <div className="flex gap-3 mb-8">
            <span className="bg-[#26BDE2] text-white px-4 py-1.5 rounded-md text-sm font-semibold">ODS 6</span>
            <span className="bg-[#FFB900] text-white px-4 py-1.5 rounded-md text-sm font-semibold">ODS 7</span>
            <span className="bg-slate-200 text-slate-700 px-4 py-1.5 rounded-md text-sm font-semibold">Equipo Outliers</span>
          </div>
          <p className="text-sm text-slate-500">
            Roberto Molero · Jonathan Brasales · Iris Amorim · Naizabeth Bermudez · Raúl Machaca
          </p>
        </div>
        <div className="w-1/3 flex items-center justify-center">
          <img src="/logo.png" alt="MegaWattle" className="w-72 h-72 object-contain" />
        </div>
      </div>
    </OfficeLayout>
  );
}

/* ════════════════════════════════════════
 * Slide 2 — Problema Office
 * ════════════════════════════════════════ */
export function OfficeSlide2Problem() {
  return (
    <OfficeLayout slideNumber={2} totalSlides={8}>
      <div className="flex-1 px-16 pt-20 pb-20 flex flex-col">
        <OfficeHeading number="01">El gran desafío</OfficeHeading>

        <div className="grid grid-cols-2 gap-10 flex-1">
          <ProblemHalf
            icon={Droplets}
            color="#26BDE2"
            label="Crisis rural"
            stat="C-575/22"
            statSub="Procedimiento UE contra España"
            line="Los purines de las macrogranjas contaminan acuíferos y suelos."
          />
          <ProblemHalf
            icon={Server}
            color="#FFB900"
            label="Presión urbana"
            stat="10.500 GWh"
            statSub="Microsoft Aragón / año"
            line="Los hyperscalers consumen más energía que regiones enteras."
          />
        </div>

        <div className="mt-8 flex items-center gap-3 text-base text-slate-700">
          <AlertTriangle className="w-5 h-5 text-[#FFB900]" />
          <span>
            <strong>El residuo de uno</strong> puede ser{" "}
            <strong>el combustible del otro</strong>.
          </span>
        </div>
      </div>
    </OfficeLayout>
  );
}

function ProblemHalf({
  icon: Icon,
  color,
  label,
  stat,
  statSub,
  line,
}: {
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  label: string;
  stat: string;
  statSub: string;
  line: string;
}) {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-3 mb-4">
        <div
          className="w-14 h-14 flex items-center justify-center rounded-md"
          style={{ background: color }}
        >
          <Icon className="w-7 h-7 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900">{label}</h3>
      </div>
      <div className="border-l-4 pl-5 mb-5" style={{ borderColor: color }}>
        <div className="text-6xl font-black text-slate-900 leading-none">{stat}</div>
        <div className="text-xs uppercase tracking-wide text-slate-500 mt-2">{statSub}</div>
      </div>
      <p className="text-base text-slate-700 leading-relaxed">{line}</p>
    </div>
  );
}

/* ════════════════════════════════════════
 * Slide 3 — Solución Office
 * ════════════════════════════════════════ */
export function OfficeSlide3Solution() {
  return (
    <OfficeLayout slideNumber={3} totalSlides={8}>
      <div className="flex-1 px-16 pt-20 pb-20 flex flex-col">
        <OfficeHeading number="02">La solución</OfficeHeading>
        <p className="text-lg text-slate-600 max-w-3xl mb-10">
          <strong>Waste-to-Energy</strong>: digerir el estiércol en biogás y
          generar electricidad limpia para los centros de datos cercanos.
        </p>

        {/* Flow horizontal */}
        <div className="flex items-stretch gap-3 mb-10">
          <FlowStep icon={Recycle} label="Residuo" sub="Purines" color="#FFB900" />
          <FlowDivider />
          <FlowStep icon={Factory} label="Planta MegaWattle" sub="Digestión + CHP" color="#7FBA00" big />
          <FlowDivider />
          <FlowStep icon={Server} label="Centro de datos" sub="Energía 24/7" color="#0078D4" />
        </div>

        <div className="grid grid-cols-3 gap-6 mt-auto">
          <Pillar n="A" title="Transforma" sub="Residuo → biogás" color="#7FBA00" />
          <Pillar n="B" title="Abastece" sub="Energía local" color="#0078D4" />
          <Pillar n="C" title="Reduce CO₂" sub="Captura metano" color="#9333EA" />
        </div>
      </div>
    </OfficeLayout>
  );
}

function FlowStep({
  icon: Icon,
  label,
  sub,
  color,
  big,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  sub: string;
  color: string;
  big?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center text-center justify-center px-6 py-8 rounded-md border-2 ${big ? "flex-[1.4]" : "flex-1"}`}
      style={{ borderColor: color, background: `${color}10` }}
    >
      <div
        className={`flex items-center justify-center rounded-md mb-3 ${big ? "w-20 h-20" : "w-16 h-16"}`}
        style={{ background: color }}
      >
        <Icon className={big ? "w-10 h-10 text-white" : "w-8 h-8 text-white"} />
      </div>
      <span className={`font-bold text-slate-900 ${big ? "text-2xl" : "text-xl"}`}>{label}</span>
      <span className="text-sm text-slate-600 mt-1">{sub}</span>
    </div>
  );
}

function FlowDivider() {
  return (
    <div className="flex items-center justify-center px-1 text-slate-300">
      <ArrowRight className="w-8 h-8" strokeWidth={2.5} />
    </div>
  );
}

function Pillar({ n, title, sub, color }: { n: string; title: string; sub: string; color: string }) {
  return (
    <div className="border-l-4 pl-5 py-2" style={{ borderColor: color }}>
      <div className="flex items-baseline gap-3 mb-1">
        <span className="text-3xl font-black text-slate-300">{n}</span>
        <span className="text-xl font-bold text-slate-900">{title}</span>
      </div>
      <p className="text-sm text-slate-600">{sub}</p>
    </div>
  );
}

/* ════════════════════════════════════════
 * Slide 4 — Demo Office
 * ════════════════════════════════════════ */
export function OfficeSlide4Demo() {
  return (
    <OfficeLayout slideNumber={4} totalSlides={8}>
      <div
        className="px-12 pt-20 pb-16 grid gap-4 h-full min-h-0"
        style={{ gridTemplateRows: "auto 1fr auto" }}
      >
        <OfficeHeading number="03">Plataforma operativa</OfficeHeading>

        {/* Imagen — sin contenedor extra, la imagen es el bloque visible */}
        <div className="flex items-center justify-center min-h-0">
          <img
            src="/pitch/demo.png"
            alt="MegaWattle dashboard"
            className="max-w-full max-h-full rounded-md border border-slate-200 shadow-lg"
          />
        </div>

        {/* Stats en fila — siempre visibles abajo */}
        <div className="grid grid-cols-4 gap-3">
          <Stat n="30" label="Centros de datos reales" color="#0078D4" />
          <Stat n="52" label="Nodos ganaderos (MAPA 2024)" color="#7FBA00" />
          <Stat n="13" label="Comunidades autónomas" color="#FFB900" />
          <Stat n="IA" label="Análisis Azure AI estructurado" color="#9333EA" />
        </div>
      </div>
    </OfficeLayout>
  );
}

function Stat({ n, label, color }: { n: string; label: string; color: string }) {
  return (
    <div
      className="rounded-md px-4 py-3 border-l-4 bg-slate-50"
      style={{ borderColor: color }}
    >
      <div className="text-4xl font-black tabular-nums leading-none" style={{ color }}>
        {n}
      </div>
      <div className="text-xs text-slate-700 mt-1.5 leading-tight">{label}</div>
    </div>
  );
}

/* ════════════════════════════════════════
 * Slide 5 — Impacto Office
 * ════════════════════════════════════════ */
export function OfficeSlide5Impact() {
  return (
    <OfficeLayout slideNumber={5} totalSlides={8}>
      <div className="flex-1 px-16 pt-20 pb-20 flex flex-col">
        <OfficeHeading number="04">Impacto medible</OfficeHeading>

        <div className="grid grid-cols-2 gap-8 mb-8">
          <BigStat
            value="424.514"
            unit="t CO₂eq/año"
            label="Emisiones evitadas"
            color="#7FBA00"
          />
          <BigStat
            value="76.814"
            unit="MWh/año"
            label="Energía limpia"
            color="#0078D4"
          />
        </div>

        {/* Hero comparativo */}
        <div className="bg-slate-900 text-white rounded-md p-10 flex items-center gap-10 flex-1">
          <Car className="w-32 h-32 text-[#7FBA00] shrink-0" strokeWidth={1.5} />
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[#7FBA00] mb-3">
              Equivalente
            </p>
            <p className="text-5xl font-black leading-tight mb-2">
              92.000 coches
            </p>
            <p className="text-2xl font-light text-slate-300">
              fuera de circulación al año
            </p>
          </div>
        </div>
      </div>
    </OfficeLayout>
  );
}

function BigStat({
  value,
  unit,
  label,
  color,
}: {
  value: string;
  unit: string;
  label: string;
  color: string;
}) {
  return (
    <div className="border-t-4 pt-4" style={{ borderColor: color }}>
      <div className="text-xs uppercase tracking-wide text-slate-500 font-semibold mb-1">
        {label}
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-7xl font-black tabular-nums text-slate-900">{value}</span>
        <span className="text-base text-slate-500">{unit}</span>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════
 * Slide 6 — Roadmap Office (proceso W2E2W)
 * ════════════════════════════════════════ */
export function OfficeSlide6Roadmap() {
  const phases = [
    {
      letter: "A",
      title: "Piloto Agro-Circular",
      sub: "Planta piloto de biogás",
      icon: Factory,
      color: "#F97316",
      bullets: ["Macrogranja + digestor", "Validación local"],
    },
    {
      letter: "B",
      title: "Módulo W2E",
      sub: "Energía de residuos",
      icon: Recycle,
      color: "#0078D4",
      bullets: ["Cogeneración (CHP)", "Inyección al CPD"],
    },
    {
      letter: "C",
      title: "Módulo E2W",
      sub: "Recuperación de agua",
      icon: Droplets,
      color: "#06B6D4",
      bullets: ["Tratamiento digestato", "Riego e industria"],
    },
    {
      letter: "D",
      title: "Expansión Regional",
      sub: "Red de módulos",
      icon: Globe,
      color: "#64748B",
      bullets: ["Replicación en hubs", "Estándar abierto"],
    },
  ];
  const layers = [
    { label: "Monitoreo y ajuste · gemelo digital + IA", sub: "Telemetría continua · alertas predictivas" },
    { label: "Puesta en marcha y control de calidad", sub: "Validación de KPIs por fase" },
    { label: "Operación comercial — energía · agua · gate fees", sub: "PPA con CPDs + ingresos por residuos", highlight: true },
    { label: "Escalado replicable a nuevos hubs", sub: "Modelo modular auto-financiable" },
  ];
  return (
    <OfficeLayout slideNumber={6} totalSlides={8}>
      <div className="flex-1 px-12 pt-20 pb-16 flex flex-col gap-3">
        <OfficeHeading number="05">Proceso de implementación · W2E2W</OfficeHeading>

        {/* Top: Identificación → Twin → Decisión */}
        <div className="flex items-stretch gap-3">
          <div className="px-4 py-3 bg-amber-100 border border-amber-300 rounded-md flex items-center gap-2 min-w-[180px]">
            <Search className="w-5 h-5 text-amber-700" />
            <div>
              <div className="text-xs font-bold text-amber-900">Identificación</div>
              <div className="text-[10px] text-amber-700">del problema</div>
            </div>
          </div>
          <div className="text-slate-400 flex items-center"><ArrowRight className="w-5 h-5" /></div>
          <div className="flex-1 bg-slate-900 text-white rounded-md px-5 py-3 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Cpu className="w-5 h-5 text-cyan-300" />
              <span className="font-bold text-sm">Gemelo Digital en Azure</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-200">Análisis residuos</span>
              <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-200">Simulación y optimización</span>
              <span className="text-[10px] bg-white/10 px-2 py-1 rounded text-slate-200">Validación financiera</span>
            </div>
          </div>
          <div className="text-slate-400 flex items-center"><ArrowRight className="w-5 h-5" /></div>
          <div className="px-4 py-3 bg-emerald-100 border border-emerald-300 rounded-md flex items-center gap-2 min-w-[180px]">
            <Rocket className="w-5 h-5 text-emerald-700" />
            <div>
              <div className="text-xs font-bold text-emerald-900">Decisión</div>
              <div className="text-[10px] text-emerald-700">de inversión</div>
            </div>
          </div>
        </div>

        {/* 4 Fases — crecen y tienen bullets */}
        <div className="grid grid-cols-4 gap-3 flex-1">
          {phases.map((p) => {
            const Icon = p.icon;
            return (
              <div
                key={p.letter}
                className="rounded-md p-4 border-t-4 bg-slate-50 flex flex-col"
                style={{ borderColor: p.color }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl font-black" style={{ color: p.color }}>
                    {p.letter}
                  </span>
                  <Icon className="w-6 h-6" style={{ color: p.color }} />
                </div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                  Fase {p.letter}
                </div>
                <h4 className="text-base font-bold text-slate-900 leading-tight">
                  {p.title}
                </h4>
                <p className="text-xs text-slate-500 italic mt-1 mb-2">{p.sub}</p>
                <ul className="space-y-1 mt-auto">
                  {p.bullets.map((b, i) => (
                    <li key={i} className="text-xs text-slate-700 flex items-start gap-1.5 leading-tight">
                      <span className="w-1 h-1 rounded-full bg-slate-400 mt-1.5 shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Capas operativas con descripción */}
        <div className="space-y-1.5">
          {layers.map((layer, i) => (
            <div
              key={i}
              className={`px-4 py-2.5 rounded-md flex items-center gap-3 ${
                layer.highlight
                  ? "bg-gradient-to-r from-emerald-100 to-sky-100 border border-emerald-300"
                  : "bg-white border border-slate-200"
              }`}
            >
              <span
                className={`inline-block w-1.5 h-9 rounded shrink-0 ${
                  layer.highlight ? "bg-emerald-500" : "bg-slate-300"
                }`}
              />
              <div>
                <div className={`text-sm leading-tight ${layer.highlight ? "font-semibold text-emerald-900" : "text-slate-800 font-medium"}`}>
                  {layer.label}
                </div>
                <div className={`text-xs leading-tight mt-0.5 ${layer.highlight ? "text-emerald-700/80" : "text-slate-500"}`}>
                  {layer.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OfficeLayout>
  );
}

/* ════════════════════════════════════════
 * Slide 7 — Herramientas Microsoft Office
 * ════════════════════════════════════════ */
export function OfficeSlide7Tech() {
  const tools = [
    { name: "Microsoft Copilot", icon: Sparkles, color: "#0078D4" },
    { name: "Word + PowerPoint", icon: FileLogo, color: "#185ABD" },
    { name: "Visual Studio Code", icon: Code2, color: "#007ACC" },
    { name: "GitHub", icon: Github, color: "#24292E" },
    { name: "Microsoft Clipchamp", icon: Video, color: "#7B68EE" },
    { name: "Microsoft Bing", icon: Search, color: "#008373" },
    { name: "Azure AI Foundry", icon: Wand2, color: "#0078D4" },
  ];
  return (
    <OfficeLayout slideNumber={7} totalSlides={8}>
      <div className="flex-1 px-16 pt-20 pb-20 flex flex-col">
        <OfficeHeading number="06">Tecnologías Microsoft</OfficeHeading>

        <div className="grid grid-cols-4 gap-5 flex-1">
          {tools.map((t) => {
            const Icon = t.icon;
            return (
              <div
                key={t.name}
                className="bg-slate-50 rounded-md p-6 flex flex-col items-start border-t-4"
                style={{ borderColor: t.color }}
              >
                <div
                  className="w-14 h-14 rounded-md flex items-center justify-center mb-4"
                  style={{ background: t.color }}
                >
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-bold text-slate-900 leading-tight">{t.name}</h4>
              </div>
            );
          })}
          <div className="bg-slate-900 text-white rounded-md p-6 flex flex-col justify-center">
            <Brain className="w-8 h-8 text-cyan-300 mb-3" />
            <p className="text-base font-bold">Microsoft como motor</p>
            <p className="text-xs text-slate-400 mt-1">
              Núcleo del proyecto end-to-end.
            </p>
          </div>
        </div>
      </div>
    </OfficeLayout>
  );
}

function FileLogo() {
  return (
    <div className="text-white font-black text-xl tracking-tighter flex items-center gap-0.5">
      W<span className="text-orange-300">P</span>
    </div>
  );
}

/* ════════════════════════════════════════
 * Slide 8 — Cierre Office
 * ════════════════════════════════════════ */
export function OfficeSlide8Thanks() {
  return (
    <OfficeLayout slideNumber={8} totalSlides={8}>
      <div className="flex-1 flex">
        <div className="w-1/2 bg-slate-900 text-white flex items-center justify-center">
          <div className="px-12">
            <img src="/logo.png" alt="MegaWattle" className="w-32 h-32 object-contain mb-6" />
            <h1 className="text-7xl font-black mb-3 leading-none">¡Gracias!</h1>
            <p className="text-xl font-semibold text-emerald-300 mb-8 tracking-wide">
              De residuo a megavatio
            </p>
            <p className="text-sm text-slate-400 leading-relaxed">
              Roberto Molero · Jonathan Brasales · Iris Amorim · Naizabeth Bermudez · Raúl Machaca
            </p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center px-12 gap-4">
          <p className="text-sm uppercase tracking-[0.3em] text-[#0078D4] font-semibold">
            Equipo Outliers
          </p>
          <p className="text-3xl font-bold text-slate-900 text-center max-w-md">
            "El residuo de hoy es el megavatio de mañana."
          </p>
          <div className="flex items-center gap-3 mt-6 text-slate-600">
            <Github className="w-5 h-5" />
            <span className="text-sm font-mono">github.com/iRuperth/MegaWattle</span>
          </div>
          <div className="flex gap-2 mt-8">
            <span className="bg-[#26BDE2] text-white px-3 py-1 rounded-md text-xs font-semibold">ODS 6</span>
            <span className="bg-[#FFB900] text-white px-3 py-1 rounded-md text-xs font-semibold">ODS 7</span>
            <span className="bg-[#FD9D24] text-white px-3 py-1 rounded-md text-xs font-semibold">ODS 11</span>
            <span className="bg-[#BF8B2E] text-white px-3 py-1 rounded-md text-xs font-semibold">ODS 12</span>
          </div>
        </div>
      </div>
    </OfficeLayout>
  );
}

void Database; void Cloud; void Rocket; void Zap; // mantener imports estables
