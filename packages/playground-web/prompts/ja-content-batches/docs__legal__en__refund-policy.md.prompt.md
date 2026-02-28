# JA Translation Batch

## Scope

- scope: legal
- source_file: docs/legal/en/refund-policy.md

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
次の legal 文書を日本語に翻訳してください。
source_file: docs/legal/en/refund-policy.md

--- SOURCE START ---

# Refund Policy

**Effective Date:** February 7, 2026  
**Last Updated:** February 7, 2026

---

## 1. Overview

This Refund Policy applies to all purchases made through the Tekton platform operated by Morak (모락).

**Contact Information:**

- **Business Name:** Morak (모락)
- **Representative:** Sooyeon Kim (김수연)
- **Address:** 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea
- **Email:** soo.kate.yeon@gmail.com

---

## 2. Digital Product Nature

All products sold on Tekton are **digital goods** (React UI templates, design assets, and code packages). Due to the nature of digital products:

> **Once a product has been downloaded, refunds are generally not available.**

This is because digital products cannot be "returned" like physical goods, and access to the full product is granted immediately upon download.

---

## 3. Refund Eligibility

### 3.1 Eligible for Refund

| Situation                     | Refund Available | Conditions                                             |
| ----------------------------- | ---------------- | ------------------------------------------------------ |
| **Pre-download cancellation** | ✅ Yes           | Request within 14 days of purchase AND before download |
| **Technical defect**          | ✅ Yes           | Product is fundamentally broken and we cannot fix it   |
| **Duplicate purchase**        | ✅ Yes           | Accidental duplicate payment for same product          |

### 3.2 Not Eligible for Refund

| Situation                                        | Refund Available |
| ------------------------------------------------ | ---------------- |
| Downloaded product (regardless of use)           | ❌ No            |
| Changed mind after download                      | ❌ No            |
| Incompatibility with your project (not a defect) | ❌ No            |
| Lack of expertise to use the product             | ❌ No            |
| Similar product already purchased elsewhere      | ❌ No            |

---

## 4. Subscription Refunds (Creator Pass)

### 4.1 Cancellation Policy

- You may cancel your Creator Pass subscription at any time
- Cancellation takes effect at the end of the current billing period
- You retain access to all Templates until the subscription expires

### 4.2 Refund Policy for Subscriptions

| Situation                                                | Refund                                                |
| -------------------------------------------------------- | ----------------------------------------------------- |
| Cancel within 14 days of initial purchase (no downloads) | ✅ Full refund                                        |
| Cancel after 14 days or after downloading templates      | ❌ No refund; access continues until period ends      |
| Renewal charge (if cancelled before renewal date)        | Renewal will not occur; no refund for previous period |

---

## 5. How to Request a Refund

### Step 1: Contact Us

Send an email to **soo.kate.yeon@gmail.com** with:

- Subject line: "Refund Request - [Your Order ID]"
- Your registered email address
- Order ID or transaction reference
- Reason for refund request

### Step 2: Review Process

We will review your request within **5 business days** and respond with:

- Approval and refund processing (if eligible)
- Denial with explanation (if not eligible)
- Request for additional information (if needed)

### Step 3: Refund Processing

Approved refunds are processed through **Paddle** (our payment processor) and typically appear within:

- Credit/debit cards: 5-10 business days
- PayPal: 3-5 business days

---

## 6. Chargebacks

If you initiate a chargeback (dispute) through your bank or payment provider without first contacting us:

- Your account may be suspended pending investigation
- If the chargeback is found to be unjustified (e.g., product was downloaded and used), we reserve the right to pursue appropriate remedies

We encourage you to contact us first to resolve any issues before initiating a chargeback.

---

## 7. Exceptions and Special Circumstances

In exceptional circumstances, we may offer refunds on a case-by-case basis. These include:

- Significant discrepancy between product description and actual product
- Extended service outages preventing product access
- Other circumstances at our sole discretion

---

## 8. Contact Us

For refund inquiries:

**Morak (모락)**  
Representative: Sooyeon Kim (김수연)  
Address: 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea  
Email: soo.kate.yeon@gmail.com

---

_This Refund Policy is provided in both English and Korean. In case of discrepancy, the Korean version shall prevail for users in the Republic of Korea._

--- SOURCE END ---
```
