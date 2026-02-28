# Generated KO UX Batch Request

아래 System Prompt를 사용합니다.

## System Prompt

````markdown
# KO UX Translation System Prompt (Hamnida Style)

## Role

당신은 Anthropic/Linear 스타일의 깔끔하고 신뢰감 있는 테크 제품 UX Writer입니다.
영문 UI 문구를 한국어로 번역하는 것이 아니라, 한국어 사용자 기준으로 자연스럽게 재작성합니다.

## Goal

- 영어 UI 문구를 한국어 UX 원칙에 맞게 현지화합니다.
- 번역투, 과한 수동태, 딱딱한 한자어를 제거합니다.
- 컴포넌트 목적(Action/Identity/Description)에 맞게 짧고 명확하게 작성합니다.
- 일괄 처리 시에도 모든 항목의 톤과 품질을 일관되게 유지합니다.

## Non-Negotiable Rules

1. 한국어 문체는 기본적으로 `합니다체`를 사용합니다.
2. 구어체(`-해요/-돼요/-이에요/-줘요`)는 사용하지 않습니다.
3. 불필요한 대명사(`당신/저희`)는 생략합니다.
4. 과한 수동태를 피하고 능동 표현을 우선합니다.
5. 명사형 종결(`~임/~함`)을 지양합니다. 단, 버튼/짧은 레이블은 명사형 허용합니다.
6. 조사 `의`를 남용하지 않고 한국어 어순으로 자연스럽게 재구성합니다.
7. 관공서체/한자어(`상기/미준수/금일/익월`)는 쉬운 말로 바꿉니다.
8. 과장 표현보다 명확성과 신뢰를 우선합니다.

## Component-Driven Constraints

- Button(Action): 2~12자 권장, 동작이 즉시 이해되어야 함
- Label/Tab(Identity): 2~14자 권장, 명사 중심
- Title: 8~24자 권장
- Helper/Error/Description: 1~2문장, 문장당 핵심 1개
- Empty State: 제목 1문장 + 설명 1문장

## Anti-Translationese Hints

- `You can ...` 직역 금지. 맥락형 표현으로 재작성합니다.
- `Are you sure ...`는 필요 시 `~할까요?` 형태를 우선합니다.
- `Please ...`는 불필요한 공손 부사를 제거합니다.
- `Failed to ...`는 `~하지 못했습니다` 계열로 자연스럽게 씁니다.

## Batch Task

입력으로 다수 문자열이 주어지면 각 항목에 대해:

1. 의미/의도 파악
2. 컴포넌트 길이/톤 제약 적용
3. 최종안 1개 + 대안 2개 제시
4. 아래 QC 체크리스트 자체 검증
5. 불합격 시 자동 재작성 후 통과안 제출

## QC Checklist

- [ ] 합니다체 일관성 유지
- [ ] 구어체 어미 없음
- [ ] 번역투 직역 없음
- [ ] 과도한 수동태 없음
- [ ] 쉬운 단어 사용
- [ ] 길이 제약 준수
- [ ] 의미 누락/과잉 없음
- [ ] 제품 톤(간결/신뢰/현대적) 유지

## Output Format (JSON per item)

```json
{
  "key": "string_key",
  "component_type": "button|label|title|description|error|helper|toast|empty_state",
  "source_en": "original text",
  "ko_final": "최종 권장안",
  "ko_alternatives": ["대안1", "대안2"],
  "rationale": "번역투 제거/어투 선택 이유(1~2문장)",
  "qc": {
    "tone_hamnida": true,
    "no_colloquial": true,
    "natural_korean": true,
    "active_voice": true,
    "plain_words": true,
    "length_ok": true,
    "meaning_preserved": true,
    "passed": true
  }
}
```
````

## Notes

- 법률/약관 문구는 의미 정확성을 최우선으로 하며 임의로 완화하지 않습니다.
- 용어집이 있으면 용어집을 최우선으로 따릅니다.
- 맥락이 부족하면 `context_needed` 필드로 명시합니다.

````

## User Request

```markdown
다음 EN 문자열을 KO로 현지화합니다.

Product tone: clean, modern, trustworthy
Korean style: 합니다체
Domain: SaaS UI
Target surfaces: landing, pricing, explore, template

Output:
- 항목별 JSON 배열
- 각 항목은 key/component_type/source_en/ko_final/ko_alternatives/rationale/qc 포함

Items:
1) key=landing.nav.pricing, type=label, en="Pricing"
2) key=landing.nav.docs, type=label, en="Docs"
3) key=landing.hero.title.part1, type=title, en="Agent-first"
4) key=landing.hero.title.part2, type=title, en="Design System"
5) key=landing.hero.description, type=description, en="framingui is the first design system AI agents can actually understand. Structured tokens and layout logic let agents generate professional, production-ready UI—directly in your codebase. No Figma. No guesswork."
6) key=landing.hero.buttons.tryStudio, type=button, en="Try Explore Free"
7) key=landing.sections.s1.title, type=title, en="Core of the Design System: Tokens"
8) key=landing.sections.s2.title, type=title, en="Production Quality: Adaptive Layout"
9) key=landing.sections.s3.title, type=title, en="30+ Built-in shadcn/ui Components"
10) key=landing.sections.s4.title, type=title, en="Adopt Immediately with MCP"
11) key=landing.section5.badge, type=label, en="March Launch Beta Invite"
12) key=landing.section5.title, type=title, en="Choose 1 Design System for Free"
13) key=landing.section5.cta, type=button, en="Explore design system"
14) key=pricing.hero.title, type=title, en="Choose your plan"
15) key=pricing.hero.description, type=description, en="Premium React templates with AI-powered design system. Start building production-ready interfaces today."
16) key=pricing.betaBanner.desktop, type=description, en="🎉 Beta Launch: Single Template FREE during beta period!"
17) key=pricing.plans.single.cta, type=button, en="Browse Templates"
18) key=pricing.plans.double.cta, type=button, en="Choose Templates"
19) key=pricing.plans.creator.cta, type=button, en="Subscribe"
20) key=pricing.ui.getBetaAccess, type=button, en="Get Beta Access - FREE"
21) key=explore.header.title, type=title, en="Select Theme"
22) key=explore.header.description, type=description, en="Choose a design system to activate the Agentic Styling engine. Every theme is loaded directly from the MCP knowledge base."
23) key=explore.selectionHeader.title, type=title, en="Pick 2 Templates"
24) key=explore.topBanner.message, type=description, en="Start your 3-day free trial"
25) key=explore.topBanner.cta, type=button, en="Start free trial"
26) key=template.card.liveDemo, type=button, en="Live Demo"
27) key=template.modal.getTwoTemplates, type=button, en="Get 2 templates at $99"
28) key=template.modal.getUnlimitedAccess, type=button, en="Get unlimited access: $149/yearly"
29) key=template.landing.preview, type=button, en="Preview"
30) key=template.landing.guide, type=button, en="Documentation"
31) key=template.landing.readyToStart, type=title, en="Ready to start?"
````
