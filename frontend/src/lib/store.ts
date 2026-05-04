import { create } from "zustand";
import type { AiAnalysis, Cpd, MatchResult } from "../types";
import { fetchCpds, postAiAnalysis, postMatch } from "./api";

interface State {
  cpds: Cpd[];
  loadingCpds: boolean;
  ccaa: string;
  provincia: string;
  selectedCpdIds: Set<string>;
  radioKm: number;
  tipoAnimal: string;
  match: MatchResult | null;
  matching: boolean;
  ai: AiAnalysis | null;
  aiLoading: boolean;
  loadCpds: () => Promise<void>;
  setCcaa: (v: string) => void;
  setProvincia: (v: string) => void;
  toggleCpd: (id: string) => void;
  setRadioKm: (v: number) => void;
  setTipoAnimal: (v: string) => void;
  runMatch: () => Promise<void>;
  runAi: () => Promise<void>;
  applyPreset: (ccaa: string, radioKm: number) => Promise<void>;
  reset: () => void;
}

export const useStore = create<State>((set, get) => ({
  cpds: [],
  loadingCpds: false,
  ccaa: "",
  provincia: "",
  selectedCpdIds: new Set(),
  radioKm: 30,
  tipoAnimal: "",
  match: null,
  matching: false,
  ai: null,
  aiLoading: false,

  loadCpds: async () => {
    set({ loadingCpds: true });
    try {
      const cpds = await fetchCpds();
      set({ cpds, loadingCpds: false });
    } catch (e) {
      console.error(e);
      set({ loadingCpds: false });
    }
  },

  setCcaa: (v) => set({ ccaa: v, provincia: "" }),
  setProvincia: (v) => set({ provincia: v }),

  toggleCpd: (id) => {
    const sel = new Set(get().selectedCpdIds);
    if (sel.has(id)) {
      sel.delete(id);
    } else {
      if (sel.size >= 2) {
        const first = sel.values().next().value as string;
        sel.delete(first);
      }
      sel.add(id);
    }
    set({ selectedCpdIds: sel });
  },

  setRadioKm: (v) => set({ radioKm: v }),
  setTipoAnimal: (v) => set({ tipoAnimal: v }),

  runMatch: async () => {
    const { selectedCpdIds, radioKm, tipoAnimal } = get();
    if (selectedCpdIds.size === 0) return;
    set({ matching: true, ai: null });
    try {
      const match = await postMatch(
        [...selectedCpdIds],
        radioKm,
        tipoAnimal || null
      );
      set({ match, matching: false });
    } catch (e) {
      console.error(e);
      set({ matching: false });
    }
  },

  runAi: async () => {
    const { match, ccaa, tipoAnimal, radioKm, selectedCpdIds } = get();
    if (!match) return;
    set({ aiLoading: true });
    try {
      const ai = await postAiAnalysis(
        {
          ccaa: ccaa || null,
          tipo_animal: tipoAnimal || null,
          radio_km: radioKm,
          cpd_ids: [...selectedCpdIds],
        },
        match
      );
      set({ ai, aiLoading: false });
    } catch (e) {
      console.error(e);
      set({ aiLoading: false });
    }
  },

  applyPreset: async (ccaa, radioKm) => {
    const cpds = get().cpds;
    const ids = new Set(cpds.filter((c) => c.ccaa === ccaa).map((c) => c.id));
    set({
      ccaa,
      provincia: "",
      tipoAnimal: "",
      radioKm,
      selectedCpdIds: ids,
    });
    await get().runMatch();
  },

  reset: () =>
    set({
      ccaa: "",
      provincia: "",
      selectedCpdIds: new Set(),
      tipoAnimal: "",
      radioKm: 30,
      match: null,
      ai: null,
    }),
}));
