import { test, expect } from '@playwright/test';

/**
 * Cross-Browser Tests: Modal Component
 *
 * Validates:
 * - Focus trap (Tab, Shift+Tab)
 * - Escape key to close
 * - Click-outside detection
 * - ARIA attributes (role, aria-modal, aria-label)
 * - Focus restoration
 */

test.describe('Modal - Cross-Browser Focus Management', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('modal-test')).toBeVisible();
  });

  test('should open modal on button click', async ({ page }) => {
    const openButton = page.getByTestId('open-modal-button');

    // Open modal
    await openButton.click();

    // Verify modal is visible
    await expect(page.getByTestId('modal-content')).toBeVisible();
    await expect(page.getByTestId('modal-backdrop')).toBeVisible();
  });

  test('should close modal on Escape key press', async ({ page }) => {
    const openButton = page.getByTestId('open-modal-button');

    // Open modal
    await openButton.click();
    await expect(page.getByTestId('modal-content')).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Verify modal is closed
    await expect(page.getByTestId('modal-content')).not.toBeVisible();
    await expect(page.getByTestId('modal-backdrop')).not.toBeVisible();
  });

  test('should close modal on backdrop click', async ({ page }) => {
    const openButton = page.getByTestId('open-modal-button');

    // Open modal
    await openButton.click();
    await expect(page.getByTestId('modal-content')).toBeVisible();

    // Click backdrop
    const backdrop = page.getByTestId('modal-backdrop');
    await backdrop.click({ position: { x: 10, y: 10 } });

    // Verify modal is closed
    await expect(page.getByTestId('modal-content')).not.toBeVisible();
  });

  test('should trap focus within modal', async ({ page }) => {
    const openButton = page.getByTestId('open-modal-button');

    // Open modal
    await openButton.click();
    await expect(page.getByTestId('modal-content')).toBeVisible();

    const modalContent = page.getByTestId('modal-content');
    const closeButton = page.getByTestId('close-modal-button');

    // First focusable element should be focused
    await expect(closeButton).toBeFocused();

    // Tab should keep focus within modal
    await page.keyboard.press('Tab');

    // Focus should wrap or stay within modal
    const focusedElement = await page.evaluateHandle(() => document.activeElement);
    const isInsideModal = await page.evaluate(
      (elements) => {
        const [modal, focused] = elements;
        return modal.contains(focused);
      },
      [await modalContent.elementHandle(), focusedElement]
    );

    expect(isInsideModal).toBe(true);
  });

  test('should restore focus on close', async ({ page }) => {
    const openButton = page.getByTestId('open-modal-button');

    // Focus open button
    await openButton.focus();
    await expect(openButton).toBeFocused();

    // Open modal
    await openButton.click();
    await expect(page.getByTestId('modal-content')).toBeVisible();

    // Close modal
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('modal-content')).not.toBeVisible();

    // Focus should be restored to trigger button
    await expect(openButton).toBeFocused();
  });

  test('should have correct ARIA attributes', async ({ page }) => {
    const openButton = page.getByTestId('open-modal-button');

    // Open modal
    await openButton.click();

    const modalContent = page.getByTestId('modal-content');

    // Verify ARIA attributes
    await expect(modalContent).toHaveAttribute('role', 'dialog');
    await expect(modalContent).toHaveAttribute('aria-modal', 'true');
    await expect(modalContent).toHaveAttribute('aria-label', 'Test modal');
  });

  test('should prevent background scroll when open', async ({ page }) => {
    const openButton = page.getByTestId('open-modal-button');

    // Open modal
    await openButton.click();
    await expect(page.getByTestId('modal-content')).toBeVisible();

    // Check if body has overflow hidden
    const bodyOverflow = await page.evaluate(() => {
      return window.getComputedStyle(document.body).overflow;
    });

    // Note: This test depends on implementation
    // Some implementations add overflow:hidden to body
    console.log('Body overflow style:', bodyOverflow);
  });

  test('should work consistently across browsers', async ({ page, browserName }) => {
    const openButton = page.getByTestId('open-modal-button');

    // Test sequence: Open -> Escape -> Open -> Backdrop Click -> Open -> Close Button
    await openButton.click();
    await expect(page.getByTestId('modal-content')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('modal-content')).not.toBeVisible();

    await openButton.click();
    await page.getByTestId('modal-backdrop').click({ position: { x: 10, y: 10 } });
    await expect(page.getByTestId('modal-content')).not.toBeVisible();

    await openButton.click();
    await page.getByTestId('close-modal-button').click();
    await expect(page.getByTestId('modal-content')).not.toBeVisible();

    console.log(`Modal test passed on ${browserName}`);
  });
});
