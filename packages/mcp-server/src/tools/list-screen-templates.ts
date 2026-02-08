/**
 * List Screen Templates MCP Tool (SPEC-MCP-003)
 * [TAG-MCP003-008] List all available screen templates
 *
 * Lists all screen templates from Template Registry
 * with category filtering and search capabilities
 */

/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { templateRegistry } from '@tekton-ui/ui';
import type {
  ListScreenTemplatesInput,
  ListScreenTemplatesOutput,
  TemplateCategory,
} from '../schemas/mcp-schemas.js';
import { extractErrorMessage } from '../utils/error-handler.js';

/**
 * List all available screen templates
 * @param input - Filter options (category, search)
 * @returns Template metadata list with category counts
 */
export async function listScreenTemplatesTool(
  input: ListScreenTemplatesInput
): Promise<ListScreenTemplatesOutput> {
  try {
    // Get templates based on category filter
    let templates =
      input.category === 'all' || !input.category
        ? templateRegistry.getAll()
        : templateRegistry.getByCategory(input.category as TemplateCategory);

    // Apply search filter if provided
    if (input.search) {
      templates = templateRegistry
        .search(input.search)
        .filter((t: any) =>
          input.category === 'all' || !input.category ? true : t.category === input.category
        );
    }

    // Calculate category counts
    const allTemplates = templateRegistry.getAll();
    const categories = {
      auth: allTemplates.filter((t: any) => t.category === 'auth').length,
      dashboard: allTemplates.filter((t: any) => t.category === 'dashboard').length,
      form: allTemplates.filter((t: any) => t.category === 'form').length,
      marketing: allTemplates.filter((t: any) => t.category === 'marketing').length,
      feedback: allTemplates.filter((t: any) => t.category === 'feedback').length,
    };

    // Map templates to output format
    const templateMetas = templates.map((t: any) => ({
      id: t.id,
      name: t.name,
      category: t.category as TemplateCategory,
      description: t.description,
      requiredComponentsCount: t.requiredComponents.length,
      layoutType: t.layout.type,
      version: t.version,
      tags: t.tags,
    }));

    return {
      success: true,
      templates: templateMetas,
      count: templateMetas.length,
      categories,
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
