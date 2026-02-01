/**
 * Preview Screen Template MCP Tool (SPEC-MCP-003)
 * [TAG-MCP003-009] Preview template with detailed structure
 *
 * Returns detailed template information including:
 * - Skeleton structure (non-customizable)
 * - Layout configuration (responsive breakpoints)
 * - Customization boundaries (what AI can modify)
 * - Required components
 * - Example props
 */

import { templateRegistry } from '@tekton/ui';
import type {
  PreviewScreenTemplateInput,
  PreviewScreenTemplateOutput,
  TemplateCategory,
  TemplateLayoutType,
} from '../schemas/mcp-schemas.js';
import { extractErrorMessage } from '../utils/error-handler.js';

/**
 * Preview a screen template with detailed structure
 * [TAG-MCP003-013] Template not found error handling
 */
export async function previewScreenTemplateTool(
  input: PreviewScreenTemplateInput
): Promise<PreviewScreenTemplateOutput> {
  try {
    const template = templateRegistry.get(input.templateId);

    if (!template) {
      // [TAG-MCP003-013] Return error with available templates
      const availableTemplates = templateRegistry.getAll().map((t: any) => t.id);
      return {
        success: false,
        error: `Template not found: ${input.templateId}. Available templates: ${availableTemplates.join(', ')}`,
      };
    }

    // Build skeleton structure
    const skeleton = {
      shell: template.skeleton.shell,
      page: template.skeleton.page,
      sections: template.skeleton.sections.map((s: any) => ({
        id: s.id,
        name: s.name,
        slot: s.slot,
        required: s.required,
      })),
    };

    // Build layout configuration
    const layout = {
      type: template.layout.type as TemplateLayoutType,
      responsive:
        input.includeLayoutTokens && template.layout.responsive
          ? {
              mobile: {
                padding: template.layout.responsive.mobile.padding,
                gap: template.layout.responsive.mobile.gap,
                columns: template.layout.responsive.mobile.columns,
              },
              tablet: {
                padding: template.layout.responsive.tablet.padding,
                gap: template.layout.responsive.tablet.gap,
                columns: template.layout.responsive.tablet.columns,
              },
              desktop: {
                padding: template.layout.responsive.desktop.padding,
                gap: template.layout.responsive.desktop.gap,
                columns: template.layout.responsive.desktop.columns,
              },
            }
          : undefined,
    };

    // Build customization boundaries
    const customizable = {
      texts: template.customizable.texts,
      optional: template.customizable.optional,
      slots: template.customizable.slots,
    };

    // Build import statement
    const importStatement = `import { ${template.name}Template } from '@tekton/ui';`;

    // Build example props
    const exampleProps = template.exampleProps
      ? {
          texts: template.exampleProps.texts,
          options: template.exampleProps.options,
          slots: template.exampleProps.slots,
        }
      : undefined;

    return {
      success: true,
      template: {
        id: template.id,
        name: template.name,
        category: template.category as TemplateCategory,
        description: template.description,
        version: template.version,
        skeleton,
        layout,
        customizable,
        requiredComponents: template.requiredComponents,
        importStatement,
        exampleProps,
        created: template.created,
        updated: template.updated,
        tags: template.tags,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
