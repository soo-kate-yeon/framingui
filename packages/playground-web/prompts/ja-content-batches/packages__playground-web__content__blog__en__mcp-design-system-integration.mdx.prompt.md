# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/mcp-design-system-integration.mdx

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
source_file: packages/playground-web/content/blog/en/mcp-design-system-integration.mdx

## --- SOURCE START ---

title: "MCP Design System Integration: Use Claude and Cursor with Real Tokens"
description: "Step-by-step guide to connecting your design system to Claude and Cursor using MCP so AI generates consistent, token-aligned UI code."
date: "2026-02-28"
author:
name: "FramingUI Team"
tags:

- mcp
- design-system
- claude
- cursor
  category: "Tutorial"
  coverImage: ""
  published: true

---

## Why MCP Changes AI UI Workflows

Most teams using AI for frontend work hit the same ceiling: generated code is fast but inconsistent. You spend the saved time fixing design details manually.

Model Context Protocol (MCP) solves this by letting AI tools retrieve structured context from external systems, including your design system.

Instead of telling Claude or Cursor your token rules repeatedly, you expose them once through MCP and make them available during generation.

## What MCP Integration Gives You

With MCP design system integration, your AI workflow shifts from "prompt-only" to "context-aware":

- AI can query current design tokens directly
- Generated code references approved semantic values
- Component variants align with system contracts more often
- Drift from stale copied guidelines drops significantly

This is especially important for teams that generate UI code daily.

## Architecture Overview

At a high level:

1. Your design system stores token data in machine-readable format
2. An MCP server exposes token and component metadata
3. AI clients (Claude, Cursor) call the MCP server during tasks
4. Generated code uses retrieved design system context

This keeps your prompts smaller and your outputs more consistent.

## Prerequisites

Before setup, make sure you have:

- A repository with an existing design system or token files
- Node.js runtime available for MCP server execution
- Claude Code, Cursor, or another MCP-compatible client
- Clear semantic token naming in your design system

If token naming is unclear, clean that first. MCP does not fix weak semantics.

## Step 1: Prepare Token Sources

Ensure token data is available in structured files such as:

- `tokens.json`
- `tokens.css`
- `theme.ts` exports

Recommended minimum fields:

- Color semantics
- Spacing scale
- Typography scale
- Radius and elevation
- Component-level semantic aliases where relevant

Avoid exposing only raw palette values. Semantic mapping is where consistency comes from.

## Step 2: Configure MCP for Claude

Create an MCP configuration for Claude that registers your design system server.

Example shape:

```json
{
  "servers": {
    "design-system": {
      "command": "npx",
      "args": ["@framingui/mcp-server"],
      "env": {
        "PROJECT_PATH": ".",
        "TOKEN_PATH": "./tokens.json"
      }
    }
  }
}
```
````

After saving configuration, restart Claude client to load server definitions.

## Step 3: Configure MCP for Cursor

Cursor uses a similar registration pattern.

Example shape:

```json
{
  "mcpServers": {
    "design-system": {
      "command": "npx",
      "args": ["@framingui/mcp-server"],
      "env": {
        "PROJECT_PATH": ".",
        "TOKEN_PATH": "./tokens.json"
      }
    }
  }
}
```

Restart Cursor after updating config so the MCP server is discovered.

## Step 4: Verify Connection and Capabilities

Run a simple capability check in each client.

Suggested prompts:

- "List available design system tokens"
- "Show button semantic tokens"
- "Generate a settings form using existing tokens and component variants"

If AI cannot list tokens, check:

- Server command path
- Environment variable paths
- Token file existence and JSON validity

## Step 5: Use Prompt Patterns That Leverage MCP

MCP works best when prompts request constraints explicitly.

Good prompt template:

- Build `[component]`
- Use existing primitives only
- Use semantic tokens only
- Do not invent new variants
- Include loading, empty, and error states

This combines retrieval with clear behavioral constraints.

## Integration Pattern for Teams

For consistent team results, standardize workflow.

### Pattern A: Shared Prompt Templates

Store reusable prompt templates in repo docs so everyone asks AI in the same constrained format.

### Pattern B: CI/Lint Enforcement

Add checks for:

- Hardcoded colors
- Non-token spacing values
- Unsupported variant names

This catches misses from both humans and AI.

### Pattern C: Review Checklist

In PR review, verify:

- Token usage is semantic
- Existing primitives are used
- Accessibility states remain intact

MCP improves generation quality, but review still matters.

## Where FramingUI Helps in MCP Integration

FramingUI provides practical leverage in this setup by combining:

- Token-first design system modeling
- Reusable component structures
- MCP-ready workflow support for AI clients

That combination reduces the gap between design system intent and generated implementation.

For teams that use Claude or Cursor heavily, this saves substantial cleanup time.

## Common Integration Pitfalls

### Pitfall 1: Exposing Raw Values Without Semantics

If token context is only `blue-500`, AI still has to guess intent.

### Pitfall 2: No Component Contracts

Even with token data, AI may invent unsupported component props if primitive contracts are vague.

### Pitfall 3: Stale Token Sources

If MCP reads outdated files, outputs become inconsistent with live UI.

### Pitfall 4: Overlong Prompts Repeating What MCP Already Provides

Do not waste prompt space on data that MCP can fetch directly.

## Security and Operational Notes

Treat MCP servers as part of developer infrastructure.

- Limit scope of exposed files
- Avoid leaking unrelated secrets through broad server access
- Version token changes and document breaking naming updates
- Keep development and production context boundaries clear

Operational discipline keeps integration reliable.

## A 30-Minute Rollout Plan

If you want fast adoption:

1. Validate token schema quality
2. Register MCP server in Claude and Cursor
3. Run three representative component generation tests
4. Add lint rule for raw visual values
5. Publish one team prompt template

This gives immediate quality gains without major process change.

## Final Takeaway

MCP design system integration is not a "nice-to-have" for AI-heavy frontend teams. It is the difference between fast but noisy code generation and fast, reliable system-aligned output.

When Claude and Cursor can retrieve your real token context, they stop guessing and start composing inside your design system constraints.

That is how AI acceleration becomes production-ready instead of cleanup-heavy.

--- SOURCE END ---

```

```
