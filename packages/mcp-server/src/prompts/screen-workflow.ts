/**
 * MCP Prompts: Screen Generation Workflow
 * Step-by-step guide for the 3-step screen generation process
 */

/**
 * Screen Workflow prompt with detailed 3-step process
 */
export function getScreenWorkflowPrompt() {
  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `# Tekton Screen Generation Workflow

This is the **recommended production workflow** for generating screens with Tekton.

## Overview

The 3-step workflow ensures:
- ✅ Correct component usage with inline props/variants
- ✅ Validated screen structure with auto-fix patches
- ✅ All dependencies installed
- ✅ Tailwind CSS properly configured

## Step 1/3: Get Screen Generation Context

**Tool:** \`get-screen-generation-context\`

**Purpose:** Gather all context needed to create a Screen Definition

**Input:**
\`\`\`json
{
  "description": "User dashboard with profile card and recent activity",
  "themeId": "minimal-workspace",
  "includeExamples": true
}
\`\`\`

**Output:**
- Matching screen templates
- Available components with **inline props and variants**
- Screen Definition JSON schema
- Example definitions
- Theme recipes

**When to use:**
- Beginning of every screen generation
- When you need component suggestions
- When exploring available templates

---

## Step 2/3: Validate Screen Definition

**Tool:** \`validate-screen-definition\`

**Purpose:** Ensure your Screen Definition JSON is correct before writing code

**Input:**
\`\`\`json
{
  "definition": {
    "id": "user-dashboard",
    "shell": "shell.web.dashboard",
    "page": "page.dashboard",
    "sections": [
      {
        "id": "header",
        "pattern": "section.container",
        "components": [...]
      }
    ]
  },
  "strict": true
}
\`\`\`

**Output:**
- \`valid\`: true/false
- \`errors\`: Array of validation errors with suggestions and **autoFix patches**
- \`warnings\`: Potential issues
- \`suggestions\`: Improvement recommendations with **autoFix patches**
- \`autoFixPatches\`: Aggregated JSON Patch operations to fix all issues

**When to use:**
- Always before writing React code
- When fixing validation errors (apply autoFixPatches)
- When exploring screen structure improvements

---

## After Validation: Write React Code Directly

**No tool needed** - The AI agent writes production-ready React code directly.

**How:**
1. Use the components and import statements from Step 1 context
2. Apply component props and variants as documented in the context
3. Follow the template skeleton structure if available
4. Apply theme recipes via variant props

**Example:**
\`\`\`tsx
import { Card, CardHeader, CardTitle, CardContent } from '@tekton-ui/ui';
import { Button } from '@tekton-ui/ui';
import { Avatar, AvatarImage, AvatarFallback } from '@tekton-ui/ui';

export default function UserDashboard() {
  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <Avatar>
            <AvatarImage src="/avatar.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <Button variant="default">Edit Profile</Button>
        </CardContent>
      </Card>
    </div>
  );
}
\`\`\`

---

## Step 3/3: Validate Environment (Optional but Recommended)

**Tool:** \`validate-environment\`

**Purpose:** Verify project has required packages and Tailwind is configured correctly

**Input:**
\`\`\`json
{
  "projectPath": "/path/to/package.json",
  "requiredPackages": ["@radix-ui/react-slot", "@radix-ui/react-avatar"],
  "checkTailwind": true
}
\`\`\`

**Output:**
- \`installed\`: Packages already in package.json
- \`missing\`: Packages that need installation
- \`installCommands\`: Commands for npm/yarn/pnpm/bun
- \`tailwind\`: Tailwind config validation results
  - \`issues\`: Problems found
  - \`fixes\`: How to fix each issue

**Tailwind Validation Checks:**
- ✅ tailwind.config.{ts,js,mjs,cjs} exists
- ✅ @tekton-ui/ui content paths included
- ✅ tailwindcss-animate plugin configured

**When to use:**
- After writing code, to verify all packages are installed
- Before delivering code to user
- When user reports missing styles or animations

---

## Complete Example

\`\`\`
User: "Create a login page with email/password fields"

1. Call get-screen-generation-context({ description: "login page..." })
   → Receive template matches, components with inline props, schema

2. Generate Screen Definition JSON based on context
   → Call validate-screen-definition({ definition: {...} })
   → Apply autoFixPatches if any, re-validate if needed

3. Write React code directly using components from Step 1 context
   → Use import statements and props from context response

4. Call validate-environment({ projectPath: "...", requiredPackages: [...] })
   → Show user missing packages and install commands
   → Warn about Tailwind config issues if any

5. Deliver code to user with complete setup instructions
\`\`\`

## Troubleshooting

**Validation fails in Step 2:**
- Read error messages carefully - they include suggestions and autoFix patches
- Apply autoFixPatches to auto-correct common issues
- Check token names match SPEC-LAYOUT-001
- Verify component IDs exist (use list-components)

**Missing dependencies:**
- Always run Step 3 to verify environment
- Show install commands to user
- Check Tailwind config includes @tekton-ui/ui paths

**Components render without styles:**
- Verify Tailwind content paths include @tekton-ui/ui
- Check tailwindcss-animate plugin is configured
- Run validate-environment to diagnose

---

## Best Practices

1. ✅ Always follow all 3 steps in order
2. ✅ Validate before writing code (Step 2)
3. ✅ Check environment before delivering code (Step 3)
4. ✅ Use strict validation mode for production
5. ✅ Include theme recipes for visual consistency
6. ✅ Use inline props from context instead of guessing

## Alternative Workflows

**Quick Prototyping (not production):**
- \`generate-blueprint\` → \`export-screen\` (skips validation)

**Production (recommended):**
- Follow complete 3-step workflow above`,
        },
      },
    ],
  };
}
