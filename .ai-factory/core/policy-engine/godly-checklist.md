# Godly Taste Checklist — Pre-Design Gate

> Source vérifiée `https://godly.website` — Astronomically good web design inspiration, curated by Rejiggle (ProductHunt 04/08/2021), *quality over quantity, multiple top-tier sites/day*. `godly.design` est placeholder Blume (vide).

## Rituel 5min avant DS-001 / ARCH-001 (§4) — élève le goût

**Quand :** `UX_UI_AGENT` avant tout `Design Gate` ` .ai/gates-v2.md:1` + `UI_REVIEW_AGENT` avant approval.

**Comment :**
1. Ouvrir `https://godly.website/?styles=%5B%22clean%22%5D` ou `/ ?types=%5B%22design%22%5D`
2. Parcourir 5–7 sites (pas screenshot, juste regarder)
3. Noter 3 principes observés (ex: *generous whitespace, single accent, hairline borders*)
4. Injecter dans prompt `DS-001` : `Godly refs: [urls] — reproduce tension, not pixels`

## Checklist Design Gate (+ Godly)

- [ ] 90% achromatic + 1 accent (cf `design.md:8` Do Not)
- [ ] No shadow — 1px Line depth (Linear ref)
- [ ] Vertical rhythm 64px / element 16–24px
- [ ] Focus 2px Accent visible
- [ ] Typography tension (display -0.02em vs body 1.6)
- [ ] Godly 5min fait + 3 principes notés

## Pour Agent

```bash
# Manuel — pas d'API Godly
open https://godly.website
# Puis lancer DS-001 avec refs
python tools/wf.py task run DS-001  # avec prompt incluant Godly urls
```

> Intention `Refero Styles` §7 : *not AI slop* — Godly évite la médiocrité générative.
