# Factory Datastore — V2 §10

```
factory/
├── projects/project-001/
│   ├── project.json
│   ├── state.json      # State Machine 13 états
│   ├── roadmap.json
│   └── decisions.json
├── tasks/graph.json    # Task Graph DAG global
├── agents/registry.json
├── workflows/          # templates réutilisables
├── reviews/
├── artifacts/dashboard.json
├── logs/audit.jsonl
└── memory/             # 6 couches (§9)
    ├── project.json
    ├── agent-memory.json
    ├── decisions.json
    ├── lessons.json
    ├── error-memory.json
    └── preferences.json
```

Voir `WF-V2.md` + `tools/wf.py`.
