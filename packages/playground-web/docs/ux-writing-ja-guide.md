# Japanese UX Writing Guide (Landing/Pricing/Explore/Template)

## Purpose

landing / pricing / explore / template 화면의 일본어 카피를 일관된 품질 기준으로 관리합니다.

## Style Direction

- Tone: concise, clear, warm
- Base style: です/ます調
- Avoid: translationese, passive-heavy phrasing, excessive keigo

## Core Rules

1. 不要な主語(あなた/私たち)を削除します。
2. 「〜することができます」を使わず、短い動詞表現にします。
3. 過度な敬語(くださいませ/お願い申し上げます)は使いません。
4. 受け身(〜されます)を減らし、能動を優先します。
5. ボタンは短く、行動がわかる語を使います。
6. 名詞連鎖(〜の〜の〜)を減らして自然な語順にします。

## Learned Exceptions (from KO rollout)

- 질문형(確認しますか？ / 削除しますか？)은 UX에서 자연스러운 패턴이므로 금지하지 않습니다.
- 버튼/탭/짧은 레이블은 문장 종결형이 아니어도 허용합니다.
- 법률/약관 문구는 이 가이드보다 정확성과 법적 의미를 우선합니다.

## QC Command

```bash
node packages/playground-web/scripts/check-ja-ux-tone.mjs
```
