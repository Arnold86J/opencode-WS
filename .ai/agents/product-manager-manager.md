# 📦 PRODUCT_MANAGER (Domain Manager) — V2 L2

> **Évolution V1 :** `product-manager.md` était L2 plat. En V2, devient **Domain Manager** supervisant 3 spécialistes.

## Supervise
- `product-manager-specialist` (vision, roadmap)
- `business-analyst` (epic → tasks)
- `ux-research`, `ux-ui`

## Responsabilités (V2 §2.3)
- Discovery, requirements, UX, acceptance criteria
- Valide **Product Gate** + **Design Gate**
- Agrège payloads de ses 3 agents → rapport au Orchestrateur

## Délégation
```
Orchestrator → Product Manager (L2)
                ├─► PM specialist
                ├─► BA
                └─► UX
```

## Gate ownership
- Product Gate : requirements complete • AC defined • MVP validated
- Design Gate : screens complete • design system • responsive • a11y

## Note migration
- Ancien `product-manager.md` conservé comme `product-manager-specialist.md` (spécialiste)
- Ce fichier est le **manager** (alias `product-manager-manager.md` pour clarté, id logique = `product-manager`)
