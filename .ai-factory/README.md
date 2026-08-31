# .ai-factory — V3 Autonomous AI Software Factory

> **Vision V3** : Organisation logicielle agentique autonome en boucle fermée OBJECTIVE → … → IMPROVE (WF-V3.md).

## Architecture (§19)

```
.ai-factory/
├── core/               # Moteurs transverses
│   ├── orchestrator/       # FACTORY_COO (ex-Orchestrator V2)
│   ├── planner/            # Objectives → Initiatives → Epics
│   ├── scheduler/          # Sprint auto + allocation ressources
│   ├── state-machine/      # 13 états + boucle autonome
│   ├── policy-engine/      # POLICY_AGENT
│   ├── decision-engine/    # Simulation + Digital Twin
│   └── risk-engine/        # Risk-based autonomy
├── agents/             # 10 familles (§1)
│   ├── strategic/          # STRATEGIC_AGENT
│   ├── product/ architecture/ engineering/ qa/ security/ devops/
│   ├── observability/      # OBSERVABILITY + RCA
│   ├── incident/           # INCIDENT_MANAGER
│   └── analytics/          # EVALUATION + PORTFOLIO
├── intelligence/       # Learning system
│   ├── memory/             # 6 couches V2 + learning V3
│   ├── knowledge/          # ADRs + patterns
│   ├── learning/           # Lessons → Policies
│   ├── evaluation/         # Agent metrics
│   └── simulation/         # Scénarios
├── projects/           # Portfolio multi-projets (mirroir factory/projects)
├── workflows/          # Templates réutilisables
├── policies/           # YAML risk/policy (§11)
├── incidents/          # INC-* lifecycle
├── metrics/            # Métriques agents & business
└── dashboard/          # Mission Control V3
```

## Boucle autonome (§2)

```
OBJECTIVE → PLAN → DESIGN → DEVELOP → TEST → REVIEW → DEPLOY → OBSERVE → MEASURE → LEARN → PRIORITIZE → IMPROVE ↺
```

V2 était `tâches push` ; V3 est `objectifs pull + boucle fermée` (§3).

## Compat V1/V2

- `factory/` (V2) et `.ai/` (V1) conservés — pontés via `tools/wf.py` V3
- `projects/` est un miroir enrichi de `factory/projects/` avec hiérarchie 7 niveaux (§6)

## Commandes V3

```bash
python tools/wf.py objective create --title "Increase WAU" --krs retention,onboarding
python tools/wf.py initiative list --objective OBJ-001
python tools/wf.py incident report --service payments-api --severity high
python tools/wf.py policy check --action production_deployment
python tools/wf.py evaluation report --agent frontend
python tools/wf.py portfolio recommend
python tools/wf.py simulation run --options monolith,microservices,modular
python tools/wf.py dashboard --v3
```
