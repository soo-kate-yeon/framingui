/**
 * Validate Environment MCP Tool
 * SPEC-MCP-005 Phase 2: Check if user's project has required NPM packages installed
 */

import type {
  ValidateEnvironmentInput,
  ValidateEnvironmentOutput,
} from '../schemas/mcp-schemas.js';
import { readPackageJson } from '../utils/package-json-reader.js';
import { extractErrorMessage } from '../utils/error-handler.js';

/**
 * Validate user's environment for required dependencies
 *
 * Compares required packages against installed packages in package.json
 * and provides installation commands for missing packages.
 *
 * @param input - Project path and required packages to validate
 * @returns Validation result with installed/missing packages and install commands
 *
 * @example
 * ```typescript
 * const result = await validateEnvironmentTool({
 *   projectPath: '/path/to/project',
 *   requiredPackages: ['framer-motion', 'react']
 * });
 *
 * if (result.success && result.missing.length > 0) {
 *   console.log(`Missing packages: ${result.missing.join(', ')}`);
 *   console.log(`Install with: ${result.installCommands.npm}`);
 * }
 * ```
 */
export async function validateEnvironmentTool(
  input: ValidateEnvironmentInput
): Promise<ValidateEnvironmentOutput> {
  try {
    const { projectPath, requiredPackages } = input;

    // Step 1: Read package.json from the project
    const readResult = readPackageJson(projectPath);

    if (!readResult.success || !readResult.installedPackages) {
      return {
        success: false,
        error: readResult.error || 'Failed to read package.json',
      };
    }

    const installedPackages = readResult.installedPackages;

    // Step 2: Compare required packages with installed packages
    const installed: Record<string, string> = {};
    const missing: string[] = [];

    for (const packageName of requiredPackages) {
      const version = installedPackages[packageName];
      if (version !== undefined) {
        // Package is installed
        installed[packageName] = version;
      } else {
        // Package is missing
        missing.push(packageName);
      }
    }

    // Step 3: Generate install commands for missing packages
    const installCommands = generateInstallCommands(missing);

    // Step 4: Check for potential warnings (optional enhancement)
    const warnings: string[] = [];

    // Optional: Check for version compatibility issues
    // This could be enhanced in the future to detect version conflicts
    // For now, we keep warnings empty unless specific checks are needed

    return {
      success: true,
      installed,
      missing,
      installCommands,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}

/**
 * Generate installation commands for multiple package managers
 *
 * @param packages - Array of package names to install
 * @returns Install commands for npm, yarn, pnpm, and bun
 *
 * @example
 * ```typescript
 * const commands = generateInstallCommands(['react', 'react-dom']);
 * // {
 * //   npm: 'npm install react react-dom',
 * //   yarn: 'yarn add react react-dom',
 * //   pnpm: 'pnpm add react react-dom',
 * //   bun: 'bun add react react-dom'
 * // }
 * ```
 */
function generateInstallCommands(packages: string[]): {
  npm: string;
  yarn: string;
  pnpm: string;
  bun: string;
} {
  if (packages.length === 0) {
    return {
      npm: '',
      yarn: '',
      pnpm: '',
      bun: '',
    };
  }

  const packageList = packages.join(' ');

  return {
    npm: `npm install ${packageList}`,
    yarn: `yarn add ${packageList}`,
    pnpm: `pnpm add ${packageList}`,
    bun: `bun add ${packageList}`,
  };
}
