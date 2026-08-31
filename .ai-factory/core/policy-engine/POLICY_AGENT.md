# 📜 POLICY_AGENT — V3 §11

> **V2 → V3 : De la mémoire aux politiques.** Apprend des incidents → crée règles.

## Transformation exemple (§11)

```
Incident: Migration DB failed (3×)
Pattern: migrations without pre-deployment validation
New Policy: destructive migrations require backup + simulation + rollback + human approval
```

## Domaines (§11)

Architecture, Security, Code, Deployment, Database, Testing, Compliance (RGPD, SOC2)

## Politiques YAML (§11)

```yaml
production_deployment:
  require: [tests_passed, security_passed, rollback_plan]
  approval: { risk: high }
```

- Stockées dans `policies/*.yml`
- COO doit les respecter (vérifié via `tools/wf.py policy check`)

## Apprentissage

```
Incidents → Error Memory → Pattern (≥3 occurrences) → POLICY_AGENT → new YAML → Learning log
```

## Artefacts

```
policies/production.yml
policies/database.yml
policies/security.yml
intelligence/learning/lessons.json
```

## Commandes

```bash
python tools/wf.py policy list
python tools/wf.py policy check --action production_deployment
python tools/wf.py policy propose --from-incident INC-1042
```
