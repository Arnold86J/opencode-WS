# Skills → Factory Agents Mapping (V3)

> Installés depuis https://www.skills.sh/ — vérifiés par installs + source réputation (§5 find-skills)

## Project Skills (15) — `.agents/skills/:1`

| Skill | Source | Installs | Factory Agent(s) | Usage V3 |
|---|---|---|---|---|
| `systematic-debugging` | `obra/superpowers` | 242.8K | DEBUGGER, BUG_HUNTER, RCA | V3 §4 auto-recovery : diagnosis avant fix (242K, source obra) |
| `test-driven-development` | `obra/superpowers` | 212.7K | QA, E2E_TEST | V3 §7 CI/CD : tests avant implémentation |
| `verification-before-completion` | `obra/superpowers` | 195.3K | QUALITY_MANAGER, DELIVERY | Gates binaires §8 — evidence before assertions |
| `brainstorming` | `obra/superpowers` | 345.7K | STRATEGIC_AGENT, PRODUCT | V3 §4 discovery — explore intent avant spec |
| `writing-plans` | `obra/superpowers` | 234.8K | FACTORY_COO, SPRINT_MANAGER | V3 §5/12 planning autonome — spec → plan |
| `requesting-code-review` | `obra/superpowers` | 214.7K | REVIEW_MANAGER | V3 §5 multi-agent review — avant merge |
| `receiving-code-review` | `obra/superpowers` | 180.9K | ENGINEERING | Feedback review → fix rigoureux |
| `codebase-design` | `mattpocock/skills` | 519K | SOFTWARE_ARCHITECT | Deep modules, seams, testability (519K) |
| `diagnosing-bugs` | `mattpocock/skills` | 510.9K | BUG_HUNTER, RCA | Loop diagnostic hard bugs / perf regression |
| `code-review` | `mattpocock/skills` | 453K | CODE_REVIEWER (4 reviewers) | Review parallèle arch/security/perf/maintainability §5 |
| `tdd` | `mattpocock/skills` | 806.6K | BACKEND, FRONTEND | Red-green-refactor, 806K installs |
| `supabase-postgres-best-practices` | `supabase/agent-skills` | 379.3K | DATABASE_ARCHITECT | PG schema, RLS, indexes, migrations (379K, vercel-labs/supabase officiel) |
| `vercel-react-best-practices` | `vercel-labs/agent-skills` | 678.3K | FRONTEND, MOBILE | React/Next 70 règles perf (678K, Vercel officiel) |
| `frontend-design` | `anthropics/skills` | 838.6K | UX_UI, UI_REVIEW | Design system, UX rules (838K, Anthropic officiel) |
| `web-design-guidelines` | `vercel-labs/agent-skills` | 594.4K | UI_REVIEW, FRONTEND | Web Interface Guidelines audit |

## Global Skills existants (conservés)

`find-skills` 3.2M, `frontend-design`, `vercel-react-best-practices`, `web-design-guidelines` déjà en global (Hermes) — dupliqués en project pour OpenCode.

## Couverture 8 pôles V1 + 4 Managers V2 + 8 systèmes V3

- **Product** (STRATEGIC/PRODUCT_MANAGER) → brainstorming, writing-plans
- **Design** (UX_UI) → frontend-design, web-design-guidelines
- **Architecture** → codebase-design
- **Engineering** (FRONT/BACK/MOBILE) → vercel-react-best-practices, tdd, test-driven-development, codebase-design
- **QA** → test-driven-development, tdd, verification-before-completion, systematic-debugging
- **Security** → code-review (+ policies)
- **DevOps/Delivery** → verification-before-completion
- **Observability/Incident** (V3 §8-10) → systematic-debugging, diagnosing-bugs

## Vérification

```bash
npx skills list --json  # 15 project skills
ls .agents/skills/      # 15 dossiers copiés → OpenCode
```

Tous >100K installs, sources officielles (vercel-labs, anthropics, obra, supabase, mattpocock) — critères §4 find-skills.
