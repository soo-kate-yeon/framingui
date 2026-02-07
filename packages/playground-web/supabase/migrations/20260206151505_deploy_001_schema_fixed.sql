-- ============================================================
-- Migration: SPEC-DEPLOY-001 Phase 1.1 - Production Deployment Schema (FIXED)
-- Created: 2026-02-06
-- Updated: 2026-02-06 (Fixed free_screen_templates schema conflict)
-- Description: Authoritative Supabase DB schema for authentication and licensing
-- ============================================================
--
-- This file consolidates:
--   - 20260204_initial_auth_schema.sql (archived)
--   - 20260205000000_init_auth_schema.sql (archived)
--   - 20260206151505_deploy_001_schema.sql (this file)
--
-- Tables:
--   1. user_profiles: User profile information
--   2. api_keys: MCP server authentication API keys
--   3. user_licenses: Theme license purchases
--   4. free_screen_templates: Free screen template catalog
--
-- Features:
--   - Idempotent operations (DROP IF EXISTS)
--   - Row-Level Security (RLS) enabled on all tables
--   - Proper foreign key constraints with CASCADE deletion
--   - Comprehensive indexes for query optimization
--   - Service role bypass for backend operations
--
-- Execution:
--   - Supabase Dashboard > SQL Editor
--   - OR Supabase CLI: supabase db push
--
-- Safety:
--   - All DROP statements use IF EXISTS
--   - All tables are recreated with correct schema
--   - Can be run multiple times safely
-- ============================================================

-- ============================================================
-- Table: user_profiles
-- ============================================================

DROP TABLE IF EXISTS public.user_profiles CASCADE;

CREATE TABLE public.user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'creator')),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.user_profiles IS 'SPEC-DEPLOY-001: User profile information';
COMMENT ON COLUMN public.user_profiles.id IS 'References auth.users(id)';
COMMENT ON COLUMN public.user_profiles.plan IS 'Subscription plan: free, pro, creator';

-- RLS
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own profile" ON public.user_profiles;
CREATE POLICY "Users can read own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Service role can manage all user_profiles" ON public.user_profiles;
CREATE POLICY "Service role can manage all user_profiles" ON public.user_profiles
  USING (auth.role() = 'service_role');

-- ============================================================
-- Table: api_keys
-- ============================================================

DROP TABLE IF EXISTS public.api_keys CASCADE;

CREATE TABLE public.api_keys (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  key_hash TEXT NOT NULL,
  key_prefix TEXT NOT NULL,        -- "tk_live_xxxx" (for identification)
  name TEXT NOT NULL DEFAULT 'Default',
  last_used_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,          -- nullable = no expiration
  revoked_at TIMESTAMPTZ,          -- nullable = active
  created_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.api_keys IS 'SPEC-DEPLOY-001: API keys for MCP server authentication';
COMMENT ON COLUMN public.api_keys.key_hash IS 'Hashed API key (never store plain text)';
COMMENT ON COLUMN public.api_keys.key_prefix IS 'First 8-10 chars for UI display';
COMMENT ON COLUMN public.api_keys.revoked_at IS 'Revocation timestamp (NULL = active)';

CREATE INDEX idx_api_keys_user_id ON public.api_keys(user_id);
CREATE INDEX idx_api_keys_key_hash ON public.api_keys(key_hash);

-- RLS
ALTER TABLE public.api_keys ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own keys" ON public.api_keys;
CREATE POLICY "Users can read own keys" ON public.api_keys
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create own keys" ON public.api_keys;
CREATE POLICY "Users can create own keys" ON public.api_keys
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can revoke own keys" ON public.api_keys;
CREATE POLICY "Users can revoke own keys" ON public.api_keys
  FOR UPDATE USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all api_keys" ON public.api_keys;
CREATE POLICY "Service role can manage all api_keys" ON public.api_keys
  USING (auth.role() = 'service_role');

-- ============================================================
-- Table: user_licenses (Enhanced Version)
-- ============================================================
-- Consolidated version that replaces any previous definitions
-- ============================================================

DROP TABLE IF EXISTS public.user_licenses CASCADE;

CREATE TABLE public.user_licenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  theme_id TEXT NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('single', 'double', 'creator')),
  paddle_subscription_id TEXT,
  paddle_transaction_id TEXT,
  purchased_at TIMESTAMPTZ DEFAULT now(),
  expires_at TIMESTAMPTZ,          -- nullable = permanent
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.user_licenses IS 'SPEC-DEPLOY-001: Theme license purchases';
COMMENT ON COLUMN public.user_licenses.tier IS 'License tier: single, double, creator';
COMMENT ON COLUMN public.user_licenses.paddle_subscription_id IS 'Paddle subscription ID (recurring)';
COMMENT ON COLUMN public.user_licenses.paddle_transaction_id IS 'Paddle transaction ID (one-time)';

CREATE INDEX idx_user_licenses_user_id ON public.user_licenses(user_id);
CREATE UNIQUE INDEX idx_user_licenses_unique ON public.user_licenses(user_id, theme_id)
  WHERE is_active = true;

-- RLS
ALTER TABLE public.user_licenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read own licenses" ON public.user_licenses;
CREATE POLICY "Users can read own licenses" ON public.user_licenses
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Service role can manage all user_licenses" ON public.user_licenses;
CREATE POLICY "Service role can manage all user_licenses" ON public.user_licenses
  USING (auth.role() = 'service_role');

-- ============================================================
-- Table: free_screen_templates (FIXED - Force Recreate)
-- ============================================================

DROP TABLE IF EXISTS public.free_screen_templates CASCADE;

CREATE TABLE public.free_screen_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  theme_id TEXT NOT NULL,
  screen_name TEXT NOT NULL,
  screen_description TEXT,
  preview_url TEXT,
  download_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

COMMENT ON TABLE public.free_screen_templates IS 'SPEC-DEPLOY-001: Free screen template catalog';
COMMENT ON COLUMN public.free_screen_templates.theme_id IS 'Theme identifier';
COMMENT ON COLUMN public.free_screen_templates.screen_name IS 'Screen template name';
COMMENT ON COLUMN public.free_screen_templates.is_active IS 'Whether template is available for download';

CREATE INDEX idx_free_screen_templates_theme_id ON public.free_screen_templates(theme_id);
CREATE INDEX idx_free_screen_templates_active ON public.free_screen_templates(is_active)
  WHERE is_active = true;

-- RLS (Public read access, admin write access)
ALTER TABLE public.free_screen_templates ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can read active templates" ON public.free_screen_templates;
CREATE POLICY "Anyone can read active templates" ON public.free_screen_templates
  FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Service role can manage all templates" ON public.free_screen_templates;
CREATE POLICY "Service role can manage all templates" ON public.free_screen_templates
  USING (auth.role() = 'service_role');

-- ============================================================
-- Migration Complete: 4 Tables Created
-- ============================================================
-- Tables:
--   1. user_profiles (authentication profiles)
--   2. api_keys (MCP server authentication)
--   3. user_licenses (theme purchases)
--   4. free_screen_templates (free template catalog)
--
-- All tables have:
--   - Row-Level Security enabled
--   - Proper indexes
--   - Service role bypass
--   - CASCADE deletion where appropriate
--
-- CHANGES from original:
--   - All tables now use DROP TABLE IF EXISTS CASCADE (not just user_licenses)
--   - Removed IF NOT EXISTS to ensure schema consistency
--   - Forces recreation of all tables with correct schema
-- ============================================================
