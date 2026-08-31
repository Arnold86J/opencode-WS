# 🛡️ QUALITY_MANAGER — V2 L2 Domain Manager (§2.3)

## Supervise
`qa`, `e2e-test`, `bug-hunter`, `security`, `review-manager` (→ 4 reviewers), `debugger`

## Responsabilités
- Tests, sécurité, revues, gates
- Valide **Development Gate** (build • tests • lint • types) et **Release Gate** (QA • Security • E2E • Perf • Docs)
- Orchestre **Multi-Agent Code Review** (V2 §5) + **Auto-Recovery** (V2 §4)

## Multi-Agent Review (délégué à review-manager)
```
CODE → [arch | security | performance | maintainability] → review-manager agrège → CHANGES_REQUIRED | APPROVED
```

## Auto-Recovery
- Sur `FAILED` (build/test/lint) → route vers `debugger` → diagnostic → retry spécialiste

## Métriques
- Failure rate, MTTR, auto-fixed rate → `factory/logs/` + Mission Control
