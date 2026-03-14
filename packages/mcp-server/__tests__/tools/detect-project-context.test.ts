import { afterEach, describe, expect, it } from 'vitest';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import { detectProjectContextTool } from '../../src/tools/detect-project-context.js';
import {
  clearActiveProjectContext,
  getActiveProjectContext,
} from '../../src/project-context-state.js';

const tempDirs: string[] = [];

function createTempProject(
  packageJson: Record<string, unknown>,
  options: {
    expoConfig?: boolean;
    nativeFolders?: boolean;
    lockfile?: 'pnpm' | 'yarn' | 'npm' | 'bun';
  } = {}
) {
  const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'framingui-project-context-'));
  tempDirs.push(projectDir);

  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));

  if (options.expoConfig) {
    fs.writeFileSync(path.join(projectDir, 'app.json'), JSON.stringify({ expo: {} }, null, 2));
  }

  if (options.nativeFolders) {
    fs.mkdirSync(path.join(projectDir, 'ios'));
    fs.mkdirSync(path.join(projectDir, 'android'));
  }

  switch (options.lockfile) {
    case 'pnpm':
      fs.writeFileSync(path.join(projectDir, 'pnpm-lock.yaml'), 'lockfileVersion: 9.0');
      break;
    case 'yarn':
      fs.writeFileSync(path.join(projectDir, 'yarn.lock'), '');
      break;
    case 'npm':
      fs.writeFileSync(path.join(projectDir, 'package-lock.json'), '{}');
      break;
    case 'bun':
      fs.writeFileSync(path.join(projectDir, 'bun.lockb'), '');
      break;
  }

  return projectDir;
}

afterEach(() => {
  clearActiveProjectContext();
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('detectProjectContextTool', () => {
  it('detects Expo projects and stores the session default by default', async () => {
    const projectDir = createTempProject(
      {
        name: 'expo-app',
        packageManager: 'pnpm@10.0.0',
        dependencies: {
          expo: '~52.0.0',
          'react-native': '0.76.3',
        },
      },
      { expoConfig: true, lockfile: 'pnpm' }
    );

    const result = await detectProjectContextTool({ projectPath: projectDir });

    expect(result.success).toBe(true);
    expect(result.platform).toBe('react-native');
    expect(result.environment?.runtime).toBe('expo');
    expect(result.environment?.packageManager).toBe('pnpm');
    expect(result.recommendations?.[0]?.workflow).toBe('react-native-direct-write');
    expect(result.sessionDefaultApplied).toBe(true);
    expect(getActiveProjectContext()?.projectPath).toBe(projectDir);
  });

  it('detects bare React Native projects without Expo', async () => {
    const projectDir = createTempProject(
      {
        name: 'bare-app',
        dependencies: {
          'react-native': '0.76.3',
        },
      },
      { nativeFolders: true, lockfile: 'yarn' }
    );

    const result = await detectProjectContextTool({
      projectPath: path.join(projectDir, 'package.json'),
      setAsDefault: false,
    });

    expect(result.success).toBe(true);
    expect(result.projectPath).toBe(projectDir);
    expect(result.packageJsonPath).toBe(path.join(projectDir, 'package.json'));
    expect(result.platform).toBe('react-native');
    expect(result.environment?.runtime).toBe('react-native');
    expect(result.environment?.packageManager).toBe('yarn');
    expect(result.sessionDefaultApplied).toBe(false);
    expect(getActiveProjectContext()).toBeNull();
  });

  it('detects web projects and recommends the screen-definition workflow', async () => {
    const projectDir = createTempProject(
      {
        name: 'web-app',
        packageManager: 'npm@10.8.0',
        dependencies: {
          react: '^19.0.0',
          next: '^16.0.0',
        },
      },
      { lockfile: 'npm' }
    );

    const result = await detectProjectContextTool({ projectPath: projectDir });

    expect(result.success).toBe(true);
    expect(result.platform).toBe('web');
    expect(result.environment?.runtime).toBe('web');
    expect(result.environment?.packageManager).toBe('npm');
    expect(result.recommendations?.[0]?.workflow).toBe('web-screen-definition');
  });

  it('returns a clear error when package.json cannot be found', async () => {
    const missingDir = path.join(os.tmpdir(), `framingui-missing-${Date.now()}`);

    const result = await detectProjectContextTool({ projectPath: missingDir });

    expect(result.success).toBe(false);
    expect(result.error).toContain('package.json not found');
  });
});
