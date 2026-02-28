# JA UX Batch Request Template

아래 템플릿에 문자열 목록을 넣어 코딩 에이전트/LLM에 전달합니다.

## 1) System Prompt

`prompts/ja-ux-translation-system-prompt.md` 내용을 시스템 프롬프트로 사용합니다.

## 2) User Request Template

```markdown
다음 EN 문자열을 JA로 현지화합니다.

Product tone: clean, modern, trustworthy
Japanese style: modern desu/masu
Domain: SaaS UI
Target surfaces: landing, pricing, explore, template

Output:

- 항목별 JSON 배열
- 각 항목은 key/component_type/source_en/ja_final/ja_alternatives/rationale/qc 포함

Items:

1. key=landing.hero.buttons.tryStudio, type=button, en="Try Explore Free"
2. key=landing.section5.title, type=title, en="Choose 1 Design System for Free"
3. key=pricing.hero.title, type=title, en="Choose your plan"
4. key=pricing.ui.getBetaAccess, type=button, en="Get Beta Access - FREE"
5. key=explore.header.title, type=title, en="Select Theme"
6. key=explore.topBanner.message, type=description, en="Start your 3-day free trial"
7. key=template.modal.getTwoTemplates, type=button, en="Get 2 templates at $99"
8. key=template.landing.readyToStart, type=title, en="Ready to start?"
```

## 3) Agent QC Command

번역 반영 후 아래 명령으로 JA 톤 QC를 실행합니다.

```bash
node packages/playground-web/scripts/check-ja-ux-tone.mjs
```

실패 시 탐지된 라인부터 다시 수정합니다.
