---
id: SPEC-LAYER2-001
version: "1.0.0"
status: "draft"
created: "2026-01-19"
updated: "2026-01-19"
author: "asleep"
priority: "high"
---

# HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-19 | asleep | Initial SPEC creation for Component Token Binding System |

---

# SPEC-LAYER2-001: Component Token Binding System

## 1. Overview

### 1.1 Purpose
The Component Token Binding System maps design tokens from Layer 1 to the 20 core React hooks (Button, Input, Card, etc.), ensuring complete state/variant coverage and creating TypeScript schemas for token-to-component bindings. This layer bridges abstract tokens and concrete UI component APIs.

### 1.2 Scope
- Token-to-component mapping for 20 core hooks
- State/variant coverage (default, hover, focus, active, disabled)
- TypeScript schema generation for type-safe bindings
- CSS-in-JS binding generation (CSS variables to component props)
- Token reference validation (ensure all tokens exist in Layer 1)
- State completeness verification (all states have token bindings)

### 1.3 Dependencies
- **SPEC-LAYER1-001**: Token Generator Engine (REQUIRED - must be complete before implementation)
- **External Libraries**:
  - `zod` (^3.23.0) - TypeScript schema generation and validation
  - `@stitches/core` (^1.2.8) or `vanilla-extract` (^1.16.0) - CSS-in-JS bindings

---

## 2. Environment

### 2.1 Technical Environment
- **Runtime**: Node.js 20+ / Browser (ES2022+)
- **Language**: TypeScript 5.9+
- **Build System**: Turbo (existing monorepo setup)
- **Package Manager**: npm (existing project standard)

### 2.2 Integration Points
- **Input**: Token metadata from SPEC-LAYER1-001 (JSON format)
- **Output**:
  - TypeScript schemas (`.types.ts` files)
  - CSS-in-JS binding files (`.styles.ts` files)
  - Token mapping documentation (Markdown)

---

## 3. Assumptions

### 3.1 Technical Assumptions
- **ASSUMPTION-001**: The 20 core hooks are already defined in the codebase
  - **Confidence**: High - Existing hooks visible in project
  - **Evidence**: Project structure analysis
  - **Risk if Wrong**: Hook list needs adjustment
  - **Validation**: Review existing hooks during implementation

- **ASSUMPTION-002**: All component states follow a consistent pattern (default, hover, focus, active, disabled)
  - **Confidence**: High - Standard web interaction states
  - **Evidence**: HTML/CSS standard interaction states
  - **Risk if Wrong**: Additional states may be required per component
  - **Validation**: Component audit during schema generation

- **ASSUMPTION-003**: TypeScript schemas can be generated programmatically from token metadata
  - **Confidence**: High - Zod supports programmatic schema generation
  - **Evidence**: Zod documentation and examples
  - **Risk if Wrong**: Manual schema authoring required
  - **Validation**: Proof-of-concept during Milestone 1

### 3.2 Business Assumptions
- **ASSUMPTION-004**: Consistent token bindings improve design system maintainability
  - **Confidence**: High - Industry best practice (Material UI, Chakra UI)
  - **Evidence**: Design system literature and case studies
  - **Risk if Wrong**: Custom bindings may be preferred for flexibility
  - **Validation**: User feedback during testing

---

## 4. Requirements

### 4.1 Ubiquitous Requirements (Always Active)

**REQ-LAYER2-001**: The Component Token Binding System shall always validate that all referenced tokens exist in Layer 1 metadata
- **Rationale**: Prevent runtime errors from missing tokens
- **Acceptance**: 100% of token references validated before binding generation

**REQ-LAYER2-002**: The system shall always generate type-safe TypeScript schemas using Zod for all component bindings
- **Rationale**: Type safety prevents integration errors
- **Acceptance**: All bindings have corresponding Zod schemas

**REQ-LAYER2-003**: The system shall always ensure complete state coverage for all 20 core hooks (default, hover, focus, active, disabled)
- **Rationale**: Incomplete state coverage creates UX inconsistencies
- **Acceptance**: All hooks have bindings for all 5 states

**REQ-LAYER2-004**: The system shall always generate CSS-in-JS bindings that reference Layer 1 CSS variables
- **Rationale**: Single source of truth for token values
- **Acceptance**: All bindings use `var(--token-name)` references

### 4.2 Event-Driven Requirements (User/System Triggers)

**REQ-LAYER2-005**: WHEN a token mapping is defined, THEN the system shall validate the token exists in Layer 1 metadata
- **Rationale**: Early validation prevents broken references
- **Acceptance**: Non-existent tokens trigger validation errors

**REQ-LAYER2-006**: WHEN a component schema is generated, THEN the system shall include all state variants
- **Rationale**: Completeness ensures no missing states
- **Acceptance**: Generated schemas contain all 5 states

**REQ-LAYER2-007**: WHEN CSS-in-JS bindings are generated, THEN the system shall produce importable TypeScript modules
- **Rationale**: Enable tree-shaking and type-safe imports
- **Acceptance**: Generated files are valid TypeScript modules

**REQ-LAYER2-008**: WHEN token references change in Layer 1, THEN the system shall detect and regenerate affected bindings
- **Rationale**: Automatic synchronization prevents stale bindings
- **Acceptance**: Binding regeneration triggered by Layer 1 changes

### 4.3 State-Driven Requirements (Conditional Behavior)

**REQ-LAYER2-009**: IF a component requires additional custom states beyond the standard 5, THEN the system shall support custom state definitions
- **Rationale**: Flexibility for complex components (e.g., Switch with intermediate state)
- **Acceptance**: Custom states can be added to schema without breaking validation

**REQ-LAYER2-010**: IF a token reference is invalid, THEN the system shall log a detailed error with suggested alternatives
- **Rationale**: Helpful error messages improve developer experience
- **Acceptance**: Error messages include token name, component, and suggestions

**REQ-LAYER2-011**: IF CSS-in-JS library preference changes (Stitches vs Vanilla Extract), THEN the system shall generate bindings in the correct format
- **Rationale**: Support multiple CSS-in-JS frameworks
- **Acceptance**: Bindings work with both Stitches and Vanilla Extract

### 4.4 Unwanted Behaviors (Prohibited Actions)

**REQ-LAYER2-012**: The system shall NOT generate bindings that hardcode token values (must reference CSS variables)
- **Rationale**: Hardcoded values break dynamic theming
- **Acceptance**: Zero hardcoded color/size values in generated bindings

**REQ-LAYER2-013**: The system shall NOT allow incomplete state coverage (missing states) in generated schemas
- **Rationale**: Incomplete coverage creates UX bugs
- **Acceptance**: Schema generation fails if any state is missing

**REQ-LAYER2-014**: The system shall NOT modify Layer 1 token metadata
- **Rationale**: Layer 1 is the source of truth
- **Acceptance**: Zero write operations to Layer 1 files

### 4.5 Optional Requirements (Nice-to-Have)

**REQ-LAYER2-015**: Where possible, the system should generate visual documentation showing token-to-component mappings
- **Rationale**: Improved design system documentation
- **Acceptance**: Markdown tables or HTML previews generated

**REQ-LAYER2-016**: Where feasible, the system should provide migration scripts for updating existing component implementations
- **Rationale**: Ease adoption of new binding system
- **Acceptance**: Migration script updates 80%+ of components automatically

---

## 5. Technical Specifications

### 5.1 Core Architecture

**Binding Pipeline**:
```
Layer 1 Tokens → Token Validator → Component Mapper → Schema Generator → CSS-in-JS Generator → Output
```

**Module Structure**:
```
packages/studio-token-binding/
├── src/
│   ├── validator/
│   │   ├── token-validator.ts       # Validate tokens exist
│   │   └── state-completeness.ts    # Verify all states covered
│   ├── mapper/
│   │   ├── component-mapper.ts      # Map tokens to components
│   │   └── mapping-registry.ts      # Central mapping definitions
│   ├── schema/
│   │   ├── zod-schema-generator.ts  # Generate Zod schemas
│   │   └── typescript-types.ts      # TypeScript type generation
│   ├── css-in-js/
│   │   ├── stitches-generator.ts    # Stitches binding generation
│   │   ├── vanilla-extract-gen.ts   # Vanilla Extract generation
│   │   └── css-variable-refs.ts     # CSS variable reference utilities
│   └── types/
│       ├── component.types.ts       # Component hook types
│       └── binding.types.ts         # Binding configuration types
├── tests/
│   ├── validator.test.ts
│   ├── mapper.test.ts
│   ├── schema-generator.test.ts
│   └── css-in-js.test.ts
└── package.json
```

### 5.2 Token Mapping Schema

**Component Mapping Definition**:
```typescript
interface ComponentTokenMapping {
  component: string; // e.g., "Button"
  states: {
    default: TokenBindings;
    hover: TokenBindings;
    focus: TokenBindings;
    active: TokenBindings;
    disabled: TokenBindings;
  };
  variants?: {
    [variantName: string]: StateTokenBindings;
  };
}

interface TokenBindings {
  backgroundColor: string; // Token name reference
  color: string;
  borderColor?: string;
  boxShadow?: string;
  // ... other CSS properties
}
```

**Example Mapping**:
```typescript
const ButtonMapping: ComponentTokenMapping = {
  component: "Button",
  states: {
    default: {
      backgroundColor: "color-primary",
      color: "color-text-on-primary",
      borderColor: "color-border",
    },
    hover: {
      backgroundColor: "color-primary-hover",
      color: "color-text-on-primary",
      borderColor: "color-border",
    },
    focus: {
      backgroundColor: "color-primary",
      color: "color-text-on-primary",
      borderColor: "color-focus-ring",
      boxShadow: "shadow-focus",
    },
    active: {
      backgroundColor: "color-primary-active",
      color: "color-text-on-primary",
      borderColor: "color-border",
    },
    disabled: {
      backgroundColor: "color-disabled",
      color: "color-text-disabled",
      borderColor: "color-border-disabled",
    },
  },
};
```

### 5.3 Zod Schema Generation

**Generated Zod Schema**:
```typescript
import { z } from "zod";

export const ButtonPropsSchema = z.object({
  variant: z.enum(["default", "primary", "secondary", "ghost"]).default("default"),
  size: z.enum(["sm", "md", "lg"]).default("md"),
  disabled: z.boolean().default(false),
  onClick: z.function().args(z.any()).returns(z.void()).optional(),
});

export type ButtonProps = z.infer<typeof ButtonPropsSchema>;
```

### 5.4 CSS-in-JS Binding Generation

**Stitches Output**:
```typescript
import { styled } from "@stitches/core";

export const ButtonStyled = styled("button", {
  // Default state
  backgroundColor: "var(--color-primary)",
  color: "var(--color-text-on-primary)",
  borderColor: "var(--color-border)",

  // Hover state
  "&:hover": {
    backgroundColor: "var(--color-primary-hover)",
  },

  // Focus state
  "&:focus": {
    borderColor: "var(--color-focus-ring)",
    boxShadow: "var(--shadow-focus)",
  },

  // Active state
  "&:active": {
    backgroundColor: "var(--color-primary-active)",
  },

  // Disabled state
  "&:disabled": {
    backgroundColor: "var(--color-disabled)",
    color: "var(--color-text-disabled)",
    cursor: "not-allowed",
  },
});
```

**Vanilla Extract Output**:
```typescript
import { style } from "@vanilla-extract/css";

export const buttonBase = style({
  backgroundColor: "var(--color-primary)",
  color: "var(--color-text-on-primary)",
  borderColor: "var(--color-border)",

  selectors: {
    "&:hover": {
      backgroundColor: "var(--color-primary-hover)",
    },
    "&:focus": {
      borderColor: "var(--color-focus-ring)",
      boxShadow: "var(--shadow-focus)",
    },
    "&:active": {
      backgroundColor: "var(--color-primary-active)",
    },
    "&:disabled": {
      backgroundColor: "var(--color-disabled)",
      color: "var(--color-text-disabled)",
    },
  },
});
```

### 5.5 The 20 Core Hooks

**List of Components to Map**:
1. Button
2. Input
3. Card
4. Modal
5. Dropdown
6. Checkbox
7. Radio
8. Switch
9. Slider
10. Badge
11. Alert
12. Toast
13. Tooltip
14. Popover
15. Tabs
16. Accordion
17. Select
18. Textarea
19. Progress
20. Avatar

**Per-Component Requirements**:
- All 5 states defined (default, hover, focus, active, disabled)
- Type-safe schema (Zod)
- CSS-in-JS bindings (Stitches or Vanilla Extract)
- Token reference validation

### 5.6 Performance Targets

- **Validation Speed**: < 100ms for all 20 components
- **Schema Generation**: < 200ms for all 20 schemas
- **Binding Generation**: < 300ms for all 20 components
- **Memory Usage**: < 100MB during generation

---

## 6. Testing Strategy

### 6.1 Unit Test Coverage

**Validator Module**:
- Token existence validation
- State completeness verification
- Invalid token reference detection

**Mapper Module**:
- Component-to-token mapping correctness
- Variant handling
- Custom state support

**Schema Generator Module**:
- Zod schema generation accuracy
- TypeScript type generation
- Schema validation correctness

**CSS-in-JS Generator Module**:
- Stitches output format validation
- Vanilla Extract output format validation
- CSS variable reference correctness

**Target Coverage**: ≥ 85% (TRUST 5 requirement)

### 6.2 Integration Test Scenarios

**End-to-End Binding Generation**:
- Load Layer 1 tokens → Validate → Generate schemas → Generate CSS-in-JS → Validate output

**Token Reference Validation**:
- Provide invalid token reference → Assert validation error with suggestions

**State Completeness Verification**:
- Provide incomplete mapping → Assert error indicating missing states

---

## 7. Security Considerations

**SEC-001**: Token reference validation prevents injection of arbitrary CSS
- Validate all token names against allowed set
- Reject unknown tokens

**SEC-002**: Generated TypeScript code is sanitized to prevent code injection
- Escape all dynamic content in generated code
- Use template literals safely

---

## 8. Quality Gates

### 8.1 TRUST 5 Framework Compliance

- **Test-first**: ≥ 85% test coverage
- **Readable**: Clear naming, JSDoc comments for public APIs
- **Unified**: ESLint + Prettier formatting
- **Secured**: Input validation, safe code generation
- **Trackable**: Git commits reference SPEC-LAYER2-001

### 8.2 Acceptance Criteria

✅ All 20 components have complete state coverage
✅ All token references validated against Layer 1 metadata
✅ Generated Zod schemas are type-safe and valid
✅ CSS-in-JS bindings reference CSS variables correctly
✅ Test coverage ≥ 85%
✅ Zero ESLint errors
✅ Zero TypeScript errors

---

## 9. Traceability

**TAG**: SPEC-LAYER2-001
**Dependencies**:
- SPEC-LAYER1-001 (Token Generator Engine) - REQUIRED
**Related SPECs**:
- SPEC-LAYER3-001 (Component Generation Engine) - Consumes this layer

---

**END OF SPEC**
