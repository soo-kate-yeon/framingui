/**
 * Get Screen Generation Context MCP Tool
 * SPEC-MCP-004 Phase 3.5: Provides complete context for AI agents to generate screen definitions
 */

import { loadTheme } from '@tekton/core';
import { templateRegistry } from '@tekton/ui';
import type {
  GetScreenGenerationContextInput,
  GetScreenGenerationContextOutput,
  ContextTemplateMatch,
  ContextComponentInfo,
  ThemeRecipeInfo,
  ScreenExample,
} from '../schemas/mcp-schemas.js';
import { matchTemplates } from '../data/template-matcher.js';
import { getAllRecipes } from '../data/recipe-resolver.js';
import { getMatchingExamples } from '../data/examples/screen-examples.js';
import { generateHints } from '../data/hint-generator.js';
import { extractErrorMessage } from '../utils/error-handler.js';
import { getComponentById } from '../data/component-registry.js';

/**
 * Screen Definition JSON Schema for reference
 */
const SCREEN_DEFINITION_SCHEMA = {
  type: 'object',
  required: ['id', 'shell', 'page', 'sections'],
  properties: {
    id: {
      type: 'string',
      pattern: '^[a-z0-9-]+$',
      description: 'Unique screen identifier (lowercase alphanumeric with hyphens)',
    },
    name: {
      type: 'string',
      description: 'Human-readable screen name',
    },
    description: {
      type: 'string',
      description: 'Screen description for documentation',
    },
    shell: {
      type: 'string',
      pattern: '^shell\\.[a-z]+\\.[a-z-]+$',
      description: 'Shell token (e.g., shell.web.dashboard, shell.web.auth)',
    },
    page: {
      type: 'string',
      pattern: '^page\\.[a-z-]+$',
      description: 'Page token (e.g., page.dashboard, page.wizard)',
    },
    themeId: {
      type: 'string',
      pattern: '^[a-z0-9-]+$',
      description: 'Theme ID for styling (optional)',
    },
    sections: {
      type: 'array',
      items: {
        type: 'object',
        required: ['id', 'pattern', 'components'],
        properties: {
          id: {
            type: 'string',
            description: 'Section identifier',
          },
          pattern: {
            type: 'string',
            pattern: '^section\\.[a-z0-9-]+$',
            description: 'Section pattern (e.g., section.container, section.grid-4)',
          },
          slot: {
            type: 'string',
            enum: ['header', 'main', 'sidebar', 'footer'],
            description: 'Layout slot to place this section',
          },
          components: {
            type: 'array',
            items: {
              type: 'object',
              required: ['type'],
              properties: {
                type: {
                  type: 'string',
                  description: 'Component type from component catalog',
                },
                props: {
                  type: 'object',
                  description: 'Component props',
                },
                children: {
                  oneOf: [
                    { type: 'string' },
                    { type: 'array' },
                  ],
                  description: 'Child content or nested components',
                },
              },
            },
          },
        },
      },
    },
    metadata: {
      type: 'object',
      properties: {
        version: { type: 'string' },
        author: { type: 'string' },
        created: { type: 'string' },
        updated: { type: 'string' },
      },
    },
  },
};

/**
 * Get component info from local registry
 */
function getComponentInfo(componentIds: string[]): ContextComponentInfo[] {
  const components: ContextComponentInfo[] = [];

  for (const id of componentIds) {
    const component = getComponentById(id.toLowerCase());
    if (component) {
      components.push({
        id: component.id,
        name: component.name,
        category: component.category as 'core' | 'complex' | 'advanced',
        description: component.description,
        importStatement: `import { ${component.name} } from '@tekton/ui';`,
        props: [], // Props are detailed in preview-component tool
        variants: undefined, // Variants are detailed in preview-component tool
      });
    }
  }

  return components;
}

/**
 * Extract component types from template skeleton
 */
function extractComponentTypes(template: any): string[] {
  const types = new Set<string>();

  // Add required components from template
  if (template.requiredComponents) {
    for (const comp of template.requiredComponents) {
      types.add(comp.toLowerCase());
    }
  }

  // Add common components based on category
  const categoryComponents: Record<string, string[]> = {
    auth: ['card', 'input', 'button', 'text', 'heading', 'link'],
    dashboard: ['card', 'heading', 'text', 'badge', 'avatar', 'table'],
    form: ['form', 'input', 'button', 'text', 'heading', 'select'],
    feedback: ['card', 'text', 'heading', 'button', 'icon'],
    marketing: ['heading', 'text', 'button', 'image', 'card'],
  };

  const category = template.category;
  if (category && categoryComponents[category]) {
    for (const comp of categoryComponents[category]) {
      types.add(comp);
    }
  }

  return Array.from(types);
}

/**
 * Get theme recipe info
 */
function getThemeRecipeInfo(themeId: string): ThemeRecipeInfo[] {
  const recipes: ThemeRecipeInfo[] = [];

  try {
    const allRecipes = getAllRecipes(themeId);

    // Group recipes by component type
    const grouped: Record<string, { variants: string[]; defaultClassName?: string }> = {};

    for (const [path, className] of Object.entries(allRecipes)) {
      // Parse path: recipes.card.glass -> card, glass
      const parts = path.replace('recipes.', '').split('.');
      if (parts.length >= 1) {
        const componentType = parts[0] || 'unknown';
        const variant = parts[1] || 'default';

        if (!grouped[componentType]) {
          grouped[componentType] = { variants: [] };
        }

        if (variant === 'default' || variant === 'base') {
          grouped[componentType].defaultClassName = className;
        } else {
          grouped[componentType].variants.push(variant);
        }
      }
    }

    // Convert to array
    for (const [componentType, data] of Object.entries(grouped)) {
      recipes.push({
        componentType,
        variants: data.variants,
        defaultClassName: data.defaultClassName,
      });
    }
  } catch {
    // Theme not found or no recipes
  }

  return recipes;
}

/**
 * Get Screen Generation Context tool implementation
 * Provides complete context for coding agents to generate screen definitions
 */
export async function getScreenGenerationContextTool(
  input: GetScreenGenerationContextInput
): Promise<GetScreenGenerationContextOutput> {
  try {
    // 1. Match templates based on description
    const templateMatches = matchTemplates(input.description, 3);
    let bestMatch: ContextTemplateMatch | undefined;
    let componentTypes: string[] = [];

    if (templateMatches.length > 0) {
      const match = templateMatches[0];
      if (match) {
        const templateData = templateRegistry.get(match.templateId);

        bestMatch = {
          templateId: match.templateId,
          templateName: match.templateName,
          category: match.category,
          confidence: match.confidence,
          matchedKeywords: match.matchedKeywords,
          skeleton: templateData?.skeleton,
          requiredComponents: templateData?.requiredComponents,
        };

        // Extract component types from template
        if (templateData) {
          componentTypes = extractComponentTypes(templateData);
        }
      }
    }

    // 2. Get component information
    // Add common components if no specific match
    if (componentTypes.length === 0) {
      componentTypes = ['card', 'heading', 'text', 'button'];
    }
    const components = getComponentInfo(componentTypes);

    // 3. Get examples if requested
    let examples: ScreenExample[] | undefined;
    if (input.includeExamples !== false) {
      examples = getMatchingExamples(input.description, 2);
    }

    // 4. Get theme recipes if theme specified
    let themeRecipes: ThemeRecipeInfo[] | undefined;
    if (input.themeId) {
      const theme = loadTheme(input.themeId);
      if (theme) {
        themeRecipes = getThemeRecipeInfo(input.themeId);
      }
    }

    // 5. Generate contextual hints
    const hints = generateHints(input.description, input.themeId);

    return {
      success: true,
      templateMatch: bestMatch,
      components: components.length > 0 ? components : undefined,
      schema: {
        screenDefinition: SCREEN_DEFINITION_SCHEMA,
        description: 'JSON Schema for Screen Definition - use this structure to create valid screen definitions',
      },
      examples: examples && examples.length > 0 ? examples : undefined,
      themeRecipes: themeRecipes && themeRecipes.length > 0 ? themeRecipes : undefined,
      hints: hints.length > 0 ? hints : undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
