/**
 * Package.json Reader
 * SPEC-MCP-005 Phase 2: Read and parse package.json files
 */

import * as fs from 'fs';
import * as path from 'path';

/**
 * Package.json structure
 */
export interface PackageJson {
  name?: string;
  version?: string;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  peerDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
  [key: string]: unknown;
}

/**
 * Result of reading package.json
 */
export interface PackageJsonReadResult {
  success: boolean;
  packageJson?: PackageJson;
  installedPackages?: Record<string, string>;
  error?: string;
}

/**
 * Simple cache for repeated reads
 */
const packageJsonCache = new Map<string, { data: PackageJson; timestamp: number }>();
const CACHE_TTL = 5000; // 5 seconds

/**
 * Read and parse package.json file
 *
 * @param projectPath - Path to package.json or project root directory
 * @returns PackageJsonReadResult with parsed data or error
 */
export function readPackageJson(projectPath: string): PackageJsonReadResult {
  try {
    // Resolve to package.json path
    let packageJsonPath: string;

    if (projectPath.endsWith('package.json')) {
      packageJsonPath = projectPath;
    } else {
      packageJsonPath = path.join(projectPath, 'package.json');
    }

    // Normalize path
    packageJsonPath = path.resolve(packageJsonPath);

    // Check cache
    const cached = packageJsonCache.get(packageJsonPath);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return {
        success: true,
        packageJson: cached.data,
        installedPackages: extractInstalledPackages(cached.data),
      };
    }

    // Check if file exists
    if (!fs.existsSync(packageJsonPath)) {
      return {
        success: false,
        error: `package.json not found at: ${packageJsonPath}`,
      };
    }

    // Read and parse file
    const content = fs.readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(content) as PackageJson;

    // Validate basic structure
    if (typeof packageJson !== 'object' || packageJson === null || Array.isArray(packageJson)) {
      return {
        success: false,
        error: 'Invalid package.json: expected an object',
      };
    }

    // Cache the result
    packageJsonCache.set(packageJsonPath, {
      data: packageJson,
      timestamp: Date.now(),
    });

    return {
      success: true,
      packageJson,
      installedPackages: extractInstalledPackages(packageJson),
    };
  } catch (error) {
    if (error instanceof SyntaxError) {
      return {
        success: false,
        error: `Invalid JSON in package.json: ${error.message}`,
      };
    }

    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Extract all installed packages (dependencies + devDependencies + peerDependencies + optionalDependencies)
 *
 * @param packageJson - Parsed package.json object
 * @returns Record of package names to versions
 */
function extractInstalledPackages(packageJson: PackageJson): Record<string, string> {
  const installed: Record<string, string> = {};

  // Merge all dependency types
  const depTypes = [
    packageJson.dependencies,
    packageJson.devDependencies,
    packageJson.peerDependencies,
    packageJson.optionalDependencies,
  ];

  for (const deps of depTypes) {
    if (deps && typeof deps === 'object') {
      Object.assign(installed, deps);
    }
  }

  return installed;
}

/**
 * Clear package.json cache (useful for testing)
 */
export function clearPackageJsonCache(): void {
  packageJsonCache.clear();
}
