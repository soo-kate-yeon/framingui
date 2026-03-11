import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import {
  findBestStylesheet,
  SCREEN_GENERATION_PACKAGES,
  verifyInitSetup,
} from '../../src/cli/init.ts';

const tempDirs: string[] = [];

function makeTempProject(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'framingui-init-'));
  tempDirs.push(dir);
  return dir;
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('init bootstrap helpers', () => {
  it('prefers Next.js global stylesheets when multiple CSS files exist', () => {
    const dir = makeTempProject();

    fs.mkdirSync(path.join(dir, 'src'), { recursive: true });
    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    fs.writeFileSync(path.join(dir, 'src/index.css'), 'body {}');
    fs.writeFileSync(path.join(dir, 'app/globals.css'), 'html {}');

    expect(findBestStylesheet(dir, 'nextjs')).toBe('app/globals.css');
  });

  it('verifies a complete init bootstrap', () => {
    const dir = makeTempProject();

    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify(
        {
          name: 'demo-app',
          dependencies: Object.fromEntries(SCREEN_GENERATION_PACKAGES.map(pkg => [pkg, 'latest'])),
        },
        null,
        2
      )
    );
    fs.writeFileSync(
      path.join(dir, 'tailwind.config.ts'),
      `export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './node_modules/@framingui/ui/dist/**/*.{js,mjs}'],
  plugins: [require('tailwindcss-animate')],
};`
    );
    fs.writeFileSync(
      path.join(dir, 'app/globals.css'),
      "@import '@framingui/ui/styles';\n\nbody { margin: 0; }\n"
    );

    const result = verifyInitSetup(dir);

    expect(result.installedPackagesOk).toBe(true);
    expect(result.styleImportOk).toBe(true);
    expect(result.tailwindFound).toBe(true);
    expect(result.tailwindUiContentOk).toBe(true);
    expect(result.tailwindAnimatePluginOk).toBe(true);
    expect(result.warnings).toHaveLength(0);
  });

  it('reports missing packages and style import when bootstrap is incomplete', () => {
    const dir = makeTempProject();

    fs.mkdirSync(path.join(dir, 'app'), { recursive: true });
    fs.writeFileSync(
      path.join(dir, 'package.json'),
      JSON.stringify({ name: 'demo-app', dependencies: { '@framingui/ui': 'latest' } }, null, 2)
    );
    fs.writeFileSync(
      path.join(dir, 'tailwind.config.ts'),
      `export default { content: ['./app/**/*.{js,ts,jsx,tsx}'], plugins: [] };`
    );
    fs.writeFileSync(path.join(dir, 'app/globals.css'), 'body { margin: 0; }\n');

    const result = verifyInitSetup(dir);

    expect(result.installedPackagesOk).toBe(false);
    expect(result.styleImportOk).toBe(false);
    expect(result.tailwindUiContentOk).toBe(false);
    expect(result.tailwindAnimatePluginOk).toBe(false);
    expect(result.warnings.length).toBeGreaterThan(0);
  });
});
