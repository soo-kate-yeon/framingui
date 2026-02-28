# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/solo-developer-design-system-guide.mdx

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
source_file: packages/playground-web/content/blog/en/solo-developer-design-system-guide.mdx

## --- SOURCE START ---

title: "The Solo Developer's Guide to Building a Design System (Without a Designer)"
description: "Build a professional design system without a designer. A practical guide for solo developers and indie hackers using design tokens."
date: "2026-02-25"
author:
name: "FramingUI Team"
tags:

- design-system
- solo-developer
- indie-hacker
- tutorial
  category: "Guide"
  coverImage: ""
  published: true

---

## You're Building Alone (And That's Okay)

You're a solo developer. Maybe you're building a SaaS product, a side project, or freelancing. You write all the code, manage deployment, handle support, _and_ somehow need to make the UI look professional.

**The problem:** You have no design background. You copy-paste Tailwind classes from docs. Your buttons have 7 different styles across 12 pages. Your color palette is "whatever looked good at the time."

**The solution:** You don't need a designer. You need a **design system**—and you can build one in an afternoon.

## TL;DR: Your 2-Hour Design System

**What you'll build:**

- Professional color palette (WCAG AA compliant)
- Consistent spacing and typography scales
- Reusable component tokens
- Automated token enforcement (no more style drift)

**What you'll get:**

- UI that looks designed (even though you're not a designer)
- AI tools that generate on-brand components automatically
- Zero time spent "tweaking styles until it looks right"
- Confidence shipping UI without a design review

**Time investment:** 2 hours setup, 0 hours maintenance (tokens enforce themselves)

**Technical requirements:**

- Basic React knowledge
- Command line familiarity
- Any text editor

**No design skills required.** Seriously.

## Why Solo Developers Need Design Systems

### The Problem: Inconsistency Creep

Day 1 of your project:

```tsx
<button className="bg-blue-500 px-4 py-2 rounded">Submit</button>
```
````

Day 15:

```tsx
<button className="bg-blue-600 px-6 py-3 rounded-lg">Continue</button>
```

Day 30:

```tsx
<button style={{ background: '#3B82F6', padding: '12px 24px' }}>Next</button>
```

**Three different blues. Three different sizes. Three different border radius values.**

Now imagine this across 50 components, 200 files, and 6 months of development.

**Result:** Your UI looks like it was designed by three different people—because it technically was (past you, present you, and frustrated-at-3am you).

### What a Design System Fixes

With design tokens, you write this instead:

```tsx
import { tokens } from '@/design-system/tokens';

<button
  style={{
    background: tokens.button.bg.primary,
    padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
    borderRadius: tokens.radius.md,
  }}
>
  Submit
</button>;
```

**Every button now uses:**

- Same blue (from token)
- Same spacing (from scale)
- Same border radius (from token)

**Benefits:**

- ✅ Consistent UI across entire app
- ✅ Change one token, update everywhere
- ✅ AI tools generate on-brand components
- ✅ No more "does this blue match that blue?"

## The 2-Hour Setup Guide

### Hour 1: Generate Your Design Tokens

You're going to create a professional color palette, spacing scale, and typography system—without touching Figma.

#### Step 1: Install framingui (5 minutes)

```bash
# Create a new Next.js project (or use existing)
npx create-next-app@latest my-app
cd my-app

# Install framingui
npm install @framingui/core

# Or with yarn
yarn add @framingui/core

# Or with pnpm
pnpm add @framingui/core
```

#### Step 2: Answer 7 Simple Questions (10 minutes)

```bash
npx @framingui/cli init
```

The CLI will ask you questions. Here's how to answer them without design experience:

**Question 1: What's your primary brand color?**

Don't know? Pick from these proven color psychology guidelines:

- **Tech/SaaS**: Blue (trust, professionalism)
  - Try: `{ l: 0.5, c: 0.15, h: 240 }`

- **Health/Wellness**: Green (health, growth)
  - Try: `{ l: 0.55, c: 0.12, h: 140 }`

- **Finance**: Dark blue or purple (trust, stability)
  - Try: `{ l: 0.45, c: 0.13, h: 260 }`

- **E-commerce**: Orange or red (energy, urgency)
  - Try: `{ l: 0.6, c: 0.15, h: 30 }`

**Question 2: Contrast level?**

- Choose **AA** (standard accessibility)
- Only choose AAA if you're building for healthcare/government (stricter compliance)

**Question 3: Border radius style?**

- **Minimal** (0-4px): Professional, serious products (fintech, B2B)
- **Moderate** (6-8px): Standard SaaS, balanced
- **Rounded** (12-16px): Consumer apps, friendly feel

**Question 4: Spacing density?**

- **Compact**: Data-heavy dashboards, power users
- **Comfortable** (recommended): Standard apps, general use
- **Spacious**: Marketing sites, content-focused

**Question 5: Typography scale?**

- Choose **Medium** (you can customize later)

**Question 6: Dark mode?**

- Choose **Yes** (free, and most users expect it)

**Question 7: Framework?**

- Select your framework (Next.js, Vite, Remix, etc.)
- framingui auto-detects this if possible

#### Step 3: Review Generated Tokens (5 minutes)

framingui just generated:

```
my-app/
├── tokens.css           # Your design tokens as CSS variables
├── tokens.json          # Token metadata (for tooling)
├── tailwind.config.js   # Tailwind integration (if detected)
└── components/
    └── tokens.ts        # TypeScript token definitions
```

Open `tokens.css`:

```css
:root {
  /* Primary color scale (10 steps, WCAG compliant) */
  --color-primary-50: oklch(0.95 0.03 240);
  --color-primary-100: oklch(0.9 0.06 240);
  --color-primary-500: oklch(0.5 0.15 240); /* Your main brand color */
  --color-primary-900: oklch(0.25 0.08 240);

  /* Spacing scale (based on 4px grid) */
  --spacing-1: 0.25rem; /* 4px */
  --spacing-2: 0.5rem; /* 8px */
  --spacing-4: 1rem; /* 16px */
  --spacing-6: 1.5rem; /* 24px */

  /* Component tokens (semantic) */
  --button-bg-primary: var(--color-primary-500);
  --button-fg-primary: oklch(0.98 0.01 240); /* Guaranteed contrast */
}
```

**What just happened:**

1. framingui generated a 10-step color scale from your primary color
2. Every color automatically passes WCAG AA contrast requirements
3. Spacing scale follows a mathematical progression (not arbitrary)
4. Component tokens map to semantic use cases

**No design knowledge required.** This is professional-grade.

#### Step 4: Add Semantic Tokens (20 minutes)

Generated tokens are foundational. Now add semantic meaning:

```css
/* tokens.css (add these) */

:root {
  /* Semantic background tokens */
  --bg-page: var(--color-neutral-50);
  --bg-surface: white;
  --bg-surface-elevated: white;

  /* Semantic foreground tokens */
  --fg-primary: var(--color-neutral-900);
  --fg-secondary: var(--color-neutral-600);
  --fg-tertiary: var(--color-neutral-500);

  /* Semantic border tokens */
  --border-default: var(--color-neutral-200);
  --border-strong: var(--color-neutral-400);

  /* Semantic state tokens */
  --state-success: var(--color-success-500);
  --state-warning: var(--color-warning-500);
  --state-error: var(--color-error-500);
  --state-info: var(--color-primary-500);
}

/* Dark mode overrides */
[data-theme='dark'] {
  --bg-page: var(--color-neutral-900);
  --bg-surface: var(--color-neutral-800);
  --bg-surface-elevated: var(--color-neutral-750);

  --fg-primary: var(--color-neutral-50);
  --fg-secondary: var(--color-neutral-400);
  --fg-tertiary: var(--color-neutral-500);

  --border-default: var(--color-neutral-700);
  --border-strong: var(--color-neutral-600);
}
```

**Pro tip:** Use semantic names (`bg-surface`, `fg-primary`) instead of color names (`gray-100`, `blue-500`). When you change your color palette, you only update tokens—no code changes.

#### Step 5: Create Token Helper (20 minutes)

Make tokens easy to use in React:

```typescript
// lib/tokens.ts

export const tokens = {
  // Colors
  bg: {
    page: 'var(--bg-page)',
    surface: {
      base: 'var(--bg-surface)',
      elevated: 'var(--bg-surface-elevated)',
    },
  },
  fg: {
    primary: 'var(--fg-primary)',
    secondary: 'var(--fg-secondary)',
    tertiary: 'var(--fg-tertiary)',
  },
  border: {
    default: 'var(--border-default)',
    strong: 'var(--border-strong)',
  },

  // Spacing
  spacing: {
    1: 'var(--spacing-1)',
    2: 'var(--spacing-2)',
    3: 'var(--spacing-3)',
    4: 'var(--spacing-4)',
    6: 'var(--spacing-6)',
    8: 'var(--spacing-8)',
  },

  // Typography
  fontSize: {
    xs: 'var(--font-size-xs)',
    sm: 'var(--font-size-sm)',
    base: 'var(--font-size-base)',
    lg: 'var(--font-size-lg)',
    xl: 'var(--font-size-xl)',
    '2xl': 'var(--font-size-2xl)',
  },

  // Border radius
  radius: {
    sm: 'var(--radius-sm)',
    md: 'var(--radius-md)',
    lg: 'var(--radius-lg)',
    full: 'var(--radius-full)',
  },

  // Shadows
  shadow: {
    sm: 'var(--shadow-sm)',
    md: 'var(--shadow-md)',
    lg: 'var(--shadow-lg)',
  },

  // Component tokens
  button: {
    bg: {
      primary: 'var(--button-bg-primary)',
      secondary: 'var(--button-bg-secondary)',
      ghost: 'transparent',
    },
    fg: {
      primary: 'var(--button-fg-primary)',
      secondary: 'var(--button-fg-secondary)',
      ghost: 'var(--fg-primary)',
    },
  },
} as const;

// TypeScript: Make tokens readonly for safety
export type Tokens = typeof tokens;
```

Now use tokens in components:

```tsx
import { tokens } from '@/lib/tokens';

export function Card({ children }) {
  return (
    <div
      style={{
        background: tokens.bg.surface.elevated,
        padding: tokens.spacing[6],
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadow.md,
      }}
    >
      {children}
    </div>
  );
}
```

**Congratulations!** You have a professional design system. Hour 1 complete.

### Hour 2: Connect AI to Your Design System

Now make AI tools generate components using your design tokens automatically.

#### Step 6: Install MCP Server (5 minutes)

```bash
# Install framingui MCP server
npm install @framingui/mcp-server
```

#### Step 7: Configure MCP in Your AI Tool (10 minutes)

**For Claude Code:**

Create `.claude/mcp.json`:

```json
{
  "servers": {
    "design-system": {
      "command": "npx",
      "args": ["@framingui/mcp-server"],
      "env": {
        "TEKTON_PROJECT_PATH": ".",
        "TEKTON_TOKEN_PATH": "./tokens.json"
      }
    }
  }
}
```

**For Cursor:**

Create `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "design-system": {
      "command": "npx",
      "args": ["@framingui/mcp-server"],
      "env": {
        "TEKTON_PROJECT_PATH": ".",
        "TEKTON_TOKEN_PATH": "./tokens.json"
      }
    }
  }
}
```

Restart your AI tool.

#### Step 8: Test AI Integration (10 minutes)

In Claude Code or Cursor:

```
You: List available design tokens

Claude: [Queries MCP server]

Available design tokens:
- Colors: primary (10 steps), success, warning, error
- Spacing: 1, 2, 3, 4, 6, 8, 12, 16
- Typography: xs, sm, base, lg, xl, 2xl
- Component tokens: button, card, input
```

Now generate a component:

```
You: Create a pricing card component

Claude: [Queries design tokens via MCP]
```

```tsx
import { tokens } from '@/lib/tokens';

export function PricingCard({ tier, price, features }) {
  return (
    <div
      style={{
        background: tokens.bg.surface.elevated,
        padding: tokens.spacing[6],
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadow.md,
        border: `1px solid ${tokens.border.default}`,
      }}
    >
      <h3
        style={{
          fontSize: tokens.fontSize.xl,
          fontWeight: 'bold',
          color: tokens.fg.primary,
        }}
      >
        {tier}
      </h3>

      <p
        style={{
          fontSize: tokens.fontSize['2xl'],
          fontWeight: 'bold',
          color: tokens.fg.primary,
          marginTop: tokens.spacing[4],
        }}
      >
        ${price}
        <span style={{ fontSize: tokens.fontSize.sm }}>/mo</span>
      </p>

      <ul style={{ marginTop: tokens.spacing[6] }}>
        {features.map((feature) => (
          <li
            key={feature}
            style={{
              color: tokens.fg.secondary,
              marginTop: tokens.spacing[2],
            }}
          >
            {feature}
          </li>
        ))}
      </ul>

      <button
        style={{
          marginTop: tokens.spacing[6],
          width: '100%',
          background: tokens.button.bg.primary,
          color: tokens.button.fg.primary,
          padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
          borderRadius: tokens.radius.md,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Get Started
      </button>
    </div>
  );
}
```

**Notice:** Zero hardcoded values. All tokens from your design system. Generated automatically by AI.

#### Step 9: Enforce Token Compliance (25 minutes)

Prevent yourself (or AI) from adding hardcoded values in the future.

Install esbuild plugin:

```bash
npm install @framingui/esbuild-plugin
```

Configure build-time validation:

```typescript
// next.config.js (for Next.js)
const { tektonPlugin } = require('@framingui/esbuild-plugin');

module.exports = {
  experimental: {
    esmExternals: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        tektonPlugin({
          strict: process.env.NODE_ENV === 'production',
          threshold: 90, // Allow 10% non-token styles (for third-party libs)
        })
      );
    }
    return config;
  },
};
```

Now if you (or AI) writes this:

```tsx
<button style={{ background: '#3B82F6' }}>Click</button>
```

Build fails with:

```
❌ Token compliance violation

File: components/button.tsx:12
Issue: Hardcoded color value '#3B82F6'
Expected: Use tokens.button.bg.primary

Fix:
<button style={{ background: tokens.button.bg.primary }}>Click</button>
```

**Result:** Your design system stays consistent forever. No manual enforcement needed.

#### Step 10: Document Your System (10 minutes)

Create a simple README for your future self:

````markdown
# Design System

## Colors

- Primary: Blue (#[generated by tekton])
- Success: Green
- Warning: Orange
- Error: Red

## Spacing Scale

Based on 4px grid:

- 1 = 4px
- 2 = 8px
- 4 = 16px
- 6 = 24px

## Usage

```tsx
import { tokens } from '@/lib/tokens';

<div
  style={{
    background: tokens.bg.surface.base,
    padding: tokens.spacing[4],
    borderRadius: tokens.radius.md,
  }}
>
  Content
</div>;
```
````

## Token Reference

- `tokens.bg.*` - Background colors
- `tokens.fg.*` - Foreground (text) colors
- `tokens.spacing.*` - Spacing values
- `tokens.fontSize.*` - Typography scale
- `tokens.radius.*` - Border radius
- `tokens.shadow.*` - Box shadows
- `tokens.button.*` - Button-specific tokens

````

**That's it.** 2 hours. You have a professional design system.

## Common Patterns for Solo Developers

### Pattern 1: The Component Library Shortcut

Don't build every component from scratch. Use shadcn/ui with your tokens:

```bash
# Install shadcn/ui
npx shadcn-ui@latest init

# Generate components
npx shadcn-ui@latest add button card input
````

Then override with your tokens:

```tsx
// components/ui/button.tsx
import { tokens } from '@/lib/tokens';

export function Button({ children, variant = 'primary' }) {
  const styles = {
    primary: {
      background: tokens.button.bg.primary,
      color: tokens.button.fg.primary,
    },
    secondary: {
      background: tokens.button.bg.secondary,
      color: tokens.button.fg.secondary,
    },
  };

  return (
    <button
      style={{
        ...styles[variant],
        padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
        borderRadius: tokens.radius.md,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {children}
    </button>
  );
}
```

**Result:** Professional components in minutes, using your tokens.

### Pattern 2: The Color Palette Validator

Not sure if your colors work together? framingui validates automatically:

```bash
npx @framingui/cli validate

✅ All color combinations pass WCAG AA
✅ Primary + background: 8.2:1 contrast (exceeds 4.5:1 requirement)
✅ Secondary + background: 5.1:1 contrast
⚠️  Tertiary + background: 3.8:1 contrast (below 4.5:1 for normal text)

Suggestions:
- Use tertiary color for large text only (passes 3:1 requirement)
- Or darken tertiary by 5% for normal text compliance
```

**No design degree required.** Math handles accessibility.

### Pattern 3: The Theme Switcher

Want light + dark mode? Already handled:

```tsx
// components/theme-switcher.tsx
export function ThemeSwitcher() {
  const [theme, setTheme] = useState('light');

  const toggle = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  return <button onClick={toggle}>{theme === 'light' ? '🌙' : '☀️'}</button>;
}
```

Your tokens automatically switch:

```css
/* Light mode (default) */
:root {
  --bg-page: #fafafa;
  --fg-primary: #1a1a1a;
}

/* Dark mode (automatic) */
[data-theme='dark'] {
  --bg-page: #1a1a1a;
  --fg-primary: #fafafa;
}
```

All components update automatically (they use tokens, not hardcoded colors).

### Pattern 4: The AI Design Assistant

Once MCP is configured, use AI as your design assistant:

```
You: Should I use primary or secondary button for the "Cancel" action?

Claude: [Queries component knowledge via MCP]

Use secondary or ghost variant for "Cancel" actions:
- Primary buttons are for main CTAs (max one per screen)
- Cancel actions are low-priority and should not compete with primary action
- Recommended: ghost variant (lowest visual weight)

Code:
<Button variant="ghost">Cancel</Button>
```

AI understands design best practices, you don't need to.

## Real Solo Developer Case Studies

### Case Study 1: SaaS Dashboard (1 developer, 3 months)

**Before design system:**

- 83 unique color values in codebase
- 45 different spacing values
- Inconsistent button styles (users reported "looks unfinished")
- 4 hours/week tweaking styles

**After framingui:**

- 12 color tokens (100% compliance)
- 9 spacing values (mathematical scale)
- Consistent components (users commented "looks very professional")
- 0 hours/week on styles (tokens enforce themselves)

**Quote:**

> "I'm not a designer, but my SaaS looks like I hired one. framingui gave me a design system I could trust."
> — Alex, Indie SaaS Developer

### Case Study 2: E-commerce Store (1 developer, 2 months)

**Before design system:**

- Copied styles from random CodePen demos
- Every page looked different
- Failed WCAG contrast checks (lawsuit risk)

**After framingui:**

- Generated WCAG AAA color palette (automatic)
- Consistent product cards, buttons, inputs
- Passed accessibility audit (saved legal fees)

**Quote:**

> "framingui generated accessible colors I never would have figured out on my own. It literally saved my business from an ADA lawsuit."
> — Jordan, E-commerce Founder

### Case Study 3: Freelance Developer (5 clients)

**Before design system:**

- Rebuilt styles for every client project
- Hard to maintain consistency across projects
- Clients requested "make it match our brand" (nightmare)

**After framingui:**

- Created one design system template
- Customize per client: `npx @framingui/cli init --brand clientA`
- Generate brand-specific tokens in 10 minutes
- AI generates on-brand components for each client

**Quote:**

> "I have one codebase that works for all my clients. I just swap token files. Game changer."
> — Sam, Freelance Developer

## FAQ for Solo Developers

### I'm not a designer. Can I really do this?

Yes. framingui is designed for non-designers. You answer simple questions (what color represents your brand?), and framingui handles the design math:

- Color theory (complementary colors, shades, tints)
- Accessibility (WCAG contrast requirements)
- Typography scale (mathematical progression)
- Spacing rhythm (consistent visual hierarchy)

**No Figma required. No design degree required.**

### How much does this cost?

framingui is **in beta** with your first template free. Pick a template, install with one command, and start building. No subscription during beta.

You'll spend money on:

- AI tool subscription (Claude, Cursor, etc.) — optional but recommended
- Hosting (same as any project)

### How long does setup actually take?

Real-world times:

- **First time**: 2-3 hours (includes learning)
- **Second project**: 30-45 minutes (you know the process)
- **After that**: 15-20 minutes (mostly copy-paste from previous projects)

### What if I want to change my colors later?

Change one token, everything updates:

```css
/* Before */
--color-primary-500: oklch(0.5 0.15 240); /* Blue */

/* After */
--color-primary-500: oklch(0.5 0.15 140); /* Green */
```

All buttons, links, badges, highlights update automatically.

**No find-and-replace. No manual updates. Token system handles it.**

### Can I hire a designer later to improve this?

Absolutely! Designers love working with design systems. Hand them your `tokens.css` file and they can:

- Refine color palettes
- Adjust spacing scales
- Add component variants

All their changes flow through tokens—no code changes needed.

### Do I need to learn OKLCH color space?

No. framingui handles OKLCH internally. You can provide colors as:

- Hex: `#3B82F6`
- RGB: `rgb(59, 130, 246)`
- HSL: `hsl(217, 91%, 60%)`

framingui converts to OKLCH automatically and generates WCAG-compliant scales.

### What if I'm using Tailwind CSS?

framingui integrates with Tailwind:

```javascript
// tailwind.config.js (generated by framingui)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--color-primary-50)',
          500: 'var(--color-primary-500)',
          900: 'var(--color-primary-900)',
        },
      },
      spacing: {
        1: 'var(--spacing-1)',
        4: 'var(--spacing-4)',
      },
    },
  },
};
```

Now use Tailwind utilities:

```tsx
<div className="bg-primary-500 p-4 rounded-lg">Uses your design tokens</div>
```

### Can I use this with Vue/Svelte/Angular?

Design tokens (CSS variables) work with any framework:

```css
/* tokens.css */
:root {
  --color-primary: oklch(0.5 0.15 240);
}
```

```html
<!-- Vue -->
<div :style="{ background: 'var(--color-primary)' }">Content</div>

<!-- Svelte -->
<div style:background="var(--color-primary)">Content</div>

<!-- Angular -->
<div [style.background]="'var(--color-primary)'">Content</div>
```

MCP server currently generates React components, but tokens work everywhere.

## Your Design System Checklist

Use this to verify your setup:

**Token Generation:**

- [ ] Installed framingui
- [ ] Generated color palette (WCAG validated)
- [ ] Created spacing scale
- [ ] Defined typography scale
- [ ] Generated dark mode variants
- [ ] Exported tokens.css and tokens.json

**Token Usage:**

- [ ] Created token helper (`lib/tokens.ts`)
- [ ] Imported tokens in components
- [ ] No hardcoded colors in codebase
- [ ] No hardcoded spacing values

**AI Integration:**

- [ ] Installed MCP server
- [ ] Configured MCP in AI tool
- [ ] Verified AI can query tokens
- [ ] Generated test component with AI

**Enforcement:**

- [ ] Installed esbuild plugin
- [ ] Configured build-time validation
- [ ] Tested: build fails on hardcoded values
- [ ] Added pre-commit hook (optional but recommended)

**Documentation:**

- [ ] Created design system README
- [ ] Documented token usage patterns
- [ ] Added examples for common components

## Get Started Now

### 15-Minute Quick Start

```bash
# 1. Install framingui
npm install @framingui/core

# 2. Generate design tokens
npx @framingui/cli init

# 3. Use tokens in your app
import { tokens } from './components/tokens';

<div style={{
  background: tokens.bg.surface.base,
  padding: tokens.spacing[4],
}}>
  Hello, Design System!
</div>
```

### Full Setup (2 hours)

Follow the guide above for complete setup including:

- Semantic token creation
- MCP integration
- Token enforcement
- Component patterns

### Join the Community

**Beta Access:**
👉 [Sign up for beta](https://tally.so/r/7R2kz6)

Get early access to:

- Visual token editor (no code required)
- Component library templates
- Multi-project token sync
- Priority support

**Resources:**

- [Documentation](https://framingui.com/docs) — Complete guides
- [Component Templates](https://framingui.com/templates) — Copy-paste components
- [GitHub](https://github.com/framingui) — Open-source repository
- [Discord](https://framingui.com/discord) — Community help

---

## Final Thoughts

You don't need a design team to build professional UIs. You need a **system**.

Design systems aren't just for enterprise teams with dedicated designers. They're for **solo developers who want to ship fast without sacrificing quality**.

With framingui:

- 2 hours to create a design system
- 0 hours to maintain (tokens enforce themselves)
- ∞ value from consistent, accessible, on-brand UI

Stop tweaking styles. Start building.

---

_Built with [framingui](https://framingui.com) — Design systems for developers who code alone._

--- SOURCE END ---

```

```
