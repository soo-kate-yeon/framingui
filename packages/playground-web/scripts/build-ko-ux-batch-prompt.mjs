#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const baseDir = path.resolve(process.cwd(), 'packages/playground-web');
const promptsDir = path.join(baseDir, 'prompts');

const systemPromptPath = path.join(promptsDir, 'ko-ux-translation-system-prompt.md');
const seedItemsPath = path.join(promptsDir, 'ko-ux-batch-items.seed.json');
const outPath = path.join(promptsDir, 'ko-ux-batch-request.generated.md');

const systemPrompt = fs.readFileSync(systemPromptPath, 'utf8').trim();
const items = JSON.parse(fs.readFileSync(seedItemsPath, 'utf8'));

const lines = items.map((item, idx) => {
  return `${idx + 1}) key=${item.key}, type=${item.component_type}, en="${item.source_en}"`;
});

const content = `# Generated KO UX Batch Request

아래 System Prompt를 사용합니다.

## System Prompt

\`\`\`markdown
${systemPrompt}
\`\`\`

## User Request

\`\`\`markdown
다음 EN 문자열을 KO로 현지화합니다.

Product tone: clean, modern, trustworthy
Korean style: 합니다체
Domain: SaaS UI
Target surfaces: landing, pricing, explore, template

Output:
- 항목별 JSON 배열
- 각 항목은 key/component_type/source_en/ko_final/ko_alternatives/rationale/qc 포함

Items:
${lines.join('\n')}
\`\`\`
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log(`Generated: ${outPath}`);

