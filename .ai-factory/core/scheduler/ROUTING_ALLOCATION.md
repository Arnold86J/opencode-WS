# 🔀 Routage & Allocation Dynamiques — V3 §14-15

## Routage dynamique (§14)

> L'Orchestrateur ne choisit plus toujours le même agent.

**Critères** : Task type, Complexity, Past performance, Workload, Required skills

**Exemple §14** :
```
Task: Optimize PG query → Candidates: DB A 8.1, DB B 9.4 ← SELECTED, Backend 7.8
```

**Implémentation** : `intelligence/evaluation/report.json` → score → scheduler choisit meilleur.

## Allocation dynamique (§15)

**Ressources** : Agent capacity, Context, Cost, Parallel slots, Model usage, Time

**Arbitrage multi-projets §15** :
```
Project A urgent → 60%
Project B normal → 30%
Project C low    → 10%
```

**Artefacts** :
```
.ai-factory/metrics/allocation.json
factory/agents/registry.json (capacity)
```

## Commandes

```bash
python tools/wf.py routing recommend --task "Optimize PG query"
python tools/wf.py allocation show
python tools/wf.py allocation set --project project-001 --share 60
```
