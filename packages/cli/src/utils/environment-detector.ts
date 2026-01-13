import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Environment detection result
 */
export interface EnvironmentDetectionResult {
  platform: 'web' | 'react-native' | 'unknown';
  isWeb: boolean;
  isReactNative: boolean;
  framework?: string;
  hasReactNative?: boolean;
  hasExpo?: boolean;
  hasNext?: boolean;
  hasVite?: boolean;
}

/**
 * Detect project environment
 */
export async function detectEnvironment(
  projectDir: string
): Promise<EnvironmentDetectionResult> {
  try {
    const packageJsonPath = path.join(projectDir, 'package.json');

    if (!(await fs.pathExists(packageJsonPath))) {
      return {
        platform: 'unknown',
        isWeb: false,
        isReactNative: false,
      };
    }

    const packageJson = await fs.readJson(packageJsonPath);
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    // Check for React Native
    const hasReactNative = 'react-native' in dependencies;
    const hasExpo = 'expo' in dependencies;

    if (hasReactNative || hasExpo) {
      return {
        platform: 'react-native',
        isWeb: false,
        isReactNative: true,
        hasReactNative,
        hasExpo,
      };
    }

    // Check for web frameworks
    const hasNext = 'next' in dependencies;
    const hasVite = 'vite' in dependencies;

    if (hasNext) {
      return {
        platform: 'web',
        isWeb: true,
        isReactNative: false,
        framework: 'next',
        hasNext,
      };
    }

    if (hasVite) {
      return {
        platform: 'web',
        isWeb: true,
        isReactNative: false,
        framework: 'vite',
        hasVite,
      };
    }

    // Default to web if React is present
    if ('react' in dependencies) {
      return {
        platform: 'web',
        isWeb: true,
        isReactNative: false,
        framework: 'react',
      };
    }

    return {
      platform: 'unknown',
      isWeb: false,
      isReactNative: false,
    };
  } catch (error) {
    return {
      platform: 'unknown',
      isWeb: false,
      isReactNative: false,
    };
  }
}
