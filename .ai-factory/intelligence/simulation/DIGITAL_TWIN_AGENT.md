# 🪞 DIGITAL_TWIN_AGENT — V3 §18 (Jumeau numérique)

## Maintient représentation logique complète (§18)

```
Frontend → API → Services → Database → Infrastructure
```

## Utilité (§18)

Chaque changement analysé (impact, risques, coûts) **avant** application.

## Modèle

```json
{
  "twin_id": "twin-project-001",
  "layers": ["frontend","api","services","database","infrastructure"],
  "impact_analysis": {
    "change": "Modify API caching",
    "impact": ["cache hit rate", "latency", "DB load"],
    "risk": "MEDIUM",
    "cost": "low"
  }
}
```

## Artefacts

```
.ai-factory/intelligence/simulation/twin.json
```

## Commandes

```bash
python tools/wf.py twin show --project project-001
python tools/wf.py twin impact --change "Modify API caching"
```
