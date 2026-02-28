# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/ai-code-generation-design-tokens.mdx

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
source_file: packages/playground-web/content/blog/en/ai-code-generation-design-tokens.mdx

## --- SOURCE START ---

title: "AI Code Generation and Design Tokens: Why Hallucinations Happen"
description: "Understand why AI-generated UI hallucinates without design tokens and how token-driven context improves consistency, correctness, and maintainability."
date: "2026-02-28"
author:
name: "FramingUI Team"
tags:

- ai-code-generation
- design-tokens
- design-system
- llm
  category: "Technical"
  coverImage: ""
  published: true

---

## The Real Reason AI UI Code Breaks Your Design System

AI-generated UI code looks impressive in demos, yet many teams see the same production problem: the code works, but it does not match their product.

You ask for a "simple pricing card" and get:

- Hardcoded palette values
- Random spacing increments
- Inconsistent radius and shadow choices
- Variant naming that does not map to existing components

This is often described as hallucination, but in UI generation the root cause is usually **context starvation**. The model is forced to guess design decisions because your design system is not available in a structured way.

## What Hallucination Means in UI Generation

In this context, hallucination is not only factual error. It is any confident UI decision that is plausible in general but wrong for your system.

### Semantic Hallucination

The model uses valid-looking token names that do not exist, like `color.brand.700` when your system uses `color.primary.600`.

### Visual Hallucination

The model picks arbitrary color/spacing/radius values that conflict with your established patterns.

### Structural Hallucination

The model invents component APIs and variants that resemble popular libraries but do not align with your primitives.

All three are common when design tokens are absent from model context.

## Why Missing Tokens Causes Hallucination

### The Model Optimizes for Probability, Not Your Intent

LLMs generate the most likely next token given prompt context and prior training, not your hidden internal standards.

If your prompt says "build a dashboard card" without token data, the model defaults to commonly seen patterns from public code.

### Natural Language Is Too Ambiguous

"Use our brand colors" means little to a model unless brand colors are provided as concrete machine-readable values.

### Unstructured Guidelines Are Hard to Enforce

A paragraph in a wiki saying "use 8px spacing" does not reliably govern generated JSX unless the model has explicit schema-like constraints.

### Context Windows Are Limited

Even if you paste long guidelines manually, they compete with feature requirements inside the same context window. Structured token retrieval scales better.

## Design Tokens as a Constraint Interface

Design tokens act as a contract between your design system and AI code generation.

A good token model provides:

- Stable names (semantic, not ad hoc)
- Explicit values (color, type, spacing, motion, elevation)
- Theme mappings (light/dark)
- Component-level semantics where needed

When AI can query this contract, generation shifts from guessing to constrained composition.

## From "Guess and Patch" to "Generate and Ship"

### Without Tokens

Workflow:

1. Prompt AI for component
2. Receive plausible but off-system code
3. Manually replace values and variants
4. Repeat for every output

Cost:

- High review overhead
- Inconsistent code quality
- Slow velocity in UI-heavy work

### With Tokens

Workflow:

1. AI reads token definitions and component contracts
2. Generates with valid semantic references
3. Human reviews behavior and copy, not style cleanup

Result:

- Lower hallucination rate
- Better design system compliance
- Faster iteration

## Minimum Token Schema for AI Reliability

You do not need a huge enterprise schema to improve output quality. Start with minimum viable structure.

### Color Tokens

- `color.text.primary`, `color.text.secondary`, `color.text.inverse`
- `color.surface.default`, `color.surface.elevated`
- `color.border.default`, `color.border.focus`
- `color.intent.success`, `color.intent.warning`, `color.intent.danger`

### Spacing and Size Tokens

- `spacing.1` through `spacing.10` with consistent scale
- `radius.sm`, `radius.md`, `radius.lg`
- `size.control.sm`, `size.control.md`, `size.control.lg`

### Typography Tokens

- `font.size.body`, `font.size.label`, `font.size.title`
- `font.weight.regular`, `font.weight.medium`, `font.weight.semibold`
- `lineHeight.body`, `lineHeight.heading`

### Component Semantic Tokens

- `button.primary.bg`
- `button.primary.fg`
- `input.border.default`
- `input.border.focus`

This is enough to remove most random stylistic guesses.

## How to Feed Tokens to AI Tools

There are three common approaches.

### 1. Static Prompt Injection

You paste token JSON in every prompt.

- Fast to test
- Hard to scale
- Easy to go stale

### 2. Repo-Co-Located Token Files

You store tokens in versioned files and reference them in workflow instructions.

- Better than manual copy-paste
- Still depends on prompt discipline

### 3. Protocol-Based Retrieval (MCP)

AI clients query token data through a structured interface at generation time.

- Consistent and up-to-date context
- Better for team workflows
- Lower manual overhead

For sustained AI-assisted development, retrieval-based context usually wins.

## Practical Guardrails Beyond Tokens

Tokens reduce hallucination but do not eliminate all errors. Add guardrails.

### Guardrail 1: Constrained Component APIs

If components only accept approved variants and sizes, invalid generation fails fast.

### Guardrail 2: Lint Rules for Raw Values

Detect hardcoded hex colors, arbitrary spacing, and unapproved utility combinations.

### Guardrail 3: Snapshot or Visual Regression Tests

Catch unintended visual drift during rapid generation cycles.

### Guardrail 4: Prompt Templates with Explicit Constraints

Include clear instructions: "Use existing primitives. Do not invent variants. Use token references only."

## Where FramingUI Helps in This Stack

FramingUI is useful because it combines token-first design system structure with AI-friendly workflows.

In practice it helps teams:

- Define and evolve semantic tokens clearly
- Keep primitives aligned with token contracts
- Connect token context to AI tooling so generation follows system constraints

That combination is what reduces hallucination from repeated manual cleanup into predictable output quality.

## A Simple Adoption Plan

If your current AI-generated UI feels noisy, use this sequence.

### Step 1: Audit Generated Code

Measure how often generated code violates token usage and component APIs.

### Step 2: Establish Minimum Token Schema

Do not over-model. Start with color, spacing, typography, and core semantic component tokens.

### Step 3: Integrate Token Context into Generation

Use a stable retrieval method, ideally protocol-based, so context is always current.

### Step 4: Add Automated Checks

Reject code that bypasses tokens or invents unsupported variants.

### Step 5: Iterate on Token Semantics

When repeated edge cases appear, refine semantic token layers instead of patching one-off values.

## Closing Thought

When teams say AI hallucinated their UI, they often blame the model quality alone. But the bigger issue is usually missing system context.

Design tokens are not just for handoff or theming. In AI-assisted development, they are the control surface that turns generative output from generic guesswork into system-aligned implementation.

If you want AI code generation to scale inside a real product, tokenized design system context is no longer optional. It is the baseline.

--- SOURCE END ---
```
