import * as fs from 'node:fs';
import * as path from 'node:path';
import { readPackageJson } from './utils/package-json-reader.js';
import type { PackageManager, PlatformTarget, ProjectEnvironment } from './schemas/mcp-schemas.js';

const EXPO_CONFIG_CANDIDATES = ['app.json', 'app.config.js', 'app.config.ts', 'app.config.mjs'];

export interface DetectedProjectContext {
  projectPath: string;
  packageJsonPath: string;
  platform: PlatformTarget;
  environment: ProjectEnvironment;
}

export interface DetectProjectContextResult {
  success: boolean;
  context?: DetectedProjectContext;
  error?: string;
}

export function detectProjectContext(projectPath: string): DetectProjectContextResult {
  const readResult = readPackageJson(projectPath);

  if (!readResult.success || !readResult.packageJson || !readResult.installedPackages) {
    return {
      success: false,
      error: readResult.error || 'Failed to read package.json',
    };
  }

  const rootPath = projectPath.endsWith('package.json') ? path.dirname(projectPath) : projectPath;
  const resolvedRootPath = path.resolve(rootPath);
  const packageJsonPath = path.resolve(
    projectPath.endsWith('package.json') ? projectPath : path.join(rootPath, 'package.json')
  );
  const installedPackages = readResult.installedPackages;
  const runtime = detectRuntime(resolvedRootPath, installedPackages);

  return {
    success: true,
    context: {
      projectPath: resolvedRootPath,
      packageJsonPath,
      platform: runtime === 'web' ? 'web' : 'react-native',
      environment: {
        runtime,
        projectType: runtime,
        packageManager: detectPackageManager(
          resolvedRootPath,
          typeof readResult.packageJson.packageManager === 'string'
            ? readResult.packageJson.packageManager
            : undefined
        ),
      },
    },
  };
}

export function detectPackageManager(
  projectPath: string,
  packageManagerField?: string
): PackageManager {
  if (packageManagerField) {
    if (packageManagerField.startsWith('pnpm')) {
      return 'pnpm';
    }
    if (packageManagerField.startsWith('yarn')) {
      return 'yarn';
    }
    if (packageManagerField.startsWith('bun')) {
      return 'bun';
    }
    if (packageManagerField.startsWith('npm')) {
      return 'npm';
    }
  }

  if (fs.existsSync(path.join(projectPath, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }
  if (fs.existsSync(path.join(projectPath, 'yarn.lock'))) {
    return 'yarn';
  }
  if (
    fs.existsSync(path.join(projectPath, 'bun.lock')) ||
    fs.existsSync(path.join(projectPath, 'bun.lockb'))
  ) {
    return 'bun';
  }
  if (fs.existsSync(path.join(projectPath, 'package-lock.json'))) {
    return 'npm';
  }
  return 'unknown';
}

function detectRuntime(
  projectPath: string,
  installedPackages: Record<string, string>
): ProjectEnvironment['runtime'] {
  const hasExpoDependency = Boolean(installedPackages.expo);
  const hasReactNativeDependency = Boolean(installedPackages['react-native']);
  const hasExpoConfig = EXPO_CONFIG_CANDIDATES.some(fileName =>
    fs.existsSync(path.join(projectPath, fileName))
  );
  const hasNativeFolders =
    fs.existsSync(path.join(projectPath, 'ios')) ||
    fs.existsSync(path.join(projectPath, 'android'));

  if (hasExpoDependency || hasExpoConfig) {
    return 'expo';
  }

  if (hasReactNativeDependency || hasNativeFolders) {
    return 'react-native';
  }

  return 'web';
}
