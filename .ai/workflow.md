# Workflow Complet — Chaîne de Production

## Diagramme
```
USER IDEA
  ↓
ORCHESTRATOR (Planner → requirements + roadmap + backlog)
  ↓
PRODUCT ANALYSIS (product-manager) → BUSINESS ANALYSIS (business-analyst)
  ↓ GATE: Product (requirements complets ?)
UX/UI (ux-research → ux-ui → ui-review)
  ↓ GATE: Design
ARCHITECTURE (software-architect → database-architect)
  ↓ GATE: Architecture
TASK GENERATION (orchestrator finalise DAG)
  ↓
DEVELOPMENT (frontend, backend, mobile, integration) — parallélisable si indépendant
  ↓ GATE: Development (code review + tests)
TESTS (qa) → BUG FIXING (retry loop)
  ↓ GATE: QA
SECURITY (security)
  ↓ GATE: Security
STAGING (devops) → E2E (e2e-test)
  ↓ GATE: Release
DEPLOYMENT (devops, HUMAN_APPROVAL si prod) → DOCUMENTATION (documentation)
  ↓
MONITORING → FEEDBACK → NEXT ITERATION
```

## Parallélisation (Dependency Manager)

### Parallélisable
```
ARCH-001
  ├─► DB-001 (database-architect)
  ├─► API design (software-architect)
  └─► DS-001 (ux-ui) — si design déjà validé
→ puis FE-*, BE-*, MOB-* en parallèle si pas de dépendance croisée
```

### Séquentiel obligatoire
```
Backend code → Backend tests → Code review → QA → Security
```

## Niveaux (Scalabilité §10 WF.md)
```
LEVEL 1 — EXECUTIVE ORCHESTRATOR
        │
        ├── LEVEL 2 — Product Manager
        │       ├── PM (L3)
        │       ├── BA (L3)
        │       └── UX (L3)
        │
        ├── LEVEL 2 — Tech Manager (software-architect)
        │       ├── Frontend (L3)
        │       ├── Backend (L3)
        │       ├── Mobile (L3)
        │       └── Database (L3)
        │
        └── LEVEL 2 — Quality Manager
                ├── QA (L3)
                ├── Security (L3)
                └── Review (L3)
```

## Commandes d'orchestration (exemple manuel)
```bash
# 1. Idée → backlog
cat .ai/project/state.json # phase: init

# 2. Router tâche
# Orchestrateur déplace backlog → active
# Agent travaille, retourne payload

# 3. Valider gate
cat .ai/gates.md # checklist
# Si PASS → maj state.json gates.<phase> = "pass"

# 4. Release
# Tous gates PASS + E2E staging PASS + doc à jour → devops deploy
```
