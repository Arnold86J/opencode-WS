# Conventions — AI Software Factory

## Code
- TypeScript strict (`strict: true`, pas de `any`)
- ESLint + Prettier, imports triés
- Validation `zod` à toute entrée externe
- Commits : `type(scope): message` (feat, fix, chore, docs)

## Git
- Branches : `main` (prod), `develop` (staging), `feat/TASK-XXX`
- PR obligatoire, 1 review `APPROVED` minimum
- Tags SemVer `vX.Y.Z` pour release

## Tests
- Unit : Vitest/Jest, >80% sur logique métier
- E2E : Playwright sur staging
- Fichiers : `*.test.ts`, `tests/e2e/*.spec.ts`

## Docs
- Dernière vérif datée + SHA commit
- Mermaid pour diagrammes
- Français pour produit/design, anglais pour code/comments (ou full FR si projet FR)

## Sécurité
- Secrets dans `.env`, jamais commités (`gitleaks` en CI)
- RBAC sur toute route sensible
