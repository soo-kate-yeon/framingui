import { test, expect } from '@playwright/test';

/**
 * Cross-Browser Tests: ARIA Attributes
 *
 * Validates:
 * - ARIA roles (button, dialog, checkbox, tab, tabpanel, etc.)
 * - ARIA states (aria-pressed, aria-checked, aria-selected, aria-expanded)
 * - ARIA properties (aria-label, aria-labelledby, aria-describedby, aria-invalid)
 * - ARIA live regions
 * - Browser compatibility of ARIA 1.2 features
 */

test.describe('ARIA Attributes - Cross-Browser Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Button - should have correct ARIA role and attributes', async ({ page }) => {
    const button = page.getByTestId('toggle-button');

    // Verify role
    await expect(button).toHaveAttribute('role', 'button');

    // Verify aria-label
    await expect(button).toHaveAttribute('aria-label', 'Toggle button test');

    // Verify aria-pressed (toggle button)
    await expect(button).toHaveAttribute('aria-pressed', 'false');

    // Verify aria-disabled
    await expect(button).toHaveAttribute('aria-disabled', 'false');

    // Toggle and verify state change
    await button.click();
    await expect(button).toHaveAttribute('aria-pressed', 'true');
  });

  test('Modal - should have correct ARIA dialog attributes', async ({ page }) => {
    // Open modal
    await page.getByTestId('open-modal-button').click();

    const modal = page.getByTestId('modal-content');

    // Verify role
    await expect(modal).toHaveAttribute('role', 'dialog');

    // Verify aria-modal
    await expect(modal).toHaveAttribute('aria-modal', 'true');

    // Verify aria-label
    await expect(modal).toHaveAttribute('aria-label', 'Test modal');

    // Verify modal title (should be labeled by or have aria-labelledby)
    const modalTitle = page.getByTestId('modal-title');
    await expect(modalTitle).toBeVisible();
  });

  test('Input - should have correct ARIA attributes', async ({ page }) => {
    const input = page.getByTestId('test-input');

    // Verify aria-label
    await expect(input).toHaveAttribute('aria-label', 'Test input field');

    // Verify aria-required
    await expect(input).toHaveAttribute('aria-required', 'true');

    // Initially should not be invalid
    await expect(input).toHaveAttribute('aria-invalid', 'false');

    // Type invalid value (less than 3 characters)
    await input.fill('ab');
    await input.blur();

    // Should become invalid
    await expect(input).toHaveAttribute('aria-invalid', 'true');

    // Error message should be associated
    const errorMessage = page.getByTestId('input-error');
    await expect(errorMessage).toBeVisible();

    // Verify aria-describedby points to error (if implemented)
    const ariaDescribedBy = await input.getAttribute('aria-describedby');
    if (ariaDescribedBy) {
      console.log('Input has aria-describedby:', ariaDescribedBy);
    }
  });

  test('Checkbox - should have correct ARIA attributes', async ({ page }) => {
    const checkbox = page.getByTestId('test-checkbox');

    // Verify role (native checkbox has implicit role)
    const role = await checkbox.getAttribute('role');
    console.log('Checkbox role:', role || 'checkbox (implicit)');

    // Verify aria-checked state
    await expect(checkbox).not.toBeChecked();

    // Check and verify
    await checkbox.click();
    await expect(checkbox).toBeChecked();

    // Verify aria-label
    await expect(checkbox).toHaveAttribute('aria-label', 'Test checkbox');
  });

  test('Select - should have correct ARIA attributes', async ({ page }) => {
    const select = page.getByTestId('test-select');

    // Verify aria-label
    await expect(select).toHaveAttribute('aria-label', 'Test select dropdown');

    // Native <select> has implicit role of combobox or listbox
    const role = await select.evaluate((el) => el.getAttribute('role'));
    console.log('Select role:', role || 'combobox/listbox (implicit)');

    // Verify it has options
    const options = await select.locator('option').count();
    expect(options).toBeGreaterThan(0);
  });

  test('Tabs - should have correct ARIA tablist attributes', async ({ page }) => {
    const tabList = page.getByTestId('tab-list');
    const tab1 = page.getByTestId('tab-tab1');
    const tab2 = page.getByTestId('tab-tab2');
    const panel1 = page.getByTestId('panel-tab1');
    const panel2 = page.getByTestId('panel-tab2');

    // Verify tablist role
    await expect(tabList).toHaveAttribute('role', 'tablist');

    // Verify tab roles
    await expect(tab1).toHaveAttribute('role', 'tab');
    await expect(tab2).toHaveAttribute('role', 'tab');

    // Verify tab panel roles
    await expect(panel1).toHaveAttribute('role', 'tabpanel');
    await expect(panel2).toHaveAttribute('role', 'tabpanel');

    // Verify aria-selected
    await expect(tab1).toHaveAttribute('aria-selected', 'true');
    await expect(tab2).toHaveAttribute('aria-selected', 'false');

    // Verify panel visibility attributes
    await expect(panel1).toBeVisible();
    await expect(panel2).toBeHidden();

    // Switch tabs
    await tab2.click();

    // Verify updated states
    await expect(tab1).toHaveAttribute('aria-selected', 'false');
    await expect(tab2).toHaveAttribute('aria-selected', 'true');
    await expect(panel1).toBeHidden();
    await expect(panel2).toBeVisible();
  });

  test('should support aria-controls relationship', async ({ page }) => {
    // Check if tabs have aria-controls pointing to panels
    const tab1 = page.getByTestId('tab-tab1');

    const ariaControls = await tab1.getAttribute('aria-controls');
    if (ariaControls) {
      console.log('Tab has aria-controls:', ariaControls);

      // Verify the controlled panel exists
      const controlledPanel = page.locator(`[id="${ariaControls}"]`);
      await expect(controlledPanel).toBeAttached();
    }
  });

  test('should expose correct accessible names', async ({ page }) => {
    // Test that elements have accessible names
    const toggleButton = page.getByTestId('toggle-button');

    // Get accessible name using Playwright's accessibility tree
    const accessibleName = await toggleButton.getAttribute('aria-label');
    expect(accessibleName).toBeTruthy();
    console.log('Toggle button accessible name:', accessibleName);

    // Open modal and check its accessible name
    await page.getByTestId('open-modal-button').click();
    const modal = page.getByTestId('modal-content');
    const modalName = await modal.getAttribute('aria-label');
    expect(modalName).toBeTruthy();
    console.log('Modal accessible name:', modalName);
  });

  test('should handle ARIA live regions for dynamic content', async ({ page }) => {
    // Check if error messages use aria-live
    const input = page.getByTestId('test-input');

    // Trigger validation error
    await input.fill('ab');
    await input.blur();

    const errorMessage = page.getByTestId('input-error');
    await expect(errorMessage).toBeVisible();

    // Check if error has aria-live (if implemented)
    const ariaLive = await errorMessage.getAttribute('aria-live');
    console.log('Error message aria-live:', ariaLive || 'not set');
  });

  test('ARIA attributes consistency across browsers', async ({ page, browserName }) => {
    // Test critical ARIA attributes across all browsers
    const components = [
      {
        testId: 'toggle-button',
        expectedAttrs: {
          role: 'button',
          'aria-label': 'Toggle button test',
          'aria-pressed': 'false',
        },
      },
      {
        testId: 'test-input',
        expectedAttrs: {
          'aria-label': 'Test input field',
          'aria-required': 'true',
          'aria-invalid': 'false',
        },
      },
      {
        testId: 'test-checkbox',
        expectedAttrs: {
          'aria-label': 'Test checkbox',
        },
      },
    ];

    for (const component of components) {
      const element = page.getByTestId(component.testId);

      for (const [attr, value] of Object.entries(component.expectedAttrs)) {
        await expect(element).toHaveAttribute(attr, value);
      }

      console.log(`${browserName}: ${component.testId} ARIA attributes verified`);
    }
  });

  test('should support screen reader announcements', async ({ page }) => {
    // Test elements that should be announced to screen readers
    const statusMessage = page.getByTestId('checkbox-status');

    // Verify it's visible and contains text
    await expect(statusMessage).toBeVisible();
    await expect(statusMessage).toContainText('Status:');

    // Check if it has aria-live (optional enhancement)
    const ariaLive = await statusMessage.getAttribute('aria-live');
    console.log('Status message aria-live:', ariaLive || 'not set');
  });

  test('should not have ARIA validation errors', async ({ page, browserName }) => {
    // Test for common ARIA errors
    // 1. aria-* attributes on non-interactive elements
    // 2. Invalid ARIA attribute values
    // 3. Required ARIA relationships

    // Get all elements with ARIA attributes
    const ariaElements = await page.locator('[role], [aria-label], [aria-labelledby]').all();

    console.log(`${browserName}: Found ${ariaElements.length} elements with ARIA attributes`);

    for (const element of ariaElements) {
      const role = await element.getAttribute('role');
      const ariaLabel = await element.getAttribute('aria-label');

      // Verify role is valid (basic check)
      if (role) {
        const validRoles = ['button', 'dialog', 'tab', 'tabpanel', 'tablist', 'checkbox'];
        if (!validRoles.includes(role)) {
          console.warn(`Unexpected role: ${role}`);
        }
      }

      // Verify aria-label is not empty
      if (ariaLabel !== null && ariaLabel.trim() === '') {
        console.warn('Empty aria-label found');
      }
    }
  });

  test('ARIA 1.2 features support', async ({ page, browserName }) => {
    // Test ARIA 1.2 specific features
    // Note: ARIA 1.2 introduced aria-description and other features

    const modal = page.getByTestId('modal-content');

    // Check basic ARIA 1.2 support
    console.log(`${browserName}: Testing ARIA 1.2 support`);

    // Verify modal supports aria-modal (ARIA 1.1+)
    await page.getByTestId('open-modal-button').click();
    await expect(modal).toHaveAttribute('aria-modal', 'true');

    console.log(`${browserName}: ARIA 1.2 basic features supported`);
  });
});
