# SPEC-QUALITY-001 수락 기준

## Given-When-Then 테스트 시나리오

### 시나리오 1: TAG 주석 검증

**시나리오명**: TAG 주석이 누락된 코드 커밋 시 검증 실패

**Given** (사전 조건):
- Git 저장소가 초기화되어 있음
- `.moai/scripts/validate-tags.ts` 스크립트가 존재
- Git pre-commit hook이 설정되어 있음
- 개발자가 새로운 기능 코드를 작성함

**When** (실행 조건):
- TAG 주석 없이 요구사항 구현 코드를 작성
- `git add .` 명령으로 스테이징
- `git commit -m "feat: add new feature"` 명령 실행

**Then** (예상 결과):
- Pre-commit hook이 `validate-tags.ts` 스크립트 실행
- TAG 누락 감지
- 커밋 실패 메시지 표시:
  ```
  ❌ TAG Validation Failed
  Missing TAG annotations in:
    - src/components/NewFeature.tsx:15
    - src/utils/helper.ts:42

  Please add TAG annotations in the format: [TAG-Q-XXX]
  See docs/quality/tag-system.md for details.
  ```
- 커밋이 차단됨
- 개발자가 TAG 주석 추가 후 재커밋 필요

**검증 방법**:
```bash
# 1. TAG 없는 코드 작성
echo "export function newFeature() { return true; }" > test.ts

# 2. 커밋 시도
git add test.ts
git commit -m "test"

# 3. 예상 결과: 커밋 실패
# Expected: "TAG Validation Failed"
```

---

### 시나리오 2: TypeScript 타입 컴파일 검증

**시나리오명**: TypeScript strict mode 오류 존재 시 빌드 실패

**Given** (사전 조건):
- TypeScript strict mode가 활성화되어 있음 (`tsconfig.json`의 `strict: true`)
- CI/CD 파이프라인이 구성되어 있음
- 개발자가 타입 오류가 있는 코드를 작성함

**When** (실행 조건):
- 타입 오류가 포함된 코드를 커밋:
  ```typescript
  function processUser(user: User) {
    return user.name.toUpperCase(); // user.name이 undefined일 수 있음
  }
  ```
- Pull Request 생성
- CI/CD 파이프라인 실행

**Then** (예상 결과):
- TypeScript 컴파일 단계 실패
- CI/CD 로그에 타입 오류 표시:
  ```
  ❌ Type Check Failed

  src/utils/user.ts:15:12 - error TS2532:
  Object is possibly 'undefined'.

  15   return user.name.toUpperCase();
                 ~~~~~~~~~

  Found 1 error.
  ```
- Pull Request 머지 차단
- 상태 체크 실패 표시

**검증 방법**:
```bash
# 1. 로컬에서 타입 체크
pnpm run type-check

# 2. CI/CD 시뮬레이션
pnpm run ci:typecheck

# 3. 예상 결과: 타입 오류 감지
# Expected: Exit code 1, error message displayed
```

---

### 시나리오 3: 테스트 커버리지 검증

**시나리오명**: 테스트 커버리지 95% 미만 시 PR 머지 차단

**Given** (사전 조건):
- Vitest 테스트 환경이 구성되어 있음
- 커버리지 임계값이 95%로 설정되어 있음:
  ```typescript
  // vitest.config.ts
  export default defineConfig({
    test: {
      coverage: {
        statements: 95,
        branches: 90,
        functions: 95,
        lines: 95,
      },
    },
  });
  ```
- 개발자가 새로운 기능을 추가했으나 테스트를 작성하지 않음

**When** (실행 조건):
- 테스트가 부족한 코드를 커밋
- Pull Request 생성
- CI/CD 파이프라인에서 테스트 및 커버리지 체크 실행

**Then** (예상 결과):
- 테스트 커버리지 계산 실행
- 커버리지 미달 감지:
  ```
  ❌ Coverage Check Failed

  File                | Stmts | Branch | Funcs | Lines
  --------------------|-------|--------|-------|-------
  src/newFeature.ts   |  80.5  |  75.0  |  85.0 |  82.0

  Required Coverage:
    Statements: 95% (current: 92.3%)
    Branches:   90% (current: 88.1%)
    Functions:  95% (current: 93.5%)
    Lines:      95% (current: 91.8%)

  Please add tests to increase coverage.
  ```
- Pull Request 머지 차단
- 커버리지 리포트 링크 제공

**검증 방법**:
```bash
# 1. 로컬에서 커버리지 체크
pnpm run test:coverage

# 2. 커버리지 리포트 확인
open coverage/index.html

# 3. 예상 결과: 95% 미만 시 실패
# Expected: Coverage below threshold, exit code 1
```

---

### 시나리오 4: TRUST 5 스코어 달성 검증

**시나리오명**: TRUST 5 스코어 90/100 이상 달성 시 품질 게이트 통과

**Given** (사전 조건):
- 모든 Phase (4.1, 4.2, 4.3, 4.4) 완료
- TRUST 5 스코어 계산 스크립트 구현됨
- CI/CD 파이프라인에 품질 게이트 통합

**When** (실행 조건):
- 최종 Pull Request 생성
- CI/CD 파이프라인 실행
- `.moai/scripts/trust-score.ts` 스크립트 실행

**Then** (예상 결과):
- TRUST 5 스코어 계산 완료:
  ```
  ✅ TRUST 5 Quality Gate: PASSED

  Pillar          | Score | Status | Details
  ----------------|-------|--------|------------------
  Test-first      | 95/20 | ✅     | Coverage: 95.3%
  Readable        | 19/20 | ✅     | JSDoc: 98%
  Unified         | 18/20 | ✅     | Linter: 0 errors
  Secured         | 20/20 | ✅     | Type errors: 0
  Trackable       | 20/20 | ✅     | TAG coverage: 100%
  ----------------|-------|--------|------------------
  Total           | 92/100| ✅     | Threshold: 90

  🎉 Quality Gate PASSED! Ready for production.
  ```
- Pull Request 머지 승인
- 프로덕션 배포 준비 완료

**검증 방법**:
```bash
# 1. TRUST 5 스코어 계산
pnpm run quality:trust-score

# 2. 개별 Pillar 검증
pnpm run quality:test-first    # 테스트 커버리지
pnpm run quality:readable      # 코드 가독성
pnpm run quality:unified       # 코딩 스타일
pnpm run quality:secured       # 타입 안전성
pnpm run quality:trackable     # TAG 추적성

# 3. 예상 결과: 90/100 이상
# Expected: Score >= 90, all pillars PASSED
```

---

## 품질 게이트 체크리스트

### Phase 4.1: TAG 주석 시스템
- [ ] **TAG-001**: 모든 요구사항 코드에 TAG 주석 포함 (100%)
- [ ] **TAG-002**: `validate-tags.ts` 스크립트 정상 동작
- [ ] **TAG-003**: Git pre-commit hook 설정 완료
- [ ] **TAG-004**: TAG 패턴 정규식 검증 통과
- [ ] **TAG-005**: CI/CD 파이프라인 TAG 검증 통합
- [ ] **TAG-006**: `docs/quality/tag-system.md` 문서화 완료
- [ ] **TAG-007**: TAG 누락 시 커밋 차단 확인

**검증 명령**:
```bash
pnpm run validate:tags
```

**성공 기준**:
- 모든 `.ts`, `.tsx` 파일에서 TAG 패턴 감지
- TAG 누락 파일 0개
- 스크립트 실행 시간 < 5초

---

### Phase 4.2: TypeScript 타입 개선
- [ ] **TYPE-001**: TypeScript strict mode 오류 0개
- [ ] **TYPE-002**: `ScreenTemplateProps` 제네릭 타입 적용
- [ ] **TYPE-003**: `TokenReference` 타입 동기화 완료
- [ ] **TYPE-004**: 모든 타입 가드 함수 테스트 통과
- [ ] **TYPE-005**: `@ts-ignore` 사용 0개
- [ ] **TYPE-006**: `docs/quality/type-refinement.md` 문서화 완료
- [ ] **TYPE-007**: CI/CD 타입 체크 통합

**검증 명령**:
```bash
pnpm run type-check
pnpm run lint:types
```

**성공 기준**:
- `tsc --noEmit` 오류 0개
- 모든 함수에 명시적 반환 타입
- 타입 추론 정확도 100%

---

### Phase 4.3: 테스트 커버리지 향상
- [ ] **TEST-001**: 전체 테스트 커버리지 >= 95%
- [ ] **TEST-002**: Statements 커버리지 >= 95%
- [ ] **TEST-003**: Branches 커버리지 >= 90%
- [ ] **TEST-004**: Functions 커버리지 >= 95%
- [ ] **TEST-005**: Lines 커버리지 >= 95%
- [ ] **TEST-006**: Edge Case 테스트 100% 커버
- [ ] **TEST-007**: 에러 핸들링 테스트 100% 커버
- [ ] **TEST-008**: 통합 테스트 주요 시나리오 커버

**검증 명령**:
```bash
pnpm run test:coverage
pnpm run test:edge-cases
pnpm run test:integration
```

**성공 기준**:
- 커버리지 리포트 >= 95%
- 모든 테스트 통과
- 테스트 실행 시간 < 30초

---

### Phase 4.4: TRUST 5 검증 및 문서화
- [ ] **TRUST-001**: Test-first Pillar >= 18/20
- [ ] **TRUST-002**: Readable Pillar >= 18/20
- [ ] **TRUST-003**: Unified Pillar >= 18/20
- [ ] **TRUST-004**: Secured Pillar >= 18/20
- [ ] **TRUST-005**: Trackable Pillar >= 18/20
- [ ] **TRUST-006**: 총 TRUST 5 스코어 >= 90/100
- [ ] **TRUST-007**: `docs/trust-5-report.md` 생성 완료
- [ ] **TRUST-008**: CI/CD 파이프라인 100% 통과

**검증 명령**:
```bash
pnpm run quality:trust-score
pnpm run ci:full-check
```

**성공 기준**:
- TRUST 5 스코어 >= 90/100
- 모든 Pillar 점수 >= 18/20
- 품질 리포트 생성 완료

---

## 검증 도구 및 방법

### 자동화 스크립트

#### 1. TAG 검증 스크립트
**파일**: `.moai/scripts/validate-tags.ts`

**기능**:
- TAG 패턴 정규식 검증
- TAG 누락 파일 탐지
- 중복 TAG 검증
- 상세 오류 리포트 생성

**실행 방법**:
```bash
pnpm run validate:tags
```

**출력 예시**:
```
✅ TAG Validation: PASSED

Files checked: 156
TAGs found: 342
Missing TAGs: 0
Duplicate TAGs: 0

Execution time: 2.3s
```

---

#### 2. 커버리지 검증 스크립트
**파일**: `.moai/scripts/check-coverage.ts`

**기능**:
- Vitest 커버리지 리포트 파싱
- 임계값 비교
- 커버리지 부족 파일 식별
- HTML 리포트 생성

**실행 방법**:
```bash
pnpm run test:coverage
```

**출력 예시**:
```
✅ Coverage Check: PASSED

Coverage Summary:
  Statements: 95.8% (threshold: 95%)
  Branches:   91.2% (threshold: 90%)
  Functions:  96.1% (threshold: 95%)
  Lines:      95.5% (threshold: 95%)

Report: coverage/index.html
```

---

#### 3. TRUST 5 스코어 계산 스크립트
**파일**: `.moai/scripts/trust-score.ts`

**기능**:
- 5개 Pillar별 점수 계산
- 총점 계산 (100점 만점)
- 품질 리포트 생성
- CI/CD 통합 결과 반환

**실행 방법**:
```bash
pnpm run quality:trust-score
```

**출력 예시**:
```
✅ TRUST 5 Quality Gate: PASSED

Pillar Scores:
  Test-first:  19/20 (95.3% coverage)
  Readable:    18/20 (98% JSDoc coverage)
  Unified:     18/20 (0 linter errors)
  Secured:     20/20 (0 type errors)
  Trackable:   20/20 (100% TAG coverage)

Total Score: 95/100 (threshold: 90)
Status: ✅ READY FOR PRODUCTION
```

---

### CI/CD 파이프라인 통합

#### GitHub Actions Workflow
**파일**: `.github/workflows/quality-gate.yml`

**단계**:
1. **TAG 검증**: `validate-tags.ts` 실행
2. **타입 체크**: `tsc --noEmit` 실행
3. **테스트 실행**: `vitest run --coverage` 실행
4. **커버리지 검증**: `check-coverage.ts` 실행
5. **TRUST 5 스코어**: `trust-score.ts` 실행
6. **결과 리포트**: PR 코멘트에 결과 게시

**실행 트리거**:
- Pull Request 생성/업데이트 시
- `main` 브랜치로 머지 시
- 수동 실행 (`workflow_dispatch`)

---

### 로컬 개발 환경 검증

#### Pre-commit Hook
**파일**: `.husky/pre-commit`

**내용**:
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# TAG 검증
pnpm run validate:tags || exit 1

# 타입 체크
pnpm run type-check || exit 1

# 린트 검사
pnpm run lint || exit 1

echo "✅ Pre-commit checks passed"
```

---

## Definition of Done (완료 정의)

SPEC-QUALITY-001이 완료되었다고 간주하려면 다음 모든 조건을 만족해야 합니다:

### 기능 완료
- [ ] TAG 주석 시스템 100% 구현
- [ ] TypeScript strict mode 오류 0개
- [ ] 테스트 커버리지 95% 이상
- [ ] TRUST 5 스코어 90/100 이상

### 자동화 완료
- [ ] TAG 검증 스크립트 동작
- [ ] Git pre-commit hook 설정
- [ ] CI/CD 파이프라인 통합
- [ ] 품질 리포트 자동 생성

### 문서화 완료
- [ ] `docs/quality/tag-system.md` 작성
- [ ] `docs/quality/type-refinement.md` 작성
- [ ] `docs/quality/testing-strategy.md` 작성
- [ ] `docs/trust-5-report.md` 생성

### 검증 완료
- [ ] 모든 테스트 시나리오 통과
- [ ] 모든 품질 게이트 체크리스트 완료
- [ ] CI/CD 파이프라인 100% 통과
- [ ] 프로덕션 배포 체크리스트 완료

### 승인 완료
- [ ] 코드 리뷰 승인
- [ ] 품질 담당자 승인
- [ ] 프로덕션 배포 승인

---

**작성일**: 2026-01-31
**작성자**: soo-kate-yeon
**상태**: Planned
**검증 도구**: validate-tags, check-coverage, trust-score
