# SPEC-MCP-009 Plan

1. Add a shared entitlement normalization helper for canonical theme ids.
2. Add regression tests for:
   - legacy `default` license expansion
   - `trial-all-access` expansion
   - creator webhook without `theme_id`
   - scoped webhook purchases without `theme_id`
3. Wire normalization into `/api/mcp/verify` and `authenticateMcpRequest()`.
4. Harden `/api/webhooks/paddle` to stop writing invalid placeholder theme ids.
5. Sync MCP docs and summarize residual auth risks.
