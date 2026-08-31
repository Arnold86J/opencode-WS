# 🔍 REVIEW_MANAGER — V2 §5 (Nouveau — Agrégation)

## Mission
Agrège 4 revues parallèles en verdict unique.

## Pipeline (§5.1)
```
CODE
 ├─► Architecture Review   (arch-reviewer)
 ├─► Security Review       (security-reviewer)
 ├─► Performance Review    (performance-reviewer)
 └─► Maintainability Review(maintainability-reviewer)
          ↓
   REVIEW_MANAGER (agrégation)
          ↓
   Architecture ✅  Security ⚠️  Performance ✅  Quality ❌
          ↓
   CHANGES_REQUIRED → feedback ciblé au développeur
   APPROVED → merge
```

## Verdict
```
✅ APPROVED — 4/4 pass
⚠️ APPROVED_WITH_WARNINGS — warnings non bloquants
🔁 CHANGES_REQUIRED — 1+ fail bloquant
```

## Output
```json
{
  "task_id": "TASK-045",
  "agent": "review-manager",
  "status": "NEEDS_REVIEW",
  "summary": "CHANGES_REQUIRED: 1 fail (maintainability)",
  "reviews": {
    "architecture": "PASS",
    "security": "PASS",
    "performance": "PASS",
    "maintainability": "FAIL: cyclomatic complexity 18 > 15"
  },
  "files_changed": ["factory/reviews/TASK-045.json"]
}
```

## Intégration Git (§6)
- Bloque merge si `CHANGES_REQUIRED`
- Auto-recovery si fix LOW risk
