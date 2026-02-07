# @tekton/mcp-server

Tekton MCP Server v2.0.0 - stdio-based MCP protocol implementation for Claude Code.

## Overview

MCP (Model Context Protocol) server enabling AI-driven blueprint generation, theme preview, and production code export for the Tekton design system.

**SPEC**: [SPEC-MCP-002 v2.0.0](../../.moai/specs/SPEC-MCP-002/spec.md) - stdio-based MCP Standard

## Features

- **🤖 stdio MCP Protocol**: Claude Code native tool registration via JSON-RPC 2.0 (13 tools)
- **🎨 Theme Preview**: 13 built-in OKLCH-based themes with CSS variable generation
- **📋 Blueprint Generation**: Natural language → Blueprint JSON with validation
- **💾 Data-Only Output**: No file system writes, Claude Code handles file operations
- **🚀 Production Export**: JSX, TSX, Vue code generation
- **🏗️ Screen Generation** (SPEC-LAYOUT-002): JSON screen definition → Production code
- **✅ Screen Validation**: Validate screen definitions with helpful error suggestions
- **🏷️ Layout Tokens**: List shell, page, and section tokens from SPEC-LAYOUT-001
- **🧩 Component Discovery** (SPEC-MCP-003): Browse 30+ UI components with props and examples
- **📄 Template Discovery** (SPEC-MCP-003): Explore 13 screen templates with customization boundaries
- **🔒 Secure Design**: No previewUrl/filePath exposure, input validation, path traversal protection

## Installation

```bash
pnpm install
```

## Authentication (Phase 4.1)

The MCP server supports optional API key authentication to enable access to premium themes.

### Environment Variables

```bash
# Required for premium theme access
TEKTON_API_KEY=tk_live_xxx...

# Optional: API endpoint (defaults to https://tekton-ui.com)
TEKTON_API_URL=https://tekton-ui.com  # or http://localhost:3000 for dev
```

### Theme Access Tiers

**Free Themes** (No authentication required):

- `next-tailwind-shadcn`
- `vite-tailwind-shadcn`
- `next-styled-components`
- `next-tailwind-radix`
- `saas-modern`
- `tech-startup`

**Premium Themes** (Requires valid API key and license):

- `calm-wellness` - Serene wellness applications
- `dynamic-fitness` - Energetic fitness tracking
- `korean-fintech` - Professional financial services
- `media-streaming` - Video/audio streaming platforms
- `premium-editorial` - Sophisticated content platforms
- `saas-dashboard` - Modern SaaS dashboards
- `warm-humanist` - Warm and inviting experiences

### Authentication Behavior

**Without API Key**:

- Server starts normally
- Only free themes are accessible
- Premium themes return authentication error

**With Valid API Key**:

- Server verifies key on startup (cached for 5 minutes)
- Free themes always accessible
- Licensed premium themes become accessible
- Unlicensed premium themes return license error

**With Invalid API Key**:

- Server logs error but continues running
- Falls back to free themes only
- Does not crash the server

## Quick Start

### 1. Build the Server

```bash
pnpm install
pnpm build
```

### 2. Test with MCP Inspector

```bash
pnpm inspect
# Opens browser at http://localhost:6274
```

### 3. Integrate with Claude Code

See [Claude Code Integration Guide](../../.moai/specs/SPEC-MCP-002/CLAUDE-CODE-INTEGRATION.md) for complete setup instructions.

**Quick Config** (`~/Library/Application Support/Claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "tekton": {
      "command": "node",
      "args": ["/absolute/path/to/tekton/packages/mcp-server/dist/index.js"],
      "env": {
        "NODE_ENV": "production",
        "TEKTON_API_KEY": "tk_live_your_api_key_here",
        "TEKTON_API_URL": "https://tekton-ui.com"
      }
    }
  }
}
```

**Note**: Remove `TEKTON_API_KEY` from env to run with free themes only.

## MCP Tools

### 1. Generate Blueprint

**Tool**: `generate-blueprint`

**Description**: Generate a UI blueprint from natural language description

**Input**:

```json
{
  "description": "User profile dashboard with avatar, bio, settings link",
  "layout": "sidebar-left",
  "themeId": "calm-wellness",
  "componentHints": ["Card", "Avatar", "Button"]
}
```

**Output** (Data-Only, v2.0.0):

```json
{
  "success": true,
  "blueprint": {
    "id": "bp-1738123456789-abc123",
    "name": "User profile dashboard",
    "themeId": "calm-wellness",
    "layout": "sidebar-left",
    "components": [...],
    "timestamp": 1738123456789
  }
}
```

**Note**: `previewUrl` field removed in v2.0.0 (use SPEC-PLAYGROUND-001 for visual preview)

### 2. Preview Theme

**Tool**: `preview-theme`

**Description**: Preview a Tekton theme and retrieve its design tokens

**Input**:

```json
{
  "themeId": "premium-editorial"
}
```

**Output** (Data-Only, v2.0.0):

```json
{
  "success": true,
  "theme": {
    "id": "premium-editorial",
    "name": "Premium Editorial",
    "description": "Elegant magazine-style UI",
    "cssVariables": {
      "--color-primary": "oklch(0.2 0 0)",
      "--color-secondary": "oklch(0.98 0 0)",
      "--font-family": "Georgia",
      "--border-radius": "0"
    }
  }
}
```

**Note**: `previewUrl` field removed in v2.0.0

### 3. Export Screen

**Tool**: `export-screen`

**Description**: Export a blueprint to production-ready code (TSX/JSX/Vue)

**Input** (v2.0.0: accepts blueprint object):

```json
{
  "blueprint": {
    "id": "bp-1738123456789-abc123",
    "name": "User Dashboard",
    "themeId": "calm-wellness",
    "layout": "sidebar-left",
    "components": [],
    "timestamp": 1738123456789
  },
  "format": "tsx"
}
```

**Output** (Data-Only, v2.0.0):

```json
{
  "success": true,
  "code": "import React from 'react';\n\nexport default function UserDashboard() { ... }"
}
```

**Note**: `filePath` field removed in v2.0.0. Claude Code handles file writes.

### 4. List Themes

**Tool**: `list-themes`

**Description**: List all available themes from `.moai/themes/generated/`

**Input**:

```json
{}
```

**Output**:

```json
{
  "success": true,
  "themes": [
    {
      "id": "calm-wellness",
      "name": "Calm Wellness",
      "description": "Serene wellness applications",
      "brandTone": "calm",
      "schemaVersion": "2.1"
    }
  ],
  "count": 13
}
```

## Screen Generation Tools (SPEC-LAYOUT-002 Phase 4)

### 5. Generate Screen

**Tool**: `generate_screen`

**Description**: Generate production-ready code from JSON screen definition

**Input**:

```json
{
  "screenDefinition": {
    "id": "user-dashboard",
    "shell": "shell.web.dashboard",
    "page": "page.dashboard",
    "sections": [
      {
        "id": "header",
        "token": "section.container",
        "components": [
          {
            "type": "Heading",
            "props": { "level": 1, "children": "Dashboard" }
          }
        ]
      }
    ]
  },
  "outputFormat": "react",
  "options": {
    "typescript": true,
    "cssFramework": "styled-components"
  }
}
```

**Output**:

```json
{
  "success": true,
  "code": "import React from 'react';\nimport styled from 'styled-components';\n\n...",
  "cssVariables": ":root { --shell-header-height: 64px; ... }"
}
```

**Output Formats**:

- `css-in-js`: Styled-components or Emotion
- `tailwind`: Tailwind CSS classes
- `react`: Pure React component with CSS variables

### 6. Validate Screen

**Tool**: `validate_screen`

**Description**: Validate JSON screen definition with helpful feedback

**Input**:

```json
{
  "screenDefinition": {
    "id": "test-screen",
    "shell": "shell.web.app",
    "page": "page.detail",
    "sections": []
  },
  "strictMode": false
}
```

**Output**:

```json
{
  "success": true,
  "valid": true,
  "errors": [],
  "warnings": ["Optional field 'meta' not provided"],
  "suggestions": [
    {
      "field": "shell",
      "message": "Shell token must match pattern",
      "suggestion": "Use format: shell.{platform}.{name}"
    }
  ]
}
```

### 7. List Tokens

**Tool**: `list_tokens`

**Description**: List available layout tokens from SPEC-LAYOUT-001

**Input**:

```json
{
  "tokenType": "shell",
  "filter": "dashboard"
}
```

**Output**:

```json
{
  "success": true,
  "shells": [
    {
      "id": "shell.web.dashboard",
      "name": "Web Dashboard Shell",
      "description": "Dashboard application shell with header and sidebar",
      "platform": "web"
    }
  ],
  "metadata": {
    "total": 1,
    "filtered": 1
  }
}
```

**Token Types**:

- `shell`: Shell layout tokens (shell.web._, shell.mobile._)
- `page`: Page layout tokens (page.dashboard, page.detail, etc.)
- `section`: Section pattern tokens (section.grid-4, section.hero, etc.)
- `all`: All token types

## Component & Template Discovery Tools (SPEC-MCP-003)

### 8. List Components

**Tool**: `list-components`

**Description**: List all available UI components from @tekton/ui component catalog

**Input**:

```json
{
  "category": "core",
  "search": "button"
}
```

**Parameters**:

- `category` (optional): Filter by category - `'core' | 'complex' | 'advanced' | 'all'` (default: `'all'`)
- `search` (optional): Search components by name or description

**Output**:

```json
{
  "success": true,
  "components": [
    {
      "id": "button",
      "name": "Button",
      "category": "core",
      "description": "Interactive button with variants",
      "variantsCount": 6,
      "hasSubComponents": false,
      "tier": 1
    }
  ],
  "count": 15,
  "categories": {
    "core": 15,
    "complex": 10,
    "advanced": 5
  }
}
```

**Component Categories**:

- **core** (Tier 1): Button, Input, Label, Card, Badge, Avatar, Separator, Checkbox, RadioGroup, Switch, Textarea, Skeleton, ScrollArea, Form, Select
- **complex** (Tier 2): Dialog, DropdownMenu, Table, Tabs, Toast, Tooltip, Popover, Sheet, AlertDialog, Progress
- **advanced** (Tier 3): Sidebar, NavigationMenu, Breadcrumb, Command, Calendar

**Total Components**: 30+

### 9. Preview Component

**Tool**: `preview-component`

**Description**: Get detailed information about a specific UI component including props, variants, sub-components, and usage examples

**Input**:

```json
{
  "componentId": "button",
  "includeExamples": true,
  "includeDependencies": true
}
```

**Parameters**:

- `componentId` (required): Component ID (lowercase with hyphens, e.g., `'button'`, `'card'`, `'dialog'`)
- `includeExamples` (optional): Include usage examples (default: `true`)
- `includeDependencies` (optional): Include dependency information (default: `true`)

**Output**:

```json
{
  "success": true,
  "component": {
    "id": "button",
    "name": "Button",
    "category": "core",
    "description": "Interactive button with variants",
    "tier": 1,
    "props": [
      {
        "name": "variant",
        "type": "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
        "required": false,
        "defaultValue": "'default'",
        "description": "Visual style variant"
      },
      {
        "name": "size",
        "type": "'default' | 'sm' | 'lg' | 'icon'",
        "required": false,
        "defaultValue": "'default'",
        "description": "Button size"
      }
    ],
    "variants": [
      {
        "name": "variant",
        "value": "default",
        "description": "Default blue button"
      },
      {
        "name": "variant",
        "value": "destructive",
        "description": "Red destructive action"
      }
    ],
    "importStatement": "import { Button } from '@tekton/ui';",
    "dependencies": {
      "internal": [],
      "external": ["@radix-ui/react-slot"]
    },
    "examples": [
      {
        "title": "Basic Usage",
        "code": "import { Button } from '@tekton/ui';\n\n<Button variant=\"default\">Click me</Button>",
        "description": "Simple button with default variant"
      }
    ],
    "accessibility": "Supports keyboard navigation and ARIA attributes"
  }
}
```

**Error Handling**: When component not found, returns error with list of available components

### 10. List Screen Templates

**Tool**: `list-screen-templates`

**Description**: List all available screen templates from the Tekton template registry

**Input**:

```json
{
  "category": "auth",
  "search": "login"
}
```

**Parameters**:

- `category` (optional): Filter by category - `'auth' | 'dashboard' | 'form' | 'marketing' | 'feedback' | 'all'` (default: `'all'`)
- `search` (optional): Search templates by name or description

**Output**:

```json
{
  "success": true,
  "templates": [
    {
      "id": "auth.login",
      "name": "Login",
      "category": "auth",
      "description": "User authentication login screen",
      "requiredComponentsCount": 5,
      "layoutType": "centered",
      "version": "1.0.0",
      "tags": ["authentication", "form"]
    }
  ],
  "count": 4,
  "categories": {
    "auth": 4,
    "dashboard": 1,
    "form": 0,
    "marketing": 3,
    "feedback": 5
  }
}
```

**Template Categories**:

- **auth**: login, signup, forgot-password, verification
- **marketing**: landing, preferences, profile
- **feedback**: loading, error, empty, confirmation, success
- **dashboard**: overview

**Total Templates**: 13

### 11. Preview Screen Template

**Tool**: `preview-screen-template`

**Description**: Get detailed information about a specific screen template including skeleton structure, layout configuration, and customization boundaries

**Input**:

```json
{
  "templateId": "auth.login",
  "includeLayoutTokens": true
}
```

**Parameters**:

- `templateId` (required): Template ID in format `category.name` (e.g., `'auth.login'`, `'feedback.loading'`)
- `includeLayoutTokens` (optional): Include responsive layout tokens (default: `true`)

**Output**:

```json
{
  "success": true,
  "template": {
    "id": "auth.login",
    "name": "Login",
    "category": "auth",
    "description": "User authentication login screen",
    "version": "1.0.0",
    "skeleton": {
      "shell": "centered-card",
      "page": "auth-page",
      "sections": [
        {
          "id": "header",
          "name": "Header",
          "slot": "logo",
          "required": true
        },
        {
          "id": "form",
          "name": "Form",
          "slot": "main",
          "required": true
        }
      ]
    },
    "layout": {
      "type": "centered",
      "responsive": {
        "mobile": {
          "padding": "1rem",
          "gap": "1rem",
          "columns": 1
        },
        "tablet": {
          "padding": "2rem",
          "gap": "1.5rem",
          "columns": 1
        },
        "desktop": {
          "padding": "2rem",
          "gap": "2rem",
          "columns": 1
        }
      }
    },
    "customizable": {
      "texts": ["title", "subtitle", "button_label"],
      "optional": ["social_login", "remember_me"],
      "slots": ["logo", "footer", "socialLogin"]
    },
    "requiredComponents": ["Input", "Button", "Card", "Form", "Label"],
    "importStatement": "import { LoginTemplate } from '@tekton/ui';",
    "exampleProps": {
      "texts": {
        "title": "Welcome Back",
        "subtitle": "Sign in to your account"
      },
      "options": {
        "social_login": true,
        "remember_me": true
      }
    },
    "created": "2026-01-15",
    "updated": "2026-01-20",
    "tags": ["authentication", "form"]
  }
}
```

**Error Handling**: When template not found, returns error with list of available templates

**Use Cases**:

- AI agents exploring available templates
- Template integration planning
- Understanding customization boundaries
- Component dependency analysis

## Usage Examples

### From Claude Code

**Blueprint & Theme Workflows**:

```
User: "Create a user dashboard with profile card using calm-wellness theme"
→ Claude Code calls generate-blueprint
→ Blueprint JSON returned

User: "Show me the premium-editorial theme"
→ Claude Code calls preview-theme
→ Theme metadata and CSS variables returned

User: "Export that dashboard as TypeScript React"
→ Claude Code calls export-screen
→ TSX code returned (ready to copy/paste)
```

**Screen Generation Workflows**:

```
User: "Generate a dashboard screen using shell.web.dashboard and page.dashboard"
→ Claude Code calls generate_screen
→ Production-ready React code with CSS variables returned

User: "What layout tokens are available for sections?"
→ Claude Code calls list_tokens with tokenType='section'
→ List of section tokens (grid-2, grid-3, hero, etc.) returned
```

**Component Discovery Workflows** (SPEC-MCP-003):

```
User: "What UI components are available?"
→ Claude Code calls list-components
→ List of 30+ components categorized by tier returned

User: "Show me details about the Button component"
→ Claude Code calls preview-component with componentId='button'
→ Props, variants, examples, and dependencies returned

User: "I need a dialog component. What are the props?"
→ Claude Code calls preview-component with componentId='dialog'
→ Complete Dialog component specification with sub-components returned
```

**Template Discovery Workflows** (SPEC-MCP-003):

```
User: "What screen templates are available for authentication?"
→ Claude Code calls list-screen-templates with category='auth'
→ 4 auth templates (login, signup, forgot-password, verification) returned

User: "Show me the login template structure"
→ Claude Code calls preview-screen-template with templateId='auth.login'
→ Skeleton, layout, customization boundaries, and required components returned

User: "What can I customize in the loading template?"
→ Claude Code calls preview-screen-template with templateId='feedback.loading'
→ Customizable texts, slots, and optional features returned
```

See [Claude Code Integration Guide](../../.moai/specs/SPEC-MCP-002/CLAUDE-CODE-INTEGRATION.md) for complete examples.

## Architecture

```
packages/mcp-server/
├── src/
│   ├── index.ts               # stdio MCP server entry point (13 tools)
│   ├── tools/                 # MCP tool implementations
│   │   ├── generate-blueprint.ts    # Blueprint generation
│   │   ├── preview-theme.ts         # Theme preview
│   │   ├── list-themes.ts           # Theme listing
│   │   ├── list-icon-libraries.ts   # Icon library listing
│   │   ├── preview-icon-library.ts  # Icon library preview
│   │   ├── export-screen.ts         # Blueprint export
│   │   ├── generate-screen.ts       # Screen code generation (SPEC-LAYOUT-002)
│   │   ├── validate-screen.ts       # Screen validation (SPEC-LAYOUT-002)
│   │   ├── list-tokens.ts           # Layout token listing (SPEC-LAYOUT-002)
│   │   ├── list-components.ts       # Component listing (SPEC-MCP-003)
│   │   ├── preview-component.ts     # Component preview (SPEC-MCP-003)
│   │   ├── list-screen-templates.ts # Template listing (SPEC-MCP-003)
│   │   └── preview-screen-template.ts # Template preview (SPEC-MCP-003)
│   ├── data/                  # Static data registries (SPEC-MCP-003)
│   │   ├── component-registry.ts    # Component metadata registry
│   │   └── component-metadata.json  # Static component metadata
│   ├── storage/               # Blueprint storage
│   │   ├── blueprint-storage.ts
│   │   └── timestamp-manager.ts
│   ├── schemas/               # Zod validation
│   │   └── mcp-schemas.ts
│   └── utils/                 # Helper functions
│       ├── error-handler.ts
│       └── logger.ts          # stderr-only logging
└── __tests__/                 # Test suites
    ├── tools/                 # Tool tests
    │   ├── generate-blueprint.test.ts
    │   ├── preview-theme.test.ts
    │   ├── export-screen.test.ts
    │   ├── screen-tools.test.ts       # SPEC-LAYOUT-002 Phase 4 tests
    │   ├── list-components.test.ts    # SPEC-MCP-003 tests
    │   ├── preview-component.test.ts  # SPEC-MCP-003 tests
    │   ├── list-screen-templates.test.ts # SPEC-MCP-003 tests
    │   └── preview-screen-template.test.ts # SPEC-MCP-003 tests
    ├── mcp-protocol/          # JSON-RPC validation
    ├── storage/               # Storage tests
    └── utils/                 # Utility tests
```

**Key Changes in v2.0.0**:

- ✅ stdio transport (StdioServerTransport)
- ✅ JSON-RPC 2.0 protocol
- ✅ stderr-only logging (stdout reserved for MCP messages)
- ❌ HTTP endpoints removed (moved to SPEC-PLAYGROUND-001)
- ❌ previewUrl/filePath removed from outputs

## Built-in Themes (13 Total)

1. `calm-wellness` - Serene wellness applications
2. `dynamic-fitness` - Energetic fitness tracking
3. `korean-fintech` - Professional financial services
4. `media-streaming` - Video/audio streaming platforms
5. `next-styled-components` - Next.js with styled-components
6. `next-tailwind-radix` - Next.js + Tailwind + Radix UI
7. `next-tailwind-shadcn` - Next.js + Tailwind + shadcn/ui
8. `premium-editorial` - Sophisticated content platforms
9. `saas-dashboard` - Modern SaaS dashboards
10. `saas-modern` - Clean SaaS applications
11. `tech-startup` - Tech startup vibes
12. `vite-tailwind-shadcn` - Vite + Tailwind + shadcn/ui
13. `warm-humanist` - Warm and inviting experiences

**CSS Format**: All color values use OKLCH format for perceptual uniformity

## Quality Metrics (SPEC-MCP-002 v2.0.0)

| Metric                       | Target  | Current    | Status |
| ---------------------------- | ------- | ---------- | ------ |
| **Test Coverage**            | ≥ 85%   | **94.39%** | ✅     |
| **TypeScript Errors**        | 0       | **0**      | ✅     |
| **Critical Vulnerabilities** | 0       | **0**      | ✅     |
| **Tool Response Time**       | < 500ms | < 100ms    | ✅     |
| **Server Startup**           | < 1s    | < 500ms    | ✅     |

**Test Results**:

- 22 test files
- 214 test cases
- 100% pass rate
- Zero failures

## Integration with @tekton/core

All MCP tools reuse `@tekton/core` functions:

**Blueprint & Theme Tools**:

- `loadTheme()` - Theme loading
- `listThemes()` - Theme enumeration
- `createBlueprint()` - Blueprint creation
- `validateBlueprint()` - Schema validation
- `generateCSSVariables()` - CSS variable extraction
- `render()` - Code generation

**Screen Generation Tools** (SPEC-LAYOUT-002):

- `validateScreenDefinition()` - Screen validation
- `resolveScreen()` - Layout and component resolution
- `generateStyledComponents()` - CSS-in-JS generation
- `generateTailwindClasses()` - Tailwind CSS generation
- `generateReactComponent()` - React component generation
- `getAllShellTokens()` - Shell token listing
- `getAllPageLayoutTokens()` - Page token listing
- `getAllSectionPatternTokens()` - Section token listing

**Component & Template Discovery** (SPEC-MCP-003):

- `templateRegistry` from `@tekton/ui` - Template metadata and search
- Component metadata registry - Static component catalog with 30+ components
- Component type definitions - TypeScript interfaces for props and variants
- Template structure definitions - Skeleton, layout, and customization schemas

**Zero code duplication** - Single source of truth maintained.

## Documentation

### SPEC-MCP-002 v2.0.0 Documentation

- 📋 [Specification](../../.moai/specs/SPEC-MCP-002/spec.md) - Complete requirements
- 📐 [Implementation Plan](../../.moai/specs/SPEC-MCP-002/plan.md) - Development roadmap
- ✅ [Acceptance Criteria](../../.moai/specs/SPEC-MCP-002/acceptance.md) - AC-001 ~ AC-012
- 🔄 [Handover Document](../../.moai/specs/SPEC-MCP-002/HANDOVER.md) - Implementation details

### SPEC-MCP-003 v1.0.0 Documentation (Component & Template Discovery)

- 📋 [Specification](../../.moai/specs/SPEC-MCP-003/spec.md) - Component & template discovery requirements
- 🧩 Component Registry - 30+ UI components with metadata
- 📄 Template Registry - 13 screen templates with customization boundaries

### Integration Guides

- 🤖 [Claude Code Integration](../../.moai/specs/SPEC-MCP-002/CLAUDE-CODE-INTEGRATION.md) - Setup and usage
- ✅ [Phase 5 Results](../../.moai/specs/SPEC-MCP-002/PHASE-5-RESULTS.md) - MCP Inspector validation
- 🎯 [Phase 6 Completion](../../.moai/specs/SPEC-MCP-002/PHASE-6-COMPLETION.md) - Integration testing

### Quick Links

- 🧪 [Test Coverage Report](./coverage/) - 94.39% coverage
- 🎨 [Theme System](../../packages/core/src/themes/) - 13 built-in themes
- 🧩 [UI Component Library](../../packages/ui/) - 30+ production-ready components
- 📄 [Template Registry](../../packages/ui/src/templates/) - 13 screen templates
- 🔧 [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) - Protocol testing tool

## Development

```bash
# Install dependencies
pnpm install

# Build (TypeScript → dist/)
pnpm build

# Run tests
pnpm test

# Test with coverage
pnpm test:coverage

# Watch mode
pnpm dev

# Lint
pnpm lint

# Start MCP server (stdio)
pnpm start

# MCP Inspector (browser-based testing)
pnpm inspect
```

### Validation Scripts

```bash
# Automated MCP protocol validation
node validate-mcp.mjs

# Manual testing with MCP Inspector
pnpm inspect
```

## Migration from v1.0.0 (HTTP) to v2.0.0 (stdio)

**Breaking Changes**:

- ❌ HTTP endpoints removed → stdio transport only
- ❌ `previewUrl` field removed from `generate-blueprint` and `preview-theme` outputs
- ❌ `filePath` field removed from `export-screen` output
- ❌ File system writes removed from `export-screen`
- ✅ `export-screen` now accepts `blueprint` object instead of `blueprintId`

**Why?**

- **Claude Code Integration**: stdio is the standard MCP transport
- **Data-Only Philosophy**: Claude Code handles all file operations
- **Security**: No file system side effects from MCP tools

**Visual Preview**: Use [SPEC-PLAYGROUND-001](../../.moai/specs/SPEC-PLAYGROUND-001/) for React-based rendering

## Contributing

Contributions welcome! Please ensure:

- Tests pass (`pnpm test`)
- Coverage ≥ 85% (`pnpm test:coverage`)
- TypeScript strict mode compliance (`pnpm build`)
- MCP protocol validation (`node validate-mcp.mjs`)

## License

MIT

---

**Version**: 3.0.0 (stdio-based MCP standard + Component & Template Discovery)
**Last Updated**: 2026-02-01
**SPEC**: SPEC-MCP-002 v2.0.0, SPEC-LAYOUT-002 Phase 4, SPEC-MCP-003 v1.0.0
**Total Tools**: 13 (9 existing + 4 new discovery tools)
