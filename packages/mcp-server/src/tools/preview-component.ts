/**
 * Preview Component MCP Tool (SPEC-MCP-003)
 * [TAG-MCP003-007] Preview component with detailed information
 *
 * Returns detailed component information including:
 * - Props and variants
 * - Sub-components
 * - Import statements
 * - Dependencies
 * - Usage examples
 */

import { getComponentById, getAllComponents } from '../data/component-registry.js';
import { getComponentPropsData } from '../data/component-props.js';
import type { PreviewComponentInput, PreviewComponentOutput } from '../schemas/mcp-schemas.js';
import { extractErrorMessage } from '../utils/error-handler.js';

/**
 * Preview a component with detailed information
 * [TAG-MCP003-012] Component not found error handling
 */
export async function previewComponentTool(
  input: PreviewComponentInput
): Promise<PreviewComponentOutput> {
  try {
    // Set default values for optional parameters
    const includeExamples = input.includeExamples ?? true;
    const includeDependencies = input.includeDependencies ?? true;

    const componentMeta = getComponentById(input.componentId);

    if (!componentMeta) {
      // [TAG-MCP003-012] Return error with available components
      const availableComponents = getAllComponents().map(c => c.id);
      return {
        success: false,
        error: `Component not found: ${input.componentId}. Available components: ${availableComponents.join(', ')}`,
      };
    }

    const details = getComponentPropsData(input.componentId);

    // Build component preview
    const component = {
      id: componentMeta.id,
      name: componentMeta.name,
      category: componentMeta.category,
      description: componentMeta.description,
      tier: componentMeta.tier,
      props: details?.props || [],
      variants: includeExamples && details?.variants ? details.variants : undefined,
      subComponents: details?.subComponents,
      importStatement: details?.subComponents
        ? `import { ${componentMeta.name}, ${details.subComponents.join(', ')} } from '@framingui/ui';`
        : `import { ${componentMeta.name} } from '@framingui/ui';`,
      dependencies: includeDependencies ? details?.dependencies : undefined,
      examples: includeExamples && details?.examples ? details.examples : undefined,
      accessibility: details?.accessibility,
    };

    return {
      success: true,
      component,
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
