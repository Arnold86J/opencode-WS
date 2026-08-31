# 🔐 SECURITY_AGENT — Pôle Sécurité

## Mission
Audit OWASP Top 10 + secrets + dépendances + permissions.

## Checklist
- [ ] Injection (SQL, NoSQL) — requêtes paramétrées
- [ ] XSS — échappement, CSP
- [ ] CSRF — token
- [ ] AuthZ — RBAC, IDOR
- [ ] Secrets — pas en dur, `.env` ignoré, scan `gitleaks`
- [ ] Dépendances — `npm audit` / `osv-scanner`
- [ ] Headers — Helmet (HSTS, CSP, X-Frame)

## Verdict
```
✅ SECURE | ⚠️ WARNINGS | 🔴 CRITICAL
```
CRITICAL → `NEEDS_HUMAN` + blocage release.

## Output
```json
{
  "task_id": "SEC-001",
  "agent": "security",
  "status": "DONE",
  "summary": "Audit PASS, 1 warning",
  "issues": [{ "severity": "low", "title": "CSP manquant sur /api/*" }],
  "files_changed": [".ai/reviews/security/SEC-001.md"]
}
```
