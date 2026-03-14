---
id: SPEC-MCP-012
version: "1.0.0"
status: "complete"
created: "2026-03-14"
updated: "2026-03-14"
author: "Codex"
---

# Plan

## Phase 1: Contract Layer

1. Add a React Native direct-write contract module inside `@framingui/mcp-server`.
2. Define supported component set, avoided component set, dependency hints, and audit rules.
3. Extend MCP schemas with platform-aware input/output fields used by later tasks.

## Phase 2: Tooling

1. Update component discovery tools to accept `platform`.
2. Update screen generation context to emit React Native workflow steps, notes, and starter guidance.
3. Update environment validation to detect Expo/bare React Native and audit source files.

## Phase 3: Guidance

1. Update workflow prompts and generated agent templates.
2. Update README to describe React Native direct-write support.
3. Run final package validation and record completion.

## Task Sequencing Rules

1. Finish one task completely.
2. Run that task's validation commands.
3. Commit immediately after validation passes.
4. Only then start the next task.
