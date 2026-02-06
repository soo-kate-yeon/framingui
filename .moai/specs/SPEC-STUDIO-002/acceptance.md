# SPEC-STUDIO-002: 웹 스튜디오 프론트엔드 수락 기준

## 수락 시나리오 (Given/When/Then 형식)

### Scenario 1: 축 값 조정 및 프리뷰

**Given**: 사용자가 Web Studio에 접속했을 때

**When**: Density 슬라이더를 0.5에서 0.8로 이동하면

**Then**:
- 100ms 이내에 프리뷰 영역의 spacing이 "compact"로 변경되어야 함
- 프리뷰 컴포넌트(Button, Card, Input)에 compact spacing이 적용되어야 함
- UI에 즉시 시각적 피드백이 표시되어야 함

---

### Scenario 2: 프리셋 로드

**Given**: 사용자가 축을 수동으로 편집 중일 때

**When**: "Modern Tech" 프리셋을 선택하면

**Then**:
- 확인 다이얼로그가 "현재 편집 중인 데이터가 손실됩니다. 계속하시겠습니까?" 메시지와 함께 표시되어야 함
- 사용자가 "확인"을 클릭하면 프리셋 값이 UI에 반영되어야 함
- 모든 축 값이 Modern Tech 프리셋의 값(Density: 0.7, Warmth: 0.3, ...)으로 변경되어야 함

---

### Scenario 3: 검증 실패 처리

**Given**: 사용자가 축 값을 편집 중일 때

**When**: Warmth 값을 1.5로 입력하면 (범위 초과)

**Then**:
- 슬라이더 하단에 "값은 0.0에서 1.0 사이여야 합니다" 에러 메시지가 표시되어야 함
- 저장 버튼과 내보내기 버튼이 비활성화되어야 함
- 에러 메시지는 빨간색으로 표시되어야 함

---

### Scenario 4: JSON 다운로드

**Given**: 사용자가 Brand DNA 편집을 완료했을 때

**When**: "다운로드" 버튼을 클릭하면

**Then**:
- brand-dna-{timestamp}.json 파일이 다운로드되어야 함
- 다운로드된 JSON 파일은 BrandDNASchema Zod 검증을 통과해야 함
- 성공 알림 "Brand DNA가 성공적으로 다운로드되었습니다"가 표시되어야 함

---

### Scenario 5: 접근성 준수

**Given**: 시각 장애인 사용자가 스크린 리더를 사용할 때

**When**: Tab 키로 Density 슬라이더를 포커스하면

**Then**:
- 스크린 리더가 "Density 축: 현재 값 0.5, 범위 0.0에서 1.0"을 읽어야 함
- 화살표 키로 슬라이더 값을 조정할 수 있어야 함
- 값 변경 시 새로운 값이 즉시 읽혀야 함

---

## 성능 기준

### 성능 지표

**Lighthouse Performance 점수**:
- 목표: ≥ 90
- 최소: ≥ 80

**First Contentful Paint (FCP)**:
- 목표: < 1.5초
- 최소: < 2.0초

**Time to Interactive (TTI)**:
- 목표: < 3.0초
- 최소: < 4.0초

**실시간 프리뷰 지연 시간**:
- 목표: < 100ms
- 최소: < 200ms

---

## 접근성 기준

**WCAG AA 준수**:
- 색상 대비: 최소 4.5:1 (AA 기준)
- 키보드 네비게이션: 모든 인터랙티브 요소 접근 가능
- ARIA 레이블: 모든 form control 및 slider에 레이블 존재
- 포커스 표시: 모든 포커스 가능 요소에 명확한 포커스 링 표시

**스크린 리더 호환성**:
- NVDA (Windows): 모든 기능 접근 가능
- JAWS (Windows): 모든 기능 접근 가능
- VoiceOver (macOS/iOS): 모든 기능 접근 가능

---

## 브라우저 호환성

**지원 브라우저**:
- Chrome 111+ ✅
- Safari 15+ ✅
- Firefox 113+ ✅
- Edge 111+ ✅

**미지원 브라우저**:
- Internet Explorer (모든 버전)
- Chrome < 111
- Safari < 15

---

## 테스트 커버리지

**단위 테스트**:
- 목표: ≥ 90%
- 최소: ≥ 85%

**컴포넌트 테스트**:
- 목표: ≥ 85%
- 최소: ≥ 80%

**E2E 테스트**:
- 모든 핵심 사용자 플로우 커버
- 최소 5개 시나리오 작성

---

## 보안 검증

**XSS 방지**:
- dangerouslySetInnerHTML 사용 여부: 0건
- 모든 사용자 입력 이스케이프 처리 확인

**CORS 설정**:
- 허용된 도메인 화이트리스트 검증
- 개발/프로덕션 환경별 설정 확인

**입력 검증**:
- 모든 API 요청 Zod 검증 통과
- 클라이언트 + 서버 측 이중 검증 확인

---

## 배포 기준

**Vercel 배포 성공**:
- 빌드 에러: 0건
- 배포 경고: 0건
- Production URL 접근 가능

**환경 변수 설정**:
- NEXT_PUBLIC_API_URL 설정 확인
- 프로덕션 환경 CORS 도메인 설정

**SSL 인증서**:
- HTTPS 접속 가능
- 유효한 SSL 인증서 확인

---

## 최종 체크리스트

- [ ] 모든 Scenario 1-5 통과
- [ ] Lighthouse Performance 점수 ≥ 90
- [ ] WCAG AA 접근성 기준 충족
- [ ] 테스트 커버리지 ≥ 85%
- [ ] 모든 지원 브라우저에서 정상 동작
- [ ] XSS, CORS, 입력 검증 보안 요구사항 충족
- [ ] Vercel 프로덕션 배포 성공
- [ ] 문서화 완료 (README, API 문서)
