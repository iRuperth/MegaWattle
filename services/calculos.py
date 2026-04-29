"""Cálculos energéticos y ambientales del biogás de estiércol.

Todas las fórmulas están en docs/fuentes.md con referencias citables.
"""

import config

F = config.FACTORES


def estiercol_t_anio(cabezas: int, tipo_animal: str, subtipo: str | None = None) -> float:
    """Toneladas de estiércol/año a partir de cabezas y tipo animal."""
    key = f"{tipo_animal}_{subtipo}" if subtipo else tipo_animal
    kg_dia = F["estiercol_kg_animal_dia"].get(key) or F["estiercol_kg_animal_dia"].get(tipo_animal, 0)
    return cabezas * kg_dia * 365 / 1000


def biogas_m3_anio(estiercol_t: float, tipo_animal: str) -> float:
    factor = F["biogas_m3_por_tonelada"].get(tipo_animal, 25)
    return estiercol_t * factor


def energia_mwh_anio(biogas_m3: float, tipo_animal: str) -> float:
    """MWh eléctricos/año desde biogás vía cogeneración."""
    pct_ch4 = F["metano_porcentaje"].get(tipo_animal, 0.6)
    kwh = biogas_m3 * pct_ch4 * F["kwh_por_m3_metano"] * F["eficiencia_electrica_chp"]
    return kwh / 1000


def porcentaje_demanda_cubierta(energia_mwh: float, consumo_gwh: float) -> float:
    if consumo_gwh <= 0:
        return 0
    return min(100.0, energia_mwh / (consumo_gwh * 1000) * 100)


def co2_evitado_red_t(energia_mwh: float) -> float:
    return energia_mwh * F["factor_emision_red_kg_co2_kwh"]  # MWh × (kg/kWh) = t


def co2eq_metano_evitado_t(biogas_m3: float, tipo_animal: str) -> float:
    pct_ch4 = F["metano_porcentaje"].get(tipo_animal, 0.6)
    ch4_t = biogas_m3 * pct_ch4 * F["densidad_metano_t_m3"]
    return ch4_t * F["metano_gwp_100"]


def co2_total_evitado_t(energia_mwh: float, biogas_m3: float, tipo_animal: str) -> float:
    return co2_evitado_red_t(energia_mwh) + co2eq_metano_evitado_t(biogas_m3, tipo_animal)


def equivalente_coches(co2_t: float) -> int:
    return int(co2_t * 1000 / F["co2_kg_por_coche_anio"])


def potencia_planta_kw(energia_mwh: float) -> float:
    if F["horas_operacion_anio"] <= 0:
        return 0
    return energia_mwh * 1000 / F["horas_operacion_anio"]


def economia(energia_mwh: float) -> dict:
    pot_kw = potencia_planta_kw(energia_mwh)
    capex = pot_kw * F["capex_eur_kw_planta_biogas"]
    opex = pot_kw * F["opex_eur_kw_anio"]
    ingresos = energia_mwh * 1000 * F["precio_kwh_industrial_eur"]
    margen = ingresos - opex
    payback = capex / margen if margen > 0 else None
    return {
        "potencia_kw": round(pot_kw, 1),
        "capex_eur": round(capex),
        "opex_eur_anio": round(opex),
        "ingresos_eur_anio": round(ingresos),
        "margen_eur_anio": round(margen),
        "payback_anios": round(payback, 2) if payback else None,
    }


def calcular_aporte_granja(granja: dict) -> dict:
    """Calcula los outputs energéticos y ambientales de una granja agregada."""
    tipo = granja.get("tipo_animal", "porcino")
    estiercol = granja.get("estiercol_t_anio")
    if not estiercol:
        estiercol = estiercol_t_anio(
            granja.get("cabezas_agregadas", 0), tipo, granja.get("subtipo")
        )
    biogas = biogas_m3_anio(estiercol, tipo)
    energia = energia_mwh_anio(biogas, tipo)
    co2 = co2_total_evitado_t(energia, biogas, tipo)
    return {
        "estiercol_t_anio": round(estiercol),
        "biogas_m3_anio": round(biogas),
        "mwh_aportados": round(energia, 1),
        "co2eq_evitado_t": round(co2, 1),
    }
