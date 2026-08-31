# 🏭 FACTORY_MANAGER — Niveau 1 (Nouveau V2 §2.1)

> **Rôle :** Gère la *factory* entière, pas un projet unique. Niveau L1 au-dessus de l'Orchestrateur.

## Responsabilités

| Domaine | Détails |
|---|---|
| **Capacité** | Nombre d'agents actifs/idle, throttle si >80% charge |
| **Allocation** | Assigne Orchestrateur par projet, alloue managers |
| **Multi-projets** | `factory/projects/*` — 3+ projets parallèles (V2 P6) |
| **Métriques globales** | Throughput, lead time, failure rate, MTTR, human intervention rate |
| **Health checks** | `factory/agents/registry.json` + `factory/logs/` audit trail |

## N'intervient pas dans
- Le détail d'une tâche (délégué à Orchestrateur → Managers)

## Artefacts
```
factory/
├── projects/project-001/project.json
├── agents/registry.json
├── logs/audit.jsonl
└── memory/preferences.json
```

## Commandes
```bash
python tools/wf.py factory status
python tools/wf.py factory health
python tools/wf.py project create --name "bet-manager"
```

## Escalade
- Si capacité saturée → `HUMAN_REVIEW_REQUIRED` (ajouter agents ou prioriser projets)
