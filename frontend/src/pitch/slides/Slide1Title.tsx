import { Droplets, Zap } from "lucide-react";
import { SlideLayout } from "../SlideLayout";

interface Props {
  compact?: boolean;
}

export function Slide1Title({ compact = false }: Props) {
  void compact;
  return (
    <SlideLayout variant="navy" planet>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-12">
        <img
          src="/logo.png"
          alt="MegaWattle"
          className="w-44 h-44 object-contain mb-6 drop-shadow-[0_0_40px_rgba(127,186,0,0.3)]"
        />
        <h1 className="text-7xl font-black tracking-tight mb-4">MegaWattle</h1>
        <p className="text-xl text-slate-200 mb-8 max-w-2xl">
          Transformando residuos en energía y agua para el futuro
        </p>
        <div className="flex gap-3 mb-12">
          <Badge color="ods6">
            <Droplets className="w-4 h-4" /> ODS 6 · Agua limpia
          </Badge>
          <Badge color="ods7">
            <Zap className="w-4 h-4" /> ODS 7 · Energía limpia
          </Badge>
        </div>
        <div className="flex flex-col items-center gap-1 text-slate-300">
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">Equipo 6</p>
          <p className="text-2xl font-semibold">Outliers</p>
          <p className="text-xs text-slate-400 mt-2 max-w-xl">
            Roberto Molero · Jonathan Brasales · Iris Amorim · Naizabeth Bermudez · Raúl Machaca
          </p>
        </div>
      </div>
      <div className="pb-6 text-center text-xs text-slate-400">
        Hackathon League for Social Good · Milán-Madrid 2026
      </div>
    </SlideLayout>
  );
}

function Badge({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "ods6" | "ods7";
}) {
  const cls =
    color === "ods6"
      ? "bg-[#26BDE2]/20 text-[#7DD3F8] border-[#26BDE2]/40"
      : "bg-[#FFB900]/20 text-[#FFD566] border-[#FFB900]/40";
  return (
    <span
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium ${cls}`}
    >
      {children}
    </span>
  );
}
