---
id: SPEC-STUDIO-001
type: acceptance
version: "1.0.0"
created: "2026-02-03"
updated: "2026-02-03"
---

# SPEC-STUDIO-001: 인수 기준

## Traceability Tags

- [TAG-STUDIO-001-U001] ~ [TAG-STUDIO-001-U005]: Ubiquitous Requirements
- [TAG-STUDIO-001-E001] ~ [TAG-STUDIO-001-E004]: Event-Driven Requirements
- [TAG-STUDIO-001-S001] ~ [TAG-STUDIO-001-S002]: State-Driven Requirements
- [TAG-STUDIO-001-UW001] ~ [TAG-STUDIO-001-UW002]: Unwanted Behaviors

---

## 테스트 시나리오

### Scenario 1: 랜딩페이지 기본 렌더링

**관련 태그**: [TAG-STUDIO-001-U001], [TAG-STUDIO-001-U002], [TAG-STUDIO-001-U005]

```gherkin
Feature: Template Landing Page 렌더링
  As a 방문자
  I want to 템플릿 랜딩 페이지를 볼 수 있다
  So that 템플릿의 기능과 가격을 확인할 수 있다

  Scenario: 기본 랜딩 페이지 로드
    Given 사용자가 브라우저를 사용 중이다
    When "/studio/template/neutral-theme" 경로에 접근한다
    Then 랜딩 페이지가 성공적으로 렌더링된다
    And TopNav에 "About", "How to use", "Documentation" 링크가 표시된다
    And HeroSection이 페이지 상단에 표시된다
    And McpGuideSection이 페이지 중간에 표시된다
    And PricingSection이 페이지 하단에 표시된다
    And Global Sidebar가 좌측에 표시된다

  Scenario: 존재하지 않는 템플릿 접근
    Given 사용자가 브라우저를 사용 중이다
    When "/studio/template/non-existent-theme" 경로에 접근한다
    Then 404 페이지가 표시된다
```

### Scenario 2: CTA 버튼 동작 검증

**관련 태그**: [TAG-STUDIO-001-E001], [TAG-STUDIO-001-E002], [TAG-STUDIO-001-E003]

```gherkin
Feature: CTA 버튼 인터랙션
  As a 방문자
  I want to CTA 버튼을 클릭하여 원하는 섹션으로 이동하거나 데모를 볼 수 있다
  So that 효율적으로 정보를 탐색할 수 있다

  Scenario: DEMO 버튼 클릭 시 스크롤
    Given 사용자가 랜딩 페이지의 HeroSection에 있다
    When "DEMO" 버튼을 클릭한다
    Then 페이지가 McpGuideSection으로 스무스 스크롤된다
    And URL 해시가 "#demo"로 변경된다

  Scenario: BUY 버튼 클릭 시 스크롤
    Given 사용자가 랜딩 페이지의 HeroSection에 있다
    When "BUY" 버튼을 클릭한다
    Then 페이지가 PricingSection으로 스무스 스크롤된다
    And URL 해시가 "#pricing"으로 변경된다

  Scenario: Open Full Demo 클릭 시 새 창 열기
    Given 사용자가 랜딩 페이지에 있다
    When "Open Full Demo" 버튼을 클릭한다
    Then 새 브라우저 탭이 열린다
    And Live Demo 페이지가 로드된다
```

### Scenario 3: 반응형 레이아웃 검증

**관련 태그**: [TAG-STUDIO-001-U004]

```gherkin
Feature: 반응형 디자인
  As a 사용자
  I want to 다양한 디바이스에서 페이지를 볼 수 있다
  So that 어떤 환경에서도 콘텐츠를 이용할 수 있다

  Scenario: 모바일 레이아웃 (< 768px)
    Given 뷰포트 너비가 375px이다
    When 랜딩 페이지를 로드한다
    Then TopNav가 햄버거 메뉴로 변환된다
    And ComponentOverview가 단일 컬럼으로 표시된다
    And PricingCard가 세로로 쌓여서 표시된다

  Scenario: 태블릿 레이아웃 (768px - 1024px)
    Given 뷰포트 너비가 768px이다
    When 랜딩 페이지를 로드한다
    Then TopNav가 가로로 펼쳐진다
    And ComponentOverview가 2컬럼 그리드로 표시된다
    And PricingCard가 2컬럼으로 표시된다

  Scenario: 데스크톱 레이아웃 (> 1024px)
    Given 뷰포트 너비가 1280px이다
    When 랜딩 페이지를 로드한다
    Then TopNav가 전체 메뉴로 표시된다
    And ComponentOverview가 3컬럼 그리드로 표시된다
    And PricingCard가 3컬럼으로 나란히 표시된다
```

### Scenario 4: i18n 전환 검증

**관련 태그**: [TAG-STUDIO-001-U003], [TAG-STUDIO-001-S002]

```gherkin
Feature: 다국어 지원
  As a 국제 사용자
  I want to 언어를 전환할 수 있다
  So that 모국어로 콘텐츠를 읽을 수 있다

  Scenario: 기본 영어 표시
    Given 브라우저 언어 설정이 "en-US"이다
    When 랜딩 페이지를 로드한다
    Then 모든 콘텐츠가 영어로 표시된다
    And "Get Started" 버튼이 표시된다

  Scenario: 한국어로 전환
    Given 사용자가 영어 랜딩 페이지에 있다
    When 언어 선택기에서 "한국어"를 선택한다
    Then 페이지 콘텐츠가 한국어로 전환된다
    And "시작하기" 버튼이 표시된다
    And URL이 "/ko/studio/template/[id]"로 변경된다

  Scenario: 언어 설정 유지
    Given 사용자가 한국어를 선택했다
    When 다른 템플릿 페이지로 이동한다
    Then 한국어 설정이 유지된다
```

### Scenario 5: 코드 블록 복사 기능

**관련 태그**: [TAG-STUDIO-001-E004]

```gherkin
Feature: 코드 블록 복사
  As a 개발자
  I want to 코드 블록을 클립보드에 복사할 수 있다
  So that 빠르게 명령어를 사용할 수 있다

  Scenario: MCP 설치 명령어 복사
    Given 사용자가 McpGuideSection에 있다
    And 코드 블록에 MCP 설치 명령어가 표시된다
    When 복사 버튼을 클릭한다
    Then 명령어가 클립보드에 복사된다
    And "Copied!" 토스트 메시지가 표시된다
    And 복사 버튼 아이콘이 체크 아이콘으로 변경된다

  Scenario: 복사 버튼 상태 복원
    Given 사용자가 코드를 복사했다
    When 2초가 경과한다
    Then 복사 버튼 아이콘이 원래 상태로 복원된다
```

### Scenario 6: 라이선스 상태에 따른 UI

**관련 태그**: [TAG-STUDIO-001-S001]

```gherkin
Feature: 라이선스 상태별 UI
  As a 라이선스 보유자
  I want to 내 라이선스 상태를 확인하고 관리할 수 있다
  So that 구매한 템플릿을 효과적으로 사용할 수 있다

  Scenario: 비로그인 사용자
    Given 사용자가 로그인하지 않았다
    When PricingSection을 본다
    Then 모든 PricingCard에 "Buy Now" 버튼이 표시된다

  Scenario: 라이선스 미보유 로그인 사용자
    Given 사용자가 로그인했다
    And 해당 템플릿 라이선스가 없다
    When PricingSection을 본다
    Then 모든 PricingCard에 "Buy Now" 버튼이 표시된다

  Scenario: 라이선스 보유 사용자
    Given 사용자가 로그인했다
    And 해당 템플릿의 Single 라이선스를 보유하고 있다
    When PricingSection을 본다
    Then Single 카드에 "Manage License" 버튼이 표시된다
    And Double, Creator Pass 카드에는 "Upgrade" 버튼이 표시된다
```

---

## 품질 게이트 기준

### 기능 완료 기준

- [ ] 모든 Ubiquitous Requirements 충족
- [ ] 모든 Event-Driven Requirements 충족
- [ ] 모든 State-Driven Requirements 충족
- [ ] 모든 Unwanted Behaviors 제거 확인

### 테스트 커버리지

- [ ] Unit Test 커버리지 85% 이상
- [ ] E2E 테스트 시나리오 100% 통과
- [ ] 크로스 브라우저 테스트 (Chrome, Firefox, Safari, Edge)

### 성능 기준

- [ ] LCP (Largest Contentful Paint) < 2.5초
- [ ] FID (First Input Delay) < 100ms
- [ ] CLS (Cumulative Layout Shift) < 0.1

### 접근성 기준

- [ ] WCAG 2.1 AA 준수
- [ ] 키보드 네비게이션 지원
- [ ] 스크린 리더 호환성

### 코드 품질

- [ ] TypeScript strict mode 오류 없음
- [ ] ESLint 경고 없음
- [ ] 빌드 성공

---

## Definition of Done

1. 모든 테스트 시나리오 통과
2. 코드 리뷰 완료
3. 반응형 디자인 검증 완료
4. i18n 번역 검증 완료
5. 레거시 컴포넌트 완전 삭제
6. 문서 업데이트 완료
