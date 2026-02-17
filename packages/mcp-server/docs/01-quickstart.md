# Quick Start Guide

Get started with Tekton MCP Server in 5 minutes.

## Overview

Tekton MCP Server is a **stdio-based MCP protocol** server that integrates with AI coding assistants (Claude Code, Cursor, Windsurf, etc.) to generate production-ready UI screens from natural language.

**Key Features**:

- 🤖 **MCP Protocol (stdio)**: 17 AI-powered tools via JSON-RPC 2.0
- 🎨 **6 Premium Themes**: Curated design systems with full design tokens
- 🔒 **OAuth Authentication**: Secure login via browser-based OAuth
- 🧩 **30+ Components**: Discoverable UI components with props, variants & examples
- 📄 **Screen Templates**: 13 pre-built screen templates (auth, dashboard, marketing, etc.)
- 🚀 **Production Code**: JSX, TSX, Vue code generation with theme applied

## Prerequisites

- Node.js 20+
- An AI coding assistant with MCP support (Claude Code, Cursor, Windsurf, etc.)

## Installation

### Option 1: One-line Setup (Recommended)

Run this in your project directory:

```bash
npx @tekton-ui/mcp-server init
```

This automatically:

1. Detects your framework (Next.js / Vite)
2. Installs `@tekton-ui/ui` and `tailwindcss-animate`
3. Configures Tailwind CSS (content paths + animate plugin)
4. Adds CSS token imports to `globals.css`
5. Registers MCP server in `.mcp.json`
6. Generates `TEKTON-GUIDE.md` and updates `CLAUDE.md` / `AGENTS.md`

### Option 2: Manual MCP Configuration

Add to your project's `.mcp.json`:

```json
{
  "mcpServers": {
    "tekton": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@tekton-ui/mcp-server"]
    }
  }
}
```

## Authentication

All themes require authentication. Log in via browser OAuth:

```bash
npx @tekton-ui/mcp-server login
```

This will:

1. Open your browser to `tekton-ui.com/mcp/auth`
2. Complete the OAuth flow
3. Save credentials to `~/.tekton/credentials.json`

**Alternative**: Set the `TEKTON_API_KEY` environment variable directly.

### Verify Authentication

```bash
npx @tekton-ui/mcp-server status
```

## First Use

After authentication, restart your AI assistant and follow this flow:

### Step 1: Call `whoami` (Mandatory)

Every session must start with `whoami`. Your AI assistant will call it automatically:

```
You: "Check my Tekton account"
→ AI calls whoami
→ Returns: plan, licensed themes, MCP support status
```

### Step 2: Explore Themes

```
You: "What themes are available?"
→ AI calls list-themes
→ Returns: 6 premium themes

You: "Show me the minimal-workspace theme"
→ AI calls preview-theme
→ Returns: Full design tokens (colors, typography, spacing)
```

### Step 3: Generate a Screen

**Quick Prototype** (blueprint workflow):

```
You: "Create a login page with the classic-magazine theme"
→ AI calls generate-blueprint → export-screen
→ Returns: TSX/JSX/Vue code
```

**Production Workflow** (recommended):

```
You: "Build a dashboard screen"
→ AI calls:
  1. get-screen-generation-context (gather context)
  2. validate-screen-definition (validate JSON)
  3. generate_screen (generate themed code)
  4. validate-environment (check dependencies)
→ Returns: Production-ready React code with theme applied
```

## Available Themes

| Theme ID            | Description                      |
| ------------------- | -------------------------------- |
| `classic-magazine`  | Classic magazine editorial style |
| `equinox-fitness`   | Fitness & wellness               |
| `minimal-workspace` | Minimal clean workspace          |
| `neutral-humanism`  | Neutral humanist design          |
| `round-minimal`     | Rounded minimal style            |
| `square-minimalism` | Square minimalist design         |

> **Note**: All themes require a valid license. Use `whoami` to check your accessible themes.

## CLI Commands

| Command                            | Description             |
| ---------------------------------- | ----------------------- |
| `npx @tekton-ui/mcp-server init`   | One-line project setup  |
| `npx @tekton-ui/mcp-server login`  | Browser OAuth login     |
| `npx @tekton-ui/mcp-server logout` | Clear saved credentials |
| `npx @tekton-ui/mcp-server status` | Check auth status       |
| `npx @tekton-ui/mcp-server`        | Start MCP stdio server  |

## Troubleshooting

### "Authentication required" Error

```bash
# Log in first
npx @tekton-ui/mcp-server login

# Or set API key directly
export TEKTON_API_KEY=tk_live_xxx...
```

### "whoami required" Error

Your AI assistant must call `whoami` before any other tool. Simply ask it to check your account first.

### MCP Server Not Detected

1. Ensure `.mcp.json` exists in your project root
2. Restart your AI assistant after adding `.mcp.json`
3. Check that `npx @tekton-ui/mcp-server` runs without errors

## Next Steps

- [User Guide](./02-user-guide.md) — Full feature guide & workflows
- [API Reference](./03-api-reference.md) — All 17 tools with schemas
- [Architecture](./04-architecture.md) — System design & auth flow
- [Developer Guide](./05-developer-guide.md) — Contributing & testing
- [Integration Guide](./06-integration-guide.md) — MCP client setup

---

**Version**: 0.4.5 | **Last Updated**: 2026-02-16
