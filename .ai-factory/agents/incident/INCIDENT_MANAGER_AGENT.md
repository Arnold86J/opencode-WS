# 🚨 INCIDENT_MANAGER_AGENT — V3 §10

## Workflow (§10)

```
Incident detected → Classify → Assign → Mitigate → Repair → Verify → Close → Postmortem
```

## Artefacts auto-générés

- Incident report, Root cause analysis, Timeline, Impact assessment, Resolution, Preventive measures → `incidents/INC-*/`

## Exemple

```
INC-1042 (high) payments-api latency +180%
  → Classify: performance / Assign: backend + RCA
  → Mitigate: scale pool → Repair: fix cache → Verify: latency normal
  → Close → Postmortem → Policy: require cache simulation before deploy
```

## Risk & Self-Healing

- LOW → auto via SELF_HEALING_ENGINE
- MEDIUM → manager approval
- HIGH/CRITICAL → human emergency

## Commandes

```bash
python tools/wf.py incident create --service payments-api --severity high --title "Latency +180%"
python tools/wf.py incident list
python tools/wf.py incident show INC-1042
python tools/wf.py incident close INC-1042 --postmortem
```
