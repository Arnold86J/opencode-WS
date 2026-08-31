# Mission Control Dashboard — V2 §13

```
┌─────────────────────────────────────────────┐
│           SOFTWARE FACTORY                  │
├─────────────────────────────────────────────┤
│ Projects              3                     │
│ Active Agents         12                    │
│ Running Tasks         27                    │
│ Completed             183                   │
│ Failed                 7                    │
│ Auto-fixed             5                    │
│ Human approvals       2                     │
├─────────────────────────────────────────────┤
│ Current Project                               │
│ ████████████████████░░░░ 82%                 │
├─────────────────────────────────────────────┤
│ Frontend       ● Working                     │
│ Backend        ● Working                     │
│ QA             ● Waiting                     │
│ Security       ○ Pending                     │
└─────────────────────────────────────────────┘
```

## Source
- `factory/artifacts/dashboard.json` (temps réel)
- `python tools/wf.py dashboard` (CLI)
- `python tools/wf.py dashboard --json` (JSON)

## Métriques (§13)
- throughput, lead time, failure rate, MTTR, human intervention rate → `factory/logs/audit.jsonl`

## Fichier HTML (optionnel)
Générer un dashboard web en lisant `factory/artifacts/dashboard.json` (voir `templates/dashboard.html` si créé)
