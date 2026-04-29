export interface Cpd {
  id: string;
  nombre: string;
  operador: string;
  ciudad: string;
  provincia: string;
  ccaa: string;
  lat: number;
  lon: number;
  potencia_it_mw: number;
  consumo_anual_gwh: number;
  pue?: number;
  estado?: string;
  fuente?: string;
}

export interface Granja {
  id: string;
  nombre: string;
  tipo_animal: "porcino" | "vacuno" | "avicola";
  subtipo?: string;
  cabezas_agregadas: number;
  municipio: string;
  comarca?: string;
  provincia?: string;
  ccaa: string;
  lat: number;
  lon: number;
  estiercol_t_anio: number;
  fuente?: string;
}

export interface GranjaMatch extends Granja {
  distancia_km: number;
  biogas_m3_anio: number;
  mwh_aportados: number;
  co2eq_evitado_t: number;
  porcentaje_cpd: number;
}

export interface Metricas {
  energia_mwh_anio: number;
  biogas_m3_anio: number;
  porcentaje_cubierto: number;
  co2eq_evitado_t: number;
  n_granjas: number;
  potencia_kw: number;
  capex_eur: number;
  opex_eur_anio: number;
  ingresos_eur_anio: number;
  margen_eur_anio: number;
  payback_anios: number | null;
}

export interface CpdMatch {
  cpd_id: string;
  cpd_nombre: string;
  consumo_anual_gwh: number;
  granjas: GranjaMatch[];
  metricas: Metricas;
}

export interface MatchResult {
  radio_km: number;
  tipo_animal_filtro: string | null;
  por_cpd: CpdMatch[];
  agregado: {
    energia_mwh_anio: number;
    co2eq_evitado_t: number;
    n_cpds: number;
  };
}

export interface ChartSpec {
  type: "bar" | "doughnut" | "pie" | "line";
  data: any;
  options?: any;
}

export interface AiAnalysis {
  resumen_ejecutivo: string;
  viabilidad_tecnica: {
    valoracion: "alta" | "media" | "baja";
    explicacion: string;
    puntos_clave: string[];
  };
  impacto_ambiental: {
    narrativa: string;
    comparacion_visual: string;
    chart: ChartSpec;
  };
  viabilidad_economica: {
    narrativa: string;
    chart: ChartSpec;
  };
  recomendaciones: string[];
  riesgos: string[];
  fuentes_citadas: string[];
  _modo?: "live" | "cache" | "fallback";
  _error?: string;
}
