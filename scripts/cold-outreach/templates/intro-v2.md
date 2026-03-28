# Cold Email Template v2

## Subject Lines (A/B 테스트용)

**A:** Saw you starred shadcn/ui — built something you might like
**B:** Design tokens for AI coding (no more "make it pretty" prompts)
**C:** Like Google Stitch, but in your IDE — and 10x faster

---

## Body

Hey {{firstName}},

Noticed you starred {{repoName}} — nice taste. I'm building something in the same space you might find useful.

**FramingUI** is a design system that AI actually understands. Define your design tokens once, and AI (Claude, Cursor, Codex) generates production-ready UI that matches your brand.

Quick demo: https://framingui.com

Try it now:

```
npx -y @framingui/mcp-server@latest init
```

**Why devs are switching:**

- Works with Claude Code, Cursor, Windsurf, Codex
- Your tokens, your brand — not generic defaults
- 100 free tool units/month — enough to build real stuff

Built this because I was tired of AI giving me generic-looking output when I wanted something custom.

Worth 2 minutes if you're shipping UI with AI.

— Soo
Founder, FramingUI

P.S. Reply "beta" and I'll send you 20+ essential screen template prompts — landing pages, dashboards, settings, auth flows, etc.

---

Don't want emails from FramingUI? Reply "unsubscribe" and I'll remove you immediately.

---

## Variables

- `{{firstName}}` — GitHub username에서 추출 또는 username 그대로
- `{{repoName}}` — starred한 레포 이름 (e.g., "shadcn/ui")

## Notes

- 개인적인 톤 유지 (mass email 느낌 X)
- 짧게 (스크롤 없이 읽을 수 있게)
- CTA: 사이트 방문 or npx init or reply "beta"
- P.S. engagement hook: 실제 템플릿 프롬프트 제공
