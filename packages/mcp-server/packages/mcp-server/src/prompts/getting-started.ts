/**
 * MCP Prompts: Getting Started with Framingui
 * Universal guidance for all MCP clients (Claude Code, OpenAI Codex, etc.)
 */

/**
 * Getting Started prompt for Framingui workflow
 * Provides authentication guidance, theme exploration, and screen generation workflow
 */
export function getGettingStartedPrompt() {
  return {
    messages: [
      {
        role: 'user',
        content: {
          type: 'text',
          text: `# Getting Started with FramingUI

## Step 1: Authentication (Required)

Before generating screens, authenticate with your Framingui account:

\`\`\`bash
framingui-mcp login
\`\`\`

This opens your browser for OAuth authentication. Your credentials are stored in \`~/.framingui/credentials.json\`.

**Why authentication is required:**
- All 6 themes require valid licenses
- No free themes are available
- Authentication verifies your license status

## Step 2: Explore Available Themes

Use MCP tools to discover themes:

\`\`\`
1. Call list-themes to see all 6 available themes
2. Call preview-theme with a themeId to see design tokens
3. Choose a theme for your project
\`\`\`

**Available themes (all require authentication):**
- classic-magazine - Classic magazine style
- dark-boldness - Fitness & wellness
- minimal-workspace - Minimal workspace
- neutral-workspace - Neutral humanism
- pebble - Round minimal
- square-minimalism - Square minimalism

## Step 3: Check Component Availability

Before creating screen definitions:

\`\`\`
1. Call list-components to see 30+ available UI components
2. Call preview-component for specific component props and variants
3. Identify components needed for your screen
\`\`\`

## Step 4: Generate Your First Screen

Follow the 4-step workflow:

**Step 1/4:** Call \`get-screen-generation-context\` with your screen description
- Returns: Template matches, component suggestions, schema

**Step 2/4:** Create Screen Definition JSON, then call \`validate-screen-definition\`
- Returns: Validation results, errors, suggestions

**Step 3/4:** Call \`generate_screen\` with validated definition
- Returns: Production React code, dependencies list

**Step 4/4:** Call \`validate-environment\` with project path
- Returns: Missing packages, install commands, Tailwind config status

## Common Mistakes to Avoid

1. ❌ Skipping authentication - All themes require licenses
2. ❌ Using non-existent theme IDs - Only 6 themes exist
3. ❌ Skipping validate-screen-definition - Always validate before generating
4. ❌ Ignoring dependencies warnings - Check required packages before running code

## Need Help?

- Check \`FRAMINGUI-GUIDE.md\` in your project root
- Read \`CLAUDE.md\` for Claude Code specific patterns (if available)
- Read \`AGENTS.md\` for generic AI agent guidance (if available)`,
        },
      },
    ],
  };
}
