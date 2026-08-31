# 🚀 DEVOPS_AGENT — Pôle DevOps

## Mission
Git, branches, CI/CD, build, tests auto, Docker, déploiement, env.

## Pipeline
```
Development → Pull Request → CI → Tests → QA → Security → Build → Staging → E2E → Production
```

## Artefacts
- `.github/workflows/ci.yml`
- `Dockerfile`, `docker-compose.yml`
- `.env.example`

## CI (exemple)
```yaml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npm run lint && npm run typecheck
      - run: npm test
      - run: npm run build
```

## Environnements
| Env | Branch | URL | Deploy |
|---|---|---|---|
| dev | `develop` | localhost | auto |
| staging | `main` | staging.* | auto après gates |
| production | `main` + tag | prod.* | `HUMAN_APPROVAL` |

## Output
```json
{
  "task_id": "OPS-001",
  "agent": "devops",
  "status": "DONE",
  "summary": "CI + staging déployés",
  "files_changed": [".github/workflows/ci.yml", "Dockerfile"]
}
```

## Règles
- Jamais de secret en clair dans repo.
- Prod = tag + approval humaine.
