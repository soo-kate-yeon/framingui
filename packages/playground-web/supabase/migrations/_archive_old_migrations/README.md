# Archived Migration Files

이 디렉토리에는 통합 과정에서 대체된 구형 마이그레이션 파일들이 보관되어 있습니다.

## ⚠️ Important Notice

**이 파일들은 실행하지 마세요.** 이들은 역사적 참고용으로만 보관되며, `20260206151505_deploy_001_schema.sql`로 통합되었습니다.

---

## 📋 Archived Files

### 1. `20260204_initial_auth_schema.sql`

**원본 목적**: SPEC-AUTH-001 초기 인증 스키마

**포함 테이블**:
- `user_licenses` (기본 버전)
- `free_screen_templates`

**아카이브 사유**:
- 스키마가 불완전함 (Paddle 통합 미포함)
- `user_licenses` 테이블 정의가 이후 버전과 충돌

**대체됨**: 2026-02-06

---

### 2. `20260205000000_init_auth_schema.sql`

**원본 목적**: SPEC-AUTH-001 인증 스키마 (개선 버전)

**포함 테이블**:
- `user_licenses` (Paddle 통합 버전)
  - `paddle_subscription_id VARCHAR(100)` 추가
  - `paddle_transaction_id VARCHAR(100)` 추가
- `free_screen_templates`

**아카이브 사유**:
- 최신 스키마와 컬럼 타입 불일치 (VARCHAR vs TEXT)
- SPEC-DEPLOY-001의 `user_profiles`, `api_keys` 테이블 누락
- 통합 마이그레이션으로 대체 필요

**대체됨**: 2026-02-06

---

## 🔄 Schema Evolution Timeline

### Phase 1: Initial Schema (20260204)
```sql
user_licenses:
  - id, user_id, theme_id, tier, purchased_at, expires_at, is_active

free_screen_templates:
  - id, theme_id, screen_name, preview_url, download_url, is_active
```

### Phase 2: Paddle Integration (20260205)
```sql
user_licenses:
  + paddle_subscription_id VARCHAR(100)
  + paddle_transaction_id VARCHAR(100)
```

### Phase 3: SPEC-DEPLOY-001 Consolidation (20260206) ✅
```sql
user_licenses:
  - All columns from Phase 2
  - Changed VARCHAR to TEXT
  + created_at TIMESTAMPTZ
  + updated_at TIMESTAMPTZ

free_screen_templates:
  + screen_description TEXT
  + created_at TIMESTAMPTZ
  + updated_at TIMESTAMPTZ

+ user_profiles (NEW)
+ api_keys (NEW)
```

---

## 📊 Schema Comparison

### `user_licenses` Table Evolution

| Column | Phase 1 (20260204) | Phase 2 (20260205) | Phase 3 (20260206) ✅ |
|--------|-------------------|-------------------|---------------------|
| `id` | UUID | UUID | UUID |
| `user_id` | UUID | UUID | UUID |
| `theme_id` | VARCHAR(50) | VARCHAR(50) | **TEXT** |
| `tier` | TEXT | TEXT | TEXT |
| `paddle_subscription_id` | ❌ | VARCHAR(100) | **TEXT** |
| `paddle_transaction_id` | ❌ | VARCHAR(100) | **TEXT** |
| `purchased_at` | TIMESTAMPTZ | TIMESTAMPTZ | TIMESTAMPTZ |
| `expires_at` | TIMESTAMPTZ | TIMESTAMPTZ | TIMESTAMPTZ |
| `is_active` | BOOLEAN | BOOLEAN | BOOLEAN |
| `created_at` | ❌ | ❌ | **TIMESTAMPTZ** |
| `updated_at` | ❌ | ❌ | **TIMESTAMPTZ** |

### Key Changes in Phase 3

1. **Type Normalization**: All `VARCHAR(n)` → `TEXT`
   - Reason: PostgreSQL `TEXT` has no performance penalty and removes arbitrary length limits

2. **Audit Timestamps**: Added `created_at` and `updated_at`
   - Reason: Essential for debugging and analytics

3. **New Tables**: Added `user_profiles` and `api_keys`
   - Reason: SPEC-DEPLOY-001 requirements for MCP server integration

4. **Idempotency**: Added `DROP IF EXISTS` and `DROP POLICY IF EXISTS`
   - Reason: Safe to run multiple times, prevents conflicts

---

## 🚫 Why Not To Use These Files

### Data Integrity Issues

1. **Schema Conflicts**: Running these files after the consolidated migration creates duplicate/conflicting table definitions

2. **Missing Features**: These files lack:
   - `user_profiles` table
   - `api_keys` table
   - Proper RLS policies for service role
   - Updated column types (TEXT vs VARCHAR)
   - Audit timestamps

3. **No Idempotency**:
   - Phase 1 and 2 don't include `DROP IF EXISTS`
   - Can fail if tables already exist
   - Not safe for re-runs

### Migration Path Forward

✅ **Correct Approach**:
```bash
# Use the consolidated migration
psql < supabase/migrations/20260206151505_deploy_001_schema.sql
```

❌ **Incorrect Approach**:
```bash
# DO NOT run archived files
psql < _archive_old_migrations/20260204_initial_auth_schema.sql  # ❌
psql < _archive_old_migrations/20260205000000_init_auth_schema.sql  # ❌
```

---

## 📚 Historical Reference Only

이 파일들은 다음 목적으로만 보관됩니다:

1. **Audit Trail**: 스키마 변경 이력 추적
2. **Rollback Reference**: 필요시 이전 상태 확인
3. **Documentation**: 설계 결정 과정 이해
4. **Troubleshooting**: 레거시 데이터베이스 상태 분석

---

## 🔗 Related Documentation

- [Active Migration Guide](../README.md)
- [SPEC-DEPLOY-001 Specification](/.moai/specs/SPEC-DEPLOY-001/SPEC-DEPLOY-001.md)
- [Consolidated Schema](../20260206151505_deploy_001_schema.sql)

---

**Archived On:** 2026-02-06
**Reason:** Schema consolidation for SPEC-DEPLOY-001
**Replaced By:** `20260206151505_deploy_001_schema.sql`
