import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.resolve(testDir, '../styles/tokens.css');

describe('@framingui/ui styles contract', () => {
  it('registers Tailwind v4 source scanning for packaged component utilities', () => {
    const content = fs.readFileSync(tokensPath, 'utf-8');

    expect(content).toContain('@source "../dist/**/*.mjs";');
  });

  it('registers tailwindcss-animate for overlay motion utilities', () => {
    const content = fs.readFileSync(tokensPath, 'utf-8');

    expect(content).toContain('@plugin "tailwindcss-animate";');
  });
});
