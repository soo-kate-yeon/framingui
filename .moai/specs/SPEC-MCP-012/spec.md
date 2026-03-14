---
id: SPEC-MCP-012
version: "1.0.0"
status: "complete"
created: "2026-03-14"
updated: "2026-03-14"
author: "Codex + soo-kate-yeon"
priority: "high"
---

# SPEC-MCP-012: React Native Direct-Write Workflow Support

## Summary

FramingUI already provides a guarded direct-write workflow for web React projects, but the MCP workflow, environment validation, and generated project guidance still assume a web-only runtime. React Native users can reuse tokens and contracts conceptually, yet the current toolchain does not provide React Native specific component guidance, environment checks, or delivery rules.

This SPEC adds first-class React Native direct-write support without introducing a new runtime renderer. The scope is to make FramingUI useful as an agentic design system for Expo and bare React Native projects that still write app code directly.

## Problem

Current gaps:

- component discovery is not platform-aware
- screen-generation context assumes React web output and Tailwind-centric validation
- `validate-environment` only validates web/Tailwind integrations
- generated `AGENTS.md` and workflow prompts tell agents to write React web code
- React Native users lack a built-in QC path for token drift and raw style escapes

The result is that FramingUI looks web-only even when its higher-level value proposition should also apply to React Native direct-write workflows.

## Goals

- Add an explicit React Native target to the MCP direct-write workflow.
- Surface React Native-safe component guidance during discovery.
- Add React Native environment and source audit checks to `validate-environment`.
- Update generated guidance so agents can follow a React Native direct-write workflow without inventing one ad hoc.
- Keep FramingUI stack-agnostic by avoiding a mandatory React Native styling runtime.

## Non-Goals

- Building a React Native renderer or code generator
- Shipping a React Native component runtime package in this SPEC
- Introducing Tamagui, NativeWind, or another styling framework
- Reworking layout token schemas to model native navigation containers
- Adding Storybook or accessibility automation for React Native in this pass

## User Value

FramingUI should be able to say:

1. Use MCP to discover component contracts and token constraints.
2. Write Expo/React Native code directly.
3. Run FramingUI validation to catch missing packages and style drift before handoff.

That keeps the agentic design system value in the contract and QC layer instead of tying the product to a specific runtime.

## EARS Requirements

### Ubiquitous

- The MCP server SHALL accept `react-native` as an explicit target platform for direct-write workflows.
- The MCP server SHALL provide React Native guidance without requiring Tailwind or CSS imports.
- The MCP server SHALL preserve existing web behavior when no React Native target is requested.

### Event-Driven

- WHEN an agent asks for component discovery with `platform=react-native` THEN the response SHALL include React Native compatibility guidance.
- WHEN an agent asks for screen generation context with `platform=react-native` THEN the workflow SHALL describe direct writing React Native code instead of React web code.
- WHEN `validate-environment` runs against an Expo or React Native project THEN the tool SHALL report React Native environment information and SHALL NOT require Tailwind checks by default.
- WHEN `validate-environment` receives React Native source files THEN it SHALL audit those files for raw hardcoded design values and platform-drift patterns defined by this SPEC.

### State-Driven

- IF the target platform is `web` THEN existing web contracts, Tailwind validation, and guidance SHALL remain available.
- IF the target platform is `react-native` AND the project is Expo-based THEN the environment result SHALL identify Expo as the runtime.
- IF the target platform is `react-native` AND the project is bare React Native THEN the environment result SHALL identify bare React Native as the runtime.

### Unwanted

- The system SHALL NOT recommend `@framingui/ui` imports for React Native targets.
- The system SHALL NOT require Tamagui, NativeWind, or CSS imports for React Native direct-write support.
- The system SHALL NOT tell React Native users to validate Tailwind unless they explicitly request web-style checks.

## Implementation Scope

### In Scope

- React Native platform contract overlay for component discovery
- MCP schema extensions for `platform` and source-audit inputs
- React Native aware `list-components`, `preview-component`, `get-screen-generation-context`
- React Native aware `validate-environment` with Expo/bare detection and source-file audit
- Prompt, guide template, and README updates for React Native direct-write workflow
- Automated tests covering all new platform-aware logic

### Deferred

- React Native screen-definition schema or native layout renderer
- Cross-platform component runtime parity
- Automatic code export for React Native
- Design token runtime helpers for React Native apps

## Task Breakdown

### TASK-001: Define React Native workflow contract

Deliverables:

- React Native platform contract metadata in `@framingui/mcp-server`
- MCP schema updates for platform-aware discovery/context/validation
- SPEC artifacts for implementation and acceptance

Validation commands:

- `pnpm --filter @framingui/mcp-server typecheck`
- `pnpm --filter @framingui/mcp-server test -- --runInBand src/__tests__/react-native-contract.test.ts`

Success conditions:

- Schemas accept `platform=react-native`
- Local contract metadata exists for React Native compatible components and direct-write rules
- Tests prove the contract layer can distinguish web vs React Native guidance

### TASK-002: Make discovery and context tools React Native aware

Deliverables:

- React Native filtering/enrichment in `list-components`
- React Native guidance in `preview-component`
- React Native direct-write workflow in `get-screen-generation-context`

Validation commands:

- `pnpm --filter @framingui/mcp-server test -- --runInBand src/__tests__/list-components.react-native.test.ts src/__tests__/preview-component.react-native.test.ts src/__tests__/get-screen-generation-context.react-native.test.ts`
- `pnpm --filter @framingui/mcp-server typecheck`

Success conditions:

- Component discovery can be requested for React Native explicitly
- Preview output warns when a component is unsuitable for React Native direct writing
- Screen generation context stops instructing React Native users to write React web code or import `@framingui/ui`

### TASK-003: Add React Native environment validation and QC

Deliverables:

- React Native project detection in `validate-environment`
- Expo vs bare runtime identification
- Source file audit for raw hardcoded style drift in React Native files

Validation commands:

- `pnpm --filter @framingui/mcp-server test -- --runInBand src/__tests__/validate-environment.react-native.test.ts`
- `pnpm --filter @framingui/mcp-server typecheck`

Success conditions:

- Expo and bare React Native projects are detected correctly
- Tailwind checks are skipped by default for React Native targets
- Source audits surface actionable findings for hardcoded colors, spacing, radius, and unsupported web-only patterns

### TASK-004: Ship React Native direct-write guidance

Deliverables:

- Updated MCP workflow prompt
- Updated `CLAUDE.md` / `AGENTS.md` templates
- README updates describing React Native direct-write support

Validation commands:

- `pnpm --filter @framingui/mcp-server test`
- `pnpm --filter @framingui/mcp-server typecheck`

Success conditions:

- Generated guidance includes a React Native-specific direct-write path
- Documentation no longer presents FramingUI as web-only for direct-write workflows
- Existing web documentation remains accurate

## Full Completion Criteria

- All four tasks completed in order
- Each task committed after its validation passes
- `pnpm --filter @framingui/mcp-server test`
- `pnpm --filter @framingui/mcp-server typecheck`
- `pnpm --filter @framingui/mcp-server build`

## Affected Areas

- `.moai/specs/SPEC-MCP-012/*`
- `README.md`
- `packages/mcp-server/src/schemas/mcp-schemas.ts`
- `packages/mcp-server/src/tools/*`
- `packages/mcp-server/src/prompts/screen-workflow.ts`
- `packages/mcp-server/src/cli/agent-md-templates.ts`
- `packages/mcp-server/src/__tests__/*`
