import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import * as fs from 'fs-extra';
import * as path from 'path';
import {
  detectEnvironment,
  type EnvironmentDetectionResult,
} from '../../src/utils/environment-detector.js';

const TEST_DIR = path.join(process.cwd(), 'test-env-detection');

describe('environment-detector', () => {
  beforeEach(async () => {
    await fs.ensureDir(TEST_DIR);
  });

  afterEach(async () => {
    await fs.remove(TEST_DIR);
  });

  describe('React Native detection', () => {
    it('should detect React Native project', async () => {
      const packageJson = {
        name: 'test-app',
        dependencies: {
          'react-native': '^0.72.0',
        },
      };

      await fs.writeJson(path.join(TEST_DIR, 'package.json'), packageJson);

      const result = await detectEnvironment(TEST_DIR);

      expect(result.isReactNative).toBe(true);
      expect(result.isWeb).toBe(false);
      expect(result.platform).toBe('react-native');
    });

    it('should detect Expo project', async () => {
      const packageJson = {
        name: 'test-app',
        dependencies: {
          expo: '^49.0.0',
        },
      };

      await fs.writeJson(path.join(TEST_DIR, 'package.json'), packageJson);

      const result = await detectEnvironment(TEST_DIR);

      expect(result.isReactNative).toBe(true);
      expect(result.platform).toBe('react-native');
    });
  });

  describe('Web detection', () => {
    it('should detect Next.js project', async () => {
      const packageJson = {
        name: 'test-app',
        dependencies: {
          next: '^14.0.0',
          react: '^18.0.0',
        },
      };

      await fs.writeJson(path.join(TEST_DIR, 'package.json'), packageJson);

      const result = await detectEnvironment(TEST_DIR);

      expect(result.isWeb).toBe(true);
      expect(result.isReactNative).toBe(false);
      expect(result.platform).toBe('web');
      expect(result.framework).toBe('next');
    });

    it('should detect Vite + React project', async () => {
      const packageJson = {
        name: 'test-app',
        dependencies: {
          react: '^18.0.0',
        },
        devDependencies: {
          vite: '^5.0.0',
        },
      };

      await fs.writeJson(path.join(TEST_DIR, 'package.json'), packageJson);

      const result = await detectEnvironment(TEST_DIR);

      expect(result.isWeb).toBe(true);
      expect(result.platform).toBe('web');
      expect(result.framework).toBe('vite');
    });
  });

  describe('Performance', () => {
    it('should complete detection in < 500ms', async () => {
      const packageJson = {
        name: 'test-app',
        dependencies: {
          react: '^18.0.0',
          next: '^14.0.0',
        },
      };

      await fs.writeJson(path.join(TEST_DIR, 'package.json'), packageJson);

      const startTime = Date.now();
      await detectEnvironment(TEST_DIR);
      const duration = Date.now() - startTime;

      expect(duration).toBeLessThan(500);
    });
  });
});
