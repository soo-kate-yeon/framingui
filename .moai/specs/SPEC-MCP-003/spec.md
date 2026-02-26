---
id: SPEC-MCP-003
version: "1.0.0"
status: planned
created: "2026-02-01"
updated: "2026-02-01"
author: soo-kate-yeon
priority: high
lifecycle: spec-anchored
dependencies:
  - SPEC-UI-001
  - SPEC-UI-002
  - SPEC-MCP-002
---

## HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-02-01 | soo-kate-yeon | Initial draft |

---

# SPEC-MCP-003: Component & Template Discovery MCP Tools

## 0. Executive Summary

### Purpose

Extend the tekton-mcp-server with 4 new MCP tools for component and template discovery, enabling AI agents to efficiently discover, preview, and utilize UI components and screen templates from the @framingui library.

### Scope

- Add 4 new MCP tools to the existing tekton-mcp-server (packages/mcp-server/)
- Integrate with existing 30+ components and 13 templates from @framingui
- Maintain compatibility with existing 9 MCP tools
- Follow established MCP patterns from SPEC-MCP-002

### Key Deliverables

| Deliverable | Description |
|-------------|-------------|
| list-components tool | List all UI components with categories and variants |
| preview-component tool | Get detailed component information with props and examples |
| list-screen-templates tool | List all 13 screen templates with categories |
| preview-screen-template tool | Get detailed template information with skeleton and slots |
| Zod Schemas | Input/Output validation schemas for all 4 tools |
| Test Suite | Unit tests with 85% coverage target |

### Dependencies

| Dependency | Status | Description |
|------------|--------|-------------|
| SPEC-UI-001 | Completed | shadcn-ui Fork & Token Integration |
| SPEC-UI-002 | Completed | P0 Screen Templates (13 Screens) |
| SPEC-MCP-002 | Completed | MCP Server with 9 tools |

---

## 1. Environment

```
Current System:
  - tekton-mcp-server: v2.0.0 with 9 registered tools
  - @framingui: 30+ components, 13 templates
  - @tekton/core: Theme loading, token management
  - Template Registry: Singleton pattern for template management

Technology Stack:
  - Node.js 20+
  - TypeScript 5.7+ (strict mode)
  - @modelcontextprotocol/sdk: ^1.25.3
  - Zod: ^3.23.8
  - Vitest for testing

Existing MCP Tools (9 tools - KEEP ALL):
  1. generate-blueprint
  2. list-themes
  3. preview-theme
  4. list-icon-libraries
  5. preview-icon-library
  6. export-screen
  7. generate_screen
  8. validate_screen
  9. list_tokens
```

---

## 2. Assumptions

| ID | Assumption | Rationale | Validation |
|----|------------|-----------|------------|
| A-001 | Component metadata can be extracted from TypeScript exports | Index.ts exports all components with types | Code analysis |
| A-002 | Template Registry is accessible at runtime | Singleton pattern ensures availability | Unit test |
| A-003 | AI agents benefit from structured component discovery | Improves code generation accuracy | User testing |
| A-004 | Existing MCP patterns from SPEC-MCP-002 are sufficient | Consistent API design | Code review |
| A-005 | Component prop types can be serialized to JSON | TypeScript type extraction | Type analysis |

---

## 3. Requirements

### 3.1 Ubiquitous Requirements (Always Active)

| ID | Requirement | TAG |
|----|-------------|-----|
| U-001 | The system shall **always** follow MCP Protocol JSON-RPC 2.0 format | [TAG-MCP003-001] |
| U-002 | The system shall **always** validate input using Zod schemas | [TAG-MCP003-002] |
| U-003 | The system shall **always** return consistent response structure with success/error fields | [TAG-MCP003-003] |
| U-004 | The system shall **always** use TypeScript strict mode | [TAG-MCP003-004] |
| U-005 | The system shall **always** maintain backward compatibility with existing 9 tools | [TAG-MCP003-005] |

### 3.2 Event-Driven Requirements (Trigger-Response)

| ID | Requirement | TAG |
|----|-------------|-----|
| E-001 | **WHEN** list-components is called **THEN** return all components from @framingui with metadata | [TAG-MCP003-006] |
| E-002 | **WHEN** preview-component is called with valid componentId **THEN** return component details including props, variants, and usage | [TAG-MCP003-007] |
| E-003 | **WHEN** list-screen-templates is called **THEN** return all templates from Template Registry | [TAG-MCP003-008] |
| E-004 | **WHEN** preview-screen-template is called with valid templateId **THEN** return template skeleton, slots, and customization boundaries | [TAG-MCP003-009] |
| E-005 | **WHEN** any tool receives invalid input **THEN** return descriptive error with available options | [TAG-MCP003-010] |

### 3.3 State-Driven Requirements (Conditional)

| ID | Requirement | TAG |
|----|-------------|-----|
| S-001 | **IF** category filter is provided **THEN** filter components by the specified category | [TAG-MCP003-011] |
| S-002 | **IF** componentId does not exist **THEN** return error with list of available components | [TAG-MCP003-012] |
| S-003 | **IF** templateId does not exist **THEN** return error with list of available templates | [TAG-MCP003-013] |
| S-004 | **IF** includeExamples is true **THEN** include usage examples in preview response | [TAG-MCP003-014] |
| S-005 | **IF** includeDependencies is true **THEN** include required dependencies in preview response | [TAG-MCP003-015] |

### 3.4 Unwanted Behavior (Prohibited)

| ID | Requirement | TAG |
|----|-------------|-----|
| UW-001 | The system shall **NOT** expose internal implementation details in responses | [TAG-MCP003-016] |
| UW-002 | The system shall **NOT** allow arbitrary code execution through tool parameters | [TAG-MCP003-017] |
| UW-003 | The system shall **NOT** break existing tool functionality | [TAG-MCP003-018] |
| UW-004 | The system shall **NOT** return undefined or null without proper error handling | [TAG-MCP003-019] |

### 3.5 Optional Requirements (Nice-to-have)

| ID | Requirement | TAG |
|----|-------------|-----|
| O-001 | **Where possible**, include component preview images or icons | [TAG-MCP003-020] |
| O-002 | **Where possible**, provide related component suggestions | [TAG-MCP003-021] |
| O-003 | **Where possible**, include template variant options | [TAG-MCP003-022] |

---

## 4. Technical Specifications

### 4.1 list-components Tool

```typescript
// packages/mcp-server/src/tools/list-components.ts

/**
 * List all available UI components from @framingui
 * [TAG-MCP003-006]
 */

// Input Schema
export const ListComponentsInputSchema = z.object({
  category: z.enum(['core', 'complex', 'advanced', 'all']).optional().default('all'),
  search: z.string().optional(),
});

// Output Schema
export const ComponentMetaSchema = z.object({
  id: z.string(),           // e.g., 'button', 'card', 'dialog'
  name: z.string(),         // e.g., 'Button', 'Card', 'Dialog'
  category: z.enum(['core', 'complex', 'advanced']),
  description: z.string(),
  variantsCount: z.number(),
  hasSubComponents: z.boolean(),
  tier: z.number(),         // 1, 2, or 3
});

export const ListComponentsOutputSchema = z.object({
  success: z.boolean(),
  components: z.array(ComponentMetaSchema).optional(),
  count: z.number().optional(),
  categories: z.object({
    core: z.number(),
    complex: z.number(),
    advanced: z.number(),
  }).optional(),
  error: z.string().optional(),
});
```

**Component Categories:**

| Category | Tier | Components (30+) |
|----------|------|------------------|
| core | 1 | Button, Input, Label, Card, Badge, Avatar, Separator, Checkbox, RadioGroup, Switch, Textarea, Skeleton, ScrollArea, Form, Select |
| complex | 2 | Dialog, DropdownMenu, Table, Tabs, Toast, Tooltip, Popover, Sheet, AlertDialog, Progress |
| advanced | 3 | Sidebar, NavigationMenu, Breadcrumb, Command, Calendar |

### 4.2 preview-component Tool

```typescript
// packages/mcp-server/src/tools/preview-component.ts

/**
 * Preview a component with detailed information
 * [TAG-MCP003-007]
 */

// Input Schema
export const PreviewComponentInputSchema = z.object({
  componentId: z.string().regex(/^[a-z-]+$/, 'Component ID must be lowercase with hyphens'),
  includeExamples: z.boolean().optional().default(true),
  includeDependencies: z.boolean().optional().default(true),
});

// Prop Definition Schema
export const PropDefinitionSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean(),
  defaultValue: z.string().optional(),
  description: z.string().optional(),
});

// Variant Schema
export const VariantSchema = z.object({
  name: z.string(),
  value: z.string(),
  description: z.string().optional(),
});

// Usage Example Schema
export const UsageExampleSchema = z.object({
  title: z.string(),
  code: z.string(),
  description: z.string().optional(),
});

// Output Schema
export const PreviewComponentOutputSchema = z.object({
  success: z.boolean(),
  component: z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['core', 'complex', 'advanced']),
    description: z.string(),
    tier: z.number(),

    // Props Interface
    props: z.array(PropDefinitionSchema),

    // Variants
    variants: z.array(VariantSchema).optional(),

    // Sub-components (e.g., CardHeader, CardContent for Card)
    subComponents: z.array(z.string()).optional(),

    // Import statement
    importStatement: z.string(),

    // Dependencies
    dependencies: z.object({
      internal: z.array(z.string()),  // Other @framingui components
      external: z.array(z.string()),  // External packages (radix, etc.)
    }).optional(),

    // Usage examples
    examples: z.array(UsageExampleSchema).optional(),

    // Accessibility notes
    accessibility: z.string().optional(),
  }).optional(),
  error: z.string().optional(),
});
```

### 4.3 list-screen-templates Tool

```typescript
// packages/mcp-server/src/tools/list-screen-templates.ts

/**
 * List all available screen templates from Template Registry
 * [TAG-MCP003-008]
 */

// Input Schema
export const ListScreenTemplatesInputSchema = z.object({
  category: z.enum(['auth', 'dashboard', 'form', 'marketing', 'feedback', 'all']).optional().default('all'),
  search: z.string().optional(),
});

// Template Meta Schema
export const TemplateMetaSchema = z.object({
  id: z.string(),           // e.g., 'auth.login', 'feedback.loading'
  name: z.string(),         // e.g., 'Login', 'Loading'
  category: z.enum(['auth', 'dashboard', 'form', 'marketing', 'feedback']),
  description: z.string(),
  requiredComponentsCount: z.number(),
  layoutType: z.enum(['centered', 'sidebar', 'full']),
  version: z.string(),
  tags: z.array(z.string()).optional(),
});

// Output Schema
export const ListScreenTemplatesOutputSchema = z.object({
  success: z.boolean(),
  templates: z.array(TemplateMetaSchema).optional(),
  count: z.number().optional(),
  categories: z.object({
    auth: z.number(),
    dashboard: z.number(),
    form: z.number(),
    marketing: z.number(),
    feedback: z.number(),
  }).optional(),
  error: z.string().optional(),
});
```

**Available Templates (13):**

| Category | Templates |
|----------|-----------|
| auth | login, signup, forgot-password, verification |
| core | landing, preferences, profile |
| feedback | loading, error, empty, confirmation, success |
| dashboard | overview |

### 4.4 preview-screen-template Tool

```typescript
// packages/mcp-server/src/tools/preview-screen-template.ts

/**
 * Preview a screen template with detailed structure
 * [TAG-MCP003-009]
 */

// Input Schema
export const PreviewScreenTemplateInputSchema = z.object({
  templateId: z.string().regex(/^[a-z]+\.[a-z-]+$/, 'Template ID must be in format category.name'),
  includeLayoutTokens: z.boolean().optional().default(true),
});

// Skeleton Schema
export const SkeletonSchema = z.object({
  shell: z.string(),        // e.g., 'centered-card', 'sidebar-layout'
  page: z.string(),         // e.g., 'auth-page', 'dashboard-page'
  sections: z.array(z.object({
    id: z.string(),
    name: z.string(),
    slot: z.string(),
    required: z.boolean(),
  })),
});

// Customization Schema
export const CustomizationSchema = z.object({
  texts: z.array(z.string()),       // ['title', 'subtitle', 'button_label']
  optional: z.array(z.string()),    // ['social_login', 'remember_me']
  slots: z.array(z.string()),       // ['logo', 'footer', 'socialLogin']
});

// Responsive Layout Schema
export const ResponsiveLayoutSchema = z.object({
  mobile: z.object({
    padding: z.string(),
    gap: z.string(),
    columns: z.number(),
  }),
  tablet: z.object({
    padding: z.string(),
    gap: z.string(),
    columns: z.number(),
  }),
  desktop: z.object({
    padding: z.string(),
    gap: z.string(),
    columns: z.number(),
  }),
});

// Output Schema
export const PreviewScreenTemplateOutputSchema = z.object({
  success: z.boolean(),
  template: z.object({
    id: z.string(),
    name: z.string(),
    category: z.enum(['auth', 'dashboard', 'form', 'marketing', 'feedback']),
    description: z.string(),
    version: z.string(),

    // Skeleton structure (non-customizable)
    skeleton: SkeletonSchema,

    // Layout configuration
    layout: z.object({
      type: z.enum(['centered', 'sidebar', 'full']),
      responsive: ResponsiveLayoutSchema.optional(),
    }),

    // Customization boundaries (what AI can modify)
    customizable: CustomizationSchema,

    // Required components for this template
    requiredComponents: z.array(z.string()),

    // Import statement
    importStatement: z.string(),

    // Example props
    exampleProps: z.object({
      texts: z.record(z.string()).optional(),
      options: z.record(z.boolean()).optional(),
      slots: z.array(z.string()).optional(),
    }).optional(),

    // Metadata
    created: z.string(),
    updated: z.string(),
    tags: z.array(z.string()).optional(),
  }).optional(),
  error: z.string().optional(),
});
```

---

## 5. File Structure

```
packages/mcp-server/
├── src/
│   ├── index.ts                    # Update: Add 4 new tools to registration
│   ├── schemas/
│   │   └── mcp-schemas.ts          # Update: Add new schemas
│   ├── tools/
│   │   ├── list-components.ts      # [TAG-MCP003-006] NEW
│   │   ├── preview-component.ts    # [TAG-MCP003-007] NEW
│   │   ├── list-screen-templates.ts # [TAG-MCP003-008] NEW
│   │   └── preview-screen-template.ts # [TAG-MCP003-009] NEW
│   └── data/
│       ├── component-registry.ts   # NEW: Component metadata registry
│       └── component-metadata.json # NEW: Static component metadata
└── __tests__/
    ├── list-components.test.ts     # NEW
    ├── preview-component.test.ts   # NEW
    ├── list-screen-templates.test.ts # NEW
    └── preview-screen-template.test.ts # NEW
```

---

## 6. Integration Points

### 6.1 Template Registry Integration

```typescript
// Use existing templateRegistry from @framingui
import { templateRegistry } from '@framingui';

// list-screen-templates implementation
export async function listScreenTemplatesTool(input: ListScreenTemplatesInput) {
  const templates = input.category === 'all'
    ? templateRegistry.getAll()
    : templateRegistry.getByCategory(input.category as ScreenCategory);

  return {
    success: true,
    templates: templates.map(t => ({
      id: t.id,
      name: t.name,
      category: t.category,
      description: t.description,
      requiredComponentsCount: t.requiredComponents.length,
      layoutType: t.layout.type,
      version: t.version,
      tags: t.tags,
    })),
    count: templates.length,
  };
}
```

### 6.2 Component Metadata Source

```typescript
// Static component metadata (generated from @framingui exports)
export const COMPONENT_METADATA: ComponentMeta[] = [
  // Tier 1: Core Components (15)
  { id: 'button', name: 'Button', category: 'core', tier: 1, description: 'Interactive button with variants', variantsCount: 6, hasSubComponents: false },
  { id: 'input', name: 'Input', category: 'core', tier: 1, description: 'Text input field', variantsCount: 1, hasSubComponents: false },
  { id: 'card', name: 'Card', category: 'core', tier: 1, description: 'Container card with sections', variantsCount: 1, hasSubComponents: true },
  // ... all 30+ components

  // Tier 2: Complex Components (10)
  { id: 'dialog', name: 'Dialog', category: 'complex', tier: 2, description: 'Modal dialog component', variantsCount: 1, hasSubComponents: true },

  // Tier 3: Advanced Components (5)
  { id: 'sidebar', name: 'Sidebar', category: 'advanced', tier: 3, description: 'Collapsible sidebar navigation', variantsCount: 2, hasSubComponents: true },
];
```

---

## 7. Quality Criteria

| Item | Criterion | Measurement |
|------|-----------|-------------|
| TypeScript Compilation | 0 errors | `tsc --noEmit` |
| Lint | 0 warnings | `eslint src` |
| Test Coverage | >= 85% | `vitest --coverage` |
| MCP Protocol | JSON-RPC 2.0 compliant | Protocol validation |
| Response Time | < 100ms | Performance test |
| Tool Registration | 13 tools total (9 + 4) | Manual verification |

---

## 8. TAG Summary

| TAG ID | Requirement Summary |
|--------|---------------------|
| [TAG-MCP003-001] | MCP Protocol JSON-RPC 2.0 format |
| [TAG-MCP003-002] | Zod input validation |
| [TAG-MCP003-003] | Consistent response structure |
| [TAG-MCP003-004] | TypeScript strict mode |
| [TAG-MCP003-005] | Backward compatibility with existing tools |
| [TAG-MCP003-006] | list-components tool implementation |
| [TAG-MCP003-007] | preview-component tool implementation |
| [TAG-MCP003-008] | list-screen-templates tool implementation |
| [TAG-MCP003-009] | preview-screen-template tool implementation |
| [TAG-MCP003-010] | Error handling with available options |
| [TAG-MCP003-011~015] | State-driven filtering and options |
| [TAG-MCP003-016~019] | Unwanted behavior prevention |
| [TAG-MCP003-020~022] | Optional enhancements |

---

## 9. References

- [SPEC-MCP-002](../SPEC-MCP-002/spec.md) - MCP Server Implementation
- [SPEC-UI-001](../SPEC-UI-001/spec.md) - shadcn-ui Fork & Token Integration
- [SPEC-UI-002](../SPEC-UI-002/spec.md) - P0 Screen Templates
- [MCP Protocol Specification](https://spec.modelcontextprotocol.io/)
- [@modelcontextprotocol/sdk](https://github.com/modelcontextprotocol/typescript-sdk)

---

**Next Steps:** See [plan.md](./plan.md) for implementation milestones
