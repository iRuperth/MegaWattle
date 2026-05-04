import { useMemo } from "react";
import { Filter, MapPin, Search, Sparkles } from "lucide-react";
import { useStore } from "../lib/store";

const PRESETS: { key: string; label: string; ccaa: string; radio: number; emoji: string }[] = [
  { key: "aragon", label: "Aragón", ccaa: "Aragón", radio: 50, emoji: "🐷" },
  { key: "madrid", label: "Madrid", ccaa: "Madrid", radio: 80, emoji: "🏙️" },
  { key: "cataluna", label: "Cataluña", ccaa: "Cataluña", radio: 50, emoji: "🐂" },
  { key: "castilla-leon", label: "C. y León", ccaa: "Castilla y León", radio: 60, emoji: "🥛" },
];

export function LocationFilter() {
  const { cpds, ccaa, provincia, setCcaa, setProvincia } = useStore();

  const ccaas = useMemo(
    () => [...new Set(cpds.map((c) => c.ccaa))].sort(),
    [cpds]
  );
  const provincias = useMemo(
    () =>
      [
        ...new Set(
          cpds.filter((c) => !ccaa || c.ccaa === ccaa).map((c) => c.provincia)
        ),
      ].sort(),
    [cpds, ccaa]
  );

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-sky-100 text-sky-700 text-xs font-bold flex items-center justify-center">1</span>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
          Filtrar centros de datos
        </h2>
      </div>
      <label className="block text-xs font-medium text-slate-600 mb-1">Comunidad Autónoma</label>
      <select
        value={ccaa}
        onChange={(e) => setCcaa(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm mb-3 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
      >
        <option value="">— Todas las comunidades autónomas —</option>
        {ccaas.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <label className="block text-xs font-medium text-slate-600 mb-1">Provincia</label>
      <select
        value={provincia}
        onChange={(e) => setProvincia(e.target.value)}
        className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
      >
        <option value="">— Todas las provincias —</option>
        {provincias.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
    </section>
  );
}

export function SearchControls() {
  const { radioKm, tipoAnimal, matching, setRadioKm, setTipoAnimal, runMatch } = useStore();

  return (
    <section className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">3</span>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-700">
          Parámetros de búsqueda
        </h2>
      </div>
      <div className="mb-3">
        <div className="flex items-baseline justify-between mb-1">
          <label className="text-xs font-medium text-slate-600 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> Radio
          </label>
          <span className="text-sm font-semibold text-slate-900">{radioKm} km</span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          value={radioKm}
          onChange={(e) => setRadioKm(parseFloat(e.target.value))}
          className="w-full accent-emerald-600"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>5 km</span><span>50 km</span><span>100 km</span>
        </div>
      </div>
      <div className="mb-3">
        <label className="text-xs font-medium text-slate-600 mb-1 flex items-center gap-1">
          <Filter className="w-3 h-3" /> Tipo animal
        </label>
        <select
          value={tipoAnimal}
          onChange={(e) => setTipoAnimal(e.target.value)}
          className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">— Todos los animales —</option>
          <option value="porcino">🐷 Porcino</option>
          <option value="vacuno">🐂 Vacuno</option>
          <option value="avicola">🐔 Avícola</option>
        </select>
      </div>
      <button
        onClick={() => runMatch()}
        disabled={matching}
        className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg py-2.5 flex items-center justify-center gap-2 transition shadow-sm shadow-emerald-600/20"
      >
        {matching ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Buscando…
          </>
        ) : (
          <>
            <Search className="w-4 h-4" /> Buscar granjas
          </>
        )}
      </button>
    </section>
  );
}

export function PresetsPanel() {
  const applyPreset = useStore((s) => s.applyPreset);
  return (
    <section className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-200 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-amber-600" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-amber-900">
          Demos rápidas
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.key}
            onClick={() => applyPreset(p.ccaa, p.radio)}
            className="bg-white hover:bg-amber-100 border border-amber-200 rounded-lg py-2 px-2 text-xs font-medium flex flex-col items-center gap-1 transition shadow-sm"
          >
            <span className="text-lg">{p.emoji}</span>
            <span className="text-slate-700">{p.label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
