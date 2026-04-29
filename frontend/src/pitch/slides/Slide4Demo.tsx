import { ExternalLink, MousePointer2, Sparkles } from "lucide-react";
import { SlideHeading, SlideLayout } from "../SlideLayout";

interface Props {
  compact?: boolean;
}

export function Slide4Demo({ compact = false }: Props) {
  return (
    <SlideLayout variant="white" planet={false}>
      <div
        className="px-12 py-10 grid gap-4 h-full min-h-0"
        style={{ gridTemplateRows: "auto auto 1fr auto auto" }}
      >
        <SlideHeading>El gemelo digital MegaWattle</SlideHeading>

        {!compact && (
          <p className="text-base text-slate-600 max-w-4xl">
            Plataforma web operativa: <strong>cualquier ayuntamiento o empresa</strong>{" "}
            puede simular la viabilidad de conectar un centro de datos con
            macrogranjas cercanas y ver el impacto en tiempo real.
          </p>
        )}
        {compact && <div />}

        {/* Captura — la imagen es el bloque visible, sin fondo extra */}
        <div className="flex items-center justify-center min-h-0">
          <img
            src="/pitch/demo.png"
            alt="MegaWattle dashboard"
            className="max-w-full max-h-full rounded-2xl border border-slate-200 shadow-2xl"
          />
        </div>

        {/* Features en fila horizontal */}
        <div className="grid grid-cols-4 gap-3">
          <Feature
            num="1"
            title="Filtros geográficos"
            desc={compact ? null : "CCAA → provincia → CPDs disponibles."}
          />
          <Feature
            num="2"
            title="Matching automático"
            desc={compact ? null : "Radio configurable, granjas que pueden alimentar al CPD."}
          />
          <Feature
            num="3"
            title="Métricas instantáneas"
            desc={compact ? null : "MWh/año, t CO₂eq evitadas, % demanda cubierta."}
          />
          <Feature
            num="4"
            title="Análisis con IA"
            desc={compact ? null : "Informe técnico, ambiental y económico en segundos."}
            highlight
          />
        </div>

        {/* Nota datos reales */}
        <div className="bg-slate-900 text-white rounded-xl px-4 py-2.5 text-sm flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-emerald-300 shrink-0" />
          <span className="text-emerald-300 font-semibold">Datos reales:</span>
          <span className="text-slate-300">
            30 CPDs públicos · 52 nodos ganaderos del Censo MAPA 2024 · 13 CCAA cubiertas.
          </span>
        </div>
      </div>
    </SlideLayout>
  );
}

function Feature({
  num,
  title,
  desc,
  highlight,
}: {
  num: string;
  title: string;
  desc: string | null;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        highlight
          ? "bg-gradient-to-br from-sky-50 to-violet-50 border-sky-200"
          : "bg-white border-slate-200"
      }`}
    >
      <div className="flex items-baseline gap-2 mb-1">
        <span
          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            highlight ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600"
          }`}
        >
          {num}
        </span>
        <h4 className="font-bold text-sm leading-tight">{title}</h4>
      </div>
      {desc && <p className="text-xs text-slate-600 ml-8 leading-tight">{desc}</p>}
    </div>
  );
}
