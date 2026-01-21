---
spec-id: SPEC-LAYOUT-001
version: "1.0.0"
created: "2026-01-21"
---

# SPEC-LAYOUT-001: Acceptance Criteria

## Overview

This document defines the acceptance criteria for the Layout Grid System feature using Given-When-Then format.

---

## Milestone 1: Breakpoint and Grid Constants

### AC-001: Breakpoint Constants Match Tailwind Defaults

**Given** the theme package is imported
**When** accessing BREAKPOINTS constant
**Then** the values should match Tailwind CSS v3.4 defaults:
  - sm: 640
  - md: 768
  - lg: 1024
  - xl: 1280
  - 2xl: 1536

```typescript
// Test Example
import { BREAKPOINTS } from '@tekton/theme';

expect(BREAKPOINTS.sm).toBe(640);
expect(BREAKPOINTS.md).toBe(768);
expect(BREAKPOINTS.lg).toBe(1024);
expect(BREAKPOINTS.xl).toBe(1280);
expect(BREAKPOINTS['2xl']).toBe(1536);
```

---

### AC-002: Media Query Helpers Generate Correct Syntax

**Given** the breakpoint helpers are imported
**When** calling minWidth('lg')
**Then** it should return "(min-width: 1024px)"

**Given** the breakpoint helpers are imported
**When** calling maxWidth('md')
**Then** it should return "(max-width: 767px)"

```typescript
// Test Example
import { minWidth, maxWidth } from '@tekton/theme';

expect(minWidth('lg')).toBe('(min-width: 1024px)');
expect(maxWidth('md')).toBe('(max-width: 767px)');
```

---

### AC-003: Grid Defaults Contain Valid Values Per Breakpoint

**Given** the grid defaults are imported
**When** accessing GRID_DEFAULTS for each breakpoint
**Then** each breakpoint should have valid GridSystem values:

| Breakpoint | Columns | Gutter | Margin |
|------------|---------|--------|--------|
| default    | 4       | 16     | 16     |
| sm         | 4       | 16     | 24     |
| md         | 8       | 24     | 32     |
| lg         | 12      | 24     | 48     |
| xl         | 12      | 32     | 64     |
| 2xl        | 12      | 32     | 80     |

```typescript
// Test Example
import { GRID_DEFAULTS } from '@tekton/theme';

expect(GRID_DEFAULTS.lg.columns).toBe(12);
expect(GRID_DEFAULTS.lg.gutter).toBe(24);
expect(GRID_DEFAULTS.lg.margin).toBe(48);
```

---

### AC-004: Environment Presets Map Correctly

**Given** the environment grid presets are imported
**When** accessing ENVIRONMENT_GRID_PRESETS
**Then** each environment should include appropriate breakpoints:

| Environment | Included Breakpoints |
|-------------|---------------------|
| mobile      | default, sm |
| tablet      | default, sm, md |
| web         | default, sm, md, lg, xl, 2xl |
| responsive  | default, sm, md, lg, xl, 2xl |

```typescript
// Test Example
import { ENVIRONMENT_GRID_PRESETS } from '@tekton/theme';

expect(ENVIRONMENT_GRID_PRESETS.mobile).toEqual(['default', 'sm']);
expect(ENVIRONMENT_GRID_PRESETS.tablet).toEqual(['default', 'sm', 'md']);
expect(ENVIRONMENT_GRID_PRESETS.responsive).toContain('2xl');
```

---

## Milestone 2: Blueprint Layout Schema Extension

### AC-005: BlueprintLayout Interface Accepts Valid Configuration

**Given** a Blueprint with layout configuration
**When** validating against BlueprintLayout schema
**Then** the following configuration should be valid:

```typescript
// Valid Blueprint Layout
const validLayout: BlueprintLayout = {
  container: 'fixed',
  maxWidth: '2xl',
  padding: 6,
  grid: {
    default: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4
  },
  gap: { x: 6, y: 8 }
};
```

---

### AC-006: BlueprintLayout Rejects Invalid Values

**Given** a Blueprint with invalid layout configuration
**When** validating against Zod schema
**Then** validation should fail with appropriate error messages:

| Invalid Config | Expected Error |
|---------------|----------------|
| grid.lg: 24 | "Columns must be between 1 and 12" |
| container: 'invalid' | "Invalid container value" |
| gap: -1 | "Gap must be non-negative" |

```typescript
// Test Example
import { blueprintLayoutSchema } from '@tekton/component-generator';

const invalidLayout = { grid: { lg: 24 } };
const result = blueprintLayoutSchema.safeParse(invalidLayout);
expect(result.success).toBe(false);
```

---

### AC-007: Backward Compatibility with Existing Blueprints

**Given** an existing Blueprint without layout field
**When** parsing with the updated schema
**Then** validation should pass without errors

```typescript
// Test Example
const legacyBlueprint = {
  blueprintId: 'bp-001',
  recipeName: 'TestPage',
  analysis: { intent: 'test', tone: 'neutral' },
  structure: { componentName: 'div', props: {} }
};

const result = blueprintResultV2Schema.safeParse(legacyBlueprint);
expect(result.success).toBe(true);
```

---

## Milestone 3: renderScreen Layout Integration

### AC-008: generateLayoutClasses Produces Container Classes

**Given** a layout configuration with container: 'fixed'
**When** calling generateLayoutClasses
**Then** the result should include "container" and "mx-auto"

```typescript
// Test Example
import { generateLayoutClasses } from '@tekton/component-generator';

const classes = generateLayoutClasses({ container: 'fixed' });
expect(classes).toContain('container');
expect(classes).toContain('mx-auto');
```

---

### AC-009: generateLayoutClasses Produces Responsive Grid Classes

**Given** a layout configuration with grid columns per breakpoint
**When** calling generateLayoutClasses
**Then** the result should include responsive Tailwind grid classes

```typescript
// Test Example
const layout = {
  grid: { default: 1, sm: 2, lg: 4 }
};
const classes = generateLayoutClasses(layout);

expect(classes).toContain('grid-cols-1');
expect(classes).toContain('sm:grid-cols-2');
expect(classes).toContain('lg:grid-cols-4');
```

---

### AC-010: generateLayoutClasses Handles Gap Configuration

**Given** a layout configuration with gap as number
**When** calling generateLayoutClasses
**Then** the result should include "gap-{n}"

**Given** a layout configuration with gap as object { x, y }
**When** calling generateLayoutClasses
**Then** the result should include "gap-x-{n}" and "gap-y-{n}"

```typescript
// Test Example
// Number gap
const numberGap = generateLayoutClasses({ gap: 6 });
expect(numberGap).toContain('gap-6');

// Object gap
const objectGap = generateLayoutClasses({ gap: { x: 4, y: 8 } });
expect(objectGap).toContain('gap-x-4');
expect(objectGap).toContain('gap-y-8');
```

---

### AC-011: renderScreen Applies Layout to Generated Code

**Given** a Blueprint with layout configuration
**When** calling renderScreen MCP tool
**Then** the generated .tsx file should contain layout classes

```typescript
// Test Example
const blueprint = {
  blueprintId: 'test-001',
  recipeName: 'TestPage',
  analysis: { intent: 'test', tone: 'professional' },
  layout: {
    container: 'fixed',
    maxWidth: 'xl',
    grid: { default: 1, md: 2, lg: 3 }
  },
  structure: {
    componentName: 'div',
    props: {},
    slots: { content: [{ componentName: 'Card', props: {} }] }
  }
};

const result = await renderScreen(blueprint);
expect(result.success).toBe(true);
expect(result.code).toContain('container');
expect(result.code).toContain('mx-auto');
expect(result.code).toContain('max-w-xl');
expect(result.code).toContain('grid-cols-1');
expect(result.code).toContain('md:grid-cols-2');
expect(result.code).toContain('lg:grid-cols-3');
```

---

### AC-012: renderScreen Uses Environment Defaults When No Layout

**Given** a Blueprint without layout configuration but with environment set to "mobile"
**When** calling renderScreen MCP tool
**Then** the generated code should use mobile-appropriate grid defaults

```typescript
// Test Example
const blueprint = {
  blueprintId: 'test-002',
  recipeName: 'MobilePage',
  analysis: { intent: 'test', tone: 'casual' },
  environment: 'mobile',
  structure: { componentName: 'div', props: {} }
};

const result = await renderScreen(blueprint);
expect(result.success).toBe(true);
// Mobile should use 4 columns max (default and sm)
expect(result.code).toContain('grid-cols-4');
expect(result.code).not.toContain('lg:grid-cols-12');
```

---

### AC-013: Generated Code Compiles Without TypeScript Errors

**Given** any valid Blueprint with layout configuration
**When** renderScreen generates a .tsx file
**Then** the file should pass TypeScript compilation (`tsc --noEmit`)

```typescript
// Test Example
import { execSync } from 'child_process';

const result = await renderScreen(validBlueprint, outputPath);
expect(result.success).toBe(true);

// TypeScript compilation check
expect(() => {
  execSync(`npx tsc --noEmit ${result.filePath}`);
}).not.toThrow();
```

---

### AC-014: get-knowledge-schema Includes Layout Documentation

**Given** the MCP server is running
**When** LLM invokes get-knowledge-schema tool
**Then** the response should include layout configuration examples and instructions

```typescript
// Test Example
const schema = getKnowledgeSchema();
expect(schema.usage.instructions).toContain('layout');
expect(schema.usage.example.layout).toBeDefined();
```

---

## Milestone 4: Testing and Documentation

### AC-015: Test Coverage Meets Threshold

**Given** all tests are executed
**When** measuring code coverage
**Then** overall coverage should be >= 85%
**And** new modules should have 100% coverage:
  - `breakpoints.ts`: 100%
  - `grid-defaults.ts`: 100%
  - `layout-class-generator.ts`: 100%

---

### AC-016: No Hardcoded Pixel Values in Generated Code

**Given** any valid Blueprint
**When** renderScreen generates code
**Then** the generated code should not contain raw pixel values (e.g., "16px", "24px")
**And** should only use Tailwind utility classes

```typescript
// Test Example
const result = await renderScreen(blueprint);
expect(result.code).not.toMatch(/\d+px/);
expect(result.code).not.toMatch(/style={{/);
```

---

## Quality Gate Checklist

### Definition of Done

- [ ] All acceptance criteria (AC-001 through AC-016) pass
- [ ] Test coverage >= 85% overall
- [ ] New modules have 100% coverage
- [ ] Zero TypeScript errors
- [ ] Zero ESLint warnings
- [ ] Code formatted with Prettier
- [ ] All commits reference SPEC-LAYOUT-001
- [ ] Documentation updated

### Traceability Matrix

| Requirement | Acceptance Criteria | Test File |
|-------------|--------------------|-----------|
| REQ-LAYOUT-001 | AC-001 | breakpoints.test.ts |
| REQ-LAYOUT-002 | AC-003, AC-004 | grid-defaults.test.ts |
| REQ-LAYOUT-003 | AC-011 | render-screen-layout.test.ts |
| REQ-LAYOUT-004 | AC-012 | render-screen-layout.test.ts |
| REQ-LAYOUT-005 | AC-008, AC-009 | layout-class-generator.test.ts |
| REQ-LAYOUT-006 | AC-012 | render-screen-layout.test.ts |
| REQ-LAYOUT-007 | AC-012 | render-screen-layout.test.ts |
| REQ-LAYOUT-008 | AC-011 | render-screen-layout.test.ts |
| REQ-LAYOUT-009 | AC-016 | render-screen-layout.test.ts |
| REQ-LAYOUT-010 | AC-008, AC-009, AC-010 | layout-class-generator.test.ts |

---

**END OF ACCEPTANCE CRITERIA**
