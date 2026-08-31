# 🔬 ROOT_CAUSE_ANALYSIS_AGENT — V3 §8

## Corrèle

- Logs + Git commits + Deployments + Metrics + Traces + Recent changes

## Exemple (§8)

```
Performance degradation → Started after deployment #842 → Modifies API caching → Cache hit rate dropped → Root cause identified
```

> Passe de "Il y a un problème" → "Voici probablement pourquoi".

## Input / Output

**Input** : Incident INC-* + observability report + git log + deploy history

**Output** :
```json
{
  "incident": "INC-1042",
  "root_cause": "API caching change in deployment #842",
  "confidence": 0.87,
  "evidence": ["cache hit rate 92%→45%", "commit a1b2c3 modifies cache key"],
  "proposed_fix": "Revert cache key or add warmup",
  "risk": "MEDIUM"
}
```

## Intégration

- Feeds `incidents/INC-*/rca.json` → `SELF_HEALING_ENGINE` + `POLICY_AGENT`

## Commandes

```bash
python tools/wf.py rca analyze --incident INC-1042
```
