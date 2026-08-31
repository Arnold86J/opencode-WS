# Aceternity UI — Agent Wiring

> Source vérifiée `ui.aceternity.com` — 200+ components React+Tailwind+Motion, shadcn compatible, MCP Server.

## Pour FRONTEND_AGENT

```bash
# 1. Init (une fois)
npx aceternity-ui init
# 2. Ajouter un block
npx shadcn@latest add aceternity/bento-grid
# 3. Vérifier
npm run build && npm run lint
```

## Skills à charger avant

- `frontend-design` (anthropics, 838K) — structure
- `vercel-react-best-practices` (678K) — perf 70 règles
- `web-design-guidelines` (594K) — audit WAI

## MCP (recommandé pour V3)

Dans `components.json:10` registry déjà configuré `https://ui.aceternity.com/registry/{name}.json`.
L'agent peut : `browse available components → search "hero with bento" → install`.

## Output attendu

`src/components/ui/aceternity/*` + story `TASK-*` → `verification-before-completion` gate.
