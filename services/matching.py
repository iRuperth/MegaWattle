import config
from services.calculos import (
    biogas_m3_anio,
    calcular_aporte_granja,
    co2_total_evitado_t,
    economia,
    energia_mwh_anio,
    porcentaje_demanda_cubierta,
)
from services.geo import haversine_km


def _granjas_dentro_de(cpd: dict, radio_km: float, tipo_animal: str | None) -> list[dict]:
    out = []
    for g in config.GRANJAS:
        if tipo_animal and g.get("tipo_animal") != tipo_animal:
            continue
        d = haversine_km(cpd["lat"], cpd["lon"], g["lat"], g["lon"])
        if d <= radio_km:
            aporte = calcular_aporte_granja(g)
            consumo_kwh = cpd.get("consumo_anual_gwh", 0) * 1000 * 1000
            pct = (aporte["mwh_aportados"] * 1000 / consumo_kwh * 100) if consumo_kwh else 0
            out.append(
                {
                    "id": g["id"],
                    "nombre": g["nombre"],
                    "tipo_animal": g["tipo_animal"],
                    "subtipo": g.get("subtipo"),
                    "municipio": g["municipio"],
                    "comarca": g.get("comarca"),
                    "ccaa": g["ccaa"],
                    "lat": g["lat"],
                    "lon": g["lon"],
                    "cabezas_agregadas": g["cabezas_agregadas"],
                    "distancia_km": round(d, 2),
                    "estiercol_t_anio": aporte["estiercol_t_anio"],
                    "biogas_m3_anio": aporte["biogas_m3_anio"],
                    "mwh_aportados": aporte["mwh_aportados"],
                    "co2eq_evitado_t": aporte["co2eq_evitado_t"],
                    "porcentaje_cpd": round(pct, 3),
                }
            )
    out.sort(key=lambda x: x["distancia_km"])
    return out


def match_cpds_granjas(
    cpd_ids: list[str], radio_km: float, tipo_animal: str | None = None
) -> dict:
    cpds = [c for c in config.CPDS if c["id"] in cpd_ids]
    por_cpd = []
    for cpd in cpds:
        granjas = _granjas_dentro_de(cpd, radio_km, tipo_animal)
        energia_total = sum(g["mwh_aportados"] for g in granjas)
        biogas_total = sum(g["biogas_m3_anio"] for g in granjas)
        # Usamos el tipo dominante para la composición CH4 promedio
        tipo_dom = (
            max({g["tipo_animal"] for g in granjas}, key=lambda t: sum(x["mwh_aportados"] for x in granjas if x["tipo_animal"] == t))
            if granjas
            else "porcino"
        )
        co2_total = co2_total_evitado_t(energia_total, biogas_total, tipo_dom)
        pct = porcentaje_demanda_cubierta(energia_total, cpd.get("consumo_anual_gwh", 0))
        eco = economia(energia_total)
        por_cpd.append(
            {
                "cpd_id": cpd["id"],
                "cpd_nombre": cpd["nombre"],
                "consumo_anual_gwh": cpd.get("consumo_anual_gwh", 0),
                "granjas": granjas,
                "metricas": {
                    "energia_mwh_anio": round(energia_total, 1),
                    "biogas_m3_anio": round(biogas_total),
                    "porcentaje_cubierto": round(pct, 2),
                    "co2eq_evitado_t": round(co2_total, 1),
                    "n_granjas": len(granjas),
                    **eco,
                },
            }
        )
    # Agregados globales
    energia_g = sum(p["metricas"]["energia_mwh_anio"] for p in por_cpd)
    co2_g = sum(p["metricas"]["co2eq_evitado_t"] for p in por_cpd)
    return {
        "radio_km": radio_km,
        "tipo_animal_filtro": tipo_animal,
        "por_cpd": por_cpd,
        "agregado": {
            "energia_mwh_anio": round(energia_g, 1),
            "co2eq_evitado_t": round(co2_g, 1),
            "n_cpds": len(por_cpd),
        },
    }
