# Protocole de Communication Inter-Agents

> Version : 1.0 | Source : WF.md §7

## 1. Contrat

Chaque agent reçoit une **tâche structurée** et retourne un **payload structuré JSON**. Pas de texte libre pour décider.

### Requête (Orchestrateur → Agent)
```json
{
  "task_id": "FE-001",
  "agent": "frontend",
  "goal": "Implémenter dashboard",
  "context": {
    "requirements": ".ai/project/requirements.md#US-001",
    "design": "design/screens.md#dashboard",
    "api": "architecture/api.md#GET-/bets",
    "dependencies": ["ARCH-001", "DB-001"]
  },
  "acceptance_criteria": ["responsive 360-1440", "affiche stats depuis /api/bets", "tests >= 5"],
  "priority": "P0",
  "deadline": null
}
```

### Réponse (Agent → Orchestrateur)
```json
{
  "task_id": "FE-001",
  "agent": "frontend",
  "status": "DONE | FAILED | BLOCKED | NEEDS_REVIEW | NEEDS_HUMAN",
  "summary": "Dashboard implémenté",
  "files_changed": ["src/pages/dashboard.tsx", "src/components/stats-card.tsx"],
  "tests": { "status": "passed|failed", "count": 18, "coverage": 82 },
  "issues": [],
  "next_actions": ["Run E2E tests"],
  "duration_minutes": 42
}
```

## 2. Statuts standardisés

| Statut | Signification | Action Orchestrateur |
|---|---|---|
| `DONE` | Succès | `StateManager` maj → Validator gate → route suivante |
| `FAILED` | Échec exécution | `ErrorManager` classe → `RetryManager` ou escalade |
| `BLOCKED` | Dépendance manquante | `DependencyManager` débloque dépendance |
| `NEEDS_REVIEW` | Gate requis | Déclenche gate (ex: `CODE_REVIEW`) |
| `NEEDS_HUMAN` | Décision humaine obligatoire | Passe en `HUMAN_REVIEW_REQUIRED` |

## 3. Exemple réel
```json
{
  "task_id": "TASK-042",
  "agent": "frontend-agent",
  "status": "completed",
  "summary": "Dashboard implemented",
  "files_changed": ["src/pages/dashboard.tsx", "src/components/stats-card.tsx"],
  "tests": { "status": "passed", "count": 18 },
  "issues": [],
  "next_actions": ["Run E2E tests"]
}
```

## 4. Règles
- `files_changed` toujours relatif à la racine repo, vérifiable via `git status`.
- `tests.count` = nombre de tests réellement exécutés, pas estimé.
- `NEEDS_HUMAN` doit inclure `reason` + `options[]` pour l'humain.
