-- ============================================================
-- Migration: SPEC-AUTH-001 - Supabase 인증 통합
-- Created: 2026-02-05
-- Description: 사용자 라이선스 및 무료 템플릿 테이블 생성
-- ============================================================

-- ============================================================
-- 1. user_licenses 테이블
-- ============================================================

CREATE TABLE IF NOT EXISTS public.user_licenses (
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

COMMENT ON TABLE public.user_licenses IS 'SPEC-AUTH-001: 사용자의 템플릿 라이선스 정보';
COMMENT ON COLUMN public.user_licenses.user_id IS 'auth.users 테이블 참조';
COMMENT ON COLUMN public.user_licenses.theme_id IS '구매한 템플릿 ID';
COMMENT ON COLUMN public.user_licenses.tier IS '라이선스 티어: single, double, creator';
COMMENT ON COLUMN public.user_licenses.paddle_subscription_id IS 'Paddle 결제 시스템 구독 ID';

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_user_licenses_user_id ON public.user_licenses(user_id);
CREATE INDEX IF NOT EXISTS idx_user_licenses_theme_id ON public.user_licenses(theme_id);
CREATE INDEX IF NOT EXISTS idx_user_licenses_is_active ON public.user_licenses(is_active);

-- ============================================================
-- 2. free_screen_templates 테이블
-- ============================================================

CREATE TABLE IF NOT EXISTS public.free_screen_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  is_free BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

COMMENT ON TABLE public.free_screen_templates IS 'SPEC-AUTH-001: 무료로 제공되는 스크린 템플릿 목록';
COMMENT ON COLUMN public.free_screen_templates.template_id IS '템플릿 고유 ID (코드 내 참조용)';
COMMENT ON COLUMN public.free_screen_templates.is_free IS '무료 제공 여부 (기본값: true)';

-- 기본 무료 템플릿 데이터
INSERT INTO public.free_screen_templates (template_id, name, description) VALUES
  ('landing-basic', 'Landing Basic', '기본 랜딩 페이지 템플릿'),
  ('signup', 'Sign Up', '회원가입 페이지 템플릿'),
  ('contact-form', 'Contact Form', '문의 양식 템플릿')
ON CONFLICT (template_id) DO NOTHING;

-- ============================================================
-- 3. Row Level Security (RLS) 정책
-- ============================================================

-- user_licenses RLS 활성화
ALTER TABLE public.user_licenses ENABLE ROW LEVEL SECURITY;

-- 정책 1: 사용자는 자신의 라이선스만 조회 가능
DROP POLICY IF EXISTS "Users can view own licenses" ON public.user_licenses;
CREATE POLICY "Users can view own licenses"
  ON public.user_licenses
  FOR SELECT
  USING (auth.uid() = user_id);

-- 정책 2: Service role은 모든 라이선스 관리 가능
DROP POLICY IF EXISTS "Service role can manage all licenses" ON public.user_licenses;
CREATE POLICY "Service role can manage all licenses"
  ON public.user_licenses
  FOR ALL
  USING (auth.role() = 'service_role');

-- free_screen_templates RLS 활성화
ALTER TABLE public.free_screen_templates ENABLE ROW LEVEL SECURITY;

-- 정책 3: 모든 사용자가 무료 템플릿 조회 가능
DROP POLICY IF EXISTS "Anyone can view free templates" ON public.free_screen_templates;
CREATE POLICY "Anyone can view free templates"
  ON public.free_screen_templates
  FOR SELECT
  USING (true);

-- 정책 4: Service role만 무료 템플릿 관리 가능
DROP POLICY IF EXISTS "Service role can manage free templates" ON public.free_screen_templates;
CREATE POLICY "Service role can manage free templates"
  ON public.free_screen_templates
  FOR ALL
  USING (auth.role() = 'service_role');

-- ============================================================
-- Migration Complete
-- ============================================================
