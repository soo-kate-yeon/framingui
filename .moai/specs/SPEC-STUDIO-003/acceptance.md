# SPEC-STUDIO-003: 웹 스튜디오 백엔드 API 수락 기준

## 수락 시나리오 (Given/When/Then 형식)

### Scenario 1: Brand DNA 생성 및 검증

**Given**: 인증된 사용자가 API에 접근할 때

**When**: POST /api/v1/brand-dna 엔드포인트로 유효한 Brand DNA 데이터를 전송하면

**Then**:
- 201 Created 상태 코드가 반환되어야 함
- 응답에 생성된 Brand DNA ID가 포함되어야 함
- 데이터베이스에 Brand DNA가 저장되어야 함
- 생성 시각(created_at)이 자동으로 기록되어야 함

---

### Scenario 2: 검증 실패 처리

**Given**: 인증된 사용자가 API에 접근할 때

**When**: Density 값을 1.5로 설정한 잘못된 Brand DNA를 전송하면 (범위 초과)

**Then**:
- 422 Unprocessable Entity 상태 코드가 반환되어야 함
- 응답에 "Density must be between 0.0 and 1.0" 에러 메시지가 포함되어야 함
- 데이터베이스에 데이터가 저장되지 않아야 함

---

### Scenario 3: 인증 실패 처리

**Given**: 비인증 사용자가 API에 접근할 때

**When**: Authorization 헤더 없이 POST /api/v1/brand-dna 요청을 보내면

**Then**:
- 401 Unauthorized 상태 코드가 반환되어야 함
- 응답에 "Not authenticated" 에러 메시지가 포함되어야 함
- 데이터베이스에 어떠한 변경도 발생하지 않아야 함

---

### Scenario 4: 프리셋 목록 조회

**Given**: 사용자가 프리셋을 조회하려고 할 때

**When**: GET /api/v1/presets?page=1&size=10 요청을 보내면

**Then**:
- 200 OK 상태 코드가 반환되어야 함
- 응답에 기본 프리셋 3개(Modern Tech, Luxury Fashion, Friendly Casual)가 포함되어야 함
- 페이지네이션 메타데이터(total, page, size)가 포함되어야 함
- 기본 프리셋이 커스텀 프리셋보다 먼저 정렬되어야 함

---

### Scenario 5: 버전 비교 기능

**Given**: Brand DNA의 두 버전이 존재할 때

**When**: GET /api/v1/brand-dna/123/compare?v1=1&v2=2 요청을 보내면

**Then**:
- 200 OK 상태 코드가 반환되어야 함
- 응답에 축별 차이값(diff)이 포함되어야 함
- 변경된 디자인 토큰 목록이 포함되어야 함
- 차이가 없는 축은 0.0으로 표시되어야 함

---

## 성능 기준

### API 응답 시간

**P50 (중간값)**:
- 목표: < 50ms
- 최소: < 100ms

**P95 (95번째 백분위수)**:
- 목표: < 200ms
- 최소: < 500ms

**P99 (99번째 백분위수)**:
- 목표: < 500ms
- 최소: < 1000ms

### 처리량 (Throughput)

**동시 요청 처리**:
- 목표: 1,000 RPS (Requests Per Second)
- 최소: 500 RPS

**WebSocket 동시 연결**:
- 목표: 5,000 connections
- 최소: 1,000 connections

---

## 보안 기준

### OWASP Top 10 대응

**SQL Injection 방지**:
- SQLAlchemy ORM 사용 검증
- Raw query 사용 건수: 0건

**XSS 방지**:
- 모든 사용자 입력 이스케이프 처리
- Content-Type 검증

**인증 및 세션 관리**:
- JWT 토큰 만료 시간: Access Token 15분, Refresh Token 7일
- 토큰 블랙리스트 (로그아웃 시)

**보안 헤더**:
- X-Content-Type-Options: nosniff ✅
- X-Frame-Options: DENY ✅
- Strict-Transport-Security: max-age=31536000 ✅

### Rate Limiting

**IP 기반 제한**:
- 비인증 사용자: 분당 100 요청
- 인증 사용자: 분당 300 요청

**제한 초과 시**:
- 429 Too Many Requests 상태 코드 반환
- Retry-After 헤더 포함

---

## 데이터베이스 기준

### 인덱스 설정

**필수 인덱스**:
- brand_dna.user_id (검색 속도 향상)
- preset.name (검색 최적화)
- version.brand_dna_id, version.version_number (버전 조회)

### 트랜잭션 격리

**격리 수준**:
- READ COMMITTED (기본값)
- Serializable (버전 충돌 방지)

---

## 테스트 커버리지

**단위 테스트**:
- 목표: ≥ 90%
- 최소: ≥ 85%

**통합 테스트**:
- 모든 API 엔드포인트 커버
- 인증/권한 시나리오 검증

**부하 테스트**:
- Locust 또는 k6 사용
- 1,000 RPS 처리 검증

---

## 배포 기준

### Docker 빌드

**빌드 성공**:
- 빌드 에러: 0건
- 이미지 크기: < 500MB (목표 < 300MB)

**컨테이너 실행**:
- 헬스 체크 엔드포인트 (/health) 정상 응답
- PostgreSQL, Redis 연결 성공

### Kubernetes 배포

**Deployment 성공**:
- Readiness Probe 통과
- Liveness Probe 통과
- Rolling Update 무중단 배포

**환경 변수 설정**:
- DATABASE_URL 검증
- REDIS_URL 검증
- JWT_SECRET_KEY 검증 (프로덕션 환경)

---

## API 문서화

**OpenAPI 문서**:
- Swagger UI 접근 가능 (/docs)
- ReDoc 접근 가능 (/redoc)
- 모든 엔드포인트 문서화

**예제 요청/응답**:
- 각 엔드포인트에 예제 포함
- 에러 응답 예제 포함

---

## 최종 체크리스트

- [ ] 모든 Scenario 1-5 통과
- [ ] P95 응답 시간 < 200ms
- [ ] OWASP Top 10 보안 기준 충족
- [ ] Rate Limiting 적용 및 검증
- [ ] 테스트 커버리지 ≥ 85%
- [ ] Docker 빌드 및 Kubernetes 배포 성공
- [ ] OpenAPI 문서 완성
- [ ] 데이터베이스 인덱스 최적화
- [ ] WebSocket 실시간 알림 동작 (Optional)
