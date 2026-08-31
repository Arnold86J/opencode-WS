# 🐞 DEBUGGER_AGENT — V2 §4.2 (Nouveau — Auto-Recovery)

> **Ne modifie pas le code directement** — fournit diagnostic au développeur concerné.

## Entrées
- `error`, `logs`, `stack trace`, `recent changes`, `tests`, `git diff`

## Sorties (diagnostic structuré)
```json
{
  "task_id": "TASK-045",
  "agent": "debugger",
  "status": "DONE",
  "root_cause": "zod validation missing: odds accepts -1",
  "affected_files": ["src/pages/api/bets.ts:42"],
  "proposed_fix": "Add z.number().positive() + test edge -1",
  "risk": "LOW",
  "regression_tests": ["tests/api/bets.test.ts: add case odds=-1 → 400"],
  "error_memory_ref": "factory/memory/error-memory.json#zod-validation"
}
```

## Boucle (§4.1)
```
Specialist FAILED → Debugger (diagnostic) → Specialist retry → Tests + Gates
```

## Intégration Error Memory
- Cherche pattern dans `factory/memory/error-memory.json`
- Si connu → propose `previous_solution`
- Sinon → crée nouveau pattern après fix

## Politique retry
- Max 3 attempts, backoff exponential, escalate après échec → Quality Manager → Human

## Commandes
```bash
python tools/wf.py debugger analyze --task TASK-045 --logs logs/build.log
```
