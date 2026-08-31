# Task Graph — V2 §3 (DAG)

## Format tâche (§3.1)
```json
{
  "task_id": "TASK-045",
  "title": "Implement dashboard",
  "agent": "frontend",
  "manager": "tech-manager",
  "status": "BLOCKED",
  "depends_on": ["TASK-042", "TASK-043", "TASK-044"],
  "retry_policy": { "max_attempts": 3, "backoff": "exponential", "escalate_after_failure": true },
  "risk": "LOW|MEDIUM|HIGH",
  "branch": "feature/TASK-045-dashboard"
}
```

## États (§3.2)
```
READY → RUNNING → COMPLETED
BLOCKED (dépendances)
FAILED → RETRYING (max N) → ESCALATED
REVIEW → APPROVED / CHANGES_REQUIRED
```

- Calculés automatiquement depuis `depends_on` + résultats

## Parallélisation (§3.4)
Front READY = tâches `BLOCKED` dont toutes dépendances `COMPLETED` → lancées en parallèle

```
Architecture
  ├─► UX
  ├─► DB
  └─► API → Frontend (join)
```

## Fichier
`factory/tasks/graph.json` (global multi-projets) + `factory/projects/<id>/roadmap.json` (epics)

## Commandes
```bash
python tools/wf.py task graph --project project-001
python tools/wf.py task ready --project project-001
python tools/wf.py task run TASK-045
python tools/wf.py task retry TASK-045 --via debugger
```
