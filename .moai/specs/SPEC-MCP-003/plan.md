---
id: SPEC-MCP-003
document: plan
version: "1.0.0"
created: "2026-02-01"
updated: "2026-02-01"
author: soo-kate-yeon
---

# SPEC-MCP-003: Implementation Plan

## 1. Overview

### Goal
Implement 4 new MCP tools for component and template discovery in the tekton-mcp-server.

### Scope
- 4 new tools: list-components, preview-component, list-screen-templates, preview-screen-template
- Integration with existing @tekton/ui components and Template Registry
- Comprehensive test suite with 85% coverage target

### Priority
HIGH - Enables AI agents to effectively discover and utilize UI components

---

## 2. Milestones

### Milestone 1: Schema Definition (Priority: Primary)

**Goal:** Define Zod schemas for all 4 tools

**Tasks:**
- [ ] [TAG-MCP003-002] Create input schemas for all 4 tools
- [ ] [TAG-MCP003-003] Create output schemas for all 4 tools
- [ ] [TAG-MCP003-001] Ensure MCP JSON-RPC 2.0 compliance
- [ ] Export schemas from mcp-schemas.ts

**Acceptance Criteria:**
- All schemas compile without TypeScript errors
- Schemas follow existing patterns from SPEC-MCP-002
- Type inference works correctly for input/output

**Files to Create/Update:**
- `packages/mcp-server/src/schemas/mcp-schemas.ts` (UPDATE)

---

### Milestone 2: Component Metadata Registry (Priority: Primary)

**Goal:** Create component metadata source for discovery tools

**Tasks:**
- [ ] Create component-registry.ts with all 30+ component metadata
- [ ] Include category (core/complex/advanced), tier, variants count
- [ ] Add component descriptions and sub-component information
- [ ] Add prop definitions for each component

**Acceptance Criteria:**
- All 30+ components are registered
- Metadata is accurate and up-to-date with @tekton/ui
- Categories match the tiered structure (15 core, 10 complex, 5 advanced)

**Files to Create:**
- `packages/mcp-server/src/data/component-registry.ts` (NEW)

---

### Milestone 3: list-components Tool (Priority: Primary)

**Goal:** Implement list-components MCP tool

**Tasks:**
- [ ] [TAG-MCP003-006] Implement list-components tool function
- [ ] Support category filtering (core/complex/advanced/all)
- [ ] Support search functionality
- [ ] Return component counts by category
- [ ] Register tool in index.ts

**Acceptance Criteria:**
- Returns all 30+ components when called with category='all'
- Filtering by category returns correct subset
- Search finds components by name or description
- Response follows MCP JSON-RPC 2.0 format

**Files to Create/Update:**
- `packages/mcp-server/src/tools/list-components.ts` (NEW)
- `packages/mcp-server/src/index.ts` (UPDATE)

---

### Milestone 4: preview-component Tool (Priority: Primary)

**Goal:** Implement preview-component MCP tool

**Tasks:**
- [ ] [TAG-MCP003-007] Implement preview-component tool function
- [ ] Extract props interface from component metadata
- [ ] Include variants information
- [ ] Include sub-components for composite components
- [ ] Generate import statements
- [ ] Include usage examples when includeExamples=true
- [ ] Include dependencies when includeDependencies=true
- [ ] Handle component not found with helpful error

**Acceptance Criteria:**
- Returns detailed component information for valid componentId
- Props interface is accurate
- Variants are listed correctly
- Error includes list of available components when componentId is invalid

**Files to Create/Update:**
- `packages/mcp-server/src/tools/preview-component.ts` (NEW)
- `packages/mcp-server/src/index.ts` (UPDATE)

---

### Milestone 5: list-screen-templates Tool (Priority: Secondary)

**Goal:** Implement list-screen-templates MCP tool

**Tasks:**
- [ ] [TAG-MCP003-008] Implement list-screen-templates tool function
- [ ] Integrate with templateRegistry from @tekton/ui
- [ ] Support category filtering (auth/dashboard/form/marketing/feedback/all)
- [ ] Support search functionality
- [ ] Return template counts by category

**Acceptance Criteria:**
- Returns all 13 templates when called with category='all'
- Filtering by category returns correct subset
- Uses existing templateRegistry singleton
- Response follows MCP JSON-RPC 2.0 format

**Files to Create/Update:**
- `packages/mcp-server/src/tools/list-screen-templates.ts` (NEW)
- `packages/mcp-server/src/index.ts` (UPDATE)

---

### Milestone 6: preview-screen-template Tool (Priority: Secondary)

**Goal:** Implement preview-screen-template MCP tool

**Tasks:**
- [ ] [TAG-MCP003-009] Implement preview-screen-template tool function
- [ ] Return skeleton structure (shell, page, sections)
- [ ] Return customization boundaries (texts, optional, slots)
- [ ] Return required components list
- [ ] Include responsive layout tokens when includeLayoutTokens=true
- [ ] Generate import statements
- [ ] Handle template not found with helpful error

**Acceptance Criteria:**
- Returns detailed template information for valid templateId
- Skeleton structure matches ScreenTemplate interface
- Customization boundaries are accurate
- Error includes list of available templates when templateId is invalid

**Files to Create/Update:**
- `packages/mcp-server/src/tools/preview-screen-template.ts` (NEW)
- `packages/mcp-server/src/index.ts` (UPDATE)

---

### Milestone 7: Index Integration (Priority: Secondary)

**Goal:** Register all 4 new tools in MCP server

**Tasks:**
- [ ] [TAG-MCP003-005] Update ListToolsRequestSchema handler with 4 new tools
- [ ] Update CallToolRequestSchema handler with 4 new tool cases
- [ ] Update server info to reflect 13 tools
- [ ] Update log messages

**Acceptance Criteria:**
- All 13 tools are listed in ListTools response
- All 4 new tools execute correctly via CallTool
- Existing 9 tools continue to work without changes

**Files to Update:**
- `packages/mcp-server/src/index.ts` (UPDATE)

---

### Milestone 8: Test Suite (Priority: Final)

**Goal:** Create comprehensive test suite with 85% coverage

**Tasks:**
- [ ] Create test file for list-components
- [ ] Create test file for preview-component
- [ ] Create test file for list-screen-templates
- [ ] Create test file for preview-screen-template
- [ ] Test normal cases (valid input)
- [ ] Test error cases (invalid input)
- [ ] Test edge cases (empty results, special characters)

**Acceptance Criteria:**
- All tests pass
- Coverage >= 85%
- Tests follow existing patterns from SPEC-MCP-002

**Files to Create:**
- `packages/mcp-server/__tests__/list-components.test.ts` (NEW)
- `packages/mcp-server/__tests__/preview-component.test.ts` (NEW)
- `packages/mcp-server/__tests__/list-screen-templates.test.ts` (NEW)
- `packages/mcp-server/__tests__/preview-screen-template.test.ts` (NEW)

---

## 3. Technical Approach

### Component Metadata Strategy

```typescript
// Two-tier metadata approach:
// 1. Static metadata (component-registry.ts) for basic info
// 2. Dynamic extraction from @tekton/ui for detailed props

// Static metadata example
export const COMPONENT_REGISTRY = {
  button: {
    id: 'button',
    name: 'Button',
    category: 'core',
    tier: 1,
    description: 'Interactive button with multiple variants',
    variantsCount: 6,
    hasSubComponents: false,
    variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
    props: [
      { name: 'variant', type: 'ButtonVariant', required: false, defaultValue: 'default' },
      { name: 'size', type: '"default" | "sm" | "lg" | "icon"', required: false, defaultValue: 'default' },
      { name: 'asChild', type: 'boolean', required: false, defaultValue: 'false' },
    ],
    subComponents: [],
    dependencies: {
      internal: [],
      external: ['@radix-ui/react-slot'],
    },
    importStatement: "import { Button, buttonVariants } from '@tekton/ui';",
    examples: [
      {
        title: 'Basic Usage',
        code: '<Button>Click me</Button>',
        description: 'A simple button with default styling',
      },
    ],
  },
  // ... 29+ more components
};
```

### Template Registry Integration

```typescript
// Direct integration with existing templateRegistry
import { templateRegistry, type ScreenTemplate } from '@tekton/ui';

export async function listScreenTemplatesTool(
  input: ListScreenTemplatesInput
): Promise<ListScreenTemplatesOutput> {
  try {
    const allTemplates = templateRegistry.getAll();

    let templates = input.category === 'all'
      ? allTemplates
      : templateRegistry.getByCategory(input.category as ScreenCategory);

    if (input.search) {
      templates = templateRegistry.search(input.search);
    }

    return {
      success: true,
      templates: templates.map(mapTemplateToMeta),
      count: templates.length,
      categories: getCategoryCounts(allTemplates),
    };
  } catch (error) {
    return {
      success: false,
      error: extractErrorMessage(error),
    };
  }
}
```

---

## 4. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Component metadata out of sync with @tekton/ui | Medium | Automated sync script, version tracking |
| Template Registry not initialized | High | Lazy initialization, error handling |
| Breaking existing tools | High | Comprehensive regression tests |
| Large response payload | Low | Pagination support, selective fields |

---

## 5. Dependencies

### External Dependencies
- @modelcontextprotocol/sdk: ^1.25.3 (existing)
- zod: ^3.23.8 (existing)
- @tekton/ui: workspace:* (for template registry)

### Internal Dependencies
- packages/mcp-server/src/utils/error-handler.ts (existing)
- packages/mcp-server/src/utils/logger.ts (existing)
- packages/ui/src/templates/registry.ts (Template Registry)

---

## 6. Execution Notes

### Before Implementation
1. Ensure @tekton/ui is built and templates are registered
2. Review existing MCP tool patterns in SPEC-MCP-002
3. Verify template registry exports from @tekton/ui

### During Implementation
1. Follow existing code patterns from list-themes.ts, preview-theme.ts
2. Use consistent error handling with extractErrorMessage
3. Log tool calls with info() utility

### After Implementation
1. Run full test suite: `npm test`
2. Verify all 13 tools work via MCP client
3. Update documentation and CHANGELOG

---

## 7. Definition of Done

- [ ] All 4 tools implemented and registered
- [ ] All Zod schemas defined and exported
- [ ] Component metadata registry created
- [ ] Test coverage >= 85%
- [ ] TypeScript compiles without errors
- [ ] ESLint passes without warnings
- [ ] All 13 tools respond correctly (manual verification)
- [ ] Documentation updated

---

**Related Documents:**
- [spec.md](./spec.md) - Requirements specification
- [acceptance.md](./acceptance.md) - Acceptance criteria and test scenarios
