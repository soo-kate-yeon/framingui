---
id: SPEC-LAYER1-001
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
| 1.0.0 | 2026-01-19 | asleep | Initial SPEC creation for Token Generator Engine |

---

# SPEC-LAYER1-001: Token Generator Engine

## 1. Overview

### 1.1 Purpose
The Token Generator Engine is the foundational layer of the Tekton design system that generates deterministic design tokens from archetype JSON presets. It transforms high-level archetype definitions into production-ready CSS variables and Tailwind configuration using perceptually uniform OKLCH color spaces with WCAG AA compliance validation.

### 1.2 Scope
- Deterministic token generation from archetype JSON presets
- OKLCH color space conversion to RGB/sRGB with gamut clipping
- WCAG AA contrast ratio validation and automatic adjustment
- CSS variable generation for design tokens
- Tailwind configuration generation
- Token caching and invalidation strategies

### 1.3 Dependencies
- **External Libraries**:
  - `culori` (^3.3.0) - Color space conversions and OKLCH support
  - `wcag-contrast` (^3.0.0) - WCAG contrast ratio calculations
- **No Internal SPEC Dependencies**: This is the foundational layer

---

## 2. Environment

### 2.1 Technical Environment
- **Runtime**: Node.js 20+ / Browser (ES2022+)
- **Language**: TypeScript 5.9+
- **Build System**: Turbo (existing monorepo setup)
- **Package Manager**: npm (existing project standard)

### 2.2 Integration Points
- **Input**: Archetype JSON preset files (`.json` format)
- **Output**:
  - CSS variables (`:root` declarations)
  - Tailwind configuration objects
  - Token metadata for Layer 2 consumption

---

## 3. Assumptions

### 3.1 Technical Assumptions
- **ASSUMPTION-001**: OKLCH color space is supported in all target browsers (Chrome 111+, Safari 15.4+, Firefox 113+)
  - **Confidence**: High - Browser support is mature as of 2026
  - **Evidence**: caniuse.com data shows 95%+ global browser support
  - **Risk if Wrong**: Fallback to sRGB required, losing perceptual uniformity benefits
  - **Validation**: Check browser compatibility matrix during implementation

- **ASSUMPTION-002**: Archetype JSON preset structure matches Layer 5 specification
  - **Confidence**: High - Structure defined in archetype-system documentation
  - **Evidence**: Existing preset files in `packages/studio-mcp/src/preset/presets/`
  - **Risk if Wrong**: Parser implementation requires rework
  - **Validation**: Validate against schema in first iteration

- **ASSUMPTION-003**: WCAG AA compliance (4.5:1 for text, 3:1 for UI) is sufficient for accessibility
  - **Confidence**: High - AA is industry standard
  - **Evidence**: WCAG 2.1 guidelines and legal requirements
  - **Risk if Wrong**: AAA compliance may be required for specific use cases
  - **Validation**: User confirmation on accessibility requirements

### 3.2 Business Assumptions
- **ASSUMPTION-004**: Deterministic token generation enables reproducible builds
  - **Confidence**: High - Core requirement for design system consistency
  - **Evidence**: Industry best practices (Material Design, Ant Design)
  - **Risk if Wrong**: Non-deterministic tokens cause inconsistent UI across builds
  - **Validation**: Test with identical inputs across multiple runs

---

## 4. Requirements

### 4.1 Ubiquitous Requirements (Always Active)

**REQ-LAYER1-001**: The Token Generator Engine shall always generate deterministic tokens from identical archetype JSON inputs
- **Rationale**: Reproducibility is critical for design system consistency
- **Acceptance**: Same input produces identical output across all executions

**REQ-LAYER1-002**: The system shall always use OKLCH color space for perceptually uniform color transformations
- **Rationale**: OKLCH provides superior perceptual uniformity compared to HSL/RGB
- **Acceptance**: All color operations use OKLCH internally before final conversion

**REQ-LAYER1-003**: The system shall always validate WCAG AA contrast ratios (4.5:1 text, 3:1 UI) for all color pairs
- **Rationale**: Legal compliance and accessibility requirements
- **Acceptance**: All generated color pairs meet or exceed WCAG AA thresholds

**REQ-LAYER1-004**: The system shall always output valid CSS custom properties and Tailwind configuration
- **Rationale**: Output must be production-ready without manual intervention
- **Acceptance**: Generated CSS/JS passes linting and validation tools

### 4.2 Event-Driven Requirements (User/System Triggers)

**REQ-LAYER1-005**: WHEN an archetype JSON preset is provided, THEN the engine shall parse and extract all token definitions
- **Rationale**: Archetype JSON is the single source of truth
- **Acceptance**: Parser successfully extracts all tokens without data loss

**REQ-LAYER1-006**: WHEN OKLCH values are converted to RGB, THEN the engine shall apply gamut clipping for out-of-sRGB colors
- **Rationale**: OKLCH can represent colors outside sRGB gamut
- **Acceptance**: All RGB values are within valid range [0, 255] or [0, 1]

**REQ-LAYER1-007**: WHEN contrast ratios fall below WCAG AA thresholds, THEN the engine shall automatically adjust lightness values
- **Rationale**: Prevent accessibility violations in generated tokens
- **Acceptance**: Auto-adjusted colors meet WCAG AA without manual intervention

**REQ-LAYER1-008**: WHEN tokens are generated, THEN the engine shall output both CSS variables and Tailwind configuration
- **Rationale**: Support multiple consumption patterns (CSS and utility classes)
- **Acceptance**: Both output formats are generated and structurally valid

### 4.3 State-Driven Requirements (Conditional Behavior)

**REQ-LAYER1-009**: IF the archetype JSON contains custom token overrides, THEN those overrides shall take precedence over defaults
- **Rationale**: Allow preset-specific customization
- **Acceptance**: Override values replace defaults in final output

**REQ-LAYER1-010**: IF contrast auto-adjustment cannot achieve WCAG AA compliance, THEN the system shall log a warning and document the violation
- **Rationale**: Transparency when accessibility requirements cannot be met
- **Acceptance**: Warning logged with specific token pair and actual contrast ratio

**REQ-LAYER1-011**: IF the output format is Tailwind, THEN the engine shall generate Tailwind-compatible configuration objects
- **Rationale**: Tailwind configuration has specific structure requirements
- **Acceptance**: Generated config passes Tailwind validation

### 4.4 Unwanted Behaviors (Prohibited Actions)

**REQ-LAYER1-012**: The system shall NOT generate non-deterministic tokens based on timestamps or random values
- **Rationale**: Determinism is a core system requirement
- **Acceptance**: Zero occurrences of Date.now(), Math.random(), or UUID generation in token logic

**REQ-LAYER1-013**: The system shall NOT output color values that fail WCAG AA compliance without explicit user override
- **Rationale**: Prevent accidental accessibility violations
- **Acceptance**: All output colors pass WCAG AA unless user explicitly disables validation

**REQ-LAYER1-014**: The system shall NOT modify the input archetype JSON file
- **Rationale**: Input files are immutable source of truth
- **Acceptance**: Zero file write operations to input preset paths

### 4.5 Optional Requirements (Nice-to-Have)

**REQ-LAYER1-015**: Where possible, the engine should provide visual color previews in terminal output
- **Rationale**: Improved developer experience during token inspection
- **Acceptance**: Terminal supports ANSI color codes and displays previews

**REQ-LAYER1-016**: Where performance allows, the engine should cache parsed archetype structures
- **Rationale**: Reduce redundant parsing in watch mode scenarios
- **Acceptance**: Cache invalidation works correctly when presets change

---

## 5. Technical Specifications

### 5.1 Core Architecture

**Token Pipeline**:
```
Archetype JSON → Parser → OKLCH Converter → WCAG Validator → Generator → Output (CSS/Tailwind)
```

**Module Structure**:
```
packages/studio-token-generator/
├── src/
│   ├── parser/
│   │   ├── archetype-parser.ts       # JSON preset parsing
│   │   └── schema-validator.ts       # JSON schema validation
│   ├── color/
│   │   ├── oklch-converter.ts        # OKLCH ↔ RGB conversions
│   │   ├── gamut-clipper.ts          # sRGB gamut clipping
│   │   └── contrast-validator.ts     # WCAG contrast validation
│   ├── generator/
│   │   ├── css-generator.ts          # CSS variable generation
│   │   ├── tailwind-generator.ts     # Tailwind config generation
│   │   └── token-cache.ts            # Token caching system
│   └── types/
│       ├── archetype.types.ts        # Archetype JSON types
│       └── token.types.ts            # Token output types
├── tests/
│   ├── parser.test.ts
│   ├── oklch-converter.test.ts
│   ├── wcag-validator.test.ts
│   └── generator.test.ts
└── package.json
```

### 5.2 OKLCH Color Space Implementation

**Color Conversion Algorithm**:
```typescript
// OKLCH to RGB with gamut clipping
function oklchToRgb(oklch: OKLCH): RGB {
  const lab = oklchToLab(oklch);
  const xyz = labToXyz(lab);
  const rgb = xyzToRgb(xyz);
  return clipToSrgbGamut(rgb);
}

// sRGB gamut clipping (preserve lightness priority)
function clipToSrgbGamut(rgb: RGB): RGB {
  if (isInGamut(rgb)) return rgb;
  return reduceChroma(rgb); // Reduce chroma until in-gamut
}
```

**WCAG Contrast Validation**:
```typescript
function validateContrast(foreground: RGB, background: RGB, type: 'text' | 'ui'): boolean {
  const ratio = calculateContrastRatio(foreground, background);
  const threshold = type === 'text' ? 4.5 : 3.0;
  return ratio >= threshold;
}

function autoAdjustContrast(fg: RGB, bg: RGB, type: 'text' | 'ui'): RGB {
  let adjustedFg = fg;
  let attempts = 0;
  while (!validateContrast(adjustedFg, bg, type) && attempts < 20) {
    adjustedFg = adjustLightness(adjustedFg, bg);
    attempts++;
  }
  return adjustedFg;
}
```

### 5.3 Token Output Formats

**CSS Variables Output**:
```css
:root {
  /* Archetype: premium-editorial */
  --color-primary: oklch(0.55 0.15 270);
  --color-primary-rgb: rgb(91, 101, 194);
  --color-surface: oklch(0.98 0.01 270);
  --color-text: oklch(0.25 0.02 270);

  /* Typography tokens */
  --font-size-base: 16px;
  --font-weight-regular: 400;
  --line-height-base: 1.5;
}
```

**Tailwind Configuration Output**:
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

### 5.4 Performance Targets

- **Parse Speed**: < 50ms for typical archetype JSON (200-500 lines)
- **Generation Speed**: < 100ms for full token set (50-100 tokens)
- **Memory Usage**: < 50MB for token cache
- **Cache Invalidation**: < 10ms to detect preset file changes

---

## 6. Testing Strategy

### 6.1 Unit Test Coverage

**Parser Module**:
- Valid archetype JSON parsing
- Invalid JSON error handling
- Schema validation against Layer 5 spec

**Color Conversion Module**:
- OKLCH to RGB conversion accuracy (within 1% tolerance)
- Gamut clipping edge cases (out-of-range values)
- Contrast ratio calculations (WCAG formula verification)

**Generator Module**:
- CSS variable format validation
- Tailwind configuration structure validation
- Token caching correctness

**Target Coverage**: ≥ 85% (TRUST 5 requirement)

### 6.2 Integration Test Scenarios

**End-to-End Token Generation**:
- Load archetype JSON → Generate CSS → Validate output
- Load archetype JSON → Generate Tailwind → Validate output

**WCAG Compliance Verification**:
- Generate tokens from preset → Validate all color pairs → Assert AA compliance

---

## 7. Security Considerations

**SEC-001**: Input validation prevents JSON injection attacks
- Validate archetype JSON against strict schema
- Reject invalid structures before processing

**SEC-002**: File system access limited to designated preset directories
- No arbitrary file reads outside preset paths
- Path traversal protection

---

## 8. Quality Gates

### 8.1 TRUST 5 Framework Compliance

- **Test-first**: ≥ 85% test coverage
- **Readable**: Clear naming, JSDoc comments for public APIs
- **Unified**: ESLint + Prettier formatting
- **Secured**: Input validation, no unsafe operations
- **Trackable**: Git commits reference SPEC-LAYER1-001

### 8.2 Acceptance Criteria

✅ All OKLCH-to-RGB conversions produce valid sRGB values
✅ All generated color pairs meet WCAG AA contrast requirements
✅ Same archetype JSON produces identical output across runs
✅ CSS variable output passes CSS validation
✅ Tailwind config output passes Tailwind validation
✅ Test coverage ≥ 85%
✅ Zero ESLint errors
✅ Zero TypeScript errors

---

## 9. Traceability

**TAG**: SPEC-LAYER1-001
**Related SPECs**:
- SPEC-LAYER2-001 (depends on this SPEC)
- SPEC-LAYER3-001 (depends on this SPEC)
**Archetype Documentation**: `docs/archetype-system.md`

---

**END OF SPEC**
