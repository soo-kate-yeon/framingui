# Phase 1 Setup Guide — framingui Marketing

> 목표: 최소 파이프라인 구축 → 첫 수동 사이클 가능한 상태
> 예상 소요: 2~3시간 (API 신청 대기 제외)

---

## ✅ 완료된 것 (이 레포에 포함)

- [x] Git 디렉토리 구조 전체
- [x] context/intent.md — 마케팅 방향, 페르소나, 메시지
- [x] context/STATE.md — 현재 상태 추적
- [x] context/beta-tracker.md — 베타 모집 추적
- [x] context/decisions-log.md — 의사결정 기록
- [x] context/sprint-goals-library.md — 스프린트 목표 라이브러리
- [x] context/cycle-history.md — 사이클 이력
- [x] guides/BRAND-VOICE.md — 브랜드 보이스
- [x] guides/platform-x.md — X 스타일 가이드
- [x] guides/platform-threads.md — Threads 스타일 가이드
- [x] guides/platform-seo.md — SEO 스타일 가이드
- [x] guides/competitor-analysis/overview.md — 경쟁사 분석
- [x] content/templates/ — 4개 콘텐츠 템플릿
- [x] scripts/publish-x.py — X 발행 스크립트
- [x] scripts/publish-threads.py — Threads 발행 스크립트
- [x] scripts/publish-blog.py — 블로그 발행 스크립트
- [x] CLAUDE.md — 전략 스프린트 인스트럭션
- [x] .openclaw/AGENTS.md — Collector 인스트럭션
- [x] .openclaw/AGENTS-executor.md — Executor 인스트럭션
- [x] .env.example — 환경변수 템플릿

---

## 🔧 수연이 해야 할 것 (순서대로)

### Step 1: Git 레포 생성 (5분)
```bash
# GitHub에 private repo 생성
gh repo create tekton-mkt --private

# 또는 기존 폴더를 레포로 초기화
cd tekton-mkt
git init
git add .
git commit -m "init: Phase 1 setup"
git remote add origin git@github.com:suyeon/tekton-mkt.git
git push -u origin main
```

### Step 2: 베타 신청 폼 만들기 (15분)
1. Tally.so 또는 Google Forms로 간단한 폼 생성
   - 이름
   - 이메일
   - GitHub 유저네임
   - 현재 사용 중인 AI 코딩 도구 (Claude Code / Cursor / Codex / 기타)
   - "어떤 문제를 해결하고 싶으세요?" (선택)
2. UTM 파라미터 자동 캡처 설정 (Tally: 자동 지원)
3. context/beta-tracker.md에 폼 URL 업데이트
4. context/STATE.md에 폼 URL 업데이트

### Step 3: X API 발급 (30분 + 승인 대기)
1. https://developer.x.com/en/portal/dashboard 접속
2. Developer Account 신청 (Free tier로 시작)
   - Free: 월 1,500 트윗 읽기 + 50 트윗 쓰기
   - Basic ($200/mo): 월 50K 읽기 + 100 쓰기 → 초기엔 Free로 충분
3. App 생성 → API Key, Secret, Bearer Token 받기
4. User Authentication 설정 → Access Token, Secret 받기
5. .env에 입력:
   ```
   X_API_KEY=your_key
   X_API_SECRET=your_secret
   X_ACCESS_TOKEN=your_token
   X_ACCESS_SECRET=your_token_secret
   X_BEARER_TOKEN=your_bearer
   ```
6. 테스트: `python scripts/publish-x.py --test` (dry run)

### Step 4: Threads API 발급 (30분 + 승인 대기)
1. https://developers.facebook.com/apps/ 접속
2. App 생성 (Business 타입)
3. Threads API 추가
4. 권한: threads_basic, threads_content_publish
5. Access Token 생성 (Long-lived: 60일)
6. .env에 입력:
   ```
   THREADS_USER_ID=your_user_id
   THREADS_ACCESS_TOKEN=your_token
   ```
7. 테스트: `python scripts/publish-threads.py --test`

> ⚠️ Threads API는 비즈니스/크리에이터 계정 필요.
> 개인 계정이면 먼저 전환 필요.

### Step 5: 블로그 환경 확인 (15분)
framingui.com에 /blog 경로가 있는지 확인:
- **이미 있는 경우**: CMS API 키 확인 → .env에 입력
- **없는 경우**: 옵션 선택
  - A) framingui.com/blog 경로로 Next.js MDX 블로그 추가
  - B) Ghost CMS 별도 서브도메인 (blog.framingui.com)
  - C) 초기엔 블로그 없이 X/Threads만 → Phase 2에서 추가

### Step 6: Google Search Console 연결 (15분)
1. https://search.google.com/search-console 접속
2. framingui.com 속성 추가 (DNS 인증 또는 HTML 태그)
3. API 접근용 Service Account 생성:
   - Google Cloud Console → IAM → Service Account
   - JSON 키 다운로드 → credentials/gsc-service-account.json
4. .env에 경로 입력
5. 키워드 순위 추적 시작 (scripts/fetch-seo-rankings.py에서 사용)

### Step 7: OpenClaw 설정 (30분)
1. OpenClaw 계정/설정 확인
2. 이 레포를 OpenClaw 소스로 연결
3. .openclaw/AGENTS.md가 Collector로 로드되는지 확인
4. Heartbeat 스케줄 설정: 30분, 08:00~22:00 KST
5. WhatsApp 알림 채널 연결 확인

### Step 8: 첫 수동 사이클 테스트 (1시간)
API 승인 대기 중에도 할 수 있는 것:
1. Claude.ai에서 CLAUDE.md 기반으로 전략 스프린트 시뮬레이션
2. 콘텐츠 3개만 수동 작성 (X 1개 + Threads 1개 + 블로그 스킵)
3. 수동 발행 후 → content/published/에 기록
4. 3일 후 성과 수동 기록

---

## 📋 Phase 1 완료 체크리스트

```
[ ] Git repo 생성 & 초기 커밋
[ ] 베타 신청 폼 생성
[ ] X API 발급 & .env 설정
[ ] Threads API 발급 & .env 설정
[ ] 블로그 환경 결정 (있으면 API 연결, 없으면 Phase 2로)
[ ] Google Search Console 연결
[ ] OpenClaw Collector 연결 확인
[ ] 첫 수동 콘텐츠 발행 테스트
```

---

## 🔜 Phase 2 예정 (Week 2)
- OpenClaw Executor 자동 콘텐츠 제작 + 승인 플로우
- 성과 추적 자동화 (X Analytics + Threads Insights API)
- SEO 순위 자동 추적 (GSC API 스크립트)
- 에셋 요청/처리 플로우

## 🔜 Phase 3 예정 (Week 3)
- Claude Agent Teams 전략 스프린트 자동 트리거
- Pre-Sprint Briefing 자동화
- 3일 사이클 풀 자동화
- 피드백 루프 검증
