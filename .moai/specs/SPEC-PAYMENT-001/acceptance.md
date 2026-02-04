---
id: SPEC-PAYMENT-001
type: acceptance
version: "1.0.0"
created: "2026-02-03"
updated: "2026-02-03"
---

# SPEC-PAYMENT-001: 인수 기준

## Traceability Tags

- [TAG-PAYMENT-001-U001] ~ [TAG-PAYMENT-001-U003]: Ubiquitous Requirements
- [TAG-PAYMENT-001-E001] ~ [TAG-PAYMENT-001-E004]: Event-Driven Requirements

---

## 테스트 시나리오

### Scenario 1: 체크아웃 테스트

**관련 태그**: [TAG-PAYMENT-001-U001], [TAG-PAYMENT-001-U002], [TAG-PAYMENT-001-E001]

```gherkin
Feature: Paddle 체크아웃
  As a 로그인한 사용자
  I want to 템플릿 라이선스를 구매할 수 있다
  So that MCP에서 프리미엄 기능을 사용할 수 있다

  Scenario: Single Template 구매 ($59)
    Given 사용자가 로그인한 상태이다
    And "neutral-theme" 템플릿 랜딩 페이지에 있다
    When PricingSection의 "Single" 카드에서 "Buy Now" 버튼을 클릭한다
    Then Paddle 체크아웃 오버레이가 열린다
    And 가격이 "$59"로 표시된다
    And 사용자 이메일이 자동으로 채워진다

  Scenario: Double Package 구매 ($99)
    Given 사용자가 로그인한 상태이다
    When "Double" 카드에서 "Buy Now" 버튼을 클릭한다
    Then Paddle 체크아웃 오버레이가 열린다
    And 가격이 "$99"로 표시된다
    And "16% 할인" 배지가 표시된다

  Scenario: Creator Pass 구독 ($149/년)
    Given 사용자가 로그인한 상태이다
    When "Creator Pass" 카드에서 "Subscribe" 버튼을 클릭한다
    Then Paddle 체크아웃 오버레이가 열린다
    And 가격이 "$149/year"로 표시된다
    And "연간 구독" 결제 유형이 표시된다

  Scenario: 비로그인 사용자 구매 시도
    Given 사용자가 로그인하지 않은 상태이다
    When "Buy Now" 버튼을 클릭한다
    Then 로그인 모달이 표시된다
    And "구매하려면 로그인이 필요합니다" 메시지가 표시된다
```

### Scenario 2: 웹훅 처리 테스트

**관련 태그**: [TAG-PAYMENT-001-U003], [TAG-PAYMENT-001-E002]

```gherkin
Feature: Paddle 웹훅 처리
  As a 시스템
  I want to Paddle 웹훅을 안전하게 처리한다
  So that 결제 이벤트를 자동으로 반영할 수 있다

  Scenario: 유효한 웹훅 서명 검증
    Given Paddle에서 웹훅 요청이 전송된다
    And 요청에 유효한 서명 헤더가 포함된다
    When /api/paddle/webhook 엔드포인트가 요청을 수신한다
    Then 서명 검증이 성공한다
    And 이벤트가 처리된다
    And 200 응답이 반환된다

  Scenario: 잘못된 웹훅 서명 거부
    Given 악의적인 요청이 전송된다
    And 서명 헤더가 잘못되었다
    When /api/paddle/webhook 엔드포인트가 요청을 수신한다
    Then 서명 검증이 실패한다
    And 401 응답이 반환된다
    And 이벤트가 처리되지 않는다

  Scenario: 중복 웹훅 처리 방지
    Given 동일한 transaction_id로 웹훅이 이미 처리되었다
    When 동일한 웹훅이 다시 수신된다
    Then 중복으로 감지된다
    And 라이선스가 중복 생성되지 않는다
    And 200 응답이 반환된다 (idempotent)
```

### Scenario 3: 라이선스 생성 검증

**관련 태그**: [TAG-PAYMENT-001-E002]

```gherkin
Feature: 라이선스 자동 생성
  As a 결제 완료 사용자
  I want to 라이선스가 자동으로 생성된다
  So that 즉시 프리미엄 기능을 사용할 수 있다

  Scenario: Single 라이선스 생성
    Given 사용자가 "neutral-theme" Single 구매를 완료했다
    When transaction.completed 웹훅이 수신된다
    Then user_licenses 테이블에 새 레코드가 생성된다
    And tier가 "single"로 설정된다
    And theme_id가 "neutral-theme"으로 설정된다
    And expires_at이 1년 후로 설정된다
    And is_active가 true로 설정된다

  Scenario: Double 라이선스 생성
    Given 사용자가 Double Package를 구매했다
    When transaction.completed 웹훅이 수신된다
    Then 2개의 테마에 대한 라이선스가 생성된다
    And tier가 "double"로 설정된다

  Scenario: Creator Pass 라이선스 생성
    Given 사용자가 Creator Pass를 구독했다
    When transaction.completed 웹훅이 수신된다
    Then 전체 테마 접근 라이선스가 생성된다
    And tier가 "creator"로 설정된다
    And paddle_subscription_id가 저장된다
```

### Scenario 4: 구독 갱신 테스트

**관련 태그**: [TAG-PAYMENT-001-E003]

```gherkin
Feature: 구독 갱신
  As a Creator Pass 구독자
  I want to 구독이 자동으로 갱신된다
  So that 서비스 중단 없이 사용할 수 있다

  Scenario: 자동 갱신 성공
    Given 사용자가 Creator Pass 구독 중이다
    And 갱신 날짜가 되었다
    When subscription.renewed 웹훅이 수신된다
    Then expires_at이 1년 연장된다
    And 갱신 확인 이메일이 발송된다
    And is_active가 true로 유지된다

  Scenario: 갱신 결제 실패
    Given 사용자가 Creator Pass 구독 중이다
    And 결제 수단에 문제가 있다
    When subscription.past_due 웹훅이 수신된다
    Then 결제 실패 알림 이메일이 발송된다
    And is_active가 true로 유지된다 (유예 기간)
    And 7일 후 재결제 시도된다
```

### Scenario 5: 구독 취소 테스트

**관련 태그**: [TAG-PAYMENT-001-E004]

```gherkin
Feature: 구독 취소
  As a Creator Pass 구독자
  I want to 구독을 취소할 수 있다
  So that 더 이상 결제되지 않는다

  Scenario: 구독 취소 처리
    Given 사용자가 Creator Pass 구독 중이다
    When 사용자가 Paddle에서 구독을 취소한다
    And subscription.canceled 웹훅이 수신된다
    Then is_active가 false로 변경된다
    And 취소 확인 이메일이 발송된다
    And expires_at까지는 서비스 사용 가능하다

  Scenario: 취소 후 서비스 접근
    Given 사용자의 구독이 취소되었다
    And 아직 expires_at이 지나지 않았다
    When MCP에서 프리미엄 템플릿에 접근한다
    Then 접근이 허용된다

  Scenario: 만료 후 서비스 접근
    Given 사용자의 구독이 취소되었다
    And expires_at이 지났다
    When MCP에서 프리미엄 템플릿에 접근한다
    Then 접근이 거부된다
    And "라이선스가 만료되었습니다" 메시지가 반환된다
```

### Scenario 6: 이메일 발송 테스트

**관련 태그**: [TAG-PAYMENT-001-E002], [TAG-PAYMENT-001-E003], [TAG-PAYMENT-001-E004]

```gherkin
Feature: 이메일 알림
  As a 사용자
  I want to 결제 관련 이메일을 받는다
  So that 내 구매/구독 상태를 알 수 있다

  Scenario: 구매 확인 이메일
    Given 사용자가 Single Template을 구매 완료했다
    When 라이선스가 생성된다
    Then 구매 확인 이메일이 발송된다
    And 이메일에 테마 이름이 포함된다
    And 이메일에 만료 날짜가 포함된다
    And 이메일에 MCP 설치 가이드 링크가 포함된다

  Scenario: 갱신 확인 이메일
    Given Creator Pass 구독이 갱신되었다
    When subscription.renewed 웹훅이 처리된다
    Then 갱신 확인 이메일이 발송된다
    And 이메일에 다음 결제일이 포함된다

  Scenario: 취소 확인 이메일
    Given Creator Pass 구독이 취소되었다
    When subscription.canceled 웹훅이 처리된다
    Then 취소 확인 이메일이 발송된다
    And 이메일에 서비스 종료 날짜가 포함된다
```

---

## 품질 게이트 기준

### 기능 완료 기준

- [ ] 모든 Ubiquitous Requirements 충족
- [ ] 모든 Event-Driven Requirements 충족
- [ ] 3가지 가격 티어 모두 구매 가능
- [ ] 모든 웹훅 이벤트 처리 완료

### 보안 기준

- [ ] 웹훅 서명 검증 적용
- [ ] API Key 환경 변수로 관리
- [ ] HTTPS 강제
- [ ] 민감 정보 로깅 금지

### 테스트 커버리지

- [ ] Unit Test 커버리지 85% 이상
- [ ] Paddle Sandbox 테스트 완료
- [ ] 웹훅 시뮬레이션 테스트 완료
- [ ] E2E 결제 플로우 테스트 완료

### 성능 기준

- [ ] 체크아웃 오버레이 로딩 < 2초
- [ ] 웹훅 처리 응답 시간 < 500ms
- [ ] 이메일 발송 큐잉 < 1초

---

## Definition of Done

1. Paddle 체크아웃 플로우 작동
2. 모든 웹훅 이벤트 처리 완료
3. 라이선스 자동 생성/갱신/비활성화 작동
4. 이메일 알림 발송 작동
5. Sandbox 환경 테스트 완료
6. 보안 검토 완료
7. 문서 업데이트 완료
