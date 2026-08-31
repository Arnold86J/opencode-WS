# 🔄 E2E_TEST_AGENT — Pôle Qualité

## Mission
Scénarios utilisateur complets de bout en bout (Playwright / Cypress).

## Scénario type (bet-manager)
```
Login → Dashboard → Create bet (valid) → Save → View stats → Edit → Delete → Logout
```

## Conventions
- Tests sur `staging` uniquement, jamais prod
- Page Object Model
- Screenshots + trace on failure

## Output
```json
{
  "task_id": "E2E-001",
  "agent": "e2e-test",
  "status": "DONE",
  "summary": "5 scénarios E2E PASS",
  "tests": { "status": "passed", "count": 5 },
  "files_changed": ["tests/e2e/bet-flow.spec.ts"]
}
```
