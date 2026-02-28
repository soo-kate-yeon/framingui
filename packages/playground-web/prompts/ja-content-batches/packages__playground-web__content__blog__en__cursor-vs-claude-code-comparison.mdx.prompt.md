# JA Translation Batch

## Scope

- scope: blog
- source_file: packages/playground-web/content/blog/en/cursor-vs-claude-code-comparison.mdx

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
source_file: packages/playground-web/content/blog/en/cursor-vs-claude-code-comparison.mdx

## --- SOURCE START ---

title: "Cursor vs Claude Code: Choosing the Right AI Coding Tool in 2026"
description: "An in-depth comparison of Cursor and Claude Code — features, workflows, pricing, and which AI coding tool fits your development style."
date: "2026-02-12"
author:
name: "FramingUI Team"
tags:

- ai-tools
- comparison
- developer-experience
  category: "AI Tools"
  coverImage: ""
  published: true

---

## The AI Coding Tool Landscape

The AI-assisted development space has matured significantly. Two tools stand out for professional developers: **Cursor** (the AI-native IDE) and **Claude Code** (Anthropic's CLI-based coding agent). Both are powerful, but they serve different workflows.

Let's break down where each tool shines.

## Cursor: The AI-Native IDE

Cursor builds on VS Code's foundation, adding AI capabilities directly into the editor experience.

### Strengths

- **Visual workflow** — See AI suggestions inline, accept or reject changes with a click
- **Tab completion** — Predictive code completion that feels natural
- **Multi-file editing** — AI understands your entire project context through the IDE
- **Low barrier to entry** — Familiar VS Code interface, easy to adopt

### Best For

Cursor excels when you want AI assistance woven into a traditional IDE workflow. It's great for visual learners who prefer seeing changes before applying them.

## Claude Code: The Terminal-Native Agent

Claude Code takes a fundamentally different approach — it's a CLI tool that acts as an autonomous coding agent.

### Strengths

- **Agentic workflow** — Give it a task, and it plans, implements, and tests autonomously
- **Deep context** — 200K token context window means it can understand entire codebases
- **Git-native** — Creates commits, branches, and PRs as part of its workflow
- **Composable** — Integrates with any editor, any terminal, any CI/CD pipeline
- **Extensible** — Custom skills, hooks, and MCP server integrations

### Best For

Claude Code shines for complex, multi-file tasks. When you need to refactor an authentication system, implement a new feature across multiple files, or debug a tricky issue — the agentic approach saves significant time.

## Head-to-Head Comparison

| Feature            | Cursor                   | Claude Code                  |
| ------------------ | ------------------------ | ---------------------------- |
| Interface          | GUI (VS Code fork)       | CLI (Terminal)               |
| AI Model           | Multiple (GPT-4, Claude) | Claude (Opus, Sonnet, Haiku) |
| Context Window     | Varies by model          | Up to 200K tokens            |
| Multi-file Editing | Yes (visual)             | Yes (agentic)                |
| Git Integration    | Basic                    | Deep (commits, PRs)          |
| Extensibility      | Extensions               | Skills, Hooks, MCP           |
| Offline Mode       | Partial                  | No                           |
| Pricing            | $20/mo Pro               | Usage-based                  |

## When to Use Which?

### Choose Cursor when:

- You prefer visual feedback and inline suggestions
- You're making small, targeted changes
- You want AI assistance without changing your workflow
- You work primarily in a single file at a time

### Choose Claude Code when:

- You have complex, multi-step tasks
- You need to work across many files simultaneously
- You want autonomous task execution
- You're comfortable with the terminal
- You need deep integration with Git workflows

## Our Experience at Tekton

At Tekton, we use both tools depending on the task. For quick UI tweaks and component styling, Cursor's inline suggestions are invaluable. For implementing new features, running our SPEC-driven development workflow, and managing multi-file refactors, Claude Code's agentic approach is significantly more productive.

The tools aren't mutually exclusive — they complement each other well.

## Conclusion

There's no single "best" AI coding tool. The right choice depends on your workflow, the complexity of your tasks, and your comfort level with different interfaces. Try both, and use whichever makes you most productive for the task at hand.

The real win is that developers now have access to AI tools that genuinely accelerate their work. Whether you choose Cursor, Claude Code, or both — the era of AI-assisted development is here, and it's only getting better.

--- SOURCE END ---
```
