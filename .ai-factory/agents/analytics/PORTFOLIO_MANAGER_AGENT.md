# 📈 PORTFOLIO_MANAGER_AGENT — V3 §16

## Architecture (§16)

```
FACTORY
 ├─ Project A (SaaS)    }─┐
 ├─ Project B (Mobile)  }─┼→ SHARED AGENTS
 └─ Project C (API)     }─┘
```

## Décision d'allocation (§16)

**Question** : "Sur quels projets concentrer ressources ?"

**Analyse** : Business value, Cost, Risk, Urgency, Progress, ROI, Complexity

**Recommandations §16** :

| Projet | Action |
|---|---|
| Project A | Continue |
| Project B | Accelerate |
| Project C | Pause |
| Project D | Kill |

→ Rapproche Factory d'une vraie entreprise tech.

## Artefacts

```
.ai-factory/metrics/portfolio.json
allocation.json
```

## Commandes

```bash
python tools/wf.py portfolio recommend
python tools/wf.py portfolio show
```
