---
spec-id: SPEC-LAYOUT-001
version: "1.0.0"
created: "2026-01-21"
---

# SPEC-LAYOUT-001: Implementation Plan

## Overview

This plan outlines the implementation strategy for the Layout Grid System feature, organized into 4 milestones with clear deliverables and dependencies.

---

## Milestone Summary

| Milestone | Priority | Description | Layer |
|-----------|----------|-------------|-------|
| M1 | Primary Goal | Breakpoint and Grid Constants | Layer 1 (Theme) |
| M2 | Primary Goal | Blueprint Layout Schema Extension | Layer 3 (Generator) |
| M3 | Primary Goal | renderScreen Layout Integration | Layer 3 (MCP) |
| M4 | Secondary Goal | Testing and Documentation | Cross-Layer |

---

## M1: Breakpoint and Grid Constants (Layer 1)

### Goal

Define Tailwind CSS breakpoint constants and grid system defaults in the theme package.

### Tasks

**TASK-001**: Create `packages/theme/src/breakpoints.ts`
- Define BREAKPOINTS constant matching Tailwind defaults
- Export Breakpoint type
- Implement minWidth and maxWidth helper functions
- Dependencies: None

**TASK-002**: Create `packages/theme/src/grid-defaults.ts`
- Define GRID_DEFAULTS record with GridSystem per breakpoint
- Define ENVIRONMENT_GRID_PRESETS mapping
- Ensure compatibility with existing GridSystem interface from contracts
- Dependencies: TASK-001, `@tekton/contracts` GridSystem type

**TASK-003**: Update `packages/theme/src/index.ts`
- Export all new constants and types
- Maintain backward compatibility
- Dependencies: TASK-001, TASK-002

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `packages/theme/src/breakpoints.ts` | CREATE | Breakpoint constants |
| `packages/theme/src/grid-defaults.ts` | CREATE | Grid system defaults |
| `packages/theme/src/index.ts` | MODIFY | Export aggregation |

### Success Criteria

- All breakpoint values match Tailwind CSS v3.4 defaults
- GridSystem values are sensible for each breakpoint
- Types are exported and usable from other packages
- Unit tests pass with 100% coverage

---

## M2: Blueprint Layout Schema Extension (Layer 3)

### Goal

Extend the Blueprint JSON schema to support layout configuration.

### Tasks

**TASK-004**: Define BlueprintLayout interface
- Add BlueprintLayout to `knowledge-schema.ts`
- Include container, maxWidth, padding, grid, gap fields
- All fields optional for backward compatibility
- Dependencies: None

**TASK-005**: Define BlueprintResultV2 interface
- Extend BlueprintResult with layout and environment fields
- Maintain backward compatibility with existing BlueprintResult
- Dependencies: TASK-004

**TASK-006**: Create Zod validation schema for BlueprintLayout
- Validate all layout fields with appropriate constraints
- Grid columns: 1-12 range
- Gap values: Tailwind spacing scale (0-96)
- Dependencies: TASK-004

**TASK-007**: Update BlueprintResultSchema JSON Schema
- Add layout definition to JSON Schema export
- Update schema version
- Dependencies: TASK-004, TASK-005

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `packages/component-generator/src/types/knowledge-schema.ts` | MODIFY | Add layout types |
| `packages/component-generator/src/types/layout-schema.ts` | CREATE | Zod validation |
| `packages/component-generator/src/index.ts` | MODIFY | Export new types |

### Success Criteria

- BlueprintLayout interface fully typed
- Zod schema validates all edge cases
- JSON Schema export includes layout definition
- Existing Blueprint JSON still validates (backward compatible)

---

## M3: renderScreen Layout Integration (Layer 3)

### Goal

Integrate layout configuration into renderScreen MCP tool to generate Tailwind CSS classes.

### Tasks

**TASK-008**: Create layout class generator
- Implement generateLayoutClasses function
- Handle container, maxWidth, padding configuration
- Generate responsive grid-cols classes
- Generate gap classes (number and object)
- Apply environment-based defaults when layout not specified
- Dependencies: M1 (TASK-001, TASK-002)

**TASK-009**: Integrate layout generator into JSXGenerator
- Modify buildComponentNode to accept layout context
- Apply layout classes to root element
- Preserve existing slot processing logic
- Dependencies: TASK-008

**TASK-010**: Update renderScreen in layer3-tools.ts
- Parse layout from Blueprint
- Pass layout to JSXGenerator
- Handle BlueprintResultV2 with backward compatibility
- Dependencies: TASK-009, M2

**TASK-011**: Update get-knowledge-schema response
- Include layout configuration examples
- Update instructions for LLM
- Dependencies: M2

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `packages/component-generator/src/generator/layout-class-generator.ts` | CREATE | Layout class generation |
| `packages/component-generator/src/generator/jsx-generator.ts` | MODIFY | Integrate layout |
| `packages/studio-mcp/src/component/layer3-tools.ts` | MODIFY | renderScreen integration |

### Success Criteria

- generateLayoutClasses produces valid Tailwind classes
- renderScreen applies layout to generated code
- Generated code compiles without TypeScript errors
- All Tailwind classes are valid (safelist not required for standard classes)

---

## M4: Testing and Documentation (Cross-Layer)

### Goal

Ensure comprehensive test coverage and documentation for the Layout Grid System.

### Tasks

**TASK-012**: Write unit tests for breakpoints module
- Test BREAKPOINTS values
- Test minWidth/maxWidth helpers
- Target: 100% coverage
- Dependencies: M1

**TASK-013**: Write unit tests for grid-defaults module
- Test GRID_DEFAULTS values
- Test ENVIRONMENT_GRID_PRESETS mapping
- Target: 100% coverage
- Dependencies: M1

**TASK-014**: Write unit tests for layout-class-generator
- Test container class generation
- Test responsive grid classes
- Test gap classes (number and object)
- Test default values when config missing
- Target: 100% coverage
- Dependencies: M3

**TASK-015**: Write integration tests for renderScreen with layout
- Test Blueprint with layout configuration
- Test Blueprint without layout (defaults)
- Test backward compatibility with existing Blueprints
- Target: Full integration coverage
- Dependencies: M3

**TASK-016**: Update API documentation
- Document BlueprintLayout interface
- Document grid defaults table
- Add usage examples
- Dependencies: M1, M2, M3

### Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `packages/theme/tests/breakpoints.test.ts` | CREATE | Breakpoint tests |
| `packages/theme/tests/grid-defaults.test.ts` | CREATE | Grid defaults tests |
| `packages/component-generator/tests/layout-class-generator.test.ts` | CREATE | Layout tests |
| `packages/studio-mcp/tests/render-screen-layout.test.ts` | CREATE | Integration tests |

### Success Criteria

- Overall test coverage >= 85%
- All new modules have 100% coverage
- Integration tests pass
- Documentation complete and accurate

---

## Technical Architecture

### Dependency Graph

```
M1: Layer 1 (Theme)
  ├── TASK-001: breakpoints.ts
  │   └── TASK-002: grid-defaults.ts
  │       └── TASK-003: index.ts (export)

M2: Layer 3 Schema (Component Generator)
  ├── TASK-004: BlueprintLayout interface
  │   ├── TASK-005: BlueprintResultV2
  │   ├── TASK-006: Zod schema
  │   └── TASK-007: JSON Schema

M3: Layer 3 Integration (MCP)
  ├── TASK-008: layout-class-generator.ts
  │   ├── TASK-009: jsx-generator.ts integration
  │   │   └── TASK-010: renderScreen integration
  │   └── TASK-011: get-knowledge-schema update

M4: Testing
  ├── TASK-012: breakpoints tests
  ├── TASK-013: grid-defaults tests
  ├── TASK-014: layout-class-generator tests
  ├── TASK-015: integration tests
  └── TASK-016: documentation
```

### Package Dependencies

```
@tekton/theme (Layer 1)
  └── exports: BREAKPOINTS, GRID_DEFAULTS, ENVIRONMENT_GRID_PRESETS

@tekton/contracts (Existing)
  └── exports: GridSystem, Environment

@tekton/component-generator (Layer 3)
  ├── imports: GRID_DEFAULTS from @tekton/theme
  ├── imports: GridSystem from @tekton/contracts
  └── exports: BlueprintLayout, BlueprintResultV2, generateLayoutClasses

@tekton/studio-mcp (Layer 3)
  ├── imports: generateLayoutClasses from @tekton/component-generator
  └── modifies: renderScreen, getKnowledgeSchema
```

---

## Risk Assessment

### Technical Risks

**Risk-001**: Tailwind class detection may fail for dynamic classes
- Mitigation: Use complete class names only (no string concatenation)
- Fallback: Add classes to Tailwind safelist if needed

**Risk-002**: Performance impact from class generation
- Mitigation: Classes generated at build time, not runtime
- Monitoring: Benchmark renderScreen performance

**Risk-003**: Breaking changes to existing Blueprint consumers
- Mitigation: All new fields are optional, maintain BlueprintResult compatibility

### Integration Risks

**Risk-004**: Environment type mismatch between contracts and theme
- Mitigation: Import Environment type from @tekton/contracts
- Validation: TypeScript will catch type mismatches

---

## Implementation Order

### Recommended Execution Sequence

1. **M1 Complete First** - Foundation for all other work
2. **M2 in Parallel** - Can start after M1 types are defined
3. **M3 After M1 + M2** - Depends on both grid defaults and schema
4. **M4 Throughout** - Tests written alongside implementation

### Critical Path

```
M1 (TASK-001 → TASK-002 → TASK-003)
    ↓
M3 (TASK-008 → TASK-009 → TASK-010)
    ↓
M4 (TASK-014, TASK-015)
```

---

## Traceability

**TAG**: SPEC-LAYOUT-001

**Related Tasks**:
- TASK-001 through TASK-016

**Test Files**:
- `packages/theme/tests/breakpoints.test.ts`
- `packages/theme/tests/grid-defaults.test.ts`
- `packages/component-generator/tests/layout-class-generator.test.ts`
- `packages/studio-mcp/tests/render-screen-layout.test.ts`

---

**END OF PLAN**
