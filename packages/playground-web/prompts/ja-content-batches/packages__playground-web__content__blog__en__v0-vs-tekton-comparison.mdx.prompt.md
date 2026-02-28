# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/v0-vs-tekton-comparison.mdx

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
source_file: packages/playground-web/content/blog/en/v0-vs-tekton-comparison.mdx

## --- SOURCE START ---

title: "v0 vs. framingui: Which AI UI Generator Should You Use?"
description: "v0 vs framingui: A fair comparison. When to use each AI UI tool and how they solve different problems."
date: "2026-02-25"
author:
name: "FramingUI Team"
tags:

- comparison
- v0
- ai
- design-system
  category: "Comparison"
  coverImage: ""
  published: true

---

## The Honest Truth About AI UI Generators

Both [v0 by Vercel](https://v0.dev) and [framingui](https://framingui.com) help you generate UI with AI. But they solve **different problems** for **different users**.

This isn't a "which one is better" article. It's a guide to help you choose the right tool for your situation.

## TL;DR: Quick Decision Guide

**Choose v0 if you:**

- Need a complete design-to-code workflow in one place
- Want visual editing and instant previews
- Are starting a new project without an existing design system
- Prefer shadcn/ui components (already integrated)
- Value speed over brand consistency

**Choose framingui if you:**

- Have (or want) a custom design system
- Need AI to generate on-brand components consistently
- Use AI tools like Claude Code or Cursor for development
- Want to enforce design system compliance automatically
- Need components that match your existing brand identity

**Use both together:**

- Prototype with v0's visual interface
- Export components and add framingui tokens for brand consistency
- Use v0 for exploration, framingui for production

## What is v0?

v0 is Vercel's AI-powered UI generator. You describe what you want, and v0 generates React components with shadcn/ui.

**Core Features:**

- Visual interface: See real-time preview as AI generates
- Chat-based editing: Refine components through conversation
- shadcn/ui integration: Uses popular open-source component library
- Instant deployment: Deploy directly to Vercel
- Image-to-code: Upload design mockups, get React components

**What v0 is great at:**

- **Rapid prototyping**: Go from idea to working UI in minutes
- **Learning shadcn/ui**: See how shadcn components work in practice
- **Collaboration**: Share generated UIs with stakeholders instantly
- **Iteration speed**: Edit designs visually without touching code

**Example v0 workflow:**
```

You: Create a pricing page with 3 tiers

v0: [Generates 3-column pricing layout with shadcn Card components]
[Shows live preview]

You: Make the middle tier highlighted

v0: [Updates middle card with border and shadow]
[Preview updates in real-time]

You: Export code

v0: [Provides complete React component with shadcn imports]

```

## What is framingui?

framingui is a design system generator that makes AI understand your brand. It creates machine-readable design tokens and component knowledge that AI tools can query.

**Core Features:**
- Design token generation: Create accessible color palettes and spacing scales
- Component knowledge system: Teach AI when and how to use your components
- MCP integration: Connect AI tools directly to your design system
- Token enforcement: Prevent hardcoded values at compile-time
- Framework agnostic: Works with any React setup, not just Next.js

**What framingui is great at:**
- **Brand consistency**: AI generates components matching your design system
- **Design system creation**: Build and maintain tokens scientifically (OKLCH, WCAG)
- **AI tool integration**: Works with Claude Code, Cursor, and other MCP-compatible tools
- **Enforcement**: Automatically prevent design system violations

**Example framingui workflow:**

```

# Setup (one-time)

npx @framingui/cli init # Generate design tokens

# Configure MCP in Claude Code / Cursor

# Usage

You: Create a pricing page

Claude: [Queries your design tokens via MCP]
[Generates pricing page using YOUR brand colors and spacing]
[All components use your design system tokens]

# Result: On-brand pricing page, first try

```

## Side-by-Side Comparison

| Feature | v0 | framingui |
|---------|-------|-----------|
| **Visual Preview** | ✅ Real-time preview | ❌ No visual interface (code-only) |
| **Design System** | ❌ Generic (shadcn defaults) | ✅ Custom (your brand) |
| **AI Tool** | ✅ Built-in (v0 chat) | ✅ Works with Claude/Cursor/etc. |
| **Token Management** | ❌ Manual Tailwind config | ✅ Generated + validated |
| **Component Library** | ✅ shadcn/ui (pre-built) | ⚠️ Bring your own (or use tekton components) |
| **Brand Consistency** | ⚠️ Manual tweaking required | ✅ Automatic (AI reads tokens) |
| **Deployment** | ✅ One-click to Vercel | ❌ Use your existing deployment |
| **Accessibility** | ⚠️ Depends on shadcn defaults | ✅ WCAG built into token generation |
| **Cost** | 💰 Paid (free tier limited) | 💰 Beta free (first template) |
| **Learning Curve** | ✅ Low (visual interface) | ⚠️ Medium (requires MCP setup) |
| **Iteration Speed** | ✅ Fast (visual edits) | ⚠️ Medium (prompt-based) |
| **Code Quality** | ⚠️ Generic, may need cleanup | ✅ On-brand from the start |
| **Team Collaboration** | ✅ Share live previews | ⚠️ Share via Git (standard workflow) |
| **Version Control** | ⚠️ Export to Git manually | ✅ Design tokens in Git |

## Deep Dive: When to Use Each

### Scenario 1: Starting a New Project

**You have no design system yet. You need to ship fast.**

**Recommendation: v0 for MVP, then framingui for scale**

**Phase 1 (Weeks 1-2): Prototype with v0**

```

Use v0 to:

- Validate product idea with stakeholders
- Generate initial UI components quickly
- Test layouts and interactions
- Share live demos with investors/customers

```

**Why v0 wins here:**
- Visual preview gets stakeholder buy-in faster
- No design system = nothing for framingui to enforce yet
- shadcn/ui is good enough for MVPs

**Phase 2 (Weeks 3-4): Build design system with framingui**

```

Use framingui to:

- Generate brand-specific color palettes
- Create semantic spacing and typography scales
- Convert v0 components to use design tokens
- Set up MCP for ongoing development

````

**Migration workflow:**

```tsx
// Before (v0 output)
<Card className="p-6 bg-white rounded-lg">
  <h2 className="text-2xl font-bold text-gray-900">Title</h2>
  <p className="text-gray-600">Description</p>
</Card>

// After (framingui tokens)
<Card
  style={{
    padding: tokens.spacing[6],
    background: tokens.bg.surface.base,
    borderRadius: tokens.radius.lg,
  }}
>
  <h2 style={{
    fontSize: tokens.fontSize['2xl'],
    fontWeight: tokens.fontWeight.bold,
    color: tokens.fg.primary,
  }}>
    Title
  </h2>
  <p style={{ color: tokens.fg.secondary }}>Description</p>
</Card>
````

**Result:** Fast MVP with v0, sustainable codebase with framingui.

### Scenario 2: You Have an Existing Design System

**You have Figma designs, brand guidelines, and color palettes.**

**Recommendation: framingui only (v0 will fight your design system)**

**Why framingui wins:**

v0 outputs shadcn/ui components with default styling. To match your brand:

1. Generate component in v0
2. Replace all colors with your brand colors
3. Replace all spacing with your spacing scale
4. Replace all typography with your type system
5. Replace all border radius with your border styles

**Time per component:** 10-20 minutes

With framingui:

1. Generate component with Claude Code (framingui MCP enabled)
2. Done (AI uses your design tokens automatically)

**Time per component:** 0 minutes

**Setup workflow:**

```bash
# Pick a template at framingui.com/studio
# Then configure MCP in your project:
# .claude/mcp.json (or cursor settings)
{
  "servers": {
    "tekton": {
      "command": "npx",
      "args": ["@framingui/mcp-server"]
    }
  }
}

# AI now generates using the template's design system
# Tokens include: colors, spacing, typography, elevation, motion
```

**Result:** Every component AI generates matches your brand identity.

### Scenario 3: Learning React and shadcn/ui

**You're new to React. You want to learn by example.**

**Recommendation: v0 (best learning tool)**

**Why v0 wins:**

- **Visual feedback**: See exactly what each component does
- **shadcn best practices**: Learn shadcn component patterns
- **Iteration**: Ask "make it bigger" and see visual changes
- **Code inspection**: Study generated code to learn React patterns

**Learning workflow:**

```
v0 Prompt: Create a user profile page

[v0 generates profile page with Avatar, Card, Badge, Button]

Study the code:
- How shadcn components are composed
- How Tailwind utilities work
- How to structure React components

Iterate:
"Add a settings icon button"
[v0 adds IconButton with shadcn Button + Lucide icon]

Learn:
- How to use icon libraries
- How to compose components
- How props are passed
```

**When to switch to framingui:**

Once you understand React and component patterns, move to framingui to learn:

- Design system architecture
- Token-based styling
- OKLCH color spaces
- Accessibility fundamentals (WCAG)

### Scenario 4: Building a Multi-Brand Product

**You build white-label software. Each client needs custom branding.**

**Recommendation: framingui (v0 doesn't support multi-brand)**

**Why framingui wins:**

v0 outputs one design (shadcn defaults). To support multiple brands:

- ❌ Manually create Tailwind themes for each brand
- ❌ Manually maintain color variables for each client
- ❌ Manually swap styles at build time
- ❌ High risk of brand-specific bugs

framingui supports multi-brand out of the box:

```typescript
// Brand A (fintech - professional dark)
const brandA = generateTokensFromArchetype({
  name: 'fintech-pro',
  primaryColor: { l: 0.45, c: 0.13, h: 240 },
  neutralTone: 'tinted',
  contrast: 'high',
});

// Brand B (wellness - warm and soft)
const brandB = generateTokensFromArchetype({
  name: 'wellness-care',
  primaryColor: { l: 0.65, c: 0.12, h: 140 },
  neutralTone: 'warm',
  contrast: 'medium',
});

// Same components, different tokens
// No code changes required
```

**Multi-brand workflow:**

```bash
# Generate tokens for each brand
npx @framingui/cli init --brand clientA
npx @framingui/cli init --brand clientB

# Build with environment variable
TEKTON_BRAND=clientA npm run build  # Uses clientA tokens
TEKTON_BRAND=clientB npm run build  # Uses clientB tokens

# Single codebase, multiple brands
```

**Result:** One codebase scales to unlimited brands.

### Scenario 5: Working with a Design Team

**You have designers who create mockups in Figma.**

**Recommendation: framingui (Figma → Tokens → AI)**

**Why framingui wins:**

**v0 workflow (disconnected):**

```
1. Designer creates mockup in Figma
2. Developer describes mockup to v0
3. v0 generates component (doesn't match Figma exactly)
4. Developer manually tweaks to match Figma
5. Designer requests changes
6. Repeat steps 2-5
```

**framingui workflow (connected):**

```
1. Choose a tekton template that matches your design direction
2. Customize the design tokens (colors, spacing, typography)
3. AI generates components using your tokens
4. Components match your design system consistently
5. Update tokens → All components update automatically
```

**Design-dev handoff:**

```
Designer updates:
- Primary color: #3B82F6 → #2563EB

Traditional workflow:
- Developer searches codebase for #3B82F6
- Finds 47 occurrences (some hardcoded, some in Tailwind)
- Manually updates each one
- Misses 3 instances → visual bugs

framingui workflow:
- Developer updates the token value in one place
- All components reference tokens, not hardcoded colors
- Zero bugs
```

**Result:** Design and development stay in sync.

### Scenario 6: Building a Component Library

**You're creating a reusable component library for your team.**

**Recommendation: framingui (v0 generates app code, not libraries)**

**Why framingui wins:**

v0 generates application code (pages, features, layouts). It's not designed for component library development.

framingui generates:

- Design tokens (consumable by any framework)
- Component contracts (validation rules)
- Semantic metadata (when to use what)
- TypeScript types (for type-safe component props)

**Component library workflow:**

```bash
# Generate design tokens
npx @framingui/cli init

# Create component knowledge
npx @framingui/cli component add Button \
  --category action \
  --variants primary,secondary,ghost

# Generate TypeScript types
npx @framingui/cli generate-types

# Export for distribution
npx @framingui/cli build --format esm,cjs
```

**Output:**

```
dist/
├── tokens.css          # CSS variables
├── tokens.json         # Token metadata
├── tokens.d.ts         # TypeScript types
├── components/         # Component library
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
└── knowledge/          # Component knowledge for AI
    └── catalog.json
```

Your component library now includes everything AI needs to use it correctly.

## Can You Use Both Together?

**Yes! Here's how:**

### Workflow 1: Prototype in v0, Productionize with framingui

```
1. Rapid prototype in v0
   → Get stakeholder feedback
   → Test layouts and interactions

2. Export v0 component code

3. Replace v0 Tailwind classes with framingui tokens
   → Before: className="bg-blue-500 p-4"
   → After: style={{ background: tokens.bg.primary, padding: tokens.spacing[4] }}

4. Continue development with framingui MCP
   → AI generates new components on-brand
   → Enforce token compliance at build time
```

### Workflow 2: Use v0 for Inspiration, Generate with framingui

```
1. Generate layout ideas in v0
   → "Show me 5 pricing page layouts"
   → Pick your favorite

2. Screenshot v0 output

3. Prompt Claude Code with screenshot
   → "Generate this layout using our design tokens"
   → Claude queries framingui MCP
   → Claude generates on-brand version

4. Result: v0 design + your brand tokens
```

### Workflow 3: v0 for Pages, framingui for Components

```
Use v0 for:
- Marketing pages (quick and generic is fine)
- Internal tools (doesn't need heavy branding)
- Prototypes and demos

Use framingui for:
- Customer-facing product (needs brand consistency)
- Component library (needs design system)
- Multi-brand features (needs token swapping)
```

## Pricing Comparison

### v0 Pricing

**Free Tier:**

- 200 AI generations per month
- Public projects only
- Community support

**Pro Tier ($20/month):**

- 1000 AI generations per month
- Private projects
- Priority support

**Enterprise:**

- Unlimited generations
- Custom deployment
- SLA guarantees

### framingui Pricing

**Open Source (Free):**

- Unlimited token generation
- MCP server included
- Full feature access
- Community support

**No paid tiers (yet):**

- Everything is open-source
- MIT licensed
- Self-hosted
- No vendor lock-in

**Future (planned):**

- Hosted MCP server (for teams)
- Visual token editor
- Figma plugin
- Premium support

## Migration Guides

### From v0 to framingui

Already using v0? Here's how to migrate:

**Step 1: Export v0 components**

```tsx
// v0 generated this:
export function PricingCard() {
  return (
    <Card className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-2xl font-bold text-gray-900">Pro Plan</h3>
      <p className="text-gray-600 mt-2">$29/month</p>
      <Button className="mt-6 w-full bg-blue-500 text-white">Get Started</Button>
    </Card>
  );
}
```

**Step 2: Initialize framingui**

```bash
npx @framingui/cli init
# Define your brand colors, spacing, typography
```

**Step 3: Replace Tailwind classes with tokens**

```tsx
import { tokens } from '@/design-system/tokens';

export function PricingCard() {
  return (
    <Card
      style={{
        padding: tokens.spacing[6],
        background: tokens.bg.surface.base,
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadow.md,
      }}
    >
      <h3
        style={{
          fontSize: tokens.fontSize['2xl'],
          fontWeight: tokens.fontWeight.bold,
          color: tokens.fg.primary,
        }}
      >
        Pro Plan
      </h3>
      <p
        style={{
          color: tokens.fg.secondary,
          marginTop: tokens.spacing[2],
        }}
      >
        $29/month
      </p>
      <Button
        style={{
          marginTop: tokens.spacing[6],
          width: '100%',
          background: tokens.button.bg.primary,
          color: tokens.button.fg.primary,
        }}
      >
        Get Started
      </Button>
    </Card>
  );
}
```

**Step 4: Enforce token compliance**

```typescript
// esbuild.config.js
import { tektonPlugin } from '@framingui/esbuild-plugin';

export default {
  plugins: [
    tektonPlugin({
      strict: true, // Prevent new hardcoded values
    }),
  ],
};
```

### From framingui to v0

Need to use v0 after using framingui?

**Use case:** You want v0's visual editor for a specific feature.

**Workflow:**

```
1. Generate initial layout in v0
2. Export v0 code
3. Replace v0 classes with tekton tokens (see migration above)
4. Continue with framingui MCP for new components
```

**Or:** Use v0 for one-off prototypes, framingui for production.

## FAQ

### Is v0 better than framingui?

Neither is "better"—they solve different problems:

- **v0**: Visual prototyping and rapid iteration
- **framingui**: Design system creation and AI integration

Choose based on your needs (see decision guide at top).

### Can I use shadcn/ui with framingui?

Yes! framingui works with any component library:

```bash
# Install shadcn components
npx shadcn-ui@latest init

# Generate tekton tokens
npx @framingui/cli init

# Use both together
import { Button } from '@/components/ui/button';
import { tokens } from '@/design-system/tokens';

<Button style={{ background: tokens.button.bg.primary }}>
  Click Me
</Button>
```

shadcn components + tekton tokens = best of both worlds.

### Does framingui have a visual interface like v0?

Not yet. framingui currently focuses on:

- CLI for token generation
- MCP for AI integration
- Code-first workflow

**On the roadmap:**

- Visual token editor (in browser)
- Component preview gallery
- Real-time design system playground

### Can v0 read my design system?

No. v0 generates shadcn/ui components with default styling. You must manually apply your design tokens after export.

framingui solves this with MCP—AI reads your design system programmatically.

### Which one is faster for prototyping?

**v0** is faster for initial prototypes:

- Visual preview (see changes instantly)
- No setup required (just start prompting)
- Shareable links (collaborate without Git)

**framingui** is faster for production development:

- No token replacement (AI uses tokens from start)
- No design drift (automatic compliance)
- No manual cleanup (on-brand first time)

### Can I self-host v0?

No. v0 is a closed-source, hosted service by Vercel.

framingui is open-source and self-hosted (runs on your machine).

## Final Recommendation

**For most teams:** Start with v0 for prototyping, migrate to framingui for production.

**If you already have a design system:** Use framingui exclusively.

**If you're learning:** Use v0 to learn, then level up to framingui.

**If you're building a product company:** Invest in framingui for long-term consistency.

---

## Get Started

### Try v0

Visit [v0.dev](https://v0.dev) and start generating UI instantly.

### Try framingui

```bash
npm install @framingui/core @framingui/mcp-server
npx @framingui/cli init
```

Configure MCP in Claude Code or Cursor (see [setup guide](https://framingui.com/docs/mcp)).

### Join framingui Beta

Get early access to visual editor and advanced features:

👉 **[Sign up for beta access](https://tally.so/r/7R2kz6)**

---

**Resources:**

- [framingui Documentation](https://framingui.com/docs) — Complete setup guides
- [v0 Documentation](https://v0.dev/docs) — Vercel's official docs
- [Component Comparison](https://framingui.com/vs/v0) — Detailed feature matrix
- [Migration Guide](https://framingui.com/docs/migration/v0) — Step-by-step v0 → framingui

---

_This is an independent comparison. We respect v0 and recommend it for many use cases. framingui exists to solve a specific problem—design system consistency—that v0 wasn't designed to address._

_Built with [framingui](https://framingui.com) — When brand consistency matters._

--- SOURCE END ---

```

```
