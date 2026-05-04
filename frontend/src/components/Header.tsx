import { Droplets, Github, Info, Presentation, Zap, Sparkles, FileText } from "lucide-react";

interface Props {
  onOpenFuentes: () => void;
  onOpenPitch?: () => void;
  onOpenPitchVisual?: () => void;
  onOpenPitchOffice?: () => void;
}

export function Header({
  onOpenFuentes,
  onOpenPitch,
  onOpenPitchVisual,
  onOpenPitchOffice,
}: Props) {
  return (
    <header className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 text-white px-6 py-3 flex items-center justify-between shadow-lg border-b border-slate-700">
      <div className="flex items-center gap-3">
        <img
          src="/logo.png"
          alt="MegaWattle"
          className="w-20 h-20 -my-2 object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.18)]"
        />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tight leading-none">MegaWattle</h1>
          <span className="text-[11px] text-slate-400 mt-0.5">De residuo a megavatio</span>
        </div>
        <div className="hidden lg:flex items-center gap-2 ml-6 text-xs">
          <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ods6/20 text-ods6 border border-ods6/30">
            <Droplets className="w-3 h-3" /> ODS 6
          </span>
          <span className="flex items-center gap-1 px-2 py-1 rounded-md bg-ods7/20 text-ods7 border border-ods7/30">
            <Zap className="w-3 h-3" /> ODS 7
          </span>
        </div>
      </div>
      <div className="flex gap-1 items-center text-sm">
        {onOpenPitch && (
          <button
            onClick={onOpenPitch}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-gradient-to-r from-emerald-500/20 to-sky-500/20 hover:from-emerald-500/30 hover:to-sky-500/30 border border-emerald-400/30 transition"
            title="Pitch con texto completo"
          >
            <Presentation className="w-4 h-4" />
            Pitch
          </button>
        )}
        {onOpenPitchVisual && (
          <button
            onClick={onOpenPitchVisual}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 border border-white/15 transition"
            title="Pitch visual (menos texto, paso rápido)"
          >
            <Sparkles className="w-4 h-4" />
            Visual
          </button>
        )}
        {onOpenPitchOffice && (
          <button
            onClick={onOpenPitchOffice}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10 border border-white/15 transition"
            title="Pitch estilo Microsoft PowerPoint"
          >
            <FileText className="w-4 h-4" />
            Office
          </button>
        )}
        <button
          onClick={onOpenFuentes}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition"
        >
          <Info className="w-4 h-4" />
          Fuentes
        </button>
        <a
          href="https://github.com/iRuperth/MegaWattle"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-md hover:bg-white/10 transition"
        >
          <Github className="w-4 h-4" />
          GitHub
        </a>
      </div>
    </header>
  );
}
