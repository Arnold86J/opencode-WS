#!/usr/bin/env python3
"""
Mobbin API wrapper — https://mobbin.com + https://docs.mobbin.com/api-reference/screens/search-screens-with-natural-language
1,428 apps | 621.5k screens | 323.9k flows — searchable patterns for UX_RESEARCH
Usage:
  MOBBIN_API_KEY=xxx python tools/mobbin.py search --query "login screen with biometric authentication" --platform ios
  python tools/mobbin.py search --query "checkout page with promo code field and Apple Pay button" --platform web --limit 5
Requires: Team or Enterprise plan for API (Bearer token).
"""
import argparse, json, os, sys, urllib.request, urllib.error
from pathlib import Path

API = "https://api.mobbin.com/v1/screens/search"

def search(query, platform, limit=5, mode="deep"):
    key = os.getenv("MOBBIN_API_KEY")
    if not key:
        # Mock mode — no key, return guidance
        mock = {
            "mock": True,
            "query": query, "platform": platform,
            "note": "Set MOBBIN_API_KEY (Team/Enterprise) for real API. This is mock guidance for Factory.",
            "suggested_manual": f"https://mobbin.com/search?query={query.replace(' ','+')}",
            "figma_plugin": "https://www.figma.com/community/plugin/1332649462188834894/mobbin",
            "for_agent": "Use query as pattern prompt for FRONTEND: e.g. copy structure/spacing/micro-interactions from top results"
        }
        # also load local references if exist
        ref_path = Path(__file__).resolve().parents[1] / ".ai-factory/intelligence/knowledge/references/mobbin-patterns.json"
        if ref_path.exists():
            mock["references"] = json.loads(ref_path.read_text())
        print(json.dumps(mock, indent=2))
        return
    body = json.dumps({"query": query, "platform": platform, "mode": mode, "limit": limit}).encode()
    req = urllib.request.Request(API, data=body, headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode())
            print(json.dumps(data, indent=2))
            # save to knowledge
            out = Path(__file__).resolve().parents[1] / ".ai-factory/intelligence/knowledge/mobbin-last.json"
            out.write_text(json.dumps(data, indent=2))
            print(f"\nSaved {len(data.get('screens',[]))} screens to {out}")
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {e.read().decode()[:500]}", file=sys.stderr); sys.exit(1)

def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd")
    s = sub.add_parser("search")
    s.add_argument("--query", required=True, help='e.g. "login screen with biometric authentication" (see docs: be specific, avoid vague style words)')
    s.add_argument("--platform", choices=["ios","web"], required=True)
    s.add_argument("--limit", type=int, default=5)
    s.add_argument("--mode", choices=["deep","standard"], default="deep")
    s.set_defaults(func=lambda a: search(a.query, a.platform, a.limit, a.mode))
    args = ap.parse_args()
    if not hasattr(args, "func"):
        ap.print_help(); sys.exit(1)
    args.func(args)

if __name__ == "__main__":
    main()
