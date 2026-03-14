---
id: SPEC-RN-002
document: plan
version: "1.0.0"
created: "2026-03-14"
updated: "2026-03-14"
author: Codex
---

# SPEC-RN-002: Implementation Plan

## Sequencing Rules

1. Complete one task at a time.
2. Run that task's required validation before starting the next task.
3. Commit after each successful task.
4. Record the validation result in both the task issue and the SPEC acceptance file.
5. Do not widen the component surface early; stay inside the planned task boundary.

## Task Order

1. TASK-001: Theme Runtime Foundation
2. TASK-002: Layout Token Expansion
3. TASK-003: Higher-Level Layout Primitives
4. TASK-004: Core Interaction and Form Surface
5. TASK-005: Data, Feedback, and Navigation Surface
6. TASK-006: MCP Parity and Validation Integration

## Issue Mapping

- Umbrella issue: `#90`
- TASK-001 issue: `#91`
- TASK-002 issue: `#92`
- TASK-003 issue: `#93`
- TASK-004 issue: `#94`
- TASK-005 issue: `#95`
- TASK-006 issue: `#96`

## WBS Summary

| Task | Scope | Exit Gate |
|------|-------|-----------|
| TASK-001 | Theme runtime and provider | Theme switching proven by automated tests |
| TASK-002 | Layout tokens and helpers | Layout rhythm expressed without raw literals |
| TASK-003 | Higher-level layout primitives | Common screen structures reusable without app-local shells |
| TASK-004 | Core interaction and form surface | Core state variants test-covered |
| TASK-005 | Data, feedback, and navigation surface | 80/20 component target materially reached |
| TASK-006 | MCP parity and validation | MCP and runtime validations pass together |

## Tracking Rule

Each GitHub issue must contain:

- deliverables
- required validation commands
- explicit definition of done
- a note that the issue blocks downstream tasks until validation passes
