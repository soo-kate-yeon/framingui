---
id: SPEC-MCP-005
type: plan
version: "1.0.0"
created: "2026-02-03"
updated: "2026-02-03"
---

# SPEC-MCP-005: 구현 계획

## Traceability Tags

- [TAG-MCP-005-U001] ~ [TAG-MCP-005-U003]: Ubiquitous Requirements
- [TAG-MCP-005-E001] ~ [TAG-MCP-005-E003]: Event-Driven Requirements
- [TAG-MCP-005-S001] ~ [TAG-MCP-005-S003]: State-Driven Requirements

---

## 마일스톤

### Phase 1: 라이선스 검증 서비스 구현 (Primary Goal)

**목표**: 핵심 라이선스 검증 로직 구현

**작업 항목**:
- [ ] LicenseService 클래스 생성 [TAG-MCP-005-U001]
- [ ] checkTemplateAccess 함수 구현
- [ ] isFreeTemplate 헬퍼 함수 구현 [TAG-MCP-005-U002]
- [ ] 라이선스 조회 쿼리 최적화
- [ ] 라이선스 캐싱 로직 구현

**코드 구조**:
```typescript
// lib/services/licenseService.ts
export class LicenseService {
  private cache: Map<string, CachedLicense> = new Map();
  private CACHE_TTL = 5 * 60 * 1000; // 5분

  async checkTemplateAccess(
    userId: string | null,
    themeId: string,
    templateId: string
  ): Promise<LicenseCheckResult>;

  async getLicenseForUser(
    userId: string,
    themeId: string
  ): Promise<License | null>;

  private isFreeTemplate(templateId: string): boolean;
  private getCachedLicense(key: string): License | null;
  private setCachedLicense(key: string, license: License): void;
}
```

### Phase 2: 무료 템플릿 관리 구현 (Primary Goal)

**목표**: 무료 템플릿 목록 관리 및 조회

**작업 항목**:
- [ ] free_screen_templates 테이블 조회 로직 [TAG-MCP-005-U002]
- [ ] 무료 템플릿 목록 캐싱
- [ ] isFreeTemplate 데이터베이스 연동
- [ ] 무료 템플릿 관리 어드민 API (선택사항)

**무료 템플릿 상수**:
```typescript
// lib/constants/freeTemplates.ts
export const FREE_TEMPLATES = [
  'landing-basic',
  'signup',
  'contact-form',
] as const;

export type FreeTemplateId = typeof FREE_TEMPLATES[number];

export function isFreeTemplate(templateId: string): boolean {
  return FREE_TEMPLATES.includes(templateId as FreeTemplateId);
}
```

### Phase 3: MCP list_templates 도구 수정 (Secondary Goal)

**목표**: 라이선스에 따른 템플릿 목록 필터링

**작업 항목**:
- [ ] list_templates 응답 형식 수정 [TAG-MCP-005-E001]
- [ ] 무료 템플릿 우선 정렬
- [ ] 잠금 상태(isLocked) 표시
- [ ] 필요 티어(requiredTier) 표시

**수정된 list_templates**:
```typescript
// mcp/tools/listTemplates.ts
export async function listTemplates(
  themeId: string,
  authToken?: string
): Promise<ListTemplatesResponse> {
  const userId = authToken ? await verifyToken(authToken) : null;
  const userLicense = userId
    ? await licenseService.getLicenseForUser(userId, themeId)
    : null;

  const allTemplates = await getTemplatesByTheme(themeId);

  const templates = allTemplates.map(template => {
    const isFree = isFreeTemplate(template.id);
    const hasAccess = isFree || checkAccess(userLicense, template);

    return {
      id: template.id,
      name: template.name,
      description: template.description,
      isFree,
      isLocked: !hasAccess,
      requiredTier: isFree ? undefined : 'single',
    };
  });

  // 무료 템플릿 우선 정렬
  templates.sort((a, b) => {
    if (a.isFree && !b.isFree) return -1;
    if (!a.isFree && b.isFree) return 1;
    return 0;
  });

  return {
    templates,
    userTier: userLicense?.tier ?? 'free',
  };
}
```

### Phase 4: MCP get_template 도구 수정 (Secondary Goal)

**목표**: 라이선스 검증 후 템플릿 반환

**작업 항목**:
- [ ] get_template 라이선스 검증 추가 [TAG-MCP-005-E002, E003]
- [ ] 접근 거부 응답 형식 구현 [TAG-MCP-005-U003]
- [ ] 무료 대안 제안 로직
- [ ] 업그레이드 URL 생성

**수정된 get_template**:
```typescript
// mcp/tools/getTemplate.ts
export async function getTemplate(
  templateId: string,
  themeId: string,
  authToken?: string
): Promise<TemplateAccessGranted | TemplateAccessDenied> {
  const userId = authToken ? await verifyToken(authToken) : null;

  const accessResult = await licenseService.checkTemplateAccess(
    userId,
    themeId,
    templateId
  );

  if (!accessResult.hasAccess) {
    return createAccessDeniedResponse(accessResult, templateId, themeId);
  }

  const template = await fetchTemplate(templateId, themeId);

  return {
    success: true,
    template,
    license: {
      tier: accessResult.tier!,
      expiresAt: accessResult.expiresAt?.toISOString() ?? null,
    },
  };
}

function createAccessDeniedResponse(
  result: LicenseCheckResult,
  templateId: string,
  themeId: string
): TemplateAccessDenied {
  return {
    success: false,
    error: mapReasonToError(result.reason!),
    message: getErrorMessage(result.reason!),
    freeAlternatives: ['landing-basic', 'signup', 'contact-form'],
    upgradeUrl: `/studio/template/${themeId}#pricing`,
    details: {
      requestedTemplate: templateId,
      requiredTier: 'single',
      currentTier: result.tier,
    },
  };
}
```

### Phase 5: 에러 메시지 및 국제화 (Secondary Goal)

**목표**: AI 에이전트 친화적 에러 메시지

**작업 항목**:
- [ ] 에러 코드별 메시지 정의 [TAG-MCP-005-U003]
- [ ] 다국어 메시지 지원 (영어/한국어)
- [ ] 구조화된 에러 응답 검증

**에러 메시지 모듈**:
```typescript
// lib/messages/licenseErrors.ts
export const LICENSE_ERROR_MESSAGES = {
  AUTHENTICATION_REQUIRED: {
    en: 'Authentication required to access this template.',
    ko: '이 템플릿을 사용하려면 로그인이 필요합니다.',
  },
  TEMPLATE_ACCESS_DENIED: {
    en: 'This template requires a license. Use free alternatives or purchase a license.',
    ko: '이 템플릿은 라이선스가 필요합니다. 무료 대안을 사용하거나 라이선스를 구매하세요.',
  },
  LICENSE_EXPIRED: {
    en: 'Your license has expired. Please renew to continue using premium templates.',
    ko: '라이선스가 만료되었습니다. 프리미엄 템플릿을 계속 사용하려면 갱신하세요.',
  },
  THEME_NOT_LICENSED: {
    en: "You don't have a license for this theme.",
    ko: '이 테마의 라이선스가 없습니다.',
  },
};
```

### Phase 6: 캐싱 및 성능 최적화 (Final Goal)

**목표**: 라이선스 검증 성능 최적화

**작업 항목**:
- [ ] 인메모리 캐시 구현 (5분 TTL)
- [ ] 캐시 무효화 로직 (라이선스 변경 시)
- [ ] 데이터베이스 쿼리 최적화
- [ ] 성능 모니터링 로깅

**캐싱 전략**:
```typescript
// lib/cache/licenseCache.ts
interface CachedLicense {
  license: License | null;
  cachedAt: number;
}

export class LicenseCache {
  private cache = new Map<string, CachedLicense>();
  private TTL = 5 * 60 * 1000; // 5분

  get(userId: string, themeId: string): License | null | undefined {
    const key = `${userId}:${themeId}`;
    const cached = this.cache.get(key);

    if (!cached) return undefined;
    if (Date.now() - cached.cachedAt > this.TTL) {
      this.cache.delete(key);
      return undefined;
    }

    return cached.license;
  }

  set(userId: string, themeId: string, license: License | null): void {
    const key = `${userId}:${themeId}`;
    this.cache.set(key, { license, cachedAt: Date.now() });
  }

  invalidate(userId: string, themeId?: string): void {
    if (themeId) {
      this.cache.delete(`${userId}:${themeId}`);
    } else {
      // 해당 사용자의 모든 캐시 무효화
      for (const key of this.cache.keys()) {
        if (key.startsWith(`${userId}:`)) {
          this.cache.delete(key);
        }
      }
    }
  }
}
```

---

## 기술 접근 방식

### 아키텍처 개요

```
┌─────────────────────────────────────────────────────────────┐
│                   MCP Client (Cursor/Claude)                 │
│  ┌───────────────┐  ┌───────────────┐                       │
│  │ list_templates│  │ get_template  │                       │
│  └───────┬───────┘  └───────┬───────┘                       │
└──────────┼──────────────────┼───────────────────────────────┘
           │                  │
           ▼                  ▼
┌─────────────────────────────────────────────────────────────┐
│                     MCP Server                               │
│  ┌───────────────┐  ┌───────────────┐  ┌───────────────┐   │
│  │ Auth          │  │ License       │  │ Template      │   │
│  │ Middleware    │->│ Service       │->│ Service       │   │
│  └───────────────┘  └───────────────┘  └───────────────┘   │
│                            │                                 │
│                     ┌──────┴──────┐                         │
│                     │ License     │                         │
│                     │ Cache       │                         │
│                     └─────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                     Supabase                                 │
│  ┌───────────────┐  ┌───────────────┐                       │
│  │ user_licenses │  │ free_screen   │                       │
│  │               │  │ _templates    │                       │
│  └───────────────┘  └───────────────┘                       │
└─────────────────────────────────────────────────────────────┘
```

### 라이선스 티어별 접근 권한

| 티어 | 무료 템플릿 | 구매 테마 | 전체 테마 |
|------|------------|----------|----------|
| Free | O | X | X |
| Single | O | O (1개) | X |
| Double | O | O (2개) | X |
| Creator | O | O | O |

---

## 위험 요소 및 대응 방안

| 위험 요소 | 영향도 | 대응 방안 |
|----------|--------|----------|
| 라이선스 검증 지연 | 중간 | 캐싱으로 응답 시간 단축 |
| 캐시 불일치 | 낮음 | 결제 웹훅에서 캐시 무효화 |
| 인증 토큰 만료 | 중간 | 토큰 갱신 안내 메시지 |
| AI 에이전트 오해 | 중간 | 명확하고 구조화된 에러 응답 |

---

## 의존성

### 선행 조건
- SPEC-AUTH-001: 사용자 인증 및 토큰 검증
- SPEC-PAYMENT-001: user_licenses 테이블 및 데이터

### 후속 작업
- MCP 문서 업데이트 (라이선스 요구사항 설명)
- AI 에이전트 통합 테스트

---

## 테스트 전략

### 단위 테스트

```typescript
describe('LicenseService', () => {
  describe('checkTemplateAccess', () => {
    it('무료 템플릿은 항상 접근 허용', async () => {
      const result = await licenseService.checkTemplateAccess(
        null,
        'neutral-theme',
        'landing-basic'
      );
      expect(result.hasAccess).toBe(true);
      expect(result.tier).toBe('free');
    });

    it('비인증 사용자의 프리미엄 접근 거부', async () => {
      const result = await licenseService.checkTemplateAccess(
        null,
        'neutral-theme',
        'dashboard-analytics'
      );
      expect(result.hasAccess).toBe(false);
      expect(result.reason).toBe('AUTHENTICATION_REQUIRED');
    });

    it('Creator Pass는 모든 템플릿 접근', async () => {
      // Mock Creator Pass 라이선스
      const result = await licenseService.checkTemplateAccess(
        'user-with-creator-pass',
        'any-theme',
        'any-template'
      );
      expect(result.hasAccess).toBe(true);
      expect(result.tier).toBe('creator');
    });
  });
});
```

### 통합 테스트

- MCP 클라이언트 시뮬레이션
- 실제 데이터베이스 연동 테스트
- 캐시 동작 검증
