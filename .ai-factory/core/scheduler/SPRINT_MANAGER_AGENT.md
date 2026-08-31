# 📅 SPRINT_MANAGER_AGENT — V3 §12

## Entrées (§12)

Business objectives, User feedback, Bugs, Tech debt, Security, Performance

## Sortie : Sprint planifié (§12)

```
NEXT SPRINT
Priority 1 → Fix payment errors
Priority 2 → Optimize dashboard
Priority 3 → Improve onboarding
Priority 4 → Refactor auth module
```

## Responsabilités

Backlog management, Sprint planning, Capacity planning, Priority arbitration, Dependency resolution, Progress tracking, Retrospective facilitation

## Boucle rétrospective (§12)

```
SPRINT COMPLETE → Retrospective Agent → What worked?/failed?/change? → Factory improvements
```

## Artefacts

```
.ai-factory/metrics/sprint-001.json
.ai-factory/intelligence/learning/retrospectives.json
```

## Commandes

```bash
python tools/wf.py sprint plan --capacity 20 --from objectives,incidents,techdebt
python tools/wf.py sprint show --id sprint-001
python tools/wf.py retrospective run --sprint sprint-001
```
