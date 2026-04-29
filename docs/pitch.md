# MegaWattle — Guion del pitch (2 minutos)

## Tagline
**"De residuo a megavatio"** — convertir el problema ambiental de las macrogranjas en la solución energética de los centros de datos.

## Ficha resumen (60 segundos)
- **Título**: MegaWattle
- **Descripción (150 caracteres)**: Plataforma que conecta macrogranjas españolas con centros de datos: el estiércol genera biogás que alimenta servidores. Doble ODS 6+7.
- **Abstract (700 caracteres)**: España tiene un doble problema: las macrogranjas saturan acuíferos con purines (procedimiento UE abierto por Directiva Nitratos) y los nuevos hyperscalers (Microsoft Aragón proyecta 10.500 GWh, más que el consumo total de Aragón) presionan la red eléctrica. MegaWattle empareja geográficamente ambas realidades: el estiércol se digiere a biogás, la cogeneración produce electricidad, y el CPD cercano consume energía verde local. La IA generativa analiza viabilidad técnica, ambiental y económica de cada matching, calcula CO₂eq evitado (incluyendo metano con GWP 28× CO₂) y produce informes con gráficos. Doble impacto en ODS 6 + 7.

## Pitch 2 minutos — guion

### 1. Problema (30 s)
> "España es el primer productor de cerdo de la UE. Tenemos macrogranjas tan grandes que los purines saturan los acuíferos: la Comisión Europea tiene un procedimiento abierto contra España por incumplir la Directiva de Nitratos. **El estiércol está literalmente envenenando el agua que bebemos.**"

### 2. Problema 2 (30 s)
> "Al mismo tiempo, los hyperscalers están aterrizando en España. **Microsoft Aragón solo proyecta 10.500 GWh al año** — más que todo el consumo eléctrico de Aragón en 2024. AWS, Meta, Equinix… la red no aguanta. Nuevos cuellos de botella, nuevas tensiones por ubicación, oposición vecinal."

### 3. Solución (45 s)
> "MegaWattle conecta los dos problemas y los convierte en una solución. **El estiércol se digiere y produce biogás. El biogás alimenta una planta de cogeneración. La cogeneración alimenta el centro de datos.** Cuando capturamos ese metano, evitamos un gas con efecto invernadero **28 veces más potente que el CO₂** — la cifra estrella ambiental. Y de paso protegemos los acuíferos. Doble ODS 6 + 7 con un solo proyecto."

### 4. Demo (45 s — usar preset Aragón)
> 1. "Selecciono Microsoft Aragón en el mapa…"
> 2. "Defino un radio de 50 km… y pulso buscar."
> 3. "El sistema identifica 3 comarcas porcinas a 12, 18 y 22 kilómetros — Cinco Villas, Bajo Cinca, Monegros."
> 4. "Calcula automáticamente: estiércol disponible, biogás generable, energía eléctrica, CO₂ evitado y payback."
> 5. "**Y aquí entra Azure AI Foundry:** nuestro asistente paramétrico de IA genera un informe completo con narrativa, gráficos comparativos y recomendaciones — todo a partir de mis inputs."

### 5. Impacto (15 s)
> "Para un escenario tipo: **97.000 toneladas de CO₂ equivalente evitadas al año** — el equivalente a sacar 21.000 coches de circulación. Y **agua más limpia para esos municipios**."

### 6. Viabilidad (15 s)
> "Payback de 5 a 9 años con precios industriales actuales. CAPEX ~4.500 €/kW. Ya hay ayudas IDAE y NextGenerationEU para biogás agroganadero."

### 7. Roadmap (10 s)
> "Próximos pasos: integración con datos en vivo de PRTR y REE, módulo de financiación, app móvil para operadores. **MegaWattle convierte un residuo en un activo energético estratégico para España.**"

## Demo presets sugeridos (con tiempos esperados)

| Preset | Hook |
|---|---|
| **Aragón** | "El cluster porcino más grande de Europa + el hub data center emergente" |
| **Madrid** | "El 70% de la capacidad data center española y los CPDs más antiguos" |
| **Cataluña** | "Lleida porcino + Equinix Barcelona" |
| **Castilla y León** | "Vacuno lechero + porcino mixto, distancias mayores" |

## Q&A esperado del jurado

**¿Es realista?** Sí. La tecnología (digestión anaerobia + CHP) es madura. Hay plantas operando en España (Granja San José, Carbasur). Lo que falta es la conexión sistemática con CPDs.

**¿Por qué no biometano inyectado a red de gas?** Es la siguiente fase del roadmap; mejora rentabilidad pero requiere upgrading + contratos con Enagás. El MVP modela cogeneración eléctrica como caso base más simple.

**¿No es too good to be true?** El % de demanda cubierta para los hyperscalers es bajo (1-3%) — no resolvemos el problema entero, pero **el metano evitado es donde está el impacto climático**, no en cubrir el 100% de la red del CPD.

**¿Datos de las granjas?** Agregados municipales públicos del MAPA, no explotaciones individuales. Defendible legalmente y respeta privacidad.

**¿Qué papel juega la IA?** La IA genera el análisis paramétrico estructurado: a partir de los inputs del usuario, produce narrativa contextualizada, gráficos comparativos ejecutables (Chart.js specs) y recomendaciones. **No es un chatbot — es generación dirigida con outputs específicos del proyecto.**
