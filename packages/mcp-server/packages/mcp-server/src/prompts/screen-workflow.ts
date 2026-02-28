/**
 * MCP Prompts: Screen Generation Workflow
 * Step-by-step guide for the 4-step screen generation process
 */

/**
 * Screen Workflow prompt with detailed 4-step process
 */
export function getScreenWorkflowPrompt() {
  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `# Framingui Screen Generation Workflow

This is the **recommended production workflow** for generating screens with Framingui.

## Overview

The 4-step workflow ensures:
- ✅ Correct component usage
- ✅ Validated screen structure
- ✅ All dependencies installed
- ✅ Tailwind CSS properly configured

## Step 1/4: Get Screen Generation Context

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
- Available components with props
- Screen Definition JSON schema
- Example definitions
- Theme recipes

**When to use:**
- Beginning of every screen generation
- When you need component suggestions
- When exploring available templates

---

## Step 2/4: Validate Screen Definition

**Tool:** \`validate-screen-definition\`

**Purpose:** Ensure your Screen Definition JSON is correct before generating code

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
        "token": "section.container",
        "components": [...]
      }
    ]
  },
  "strict": true
}
\`\`\`

**Output:**
- \`valid\`: true/false
- \`errors\`: Array of validation errors with suggestions
- \`warnings\`: Potential issues
- \`suggestions\`: Improvement recommendations

**When to use:**
- Always before Step 3
- When fixing validation errors
- When exploring screen structure improvements

---

## Step 3/4: Generate Screen Code

**Tool:** \`generate_screen\`

**Purpose:** Generate production-ready React code from validated Screen Definition

**Input:**
\`\`\`json
{
  "screenDefinition": { /* validated definition from Step 2 */ },
  "outputFormat": "tailwind",
  "options": {
    "typescript": true,
    "prettier": true
  }
}
\`\`\`

**Output:**
- \`code\`: Production React component
- \`cssVariables\`: CSS variables for theme
- \`dependencies\`: Object with:
  - \`external\`: Required npm packages
  - \`internal\`: @framingui/* packages
  - \`missing\`: Packages not in project
  - \`installCommands\`: Ready-to-use install commands

**Output Formats:**
- \`tailwind\`: Tailwind CSS classes (recommended)
- \`css-in-js\`: Styled-components or Emotion
- \`react\`: Pure React with CSS variables

**Critical:**
- ALWAYS check the \`dependencies.external\` field
- If non-empty, proceed to Step 4 or show install commands to user

---

## Step 4/4: Validate Environment (Optional but Recommended)

**Tool:** \`validate-environment\`

**Purpose:** Verify project has required packages and Tailwind is configured correctly

**Input:**
\`\`\`json
{
  "projectPath": "/path/to/package.json",
  "requiredPackages": ["framer-motion", "@radix-ui/react-slot"],
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
- ✅ @framingui/ui content paths included
- ✅ tailwindcss-animate plugin configured

**When to use:**
- After Step 3 when dependencies.external is non-empty
- Before delivering code to user
- When user reports missing styles or animations

---

## Complete Example

\`\`\`
User: "Create a login page with email/password fields"

1. Call get-screen-generation-context({ description: "login page..." })
   → Receive template matches, components, schema

2. Generate Screen Definition JSON based on context
   → Call validate-screen-definition({ definition: {...} })
   → Fix errors if any, re-validate

3. Call generate_screen({ screenDefinition: {...}, outputFormat: "tailwind" })
   → Receive code + dependencies

4. Call validate-environment({ projectPath: "...", requiredPackages: [...] })
   → Show user missing packages and install commands
   → Warn about Tailwind config issues if any

5. Deliver code to user with complete setup instructions
\`\`\`

## Troubleshooting

**Validation fails in Step 2:**
- Read error messages carefully - they include suggestions
- Check token names match SPEC-LAYOUT-001
- Verify component IDs exist (use list-components)

**Missing dependencies in Step 3:**
- Always run Step 4 to verify environment
- Show install commands to user
- Check Tailwind config includes @framingui/ui paths

**Components render without styles:**
- Verify Tailwind content paths include @framingui/ui
- Check tailwindcss-animate plugin is configured
- Run validate-environment to diagnose

---

## Best Practices

1. ✅ Always follow all 4 steps in order
2. ✅ Validate before generating (Step 2 before Step 3)
3. ✅ Check environment before delivering code (Step 4)
4. ✅ Use strict validation mode for production
5. ✅ Include theme recipes for visual consistency

## Alternative Workflows

**Quick Prototyping (not production):**
- \`generate-blueprint\` → \`export-screen\` (skips validation)

**Production (recommended):**
- Follow complete 4-step workflow above`,
        },
      },
    ],
  };
}
