# Quality Gates — 6 Gates binaires PASS/FAIL

> Source : WF.md §8. Chaque transition de phase est gardée.

## Principe
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

## Détail des 6 Gates

### 1. Design Gate
| Critère | Vérifié par |
|---|---|
| Cohérence UX (flow complet) | `ux-research` |
| Design system complet (tokens, composants) | `ux-ui` |
| Accessibilité WCAG AA | `ui-review` |
| Responsive 360-1440 | `ui-review` |
**Débloque :** Architecture

### 2. Architecture Gate
| Critère | Vérifié par |
|---|---|
| Architecture complète (FE/BE/DB/infra) | `software-architect` |
| Database ERD + migrations | `database-architect` |
| API contract (OpenAPI) | `software-architect` |
| Sécurité by design | `security` |
| Scalabilité envisagée | `software-architect` |
**Débloque :** Développement

### 3. Development Gate
| Critère | Vérifié par |
|---|---|
| Code review `APPROVED` | `code-reviewer` |
| Tests unitaires PASS (>80%) | `qa` |
| Lint + typecheck PASS | `devops` (CI) |
| Pas de secret leak | `security` |
**Débloque :** QA

### 4. QA Gate
| Critère | Vérifié par |
|---|---|
| Tests fonctionnels PASS | `qa` |
| Tests E2E PASS (scénarios complets) | `e2e-test` |
| Non-régression PASS | `qa` |
| Bug Hunter : 0 critical | `bug-hunter` |
**Débloque :** Security

### 5. Security Gate
| Critère | Vérifié par |
|---|---|
| OWASP Top 10 PASS | `security` |
| Secrets scan PASS | `security` |
| Dépendances `npm audit` PASS | `security` |
| Permissions / RBAC vérifiées | `security` |
**Débloque :** Release

### 6. Release Gate
| Critère | Vérifié par |
|---|---|
| Staging E2E OK | `e2e-test` |
| Doc à jour (README, API, changelog) | `documentation` |
| `state.json` + `decisions.md` à jour | `orchestrator` |
| Approval humaine si prod | `human` |
**Débloque :** Production

## Fichier d'état
` .ai/project/state.json → gates: { design: "pending|pass|fail", ... }`

## Template de rapport de gate
`.ai/reviews/qa/GATE-<phase>-<date>.md` :
```md
# Gate Architecture — 2026-08-31
- Verdict: PASS
- Checklist: 5/5
- Issues: 0
- Next: Débloque DEV
```
