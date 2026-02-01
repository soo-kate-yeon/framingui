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
import type {
  PreviewComponentInput,
  PreviewComponentOutput,
  PropDefinition,
  Variant,
  UsageExample,
} from '../schemas/mcp-schemas.js';
import { extractErrorMessage } from '../utils/error-handler.js';

/**
 * Component details database
 * Maps component IDs to their full specifications
 */
const COMPONENT_DETAILS: Record<
  string,
  {
    props: PropDefinition[];
    variants?: Variant[];
    subComponents?: string[];
    dependencies: { internal: string[]; external: string[] };
    examples?: UsageExample[];
    accessibility?: string;
  }
> = {
  button: {
    props: [
      {
        name: 'variant',
        type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
        required: false,
        defaultValue: "'default'",
        description: 'Visual style variant',
      },
      {
        name: 'size',
        type: "'default' | 'sm' | 'lg' | 'icon'",
        required: false,
        defaultValue: "'default'",
        description: 'Button size',
      },
      {
        name: 'asChild',
        type: 'boolean',
        required: false,
        defaultValue: 'false',
        description: 'Render as child element',
      },
    ],
    variants: [
      { name: 'variant', value: 'default', description: 'Default blue button' },
      { name: 'variant', value: 'destructive', description: 'Red destructive action' },
      { name: 'variant', value: 'outline', description: 'Outlined button' },
      { name: 'variant', value: 'secondary', description: 'Secondary gray button' },
      { name: 'variant', value: 'ghost', description: 'Transparent ghost button' },
      { name: 'variant', value: 'link', description: 'Link-styled button' },
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-slot'],
    },
    examples: [
      {
        title: 'Basic Usage',
        code: `import { Button } from '@tekton/ui';\n\n<Button variant="default">Click me</Button>`,
        description: 'Simple button with default variant',
      },
      {
        title: 'Destructive Action',
        code: `<Button variant="destructive">Delete</Button>`,
        description: 'Button for destructive actions',
      },
    ],
    accessibility: 'Supports keyboard navigation and ARIA attributes',
  },
  card: {
    props: [
      {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    ],
    subComponents: ['CardHeader', 'CardTitle', 'CardDescription', 'CardContent', 'CardFooter'],
    dependencies: {
      internal: [],
      external: [],
    },
    examples: [
      {
        title: 'Basic Card',
        code: `import { Card, CardHeader, CardTitle, CardContent } from '@tekton/ui';\n\n<Card>\n  <CardHeader>\n    <CardTitle>Card Title</CardTitle>\n  </CardHeader>\n  <CardContent>Card content here</CardContent>\n</Card>`,
        description: 'Card with header and content',
      },
    ],
    accessibility: 'Semantic HTML structure for screen readers',
  },
  dialog: {
    props: [
      {
        name: 'open',
        type: 'boolean',
        required: false,
        description: 'Controlled open state',
      },
      {
        name: 'onOpenChange',
        type: '(open: boolean) => void',
        required: false,
        description: 'Callback when open state changes',
      },
    ],
    subComponents: [
      'DialogTrigger',
      'DialogContent',
      'DialogHeader',
      'DialogTitle',
      'DialogDescription',
      'DialogFooter',
      'DialogClose',
    ],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-dialog'],
    },
    examples: [
      {
        title: 'Basic Dialog',
        code: `import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@tekton/ui';\n\n<Dialog>\n  <DialogTrigger asChild>\n    <Button>Open</Button>\n  </DialogTrigger>\n  <DialogContent>\n    <DialogHeader>\n      <DialogTitle>Dialog Title</DialogTitle>\n    </DialogHeader>\n  </DialogContent>\n</Dialog>`,
        description: 'Modal dialog with trigger button',
      },
    ],
    accessibility: 'Focus trap, ESC to close, ARIA dialog role',
  },
};

/**
 * Preview a component with detailed information
 * [TAG-MCP003-012] Component not found error handling
 */
export async function previewComponentTool(
  input: PreviewComponentInput
): Promise<PreviewComponentOutput> {
  try {
    const componentMeta = getComponentById(input.componentId);

    if (!componentMeta) {
      // [TAG-MCP003-012] Return error with available components
      const availableComponents = getAllComponents().map(c => c.id);
      return {
        success: false,
        error: `Component not found: ${input.componentId}. Available components: ${availableComponents.join(', ')}`,
      };
    }

    const details = COMPONENT_DETAILS[input.componentId];

    // Build component preview
    const component = {
      id: componentMeta.id,
      name: componentMeta.name,
      category: componentMeta.category,
      description: componentMeta.description,
      tier: componentMeta.tier,
      props: details?.props || [],
      variants: input.includeExamples && details?.variants ? details.variants : undefined,
      subComponents: details?.subComponents,
      importStatement: details?.subComponents
        ? `import { ${componentMeta.name}, ${details.subComponents.join(', ')} } from '@tekton/ui';`
        : `import { ${componentMeta.name} } from '@tekton/ui';`,
      dependencies: input.includeDependencies ? details?.dependencies : undefined,
      examples: input.includeExamples && details?.examples ? details.examples : undefined,
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
