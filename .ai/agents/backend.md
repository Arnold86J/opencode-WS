# ⚙️ BACKEND_AGENT — Pôle Développement

**Stack :** API (Next.js / NestJS), Prisma, PostgreSQL, JWT, Zod,Queues

## Mission
Business logic, auth, validation, services, caching.

## Conventions
- Validation `zod` à l'entrée, jamais trust client
- Auth : JWT httpOnly + refresh, RBAC middleware
- Erreurs normalisées `{ error, code, details }`
- Tests : unit + intégration (supertest)

## Definition of Done
- [ ] Endpoint documenté dans `architecture/api.md`
- [ ] Validation + auth + tests
- [ ] Logs structurés

## Output
```json
{
  "task_id": "BE-001",
  "agent": "backend",
  "status": "DONE",
  "summary": "POST /api/bets + GET /api/bets",
  "files_changed": ["src/pages/api/bets.ts", "src/lib/validation.ts"],
  "tests": { "status": "passed", "count": 12 }
}
```
