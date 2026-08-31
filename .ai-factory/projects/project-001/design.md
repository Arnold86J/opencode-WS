# DESIGN.md — AI-Readable Design System (Refero Spec)

> Source `styles.refero.design/design-md/design-md-specification` — tokens structurés + rationale markdown pour agents IA.
> Référence : **Linear — midnight precision instrument** `styles.refero.design/style/90ce5883-bb24-4466-93f7-801cd617b0d1` (choisi pour SaaS Factory : dark, dense, system).

## 1. Tone & Principles

- Tone : `precision · density · calm` — pas premium abstrait, instructions concrètes.
- Rules beat mood words : dire *where to use* pas *clean*.

## 2. Tokens — Colors

| Name | Value | Token | Role |
|---|---|---|---|
| Abyss | `#0A0A0F` | `--color-bg` | Page canvas (warm near-black, pas #000) |
| Surface | `#14141B` | `--color-surface` | Cards, panels |
| Surface2 | `#1C1C23` | `--color-surface-2` | Hover, subtle lift |
| Line | `rgba(255,255,255,0.08)` | `--color-line` | Hairline 1px, jamais shadow |
| Text | `#FFFFFF` | `--color-text` | Primary headlines |
| Muted | `#9CA3AF` | `--color-muted` | Body, secondary |
| Accent | `#3B82F6` | `--color-accent` | Seule couleur chromatique — CTA, focus ring, progress |
| Danger | `#EF4444` | `--color-danger` | Errors, critical |

**Usage rules** : 90% achromatic (Abyss→Muted), Accent = punctuation (1 CTA/écran max), jamais background plein.

## 3. Tokens — Typography

- Display : `Geist Sans / Inter` 600, 36–52px, tracking -0.02em, leading 1.1 — headlines
- Body : `Inter` 400, 14–16px, leading 1.6, tracking 0.01em
- Label : `Inter` 500, 12px, tracking 0.08em, uppercase, Muted
- Mono : `Geist Mono` 400, 12–13px — metrics, code, IDs (tabular `tnum`)

## 4. Tokens — Spacing / Radii / Elevation

- Unit `4px` — scale `8,12,16,20,24,32,48,64`
- Section gap `64px`, element gap `16–24px`, card padding `24px`
- Radius `8px` cards, `12px` modals, `999px` pills
- Elevation : **no shadow** — depth via `1px Line` + generous whitespace + particle-free surface2. Si besoin : `0 0 0 1px var(--color-line)`.

## 5. Component Guidance

- **Button** : Primary `bg Accent / text white / radius 8 / h 36` — Secondary `bg Surface2 + Line` — Danger `bg Danger`. Focus : `0 0 0 2px Accent`. Avoid : Accent partout.
- **Card** : `bg Surface + Line + radius 12 + pad 24` — flat, pas lift. Hover : `bg Surface2`.
- **Forms** : Input `bg Abyss + Line + radius 8 + h 40 + focus Accent ring`. Label 12px Muted uppercase au-dessus. Error : Danger text 12px sous input.
- **Nav** : Top bar `Abyss + Line bottom` — logo left, menu right, pas background blur.
- **Table** : Header Label style, rows `border-b Line`, hover Surface2, mono pour numbers.

## 6. Layout

- Max `1200px` centered, gutters `32px`, 12 cols, gap `16px`. Two-column editorial : left `8 cols` content, right `4 cols` context (twin Observability).
- Vertical rhythm `64px` sections, `24px` elements.

## 7. Accessibility

- Contrast `Text 4.5:1` sur Abyss, focus visible Accent 2px, hit-target 44px, `prefers-reduced-motion` désactive Motion.

## 8. Do Not

- Pas de gradient décoratif, pas de shadow, pas de accent background, pas de photo stock — abstract dot-field optionnel (Refero DNA) si besoin.

## 9. For Agent

```yaml
use_when: "Generate any frontend UI — read this DESIGN.md before touching code"
attach_to: ["app/*", "src/components/*", "design/screens.md"]
verify: "web-design-guidelines skill after generation"
```

> Adapté de Refero MCP — ce fichier est la source de vérité visuelle pour `UX_UI_AGENT` + `FRONTEND_AGENT`. Pour autre style : remplacer Tokens en gardant structure.
