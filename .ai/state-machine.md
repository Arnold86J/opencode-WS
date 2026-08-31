# State Machine — V2 §11

## 13 États

```
IDEATION
  ↓
DISCOVERY
  ↓
PLANNING
  ↓
DESIGN
  ↓
ARCHITECTURE
  ↓
DEVELOPMENT
  ↓
INTEGRATION
  ↓
QA
  ↓
SECURITY
  ↓
STAGING
  ↓
RELEASE
  ↓
PRODUCTION
  ↓
MONITORING
```

## Stockage
`factory/projects/<id>/state.json` :
```json
{
  "state": "DEVELOPMENT",
  "gates": { "product": "pass", "design": "pass", "architecture": "pass", "development": "pending", "release": "pending" },
  "transitions": [{ "from": "ARCHITECTURE", "to": "DEVELOPMENT", "at": "2026-08-31", "gate": "architecture", "verdict": "PASS" }]
}
```

## Transitions gardées (exemple §11.1)
```
DEVELOPMENT
     ↓
  QA PASS ?
  /      \
 NO      YES
 |        |
FIX    SECURITY
```

- Chaque transition = Quality Gate (§8) + validation humaine si risk HIGH (V2 §12)

## Commandes
```bash
python tools/wf.py state show --project project-001
python tools/wf.py state transition --project project-001 --to QA --gate development
```
