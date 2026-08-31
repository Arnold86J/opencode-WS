# Quality Gates V2 — §8 (Binaires, par phase)

> Remplace V1 6 gates par 5 gates V2. Règle : aucun passage si gate critique échoue. Escalade selon risque.

| Gate | Critères (tous obligatoires) | Owner Manager |
|------|------------------------------|---------------|
| **Product** | Requirements complete • Acceptance criteria defined • MVP validated | Product Manager |
| **Design** | Screens complete • Design system complete • Responsive rules • Accessibility considered | Product Manager |
| **Architecture** | Arch doc • API spec (OpenAPI) • DB schema • Security model | Tech Manager |
| **Development** | Build passes • Tests pass • No critical lint • No type errors | Quality Manager |
| **Release** | QA PASS • Security PASS • E2E PASS • Performance PASS • Docs PASS | Quality + Delivery |

## Vérification
```bash
python tools/wf.py gates --project project-001
# Editer factory/projects/project-001/state.json#gates pour passer à "pass"
```

## Transition
- `IDEATION → DISCOVERY` : Product gate
- `DESIGN → ARCHITECTURE` : Design gate
- `ARCHITECTURE → DEVELOPMENT` : Architecture gate
- `DEVELOPMENT → INTEGRATION` : Development gate
- `STAGING → RELEASE` : Release gate

## Compat V1
- V1 `qa`, `security` gates → fusionnés dans `development` + `release` V2
