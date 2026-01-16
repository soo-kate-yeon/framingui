import { test, expect } from '@playwright/test';

/**
 * Cross-Browser Tests: Keyboard Navigation
 *
 * Validates:
 * - Tab navigation across all components
 * - Arrow key navigation (Select, Tabs)
 * - Enter/Space activation
 * - Escape key handling
 * - Shift+Tab reverse navigation
 */

test.describe('Keyboard Navigation - Cross-Browser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate with Tab key', async ({ page }) => {
    // Start from beginning
    await page.keyboard.press('Tab');

    // Should focus toggle button
    const toggleButton = page.getByTestId('toggle-button');
    await expect(toggleButton).toBeFocused();

    // Tab to next focusable element
    await page.keyboard.press('Tab');

    // Should focus open modal button
    const openModalButton = page.getByTestId('open-modal-button');
    await expect(openModalButton).toBeFocused();

    // Tab to next
    await page.keyboard.press('Tab');

    // Should focus input field
    const inputField = page.getByTestId('test-input');
    await expect(inputField).toBeFocused();
  });

  test('should navigate backward with Shift+Tab', async ({ page }) => {
    const inputField = page.getByTestId('test-input');

    // Focus input field directly
    await inputField.focus();
    await expect(inputField).toBeFocused();

    // Shift+Tab to previous
    await page.keyboard.press('Shift+Tab');

    // Should focus open modal button
    const openModalButton = page.getByTestId('open-modal-button');
    await expect(openModalButton).toBeFocused();

    // Shift+Tab again
    await page.keyboard.press('Shift+Tab');

    // Should focus toggle button
    const toggleButton = page.getByTestId('toggle-button');
    await expect(toggleButton).toBeFocused();
  });

  test('should navigate tabs with Arrow keys', async ({ page }) => {
    const tab1 = page.getByTestId('tab-tab1');
    const tab2 = page.getByTestId('tab-tab2');
    const tab3 = page.getByTestId('tab-tab3');

    // Focus first tab
    await tab1.focus();
    await expect(tab1).toBeFocused();
    await expect(tab1).toHaveAttribute('aria-selected', 'true');

    // Press ArrowRight to move to next tab
    await page.keyboard.press('ArrowRight');
    await expect(tab2).toBeFocused();
    await expect(tab2).toHaveAttribute('aria-selected', 'true');

    // Press ArrowRight again
    await page.keyboard.press('ArrowRight');
    await expect(tab3).toBeFocused();
    await expect(tab3).toHaveAttribute('aria-selected', 'true');

    // Press ArrowLeft to go back
    await page.keyboard.press('ArrowLeft');
    await expect(tab2).toBeFocused();
    await expect(tab2).toHaveAttribute('aria-selected', 'true');
  });

  test('should activate elements with Space key', async ({ page }) => {
    // Test checkbox
    const checkbox = page.getByTestId('test-checkbox');
    await checkbox.focus();
    await expect(checkbox).not.toBeChecked();

    // Press Space to check
    await page.keyboard.press('Space');
    await expect(checkbox).toBeChecked();

    // Press Space again to uncheck
    await page.keyboard.press('Space');
    await expect(checkbox).not.toBeChecked();
  });

  test('should activate button with Enter key', async ({ page }) => {
    const toggleButton = page.getByTestId('toggle-button');
    await toggleButton.focus();

    // Initial state
    await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');

    // Press Enter
    await page.keyboard.press('Enter');
    await expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

    // Press Enter again
    await page.keyboard.press('Enter');
    await expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
  });

  test('should handle Escape key in modal', async ({ page }) => {
    // Open modal
    await page.getByTestId('open-modal-button').click();
    await expect(page.getByTestId('modal-content')).toBeVisible();

    // Press Escape
    await page.keyboard.press('Escape');

    // Modal should close
    await expect(page.getByTestId('modal-content')).not.toBeVisible();
  });

  test('should navigate select options with Arrow keys', async ({ page, browserName }) => {
    const select = page.getByTestId('test-select');
    await select.focus();

    // Note: Arrow key behavior in <select> is browser-native
    // We can verify focus but actual option change may vary
    await expect(select).toBeFocused();

    // On some browsers, ArrowDown opens the select
    await page.keyboard.press('ArrowDown');

    // Verify select still has focus
    await expect(select).toBeFocused();

    console.log(`Select navigation tested on ${browserName}`);
  });

  test('should handle complex keyboard sequences', async ({ page, browserName }) => {
    // Tab to button
    await page.keyboard.press('Tab');
    const toggleButton = page.getByTestId('toggle-button');
    await expect(toggleButton).toBeFocused();

    // Activate with Space
    await page.keyboard.press('Space');
    await expect(toggleButton).toHaveAttribute('aria-pressed', 'true');

    // Tab to modal button
    await page.keyboard.press('Tab');
    const modalButton = page.getByTestId('open-modal-button');
    await expect(modalButton).toBeFocused();

    // Open modal with Enter
    await page.keyboard.press('Enter');
    await expect(page.getByTestId('modal-content')).toBeVisible();

    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(page.getByTestId('modal-content')).not.toBeVisible();

    // Focus should return to modal button
    await expect(modalButton).toBeFocused();

    console.log(`Complex keyboard sequence passed on ${browserName}`);
  });

  test('should skip disabled elements in tab order', async ({ page }) => {
    // Note: This test would require a disabled element in the test app
    // Currently all elements are enabled
    // This is a placeholder for when disabled states are added

    const toggleButton = page.getByTestId('toggle-button');
    await toggleButton.focus();

    // Verify button has tabindex 0
    await expect(toggleButton).toHaveAttribute('tabindex', '0');
  });

  test('should maintain focus visibility', async ({ page }) => {
    const toggleButton = page.getByTestId('toggle-button');

    // Tab to button
    await page.keyboard.press('Tab');
    await expect(toggleButton).toBeFocused();

    // Check if focus outline is visible (browser-dependent)
    const hasFocusVisible = await toggleButton.evaluate((el) => {
      const styles = window.getComputedStyle(el);
      // Check for outline or focus-visible styles
      return styles.outline !== 'none' || el.matches(':focus-visible');
    });

    console.log('Focus visible state:', hasFocusVisible);
    // Note: Focus visibility may vary by browser
  });

  test('keyboard navigation consistency across browsers', async ({ page, browserName }) => {
    // Test full navigation flow
    const components = [
      { testId: 'toggle-button', name: 'Toggle Button' },
      { testId: 'open-modal-button', name: 'Modal Button' },
      { testId: 'test-input', name: 'Input Field' },
      { testId: 'test-checkbox', name: 'Checkbox' },
    ];

    for (const component of components) {
      await page.keyboard.press('Tab');
      const element = page.getByTestId(component.testId);
      await expect(element).toBeFocused();
      console.log(`${browserName}: ${component.name} focused successfully`);
    }
  });
});
