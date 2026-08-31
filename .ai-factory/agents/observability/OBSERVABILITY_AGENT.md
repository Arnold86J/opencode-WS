# 👁️ OBSERVABILITY_AGENT — V3 §8

## Surveille (§7 Sources)

```
Production: Logs, Errors, Performance, Analytics, User feedback, Reviews, Support tickets, Business metrics
```

- Erreurs & crash rate, Latence & dispo, CPU/mémoire, Perf API/Frontend, Métriques métier

## Produit (§8)

```json
{
  "incident": "INC-1042",
  "severity": "high",
  "detected": true,
  "service": "payments-api",
  "symptoms": ["latency +180%", "error rate +6%"],
  "recommendation": "Investigate database connection pool"
}
```

## Pipeline d'intelligence (§7)

```
OBSERVATION ENGINE → ANOMALY DETECTION → ROOT CAUSE ANALYSIS → PRIORITIZATION → ACTION
```

- Alimente `intelligence/memory`, `incidents/`, `metrics/`

## Commandes

```bash
python tools/wf.py observability scan --service payments-api
python tools/wf.py incident report --service payments-api --severity high --symptoms "latency +180%"
```
