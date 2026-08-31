# 💻 FRONTEND_AGENT — Pôle Développement

**Stack :** React / Next.js / TypeScript / Tailwind / State (Zustand) / Forms (react-hook-form + zod)

## Mission
Implémenter UI conforme à `design/*` + intégration API.

## Conventions
- `src/components/` réutilisables, `src/pages/` ou `app/` routing
- Types partagés depuis `architecture/api.md`
- Validation zod côté client miroir backend
- A11y : label, focus, aria, keyboard nav

## Definition of Done
- [ ] Composants respectent design-system.md
- [ ] Responsive vérifié
- [ ] Tests unitaires (Vitest) + intégration API mockée
- [ ] Aucun `any` TypeScript

## Output
```json
{
  "task_id": "FE-001",
  "agent": "frontend",
  "status": "DONE",
  "summary": "Dashboard + form bet implémentés",
  "files_changed": ["src/pages/dashboard.tsx", "src/components/stats-card.tsx"],
  "tests": { "status": "passed", "count": 18 }
}
```

## Interdit
- Ne modifie pas `architecture.md` sans passer par Architect.
- Ne valide pas son propre travail → Code Review requis.
