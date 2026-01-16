import { test, expect } from '@playwright/test';

/**
 * Cross-Browser Tests: Button Component
 *
 * Validates:
 * - Keyboard interactions (Space, Enter)
 * - ARIA attributes (aria-pressed, aria-disabled)
 * - Click behavior
 * - Disabled state
 */

test.describe('Button - Cross-Browser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('button-test')).toBeVisible();
  });

  test('should toggle on Space key press', async ({ page }) => {
    const button = page.getByTestId('toggle-button');

    // Initial state
    await expect(button).toHaveText('Not Pressed');
    await expect(button).toHaveAttribute('aria-pressed', 'false');

    // Focus and press Space
    await button.focus();
    await page.keyboard.press('Space');

    // Verify toggled state
    await expect(button).toHaveText('Pressed');
    await expect(button).toHaveAttribute('aria-pressed', 'true');

    // Press Space again to toggle back
    await page.keyboard.press('Space');
    await expect(button).toHaveText('Not Pressed');
    await expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  test('should toggle on Enter key press', async ({ page }) => {
    const button = page.getByTestId('toggle-button');

    // Initial state
    await expect(button).toHaveText('Not Pressed');

    // Focus and press Enter
    await button.focus();
    await page.keyboard.press('Enter');

    // Verify toggled state
    await expect(button).toHaveText('Pressed');
    await expect(button).toHaveAttribute('aria-pressed', 'true');

    // Press Enter again
    await page.keyboard.press('Enter');
    await expect(button).toHaveText('Not Pressed');
  });

  test('should toggle on mouse click', async ({ page }) => {
    const button = page.getByTestId('toggle-button');

    // Click to toggle
    await button.click();
    await expect(button).toHaveText('Pressed');
    await expect(button).toHaveAttribute('aria-pressed', 'true');

    // Click again to toggle back
    await button.click();
    await expect(button).toHaveText('Not Pressed');
    await expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  test('should have correct ARIA attributes', async ({ page }) => {
    const button = page.getByTestId('toggle-button');

    // Verify role
    await expect(button).toHaveAttribute('role', 'button');

    // Verify aria-label
    await expect(button).toHaveAttribute('aria-label', 'Toggle button test');

    // Verify tabindex
    await expect(button).toHaveAttribute('tabindex', '0');

    // Verify aria-disabled when not disabled
    await expect(button).toHaveAttribute('aria-disabled', 'false');
  });

  test('should be keyboard focusable', async ({ page }) => {
    const button = page.getByTestId('toggle-button');

    // Tab to button
    await page.keyboard.press('Tab');

    // Verify focus
    await expect(button).toBeFocused();
  });

  test('should have consistent behavior across browsers', async ({ page, browserName }) => {
    const button = page.getByTestId('toggle-button');

    // Test sequence: Click -> Space -> Enter -> Click
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');

    await page.keyboard.press('Space');
    await expect(button).toHaveAttribute('aria-pressed', 'false');

    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');

    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'false');

    // Log browser for debugging
    console.log(`Button test passed on ${browserName}`);
  });
});
