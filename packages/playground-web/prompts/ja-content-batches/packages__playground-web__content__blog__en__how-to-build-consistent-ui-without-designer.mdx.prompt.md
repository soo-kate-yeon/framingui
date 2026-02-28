# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/how-to-build-consistent-ui-without-designer.mdx

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

````markdown
次の blog 文書を日本語に翻訳してください。
source_file: packages/playground-web/content/blog/en/how-to-build-consistent-ui-without-designer.mdx

## --- SOURCE START ---

title: "How to Build Consistent UI Without a Designer"
description: "A practical system for solo developers to create consistent UI without hiring a designer, using design tokens, rules, and repeatable workflows."
date: "2026-02-28"
author:
name: "FramingUI Team"
tags:

- consistent-ui
- design-system
- solo-developer
- indie-hacker
  category: "Guide"
  coverImage: ""
  published: true

---

## Why Consistent UI Feels Hard When You Build Alone

If you are a solo developer or indie hacker, UI inconsistency usually does not happen because you do not care. It happens because your product grows faster than your decisions. You build a dashboard in week one, add onboarding in week two, ship settings in week three, and suddenly the same button appears in five different styles.

You tweak quickly to ship. You copy and adapt old code. You test less visual edge cases than you want. Then one day you realize your product looks "almost right" everywhere, but never fully cohesive.

The good news: you do not need a full-time designer to fix this. You need a lightweight design system that gives you constraints you can trust.

## What "Consistent UI" Actually Means

Consistent UI is not about making everything identical. It is about making predictable choices across contexts.

### Visual Consistency

- Colors map to clear meaning: primary, success, warning, danger
- Spacing follows one scale, not arbitrary `14px`, `17px`, `22px`
- Typography follows a readable hierarchy for title, subtitle, body, caption

### Behavioral Consistency

- Buttons behave the same across screens
- Inputs show validation and focus in the same pattern
- Feedback states (loading, empty, error) follow shared rules

### Structural Consistency

- Reusable layout blocks for headers, cards, forms, and sections
- Repeated patterns for navigation and page composition

When these three layers align, your UI feels professional even without custom visual polish.

## The Solo Builder's 4-Layer System

You can build consistency with four layers, in order.

### Layer 1: Foundations (Design Tokens)

Design tokens are the smallest reusable values in your 디자인 시스템. They include color, spacing, radius, typography, and shadow values.

If you skip tokens and write raw values directly in components, drift starts immediately. A tokenized base makes every style decision explicit.

Use semantic naming:

- `color.background.surface`
- `color.text.muted`
- `spacing.4`
- `radius.md`
- `font.size.body`

Avoid brand-specific names in component code like `blue500` or `gray700`. Components should consume semantic meaning, not raw palette entries.

### Layer 2: Primitives

Primitives are low-level reusable UI pieces with no product logic:

- `Button`
- `Input`
- `Select`
- `Card`
- `Badge`

Each primitive should expose a small set of variants, not infinite freedom. Example:

- `Button` variants: `primary`, `secondary`, `ghost`, `danger`
- `Button` sizes: `sm`, `md`, `lg`

If each team member can pass custom colors and spacing directly, consistency disappears. Strong defaults are the point.

### Layer 3: Patterns

Patterns combine primitives into frequent product structures:

- Filter bars
- Form sections
- Empty states
- Data table toolbars
- Auth page layouts

Most inconsistency appears at this level because people rebuild common sections from scratch. If a pattern appears twice, extract it.

### Layer 4: Rules

Rules are documented decisions for when to use which variant. You do not need a 40-page handbook. Start with one page:

- When to use primary vs secondary button
- Standard spacing between form elements
- Page title hierarchy
- Error message style and placement

Rules remove decision fatigue, which is the hidden cause of visual drift.

## A 7-Day Workflow to Fix Existing Inconsistency

You can retrofit this into an active product without pausing shipping.

### Day 1: UI Audit

Take screenshots of major pages and list repeated UI problems:

- Number of button styles
- Number of input styles
- Number of font sizes in body copy
- Number of card paddings

This gives you a baseline and prevents subjective debates.

### Day 2: Token Baseline

Define your minimum token set:

- 8-10 spacing steps
- 5-7 semantic text colors
- 5-7 semantic background/border colors
- 3 radius values
- 3-4 font sizes for app UI

Keep it small. You can extend later.

### Day 3: Primitive Refactor

Refactor one high-usage primitive first, usually `Button`. Replace raw utility combinations with token-backed variants.

### Day 4: Form Stack

Refactor `Input`, `Textarea`, `Select`, `Label`, `FieldError`. Forms expose inconsistency quickly and deliver high leverage.

### Day 5: Layout Patterns

Create `PageHeader`, `SectionCard`, `EmptyState` patterns. Use them in two real screens.

### Day 6: Replace Top 20 Screens

Touch the screens with highest traffic or highest internal usage. Do not chase full migration first.

### Day 7: Lock Rules

Document short usage rules and add lint or review checks:

- New components must use tokens
- No hardcoded color values in JSX
- No custom spacing outside token scale unless justified

At this point, you have a practical 디자인 시스템 and a repeatable process.

## How to Keep Consistency While Moving Fast

Speed and consistency are not opposites if your defaults are good.

### Use "Default First" Component APIs

Bad API:

```tsx
<Button bgColor="..." textColor="..." px={...} py={...} radius={...}>
```
````

Good API:

```tsx
<Button variant="primary" size="md">
  Create Project
</Button>
```

The second API preserves consistency under pressure.

### Reserve Custom Styling for Explicit Exceptions

Create an `unstyled` or `custom` escape hatch, but require explanation in PRs. This keeps flexibility without accidental entropy.

### Track Drift with Lightweight Metrics

Once a month, run simple checks:

- Count hardcoded hex colors
- Count one-off spacing values
- Count component variants actually used

If these numbers rise, your system is leaking.

## Where FramingUI Helps Solo Developers

Many indie hackers know what consistency means but get stuck implementing it. FramingUI helps at two critical points:

- It gives token and component scaffolding that makes a 디자인 시스템 operational quickly
- It integrates with AI coding workflows so generated UI follows your token rules instead of random defaults

This is useful when you build alone because every manual cleanup step steals product time.

## Common Mistakes That Break Consistency

### Mistake 1: Starting from Components Instead of Tokens

If tokens are vague or missing, component variants become arbitrary and hard to scale.

### Mistake 2: Too Many Variants

If every button has eight variants and six sizes, nobody remembers rules. Restrict options.

### Mistake 3: No Migration Plan

A perfect new system does nothing if old screens still dominate user experience. Migrate high-impact surfaces first.

### Mistake 4: Treating Consistency as a Visual Nice-to-Have

Consistent UI improves velocity. It reduces repeated decisions, QA noise, and onboarding time for contributors.

## Final Checklist for Solo Builders

Before you consider your UI system stable, confirm:

- Tokens exist for color, spacing, type, radius, and shadow
- Top primitives use tokens only
- High-frequency page patterns are extracted
- Usage rules are documented in one internal page
- PR checks catch hardcoded visual values

You do not need a big design team to ship coherent product UI. You need a small, enforced 디자인 시스템 and disciplined defaults.

For solo developers and indie hackers, that is the fastest path to a product that feels intentional from first visit to power-user workflows.

--- SOURCE END ---

```

```
