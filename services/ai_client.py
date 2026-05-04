"""Cliente de IA generativa para producir análisis estructurados de viabilidad biogás-CPD.

Backend desplegable sobre Azure AI Foundry. La integración actual del MVP usa
el SDK de Anthropic como cliente compatible (mismo patrón de Messages API y
prompt caching) y puede sustituirse por azure-ai-inference apuntando al
endpoint de Azure sin tocar el resto del código — el contrato de entrada/salida
JSON es idéntico.
"""

import json
import re
from pathlib import Path

import anthropic

import config

_client = None


def get_client() -> anthropic.Anthropic | None:
    global _client
    if _client is not None:
        return _client
    if not config.ANTHROPIC_API_KEY:
        return None
    _client = anthropic.Anthropic(api_key=config.ANTHROPIC_API_KEY)
    return _client


SYSTEM_PROMPT = """Eres un analista energético-ambiental especializado en biogás, cogeneración y economía circular agroganadera en España. Tu rol es analizar emparejamientos entre macrogranjas y centros de procesamiento de datos (CPDs) y evaluar su viabilidad técnica, ambiental y económica.

CONTEXTO DEL PROYECTO MEGAWATTLE:
MegaWattle conecta macrogranjas españolas (con problemas de gestión de purines/estiércol que contaminan acuíferos — España tiene procedimiento UE abierto por incumplimiento de la Directiva de Nitratos 91/676/CEE) con centros de datos cercanos (que disparan demanda eléctrica). El estiércol se transforma en biogás vía digestión anaerobia, que mediante cogeneración (CHP) genera electricidad para alimentar los CPDs. Doble impacto: ODS 6 (agua limpia, evita lixiviados de nitratos) + ODS 7 (energía limpia y asequible) + bonus crítico: el metano evitado tiene un GWP-100 de 28 (IPCC AR6) — es 28 veces más potente que el CO2.

FACTORES TÉCNICOS QUE DEBES USAR (no inventes otros):
- Estiércol: porcino cebo 4.5 kg/animal/día; vacuno leche 55 kg/día; vacuno carne 30 kg/día; avícola broiler 0.08 kg/día.
- Biogás por t estiércol: porcino 25 m³; vacuno 30 m³; avícola 90 m³.
- %CH4 en biogás: porcino 65%; vacuno 60%; avícola 65%.
- Poder calorífico inferior CH4: 9.9 kWh/m³.
- Eficiencia eléctrica cogeneración: 0.38.
- Factor emisión red española 2023 (REE/MITECO): 0.19 kg CO2/kWh.
- GWP-100 metano: 28 (IPCC AR6).
- CAPEX planta biogás: ~4.500 €/kW eléctrico (IDAE/IRENA).
- OPEX: ~180 €/kW·año.
- Precio kWh industrial: ~0.13 €/kWh (MITECO).
- Radio transporte estiércol viable: hasta 25-30 km. Línea eléctrica MT: hasta 50 km.

FUENTES CITABLES (usa solo estas):
- IDAE — Biomasa: Digestores Anaerobios (2007); Plan de Energías Renovables 2021-2030
- MITECO — Inventario Nacional de Emisiones GEI; Plan Nacional Directiva Nitratos
- IPCC AR6 — WG-I Cap. 7
- IEA Bioenergy Task 37 — Manure utilization 2025
- IEA — Outlook for Biogas and Biomethane 2020
- REE — Mix eléctrico español 2023
- IRENA — Renewable Power Generation Costs 2023
- Comisión Europea — Procedimiento contra España por Directiva Nitratos
- DATADISTA — Datos macrogranjas porcino + contaminación nitratos

REGLAS DE COMUNICACIÓN:
- Eres riguroso, conciso y orientado a la acción. NUNCA inventes cifras: usa solo los números que recibes calculados en los datos del usuario.
- Cuando comparas impactos, usa equivalencias intuitivas (coches sacados de circulación, hogares alimentados, piscinas olímpicas evitadas).
- Sé crítico cuando los números no salgan: si el % de demanda cubierta es bajo (<5%), dilo claramente y justifica por qué aún tiene sentido (metano evitado, agricultura circular).

FORMATO DE SALIDA OBLIGATORIO:
Devuelves SIEMPRE un único objeto JSON válido (sin markdown, sin ```json, sin texto antes ni después). Sigue exactamente este schema:

{
  "resumen_ejecutivo": "string, 2-3 frases potentes apropiadas para abrir un pitch",
  "viabilidad_tecnica": {
    "valoracion": "alta" | "media" | "baja",
    "explicacion": "string, 4-6 frases",
    "puntos_clave": ["string", "string", "string"]
  },
  "impacto_ambiental": {
    "narrativa": "string, 3-5 frases destacando metano evitado",
    "comparacion_visual": "string del estilo 'equivale a sacar X coches de circulación'",
    "chart": {
      "type": "bar",
      "data": {
        "labels": ["CO2 red evitado", "CH4 evitado (CO2eq)", "Total"],
        "datasets": [{
          "label": "t CO2eq/año",
          "data": [<num>, <num>, <num>],
          "backgroundColor": ["#0ea5e9", "#10b981", "#6366f1"]
        }]
      },
      "options": {
        "responsive": true,
        "plugins": {"legend": {"display": false}},
        "scales": {"y": {"beginAtZero": true}}
      }
    }
  },
  "viabilidad_economica": {
    "narrativa": "string, 3-5 frases sobre payback y CAPEX",
    "chart": {
      "type": "doughnut",
      "data": {
        "labels": ["CAPEX inicial", "OPEX 10 años", "Ingresos 10 años"],
        "datasets": [{
          "data": [<num>, <num>, <num>],
          "backgroundColor": ["#ef4444", "#f59e0b", "#10b981"]
        }]
      },
      "options": {"responsive": true}
    }
  },
  "recomendaciones": ["string", "string", "string"],
  "riesgos": ["string", "string"],
  "fuentes_citadas": ["string", "string", "string"]
}

Los valores numéricos en los charts vienen de los datos calculados que recibes — no los inventes. Si un dato no se puede calcular, usa 0."""


def _user_prompt(parametros: dict, resultados: dict) -> str:
    return f"""Analiza el siguiente escenario MegaWattle:

PARÁMETROS DE BÚSQUEDA:
{json.dumps(parametros, ensure_ascii=False, indent=2)}

RESULTADOS YA CALCULADOS POR EL SISTEMA (usa estos valores, no recalcules):
{json.dumps(resultados, ensure_ascii=False, indent=2)}

Genera el JSON de análisis siguiendo el schema definido. Usa los valores numéricos exactos de los resultados calculados. Para los charts:
- impacto_ambiental.chart.data.datasets[0].data debe contener:
  [CO2 red evitado, CH4 evitado expresado como CO2eq, total CO2eq evitado]
  (Nota: total = CO2 red + CH4 evitado en CO2eq. Estima el desglose si solo recibes el total: ~85% del total suele ser metano evitado.)
- viabilidad_economica.chart.data.datasets[0].data debe contener:
  [CAPEX, OPEX × 10, Ingresos × 10] en euros."""


def _strip_json(text: str) -> str:
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
    return text.strip()


def _cache_path(parametros: dict) -> Path | None:
    ccaa = (parametros.get("ccaa") or "").lower().replace(" ", "-")
    animal = parametros.get("tipo_animal") or ""
    if not ccaa:
        return None
    name = f"{ccaa}_{animal}.json" if animal else f"{ccaa}.json"
    p = config.DATA_DIR / "cache_ai" / name
    return p if p.exists() else None


def _build_fallback(parametros: dict, resultados: dict) -> dict:
    """Análisis de respaldo si la API falla o no hay clave configurada."""
    agg = resultados.get("agregado", {})
    n_cpd = agg.get("n_cpds", 0)
    energia = agg.get("energia_mwh_anio", 0)
    co2 = agg.get("co2eq_evitado_t", 0)
    coches = int(co2 * 1000 / 4600) if co2 else 0
    co2_red = round(energia * 0.19)
    ch4 = max(round(co2 - co2_red), 0)
    return {
        "resumen_ejecutivo": (
            f"Analizando {n_cpd} centro(s) de datos. La energía recuperada del estiércol asciende a "
            f"{energia:,.0f} MWh/año, evitando {co2:,.0f} t CO2eq/año. Modo offline activo (sin clave API)."
        ),
        "viabilidad_tecnica": {
            "valoracion": "media",
            "explicacion": (
                "El emparejamiento técnico es viable mediante digestión anaerobia + cogeneración. "
                "La distancia entre granjas y CPD está dentro del radio operativo. "
                "Se requiere planta de biogás dimensionada al volumen agregado de estiércol."
            ),
            "puntos_clave": [
                "Tecnología madura (CHP biogás)",
                "Distribución agrícola favorable",
                "Integración eléctrica MT viable",
            ],
        },
        "impacto_ambiental": {
            "narrativa": (
                f"El proyecto evita {co2:,.0f} t CO2eq/año, dominado por la captura de metano (GWP 28). "
                "Adicionalmente reduce nitratos en aguas, alineado con ODS 6 y 7."
            ),
            "comparacion_visual": f"Equivale a sacar {coches:,} coches de circulación cada año",
            "chart": {
                "type": "bar",
                "data": {
                    "labels": ["CO2 red", "CH4 evitado", "Total"],
                    "datasets": [
                        {
                            "label": "t CO2eq/año",
                            "data": [co2_red, ch4, round(co2)],
                            "backgroundColor": ["#0ea5e9", "#10b981", "#6366f1"],
                        }
                    ],
                },
                "options": {"responsive": True, "scales": {"y": {"beginAtZero": True}}},
            },
        },
        "viabilidad_economica": {
            "narrativa": (
                "El payback estimado se sitúa en torno a 5-9 años con precios industriales actuales. "
                "Modelo offline — para análisis económico detallado, configura ANTHROPIC_API_KEY."
            ),
            "chart": {
                "type": "doughnut",
                "data": {
                    "labels": ["CAPEX", "OPEX 10y", "Ingresos 10y"],
                    "datasets": [
                        {
                            "data": [
                                int(energia * 1000 / 8000 * 4500),
                                int(energia * 1000 / 8000 * 180 * 10),
                                int(energia * 1000 * 0.13 * 10),
                            ],
                            "backgroundColor": ["#ef4444", "#f59e0b", "#10b981"],
                        }
                    ],
                },
                "options": {"responsive": True},
            },
        },
        "recomendaciones": [
            "Realizar estudio de viabilidad de planta CHP en el municipio dominante",
            "Negociar PPA con el operador del CPD",
            "Solicitar ayudas IDAE para biogás agroganadero",
        ],
        "riesgos": [
            "Variabilidad estacional del estiércol",
            "Permisos ambientales y oposición vecinal a planta",
        ],
        "fuentes_citadas": ["IDAE 2007", "IPCC AR6", "REE 2023"],
        "_modo": "fallback",
    }


def analizar_escenario(parametros: dict, resultados: dict) -> dict:
    # 1. Cache pre-generado por preset
    cached = _cache_path(parametros)
    if cached:
        with open(cached, "r", encoding="utf-8") as f:
            data = json.load(f)
            data["_modo"] = "cache"
            return data

    # 2. Llamada al modelo de IA (Azure AI Foundry compatible)
    client = get_client()
    if client is None:
        return _build_fallback(parametros, resultados)

    try:
        response = client.messages.create(
            model=config.ANTHROPIC_MODEL,
            max_tokens=2500,
            system=[
                {
                    "type": "text",
                    "text": SYSTEM_PROMPT,
                    "cache_control": {"type": "ephemeral"},
                }
            ],
            messages=[{"role": "user", "content": _user_prompt(parametros, resultados)}],
        )
        text = next((b.text for b in response.content if b.type == "text"), "")
        text = _strip_json(text)
        data = json.loads(text)
        data["_modo"] = "live"
        data["_usage"] = {
            "input": response.usage.input_tokens,
            "output": response.usage.output_tokens,
            "cache_read": getattr(response.usage, "cache_read_input_tokens", 0),
            "cache_create": getattr(response.usage, "cache_creation_input_tokens", 0),
        }
        return data
    except (anthropic.APIError, json.JSONDecodeError, ValueError) as e:
        fb = _build_fallback(parametros, resultados)
        fb["_error"] = str(e)
        return fb
