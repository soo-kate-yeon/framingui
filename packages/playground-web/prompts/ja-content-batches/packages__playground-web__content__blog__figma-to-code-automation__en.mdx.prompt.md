# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/figma-to-code-automation/en.mdx

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
source_file: packages/playground-web/content/blog/figma-to-code-automation/en.mdx

## --- SOURCE START ---

title: "Figma to Code: AI-Powered Design Automation"
description: "Transform Figma designs into production-ready code using AI and design tokens. No more manual translation between design and development."
date: "2026-02-26"
author: "tekton team"
tags: ["figma", "automation", "ai", "design-tokens"]

---

# Figma to Code: AI-Powered Design Automation

The gap between design and development has always been painful. Here's how AI and design tokens are finally bridging that divide.

## The Traditional Workflow (And Why It Breaks)

1. Designer creates mockup in Figma
2. Developer inspects, manually extracts values
3. Code gets written with hardcoded colors/spacing
4. Design changes, developer re-extracts everything
5. Repeat forever

**The problem:** Manual translation creates errors and slows everyone down.

## The Token-Based Workflow

With a token-based approach:

1. Designer works with token-aware Figma components
2. AI reads the design, maps to existing tokens
3. Code generates using your actual design system
4. Design changes? AI updates the mapping

**The result:** Consistent code, faster iteration, happier teams.

## How It Works

### 1. Token-Aware Figma Setup

Structure your Figma with semantic naming:
```

Colors/Primary/500 → maps to → tokens.colors.primary[500]
Spacing/md → maps to → tokens.spacing.md

````

### 2. AI Extraction

When AI analyzes your Figma design:

```typescript
// AI sees: Rectangle with #3B82F6 fill
// AI maps: tokens.colors.primary[500]
// AI generates: className="bg-primary-500"
````

### 3. Component Generation

Instead of pixel-perfect recreation, AI generates semantic code:

```tsx
// Generated component
export function FeatureCard() {
  return (
    <Card variant="elevated">
      <CardHeader>
        <Heading size="lg">{title}</Heading>
      </CardHeader>
      <CardBody>
        <Text color="muted">{description}</Text>
      </CardBody>
    </Card>
  );
}
```

## Real-World Implementation

### With framingui

1. Export your Figma frame
2. Provide to AI with MCP context
3. Get token-compliant code

```bash
# In Claude or Cursor with tekton MCP
"Convert this Figma design to a React component"
```

The AI knows your tokens, follows your patterns, generates consistent code.

## Key Benefits

| Traditional         | Token-Based            |
| ------------------- | ---------------------- |
| Hours per component | Minutes per component  |
| Hardcoded values    | Semantic tokens        |
| Manual updates      | AI-assisted changes    |
| Design drift        | Guaranteed consistency |

## Get Started

Ready to automate your Figma-to-code workflow?

1. [Set up framingui](/docs/quick-start)
2. [Connect MCP](/docs/mcp)
3. Start generating consistent code

[Try it free →](/pricing)

--- SOURCE END ---

```

```
