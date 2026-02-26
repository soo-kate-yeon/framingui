/**
 * List Components MCP Tool (SPEC-MCP-003)
 * [TAG-MCP003-006] List all available UI components
 *
 * Lists all UI components from @framingui/ui with metadata
 * including category, tier, and variant information
 */

import {
  getAllComponents,
  getComponentsByCategory,
  searchComponents,
} from '../data/component-registry.js';
import type { ListComponentsInput, ListComponentsOutput } from '../schemas/mcp-schemas.js';
import { extractErrorMessage } from '../utils/error-handler.js';

/**
 * List all available UI components
 * @param input - Filter options (category, search)
 * @returns Component metadata list with category counts
 */
export async function listComponentsTool(
  input: ListComponentsInput
): Promise<ListComponentsOutput> {
  try {
    // Get components based on filters
    let components =
      input.category === 'all' || !input.category
        ? getAllComponents()
        : getComponentsByCategory(input.category);

    // Apply search filter if provided
    if (input.search) {
      components = searchComponents(input.search).filter(c =>
        input.category === 'all' || !input.category ? true : c.category === input.category
      );
    }

    // Calculate category counts
    const allComponents = getAllComponents();
    const categories = {
      core: allComponents.filter(c => c.category === 'core').length,
      complex: allComponents.filter(c => c.category === 'complex').length,
      advanced: allComponents.filter(c => c.category === 'advanced').length,
    };

    return {
      success: true,
      components,
      count: components.length,
      categories,
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
