# WF-V2 : AI Software Factory — Spécification d'architecture

> **Objectif** : Transformer la V1 (orchestrateur centralisé + agents spécialisés) en une **Software Factory agentique hiérarchique, auto-récupérative, multi-projets**, capable de piloter un projet de l'idéation à la production avec un minimum d'intervention humaine.

---

## 1. Vision d'ensemble

### 1.1 Différence V1 → V2

| Dimension | V1 (Actuel) | V2 (Cible) |
|-----------|-------------|------------|
| **Architecture** | Orchestrateur central + agents plats | Hiérarchie : Factory Manager → Orchestrateur → Managers → Spécialistes |
| **Planification** | Liste de tâches séquentielle | **Task Graph (DAG)** avec dépendances, parallélisation auto |
| **Exécution** | Fire-and-forget | Exécution + **auto-recovery** (détection → diagnostic → fix → test) |
| **Qualité** | Tests basiques | **Quality Gates** binaires par phase + **Multi-agent Code Review** |
| **Git** | Branches basiques | **Git natif** : feature branches, PR automatiques, merge géré |
| **CI/CD** | Externe | **Pipeline agentique** intégrée (build → test → security → staging → prod) |
| **Mémoire** | Projet unique | **Mémoire multi-couches** (projet, agents, décisions, erreurs, préférences) |
| **État** | Implicite | **State Machine** explicite (IDEATION → … → PRODUCTION → MONITORING) |
| **Humain** | Boucle sur toute erreur | **Risk-based** : Low=auto, Medium=manager, High=human |
| **Observabilité** | Logs | **Mission Control Dashboard** temps réel |
| **Multi-projets** | Non | **Factory Manager** gère capacité, allocation, projets parallèles |

---

## 2. Architecture hiérarchique (3 niveaux)

```
                          FACTORY MANAGER
                                 │
                          ORCHESTRATOR
                                 │
        ┌────────────────────────┼────────────────────────┐
        ▼                        ▼                        ▼
 PRODUCT MANAGER           TECH MANAGER            QUALITY MANAGER
        │                        │                        │
   ┌────┼────┐            ┌─────┼─────┐            ┌────┼────┐
   ▼    ▼    ▼            ▼     ▼     ▼            ▼    ▼    ▼
  PM   BA   UX          ARCH  FRONT  BACK          QA   SEC  REVIEW
                           │     │     │
                           ├─────┼─────┤
                           ▼     ▼     ▼
                        DATABASE MOBILE DEVOPS
                                   │
                                   ▼
                          DELIVERY MANAGER
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
         STAGING              PRODUCTION           MONITORING
```

### 2.1 Niveau 1 — Factory Manager (nouveau)
- **Rôle** : Gère la *factory* entière (pas un projet unique)
- **Responsabilités** : Capacité agents, allocation ressources, multi-projets, métriques globales, health checks

### 2.2 Niveau 2 — Orchestrateur (évolué)
- **Rôle** : Un projet = un orchestrateur
- **Responsabilités** : Objectif → Roadmap → Phases → Managers → Résultats
- **Ne fait plus** : Micro-management tâche par tâche

### 2.3 Niveau 3 — Domain Managers (4)
| Manager | Agents supervisés | Focus |
|---------|-------------------|-------|
| **Product Manager** | PM, BA, UX | Discovery, requirements, UX, acceptance criteria |
| **Tech Manager** | ARCH, FRONT, BACK, DATABASE, MOBILE, DEVOPS | Architecture, implémentation, infra |
| **Quality Manager** | QA, SEC, REVIEW | Tests, sécurité, revues, gates |
| **Delivery Manager** | STAGING, PRODUCTION, MONITORING | Déploiement, release, observabilité runtime |

### 2.4 Niveau 4 — Specialist Agents (exécutants)
Frontend, Backend, Mobile, Database, UX/UI, QA, Security, DevOps, Architecture, Business Analyst, Product Manager, etc.

---

## 3. Task Graph & Planification (DAG)

### 3.1 Format de tâche
```json
{
  "task_id": "TASK-045",
  "title": "Implement dashboard",
  "agent": "frontend-agent",
  "status": "blocked",
  "depends_on": ["TASK-042", "TASK-043", "TASK-044"],
  "retry_policy": {
    "max_attempts": 3,
    "backoff": "exponential",
    "escalate_after_failure": true
  }
}
```

### 3.2 États calculables automatiquement
`READY` → `RUNNING` → `COMPLETED`  
`BLOCKED` (dépendances non résolues)  
`FAILED` → `RETRYING` (max N) → `ESCALATED`  
`REVIEW` → `APPROVED` / `CHANGES_REQUIRED`

### 3.3 Exemple de dépendances (EPIC-004 Dashboard)
```
TASK-041 (Analyse UX) ──┐
TASK-042 (Design)       ├────► TASK-045 (Frontend)
TASK-043 (API stats)    ┤
TASK-044 (Schéma data)  ┘
                              │
                              ▼
                         TASK-046 (Unit tests)
                              │
                              ▼
                         TASK-047 (E2E tests)
                              │
                    ┌─────────┴─────────┐
                    ▼                   ▼
              TASK-048 (Sec review)  Performance
                    └─────────┬─────────┘
                              ▼
                          RELEASE
```

### 3.4 Parallélisation intelligente
L'Orchestrateur calcule le **front d'exécution** (tasks `READY` sans dépendances bloquantes) et lance tout ce qui est parallélisable :
```
Architecture
      │
 ┌────┼────────┐
 ▼    ▼        ▼
 UX   DB       API
 │    │        │
 └────┼────────┘
      ▼
  Frontend
```

---

## 4. Auto-Recovery (Self-Healing)

### 4.1 Boucle de récupération
```
Agent Spécialiste
       ↓ (échec : build, test, lint, type)
Error Analyzer / DEBUGGER_AGENT
       ↓
Root Cause Analysis
       ↓
Affected Files + Proposed Fix + Risk + Regression Tests
       ↓
Agent Spécialiste (retry)
       ↓
Tests + Quality Gates
```

### 4.2 DEBUGGER_AGENT (nouveau)
**Entrées** : error, logs, stack trace, recent changes, tests, git diff  
**Sorties** : Root Cause, Affected Files, Proposed Fix, Risk Assessment, Regression Tests  
**Note** : Ne modifie pas le code directement — fournit un diagnostic au développeur concerné.

### 4.3 Politique de retry
```json
{
  "retry_policy": {
    "max_attempts": 3,
    "backoff": "exponential",
    "escalate_after_failure": true
  }
}
```

---

## 5. Multi-Agent Code Review

### 5.1 Revue parallélisée
```
CODE
 ↓
┌──────────────┬──────────────┬──────────────┬──────────────┐
│ Architecture │  Security    │ Performance  │ Maintainability│
│   Review     │   Review     │   Review     │   Review      │
└──────────────┴──────────────┴──────────────┴──────────────┘
       ↓
REVIEW_MANAGER (agrégation)
       ↓
Architecture   ✅
Security       ⚠️
Performance    ✅
Quality        ❌
       ↓
CHANGES_REQUIRED (feedback ciblé au développeur)
```

---

## 6. Git & Pull Requests Natifs

### 6.1 Workflow par tâche
```
main
 │
 └── feature/TASK-045-dashboard
       │
       ├── implementation (commits atomiques)
       ├── tests
       └── commit (conventional commits)
              ↓
            Pull Request (auto-créée)
              ↓
         Review Agents (parallèle)
              ↓
         Fixes (auto-recovery si possible)
              ↓
         Approval → Merge (squash ou rebase)
```

### 6.2 Règles
- L'agent **ne touche jamais** `main` directement
- Branche = 1 tâche (ou 1 epic si groupé)
- PR auto-générée avec description, tests, checklist gates

---

## 7. CI/CD Agentique (Pipeline Intégré)

```
PUSH
  │
  ▼
BUILD
  │
  ▼
UNIT TESTS
  │
  ▼
INTEGRATION TESTS
  │
  ▼
CODE ANALYSIS (lint, type, complexity)
  │
  ▼
SECURITY SCAN (SAST, deps, secrets)
  │
  ▼
E2E TESTS
  │
  ▼
STAGING DEPLOY
  │
  ▼
RELEASE GATE (Quality Manager approval)
  │
  ▼
PRODUCTION DEPLOY
  │
  ▼
MONITORING (health, metrics, alerts)
```

**L'Orchestrateur reçoit les résultats à chaque étape** et décide : continuer, rollback, escalader.

---

## 8. Quality Gates (Binaires, par phase)

| Gate | Critères (tous obligatoires) |
|------|------------------------------|
| **Product** | Requirements complete • Acceptance criteria defined • MVP validated |
| **Design** | Screens complete • Design system complete • Responsive rules • Accessibility considered |
| **Architecture** | Arch doc • API spec (OpenAPI) • DB schema • Security model |
| **Development** | Build passes • Tests pass • No critical lint • No type errors |
| **Release** | QA PASS • Security PASS • E2E PASS • Performance PASS • Docs PASS |

> **Règle** : Aucun passage automatique si un gate critique échoue. Escalade selon risque.

---

## 9. Mémoire Multi-Couches (V2)

```
MEMORY
│
├── Project Memory        # Contexte projet : roadmap, decisions, specs
├── Agent Memory          # Contexte par agent : patterns, préférences, historique
├── Technical Decisions   # ADR : choix tech, rationale, alternatives
├── Lessons Learned       # Post-mortems, patterns réussis/échoués
├── Error Memory          # Erreurs récurrentes + solutions (ex: PG migration conflict)
└── User Preferences      # Style, conventions, règles implicites
```

### 9.1 Exemple Error Memory
```json
{
  "pattern": "PostgreSQL migration conflict",
  "known_issue": "Migration ordering problem with concurrent branches",
  "previous_solution": "Use advisory locks + ordered migration runner",
  "recommended_prevention": "Enforce linear migration history in CI"
}
```

---

## 10. Architecture d'État Global (Datastore)

```
factory/
│
├── projects/
│   └── project-001/
│       ├── project.json      # Métadonnées, config
│       ├── state.json        # État courant (state machine)
│       ├── roadmap.json      # Epics, tasks, dépendances
│       └── decisions.json    # ADR locaux
│
├── tasks/              # Task Graph global (tous projets)
├── agents/             # Registre agents, capacités, santé
├── workflows/          # Templates de workflows réutilisables
├── reviews/            # Historique reviews, décisions
├── artifacts/          # Build outputs, reports, coverage
├── logs/               # Audit trail structuré
└── memory/             # Mémoire persistante (voir §9)
```

---

## 11. Project State Machine

```
IDEATION
   ↓
DISCOVERY
   ↓
PLANNING
   ↓
DESIGN
   ↓
ARCHITECTURE
   ↓
DEVELOPMENT
   ↓
INTEGRATION
   ↓
QA
   ↓
SECURITY
   ↓
STAGING
   ↓
RELEASE
   ↓
PRODUCTION
   ↓
MONITORING
```

### 11.1 Transitions contrôlées (exemple)
```
DEVELOPMENT
      ↓
   QA PASS ?
   /       \
 NO         YES
 |           |
FIX       SECURITY
```

Chaque transition = **Quality Gate** (voir §8) + validation humaine si risque HIGH.

---

## 12. Human-in-the-Loop (Risk-Based)

| Niveau de risque | Action | Exemples |
|------------------|--------|----------|
| **LOW** | Autonomous | Créer composant UI, écrire test, refactor interne |
| **MEDIUM** | Manager Review | Modifier API publique, changer schema DB, config infra |
| **HIGH** | Human Approval | Supprimer données prod, déployer prod, migration destructive, architecture contestée |

> La V2 **ne demande l'humain que pour les décisions importantes**.

---

## 13. Observabilité — Mission Control Dashboard

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

Métriques temps réel : throughput, lead time, failure rate, MTTR, human intervention rate.

---

## 14. Agentic Control Plane (Transversal)

Ces composants traversent **toute** la factory :

| Composant | Description |
|-----------|-------------|
| **Task Graph** | DAG de tâches, ordonnancement, parallélisation |
| **State Machine** | États projet/tâche, transitions gardées |
| **Memory** | Multi-couches (§9), apprentissage continu |
| **Git** | Branches, PR, merge, history comme source de vérité |
| **CI/CD** | Pipeline agentique intégrée (§7) |
| **Quality Gates** | Gates binaires par phase (§8) |
| **Retry / Recovery** | Auto-diagnostic, auto-fix, escalade (§4) |
| **Observability** | Dashboard, alerting, tracing (§13) |
| **Human Approval** | Workflow risk-based (§12) |

---

## 15. Roadmap d'implémentation suggérée

| Phase | Livrables | Critères de sortie |
|-------|-----------|---------------------|
| **P0 - Fondations** | Task Graph (DAG), State Machine, Datastore, CLI `wf` étendu | `wf task graph` fonctionne, état persistant |
| **P1 - Hiérarchie** | Factory Manager, 4 Domain Managers, delegation | Orchestrateur ne connaît plus les agents feuilles |
| **P2 - Auto-Recovery** | DEBUGGER_AGENT, retry policies, error memory | 80%+ des échecs build/test auto-résolus |
| **P3 - Quality** | Multi-agent review, Quality Gates, CI/CD pipeline | Gates bloquants, PR auto, release gated |
| **P4 - Git Native** | Feature branches, PR auto, conventional commits | Zero direct push to main |
| **P5 - Observabilité** | Mission Control Dashboard, metrics, alerting | Visibilité temps réel complète |
| **P6 - Multi-Projets** | Factory Manager capacité, allocation, scheduling | 3+ projets parallèles stables |

---

## 16. Fichiers connexes dans ce workspace

| Chemin | Rôle |
|--------|------|
| `.claude/skills/wf/SKILL.md` | Protocole complet Orchestrateur V1 (base de migration) |
| `.claude/agents/*.md` | 17 fiches de rôle spécialistes (à mapper vers V2) |
| `tools/wf.py` | CLI d'état (source de vérité — à étendre pour V2) |
| `tests/test_wf.py` | Tests CLI (à étendre) |
| `templates/` | Modèles CI/CD, Git workflow, staging (réutilisables) |
| `.ai/` | État projet courant (créé par `wf init`) |

---

*Document vivant — à versionner avec le code de la factory.*