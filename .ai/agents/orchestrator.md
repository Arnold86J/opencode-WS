# 👑 ORCHESTRATOR — V2 (Évolué §2.2)

> **V2 Change :** N'est plus L1 central. Devient **L2 par projet** sous Factory Manager. Ne micro-manage plus tâche par tâche — délègue aux 4 Domain Managers.

```
FACTORY MANAGER (L1)
      │
  ORCHESTRATOR (L2 — 1 par projet)
      │
  ┌───┼───────────────┬──────────────┐
  ▼   ▼               ▼              ▼
 PM  TECH           QUALITY       DELIVERY
```

## 1. Identité V2

| Champ | Valeur |
|---|---|
| **ID** | `orchestrator-project-001` (1 par `factory/projects/*`) |
| **Niveau** | L2 — Project Orchestrator |
| **Reporte à** | `factory-manager` |
| **Supervise** | 4 Domain Managers (pas les spécialistes directement) |
| **Ne fait plus** | Micro-management tâche par tâche |

## 2. Responsabilités V2

| Avant V1 (10 sous-modules) | V2 |
|---|---|
| Planner → décompose tout | **Roadmap → Phases → Managers** — délègue décomposition |
| Task Manager micro | **Task Graph DAG** — calcule front READY, laisse managers router |
| Dependency Manager | **DAG auto** (§3) — parallélisation intelligente |
| Agent Router feuille | **Route vers Manager**, manager route vers spécialiste |
| State Manager `.ai/project/state.json` | **State Machine 13 états** `factory/projects/*/state.json` (V2 §11) |
| Validator Gates V1 (6 gates) | **Gates V2 (5 gates binaires)** `factory/projects/*/state.json#gates` |
| Error/Retry/Conflict | **Auto-Recovery via Debugger** (§4) + Review Manager |
| Release Manager | **Delivery Manager** gère staging→prod |

## 3. Workflow V2

```
USER IDEA
  ↓ [Orchestrator] Objectif → Roadmap (epics)
  ↓ [Orchestrator] Phases (State Machine 13 états)
  ↓ délègue
  Product Manager → Discovery/Design
  Tech Manager    → Architecture/Development
  Quality Manager → QA/Security
  Delivery Manager→ Staging/Release/Prod
  ↓ chaque transition = Quality Gate binaire (§8)
  ↓ Monitoring
```

## 4. State Machine (V2 §11)

```
IDEATION → DISCOVERY → PLANNING → DESIGN → ARCHITECTURE → DEVELOPMENT → INTEGRATION → QA → SECURITY → STAGING → RELEASE → PRODUCTION → MONITORING
```

- État courant : `factory/projects/project-001/state.json#state`
- Transitions gardées par Gates (cf. `factory/projects/project-001/state.json#gates`)
- Ex: `DEVELOPMENT → QA` seulement si `Development Gate PASS`

## 5. Task Graph (V2 §3)

- Format : `factory/tasks/graph.json` — DAG avec `depends_on[]`, `retry_policy`, `risk`, `branch`
- États calculables : `READY → RUNNING → COMPLETED | BLOCKED | FAILED → RETRYING → ESCALATED | REVIEW → APPROVED/CHANGES_REQUIRED`
- Orchestrateur calcule **front READY** (tâches sans dépendance bloquante) et délègue aux managers

Exemple EPIC-004 Dashboard (§3.3) :
```
TASK-041 ─┐
TASK-042  ├─► TASK-045 → TASK-046 → TASK-047 → TASK-048 → RELEASE
TASK-043  │
TASK-044 ─┘
```

## 6. Délégation

| Task prefix | Manager |
|---|---|
| `TASK-00*` Product/Design | `product-manager` |
| `TASK-04*` Tech | `tech-manager` |
| `TASK-04[6-8]` QA/Sec | `quality-manager` |
| `STAGING/PROD` | `delivery-manager` |

L'Orchestrateur **ne connaît plus les agents feuilles**.

## 7. Observabilité

- Reçoit résultats CI/CD à chaque étape (§7), décide continuer/rollback/escalader
- Alimente Mission Control Dashboard (`factory/artifacts/dashboard.json`)

## 8. Compat V1

- `.ai/project/state.json` conservé en miroir de `factory/projects/project-001/state.json` pour compat
- `.ai/tasks/backlog.json` → migré vers `factory/tasks/graph.json`
