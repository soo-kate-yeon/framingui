import * as fs from 'fs-extra';
import * as path from 'path';

/**
 * Screen generation options
 */
export interface ScreenGenerationOptions {
  name: string;
  environment: string;
  skeleton: string;
  intent: string;
  components: string[];
  outputDir: string;
  overwrite?: boolean;
  rename?: string;
}

/**
 * Screen generation result
 */
export interface ScreenGenerationResult {
  success: boolean;
  message?: string;
  files?: {
    page: string;
    layout: string;
    components: string;
  };
  error?: string;
}

/**
 * Check if screen already exists
 */
export async function checkDuplicateScreen(
  screenName: string,
  outputDir: string
): Promise<boolean> {
  const screenDir = path.join(outputDir, 'src', 'screens', screenName);
  return await fs.pathExists(screenDir);
}

/**
 * Generate page.tsx template
 */
function generatePageTemplate(options: ScreenGenerationOptions): string {
  const { name, environment, intent, components } = options;

  const componentImports = components.length > 0
    ? `import { ${components.join(', ')} } from './components';\n`
    : '';

  return `${componentImports}
/**
 * ${name} Screen
 * Environment: ${environment}
 * Intent: ${intent}
 */
export default function ${name}() {
  return (
    <div className="${name.toLowerCase()}-screen">
      <h1>${name}</h1>
      {/* Screen content for ${intent} intent */}
    </div>
  );
}
`;
}

/**
 * Generate layout.tsx template
 */
function generateLayoutTemplate(options: ScreenGenerationOptions): string {
  const { skeleton } = options;

  return `import { ReactNode } from 'react';

/**
 * Layout Component
 * Skeleton: ${skeleton}
 */
interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="layout-${skeleton}">
      {children}
    </div>
  );
}
`;
}

/**
 * Generate components/index.ts template
 */
function generateComponentsIndex(components: string[]): string {
  if (components.length === 0) {
    return '// Component exports will be added here\nexport {};\n';
  }

  const exports = components
    .map((component) => `export { ${component} } from './${component}';`)
    .join('\n');

  return `${exports}\n`;
}

/**
 * Generate screen files
 */
export async function generateScreenFiles(
  options: ScreenGenerationOptions
): Promise<ScreenGenerationResult> {
  try {
    // Use renamed screen name if provided
    const actualName = options.rename || options.name;

    // Check for duplicates (unless overwrite is true)
    const isDuplicate = await checkDuplicateScreen(actualName, options.outputDir);

    if (isDuplicate && options.overwrite === false) {
      return {
        success: false,
        error: 'Screen generation cancelled by user',
      };
    }

    // Create screen directory structure
    const screenDir = path.join(options.outputDir, 'src', 'screens', actualName);
    const componentsDir = path.join(screenDir, 'components');

    // Remove existing directory if overwriting
    if (isDuplicate && options.overwrite === true) {
      await fs.remove(screenDir);
    }

    await fs.ensureDir(componentsDir);

    const pagePath = path.join(screenDir, 'page.tsx');
    const layoutPath = path.join(screenDir, 'layout.tsx');
    const componentsIndexPath = path.join(componentsDir, 'index.ts');

    try {
      // Generate file contents
      const pageContent = generatePageTemplate({ ...options, name: actualName });
      const layoutContent = generateLayoutTemplate(options);
      const componentsIndexContent = generateComponentsIndex(options.components);

      // Write files
      await fs.writeFile(pagePath, pageContent, 'utf-8');
      await fs.writeFile(layoutPath, layoutContent, 'utf-8');
      await fs.writeFile(componentsIndexPath, componentsIndexContent, 'utf-8');

      return {
        success: true,
        message: `Screen "${actualName}" generated successfully`,
        files: {
          page: pagePath,
          layout: layoutPath,
          components: componentsIndexPath,
        },
      };
    } catch (error) {
      // Rollback on error
      await fs.remove(screenDir);
      throw error;
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Screen generation failed',
    };
  }
}
