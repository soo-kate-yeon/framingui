#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { ListToolsRequestSchema, CallToolRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { info, error as logError } from './utils/logger.js';
import { generateBlueprintTool } from './tools/generate-blueprint.js';
import { previewThemeTool } from './tools/preview-theme.js';
import { listThemesTool } from './tools/list-themes.js';
import { exportScreenTool } from './tools/export-screen.js';
import { generateScreenTool } from './tools/generate-screen.js';
import { validateScreenTool } from './tools/validate-screen.js';
import { listTokensTool } from './tools/list-tokens.js';
import { listIconLibrariesTool } from './tools/list-icon-libraries.js';
import { previewIconLibraryTool } from './tools/preview-icon-library.js';
import { listComponentsTool } from './tools/list-components.js';
import { previewComponentTool } from './tools/preview-component.js';
import { listScreenTemplatesTool } from './tools/list-screen-templates.js';
import { previewScreenTemplateTool } from './tools/preview-screen-template.js';
import { getScreenGenerationContextTool } from './tools/get-screen-generation-context.js';
import { validateScreenDefinitionTool } from './tools/validate-screen-definition.js';
import {
  GenerateBlueprintInputSchema,
  PreviewThemeInputSchema,
  ListThemesInputSchema,
  ExportScreenInputSchema,
  GenerateScreenInputSchema,
  ValidateScreenInputSchema,
  ListTokensInputSchema,
  ListIconLibrariesInputSchema,
  PreviewIconLibraryInputSchema,
  ListComponentsInputSchema,
  PreviewComponentInputSchema,
  ListScreenTemplatesInputSchema,
  PreviewScreenTemplateInputSchema,
  GetScreenGenerationContextInputSchema,
  ValidateScreenDefinitionInputSchema,
} from './schemas/mcp-schemas.js';

const server = new Server(
  {
    name: '@tekton/mcp-server',
    version: '2.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// ============================================================================
// Task #9: ListToolsRequestSchema Handler
// ============================================================================

server.setRequestHandler(ListToolsRequestSchema, async () => {
  info('ListTools request received');

  return {
    tools: [
      {
        name: 'generate-blueprint',
        description:
          '[RECOMMENDED WORKFLOW] Step 1: Use get-screen-generation-context first to get component lists, schema, and examples. Then use validate-screen-definition before calling this tool. This tool generates a UI blueprint from natural language description.',
        inputSchema: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description: 'Natural language description of the screen (10-500 characters)',
              minLength: 10,
              maxLength: 500,
            },
            layout: {
              type: 'string',
              description: 'Layout type for the screen',
              enum: [
                'single-column',
                'two-column',
                'sidebar-left',
                'sidebar-right',
                'dashboard',
                'landing',
              ],
            },
            themeId: {
              type: 'string',
              description: 'Theme ID (lowercase alphanumeric with hyphens)',
              pattern: '^[a-z0-9-]+$',
            },
            componentHints: {
              type: 'array',
              description: 'Optional component type hints',
              items: { type: 'string' },
            },
            iconLibrary: {
              type: 'string',
              description: 'Icon library ID (e.g., lucide, heroicons, feather)',
              pattern: '^[a-z0-9-]+$',
            },
          },
          required: ['description', 'layout', 'themeId'],
        },
      },
      {
        name: 'list-icon-libraries',
        description: 'List all available icon libraries from .moai/icon-libraries/generated/',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'preview-icon-library',
        description:
          'Preview an icon library and retrieve its configuration including package names and icon samples',
        inputSchema: {
          type: 'object',
          properties: {
            libraryId: {
              type: 'string',
              description: 'Icon library ID to preview (e.g., lucide, heroicons, feather)',
              pattern: '^[a-z0-9-]+$',
            },
          },
          required: ['libraryId'],
        },
      },
      {
        name: 'list-themes',
        description: 'List all available themes from .moai/themes/generated/',
        inputSchema: {
          type: 'object',
          properties: {},
          required: [],
        },
      },
      {
        name: 'preview-theme',
        description: 'Preview a theme and retrieve its full v2.1 theme data including tokens',
        inputSchema: {
          type: 'object',
          properties: {
            themeId: {
              type: 'string',
              description: 'Theme ID to preview (lowercase alphanumeric with hyphens)',
              pattern: '^[a-z0-9-]+$',
            },
          },
          required: ['themeId'],
        },
      },
      {
        name: 'export-screen',
        description: 'Export a blueprint to JSX, TSX, or Vue code',
        inputSchema: {
          type: 'object',
          properties: {
            blueprint: {
              type: 'object',
              description: 'Blueprint object to export',
            },
            format: {
              type: 'string',
              description: 'Export format',
              enum: ['jsx', 'tsx', 'vue'],
            },
          },
          required: ['blueprint', 'format'],
        },
      },
      {
        name: 'generate_screen',
        description:
          '[RECOMMENDED WORKFLOW] Step 3 of 3: Before calling this, use get-screen-generation-context (Step 1) and validate-screen-definition (Step 2) to ensure your screen definition is valid. This tool generates production-ready code from JSON screen definition.',
        inputSchema: {
          type: 'object',
          properties: {
            screenDefinition: {
              type: 'object',
              description: 'JSON screen definition with id, shell, page, sections',
            },
            outputFormat: {
              type: 'string',
              description: 'Code output format',
              enum: ['css-in-js', 'tailwind', 'react'],
            },
            options: {
              type: 'object',
              description: 'Optional generation options',
              properties: {
                cssFramework: {
                  type: 'string',
                  enum: ['styled-components', 'emotion'],
                },
                typescript: { type: 'boolean' },
                prettier: { type: 'boolean' },
              },
            },
          },
          required: ['screenDefinition', 'outputFormat'],
        },
      },
      {
        name: 'validate_screen',
        description: 'Validate JSON screen definition with helpful feedback',
        inputSchema: {
          type: 'object',
          properties: {
            screenDefinition: {
              type: 'object',
              description: 'JSON screen definition to validate',
            },
            strictMode: {
              type: 'boolean',
              description: 'Enable strict validation (default: false)',
            },
          },
          required: ['screenDefinition'],
        },
      },
      {
        name: 'list_tokens',
        description: 'List available layout tokens from SPEC-LAYOUT-001',
        inputSchema: {
          type: 'object',
          properties: {
            tokenType: {
              type: 'string',
              description: 'Filter by token type',
              enum: ['shell', 'page', 'section', 'all'],
            },
            filter: {
              type: 'string',
              description: 'Optional pattern filter (case-insensitive substring match)',
            },
          },
        },
      },
      {
        name: 'list-components',
        description: 'List all available UI components from @tekton/ui with metadata',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by component category',
              enum: ['core', 'complex', 'advanced', 'all'],
            },
            search: {
              type: 'string',
              description: 'Search components by keyword',
            },
          },
        },
      },
      {
        name: 'preview-component',
        description: 'Preview a component with detailed props, variants, and usage examples',
        inputSchema: {
          type: 'object',
          properties: {
            componentId: {
              type: 'string',
              description: 'Component ID to preview (e.g., button, card, dialog)',
              pattern: '^[a-z-]+$',
            },
            includeExamples: {
              type: 'boolean',
              description: 'Include usage examples (default: true)',
            },
            includeDependencies: {
              type: 'boolean',
              description: 'Include dependency information (default: true)',
            },
          },
          required: ['componentId'],
        },
      },
      {
        name: 'list-screen-templates',
        description: 'List all available screen templates from Template Registry',
        inputSchema: {
          type: 'object',
          properties: {
            category: {
              type: 'string',
              description: 'Filter by template category',
              enum: ['auth', 'dashboard', 'form', 'marketing', 'feedback', 'all'],
            },
            search: {
              type: 'string',
              description: 'Search templates by keyword',
            },
          },
        },
      },
      {
        name: 'preview-screen-template',
        description:
          'Preview a screen template with skeleton, layout, and customization boundaries',
        inputSchema: {
          type: 'object',
          properties: {
            templateId: {
              type: 'string',
              description: 'Template ID to preview (format: category.name, e.g., auth.login)',
              pattern: '^[a-z]+\\.[a-z-]+$',
            },
            includeLayoutTokens: {
              type: 'boolean',
              description: 'Include responsive layout tokens (default: true)',
            },
          },
          required: ['templateId'],
        },
      },
      {
        name: 'get-screen-generation-context',
        description:
          '[RECOMMENDED WORKFLOW - Step 1 of 3] Use this FIRST before generating any screen. Returns template matches, component info, schema, examples, theme recipes, and hints. After getting context, proceed to Step 2: validate-screen-definition.',
        inputSchema: {
          type: 'object',
          properties: {
            description: {
              type: 'string',
              description:
                'Natural language description of the screen to generate (5-1000 characters)',
              minLength: 5,
              maxLength: 1000,
            },
            themeId: {
              type: 'string',
              description: 'Optional theme ID for recipe information',
              pattern: '^[a-z0-9-]+$',
            },
            includeExamples: {
              type: 'boolean',
              description: 'Include example screen definitions (default: true)',
            },
          },
          required: ['description'],
        },
      },
      {
        name: 'validate-screen-definition',
        description:
          '[RECOMMENDED WORKFLOW - Step 2 of 3] Use this AFTER get-screen-generation-context (Step 1) and BEFORE generate_screen (Step 3). Validates screen definition JSON with detailed error messages, suggestions, and improvement recommendations.',
        inputSchema: {
          type: 'object',
          properties: {
            definition: {
              type: 'object',
              description: 'Screen definition object to validate',
            },
            strict: {
              type: 'boolean',
              description:
                'Enable strict validation (default: true). In strict mode, unknown tokens/components are errors; otherwise they are warnings.',
            },
          },
          required: ['definition'],
        },
      },
    ],
  };
});

// ============================================================================
// Task #10: CallToolRequestSchema Handler
// ============================================================================

server.setRequestHandler(CallToolRequestSchema, async request => {
  const { name, arguments: args } = request.params;

  info(`CallTool request: ${name}`);

  try {
    switch (name) {
      case 'generate-blueprint': {
        // Validate input
        const validatedInput = GenerateBlueprintInputSchema.parse(args);
        const result = await generateBlueprintTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'list-icon-libraries': {
        // Validate input (no required fields)
        ListIconLibrariesInputSchema.parse(args);
        const result = await listIconLibrariesTool();

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'preview-icon-library': {
        // Validate input
        const validatedInput = PreviewIconLibraryInputSchema.parse(args);
        const result = await previewIconLibraryTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'list-themes': {
        // Validate input (no required fields)
        ListThemesInputSchema.parse(args);
        const result = await listThemesTool();

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'preview-theme': {
        // Validate input
        const validatedInput = PreviewThemeInputSchema.parse(args);
        const result = await previewThemeTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'export-screen': {
        // Validate input
        const validatedInput = ExportScreenInputSchema.parse(args);
        const result = await exportScreenTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'generate_screen': {
        // Validate input
        const validatedInput = GenerateScreenInputSchema.parse(args);
        const result = await generateScreenTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'validate_screen': {
        // Validate input
        const validatedInput = ValidateScreenInputSchema.parse(args);
        const result = await validateScreenTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'list_tokens': {
        // Validate input
        const validatedInput = ListTokensInputSchema.parse(args);
        const result = await listTokensTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'list-components': {
        // Validate input
        const validatedInput = ListComponentsInputSchema.parse(args);
        const result = await listComponentsTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'preview-component': {
        // Validate input
        const validatedInput = PreviewComponentInputSchema.parse(args);
        const result = await previewComponentTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'list-screen-templates': {
        // Validate input
        const validatedInput = ListScreenTemplatesInputSchema.parse(args);
        const result = await listScreenTemplatesTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'preview-screen-template': {
        // Validate input
        const validatedInput = PreviewScreenTemplateInputSchema.parse(args);
        const result = await previewScreenTemplateTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'get-screen-generation-context': {
        // Validate input
        const validatedInput = GetScreenGenerationContextInputSchema.parse(args);
        const result = await getScreenGenerationContextTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      case 'validate-screen-definition': {
        // Validate input
        const validatedInput = ValidateScreenDefinitionInputSchema.parse(args);
        const result = await validateScreenDefinitionTool(validatedInput);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(result, null, 2),
            },
          ],
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    logError(`Tool execution error: ${error}`);

    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(
            {
              success: false,
              error: error instanceof Error ? error.message : String(error),
            },
            null,
            2
          ),
        },
      ],
      isError: true,
    };
  }
});

// ============================================================================
// Server Initialization
// ============================================================================

// Connect via stdio
const transport = new StdioServerTransport();

info('Starting Tekton MCP Server v2.1.0...');

await server.connect(transport);

info('Tekton MCP Server connected via stdio transport');
info(
  '15 MCP tools registered: generate-blueprint, list-themes, preview-theme, list-icon-libraries, preview-icon-library, export-screen, generate_screen, validate_screen, list_tokens, list-components, preview-component, list-screen-templates, preview-screen-template, get-screen-generation-context, validate-screen-definition'
);
