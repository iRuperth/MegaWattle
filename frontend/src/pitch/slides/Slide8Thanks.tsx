import { Github, Heart, Mail } from "lucide-react";
import { SlideLayout } from "../SlideLayout";

interface Props {
  compact?: boolean;
}

export function Slide8Thanks({ compact = false }: Props) {
  void compact;
  return (
    <SlideLayout variant="navy" planet>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-12">
        <img
          src="/logo.png"
          alt="MegaWattle"
          className="w-56 h-56 object-contain mb-8 drop-shadow-[0_0_60px_rgba(127,186,0,0.5)]"
        />
        <h1 className="text-8xl font-black mb-3 bg-gradient-to-r from-emerald-300 via-sky-300 to-violet-300 bg-clip-text text-transparent">
          ¡Gracias!
        </h1>
        <p className="text-2xl font-semibold text-emerald-200 mb-10 tracking-wide">
          De residuo a megavatio
        </p>

        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <a
            href="https://github.com/iRuperth/MegaWattle"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition"
          >
            <Github className="w-4 h-4" />
            <span className="text-sm">github.com/iRuperth/MegaWattle</span>
          </a>
          <a
            href="mailto:devrup404@gmail.com"
            className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 rounded-xl transition"
          >
            <Mail className="w-4 h-4" />
            <span className="text-sm">Contactar</span>
          </a>
        </div>

        <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl px-8 py-5 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-2">
            Equipo Outliers
          </p>
          <p className="text-base text-slate-200 leading-relaxed">
            Roberto Molero · Jonathan Brasales · Iris Amorim · Naizabeth Bermudez · Raúl Machaca
          </p>
        </div>

        <div className="mt-10 flex items-center gap-2 text-xs text-slate-400">
          <Heart className="w-3 h-3 text-rose-400" />
          Hackathon League for Social Good · Milán-Madrid 2026 · ODS 6 + ODS 7
        </div>
      </div>
    </SlideLayout>
  );
}
