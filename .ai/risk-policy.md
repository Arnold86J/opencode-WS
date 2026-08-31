# Risk-Based Human-in-the-Loop — V2 §12

| Niveau | Action | Exemples |
|---|---|---|
| **LOW** | Autonomous (auto + auto-recovery) | Créer composant UI, écrire test, refactor interne |
| **MEDIUM** | Manager Review | Modifier API publique, changer schema DB, config infra |
| **HIGH** | Human Approval (bloquant) | Supprimer données prod, déployer prod, migration destructive, arch contestée |

## Implémentation
- Chaque tâche a `risk: LOW|MEDIUM|HIGH` dans `factory/tasks/graph.json`
- CLI : `python tools/wf.py state transition --to PRODUCTION --risk HIGH --approve` (sans --approve → refuse)
- Delivery Manager bloque prod sans approval humaine

## Observabilité
- Taux d'intervention humaine = `factory/logs/audit.jsonl`
