/**
 * Dependency Extractor
 * SPEC-MCP-005 Phase 2: Extract external/internal dependencies from generated code
 */

import { parse } from '@babel/parser';
import traverse, { type NodePath } from '@babel/traverse';
import type { ImportDeclaration, CallExpression } from '@babel/types';
import type { Dependencies } from '../schemas/mcp-schemas.js';

/**
 * Known Node.js built-in modules
 */
const BUILTIN_MODULES = new Set([
  'fs',
  'path',
  'url',
  'http',
  'https',
  'crypto',
  'stream',
  'util',
  'events',
  'buffer',
  'child_process',
  'os',
  'process',
  'assert',
  'timers',
  'zlib',
  'querystring',
  'net',
  'dns',
  'tls',
  'dgram',
  'readline',
  'repl',
  'vm',
  'cluster',
  'v8',
  'worker_threads',
]);

/**
 * Known React/Next.js compatibility requirements
 */
const COMPATIBILITY_MAP: Record<string, { react?: string; node?: string }> = {
  'framer-motion': { react: '^18.0.0 || ^19.0.0', node: '>=18.0.0' },
  '@radix-ui/react-slot': { react: '^18.0.0 || ^19.0.0' },
  '@radix-ui/react-dialog': { react: '^18.0.0 || ^19.0.0' },
  '@radix-ui/react-dropdown-menu': { react: '^18.0.0 || ^19.0.0' },
  '@radix-ui/react-tooltip': { react: '^18.0.0 || ^19.0.0' },
  '@radix-ui/react-popover': { react: '^18.0.0 || ^19.0.0' },
  next: { react: '^18.0.0 || ^19.0.0', node: '>=18.17.0' },
  'lucide-react': { react: '^16.x || ^17.x || ^18.x || ^19.x' },
};

/**
 * Known compatibility notes for popular packages
 */
const COMPATIBILITY_NOTES: Record<string, string> = {
  'framer-motion': 'framer-motion requires React 18+ for concurrent features',
  '@radix-ui/react-slot': '@radix-ui/react-slot is a peer dependency of @framingui/ui',
  '@radix-ui/react-dialog': '@radix-ui/react-dialog requires peer dependencies: react, react-dom',
  next: 'Next.js requires peer dependencies: react, react-dom',
  'lucide-react': 'lucide-react is compatible with React 16.x, 17.x, 18.x, and 19.x',
};

/**
 * Check if a module is a Node.js built-in
 */
function isBuiltIn(source: string): boolean {
  // Remove node: prefix if present
  const normalized = source.startsWith('node:') ? source.slice(5) : source;
  return BUILTIN_MODULES.has(normalized);
}

/**
 * Extract package name from scoped or unscoped import
 * Examples:
 * - 'framer-motion' -> 'framer-motion'
 * - '@radix-ui/react-slot' -> '@radix-ui/react-slot'
 * - '@framingui/ui/components/Button' -> '@framingui/ui'
 */
function extractPackageName(source: string): string {
  if (source.startsWith('@')) {
    // Scoped package: @scope/package or @scope/package/subpath
    const parts = source.split('/');
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  }

  // Unscoped package: package or package/subpath
  const firstPart = source.split('/')[0];
  return firstPart || source;
}

/**
 * Generate install commands for all package managers
 */
function generateInstallCommands(packages: string[]): {
  npm: string;
  yarn: string;
  pnpm: string;
  bun: string;
} {
  const packageList = packages.join(' ');

  if (packages.length === 0) {
    return {
      npm: '',
      yarn: '',
      pnpm: '',
      bun: '',
    };
  }

  return {
    npm: `npm install ${packageList}`,
    yarn: `yarn add ${packageList}`,
    pnpm: `pnpm add ${packageList}`,
    bun: `bun add ${packageList}`,
  };
}

/**
 * Get compatibility requirements for packages
 */
function getCompatibilityRequirements(
  packages: string[]
): { react?: string; node?: string } | undefined {
  const compatibility: { react?: string; node?: string } = {};

  for (const pkg of packages) {
    const pkgCompat = COMPATIBILITY_MAP[pkg];
    if (pkgCompat) {
      if (pkgCompat.react && !compatibility.react) {
        compatibility.react = pkgCompat.react;
      }
      if (pkgCompat.node && !compatibility.node) {
        compatibility.node = pkgCompat.node;
      }
    }
  }

  return Object.keys(compatibility).length > 0 ? compatibility : undefined;
}

/**
 * Get compatibility notes for packages
 */
function getCompatibilityNotes(packages: string[]): string[] {
  const notes: string[] = [];

  for (const pkg of packages) {
    const note = COMPATIBILITY_NOTES[pkg];
    if (note) {
      notes.push(note);
    }
  }

  return notes;
}

/**
 * Extract dependencies from generated code
 *
 * @param generatedCode - The generated code to extract dependencies from
 * @returns Dependencies object with external/internal packages and install commands
 */
export function extractDependencies(generatedCode: string): Dependencies {
  const externalSet = new Set<string>();
  const internalSet = new Set<string>();

  try {
    // Parse code into AST
    const ast = parse(generatedCode, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript'],
    });

    // Traverse AST to find import declarations
    traverse(ast, {
      ImportDeclaration(path: NodePath<ImportDeclaration>) {
        const source = path.node.source.value;

        // Skip relative imports
        if (source.startsWith('.') || source.startsWith('/')) {
          return;
        }

        // Skip built-in modules
        if (isBuiltIn(source)) {
          return;
        }

        // Extract package name
        const packageName = extractPackageName(source);

        // Categorize as internal or external
        if (packageName.startsWith('@framingui/')) {
          internalSet.add(packageName);
        } else {
          externalSet.add(packageName);
        }
      },
      // Also handle dynamic imports: import('module')
      CallExpression(path: NodePath<CallExpression>) {
        if (path.node.callee.type === 'Import' && path.node.arguments.length > 0) {
          const arg = path.node.arguments[0];
          if (arg && arg.type === 'StringLiteral') {
            const source = arg.value;

            // Skip relative imports and built-ins
            if (source.startsWith('.') || source.startsWith('/') || isBuiltIn(source)) {
              return;
            }

            const packageName = extractPackageName(source);

            if (packageName.startsWith('@framingui/')) {
              internalSet.add(packageName);
            } else {
              externalSet.add(packageName);
            }
          }
        }
      },
    });
  } catch (error) {
    // If parsing fails, return empty dependencies
    console.error('Failed to parse code for dependency extraction:', error);
    return {
      external: [],
      internal: [],
      installCommands: {
        npm: '',
        yarn: '',
        pnpm: '',
        bun: '',
      },
    };
  }

  const external = Array.from(externalSet).sort();
  const internal = Array.from(internalSet).sort();

  const dependencies: Dependencies = {
    external,
    internal,
    installCommands: generateInstallCommands(external),
  };

  // Add compatibility information if available
  const compatibility = getCompatibilityRequirements(external);
  if (compatibility) {
    dependencies.compatibility = compatibility;
  }

  // Add notes if available
  const notes = getCompatibilityNotes(external);
  if (notes.length > 0) {
    dependencies.notes = notes;
  }

  return dependencies;
}
