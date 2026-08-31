# Migration V2 → V3

| V2 | V3 |
|---|---|
| Orchestration (tâches push) | **Autonomie** — boucle OBJECTIVE→IMPROVE (§2) |
| Tasks (DAG) | **Objectives + Initiatives** — 7 niveaux (§6) |
| Factory Manager + Orchestrator + 4 Managers | + **STRATEGIC_AGENT** (§4) + **FACTORY_COO** (§5) |
| Planning manuel | **Autonomous planning** — SPRINT_MANAGER (§12) |
| Tests basiques | **Continuous verification** — Quality Gates + Self-Healing |
| Monitoring | **Observability intelligence** — OBSERVABILITY + RCA (§8) |
| Errors → retry | **Self-healing** — SELF_HEALING_ENGINE (§9) |
| Memory 6 couches | **Learning system** — POLICY_AGENT (§11) + Lessons |
| Backlog | **Autonomous backlog** — Initiatives + Objectives |
| Sprint fixe | **Autonomous sprint** — priorisation auto |
| Review 4 agents | **Continuous evaluation** — AGENT_EVALUATION (§13) |
| Fixed routing | **Dynamic routing** (§14) + **Allocation** (§15) |
| One project | **Portfolio** — PORTFOLIO_MANAGER (§16) |
| Human approval fixe | **Risk-based** 4 niveaux (§9,12) |
| Factory/ datastore | **.ai-factory/** (§19) — core, agents, intelligence, policies, incidents, metrics, dashboard |

## Fichiers

- `factory/` (V2) conservé — miroir de `.ai-factory/projects/`
- `.ai/` (V1) conservé
- Nouvelle source de vérité : `.ai-factory/` + `tools/wf.py` V3 (16/16 tests PASS)

## Compat CLI

Toutes commandes V2 restent valides. Nouvelles commandes V3 :
`objective`, `initiative`, `incident`, `observability`, `rca`, `heal`, `policy`, `sprint`, `evaluation`, `routing`, `allocation`, `portfolio`, `simulation`, `twin`, `dashboard --v3`
