#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const baseDir = path.resolve(process.cwd(), 'packages/playground-web');
const promptsDir = path.join(baseDir, 'prompts');

const systemPromptPath = path.join(promptsDir, 'ja-ux-translation-system-prompt.md');
const seedItemsPath = path.join(promptsDir, 'ja-ux-batch-items.seed.json');
const outPath = path.join(promptsDir, 'ja-ux-batch-request.generated.md');

const systemPrompt = fs.readFileSync(systemPromptPath, 'utf8').trim();
const items = JSON.parse(fs.readFileSync(seedItemsPath, 'utf8'));

const lines = items.map((item, idx) => {
  return `${idx + 1}) key=${item.key}, type=${item.component_type}, en="${item.source_en}"`;
});

const content = `# Generated JA UX Batch Request

아래 System Prompt를 사용합니다.

## System Prompt

\`\`\`markdown
${systemPrompt}
\`\`\`

## User Request

\`\`\`markdown
다음 EN 문자열을 JA로 현지화합니다.

Product tone: clean, modern, trustworthy
Japanese style: modern desu/masu
Domain: SaaS UI
Target surfaces: landing, pricing, explore, template

Output:
- 항목별 JSON 배열
- 각 항목은 key/component_type/source_en/ja_final/ja_alternatives/rationale/qc 포함

Items:
${lines.join('\n')}
\`\`\`
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log(`Generated: ${outPath}`);

