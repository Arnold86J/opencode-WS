# .ai — Mémoire persistante de la Software Factory

Ce dossier est la **source de vérité** du projet. Les agents ne dépendent pas du contexte conversationnel.

## Contenu

| Dossier | Rôle |
|---|---|
| `agents/` | 1 orchestrator + 18 specialists (8 pôles) |
| `project/` | `state.json` (temps réel), requirements, roadmap, architecture, decisions, changelog |
| `tasks/` | `backlog/active/completed/failed.json` — seul l'Orchestrateur écrit |
| `reviews/` | Rapports code/security/qa + gates |
| `memory/` | lessons-learned, conventions, known-issues |

## Fichiers racine

- `protocol.md` — contrat JSON inter-agents
- `gates.md` — 6 Quality Gates
- `workflow.md` — chaîne complète
- `retry-policy.md` — retry + escalade humaine

## Usage par l'Orchestrateur

```bash
cat .ai/project/state.json
cat .ai/tasks/backlog.json | jq '.tasks[] | {id: .task_id, agent, priority}'
cat .ai/memory/conventions.md
```
