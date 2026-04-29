# MegaWattle

> **De residuo a megavatio** — convertir el problema ambiental de las macrogranjas españolas en la solución energética de los centros de datos.

Proyecto del **Hackathon League for Social Good 2026** (Milán-Madrid). Reto: ODS 6 (agua limpia) + ODS 7 (energía asequible y limpia).

## Idea

España tiene macrogranjas que saturan acuíferos con purines (procedimiento UE abierto por Directiva de Nitratos) y nuevos centros de datos hyperscale que tensionan la red eléctrica (Microsoft Aragón proyecta 10.500 GWh/año, más que el consumo total de Aragón). MegaWattle empareja geográficamente ambos problemas: **el estiércol se digiere a biogás → la cogeneración produce electricidad → el CPD cercano la consume**. Doble impacto ODS 6 + 7 + bonus crítico: el metano evitado tiene un GWP de 28 — 28 veces más potente que el CO₂.

## Stack

- **Backend**: Python 3.11 + Flask
- **Frontend**: HTML + Tailwind (CDN) + Leaflet (mapa) + Chart.js
- **IA**: Azure AI Foundry con prompt caching (modelo configurable vía env)
- **Datos**: JSON estáticos cargados en memoria (sin BD)

## Setup

> **Requisitos**: Python 3.11+ y Node.js 18+ instalados.

### Opción A — macOS / Linux con Make (recomendada)

```bash
make dev          # arranca Flask (5050) + Vite (5173) en paralelo
```

Abre **<http://localhost:5173>** (frontend con hot-reload).

Otros targets:
- `make build` — bundlea el frontend en `static/dist/`
- `make serve` — solo Flask sirviendo el bundle compilado (un solo puerto en 5050)
- `make smoke` — test rápido de cálculos
- `make stop` — libera puertos 5050 y 5173
- `make clean` — borra venv y node_modules

### Opción B — comandos manuales (Windows / macOS / Linux)

#### 1. Backend (Python + Flask)

**Windows (PowerShell o CMD)**:
```powershell
python -m venv .venv
.venv\Scripts\pip install -r requirements.txt
copy .env.example .env
:: edita .env y rellena ANTHROPIC_API_KEY
set PORT=5050
.venv\Scripts\python app.py
```

**macOS / Linux (bash/zsh)**:
```bash
python3 -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env
# edita .env y rellena ANTHROPIC_API_KEY
PORT=5050 .venv/bin/python app.py
```

#### 2. Frontend (React + Vite) — en otra terminal

**Windows / macOS / Linux** (igual):
```bash
cd frontend
npm install
npm run dev
```

Abre **<http://localhost:5173>** — Vite hace proxy automático de `/api`, `/fuentes` y `/healthz` al backend en 5050.

#### 3. Solo backend (sin frontend en dev)

Si compilas el frontend a producción primero, Flask lo sirve solo:

**Windows**:
```powershell
cd frontend
npm install
npm run build
cd ..
.venv\Scripts\python app.py
```

**macOS / Linux**:
```bash
cd frontend && npm install && npm run build && cd ..
.venv/bin/python app.py
```

Abre **<http://localhost:5050>**.

### Variables de entorno

`.env` (copiar de `.env.example`):
```
ANTHROPIC_API_KEY=tu-clave
ANTHROPIC_MODEL=claude-sonnet-4-6   # o claude-haiku-4-5 para mayor velocidad
FLASK_ENV=development
PORT=5050
```

> Sin clave API, la IA funciona en modo *fallback* con un análisis precalculado.

### Notas según sistema

- **macOS**: el puerto 5000 está ocupado por AirPlay Receiver. Por eso usamos 5050.
- **Windows**: si `python` no funciona, prueba `py -3` en vez de `python`.
- **Linux**: puede que necesites `python3` en lugar de `python`.

## Datos

- **17 centros de datos reales** con datos públicos: Microsoft Aragón, AWS Aragón (3 campus), Meta Talavera, Equinix MD2/MD3/MD4, Telefónica Alcalá, Interxion, NTT, Digital Realty, Merlin Edged Getafe, QTS Calatorao, Equinix BR2, Iron Mountain.
- **33 nodos ganaderos agregados por municipio** (Censo MAPA 2024 + REGA + PRTR + DATADISTA): Aragón porcino, Cataluña porcino, Castilla y León vacuno, Galicia vacuno, Murcia porcino, Castilla-La Mancha mixto.

> Las "granjas" son **agregados municipales públicos**, no explotaciones individuales. Coordenadas = centroide municipal.

## Flujo de uso

1. **Filtra centros de datos** por CCAA → provincia
2. **Selecciona 1 o 2 CPDs** (checkbox o click en mapa)
3. **Define el radio de búsqueda** (5-100 km) y opcionalmente tipo de animal
4. **Ve qué granjas pueden alimentarlo** y con qué % de su demanda
5. **Genera análisis con IA**: el modelo en Azure produce informe con narrativa + gráficos comparativos

## Estructura

```
app.py                     # entrypoint Flask
config.py                  # carga env vars + datos en memoria
data/
  cpds.json                # 17 CPDs reales
  granjas.json             # 33 nodos ganaderos agregados
  factores_biogas.json     # coeficientes citables (IDAE, IPCC, IEA)
  cache_ai/                # respuestas IA pre-generadas (presets)
services/
  geo.py                   # haversine
  calculos.py              # fórmulas biogás → MWh → CO2eq → payback
  matching.py              # emparejamiento por radio
  ai_client.py             # Cliente IA (Azure AI Foundry) + prompt caching + fallback
routes/
  views.py                 # GET / + GET /fuentes
  api.py                   # /api/cpds, /api/granjas, /api/match, /api/ai/analizar
templates/index.html       # UI única (SPA-light)
static/js/                 # map.js, filters.js, results.js, ai-panel.js
docs/
  fuentes.md               # bibliografía completa
  pitch.md                 # guion del pitch de 2 min
```

## Documentación técnica

- Fórmulas y factores citables: [docs/fuentes.md](docs/fuentes.md)
- Guion del pitch + Q&A esperado: [docs/pitch.md](docs/pitch.md)

## Verificación

```bash
# Smoke tests
curl http://localhost:5050/healthz
curl http://localhost:5050/api/cpds | python3 -m json.tool | head
curl -X POST http://localhost:5050/api/match \
  -H "Content-Type: application/json" \
  -d '{"cpd_ids":["microsoft-aragon"],"radio_km":50,"tipo_animal":"porcino"}'
```

Caso de prueba unitario: 5.000 cerdos cebo → ~8.213 t/año estiércol → ~502 MWh/año → ~2.775 t CO₂eq evitado → payback ~5.2 años.

## ODS y marco legal

- ODS 6 — Agua limpia y saneamiento
- ODS 7 — Energía asequible y no contaminante
- Directiva 91/676/CEE (Directiva de Nitratos)
- Procedimiento TJUE C-575/22 contra España

## Créditos

Hackathon League for Social Good 2026 · Milán-Madrid · ODS 6 + ODS 7.
