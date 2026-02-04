---
id: SPEC-AUTH-001
type: acceptance
version: "1.0.0"
created: "2026-02-03"
updated: "2026-02-03"
---

# SPEC-AUTH-001: 인수 기준

## Traceability Tags

- [TAG-AUTH-001-U001] ~ [TAG-AUTH-001-U003]: Ubiquitous Requirements
- [TAG-AUTH-001-E001] ~ [TAG-AUTH-001-E003]: Event-Driven Requirements
- [TAG-AUTH-001-S001] ~ [TAG-AUTH-001-S002]: State-Driven Requirements

---

## 테스트 시나리오

### Scenario 1: OAuth 로그인 테스트

**관련 태그**: [TAG-AUTH-001-U001], [TAG-AUTH-001-E001], [TAG-AUTH-001-E002]

```gherkin
Feature: OAuth 소셜 로그인
  As a 사용자
  I want to 소셜 계정으로 로그인할 수 있다
  So that 별도의 비밀번호 없이 쉽게 인증할 수 있다

  Scenario: Google 로그인 성공
    Given 사용자가 로그인하지 않은 상태이다
    And "Login with Google" 버튼이 표시된다
    When "Login with Google" 버튼을 클릭한다
    Then Google OAuth 페이지로 리다이렉트된다
    When Google 계정으로 인증을 완료한다
    Then Studio 애플리케이션으로 돌아온다
    And 사용자 정보가 우측 상단에 표시된다
    And 사용자 레코드가 생성된다

  Scenario: GitHub 로그인 성공
    Given 사용자가 로그인하지 않은 상태이다
    When "Login with GitHub" 버튼을 클릭한다
    Then GitHub OAuth 페이지로 리다이렉트된다
    When GitHub 계정으로 인증을 완료한다
    Then Studio 애플리케이션으로 돌아온다
    And 사용자 정보가 표시된다

  Scenario: 로그인 취소
    Given 사용자가 로그인하지 않은 상태이다
    When "Login with Google" 버튼을 클릭한다
    And Google OAuth 페이지에서 "Cancel"을 클릭한다
    Then Studio 애플리케이션으로 돌아온다
    And 로그인 상태가 아니다
    And 에러 메시지가 표시되지 않는다

  Scenario: 기존 사용자 재로그인
    Given 사용자가 이전에 로그인한 적이 있다
    And 현재 로그아웃 상태이다
    When Google 계정으로 로그인한다
    Then 기존 사용자 레코드가 업데이트된다
    And 이전 라이선스 정보가 유지된다
```

### Scenario 2: 세션 유지 테스트

**관련 태그**: [TAG-AUTH-001-U002], [TAG-AUTH-001-S002]

```gherkin
Feature: 세션 유지
  As a 로그인한 사용자
  I want to 페이지를 새로고침해도 로그인 상태가 유지된다
  So that 반복적으로 로그인할 필요가 없다

  Scenario: 페이지 새로고침 후 세션 유지
    Given 사용자가 로그인한 상태이다
    When 브라우저에서 F5를 눌러 새로고침한다
    Then 여전히 로그인 상태이다
    And 사용자 정보가 표시된다

  Scenario: 브라우저 탭 재오픈 후 세션 유지
    Given 사용자가 로그인한 상태이다
    When 브라우저 탭을 닫는다
    And 새 탭에서 Studio를 다시 연다
    Then 여전히 로그인 상태이다

  Scenario: 세션 만료 알림
    Given 사용자가 로그인한 상태이다
    And 세션 만료 시간이 5분 남았다
    When 4분 55초가 경과한다
    Then 세션 만료 경고 모달이 표시된다
    And "Stay logged in" 버튼이 표시된다
    When "Stay logged in" 버튼을 클릭한다
    Then 세션이 갱신된다
    And 모달이 닫힌다

  Scenario: 세션 만료 후 재인증 요구
    Given 세션 만료 경고 모달이 표시된다
    When 사용자가 아무 동작도 하지 않고 5분이 경과한다
    Then 세션이 만료된다
    And 로그인 페이지로 리다이렉트된다
    And "세션이 만료되었습니다" 메시지가 표시된다
```

### Scenario 3: MCP 인증 플로우 테스트

**관련 태그**: [TAG-AUTH-001-E001]

```gherkin
Feature: MCP 클라이언트 인증
  As a MCP 클라이언트 사용자
  I want to Cursor/Claude에서 Studio 계정으로 인증할 수 있다
  So that MCP 도구에서 내 라이선스를 사용할 수 있다

  Scenario: MCP 인증 시작
    Given MCP 클라이언트가 실행 중이다
    And 사용자가 인증되지 않았다
    When MCP에서 "authenticate" 명령을 실행한다
    Then 브라우저가 자동으로 열린다
    And Studio OAuth 로그인 페이지가 표시된다

  Scenario: MCP 인증 완료
    Given MCP 인증 브라우저가 열려있다
    When Google 계정으로 로그인을 완료한다
    Then "인증 완료" 페이지가 표시된다
    And "브라우저를 닫아도 됩니다" 메시지가 표시된다
    And MCP 클라이언트에 인증 토큰이 전달된다

  Scenario: MCP 인증 토큰 사용
    Given MCP 클라이언트가 인증된 상태이다
    When MCP 도구를 실행한다
    Then 요청에 인증 토큰이 포함된다
    And 서버에서 토큰이 검증된다
```

### Scenario 4: 로그아웃 테스트

**관련 태그**: [TAG-AUTH-001-E003]

```gherkin
Feature: 로그아웃
  As a 로그인한 사용자
  I want to 안전하게 로그아웃할 수 있다
  So that 공용 컴퓨터에서도 안전하게 사용할 수 있다

  Scenario: 정상 로그아웃
    Given 사용자가 로그인한 상태이다
    When 계정 메뉴를 클릭한다
    And "Logout" 버튼을 클릭한다
    Then 세션이 클리어된다
    And 홈페이지로 리다이렉트된다
    And "Login" 버튼이 표시된다

  Scenario: 로그아웃 후 보호된 페이지 접근 시도
    Given 사용자가 로그아웃한 상태이다
    When 보호된 페이지 URL로 직접 접근한다
    Then 로그인 페이지로 리다이렉트된다
    And "로그인이 필요합니다" 메시지가 표시된다
```

### Scenario 5: 인증 상태별 UI 테스트

**관련 태그**: [TAG-AUTH-001-S001]

```gherkin
Feature: 인증 상태별 UI
  As a 사용자
  I want to 로그인 상태에 따라 적절한 UI를 본다
  So that 현재 상태를 명확히 알 수 있다

  Scenario: 비로그인 상태 UI
    Given 사용자가 로그인하지 않은 상태이다
    When 랜딩 페이지를 방문한다
    Then 헤더에 "Login" 버튼이 표시된다
    And 계정 메뉴가 표시되지 않는다

  Scenario: 로그인 상태 UI
    Given 사용자가 로그인한 상태이다
    When 랜딩 페이지를 방문한다
    Then 헤더에 사용자 아바타가 표시된다
    And 계정 메뉴 드롭다운이 사용 가능하다
    And "Login" 버튼이 표시되지 않는다

  Scenario: 계정 메뉴 내용
    Given 사용자가 로그인한 상태이다
    When 계정 메뉴 아바타를 클릭한다
    Then 드롭다운 메뉴가 표시된다
    And 사용자 이메일이 표시된다
    And "My Licenses" 링크가 표시된다
    And "Settings" 링크가 표시된다
    And "Logout" 버튼이 표시된다
```

---

## 품질 게이트 기준

### 기능 완료 기준

- [ ] 모든 Ubiquitous Requirements 충족
- [ ] 모든 Event-Driven Requirements 충족
- [ ] 모든 State-Driven Requirements 충족

### 보안 기준

- [ ] OAuth PKCE flow 적용
- [ ] CSRF 보호 (state 파라미터)
- [ ] Secure 쿠키 사용 (HTTPS only)
- [ ] RLS 정책 적용 및 검증
- [ ] Service Role Key 서버 측에서만 사용

### 테스트 커버리지

- [ ] Unit Test 커버리지 85% 이상
- [ ] E2E 테스트 시나리오 100% 통과
- [ ] OAuth 플로우 수동 테스트 완료

### 성능 기준

- [ ] 로그인 플로우 완료 시간 < 3초 (네트워크 제외)
- [ ] 세션 체크 응답 시간 < 100ms
- [ ] 토큰 갱신 응답 시간 < 500ms

---

## Definition of Done

1. Google/GitHub OAuth 로그인 작동
2. 세션 유지 및 자동 갱신 작동
3. MCP 인증 API 작동
4. 로그아웃 및 세션 클리어 작동
5. 데이터베이스 스키마 및 RLS 적용
6. 보안 검토 완료
7. 문서 업데이트 완료
