import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const THEMES = [
  'square-minimalism',
  'neutral-workspace',
  'classic-magazine',
  'dark-boldness',
  'pebble',
  'minimal-workspace',
  'editorial-tech',
];

const BASE_URL = 'http://localhost:3001';
const OUTPUT_DIR = path.join(__dirname, '../public/screenshots');

async function main() {
  console.log('Starting screenshot generation pipieline...');
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 900 },
    deviceScaleFactor: 2, // High resolution for crisp UI
  });

  const page = await context.newPage();

  for (const theme of THEMES) {
    console.log(`\nProcessing theme: [${theme}]`);
    const themeDir = path.join(OUTPUT_DIR, theme);
    if (!fs.existsSync(themeDir)) {
      fs.mkdirSync(themeDir, { recursive: true });
    }

    try {
      await page.goto(`${BASE_URL}/explore/${theme}`);

      // Wait for the opacity transition and layout to settle
      await page.waitForTimeout(1000);

      // 1. Snapshot Dashboard
      const dashboardPath = path.join(themeDir, 'dashboard.png');
      await page.screenshot({ path: dashboardPath });
      console.log(`  -> Saved dashboard.png`);

      // 2. Click Component Gallery Tab
      // It looks for a button containing either "Component" (English) or "컴포넌트" (Korean)
      const componentTabBtn = page
        .locator('button:has-text("Component"), button:has-text("컴포넌트")')
        .first();

      if (await componentTabBtn.isVisible()) {
        await componentTabBtn.click();
        await page.waitForTimeout(600); // Wait for tab switch rendering

        const componentsPath = path.join(themeDir, 'components.png');
        await page.screenshot({ path: componentsPath });
        console.log(`  -> Saved components.png`);
      } else {
        console.log(`  -> Could not find the Component tab button for ${theme}`);
      }
    } catch (e) {
      console.error(`  -> Error processing ${theme}:`, e);
    }
  }

  await browser.close();
  console.log('\n✅ All screenshots generated successfully!');
}

main().catch(console.error);
