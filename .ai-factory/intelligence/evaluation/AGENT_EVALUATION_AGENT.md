# 📊 AGENT_EVALUATION_AGENT — V3 §13

## Métriques par agent (§13)

| Métrique | Description |
|---|---|
| Success rate | % tâches sans retry |
| Retry rate | % avec retry |
| Bug rate | Bugs / tâche |
| Review rejection rate | % PR rejetées |
| Task duration | Temps moyen |
| Token/resource consumption | Coût |
| Quality score | Note globale |

## Rapport exemple (§13)

```
Frontend Agent — Tasks 182, Success 96.7%, Retry 8.4%, Review pass 94.1%, Quality 9.1/10
Backend Agent — High retry on API → Recommendation: increase API spec validation
QA Agent — Missing edge-case coverage
```

> Objectif : identifier points faibles, pas punir (§13).

## Artefacts

```
.ai-factory/intelligence/evaluation/report.json
.ai-factory/metrics/agent-frontend.json
```

## Commandes

```bash
python tools/wf.py evaluation report --agent frontend
python tools/wf.py evaluation list
```
