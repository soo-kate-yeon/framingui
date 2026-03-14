---
id: SPEC-MCP-013
version: "1.0.0"
status: "complete"
created: "2026-03-14"
updated: "2026-03-14"
author: "Codex"
---

# Plan

## Phase 1: Detection Contract

1. Add a dedicated project-context detection tool and schemas.
2. Define session-default data shape and precedence rules.
3. Cover Expo / React Native / web detection behavior.

## Phase 2: Default Propagation

1. Add shared platform resolution helper.
2. Apply it to discovery and context tools.
3. Preserve explicit override semantics.

## Phase 3: Guidance and Bootstrap

1. Update generated guides and templates.
2. Update README and init recommendations.
3. Run full validation and record completion.

## Sequencing Rules

1. Complete one task at a time.
2. Run that task's tests before moving forward.
3. Commit after each successful task.

## Completion Summary

1. Phase 1 completed and committed as `feat(mcp): add project context detection`
2. Phase 2 completed and committed as `feat(mcp): apply project context defaults`
3. Phase 3 completed and committed as `docs(mcp): add detection-first project guidance`
4. Final validation executed after documentation sync
