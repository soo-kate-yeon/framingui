/* eslint-disable */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const screenshotDir = path.resolve(__dirname, 'public/screenshots');

async function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);

  arrayOfFiles = arrayOfFiles || [];

  files.forEach(function (file) {
    if (fs.statSync(dirPath + '/' + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
    } else {
      if (file.endsWith('.png')) {
        arrayOfFiles.push(path.join(dirPath, '/', file));
      }
    }
  });

  return arrayOfFiles;
}

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  const files = await getAllFiles(screenshotDir);
  console.log(`Found ${files.length} PNG files. Starting conversion...`);

  for (const file of files) {
    const webpPath = file.replace('.png', '.webp');
    console.log(`Converting ${file} -> ${webpPath}`);

    // Open the local file
    await page.goto(`file://${file}`);

    // Get the image element dimensions
    const img = await page.$('img');
    if (img) {
      const box = await img.boundingBox();
      if (box) {
        await page.setViewportSize({
          width: Math.ceil(box.width),
          height: Math.ceil(box.height),
        });
        await page.screenshot({
          path: webpPath,
          type: 'webp',
          quality: 90,
          clip: box,
        });
      } else {
        await page.screenshot({ path: webpPath, type: 'webp', quality: 90 });
      }
    } else {
      // Fallback if no <img> tag found (e.g. browser just shows it)
      await page.screenshot({ path: webpPath, type: 'webp', quality: 90, fullPage: true });
    }
  }

  await browser.close();
  console.log('Conversion complete!');
})();
