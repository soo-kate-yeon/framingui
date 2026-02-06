# GitHub Branch Protection 설정 가이드

SPEC-DEPLOY-001 Phase 5를 위한 GitHub Branch Protection Rules 설정 가이드입니다.

## 목차

- [1. Branch Protection 개요](#1-branch-protection-개요)
- [2. master 브랜치 보호 규칙](#2-master-브랜치-보호-규칙)
- [3. develop 브랜치 보호 규칙](#3-develop-브랜치-보호-규칙)
- [4. 설정 단계별 가이드](#4-설정-단계별-가이드)
- [5. 검증 및 테스트](#5-검증-및-테스트)

---

## 1. Branch Protection 개요

### 1.1 목적

Branch Protection Rules는 다음을 방지합니다:

- ❌ 테스트되지 않은 코드의 Production 배포
- ❌ 코드 리뷰 없는 직접 push
- ❌ 빌드 실패 상태의 코드 머지
- ❌ 보안 취약점이 있는 의존성 배포

### 1.2 적용 브랜치

| 브랜치 | 배포 환경 | 보호 수준 |
|--------|----------|----------|
| `master` | Production (tekton-ui.com) | **엄격** (모든 체크 필수) |
| `develop` | Preview (dev.tekton-ui.com) | **중간** (기본 체크 필수) |
| `feature/**` | PR Preview (unique URL) | **없음** (자유 push 가능) |

---

## 2. master 브랜치 보호 규칙

### 2.1 접근 경로

1. GitHub 저장소 이동: `https://github.com/soo-kate-yeon/tekton` (또는 실제 저장소)
2. **Settings** 탭 클릭
3. 왼쪽 사이드바: **Branches** 클릭
4. **Add branch protection rule** 클릭

### 2.2 Branch name pattern

```
master
```

### 2.3 보호 규칙 설정

#### ✅ Require a pull request before merging

**활성화 이유:** 직접 push 방지, 코드 리뷰 강제

**세부 설정:**
- ✅ **Require approvals:** 1명 이상
- ✅ **Dismiss stale pull request approvals when new commits are pushed**
- ✅ **Require review from Code Owners** (선택사항, CODEOWNERS 파일 필요)
- ⬜ **Require approval of the most recent reviewable push** (선택사항)

#### ✅ Require status checks to pass before merging

**활성화 이유:** Quality Gate 통과 필수

**세부 설정:**
- ✅ **Require branches to be up to date before merging**

**필수 Status Checks:**
```
quality-summary       (from .github/workflows/quality-gate.yml)
e2e-tests            (from .github/workflows/e2e-tests.yml)
npm-audit            (from .github/workflows/security-scan.yml)
```

**Status Checks 추가 방법:**
1. "Search for status checks in the last week for this repository" 입력 필드 클릭
2. 위 3개 체크를 입력하여 검색 (최소 1회 이상 실행되어야 나타남)
3. 각 체크박스 선택

#### ✅ Require conversation resolution before merging

**활성화 이유:** PR 코멘트 해결 강제

#### ✅ Require linear history

**활성화 이유:** Merge commit 강제, Git history 깔끔하게 유지

#### ⬜ Require deployments to succeed before merging

**비활성화 이유:** Vercel은 머지 후 자동 배포하므로 불필요

#### ⬜ Lock branch

**비활성화 이유:** 읽기 전용 브랜치로 만들어 모든 push 차단 (너무 엄격)

#### ✅ Do not allow bypassing the above settings

**활성화 이유:** 관리자도 규칙 준수

#### ⬜ Allow force pushes

**비활성화 이유:** Force push는 Git history를 덮어쓰므로 위험

#### ⬜ Allow deletions

**비활성화 이유:** master 브랜치 삭제 방지

### 2.4 최종 설정 예시 (master)

```yaml
Branch name pattern: master

Rules:
  ✅ Require a pull request before merging
     ✅ Require approvals: 1
     ✅ Dismiss stale pull request approvals when new commits are pushed

  ✅ Require status checks to pass before merging
     ✅ Require branches to be up to date before merging
     Required checks:
       - quality-summary
       - e2e-tests
       - npm-audit

  ✅ Require conversation resolution before merging
  ✅ Require linear history
  ✅ Do not allow bypassing the above settings
  ⬜ Allow force pushes
  ⬜ Allow deletions
```

---

## 3. develop 브랜치 보호 규칙

### 3.1 Branch name pattern

```
develop
```

### 3.2 보호 규칙 설정 (master보다 완화)

#### ✅ Require a pull request before merging

**세부 설정:**
- ✅ **Require approvals:** 1명 이상
- ⬜ **Dismiss stale pull request approvals** (feature 브랜치는 빠른 반복)

#### ✅ Require status checks to pass before merging

**필수 Status Checks (master보다 축소):**
```
quality-summary       (lint, type-check, test, build 통과 필수)
```

**선택사항 (권장하지만 필수 아님):**
- `e2e-tests` (develop은 Preview 환경이므로 E2E는 선택사항)
- `npm-audit` (develop은 실험적 의존성 허용)

#### ✅ Require linear history

**활성화 이유:** Git history 정리

#### ⬜ Do not allow bypassing the above settings

**비활성화 이유:** 팀 리더는 긴급 수정 가능하도록 우회 허용

### 3.3 최종 설정 예시 (develop)

```yaml
Branch name pattern: develop

Rules:
  ✅ Require a pull request before merging
     ✅ Require approvals: 1

  ✅ Require status checks to pass before merging
     Required checks:
       - quality-summary

  ✅ Require linear history
  ⬜ Do not allow bypassing the above settings
  ⬜ Allow force pushes
  ⬜ Allow deletions
```

---

## 4. 설정 단계별 가이드

### 4.1 Status Checks 활성화 전제조건

**중요:** Status Checks는 최소 1회 이상 실행되어야 선택 가능합니다.

**활성화 절차:**

1. **GitHub Actions 워크플로우 푸시:**
   ```bash
   git add .github/workflows/e2e-tests.yml
   git add .github/workflows/security-scan.yml
   git commit -m "ci: E2E 테스트 및 보안 스캔 워크플로우 추가"
   git push origin feature/SPEC-DEPLOY-001
   ```

2. **PR 생성 및 워크플로우 실행 대기:**
   - `feature/SPEC-DEPLOY-001` → `develop` PR 생성
   - GitHub Actions가 자동 실행될 때까지 대기 (5-10분)

3. **Status Checks 확인:**
   - PR 페이지에서 "Checks" 탭 확인
   - `quality-summary`, `e2e-tests`, `npm-audit` 상태 표시 확인

4. **Branch Protection Rule에 추가:**
   - 이제 Settings → Branches에서 Status Checks 검색 시 나타남

### 4.2 master 브랜치 보호 적용

**단계:**

1. **Settings → Branches → Add branch protection rule**
2. **Branch name pattern:** `master`
3. **체크박스 선택:**
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require conversation resolution before merging
   - ✅ Require linear history
   - ✅ Do not allow bypassing the above settings
4. **Status Checks 추가:**
   - `quality-summary`
   - `e2e-tests`
   - `npm-audit`
5. **Create** 버튼 클릭

### 4.3 develop 브랜치 보호 적용

**단계:**

1. **Settings → Branches → Add branch protection rule**
2. **Branch name pattern:** `develop`
3. **체크박스 선택:**
   - ✅ Require a pull request before merging
   - ✅ Require status checks to pass before merging
   - ✅ Require linear history
4. **Status Checks 추가:**
   - `quality-summary` (필수)
5. **Create** 버튼 클릭

---

## 5. 검증 및 테스트

### 5.1 master 브랜치 보호 검증

**시나리오 1: 직접 push 차단 테스트**

```bash
# master 브랜치로 전환
git checkout master

# 임시 변경사항 생성
echo "test" >> README.md
git add README.md
git commit -m "test: direct push"

# Push 시도 (실패 예상)
git push origin master
```

**예상 결과:**
```
remote: error: GH006: Protected branch update failed for refs/heads/master.
remote: error: At least 1 approving review is required by reviewers with write access.
```

**시나리오 2: PR 없이 머지 시도 테스트**

- GitHub UI에서 직접 master 브랜치에 파일 편집 시도
- "You can't commit to master because it is a protected branch" 메시지 표시

### 5.2 Status Checks 검증

**시나리오 3: 테스트 실패 시 머지 차단**

1. **feature 브랜치에서 의도적으로 테스트 실패 코드 작성:**
   ```typescript
   // packages/playground-web/__tests__/e2e/broken-test.spec.ts
   import { test, expect } from '@playwright/test';

   test('intentionally failing test', async ({ page }) => {
     expect(true).toBe(false); // 의도적 실패
   });
   ```

2. **PR 생성:**
   ```bash
   git add .
   git commit -m "test: intentional failure"
   git push origin feature/test-protection
   ```

3. **PR에서 Status Checks 확인:**
   - `e2e-tests` 상태가 ❌ Failed로 표시
   - "Merge pull request" 버튼 비활성화

4. **검증 완료 후 테스트 파일 삭제:**
   ```bash
   git rm packages/playground-web/__tests__/e2e/broken-test.spec.ts
   git commit -m "test: remove intentional failure"
   git push
   ```

### 5.3 develop 브랜치 보호 검증

**시나리오 4: Quality Gate 통과 필수**

1. **feature 브랜치에서 Lint 오류 생성:**
   ```typescript
   // packages/playground-web/app/page.tsx
   const unused = 'this will trigger ESLint error'; // unused variable
   ```

2. **PR 생성 → develop:**
   - `quality-summary` 상태가 ❌ Failed
   - Merge 차단

---

## 6. 팀 워크플로우 예시

### 6.1 일반적인 개발 플로우

```
1. feature 브랜치 생성
   git checkout -b feature/new-feature develop

2. 개발 및 커밋
   git add .
   git commit -m "feat: implement new feature"
   git push origin feature/new-feature

3. PR 생성 (feature → develop)
   - GitHub UI에서 PR 생성
   - quality-summary 통과 대기
   - 팀원 1명 리뷰 및 승인

4. develop 브랜치로 머지
   - "Merge pull request" 클릭
   - Vercel Preview 자동 배포 (dev.tekton-ui.com)

5. develop에서 충분히 테스트 후 master PR 생성
   - develop → master PR
   - quality-summary, e2e-tests, npm-audit 모두 통과 필요
   - 팀원 1명 리뷰 및 승인

6. master 브랜치로 머지
   - Production 배포 (tekton-ui.com)
```

### 6.2 긴급 Hotfix 플로우

```
1. master에서 hotfix 브랜치 생성
   git checkout -b hotfix/critical-bug master

2. 최소한의 수정
   git add .
   git commit -m "fix: critical bug"
   git push origin hotfix/critical-bug

3. PR 생성 (hotfix → master)
   - 모든 Status Checks 통과 필수
   - 팀 리더 승인

4. master 머지 후 develop에도 백포트
   git checkout develop
   git merge master
   git push origin develop
```

---

## 7. 문제 해결

### 7.1 Status Check가 표시되지 않음

**원인:**
- 해당 Status Check가 최근 1주일 내 실행되지 않음

**해결:**
1. GitHub Actions 탭에서 워크플로우 수동 실행:
   - "Actions" → "Quality Gate" → "Run workflow"
2. 실행 완료 후 Settings → Branches에서 다시 검색

### 7.2 PR 승인 후에도 Merge 불가

**원인:**
- Status Checks가 아직 실행 중이거나 실패

**해결:**
1. PR 페이지 "Checks" 탭에서 실패한 워크플로우 확인
2. 로그 확인 후 수정
3. 새 커밋 푸시 시 자동 재실행

### 7.3 "Do not allow bypassing" 활성화 후 관리자도 머지 불가

**원인:**
- 관리자도 규칙을 우회할 수 없도록 설정됨

**해결:**
1. Settings → Branches → master rule → Edit
2. "Do not allow bypassing the above settings" 체크 해제
3. 긴급 머지 수행 후 다시 활성화

---

## 8. 권장 설정 요약

### 8.1 master 브랜치 (Production)

```yaml
✅ Require pull request (1 approval)
✅ Require status checks:
   - quality-summary
   - e2e-tests
   - npm-audit
✅ Require conversation resolution
✅ Require linear history
✅ Do not allow bypassing
```

### 8.2 develop 브랜치 (Preview)

```yaml
✅ Require pull request (1 approval)
✅ Require status checks:
   - quality-summary
✅ Require linear history
⬜ Allow bypassing (for team leads)
```

### 8.3 feature/** 브랜치

```yaml
보호 규칙 없음 (자유 개발)
```

---

## 관련 문서

- [Vercel 배포 설정 가이드](./vercel-setup.md)
- [SPEC-DEPLOY-001 전체 문서](../../.moai/specs/SPEC-DEPLOY-001/SPEC-DEPLOY-001.md)
- [GitHub Branch Protection 공식 문서](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches)

---

**마지막 업데이트:** 2026-02-06
**담당자:** soo-kate-yeon
**SPEC:** SPEC-DEPLOY-001
