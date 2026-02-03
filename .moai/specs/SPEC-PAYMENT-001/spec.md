---
id: SPEC-PAYMENT-001
version: "1.0.0"
status: draft
created: "2026-02-03"
updated: "2026-02-03"
author: soo-kate-yeon
priority: HIGH
dependencies:
  - SPEC-AUTH-001
---

## HISTORY

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2026-02-03 | 1.0.0 | 초안 작성 |

---

# SPEC-PAYMENT-001: Paddle 결제 통합

## 개요

Paddle 결제 시스템을 Studio 애플리케이션에 통합합니다. 3가지 가격 티어 (Single, Double, Creator Pass)를 지원하고, 웹훅을 통해 라이선스 관리를 자동화합니다.

---

## 요구사항 (EARS Format)

### Ubiquitous Requirements (항상 활성)

**[TAG-PAYMENT-001-U001]** 시스템은 Paddle을 결제 처리 제공자로 사용해야 한다.

**[TAG-PAYMENT-001-U002]** 시스템은 3가지 가격 티어를 지원해야 한다:
- Single: $59 (1개 템플릿, 1년 업데이트)
- Double: $99 (2개 템플릿, 1년 업데이트, 16% 할인)
- Creator Pass: $149/년 (전체 템플릿, 신규 템플릿 자동 추가)

**[TAG-PAYMENT-001-U003]** 모든 웹훅 요청은 서명 검증을 통해 보안 처리되어야 한다.

### Event-Driven Requirements (이벤트 기반)

**[TAG-PAYMENT-001-E001]** WHEN "Buy" 버튼 클릭 THEN Paddle 체크아웃 오버레이가 열린다.

**[TAG-PAYMENT-001-E002]** WHEN 결제 성공 웹훅 수신 THEN user_license 레코드를 생성하고 확인 이메일을 발송한다.

**[TAG-PAYMENT-001-E003]** WHEN 구독 갱신 웹훅 수신 THEN 라이선스 만료일을 1년 연장한다.

**[TAG-PAYMENT-001-E004]** WHEN 구독 취소 웹훅 수신 THEN 라이선스를 비활성화한다.

---

## 가격 정책

| 티어 | 가격 | 결제 유형 | 포함 내용 | 특징 |
|-----|------|----------|----------|------|
| Single Template | $59 | 일회성 | 1개 테마 템플릿 | 1년 업데이트 지원 |
| Double Package | $99 | 일회성 | 2개 테마 템플릿 | 1년 업데이트, 16% 할인 |
| Creator Pass | $149/년 | 구독 | 전체 테마 접근 | 신규 템플릿 자동 추가, 우선 지원 |

### 가격 책정 전략

- **Single**: 특정 테마만 필요한 개인 개발자
- **Double**: 2개 이상 테마가 필요한 프리랜서
- **Creator Pass**: 모든 테마가 필요한 에이전시/팀

---

## 결제 플로우

### 체크아웃 플로우

```
사용자                   Studio App              Paddle                  Webhook Handler
  |                          |                      |                          |
  |-- "Buy Single" 클릭 ---->|                      |                          |
  |                          |-- Open Checkout ---->|                          |
  |                          |                      |                          |
  |<-- Checkout Overlay -----|<---------------------|                          |
  |                          |                      |                          |
  |-- 결제 정보 입력 -------->|                      |                          |
  |                          |-------------------->|                          |
  |                          |                      |                          |
  |<-- 결제 완료 -------------|<---------------------|                          |
  |                          |                      |-- transaction.completed ->|
  |                          |                      |                          |
  |                          |<--------------------|<-- License Created -------|
  |                          |                      |                          |
  |<-- 확인 이메일 -----------|                      |                          |
```

### 구독 갱신 플로우

```
Paddle                  Webhook Handler             Database
  |                          |                          |
  |-- subscription.renewed ->|                          |
  |                          |-- Verify Signature       |
  |                          |                          |
  |                          |-- Update expires_at ---->|
  |                          |                          |
  |                          |-- Send Renewal Email     |
```

---

## API 엔드포인트

### POST /api/paddle/webhook

Paddle 웹훅을 처리합니다.

**Supported Events**:
- `transaction.completed`: 결제 완료
- `subscription.renewed`: 구독 갱신
- `subscription.canceled`: 구독 취소
- `subscription.past_due`: 결제 실패

**Webhook Payload (transaction.completed)**:
```typescript
interface PaddleTransactionCompletedEvent {
  event_type: 'transaction.completed';
  data: {
    id: string;
    customer_id: string;
    items: Array<{
      price_id: string;
      product_id: string;
    }>;
    custom_data: {
      user_id: string;
      theme_id: string;
      tier: 'single' | 'double' | 'creator';
    };
  };
}
```

**Response**:
```typescript
interface WebhookResponse {
  success: boolean;
  processed_event?: string;
  error?: string;
}
```

### POST /api/paddle/checkout

체크아웃 세션을 생성합니다.

**Request**:
```typescript
interface CheckoutRequest {
  tier: 'single' | 'double' | 'creator';
  theme_id: string;
  user_email: string;
}
```

**Response**:
```typescript
interface CheckoutResponse {
  checkout_url: string;
  transaction_id: string;
}
```

---

## 웹훅 서명 검증

```typescript
import crypto from 'crypto';

function verifyPaddleWebhook(
  payload: string,
  signature: string,
  secret: string
): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  );
}
```

---

## Paddle 제품 설정

### Products

| Product ID | 이름 | 설명 |
|------------|------|------|
| `pro_single_template` | Single Template | 단일 템플릿 라이선스 |
| `pro_double_package` | Double Package | 2개 템플릿 패키지 |
| `pro_creator_pass` | Creator Pass | 전체 접근 구독 |

### Prices

| Price ID | Product | 가격 | 결제 주기 |
|----------|---------|------|----------|
| `pri_single_59` | Single Template | $59 | 일회성 |
| `pri_double_99` | Double Package | $99 | 일회성 |
| `pri_creator_149` | Creator Pass | $149 | 연간 |

---

## 라이선스 관리 로직

### 라이선스 생성 (결제 완료 시)

```typescript
async function createLicense(event: PaddleTransactionCompletedEvent) {
  const { user_id, theme_id, tier } = event.data.custom_data;

  const expiresAt = new Date();
  expiresAt.setFullYear(expiresAt.getFullYear() + 1);

  await supabase.from('user_licenses').upsert({
    user_id,
    theme_id,
    tier,
    paddle_subscription_id: event.data.id,
    purchased_at: new Date(),
    expires_at: expiresAt,
    is_active: true,
  });
}
```

### 라이선스 갱신 (구독 갱신 시)

```typescript
async function renewLicense(subscriptionId: string) {
  const { data: license } = await supabase
    .from('user_licenses')
    .select('*')
    .eq('paddle_subscription_id', subscriptionId)
    .single();

  const newExpiresAt = new Date(license.expires_at);
  newExpiresAt.setFullYear(newExpiresAt.getFullYear() + 1);

  await supabase
    .from('user_licenses')
    .update({ expires_at: newExpiresAt })
    .eq('id', license.id);
}
```

### 라이선스 비활성화 (구독 취소 시)

```typescript
async function deactivateLicense(subscriptionId: string) {
  await supabase
    .from('user_licenses')
    .update({ is_active: false })
    .eq('paddle_subscription_id', subscriptionId);
}
```

---

## 이메일 알림

### 구매 확인 이메일

```
제목: [Tekton Studio] 구매해 주셔서 감사합니다!

안녕하세요 {user_name}님,

{theme_name} 템플릿 {tier} 라이선스를 구매해 주셔서 감사합니다.

라이선스 정보:
- 테마: {theme_name}
- 티어: {tier}
- 유효 기간: {expires_at}

MCP 설치 가이드: {guide_url}
```

### 갱신 확인 이메일

```
제목: [Tekton Studio] 구독이 갱신되었습니다

안녕하세요 {user_name}님,

Creator Pass 구독이 성공적으로 갱신되었습니다.

- 다음 결제일: {next_billing_date}
- 유효 기간: {new_expires_at}
```

---

## 기술 제약사항

- **Paddle SDK**: @paddle/paddle-js (클라이언트)
- **웹훅 보안**: HMAC SHA256 서명 검증
- **결제 테스트**: Paddle Sandbox 환경 사용
- **통화**: USD (고정)

---

## 관련 SPEC

- SPEC-AUTH-001: 사용자 인증 및 user_licenses 테이블 연동
- SPEC-MCP-005: 라이선스 검증 로직 공유
- SPEC-STUDIO-001: PricingSection UI 연동
