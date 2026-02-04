---
id: SPEC-PAYMENT-001
type: plan
version: "1.0.0"
created: "2026-02-03"
updated: "2026-02-03"
---

# SPEC-PAYMENT-001: 구현 계획

## Traceability Tags

- [TAG-PAYMENT-001-U001] ~ [TAG-PAYMENT-001-U003]: Ubiquitous Requirements
- [TAG-PAYMENT-001-E001] ~ [TAG-PAYMENT-001-E004]: Event-Driven Requirements

---

## 마일스톤

### Phase 1: Paddle 계정 및 제품 설정 (Primary Goal)

**목표**: Paddle 대시보드에서 제품 및 가격 구성

**작업 항목**:
- [ ] Paddle 계정 생성 및 Sandbox 설정
- [ ] 3개 제품 생성 (Single, Double, Creator Pass) [TAG-PAYMENT-001-U002]
- [ ] 가격 설정 ($59, $99, $149/년)
- [ ] 웹훅 엔드포인트 등록
- [ ] API Key 및 Secret 발급

**Paddle 대시보드 설정**:
| 항목 | 값 |
|------|-----|
| Product 1 | Single Template ($59) |
| Product 2 | Double Package ($99) |
| Product 3 | Creator Pass ($149/year) |
| Webhook URL | https://yourdomain.com/api/paddle/webhook |

### Phase 2: Paddle SDK 통합 (Primary Goal)

**목표**: 클라이언트 측 Paddle SDK 설정

**작업 항목**:
- [ ] @paddle/paddle-js 패키지 설치 [TAG-PAYMENT-001-U001]
- [ ] Paddle 초기화 설정
- [ ] 체크아웃 함수 구현 [TAG-PAYMENT-001-E001]
- [ ] 환경 변수 설정 (Vendor ID, API Key)

**코드 구조**:
```typescript
// lib/paddle/client.ts
import { Paddle, initializePaddle } from '@paddle/paddle-js';

let paddleInstance: Paddle | undefined;

export async function getPaddle(): Promise<Paddle> {
  if (!paddleInstance) {
    paddleInstance = await initializePaddle({
      environment: process.env.NODE_ENV === 'production'
        ? 'production'
        : 'sandbox',
      token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN!,
    });
  }
  return paddleInstance;
}
```

### Phase 3: 체크아웃 플로우 구현 (Primary Goal)

**목표**: PricingCard에서 Paddle 체크아웃 연동

**작업 항목**:
- [ ] 체크아웃 버튼 클릭 핸들러 구현
- [ ] Custom Data 전달 (user_id, theme_id, tier)
- [ ] 체크아웃 완료 콜백 처리
- [ ] 에러 핸들링 (결제 실패, 취소)

**체크아웃 구현**:
```typescript
// hooks/usePaddleCheckout.ts
import { useAuth } from '@/hooks/useAuth';
import { getPaddle } from '@/lib/paddle/client';

interface CheckoutOptions {
  tier: 'single' | 'double' | 'creator';
  themeId: string;
}

export function usePaddleCheckout() {
  const { user } = useAuth();

  const openCheckout = async ({ tier, themeId }: CheckoutOptions) => {
    if (!user) {
      // 로그인 필요 알림
      return;
    }

    const paddle = await getPaddle();
    const priceId = getPriceId(tier);

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      customData: {
        user_id: user.id,
        theme_id: themeId,
        tier,
      },
      customer: {
        email: user.email,
      },
    });
  };

  return { openCheckout };
}
```

### Phase 4: 웹훅 핸들러 구현 (Secondary Goal)

**목표**: Paddle 웹훅 수신 및 처리

**작업 항목**:
- [ ] /api/paddle/webhook 엔드포인트 생성 [TAG-PAYMENT-001-U003]
- [ ] 서명 검증 미들웨어 구현
- [ ] transaction.completed 이벤트 처리 [TAG-PAYMENT-001-E002]
- [ ] subscription.renewed 이벤트 처리 [TAG-PAYMENT-001-E003]
- [ ] subscription.canceled 이벤트 처리 [TAG-PAYMENT-001-E004]

**웹훅 핸들러 구조**:
```typescript
// app/api/paddle/webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/paddle/verify';
import { handleTransactionCompleted } from '@/lib/paddle/handlers/transaction';
import { handleSubscriptionRenewed, handleSubscriptionCanceled } from '@/lib/paddle/handlers/subscription';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('paddle-signature');
  const body = await request.text();

  // 서명 검증
  if (!verifyWebhookSignature(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  const event = JSON.parse(body);

  switch (event.event_type) {
    case 'transaction.completed':
      await handleTransactionCompleted(event);
      break;
    case 'subscription.renewed':
      await handleSubscriptionRenewed(event);
      break;
    case 'subscription.canceled':
      await handleSubscriptionCanceled(event);
      break;
  }

  return NextResponse.json({ success: true });
}
```

### Phase 5: 라이선스 생성 로직 구현 (Secondary Goal)

**목표**: 결제 완료 시 라이선스 자동 생성

**작업 항목**:
- [ ] 라이선스 생성 함수 구현 [TAG-PAYMENT-001-E002]
- [ ] 라이선스 갱신 함수 구현 [TAG-PAYMENT-001-E003]
- [ ] 라이선스 비활성화 함수 구현 [TAG-PAYMENT-001-E004]
- [ ] 중복 처리 방지 (idempotency)

**라이선스 관리 서비스**:
```typescript
// lib/services/licenseService.ts
import { createServerClient } from '@/lib/supabase/server';

export class LicenseService {
  private supabase = createServerClient();

  async createLicense(data: CreateLicenseData): Promise<License> {
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    const { data: license, error } = await this.supabase
      .from('user_licenses')
      .upsert({
        user_id: data.userId,
        theme_id: data.themeId,
        tier: data.tier,
        paddle_subscription_id: data.subscriptionId,
        purchased_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        is_active: true,
      })
      .select()
      .single();

    if (error) throw error;
    return license;
  }

  async renewLicense(subscriptionId: string): Promise<void> {
    // 구현
  }

  async deactivateLicense(subscriptionId: string): Promise<void> {
    // 구현
  }
}
```

### Phase 6: 이메일 알림 구현 (Final Goal)

**목표**: 구매/갱신/취소 알림 이메일 발송

**작업 항목**:
- [ ] 이메일 서비스 선택 (Resend, SendGrid 등)
- [ ] 구매 확인 이메일 템플릿 [TAG-PAYMENT-001-E002]
- [ ] 갱신 확인 이메일 템플릿 [TAG-PAYMENT-001-E003]
- [ ] 취소 알림 이메일 템플릿 [TAG-PAYMENT-001-E004]

**이메일 서비스**:
```typescript
// lib/services/emailService.ts
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendPurchaseConfirmation(data: {
  email: string;
  userName: string;
  themeName: string;
  tier: string;
  expiresAt: Date;
}) {
  await resend.emails.send({
    from: 'Tekton Studio <noreply@tekton.studio>',
    to: data.email,
    subject: '[Tekton Studio] 구매해 주셔서 감사합니다!',
    html: renderPurchaseEmail(data),
  });
}
```

---

## 기술 접근 방식

### 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (Browser)                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │ PricingCard   │  │ usePaddle     │  │ Paddle SDK    │   │
│  │ Component     │->│ Checkout      │->│ (Overlay)     │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        Paddle                                │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │ Checkout      │  │ Payment       │  │ Webhooks      │   │
│  │ Processing    │->│ Processing    │->│ Dispatcher    │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Server (Next.js)                         │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │ Webhook       │  │ License       │  │ Email         │   │
│  │ Handler       │->│ Service       │->│ Service       │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     Database (Supabase)                      │
│  ┌───────────────┐  ┌───────────────┐                       │
│  │ user_licenses │  │ auth.users    │                       │
│  └───────────────┘  └───────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

### 보안 고려사항

1. **웹훅 서명 검증**: 모든 웹훅 요청에 대해 HMAC 서명 검증
2. **HTTPS 강제**: 웹훅 URL은 HTTPS만 허용
3. **Idempotency**: 중복 웹훅 처리 방지 (transaction_id 기반)
4. **환경 분리**: Sandbox/Production 환경 분리

---

## 위험 요소 및 대응 방안

| 위험 요소 | 영향도 | 대응 방안 |
|----------|--------|----------|
| 웹훅 전달 실패 | 높음 | Paddle Retry 정책 활용, 수동 재처리 API |
| 서명 검증 실패 | 중간 | 상세 로깅, Secret Key 재발급 절차 문서화 |
| 중복 결제 처리 | 높음 | Transaction ID 기반 idempotency 체크 |
| 환불 처리 | 중간 | 웹훅 이벤트 처리, 라이선스 비활성화 |

---

## 의존성

### 선행 조건
- SPEC-AUTH-001: 사용자 인증 및 user_licenses 테이블

### 후속 작업
- SPEC-STUDIO-001: PricingSection UI 연동
- SPEC-MCP-005: 라이선스 검증 로직

---

## 환경 변수

```env
# Paddle
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=test_xxxx
PADDLE_API_KEY=xxxx
PADDLE_WEBHOOK_SECRET=pdl_whsec_xxxx

# Email (Resend)
RESEND_API_KEY=re_xxxx
```

---

## 테스트 전략

### Sandbox 테스트

1. Paddle Sandbox 환경에서 테스트 카드 사용
2. 모든 웹훅 이벤트 시뮬레이션
3. 라이선스 생성/갱신/취소 플로우 검증

### 테스트 카드 번호

| 카드 번호 | 결과 |
|----------|------|
| 4242 4242 4242 4242 | 성공 |
| 4000 0000 0000 0002 | 거절 |
| 4000 0000 0000 3220 | 3D Secure |
