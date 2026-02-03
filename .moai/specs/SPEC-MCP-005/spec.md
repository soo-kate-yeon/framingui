---
id: SPEC-MCP-005
version: "1.0.0"
status: draft
created: "2026-02-03"
updated: "2026-02-03"
author: soo-kate-yeon
priority: MEDIUM
dependencies:
  - SPEC-AUTH-001
  - SPEC-PAYMENT-001
---

## HISTORY

| 날짜 | 버전 | 변경 내용 |
|------|------|----------|
| 2026-02-03 | 1.0.0 | 초안 작성 |

---

# SPEC-MCP-005: MCP Free Tier 라이선스 로직

## 개요

MCP (Model Context Protocol) 서버에서 사용자 라이선스에 따른 템플릿 접근 제어를 구현합니다. 무료 템플릿은 모든 사용자에게 제공하고, 프리미엄 템플릿은 라이선스 보유자에게만 제공합니다.

---

## 요구사항 (EARS Format)

### Ubiquitous Requirements (항상 활성)

**[TAG-MCP-005-U001]** 시스템은 프리미엄 ScreenTemplate 제공 전 사용자 라이선스를 확인해야 한다.

**[TAG-MCP-005-U002]** 무료 ScreenTemplate은 항상 모든 사용자에게 접근이 허용되어야 한다.
- 무료 템플릿: LandingBasic, SignUp, Contact Form

**[TAG-MCP-005-U003]** 접근 제한 시 코딩 에이전트(Cursor, Claude)가 이해할 수 있는 가이드 메시지를 반환해야 한다.

### Event-Driven Requirements (이벤트 기반)

**[TAG-MCP-005-E001]** WHEN 무료 사용자가 템플릿 목록 요청 THEN 무료 템플릿을 먼저 표시하고 프리미엄 템플릿은 잠금 상태로 표시한다.

**[TAG-MCP-005-E002]** WHEN 무료 사용자가 프리미엄 템플릿 요청 THEN 접근을 거부하고 업그레이드 메시지를 반환한다.

**[TAG-MCP-005-E003]** WHEN 라이선스 사용자가 템플릿 요청 THEN 라이선스를 검증하고 해당 티어에 맞는 템플릿 접근을 허용한다.

### State-Driven Requirements (상태 기반)

**[TAG-MCP-005-S001]** IF Creator Pass 보유 THEN 모든 테마의 모든 템플릿에 접근 가능해야 한다.

**[TAG-MCP-005-S002]** IF Single/Double 라이선스 보유 THEN 구매한 테마의 템플릿만 접근 가능해야 한다.

**[TAG-MCP-005-S003]** IF 라이선스가 만료됨 THEN 무료 사용자로 취급하고 갱신 프롬프트를 표시해야 한다.

---

## 무료 템플릿 목록

| Template ID | 이름 | 설명 | 테마 |
|-------------|------|------|------|
| `landing-basic` | Landing Basic | 기본 랜딩 페이지 | 공통 |
| `signup` | Sign Up | 회원가입 페이지 | 공통 |
| `contact-form` | Contact Form | 문의 양식 페이지 | 공통 |

---

## 라이선스 검증 플로우

### 템플릿 접근 검증 플로우

```
MCP Client              MCP Server              License Service         Database
    |                       |                          |                    |
    |-- get_template() ---->|                          |                    |
    |                       |-- checkLicense() ------->|                    |
    |                       |                          |-- query licenses ->|
    |                       |                          |<-- license data ---|
    |                       |<-- LicenseResult --------|                    |
    |                       |                          |                    |
    |                       |-- (허용/거부 결정)        |                    |
    |<-- Response ----------|                          |                    |
```

### 라이선스 검증 로직

```typescript
interface LicenseCheckResult {
  hasAccess: boolean;
  tier: 'free' | 'single' | 'double' | 'creator' | null;
  expiresAt: Date | null;
  reason?: string;
}

async function checkTemplateAccess(
  userId: string | null,
  themeId: string,
  templateId: string
): Promise<LicenseCheckResult> {
  // 1. 무료 템플릿 확인
  if (isFreeTemplate(templateId)) {
    return { hasAccess: true, tier: 'free', expiresAt: null };
  }

  // 2. 비인증 사용자
  if (!userId) {
    return {
      hasAccess: false,
      tier: null,
      expiresAt: null,
      reason: 'AUTHENTICATION_REQUIRED',
    };
  }

  // 3. 라이선스 조회
  const license = await getLicenseForUser(userId, themeId);

  // 4. 라이선스 없음
  if (!license) {
    return {
      hasAccess: false,
      tier: null,
      expiresAt: null,
      reason: 'NO_LICENSE',
    };
  }

  // 5. 라이선스 만료
  if (license.expires_at < new Date()) {
    return {
      hasAccess: false,
      tier: license.tier,
      expiresAt: license.expires_at,
      reason: 'LICENSE_EXPIRED',
    };
  }

  // 6. Creator Pass - 모든 접근 허용
  if (license.tier === 'creator') {
    return {
      hasAccess: true,
      tier: 'creator',
      expiresAt: license.expires_at,
    };
  }

  // 7. Single/Double - 해당 테마만 접근
  if (license.theme_id === themeId) {
    return {
      hasAccess: true,
      tier: license.tier,
      expiresAt: license.expires_at,
    };
  }

  return {
    hasAccess: false,
    tier: license.tier,
    expiresAt: license.expires_at,
    reason: 'THEME_NOT_LICENSED',
  };
}
```

---

## MCP 응답 형식

### 접근 허용 응답

```typescript
interface TemplateAccessGranted {
  success: true;
  template: {
    id: string;
    name: string;
    code: string;
    props: Record<string, unknown>;
  };
  license: {
    tier: 'free' | 'single' | 'double' | 'creator';
    expiresAt: string | null;
  };
}
```

### 접근 거부 응답

```typescript
interface TemplateAccessDenied {
  success: false;
  error: 'TEMPLATE_ACCESS_DENIED' | 'AUTHENTICATION_REQUIRED' | 'LICENSE_EXPIRED';
  message: string;
  freeAlternatives: string[];
  upgradeUrl: string;
  details?: {
    requestedTemplate: string;
    requiredTier: string;
    currentTier: string | null;
  };
}
```

### 에러 코드별 메시지

| 에러 코드 | 메시지 (한국어) | 메시지 (영어) |
|----------|----------------|---------------|
| `AUTHENTICATION_REQUIRED` | 이 템플릿을 사용하려면 로그인이 필요합니다. | Authentication required to access this template. |
| `TEMPLATE_ACCESS_DENIED` | 이 템플릿은 라이선스가 필요합니다. | This template requires a license. |
| `LICENSE_EXPIRED` | 라이선스가 만료되었습니다. 갱신하세요. | Your license has expired. Please renew. |
| `THEME_NOT_LICENSED` | 이 테마의 라이선스가 없습니다. | You don't have a license for this theme. |

---

## MCP 도구 수정

### list_templates 도구

```typescript
// 수정 전: 모든 템플릿 반환
// 수정 후: 라이선스에 따라 필터링/표시

interface ListTemplatesResponse {
  templates: Array<{
    id: string;
    name: string;
    description: string;
    isFree: boolean;
    isLocked: boolean;
    requiredTier?: string;
  }>;
  userTier: 'free' | 'single' | 'double' | 'creator';
}
```

### get_template 도구

```typescript
// 수정 전: 템플릿 코드 직접 반환
// 수정 후: 라이선스 확인 후 반환 또는 거부

async function getTemplate(
  templateId: string,
  themeId: string,
  authToken?: string
): Promise<TemplateAccessGranted | TemplateAccessDenied> {
  const userId = authToken ? await verifyToken(authToken) : null;
  const accessResult = await checkTemplateAccess(userId, themeId, templateId);

  if (!accessResult.hasAccess) {
    return {
      success: false,
      error: mapReasonToError(accessResult.reason),
      message: getErrorMessage(accessResult.reason),
      freeAlternatives: ['landing-basic', 'signup', 'contact-form'],
      upgradeUrl: `/studio/template/${themeId}#pricing`,
      details: {
        requestedTemplate: templateId,
        requiredTier: 'single',
        currentTier: accessResult.tier,
      },
    };
  }

  const template = await fetchTemplate(templateId, themeId);
  return {
    success: true,
    template,
    license: {
      tier: accessResult.tier,
      expiresAt: accessResult.expiresAt?.toISOString() ?? null,
    },
  };
}
```

---

## AI 에이전트 친화적 응답

MCP 응답은 Cursor, Claude 등의 코딩 에이전트가 이해하고 사용자에게 적절히 안내할 수 있도록 설계됩니다.

### 거부 응답 예시

```json
{
  "success": false,
  "error": "TEMPLATE_ACCESS_DENIED",
  "message": "이 템플릿은 라이선스가 필요합니다. 무료 대안을 사용하거나 라이선스를 구매하세요.",
  "freeAlternatives": ["landing-basic", "signup", "contact-form"],
  "upgradeUrl": "/studio/template/neutral-theme#pricing",
  "details": {
    "requestedTemplate": "dashboard-analytics",
    "requiredTier": "single",
    "currentTier": null
  }
}
```

### AI 에이전트 행동 가이드

거부 응답을 받은 AI 에이전트는:
1. 사용자에게 라이선스 요구사항을 설명
2. 무료 대안 템플릿 제안
3. 라이선스 구매 링크 제공
4. 필요시 무료 템플릿으로 대체하여 작업 계속

---

## 기술 제약사항

- **인증**: Supabase Auth JWT 토큰
- **캐싱**: 라이선스 상태 5분 캐시 (Redis 또는 인메모리)
- **타임아웃**: 라이선스 검증 500ms 이내
- **폴백**: 검증 실패 시 접근 거부 (fail-closed)

---

## 관련 SPEC

- SPEC-AUTH-001: 사용자 인증 및 MCP 토큰 발급
- SPEC-PAYMENT-001: 라이선스 생성 및 만료 관리
