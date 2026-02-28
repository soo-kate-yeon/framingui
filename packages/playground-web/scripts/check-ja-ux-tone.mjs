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

const hasJa = /[\u3040-\u30ff\u3400-\u9fff]/;

const hardRules = [
  { tag: 'pronoun', regex: /(あなた|君|私たち|我々|弊社|当社)/ },
  { tag: 'verbose', regex: /(することができます|行うことができます|することが可能です)/ },
  { tag: 'excessive-keigo', regex: /(くださいませ|お願い申し上げます|いただけますと幸いです)/ },
  { tag: 'translationese', regex: /(〜すること|〜を行う)/ },
];

// Aggressive passive patterns that commonly appear in literal translations.
const passiveHeavy = /(表示されます|作成されます|更新されます|実行されます|変更されます)/;

// Warning only: too many noun chains reduce readability.
const nounChain = /の[^。]{0,10}の[^。]{0,10}の/;

let hasErrors = false;
let warningCount = 0;

for (const relPath of targetFiles) {
  const filePath = path.join(root, relPath);
  if (!fs.existsSync(filePath)) {
    continue;
  }

  const lines = fs.readFileSync(filePath, 'utf8').split('\n');

  lines.forEach((line, idx) => {
    if (!hasJa.test(line)) {
      return;
    }

    for (const rule of hardRules) {
      if (rule.regex.test(line)) {
        hasErrors = true;
        console.log(`[${rule.tag}] ${relPath}:${idx + 1} ${line.trim()}`);
      }
    }

    if (passiveHeavy.test(line)) {
      hasErrors = true;
      console.log(`[passive] ${relPath}:${idx + 1} ${line.trim()}`);
    }

    if (nounChain.test(line)) {
      warningCount += 1;
      console.log(`[warning:noun-chain] ${relPath}:${idx + 1} ${line.trim()}`);
    }
  });
}

if (warningCount > 0) {
  console.log(`\nJA UX writing warnings: ${warningCount}`);
}

if (hasErrors) {
  console.log('\nJA UX writing QC failed.');
  process.exit(1);
}

console.log('JA UX writing QC passed.');

