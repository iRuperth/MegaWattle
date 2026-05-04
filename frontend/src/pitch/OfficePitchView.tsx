import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  OfficeSlide1Title,
  OfficeSlide2Problem,
  OfficeSlide3Solution,
  OfficeSlide4Demo,
  OfficeSlide5Impact,
  OfficeSlide6Roadmap,
  OfficeSlide7Tech,
  OfficeSlide8Thanks,
} from "./officeSlides";

const SLIDES = [
  OfficeSlide1Title,
  OfficeSlide2Problem,
  OfficeSlide3Solution,
  OfficeSlide4Demo,
  OfficeSlide5Impact,
  OfficeSlide6Roadmap,
  OfficeSlide7Tech,
  OfficeSlide8Thanks,
];

interface Props {
  onExit: () => void;
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

export function OfficePitchView({ onExit }: Props) {
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
        <Slide />
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-50 bg-black/40 backdrop-blur rounded-full px-3 py-1.5 text-white text-sm">
        <button
          onClick={() => setIdx((i) => Math.max(i - 1, 0))}
          disabled={idx === 0}
          className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-xs tabular-nums">{idx + 1} / {total}</span>
        <button
          onClick={() => setIdx((i) => Math.min(i + 1, total - 1))}
          disabled={idx === total - 1}
          className="p-1.5 rounded-full hover:bg-white/20 disabled:opacity-30"
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

      <div className="absolute top-0 left-0 right-0 h-1 bg-black/10 z-50">
        <div
          className="h-full bg-[#0078D4] transition-all duration-300"
          style={{ width: `${((idx + 1) / total) * 100}%` }}
        />
      </div>
    </div>
  );
}
