# Git Workflow Natif — V2 §6

## Workflow par tâche (§6.1)
```
main
 │
 └── feature/TASK-045-dashboard
       ├── implementation (commits atomiques)
       ├── tests
       └── commit (conventional commits)
              ↓
            Pull Request (auto-créée)
              ↓
         Review Agents (parallèle, §5)
              ↓
         Fixes (auto-recovery §4 si possible)
              ↓
         Approval → Merge (squash ou rebase)
```

## Règles (§6.2)
- Agent **ne touche jamais** `main` directement
- Branche = 1 tâche (ou 1 epic si groupé)
- PR auto-générée avec description, tests, checklist gates
- Conventional commits : `feat(TASK-045): implement dashboard`

## Template PR
```md
## TASK-045 — Implement dashboard
- Agent: frontend
- Manager: tech-manager
- Risk: LOW
- Gates: Development pending

### Changes
- ...

### Tests
- [ ] unit
- [ ] e2e

### Checklist
- [ ] build pass
- [ ] review 4/4
```

## Commandes
```bash
git checkout -b feature/TASK-045-dashboard main
git commit -m "feat(TASK-045): implement dashboard"
gh pr create --title "TASK-045 dashboard" --body-file .tmp/pr.md
python tools/wf.py task run TASK-045  # marque RUNNING
```
