# Implementation Plan: SPEC-LAYER3-001 - Component Generation Engine

**TAG**: SPEC-LAYER3-001
**Priority**: MEDIUM
**Complexity**: HIGH

---

## 1. Implementation Strategy

### 1.1 Development Approach
- **Methodology**: TDD (RED-GREEN-REFACTOR cycle)
- **Phase**: Layer 3 Integration (depends on Layer 1 + Layer 2 completion)
- **Iterations**: 5 milestones with incremental delivery
- **Risk**: Highest complexity layer - requires extensive integration testing

### 1.2 Technology Stack

**Core Dependencies**:
```json
{
  "dependencies": {
    "@babel/generator": "^7.24.0",
    "@babel/types": "^7.24.0",
    "@supabase/supabase-js": "^2.45.0",
    "zod": "^3.23.0",
    "prettier": "^3.4.0",
    "react": "^19.0.0",
    "@types/react": "^19.0.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "@types/babel__generator": "^7.6.0",
    "@types/babel__types": "^7.20.0",
    "typescript": "^5.9.0",
    "vitest": "^2.0.0",
    "@vitest/coverage-v8": "^2.0.0",
    "@playwright/test": "^1.48.0"
  }
}
```

**Justification**:
- **@babel/generator**: Industry-standard AST-to-code generation, 10M+ weekly downloads
- **@supabase/supabase-js**: PostgreSQL-backed database with RLS, 100K+ weekly downloads
- **zod**: Type-safe schema validation, 40K+ weekly downloads
- **prettier**: Code formatting standard, 20M+ weekly downloads
- **@playwright/test**: E2E testing framework, 1M+ weekly downloads

---

## 2. Task Breakdown

### Milestone 1: Blueprint System Foundation (Priority: HIGH)

**Task 1.1: Project Setup**
- Create `packages/studio-component-generator/` package
- Configure TypeScript with strict mode
- Setup Vitest and Playwright testing infrastructure
- Configure ESLint + Prettier for code quality

**Task 1.2: Blueprint Schema Definition**
- Define TypeScript interfaces for Blueprint structure
- Implement Zod schemas for runtime validation
- Create Blueprint builder utility functions
- Write unit tests for schema validation (target: 90% coverage)

**Task 1.3: Basic Mode - AI Blueprint Generator**
- Integrate Claude API for natural language → Blueprint conversion
- Implement prompt engineering for Blueprint generation
- Create fallback mechanisms for API failures
- Write integration tests with sample prompts

**Task 1.4: Pro Mode - Blueprint Editor**
- Implement JSON editor with Monaco integration (optional)
- Add real-time schema validation
- Create autocomplete for component names and props
- Write unit tests for editor validation

**Deliverables**:
- ✅ Package structure created
- ✅ Blueprint schema fully defined and validated
- ✅ AI generates valid Blueprints from user prompts
- ✅ Pro Mode allows manual Blueprint editing
- ✅ Tests: `blueprint-generator.test.ts`, `schema-validator.test.ts`

**Definition of Done**:
- All Blueprint tests pass
- TypeScript compiles with zero errors
- Schema validation catches all invalid inputs

---

### Milestone 2: Slot-Based Assembly System (Priority: HIGH)

**Task 2.1: Slot Registry**
- Define standard slots (header, content, sidebar, footer)
- Implement custom slot support
- Create slot validation rules
- Write unit tests for slot definitions

**Task 2.2: Slot Resolver**
- Implement slot-to-component mapping
- Validate components exist in Layer 2 bindings
- Support recursive child resolution
- Write unit tests for slot resolution

**Task 2.3: Slot Assembly**
- Implement layout generation from slots
- Support flexible grid/flexbox layouts
- Handle missing optional slots gracefully
- Write integration tests for assembly

**Deliverables**:
- ✅ Standard and custom slots supported
- ✅ Slot resolver validates Layer 2 bindings
- ✅ Assembly generates correct layouts
- ✅ Tests: `slot-resolver.test.ts`, `slot-assembly.test.ts`

**Definition of Done**:
- Slot assembly handles all Blueprint variants
- Recursive children work correctly
- Layer 2 integration validated

---

### Milestone 3: Code Generation Engine (Priority: HIGH)

**Task 3.1: AST Builder**
- Implement Babel AST construction for JSX
- Generate React component structures
- Support TypeScript type annotations
- Write unit tests for AST correctness

**Task 3.2: JSX Generator**
- Convert AST to JSX code using @babel/generator
- Implement Prettier formatting for generated code
- Support import statement generation
- Write unit tests for code generation

**Task 3.3: TypeScript Type Generator**
- Generate `.types.ts` files with component prop types
- Create type exports for external consumption
- Validate generated types compile correctly
- Write unit tests for type generation

**Task 3.4: Responsive Utility Generator**
- Implement mobile-first breakpoint system
- Generate media queries for responsive layouts
- Support custom breakpoint definitions
- Write unit tests for responsive styles

**Deliverables**:
- ✅ AST builder generates valid React JSX
- ✅ JSX generator produces formatted code
- ✅ TypeScript types exported correctly
- ✅ Responsive utilities generated with breakpoints
- ✅ Tests: `ast-builder.test.ts`, `jsx-generator.test.ts`, `typescript-generator.test.ts`

**Definition of Done**:
- Generated code compiles without errors
- Prettier formatting applied consistently
- Responsive styles work in browsers

---

### Milestone 4: Supabase Integration (Priority: HIGH)

**Task 4.1: Supabase Setup**
- Create `blueprints` table schema
- Implement Row-Level Security policies
- Setup authentication integration
- Write migration scripts

**Task 4.2: Blueprint Storage**
- Implement save/load operations
- Add Blueprint versioning system
- Create Blueprint history tracking
- Write integration tests for Supabase operations

**Task 4.3: Offline Fallback**
- Implement local file-based storage fallback
- Create sync mechanism when Supabase unavailable
- Handle conflict resolution
- Write unit tests for fallback logic

**Task 4.4: RLS Policy Testing**
- Test user isolation (users can only access their Blueprints)
- Test authentication edge cases
- Validate security policies
- Write security tests for RLS

**Deliverables**:
- ✅ Supabase table created with RLS policies
- ✅ Blueprint save/load operations work reliably
- ✅ Versioning system tracks Blueprint history
- ✅ Offline fallback prevents data loss
- ✅ Tests: `supabase-integration.test.ts`, `blueprint-storage.test.ts`

**Definition of Done**:
- RLS policies enforce security
- Offline fallback works seamlessly
- Blueprint versioning accurate

---

### Milestone 5: Testing and Accessibility (Priority: MEDIUM)

**Task 5.1: E2E Test Generator**
- Generate Playwright test files for components
- Cover all interactive elements (buttons, inputs, etc.)
- Include accessibility checks (axe-core)
- Write unit tests for test generation logic

**Task 5.2: Accessibility Validation**
- Implement WCAG AA compliance checks
- Generate ARIA labels and roles
- Support keyboard navigation
- Write integration tests for accessibility

**Task 5.3: Storybook Story Generation (Optional)**
- Generate Storybook stories for components
- Include all variants and states
- Create interactive controls
- Write unit tests for story generation

**Task 5.4: Integration Testing**
- End-to-end tests with real Blueprints
- Layer 1 + Layer 2 + Layer 3 integration
- Performance benchmarking
- Cross-browser testing

**Deliverables**:
- ✅ E2E tests generated for all components
- ✅ Generated components pass WCAG AA checks
- ✅ Storybook stories generated (optional)
- ✅ Integration tests cover full pipeline
- ✅ Tests: `e2e-test-generator.test.ts`, `accessibility.test.ts`

**Definition of Done**:
- E2E tests cover 80%+ of interactions
- WCAG AA compliance verified
- Performance benchmarks met

---

## 3. Architecture Design

### 3.1 Module Interaction Diagram

```
┌──────────────────────────────────────────────────────────────────┐
│              Component Generation Engine                         │
├──────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌────────────────┐                    ┌─────────────────┐      │
│  │  User Input    │───────────────────▶│  Basic Mode:    │      │
│  │  (Prompt or    │                    │  AI Blueprint   │      │
│  │   Blueprint)   │                    │  Generator      │      │
│  └────────────────┘                    └────────┬────────┘      │
│                                                  │               │
│                        ┌─────────────────────────┘               │
│                        │                                         │
│                        ▼                                         │
│              ┌───────────────────────┐                           │
│              │  Blueprint Schema     │                           │
│              │  Validator (Zod)      │                           │
│              └──────────┬────────────┘                           │
│                         │                                        │
│                         ▼                                        │
│              ┌────────────────────────┐                          │
│              │  Slot Resolver         │                          │
│              │  - Layer 2 Binding     │                          │
│              │  - Recursive Children  │                          │
│              └──────────┬─────────────┘                          │
│                         │                                        │
│                         ▼                                        │
│              ┌────────────────────────┐                          │
│              │  AST Builder           │                          │
│              │  (Babel)               │                          │
│              └──────────┬─────────────┘                          │
│                         │                                        │
│            ┏━━━━━━━━━━━━┻━━━━━━━━━━━━━┓                         │
│            ▼                           ▼                         │
│  ┌────────────────┐         ┌──────────────────┐                │
│  │  JSX Generator │         │  TypeScript      │                │
│  │  + Prettier    │         │  Type Generator  │                │
│  └────────┬───────┘         └───────┬──────────┘                │
│           │                         │                            │
│           ▼                         ▼                            │
│  ┌────────────────────────────────────────┐                     │
│  │  Output Files:                         │                     │
│  │  - Component.tsx                       │                     │
│  │  - Component.types.ts                  │                     │
│  │  - Component.spec.ts (E2E tests)       │                     │
│  └────────────────────────────────────────┘                     │
│                         │                                        │
│                         ▼                                        │
│              ┌────────────────────────┐                          │
│              │  Supabase Storage      │                          │
│              │  (Blueprint Version)   │                          │
│              └────────────────────────┘                          │
│                                                                   │
└──────────────────────────────────────────────────────────────────┘
```

### 3.2 Data Flow

**Input Processing**:
1. User provides prompt (Basic Mode) or Blueprint JSON (Pro Mode)
2. AI generates Blueprint (Basic) or user edits Blueprint (Pro)
3. Schema validation ensures Blueprint correctness

**Component Generation**:
1. Slot resolver maps Blueprint slots to Layer 2 components
2. AST builder constructs Babel AST for React JSX
3. JSX generator converts AST to formatted code
4. TypeScript type generator creates `.types.ts` file
5. E2E test generator creates Playwright tests

**Output and Storage**:
1. Generated files written to disk
2. Blueprint saved to Supabase with version number
3. User receives confirmation and file paths

---

## 4. Risk Analysis

### 4.1 Technical Risks

**RISK-001**: AI-generated Blueprints may be invalid or suboptimal
- **Likelihood**: Medium (LLMs can produce inconsistent output)
- **Impact**: High (poor user experience, invalid components)
- **Mitigation**: Robust schema validation, user review step, fallback templates

**RISK-002**: Babel AST generation complexity for edge cases
- **Likelihood**: Medium (JSX has many syntactic variations)
- **Impact**: Medium (some components may not generate correctly)
- **Mitigation**: Extensive unit testing, fallback to template strings

**RISK-003**: Supabase RLS policies may have security gaps
- **Likelihood**: Low (Supabase RLS is mature)
- **Impact**: High (unauthorized Blueprint access)
- **Mitigation**: Security audit, penetration testing, principle of least privilege

**RISK-004**: Performance bottleneck in component generation pipeline
- **Likelihood**: Medium (Babel + Prettier can be slow)
- **Impact**: Medium (slow user experience)
- **Mitigation**: Caching, parallel processing, performance profiling

**RISK-005**: Layer 1/Layer 2 integration failures
- **Likelihood**: Medium (tight coupling with previous layers)
- **Impact**: High (components cannot be generated)
- **Mitigation**: Integration tests, versioned APIs, fallback mechanisms

### 4.2 Integration Risks

**RISK-006**: Layer 1 token format changes break references
- **Likelihood**: Medium (Layer 1 still evolving)
- **Impact**: High (all components break)
- **Mitigation**: Versioned token metadata, migration scripts

**RISK-007**: Layer 2 binding format incompatible with Layer 3
- **Likelihood**: Medium (interface mismatch)
- **Impact**: High (slot resolution fails)
- **Mitigation**: Early contract definition, integration testing

---

## 5. Testing Strategy

### 5.1 Test Pyramid

**Unit Tests (60%)**:
- Blueprint validation, schema compliance
- Slot resolution, recursive children
- AST builder, JSX generator
- TypeScript type generation

**Integration Tests (25%)**:
- Supabase save/load operations
- Layer 1 + Layer 2 + Layer 3 integration
- End-to-end Blueprint to component flow

**E2E Tests (15%)**:
- Generated component rendering in browser
- Accessibility compliance (WCAG AA)
- User interaction testing (Playwright)

**Target Coverage**: ≥ 85% (TRUST 5 requirement)

### 5.2 Test Data

**Sample User Prompt (Basic Mode)**:
```
"Create a blog post editor with a header, main content area with title and body inputs, and a sidebar with publish button"
```

**Expected AI-Generated Blueprint**:
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
      "children": [
        { "component": "Button", "props": { "variant": "primary", "text": "Publish" } }
      ]
    }
  }
}
```

---

## 6. Performance Targets

### 6.1 Benchmarks

| Operation | Target | Measurement Method |
|-----------|--------|-------------------|
| Blueprint validation | < 50ms | Vitest benchmark |
| Slot resolution | < 100ms | Vitest benchmark |
| AST + JSX generation | < 300ms | Vitest benchmark |
| TypeScript type generation | < 50ms | Vitest benchmark |
| E2E test generation | < 100ms | Vitest benchmark |
| Supabase save/load | < 200ms | Round-trip test |
| **Full pipeline (prompt → code)** | **< 1000ms** | **End-to-end test** |

### 6.2 Memory Targets

- Blueprint cache: < 100MB
- AST construction: < 150MB peak
- Peak memory during generation: < 300MB

---

## 7. Quality Gates

### 7.1 Pre-Merge Checklist

- [ ] All unit tests pass (≥ 85% coverage)
- [ ] All integration tests pass
- [ ] All E2E tests pass (Playwright)
- [ ] TypeScript compiles with zero errors
- [ ] ESLint reports zero errors
- [ ] Prettier formatting applied
- [ ] Performance benchmarks meet targets
- [ ] Accessibility tests pass (WCAG AA)
- [ ] Security audit complete (RLS policies tested)
- [ ] API documentation complete (JSDoc)
- [ ] Code review approved

### 7.2 TRUST 5 Compliance

- **Test-first**: TDD approach, tests written before implementation
- **Readable**: Clear naming, JSDoc for all public APIs, commented complex logic
- **Unified**: ESLint + Prettier enforced
- **Secured**: Input validation, safe code generation, RLS policies, no API key exposure
- **Trackable**: Commits reference SPEC-LAYER3-001

---

## 8. Dependencies and Blockers

### 8.1 External Dependencies
- ✅ `@babel/generator` package (available on npm)
- ✅ `@supabase/supabase-js` package (available on npm)
- ✅ `zod` package (available on npm)
- ✅ `prettier` package (available on npm)
- ✅ `@playwright/test` package (available on npm)

### 8.2 Internal Dependencies
- ⏳ SPEC-LAYER1-001 (Token Generator Engine) - MUST COMPLETE FIRST
- ⏳ SPEC-LAYER2-001 (Component Token Binding System) - MUST COMPLETE FIRST

### 8.3 Known Blockers
- **BLOCKER-001**: Layer 1 + Layer 2 implementation must complete before Layer 3 can begin
  - **Resolution**: Wait for both layers to finish, coordinate contracts early

---

## 9. Next Steps

### 9.1 Immediate Actions (Post-SPEC Approval)
1. **WAIT** for Layer 1 + Layer 2 completion
2. Create `packages/studio-component-generator/` package structure
3. Setup TypeScript, Vitest, and Playwright configuration
4. Begin Milestone 1 implementation (Blueprint System)

### 9.2 Coordination
- **Layer 1 (SPEC-LAYER1-001)**: Must complete before Layer 3 implementation
- **Layer 2 (SPEC-LAYER2-001)**: Must complete before Layer 3 implementation
- **Supabase Setup**: Can be done in parallel with Layer 1/Layer 2

---

## 10. Success Criteria

### 10.1 Functional Success
- ✅ AI generates valid Blueprints from user prompts (Basic Mode)
- ✅ Users can edit Blueprints manually (Pro Mode)
- ✅ Slot-based assembly generates correct component structure
- ✅ Generated components use Layer 1 tokens and Layer 2 bindings
- ✅ Supabase Blueprint storage works reliably with versioning
- ✅ Responsive utilities generate mobile-first styles
- ✅ E2E tests cover 80%+ of component interactions
- ✅ Generated components pass WCAG AA accessibility checks

### 10.2 Quality Success
- ✅ Test coverage ≥ 85%
- ✅ Zero TypeScript/ESLint errors
- ✅ Performance targets met (< 1000ms full pipeline)
- ✅ API documentation complete
- ✅ Security audit passed

### 10.3 Integration Success
- ✅ Generated components work in production React applications
- ✅ Blueprints persist correctly in Supabase
- ✅ Offline fallback prevents data loss

---

**TAG**: SPEC-LAYER3-001
**Dependencies**: SPEC-LAYER1-001 (REQUIRED), SPEC-LAYER2-001 (REQUIRED)
**Last Updated**: 2026-01-19
