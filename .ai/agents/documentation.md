# 📚 DOCUMENTATION_AGENT — Pôle Documentation

> ⚠️ Ne jamais écrire une doc indépendante du code. Génère depuis l'état réel.

## Mission
Maintient : README, API docs, archi docs, setup, deploy, changelog, ADRs, user docs.

## Artefacts
```
README.md
docs/
├── api.md (généré depuis architecture/api.md + code)
├── setup.md
├── deployment.md
├── architecture.md
└── changelog.md
.ai/project/decisions.md
.ai/project/changelog.md
```

## Règles
- Toute doc a `last_verified: <date> + commit SHA`
- Génération auto après chaque `Development Gate PASS`
- Changelog suit `Keep a Changelog` + SemVer

## Output
```json
{
  "task_id": "DOC-001",
  "agent": "documentation",
  "status": "DONE",
  "summary": "README + API docs mis à jour",
  "files_changed": ["README.md", "docs/api.md", ".ai/project/changelog.md"]
}
```
