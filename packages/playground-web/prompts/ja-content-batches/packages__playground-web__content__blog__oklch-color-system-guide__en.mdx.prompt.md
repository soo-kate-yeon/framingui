# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/oklch-color-system-guide/en.mdx

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
source_file: packages/playground-web/content/blog/oklch-color-system-guide/en.mdx

## --- SOURCE START ---

title: "OKLCH Color System Guide: The Future of CSS Colors"
description: "Learn OKLCH, the perceptually uniform color space that's transforming modern CSS. Create accessible, vibrant color palettes."
date: "2026-02-26"
author: "tekton team"
tags: ["oklch", "css", "color-system", "accessibility", "design-tokens"]

---

# OKLCH Color System Guide: The Future of CSS Colors

OKLCH is the most significant advancement in CSS color specification since HSL. It produces perceptually uniform colors, makes accessibility easier, and creates more vibrant palettes. Here's everything you need to know.

## What is OKLCH?

OKLCH stands for **O**klab **L**ightness **C**hroma **H**ue—a perceptually uniform color space that models how humans actually see color.

```css
/* OKLCH Syntax */
color: oklch(L C H);
color: oklch(L C H / alpha);

/* Example */
color: oklch(0.65 0.15 250); /* Vibrant blue */
```
````

- **L (Lightness)**: 0 to 1 — How bright the color appears
- **C (Chroma)**: 0 to ~0.4 — Color intensity/saturation
- **H (Hue)**: 0 to 360 — Position on the color wheel

## Why OKLCH Beats HSL

### The Problem with HSL

In HSL, "50% lightness" doesn't mean the same thing across hues:

```css
/* HSL: Same lightness, different perceived brightness */
.yellow {
  background: hsl(60, 100%, 50%);
} /* Looks bright */
.blue {
  background: hsl(240, 100%, 50%);
} /* Looks dark */
```

Yellow at 50% lightness appears much brighter than blue at 50% lightness. Your brain perceives them differently.

### OKLCH Fixes This

```css
/* OKLCH: Same lightness = same perceived brightness */
.yellow {
  background: oklch(0.75 0.15 85);
}
.blue {
  background: oklch(0.75 0.15 250);
}
```

Both colors now have equal perceived brightness. This is "perceptual uniformity."

## Building Color Palettes with OKLCH

### Creating a Consistent Scale

Generate a 10-step color scale by only changing lightness:

```typescript
const generateScale = (hue: number, chroma: number) => ({
  50: `oklch(0.97 ${chroma * 0.1} ${hue})`,
  100: `oklch(0.93 ${chroma * 0.2} ${hue})`,
  200: `oklch(0.87 ${chroma * 0.4} ${hue})`,
  300: `oklch(0.78 ${chroma * 0.6} ${hue})`,
  400: `oklch(0.68 ${chroma * 0.8} ${hue})`,
  500: `oklch(0.58 ${chroma} ${hue})`,
  600: `oklch(0.50 ${chroma} ${hue})`,
  700: `oklch(0.42 ${chroma * 0.9} ${hue})`,
  800: `oklch(0.33 ${chroma * 0.8} ${hue})`,
  900: `oklch(0.25 ${chroma * 0.7} ${hue})`,
  950: `oklch(0.18 ${chroma * 0.5} ${hue})`,
});

// Generate primary palette
const primary = generateScale(250, 0.15); // Blue hue
```

### Semantic Color Harmony

Keep lightness and chroma consistent across semantic colors:

```typescript
const semanticColors = {
  primary: 'oklch(0.55 0.15 250)', // Blue
  success: 'oklch(0.55 0.15 145)', // Green
  warning: 'oklch(0.55 0.15 85)', // Yellow-orange
  error: 'oklch(0.55 0.15 25)', // Red
  info: 'oklch(0.55 0.15 220)', // Cyan-blue
};
```

All these colors have the same visual "weight" in your UI.

## OKLCH for Accessibility

### Predictable Contrast Ratios

Because OKLCH lightness is perceptually uniform, you can calculate contrast more reliably:

```typescript
// Simple contrast estimation
const estimateContrast = (l1: number, l2: number) => {
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
};

// WCAG AA requires 4.5:1 for text
// Background: oklch(0.98 ...)
// Text: oklch(0.35 ...) → Good contrast!
```

### Building Accessible Palettes

Define your palette with accessibility built in:

```typescript
const palette = {
  // Background colors (high lightness)
  surface: 'oklch(0.98 0.01 250)',
  surfaceHover: 'oklch(0.95 0.02 250)',

  // Text colors (low lightness for contrast)
  textPrimary: 'oklch(0.20 0.02 250)',
  textSecondary: 'oklch(0.40 0.02 250)',

  // Interactive (medium lightness)
  interactive: 'oklch(0.50 0.15 250)',
  interactiveHover: 'oklch(0.45 0.17 250)',
};
```

## Practical OKLCH Patterns

### Dark Mode with OKLCH

Flip your palette by inverting lightness values:

```typescript
const lightTheme = {
  background: 'oklch(0.98 0.01 250)',
  foreground: 'oklch(0.20 0.02 250)',
  primary: 'oklch(0.50 0.15 250)',
};

const darkTheme = {
  background: 'oklch(0.15 0.02 250)',
  foreground: 'oklch(0.90 0.01 250)',
  primary: 'oklch(0.65 0.15 250)', // Slightly brighter for dark bg
};
```

### Hover States

Adjust lightness for predictable hover effects:

```css
.button {
  background: oklch(0.55 0.15 250);
}

.button:hover {
  background: oklch(0.5 0.17 250); /* Darker, slightly more chroma */
}

.button:active {
  background: oklch(0.45 0.18 250); /* Even darker */
}
```

### Focus Rings

High-chroma colors work great for focus states:

```css
.button:focus-visible {
  outline: 2px solid oklch(0.65 0.25 250);
  outline-offset: 2px;
}
```

## Browser Support

OKLCH is supported in all modern browsers:

- Chrome 111+ (March 2023)
- Firefox 113+ (May 2023)
- Safari 15.4+ (March 2022)
- Edge 111+ (March 2023)

For older browsers, use fallbacks:

```css
.button {
  /* Fallback for older browsers */
  background: #3b82f6;
  /* Modern browsers use this */
  background: oklch(0.55 0.15 250);
}
```

## OKLCH in framingui

framingui uses OKLCH as its native color system:

```typescript
// framingui token structure
import { colors } from '@framingui/tokens';

// All colors defined in OKLCH
console.log(colors.primary[500]);
// → "oklch(0.55 0.15 250)"
```

### Color Manipulation

```typescript
import { adjustLightness, adjustChroma } from '@framingui/color';

const base = 'oklch(0.55 0.15 250)';
const lighter = adjustLightness(base, 0.1); // oklch(0.65 0.15 250)
const darker = adjustLightness(base, -0.1); // oklch(0.45 0.15 250)
const muted = adjustChroma(base, -0.05); // oklch(0.55 0.10 250)
```

## Quick Reference

| Use Case    | L         | C         | Notes                         |
| ----------- | --------- | --------- | ----------------------------- |
| Background  | 0.95-0.99 | 0.01-0.02 | Nearly white with subtle tint |
| Surface     | 0.90-0.95 | 0.02-0.03 | Cards, modals                 |
| Text        | 0.15-0.40 | 0.01-0.03 | High contrast on light bg     |
| Interactive | 0.45-0.60 | 0.12-0.18 | Buttons, links                |
| Accent      | 0.60-0.70 | 0.20-0.30 | Focus rings, highlights       |

## Start Using OKLCH Today

Ready to modernize your color system? framingui provides:

- Pre-built OKLCH palettes
- Color manipulation utilities
- Automatic contrast checking
- Dark mode support

[Explore OKLCH tokens →](/docs/tokens/colors)

--- SOURCE END ---

```

```
