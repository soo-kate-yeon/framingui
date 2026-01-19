# Acceptance Criteria: SPEC-LAYER1-001 - Token Generator Engine

**TAG**: SPEC-LAYER1-001
**Test Coverage Target**: ≥ 85% (TRUST 5 Framework)
**WCAG Compliance**: AA Level (4.5:1 text, 3:1 UI)

---

## 1. Parser Acceptance Criteria

### Scenario 1.1: Valid Archetype JSON Parsing

**Given** a valid archetype JSON preset file with all required fields
**When** the parser processes the file
**Then** the parser should extract all token definitions without errors
**And** the parsed structure should match the TypeScript schema
**And** no data should be lost during parsing

**Test Data**:
```json
{
  "id": "premium-editorial",
  "name": "Premium Editorial",
  "colors": {
    "primary": { "oklch": [0.55, 0.15, 270] },
    "surface": { "oklch": [0.98, 0.01, 270] },
    "text": { "oklch": [0.25, 0.02, 270] }
  }
}
```

**Validation**:
- Parsed colors array contains 3 entries
- Each color has correct OKLCH values
- ID and name fields correctly extracted

---

### Scenario 1.2: Invalid JSON Error Handling

**Given** an archetype JSON file with syntax errors (malformed JSON)
**When** the parser attempts to process the file
**Then** the parser should throw a descriptive error
**And** the error should indicate the line/column of the syntax error
**And** the parser should not crash or hang

**Test Data**:
```json
{
  "id": "invalid-preset",
  "colors": {
    "primary": { "oklch": [0.55, 0.15, 270] }
  } // Missing closing brace
```

**Validation**:
- Error message includes "Invalid JSON syntax"
- Error message includes line number
- Parser returns controlled error (not unhandled exception)

---

### Scenario 1.3: Schema Validation Rejection

**Given** a JSON file with valid syntax but invalid schema (missing required fields)
**When** the schema validator processes the file
**Then** the validator should reject the input
**And** the validator should list all missing required fields
**And** the validator should not proceed to token generation

**Test Data**:
```json
{
  "name": "Invalid Preset"
  // Missing "id" and "colors" fields
}
```

**Validation**:
- Error message: "Missing required field: id"
- Error message: "Missing required field: colors"
- No tokens generated

---

## 2. OKLCH Color Conversion Acceptance Criteria

### Scenario 2.1: Accurate OKLCH to RGB Conversion

**Given** a set of OKLCH color values within sRGB gamut
**When** the converter transforms them to RGB
**Then** the RGB values should be accurate within 1% tolerance
**And** the RGB values should be within valid range [0, 255]
**And** the conversion should preserve perceptual characteristics

**Test Data**:
| OKLCH Input | Expected RGB | Tolerance |
|-------------|--------------|-----------|
| [0.50, 0.10, 270] | rgb(93, 108, 151) | ±2 per channel |
| [0.70, 0.15, 120] | rgb(123, 185, 90) | ±2 per channel |
| [0.30, 0.05, 30] | rgb(85, 68, 68) | ±2 per channel |

**Validation**:
- Convert each OKLCH value to RGB
- Compare against expected values
- Assert difference ≤ 2 per channel (< 1% of 255)

---

### Scenario 2.2: sRGB Gamut Clipping for Out-of-Gamut Colors

**Given** an OKLCH color value outside the sRGB gamut
**When** the converter applies gamut clipping
**Then** the resulting RGB should be within valid range [0, 255]
**And** the clipped color should preserve lightness as much as possible
**And** the clipped color should be visually similar to the original

**Test Data**:
```typescript
// Highly saturated colors outside sRGB
const outOfGamut = [
  { oklch: [0.70, 0.40, 270], expectedClipped: true },
  { oklch: [0.50, 0.35, 180], expectedClipped: true }
];
```

**Validation**:
- Clipped RGB values all within [0, 255]
- Lightness difference < 5% from original
- Chroma reduced incrementally until in-gamut

---

### Scenario 2.3: Edge Case Color Conversions

**Given** edge case color values (pure black, pure white, grayscale)
**When** the converter processes them
**Then** the RGB output should be correct
**And** no NaN or Infinity values should appear
**And** grayscale should have equal RGB channels

**Test Data**:
| OKLCH Input | Expected RGB | Description |
|-------------|--------------|-------------|
| [0.00, 0.00, 0] | rgb(0, 0, 0) | Pure black |
| [1.00, 0.00, 0] | rgb(255, 255, 255) | Pure white |
| [0.50, 0.00, 0] | rgb(127, 127, 127) | Mid gray |

**Validation**:
- Black converts to rgb(0, 0, 0)
- White converts to rgb(255, 255, 255)
- Grayscale has R = G = B

---

## 3. WCAG Contrast Validation Acceptance Criteria

### Scenario 3.1: WCAG AA Compliance for Text (4.5:1)

**Given** a foreground and background color pair intended for text
**When** the contrast ratio is calculated
**Then** the ratio should be at least 4.5:1 for normal text
**And** the ratio should be at least 3:1 for large text (18pt+)
**And** the validation should return PASS for compliant pairs

**Test Data**:
| Foreground | Background | Expected Ratio | Compliance |
|------------|------------|----------------|------------|
| rgb(0, 0, 0) | rgb(255, 255, 255) | 21:1 | PASS |
| rgb(85, 85, 85) | rgb(255, 255, 255) | 5.7:1 | PASS |
| rgb(150, 150, 150) | rgb(255, 255, 255) | 2.9:1 | FAIL |

**Validation**:
- Calculate contrast ratio using WCAG formula
- Assert ratio ≥ 4.5:1 for PASS cases
- Assert ratio < 4.5:1 for FAIL cases

---

### Scenario 3.2: WCAG AA Compliance for UI Components (3:1)

**Given** a foreground and background color pair for UI elements (buttons, borders)
**When** the contrast ratio is calculated
**Then** the ratio should be at least 3:1
**And** the validation should return PASS for compliant pairs

**Test Data**:
| Foreground | Background | Expected Ratio | Compliance |
|------------|------------|----------------|------------|
| rgb(100, 100, 100) | rgb(255, 255, 255) | 4.2:1 | PASS |
| rgb(180, 180, 180) | rgb(255, 255, 255) | 2.1:1 | FAIL |

**Validation**:
- Calculate contrast ratio
- Assert ratio ≥ 3:1 for PASS cases

---

### Scenario 3.3: Automatic Contrast Adjustment

**Given** a color pair that fails WCAG AA compliance
**When** the auto-adjustment algorithm is applied
**Then** the adjusted foreground color should meet WCAG AA thresholds
**And** the adjustment should preserve hue as much as possible
**And** the adjustment should complete within 20 iterations

**Test Data**:
```typescript
// Insufficient contrast (2.5:1)
const foreground = rgb(150, 150, 150);
const background = rgb(255, 255, 255);
const threshold = 4.5; // Text threshold
```

**Validation**:
- Initial contrast ratio: 2.9:1 (FAIL)
- After adjustment: ≥ 4.5:1 (PASS)
- Iterations used: ≤ 20
- Hue preserved (± 5 degrees)

---

### Scenario 3.4: Impossible Contrast Adjustment Warning

**Given** a color pair where WCAG AA cannot be achieved (e.g., light yellow on white)
**When** the auto-adjustment algorithm attempts to fix it
**Then** the system should log a warning after 20 failed iterations
**And** the warning should include the actual contrast ratio achieved
**And** the warning should suggest manual intervention

**Test Data**:
```typescript
const foreground = rgb(255, 255, 200); // Very light yellow
const background = rgb(255, 255, 255); // White
```

**Validation**:
- Warning logged: "Cannot achieve WCAG AA: actual ratio 1.2:1, required 4.5:1"
- Suggested alternatives logged
- Process does not crash

---

## 4. Token Generation Acceptance Criteria

### Scenario 4.1: CSS Variable Output Format Validation

**Given** a complete set of parsed tokens
**When** the CSS generator produces output
**Then** the output should be valid CSS custom properties
**And** the CSS should pass CSS linting (stylelint)
**And** the CSS variables should follow kebab-case naming convention

**Expected Output**:
```css
:root {
  --color-primary: oklch(0.55 0.15 270);
  --color-primary-rgb: rgb(91, 101, 194);
  --color-surface: oklch(0.98 0.01 270);
  --color-text: oklch(0.25 0.02 270);
  --font-size-base: 16px;
}
```

**Validation**:
- CSS parses without errors
- All variable names use kebab-case
- Both OKLCH and RGB formats present

---

### Scenario 4.2: Tailwind Configuration Output Validation

**Given** a complete set of parsed tokens
**When** the Tailwind generator produces output
**Then** the output should be a valid Tailwind configuration object
**And** the config should pass Tailwind validation
**And** the config should extend theme correctly

**Expected Output**:
```typescript
export default {
  theme: {
    extend: {
      colors: {
        primary: 'oklch(0.55 0.15 270)',
        surface: 'oklch(0.98 0.01 270)',
        text: 'oklch(0.25 0.02 270)',
      },
      fontSize: {
        base: '16px',
      },
    },
  },
};
```

**Validation**:
- Config loads in Tailwind without errors
- Theme extension structure correct
- Color names match archetype

---

### Scenario 4.3: Deterministic Token Generation

**Given** the same archetype JSON input
**When** the token generator is run multiple times
**Then** the output should be identical across all runs
**And** no timestamps, random values, or UUIDs should appear in output
**And** the output should be byte-for-byte identical

**Test Procedure**:
1. Generate tokens from preset 3 times
2. Compare outputs using hash (SHA-256)
3. Assert all hashes are identical

**Validation**:
- Hash 1 = Hash 2 = Hash 3
- No variation in output
- Determinism confirmed

---

## 5. Performance Acceptance Criteria

### Scenario 5.1: Token Generation Speed

**Given** a typical archetype preset (50-100 tokens)
**When** the full token generation pipeline executes
**Then** the total time should be less than 100ms
**And** the parser should complete in < 50ms
**And** the color conversions should complete in < 30ms

**Test Procedure**:
```typescript
const start = performance.now();
const tokens = generateTokens(archetypePreset);
const duration = performance.now() - start;
assert(duration < 100); // milliseconds
```

**Validation**:
- Parse time: < 50ms
- Conversion time: < 30ms
- Total time: < 100ms

---

### Scenario 5.2: Token Cache Performance

**Given** a token cache with previously generated tokens
**When** the same archetype preset is requested again
**Then** the cache should return tokens in < 10ms
**And** the cache should not regenerate tokens
**And** the cache should correctly invalidate when preset changes

**Test Procedure**:
1. Generate tokens (cache miss) → ~100ms
2. Request same tokens (cache hit) → < 10ms
3. Modify preset → cache invalidated
4. Generate tokens (cache miss) → ~100ms

**Validation**:
- Cache hit time: < 10ms (80%+ improvement)
- Cache invalidation works correctly

---

## 6. Integration Acceptance Criteria

### Scenario 6.1: Real Preset Processing

**Given** an existing archetype preset from `packages/studio-mcp/src/preset/presets/`
**When** the token generator processes it
**Then** all tokens should generate successfully
**And** no errors or warnings should occur
**And** the output should match expected format

**Test Presets**:
- `premium-editorial.json`
- `calm-wellness.json`
- `dynamic-fitness.json`
- `korean-fintech.json`

**Validation**:
- All 4 presets parse without errors
- All 4 presets generate valid CSS + Tailwind
- All 4 presets pass WCAG AA validation

---

### Scenario 6.2: Layer 2 Metadata Export

**Given** generated tokens from Layer 1
**When** Layer 2 (Component Token Binding) consumes the metadata
**Then** the metadata should include all required fields
**And** the metadata should be parseable by Layer 2
**And** no information should be lost

**Required Metadata Fields**:
- Token name
- OKLCH value
- RGB value
- Contrast compliance status
- Token category (color, typography, spacing)

**Validation**:
- Metadata JSON structure valid
- All fields present
- Layer 2 can parse without errors

---

## 7. Security Acceptance Criteria

### Scenario 7.1: Input Validation Against Injection

**Given** a malicious archetype JSON with script injection attempts
**When** the parser processes the input
**Then** the parser should reject the input
**And** no code execution should occur
**And** a security error should be logged

**Test Data**:
```json
{
  "id": "<script>alert('xss')</script>",
  "name": "Malicious",
  "colors": {}
}
```

**Validation**:
- Input rejected by schema validator
- No HTML/JS executed
- Security warning logged

---

### Scenario 7.2: File System Access Restriction

**Given** an archetype parser with file system access
**When** the parser attempts to read files
**Then** reads should be restricted to preset directories only
**And** path traversal attempts should be blocked
**And** no arbitrary file reads should succeed

**Test Procedure**:
```typescript
// Attempt path traversal
const maliciousPath = "../../../etc/passwd";
const result = parser.loadPreset(maliciousPath);
assert(result.error === "Path traversal detected");
```

**Validation**:
- Path traversal blocked
- Only preset directory accessible
- Security error logged

---

## 8. Quality Gate Criteria (TRUST 5 Framework)

### 8.1 Test Coverage Gate
- **Requirement**: ≥ 85% code coverage
- **Validation**: Run `vitest --coverage`
- **Failure Action**: Block merge until coverage increases

### 8.2 Code Quality Gate
- **Requirement**: Zero ESLint errors, zero TypeScript errors
- **Validation**: Run `eslint .` and `tsc --noEmit`
- **Failure Action**: Fix errors before merge

### 8.3 Performance Gate
- **Requirement**: Token generation < 100ms
- **Validation**: Run performance benchmark suite
- **Failure Action**: Profile and optimize hot paths

### 8.4 Accessibility Gate
- **Requirement**: All color pairs meet WCAG AA
- **Validation**: Run WCAG validator on all presets
- **Failure Action**: Adjust colors or log exceptions

---

## 9. Definition of Done

### Functional Completeness
- ✅ All ubiquitous requirements implemented (REQ-LAYER1-001 to REQ-LAYER1-004)
- ✅ All event-driven requirements implemented (REQ-LAYER1-005 to REQ-LAYER1-008)
- ✅ All state-driven requirements implemented (REQ-LAYER1-009 to REQ-LAYER1-011)
- ✅ All unwanted behaviors prevented (REQ-LAYER1-012 to REQ-LAYER1-014)
- ✅ Optional requirements implemented where feasible (REQ-LAYER1-015 to REQ-LAYER1-016)

### Quality Completeness
- ✅ Test coverage ≥ 85%
- ✅ All acceptance scenarios pass
- ✅ Zero ESLint errors
- ✅ Zero TypeScript errors
- ✅ Performance benchmarks met

### Integration Completeness
- ✅ All existing presets process successfully
- ✅ Layer 2 can consume generated metadata
- ✅ CSS output works in browsers
- ✅ Tailwind config loads correctly

### Documentation Completeness
- ✅ API documentation complete (JSDoc)
- ✅ Usage examples provided
- ✅ Migration guide for existing presets

---

**TAG**: SPEC-LAYER1-001
**Test Framework**: Vitest
**Coverage Tool**: @vitest/coverage-v8
**Last Updated**: 2026-01-19
