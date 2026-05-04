import { Code2, Github, Search, Sparkles, Video, Wand2 } from "lucide-react";
import { SlideHeading, SlideLayout } from "../SlideLayout";

const TOOLS = [
  {
    name: "Microsoft Copilot",
    use: "Brainstorming inicial, refinado de textos del problema y propuestas de copy del pitch.",
    color: "from-[#0078D4] to-[#50E6FF]",
    Logo: CopilotLogo,
  },
  {
    name: "Word + PowerPoint",
    use: "Documentación, abstracts, ficha resumen y deck inicial de presentación.",
    color: "from-[#185ABD] to-[#2B7CD3]",
    Logo: OfficeLogo,
  },
  {
    name: "Visual Studio Code",
    use: "IDE para todo el código: backend Flask + frontend React + TypeScript.",
    color: "from-[#0066B8] to-[#007ACC]",
    Logo: VSCodeLogo,
  },
  {
    name: "GitHub",
    use: "Versionado y repositorio público del proyecto: iRuperth/MegaWattle.",
    color: "from-slate-700 to-slate-900",
    Logo: GitHubLogo,
  },
  {
    name: "Microsoft Clipchamp",
    use: "Edición del vídeo demo y vídeos de las fases de la solución.",
    color: "from-[#7B68EE] to-[#9D7CF5]",
    Logo: ClipchampLogo,
  },
  {
    name: "Microsoft Bing",
    use: "Investigación de datos públicos (MAPA, IDAE, REE) e Image Creator.",
    color: "from-[#008373] to-[#00B294]",
    Logo: BingLogo,
  },
  {
    name: "Azure AI Foundry",
    use: "Modelo de IA generativa que produce el informe estructurado.",
    color: "from-[#0078D4] to-[#33B0FF]",
    Logo: AzureLogo,
  },
];

interface Props {
  compact?: boolean;
}

export function Slide7Tech({ compact = false }: Props) {
  return (
    <SlideLayout variant="light">
      <div className="flex-1 px-12 py-10 flex flex-col">
        <SlideHeading>Herramientas Microsoft utilizadas</SlideHeading>
        {!compact && (
          <p className="text-lg text-slate-600 mb-5 max-w-4xl">
            El ecosistema Microsoft ha sido la <strong>columna vertebral</strong> del
            proyecto: investigación, documentación, código, vídeo e IA generativa
            se apoyan en sus herramientas a lo largo de todas las fases.
          </p>
        )}

        <div className="grid grid-cols-4 grid-rows-2 gap-4 flex-1">
          {TOOLS.map((t) => (
            <ToolCard key={t.name} {...t} compact={compact} />
          ))}
          <FeaturedCard compact={compact} />
        </div>
      </div>
    </SlideLayout>
  );
}

function ToolCard({
  name,
  use,
  color,
  Logo,
  compact,
}: {
  name: string;
  use: string;
  color: string;
  Logo: React.ComponentType;
  compact?: boolean;
}) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm flex flex-col">
      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-md mb-3`}
      >
        <Logo />
      </div>
      <h3 className="font-bold text-slate-900 mb-1.5 text-base leading-tight">{name}</h3>
      {!compact && <p className="text-sm text-slate-600 leading-relaxed">{use}</p>}
    </div>
  );
}

function FeaturedCard({ compact }: { compact?: boolean }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-[#0078D4] text-white p-5 shadow-md flex flex-col justify-center">
      <div className="flex items-center gap-2 mb-3">
        <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
          <div className="bg-[#F25022]" />
          <div className="bg-[#7FBA00]" />
          <div className="bg-[#00A4EF]" />
          <div className="bg-[#FFB900]" />
        </div>
        <span className="text-xs font-bold tracking-wide uppercase opacity-80">
          Stack Microsoft
        </span>
      </div>
      <p className="text-lg font-bold mb-1">Microsoft como motor</p>
      {!compact && (
        <p className="text-sm opacity-80 leading-relaxed">
          Cada fase del proyecto se apoya en una herramienta del ecosistema. Listo
          para escalar y desplegar en Azure.
        </p>
      )}
    </div>
  );
}

/* ──────────────────  Logos / Iconos  ────────────────── */
function CopilotLogo() {
  return <Sparkles className="w-8 h-8 text-white" />;
}
function OfficeLogo() {
  return (
    <div className="flex items-center gap-0.5 text-white font-black text-2xl tracking-tighter">
      <span>W</span>
      <span className="text-orange-300">P</span>
    </div>
  );
}
function VSCodeLogo() {
  return <Code2 className="w-8 h-8 text-white" />;
}
function GitHubLogo() {
  return <Github className="w-8 h-8 text-white" />;
}
function ClipchampLogo() {
  return <Video className="w-8 h-8 text-white" />;
}
function BingLogo() {
  return <Search className="w-8 h-8 text-white" />;
}
function AzureLogo() {
  return <Wand2 className="w-8 h-8 text-white" />;
}
