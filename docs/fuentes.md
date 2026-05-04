# Fuentes y metodología

MegaWattle utiliza **únicamente datos públicos verificables**. Esta página documenta cada cifra y fórmula utilizada.

## Centros de datos (CPDs)

| CPD | Fuente |
|---|---|
| Microsoft Cloud Region Aragón | Anuncio oficial Microsoft (2024); cobertura *energynews.es* y *DataCenterDynamics* |
| AWS Aragón (3 campus) | AWS Region Aragón anuncio oficial (2022); INVAT.TUR; *Aragón Hoy* |
| Meta Talavera | Anuncio oficial Meta (2022); cobertura *ABC* y *El País* sobre consumo de agua |
| QTS Aragón Calatorao | Anuncio QTS / Blackstone (2024) |
| Equinix MD2/MD3/MD4 | Equinix corporate disclosures (2024) |
| Telefónica Alcalá | Telefónica Tech disclosures + Spain DC |
| NTT Madrid 1, Interxion, Digital Realty, Merlin Edged, Iron Mountain | Disclosures corporativos y directorio Spain DC |

## Macrogranjas (datos agregados por municipio)

Los datos ganaderos son **agregados municipales/comarcales** del Censo Ganadero del Ministerio de Agricultura, Pesca y Alimentación (MAPA) 2024 cruzados con el Registro General de Explotaciones Ganaderas (REGA) y el Registro PRTR-España. **No identifican explotaciones individuales** — coordenadas = centroide municipal.

- **MAPA / REGA**: <https://www.mapa.gob.es/es/ganaderia/temas/registro-general-explotaciones-ganaderas/>
- **DATADISTA — Macrogranjas porcino España**: <https://especiales.datadista.com/medioambiente/mapa-emisiones-contaminantes-macrogranjas-porcino-2021/>
- **DATADISTA — Contaminación nitratos**: <https://especiales.datadista.com/medioambiente/contaminacion-agua-macrogranjas/contaminacion-nitratos-purines/>

## Factores técnicos

| Factor | Valor | Fuente |
|---|---|---|
| Estiércol porcino cebo | 4.5 kg/animal/día | IDAE — *Biomasa: Digestores Anaerobios* (2007); FAO Livestock Environmental Assessment |
| Estiércol vacuno leche | 55 kg/animal/día | IDAE 2007 |
| Estiércol vacuno carne | 30 kg/animal/día | IDAE 2007 |
| Biogás por t estiércol porcino | 25 m³ | IEA Bioenergy Task 37 — *Manure utilization 2025*; Penn State Extension |
| Biogás por t estiércol vacuno | 30 m³ | IEA Bioenergy Task 37 |
| Biogás por t estiércol avícola | 90 m³ | IEA Bioenergy Task 37 |
| %CH4 en biogás (porcino/avícola) | 0.65 | Clarke Energy; IEA *Outlook for Biogas and Biomethane* 2020 |
| %CH4 en biogás (vacuno) | 0.60 | Clarke Energy; IEA 2020 |
| Poder calorífico inferior CH4 | 9.9 kWh/m³ | IEA, referencia estándar |
| Eficiencia eléctrica cogeneración (CHP) | 0.38 | Motores cogeneración agrícola 0.5-2 MW (Jenbacher, Caterpillar) |
| Factor emisión red eléctrica España 2023 | 0.19 kg CO2/kWh | REE / MITECO Inventario Nacional |
| GWP-100 metano | 28 | IPCC AR6 — WG-I Cap. 7 |
| Densidad metano | 0.000717 t/m³ | Ficha técnica estándar (NIST) |
| CAPEX planta biogás CHP | ~4.500 €/kW eléctrico | IDAE Manual de Biogás; IRENA *Renewable Power Generation Costs* 2023 |
| OPEX | ~180 €/kW·año (≈4-5% CAPEX) | IRENA 2023 |
| Horas operación anuales | 8.000 h/año | Estándar plantas biogás continuas |
| Precio kWh industrial España | ~0.13 €/kWh | MITECO precio medio industrial 2024 |
| Emisión media coche turismo Europa | 4.600 kg CO2/año | EEA — emisión media coche turismo Europa 2023 |

## Fórmulas

1. **Estiércol producido**: `t/año = cabezas × kg_animal_dia × 365 / 1000`
2. **Biogás generado**: `m³/año = t_estiercol × factor_biogas[animal]`
3. **Energía eléctrica**: `MWh/año = m³_biogas × %CH4 × 9.9 × 0.38 / 1000`
4. **% demanda CPD cubierta**: `min(100, MWh × 1000 / consumo_kwh × 100)`
5. **CO₂ eq evitado red**: `MWh × 0.19 t/MWh`
6. **CH₄ evitado (CO₂eq)**: `m³_biogas × %CH4 × 0.000717 × 28`
7. **CO₂ eq total evitado**: suma de 5 + 6
8. **Distancia**: fórmula de Haversine con radio Tierra 6.371 km
9. **Payback**: `CAPEX / (Ingresos − OPEX)` donde `Potencia_kW = MWh × 1000 / 8.000`

## Marco legal y ODS

- **ODS 6** (Agua limpia y saneamiento) — Naciones Unidas
- **ODS 7** (Energía asequible y no contaminante) — Naciones Unidas
- **Directiva 91/676/CEE** del Consejo Europeo (Directiva de Nitratos)
- **Procedimiento de infracción TJUE C-575/22** contra España por incumplimiento Directiva Nitratos

## Documentos de referencia citables

- IDAE — *Biomasa: Digestores Anaerobios* (2007)
- IDAE — *Plan de Energías Renovables 2021-2030*
- MITECO — *Inventario Nacional de Emisiones GEI* (anual)
- MITECO — *Plan Nacional de Aplicación de la Directiva de Nitratos*
- IPCC AR6 — Working Group I, Cap. 7 (GWP-100 metano)
- IEA Bioenergy Task 37 — *Potential for Manure-based Anaerobic Digestion 2025*
- IEA — *Outlook for Biogas and Biomethane 2020*
- REE — *Informe del Sistema Eléctrico Español 2023*
- IRENA — *Renewable Power Generation Costs 2023*

## Limitaciones declaradas

- Las cifras de consumo de los CPDs son anuncios o disclosures; los reales pueden variar.
- Los agregados ganaderos por municipio son estimaciones del Censo MAPA, no ground-truth.
- El payback ignora ayudas IDAE / fondos NextGenerationEU disponibles para biogás agroganadero.
- Solo modela cogeneración eléctrica; no contempla inyección de biometano a red de gas (mayor valor económico potencial).
