import type { AiAnalysis, Cpd, MatchResult } from "../types";

export async function fetchCpds(): Promise<Cpd[]> {
  const res = await fetch("/api/cpds");
  if (!res.ok) throw new Error("CPDs fetch failed");
  return res.json();
}

export async function postMatch(
  cpdIds: string[],
  radioKm: number,
  tipoAnimal: string | null
): Promise<MatchResult> {
  const res = await fetch("/api/match", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ cpd_ids: cpdIds, radio_km: radioKm, tipo_animal: tipoAnimal }),
  });
  if (!res.ok) throw new Error("Match failed");
  return res.json();
}

export async function postAiAnalysis(parametros: any, resultados: MatchResult): Promise<AiAnalysis> {
  const ctrl = new AbortController();
  const timeoutId = setTimeout(() => ctrl.abort(), 90000); // 90s safety net
  try {
    const res = await fetch("/api/ai/analizar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ parametros, resultados }),
      signal: ctrl.signal,
    });
    if (!res.ok) throw new Error("AI analysis failed");
    return await res.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function fetchFuentes(): Promise<string> {
  const res = await fetch("/fuentes");
  if (!res.ok) throw new Error("Fuentes fetch failed");
  return res.text();
}
