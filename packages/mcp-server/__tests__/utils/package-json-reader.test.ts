/**
 * Package JSON Reader Tests
 * SPEC-MCP-005 Phase 4: Comprehensive unit tests for package.json reader
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  readPackageJson,
  clearPackageJsonCache,
  type PackageJson,
} from '../../src/utils/package-json-reader.js';
import * as fs from 'fs';

vi.mock('fs');

describe('readPackageJson', () => {
  beforeEach(() => {
    clearPackageJsonCache();
    vi.clearAllMocks();
  });

  describe('Valid package.json', () => {
    it('should read valid package.json file', () => {
      const mockPackageJson: PackageJson = {
        name: 'test-package',
        version: '1.0.0',
        dependencies: {
          react: '^19.0.0',
          'framer-motion': '^11.0.0',
        },
      };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      const result = readPackageJson('/project');

      expect(result.success).toBe(true);
      expect(result.packageJson?.name).toBe('test-package');
      expect(result.packageJson?.version).toBe('1.0.0');
      expect(result.packageJson?.dependencies).toEqual(mockPackageJson.dependencies);
      expect(result.installedPackages).toEqual(mockPackageJson.dependencies);
    });
  });

  describe('File Not Found', () => {
    it('should return error when package.json does not exist', () => {
      vi.mocked(fs.existsSync).mockReturnValue(false);

      const result = readPackageJson('/nonexistent');

      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
      expect(result.error).toContain('/nonexistent/package.json');
    });
  });

  describe('Invalid JSON', () => {
    it('should return error for invalid JSON', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue('{ invalid json }');

      const result = readPackageJson('/project');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid JSON');
    });
  });

  describe('Path Handling', () => {
    it('should handle directory path (without package.json)', () => {
      const mockPackageJson: PackageJson = { name: 'test' };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      const result = readPackageJson('/project');

      expect(result.success).toBe(true);
      expect(result.packageJson?.name).toBe('test');

      // Verify that it looked for /project/package.json
      expect(fs.existsSync).toHaveBeenCalledWith(expect.stringContaining('package.json'));
    });

    it('should handle file path (with package.json)', () => {
      const mockPackageJson: PackageJson = { name: 'test' };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      const result = readPackageJson('/project/package.json');

      expect(result.success).toBe(true);
      expect(result.packageJson?.name).toBe('test');
    });
  });

  describe('Dependency Extraction', () => {
    it('should extract all dependency types', () => {
      const mockPackageJson: PackageJson = {
        name: 'test',
        dependencies: { pkg1: '^1.0.0' },
        devDependencies: { pkg2: '^2.0.0' },
        peerDependencies: { pkg3: '^3.0.0' },
        optionalDependencies: { pkg4: '^4.0.0' },
      };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      const result = readPackageJson('/project');

      expect(result.success).toBe(true);
      expect(result.installedPackages).toEqual({
        pkg1: '^1.0.0',
        pkg2: '^2.0.0',
        pkg3: '^3.0.0',
        pkg4: '^4.0.0',
      });
    });

    it('should handle missing dependency fields', () => {
      const mockPackageJson: PackageJson = {
        name: 'test',
        version: '1.0.0',
      };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      const result = readPackageJson('/project');

      expect(result.success).toBe(true);
      expect(result.installedPackages).toEqual({});
    });
  });

  describe('Caching', () => {
    it('should cache results and return cached data on subsequent calls', () => {
      const mockPackageJson: PackageJson = { name: 'test', version: '1.0.0' };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      // First call
      const result1 = readPackageJson('/project');
      expect(result1.success).toBe(true);

      // Second call (should use cache)
      const result2 = readPackageJson('/project');
      expect(result2.success).toBe(true);
      expect(result2.packageJson?.name).toBe('test');

      // fs.readFileSync should only be called once due to caching
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);

      // Both results should have the same data
      expect(result1.packageJson).toEqual(result2.packageJson);
    });

    it('should clear cache when clearPackageJsonCache is called', () => {
      const mockPackageJson: PackageJson = { name: 'test' };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      // First call
      readPackageJson('/project');

      // Clear cache
      clearPackageJsonCache();

      // Second call (should read again)
      readPackageJson('/project');

      // Should be called twice (once before clear, once after)
      expect(fs.readFileSync).toHaveBeenCalledTimes(2);
    });
  });

  describe('Empty and Invalid Structures', () => {
    it('should handle empty package.json object', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue('{}');

      const result = readPackageJson('/project');

      expect(result.success).toBe(true);
      expect(result.packageJson).toEqual({});
      expect(result.installedPackages).toEqual({});
    });

    it('should return error for non-object package.json', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue('[]'); // Array instead of object

      const result = readPackageJson('/project');

      expect(result.success).toBe(false);
      expect(result.error).toContain('expected an object');
    });

    it('should return error for null package.json', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue('null');

      const result = readPackageJson('/project');

      expect(result.success).toBe(false);
      expect(result.error).toContain('expected an object');
    });
  });

  describe('Error Handling', () => {
    it('should handle JSON parse errors gracefully', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue('{ "name": "test", }'); // Trailing comma

      const result = readPackageJson('/project');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Invalid JSON');
    });

    it('should handle file read errors', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error('Permission denied');
      });

      const result = readPackageJson('/project');

      expect(result.success).toBe(false);
      expect(result.error).toContain('Permission denied');
    });

    it('should handle unknown error types', () => {
      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error('String error');
      });

      const result = readPackageJson('/project');

      expect(result.success).toBe(false);
      expect(result.error).toBe('String error');
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle package.json with additional fields', () => {
      const mockPackageJson = {
        name: 'complex-package',
        version: '2.0.0',
        description: 'A complex package',
        scripts: {
          test: 'vitest',
          build: 'tsc',
        },
        dependencies: {
          react: '^19.0.0',
        },
        devDependencies: {
          typescript: '^5.0.0',
        },
        author: 'Test Author',
        license: 'MIT',
      };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      const result = readPackageJson('/project');

      expect(result.success).toBe(true);
      expect(result.packageJson?.name).toBe('complex-package');
      expect(result.packageJson?.description).toBe('A complex package');
      expect(result.installedPackages).toEqual({
        react: '^19.0.0',
        typescript: '^5.0.0',
      });
    });

    it('should handle package.json with overlapping dependencies', () => {
      const mockPackageJson: PackageJson = {
        name: 'test',
        dependencies: { react: '^19.0.0' },
        devDependencies: { react: '^18.0.0' }, // Same package, different version
      };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      const result = readPackageJson('/project');

      expect(result.success).toBe(true);
      // devDependencies should override dependencies (last wins)
      expect(result.installedPackages?.react).toBe('^18.0.0');
    });

    it('should handle package.json with malformed dependency objects', () => {
      const mockPackageJson = {
        name: 'test',
        dependencies: 'not-an-object', // Invalid type
        devDependencies: { valid: '^1.0.0' },
      };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      const result = readPackageJson('/project');

      expect(result.success).toBe(true);
      // Should only extract valid dependency objects
      expect(result.installedPackages).toEqual({ valid: '^1.0.0' });
    });
  });

  describe('Cache TTL', () => {
    it('should respect cache TTL and re-read after expiration', async () => {
      const mockPackageJson: PackageJson = { name: 'test', version: '1.0.0' };

      vi.mocked(fs.existsSync).mockReturnValue(true);
      vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockPackageJson));

      // Mock Date.now() to control time
      const originalDateNow = Date.now;
      let currentTime = 1000;
      vi.spyOn(Date, 'now').mockImplementation(() => currentTime);

      // First call
      readPackageJson('/project');
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);

      // Second call within TTL (should use cache)
      currentTime = 5000; // 4 seconds later (within 5s TTL)
      readPackageJson('/project');
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);

      // Third call after TTL expiration (should re-read)
      currentTime = 7000; // 6 seconds from first call (beyond 5s TTL)
      readPackageJson('/project');
      expect(fs.readFileSync).toHaveBeenCalledTimes(2);

      // Restore Date.now
      Date.now = originalDateNow;
    });
  });
});
