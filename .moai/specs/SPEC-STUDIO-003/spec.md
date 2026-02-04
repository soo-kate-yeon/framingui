---
id: SPEC-STUDIO-003
version: "1.0.0"
status: "draft"
created: "2026-01-13"
updated: "2026-01-13"
author: "asleep"
priority: "HIGH"
---

## HISTORY

- 2026-01-13: Initial SPEC creation

# SPEC-STUDIO-003: 웹 스튜디오 백엔드 API

## 개요

RESTful API 기반의 Brand DNA 관리 백엔드 서비스입니다. 프리셋 관리, Brand DNA 검증, 버전 관리, 협업 기능을 제공하며, SPEC-STUDIO-002(프론트엔드)와 통신하여 완전한 웹 스튜디오 경험을 구현합니다.

## 핵심 기능

1. **Brand DNA CRUD**
   - Brand DNA 생성, 조회, 수정, 삭제
   - Zod 스키마 기반 서버 측 검증
   - PostgreSQL 데이터베이스 저장

2. **프리셋 관리**
   - 기본 프리셋 제공 (Modern Tech, Luxury Fashion, Friendly Casual)
   - 사용자 커스텀 프리셋 생성 및 공유
   - 프리셋 검색 및 필터링

3. **버전 관리**
   - Brand DNA 변경 이력 저장
   - 버전 간 비교 기능
   - 롤백 지원

4. **협업 기능**
   - 팀원 간 Brand DNA 공유
   - 실시간 편집 알림 (WebSocket)
   - 댓글 및 피드백 시스템

## 요구사항 (EARS)

### Ubiquitous (항상 적용)

**REQ-BE-001: Zod 스키마 기반 서버 측 검증**

시스템은 **항상** 모든 API 요청을 Zod 스키마로 검증해야 한다.

- 클라이언트 검증 우회 방지
- 검증 실패 시 422 Unprocessable Entity 응답
- 명확한 에러 메시지 제공

**REQ-BE-002: 인증 및 권한 관리**

시스템은 **항상** JWT 기반 인증을 수행해야 한다.

- 모든 보호된 엔드포인트에 인증 필수
- 역할 기반 접근 제어 (RBAC): admin, user, guest
- 만료된 토큰 자동 갱신 (Refresh Token)

**REQ-BE-003: CORS 및 보안 헤더**

시스템은 **항상** CORS 정책을 적용하고 보안 헤더를 설정해야 한다.

- 허용된 Origin 화이트리스트
- HTTPS 강제 (프로덕션)
- OWASP 보안 헤더 (X-Content-Type-Options, X-Frame-Options 등)

### Event-Driven (이벤트 기반)

**REQ-BE-004: Brand DNA 생성 시 검증 및 저장**

**WHEN** 클라이언트가 Brand DNA 생성 요청을 보내면, **THEN** 시스템은 검증 후 데이터베이스에 저장해야 한다.

- POST /api/v1/brand-dna 엔드포인트
- Zod 스키마 검증
- PostgreSQL 트랜잭션 사용

**REQ-BE-005: 프리셋 로드 시 조회 및 반환**

**WHEN** 클라이언트가 프리셋 목록 조회 요청을 보내면, **THEN** 시스템은 기본 프리셋과 사용자 프리셋을 반환해야 한다.

- GET /api/v1/presets 엔드포인트
- 기본 프리셋 우선 정렬
- 페이지네이션 지원 (page, size)

**REQ-BE-006: 버전 비교 요청 시 diff 계산**

**WHEN** 클라이언트가 두 버전 비교 요청을 보내면, **THEN** 시스템은 축 값 차이를 계산하여 반환해야 한다.

- GET /api/v1/brand-dna/:id/compare?v1=1&v2=2 엔드포인트
- 축별 차이값 계산
- 변경된 디자인 토큰 목록 제공

### State-Driven (상태 기반)

**REQ-BE-007: 인증 실패 시 401 응답**

**IF** JWT 토큰이 없거나 유효하지 않으면, **THEN** 시스템은 401 Unauthorized 응답을 반환해야 한다.

- 인증 미들웨어 적용
- 토큰 만료 시 재로그인 안내

**REQ-BE-008: 권한 부족 시 403 응답**

**IF** 사용자가 리소스에 대한 권한이 없으면, **THEN** 시스템은 403 Forbidden 응답을 반환해야 한다.

- 소유자만 수정/삭제 가능
- 관리자는 모든 리소스 접근 가능

### Unwanted (금지 행위)

**REQ-BE-009: 비밀번호 평문 저장 금지**

시스템은 **절대로** 사용자 비밀번호를 평문으로 저장해서는 안 된다.

- bcrypt 해싱 (salt rounds: 12)
- 비밀번호 로그 출력 금지

## 기술 스택

**백엔드 프레임워크**:
- FastAPI 0.115+ (Python 3.13)
- Uvicorn (ASGI 서버)
- Pydantic v2.9 (데이터 검증)

**데이터베이스**:
- PostgreSQL 17+
- SQLAlchemy 2.0 (ORM)
- Alembic (마이그레이션)

**인증**:
- python-jose (JWT)
- passlib[bcrypt] (비밀번호 해싱)

**실시간 통신**:
- WebSocket (FastAPI 내장)
- Redis (Pub/Sub, 세션 관리)

**테스팅**:
- pytest 8.0+
- pytest-asyncio
- httpx (비동기 HTTP 클라이언트)

## API 엔드포인트 설계

### Brand DNA API

**POST /api/v1/brand-dna**
- 요청: BrandDNACreate (name, axes)
- 응답: BrandDNAResponse (id, name, axes, created_at)
- 인증: 필수

**GET /api/v1/brand-dna/:id**
- 응답: BrandDNAResponse
- 인증: 선택 (public 프리셋은 인증 불필요)

**PUT /api/v1/brand-dna/:id**
- 요청: BrandDNAUpdate
- 응답: BrandDNAResponse
- 인증: 필수, 소유자만 가능

**DELETE /api/v1/brand-dna/:id**
- 응답: 204 No Content
- 인증: 필수, 소유자 또는 관리자

### Presets API

**GET /api/v1/presets**
- 쿼리 파라미터: ?page=1&size=20&type=default|custom
- 응답: PresetListResponse (items, total, page, size)
- 인증: 선택

**POST /api/v1/presets**
- 요청: PresetCreate (name, description, brand_dna_id)
- 응답: PresetResponse
- 인증: 필수

### Versions API

**GET /api/v1/brand-dna/:id/versions**
- 응답: VersionListResponse
- 인증: 필수, 소유자만 가능

**GET /api/v1/brand-dna/:id/compare**
- 쿼리 파라미터: ?v1=1&v2=2
- 응답: CompareResponse (diff, changes)
- 인증: 필수

## 의존성

**필수 의존성**:
- PostgreSQL 17+ 데이터베이스 인스턴스
- Redis 7+ 서버 (실시간 기능용)

**비차단 의존성**:
- SPEC-STUDIO-002 (프론트엔드) - API 단독 테스트 가능
- 이메일 서비스 (비밀번호 재설정) - 추후 구현

## 기술적 제약사항

**성능 요구사항**:
- API 응답 시간 < 200ms (P95)
- 동시 접속자 1,000명 처리
- WebSocket 연결 유지 (24시간)

**보안 요구사항**:
- OWASP Top 10 대응
- SQL Injection 방어 (SQLAlchemy ORM 사용)
- CSRF 방어 (SameSite cookie)

**확장성 요구사항**:
- 수평 확장 가능 (Stateless 서버)
- 데이터베이스 읽기 복제 지원 준비

## 보안 고려사항

**SQL Injection 방지**:
- SQLAlchemy ORM 사용 (Raw query 금지)
- 사용자 입력 Parameterized Query 처리

**인증 토큰 보안**:
- JWT Access Token (15분 만료)
- Refresh Token (7일 만료, HTTP-only cookie)
- 토큰 블랙리스트 (Redis)

**Rate Limiting**:
- IP 기반 Rate Limiting (분당 100 요청)
- 인증된 사용자 (분당 300 요청)
- slowapi 라이브러리 사용
