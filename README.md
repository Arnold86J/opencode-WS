# AI Software Factory — V3

> Organisation logicielle agentique autonome (WF.md v1.0 + WF-V2.md v2.0 + WF-V3.md v3.0 — 25/08/2026)
> **V3 :** HUMAN → STRATEGIC_AGENT → FACTORY_COO → 4 Managers → Agents + boucle autonome OBJECTIVE→IMPROVE + Self-Healing + Portfolio

## Nouveautés V3 (§20)
- **Boucle autonome** 12 étapes `OBJECTIVE→…→IMPROVE` (` .ai-factory/core/state-machine/autonomous-loop.json:1`) + **Objectifs pull** (§3) vs tâches push
- **STRATEGIC_AGENT** (` .ai-factory/agents/strategic/STRATEGIC_AGENT.md:1`) + **FACTORY_COO** (` .ai-factory/core/orchestrator/FACTORY_COO_AGENT.md:1`) + hiérarchie 7 niveaux (§6) `initiatives.json`
- **Feedback continu** OBSERVABILITY + RCA (§8) + INCIDENT_MANAGER (§10) + Self-Healing (§9) + POLICY_AGENT (§11) YAML
- **Sprint auto** (§12), **Évaluation agents** (§13), **Routage/Allocation dynamiques** (§14-15), **Portfolio** (§16), **Simulation + Digital Twin** (§17-18) — CLI V3 16/16 tests PASS

## Compat
- **V2 :** `factory/` (DAG, State Machine 13 états) + **V1 :** `.ai/` conservés — nouvelle vérité `.ai-factory/` (§19) — `MIGRATION_V2_V3.md:1`

## Démarrage rapide

```bash
# 1. Idée → Orchestrateur décompose
cat .ai/project/state.json          # phase: init
cat .ai/tasks/backlog.json          # 6 tâches bootstrap

# 2. Lancer le cycle
# L'Orchestrateur route PROD-001 → product-manager, etc.
# Chaque agent retourne un payload JSON (cf. .ai/protocol.md)
# Chaque transition est gardée par un Quality Gate (cf. .ai/gates.md)
```

## Structure `.ai/` (mémoire persistante)

```
.ai/
├── agents/          # 18 agents + orchestrator (10 sous-modules)
├── project/         # state.json, requirements, roadmap, architecture, decisions, changelog
├── tasks/           # backlog / active / completed / failed (JSON)
├── reviews/         # code / security / qa
├── memory/          # lessons-learned, conventions, known-issues
├── protocol.md      # contrat JSON inter-agents
├── gates.md         # 6 Quality Gates PASS/FAIL
├── workflow.md      # chaîne complète
└── retry-policy.md  # retry + escalade humaine
```

## Workflow

```
Idea → Product → Design → Architecture → Dev → QA → Security → DevOps → Doc
       (chaque → est un Gate)
```

## Agents (18)

| Pôle | Agents |
|---|---|
| Produit | product-manager, business-analyst |
| Design | ux-research, ux-ui, ui-review |
| Architecture | software-architect, database-architect |
| Dev | frontend, backend, mobile, integration |
| QA | qa, e2e-test, bug-hunter |
| Sécurité | security, code-reviewer |
| DevOps | devops |
| Doc | documentation |

Orchestrateur = 10 sous-modules : Planner, Task/Dependency/Agent Router, State, Validator, Error/Retry, Conflict, Human Escalation, Release.

## Protocole

Tout échange = JSON structuré avec `status: DONE|FAILED|BLOCKED|NEEDS_REVIEW|NEEDS_HUMAN` (cf. `.ai/protocol.md`).

## Gates

Design, Architecture, Development, QA, Security, Release — tous binaires PASS/FAIL (cf. `.ai/gates.md`).

## Exemple

> Prompt : « Crée une app de gestion de paris sportifs »
> → Orchestrateur génère 47 tâches → distribue → séquence Architecture PASS → DEV parallèle → QA → Security → Staging E2E → Production (avec approval humaine).

## Conventions

Voir `.ai/memory/conventions.md`.

---
*Généré depuis WF.md — Factory prête à l'emploi.*
