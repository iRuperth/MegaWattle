import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  slideNumber?: number;
  totalSlides?: number;
}

/**
 * Layout estilo Microsoft PowerPoint hand-made:
 * - Fondo blanco limpio
 * - Logo Microsoft top-left con cuadrados de color + texto
 * - Barra verde de acento a la izquierda del título
 * - Tipografía Segoe-style (sans-serif system)
 * - Footer con número de slide y branding sutil
 */
export function OfficeLayout({ children, slideNumber, totalSlides }: Props) {
  return (
    <div className="relative w-full h-full bg-white text-slate-900 overflow-hidden">
      {/* Logo Microsoft + co-branding (top-left) */}
      <div className="absolute top-6 left-10 flex items-center gap-2.5 z-10">
        <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
          <div className="bg-[#F25022]" />
          <div className="bg-[#7FBA00]" />
          <div className="bg-[#00A4EF]" />
          <div className="bg-[#FFB900]" />
        </div>
        <span className="text-base font-semibold text-slate-900">Microsoft</span>
        <span className="text-base font-light text-slate-300">×</span>
        <img src="/logo.png" alt="MegaWattle" className="w-6 h-6 object-contain" />
        <span className="text-base font-semibold text-slate-900">MegaWattle</span>
      </div>

      {/* Sutil corner decoration */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#0078D4]/5 to-transparent" />

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>

      {/* Footer */}
      <div className="absolute bottom-5 left-10 right-10 flex items-center justify-between text-xs text-slate-400 z-10">
        <span>MegaWattle · Equipo Outliers · Hackathon League for Social Good 2026</span>
        {slideNumber && totalSlides && (
          <span className="font-mono">
            {String(slideNumber).padStart(2, "0")} / {String(totalSlides).padStart(2, "0")}
          </span>
        )}
      </div>
    </div>
  );
}

export function OfficeHeading({
  number,
  children,
}: {
  number?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 mb-6">
      {number && (
        <span className="text-7xl font-black text-[#0078D4]/20 tabular-nums leading-none">
          {number}
        </span>
      )}
      <div className="flex items-center gap-3">
        <span className="block w-1.5 h-12 bg-[#7FBA00] rounded-sm" />
        <h2 className="text-4xl font-bold tracking-tight text-slate-900">{children}</h2>
      </div>
    </div>
  );
}
