# SPEC-MCP-009: MCP Theme Entitlement Canonicalization

## Overview

| Field | Value |
|-------|-------|
| **SPEC ID** | SPEC-MCP-009 |
| **Title** | MCP Theme Entitlement Canonicalization |
| **Status** | ✅ Completed |
| **Priority** | Critical |
| **Created** | 2026-03-07 |
| **Author** | Codex + soo-kate-yeon |
| **Dependencies** | SPEC-MCP-008, SPEC-DEPLOY-001 |

## Problem

Real MCP usage still fails after successful login because authentication and theme inventory do not speak the same theme-id contract.

Observed production mismatch:

- `/api/mcp/verify` can return `licensedThemes: ["default"]`
- `/api/mcp/themes` returns zero themes
- `/api/mcp/themes/default` returns `404`

Root causes:

1. Stored license `theme_id` values are exposed directly to MCP auth responses.
2. Some stored values are synthetic or legacy placeholders, including `trial-all-access` and `default`.
3. Paddle webhook falls back to `default` when `theme_id` is missing, corrupting creator and misconfigured purchases.
4. Theme APIs authorize against canonical catalog ids only.

## Goals

| # | Goal | Success Criteria |
|---|------|------------------|
| G1 | Normalize stored license ids to canonical MCP theme ids | `verify`, `authenticateMcpRequest`, and theme APIs return matching access |
| G2 | Preserve intentional all-access licenses | `trial-all-access` and creator-style all-access licenses expand to all catalog themes |
| G3 | Stop writing invalid placeholder theme ids | Paddle webhook rejects missing theme ids for scoped purchases and stores canonical all-access ids for creator |
| G4 | Add regression coverage for entitlement drift | Legacy placeholder ids cannot silently break `list-themes`/`preview-theme` again |

## Requirements

- The system SHALL derive MCP `licensedThemes` from a shared normalization layer, not raw `user_licenses.theme_id` values.
- The system SHALL treat known all-access license ids as access to every canonical theme id.
- The system SHALL treat legacy placeholder theme ids as degraded legacy entitlements and map them to a non-empty canonical access set.
- The system SHALL expose identical canonical theme ids through `/api/mcp/verify` and `authenticateMcpRequest()`.
- The Paddle webhook SHALL NOT persist `theme_id: "default"` for new purchases.
- The Paddle webhook SHALL reject missing `theme_id` for `single` and `double` purchases.
- The Paddle webhook SHALL persist an explicit all-access theme id for creator purchases.

## Implementation Notes

- Add shared normalization helpers under `packages/playground-web/lib/mcp/`.
- Keep `user_licenses.theme_id` raw for storage/history, but normalize before auth responses.
- Log degraded legacy mappings so corrupted historical rows can be repaired later.
- Update MCP-facing docs to explain that `licensedThemes` always contains canonical current theme ids.
