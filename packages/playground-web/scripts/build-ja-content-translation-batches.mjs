#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const repoRoot = process.cwd();
const baseDir = path.resolve(repoRoot, 'packages/playground-web');
const promptDir = path.join(baseDir, 'prompts');
const outDir = path.join(promptDir, 'ja-content-batches');

const systemPromptPath = path.join(promptDir, 'ja-ux-translation-system-prompt.md');
const contentTemplatePath = path.join(promptDir, 'ja-content-translation-template.md');

const systemPrompt = fs.readFileSync(systemPromptPath, 'utf8').trim();
const contentTemplate = fs.readFileSync(contentTemplatePath, 'utf8').trim();

const legalEnDir = path.join(repoRoot, 'docs', 'legal', 'en');
const docsEnDir = path.join(baseDir, 'content', 'docs', 'en');
const docsKoDir = path.join(baseDir, 'content', 'docs', 'ko');
const blogRootDir = path.join(baseDir, 'content', 'blog');

function walkFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walkFiles(full));
      continue;
    }
    if (/\.(md|mdx)$/.test(entry.name)) {
      files.push(full);
    }
  }
  return files;
}

function toRelative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll('\\', '/');
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

ensureDir(outDir);

const manifest = [];

function addPrompt(scope, file, outputSuggestion) {
    const rel = toRelative(file);
    const source = fs.readFileSync(file, 'utf8');
    const packet = `# JA Translation Batch

## Scope
- scope: ${scope}
- source_file: ${rel}

## System Prompt
\`\`\`markdown
${systemPrompt}
\`\`\`

## Content Rules
\`\`\`markdown
${contentTemplate}
\`\`\`

## User Task
\`\`\`markdown
次の ${scope} 文書を日本語に翻訳してください。
source_file: ${rel}

--- SOURCE START ---
${source}
--- SOURCE END ---
\`\`\`
`;

    const fileName = rel.replaceAll('/', '__') + '.prompt.md';
    const outPath = path.join(outDir, fileName);
    fs.writeFileSync(outPath, packet, 'utf8');

    manifest.push({
      scope,
      source_file: rel,
      output_suggestion: outputSuggestion,
      prompt_file: toRelative(outPath),
      status: 'PENDING',
    });
}

// 1) legal: en -> ja
for (const file of walkFiles(legalEnDir).sort()) {
  const rel = toRelative(file);
  addPrompt('legal', file, rel.replace('/en/', '/ja/'));
}

// 2) docs: en -> ja
const docsEnFiles = walkFiles(docsEnDir).sort();
for (const file of docsEnFiles) {
  const rel = toRelative(file);
  addPrompt('docs', file, rel.replace('/en/', '/ja/'));
}

// 2-b) docs ko-only -> ja
const docsEnRelativeSet = new Set(docsEnFiles.map((file) => toRelative(file).replace('/en/', '/ko/')));
for (const file of walkFiles(docsKoDir).sort()) {
  const rel = toRelative(file);
  if (!docsEnRelativeSet.has(rel)) {
    addPrompt('docs', file, rel.replace('/ko/', '/ja/'));
  }
}

// 3) blog: include both patterns
const allBlogFiles = walkFiles(blogRootDir).sort();
for (const file of allBlogFiles) {
  const rel = toRelative(file);
  // Pattern A: content/blog/en/*.mdx
  if (rel.includes('/content/blog/en/')) {
    addPrompt('blog', file, rel.replace('/en/', '/ja/'));
    continue;
  }
  // Pattern B: content/blog/<slug>/en.mdx
  if (/\/content\/blog\/[^/]+\/en\.mdx$/.test(rel)) {
    addPrompt('blog', file, rel.replace('/en.mdx', '/ja.mdx'));
  }
}

const manifestPath = path.join(promptDir, 'ja-content-translation-manifest.json');
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n', 'utf8');

console.log(`Generated ${manifest.length} translation prompts.`);
console.log(`Manifest: ${manifestPath}`);
