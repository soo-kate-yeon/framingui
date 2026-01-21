---
id: SPEC-LAYOUT-001
version: "1.0.0"
status: "draft"
created: "2026-01-21"
updated: "2026-01-21"
author: "asleep"
priority: "high"
lifecycle: "spec-anchored"
---

# HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-21 | asleep | Initial SPEC creation for Layout Grid System |

---

# SPEC-LAYOUT-001: Layout Grid System

## 1. Overview

### 1.1 Purpose

This SPEC defines the Layout Grid System for Tekton Design System, providing responsive grid configurations that integrate with Tailwind CSS breakpoints. The system enables AI-driven component generation (`renderScreen`) to produce responsive layouts with proper container, columns, gutter, and margin settings.

**Primary Goal**: Define breakpoint-specific grid defaults and integrate layout configuration into the Blueprint JSON structure for `renderScreen` MCP tool.

**Design Principle**: Tailwind CSS-first approach using standard breakpoints (sm, md, lg, xl, 2xl) with semantic grid presets optimized for each screen size.

### 1.2 Scope

**In Scope (MVP)**:
- Tailwind CSS breakpoint definition constants (Layer 1)
- Grid system default values per breakpoint (Layer 1)
- Blueprint `layout` configuration field extension (Layer 3)
- `renderScreen` integration with layout-aware code generation (Layer 3)

**Out of Scope (Post-MVP)**:
- Custom breakpoint definition UI
- Responsive layout preview in studio-web
- Container query support
- Fluid typography integration

### 1.3 Dependencies

**Required SPEC Dependencies**:
- **SPEC-LAYER1-001**: Token Generator Engine - Grid tokens export
- **SPEC-LAYER3-MVP-001**: MCP-Driven Component Generation - renderScreen integration

**Existing Implementation**:
- `packages/contracts/src/definitions/screen/environment.ts` - GridSystem interface (already exists)
- `packages/studio-mcp/src/component/layer3-tools.ts` - renderScreen function

**External Standards**:
- Tailwind CSS v3.4+ default breakpoints
- CSS Container Queries (future consideration)

---

## 2. Environment

### 2.1 Technical Environment

- **Runtime**: Node.js 20+ / Browser (ES2022+)
- **Language**: TypeScript 5.9+
- **CSS Framework**: Tailwind CSS v3.4+
- **Build System**: Turbo (existing monorepo setup)
- **Package Manager**: pnpm

### 2.2 Integration Points

**Input**:
- Blueprint JSON with optional `layout` configuration
- User-selected environment (web, mobile, tablet, responsive)

**Output**:
- Generated React components with Tailwind CSS classes
- Responsive container and grid classes applied

---

## 3. Assumptions

### 3.1 Technical Assumptions

**ASSUMPTION-001**: Tailwind CSS default breakpoints are sufficient for MVP
- **Confidence**: High - Industry standard, widely adopted
- **Evidence**: Tailwind defaults cover 99% of responsive design use cases
- **Risk if Wrong**: May need custom breakpoint configuration API
- **Validation**: Review with design team during implementation

**ASSUMPTION-002**: Grid system can be expressed as Tailwind utility classes
- **Confidence**: High - Tailwind provides grid-cols, gap, px utilities
- **Evidence**: Tailwind CSS documentation and common patterns
- **Risk if Wrong**: May need custom CSS generation
- **Validation**: Prototype with complex grid layouts

**ASSUMPTION-003**: Existing GridSystem interface is sufficient for MVP
- **Confidence**: Medium - Interface exists but may need extension
- **Evidence**: `environment.ts` defines columns, gutter, margin, breakpoint
- **Risk if Wrong**: Interface refactoring required
- **Validation**: Map all Tailwind grid scenarios to interface

### 3.2 Business Assumptions

**ASSUMPTION-004**: LLM can understand and apply grid configuration
- **Confidence**: High - Structured JSON is LLM-friendly
- **Evidence**: SPEC-LAYER3-MVP-001 demonstrates Blueprint consumption
- **Risk if Wrong**: Need additional schema documentation
- **Validation**: Test with Claude Desktop integration

---

## 4. Requirements

### 4.1 Ubiquitous Requirements (Always Active)

**REQ-LAYOUT-001**: The system shall always define Tailwind CSS breakpoint constants
- **Rationale**: Centralized breakpoint definition ensures consistency across all layers
- **Acceptance**: Constants exported from `packages/theme/src/breakpoints.ts`
- **Values**: sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)

**REQ-LAYOUT-002**: The system shall always provide default grid configurations per breakpoint
- **Rationale**: Sensible defaults reduce LLM decision burden
- **Acceptance**: Each breakpoint has predefined columns, gutter, margin values
- **Default Grid Configurations**:

| Breakpoint | Min Width | Columns | Gutter | Margin | Container Max |
|------------|-----------|---------|--------|--------|---------------|
| default    | 0px       | 4       | 16px   | 16px   | none          |
| sm         | 640px     | 4       | 16px   | 24px   | 640px         |
| md         | 768px     | 8       | 24px   | 32px   | 768px         |
| lg         | 1024px    | 12      | 24px   | 48px   | 1024px        |
| xl         | 1280px    | 12      | 32px   | 64px   | 1280px        |
| 2xl        | 1536px    | 12      | 32px   | 80px   | 1536px        |

### 4.2 Event-Driven Requirements (WHEN-THEN)

**REQ-LAYOUT-003**: WHEN a Blueprint contains a `layout` configuration, THEN renderScreen shall apply the specified grid settings
- **Rationale**: Explicit layout configuration overrides defaults
- **Acceptance**: Blueprint `layout` field parsed and applied to generated code

**REQ-LAYOUT-004**: WHEN renderScreen is invoked without layout configuration, THEN the system shall apply default grid for the specified environment
- **Rationale**: Zero-configuration should produce reasonable output
- **Acceptance**: Environment-appropriate defaults applied automatically

**REQ-LAYOUT-005**: WHEN generating a responsive component, THEN the system shall output Tailwind responsive classes
- **Rationale**: Responsive design is the default expectation
- **Acceptance**: Generated code includes `container`, `mx-auto`, responsive grid classes

### 4.3 State-Driven Requirements (IF-THEN)

**REQ-LAYOUT-006**: IF environment is set to "mobile", THEN grid columns shall default to 4
- **Rationale**: Mobile screens require simpler layouts
- **Acceptance**: Mobile environment applies mobile-optimized grid

**REQ-LAYOUT-007**: IF environment is set to "tablet", THEN grid columns shall default to 8
- **Rationale**: Tablets balance between mobile and desktop
- **Acceptance**: Tablet environment applies tablet-optimized grid

**REQ-LAYOUT-008**: IF environment is set to "web" or "responsive", THEN grid columns shall scale from 4 to 12 across breakpoints
- **Rationale**: Desktop/responsive requires full grid flexibility
- **Acceptance**: All breakpoints applied with responsive classes

### 4.4 Unwanted Behaviors (Prohibited Actions)

**REQ-LAYOUT-009**: The system shall NOT hardcode pixel values in generated component styles
- **Rationale**: Must use Tailwind utilities or CSS variables
- **Acceptance**: Zero raw pixel values in generated JSX

**REQ-LAYOUT-010**: The system shall NOT generate grid classes incompatible with Tailwind CSS
- **Rationale**: Ensures build-time class detection and optimization
- **Acceptance**: All classes exist in Tailwind default or safelist

---

## 5. Technical Specifications

### 5.1 Breakpoint Constants (Layer 1)

```typescript
// packages/theme/src/breakpoints.ts

/**
 * Tailwind CSS default breakpoints
 * @see https://tailwindcss.com/docs/responsive-design
 */
export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

/**
 * Breakpoint query helpers
 */
export function minWidth(breakpoint: Breakpoint): string {
  return `(min-width: ${BREAKPOINTS[breakpoint]}px)`;
}

export function maxWidth(breakpoint: Breakpoint): string {
  return `(max-width: ${BREAKPOINTS[breakpoint] - 1}px)`;
}
```

### 5.2 Grid System Defaults (Layer 1)

```typescript
// packages/theme/src/grid-defaults.ts

import type { GridSystem } from '@tekton/contracts';
import { BREAKPOINTS, type Breakpoint } from './breakpoints';

/**
 * Default grid configuration per breakpoint
 */
export const GRID_DEFAULTS: Record<Breakpoint | 'default', GridSystem> = {
  default: {
    columns: 4,
    gutter: 16,
    margin: 16,
    breakpoint: { min: 0, max: BREAKPOINTS.sm - 1 },
  },
  sm: {
    columns: 4,
    gutter: 16,
    margin: 24,
    breakpoint: { min: BREAKPOINTS.sm, max: BREAKPOINTS.md - 1 },
  },
  md: {
    columns: 8,
    gutter: 24,
    margin: 32,
    breakpoint: { min: BREAKPOINTS.md, max: BREAKPOINTS.lg - 1 },
  },
  lg: {
    columns: 12,
    gutter: 24,
    margin: 48,
    breakpoint: { min: BREAKPOINTS.lg, max: BREAKPOINTS.xl - 1 },
  },
  xl: {
    columns: 12,
    gutter: 32,
    margin: 64,
    breakpoint: { min: BREAKPOINTS.xl, max: BREAKPOINTS['2xl'] - 1 },
  },
  '2xl': {
    columns: 12,
    gutter: 32,
    margin: 80,
    breakpoint: { min: BREAKPOINTS['2xl'], max: Infinity },
  },
};

/**
 * Environment to grid preset mapping
 */
export const ENVIRONMENT_GRID_PRESETS = {
  mobile: ['default', 'sm'] as const,
  tablet: ['default', 'sm', 'md'] as const,
  web: ['default', 'sm', 'md', 'lg', 'xl', '2xl'] as const,
  responsive: ['default', 'sm', 'md', 'lg', 'xl', '2xl'] as const,
  tv: ['lg', 'xl', '2xl'] as const,
  kiosk: ['lg', 'xl'] as const,
} as const;
```

### 5.3 Blueprint Layout Configuration (Layer 3)

```typescript
// packages/component-generator/src/types/knowledge-schema.ts (extension)

/**
 * Layout configuration for Blueprint
 */
export interface BlueprintLayout {
  /** Container behavior */
  container?: 'fluid' | 'fixed' | 'none';

  /** Maximum width preset */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | 'prose';

  /** Horizontal padding (Tailwind spacing scale) */
  padding?: number;

  /** Grid columns override per breakpoint */
  grid?: {
    default?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };

  /** Gap between grid items (Tailwind spacing scale) */
  gap?: number | { x?: number; y?: number };
}

/**
 * Extended BlueprintResult with layout support
 */
export interface BlueprintResultV2 extends BlueprintResult {
  /** Optional layout configuration */
  layout?: BlueprintLayout;

  /** Target environment for grid defaults */
  environment?: Environment;
}
```

### 5.4 renderScreen Layout Integration (Layer 3)

```typescript
// packages/studio-mcp/src/component/layout-generator.ts

import { GRID_DEFAULTS, ENVIRONMENT_GRID_PRESETS } from '@tekton/theme';
import type { BlueprintLayout, Environment } from '@tekton/component-generator';

/**
 * Generate Tailwind classes for layout configuration
 */
export function generateLayoutClasses(
  layout?: BlueprintLayout,
  environment: Environment = 'responsive'
): string[] {
  const classes: string[] = [];

  // Container
  if (layout?.container !== 'none') {
    classes.push('container');
    classes.push('mx-auto');
  }

  // Max width
  if (layout?.maxWidth) {
    classes.push(`max-w-${layout.maxWidth}`);
  }

  // Padding
  if (layout?.padding !== undefined) {
    classes.push(`px-${layout.padding}`);
  } else {
    // Apply responsive padding from defaults
    classes.push('px-4', 'sm:px-6', 'md:px-8', 'lg:px-12', 'xl:px-16');
  }

  // Grid columns (responsive)
  if (layout?.grid) {
    const { grid } = layout;
    if (grid.default) classes.push(`grid-cols-${grid.default}`);
    if (grid.sm) classes.push(`sm:grid-cols-${grid.sm}`);
    if (grid.md) classes.push(`md:grid-cols-${grid.md}`);
    if (grid.lg) classes.push(`lg:grid-cols-${grid.lg}`);
    if (grid.xl) classes.push(`xl:grid-cols-${grid.xl}`);
    if (grid['2xl']) classes.push(`2xl:grid-cols-${grid['2xl']}`);
  } else {
    // Apply environment-based defaults
    const presets = ENVIRONMENT_GRID_PRESETS[environment];
    for (const bp of presets) {
      const cols = GRID_DEFAULTS[bp].columns;
      if (bp === 'default') {
        classes.push(`grid-cols-${cols}`);
      } else {
        classes.push(`${bp}:grid-cols-${cols}`);
      }
    }
  }

  // Gap
  if (layout?.gap !== undefined) {
    if (typeof layout.gap === 'number') {
      classes.push(`gap-${layout.gap}`);
    } else {
      if (layout.gap.x) classes.push(`gap-x-${layout.gap.x}`);
      if (layout.gap.y) classes.push(`gap-y-${layout.gap.y}`);
    }
  } else {
    // Default responsive gap
    classes.push('gap-4', 'sm:gap-4', 'md:gap-6', 'lg:gap-6', 'xl:gap-8');
  }

  return classes;
}
```

### 5.5 Module Structure

```
packages/theme/src/
├── breakpoints.ts           # NEW: Breakpoint constants
├── grid-defaults.ts         # NEW: Grid system defaults
├── index.ts                 # Export aggregation
└── extended-token-schema.ts # Existing

packages/component-generator/src/
├── types/
│   └── knowledge-schema.ts  # MODIFY: Add BlueprintLayout interface
├── generator/
│   ├── jsx-element-generator.ts
│   └── layout-class-generator.ts  # NEW: Layout class generation
└── index.ts

packages/studio-mcp/src/component/
├── layer3-tools.ts          # MODIFY: Integrate layout generation
└── layout-generator.ts      # NEW: Layout integration
```

### 5.6 Sample Blueprint with Layout

```json
{
  "blueprintId": "bp-dashboard-001",
  "recipeName": "DashboardPage",
  "analysis": {
    "intent": "Display metrics dashboard",
    "tone": "professional"
  },
  "environment": "responsive",
  "layout": {
    "container": "fixed",
    "maxWidth": "2xl",
    "padding": 6,
    "grid": {
      "default": 1,
      "sm": 2,
      "md": 2,
      "lg": 3,
      "xl": 4
    },
    "gap": { "x": 6, "y": 8 }
  },
  "structure": {
    "componentName": "div",
    "props": {},
    "slots": {
      "content": [
        { "componentName": "MetricCard", "props": { "title": "Revenue" } },
        { "componentName": "MetricCard", "props": { "title": "Users" } },
        { "componentName": "MetricCard", "props": { "title": "Orders" } }
      ]
    }
  }
}
```

### 5.7 Generated Output Example

```tsx
export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-2xl px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
      <MetricCard title="Revenue" />
      <MetricCard title="Users" />
      <MetricCard title="Orders" />
    </div>
  );
}
```

---

## 6. Testing Strategy

### 6.1 Unit Tests

**Breakpoint Tests**:
- `minWidth('lg')` returns `(min-width: 1024px)`
- `maxWidth('md')` returns `(max-width: 767px)`
- All breakpoint values match Tailwind defaults

**Grid Defaults Tests**:
- Each breakpoint has valid GridSystem values
- Environment presets contain expected breakpoints
- Mobile preset excludes lg, xl, 2xl

**Layout Class Generator Tests**:
- Container classes generated correctly
- Responsive grid classes match configuration
- Gap classes handle number and object formats
- Default values applied when configuration missing

### 6.2 Integration Tests

**renderScreen with Layout Tests**:
- Blueprint with layout produces correct Tailwind classes
- Blueprint without layout uses environment defaults
- Generated code compiles without TypeScript errors
- Tailwind classes are valid and detectable

### 6.3 E2E Tests

**LLM Flow Tests**:
- LLM requests dashboard layout
- MCP returns knowledge schema with layout options
- LLM constructs Blueprint with layout configuration
- renderScreen generates compilable responsive code

---

## 7. Quality Gates

### 7.1 TRUST 5 Framework Compliance

- **Test-first**: >= 85% coverage for all new modules
- **Readable**: Clear naming, JSDoc comments
- **Unified**: ESLint + Prettier formatting
- **Secured**: Zod validation for Blueprint layout field
- **Trackable**: Commits reference SPEC-LAYOUT-001

### 7.2 Acceptance Criteria Summary

- [ ] Breakpoint constants defined in `packages/theme`
- [ ] Grid defaults match specification table
- [ ] BlueprintLayout interface added to knowledge-schema
- [ ] generateLayoutClasses function produces valid Tailwind
- [ ] renderScreen integrates layout generation
- [ ] Generated code compiles without errors
- [ ] Test coverage >= 85%
- [ ] All responsive classes are valid Tailwind utilities

---

## 8. Traceability

**TAG**: SPEC-LAYOUT-001

**Parent SPEC**: None (independent feature)

**Dependencies**:
- SPEC-LAYER1-001 (Token Generator Engine) - INTEGRATION
- SPEC-LAYER3-MVP-001 (MCP Component Generation) - INTEGRATION

**Related Files**:
- `packages/contracts/src/definitions/screen/environment.ts` - Existing GridSystem interface
- `packages/studio-mcp/src/component/layer3-tools.ts` - renderScreen function

**Implementation Milestones**:
- M1: Layer 1 - Breakpoint and Grid Constants
- M2: Layer 3 - Blueprint Layout Schema Extension
- M3: Layer 3 - renderScreen Layout Integration
- M4: Testing and Documentation

---

**END OF SPEC**
