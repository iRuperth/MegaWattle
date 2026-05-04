import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Slide1Title } from "./slides/Slide1Title";
import { Slide2Problem } from "./slides/Slide2Problem";
import { Slide3Solution } from "./slides/Slide3Solution";
import { Slide4Demo } from "./slides/Slide4Demo";
import { Slide5Impact } from "./slides/Slide5Impact";
import { Slide6Roadmap } from "./slides/Slide6Roadmap";
import { Slide7Tech } from "./slides/Slide7Tech";
import { Slide8Thanks } from "./slides/Slide8Thanks";

const SLIDES = [
  Slide1Title,
  Slide2Problem,
  Slide3Solution,
  Slide4Demo,
  Slide5Impact,
  Slide6Roadmap,
  Slide7Tech,
  Slide8Thanks,
];

interface Props {
  onExit: () => void;
  compact?: boolean;
}

function readInitialSlide(total: number): number {
  if (typeof window === "undefined") return 0;
  const hash = window.location.hash.replace(/^#/, "");
  const parts = hash.split("&");
  const sParam = parts.find((p) => p.startsWith("s="));
  if (!sParam) return 0;
  const n = parseInt(sParam.slice(2), 10);
  if (isNaN(n)) return 0;
  return Math.max(0, Math.min(n - 1, total - 1));
}

export function PitchView({ onExit, compact = false }: Props) {
  const [idx, setIdx] = useState(() => readInitialSlide(SLIDES.length));
  const Slide = SLIDES[idx];
  const total = SLIDES.length;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        setIdx((i) => Math.min(i + 1, total - 1));
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        setIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Escape") {
        onExit();
      } else if (e.key === "Home") {
        setIdx(0);
      } else if (e.key === "End") {
        setIdx(total - 1);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onExit, total]);

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="w-full h-full">
        <Slide compact={compact} />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 bg-black/40 backdrop-blur rounded-full px-3 py-1.5 text-white text-sm">
        <button
          onClick={() => setIdx((i) => Math.max(i - 1, 0))}
          disabled={idx === 0}
          className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs tabular-nums">
          {idx + 1} / {total}
        </span>
        <button
          onClick={() => setIdx((i) => Math.min(i + 1, total - 1))}
          disabled={idx === total - 1}
          className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <button
        onClick={onExit}
        className="absolute top-4 right-4 z-50 bg-black/40 backdrop-blur hover:bg-black/60 text-white rounded-full p-2 transition"
        title="Salir (Esc)"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="absolute top-0 left-0 right-0 h-1 bg-black/20 z-50">
        <div
          className="h-full bg-gradient-to-r from-[#7FBA00] to-[#00A4EF] transition-all duration-300"
          style={{ width: `${((idx + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
