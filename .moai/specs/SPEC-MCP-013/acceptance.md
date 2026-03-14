# Acceptance

## TASK-001

- A project-context detection tool exists.
- The tool can detect `web`, `expo`, and `react-native` from a project path.
- The response includes `platform`, `runtime`, and `packageManager`.

## TASK-002

- `get-screen-generation-context` uses detected session defaults when `platform` is omitted.
- `list-components` uses detected session defaults when `platform` is omitted.
- `preview-component` uses detected session defaults when `platform` is omitted.
- Explicit platform inputs override detected defaults.
- No-session behavior remains backward compatible.

## TASK-003

- Generated guidance recommends project-context detection when a project path is available.
- RN/Expo guidance no longer depends on repeated manual platform flags.
- README and bootstrap guidance describe the new detection-first path.

## Final Acceptance

- All task-level validations pass.
- `pnpm --filter @framingui/mcp-server test` passes.
- `pnpm --filter @framingui/mcp-server typecheck` passes.
- `pnpm --filter @framingui/mcp-server build` passes.

## Validation Record

- TASK-001 validation passed:
  - `pnpm --filter @framingui/mcp-server exec vitest run __tests__/tools/detect-project-context.test.ts`
  - `pnpm --filter @framingui/mcp-server typecheck`
- TASK-002 validation passed:
  - `pnpm --filter @framingui/mcp-server exec vitest run __tests__/tools/project-context-defaults.test.ts`
  - `pnpm --filter @framingui/mcp-server typecheck`
- TASK-003 validation passed:
  - `pnpm --filter @framingui/mcp-server exec vitest run __tests__/tools/project-context-guidance.test.ts __tests__/tools/screen-workflow-prompt.test.ts __tests__/tools/init-bootstrap.test.ts __tests__/tools/auth-bootstrap.test.ts`
  - `pnpm --filter @framingui/mcp-server typecheck`
- Final validation passed:
  - `pnpm --filter @framingui/mcp-server test`
  - `pnpm --filter @framingui/mcp-server typecheck`
  - `pnpm --filter @framingui/mcp-server build`
