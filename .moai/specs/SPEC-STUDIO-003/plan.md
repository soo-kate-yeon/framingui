# SPEC-STUDIO-003: 웹 스튜디오 백엔드 API 구현 계획

## 구현 개요

FastAPI 기반의 RESTful API 백엔드를 구현합니다. Brand DNA 관리, 프리셋 시스템, 버전 관리, 협업 기능을 제공하며, PostgreSQL과 Redis를 활용한 확장 가능한 아키텍처를 구축합니다.

## 태스크 분해 (10개 태스크)

### Task 1: 프로젝트 초기화 및 설정

**설명**: FastAPI 프로젝트 생성 및 기본 인프라 설정

**작업 내용**:
- packages/studio-api/ 디렉토리 생성
- FastAPI 0.115+ 설치 (poetry)
- SQLAlchemy 2.0, Alembic 설정
- PostgreSQL Docker Compose 설정
- pytest 테스트 환경 구축

**산출물**:
- pyproject.toml
- docker-compose.yml
- alembic.ini
- conftest.py

**우선순위**: PRIMARY GOAL

---

### Task 2: 데이터베이스 스키마 설계

**설명**: Brand DNA, Preset, Version, User 테이블 스키마 작성

**작업 내용**:
- SQLAlchemy 모델 정의
- Alembic 마이그레이션 생성
- 인덱스 및 외래 키 설정
- 기본 데이터 시드 (프리셋)

**산출물**:
- models/brand_dna.py
- models/preset.py
- models/version.py
- models/user.py
- alembic/versions/001_initial_schema.py

**우선순위**: PRIMARY GOAL

---

### Task 3: Pydantic 스키마 및 검증

**설명**: API 요청/응답 스키마 정의 및 Zod 스키마 호환성 확보

**작업 내용**:
- Pydantic v2.9 모델 작성
- @tekton/studio-mcp의 Zod 스키마와 동기화
- 커스텀 Validator 작성
- 에러 응답 스키마 표준화

**산출물**:
- schemas/brand_dna.py
- schemas/preset.py
- schemas/auth.py
- schemas/errors.py

**우선순위**: PRIMARY GOAL

---

### Task 4: Brand DNA CRUD API

**설명**: Brand DNA 생성, 조회, 수정, 삭제 엔드포인트 구현

**작업 내용**:
- POST /api/v1/brand-dna
- GET /api/v1/brand-dna/:id
- PUT /api/v1/brand-dna/:id
- DELETE /api/v1/brand-dna/:id
- Repository 패턴 적용

**산출물**:
- routers/brand_dna.py
- repositories/brand_dna_repository.py
- tests/test_brand_dna_api.py

**우선순위**: PRIMARY GOAL

---

### Task 5: 프리셋 관리 API

**설명**: 기본 프리셋 제공 및 커스텀 프리셋 관리 엔드포인트 구현

**작업 내용**:
- GET /api/v1/presets (페이지네이션)
- POST /api/v1/presets (커스텀 프리셋 생성)
- 프리셋 검색 및 필터링
- 기본 프리셋 시드 데이터 로드

**산출물**:
- routers/presets.py
- repositories/preset_repository.py
- tests/test_presets_api.py

**우선순위**: SECONDARY GOAL

---

### Task 6: 인증 및 권한 관리

**설명**: JWT 기반 인증 시스템 구현

**작업 내용**:
- 회원가입, 로그인, 로그아웃 API
- JWT Access Token, Refresh Token 발급
- 인증 미들웨어 구현
- RBAC (Role-Based Access Control)

**산출물**:
- routers/auth.py
- middlewares/auth_middleware.py
- services/auth_service.py
- tests/test_auth_api.py

**우선순위**: SECONDARY GOAL

---

### Task 7: 버전 관리 시스템

**설명**: Brand DNA 변경 이력 및 버전 비교 기능 구현

**작업 내용**:
- GET /api/v1/brand-dna/:id/versions
- GET /api/v1/brand-dna/:id/compare
- 축 값 diff 계산 로직
- 자동 버전 생성 (업데이트 시)

**산출물**:
- routers/versions.py
- services/version_service.py
- tests/test_versions_api.py

**우선순위**: SECONDARY GOAL

---

### Task 8: 보안 및 Rate Limiting

**설명**: OWASP 보안 기준 준수 및 Rate Limiting 구현

**작업 내용**:
- CORS 설정
- OWASP 보안 헤더 추가
- slowapi Rate Limiting 적용
- SQL Injection 방어 검증

**산출물**:
- middlewares/security_middleware.py
- middlewares/rate_limiter.py
- tests/test_security.py

**우선순위**: FINAL GOAL

---

### Task 9: WebSocket 실시간 알림

**설명**: 팀원 간 실시간 편집 알림 구현

**작업 내용**:
- WebSocket 엔드포인트 (/ws)
- Redis Pub/Sub 통합
- 편집 알림 브로드캐스팅
- 연결 관리 (재연결 로직)

**산출물**:
- routers/websocket.py
- services/notification_service.py
- tests/test_websocket.py

**우선순위**: OPTIONAL GOAL

---

### Task 10: API 문서화 및 배포 준비

**설명**: OpenAPI 문서 생성 및 Docker 배포 설정

**작업 내용**:
- FastAPI 자동 문서 (Swagger UI)
- Dockerfile 작성
- Kubernetes 배포 YAML
- CI/CD 파이프라인 (.github/workflows)

**산출물**:
- Dockerfile
- k8s/deployment.yaml
- .github/workflows/deploy-api.yml
- docs/API.md

**우선순위**: OPTIONAL GOAL

---

## 의존성 그래프

```
Task 1 (초기화)
  ↓
Task 2 (DB 스키마) ─→ Task 3 (Pydantic 스키마)
  ↓                      ↓
Task 4 (Brand DNA CRUD) ─┬─→ Task 5 (프리셋 API)
  ↓                       │
Task 6 (인증) ───────────┘
  ↓
Task 7 (버전 관리)
  ↓
Task 8 (보안) ─→ Task 9 (WebSocket)
                    ↓
                Task 10 (문서화 & 배포)
```

## 리소스 요구사항

**개발 환경**:
- Python 3.13+
- Poetry (패키지 관리)
- Docker & Docker Compose
- PostgreSQL 17+ (Docker)
- Redis 7+ (Docker)

**필수 패키지**:
- FastAPI 0.115+
- SQLAlchemy 2.0
- Pydantic v2.9
- python-jose (JWT)
- passlib[bcrypt]

**배포 환경**:
- Kubernetes 클러스터 (권장) 또는 Docker Swarm
- PostgreSQL 관리형 서비스 (AWS RDS, Supabase 등)
- Redis 관리형 서비스 (AWS ElastiCache, Upstash 등)

## 마일스톤 구조

**Milestone 1: 핵심 API 기능 (Primary Goals)**
- Task 1: 프로젝트 초기화
- Task 2: 데이터베이스 스키마
- Task 3: Pydantic 스키마
- Task 4: Brand DNA CRUD

**Milestone 2: 프리셋 및 인증 (Secondary Goals)**
- Task 5: 프리셋 관리 API
- Task 6: 인증 및 권한 관리
- Task 7: 버전 관리 시스템

**Milestone 3: 보안 및 품질 (Final Goal)**
- Task 8: 보안 및 Rate Limiting

**Milestone 4: 실시간 기능 및 배포 (Optional Goals)**
- Task 9: WebSocket 실시간 알림
- Task 10: API 문서화 및 배포

## 위험 요소 및 완화 전략

**위험 1: PostgreSQL 성능 병목**
- 완화: 인덱스 최적화, 읽기 복제 준비
- 대안: Connection Pooling (pgbouncer)

**위험 2: JWT 토큰 탈취**
- 완화: Refresh Token Rotation, HTTP-only cookie
- 대안: 토큰 블랙리스트 (Redis)

**위험 3: WebSocket 연결 부하**
- 완화: Redis Pub/Sub로 연결 분산
- 대안: Socket.IO로 전환 (폴백 지원)

## 다음 단계

1. **즉시 시작 가능**: /moai:2-run SPEC-STUDIO-003
2. **병렬 개발**: SPEC-STUDIO-002 (프론트엔드)와 동시 작업 가능
3. **API 문서**: /moai:3-sync로 OpenAPI 문서 생성 및 동기화
