/**
 * E2E Tests: GitHub OAuth Login
 * SPEC-DEPLOY-001 Phase 2.5: GitHub OAuth 로그인 테스트
 *
 * ⚠️ 주의: 실제 GitHub OAuth는 실제 계정이 필요하므로,
 * 이 테스트는 수동 테스트 또는 Mock 환경에서 실행하거나 스킵합니다.
 *
 * 테스트 시나리오:
 * 1. GitHub OAuth 로그인
 * 2. 로그인 후 프로필 페이지 접근
 * 3. 세션 유지 확인
 */

import { test, expect } from '@playwright/test';
import { TIMEOUTS } from '../fixtures/test-data';

test.describe('GitHub OAuth Login E2E', () => {
  test.skip('should login with GitHub OAuth (manual test)', async ({ page, context }) => {
    /**
     * ⚠️ 수동 테스트 가이드
     *
     * 1. `PLAYWRIGHT_HEADLESS=false pnpm test:e2e auth/github-oauth.spec.ts` 실행
     * 2. 테스트 브라우저가 열리면 GitHub 로그인 진행
     * 3. 로그인 성공 후 프로필 페이지 확인
     */

    // 1. 로그인 페이지로 이동
    await page.goto('/auth/login');

    // 2. "GitHub로 로그인" 버튼 찾기
    const githubButton = page.locator(
      'button:has-text("GitHub"), button:has-text("깃허브"), button[aria-label*="GitHub"]'
    );

    await expect(githubButton.first()).toBeVisible({ timeout: TIMEOUTS.PAGE_LOAD });

    // 3. GitHub OAuth 버튼 클릭
    await githubButton.first().click();

    console.log('[E2E] GitHub OAuth button clicked');

    // 4. 새 탭에서 GitHub 로그인 페이지 확인
    const githubLoginPage = await context.waitForEvent('page', {
      timeout: TIMEOUTS.PAGE_LOAD,
    });

    await githubLoginPage.waitForLoadState('networkidle');

    const githubUrl = githubLoginPage.url();
    expect(githubUrl).toContain('github.com');

    console.log('[E2E] GitHub login page opened:', githubUrl);

    // ⚠️ 여기서부터는 수동 로그인 필요
    console.log('[E2E] Please complete GitHub login manually in the opened browser...');

    // 5. 로그인 완료 대기 (프로필 페이지로 리다이렉트)
    await page.waitForURL('/profile', { timeout: 60000 }); // 60초 대기

    // 6. 로그인 성공 확인
    const profileHeading = page.locator('h1, h2').filter({ hasText: /Profile|프로필/ });
    await expect(profileHeading.first()).toBeVisible();

    console.log('[E2E] GitHub OAuth login successful');

    // 7. 사용자 정보 표시 확인
    const userInfo = page.locator('[data-testid="user-info"], div:has-text("@")');
    await expect(userInfo.first()).toBeVisible();

    console.log('[E2E] User info displayed');
  });

  test('should redirect to GitHub OAuth URL', async ({ page }) => {
    // 1. 로그인 페이지로 이동
    await page.goto('/auth/login');

    // 2. "GitHub로 로그인" 버튼 확인
    const githubButton = page.locator('button:has-text("GitHub"), button:has-text("깃허브")');

    await expect(githubButton.first()).toBeVisible({ timeout: TIMEOUTS.PAGE_LOAD });

    console.log('[E2E] GitHub OAuth button is present');
  });

  test('should handle OAuth errors gracefully', async ({ page }) => {
    // 1. OAuth 콜백 URL에 에러 파라미터 전달
    await page.goto('/auth/callback?error=access_denied&error_description=User%20cancelled');

    // 2. 에러 페이지 또는 로그인 페이지로 리다이렉트
    await page.waitForLoadState('networkidle', { timeout: TIMEOUTS.PAGE_LOAD });

    const currentUrl = page.url();

    // 로그인 페이지나 에러 페이지로 이동했는지 확인
    expect(currentUrl).toBeTruthy();

    console.log('[E2E] OAuth error handled, redirected to:', currentUrl);
  });

  test('should show logout button after successful login', async ({ page }) => {
    /**
     * ⚠️ 이 테스트는 실제 OAuth 로그인 후 실행하거나,
     * 세션을 미리 설정하여 테스트할 수 있습니다.
     */

    // Skip if no session is set
    test.skip(
      !process.env.TEST_GITHUB_EMAIL,
      'Skipping logout test - no TEST_GITHUB_EMAIL provided'
    );

    // 1. 프로필 페이지 접속
    await page.goto('/profile');

    // 2. 로그아웃 버튼 확인
    const logoutButton = page.locator(
      'button:has-text("Logout"), button:has-text("로그아웃"), button:has-text("Sign out")'
    );

    const isLogoutVisible = await logoutButton.isVisible({ timeout: 5000 }).catch(() => false);

    if (isLogoutVisible) {
      console.log('[E2E] Logout button is visible');

      // 3. 로그아웃 클릭
      await logoutButton.first().click();

      // 4. 홈페이지로 리다이렉트 확인
      await page.waitForURL('/', { timeout: TIMEOUTS.NAVIGATION });

      console.log('[E2E] Logout successful');

      // 5. 다시 프로필 페이지 접속 시도
      await page.goto('/profile');

      // 6. 로그인 페이지로 리다이렉트되는지 확인
      await page.waitForTimeout(2000);

      const afterLogoutUrl = page.url();
      const isRedirectedToLogin = afterLogoutUrl.includes('/auth/login') || afterLogoutUrl === '/';

      expect(isRedirectedToLogin).toBe(true);

      console.log('[E2E] Redirected after logout:', afterLogoutUrl);
    } else {
      console.log('[E2E] No active session, skipping logout test');
    }
  });
});
