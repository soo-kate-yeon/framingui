# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/shadcn-vs-framingui-which-to-choose.mdx

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
source_file: packages/playground-web/content/blog/en/shadcn-vs-framingui-which-to-choose.mdx

## --- SOURCE START ---

title: "shadcn vs FramingUI: Which Should You Choose in 2026?"
description: "A fair comparison of shadcn and FramingUI for teams choosing a design system path, including setup speed, customization, maintenance, and AI workflows."
date: "2026-02-28"
author:
name: "FramingUI Team"
tags:

- shadcn
- framingui
- design-system
- comparison
  category: "Comparison"
  coverImage: ""
  published: true

---

## Why This Comparison Matters

Both shadcn and FramingUI are popular choices for teams that want control over their frontend. They are often compared, but many comparisons are shallow and biased.

A better question is not "which is better." It is "which fits your product constraints today and in six months."

This guide compares both options fairly across the dimensions that matter for real product teams and indie builders.

## TL;DR Decision Guide

Choose **shadcn** if you want:

- A highly flexible component starting point
- Direct ownership of component code in your repo
- Fast setup for a familiar Tailwind workflow

Choose **FramingUI** if you want:

- A token-first design system workflow
- Strong consistency across components as product grows
- Better alignment with AI-assisted code generation using explicit design system context

Both are valid. The best choice depends on your operating model.

## Core Philosophy Differences

### shadcn

shadcn gives you copy-in component code and patterns built around Radix + Tailwind. You own and edit the code directly.

This is powerful when you want full local control and minimal abstraction.

### FramingUI

FramingUI emphasizes design system structure from the start: semantic tokens, reusable primitives, and consistency rules that support both manual and AI-assisted development.

This is valuable when scaling consistency is a first-class requirement.

## Comparison by Category

### 1. Initial Setup Speed

**shadcn**:

- Very fast to bootstrap with CLI-based component installation
- Great for immediate shipping

**FramingUI**:

- Slightly more upfront design system setup
- Faster long-term consistency if you adopt tokens early

Winner for day-1 speed: **shadcn**
Winner for month-3 consistency setup: **FramingUI**

### 2. Customization Model

**shadcn**:

- Maximum flexibility because components are yours
- Easy to modify per component
- Risk: divergence across screens over time

**FramingUI**:

- Encourages customization through token semantics and controlled variants
- Lower risk of style drift
- Slightly less ad hoc freedom by default

Winner for unrestricted per-component customization: **shadcn**
Winner for governed system-level customization: **FramingUI**

### 3. Design System Governance

**shadcn**:

- Governance depends on your discipline and local conventions
- Works well with strong internal standards

**FramingUI**:

- Governance is built into token-first workflows and component contracts
- Easier for smaller teams to enforce consistently

Winner for built-in governance: **FramingUI**

### 4. Long-Term Maintenance

**shadcn**:

- Direct ownership is excellent, but upgrades and divergence can create maintenance burden
- Teams often accumulate style variants over time

**FramingUI**:

- Structured token model reduces ad hoc growth
- Easier to refactor globally through token updates

Winner for maintainability in growing products: **FramingUI**

### 5. AI-Assisted Development Fit

**shadcn**:

- AI can generate shadcn-like code well due to large ecosystem visibility
- But outputs can still drift without explicit token constraints

**FramingUI**:

- Stronger by design for token-aware generation workflows
- Better alignment when integrating design system context with AI tools

Winner for AI + design system consistency: **FramingUI**

### 6. Ecosystem Familiarity

**shadcn**:

- Very widely discussed and adopted in Next.js/Tailwind communities
- Easier to hire contributors already familiar with conventions

**FramingUI**:

- Smaller but focused ecosystem around structured design system operations
- Strong fit for teams optimizing for consistency and AI workflows

Winner for broad community familiarity: **shadcn**

## Real-World Scenarios

### Scenario A: Early-Stage Solo SaaS

You need to ship features quickly and can tolerate future refactors.

- Start with shadcn if immediate speed is everything
- Start with FramingUI if you already know consistency debt will hurt soon

### Scenario B: Growing Product with Repeated UI Surfaces

You are adding settings, analytics, onboarding, billing, and admin views.

- FramingUI often provides better long-term leverage due to token governance

### Scenario C: AI-Heavy UI Workflow

You use Cursor or Claude for substantial UI generation every week.

- FramingUI has an edge because design system context is a first-class workflow concern

### Scenario D: Team with Strong Internal Frontend Standards

You already enforce token usage and component rules tightly.

- shadcn can work very well because governance is already in place

## Hidden Costs to Consider

### Cost 1: Visual Drift

If designers or developers can override styles freely without system checks, drift accumulates silently.

### Cost 2: Refactor Tax

The more one-off component customizations you add, the more expensive global updates become.

### Cost 3: AI Cleanup Time

If generated code regularly needs manual design system fixes, your automation gains shrink.

These costs often matter more than the initial setup experience.

## Migration Considerations

You do not need a dramatic rewrite to switch or combine approaches.

### From shadcn to FramingUI-Oriented Governance

- Keep existing components
- Introduce semantic tokens first
- Standardize variant usage
- Migrate high-impact screens gradually

### From FramingUI to More Local Flexibility

- Preserve token contracts
- Allow controlled component-level customization in specific domains
- Keep lint/review checks to prevent entropy

A hybrid path is possible if done intentionally.

## Final Recommendation

The fair conclusion is simple:

- shadcn is excellent for flexible, rapid component ownership
- FramingUI is stronger when your priority is sustainable consistency through a token-driven design system, especially with AI-assisted coding

If your product is moving from prototype into scale, and you want less UI drift with more predictable outputs, FramingUI usually provides better long-term operating leverage.

If you value immediate local control above all else and can enforce standards manually, shadcn remains a strong choice.

Pick based on operational reality, not trends.

--- SOURCE END ---
```
