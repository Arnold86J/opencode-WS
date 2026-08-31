# 🔧 SELF_HEALING_ENGINE — V3 §9

## Pipeline (§9)

```
Incident → Diagnosis → Risk analysis → Create remediation task → Agent fixes → Tests → Security → Canary/staging → Deploy → Verify
```

## Matrice risque (§9)

| Niveau | Action |
|---|---|
| Low | Automatique |
| Medium | Manager approval |
| High | Human approval |
| Critical | Emergency human control |

- Voir `core/risk-engine/matrix.json`

## Exemple

```
INC-1042 latency +180% (MEDIUM)
  → Diagnosis: cache hit drop (RCA 87%)
  → Remediation: TASK-999 fix cache key → frontend
  → Tests PASS → Security PASS → Canary 10% → Verify latency normal → Close
```

## Intégration

- Appelle `debugger` (V2) pour diagnostic si build/test fail
- Crée `TASK-*` avec `risk` + `depends_on` → DAG
- Vérifie `policies/*.yml` avant deploy

## Commandes

```bash
python tools/wf.py heal run --incident INC-1042
python tools/wf.py heal status --incident INC-1042
```
