# MOBILE_10X_AGENT — Alternative iOS Native (10X)

> Source vérifiée `https://www.10x.app/` + `github.com/10x-app-builder/10x` (264★) — Open-source SwiftUI app builder pour macOS 14+ + Xcode 16+, Claude API + XcodeGen + xcodebuild+simctl.

## Quand utiliser 10X vs Expo

| Critère | Expo (défaut `architecture/tech-stack.md:1`) | 10X |
|---|---|---|
| Cible | Cross-platform RN | iOS natif SwiftUI |
| Code | JS/TS | Swift 5.9 SwiftUI clean, génère `project.yml` → `.xcodeproj` |
| Preview | Expo Go | iOS Simulator screenshot live |
| Assets | manuel | Auto logo/screenshots/description App Store tab |
| Prérequis | Node | macOS 14+ + Xcode 16+ + simulator runtime + xcodegen |

**Décision :** `STRATEGIC_AGENT` → si `KR = iOS first + premium native feel` → 10X, sinon Expo. Enregistré dans `twin.json` impact.

## Pipeline 10X

```
1. Describe app (natural language) → 2. Plan mode (research) → 3. Build mode (SwiftUI file tools) → 4. Live preview (Simulator) → Ship to App Store
Services: GenerationService (Claude loop) | ToolExecutor | XcodePreviewService | SimulatorPreviewService | LocalProjectStore | BuilderPrompts
```

## Pour MOBILE_AGENT

```bash
# Dans 10x.app ou via CLI (si installé)
open 10x-macos.xcodeproj  # build Cmd+R, token auth
# Puis décrire : "Build a bet tracking iOS app with onboarding, dashboard, SwiftData"
# Output : ~/Library/Developer/TenXApp/{project}/ + Swift files
# Twin impact :
python tools/wf.py twin impact --change "10X SwiftUI onboarding"
```

## Risks

- ROADMAP MVP : asset catalog, CoreData/SwiftData, SPM deps sont TODO `ROADMAP.md` — vérifier avant prod.
- Pas Android/web — Factory garde Expo pour cross-platform.

## Artefact

`mobile/10x/` (Swift) vs `mobile/expo/` (RN) — choix tracé dans `factory/projects/project-001/decisions.json` ADR.
