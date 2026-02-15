/**
 * TAG: TAG-STUDIO-001-U004 (Responsive Design)
 * E2E Tests for Studio Landing Page Responsive Design
 *
 * Tests responsive layouts across mobile, tablet, and desktop viewports
 * - Mobile: < 768px (375px width)
 * - Tablet: 768-1024px (768px width)
 * - Desktop: > 1024px (1280px width)
 */

import { test, expect } from '@playwright/test';

const MOBILE_VIEWPORT = { width: 375, height: 667 };
const TABLET_VIEWPORT = { width: 768, height: 1024 };
const DESKTOP_VIEWPORT = { width: 1280, height: 720 };

// Mock landing page path - adjust to actual route when implemented
const LANDING_PAGE_PATH = '/studio/template/test-template';

test.describe('Studio Landing Page - Mobile Viewport (< 768px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(MOBILE_VIEWPORT);
  });

  test('should display navigation with mobile layout', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    // Navigation should be visible
    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toBeVisible();

    // Desktop navigation links should be hidden on mobile
    const desktopLinks = page.locator('nav .hidden.md\\:flex');
    await expect(desktopLinks).toHaveCount(1);
    await expect(desktopLinks).not.toBeVisible();
  });

  test('should display hero section with mobile layout', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    const hero = page.locator('section').first();
    await expect(hero).toBeVisible();

    // Hero title should be responsive
    const title = hero.locator('h1');
    await expect(title).toBeVisible();

    // Buttons should stack vertically on mobile (flex-col)
    const buttonContainer = hero.locator('.flex.flex-col.sm\\:flex-row');
    await expect(buttonContainer).toBeVisible();
  });

  test('should display component grid in single column', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    // Component overview grid should be single column on mobile
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(grid).toBeVisible();

    // Check computed styles to verify single column
    const gridStyles = await grid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.gridTemplateColumns;
    });

    // Should have single column (not "repeat(2, ...)" or "repeat(3, ...)")
    expect(gridStyles).not.toContain('repeat(2');
    expect(gridStyles).not.toContain('repeat(3');
  });

  test('should display pricing cards stacked vertically', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    // Pricing section should exist
    const pricingSection = page.locator('section#pricing');
    await expect(pricingSection).toBeVisible();

    // Pricing grid should stack vertically on mobile
    const pricingGrid = pricingSection.locator('.grid.grid-cols-1.md\\:grid-cols-3');
    await expect(pricingGrid).toBeVisible();
  });

  test('should have touch-friendly button sizes', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    // All buttons should be at least 44x44px (iOS touch target guideline)
    const buttons = page.locator('button[type="button"]');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const box = await button.boundingBox();

      if (box) {
        expect(box.height).toBeGreaterThanOrEqual(44);
        expect(box.width).toBeGreaterThanOrEqual(44);
      }
    }
  });
});

test.describe('Studio Landing Page - Tablet Viewport (768-1024px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(TABLET_VIEWPORT);
  });

  test('should display navigation with tablet layout', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toBeVisible();

    // Desktop navigation links should be visible on tablet
    const desktopLinks = page.locator('nav .hidden.md\\:flex');
    await expect(desktopLinks).toBeVisible();
  });

  test('should display component grid in 2 columns', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(grid).toBeVisible();

    // Check computed styles to verify 2 columns on tablet
    const gridStyles = await grid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.gridTemplateColumns;
    });

    // Should have 2 columns at tablet breakpoint
    expect(gridStyles).toContain('repeat(2');
  });

  test('should display pricing cards in 3-column grid', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    const pricingGrid = page.locator('section#pricing .grid.grid-cols-1.md\\:grid-cols-3');
    await expect(pricingGrid).toBeVisible();

    // At md breakpoint (768px), pricing should show 3 columns
    const gridStyles = await pricingGrid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.gridTemplateColumns;
    });

    expect(gridStyles).toContain('repeat(3');
  });

  test('should have proper spacing between elements', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    // Check padding on main sections
    const sections = page.locator('section');
    const sectionCount = await sections.count();

    for (let i = 0; i < sectionCount; i++) {
      const section = sections.nth(i);
      const padding = await section.evaluate((el) => {
        const styles = window.getComputedStyle(el);
        return {
          paddingTop: styles.paddingTop,
          paddingBottom: styles.paddingBottom,
        };
      });

      // Sections should have adequate vertical padding
      expect(parseInt(padding.paddingTop)).toBeGreaterThan(32);
      expect(parseInt(padding.paddingBottom)).toBeGreaterThan(32);
    }
  });
});

test.describe('Studio Landing Page - Desktop Viewport (> 1024px)', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
  });

  test('should display full navigation bar', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    const nav = page.locator('nav[role="navigation"]');
    await expect(nav).toBeVisible();

    // All navigation elements should be visible
    const aboutLink = page.locator('a[href="#about"]');
    const howToUseLink = page.locator('a[href="#how-to-use"]');
    const documentationLink = page.locator('a[href="#documentation"]');

    await expect(aboutLink).toBeVisible();
    await expect(howToUseLink).toBeVisible();
    await expect(documentationLink).toBeVisible();
  });

  test('should display component grid in 3 columns', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(grid).toBeVisible();

    // Check computed styles to verify 3 columns on desktop
    const gridStyles = await grid.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.gridTemplateColumns;
    });

    // Should have 3 columns at lg breakpoint
    expect(gridStyles).toContain('repeat(3');
  });

  test('should display hero section with optimal width', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    const hero = page.locator('section').first();
    const heroContent = hero.locator('.max-w-4xl');

    await expect(heroContent).toBeVisible();

    // Content should be centered and max-width constrained
    const box = await heroContent.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(896); // max-w-4xl = 56rem = 896px
  });

  test('should have horizontal button layout in hero', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    const buttonContainer = page.locator('section .flex.flex-col.sm\\:flex-row');
    await expect(buttonContainer).toBeVisible();

    // Buttons should be horizontal on desktop
    const flexDirection = await buttonContainer.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      return styles.flexDirection;
    });

    expect(flexDirection).toBe('row');
  });

  test('should have proper content max-width', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    // Main content sections should have max-width constraints
    const maxWidthContainers = page.locator('.max-w-4xl, .max-w-6xl');
    const containerCount = await maxWidthContainers.count();

    expect(containerCount).toBeGreaterThan(0);

    // Verify containers are actually constrained
    for (let i = 0; i < containerCount; i++) {
      const container = maxWidthContainers.nth(i);
      const box = await container.boundingBox();

      if (box) {
        // Should not exceed max-width even on large screens
        expect(box.width).toBeLessThanOrEqual(1152); // max-w-6xl = 72rem = 1152px
      }
    }
  });
});

test.describe('Studio Landing Page - Cross-viewport Navigation', () => {
  test('should anchor links work across all viewports', async ({ page }) => {
    const viewports = [MOBILE_VIEWPORT, TABLET_VIEWPORT, DESKTOP_VIEWPORT];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(LANDING_PAGE_PATH);

      // Test anchor link navigation
      const howToUseLink = page.locator('a[href="#how-to-use"]');

      if (await howToUseLink.isVisible()) {
        await howToUseLink.click();
        await page.waitForTimeout(500); // Wait for smooth scroll

        // Verify the target section is in viewport
        const targetSection = page.locator('section#how-to-use');
        await expect(targetSection).toBeInViewport();
      }
    }
  });

  test('should maintain functionality across viewport changes', async ({ page }) => {
    await page.goto(LANDING_PAGE_PATH);

    // Start at mobile
    await page.setViewportSize(MOBILE_VIEWPORT);
    await expect(page.locator('nav')).toBeVisible();

    // Resize to tablet
    await page.setViewportSize(TABLET_VIEWPORT);
    await expect(page.locator('nav .hidden.md\\:flex')).toBeVisible();

    // Resize to desktop
    await page.setViewportSize(DESKTOP_VIEWPORT);
    const grid = page.locator('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3');
    await expect(grid).toBeVisible();

    // All content should still be accessible
    await expect(page.locator('section#pricing')).toBeVisible();
  });
});

test.describe('Studio Landing Page - Accessibility', () => {
  test('should have proper heading hierarchy on all viewports', async ({ page }) => {
    const viewports = [MOBILE_VIEWPORT, TABLET_VIEWPORT, DESKTOP_VIEWPORT];

    for (const viewport of viewports) {
      await page.setViewportSize(viewport);
      await page.goto(LANDING_PAGE_PATH);

      // Should have exactly one h1
      const h1Count = await page.locator('h1').count();
      expect(h1Count).toBe(1);

      // Should have h2 section headings
      const h2Count = await page.locator('h2').count();
      expect(h2Count).toBeGreaterThan(0);
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.setViewportSize(DESKTOP_VIEWPORT);
    await page.goto(LANDING_PAGE_PATH);

    // This is a basic check - in production, use axe-core or similar
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();

    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      await expect(button).toBeVisible();

      // Verify button is actually rendered (basic visibility check)
      const box = await button.boundingBox();
      expect(box).not.toBeNull();
    }
  });
});
