# SPEC-MCP-009 Implementation Report

## Delivered

- Added a shared entitlement normalization layer in `packages/playground-web/lib/mcp/theme-entitlements.ts`.
- Normalized MCP `licensedThemes` in both:
  - `/api/mcp/verify`
  - `authenticateMcpRequest()`
- Added degraded handling for legacy placeholder licenses such as `default`.
- Preserved explicit all-access behavior for:
  - `trial-all-access`
  - `creator-all-access`
- Hardened Paddle webhook behavior:
  - creator purchases without `theme_id` now store `creator-all-access`
  - single and double purchases without `theme_id` now fail with `400`

## Validation

- `pnpm exec vitest run __tests__/api/mcp-verify-canonicalization.test.ts __tests__/lib/mcp-theme-entitlements.test.ts __tests__/api/paddle-webhook.test.ts __tests__/api/mcp/themes-css.test.ts`
- `pnpm exec tsc --project tsconfig.typecheck.json --noEmit` in `packages/playground-web`
- `pnpm build` in `packages/playground-web`
- `pnpm build` in `packages/core`
- `pnpm build` in `packages/tokens`
- `pnpm build` in `packages/mcp-server`

## Auth Audit Result

Main confirmed root cause:

- MCP auth used raw stored `user_licenses.theme_id` values while theme APIs used canonical current catalog ids.

Additional auth-adjacent defect fixed:

- Paddle webhook wrote `theme_id: "default"` for creator or malformed purchases.

## Remaining Risk

- Historical `default` licenses do not preserve the original user selection for old double purchases. The runtime fix restores usable access by expanding that placeholder to canonical current themes, but a data repair migration is still recommended if exact historical entitlements must be reconstructed.
