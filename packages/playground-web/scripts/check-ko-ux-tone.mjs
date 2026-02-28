#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();

const targetFiles = [
  'data/i18n/landing.ts',
  'data/i18n/pricing.ts',
  'data/templates.ts',
  'components/explore/ExplorePageHeader.tsx',
  'components/explore/ExploreTopBanner.tsx',
  'components/explore/TemplateCard.tsx',
  'components/explore/TemplateGallery.tsx',
  'components/explore/TemplateModal.tsx',
  'app/explore/template/[id]/page.tsx',
];

const bannedTone = /(해요|돼요|이에요|예요|줘요|봐요|지요)/;
const passiveHeavy = /(되어집니다|되어 있습니다|적용되어|구성되어|생성되어)/;

let hasIssues = false;

for (const relPath of targetFiles) {
  const filePath = path.join(root, relPath);
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  lines.forEach((line, idx) => {
    if (!/[가-힣]/.test(line)) {
      return;
    }

    if (bannedTone.test(line)) {
      hasIssues = true;
      console.log(`[tone] ${relPath}:${idx + 1} ${line.trim()}`);
    }

    if (passiveHeavy.test(line)) {
      hasIssues = true;
      console.log(`[passive] ${relPath}:${idx + 1} ${line.trim()}`);
    }
  });
}

if (hasIssues) {
  console.log('\nKO UX writing QC failed.');
  process.exit(1);
}

console.log('KO UX writing QC passed.');
