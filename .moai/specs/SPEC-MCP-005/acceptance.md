---
id: SPEC-MCP-005
type: acceptance
version: "1.0.0"
created: "2026-02-03"
updated: "2026-02-03"
---

# SPEC-MCP-005: 인수 기준

## Traceability Tags

- [TAG-MCP-005-U001] ~ [TAG-MCP-005-U003]: Ubiquitous Requirements
- [TAG-MCP-005-E001] ~ [TAG-MCP-005-E003]: Event-Driven Requirements
- [TAG-MCP-005-S001] ~ [TAG-MCP-005-S003]: State-Driven Requirements

---

## 테스트 시나리오

### Scenario 1: 무료 사용자 접근 테스트

**관련 태그**: [TAG-MCP-005-U002], [TAG-MCP-005-E001], [TAG-MCP-005-E002]

```gherkin
Feature: 무료 사용자 템플릿 접근
  As a 무료 사용자
  I want to 무료 템플릿에 접근할 수 있다
  So that 기본 기능을 체험할 수 있다

  Scenario: 무료 템플릿 목록 조회
    Given 사용자가 인증되지 않았다
    When list_templates를 호출한다
    Then 무료 템플릿이 목록 상단에 표시된다
    And 무료 템플릿의 isLocked가 false이다
    And 프리미엄 템플릿의 isLocked가 true이다
    And userTier가 "free"이다

  Scenario: 무료 템플릿 코드 조회
    Given 사용자가 인증되지 않았다
    When get_template("landing-basic", "neutral-theme")를 호출한다
    Then success가 true이다
    And template.code가 반환된다
    And license.tier가 "free"이다

  Scenario: 프리미엄 템플릿 접근 거부
    Given 사용자가 인증되지 않았다
    When get_template("dashboard-analytics", "neutral-theme")를 호출한다
    Then success가 false이다
    And error가 "TEMPLATE_ACCESS_DENIED"이다
    And freeAlternatives에 ["landing-basic", "signup", "contact-form"]가 포함된다
    And upgradeUrl이 반환된다

  Scenario: 인증되지 않은 사용자 프리미엄 요청
    Given 사용자가 인증 토큰이 없다
    When get_template("premium-template", "neutral-theme")를 호출한다
    Then error가 "AUTHENTICATION_REQUIRED"이다
    And message에 로그인 안내가 포함된다
```

### Scenario 2: 라이선스 사용자 접근 테스트

**관련 태그**: [TAG-MCP-005-U001], [TAG-MCP-005-E003], [TAG-MCP-005-S002]

```gherkin
Feature: 라이선스 사용자 템플릿 접근
  As a 라이선스 보유 사용자
  I want to 구매한 템플릿에 접근할 수 있다
  So that 프리미엄 기능을 사용할 수 있다

  Scenario: Single 라이선스 - 해당 테마 접근
    Given 사용자가 "neutral-theme" Single 라이선스를 보유하고 있다
    When get_template("dashboard-analytics", "neutral-theme")를 호출한다
    Then success가 true이다
    And template.code가 반환된다
    And license.tier가 "single"이다
    And license.expiresAt이 1년 후 날짜이다

  Scenario: Single 라이선스 - 다른 테마 접근 거부
    Given 사용자가 "neutral-theme" Single 라이선스를 보유하고 있다
    When get_template("dashboard-analytics", "round-theme")를 호출한다
    Then success가 false이다
    And error가 "THEME_NOT_LICENSED"이다
    And details.currentTier가 "single"이다

  Scenario: Double 라이선스 - 2개 테마 접근
    Given 사용자가 Double 라이선스를 보유하고 있다
    And 라이선스가 "neutral-theme"과 "round-theme"에 적용되어 있다
    When get_template("any-template", "neutral-theme")를 호출한다
    Then success가 true이다
    When get_template("any-template", "round-theme")를 호출한다
    Then success가 true이다
```

### Scenario 3: Creator Pass 접근 테스트

**관련 태그**: [TAG-MCP-005-S001]

```gherkin
Feature: Creator Pass 전체 접근
  As a Creator Pass 구독자
  I want to 모든 템플릿에 접근할 수 있다
  So that 모든 프리미엄 기능을 사용할 수 있다

  Scenario: 모든 테마 접근 가능
    Given 사용자가 Creator Pass를 구독 중이다
    When get_template("any-template", "any-theme")를 호출한다
    Then success가 true이다
    And license.tier가 "creator"이다

  Scenario: 신규 테마 자동 접근
    Given 사용자가 Creator Pass를 구독 중이다
    And 새로운 "new-theme"이 추가되었다
    When get_template("any-template", "new-theme")를 호출한다
    Then success가 true이다

  Scenario: Creator Pass 템플릿 목록
    Given 사용자가 Creator Pass를 구독 중이다
    When list_templates("any-theme")를 호출한다
    Then 모든 템플릿의 isLocked가 false이다
    And userTier가 "creator"이다
```

### Scenario 4: 만료 처리 테스트

**관련 태그**: [TAG-MCP-005-S003]

```gherkin
Feature: 라이선스 만료 처리
  As a 라이선스가 만료된 사용자
  I want to 만료 안내를 받는다
  So that 라이선스를 갱신할 수 있다

  Scenario: 만료된 Single 라이선스
    Given 사용자의 Single 라이선스가 어제 만료되었다
    When get_template("dashboard-analytics", "neutral-theme")를 호출한다
    Then success가 false이다
    And error가 "LICENSE_EXPIRED"이다
    And message에 갱신 안내가 포함된다
    And details.currentTier가 "single"이다

  Scenario: 만료 후 무료 템플릿은 접근 가능
    Given 사용자의 라이선스가 만료되었다
    When get_template("landing-basic", "neutral-theme")를 호출한다
    Then success가 true이다
    And license.tier가 "free"이다

  Scenario: 만료된 Creator Pass
    Given 사용자의 Creator Pass가 만료되었다
    When list_templates("neutral-theme")를 호출한다
    Then 프리미엄 템플릿의 isLocked가 true이다
    And userTier가 "free"이다
```

### Scenario 5: AI 에이전트 친화적 응답 테스트

**관련 태그**: [TAG-MCP-005-U003]

```gherkin
Feature: AI 에이전트 친화적 에러 응답
  As a AI 코딩 에이전트 (Cursor/Claude)
  I want to 구조화된 에러 응답을 받는다
  So that 사용자에게 적절히 안내할 수 있다

  Scenario: 접근 거부 응답 구조
    Given 무료 사용자가 프리미엄 템플릿을 요청한다
    When MCP 응답이 반환된다
    Then 응답에 다음 필드가 포함된다:
      | 필드              | 설명                           |
      | success          | false                          |
      | error            | 에러 코드                       |
      | message          | 사람이 읽을 수 있는 메시지         |
      | freeAlternatives | 무료 대안 템플릿 목록             |
      | upgradeUrl       | 라이선스 구매 페이지 URL          |
      | details          | 상세 정보 (요청 템플릿, 필요 티어) |

  Scenario: 에러 메시지 다국어 지원
    Given 사용자 언어 설정이 "ko"이다
    When 접근 거부 응답이 반환된다
    Then message가 한국어로 반환된다

  Scenario: AI 에이전트 대안 제안 동작
    Given AI 에이전트가 접근 거부 응답을 받았다
    Then AI는 freeAlternatives 목록을 사용자에게 제안할 수 있다
    And AI는 upgradeUrl을 사용자에게 안내할 수 있다
```

### Scenario 6: 캐싱 동작 테스트

```gherkin
Feature: 라이선스 캐싱
  As a 시스템
  I want to 라이선스를 캐싱한다
  So that 응답 시간을 단축할 수 있다

  Scenario: 라이선스 캐시 적중
    Given 사용자의 라이선스가 캐시되어 있다
    When get_template를 호출한다
    Then 데이터베이스 쿼리 없이 응답이 반환된다
    And 응답 시간이 50ms 이내이다

  Scenario: 캐시 만료 후 갱신
    Given 사용자의 라이선스 캐시가 5분 전에 생성되었다
    When get_template를 호출한다
    Then 데이터베이스에서 새로 조회한다
    And 캐시가 갱신된다

  Scenario: 결제 후 캐시 무효화
    Given 사용자가 라이선스를 구매했다
    When 결제 웹훅이 처리된다
    Then 해당 사용자의 라이선스 캐시가 무효화된다
    When 사용자가 템플릿을 요청한다
    Then 새로운 라이선스 정보가 반환된다
```

---

## 품질 게이트 기준

### 기능 완료 기준

- [ ] 모든 Ubiquitous Requirements 충족
- [ ] 모든 Event-Driven Requirements 충족
- [ ] 모든 State-Driven Requirements 충족
- [ ] 4가지 티어별 접근 제어 완료

### 성능 기준

- [ ] 라이선스 검증 응답 시간 < 100ms (캐시 적중)
- [ ] 라이선스 검증 응답 시간 < 500ms (DB 조회)
- [ ] 캐시 적중률 > 80%

### 테스트 커버리지

- [ ] Unit Test 커버리지 85% 이상
- [ ] 모든 티어 조합 테스트 완료
- [ ] 에러 응답 구조 검증 완료
- [ ] AI 에이전트 통합 테스트 완료

### 보안 기준

- [ ] 토큰 검증 fail-closed 정책
- [ ] 라이선스 위조 방지
- [ ] 민감 정보 로깅 금지

---

## Definition of Done

1. 무료 템플릿 항상 접근 가능
2. 라이선스별 접근 제어 작동
3. 만료 라이선스 처리 완료
4. AI 친화적 에러 응답 구현
5. 캐싱 구현 및 성능 검증
6. 단위/통합 테스트 완료
7. MCP 문서 업데이트 완료
