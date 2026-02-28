# JA Translation Batch

## Scope

- scope: legal
- source_file: docs/legal/en/terms-of-service.md

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
source_file: docs/legal/en/terms-of-service.md

--- SOURCE START ---

# Terms of Service

**Effective Date:** February 7, 2026  
**Last Updated:** February 7, 2026

---

## 1. Introduction and Agreement

Welcome to Tekton. These Terms of Service ("**Terms**") constitute a legally binding agreement between you ("**User**," "**you**," or "**your**") and Morak ("**Company**," "**we**," "**us**," or "**our**").

**Service Provider:**

- **Business Name:** Morak (모락)
- **Representative:** Sooyeon Kim (김수연)
- **Address:** 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea
- **Contact:** soo.kate.yeon@gmail.com

**By accessing or using our Service, you agree to be bound by these Terms.** If you do not agree, do not use the Service.

---

## 2. Definitions

- **"Service"**: The Tekton platform, including the website, design system engine, and template marketplace.
- **"Template"**: Any React UI component, design asset, or code package available for purchase or download.
- **"License"**: The rights granted to you upon purchase of a Template.
- **"Subscription"**: The Creator Pass annual subscription plan.
- **"Account"**: Your registered user account on the Service.

---

## 3. Account Registration

### 3.1 Eligibility

You must be at least 18 years old (or the age of majority in your jurisdiction) to create an Account.

### 3.2 Account Security

You are responsible for:

- Maintaining the confidentiality of your account credentials
- All activities that occur under your Account
- Notifying us immediately of any unauthorized access

### 3.3 Account Termination

We reserve the right to suspend or terminate your Account if you violate these Terms.

---

## 4. Products and Services

### 4.1 Product Description

Tekton provides:

- Premium React UI templates and component libraries
- AI-powered design system engine
- Design tokens with WCAG compliance

### 4.2 Delivery Method

All products are digital goods delivered via electronic download. No physical products are shipped.

### 4.3 Updates

Purchased Templates include updates for the duration specified in the applicable plan:

- **Single Template / Double Package**: 1 year of updates from purchase date
- **Creator Pass**: Updates during active subscription period

---

## 5. Pricing and Payment

### 5.1 Pricing Plans

| Plan            | Price              | Includes                             |
| --------------- | ------------------ | ------------------------------------ |
| Single Template | Varies by template | 1 template + 1 year updates          |
| Double Package  | $99 (fixed)        | 2 templates + 1 year updates         |
| Creator Pass    | $149/year (fixed)  | All templates + subscription updates |

**Single Template Pricing:** Individual templates are priced based on their scope and complexity. Current pricing is displayed on each product page at the time of purchase.

### 5.2 Payment Processing

All payments are processed through **Paddle** (our Merchant of Record). By making a purchase, you also agree to Paddle's terms of service.

### 5.3 Subscription Terms

- Creator Pass subscriptions automatically renew annually unless cancelled
- You may cancel at any time through your account settings
- Cancellation takes effect at the end of the current billing period

### 5.4 Currency and Taxes

Prices are in USD. Applicable taxes (including VAT) are calculated and collected by Paddle based on your location.

---

## 6. License Grant

### 6.1 Permitted Uses

Upon valid purchase, we grant you a **non-exclusive, non-transferable license** to:

- Use Templates in unlimited personal projects
- Use Templates in client projects (final deliverables only)
- Modify Templates for your own use

### 6.2 Restrictions

You may **NOT**:

- Resell, redistribute, or sublicense Templates (in original or modified form)
- Share Templates with individuals who have not purchased a license
- Use Templates to create competing template/UI kit products
- Remove or alter copyright notices

### 6.3 License Scope

- **Single Template / Double Package**: License is perpetual for purchased Templates, updates limited to 1 year
- **Creator Pass**: Access to all Templates valid only during active subscription; downloaded Templates may be used perpetually

---

## 7. Intellectual Property

### 7.1 Our Ownership

All Templates, design assets, code, and the Tekton platform remain the exclusive property of Morak. Your purchase grants a license, not ownership.

### 7.2 User Content

You retain ownership of any original content you create using our Templates. We do not claim rights over your projects.

---

## 8. Disclaimer of Warranties

**PLEASE READ THIS SECTION CAREFULLY. IT LIMITS OUR OBLIGATIONS TO YOU.**

THE SERVICE AND ALL TEMPLATES ARE PROVIDED "AS-IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.

WE DO NOT WARRANT THAT:

- THE SERVICE WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
- TEMPLATES WILL MEET YOUR SPECIFIC REQUIREMENTS OR EXPECTATIONS
- TEMPLATES ARE FREE FROM DEFECTS, BUGS, OR SECURITY VULNERABILITIES
- ANY ERRORS OR DEFECTS WILL BE CORRECTED
- THE SERVICE OR SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS

YOUR USE OF THE SERVICE AND ANY TEMPLATES IS AT YOUR OWN RISK. YOU ARE SOLELY RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR LOSS OF DATA THAT RESULTS FROM SUCH USE.

---

## 9. Limitation of Liability

**PLEASE READ THIS SECTION CAREFULLY. IT LIMITS OUR LIABILITY TO YOU.**

TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MORAK, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, OR LICENSORS BE LIABLE FOR:

- ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES
- ANY LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITIES
- ANY LOSS OR DAMAGE ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE OR TEMPLATES
- ANY UNAUTHORIZED ACCESS TO OR ALTERATION OF YOUR DATA OR TRANSMISSIONS
- ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE

THIS LIMITATION APPLIES WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, EVEN IF MORAK HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

**MAXIMUM LIABILITY:** IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THE SERVICE EXCEED THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM.

SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE GREATEST EXTENT PERMITTED BY LAW.

---

## 10. Copyright Infringement / DMCA Notice

### 10.1 Respect for Intellectual Property

Morak respects the intellectual property rights of others and expects users of the Service to do the same. We will respond to notices of alleged copyright infringement that comply with applicable law and are properly submitted to us.

### 10.2 DMCA Notification Procedure

If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement, please provide our Copyright Agent with the following information in accordance with the Digital Millennium Copyright Act ("DMCA"):

1. **Identification** of the copyrighted work claimed to have been infringed
2. **Identification** of the material that is claimed to be infringing or to be the subject of infringing activity, with enough detail so that we can locate it on the Service
3. **Your contact information**, including your address, telephone number, and email address
4. **A statement** that you have a good faith belief that the disputed use is not authorized by the copyright owner, its agent, or the law
5. **A statement**, made under penalty of perjury, that the information in your notification is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf
6. **Your physical or electronic signature**

### 10.3 Designated Copyright Agent

Please send DMCA notices to:

**Morak - Copyright Agent**  
Sooyeon Kim  
30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea  
Email: soo.kate.yeon@gmail.com  
Subject Line: "DMCA Notice"

### 10.4 Counter-Notification

If you believe that the material you posted was removed by mistake or misidentification, you may submit a counter-notification to our Copyright Agent containing the information required by the DMCA. Upon receipt of a valid counter-notification, we may reinstate the removed material in accordance with the DMCA.

### 10.5 Repeat Infringers

We reserve the right to terminate the accounts of users who are determined to be repeat infringers.

---

## 11. Acceptable Use

You agree not to:

- Use the Service for any illegal purpose
- Attempt to gain unauthorized access to the Service
- Interfere with or disrupt the Service
- Upload malicious code or content

---

## 12. Third-Party Services

The Service integrates with third-party services including:

- **Paddle**: Payment processing
- **Supabase**: Authentication and database
- **Vercel**: Hosting

We are not responsible for the availability or practices of these third-party services.

---

## 13. Force Majeure

We shall not be liable for any failure or delay in performing our obligations due to circumstances beyond our reasonable control, including natural disasters, war, terrorism, strikes, or internet outages.

---

## 14. Termination

### 14.1 By You

You may terminate your Account at any time by contacting us at soo.kate.yeon@gmail.com.

### 14.2 By Us

We may terminate or suspend your access immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users.

### 14.3 Effect of Termination

Upon termination:

- Your right to access the Service ceases
- Previously downloaded Templates under valid licenses may continue to be used
- We may delete your Account data after a reasonable period

---

## 15. Changes to Terms

We may modify these Terms at any time. Material changes will be notified via:

- Email to registered users
- Prominent notice on our website

Continued use after changes take effect constitutes acceptance.

---

## 16. Governing Law and Disputes

### 16.1 Governing Law

These Terms shall be governed by the laws of the **Republic of Korea**, without regard to conflict of law principles.

### 16.2 Dispute Resolution

Any disputes shall be resolved through:

1. Good-faith negotiation between the parties
2. If unresolved, binding arbitration in Incheon, Republic of Korea, or the competent courts of Korea

---

## 17. Severability

If any provision of these Terms is found to be unenforceable, the remaining provisions shall continue in full force and effect.

---

## 18. Entire Agreement

These Terms, together with our Privacy Policy and Refund Policy, constitute the entire agreement between you and Morak regarding the Service.

---

## 19. Contact Us

For questions about these Terms:

**Morak (모락)**  
Representative: Sooyeon Kim (김수연)  
Address: 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea  
Email: soo.kate.yeon@gmail.com

---

_These Terms are provided in both English and Korean. In case of discrepancy, the Korean version shall prevail for users in the Republic of Korea._

--- SOURCE END ---
```
