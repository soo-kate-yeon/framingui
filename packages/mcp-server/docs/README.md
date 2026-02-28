# Tekton MCP Server Documentation

Documentation for `@framingui/mcp-server` v0.4.5 — an stdio-based MCP server for AI-driven UI generation.

## Documents

| #   | Document                                       | Description                             |
| --- | ---------------------------------------------- | --------------------------------------- |
| 01  | [Quick Start](./01-quickstart.md)              | Installation, authentication, first use |
| 02  | [User Guide](./02-user-guide.md)               | All 17 tools, themes, workflows         |
| 03  | [API Reference](./03-api-reference.md)         | Tool schemas, error codes               |
| 04  | [Architecture](./04-architecture.md)           | System design, auth flow, modules       |
| 05  | [Developer Guide](./05-developer-guide.md)     | Contributing, testing, release          |
| 06  | [Integration Guide](./06-integration-guide.md) | MCP client setup, project init          |

## Key Concepts

- **17 MCP Tools**: Authentication, themes, components, templates, screen generation
- **6 Premium Themes**: All require authentication
- **stdio Protocol**: JSON-RPC 2.0 over stdin/stdout (no HTTP)
- **OAuth Login**: `framingui-mcp login` for browser-based authentication
- **whoami**: Mandatory first call every session

## Quick Reference

```bash
# Install & setup
npx @framingui/mcp-server init

# Authenticate
npx @framingui/mcp-server login

# Check status
npx @framingui/mcp-server status
```

## Version History

| Date       | Version | Changes                                                        |
| ---------- | ------- | -------------------------------------------------------------- |
| 2026-02-16 | 0.4.5   | Documentation updated: 17 tools, OAuth auth, 6 themes, English |
| 2026-01-25 | 0.1.0   | Initial documentation                                          |

---

**Package**: [@framingui/mcp-server](../../README.md) | **Spec**: [SPEC-MCP-002](../../.moai/specs/SPEC-MCP-002/spec.md)
