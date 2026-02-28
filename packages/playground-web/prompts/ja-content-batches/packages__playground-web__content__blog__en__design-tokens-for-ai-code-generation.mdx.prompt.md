# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/design-tokens-for-ai-code-generation.mdx

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
source_file: packages/playground-web/content/blog/en/design-tokens-for-ai-code-generation.mdx

## --- SOURCE START ---

title: "Design Tokens for AI Code Generation: A Complete MCP Integration Guide"
description: "Connect your design system to AI tools using MCP. Make Claude and Cursor generate on-brand UI components with design tokens."
date: "2026-02-25"
author:
name: "FramingUI Team"
tags:

- design-tokens
- mcp
- ai
- tutorial
  category: "Tutorial"
  coverImage: ""
  published: true

---

## The Problem with AI-Generated UI Code

You've experienced this: you ask Claude to build a user profile card. It generates clean, working code—but with hardcoded colors like `#3B82F6` and arbitrary spacing like `px-4`. When you copy-paste it into your codebase, it doesn't match your design system at all.

Why? **AI tools have no context about your design decisions.** They generate based on generic patterns from training data, not your brand's specific tokens, color palettes, or spacing scales.

What if AI could read your design system and generate perfectly on-brand code every single time?

## TL;DR

- **Model Context Protocol (MCP)** lets AI tools access your design tokens programmatically
- **framingui** provides an MCP server that exposes your design system to Claude Code, Cursor, and other MCP-compatible tools
- Setup takes **5 minutes** and works with any design token format (CSS variables, Tailwind, styled-components)
- Result: AI generates code using your actual design tokens instead of hardcoded values
- No more manual token replacement—AI understands your design system from the start

## What is Model Context Protocol (MCP)?

Model Context Protocol is Anthropic's open standard for connecting AI tools to external data sources. Think of it as a **USB port for AI assistants**—it provides a standardized way for AI to query information without you copy-pasting context into every prompt.

### How MCP Works
```

┌─────────────────┐ MCP ┌─────────────────┐
│ AI Assistant │ ◄──────────────────► │ MCP Server │
│ (Claude Code) │ JSON-RPC Protocol │ (Design Tokens) │
└─────────────────┘ └─────────────────┘
▲ │
│ │
│ ▼
│ ┌──────────────┐
└──────────────────────────────────│ Your Design │
Generates code │ System │
using real tokens └──────────────┘

````

**Key Benefits:**

1. **Contextual Awareness**: AI reads your design tokens on-demand, always getting the latest values
2. **No Context Window Waste**: Design tokens don't consume your prompt context—they're fetched externally
3. **Automatic Updates**: When you change tokens, AI immediately sees the new values (no re-pasting)
4. **Bi-directional**: AI can both read tokens and validate generated code against your design system

## Why Design Tokens Need MCP Integration

### The Traditional Workflow (Painful)

1. Ask AI to generate a component
2. AI produces code with hardcoded values (`bg-blue-500`, `#3B82F6`, `16px`)
3. You manually replace all values with design tokens (`bg-primary-500`, `var(--color-primary)`, `spacing-4`)
4. Repeat for every component AI generates
5. Design tokens drift as you inevitably miss some replacements

**Time wasted per component:** 5-10 minutes
**Result:** Inconsistent token usage, design system violations

### The MCP Workflow (Effortless)

1. AI assistant connects to your design tokens via MCP
2. You ask AI to generate a component
3. AI queries available tokens (colors, spacing, typography)
4. AI generates code using your actual tokens from the start
5. Code is design system compliant immediately

**Time wasted per component:** 0 minutes
**Result:** 100% token compliance, zero manual replacement

## Setting Up framingui with MCP

### Prerequisites

- Node.js 20+ installed
- Claude Code, Cursor, or any MCP-compatible AI tool
- A project with design tokens (or generate them with framingui)

### Step 1: Install framingui

```bash
# Install framingui core packages
npm install @framingui/core @framingui/mcp-server

# Or with yarn
yarn add @framingui/core @framingui/mcp-server

# Or with pnpm
pnpm add @framingui/core @framingui/mcp-server
````

### Step 2: Generate Design Tokens (Optional)

If you don't have design tokens yet, framingui can generate them:

```bash
# Initialize framingui with interactive prompts
npx @framingui/cli init

# Follow prompts:
# - Primary color (OKLCH format)
# - Contrast level (AA or AAA)
# - Border radius style
# - Typography scale
```

This creates:

- `tokens.css` - CSS custom properties
- `tokens.json` - Token metadata for MCP
- `tailwind.config.js` - Tailwind integration (if detected)

**Example generated tokens:**

```css
/* tokens.css */
:root {
  /* Primary color scale */
  --color-primary-50: oklch(0.95 0.03 240);
  --color-primary-500: oklch(0.5 0.15 240);
  --color-primary-900: oklch(0.25 0.08 240);

  /* Spacing scale */
  --spacing-1: 0.25rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;

  /* Component tokens */
  --button-bg-primary: var(--color-primary-500);
  --button-fg-primary: oklch(0.98 0.01 240);
}
```

### Step 3: Configure MCP Server

Create or update your MCP configuration file. The location depends on your AI tool:

**For Claude Code:**

```json
// .claude/mcp.json
{
  "servers": {
    "tekton-design-tokens": {
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

```json
// .cursor/mcp.json
{
  "mcpServers": {
    "tekton-design-tokens": {
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

**Configuration Options:**

- `TEKTON_PROJECT_PATH`: Root directory of your project (default: current directory)
- `TEKTON_TOKEN_PATH`: Path to token metadata JSON (default: `./tokens.json`)
- `TEKTON_STRICT_MODE`: Fail if tokens are missing (default: `false`)

### Step 4: Verify MCP Connection

Restart your AI tool and verify the MCP connection:

**In Claude Code:**

```
You: Can you list available design tokens?

Claude: I'll query the tekton design tokens via MCP.

[Claude queries MCP server]

Available design tokens:
- Color scales: primary (10 steps), success, warning, error
- Spacing: 1, 2, 3, 4, 6, 8, 12, 16
- Typography: xs, sm, base, lg, xl, 2xl, 3xl
- Component tokens: button, card, input, badge
```

**In Cursor:**

Type `@framingui` in chat to see available MCP commands:

- `@framingui/tokens` - List all tokens
- `@framingui/components` - List component knowledge
- `@framingui/validate` - Validate code against design system

### Step 5: Generate Components with AI

Now AI can generate components using your actual design tokens:

**Prompt:**

```
Create a user profile card component using our design tokens
```

**AI Response (Before MCP):**

```tsx
export function ProfileCard() {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <img src="/avatar.jpg" className="w-16 h-16 rounded-full" />
      <h3 className="text-lg font-semibold text-gray-900">John Doe</h3>
      <p className="text-gray-600">Software Engineer</p>
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">View Profile</button>
    </div>
  );
}
```

**AI Response (With MCP):**

```tsx
import { tokens } from '@/design-system/tokens';

export function ProfileCard() {
  return (
    <div
      style={{
        padding: tokens.spacing[4],
        background: tokens.bg.surface.elevated,
        borderRadius: tokens.radius.lg,
        boxShadow: tokens.shadow.md,
      }}
    >
      <img
        src="/avatar.jpg"
        style={{
          width: tokens.spacing[16],
          height: tokens.spacing[16],
          borderRadius: tokens.radius.full,
        }}
      />
      <h3
        style={{
          fontSize: tokens.fontSize.lg,
          fontWeight: tokens.fontWeight.semibold,
          color: tokens.fg.primary,
        }}
      >
        John Doe
      </h3>
      <p style={{ color: tokens.fg.secondary }}>Software Engineer</p>
      <button
        style={{
          marginTop: tokens.spacing[4],
          padding: `${tokens.spacing[2]} ${tokens.spacing[4]}`,
          background: tokens.button.bg.primary,
          color: tokens.button.fg.primary,
          borderRadius: tokens.radius.md,
        }}
      >
        View Profile
      </button>
    </div>
  );
}
```

Notice:

- Zero hardcoded colors or spacing
- All values reference actual design tokens
- Component matches your design system exactly
- No manual token replacement needed

## Advanced MCP Usage Patterns

### Pattern 1: Component Knowledge Integration

framingui's MCP server exposes not just tokens but **component knowledge**—semantic metadata about when and how to use components.

**Query component metadata:**

```
You: What's the difference between primary and ghost button variants?

Claude: [Queries MCP component knowledge]

Button Variants:
- primary: Main call-to-action, high visual emphasis
  - Use case: Primary action in a context (max one per screen)
  - Tokens: button.bg.primary, button.fg.primary
  - Constraint: Maximum one primary button per viewport

- ghost: Low-emphasis action for secondary operations
  - Use case: Actions that shouldn't compete with primary CTA
  - Tokens: button.bg.ghost (transparent), button.fg.ghost
  - Visual impact: Low (no background fill)
```

**Component generation with context:**

```
You: Create a modal footer with save and cancel actions

Claude: [Understands from component knowledge that save = primary, cancel = ghost]
```

```tsx
import { Button } from '@/components/button';
import { tokens } from '@/design-system/tokens';

export function ModalFooter({ onSave, onCancel }) {
  return (
    <div
      style={{
        display: 'flex',
        gap: tokens.spacing[2],
        justifyContent: 'flex-end',
        padding: tokens.spacing[4],
      }}
    >
      <Button variant="ghost" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onSave}>
        Save Changes
      </Button>
    </div>
  );
}
```

AI automatically:

- Places primary button on the right (modal convention)
- Uses ghost variant for cancel (low emphasis)
- Applies correct spacing between buttons
- Respects "max one primary per viewport" constraint

### Pattern 2: Token Validation

Use MCP to validate existing code against your design system:

**Prompt:**

```
Validate this component for token compliance:

const Card = () => (
  <div style={{ background: '#ffffff', padding: '16px' }}>
    <h2 style={{ color: '#1a1a1a' }}>Title</h2>
  </div>
);
```

**AI Response:**

```
Token compliance violations found:

1. Line 2: Hardcoded color `#ffffff`
   → Replace with: tokens.bg.surface.base

2. Line 2: Hardcoded spacing `16px`
   → Replace with: tokens.spacing[4]

3. Line 3: Hardcoded color `#1a1a1a`
   → Replace with: tokens.fg.primary

Suggested fix:
```

```tsx
const Card = () => (
  <div
    style={{
      background: tokens.bg.surface.base,
      padding: tokens.spacing[4],
    }}
  >
    <h2 style={{ color: tokens.fg.primary }}>Title</h2>
  </div>
);
```

### Pattern 3: Multi-Theme Generation

Generate components that work across multiple themes:

**Prompt:**

```
Create a theme switcher that toggles between light and dark themes
```

**AI Response (queries theme tokens via MCP):**

```tsx
import { tokens } from '@/design-system/tokens';
import { useState } from 'react';

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  return (
    <button
      onClick={toggleTheme}
      style={{
        padding: `${tokens.spacing[2]} ${tokens.spacing[3]}`,
        background: tokens.button.bg.ghost,
        color: tokens.button.fg.ghost,
        border: `1px solid ${tokens.border.default}`,
        borderRadius: tokens.radius.md,
        cursor: 'pointer',
      }}
    >
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  );
}
```

```css
/* AI knows to generate theme-aware CSS from token metadata */
[data-theme='light'] {
  --bg-surface-base: oklch(0.98 0.01 240);
  --fg-primary: oklch(0.25 0.03 240);
}

[data-theme='dark'] {
  --bg-surface-base: oklch(0.18 0.01 240);
  --fg-primary: oklch(0.92 0.02 240);
}
```

AI automatically:

- Generates theme-switching logic
- Uses semantic tokens that adapt to theme
- Creates corresponding CSS for both themes
- Respects WCAG contrast requirements in both modes

## Integrating with Existing Design Systems

You don't need to use framingui's token generator—MCP works with any design token format.

### From Existing Design Tokens

If you already have design tokens (from Figma Tokens plugin or other sources):

```bash
# Export your tokens as JSON
# Structure them following W3C Design Token format
# Or use framingui templates as a starting point
```

```json
// .claude/mcp.json
{
  "servers": {
    "tekton": {
      "command": "npx",
      "args": ["@framingui/mcp-server"],
      "env": {
        "TEKTON_TOKEN_PATH": "./design-tokens.json"
      }
    }
  }
}
```

### From Style Dictionary

If you use Style Dictionary:

```bash
# Build tokens with Style Dictionary
npm run build-tokens

# Output: build/tokens.json

# Point MCP to Style Dictionary output
```

```json
{
  "servers": {
    "tekton-design-tokens": {
      "command": "npx",
      "args": ["@framingui/mcp-server", "--format", "style-dictionary"],
      "env": {
        "TEKTON_TOKEN_PATH": "./build/tokens.json"
      }
    }
  }
}
```

### From Tailwind Config

If you use Tailwind CSS:

```bash
# Extract tokens from tailwind.config.js
npx @framingui/cli extract-tailwind

# Output: tokens.json with Tailwind token mappings
```

```typescript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#3B82F6',
        },
      },
      spacing: {
        4: '1rem',
      },
    },
  },
};

// MCP automatically reads Tailwind config and exposes as tokens
```

## Troubleshooting Common Issues

### Issue 1: MCP Server Not Connecting

**Symptom:** AI tool doesn't recognize MCP commands

**Solution:**

```bash
# Verify MCP server starts correctly
npx @framingui/mcp-server --test

# Check for errors in AI tool logs
# Claude Code: Help → Toggle Developer Tools → Console
# Cursor: View → Output → Select "MCP Servers"

# Ensure TEKTON_PROJECT_PATH is absolute
{
  "env": {
    "TEKTON_PROJECT_PATH": "/absolute/path/to/project"
  }
}
```

### Issue 2: Tokens Not Found

**Symptom:** AI says "No tokens available" when querying

**Solution:**

```bash
# Verify tokens.json exists and is valid JSON
cat tokens.json | jq

# Check token file path in MCP config
# Path should be relative to TEKTON_PROJECT_PATH
```

### Issue 3: AI Still Generates Hardcoded Values

**Symptom:** AI generates `#ffffff` instead of token references

**Solution:**

Add explicit instruction in your prompt:

```
Create a card component using ONLY design tokens from the MCP server.
Do not use any hardcoded colors, spacing, or design values.
```

Or configure strict mode:

```json
{
  "env": {
    "TEKTON_STRICT_MODE": "true"
  }
}
```

This makes MCP server return an error if AI tries to generate code without tokens.

## FAQ

### Can I use MCP with AI tools other than Claude?

Yes! MCP is an open standard. Any tool that supports Model Context Protocol can connect to framingui's MCP server. Currently supported:

- Claude Code (official)
- Cursor (experimental MCP support)
- Cline / Windsurf (community support)
- Any tool implementing MCP client specification

### Does MCP slow down AI responses?

No. MCP queries happen in parallel with AI generation and typically complete in <50ms. The AI doesn't wait for MCP—it streams responses while fetching token data.

### What if my tokens change frequently?

MCP reads tokens on-demand, so AI always sees the latest values. No need to restart your AI tool or re-configure MCP when tokens change. Just save your token files and AI will pick up changes on the next query.

### Can AI generate new tokens via MCP?

Not yet. MCP currently provides read-only access to design tokens. Token generation still requires using framingui CLI or your existing design system workflow. Bi-directional MCP (read + write) is planned for a future release.

### Does this work with component libraries like shadcn/ui?

Yes! framingui's MCP server includes component knowledge for shadcn/ui components. When you ask AI to generate a component, it automatically:

1. Queries available shadcn components via MCP
2. Selects the appropriate component variant
3. Applies your design tokens to the component
4. Follows shadcn's composition patterns

Example:

```
You: Create a data table with sorting

AI: [Queries MCP for DataTable component knowledge]
    [Generates shadcn Table component with your tokens]
```

### How do I add custom component knowledge?

Create a `component-knowledge.json` file:

```json
{
  "components": [
    {
      "name": "CustomCard",
      "category": "layout",
      "purpose": "Displays content in an elevated container",
      "variants": [
        {
          "name": "elevated",
          "tokens": {
            "bg": "bg.surface.elevated",
            "shadow": "shadow.md"
          }
        }
      ]
    }
  ]
}
```

Configure MCP to load it:

```json
{
  "env": {
    "TEKTON_COMPONENT_KNOWLEDGE_PATH": "./component-knowledge.json"
  }
}
```

Now AI will understand your custom components and use them in generated code.

## Get Started with framingui MCP

Ready to connect your design system to AI?

### Option 1: Try the Playground

Visit [framingui.com/studio](https://framingui.com/studio) to:

- Generate design tokens from pre-built archetypes
- Preview components with your tokens
- Test MCP integration in the browser

### Option 2: Install in Your Project

```bash
# Install framingui
npm install @framingui/core @framingui/mcp-server

# Initialize design tokens
npx @framingui/cli init

# Configure MCP (see Step 3 above)

# Start generating on-brand code with AI
```

### Option 3: Join the Beta

Get early access to advanced MCP features:

👉 **[Sign up for beta access](https://tally.so/r/7R2kz6)**

Beta features include:

- Bi-directional MCP (AI can propose token changes)
- Visual token editor with AI suggestions
- Multi-project token synchronization
- Team collaboration on design systems

---

**Documentation:**

- [MCP Integration Guide](https://framingui.com/docs/mcp) — Complete setup documentation
- [API Reference](https://framingui.com/docs/api) — MCP server API specification
- [Component Knowledge](https://framingui.com/docs/components) — Available components and metadata

**Community:**

- [GitHub Discussions](https://github.com/framingui/discussions) — Ask questions
- [Discord](https://framingui.com/discord) — Real-time help from the community

---

_Built with [framingui](https://framingui.com) — AI-powered design systems with MCP integration._

--- SOURCE END ---

```

```
