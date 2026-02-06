# Supabase Database Migrations

SPEC-DEPLOY-001에 정의된 데이터베이스 스키마 마이그레이션 가이드입니다.

## 📁 Active Migration Files

### `20260206151505_deploy_001_schema.sql` ✅ (Authoritative)

**목적**: SPEC-DEPLOY-001 Phase 1.1 - 통합된 프로덕션 배포 스키마

**테이블**:
1. `user_profiles` - 사용자 프로필 정보
2. `api_keys` - MCP 서버 인증용 API 키
3. `user_licenses` - 테마 라이선스 구매 (Enhanced)
4. `free_screen_templates` - 무료 스크린 템플릿 카탈로그

**통합 완료**: 이 파일은 다음 3개 마이그레이션을 통합했습니다:
- `20260204_initial_auth_schema.sql` (아카이브됨)
- `20260205000000_init_auth_schema.sql` (아카이브됨)
- `20260206151505_deploy_001_schema.sql` (현재 파일)

**특징**:
- ✅ Idempotent 작업 (DROP IF EXISTS, CREATE IF NOT EXISTS)
- ✅ 충돌 방지를 위한 CASCADE 처리
- ✅ 모든 테이블에 Row-Level Security 활성화
- ✅ 적절한 인덱스 및 제약조건
- ✅ Service role bypass 정책
- ✅ 여러 번 실행 가능 (안전)

**상태**: ⏳ 실행 대기

---

## 🗂️ Archived Migrations

구형 마이그레이션 파일들은 `_archive_old_migrations/` 디렉토리로 이동되었습니다:

- `_archive_old_migrations/20260204_initial_auth_schema.sql`
- `_archive_old_migrations/20260205000000_init_auth_schema.sql`

이 파일들은 **실행하지 마세요**. `20260206151505_deploy_001_schema.sql`이 이들을 모두 대체합니다.

아카이브된 파일들의 상세 정보는 `_archive_old_migrations/README.md`를 참조하세요.

---

## 🚀 Migration Execution Guide

### Method 1: Supabase Dashboard (GUI) - 권장

1. **Supabase Dashboard 접속**
   ```
   https://supabase.com/dashboard/project/[YOUR_PROJECT_ID]
   ```

2. **SQL Editor 열기**
   - 좌측 메뉴에서 `SQL Editor` 클릭
   - `New query` 버튼 클릭

3. **마이그레이션 SQL 복사**
   ```bash
   cat supabase/migrations/20260206151505_deploy_001_schema.sql
   ```

4. **SQL 실행**
   - SQL Editor에 붙여넣기
   - `RUN` 버튼 클릭

5. **실행 결과 확인**
   - 에러 없이 완료되는지 확인
   - `Table Editor`에서 4개 테이블 확인

### Method 2: Supabase CLI

#### Prerequisites
```bash
# Supabase CLI 설치
npm install -g supabase

# 프로젝트 디렉토리로 이동
cd packages/playground-web

# Supabase 로그인
supabase login
```

#### Migration Commands

```bash
# 1. 로컬 데이터베이스 시작 (선택사항 - 테스트용)
supabase start

# 2. 마이그레이션 적용 (로컬)
supabase db push

# 3. 원격 데이터베이스에 적용
supabase db push --db-url "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# 4. 마이그레이션 상태 확인
supabase migration list
```

#### Rollback (필요시)
```bash
# 마이그레이션 되돌리기
supabase db reset

# 특정 마이그레이션만 되돌리기
supabase migration repair [timestamp]
```

### Method 3: psql CLI

```bash
# Supabase 데이터베이스 연결
psql "postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres"

# 마이그레이션 실행
\i supabase/migrations/20260206151505_deploy_001_schema.sql

# 테이블 확인
\dt public.*

# 종료
\q
```

---

## ✅ Post-Migration Checklist

마이그레이션 실행 후 다음 항목들을 확인하세요:

### 1. Tables Created
```sql
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('user_profiles', 'api_keys', 'user_licenses', 'free_screen_templates');
```

**Expected Result:**
```
 table_name
------------------------
 user_profiles
 api_keys
 user_licenses
 free_screen_templates
```

### 2. Indexes Created
```sql
SELECT indexname, tablename
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('user_profiles', 'api_keys', 'user_licenses', 'free_screen_templates');
```

### 3. RLS Policies Enabled
```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('user_profiles', 'api_keys', 'user_licenses', 'free_screen_templates');
```

**Expected Result:** All `rowsecurity` should be `true`

### 4. RLS Policies Created
```sql
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('user_profiles', 'api_keys', 'user_licenses', 'free_screen_templates')
ORDER BY tablename, policyname;
```

**Expected Count:**
- `user_profiles`: 3 policies
- `api_keys`: 4 policies
- `user_licenses`: 2 policies
- `free_screen_templates`: 2 policies

---

## 🧪 Testing RLS Policies

### Test User Profile Access
```sql
-- As authenticated user
SET request.jwt.claims.sub = '[user-uuid]';

-- Should succeed: read own profile
SELECT * FROM public.user_profiles WHERE id = '[user-uuid]';

-- Should fail: read other's profile
SELECT * FROM public.user_profiles WHERE id != '[user-uuid]';
```

### Test API Keys Access
```sql
-- As authenticated user
SET request.jwt.claims.sub = '[user-uuid]';

-- Should succeed: create own key
INSERT INTO public.api_keys (user_id, key_hash, key_prefix, name)
VALUES ('[user-uuid]', 'hash123', 'tk_live_', 'Test Key');

-- Should fail: create key for another user
INSERT INTO public.api_keys (user_id, key_hash, key_prefix, name)
VALUES ('[other-user-uuid]', 'hash456', 'tk_live_', 'Malicious Key');
```

### Test Free Templates Access
```sql
-- Anyone can read active templates (no authentication required)
SELECT * FROM public.free_screen_templates WHERE is_active = true;

-- Service role can insert/update (backend only)
-- Run this via Supabase Edge Function or backend service
```

---

## 🔧 Schema Consolidation Details

### Why Consolidation Was Needed

이전에 3개의 마이그레이션 파일이 충돌하는 스키마를 정의하고 있었습니다:

1. `20260204_initial_auth_schema.sql`:
   - `user_licenses` (기본 버전)
   - `free_screen_templates`

2. `20260205000000_init_auth_schema.sql`:
   - `user_licenses` (개선 버전, Paddle 통합)
   - `free_screen_templates`

3. `20260206151505_deploy_001_schema.sql`:
   - `user_profiles`
   - `api_keys`
   - `user_licenses` (최종 버전)

### Resolution

`20260206151505_deploy_001_schema.sql`이 이제 **단일 권위 있는 스키마**로서:

- 모든 4개 테이블을 정의합니다
- Idempotent 작업으로 충돌 방지
- 구형 마이그레이션 아카이브 처리

---

## 📚 Related Documentation

- [SPEC-DEPLOY-001 Specification](/.moai/specs/SPEC-DEPLOY-001/SPEC-DEPLOY-001.md)
- [Archived Migrations](./_archive_old_migrations/README.md)
- [Supabase Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)

---

## 🐛 Troubleshooting

### Error: "relation already exists"
```
ERROR:  relation "user_licenses" already exists
```
**Solution:** 마이그레이션 파일이 이미 `DROP TABLE IF EXISTS`를 포함하므로, 정상적으로는 발생하지 않습니다. 수동으로 DROP 후 재실행하세요.

### Error: "permission denied for schema public"
```
ERROR:  permission denied for schema public
```
**Solution:** Service role key 사용 확인. Dashboard에서는 자동으로 service role 권한 사용

### Error: "relation does not exist"
```
ERROR:  relation "auth.users" does not exist
```
**Solution:** Supabase Auth가 활성화되지 않음. Dashboard > Authentication에서 활성화

---

## 📝 Next Steps

1. ✅ `20260206151505_deploy_001_schema.sql` 실행
2. ⏭️ Phase 1.2: API Key 생성/검증 로직 구현
3. ⏭️ Phase 1.3: Vercel 환경변수 설정
4. ⏭️ Phase 2: MCP 서버 배포

---

**Last Updated:** 2026-02-06 (Consolidated)
**Maintained by:** SPEC-DEPLOY-001 Team
