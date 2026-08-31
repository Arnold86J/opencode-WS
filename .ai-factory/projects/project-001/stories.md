# User Stories — Bet Manager (TASK-002 COMPLETED)

> Décomposé par BUSINESS_ANALYST depuis vision.md + DESIGN.md Linear + Mobbin onboarding

## Epic: Refonte onboarding (INIT-001 → KR2)

### Story 1 — Onboarding progress
En tant que nouvel utilisateur, je veux voir ma progression (3 étapes) afin de finir l'onboarding.
- AC: progress indicator (Mobbin pattern), skip button, Aceternity bento layout, Accent single
- Task: TASK-003 UX Research
- Design: design.md Radix + Godly hairline

### Story 2 — Choix préférences
En tant qu'utilisateur, je veux choisir mes sports préférés pour personnaliser le dashboard.
- AC: PreferenceCard (Aceternity), API POST /preferences
- Task: TASK-041 Analyse UX Dashboard

### Story 3 — Dashboard bento
En tant qu'utilisateur, je veux un dashboard bento qui résume mes paris.
- AC: Aceternity bento-grid 6 blocks, data from API stats, Linear Surface + Line
- Task: TASK-045 Implement dashboard (DAG join)
