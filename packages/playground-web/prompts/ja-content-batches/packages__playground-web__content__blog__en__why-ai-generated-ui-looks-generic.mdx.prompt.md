# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/why-ai-generated-ui-looks-generic.mdx

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
source_file: packages/playground-web/content/blog/en/why-ai-generated-ui-looks-generic.mdx

## --- SOURCE START ---

title: "Why AI-Generated UI Looks Generic (And How to Fix It)"
description: "Why AI-generated UIs from v0, Cursor, and ChatGPT all look the same—and how design system context fixes the consistency problem."
date: "2026-02-25"
author:
name: "FramingUI Team"
tags:

- ai
- design-system
- consistency
- ui-generation
  category: "Deep Dive"
  coverImage: ""
  published: true

---

## You've Noticed This Too

Open Twitter. Scroll through indie hacker showcases. Every AI-generated SaaS looks identical:

- Same rounded corners
- Same blue accent color
- Same card layouts
- Same button styles
- Same "clean, modern" aesthetic

It's not bad UI—it's actually quite good. But it's **generic**. If you saw three different products side by side, you couldn't tell which was which.

## The Real Problem: AI Has No Brand Context

When you prompt an AI to "create a user dashboard," here's what happens:
```

Your Prompt → AI's Training Data → Statistical Pattern Matching → Generic Output

```

The AI generates based on **frequency**, not **intention**. It produces what appears most often in its training data:
- Rounded corners (because everyone uses them)
- Blue primary colors (most common in SaaS)
- Tailwind utility classes (popular in open-source projects)
- Card-based layouts (ubiquitous pattern)

**What the AI doesn't know:**
- Your brand personality (playful vs. professional)
- Your color palette (warm vs. cool tones)
- Your spacing philosophy (dense vs. spacious)
- Your component library (custom vs. generic)

Result: Every output looks like "generic SaaS UI template #47."

## TL;DR

- **The Problem**: AI tools generate based on training data patterns, not your brand identity
- **Why It Happens**: AI lacks context about your design system, so it defaults to generic patterns
- **The Solution**: Provide design system context to AI through structured design tokens
- **How framingui Helps**: Makes your design system machine-readable so AI generates on-brand UI
- **Result**: Consistent, branded interfaces without manually fixing every component AI generates

## The Anatomy of Generic AI UI

Let's examine what AI generates without design context.

### Example 1: The Generic Dashboard

**Prompt:**
```

Create a user analytics dashboard

````

**AI Output (v0, Claude, ChatGPT):**

```tsx
export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-600 text-sm">Total Users</h3>
            <p className="text-3xl font-bold text-gray-900">2,543</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-600 text-sm">Revenue</h3>
            <p className="text-3xl font-bold text-gray-900">$45,231</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-gray-600 text-sm">Growth</h3>
            <p className="text-3xl font-bold text-green-600">+12.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
````

**What's wrong with this?**

Nothing, technically. It works. But look closer:

- **Hardcoded colors**: `gray-50`, `gray-900`, `green-600` (not your brand colors)
- **Arbitrary spacing**: `p-6`, `gap-6`, `mb-6` (not your spacing scale)
- **Generic typography**: `text-2xl`, `text-3xl` (not your type system)
- **Pattern overuse**: Rounded corners + shadow = seen everywhere

If your brand is:

- **Warm and approachable**: This feels cold (gray palette)
- **Bold and energetic**: This feels muted (low contrast)
- **Minimal and sophisticated**: This feels cluttered (shadows + borders)

### Example 2: The Same Button, Different Projects

AI generates nearly identical buttons across completely different brands:

```tsx
// E-commerce store prompt
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Add to Cart
</button>

// Healthcare app prompt
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Book Appointment
</button>

// Fintech dashboard prompt
<button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
  Transfer Funds
</button>
```

**Same button for:**

- Buying sneakers
- Booking a doctor
- Moving money

Does that make sense? Of course not. But AI doesn't know better—it generates the **most statistically likely button** from its training data.

## Why This Happens: The AI Training Problem

### AI Learns from Open-Source Codebases

Most AI training data comes from:

- **Open-source projects**: Heavily Tailwind-based, generic styling
- **Tutorial code**: "Beginner-friendly" = minimal customization
- **UI component libraries**: Designed for broad appeal, not specific brands

When you ask AI to generate UI, it's essentially **averaging** all these sources. The result? The most common denominator—generic UI.

### AI Doesn't Understand Design Intent

Consider this design token:

```css
--color-primary: #3b82f6;
```

**What a human designer knows:**

- This blue conveys "trust and professionalism"
- Use it for primary CTAs only (max one per screen)
- Pair with neutral grays for balance
- Reserve for high-priority actions

**What AI sees:**

- A hex color value
- Statistical correlation: "appears with buttons"
- Pattern: "often used for backgrounds"

AI applies the token **mechanically**, not **semantically**. It doesn't understand _why_ you chose that blue or _when_ it should be used.

### Context Window Limitations

Even if you paste your entire design system into the prompt, you hit limits:

- **Token waste**: Design tokens consume thousands of tokens of context
- **Context decay**: AI "forgets" tokens from earlier in the conversation
- **Manual maintenance**: Every new chat requires re-pasting your design system
- **Version drift**: AI uses old token values unless you update every conversation

## The Solution: Machine-Readable Design Systems

To fix generic AI output, we need **three things**:

### 1. Structured Design Tokens

Transform human-readable documentation into machine-readable data.

**Before (Human Documentation):**

```markdown
## Colors

Use our primary blue (#3B82F6) for call-to-action buttons.
Use gray-900 for headings and gray-600 for body text.
```

**After (Machine-Readable Tokens):**

```json
{
  "colors": {
    "primary": {
      "value": "#3B82F6",
      "usage": "call-to-action",
      "semantic": "trust, professionalism",
      "constraints": ["max-one-per-viewport"]
    },
    "text": {
      "heading": { "value": "#1a1a1a", "usage": "h1, h2, h3" },
      "body": { "value": "#666666", "usage": "paragraphs, labels" }
    }
  },
  "spacing": {
    "unit": 4,
    "scale": [0, 4, 8, 12, 16, 24, 32, 48, 64],
    "semantic": {
      "component-padding": "spacing-4",
      "section-gap": "spacing-6",
      "page-margin": "spacing-8"
    }
  }
}
```

Now AI can:

- Query tokens programmatically (no context window waste)
- Understand semantic meaning ("call-to-action" = primary color)
- Respect constraints ("max-one-per-viewport")
- Apply tokens consistently across all generations

### 2. Component Knowledge Graph

Tell AI not just _what_ components exist, but _when_ and _why_ to use them.

**Before (Component Library Docs):**

```markdown
## Button

Available variants: primary, secondary, ghost
```

**After (Component Knowledge):**

```json
{
  "components": {
    "Button": {
      "variants": [
        {
          "name": "primary",
          "visualImpact": "high",
          "purpose": "Main call-to-action in a given context",
          "constraints": ["max-one-per-viewport"],
          "tokens": {
            "bg": "button.bg.primary",
            "fg": "button.fg.primary"
          },
          "slotAffinity": {
            "modal_footer": 0.9,
            "card_actions": 0.85,
            "header": 0.2
          }
        },
        {
          "name": "ghost",
          "visualImpact": "low",
          "purpose": "Low-emphasis secondary action",
          "tokens": {
            "bg": "transparent",
            "fg": "button.fg.ghost"
          }
        }
      ]
    }
  }
}
```

Now AI understands:

- **Primary buttons**: High visual impact, use sparingly (max one per screen)
- **Ghost buttons**: Low visual impact, use for secondary actions
- **Slot affinity**: Primary buttons belong in modal footers (0.9 score), not headers (0.2 score)

Result: AI generates a modal with "Save" as primary button and "Cancel" as ghost—without you specifying.

### 3. AI-Readable Access (MCP)

Connect AI directly to your design system using Model Context Protocol.

**Traditional Workflow:**

```
1. Copy design tokens from documentation
2. Paste into AI prompt
3. AI generates component
4. Manually verify token usage
5. Fix hardcoded values AI missed
6. Repeat for every component
```

**MCP Workflow:**

```
1. AI queries design system via MCP
2. AI generates component with correct tokens
3. Done
```

**Example MCP Integration:**

```json
// .claude/mcp.json
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

Now when you prompt:

```
Create a user profile card
```

AI automatically:

1. Queries available components (`Card`, `Avatar`, `Badge`, `Button`)
2. Fetches token values (colors, spacing, typography)
3. Checks component constraints (button placement rules)
4. Generates on-brand code using your actual design tokens

```tsx
import { Card, Avatar, Badge, Button } from '@/components';
import { tokens } from '@/design-system/tokens';

export function ProfileCard({ user }) {
  return (
    <Card
      variant="elevated"
      style={{
        padding: tokens.spacing[6],
        background: tokens.bg.surface.elevated,
      }}
    >
      <div style={{ display: 'flex', gap: tokens.spacing[4] }}>
        <Avatar src={user.avatar} size="lg" style={{ borderRadius: tokens.radius.full }} />
        <div>
          <h3
            style={{
              fontSize: tokens.fontSize.lg,
              fontWeight: tokens.fontWeight.semibold,
              color: tokens.fg.primary,
            }}
          >
            {user.name}
          </h3>
          <Badge
            variant="success"
            style={{
              marginTop: tokens.spacing[2],
              background: tokens.badge.bg.success,
              color: tokens.badge.fg.success,
            }}
          >
            {user.status}
          </Badge>
        </div>
      </div>

      <div
        style={{
          marginTop: tokens.spacing[4],
          display: 'flex',
          gap: tokens.spacing[2],
        }}
      >
        <Button variant="primary">View Profile</Button>
        <Button variant="ghost">Message</Button>
      </div>
    </Card>
  );
}
```

**Zero hardcoded values. All tokens from your design system.**

## Real-World Examples: Generic vs. Branded

### Example 1: E-Commerce Product Card

**Generic AI Output:**

```tsx
<div className="bg-white p-4 rounded-lg shadow">
  <img src="/product.jpg" className="w-full h-48 object-cover rounded" />
  <h3 className="mt-4 text-lg font-semibold">Product Name</h3>
  <p className="text-gray-600">$99.99</p>
  <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded">Add to Cart</button>
</div>
```

**Branded AI Output (with design context):**

```tsx
<Card
  variant="product"
  style={{
    padding: tokens.spacing[4],
    background: tokens.bg.surface.base,
    border: `1px solid ${tokens.border.subtle}`,
    borderRadius: tokens.radius.lg,
  }}
>
  <ProductImage
    src="/product.jpg"
    style={{
      aspectRatio: '4/3',
      borderRadius: tokens.radius.md,
      objectFit: 'cover',
    }}
  />
  <ProductDetails style={{ marginTop: tokens.spacing[4] }}>
    <Heading
      level={3}
      style={{
        fontSize: tokens.fontSize.lg,
        fontWeight: tokens.fontWeight.bold,
        color: tokens.fg.primary,
      }}
    >
      Product Name
    </Heading>
    <Price
      style={{
        fontSize: tokens.fontSize.xl,
        fontWeight: tokens.fontWeight.semibold,
        color: tokens.fg.accent,
      }}
    >
      $99.99
    </Price>
  </ProductDetails>
  <Button
    variant="primary"
    fullWidth
    style={{
      marginTop: tokens.spacing[4],
      background: tokens.button.bg.primary,
      color: tokens.button.fg.primary,
      padding: `${tokens.spacing[3]} ${tokens.spacing[4]}`,
      borderRadius: tokens.radius.md,
    }}
  >
    Add to Cart
  </Button>
</Card>
```

**Differences:**

- Uses your brand's spacing scale (not arbitrary `mt-4`)
- Uses your accent color for price (not generic `gray-600`)
- Uses your border style (subtle borders vs. shadow)
- Uses semantic components (`ProductImage`, `Price`) not generic divs

### Example 2: Dashboard Card

**Generic AI Output:**

```tsx
<div className="bg-white p-6 rounded-lg shadow-sm">
  <h3 className="text-sm text-gray-600 mb-2">Total Revenue</h3>
  <p className="text-3xl font-bold text-gray-900">$124,500</p>
  <p className="text-sm text-green-600 mt-2">↑ 12.5% from last month</p>
</div>
```

**Branded AI Output (fintech brand - professional dark theme):**

```tsx
<StatCard
  variant="elevated"
  style={{
    padding: tokens.spacing[6],
    background: tokens.bg.surface.elevated,
    border: `1px solid ${tokens.border.default}`,
    borderRadius: tokens.radius.sm, // Minimal radius for professional feel
  }}
>
  <StatLabel
    style={{
      fontSize: tokens.fontSize.sm,
      color: tokens.fg.secondary,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
    }}
  >
    Total Revenue
  </StatLabel>
  <StatValue
    style={{
      fontSize: tokens.fontSize['3xl'],
      fontWeight: tokens.fontWeight.semibold,
      color: tokens.fg.primary,
      marginTop: tokens.spacing[2],
    }}
  >
    $124,500
  </StatValue>
  <StatChange
    direction="up"
    style={{
      fontSize: tokens.fontSize.sm,
      color: tokens.semantic.success,
      marginTop: tokens.spacing[3],
      display: 'flex',
      alignItems: 'center',
      gap: tokens.spacing[1],
    }}
  >
    <Icon name="trending-up" />
    12.5% from last month
  </StatChange>
</StatCard>
```

**Differences:**

- Professional dark theme (elevated surface vs. white)
- Minimal rounded corners (financial = serious)
- Uppercase label with letter spacing (sophistication)
- Semantic color for growth (not hardcoded `green-600`)
- Uses brand-specific components (`StatCard`, `StatLabel`, `StatValue`)

## How framingui Makes Your UI Consistent

framingui solves the generic AI problem with three layers:

### Layer 1: Deterministic Token Generation

Generate design tokens algorithmically with WCAG compliance built in.

```typescript
import { generateTokensFromArchetype } from '@framingui/token-generator';

const archetype = {
  name: 'fintech-professional',
  primaryColor: { l: 0.45, c: 0.13, h: 240 }, // Deep blue
  neutralTone: 'tinted', // Slightly tinted grays
  contrast: 'high', // Fintech = accessibility-first
  borderRadius: 'minimal', // Professional = subtle
};

const tokens = await generateTokensFromArchetype(archetype, {
  wcagLevel: 'AAA', // Stricter than standard AA
  generateDarkMode: true,
});

// Result: 100+ tokens with guaranteed WCAG compliance
// All tokens follow your brand personality
```

### Layer 2: Component Knowledge System

Transform components into AI-understandable metadata.

```typescript
export const StatCardKnowledge = {
  name: 'StatCard',
  category: 'data-display',
  purpose: 'Display key metrics with context',
  visualImpact: 'medium',

  variants: [
    {
      name: 'elevated',
      purpose: 'Stand out from page background',
      tokens: {
        bg: 'bg.surface.elevated',
        border: 'border.default',
      },
      slotAffinity: {
        dashboard_grid: 0.95, // Perfect for dashboard grids
        modal: 0.1, // Almost never in modals
      },
    },
  ],

  composition: {
    requiredSlots: ['label', 'value'],
    optionalSlots: ['change', 'icon'],
    constraints: ['value-must-be-numeric'],
  },
};
```

Now AI knows:

- StatCards belong in dashboard grids (0.95 affinity)
- They need a label and value (required slots)
- They can show a change indicator (optional slot)

### Layer 3: MCP Integration

Connect AI directly to your design system.

```bash
# Install framingui
npm install @framingui/core @framingui/mcp-server

# Initialize design tokens
npx @framingui/cli init

# Configure MCP
# .claude/mcp.json
{
  "servers": {
    "tekton": {
      "command": "npx",
      "args": ["@framingui/mcp-server"]
    }
  }
}

# AI now has access to:
# - All design tokens
# - Component knowledge
# - Usage constraints
# - Slot affinity scores
```

**Result:**

```
You: Create a dashboard with revenue metrics

AI: [Queries tekton MCP]
    [Finds: StatCard component, dashboard_grid slot, fintech tokens]
    [Generates on-brand dashboard using your design system]
```

Every component AI generates:

- Uses your brand colors (not generic blue)
- Uses your spacing scale (not arbitrary padding)
- Uses your components (not generic divs)
- Respects your constraints (max one primary CTA)

## Before/After: Real Project Transformation

**Project:** SaaS analytics dashboard

**Before framingui (generic AI output):**

- 47 unique color values in codebase (should be 12 tokens)
- 28 different spacing values (should be 9 tokens)
- Inconsistent button styles across 15 components
- 3 different "primary blue" colors (`#3B82F6`, `#2563EB`, `#1D4ED8`)
- Time spent fixing AI output: 2-3 hours per day

**After framingui (design system context):**

- 12 color tokens used consistently (100% compliance)
- 9 spacing tokens from semantic scale
- All buttons use component variants (primary, ghost, link)
- One primary blue (`oklch(0.45 0.13 240)`) everywhere
- Time spent fixing AI output: 0 minutes (AI generates correctly first time)

**Developer testimonial:**

> "Before framingui, I spent half my time fixing what AI generated—replacing hardcoded colors, adjusting spacing, making buttons consistent. Now AI generates production-ready code that matches our design system exactly. I went from fighting AI to trusting it."
>
> — Sarah Chen, Indie Developer

## FAQ

### Can I use framingui with my existing design system?

Yes! framingui integrates with:

- **Figma Tokens**: Import token JSON from Figma Tokens plugin
- **Style Dictionary**: Point MCP to your Style Dictionary output
- **Tailwind CSS**: Extract tokens from `tailwind.config.js`
- **Custom tokens**: Any JSON format with color/spacing/typography values

### Does this work with all AI tools?

framingui's MCP server works with:

- **Claude Code** (official support)
- **Cursor** (experimental MCP support)
- **Cline / Windsurf** (community support)
- Any tool implementing Model Context Protocol

For AI tools without MCP support, you can:

- Copy token JSON into prompts (manual but effective)
- Use framingui's code validation tool to check AI output
- Generate initial components with MCP-enabled tools, then iterate elsewhere

### Will AI still make design mistakes?

AI with design system context makes fewer mistakes, but it's not perfect:

**Mistakes eliminated:**

- ✅ Hardcoded colors and spacing
- ✅ Inconsistent component usage
- ✅ Accessibility violations (WCAG tokens built-in)
- ✅ Wrong component variants

**Mistakes still possible:**

- ⚠️ Layout logic errors (e.g., flex vs. grid choice)
- ⚠️ Component composition issues (nesting errors)
- ⚠️ Business logic bugs (unrelated to design)

framingui solves **design consistency**, not all possible bugs.

### How much does it cost?

framingui is **open-source and free**:

- MIT license
- No usage limits
- No API keys required (MCP runs locally)
- Works with any AI tool (no vendor lock-in)

### Can this enforce design system compliance automatically?

Yes! framingui includes build-time validation:

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

This prevents:

- Hardcoded colors/spacing from reaching production
- AI (or human) developers bypassing design system
- Design drift over time

Build fails if any component violates your design system. Works for both AI-generated and human-written code.

## Get Started

Ready to stop generating generic UI?

### Step 1: Install framingui

```bash
npm install @framingui/core @framingui/mcp-server
```

### Step 2: Generate Your Design Tokens

```bash
npx @framingui/cli init
# Interactive prompts for brand personality, colors, spacing
```

### Step 3: Configure MCP

```json
// .claude/mcp.json
{
  "servers": {
    "tekton": {
      "command": "npx",
      "args": ["@framingui/mcp-server"]
    }
  }
}
```

### Step 4: Generate On-Brand UI

```
You: Create a user dashboard

AI: [Queries your design system]
    [Generates using YOUR tokens, YOUR components, YOUR brand]
```

### Join the Beta

Get early access to advanced features:

👉 **[Sign up for beta access](https://tally.so/r/7R2kz6)**

Beta features:

- Visual token editor
- Real-time design system preview
- Team collaboration
- Multi-project token sync

---

**Resources:**

- [Documentation](https://framingui.com/docs) — Complete setup guides
- [Component Catalog](https://framingui.com/components) — Browse available components
- [MCP Integration](https://framingui.com/docs/mcp) — Connect AI tools
- [GitHub](https://github.com/framingui) — Open-source repository

---

_Built with [framingui](https://framingui.com) — Stop generating generic UI. Generate your brand._

--- SOURCE END ---

```

```
