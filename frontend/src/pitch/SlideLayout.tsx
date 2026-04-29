import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Variante de fondo: light (fondo gris-azulado claro), white (blanco), navy (fondo oscuro Microsoft) */
  variant?: "light" | "white" | "navy";
  /** Mostrar el sello del planeta difuminado de fondo */
  planet?: boolean;
}

export function SlideLayout({ children, variant = "light", planet = true }: Props) {
  const bg =
    variant === "navy"
      ? "bg-gradient-to-br from-[#0A192F] via-[#102A43] to-[#0E2A47] text-white"
      : variant === "white"
      ? "bg-white text-slate-900"
      : "bg-gradient-to-br from-[#F5F8FC] via-[#E8F1F8] to-[#DCE9F4] text-slate-900";

  return (
    <div className={`relative w-full h-full overflow-hidden ${bg}`}>
      {planet && <PlanetBackdrop variant={variant} />}
      {/* Co-branding: Microsoft × MegaWattle arriba a la izquierda */}
      <div className="absolute top-5 left-8 flex items-center gap-2.5 z-10">
        <div className="grid grid-cols-2 gap-0.5 w-4 h-4">
          <div className="bg-[#F25022]" />
          <div className="bg-[#7FBA00]" />
          <div className="bg-[#00A4EF]" />
          <div className="bg-[#FFB900]" />
        </div>
        <span
          className={`text-sm font-semibold ${
            variant === "navy" ? "text-white" : "text-slate-800"
          }`}
        >
          Microsoft
        </span>
        <span
          className={`text-sm font-light ${
            variant === "navy" ? "text-slate-400" : "text-slate-400"
          }`}
        >
          ×
        </span>
        <img
          src="/logo.png"
          alt="MegaWattle"
          className="w-5 h-5 object-contain"
        />
        <span
          className={`text-sm font-semibold ${
            variant === "navy" ? "text-white" : "text-slate-800"
          }`}
        >
          MegaWattle
        </span>
      </div>
      <div className="absolute top-6 right-8 text-xs opacity-50 z-10">
        <span className={variant === "navy" ? "text-slate-400" : "text-slate-500"}>
          Equipo Outliers
        </span>
      </div>
      <div className="relative z-10 w-full h-full flex flex-col">{children}</div>
    </div>
  );
}

function PlanetBackdrop({ variant }: { variant: "light" | "white" | "navy" }) {
  const planetOpacity = variant === "navy" ? 0.18 : 0.10;
  const planetColor =
    variant === "navy"
      ? "from-cyan-400 via-emerald-300 to-blue-500"
      : "from-emerald-300 via-sky-400 to-blue-500";
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Planeta principal — círculo grande difuminado abajo a la derecha */}
      <div
        className={`absolute -bottom-32 -right-32 w-[640px] h-[640px] rounded-full bg-gradient-to-br ${planetColor} blur-3xl`}
        style={{ opacity: planetOpacity }}
      />
      {/* Halo secundario arriba a la izquierda */}
      <div
        className="absolute -top-40 -left-32 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-emerald-200 via-sky-200 to-blue-300 blur-3xl"
        style={{ opacity: planetOpacity * 0.6 }}
      />
      {/* Líneas de cuadrícula muy sutiles para sensación tech */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: variant === "navy" ? 0.07 : 0.04 }}
      >
        <defs>
          <pattern id="grid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
}

export function SlideHeading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-4xl font-bold tracking-tight mb-2 flex items-center gap-3">
      <span className="block w-1.5 h-10 bg-gradient-to-b from-[#7FBA00] to-[#00A4EF] rounded-full" />
      {children}
    </h2>
  );
}
