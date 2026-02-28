# JA Translation Batch

## Scope

- scope: legal
- source_file: docs/legal/en/privacy-policy.md

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
source_file: docs/legal/en/privacy-policy.md

--- SOURCE START ---

# Privacy Policy

**Effective Date:** February 7, 2026  
**Last Updated:** February 7, 2026

---

## 1. Introduction

Morak ("**Company**," "**we**," "**us**," or "**our**") operates the Tekton service (the "**Service**"), an AI-powered design system engine and marketplace for premium React UI templates. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you use our Service.

**Data Controller:**

- **Business Name:** Morak (모락)
- **Representative:** Sooyeon Kim (김수연)
- **Address:** 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea
- **Contact:** soo.kate.yeon@gmail.com

By using our Service, you consent to the collection and use of your information in accordance with this Privacy Policy.

---

## 2. Personal Information We Collect

### 2.1 Information You Provide

| Data Type                                       | Purpose                         | Legal Basis          |
| ----------------------------------------------- | ------------------------------- | -------------------- |
| **Account Information** (email, name, password) | Account creation and management | Contract performance |
| **Payment Information** (processed by Paddle)   | Transaction processing          | Contract performance |
| **Communication Data** (support inquiries)      | Customer support                | Legitimate interest  |

### 2.2 Information Collected Automatically

| Data Type                                             | Purpose                       | Legal Basis         |
| ----------------------------------------------------- | ----------------------------- | ------------------- |
| **Usage Data** (pages visited, features used)         | Service improvement           | Legitimate interest |
| **Device Information** (browser type, OS, IP address) | Security and analytics        | Legitimate interest |
| **Cookies and Tracking Technologies**                 | Session management, analytics | Consent             |

---

## 3. How We Use Your Information

We use collected information to:

- Provide, maintain, and improve the Service
- Process transactions and send related information
- Send administrative notifications (account, security, updates)
- Respond to customer support requests
- Monitor and analyze usage patterns
- Detect and prevent fraudulent transactions

---

## 4. Data Retention

| Data Type              | Retention Period              |
| ---------------------- | ----------------------------- |
| Account Information    | Duration of account + 3 years |
| Transaction Records    | 5 years (legal requirement)   |
| Support Communications | 3 years                       |
| Usage/Analytics Data   | 2 years                       |

After the retention period, data is securely deleted or anonymized.

---

## 5. Your Rights

Under applicable data protection laws (including PIPA and GDPR), you have the right to:

| Right                | Description                                        |
| -------------------- | -------------------------------------------------- |
| **Access**           | Request a copy of your personal data               |
| **Correction**       | Request correction of inaccurate data              |
| **Deletion**         | Request deletion of your personal data             |
| **Portability**      | Receive your data in a machine-readable format     |
| **Objection**        | Object to processing based on legitimate interest  |
| **Withdraw Consent** | Withdraw consent where processing is consent-based |

To exercise these rights, contact us at **soo.kate.yeon@gmail.com**. We will respond within 30 days.

---

## 6. Cross-Border Data Transfers

Your personal information may be transferred to and processed in countries outside of the Republic of Korea by the following service providers:

| Service Provider | Country            | Purpose                     |
| ---------------- | ------------------ | --------------------------- |
| **Paddle**       | United Kingdom/USA | Payment processing          |
| **Supabase**     | USA                | Database and authentication |
| **Vercel**       | USA                | Website hosting             |

These transfers are necessary for contract performance. We ensure that appropriate safeguards are in place, including the service providers' compliance with equivalent data protection standards.

---

## 7. Cookies and Tracking Technologies

We use the following technologies:

| Type                  | Purpose                             | Duration      |
| --------------------- | ----------------------------------- | ------------- |
| **Essential Cookies** | Session management, authentication  | Session       |
| **Analytics Cookies** | Usage analysis, service improvement | Up to 2 years |

You can control cookies through your browser settings. Disabling essential cookies may affect Service functionality.

---

## 8. Data Security

We implement appropriate technical and organizational measures to protect your personal information, including:

- Encryption of data in transit (TLS/SSL)
- Secure authentication mechanisms
- Access controls and monitoring
- Regular security assessments

However, no method of transmission over the Internet is 100% secure. We cannot guarantee absolute security.

---

## 9. Children's Privacy

Our Service is not intended for individuals under the age of 14 (or 16 in the European Union). We do not knowingly collect personal information from children. If we become aware that we have collected data from a child, we will delete it promptly.

---

## 10. Third-Party Links

Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.

---

## 11. Changes to This Privacy Policy

We may update this Privacy Policy from time to time. We will notify you of any material changes by:

- Posting the updated policy on our website
- Sending an email notification (for registered users)

Your continued use of the Service after the changes take effect constitutes acceptance of the revised policy.

---

## 12. Contact Us

For privacy-related inquiries or to exercise your data rights:

**Morak (모락)**  
Representative: Sooyeon Kim (김수연)  
Address: 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea  
Email: soo.kate.yeon@gmail.com

---

_This Privacy Policy is provided in both English and Korean. In case of discrepancy, the Korean version shall prevail for users in the Republic of Korea._

--- SOURCE END ---
```
