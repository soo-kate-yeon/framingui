# Implementation Plan: SPEC-LAYER1-001 - Token Generator Engine

**TAG**: SPEC-LAYER1-001
**Priority**: HIGH
**Complexity**: MEDIUM

---

## 1. Implementation Strategy

### 1.1 Development Approach
- **Methodology**: TDD (RED-GREEN-REFACTOR cycle)
- **Phase**: Layer 1 Foundation (no dependencies)
- **Iterations**: 4 milestones with incremental delivery

### 1.2 Technology Stack

**Core Dependencies**:
```json
{
  "dependencies": {
    "culori": "^3.3.0",
    "wcag-contrast": "^3.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.9.0",
    "vitest": "^2.0.0",
    "@vitest/coverage-v8": "^2.0.0"
  }
}
```

**Justification**:
- **culori**: Industry-standard color library with OKLCH support, 30K+ weekly downloads
- **wcag-contrast**: Official WCAG 2.1 contrast ratio implementation
- **vitest**: Fast TypeScript-native testing framework (3-5x faster than Jest)

---

## 2. Task Breakdown

### Milestone 1: Foundation and Parser (Priority: HIGH)

**Task 1.1: Project Setup**
- Create `packages/studio-token-generator/` package
- Configure TypeScript with strict mode
- Setup Vitest testing infrastructure
- Configure ESLint + Prettier for code quality

**Task 1.2: Archetype Parser Implementation**
- Define TypeScript types for archetype JSON structure
- Implement JSON schema validator using Zod
- Create archetype parser with error handling
- Write unit tests for parser (target: 90% coverage)

**Deliverables**:
- ✅ Package structure created
- ✅ Parser handles valid and invalid JSON
- ✅ Schema validation prevents malformed input
- ✅ Tests: `parser.test.ts` with 10+ test cases

**Definition of Done**:
- All parser tests pass
- TypeScript compiles with zero errors
- ESLint reports zero warnings

---

### Milestone 2: Color Conversion and OKLCH Implementation (Priority: HIGH)

**Task 2.1: OKLCH to RGB Converter**
- Implement OKLCH → Lab → XYZ → RGB pipeline using culori
- Add gamut clipping for out-of-sRGB colors
- Create color utility functions (hex conversion, normalization)
- Write unit tests with known color conversion values

**Task 2.2: WCAG Contrast Validator**
- Implement contrast ratio calculation (WCAG 2.1 formula)
- Create validation functions for text (4.5:1) and UI (3:1) thresholds
- Implement auto-adjustment algorithm (lightness modification)
- Write unit tests for edge cases (black/white, near-threshold colors)

**Deliverables**:
- ✅ OKLCH to RGB conversion accurate within 1% tolerance
- ✅ Gamut clipping preserves perceptual characteristics
- ✅ WCAG validator correctly identifies AA compliance
- ✅ Auto-adjustment achieves AA in < 20 iterations
- ✅ Tests: `oklch-converter.test.ts`, `wcag-validator.test.ts`

**Definition of Done**:
- All color conversion tests pass
- WCAG compliance verified against official test suite
- Performance: < 1ms per color conversion

---

### Milestone 3: Token Generation and Output Formats (Priority: HIGH)

**Task 3.1: CSS Variable Generator**
- Implement CSS custom property generation
- Support both OKLCH and RGB output formats
- Add CSS variable naming conventions (kebab-case)
- Write unit tests for CSS output format validation

**Task 3.2: Tailwind Configuration Generator**
- Implement Tailwind config object generation
- Map archetype tokens to Tailwind theme structure
- Support nested theme configuration
- Write unit tests for Tailwind config validation

**Task 3.3: Token Metadata Export**
- Create metadata export for Layer 2 consumption
- Include token names, values, and accessibility info
- Support JSON and TypeScript output formats

**Deliverables**:
- ✅ CSS variable output passes CSS linting
- ✅ Tailwind config passes Tailwind validation
- ✅ Metadata includes all required fields
- ✅ Tests: `css-generator.test.ts`, `tailwind-generator.test.ts`

**Definition of Done**:
- Generated CSS variables work in browsers
- Tailwind config loads without errors
- Metadata format documented

---

### Milestone 4: Caching, Optimization, and Integration (Priority: MEDIUM)

**Task 4.1: Token Caching System**
- Implement in-memory token cache
- Add cache invalidation on preset file changes
- Optimize repeated token generation requests

**Task 4.2: Performance Optimization**
- Profile token generation pipeline
- Optimize bottlenecks (target: < 100ms total)
- Add performance benchmarks

**Task 4.3: Integration Testing**
- End-to-end tests with real archetype presets
- Validate against existing presets in `packages/studio-mcp/src/preset/presets/`
- Cross-browser compatibility testing

**Task 4.4: Documentation**
- API documentation (JSDoc)
- Usage examples for CSS and Tailwind outputs
- Migration guide for existing presets

**Deliverables**:
- ✅ Caching reduces repeated generation time by 80%+
- ✅ Performance targets met (< 100ms generation)
- ✅ Integration tests pass with existing presets
- ✅ Documentation complete and reviewed

**Definition of Done**:
- Performance benchmarks documented
- Integration tests cover all existing presets
- API documentation published

---

## 3. Architecture Design

### 3.1 Module Interaction Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                   Token Generator Engine                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────┐    ┌──────────────┐    ┌────────────────┐  │
│  │  Archetype │───▶│    Parser    │───▶│   Validator    │  │
│  │    JSON    │    │              │    │  (Schema)      │  │
│  └────────────┘    └──────────────┘    └────────┬───────┘  │
│                                                  │          │
│                                                  ▼          │
│                    ┌─────────────────────────────────┐      │
│                    │   OKLCH Color Converter         │      │
│                    │  - Lab → XYZ → RGB Pipeline     │      │
│                    │  - Gamut Clipping               │      │
│                    └──────────────┬──────────────────┘      │
│                                   │                         │
│                                   ▼                         │
│                    ┌─────────────────────────────┐          │
│                    │   WCAG Contrast Validator   │          │
│                    │  - Ratio Calculation        │          │
│                    │  - Auto-Adjustment          │          │
│                    └──────────────┬──────────────┘          │
│                                   │                         │
│                                   ▼                         │
│         ┌─────────────────────────────────────────┐         │
│         │         Token Generator                 │         │
│         │  - CSS Variable Generation              │         │
│         │  - Tailwind Config Generation           │         │
│         │  - Metadata Export                      │         │
│         └────────┬────────────────────────────────┘         │
│                  │                                          │
│       ┏━━━━━━━━━━┻━━━━━━━━━━┓                              │
│       ▼                      ▼                              │
│  ┌─────────┐          ┌──────────────┐                     │
│  │   CSS   │          │   Tailwind   │                     │
│  │Variables│          │    Config    │                     │
│  └─────────┘          └──────────────┘                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

**Input Processing**:
1. Load archetype JSON preset
2. Validate against schema (Zod)
3. Extract token definitions

**Color Processing**:
1. Parse OKLCH values from preset
2. Convert to RGB using culori
3. Apply gamut clipping if necessary
4. Validate WCAG contrast ratios
5. Auto-adjust if below thresholds

**Output Generation**:
1. Generate CSS custom properties
2. Generate Tailwind configuration
3. Export token metadata
4. Cache results for performance

---

## 4. Risk Analysis

### 4.1 Technical Risks

**RISK-001**: OKLCH browser support gaps
- **Likelihood**: Low (95%+ browser support in 2026)
- **Impact**: Medium (requires sRGB fallback)
- **Mitigation**: Generate both OKLCH and RGB outputs, use `@supports` feature detection

**RISK-002**: WCAG auto-adjustment cannot achieve AA compliance
- **Likelihood**: Medium (some color combinations impossible)
- **Impact**: Low (logged as warning, designer intervention needed)
- **Mitigation**: Implement clear warning messages, provide suggested alternatives

**RISK-003**: Performance bottleneck in color conversions
- **Likelihood**: Low (culori is optimized)
- **Impact**: Medium (slow builds)
- **Mitigation**: Implement caching, profile early, optimize hot paths

### 4.2 Integration Risks

**RISK-004**: Existing archetype presets incompatible with parser
- **Likelihood**: Medium (presets may not match Layer 5 spec exactly)
- **Impact**: High (migration required)
- **Mitigation**: Test against all existing presets early, create migration scripts

---

## 5. Testing Strategy

### 5.1 Test Pyramid

**Unit Tests (70%)**:
- Parser: JSON validation, schema compliance
- OKLCH Converter: Color accuracy, gamut clipping
- WCAG Validator: Contrast calculations, auto-adjustment
- Generators: Output format validation

**Integration Tests (20%)**:
- End-to-end token generation
- Real preset file processing
- Cache invalidation correctness

**E2E Tests (10%)**:
- Browser compatibility (CSS variables work)
- Tailwind integration (config loads correctly)

**Target Coverage**: ≥ 85% (TRUST 5 requirement)

### 5.2 Test Data

**Sample Archetype Preset**:
```json
{
  "id": "test-preset",
  "name": "Test Archetype",
  "colors": {
    "primary": { "oklch": [0.55, 0.15, 270] },
    "surface": { "oklch": [0.98, 0.01, 270] },
    "text": { "oklch": [0.25, 0.02, 270] }
  },
  "typography": {
    "fontSize": { "base": "16px" },
    "fontWeight": { "regular": 400 }
  }
}
```

---

## 6. Performance Targets

### 6.1 Benchmarks

| Operation | Target | Measurement Method |
|-----------|--------|-------------------|
| Parse archetype JSON | < 50ms | Vitest benchmark |
| Generate full token set | < 100ms | Vitest benchmark |
| OKLCH to RGB conversion | < 1ms per color | Performance.now() |
| Cache lookup | < 10ms | Performance.now() |

### 6.2 Memory Targets

- Token cache: < 50MB for typical usage
- Peak memory during generation: < 100MB

---

## 7. Quality Gates

### 7.1 Pre-Merge Checklist

- [ ] All unit tests pass (≥ 85% coverage)
- [ ] All integration tests pass
- [ ] TypeScript compiles with zero errors
- [ ] ESLint reports zero errors
- [ ] Prettier formatting applied
- [ ] Performance benchmarks meet targets
- [ ] API documentation complete (JSDoc)
- [ ] Code review approved

### 7.2 TRUST 5 Compliance

- **Test-first**: TDD approach, tests written before implementation
- **Readable**: Clear naming, JSDoc for all public APIs
- **Unified**: ESLint + Prettier enforced
- **Secured**: Input validation, no unsafe operations
- **Trackable**: Commits reference SPEC-LAYER1-001

---

## 8. Dependencies and Blockers

### 8.1 External Dependencies
- ✅ `culori` package (available on npm)
- ✅ `wcag-contrast` package (available on npm)
- ✅ TypeScript 5.9+ (project standard)

### 8.2 Internal Dependencies
- ✅ No internal SPEC dependencies (foundational layer)
- ✅ Existing archetype presets for testing

### 8.3 Known Blockers
- None identified at SPEC creation time

---

## 9. Next Steps

### 9.1 Immediate Actions (Post-SPEC Approval)
1. Create `packages/studio-token-generator/` package structure
2. Setup TypeScript and Vitest configuration
3. Begin Milestone 1 implementation (Parser)

### 9.2 Coordination
- **Layer 2 (SPEC-LAYER2-001)**: Can begin SPEC creation in parallel
- **Layer 3 (SPEC-LAYER3-001)**: Can begin SPEC creation in parallel
- **Implementation Order**: Layer 1 must complete before Layer 2/3 implementation

---

## 10. Success Criteria

### 10.1 Functional Success
- ✅ Parses all existing archetype presets without errors
- ✅ Generates valid CSS variables and Tailwind config
- ✅ All color pairs meet WCAG AA compliance
- ✅ Deterministic output (same input = same output)

### 10.2 Quality Success
- ✅ Test coverage ≥ 85%
- ✅ Zero TypeScript/ESLint errors
- ✅ Performance targets met
- ✅ API documentation complete

### 10.3 Integration Success
- ✅ Layer 2 can consume generated tokens
- ✅ Existing presets migrate without breaking changes

---

**TAG**: SPEC-LAYER1-001
**Related**: SPEC-LAYER2-001, SPEC-LAYER3-001
**Last Updated**: 2026-01-19
