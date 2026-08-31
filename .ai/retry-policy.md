# Retry & Escalade — Politique

## Retry Manager

### Classification (Error Manager)
| Type | Exemple | Action |
|---|---|---|
| `TRANSIENT` | timeout, rate limit | retry immédiat |
| `LOGICAL` | AC manquante, spec ambiguë | reformule task + retry |
| `BLOCKED` | dépendance manquante | débloque dépendance, pas de retry |
| `CRITICAL` | sécu, data loss | `NEEDS_HUMAN` direct |

### Politique retry
- Max **3 tentatives** par tâche
- Backoff : 1min → 5min → 15min (simulé, pas d'attente réelle en mode agent)
- À chaque retry : enrichit `context` avec `previous_error + lessons`
- Après 3 échecs → `failed.json` + `NEEDS_HUMAN` ou `lessons-learned.md`

### Payload retry (Orchestrateur → Agent)
```json
{
  "task_id": "BE-001",
  "retry": 2,
  "max_retries": 3,
  "previous_error": "Validation zod manquante sur odds",
  "hint": "Ajouter z.number().positive() + test edge -1"
}
```

## Escalade humaine

### Déclencheurs
| Situation | Action |
|---|---|
| Architecture contestée | `HUMAN_APPROVAL` |
| Migration DB destructive (`DROP`, `ALTER` risqué) | `HUMAN_APPROVAL` |
| Déploiement production | `HUMAN_APPROVAL` |
| Vulnérabilité `CRITICAL` | `HUMAN_APPROVAL` |
| 3 retries échoués | `HUMAN_REVIEW_REQUIRED` |
| Conflit inter-agents non résolu | `HUMAN_REVIEW_REQUIRED` |

### Modes Orchestrateur
```
AUTONOMOUS              → continue seul
HUMAN_REVIEW_REQUIRED   → attend validation, tâches non bloquantes continuent
HUMAN_APPROVAL_REQUIRED → bloque la branche jusqu'à approval
```

## Logging
- Chaque échec → `.ai/tasks/failed.json` + `.ai/memory/known-issues.md`
- Chaque leçon → `.ai/memory/lessons-learned.md`
