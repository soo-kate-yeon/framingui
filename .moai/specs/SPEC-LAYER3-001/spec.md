---
id: SPEC-LAYER3-001
version: "1.0.0"
status: "draft"
created: "2026-01-19"
updated: "2026-01-19"
author: "asleep"
priority: "medium"
---

# HISTORY

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2026-01-19 | asleep | Initial SPEC creation for Component Generation Engine |

---

# SPEC-LAYER3-001: Component Generation Engine

## 1. Overview

### 1.1 Purpose
The Component Generation Engine is the most sophisticated layer that generates production-ready React components from Blueprints (user requirements + archetype data). It implements slot-based assembly for flexible composition, supports Basic Mode (single-file JSX) and Pro Mode (editable JSON blueprints), integrates with Supabase for Blueprint persistence, and provides comprehensive responsive utilities.

### 1.2 Scope
- Blueprint system (Basic Mode: AI-generated + Pro Mode: User-editable JSON)
- Slot-based component assembly (header, content, footer, sidebar)
- React JSX code generation with TypeScript support
- Supabase integration for Blueprint storage and versioning
- Responsive utility system (mobile-first, breakpoints, grid)
- Component metadata generation (props, variants, dependencies)
- E2E testing generation for generated components

### 1.3 Dependencies
- **SPEC-LAYER1-001**: Token Generator Engine (REQUIRED)
- **SPEC-LAYER2-001**: Component Token Binding System (REQUIRED)
- **External Libraries**:
  - `@babel/generator` (^7.24.0) - AST to code generation
  - `@babel/types` (^7.24.0) - AST construction
  - `supabase-js` (^2.45.0) - Supabase client for Blueprint storage
  - `zod` (^3.23.0) - Blueprint schema validation
  - `prettier` (^3.4.0) - Code formatting for generated JSX

---

## 2. Environment

### 2.1 Technical Environment
- **Runtime**: Node.js 20+ / Browser (ES2022+)
- **Language**: TypeScript 5.9+
- **Build System**: Turbo (existing monorepo setup)
- **Package Manager**: npm (existing project standard)
- **Database**: Supabase (PostgreSQL backend for Blueprint storage)

### 2.2 Integration Points
- **Input**:
  - User requirements (natural language or JSON Blueprint)
  - Layer 1 tokens (CSS variables)
  - Layer 2 bindings (TypeScript schemas + CSS-in-JS)
- **Output**:
  - React component files (`.tsx`)
  - Component metadata (`.meta.json`)
  - E2E test files (`.spec.ts`)
  - Blueprint JSON (for Pro Mode)

---

## 3. Assumptions

### 3.1 Technical Assumptions
- **ASSUMPTION-001**: @babel/generator can produce readable, formatted React JSX code
  - **Confidence**: High - Babel is industry standard for code generation
  - **Evidence**: Babel documentation and widespread adoption
  - **Risk if Wrong**: Alternative code generation approach needed (template strings)
  - **Validation**: Proof-of-concept during Milestone 1

- **ASSUMPTION-002**: Slot-based architecture is flexible enough for 80%+ of UI patterns
  - **Confidence**: Medium - Based on common web layout patterns
  - **Evidence**: Bootstrap/Tailwind layout patterns (header/content/sidebar/footer)
  - **Risk if Wrong**: More complex slot system may be required
  - **Validation**: User testing with diverse component types

- **ASSUMPTION-003**: Supabase RLS (Row-Level Security) provides adequate access control for Blueprints
  - **Confidence**: High - Supabase RLS is production-ready
  - **Evidence**: Supabase documentation and security best practices
  - **Risk if Wrong**: Custom auth layer required
  - **Validation**: Security audit during implementation

- **ASSUMPTION-004**: AI (Claude/GPT-4) can generate valid Blueprints from natural language in Basic Mode
  - **Confidence**: High - LLMs excel at structured JSON generation
  - **Evidence**: Existing LLM JSON generation capabilities
  - **Risk if Wrong**: Manual Blueprint authoring required more frequently
  - **Validation**: Test with diverse user prompts

### 3.2 Business Assumptions
- **ASSUMPTION-005**: Pro Mode (editable Blueprints) provides enough value to justify complexity
  - **Confidence**: Medium - Power users may prefer JSON control
  - **Evidence**: Developer tool preferences (e.g., Storybook JSON controls)
  - **Risk if Wrong**: Pro Mode underutilized, maintenance burden high
  - **Validation**: User feedback during beta testing

---

## 4. Requirements

### 4.1 Ubiquitous Requirements (Always Active)

**REQ-LAYER3-001**: The Component Generation Engine shall always validate Blueprint schemas before component generation
- **Rationale**: Invalid Blueprints cause runtime errors in generated components
- **Acceptance**: 100% of Blueprints validated against Zod schemas before generation

**REQ-LAYER3-002**: The system shall always generate TypeScript-compatible React components with proper type annotations
- **Rationale**: TypeScript support is non-negotiable for modern React development
- **Acceptance**: All generated components compile without TypeScript errors

**REQ-LAYER3-003**: The system shall always format generated code with Prettier using project configuration
- **Rationale**: Consistent formatting ensures code quality and readability
- **Acceptance**: All generated files pass Prettier validation

**REQ-LAYER3-004**: The system shall always integrate Layer 1 tokens and Layer 2 bindings in generated components
- **Rationale**: Components must use design system tokens, not hardcoded values
- **Acceptance**: Generated components reference CSS variables and type-safe props

### 4.2 Event-Driven Requirements (User/System Triggers)

**REQ-LAYER3-005**: WHEN a user provides natural language requirements in Basic Mode, THEN the system shall generate a Blueprint using AI
- **Rationale**: Basic Mode automates Blueprint creation for non-technical users
- **Acceptance**: AI generates valid Blueprint JSON from user prompt

**REQ-LAYER3-006**: WHEN a user provides a Blueprint in Pro Mode, THEN the system shall validate the Blueprint schema
- **Rationale**: User-edited Blueprints may contain errors
- **Acceptance**: Invalid Blueprints rejected with descriptive errors

**REQ-LAYER3-007**: WHEN a Blueprint is approved, THEN the system shall generate React component code using slot-based assembly
- **Rationale**: Slot-based assembly enables flexible layouts
- **Acceptance**: Generated component matches Blueprint structure

**REQ-LAYER3-008**: WHEN a component is generated, THEN the system shall save the Blueprint to Supabase for versioning
- **Rationale**: Blueprint history enables rollback and comparison
- **Acceptance**: Blueprint saved with version number and timestamp

**REQ-LAYER3-009**: WHEN responsive utilities are requested, THEN the system shall generate mobile-first, breakpoint-aware styles
- **Rationale**: Modern web requires responsive design
- **Acceptance**: Generated styles include media queries for sm/md/lg/xl breakpoints

**REQ-LAYER3-010**: WHEN a component is generated, THEN the system shall create E2E tests for all interactive elements
- **Rationale**: Generated components must be testable
- **Acceptance**: E2E tests cover 80%+ of component interactions

### 4.3 State-Driven Requirements (Conditional Behavior)

**REQ-LAYER3-011**: IF a Blueprint contains custom slots beyond standard (header/content/footer/sidebar), THEN the system shall support custom slot definitions
- **Rationale**: Flexibility for complex layouts
- **Acceptance**: Custom slots render correctly in generated components

**REQ-LAYER3-012**: IF a Blueprint references a non-existent Layer 2 binding, THEN the system shall log a warning and suggest alternatives
- **Rationale**: Prevent broken component generation
- **Acceptance**: Warnings logged with actionable suggestions

**REQ-LAYER3-013**: IF Supabase is unavailable, THEN the system shall fall back to local file-based Blueprint storage
- **Rationale**: Offline development support
- **Acceptance**: Local fallback works without data loss

**REQ-LAYER3-014**: IF a component has complex interactions (drag-and-drop, animations), THEN the system shall generate placeholder comments for manual implementation
- **Rationale**: AI cannot generate all complex logic reliably
- **Acceptance**: Placeholders indicate where manual code is needed

### 4.4 Unwanted Behaviors (Prohibited Actions)

**REQ-LAYER3-015**: The system shall NOT generate components with hardcoded color or size values (must use tokens)
- **Rationale**: Hardcoded values violate design system principles
- **Acceptance**: Zero hardcoded design values in generated components

**REQ-LAYER3-016**: The system shall NOT expose Supabase API keys in generated code or client-side bundles
- **Rationale**: Security vulnerability
- **Acceptance**: API keys stored in environment variables only

**REQ-LAYER3-017**: The system shall NOT generate components that fail accessibility checks (WCAG AA minimum)
- **Rationale**: Accessibility is non-negotiable
- **Acceptance**: Generated components pass automated accessibility tests

**REQ-LAYER3-018**: The system shall NOT overwrite user-modified components without explicit confirmation
- **Rationale**: Prevent data loss
- **Acceptance**: Confirmation dialog shown before overwriting existing files

### 4.5 Optional Requirements (Nice-to-Have)

**REQ-LAYER3-019**: Where possible, the system should generate Storybook stories for each component
- **Rationale**: Improved component documentation and testing
- **Acceptance**: Storybook stories render component variants correctly

**REQ-LAYER3-020**: Where feasible, the system should provide visual diff previews when updating components
- **Rationale**: Users can review changes before applying
- **Acceptance**: Diff view shows code changes side-by-side

---

## 5. Technical Specifications

### 5.1 Core Architecture

**Component Generation Pipeline**:
```
User Input → Blueprint Generator (AI/Manual) → Schema Validator → Slot Resolver → AST Builder → Code Generator → Prettier → Output Files
```

**Module Structure**:
```
packages/studio-component-generator/
├── src/
│   ├── blueprint/
│   │   ├── basic-mode-generator.ts   # AI-based Blueprint generation
│   │   ├── pro-mode-editor.ts        # Manual Blueprint editing
│   │   ├── schema-validator.ts       # Zod Blueprint validation
│   │   └── blueprint.types.ts        # Blueprint TypeScript types
│   ├── slot/
│   │   ├── slot-resolver.ts          # Resolve slots to components
│   │   ├── slot-registry.ts          # Available slot types
│   │   └── slot-assembly.ts          # Assemble slots into layout
│   ├── generator/
│   │   ├── ast-builder.ts            # Build Babel AST
│   │   ├── jsx-generator.ts          # Generate JSX code
│   │   ├── typescript-generator.ts   # Generate TypeScript types
│   │   └── responsive-utils.ts       # Responsive utility generation
│   ├── supabase/
│   │   ├── blueprint-storage.ts      # Save/load Blueprints
│   │   ├── version-manager.ts        # Blueprint versioning
│   │   └── supabase-client.ts        # Supabase connection
│   ├── testing/
│   │   ├── e2e-test-generator.ts     # Generate E2E tests
│   │   └── test-utils.ts             # Test utility generation
│   └── types/
│       ├── blueprint.types.ts        # Blueprint schema types
│       └── component.types.ts        # Generated component types
├── tests/
│   ├── blueprint-generator.test.ts
│   ├── slot-assembly.test.ts
│   ├── code-generator.test.ts
│   └── supabase-integration.test.ts
└── package.json
```

### 5.2 Blueprint Schema

**Blueprint JSON Structure**:
```typescript
interface Blueprint {
  id: string;
  version: string;
  name: string;
  description: string;
  archetype: string; // Reference to archetype preset
  slots: {
    header?: SlotDefinition;
    content: SlotDefinition; // Required
    sidebar?: SlotDefinition;
    footer?: SlotDefinition;
    [customSlot: string]: SlotDefinition; // Custom slots
  };
  responsive: ResponsiveConfig;
  accessibility: AccessibilityConfig;
  metadata: {
    created: string;
    updated: string;
    author: string;
  };
}

interface SlotDefinition {
  component: string; // Component name from Layer 2
  props: Record<string, any>;
  children?: SlotDefinition[];
  variants?: Record<string, any>;
}

interface ResponsiveConfig {
  breakpoints: {
    sm: string; // e.g., "640px"
    md: string; // e.g., "768px"
    lg: string; // e.g., "1024px"
    xl: string; // e.g., "1280px"
  };
  strategy: "mobile-first" | "desktop-first";
}

interface AccessibilityConfig {
  ariaLabels: Record<string, string>;
  keyboardNav: boolean;
  screenReaderText: Record<string, string>;
}
```

**Example Blueprint (Blog Post Page)**:
```json
{
  "id": "bp-blog-post-001",
  "version": "1.0.0",
  "name": "Blog Post Page",
  "description": "Full-width blog post with sidebar",
  "archetype": "premium-editorial",
  "slots": {
    "header": {
      "component": "Card",
      "props": { "variant": "elevated" },
      "children": [
        { "component": "Badge", "props": { "text": "Featured" } }
      ]
    },
    "content": {
      "component": "Card",
      "props": { "variant": "default" },
      "children": [
        { "component": "Input", "props": { "placeholder": "Article title" } },
        { "component": "Textarea", "props": { "rows": 20 } }
      ]
    },
    "sidebar": {
      "component": "Card",
      "props": { "variant": "ghost" },
      "children": [
        { "component": "Button", "props": { "variant": "primary", "text": "Publish" } }
      ]
    }
  },
  "responsive": {
    "breakpoints": { "sm": "640px", "md": "768px", "lg": "1024px", "xl": "1280px" },
    "strategy": "mobile-first"
  },
  "accessibility": {
    "ariaLabels": { "header": "Article header", "content": "Article editor" },
    "keyboardNav": true,
    "screenReaderText": { "publishBtn": "Publish article" }
  },
  "metadata": {
    "created": "2026-01-19T10:00:00Z",
    "updated": "2026-01-19T10:00:00Z",
    "author": "asleep"
  }
}
```

### 5.3 Slot-Based Assembly

**Slot Resolution Process**:
```typescript
function resolveSlot(slotDef: SlotDefinition, layer2Bindings: Layer2Bindings): ReactNode {
  // 1. Validate component exists in Layer 2
  const binding = layer2Bindings.find(b => b.component === slotDef.component);
  if (!binding) throw new Error(`Component ${slotDef.component} not found in Layer 2`);

  // 2. Validate props against Zod schema
  binding.schema.parse(slotDef.props);

  // 3. Recursively resolve children
  const children = slotDef.children?.map(child => resolveSlot(child, layer2Bindings));

  // 4. Build JSX AST node
  return buildJSXElement(slotDef.component, slotDef.props, children);
}
```

**Generated Component Structure**:
```typescript
// Generated: BlogPostPage.tsx
import React from "react";
import { Card, Badge, Input, Textarea, Button } from "@/components";
import type { BlogPostPageProps } from "./BlogPostPage.types";

export const BlogPostPage: React.FC<BlogPostPageProps> = (props) => {
  return (
    <div className="blog-post-layout">
      <header className="layout-header">
        <Card variant="elevated">
          <Badge text="Featured" />
        </Card>
      </header>

      <main className="layout-content">
        <Card variant="default">
          <Input placeholder="Article title" />
          <Textarea rows={20} />
        </Card>
      </main>

      <aside className="layout-sidebar">
        <Card variant="ghost">
          <Button variant="primary" onClick={props.onPublish}>Publish</Button>
        </Card>
      </aside>
    </div>
  );
};
```

### 5.4 Basic vs Pro Mode

**Basic Mode (AI-Generated Blueprints)**:
- User provides natural language prompt: "Create a blog post editor with sidebar"
- AI (Claude API) generates Blueprint JSON
- User reviews and approves Blueprint
- System generates component from Blueprint
- Blueprint saved to Supabase for future edits

**Pro Mode (User-Editable Blueprints)**:
- User edits Blueprint JSON directly in Monaco Editor
- Real-time schema validation (Zod)
- Autocomplete for component names and props
- Live preview of component changes
- Version control for Blueprint iterations

### 5.5 Supabase Integration

**Database Schema**:
```sql
CREATE TABLE blueprints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  archetype TEXT NOT NULL,
  blueprint JSONB NOT NULL,
  version TEXT NOT NULL,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blueprints_author ON blueprints(author_id);
CREATE INDEX idx_blueprints_archetype ON blueprints(archetype);

-- Row-Level Security
ALTER TABLE blueprints ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own blueprints"
  ON blueprints FOR SELECT
  USING (auth.uid() = author_id);

CREATE POLICY "Users can create blueprints"
  ON blueprints FOR INSERT
  WITH CHECK (auth.uid() = author_id);
```

**Blueprint Storage Operations**:
```typescript
// Save Blueprint
async function saveBlueprint(blueprint: Blueprint, userId: string): Promise<string> {
  const { data, error } = await supabase
    .from("blueprints")
    .insert({
      name: blueprint.name,
      description: blueprint.description,
      archetype: blueprint.archetype,
      blueprint: blueprint,
      version: blueprint.version,
      author_id: userId,
    })
    .select()
    .single();

  if (error) throw error;
  return data.id;
}

// Load Blueprint
async function loadBlueprint(id: string): Promise<Blueprint> {
  const { data, error } = await supabase
    .from("blueprints")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return BlueprintSchema.parse(data.blueprint);
}
```

### 5.6 Responsive Utilities

**Mobile-First Breakpoint System**:
```typescript
// Generated responsive styles
const responsiveStyles = {
  // Base (mobile)
  ".blog-post-layout": {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "1rem",
  },

  // Tablet
  "@media (min-width: 768px)": {
    ".blog-post-layout": {
      gridTemplateColumns: "1fr 250px",
    },
  },

  // Desktop
  "@media (min-width: 1024px)": {
    ".blog-post-layout": {
      gridTemplateColumns: "250px 1fr 250px",
    },
  },
};
```

### 5.7 E2E Test Generation

**Generated Playwright Test**:
```typescript
// Generated: BlogPostPage.spec.ts
import { test, expect } from "@playwright/test";

test.describe("BlogPostPage", () => {
  test("should render all slots correctly", async ({ page }) => {
    await page.goto("/blog-post");
    await expect(page.locator(".layout-header")).toBeVisible();
    await expect(page.locator(".layout-content")).toBeVisible();
    await expect(page.locator(".layout-sidebar")).toBeVisible();
  });

  test("should handle publish button click", async ({ page }) => {
    await page.goto("/blog-post");
    const publishBtn = page.locator('button:has-text("Publish")');
    await publishBtn.click();
    // Assert expected behavior
  });

  test("should be accessible (WCAG AA)", async ({ page }) => {
    await page.goto("/blog-post");
    const results = await page.accessibility.snapshot();
    // Assert WCAG AA compliance
  });
});
```

### 5.8 Performance Targets

- **Blueprint Validation**: < 50ms for typical Blueprint (50-100 lines JSON)
- **Component Generation**: < 500ms for typical component (200-300 lines JSX)
- **Supabase Save/Load**: < 200ms round-trip for Blueprint storage
- **E2E Test Generation**: < 100ms per test file
- **Memory Usage**: < 200MB during generation

---

## 6. Testing Strategy

### 6.1 Unit Test Coverage

**Blueprint Module**:
- AI-generated Blueprint validation
- Pro Mode JSON editing and validation
- Schema compliance verification

**Slot Module**:
- Slot resolution correctness
- Custom slot support
- Recursive child resolution

**Generator Module**:
- AST construction accuracy
- JSX code generation correctness
- TypeScript type generation
- Responsive utility generation

**Supabase Module**:
- Blueprint save/load operations
- Version management
- RLS policy enforcement

**Target Coverage**: ≥ 85% (TRUST 5 requirement)

### 6.2 Integration Test Scenarios

**End-to-End Component Generation**:
- User prompt (Basic Mode) → AI Blueprint → Component generation → File output

**Supabase Integration**:
- Save Blueprint → Load Blueprint → Verify integrity

**Layer 1 + Layer 2 Integration**:
- Load tokens and bindings → Generate component → Validate token references

### 6.3 E2E Test Scenarios

**Generated Component Rendering**:
- Load generated component in browser → Verify visual appearance → Test interactions

**Accessibility Testing**:
- Run automated accessibility checks (axe-core) → Verify WCAG AA compliance

---

## 7. Security Considerations

**SEC-001**: Supabase RLS policies prevent unauthorized Blueprint access
- Row-level security enforces user isolation
- API keys stored in environment variables only

**SEC-002**: Generated code sanitized to prevent XSS vulnerabilities
- All user input escaped in generated JSX
- CSP-compatible code generation

**SEC-003**: Blueprint schema validation prevents code injection
- Zod schema rejects malicious input
- No eval() or dynamic code execution

---

## 8. Quality Gates

### 8.1 TRUST 5 Framework Compliance

- **Test-first**: ≥ 85% test coverage
- **Readable**: Clear naming, JSDoc comments for public APIs
- **Unified**: ESLint + Prettier formatting
- **Secured**: Input validation, safe code generation, RLS policies
- **Trackable**: Git commits reference SPEC-LAYER3-001

### 8.2 Acceptance Criteria

✅ AI generates valid Blueprints from user prompts (Basic Mode)
✅ Blueprint schema validation catches errors (Pro Mode)
✅ Slot-based assembly generates correct component structure
✅ Generated components use Layer 1 tokens and Layer 2 bindings
✅ Supabase Blueprint storage works reliably
✅ Responsive utilities generate mobile-first styles
✅ E2E tests cover 80%+ of component interactions
✅ Generated components pass WCAG AA accessibility checks
✅ Test coverage ≥ 85%
✅ Zero ESLint/TypeScript errors

---

## 9. Traceability

**TAG**: SPEC-LAYER3-001
**Dependencies**:
- SPEC-LAYER1-001 (Token Generator Engine) - REQUIRED
- SPEC-LAYER2-001 (Component Token Binding System) - REQUIRED
**Archetype Documentation**: `docs/archetype-system.md`

---

**END OF SPEC**
