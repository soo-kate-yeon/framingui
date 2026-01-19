# Acceptance Criteria: SPEC-LAYER3-001 - Component Generation Engine

**TAG**: SPEC-LAYER3-001
**Test Coverage Target**: ≥ 85% (TRUST 5 Framework)
**Dependencies**: SPEC-LAYER1-001, SPEC-LAYER2-001
**WCAG Compliance**: AA Level

---

## 1. Blueprint System Acceptance Criteria

### Scenario 1.1: Basic Mode - AI Blueprint Generation from Natural Language

**Given** a user provides a natural language prompt describing a component
**When** the AI Blueprint generator processes the prompt
**Then** a valid Blueprint JSON should be generated
**And** the Blueprint should conform to the Zod schema
**And** the generation should complete within 5 seconds

**Test Data**:
```
User Prompt: "Create a blog post editor with header, content area for title and body, and sidebar with publish button"
```

**Expected Blueprint Structure**:
```json
{
  "id": "bp-blog-editor",
  "name": "Blog Editor",
  "archetype": "premium-editorial",
  "slots": {
    "header": { "component": "Card" },
    "content": {
      "component": "Card",
      "children": [
        { "component": "Input", "props": { "placeholder": "Title" } },
        { "component": "Textarea", "props": { "rows": 20 } }
      ]
    },
    "sidebar": {
      "component": "Card",
      "children": [{ "component": "Button", "props": { "variant": "primary" } }]
    }
  }
}
```

**Validation**:
- Blueprint passes Zod schema validation
- All slot components exist in Layer 2
- Generation time < 5 seconds
- No errors or warnings

---

### Scenario 1.2: Pro Mode - Manual Blueprint Editing with Validation

**Given** a user manually edits a Blueprint JSON
**When** the Blueprint is validated
**Then** schema validation should detect errors immediately
**And** descriptive error messages should guide the user
**And** validation should complete within 50ms

**Test Data**:
```json
{
  "id": "bp-invalid",
  "name": "Invalid Blueprint",
  "slots": {
    "content": {
      "component": "NonExistentComponent",
      "props": { "invalid": true }
    }
  }
}
```

**Expected Errors**:
```typescript
{
  errors: [
    { path: ["archetype"], message: "Required field 'archetype' is missing" },
    { path: ["slots", "content", "component"], message: "Component 'NonExistentComponent' not found in Layer 2" }
  ]
}
```

**Validation**:
- Missing required fields detected
- Invalid component names flagged
- Error messages include path and suggestion
- Validation time < 50ms

---

### Scenario 1.3: Blueprint Schema Compliance

**Given** a complete Blueprint JSON
**When** the schema validator checks all fields
**Then** all required fields should be present
**And** all field types should match schema definitions
**And** all component references should resolve to Layer 2 bindings

**Required Fields Checklist**:
- [ ] `id` (string, unique)
- [ ] `version` (string, semver format)
- [ ] `name` (string, non-empty)
- [ ] `description` (string)
- [ ] `archetype` (string, valid archetype ID)
- [ ] `slots.content` (SlotDefinition, required)
- [ ] `responsive` (ResponsiveConfig)
- [ ] `accessibility` (AccessibilityConfig)
- [ ] `metadata` (created, updated, author)

**Validation**:
- All required fields present
- All types match schema
- All component references valid

---

## 2. Slot-Based Assembly Acceptance Criteria

### Scenario 2.1: Standard Slot Resolution

**Given** a Blueprint with standard slots (header, content, sidebar, footer)
**When** the slot resolver processes the Blueprint
**Then** all slots should resolve to Layer 2 components
**And** slot props should validate against component schemas
**And** resolution should complete within 100ms

**Test Data**:
```json
{
  "slots": {
    "header": { "component": "Card", "props": { "variant": "elevated" } },
    "content": { "component": "Input", "props": { "placeholder": "Enter text" } },
    "sidebar": { "component": "Button", "props": { "variant": "primary" } },
    "footer": { "component": "Badge", "props": { "text": "Status" } }
  }
}
```

**Validation**:
- All 4 slots resolve successfully
- All components found in Layer 2
- All props validated against schemas
- Resolution time < 100ms

---

### Scenario 2.2: Recursive Child Slot Resolution

**Given** a Blueprint with nested child slots
**When** the slot resolver processes children recursively
**Then** all nested children should resolve correctly
**And** the hierarchy should be preserved
**And** deep nesting (5+ levels) should work without errors

**Test Data**:
```json
{
  "slots": {
    "content": {
      "component": "Card",
      "children": [
        {
          "component": "Card",
          "children": [
            { "component": "Input" },
            { "component": "Button" }
          ]
        }
      ]
    }
  }
}
```

**Validation**:
- All nested children resolved
- Hierarchy preserved in output
- No infinite recursion
- Memory usage reasonable

---

### Scenario 2.3: Custom Slot Support

**Given** a Blueprint with custom slots beyond standard (header/content/footer/sidebar)
**When** the slot resolver processes custom slots
**Then** custom slots should be supported
**And** custom slot names should be preserved
**And** custom slots should render correctly in generated component

**Test Data**:
```json
{
  "slots": {
    "content": { "component": "Card" },
    "customSlot": { "component": "Badge", "props": { "text": "Custom" } }
  }
}
```

**Validation**:
- Custom slot `customSlot` resolves successfully
- Custom slot name preserved in component
- Generated component includes custom slot

---

## 3. Code Generation Acceptance Criteria

### Scenario 3.1: React JSX Code Generation

**Given** a resolved Blueprint with all slots
**When** the JSX generator produces React code
**Then** the code should be valid TypeScript JSX
**And** the code should compile without errors
**And** the code should be formatted with Prettier

**Expected Output**:
```typescript
// Generated: BlogEditor.tsx
import React from "react";
import { Card, Input, Textarea, Button } from "@/components";

export const BlogEditor: React.FC = () => {
  return (
    <div className="blog-editor-layout">
      <header className="layout-header">
        <Card variant="elevated" />
      </header>
      <main className="layout-content">
        <Card>
          <Input placeholder="Title" />
          <Textarea rows={20} />
        </Card>
      </main>
      <aside className="layout-sidebar">
        <Card>
          <Button variant="primary">Publish</Button>
        </Card>
      </aside>
    </div>
  );
};
```

**Validation**:
- Code is valid TypeScript
- JSX syntax correct
- Imports are correct
- Prettier formatting applied
- TypeScript compiles with zero errors

---

### Scenario 3.2: TypeScript Type Generation

**Given** a generated component
**When** the TypeScript type generator creates `.types.ts`
**Then** prop types should be inferred from Blueprint
**And** types should be exportable and reusable
**And** types should compile without errors

**Expected Output**:
```typescript
// Generated: BlogEditor.types.ts
import type { ReactNode } from "react";

export interface BlogEditorProps {
  onPublish?: () => void;
  children?: ReactNode;
}

export type { BlogEditorProps as default };
```

**Validation**:
- Types exported correctly
- TypeScript compiles types
- Types usable in other files

---

### Scenario 3.3: Layer 1 Token and Layer 2 Binding Integration

**Given** a generated component
**When** the code references styles
**Then** all color/size values should use CSS variables from Layer 1
**And** all component bindings should use Layer 2 schemas
**And** zero hardcoded design values should exist

**Generated Code Check**:
```typescript
// Good: Uses CSS variables
backgroundColor: "var(--color-primary)"

// Bad: Hardcoded values
backgroundColor: "#3b82f6" // ❌ FAIL
```

**Validation**:
- All styles use `var(--token-name)` syntax
- Zero hardcoded hex/rgb colors
- Zero hardcoded pixel sizes (except for border-width: 1px)
- Layer 2 binding schemas imported and used

---

### Scenario 3.4: Responsive Utility Generation

**Given** a Blueprint with responsive configuration
**When** the responsive utility generator creates styles
**Then** mobile-first breakpoints should be applied
**And** media queries should match Blueprint breakpoints
**And** styles should work on all viewport sizes

**Expected Output**:
```typescript
const styles = {
  ".blog-editor-layout": {
    display: "grid",
    gridTemplateColumns: "1fr", // Mobile: single column
  },

  "@media (min-width: 768px)": {
    ".blog-editor-layout": {
      gridTemplateColumns: "1fr 250px", // Tablet: content + sidebar
    },
  },

  "@media (min-width: 1024px)": {
    ".blog-editor-layout": {
      gridTemplateColumns: "250px 1fr 250px", // Desktop: full layout
    },
  },
};
```

**Validation**:
- Mobile-first approach (base styles for smallest viewport)
- Media queries use Blueprint breakpoints
- Styles tested on mobile, tablet, desktop

---

## 4. Supabase Integration Acceptance Criteria

### Scenario 4.1: Blueprint Save Operation

**Given** a valid Blueprint
**When** the Blueprint is saved to Supabase
**Then** the Blueprint should be stored with version number
**And** the save operation should complete within 200ms
**And** the Blueprint should be retrievable by ID

**Test Procedure**:
```typescript
const blueprint = { /* valid Blueprint */ };
const blueprintId = await saveBlueprint(blueprint, userId);
const retrieved = await loadBlueprint(blueprintId);
assert(retrieved.id === blueprint.id);
```

**Validation**:
- Save operation completes within 200ms
- Blueprint stored with correct version
- Retrieved Blueprint matches original

---

### Scenario 4.2: Blueprint Load Operation

**Given** a Blueprint ID
**When** the Blueprint is loaded from Supabase
**Then** the Blueprint should be deserialized correctly
**And** the load operation should complete within 200ms
**And** the Blueprint should pass schema validation

**Test Procedure**:
```typescript
const blueprintId = "bp-test-001";
const blueprint = await loadBlueprint(blueprintId);
const validationResult = BlueprintSchema.safeParse(blueprint);
assert(validationResult.success === true);
```

**Validation**:
- Load operation completes within 200ms
- Blueprint deserialized correctly
- Schema validation passes

---

### Scenario 4.3: Row-Level Security (RLS) Enforcement

**Given** two users with different Supabase user IDs
**When** User A attempts to access User B's Blueprint
**Then** the access should be denied by RLS policies
**And** an authorization error should be returned
**And** User A should only see their own Blueprints

**Test Procedure**:
```typescript
// User A creates Blueprint
const userABlueprint = await saveBlueprint(blueprint, "user-a-id");

// User B attempts to load User A's Blueprint
const result = await loadBlueprint(userABlueprint.id, "user-b-id");
assert(result.error === "Authorization denied");
```

**Validation**:
- User isolation enforced
- Authorization error returned
- Users only see own Blueprints

---

### Scenario 4.4: Offline Fallback

**Given** Supabase is unavailable (network error or service down)
**When** a Blueprint save/load operation is attempted
**Then** the system should fall back to local file storage
**And** no data should be lost
**And** sync should occur when Supabase becomes available

**Test Procedure**:
```typescript
// Simulate Supabase unavailable
simulateNetworkError();

// Save Blueprint (should use local fallback)
const blueprintId = await saveBlueprint(blueprint, userId);
assert(localStorage.getItem(`blueprint-${blueprintId}`) !== null);

// Restore network
restoreNetwork();

// Sync should occur automatically
await syncLocalBlueprintsToSupabase();
const synced = await loadBlueprint(blueprintId);
assert(synced !== null);
```

**Validation**:
- Local fallback works without errors
- No data loss during offline period
- Sync completes when online

---

## 5. E2E Testing and Accessibility Acceptance Criteria

### Scenario 5.1: E2E Test Generation

**Given** a generated component with interactive elements
**When** the E2E test generator creates Playwright tests
**Then** tests should cover all buttons, inputs, and interactions
**And** tests should include accessibility checks
**And** tests should run successfully with the component

**Expected Test Output**:
```typescript
// Generated: BlogEditor.spec.ts
import { test, expect } from "@playwright/test";

test.describe("BlogEditor", () => {
  test("should render all slots", async ({ page }) => {
    await page.goto("/blog-editor");
    await expect(page.locator(".layout-header")).toBeVisible();
    await expect(page.locator(".layout-content")).toBeVisible();
    await expect(page.locator(".layout-sidebar")).toBeVisible();
  });

  test("should handle publish button click", async ({ page }) => {
    await page.goto("/blog-editor");
    const publishBtn = page.locator('button:has-text("Publish")');
    await publishBtn.click();
    // Assert expected behavior
  });
});
```

**Validation**:
- Tests generated for all interactive elements
- Tests run successfully
- 80%+ interaction coverage

---

### Scenario 5.2: WCAG AA Accessibility Compliance

**Given** a generated component
**When** automated accessibility checks are run (axe-core)
**Then** the component should pass WCAG AA criteria
**And** all interactive elements should have ARIA labels
**And** keyboard navigation should work correctly

**Accessibility Checklist**:
- [ ] All buttons have accessible names
- [ ] All inputs have labels
- [ ] Focus indicators visible (outline or ring)
- [ ] Color contrast ratios meet WCAG AA (validated by Layer 1)
- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Screen reader text provided for icons

**Test Procedure**:
```typescript
import { injectAxe, checkA11y } from "axe-playwright";

test("should pass WCAG AA checks", async ({ page }) => {
  await page.goto("/blog-editor");
  await injectAxe(page);
  await checkA11y(page, null, { detailedReport: true });
});
```

**Validation**:
- Zero WCAG AA violations
- All accessibility best practices followed
- Keyboard navigation verified

---

### Scenario 5.3: Storybook Story Generation (Optional)

**Given** a generated component with variants
**When** the Storybook story generator creates stories
**Then** stories should render all component variants
**And** stories should include interactive controls
**And** stories should work in Storybook

**Expected Story Output**:
```typescript
// Generated: BlogEditor.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { BlogEditor } from "./BlogEditor";

const meta: Meta<typeof BlogEditor> = {
  title: "Components/BlogEditor",
  component: BlogEditor,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BlogEditor>;

export const Default: Story = {};

export const WithContent: Story = {
  args: {
    initialTitle: "My Blog Post",
    initialBody: "This is the content...",
  },
};
```

**Validation**:
- Stories render correctly
- Controls work in Storybook
- All variants included

---

## 6. Performance Acceptance Criteria

### Scenario 6.1: Blueprint Validation Performance

**Given** a typical Blueprint (50-100 lines JSON)
**When** the schema validator checks the Blueprint
**Then** validation should complete within 50ms
**And** memory usage should remain under 50MB

**Test Procedure**:
```typescript
const start = performance.now();
const result = BlueprintSchema.safeParse(blueprint);
const duration = performance.now() - start;
assert(duration < 50);
```

**Validation**:
- Validation time < 50ms
- Memory usage < 50MB

---

### Scenario 6.2: Component Generation Performance

**Given** a typical Blueprint with 3-5 slots
**When** the full generation pipeline runs (AST → JSX → TypeScript types)
**Then** generation should complete within 500ms
**And** memory usage should remain under 200MB

**Test Procedure**:
```typescript
const start = performance.now();
const component = await generateComponent(blueprint);
const duration = performance.now() - start;
assert(duration < 500);
```

**Validation**:
- Generation time < 500ms
- Memory usage < 200MB

---

### Scenario 6.3: Full Pipeline Performance (Prompt to Code)

**Given** a user prompt in Basic Mode
**When** the full pipeline executes (AI → Blueprint → Component → Files)
**Then** the entire process should complete within 6 seconds
**And** memory usage should remain under 300MB

**Test Procedure**:
```typescript
const start = performance.now();
const prompt = "Create a blog editor with header, content, and sidebar";
const files = await generateComponentFromPrompt(prompt);
const duration = performance.now() - start;
assert(duration < 6000); // 6 seconds
```

**Validation**:
- Full pipeline < 6 seconds (including AI call ~5s)
- Memory usage < 300MB
- All files generated successfully

---

## 7. Security Acceptance Criteria

### Scenario 7.1: Code Injection Prevention

**Given** a malicious Blueprint with script injection attempts
**When** the Blueprint is validated
**Then** the Blueprint should be rejected
**And** no code execution should occur
**And** a security warning should be logged

**Test Data**:
```json
{
  "slots": {
    "content": {
      "component": "'; alert('xss'); //",
      "props": { "onClick": "eval('malicious code')" }
    }
  }
}
```

**Validation**:
- Blueprint rejected by schema validator
- No code executed
- Security warning logged

---

### Scenario 7.2: Supabase API Key Protection

**Given** the Supabase integration
**When** generated code is inspected
**Then** no API keys should be exposed in client-side code
**And** API keys should be stored in environment variables only
**And** generated bundles should not contain secrets

**Test Procedure**:
```typescript
// Check generated code for API keys
const generatedCode = fs.readFileSync("BlogEditor.tsx", "utf-8");
const hasApiKey = /supabase[_-]?api[_-]?key/i.test(generatedCode);
assert(!hasApiKey);
```

**Validation**:
- Zero API keys in generated code
- Environment variables used correctly
- Bundles do not expose secrets

---

## 8. Integration Acceptance Criteria

### Scenario 8.1: Layer 1 + Layer 2 + Layer 3 Integration

**Given** tokens from Layer 1 and bindings from Layer 2
**When** Layer 3 generates a component
**Then** the component should use Layer 1 tokens
**And** the component should use Layer 2 bindings
**And** the component should compile without errors
**And** the component should render correctly in a browser

**Test Procedure**:
1. Load Layer 1 tokens (CSS variables)
2. Load Layer 2 bindings (TypeScript schemas + CSS-in-JS)
3. Generate component with Layer 3
4. Verify token references in generated code
5. Verify binding usage in generated code
6. Compile component with TypeScript
7. Render component in test browser

**Validation**:
- All layers integrated successfully
- Token references correct (`var(--token-name)`)
- Binding schemas used
- Component compiles and renders

---

### Scenario 8.2: Production React Application Integration

**Given** a generated component
**When** the component is imported into a production React app
**Then** the component should render without errors
**And** the component should be fully functional
**And** the component should pass production build

**Test Procedure**:
```typescript
// Import generated component
import { BlogEditor } from "./generated/BlogEditor";

// Use in production app
const App = () => (
  <div>
    <BlogEditor onPublish={() => console.log("Published")} />
  </div>
);

// Production build
npm run build
```

**Validation**:
- Component imports successfully
- Component renders in production
- Production build passes

---

## 9. Quality Gate Criteria (TRUST 5 Framework)

### 9.1 Test Coverage Gate
- **Requirement**: ≥ 85% code coverage
- **Validation**: Run `vitest --coverage`
- **Failure Action**: Block merge until coverage increases

### 9.2 Code Quality Gate
- **Requirement**: Zero ESLint errors, zero TypeScript errors
- **Validation**: Run `eslint .` and `tsc --noEmit`
- **Failure Action**: Fix errors before merge

### 9.3 Performance Gate
- **Requirement**: Full pipeline < 6 seconds (prompt to code)
- **Validation**: Run performance benchmark suite
- **Failure Action**: Profile and optimize hot paths

### 9.4 Accessibility Gate
- **Requirement**: Generated components pass WCAG AA
- **Validation**: Run axe-core accessibility checks
- **Failure Action**: Fix accessibility violations

### 9.5 Security Gate
- **Requirement**: No exposed API keys, no code injection vulnerabilities
- **Validation**: Security audit, code scanning
- **Failure Action**: Fix security issues before merge

---

## 10. Definition of Done

### Functional Completeness
- ✅ AI generates valid Blueprints from user prompts (Basic Mode)
- ✅ Users can manually edit Blueprints (Pro Mode)
- ✅ Blueprint schema validation works correctly
- ✅ Slot-based assembly generates correct components
- ✅ Generated components use Layer 1 tokens and Layer 2 bindings
- ✅ Supabase Blueprint storage works with versioning
- ✅ Responsive utilities generate mobile-first styles
- ✅ E2E tests generated for all components
- ✅ Generated components pass WCAG AA checks

### Quality Completeness
- ✅ Test coverage ≥ 85%
- ✅ All acceptance scenarios pass
- ✅ Zero ESLint errors
- ✅ Zero TypeScript errors
- ✅ Performance benchmarks met (< 6s full pipeline)
- ✅ Accessibility tests pass

### Integration Completeness
- ✅ Layer 1 + Layer 2 + Layer 3 integration verified
- ✅ Generated components work in production React apps
- ✅ Supabase RLS policies enforce security

### Documentation Completeness
- ✅ API documentation complete (JSDoc)
- ✅ Blueprint schema documented
- ✅ Usage examples provided
- ✅ Migration guide for existing components

---

**TAG**: SPEC-LAYER3-001
**Test Framework**: Vitest, Playwright
**Coverage Tool**: @vitest/coverage-v8
**Dependencies**: SPEC-LAYER1-001, SPEC-LAYER2-001
**Last Updated**: 2026-01-19
