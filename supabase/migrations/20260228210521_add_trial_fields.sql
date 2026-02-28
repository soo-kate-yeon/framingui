-- Migration: Add trial support to user_licenses table
-- Description: trial 타입 라이선스 지원을 위한 type 컬럼 추가

-- 1. type 컬럼 추가 (trial, individual, creator)
ALTER TABLE user_licenses
ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'individual'
CHECK (type IN ('trial', 'individual', 'creator'));

-- 2. 기존 레코드의 type을 tier 기반으로 설정
UPDATE user_licenses
SET type = CASE
  WHEN tier = 'creator' THEN 'creator'
  ELSE 'individual'
END
WHERE type = 'individual';

-- 3. 인덱스 추가: trial 라이선스 조회 성능 최적화
CREATE INDEX IF NOT EXISTS idx_user_licenses_type_user_id
ON user_licenses(type, user_id)
WHERE type = 'trial';

-- 4. 코멘트 추가
COMMENT ON COLUMN user_licenses.type IS 'License type: trial (3-day free trial), individual (paid single/double theme), creator (paid all-access)';
