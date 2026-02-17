# Integration Guide

How to integrate Tekton MCP Server with AI coding assistants and existing projects.

## Table of Contents

1. [MCP Client Configuration](#mcp-client-configuration)
2. [Claude Code Integration](#claude-code-integration)
3. [Cursor / Windsurf / Other Clients](#cursor--windsurf--other-clients)
4. [Project Setup with `init`](#project-setup-with-init)
5. [Environment Variables](#environment-variables)
6. [Troubleshooting](#troubleshooting)

---

## MCP Client Configuration

Tekton MCP Server uses the **stdio transport** (JSON-RPC 2.0 over stdin/stdout).

### Configuration File

Add to your project root `.mcp.json`:

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

### With Environment Variables

```json
{
  "mcpServers": {
    "tekton": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@tekton-ui/mcp-server"],
      "env": {
        "TEKTON_API_KEY": "tk_live_xxx..."
      }
    }
  }
}
```

> **Tip**: Instead of hardcoding the API key, run `tekton-mcp login` to save credentials to `~/.tekton/credentials.json`. The server loads them automatically.

---

## Claude Code Integration

### Setup

1. **Install**: Add `.mcp.json` to your project root (see above)
2. **Login**: Run `npx @tekton-ui/mcp-server login`
3. **Restart**: Restart Claude Code to detect the new MCP server
4. **Verify**: Ask Claude "Check my Tekton account" → triggers `whoami`

### Usage

After setup, ask Claude to build screens using natural language:

```
"Build a login page using the classic-magazine theme"
"Create a dashboard with sales stats and activity feed"
"Show me available components for forms"
"What screen templates do you have for authentication?"
```

Claude will automatically:

1. Call `whoami` (first request per session)
2. Use the appropriate tools (`list-components`, `preview-theme`, `generate_screen`, etc.)
3. Write generated code to your project

### Session Flow

```
Session start → whoami (auto) → your requests → tool calls → code output
```

---

## Cursor / Windsurf / Other Clients

Any MCP-compatible client can use Tekton. The server provides:

- **17 tools**: Discoverable via `ListTools` request
- **2 prompts**: `getting-started` and `screen-workflow`
- **stdio transport**: Standard stdin/stdout communication

### Generic MCP Configuration

Most clients support a JSON config format similar to:

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

Check your client's documentation for the exact config file location.

---

## Project Setup with `init`

The `init` command configures an existing project for Tekton:

```bash
npx @tekton-ui/mcp-server init
```

### What It Does

| Step | Action                                                                 |
| ---- | ---------------------------------------------------------------------- |
| 1    | **Detect framework**: Next.js or Vite                                  |
| 2    | **Install packages**: `@tekton-ui/ui`, `tailwindcss-animate`           |
| 3    | **Configure Tailwind**: Add content paths and animate plugin           |
| 4    | **Setup CSS**: Add `@import '@tekton-ui/ui/styles'` to `globals.css`   |
| 5    | **Register MCP**: Create/update `.mcp.json` with Tekton server         |
| 6    | **Generate guide**: Create `TEKTON-GUIDE.md`                           |
| 7    | **Update AI config**: Add Tekton workflow to `CLAUDE.md` / `AGENTS.md` |
| 8    | **Print next steps**: Auth instructions and usage guide                |

### Supported Frameworks

- Next.js (App Router)
- Vite (React)

### Package Managers

Auto-detected: `pnpm`, `yarn`, `bun`, `npm`

---

## Environment Variables

| Variable         | Required    | Default                 | Description                                     |
| ---------------- | ----------- | ----------------------- | ----------------------------------------------- |
| `TEKTON_API_KEY` | Conditional | —                       | API key. Not needed if using `tekton-mcp login` |
| `TEKTON_API_URL` | No          | `https://tekton-ui.com` | API endpoint                                    |

### Credential Precedence

1. `TEKTON_API_KEY` environment variable (highest priority)
2. `~/.tekton/credentials.json` (saved by `tekton-mcp login`)

---

## Troubleshooting

### Server Not Detected by AI Client

1. Check `.mcp.json` exists in your project root
2. Verify `npx @tekton-ui/mcp-server` runs without errors in terminal
3. Restart your AI client

### "Authentication required" After Login

- Verify credentials exist: `cat ~/.tekton/credentials.json`
- Check API key validity: `npx @tekton-ui/mcp-server status`
- Re-login: `npx @tekton-ui/mcp-server login`

### "whoami required"

Your AI client must call `whoami` as the first tool. Ask it: "Check my Tekton account".

### Generated Code Missing Theme Styles

Use the production workflow (`get-screen-generation-context` → `validate-screen-definition` → `generate_screen`). The `generate_screen` tool applies theme recipes. Without it, code won't have theme styling.

### Missing Dependencies in Project

Run `validate-environment` after generating code — it checks your `package.json` and `tailwind.config`, returning install commands for missing packages.

---

**References**:

- [Quick Start](./01-quickstart.md) — Getting started
- [User Guide](./02-user-guide.md) — Full feature guide
- [API Reference](./03-api-reference.md) — All 17 tool schemas
- [Developer Guide](./05-developer-guide.md) — Contributing

**Version**: 0.4.5 | **Last Updated**: 2026-02-16
