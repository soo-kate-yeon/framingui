# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/what-is-agentic-design-system.mdx

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
source_file: packages/playground-web/content/blog/en/what-is-agentic-design-system.mdx

## --- SOURCE START ---

title: "What is an Agentic Design System?"
description: "Agentic design systems combine design tokens with AI to generate on-brand UI—eliminating generic AI interfaces."
date: "2026-02-25"
author:
name: "FramingUI Team"
tags:

- design-system
- ai
- design-tokens
- architecture
  category: "Deep Dive"
  coverImage: ""
  published: true

---

## You've Seen This Before

You ask an AI to build a dashboard. It gives you a clean interface — but it looks exactly like every other AI-generated dashboard. Same button styles. Same card layouts. Same bland color palette. It works, but it's not _yours_.

This isn't the AI's fault. It's working with what it knows: generic components from its training data. It has no understanding of your brand, your design language, or your visual identity.

What if AI could generate interfaces that actually feel like they belong to your product?

## TL;DR

- **Agentic design systems** make AI understand your design decisions through machine-readable design tokens and component knowledge
- **The problem**: Traditional design systems give AI component names, but not the _meaning_ behind them
- **The solution**: Layer design tokens with semantic metadata that AI can reason about
- **framingui** implements this through a 3-layer architecture: Token Generation → Component Knowledge → AI-Powered Generation
- Result: AI generates on-brand components automatically, without designers manually templating every variation

## What is an Agentic Design System?

An **agentic design system** is a design system that AI agents can understand and use autonomously.

Traditional design systems are built for humans. They provide:

- Visual guidelines (color palettes, typography scales)
- Component libraries (buttons, cards, inputs)
- Documentation (when to use what)

But AI doesn't "see" designs the way humans do. When you tell Claude or ChatGPT to "create a professional dashboard," it generates generic UI because it lacks context about _your_ design system.

Agentic design systems solve this by encoding design decisions in machine-readable formats:

1. **Design tokens** (colors, spacing, typography) as structured data
2. **Component knowledge** (purpose, constraints, visual impact) as semantic metadata
3. **Generation rules** (what goes where, and why) as computational logic

This transforms your design system from a reference document into an **executable specification** that AI can use to generate pixel-perfect, on-brand interfaces.

## The Problem: Why AI-Generated UI Looks Generic

### Lack of Design Context

When you prompt an AI with "create a user profile card," it generates based on patterns from its training data:

```tsx
// What AI generates without design context
export function ProfileCard() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <img src="/avatar.jpg" className="w-16 h-16 rounded-full" />
      <h3 className="text-lg font-semibold">John Doe</h3>
      <p className="text-gray-600">Software Engineer</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">View Profile</button>
    </div>
  );
}
```
````

This works, but notice:

- Hardcoded colors (`bg-white`, `text-gray-600`, `bg-blue-500`)
- Arbitrary spacing (`p-4`, `mt-4`, `px-4 py-2`)
- No connection to your brand's visual language
- No consideration of accessibility (contrast ratios, focus states)

If you have a design system, this component ignores it entirely.

### The Token Application Gap

Even if you tell AI "use our design tokens," there's a fundamental gap:

**Your design tokens:**

```css
:root {
  --color-primary-500: #3b82f6;
  --color-neutral-100: #f5f5f5;
  --spacing-4: 1rem;
  --radius-md: 0.5rem;
}
```

**AI's challenge:**

- Which token should be used for card backgrounds?
- When should `--color-primary-500` be used vs `--color-primary-600`?
- How does `--spacing-4` relate to visual hierarchy?
- What's the semantic difference between component variants?

AI can apply tokens mechanically, but it doesn't understand the _design intent_ behind them.

### Inconsistent AI Outputs

Without design system context, every AI generation is a roll of the dice:

- **Session 1**: AI generates a button with rounded corners
- **Session 2**: AI generates the same button with square corners
- **Session 3**: AI uses a completely different button style

This happens because AI lacks memory of your design decisions. It's generating from scratch each time, with no reference to previous choices.

## The Solution: Design Tokens + AI Understanding

Agentic design systems bridge this gap by combining three layers:

### Layer 1: Deterministic Token Generation

Generate design tokens using perceptually uniform color spaces (OKLCH) with built-in accessibility validation.

Instead of manually picking colors and hoping they meet WCAG contrast requirements, tokens are **generated algorithmically**:

```typescript
import { generateTokensFromArchetype } from '@framingui/token-generator';

const archetype = {
  name: 'professional-dark',
  primaryColor: { l: 0.5, c: 0.15, h: 220 }, // Blue in OKLCH
  neutralTone: 'tinted',
  contrast: 'high',
};

const tokens = await generateTokensFromArchetype(archetype, {
  wcagLevel: 'AA',
  generateDarkMode: true,
});

// Result: 100+ tokens with guaranteed WCAG compliance
// - Primary scale: 50, 100, 200...900, 950
// - Semantic tokens: bg.surface.base, fg.primary, border.default
// - Component tokens: button.bg.primary, card.bg.elevated
```

Key benefits:

- **Deterministic**: Same input always produces same output
- **Accessible by default**: Automatic WCAG AA/AAA validation
- **Mathematically sound**: OKLCH ensures perceptual uniformity

### Layer 2: Component Knowledge System

Transform tokens into **semantic metadata** that AI can reason about.

Instead of just listing components, we encode their purpose, constraints, and visual impact:

```typescript
// packages/component-knowledge/src/catalog/button.ts
export const ButtonKnowledge: ComponentKnowledge = {
  name: 'Button',
  category: 'action',
  purpose: 'Triggers an action or navigation when clicked',
  visualImpact: 'high', // Draws user attention
  complexity: 'low',

  // Slot affinity: Where should this component be used?
  slotAffinity: {
    card_actions: 0.9, // Perfect for card action slots
    modal_footer: 0.85, // Great for modal actions
    header: 0.3, // Rarely in headers
    sidebar: 0.1, // Almost never in sidebars
  },

  variants: [
    {
      name: 'primary',
      purpose: 'Main call-to-action in a given context',
      tokens: {
        bg: 'button.bg.primary',
        fg: 'button.fg.primary',
        border: 'button.border.primary',
      },
      constraints: ['max-one-per-viewport'],
    },
    {
      name: 'ghost',
      purpose: "Low-emphasis action that doesn't compete with primary actions",
      tokens: {
        bg: 'button.bg.ghost',
        fg: 'button.fg.ghost',
      },
    },
  ],
};
```

This metadata tells AI:

- **When to use the component** (slot affinity scores)
- **Which variant to choose** (based on visual hierarchy)
- **What tokens to apply** (semantic token mapping)
- **Design constraints** (max one primary button per screen)

### Layer 3: AI-Powered Component Generation

Use semantic scoring to automatically select and place components with proper token application.

When AI receives a prompt like "create a user dashboard," the generation engine:

1. **Analyzes intent**: "Dashboard = data-heavy, read-only, professional tone"
2. **Scores component fit**: Ranks all components by slot affinity
3. **Applies safety protocols**: Validates constraints and prevents hallucinations
4. **Generates React code**: Injects correct tokens and component references

```typescript
// What framingui generates with full context
import { Card, Badge, DataTable, Button } from '@framingui';
import { tokens } from '@framingui/design-tokens';

export function UserDashboard() {
  return (
    <Card
      variant="elevated"
      style={{
        background: tokens.bg.surface.elevated,
        padding: tokens.spacing['6'],
        borderRadius: tokens.radius.lg
      }}
    >
      <div style={{ display: 'flex', gap: tokens.spacing['3'] }}>
        <Badge
          variant="success"
          style={{
            background: tokens.badge.bg.success,
            color: tokens.badge.fg.success
          }}
        >
          Active
        </Badge>
      </div>

      <DataTable
        columns={columns}
        data={users}
        style={{
          marginTop: tokens.spacing['6']
        }}
      />

      <div style={{
        marginTop: tokens.spacing['4'],
        display: 'flex',
        gap: tokens.spacing['2']
      }}>
        <Button variant="primary">Export Data</Button>
        <Button variant="ghost">Refresh</Button>
      </div>
    </Card>
  );
}
```

Notice:

- All colors reference design tokens (no hardcoded values)
- Spacing uses semantic scale (consistent visual rhythm)
- Component variants match design intent (primary vs ghost buttons)
- Layout respects accessibility (proper contrast, focus management)

## How framingui Works

framingui implements this 3-layer architecture end-to-end.

### Step 1: Define Your Design Archetype

Start by describing your brand's design personality:

```typescript
// Create an archetype JSON
{
  "name": "fintech-professional",
  "primaryColor": { "l": 0.45, "c": 0.13, "h": 240 },
  "neutralTone": "tinted",
  "contrast": "high",
  "borderRadius": "minimal",
  "fontScale": "compact"
}
```

### Step 2: Generate Design Tokens

framingui generates 100+ tokens automatically:

```bash
npx @framingui/cli init --archetype fintech-professional

# Outputs:
# - tokens.css (CSS custom properties)
# - tokens.json (for design tools)
# - tailwind.config.js (Tailwind integration)
```

```css
/* Generated tokens.css */
:root {
  /* Semantic background tokens */
  --bg-surface-base: oklch(0.98 0.01 240);
  --bg-surface-elevated: oklch(1 0 0);

  /* Foreground tokens */
  --fg-primary: oklch(0.25 0.03 240);
  --fg-secondary: oklch(0.45 0.02 240);

  /* Component-specific tokens */
  --button-bg-primary: oklch(0.45 0.13 240);
  --button-fg-primary: oklch(0.98 0.01 240);

  /* Spacing scale */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
}
```

### Step 3: Load Component Knowledge

framingui ships with 20+ components pre-configured with semantic metadata:

```typescript
import { getAllComponents } from '@framingui/component-knowledge';

const components = getAllComponents();

// Returns ComponentKnowledge[] with:
// - Button, Card, Input, Badge, DataTable, Modal...
// - Slot affinity scores for intelligent placement
// - Token mappings for each variant
// - Accessibility constraints
```

### Step 4: Let AI Generate Screens

Use framingui's MCP (Model Context Protocol) integration:

```typescript
import { renderScreen } from '@framingui/studio-mcp';

const blueprint = {
  blueprintId: 'dash-001',
  recipeName: 'user-dashboard',
  analysis: {
    intent: 'Dashboard screen with user data',
    tone: 'professional',
  },
  structure: {
    componentName: 'Card',
    props: { variant: 'elevated' },
    slots: {
      header: {
        componentName: 'Badge',
        props: { variant: 'success', text: 'Active' },
      },
      content: {
        componentName: 'DataTable',
        props: { columns: ['Name', 'Email', 'Role'] },
      },
      footer: {
        componentName: 'Button',
        props: { variant: 'primary', label: 'Export' },
      },
    },
  },
  themeId: 'fintech-professional',
};

const result = await renderScreen(blueprint);

// Writes: src/screens/user-dashboard/page.tsx
```

The generated component uses your tokens, follows your component contracts, and matches your design system exactly.

### Step 5: Token-Enforced Styling (SPEC-STYLED-001)

framingui prevents design drift with **3-layer enforcement**:

#### Layer 1: Compile-Time (TypeScript)

```typescript
import { styled, tokens } from '@framingui/styled';

// ✅ Valid: Token-only styling
const Card = styled.div`
  background: ${tokens.bg.surface.elevated};
  padding: ${tokens.spacing[6]};
  border-radius: ${tokens.radius.lg};
`;

// ❌ Invalid: TypeScript error on hardcoded values
const BadCard = styled.div`
  background: #ffffff; // Error: Type 'string' not assignable
  padding: 16px; // Error: Type 'string' not assignable
`;
```

#### Layer 2: Runtime Validation

```typescript
// Runtime check catches hardcoded values
const DynamicCard = styled.div`
  background: ${props => props.customBg || tokens.bg.surface.base};
`;

// Throws error if customBg is hardcoded color
<DynamicCard customBg="#fff" /> // Runtime error!
```

#### Layer 3: Build-Time (esbuild Plugin)

```typescript
// esbuild.config.js
import { tektonPlugin } from '@framingui/esbuild-plugin';

export default {
  plugins: [
    tektonPlugin({
      strict: true, // Fail build on violations
      threshold: 100, // Require 100% token compliance
    }),
  ],
};
```

The build fails if any component uses hardcoded colors, spacing, or design values. This makes it **impossible** for AI agents (or human developers) to bypass your design system.

## Comparison: Traditional vs Agentic Design System

| Aspect                | Traditional Design System          | Agentic Design System                                      |
| --------------------- | ---------------------------------- | ---------------------------------------------------------- |
| **Token Format**      | CSS variables, human-readable docs | JSON with semantic metadata                                |
| **Component Docs**    | Storybook, Figma files             | ComponentKnowledge catalog with slot affinity scores       |
| **AI Integration**    | Copy-paste from docs               | Programmatic API with semantic reasoning                   |
| **Consistency**       | Manual enforcement, code reviews   | Automated enforcement with build-time validation           |
| **Token Application** | Developers choose manually         | AI selects based on semantic scoring                       |
| **Accessibility**     | Manual WCAG checks                 | Automatic WCAG validation during token generation          |
| **Design Drift**      | Happens over time as team scales   | Prevented by 3-layer enforcement (compile, runtime, build) |
| **Onboarding**        | Read docs, learn conventions       | AI generates correct code from day one                     |
| **Updates**           | Manual find-and-replace            | Regenerate from updated archetype                          |

### Real-World Impact

**Traditional Approach:**

1. Designer creates mockup in Figma
2. Developer eyeballs spacing and colors
3. Hardcoded values sneak into codebase
4. Design system drifts over time
5. Quarterly "design system cleanup" sprints

**Agentic Approach:**

1. Designer defines archetype (5 minutes)
2. Generate tokens + component knowledge (automatic)
3. AI generates components with correct tokens (seconds)
4. Build fails if any hardcoded values exist (enforced)
5. Design system stays consistent indefinitely

## Getting Started with framingui

Ready to build your own agentic design system?

### Option 1: Try the Playground

Visit [framingui.com/studio](https://framingui.com/studio) to:

- Generate tokens from pre-built archetypes
- Preview components with your design system
- Export tokens in CSS, Tailwind, or JSON

### Option 2: Install Locally

```bash
# Install framingui
npm install @framingui/core @framingui @framingui/styled

# Initialize your design system
npx @framingui/cli init

# Follow interactive prompts:
# - Primary color
# - Contrast level (AA or AAA)
# - Border radius (minimal, moderate, rounded)
# - Typography scale
```

### Option 3: Integrate with AI Tools

framingui works with Claude Code, Cursor, and any tool supporting MCP:

```json
// .claude/mcp.json
{
  "servers": {
    "tekton": {
      "command": "npx",
      "args": ["@framingui/mcp-server"],
      "env": {
        "TEKTON_PROJECT_PATH": "."
      }
    }
  }
}
```

Now Claude can:

- Query your component catalog
- Generate screens using your design tokens
- Validate components against your contracts

### Documentation

- [Quick Start Guide](https://framingui.com/docs/quick-start) — Get up and running in 5 minutes
- [API Reference](https://framingui.com/docs/api) — Complete API documentation
- [Component Catalog](https://framingui.com/docs/components) — 20+ pre-built components
- [MCP Integration](https://framingui.com/docs/mcp) — Connect with AI tools

## FAQ

### What makes an agentic design system different from a regular design system?

A regular design system documents design decisions for humans. An agentic design system encodes those decisions in machine-readable formats so AI can understand and apply them autonomously. This includes semantic metadata (slot affinity, visual impact), computational rules (when to use what), and enforcement mechanisms (preventing design drift).

### Does this replace designers?

No. Designers still make all creative decisions — color palettes, typography, component variants. framingui simply automates the translation of those decisions into production code. Think of it as a compiler for design systems: designers write the spec, AI generates the implementation.

### What if I already have a design system?

framingui can integrate with existing design systems. You can:

1. Import your existing tokens (CSS variables → tekton JSON)
2. Map your components to ComponentKnowledge format
3. Use tekton's generation layer on top of your components

The token enforcement layer (`@framingui/styled`) works with any React component library.

### How does this prevent AI from generating off-brand UI?

Three mechanisms:

1. **Semantic scoring** ensures AI selects components that match design intent (e.g., primary buttons for main CTAs)
2. **Token enforcement** makes it impossible to use hardcoded colors/spacing (compile-time, runtime, build-time checks)
3. **Component contracts** validate generated code against your design rules (max one primary button, required accessibility attributes)

### Can I use this with Tailwind CSS?

Yes! framingui exports Tailwind-compatible configs:

```javascript
// tailwind.config.js (generated)
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'oklch(0.95 0.03 240)',
          500: 'oklch(0.5 0.15 240)',
          900: 'oklch(0.25 0.08 240)',
        },
      },
      spacing: {
        4: '1rem',
        6: '1.5rem',
      },
    },
  },
};
```

Then use tokens in your components:

```tsx
<div className="bg-primary-500 p-6 rounded-lg">{/* This still references design tokens */}</div>
```

### Is this only for React?

Currently, yes. framingui generates React components with TypeScript. Support for Vue, Svelte, and other frameworks is on the roadmap. However, the token generation layer (Layer 1) is framework-agnostic and outputs standard CSS variables.

## Join the Beta

framingui is in public beta. We're looking for design systems teams to try it and provide feedback.

**Sign up for early access:**
👉 [https://tally.so/r/7R2kz6](https://tally.so/r/7R2kz6)

You'll get:

- Priority access to new features
- Direct support from the tekton team
- Opportunity to shape the product roadmap

---

_Built with [framingui](https://framingui.com) — the agentic design system for AI-powered development._

--- SOURCE END ---

```

```
