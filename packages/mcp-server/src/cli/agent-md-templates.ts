/**
 * Agent guidance templates for CLAUDE.md and AGENTS.md
 * Provides framework-specific Tekton workflow instructions
 */

export type Framework = 'nextjs' | 'vite';

/**
 * Generate CLAUDE.md section for Claude Code
 * (Claude Code-specific patterns and MCP integration)
 */
export function generateClaudeMdSection(framework: Framework): string {
  const importPath = framework === 'nextjs' ? 'app/page.tsx' : 'src/App.tsx';

  return `
## Tekton UI Workflow (Claude Code)

### MCP Server Connection

Tekton MCP server is configured in \`.mcp.json\`. Claude Code automatically loads 16 tools for screen generation.

### Authentication (Step 1)

Before generating any screens, authenticate:

\`\`\`bash
tekton-mcp login
\`\`\`

**Important:** All 6 themes require authentication. No free themes are available.

### Screen Generation Workflow (4 Steps)

**Step 1/4:** Gather Context
- Call \`get-screen-generation-context\` with user's screen description
- Receive template matches, component suggestions, and schema

**Step 2/4:** Validate Definition
- Generate Screen Definition JSON based on context
- Call \`validate-screen-definition\` to verify structure
- Fix any errors before proceeding

**Step 3/4:** Generate Code
- Call \`generate_screen\` with validated definition
- Receive production React code and dependencies list
- Check \`dependencies.external\` field

**Step 4/4:** Validate Environment
- Call \`validate-environment\` with project path and required packages
- Verify Tailwind CSS configuration
- Show user install commands for missing packages

### Component Usage Example

\`\`\`tsx
// ${importPath}
import { Button, Card, CardHeader, CardTitle, CardContent } from '@tekton-ui/ui';

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to Tekton</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg">Get Started</Button>
      </CardContent>
    </Card>
  );
}
\`\`\`

### Available Tools

**Discovery (6 tools):**
- \`list-themes\` - List 6 available themes
- \`preview-theme\` - Get theme design tokens
- \`list-components\` - List 30+ UI components
- \`preview-component\` - Get component props and variants
- \`list-screen-templates\` - List 13 screen templates
- \`preview-screen-template\` - Get template structure

**Screen Generation (4 tools):**
- \`get-screen-generation-context\` - Step 1/4
- \`validate-screen-definition\` - Step 2/4
- \`generate_screen\` - Step 3/4
- \`validate-environment\` - Step 4/4

**Quick Prototyping (3 tools):**
- \`generate-blueprint\` - Quick UI structure
- \`export-screen\` - Export to JSX/TSX/Vue
- \`list_tokens\` - List layout tokens

**Icon Libraries (2 tools):**
- \`list-icon-libraries\` - List available icon libraries
- \`preview-icon-library\` - Preview icon library

**Additional:**
- \`validate_screen\` - Simple validation (use \`validate-screen-definition\` for production)

### MCP Prompts (Universal Guidance)

Claude Code can access built-in prompts for guidance:

- \`getting-started\` - Authentication → Theme → Components → Screen generation
- \`screen-workflow\` - Detailed 4-step workflow with troubleshooting

These prompts work across all MCP clients, not just Claude Code.

### Common Mistakes to Avoid

1. ❌ Skipping authentication before generating screens
2. ❌ Using non-existent theme IDs (only 6 exist)
3. ❌ Skipping validate-screen-definition step
4. ❌ Not checking dependencies.external field
5. ❌ Delivering code without verifying Tailwind config

### Troubleshooting

**Authentication issues:**
- Run \`tekton-mcp status\` to check authentication
- Run \`tekton-mcp login\` to re-authenticate

**Missing styles:**
- Run \`validate-environment\` to check Tailwind config
- Verify \`@tekton-ui/ui\` content paths are included
- Check \`tailwindcss-animate\` plugin is configured

**Component not found:**
- Use \`list-components\` to verify component exists
- Use \`preview-component\` to check correct component ID
`;
}

/**
 * Generate AGENTS.md section for generic AI agents
 * (Platform-agnostic guidance for OpenAI Codex, Cursor, Windsurf, etc.)
 */
export function generateAgentsMdSection(framework: Framework): string {
  const importPath = framework === 'nextjs' ? 'app/page.tsx' : 'src/App.tsx';

  return `
## Tekton UI Workflow (AI Agents)

### Overview

Tekton MCP server provides 16 tools for screen generation via Model Context Protocol (MCP). This guide is for AI agents on platforms like OpenAI Codex, Cursor, Windsurf, and other MCP-compatible clients.

### Prerequisites

1. **MCP Server Running:** Ensure \`@tekton-ui/mcp-server\` is running and connected
2. **Authentication:** User must run \`tekton-mcp login\` before generating screens
3. **Project Setup:** \`@tekton-ui/ui\` and \`tailwindcss-animate\` must be installed

### Required Authentication Flow

**Step 1:** Check authentication status
\`\`\`bash
tekton-mcp status
\`\`\`

**Step 2:** If not authenticated, instruct user:
\`\`\`bash
tekton-mcp login
\`\`\`

**Important:** All 6 themes require valid licenses. There are no free themes available.

### Screen Generation Workflow (4 Steps)

Follow this exact sequence for production-ready screens:

#### Step 1/4: Gather Context

**Tool:** \`get-screen-generation-context\`

**Purpose:** Get all context needed to create Screen Definition

**Input:**
\`\`\`json
{
  "description": "user dashboard with profile card",
  "themeId": "minimal-workspace",
  "includeExamples": true
}
\`\`\`

**Output:** Template matches, component suggestions, schema, examples

#### Step 2/4: Validate Definition

**Tool:** \`validate-screen-definition\`

**Purpose:** Ensure Screen Definition JSON is correct

**Input:**
\`\`\`json
{
  "definition": {
    "id": "user-dashboard",
    "shell": "shell.web.dashboard",
    "page": "page.dashboard",
    "sections": [...]
  },
  "strict": true
}
\`\`\`

**Output:** Validation results with errors, warnings, suggestions

**Critical:** Always validate before Step 3. Fix all errors before proceeding.

#### Step 3/4: Generate Code

**Tool:** \`generate_screen\`

**Purpose:** Generate production React code

**Input:**
\`\`\`json
{
  "screenDefinition": { /* from Step 2 */ },
  "outputFormat": "tailwind",
  "options": {
    "typescript": true,
    "prettier": true
  }
}
\`\`\`

**Output:** React code + dependencies

**Critical:** Check \`dependencies.external\` field. If non-empty, proceed to Step 4.

#### Step 4/4: Validate Environment

**Tool:** \`validate-environment\`

**Purpose:** Verify project has required packages and Tailwind config

**Input:**
\`\`\`json
{
  "projectPath": "/path/to/package.json",
  "requiredPackages": ["framer-motion", "@radix-ui/react-slot"],
  "checkTailwind": true
}
\`\`\`

**Output:** Missing packages, install commands, Tailwind validation

**Critical:** Always inform user about missing packages and Tailwind config issues.

### Discovery Tools

Before generating screens, explore available resources:

**Themes (6 total, all require authentication):**
- \`list-themes\` → See all 6 themes
- \`preview-theme\` → Get theme design tokens

**Components (30+ available):**
- \`list-components\` → Browse component catalog
- \`preview-component\` → Get component props, variants, examples

**Templates (13 available):**
- \`list-screen-templates\` → Browse screen templates
- \`preview-screen-template\` → Get template structure

### Component Usage Example

\`\`\`tsx
// ${importPath}
import { Button, Card, CardHeader, CardTitle, CardContent } from '@tekton-ui/ui';

export default function Page() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default">Get Started</Button>
      </CardContent>
    </Card>
  );
}
\`\`\`

### MCP Prompts (Universal Guidance)

Your MCP client may support prompts. If available:

- \`getting-started\` - Complete onboarding guide
- \`screen-workflow\` - Detailed 4-step workflow

These provide context to help you guide users effectively.

### Error Handling

**Authentication errors:**
- Instruct user to run \`tekton-mcp login\`
- Verify with \`tekton-mcp status\`

**Validation errors (Step 2):**
- Read error messages - they include suggestions
- Fix errors in Screen Definition
- Re-run \`validate-screen-definition\`

**Missing dependencies (Step 3):**
- Always run Step 4 to check environment
- Show user install commands from \`validate-environment\`

**Missing styles (runtime):**
- Run \`validate-environment\` to diagnose
- Check Tailwind config includes \`@tekton-ui/ui\` content paths
- Check \`tailwindcss-animate\` plugin is configured

### Best Practices

1. ✅ Always authenticate before generating screens
2. ✅ Follow all 4 workflow steps in order
3. ✅ Validate before generating (Step 2 before Step 3)
4. ✅ Check environment before delivering code (Step 4)
5. ✅ Inform user about missing dependencies and Tailwind issues
6. ✅ Use \`strict: true\` for production validation

### Quick Reference: All 16 Tools

**Discovery:** list-themes, preview-theme, list-components, preview-component, list-screen-templates, preview-screen-template
**Workflow:** get-screen-generation-context, validate-screen-definition, generate_screen, validate-environment
**Quick:** generate-blueprint, export-screen, validate_screen, list_tokens
**Icons:** list-icon-libraries, preview-icon-library
`;
}
