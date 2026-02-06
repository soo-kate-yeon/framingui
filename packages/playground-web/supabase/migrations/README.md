# Supabase Database Migrations

SPEC-DEPLOY-001에 정의된 데이터베이스 스키마 마이그레이션 가이드입니다.

## 📁 Migration Files

### 1. `20260204_initial_auth_schema.sql`
- **목적**: SPEC-AUTH-001 초기 인증 스키마
- **테이블**: `user_licenses`, `free_screen_templates`
- **상태**: ✅ 실행 완료 (추정)

### 2. `20260205000000_init_auth_schema.sql`
- **목적**: SPEC-AUTH-001 인증 스키마 (개선 버전)
- **테이블**: `user_licenses`, `free_screen_templates`
- **상태**: ✅ 실행 완료 (추정)

### 3. `20260206151505_deploy_001_schema.sql` 🆕
- **목적**: SPEC-DEPLOY-001 Phase 1.1 프로덕션 배포 스키마
- **테이블**:
  - `user_profiles` - 사용자 프로필 정보
  - `api_keys` - MCP 서버 인증용 API 키
  - `user_licenses` - 테마 라이선스 구매 (Enhanced)
- **상태**: ⏳ 실행 대기

---

## 🚨 Important: Schema Conflict Warning

### `user_licenses` 테이블 충돌 가능성

`20260206151505_deploy_001_schema.sql`의 `user_licenses` 테이블은 기존 마이그레이션과 스키마가 다릅니다:

#### 기존 스키마 (SPEC-AUTH-001)
```sql
theme_id VARCHAR(50)
paddle_subscription_id VARCHAR(100)
```

#### 새 스키마 (SPEC-DEPLOY-001)
```sql
theme_id TEXT
paddle_subscription_id TEXT
paddle_transaction_id TEXT  -- NEW
created_at TIMESTAMPTZ        -- NEW
updated_at TIMESTAMPTZ        -- NEW
```

### 해결 방법

**옵션 1: 기존 테이블 업데이트 (권장)**
```sql
-- Step 1: 새 컬럼 추가
ALTER TABLE public.user_licenses
  ADD COLUMN IF NOT EXISTS paddle_transaction_id TEXT,
  ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT now(),
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- Step 2: 컬럼 타입 변경 (데이터 손실 없음)
ALTER TABLE public.user_licenses
  ALTER COLUMN theme_id TYPE TEXT,
  ALTER COLUMN paddle_subscription_id TYPE TEXT;

-- Step 3: 새 마이그레이션에서 user_licenses 섹션 제외하고 실행
```

**옵션 2: 기존 테이블 삭제 후 재생성 (개발 환경만)**
```sql
-- ⚠️ 주의: 기존 데이터가 모두 삭제됩니다!
DROP TABLE IF EXISTS public.user_licenses CASCADE;

-- 이후 전체 마이그레이션 실행
```

**옵션 3: 마이그레이션 파일 수정**
- `20260206151505_deploy_001_schema.sql` 파일에서 `user_licenses` 섹션을 주석 처리하고
- `user_profiles`와 `api_keys` 테이블만 생성

---

## 🚀 Migration Execution Guide

### Method 1: Supabase Dashboard (GUI)

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
   - 파일 내용 전체 복사

4. **SQL 실행**
   - SQL Editor에 붙여넣기
   - 충돌 해결 방법 선택 (위 참고)
   - `RUN` 버튼 클릭

5. **실행 결과 확인**
   - 에러 없이 완료되는지 확인
   - `Table Editor`에서 새 테이블 확인

### Method 2: Supabase CLI (Recommended)

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
  AND table_name IN ('user_profiles', 'api_keys', 'user_licenses');
```

**Expected Result:**
```
 table_name
----------------
 user_profiles
 api_keys
 user_licenses
```

### 2. Indexes Created
```sql
SELECT indexname, tablename
FROM pg_indexes
WHERE schemaname = 'public'
  AND tablename IN ('user_profiles', 'api_keys', 'user_licenses');
```

### 3. RLS Policies Enabled
```sql
SELECT schemaname, tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('user_profiles', 'api_keys', 'user_licenses');
```

**Expected Result:** All `rowsecurity` should be `true`

### 4. RLS Policies Created
```sql
SELECT tablename, policyname
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('user_profiles', 'api_keys', 'user_licenses')
ORDER BY tablename, policyname;
```

**Expected Count:**
- `user_profiles`: 3 policies
- `api_keys`: 4 policies
- `user_licenses`: 2 policies

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

---

## 📚 Related Documentation

- [SPEC-DEPLOY-001 Specification](/.moai/specs/SPEC-DEPLOY-001/SPEC-DEPLOY-001.md)
- [Supabase Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)

---

## 🐛 Troubleshooting

### Error: "relation already exists"
```
ERROR:  relation "user_licenses" already exists
```
**Solution:** 기존 테이블과 충돌. 위의 "Schema Conflict Warning" 섹션 참고

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

**Last Updated:** 2026-02-06
**Maintained by:** SPEC-DEPLOY-001 Team
