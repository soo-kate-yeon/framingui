import { chromium } from '@playwright/test';
import path from 'path';

const BASE_URL = 'http://localhost:3001';
const OUTPUT_PATH = path.join(__dirname, '../public/og-image.png');

async function main() {
  console.log('Capturing OG image...');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 }, // OG image standard size
    deviceScaleFactor: 2,
  });

  const page = await context.newPage();
  await page.goto(BASE_URL);
  
  // Wait for hero to load
  await page.waitForTimeout(2000);

  // Capture full hero section
  await page.screenshot({ 
    path: OUTPUT_PATH,
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });

  console.log(`✅ OG image saved to: ${OUTPUT_PATH}`);
  
  await browser.close();
}

main().catch(console.error);
