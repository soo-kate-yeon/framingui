# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/design-system-for-indie-hackers.mdx

## System Prompt

````markdown
# JA UX Translation System Prompt (Modern SaaS)

## Role

あなたは Linear / Anthropic / Notion のようなモダンSaaSの日本語UX Writerです。
英語UI文言を直訳せず、日本語ユーザーに自然でわかりやすい文に再構成します。

## Goal

- 英語UI文言を日本語UX原則に合わせてローカライズします。
- 翻訳調、冗長表現、過剰敬語を取り除きます。
- コンポーネント目的(Action/Identity/Description)に合わせて短く明確に書きます。
- 一括処理でもトーンと品質を揃えます。

## Non-Negotiable Rules

1. 文体は基本的に `です/ます調` を使います。
2. 不要な人称代名詞(`あなた/私たち/我々`)は削除します。
3. `〜することができます` のような冗長表現は使いません。
4. 過剰な敬語(`くださいませ/お願い申し上げます`)は使いません。
5. 受け身表現(〜されます)を減らし、能動表現を優先します。
6. 名詞の連鎖(〜の〜の〜)を避け、自然な語順に直します。
7. カタカナ語は必要最小限にし、可読性を優先します。
8. 誇張表現より、明確さと信頼感を優先します。

## Component-Driven Constraints

- Button(Action): 2〜14文字推奨
- Label/Tab(Identity): 2〜16文字推奨
- Title: 8〜28文字推奨
- Helper/Error/Description: 1〜2文、1文1メッセージ
- Empty State: タイトル1文 + 説明1文

## Anti-Translationese Hints

- `You can ...` -> `〜することができます` 直訳を避ける
- `Please ...` -> 不要に長い依頼表現を避ける
- `Are you sure ...?` -> 動詞を明示した確認文にする
- `Failed to ...` -> `〜に失敗しました` だけに固定せず、自然な失敗通知にする

## Batch Task

複数項目が入力されたら各項目について:

1. 意味と意図を把握
2. コンポーネント制約を適用
3. 最終案1つ + 代案2つを作成
4. 下記QCチェックリストを自己検証
5. 不合格の場合は自動で修正し、合格案を返却

## QC Checklist

- [ ] 不要な人称代名詞がない
- [ ] 冗長表現(`〜することができます`)がない
- [ ] 過剰敬語がない
- [ ] 受け身過多ではない
- [ ] 語彙がやさしく読みやすい
- [ ] 長さ制約を満たす
- [ ] 意味の欠落/過剰がない
- [ ] サービストーン(簡潔/明確/親しみ)を維持

## Output Format (JSON per item)

```json
{
  "key": "string_key",
  "component_type": "button|label|title|description|error|helper|toast|empty_state",
  "source_en": "original text",
  "ja_final": "recommended copy",
  "ja_alternatives": ["alt1", "alt2"],
  "rationale": "why this phrasing is better (1-2 sentences)",
  "qc": {
    "no_pronouns": true,
    "no_verbose_pattern": true,
    "no_excessive_keigo": true,
    "active_voice_preferred": true,
    "readability_ok": true,
    "length_ok": true,
    "meaning_preserved": true,
    "passed": true
  }
}
```
````

## Notes

- 法務文言は法的意味を優先し、任意に言い換えません。
- 用語集がある場合は用語集を最優先します。
- 文脈不足がある場合は `context_needed` を返します。

````

## Content Rules
```markdown
# JA Content Translation Batch Template (Legal / Docs / Blog)

このテンプレートは、長文コンテンツ(Markdown / MDX)を日本語に順次翻訳するときに使います。

## 1) System Prompt

`prompts/ja-ux-translation-system-prompt.md` をシステムプロンプトとして使用します。

## 2) Additional Content Rules

1. 見出し構造(`#`, `##`, `###`)は維持します。
2. コードブロック・インラインコード・URLは変更しません。
3. frontmatterのキー名は変更せず、値のみ翻訳します。
4. 法務文書は意味の正確性を最優先し、曖昧な意訳を避けます。
5. 翻訳が難しい固有名詞は原文維持し、必要なら括弧で補足します。

## 3) Output Format

- 返却は `translated_markdown` フィールドのみ
- ファイルをそのまま置換できる完全なMarkdown/MDX本文を返します
````

## User Task

```markdown
次の blog 文書を日本語に翻訳してください。
source_file: packages/playground-web/content/blog/en/design-system-for-indie-hackers.mdx

## --- SOURCE START ---

title: "Design System for Indie Hackers: How to Choose the Right Approach"
description: "A practical decision framework for indie hackers choosing a design system, with tradeoffs across speed, flexibility, maintenance, and AI workflows."
date: "2026-02-28"
author:
name: "FramingUI Team"
tags:

- design-system
- indie-hacker
- ui-architecture
- product-development
  category: "Guide"
  coverImage: ""
  published: true

---

## Why Indie Hackers Need a Decision Framework

Indie hackers rarely fail because they do not ship features. They fail because they cannot keep quality stable while moving fast. UI quality is one of the first places this shows up.

At first, a few copied components from a UI library seem enough. But as you add billing, onboarding, settings, analytics, and marketing pages, your interface drifts. New contributors or AI-generated code increase that drift.

The answer is not "pick the prettiest component set." The answer is choosing a design system approach that matches your stage, team size, and maintenance budget.

## The 4 Questions to Ask Before Choosing

### 1. How Much Time Can You Spend on UI Infrastructure?

Be honest. If you can only spend a few hours per month on design infrastructure, a highly custom system may become technical debt quickly.

### 2. How Much Brand Differentiation Do You Need?

If your product competes in a crowded market, generic UI may hurt trust. If speed to validation matters most, baseline consistency may be enough.

### 3. How Often Do You Change Product Surfaces?

Fast-moving products need systems that tolerate iteration. Static configuration with clear tokens usually scales better than one-off styling.

### 4. Will You Use AI to Generate UI Code?

If yes, token clarity and machine-readable system rules are now first-class requirements. Otherwise AI will generate plausible but off-brand UI.

## Three Common Design System Paths

### Path A: Raw Utility Classes Only

You style every screen directly using utility classes.

Pros:

- Fast start
- No setup overhead
- Flexible for prototypes

Cons:

- Consistency degrades quickly
- Repeated style logic everywhere
- Harder to enforce across team or AI tooling

Best for: very early experiments with short lifespan.

### Path B: Component Library + Local Conventions

You adopt a popular component library and add lightweight local rules.

Pros:

- Faster than building from zero
- Better baseline accessibility
- Easier onboarding for contributors

Cons:

- Visual sameness across products
- Conventions often stay undocumented
- Token governance varies by setup

Best for: teams that want balanced speed and moderate consistency.

### Path C: Token-First Design System

You define tokens, build primitives around them, and treat components as implementation of token semantics.

Pros:

- Strong consistency and scalability
- Easier theming and rebranding
- Better compatibility with AI-assisted coding

Cons:

- Requires initial setup discipline
- Needs clear migration plan for existing UI

Best for: indie products with growth ambitions and repeated UI shipping.

## Selection Matrix for Indie Hackers

Use this quick matrix when making a choice.

### Choose Path A if:

- You are validating idea-market fit this month
- You expect to rebuild core UI later
- You are not using AI-generated production UI

### Choose Path B if:

- You need reliable shipping now
- You want prebuilt components with minimal setup
- You can accept moderate visual similarity with other products

### Choose Path C if:

- You expect product to scale in surfaces and team size
- You care about long-term consistency and brand identity
- You want AI tools to generate token-aligned code

Most serious indie hackers eventually move toward Path C, even if they start in A or B.

## What to Evaluate in Any Design System Option

### Token Model Quality

Check whether the system supports semantic tokens clearly:

- Component-level semantics (`button.primary.bg`)
- Theme support (light/dark)
- Stable naming and extension strategy

Without this, you will fight drift forever.

### Primitive API Design

Good primitive APIs limit unsafe customization. If every component accepts raw style overrides by default, your consistency is fragile.

### Documentation and Operational Clarity

Do you get clear usage patterns, migration strategy, and enforcement options? A design system is operational, not only visual.

### AI Workflow Compatibility

Can your system be consumed by AI tools through structured token data and clear component contracts? This matters now, not later.

## Where FramingUI Fits

FramingUI is strongest for indie hackers who want token-first consistency without enterprise-level overhead.

Key advantages in practical terms:

- Fast setup of token structure and reusable primitives
- Clear alignment between token semantics and generated UI code
- Designed for iterative product work, not static showcase screens
- Useful bridge between human decisions and AI code generation

It does not remove the need for product judgment, but it reduces repetitive UI decisions and helps enforce consistency at scale.

## Migration Strategy for Existing Indie Products

Most indie projects are not greenfield. Here is a low-risk migration sequence.

### Phase 1: Define Core Tokens

Start with color, spacing, typography, radius. Keep the first version intentionally small.

### Phase 2: Refactor High-Usage Primitives

Prioritize `Button`, `Input`, `Card`, `Badge`. Replace raw styling patterns with token variants.

### Phase 3: Migrate Revenue-Critical Flows

Apply new primitives to onboarding, checkout, billing, and settings before long-tail pages.

### Phase 4: Add Governance

Set lint and review rules:

- No hardcoded brand colors in components
- Token usage required in new UI
- Variant additions require rationale

This prevents silent regression.

## Mistakes Indie Hackers Make When Choosing

### Mistake 1: Choosing by Aesthetics Alone

A polished component screenshot tells you little about maintainability.

### Mistake 2: Ignoring Maintenance Cost

If the system needs constant manual cleanup, it is too expensive for a small team.

### Mistake 3: Deferring Token Decisions

"We will standardize later" usually means compounding inconsistency.

### Mistake 4: Not Planning for AI-Assisted Development

AI code generation is now normal. If your design system is not machine-friendly, inconsistency multiplies faster.

## Decision Checklist

Before committing to a design system path, verify:

- You can explain your token model in one page
- Primitive APIs are constrained enough to enforce consistency
- Migration can happen incrementally without blocking feature work
- The system supports your likely AI coding workflow
- Ongoing maintenance fits your real team capacity

Indie hackers do not need the heaviest platform. They need a design system that preserves speed while preventing visual entropy.

If your product is moving beyond prototype stage, a token-first approach gives the best long-term leverage, and FramingUI is a strong fit for that transition.

--- SOURCE END ---
```
