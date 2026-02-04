-- SPEC-AUTH-001: Supabase 인증 통합
-- Initial Authentication Schema Migration
--
-- [TAG-AUTH-001-U003] 사용자 데이터는 PostgreSQL 데이터베이스에 저장되어야 한다
--
-- WHY: 사용자 라이선스와 무료 템플릿 정보를 관리하기 위한 데이터베이스 스키마
-- IMPACT: 라이선스 검증 및 템플릿 접근 제어의 기반이 됨

-- ============================================
-- 1. user_licenses 테이블 생성
-- ============================================

CREATE TABLE IF NOT EXISTS user_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  theme_id VARCHAR(50) NOT NULL,
  tier VARCHAR(20) CHECK (tier IN ('single', 'double', 'creator')),
  paddle_subscription_id VARCHAR(100),
  purchased_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT true,
  UNIQUE(user_id, theme_id)
);

-- 인덱스 생성
CREATE INDEX idx_user_licenses_user_id ON user_licenses(user_id);
CREATE INDEX idx_user_licenses_theme_id ON user_licenses(theme_id);
CREATE INDEX idx_user_licenses_is_active ON user_licenses(is_active);

COMMENT ON TABLE user_licenses IS '사용자의 템플릿 라이선스 정보';
COMMENT ON COLUMN user_licenses.tier IS '라이선스 등급: single(단일 프로젝트), double(2개 프로젝트), creator(무제한)';
COMMENT ON COLUMN user_licenses.is_active IS '라이선스 활성 상태 (결제 실패 시 false)';

-- ============================================
-- 2. free_screen_templates 테이블 생성
-- ============================================

CREATE TABLE IF NOT EXISTS free_screen_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_free BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE free_screen_templates IS '무료로 제공되는 스크린 템플릿 목록';
COMMENT ON COLUMN free_screen_templates.template_id IS '템플릿 식별자 (코드에서 참조)';

-- ============================================
-- 3. 기본 무료 템플릿 데이터 삽입
-- ============================================

INSERT INTO free_screen_templates (template_id, name, description) VALUES
  ('landing-basic', 'Landing Basic', '기본 랜딩 페이지 템플릿'),
  ('signup', 'Sign Up', '회원가입 페이지 템플릿'),
  ('contact-form', 'Contact Form', '문의 양식 템플릿')
ON CONFLICT (template_id) DO NOTHING;

-- ============================================
-- 4. Row Level Security (RLS) 정책
-- ============================================

-- user_licenses RLS 활성화
ALTER TABLE user_licenses ENABLE ROW LEVEL SECURITY;

-- 사용자는 자신의 라이선스만 조회 가능
CREATE POLICY "Users can view own licenses"
  ON user_licenses FOR SELECT
  USING (auth.uid() = user_id);

-- Service Role은 모든 라이선스 관리 가능 (결제 시스템 연동용)
CREATE POLICY "Service role can manage all licenses"
  ON user_licenses FOR ALL
  USING (auth.role() = 'service_role');

-- free_screen_templates RLS 활성화
ALTER TABLE free_screen_templates ENABLE ROW LEVEL SECURITY;

-- 모든 사용자는 무료 템플릿 목록 조회 가능
CREATE POLICY "Anyone can view free templates"
  ON free_screen_templates FOR SELECT
  USING (true);
