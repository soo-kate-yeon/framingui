import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = dirname(fileURLToPath(import.meta.url));
const packageDir = join(scriptDir, '..');
const repoDir = join(packageDir, '..', '..');
const distDir = join(packageDir, 'dist', 'bundled');

const sources = [
  {
    label: 'themes',
    required: true,
    candidates: [join(repoDir, '.moai', 'themes', 'generated')],
    to: join(distDir, 'themes', 'generated'),
  },
  {
    label: 'icon-libraries',
    required: true,
    candidates: [
      join(packageDir, 'data', 'icon-libraries', 'generated'),
      join(repoDir, '.moai', 'icon-libraries', 'generated'),
    ],
    to: join(distDir, 'icon-libraries', 'generated'),
  },
];

for (const { label, required, candidates, to } of sources) {
  const from = candidates.find(candidate => existsSync(candidate));

  if (!from) {
    if (required) {
      throw new Error(
        `Missing generated data directory for ${label}: ${candidates.join(', ')}`
      );
    }

    continue;
  }

  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
}
