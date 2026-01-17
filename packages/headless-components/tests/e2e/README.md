# Cross-Browser E2E Testing Guide

## Quick Start

```bash
# 1. Start the test server (in terminal 1)
pnpm test:server

# 2. Run cross-browser tests (in terminal 2)
pnpm test:e2e

# 3. View test report
pnpm test:e2e:report
```

## Available Commands

### Test Execution

```bash
# Run all tests on all browsers (Chrome, Firefox, Safari)
pnpm test:e2e

# Run tests on specific browser
pnpm test:e2e:chromium   # Chrome/Chromium
pnpm test:e2e:firefox    # Firefox
pnpm test:e2e:webkit     # Safari/WebKit

# Run tests in UI mode (interactive debugging)
pnpm test:e2e:ui

# Run specific test file
npx playwright test tests/e2e/button.spec.ts

# Run specific test by name
npx playwright test -g "should toggle on Space key press"
```

### Test Server

```bash
# Start development test server
pnpm test:server

# Server will be available at:
# http://localhost:3000
```

### Debugging

```bash
# Run in headed mode (see browser window)
npx playwright test --headed

# Run in debug mode (step through tests)
npx playwright test --debug

# Generate trace for failed tests
npx playwright test --trace on

# Show trace for specific test
npx playwright show-trace trace.zip
```

### Reports

```bash
# View HTML report
pnpm test:e2e:report

# Generate JSON report
npx playwright test --reporter=json

# Generate JUnit report (for CI/CD)
npx playwright test --reporter=junit
```

## Test Structure

```
tests/e2e/
├── button.spec.ts              # Button keyboard & ARIA tests
├── modal.spec.ts               # Modal focus management tests
├── keyboard-navigation.spec.ts # Global keyboard navigation tests
├── aria-attributes.spec.ts     # ARIA attribute validation tests
└── README.md                   # This file

tests/fixtures/
├── test-app.tsx                # Interactive test application
├── server.tsx                  # Server entry point
└── index.html                  # HTML template
```

## Test Coverage

### Button Tests (7 tests × 3 browsers = 21 tests)
- ✅ Space key toggle
- ✅ Enter key toggle
- ✅ Mouse click toggle
- ✅ ARIA attributes (role, aria-pressed, aria-disabled)
- ✅ Keyboard focus
- ✅ Cross-browser consistency

### Modal Tests (8 tests × 3 browsers = 24 tests)
- ✅ Open on button click
- ✅ Close on Escape key
- ✅ Close on backdrop click
- ✅ Focus trap (Tab, Shift+Tab)
- ✅ Focus restoration
- ✅ ARIA dialog attributes
- ✅ Background scroll prevention
- ✅ Cross-browser consistency

### Keyboard Navigation Tests (11 tests × 3 browsers = 33 tests)
- ✅ Tab navigation
- ✅ Shift+Tab reverse navigation
- ✅ Arrow key navigation (tabs, select)
- ✅ Space key activation
- ✅ Enter key activation
- ✅ Escape key handling
- ✅ Complex keyboard sequences
- ✅ Focus visibility
- ✅ Disabled element skipping

### ARIA Attributes Tests (14 tests × 3 browsers = 42 tests)
- ✅ Button ARIA attributes
- ✅ Modal ARIA attributes
- ✅ Input field ARIA attributes
- ✅ Checkbox ARIA attributes
- ✅ Select ARIA attributes
- ✅ Tabs ARIA attributes
- ✅ aria-controls relationships
- ✅ Accessible names
- ✅ ARIA live regions
- ✅ Screen reader support
- ✅ ARIA validation
- ✅ ARIA 1.2 features

**Total: 120 tests across 3 browsers**

## Browser Requirements

| Browser | Minimum Version | Tested Version |
|---------|----------------|----------------|
| Chrome | 111+ | 143.0.7499.4 |
| Firefox | 113+ | 144.0.2 |
| Safari | 15+ | 26.0 (WebKit) |

## Continuous Integration

### GitHub Actions Example

```yaml
name: Cross-Browser Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '20'
          cache: 'pnpm'

      - run: pnpm install
      - run: pnpm playwright install --with-deps
      - run: pnpm build
      - run: pnpm test:e2e

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Troubleshooting

### Server Not Starting

```bash
# Check if port 3000 is already in use
lsof -i :3000

# Kill existing process
kill -9 <PID>

# Restart server
pnpm test:server
```

### Browser Installation Issues

```bash
# Install browsers manually
pnpm playwright install chromium firefox webkit

# Install with system dependencies (Linux)
pnpm playwright install --with-deps
```

### Test Timeouts

```bash
# Increase timeout for specific test
test.setTimeout(60000); // 60 seconds

# Increase timeout globally in playwright.config.ts
timeout: 30000, // 30 seconds per test
```

### Failed Tests

```bash
# Run with screenshots and videos
npx playwright test --screenshot=on --video=on

# Check screenshots/videos in:
# test-results/
```

## Writing New Tests

### Test Template

```typescript
import { test, expect } from '@playwright/test';

test.describe('Component Name - Cross-Browser', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should do something', async ({ page, browserName }) => {
    const element = page.getByTestId('test-id');

    // Perform action
    await element.click();

    // Verify result
    await expect(element).toHaveAttribute('aria-pressed', 'true');

    // Log browser for debugging
    console.log(`Test passed on ${browserName}`);
  });
});
```

### Best Practices

1. **Use data-testid**: Prefer `data-testid` over CSS selectors
2. **Test user interactions**: Focus on keyboard, mouse, touch
3. **Validate ARIA**: Always check ARIA attributes
4. **Cross-browser log**: Use `browserName` in console.log
5. **Wait for elements**: Use `await expect().toBeVisible()`
6. **Avoid flaky tests**: Use stable selectors and proper waits

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test API](https://playwright.dev/docs/api/class-test)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Support

For issues or questions:
1. Check `CROSS-BROWSER-TEST-REPORT.md` for known issues
2. Review Playwright documentation
3. Open an issue in the project repository
