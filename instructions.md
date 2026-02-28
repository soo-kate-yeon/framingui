# FramingUI Feature Development Instructions

이 문서는 `moai-adk`의 개발 방법론(특히 `Plan → Run → Sync` 루프)을 FramingUI 저장소에 맞게 적용한 실행 규칙입니다.

## 1. 기본 루프 (필수)

모든 기능 작업은 아래 3단계를 반드시 거칩니다.

1. `Plan`  
   문제 정의, 범위, 리스크, 수용 기준(acceptance criteria)을 먼저 확정합니다.
2. `Run`  
   구현은 작은 단위로 나누어 진행하고, 각 단위마다 테스트/검증을 통과시킵니다.
3. `Sync`  
   코드/문서/릴리즈 노트/운영 체크리스트를 동기화합니다.

---

## 2. 작업 시작 전 체크리스트 (Definition of Ready)

- [ ] 기능 목적이 한 문장으로 명확한가?
- [ ] 수용 기준이 테스트 가능한 형태인가?
- [ ] 영향 범위(패키지/앱/API/배포)가 식별되었는가?
- [ ] 롤백 전략(플래그 off, revert, hotfix)이 준비되었는가?

---

## 3. 구현 전략 선택 규칙

### 3.1 Greenfield 성격 기능

- 먼저 API/도메인 인터페이스를 정의하고 테스트를 선행합니다.
- 핵심 로직은 TDD 우선으로 작성합니다.

### 3.2 Brownfield(기존 코드 수정) 기능

- 동작 보존 테스트를 먼저 추가합니다.
- 리팩터링과 기능 변경을 분리 커밋으로 진행합니다.
- 기존 공개 API의 호환성 파괴 여부를 명시합니다.

---

## 4. Run 단계 품질 게이트 (필수)

각 기능 PR은 최소 아래 게이트를 통과해야 합니다.

- [ ] `pnpm lint`
- [ ] `pnpm typecheck`
- [ ] 영향 범위 테스트 (`pnpm test` 또는 패키지 단위 테스트)
- [ ] 빌드 가능 여부 (`pnpm build`)

추가로 배포/릴리즈 변경이 있으면:

- [ ] Preview/Deploy URL 헬스 체크
- [ ] 마이그레이션 필요 시 업/다운 전략 검증
- [ ] 에러 모니터링(PostHog/Sentry 등) 확인 포인트 정의

---

## 5. 모노레포/패키지 안정성 규칙

퍼블리시되는 패키지는 아래 규칙을 강제합니다.

- `dependencies`에 `workspace:*` 금지
- lockfile(`pnpm-lock.yaml`)과 `package.json` 동기화 필수
- CI에서는 `pnpm install --frozen-lockfile` 기준으로 통과해야 함

권장 사전 점검:

```bash
pnpm install
pnpm -r build
pnpm -r test
rg -n "\"workspace:\\*\"" packages/*/package.json
```

`workspace:*`가 필요한 경우:

- 내부 개발 전용이면 `devDependencies` 또는 `private` 패키지로 한정
- 외부 배포 패키지는 실제 버전 범위(`^x.y.z`)로 치환 후 배포

---

## 6. CI/CD 실패 대응 표준

실패 시 다음 순서로 처리합니다.

1. 실패 유형 분류: `lockfile`, `type`, `test`, `build`, `deploy`, `runtime`
2. 재현 명령 로컬 실행
3. 원인 수정 + 회귀 테스트 추가
4. PR 코멘트에 원인/수정/검증 로그 요약
5. 재커밋 후 push

PR 코멘트 템플릿:

```md
## CI Failure Fix

- Root cause:
- Fix:
- Validation:
  - [ ] lint
  - [ ] typecheck
  - [ ] tests
  - [ ] build
  - [ ] deploy check
```

---

## 7. 배포 검증 표준 (Deploy Check)

배포 파이프라인에서 아래를 확인합니다.

- [ ] 배포 URL 응답(200/302) 및 핵심 페이지 정상 응답
- [ ] 인증 플로우(로그인/콜백) 동작
- [ ] 주요 API health endpoint 응답
- [ ] 정적 자산/번들 로딩 오류 없음

장애 발생 시:

- 즉시 이전 안정 릴리즈로 롤백
- 장애 원인/영향/재발 방지책을 `Sync` 단계 문서에 기록

---

## 8. Sync 단계 산출물 (Definition of Done)

기능 완료는 코드 머지뿐 아니라 아래가 동기화되어야 합니다.

- [ ] 변경 이유와 범위가 PR 설명에 기록됨
- [ ] `CHANGELOG.md` 또는 릴리즈 노트 반영
- [ ] 운영 문서(설정값, 환경변수, 배포 주의사항) 반영
- [ ] 필요 시 사용자/팀 공지 반영

---

## 9. 권장 브랜치/커밋 규칙

- 기능 단위 브랜치: `feat/*`, `fix/*`, `chore/*`
- 커밋은 작게 유지하고 메시지는 의도 중심으로 작성
- 큰 변경은 최소 2개 이상 커밋으로 분리:
  - 동작 보존/리팩터링
  - 기능 추가/행동 변경

---

## 10. 운영 원칙 요약

- 빠른 구현보다 재현 가능성과 롤백 가능성을 우선합니다.
- "돌아간다"가 아니라 "검증 가능하다"를 완료 기준으로 삼습니다.
- 기능 개발은 항상 `Plan → Run → Sync`를 반복합니다.
