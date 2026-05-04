import { useEffect, useState } from "react";
import { AiAnalysisPanel } from "./components/AiAnalysisPanel";
import { CpdList } from "./components/CpdList";
import {
  LocationFilter,
  PresetsPanel,
  SearchControls,
} from "./components/FiltersPanel";
import { FuentesModal } from "./components/FuentesModal";
import { Header } from "./components/Header";
import { MapView } from "./components/MapView";
import { ResultsPanel } from "./components/ResultsPanel";
import { useStore } from "./lib/store";
import { OfficePitchView } from "./pitch/OfficePitchView";
import { PitchView } from "./pitch/PitchView";

type PitchMode = "off" | "text" | "visual" | "office";

function readMode(): PitchMode {
  if (typeof window === "undefined") return "off";
  const h = window.location.hash.replace(/^#/, "");
  const mode = h.split("&")[0];
  if (mode === "pitch") return "text";
  if (mode === "pitch-visual") return "visual";
  if (mode === "pitch-office") return "office";
  return "off";
}

export default function App() {
  const loadCpds = useStore((s) => s.loadCpds);
  const match = useStore((s) => s.match);
  const ai = useStore((s) => s.ai);
  const [fuentesOpen, setFuentesOpen] = useState(false);
  const [mode, setMode] = useState<PitchMode>(readMode);

  useEffect(() => {
    loadCpds();
  }, [loadCpds]);

  useEffect(() => {
    const onHash = () => setMode(readMode());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const enter = (m: Exclude<PitchMode, "off">) => {
    const hash = m === "text" ? "pitch" : m === "visual" ? "pitch-visual" : "pitch-office";
    window.location.hash = hash;
    setMode(m);
  };
  const exitPitch = () => {
    if (window.location.hash) {
      history.replaceState(null, "", window.location.pathname);
    }
    setMode("off");
  };

  if (mode === "text") return <PitchView onExit={exitPitch} compact={false} />;
  if (mode === "visual") return <PitchView onExit={exitPitch} compact={true} />;
  if (mode === "office") return <OfficePitchView onExit={exitPitch} />;

  return (
    <div className="h-screen flex flex-col">
      <Header
        onOpenFuentes={() => setFuentesOpen(true)}
        onOpenPitch={() => enter("text")}
        onOpenPitchVisual={() => enter("visual")}
        onOpenPitchOffice={() => enter("office")}
      />
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[380px_1fr] overflow-hidden">
        <aside className="bg-slate-100/50 border-r border-slate-200 overflow-y-auto p-4 space-y-4">
          <LocationFilter />
          <CpdList />
          <SearchControls />
          <PresetsPanel />
        </aside>
        <section className="flex flex-col overflow-hidden">
          <div
            className={`relative ${
              match ? "h-[45%] min-h-[300px] shrink-0" : "flex-1"
            }`}
          >
            <MapView />
            {!match && (
              <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 px-4 py-3 max-w-xs animate-fade-in">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold">Selecciona</span> uno o dos CPDs
                  (haz click en un marcador azul o en la lista lateral) y pulsa{" "}
                  <span className="font-semibold text-emerald-700">Buscar granjas</span>.
                </p>
              </div>
            )}
          </div>
          {match && (
            <div className="flex-1 overflow-y-auto bg-slate-50/40">
              <ResultsPanel />
              {ai && (
                <div className="px-4 pb-4">
                  <AiAnalysisPanel />
                </div>
              )}
            </div>
          )}
        </section>
      </main>
      <FuentesModal open={fuentesOpen} onClose={() => setFuentesOpen(false)} />
    </div>
  );
}
