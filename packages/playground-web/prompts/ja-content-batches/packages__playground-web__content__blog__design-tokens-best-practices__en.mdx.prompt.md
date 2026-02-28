# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/design-tokens-best-practices/en.mdx

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
source_file: packages/playground-web/content/blog/design-tokens-best-practices/en.mdx

## --- SOURCE START ---

title: "Design Tokens Best Practices: Building Scalable Design Systems"
description: "Master design tokens with proven best practices for naming, structure, and multi-platform distribution in modern design systems."
date: "2026-02-26"
author: "tekton team"
tags: ["design-tokens", "design-system", "css", "scalability", "best-practices"]

---

# Design Tokens Best Practices: Building Scalable Design Systems

Design tokens are the foundation of any scalable design system. Get them right, and your entire UI ecosystem becomes maintainable. Get them wrong, and you'll be refactoring for months.

## What Are Design Tokens?

Design tokens are the atomic values of your design system—colors, typography, spacing, shadows, and more—stored as platform-agnostic data. They bridge the gap between design and development.

```json
{
  "color": {
    "primary": {
      "value": "oklch(0.55 0.15 250)",
      "type": "color"
    }
  }
}
```
````

## Best Practice #1: Use a Three-Tier Token Structure

The most effective token architecture uses three tiers:

### Tier 1: Primitive Tokens (Raw Values)

```typescript
const primitives = {
  blue: {
    50: 'oklch(0.97 0.02 250)',
    100: 'oklch(0.93 0.04 250)',
    500: 'oklch(0.55 0.15 250)',
    900: 'oklch(0.25 0.10 250)',
  },
};
```

### Tier 2: Semantic Tokens (Purpose-Based)

```typescript
const semantic = {
  color: {
    primary: primitives.blue[500],
    primaryHover: primitives.blue[600],
    background: primitives.neutral[50],
  },
};
```

### Tier 3: Component Tokens (Specific Use)

```typescript
const component = {
  button: {
    background: semantic.color.primary,
    hoverBackground: semantic.color.primaryHover,
  },
};
```

This structure enables theming at the semantic layer while keeping component tokens stable.

## Best Practice #2: Naming Conventions That Scale

Good token names are predictable, discoverable, and self-documenting.

### Use This Pattern:

```
[category]-[property]-[variant]-[state]
```

### Examples:

```css
--color-background-surface
--color-background-surface-hover
--color-text-primary
--color-text-secondary
--spacing-component-gap
--radius-button-default
```

### Avoid:

- `--blue-500` (primitive in component code)
- `--btn-bg` (abbreviations reduce clarity)
- `--color1` (meaningless names)

## Best Practice #3: Design for Dark Mode from Day One

Don't bolt on dark mode later. Structure your tokens to support themes from the start:

```typescript
const themes = {
  light: {
    color: {
      background: primitives.neutral[50],
      foreground: primitives.neutral[900],
      primary: primitives.blue[500],
    },
  },
  dark: {
    color: {
      background: primitives.neutral[950],
      foreground: primitives.neutral[50],
      primary: primitives.blue[400],
    },
  },
};
```

The key insight: semantic token names stay the same, only values change.

## Best Practice #4: Use OKLCH for Color Tokens

OKLCH (Oklab Lightness Chroma Hue) produces perceptually uniform color scales:

```typescript
// Consistent perceived lightness across hues
const colors = {
  primary: 'oklch(0.55 0.15 250)', // Blue
  success: 'oklch(0.55 0.15 145)', // Green
  warning: 'oklch(0.55 0.15 85)', // Yellow
  error: 'oklch(0.55 0.15 25)', // Red
};
```

Unlike HSL, OKLCH ensures your green and blue at the same lightness value actually _look_ equally bright.

## Best Practice #5: Single Source of Truth

Store tokens in one place, transform for multiple platforms:

```
tokens/
├── colors.json      # Source of truth
├── spacing.json
└── typography.json

output/
├── css/variables.css
├── js/tokens.ts
├── ios/Tokens.swift
└── android/tokens.xml
```

Tools like Style Dictionary, Tokens Studio, or framingui's built-in transformer handle this automatically.

## Best Practice #6: Document with Real Examples

Every token should show its intended use:

```typescript
/**
 * Primary action color
 * @usage Buttons, links, active states
 * @contrast Meets WCAG AA on background-surface
 * @example <Button variant="primary">Save</Button>
 */
export const colorPrimary = 'oklch(0.55 0.15 250)';
```

## Best Practice #7: Version Your Tokens

Treat tokens like an API. Breaking changes need major version bumps:

```json
{
  "version": "2.0.0",
  "breaking": [
    "Renamed color-accent to color-primary",
    "Removed spacing-xs (use spacing-1 instead)"
  ]
}
```

## Common Mistakes to Avoid

1. **Too many tokens** — Start with ~50, grow to ~200 max
2. **Inconsistent naming** — Establish conventions early, enforce them
3. **Hardcoded values in components** — Always reference tokens
4. **Forgetting states** — Include hover, focus, active, disabled
5. **Platform-specific tokens** — Keep the source platform-agnostic

## Measuring Token Health

Track these metrics:

- **Token coverage**: % of hardcoded values vs. tokens
- **Token usage**: Dead tokens waste cognitive load
- **Naming consistency**: Automated linting catches violations

## Get Started with framingui

framingui provides a complete design token infrastructure out of the box:

- Three-tier token architecture
- OKLCH color system
- Multi-platform export
- AI-ready MCP integration

[Start building with tokens →](/docs/tokens)

--- SOURCE END ---

```

```
