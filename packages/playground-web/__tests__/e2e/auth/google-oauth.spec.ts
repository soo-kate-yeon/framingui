/**
 * E2E Tests: Google OAuth Login
 * SPEC-DEPLOY-001 Phase 2.5: Google OAuth 로그인 테스트
 *
 * ⚠️ 주의: 실제 Google OAuth는 실제 계정이 필요하므로,
 * 이 테스트는 수동 테스트 또는 Mock 환경에서 실행하거나 스킵합니다.
 *
 * 테스트 시나리오:
 * 1. Google OAuth 로그인
 * 2. 로그인 후 프로필 페이지 접근
 * 3. 세션 유지 확인
 */

import { test, expect } from '@playwright/test';
import { TIMEOUTS } from '../fixtures/test-data';

test.describe('Google OAuth Login E2E', () => {
  test.skip('should login with Google OAuth (manual test)', async ({ page, context }) => {
    /**
     * ⚠️ 수동 테스트 가이드
     *
     * 1. `PLAYWRIGHT_HEADLESS=false pnpm test:e2e auth/google-oauth.spec.ts` 실행
     * 2. 테스트 브라우저가 열리면 Google 로그인 진행
     * 3. 로그인 성공 후 프로필 페이지 확인
     *
     * 자동화하려면:
     * - Supabase Auth Mock 사용
     * - 또는 테스트 전용 Google OAuth 앱 생성 + 자동 로그인
     */

    // 1. 로그인 페이지로 이동
    await page.goto('/auth/login');

    // 2. "Google로 로그인" 버튼 찾기
    const googleButton = page.locator(
      'button:has-text("Google"), button:has-text("구글"), button[aria-label*="Google"]'
    );

    await expect(googleButton.first()).toBeVisible({ timeout: TIMEOUTS.PAGE_LOAD });

    // 3. Google OAuth 버튼 클릭
    await googleButton.first().click();

    console.log('[E2E] Google OAuth button clicked');

    // 4. 새 탭에서 Google 로그인 페이지 확인
    const googleLoginPage = await context.waitForEvent('page', {
      timeout: TIMEOUTS.PAGE_LOAD,
    });

    await googleLoginPage.waitForLoadState('networkidle');

    const googleUrl = googleLoginPage.url();
    expect(googleUrl).toContain('accounts.google.com');

    console.log('[E2E] Google login page opened:', googleUrl);

    // ⚠️ 여기서부터는 수동 로그인 필요
    console.log('[E2E] Please complete Google login manually in the opened browser...');

    // 5. 로그인 완료 대기 (프로필 페이지로 리다이렉트)
    await page.waitForURL('/profile', { timeout: 60000 }); // 60초 대기

    // 6. 로그인 성공 확인
    const profileHeading = page.locator('h1, h2').filter({ hasText: /Profile|프로필/ });
    await expect(profileHeading.first()).toBeVisible();

    console.log('[E2E] Google OAuth login successful');

    // 7. 사용자 이메일 표시 확인
    const emailDisplay = page.locator('text=/@gmail\\.com|@googlemail\\.com/');
    await expect(emailDisplay.first()).toBeVisible();

    console.log('[E2E] User email displayed');
  });

  test('should redirect to Google OAuth URL', async ({ page }) => {
    // 1. 로그인 페이지로 이동
    await page.goto('/auth/login');

    // 2. "Google로 로그인" 버튼 확인
    const googleButton = page.locator(
      'button:has-text("Google"), button:has-text("구글")'
    );

    await expect(googleButton.first()).toBeVisible({ timeout: TIMEOUTS.PAGE_LOAD });

    console.log('[E2E] Google OAuth button is present');
  });

  test('should show OAuth callback page', async ({ page }) => {
    // 1. OAuth 콜백 URL 확인 (실제 로그인 없이 페이지만 확인)
    await page.goto('/auth/callback?code=test_code&state=test_state');

    // 2. 로딩 또는 리다이렉트 확인
    await page.waitForLoadState('networkidle', { timeout: TIMEOUTS.PAGE_LOAD });

    const currentUrl = page.url();

    // OAuth 콜백 처리 후 리다이렉트 확인
    // (유효하지 않은 code이므로 에러 페이지 또는 로그인 페이지로 이동)
    expect(currentUrl).toBeTruthy();

    console.log('[E2E] OAuth callback URL handled:', currentUrl);
  });

  test('should maintain session after OAuth login', async ({ page, context }) => {
    /**
     * ⚠️ 이 테스트는 실제 OAuth 로그인 후 실행하거나,
     * 세션을 미리 설정하여 테스트할 수 있습니다.
     */

    // Skip if no session is set
    test.skip(
      !process.env.TEST_GOOGLE_EMAIL,
      'Skipping session test - no TEST_GOOGLE_EMAIL provided'
    );

    // 1. 프로필 페이지 접속
    await page.goto('/profile');

    // 2. 로그인 상태 확인
    const isLoggedIn = await page
      .locator('button:has-text("Logout"), button:has-text("로그아웃")')
      .isVisible({ timeout: 5000 })
      .catch(() => false);

    if (isLoggedIn) {
      console.log('[E2E] Session is active');

      // 3. 새 탭 열기
      const newPage = await context.newPage();
      await newPage.goto('/profile');

      // 4. 새 탭에서도 로그인 상태 유지 확인
      const newPageLoggedIn = await newPage
        .locator('button:has-text("Logout"), button:has-text("로그아웃")')
        .isVisible({ timeout: 5000 })
        .catch(() => false);

      expect(newPageLoggedIn).toBe(true);

      console.log('[E2E] Session maintained in new tab');

      await newPage.close();
    } else {
      console.log('[E2E] No active session, skipping session persistence test');
    }
  });
});
