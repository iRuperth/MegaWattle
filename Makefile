.PHONY: dev install install-py install-js clean smoke stop build serve front-dev back-dev

VENV := .venv
PY := $(VENV)/bin/python
PIP := $(VENV)/bin/pip
PORT ?= 5050
NPM := npm --prefix frontend

# `make dev` — arranca Flask (5050) + Vite (5173) en paralelo. Vite proxy las /api a Flask.
# Abre http://localhost:5173
dev: install .env stop
	@echo "→ Backend Flask  http://localhost:$(PORT)"
	@echo "→ Frontend Vite  http://localhost:5173 (abrir aquí)"
	@$(MAKE) -j 2 back-dev front-dev

back-dev:
	@PORT=$(PORT) $(PY) app.py

front-dev:
	@$(NPM) run dev

# `make serve` — solo Flask sirviendo el bundle de producción (necesita haber hecho make build antes).
# Útil para demo offline en una sola ventana.
serve: install .env build stop
	@echo "→ MegaWattle producción en http://localhost:$(PORT)"
	@PORT=$(PORT) $(PY) app.py

build: install-js
	@$(NPM) run build

install: install-py install-js

install-py: $(VENV)/.installed
$(VENV)/.installed: requirements.txt
	@test -d $(VENV) || python3 -m venv $(VENV)
	@$(PIP) install -q -r requirements.txt
	@touch $(VENV)/.installed

install-js: frontend/node_modules/.installed
frontend/node_modules/.installed: frontend/package.json
	@$(NPM) install --silent
	@touch frontend/node_modules/.installed

stop:
	@lsof -ti:$(PORT) | xargs -r kill -9 2>/dev/null || true
	@lsof -ti:5173 | xargs -r kill -9 2>/dev/null || true

.env:
	@cp .env.example .env
	@echo "→ creado .env desde .env.example"

smoke: install-py
	@$(PY) -c "import config; from services.matching import match_cpds_granjas; \
		r = match_cpds_granjas(['microsoft-aragon'], 50, 'porcino'); \
		m = r['por_cpd'][0]['metricas']; \
		print(f'Microsoft Aragón r=50km porcino → {m[\"energia_mwh_anio\"]:,.0f} MWh, {m[\"co2eq_evitado_t\"]:,.0f} tCO2eq, payback {m[\"payback_anios\"]}a')"

clean:
	rm -rf $(VENV) __pycache__ */__pycache__ frontend/node_modules frontend/dist static/dist
