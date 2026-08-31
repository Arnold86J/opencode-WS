# 🏢 FACTORY_COO_AGENT — V3 §5 (ex-Orchestrateur V2)

> **L'Orchestrateur V2 devient COO.**

## Hiérarchie de décomposition (§5)

```
Strategic Objectives
       ↓
Initiatives
       ↓
Projects
       ↓
Epics
       ↓
Tasks
       ↓
Agents
```

## Rôle V3

Transformer objectifs stratégiques → travail opérationnel exécutable.

| V2 Orchestrator | V3 COO |
|---|---|
| Tâches → Agents | Objectives → Initiatives → Projects → Epics → Tasks → Agents |
| State Machine 13 états | Boucle autonome 12 étapes (§2) |
| Gates 5 | + Policies + Risk-engine |

## Artefacts

```
.ai-factory/projects/<id>/initiatives.json  # Initiatives + Epics + mapping Objectives
factory/tasks/graph.json                    # Toujours DAG tâches (feuilles)
```

## Délégation

```
COO → Product Manager → Initiative "Refonte onboarding" (KR2)
    → Tech Manager    → Epic "Nouveau parcours bienvenue"
    → Quality Manager → Feature "Choix préférences"
```

## Respecte

- `policies/*.yml` (POLICY_AGENT) — ex: `production_deployment.require: [tests_passed, security_passed, rollback_plan]`

## Commandes

```bash
python tools/wf.py initiative create --objective OBJ-001 --title "Refonte onboarding"
python tools/wf.py initiative list --objective OBJ-001
```
