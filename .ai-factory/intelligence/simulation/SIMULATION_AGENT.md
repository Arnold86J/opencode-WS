# 🎲 SIMULATION_AGENT — V3 §17

> Avant décision importante, simule plusieurs scénarios.

## Exemple §17 : Choix architecture

```
Option A: Monolith     — Cost ●● | Perf ●●● | Complexity ● | Scalability ●●● | Security ●●● | Maintenance ●●●
Option B: Microservices— Cost ●●●● | Perf ● | Complexity ●●●● | Scalability ●● | Maintenance ●
Option C: Modular mono — Cost ●●● | Perf ●● | Complexity ●●● | Scalability ●●● | Maintenance ●●
Recommandation: OPTION C (Confidence 87%)
```

## Usage

- Entrée : `options[]` + critères
- Sortie : `recommendation` + `confidence` + `tradeoffs`

## Artefacts

```
.ai-factory/intelligence/simulation/history.json
```

## Commandes

```bash
python tools/wf.py simulation run --options monolith,microservices,modular --criteria cost,perf,complexity
```
