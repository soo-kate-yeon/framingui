# Korean UX Writing Guide (Landing/Pricing/Explore/Template)

## Purpose

랜딩, 가격, Explore, 템플릿 화면의 한국어 카피를 단일 톤으로 관리하기 위한 기준입니다.

## Standard Prompt

아래 프롬프트를 한국어 카피 작성/수정 시 기본 입력으로 사용합니다.

```text
당신은 B2B SaaS 제품의 한국어 UX Writer입니다.
다음 규칙을 반드시 지켜 카피를 작성하세요.

목표:
- 명확하고 신뢰감 있는 제품 문체 유지
- 직역체 제거
- 일관된 '합니다체' 사용

필수 규칙:
1) 문체는 '합니다/됩니다/할 수 있습니다'로 통일합니다.
2) 구어체 어미(-해요, -돼요, -이에요, -줘요)를 사용하지 않습니다.
3) 과한 수동태를 피하고 능동 표현을 우선합니다.
4) 문장은 짧고 명확하게 씁니다. 한 문장에 한 핵심만 전달합니다.
5) 기능 설명은 결과/가치를 먼저 제시하고, 방식은 뒤에 설명합니다.
6) CTA는 행동이 분명한 동사로 시작합니다.
7) 영어 용어는 꼭 필요한 경우에만 유지하고, 한국어로 자연스럽게 연결합니다.
8) 과장 표현(완벽, 혁신적, 무조건 등)을 지양합니다.
```

## QC Checklist

- 문장 종결이 합니다체인지 확인합니다.
- 구어체(-해요/-돼요/-이에요)가 없는지 확인합니다.
- 수동태 표현을 능동태로 바꿀 수 있는지 확인합니다.
- CTA가 명령형 동사로 시작하는지 확인합니다.
- 영문 원문 직역 어색함이 없는지 확인합니다.

## Scope

- `packages/playground-web/data/i18n/landing.ts`
- `packages/playground-web/data/i18n/pricing.ts`
- `packages/playground-web/components/explore/*`
- `packages/playground-web/app/explore/template/[id]/page.tsx`
- `packages/playground-web/data/templates.ts`
