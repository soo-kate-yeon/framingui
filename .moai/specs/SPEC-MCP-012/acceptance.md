# Acceptance

## TASK-001

- `platform=react-native` is accepted by the relevant MCP input schemas.
- A dedicated React Native contract source exists and can answer:
  - supported components
  - unsupported components
  - recommended dependency packages
  - direct-write audit patterns
- Contract tests pass.

## TASK-002

- `list-components` can return React Native platform compatibility metadata.
- `preview-component` can return React Native-specific guidance.
- `get-screen-generation-context` can return a React Native workflow that:
  - uses direct write
  - does not require `@framingui/ui`
  - does not require Tailwind or CSS imports
  - recommends React Native primitives or host app abstractions

## TASK-003

- `validate-environment` identifies:
  - `expo`
  - `react-native`
  - `web`
- React Native validation no longer emits Tailwind errors by default.
- Source-file audit findings include:
  - hardcoded hex/rgb colors
  - hardcoded spacing/radius values
  - web-only style patterns like `className` in React Native target files
- Findings include actionable fix guidance.

## TASK-004

- `screen-workflow` prompt documents both web and React Native direct-write paths.
- Generated `AGENTS.md` / `CLAUDE.md` sections include React Native guidance.
- Root README states that React Native is supported through direct-write workflow and validation, not through the current web component runtime.

## Final Acceptance

- All task-level validations pass.
- `pnpm --filter @framingui/mcp-server test` passes.
- `pnpm --filter @framingui/mcp-server typecheck` passes.
- `pnpm --filter @framingui/mcp-server build` passes.
