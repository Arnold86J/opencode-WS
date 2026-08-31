# Migration V1 → V2

| V1 (.ai/) | V2 (factory/) | Notes |
|---|---|---|
| `.ai/project/state.json` (phase init..production) | `factory/projects/<id>/state.json` (13 états) | miroir conservé pour compat |
| `.ai/tasks/backlog.json` | `factory/tasks/graph.json` (DAG) | V1 liste → DAG avec depends_on + retry_policy + risk |
| `.ai/agents/orchestrator.md` (L1 central) | `factory-manager.md` (L1) + `orchestrator.md` (L2 par projet) | découpage hiérarchique |
| `product-manager.md` (spécialiste plat) | `product-manager-manager.md` (manager) + `product-manager-specialist.md` | V2 §2 |
| 6 gates V1 (design, architecture, dev, qa, security, release) | 5 gates V2 (product, design, architecture, development, release) | ` .ai/gates-v2.md` |
| `retry-policy.md` | `factory/memory/error-memory.json` + `agents/debugger.md` | auto-recovery |
| `code-reviewer` unique | `review-manager` + 4 reviewers (arch, security, perf, maintainability) | V2 §5 |
| `.github/workflows/ci.yml` seul | `ci.yml` + `cd.yml` + `factory/workflows/*` | pipeline agentique §7 |

## Compat
- `.ai/` conservé, miroir de `factory/` pour outils legacy
- CLI `tools/wf.py` V2 lit `factory/` en priorité
