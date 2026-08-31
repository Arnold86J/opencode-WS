# WF — AI Software Factory

> **Vision :** Ne pas penser "plusieurs agents qui codent", mais une **entreprise virtuelle de développement** pilotée par un agent central.
> **Principe :** L'utilisateur ne parle qu'à l'**Orchestrateur**, qui transforme l'idée en projet structuré et déclenche les bons métiers.

**Version :** 1.0 — 25 août 2026

---

## Sommaire

1. [Principe fondamental](#1-principe-fondamental)
2. [Architecture globale](#2-architecture-globale)
3. [Organisation — Les 8 pôles](#3-organisation--les-8-pôles)
   - [3.1 Pôle Produit](#31-pôle-1--produit)
   - [3.2 Pôle Design](#32-pôle-2--design)
   - [3.3 Pôle Architecture](#33-pôle-3--architecture)
   - [3.4 Pôle Développement](#34-pôle-4--développement)
   - [3.5 Pôle QA](#35-pôle-5--qa)
   - [3.6 Pôle Sécurité](#36-pôle-6--sécurité)
   - [3.7 Pôle DevOps](#37-pôle-7--devops)
   - [3.8 Pôle Documentation](#38-pôle-8--documentation)
4. [L'Orchestrateur — Cœur du système](#4-lorchestrateur--cœur-du-système)
5. [Workflow complet](#5-workflow-complet)
6. [Système de mémoire persistante](#6-système-de-mémoire-persistante)
7. [Protocole de communication inter-agents](#7-protocole-de-communication-inter-agents)
8. [Quality Gates](#8-quality-gates)
9. [Système d'escalade humaine](#9-système-descalade-humaine)
10. [Architecture à 3 niveaux — Scalabilité](#10-architecture-à-3-niveaux--scalabilité)
11. [Exemple concret de bout en bout](#11-exemple-concret-de-bout-en-bout)
12. [Les 10 règles d'or](#12-les-10-règles-dor)
13. [Vision long terme : AI Software Company](#13-vision-long-terme--ai-software-company)
14. [Prochaine étape — Implémentation V1](#14-prochaine-étape--implémentation-v1)

---

## 1. Principe fondamental

Ton système doit fonctionner comme une **chaîne de production logicielle**.

### Interaction utilisateur

```
Utilisateur  →  ORCHESTRATEUR  →  Système multi-agents
```

**Exemple de prompt utilisateur :**
> « Je veux une application mobile et web de gestion de paris sportifs. »

L'Orchestrateur transforme cette demande en projet structuré puis déclenche les différents métiers. Il ne code pas lui-même.

### Rôle de l'Orchestrateur

| Responsabilité | Description |
|---|---|
| Analyser | Comprendre et qualifier la demande |
| Décomposer | Découper le projet en domaines / épics / tâches |
| Planifier | Créer les tâches et gérer les dépendances |
| Affecter | Router chaque tâche vers le bon agent spécialiste |
| Contrôler | Suivre l'état du projet en temps réel |
| Valider | Faire effectuer les validations (gates) |
| Corriger | Relancer un agent en cas d'échec |
| Arbitrer | Résoudre les conflits entre agents |
| Versionner | Gérer les versions et les releases |
| Séquence | Décider quand passer à l'étape suivante |
| Escalader | Demander une intervention humaine uniquement si nécessaire |

---

## 2. Architecture globale

### Vue d'ensemble — Entreprise virtuelle

```
                         ┌─────────────────────────┐
                         │   👑 ORCHESTRATEUR      │
                         │   Agent CEO / PM / COO  │
                         └────────────┬────────────┘
                                      │
                ┌─────────────────────┼─────────────────────┐
                │                     │                     │
                ▼                     ▼                     ▼
       ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐
       │ PÔLE PRODUIT    │   │ PÔLE TECHNIQUE  │   │ PÔLE QUALITÉ    │
       └────────┬────────┘   └────────┬────────┘   └────────┬────────┘
                │                     │                     │
     ┌──────────┼──────────┐   ┌──────┼────────────┐   ┌────┼───────────┐
     ▼          ▼          ▼   ▼      ▼            ▼   ▼    ▼           ▼
  Product     BA       UX/UI  Architect Frontend Backend QA Security   Review
  Manager    Analyst   Designer   │        │        │
                                  │        │        │
                                  ▼        ▼        ▼
                               Coding   Coding   Coding
                                Agents   Agents   Agents
                                     
                         ┌───────────────────────┐
                         │  DEVOPS / INFRA       │
                         │  CI/CD • Deploy       │
                         │  Monitoring           │
                         └───────────────────────┘
```

### Flux d'orchestration idéal

```
YOU (idée) → ORCHESTRATEUR → PRODUCT → DESIGN → ARCHITECTURE → DEV → QA → SECURITY → DEVOPS → DOC
```

> **Idée clé :** Les agents ne travaillent pas tous simultanément sans contrôle. L'Orchestrateur décide quelles tâches peuvent être parallélisées et lesquelles doivent être séquentielles.

**Parallélisable :**
```
Architecture
     │
     ├──────────► Database Agent
     ├──────────► UI Agent
     └──────────► API Design Agent
                         │
                         ▼
                    Dev Agents
```

**Séquentiel (obligatoire) :**
```
Backend coding → Backend tests → Code review → QA → Security
```

---

## 3. Organisation — Les 8 pôles

> Base : **8 grands pôles** couvrant tout le cycle de vie produit.

### 3.1 Pôle 1 — Produit 🧠

#### `PRODUCT_MANAGER_AGENT`
Responsable du produit. Transforme l'idée en :

- Vision produit · Objectifs · Personas · Fonctionnalités · MVP · Roadmap · Priorités · Critères d'acceptation

**Artefacts produits :**
```
product/
├── vision.md
├── personas.md
├── requirements.md
├── roadmap.md
└── mvp.md
```

#### `BUSINESS_ANALYST_AGENT`
Analyse approfondie des besoins. Transforme les demandes selon la chaîne :

```
Epic → Feature → User Story → Acceptance Criteria → Technical Task
```

**Exemple :**

> **Epic :** Gestion des paris
> **Feature :** Ajouter un pari
> **User Story :** En tant qu'utilisateur, je veux enregistrer un pari afin de suivre mes performances.
> **Acceptance Criteria :**
> - montant obligatoire
> - cote obligatoire
> - sport obligatoire
> - compétition obligatoire
> - date obligatoire
> - statut initial = `pending`

---

### 3.2 Pôle 2 — Design 🎨

#### `UX_RESEARCH_AGENT`
Analyse : utilisateurs · parcours · problèmes · comportements · UX.

#### `UX_UI_AGENT`
Responsable : architecture de l'interface · wireframes · design system · composants · responsive · mobile UX.

**Artefacts :**
```
design/
├── design-system.md
├── ux-flow.md
├── components.md
├── screens.md
└── ux-rules.md
```

#### `UI_REVIEW_AGENT`
Directeur artistique. Vérifie : cohérence visuelle · spacing · typographie · responsive · accessibilité · cohérence du design system.

---

### 3.3 Pôle 3 — Architecture 🏗️

> Pôle extrêmement important — conditionne tout le reste.

#### `SOFTWARE_ARCHITECT_AGENT`
Décide : architecture frontend · backend · mobile · API · base de données · authentification · stockage · cache · architecture des services · structure du repository.

**Artefacts :**
```
architecture/
├── architecture.md
├── tech-stack.md
├── database.md
├── api.md
├── security.md
└── infrastructure.md
```

#### `DATABASE_ARCHITECT_AGENT`
Responsable : modèle de données · relations · index · contraintes · migrations · optimisation.

---

### 3.4 Pôle 4 — Développement 💻

#### `FRONTEND_AGENT`
`React` · `Next.js` · `TypeScript` · `Tailwind` · State management · Forms · API integration

#### `BACKEND_AGENT`
`API` · Business logic · Authentication · Authorization · Services · Queues · Caching · Validation

#### `MOBILE_AGENT`
`React Native` · `Expo` · `Flutter` (ou autre stack)

#### `INTEGRATION_AGENT`
API externes · paiement · email · notifications · stockage · authentification OAuth · services tiers

---

### 3.5 Pôle 5 — QA 🧪

> **Erreur classique :** laisser les agents développeurs valider leur propre travail. Il faut séparer les responsabilités.

#### `QA_AGENT`
Tests fonctionnels · intégration · régression · edge cases · error handling

#### `E2E_TEST_AGENT`
Vérifie les scénarios utilisateur complets :
```
Login → Dashboard → Create bet → Save → View statistics → Edit → Delete
```

#### `BUG_HUNTER_AGENT`
Son rôle : **essayer de casser l'application**. Recherche : bugs · incohérences · comportements inattendus · erreurs de validation · problèmes responsive · régressions.

---

### 3.6 Pôle 6 — Sécurité 🔐

#### `SECURITY_AGENT`
Analyse : OWASP · authentification · autorisation · injection · XSS · CSRF · secrets · données sensibles · API · dépendances · permissions.

#### `CODE_REVIEW_AGENT`
Revue indépendante : Architecture · Code quality · Security · Performance · Maintainability · Standards.

**Verdict :**
```
✅ APPROVED  |  🔁 CHANGES_REQUIRED
```

---

### 3.7 Pôle 7 — DevOps 🚀

#### `DEVOPS_AGENT`
Responsable : Git · branches · CI/CD · build · tests automatisés · Docker · déploiement · environnements · variables d'environnement.

**Pipeline :**
```
Development → Pull Request → CI → Tests → QA → Security → Build → Staging → E2E → Production
```

---

### 3.8 Pôle 8 — Documentation 📚

#### `DOCUMENTATION_AGENT`
Maintient automatiquement : README · API docs · Architecture docs · Setup guide · Deployment guide · Changelog · Technical decisions · User documentation.

> ⚠️ Ne doit surtout pas écrire une documentation indépendante de la réalité du code. Il travaille à partir de l'état réel du projet.

---

## 4. L'Orchestrateur — Cœur du système

L'Orchestrateur est beaucoup plus intelligent qu'un simple routeur d'agents. Il embarque 10 sous-responsabilités :

```
ORCHESTRATOR
│
├── Planner              → décompose le projet
├── Task Manager         → crée et suit les tâches
├── Dependency Manager   → gère les dépendances
├── Agent Router         → affecte au bon spécialiste
├── State Manager        → source de vérité du projet
├── Validator            → déclenche les gates
├── Error Manager        → capte et qualifie les erreurs
├── Retry Manager        → relance intelligemment
├── Conflict Resolver    → arbitre les conflits
├── Human Escalation     → escalade si nécessaire
└── Release Manager      → décide du Go / No-Go release
```

### État maintenu par l'Orchestrateur (exemple)

```json
{
  "project": "bet-manager",
  "phase": "development",
  "status": "in_progress",
  "current_sprint": 2,
  "tasks_total": 47,
  "tasks_completed": 31,
  "tasks_failed": 2,
  "qa_status": "pending",
  "security_status": "pending",
  "deployment_status": "pending"
}
```

---

## 5. Workflow complet

### Chaîne de production logicielle

```
USER IDEA
   ↓
ORCHESTRATOR
   ↓
PRODUCT ANALYSIS → BUSINESS ANALYSIS → UX/UI → ARCHITECTURE → DATABASE
   ↓
TASK GENERATION
   ↓
DEVELOPMENT → CODE REVIEW → TESTS → BUG FIXING
   ↓
SECURITY → PERFORMANCE → STAGING → E2E TESTS → RELEASE REVIEW
   ↓
DEPLOYMENT → DOCUMENTATION → MONITORING → FEEDBACK → NEXT ITERATION
```

Chaque transition est gardée par un **Quality Gate** (cf. §8).

---

## 6. Système de mémoire persistante

Pour un système sérieux, il faut une mémoire projet persistante. Les agents ne doivent pas dépendre uniquement du contexte conversationnel.

```
.ai/
│
├── agents/
│   ├── orchestrator.md
│   ├── product-manager.md
│   ├── business-analyst.md
│   ├── ux-ui.md
│   ├── architect.md
│   ├── frontend.md
│   ├── backend.md
│   ├── mobile.md
│   ├── qa.md
│   ├── security.md
│   ├── devops.md
│   └── reviewer.md
│
├── project/
│   ├── state.json
│   ├── requirements.md
│   ├── roadmap.md
│   ├── architecture.md
│   ├── decisions.md
│   └── changelog.md
│
├── tasks/
│   ├── backlog.json
│   ├── active.json
│   ├── completed.json
│   └── failed.json
│
├── reviews/
│   ├── code/
│   ├── security/
│   └── qa/
│
└── memory/
    ├── lessons-learned.md
    ├── conventions.md
    └── known-issues.md
```

---

## 7. Protocole de communication inter-agents

> Indispensable : chaque agent reçoit une tâche structurée et retourne un résultat structuré.

### Exemple de payload retourné

```json
{
  "task_id": "TASK-042",
  "agent": "frontend-agent",
  "status": "completed",
  "summary": "Dashboard implemented",
  "files_changed": [
    "src/pages/dashboard.tsx",
    "src/components/stats-card.tsx"
  ],
  "tests": {
    "status": "passed",
    "count": 18
  },
  "issues": [],
  "next_actions": ["Run E2E tests"]
}
```

### Statuts standardisés

| Statut | Signification | Action Orchestrateur |
|---|---|---|
| `DONE` | Tâche terminée avec succès | Passe à la suivante |
| `FAILED` | Échec d'exécution | Retry ou escalade |
| `BLOCKED` | Dépendance manquante | Débloque la dépendance |
| `NEEDS_REVIEW` | Nécessite revue humaine ou gate | Déclenche le gate |
| `NEEDS_HUMAN` | Décision humaine obligatoire | Escalade |

**Bénéfice :** l'Orchestrateur comprend immédiatement l'état sans parser du texte libre.

---

## 8. Quality Gates

Chaque grande étape possède un Quality Gate binaire : `PASS` / `FAIL`.

### Exemple : Gate Architecture

```
Gate Architecture
  ├─ Architecture complete ?      [✓]
  ├─ Database defined ?           [✓]
  ├─ API defined ?                [✓]
  ├─ Security considered ?        [✓]
  └─ Scalability considered ?     [✓]
                    ↓
                  PASS → débloque Dev
                  FAIL → retour Architect
```

### Gates du système

| Gate | Contrôle |
|---|---|
| **Design Gate** | Cohérence UX, design system, accessibilité |
| **Architecture Gate** | Complétude tech, DB, API, sécu, scalabilité |
| **Development Gate** | Code review + tests passés |
| **QA Gate** | Tests fonctionnels, E2E, non-régression |
| **Security Gate** | OWASP, secrets, permissions, dépendances |
| **Release Gate** | Staging OK, E2E OK, doc à jour |

> Ça rend le système beaucoup plus proche d'une vraie organisation professionnelle.

---

## 9. Système d'escalade humaine

Il ne faut pas essayer d'automatiser absolument tout. L'Orchestrateur doit pouvoir dire :

```
AUTONOMOUS  →  continue seul
HUMAN_REVIEW_REQUIRED  →  attend validation humaine
```

### Cas d'escalade

| Situation | Action |
|---|---|
| Architecture contestée | → Human approval |
| Destructive database migration | → Human approval |
| Production deployment | → Human approval |
| Security critical vulnerability | → Human approval |

---

## 10. Architecture à 3 niveaux — Scalabilité

Recommandation : structure à **3 niveaux** plutôt que 15 agents directement sous l'Orchestrateur.

```
LEVEL 1 — EXECUTIVE ORCHESTRATOR
            │
            ▼
LEVEL 2 — DOMAIN MANAGERS
            │
            ▼
LEVEL 3 — SPECIALIST AGENTS
```

**Exemple concret :**

```
                 ORCHESTRATOR
                       │
       ┌───────────────┼────────────────┐
       ▼               ▼                ▼
 Product Manager   Tech Manager     Quality Manager
       │               │                │
 ┌─────┼─────┐    ┌────┼─────┐      ┌───┼────┐
 ▼     ▼     ▼    ▼    ▼     ▼      ▼   ▼    ▼
PM    BA    UX   Arch Front Backend  QA Sec Review
```

Beaucoup plus scalable et maintenable.

---

## 11. Exemple concret de bout en bout

**Prompt :**
> « Crée une application web et mobile de gestion de paris sportifs. »

### Phase 1 — L'Orchestrateur génère le projet

```
PROJECT
│
├── Product specification
├── UX/UI
├── Architecture
├── Database
├── API specification
├── Frontend tasks
├── Mobile tasks
├── Backend tasks
├── QA tasks
├── Security tasks
└── Deployment tasks
```

### Phase 2 — Distribution des tâches

```
TASK-001 → Product Agent
TASK-002 → UX Agent
TASK-003 → Architecture Agent
TASK-004 → Database Agent
...
```

### Phase 3 — Orchestration séquentielle

```
Architecture Agent → PASS → Orchestrator → Unlock Backend + Frontend + Mobile
                                          ↓
                              Frontend complete
                              Backend complete
                              Mobile complete
                                          ↓
                                     Integration
                                          ↓
                                    QA → Security → Release
```

---

## 12. Les 10 règles d'or

1. **Aucun agent ne travaille sans tâche explicite.**
2. **Aucun agent ne modifie une architecture approuvée sans justification.**
3. **Un agent ne valide jamais seul son propre travail critique.**
4. **Chaque action produit un artefact vérifiable.**
5. **Toutes les tâches ont un état.**
6. **Toutes les erreurs sont remontées à l'Orchestrateur.**
7. **Les tâches indépendantes sont parallélisées.**
8. **Les tâches dépendantes sont exécutées séquentiellement.**
9. **Le code est testé avant validation.**
10. **Le projet possède une source de vérité unique.**

---

## 13. Vision long terme : AI Software Company

```
                    YOU
                     │
                     ▼
              CEO / ORCHESTRATOR
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
     PRODUCT        TECH        QUALITY
        │            │            │
        ▼            ▼            ▼
      PM/BA    Architecture     QA
      UX/UI    Frontend         Security
      Research Backend          Review
               Mobile
               Database
               DevOps
        │            │            │
        └────────────┼────────────┘
                     ▼
                SOFTWARE
                  FACTORY
                     │
                     ▼
               PRODUCTION
```

Le système devient **réutilisable pour n'importe quel projet** : SaaS, e-commerce, ERP, CRM, marketplace, application mobile, API, dashboard, plateforme IA...

> Le projet change, mais l'organisation des agents reste la même.

---

## 14. Prochaine étape — Implémentation V1

Concevoir la **V1 complète de cette Software Factory**, directement exploitable par ton agent de code :

- [ ] `ORCHESTRATOR` (avec ses 10 sous-modules)
- [ ] 15–20 agents spécialistes
- [ ] Protocole de communication structuré (JSON)
- [ ] Structure de dossiers `.ai/` + mémoire persistante
- [ ] Gestion des tâches (`backlog` / `active` / `completed` / `failed`)
- [ ] Quality Gates (Design, Architecture, Dev, QA, Security, Release)
- [ ] Git workflow + CI/CD
- [ ] Tests (unit, intégration, E2E) + Bug Hunting
- [ ] Déploiement (staging → production)
- [ ] Gestion des erreurs & Retry
- [ ] Documentation auto-générée

> Objectif : passer d'une description théorique à un **système directement exécutable**.

---

*Document réorganisé — contenu original préservé, structure clarifiée pour exploitation opérationnelle.*
