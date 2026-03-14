import { afterEach, describe, expect, it } from 'vitest';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { validateEnvironmentTool } from '../../src/tools/validate-environment.js';

const tempDirs: string[] = [];

function createTempProject(packageJson: Record<string, unknown>, source: string) {
  const projectDir = fs.mkdtempSync(path.join(os.tmpdir(), 'framingui-rn-env-'));
  tempDirs.push(projectDir);

  fs.writeFileSync(path.join(projectDir, 'package.json'), JSON.stringify(packageJson, null, 2));
  fs.writeFileSync(path.join(projectDir, 'pnpm-lock.yaml'), 'lockfileVersion: 9.0');

  const sourceFile = path.join(projectDir, 'App.tsx');
  fs.writeFileSync(sourceFile, source);

  return { projectDir, sourceFile };
}

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

describe('validateEnvironmentTool react-native platform', () => {
  it('detects Expo projects and audits direct-write source files', async () => {
    const { projectDir, sourceFile } = createTempProject(
      {
        name: 'expo-app',
        packageManager: 'pnpm@10.0.0',
        dependencies: {
          expo: '~52.0.0',
          'react-native': '0.76.3',
        },
      },
      `
        import { View, Text } from 'react-native';
        export function App() {
          return <View className="p-4" style={{ backgroundColor: '#ffffff', padding: 16 }}><Text>Hello</Text></View>;
        }
      `
    );

    const result = await validateEnvironmentTool({
      projectPath: projectDir,
      requiredPackages: ['expo', 'react-native-safe-area-context'],
      platform: 'react-native',
      sourceFiles: [sourceFile],
    });

    expect(result.success).toBe(true);
    expect(result.platform).toBe('react-native');
    expect(result.environment?.runtime).toBe('expo');
    expect(result.environment?.packageManager).toBe('pnpm');
    expect(result.tailwind).toBeUndefined();
    expect(result.missing).toContain('react-native-safe-area-context');
    expect(result.sourceAudit?.findings.map(finding => finding.ruleId)).toEqual(
      expect.arrayContaining(['rn-hardcoded-color', 'rn-hardcoded-spacing', 'rn-web-classname'])
    );
  });

  it('detects bare react-native projects without Expo', async () => {
    const { projectDir } = createTempProject(
      {
        name: 'bare-app',
        dependencies: {
          'react-native': '0.76.3',
        },
      },
      `export const styles = {};`
    );

    const result = await validateEnvironmentTool({
      projectPath: projectDir,
      requiredPackages: ['react-native'],
      platform: 'react-native',
    });

    expect(result.success).toBe(true);
    expect(result.environment?.runtime).toBe('react-native');
    expect(result.tailwind).toBeUndefined();
    expect(result.missing).toEqual([]);
  });
});
