-- Migration: Allow authenticated users to create own trial license
-- Description: free-trial API insert 실패(creation_failed) 원인인 user_licenses INSERT RLS 정책 누락 보완

ALTER TABLE public.user_licenses ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can create own trial licenses" ON public.user_licenses;
CREATE POLICY "Users can create own trial licenses" ON public.user_licenses
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND type = 'trial'
    AND tier = 'creator'
    AND theme_id = 'trial-all-access'
    AND is_active = true
  );
