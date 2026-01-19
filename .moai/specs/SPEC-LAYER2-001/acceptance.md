# Acceptance Criteria: SPEC-LAYER2-001 - Component Token Binding System

**TAG**: SPEC-LAYER2-001
**Test Coverage Target**: ≥ 85% (TRUST 5 Framework)
**Dependencies**: SPEC-LAYER1-001 (Token Generator Engine)

---

## 1. Token Validation Acceptance Criteria

### Scenario 1.1: Valid Token Reference Validation

**Given** a component mapping that references tokens existing in Layer 1 metadata
**When** the validator checks all token references
**Then** all references should pass validation
**And** no errors or warnings should be logged
**And** the validation should complete within 100ms

**Test Data**:
```typescript
const layer1Tokens = [
  { name: "color-primary", value: "oklch(0.55 0.15 270)" },
  { name: "color-primary-hover", value: "oklch(0.50 0.15 270)" },
];

const buttonMapping = {
  component: "Button",
  states: {
    default: { backgroundColor: "color-primary" },
    hover: { backgroundColor: "color-primary-hover" },
  }
};
```

**Validation**:
- All token references resolve successfully
- Validation returns `{ valid: true, errors: [] }`
- Execution time < 100ms

---

### Scenario 1.2: Invalid Token Reference Detection

**Given** a component mapping that references non-existent tokens
**When** the validator checks all token references
**Then** the validator should detect invalid references
**And** the validator should provide a detailed error message
**And** the validator should suggest similar tokens if available

**Test Data**:
```typescript
const layer1Tokens = [
  { name: "color-primary", value: "oklch(0.55 0.15 270)" },
];

const buttonMapping = {
  component: "Button",
  states: {
    default: { backgroundColor: "color-primry" }, // Typo
  }
};
```

**Validation**:
- Error message: "Token 'color-primry' not found"
- Suggestion: "Did you mean 'color-primary'?"
- Validation returns `{ valid: false, errors: [...] }`

---

### Scenario 1.3: Token Reference Performance

**Given** all 20 component mappings (100 total states)
**When** the validator checks all token references
**Then** the validation should complete within 100ms
**And** memory usage should remain under 100MB

**Test Procedure**:
```typescript
const start = performance.now();
const result = validateAllComponentMappings(allMappings);
const duration = performance.now() - start;
assert(duration < 100); // milliseconds
```

**Validation**:
- Total validation time < 100ms
- Memory usage < 100MB
- All 100 states validated

---

## 2. State Completeness Acceptance Criteria

### Scenario 2.1: Complete State Coverage Validation

**Given** a component mapping with all 5 required states
**When** the state completeness checker validates the mapping
**Then** the checker should return PASS
**And** no warnings should be logged

**Test Data**:
```typescript
const completeMapping = {
  component: "Button",
  states: {
    default: { /* tokens */ },
    hover: { /* tokens */ },
    focus: { /* tokens */ },
    active: { /* tokens */ },
    disabled: { /* tokens */ },
  }
};
```

**Validation**:
- Completeness check returns `{ complete: true, missingStates: [] }`
- No warnings logged

---

### Scenario 2.2: Incomplete State Coverage Detection

**Given** a component mapping missing required states
**When** the state completeness checker validates the mapping
**Then** the checker should return FAIL
**And** the checker should list all missing states
**And** the checker should prevent binding generation

**Test Data**:
```typescript
const incompleteMapping = {
  component: "Button",
  states: {
    default: { /* tokens */ },
    hover: { /* tokens */ },
    // Missing: focus, active, disabled
  }
};
```

**Validation**:
- Completeness check returns `{ complete: false, missingStates: ["focus", "active", "disabled"] }`
- Error logged: "Button is missing states: focus, active, disabled"
- Binding generation blocked

---

### Scenario 2.3: Custom State Support

**Given** a component with custom states beyond the standard 5
**When** the state completeness checker validates the mapping
**Then** the checker should accept custom states
**And** the checker should still require the standard 5 states
**And** the checker should pass validation if all required states present

**Test Data**:
```typescript
const customStateMapping = {
  component: "Switch",
  states: {
    default: { /* tokens */ },
    hover: { /* tokens */ },
    focus: { /* tokens */ },
    active: { /* tokens */ },
    disabled: { /* tokens */ },
    intermediate: { /* tokens */ }, // Custom state
  }
};
```

**Validation**:
- Completeness check returns `{ complete: true, missingStates: [], customStates: ["intermediate"] }`
- Custom state accepted
- Binding generation proceeds

---

## 3. Component Mapping Acceptance Criteria

### Scenario 3.1: All 20 Components Mapped

**Given** the component mapping registry
**When** the system checks for completeness
**Then** all 20 core hooks should have mappings
**And** each mapping should have all 5 states defined
**And** all token references should be valid

**20 Core Hooks Checklist**:
- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Modal
- [ ] Dropdown
- [ ] Checkbox
- [ ] Radio
- [ ] Switch
- [ ] Slider
- [ ] Badge
- [ ] Alert
- [ ] Toast
- [ ] Tooltip
- [ ] Popover
- [ ] Tabs
- [ ] Accordion
- [ ] Select
- [ ] Textarea
- [ ] Progress
- [ ] Avatar

**Validation**:
- All 20 components present in registry
- 100 total states defined (20 components × 5 states)
- Zero invalid token references

---

### Scenario 3.2: Variant Handling

**Given** a component with multiple variants (e.g., Button primary/secondary/ghost)
**When** the mapping registry resolves variants
**Then** each variant should inherit base states
**And** variant-specific overrides should apply correctly
**And** all variant states should reference valid tokens

**Test Data**:
```typescript
const buttonWithVariants = {
  component: "Button",
  states: { /* base states */ },
  variants: {
    primary: {
      default: { backgroundColor: "color-primary" },
      hover: { backgroundColor: "color-primary-hover" },
    },
    secondary: {
      default: { backgroundColor: "color-secondary" },
      hover: { backgroundColor: "color-secondary-hover" },
    },
  }
};
```

**Validation**:
- Variant inheritance works correctly
- Overrides apply properly
- All variant tokens validated

---

## 4. Zod Schema Generation Acceptance Criteria

### Scenario 4.1: Type-Safe Schema Generation

**Given** component mappings for all 20 hooks
**When** the Zod schema generator processes them
**Then** each component should have a valid Zod schema
**And** TypeScript types should be inferred correctly
**And** schemas should validate props accurately

**Test Data**:
```typescript
const ButtonPropsSchema = z.object({
  variant: z.enum(["default", "primary", "secondary"]),
  size: z.enum(["sm", "md", "lg"]),
  disabled: z.boolean(),
});

type ButtonProps = z.infer<typeof ButtonPropsSchema>;
```

**Validation**:
- Schema validates valid props: `{ variant: "primary", size: "md", disabled: false }` → PASS
- Schema rejects invalid props: `{ variant: "invalid", size: "md" }` → FAIL
- TypeScript type inference works: `ButtonProps` has correct type

---

### Scenario 4.2: Schema Validation Error Messages

**Given** a generated Zod schema for a component
**When** invalid props are validated
**Then** the schema should return descriptive error messages
**And** errors should indicate which field is invalid
**And** errors should suggest valid values

**Test Data**:
```typescript
const invalidProps = {
  variant: "invalid-variant",
  size: "xl", // Not in enum
};

const result = ButtonPropsSchema.safeParse(invalidProps);
```

**Expected Errors**:
```typescript
{
  errors: [
    { path: ["variant"], message: "Invalid enum value. Expected 'default' | 'primary' | 'secondary', received 'invalid-variant'" },
    { path: ["size"], message: "Invalid enum value. Expected 'sm' | 'md' | 'lg', received 'xl'" }
  ]
}
```

**Validation**:
- Errors list all invalid fields
- Messages include expected values
- Error format is actionable

---

### Scenario 4.3: Generated TypeScript Type Accuracy

**Given** generated Zod schemas for all 20 components
**When** TypeScript types are inferred using `z.infer<>`
**Then** all types should compile without errors
**And** types should accurately reflect component props
**And** types should be importable in other files

**Test Data**:
```typescript
// Generated file: button.types.ts
export const ButtonPropsSchema = z.object({ /* ... */ });
export type ButtonProps = z.infer<typeof ButtonPropsSchema>;

// Consumer file: Button.tsx
import type { ButtonProps } from "./button.types";
const Button: React.FC<ButtonProps> = (props) => { /* ... */ };
```

**Validation**:
- TypeScript compiles without errors
- Type inference is accurate
- Imports work correctly

---

## 5. CSS-in-JS Binding Generation Acceptance Criteria

### Scenario 5.1: Stitches Binding Format Validation

**Given** component mappings with token references
**When** the Stitches generator produces bindings
**Then** the bindings should use CSS variable references (`var(--token-name)`)
**And** the bindings should support all 5 states (default, :hover, :focus, :active, :disabled)
**And** the generated code should be valid TypeScript

**Expected Output**:
```typescript
import { styled } from "@stitches/core";

export const ButtonStyled = styled("button", {
  backgroundColor: "var(--color-primary)",
  color: "var(--color-text-on-primary)",

  "&:hover": {
    backgroundColor: "var(--color-primary-hover)",
  },

  "&:focus": {
    borderColor: "var(--color-focus-ring)",
  },

  "&:active": {
    backgroundColor: "var(--color-primary-active)",
  },

  "&:disabled": {
    backgroundColor: "var(--color-disabled)",
    cursor: "not-allowed",
  },
});
```

**Validation**:
- All CSS properties use `var()` syntax
- All 5 states have corresponding selectors
- TypeScript compiles without errors
- Stitches accepts the configuration

---

### Scenario 5.2: Vanilla Extract Binding Format Validation

**Given** component mappings with token references
**When** the Vanilla Extract generator produces bindings
**Then** the bindings should use CSS variable references
**And** the bindings should support all 5 states via selectors
**And** the generated code should be valid TypeScript

**Expected Output**:
```typescript
import { style } from "@vanilla-extract/css";

export const buttonBase = style({
  backgroundColor: "var(--color-primary)",
  color: "var(--color-text-on-primary)",

  selectors: {
    "&:hover": { backgroundColor: "var(--color-primary-hover)" },
    "&:focus": { borderColor: "var(--color-focus-ring)" },
    "&:active": { backgroundColor: "var(--color-primary-active)" },
    "&:disabled": { backgroundColor: "var(--color-disabled)" },
  },
});
```

**Validation**:
- All CSS properties use `var()` syntax
- All 5 states in selectors object
- TypeScript compiles without errors
- Vanilla Extract builds successfully

---

### Scenario 5.3: Zero Hardcoded Values Enforcement

**Given** generated CSS-in-JS bindings for all 20 components
**When** the system checks for hardcoded color/size values
**Then** zero hardcoded values should be detected
**And** all values should reference CSS variables
**And** the system should fail if hardcoded values are found

**Test Procedure**:
```typescript
// Linter rule: detect hardcoded values
const hardcodedPattern = /(#[0-9a-fA-F]{3,6}|rgb\(|rgba\(|hsl\(|[0-9]+px)/;
const generatedCode = fs.readFileSync("button.styles.ts", "utf-8");
const hasHardcoded = hardcodedPattern.test(generatedCode);
assert(!hasHardcoded);
```

**Validation**:
- No hex colors (#fff, #000, etc.)
- No rgb/rgba/hsl values
- No hardcoded pixel values (except for border-width: 1px, which is acceptable)
- All design token values use CSS variables

---

## 6. Integration Acceptance Criteria

### Scenario 6.1: Layer 1 Metadata Consumption

**Given** token metadata exported by SPEC-LAYER1-001
**When** Layer 2 loads the metadata
**Then** the metadata should parse correctly
**And** all tokens should be accessible for validation
**And** no data should be lost during loading

**Test Data**:
```json
{
  "tokens": [
    { "name": "color-primary", "value": "oklch(0.55 0.15 270)", "category": "color" },
    { "name": "font-size-base", "value": "16px", "category": "typography" }
  ]
}
```

**Validation**:
- Metadata loads without errors
- All tokens accessible by name
- Token categories preserved

---

### Scenario 6.2: React Component Integration

**Given** generated Zod schemas and CSS-in-JS bindings
**When** a React component uses them
**Then** the component should render correctly
**And** type-checking should work (TypeScript)
**And** styles should apply correctly in the browser

**Test Data**:
```typescript
import { ButtonStyled } from "./button.styles";
import type { ButtonProps } from "./button.types";

const Button: React.FC<ButtonProps> = ({ variant, size, children }) => (
  <ButtonStyled className={variant} size={size}>
    {children}
  </ButtonStyled>
);
```

**Validation**:
- Component renders without errors
- TypeScript type-checking passes
- Styles apply correctly (visual inspection)

---

### Scenario 6.3: Layer 3 Preparation

**Given** generated bindings and schemas from Layer 2
**When** Layer 3 (Component Generation) attempts to consume them
**Then** the format should match Layer 3's expectations
**And** all required fields should be present
**And** Layer 3 should be able to generate components successfully

**Required Fields for Layer 3**:
- Component name
- Zod schema
- CSS-in-JS bindings (Stitches or Vanilla Extract)
- State list (all 5 states)
- Variant list (if applicable)

**Validation**:
- All fields present in output
- Format matches Layer 3 specification
- Layer 3 can parse without errors

---

## 7. Performance Acceptance Criteria

### Scenario 7.1: Validation Performance

**Given** all 20 component mappings (100 total states)
**When** the validator checks all token references
**Then** validation should complete within 100ms
**And** memory usage should remain under 100MB

**Test Procedure**:
```typescript
const start = performance.now();
const validationResult = validateAllMappings(mappings, layer1Tokens);
const duration = performance.now() - start;
assert(duration < 100);
```

**Validation**:
- Validation time < 100ms
- Memory usage < 100MB

---

### Scenario 7.2: Schema Generation Performance

**Given** all 20 component mappings
**When** the Zod schema generator produces schemas
**Then** generation should complete within 200ms
**And** memory usage should remain under 100MB

**Test Procedure**:
```typescript
const start = performance.now();
const schemas = generateAllSchemas(mappings);
const duration = performance.now() - start;
assert(duration < 200);
```

**Validation**:
- Schema generation time < 200ms
- Memory usage < 100MB

---

### Scenario 7.3: CSS-in-JS Generation Performance

**Given** all 20 component mappings
**When** the CSS-in-JS generator produces bindings (Stitches + Vanilla Extract)
**Then** generation should complete within 300ms
**And** memory usage should remain under 150MB

**Test Procedure**:
```typescript
const start = performance.now();
const stitchesBindings = generateStitchesBindings(mappings);
const vanillaExtractBindings = generateVanillaExtractBindings(mappings);
const duration = performance.now() - start;
assert(duration < 300);
```

**Validation**:
- Total generation time < 300ms
- Memory usage < 150MB

---

## 8. Security Acceptance Criteria

### Scenario 8.1: Token Reference Injection Prevention

**Given** a malicious token reference with code injection attempt
**When** the validator processes the reference
**Then** the validator should reject the input
**And** no code execution should occur
**And** a security warning should be logged

**Test Data**:
```typescript
const maliciousMapping = {
  component: "Button",
  states: {
    default: { backgroundColor: "'; alert('xss'); '" }, // Injection attempt
  }
};
```

**Validation**:
- Input rejected by validator
- No code executed
- Security warning logged

---

### Scenario 8.2: Generated Code Safety

**Given** generated CSS-in-JS bindings
**When** the code is executed in a browser
**Then** no XSS vulnerabilities should exist
**And** all dynamic content should be escaped
**And** CSP (Content Security Policy) should not be violated

**Test Procedure**:
1. Generate bindings with various inputs
2. Run security scanner on generated code
3. Test in browser with CSP enabled

**Validation**:
- Zero XSS vulnerabilities
- All dynamic content escaped
- CSP compliance verified

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
- **Requirement**: Full pipeline < 500ms (validation + schema + CSS-in-JS generation)
- **Validation**: Run performance benchmark suite
- **Failure Action**: Profile and optimize hot paths

### 9.4 Completeness Gate
- **Requirement**: All 20 components mapped with all 5 states
- **Validation**: Check mapping registry completeness
- **Failure Action**: Complete missing mappings

---

## 10. Definition of Done

### Functional Completeness
- ✅ All 20 components have complete token mappings (5 states each)
- ✅ All token references validated against Layer 1 metadata
- ✅ All Zod schemas generated and type-safe
- ✅ Both Stitches and Vanilla Extract bindings generated
- ✅ Zero hardcoded values in bindings

### Quality Completeness
- ✅ Test coverage ≥ 85%
- ✅ All acceptance scenarios pass
- ✅ Zero ESLint errors
- ✅ Zero TypeScript errors
- ✅ Performance benchmarks met (< 500ms full pipeline)

### Integration Completeness
- ✅ Layer 1 metadata consumed successfully
- ✅ React components work with generated schemas and styles
- ✅ Layer 3 can consume generated bindings

### Documentation Completeness
- ✅ API documentation complete (JSDoc)
- ✅ Token mapping documentation generated
- ✅ Usage examples provided for both CSS-in-JS libraries

---

**TAG**: SPEC-LAYER2-001
**Test Framework**: Vitest
**Coverage Tool**: @vitest/coverage-v8
**Dependencies**: SPEC-LAYER1-001 (Token Generator Engine)
**Last Updated**: 2026-01-19
