# CI/CD Agentique — V2 §7

## Pipeline intégré
```
PUSH
  ↓
BUILD
  ↓
UNIT TESTS
  ↓
INTEGRATION TESTS
  ↓
CODE ANALYSIS (lint, type, complexity)
  ↓
SECURITY SCAN (SAST, deps, secrets)
  ↓
E2E TESTS
  ↓
STAGING DEPLOY
  ↓
RELEASE GATE (Quality Manager approval)
  ↓
PRODUCTION DEPLOY
  ↓
MONITORING (health, metrics, alerts)
```

- L'Orchestrateur reçoit résultats à chaque étape et décide : continuer, rollback, escalader.
- Voir `.github/workflows/ci.yml` (V1) + `.github/workflows/cd.yml` (V2)

## Déclenchement
- Push sur `feature/*` → BUILD → UNIT → ANALYSIS
- Merge sur `main` → full pipeline → STAGING → RELEASE GATE → PROD

## Rollback
- Si STAGING E2E fail → auto-recovery via debugger, sinon `ESCALATED`
- Si PROD health fail → rollback tag précédent
