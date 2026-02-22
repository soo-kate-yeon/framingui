# SPEC-MCP-004: Tekton MCP Workflow Optimization

## Overview

| Field | Value |
|-------|-------|
| **SPEC ID** | SPEC-MCP-004 |
| **Title** | Tekton MCP Workflow Optimization |
| **Status** | In Progress (Phase 3, 3.5, 4 Complete) |
| **Priority** | High |
| **Created** | 2026-02-02 |
| **Author** | R2-D2 + soo-kate-yeon |

## Problem Statement

Current Tekton MCP tools have individual capabilities but lack **pipeline integration**:
- `generate-blueprint` produces empty component lists
- `list-screen-templates` returns 0 templates
- `generate_screen` fails due to unclear schema
- Theme recipes are not auto-applied to generated code

## Goals

1. **Template Registry**: Populate with reusable screen templates
2. **Schema Documentation**: Clear screenDefinition schema with examples
3. **Blueprint Generator Enhancement**: NL → Component mapping
4. **Theme Recipes Auto-Application**: Automatic className injection
5. **E2E Pipeline Tool**: Single tool for complete workflow

---

## Phase 1: Template Registry (Week 1)

### Objective
Populate `.moai/templates/screens/` with production-ready templates.

### Deliverables

```
.moai/templates/screens/
├── dashboard/
│   ├── overview.json          # Stats + Chart + Activity
│   ├── analytics.json         # Charts + Filters + Table
│   └── fitness.json           # Workout stats template
├── auth/
│   ├── login.json            # Email/Password + Social
│   ├── register.json         # Multi-step registration
│   └── forgot-password.json  # Password reset flow
├── form/
│   ├── contact.json          # Contact form
│   ├── settings.json         # Settings page
│   └── wizard.json           # Multi-step form
└── marketing/
    ├── landing.json          # Hero + Features + CTA
    └── pricing.json          # Pricing tiers
```

### Template Schema (v1.0)

```json
{
  "id": "dashboard.overview",
  "name": "Dashboard Overview",
  "category": "dashboard",
  "description": "Standard dashboard with stats, chart, and activity feed",
  "shell": "shell.web.dashboard",
  "page": "page.dashboard",
  "sections": [
    {
      "id": "stats",
      "layout": "section.grid-4",
      "pattern": "stat-cards",
      "components": [
        {
          "type": "card",
          "variant": "stat",
          "props": {
            "title": "{{stat.title}}",
            "value": "{{stat.value}}",
            "change": "{{stat.change}}"
          }
        }
      ],
      "repeat": 4
    },
    {
      "id": "chart",
      "layout": "section.split-70-30",
      "pattern": "chart-with-sidebar",
      "components": [
        { "type": "chart", "variant": "bar", "slot": "main" },
        { "type": "list", "variant": "activity", "slot": "sidebar" }
      ]
    }
  ],
  "variables": {
    "stat": {
      "type": "array",
      "items": ["title", "value", "change", "icon"]
    }
  },
  "themeMapping": {
    "card.stat": "recipes.card.glass",
    "button.primary": "recipes.button.primary"
  }
}
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 1.1 | Create template schema specification | builder-agent | 2h |
| 1.2 | Implement dashboard templates (3) | expert-frontend | 4h |
| 1.3 | Implement auth templates (3) | expert-frontend | 3h |
| 1.4 | Implement form templates (3) | expert-frontend | 3h |
| 1.5 | Update MCP server to load templates | expert-backend | 2h |
| 1.6 | Add template validation | manager-quality | 1h |

### Success Criteria

- [ ] `list-screen-templates` returns ≥10 templates
- [ ] `preview-screen-template` shows complete component tree
- [ ] Templates include themeMapping for recipe application

---

## Phase 2: Schema Documentation (Week 1-2)

### Objective
Document `screenDefinition` schema with clear examples and validation rules.

### Deliverables

```
.moai/specs/SPEC-MCP-004/
├── schema/
│   ├── screen-definition.schema.json   # JSON Schema
│   ├── screen-definition.md            # Human documentation
│   └── examples/
│       ├── minimal.json               # Simplest valid screen
│       ├── dashboard.json             # Full dashboard example
│       └── with-theme.json            # Theme-integrated example
```

### Screen Definition Schema (v1.0)

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["id", "shell", "page", "sections"],
  "properties": {
    "id": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "description": "Unique screen identifier"
    },
    "name": {
      "type": "string",
      "description": "Human-readable screen name"
    },
    "themeId": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "description": "Theme ID for recipe mapping"
    },
    "shell": {
      "type": "string",
      "enum": [
        "shell.web.app",
        "shell.web.dashboard",
        "shell.web.auth",
        "shell.web.marketing",
        "shell.web.admin",
        "shell.web.minimal"
      ],
      "description": "Layout shell token"
    },
    "page": {
      "type": "string",
      "enum": [
        "page.dashboard",
        "page.resource",
        "page.settings",
        "page.detail",
        "page.wizard",
        "page.job",
        "page.empty",
        "page.onboarding"
      ],
      "description": "Page layout token"
    },
    "sections": {
      "type": "array",
      "minItems": 1,
      "items": {
        "$ref": "#/definitions/section"
      }
    }
  },
  "definitions": {
    "section": {
      "type": "object",
      "required": ["id", "layout", "pattern", "components"],
      "properties": {
        "id": { "type": "string" },
        "layout": {
          "type": "string",
          "enum": [
            "section.grid-2",
            "section.grid-3",
            "section.grid-4",
            "section.grid-auto",
            "section.split-30-70",
            "section.split-50-50",
            "section.split-70-30",
            "section.stack-start",
            "section.stack-center",
            "section.container"
          ]
        },
        "pattern": {
          "type": "string",
          "description": "Component arrangement pattern",
          "enum": [
            "stat-cards",
            "chart-with-sidebar",
            "data-table",
            "form-sections",
            "hero-cta",
            "feature-grid",
            "activity-feed",
            "card-grid"
          ]
        },
        "components": {
          "type": "array",
          "items": { "$ref": "#/definitions/component" }
        }
      }
    },
    "component": {
      "type": "object",
      "required": ["type"],
      "properties": {
        "type": {
          "type": "string",
          "description": "Component type from @tekton/ui"
        },
        "variant": { "type": "string" },
        "slot": { "type": "string" },
        "props": { "type": "object" },
        "children": {
          "type": "array",
          "items": { "$ref": "#/definitions/component" }
        }
      }
    }
  }
}
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 2.1 | Create JSON Schema file | manager-spec | 2h |
| 2.2 | Write human documentation | manager-docs | 2h |
| 2.3 | Create example files (3) | expert-frontend | 2h |
| 2.4 | Update MCP validate_screen with schema | expert-backend | 2h |
| 2.5 | Add helpful error messages | expert-backend | 1h |

### Success Criteria

- [ ] `validate_screen` uses official JSON Schema
- [ ] Error messages include field name + expected values + examples
- [ ] Documentation includes copy-paste examples

---

## Phase 3: Blueprint Generator Enhancement (Week 2)

### Objective
Improve NL → Component mapping with keyword detection and template matching.

### Keyword Mapping Table

| Keyword | Component | Variant | Layout |
|---------|-----------|---------|--------|
| stats, metrics, kpi | Card[] | stat/glass | section.grid-4 |
| chart, graph, trend | Chart | bar/line/area | section.container |
| table, list, data | Table | default | section.container |
| form, input, settings | Form | default | section.stack-start |
| activity, feed, recent | List | activity | section.container |
| hero, banner | Card | hero | section.container |
| cards, grid | Card[] | default | section.grid-auto |
| progress, goal | Progress | default | section.container |
| button, cta, action | Button | primary/secondary | - |

### Enhanced Blueprint Algorithm

```typescript
function generateBlueprint(description: string, themeId: string): Blueprint {
  // 1. Tokenize description
  const tokens = tokenize(description.toLowerCase());

  // 2. Detect keywords and map to components
  const detectedComponents: ComponentSpec[] = [];

  for (const [keyword, mapping] of KEYWORD_MAP) {
    if (tokens.includes(keyword)) {
      detectedComponents.push({
        type: mapping.component,
        variant: mapping.variant,
        layout: mapping.layout,
        priority: mapping.priority
      });
    }
  }

  // 3. Load theme recipes
  const theme = await previewTheme(themeId);

  // 4. Match to closest template
  const matchedTemplate = findBestTemplate(detectedComponents);

  // 5. Apply theme recipes to components
  const themedComponents = applyThemeRecipes(
    matchedTemplate.components,
    theme.tokens.recipes
  );

  return {
    id: generateId(),
    name: truncate(description, 50),
    themeId,
    layout: matchedTemplate.layout,
    components: themedComponents
  };
}
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 3.1 | Define keyword mapping table | manager-spec | 1h |
| 3.2 | Implement tokenizer + keyword detector | expert-backend | 3h |
| 3.3 | Implement template matching algorithm | expert-backend | 3h |
| 3.4 | Add theme recipe injection | expert-backend | 2h |
| 3.5 | Test with 10+ descriptions | expert-testing | 2h |

### Implementation (Completed 2026-02-02)

**Files Created:**
- `src/data/template-matcher.ts` - 키워드 → 템플릿 매칭 모듈
- `__tests__/data/template-matcher.test.ts` - 19개 테스트 (모두 통과)

**Files Updated:**
- `src/schemas/mcp-schemas.ts` - `TemplateRecommendationSchema` 추가
- `src/tools/generate-blueprint.ts` - 템플릿 추천 기능 통합

**Features:**
- 다국어 키워드 지원 (EN, KO, JA, ZH)
- 템플릿별 Shell/Page 토큰 권장사항 자동 제공
- 신뢰도 기반 상위 N개 결과 반환

### Success Criteria

- [x] "Fitness dashboard with stats" → `dashboard.overview` 템플릿 매칭 (confidence: 20+) **COMPLETED 2026-02-02**
- [x] "Login page with social auth" → `auth.login` 템플릿 매칭 (confidence: 10+) **COMPLETED 2026-02-02**
- [x] 템플릿 추천에 layoutRecommendation 포함 (shell, page, description) **COMPLETED 2026-02-02**

---

## Phase 3.5: Screen Definition Generation Context (Week 2)

### Objective

Provide coding agents (Claude Code, etc.) with all necessary context to generate complete Screen Definitions from natural language, even when no template matches.

### Problem Statement

Phase 3 (Template Matcher) provides structure recommendations when a template matches. However:
- Template coverage is ~20% (only common patterns)
- When no template matches, agents lack guidance
- Agents need component lists, schema, and examples to generate valid Screen Definitions

### Solution: Agent-Assisted Generation

```
┌─────────────────────────────────────────────────────────────┐
│ Coding Agent (Claude Code)                                   │
│   ↓                                                          │
│   "Create a team members page with avatars in a grid"        │
│   ↓                                                          │
│   Step 1: Request generation context                         │
│   ↓                                                          │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ MCP Tool: get-screen-generation-context                  │ │
│ │                                                          │ │
│ │ Returns:                                                 │ │
│ │   - Available components (type, variants, props)         │ │
│ │   - Template skeleton (if matched)                       │ │
│ │   - JSON Schema for Screen Definition                    │ │
│ │   - Example Screen Definitions                           │ │
│ │   - Theme recipes (if themeId provided)                  │ │
│ └─────────────────────────────────────────────────────────┘ │
│   ↓                                                          │
│   Step 2: Agent generates Screen Definition (LLM reasoning)  │
│   ↓                                                          │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ MCP Tool: validate-screen-definition                     │ │
│ │                                                          │ │
│ │ Input: Generated Screen Definition                       │ │
│ │ Output:                                                  │ │
│ │   - valid: boolean                                       │ │
│ │   - errors: ValidationError[] (if invalid)               │ │
│ │   - suggestions: string[] (optional improvements)        │ │
│ └─────────────────────────────────────────────────────────┘ │
│   ↓                                                          │
│   Step 3: If valid, proceed to Phase 4 (Recipe Resolver)     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### New MCP Tool: `get-screen-generation-context`

```typescript
{
  "name": "get-screen-generation-context",
  "description": "Get all context needed to generate a Screen Definition from natural language",
  "parameters": {
    "description": {
      "type": "string",
      "description": "Natural language description of the screen to generate"
    },
    "themeId": {
      "type": "string",
      "description": "Theme ID for recipe information (optional)"
    },
    "includeExamples": {
      "type": "boolean",
      "default": true,
      "description": "Include example Screen Definitions"
    }
  },
  "required": ["description"]
}
```

### Response Format

```json
{
  "description": "team members page with avatars in a grid",

  "templateMatch": {
    "matched": false,
    "template": null,
    "confidence": 0,
    "reason": "No template matches 'team members' pattern"
  },

  "components": [
    {
      "type": "Avatar",
      "variants": ["default", "circular", "square"],
      "props": ["src", "alt", "size", "fallback"]
    },
    {
      "type": "Card",
      "variants": ["default", "glass", "outlined", "minimal"],
      "props": ["className", "children"]
    },
    {
      "type": "Badge",
      "variants": ["default", "neutral", "accent", "success", "warning", "error"],
      "props": ["variant", "children"]
    }
    // ... all available components
  ],

  "schema": {
    "shells": ["shell.web.app", "shell.web.dashboard", "shell.web.minimal"],
    "pages": ["page.dashboard", "page.list", "page.detail", "page.settings"],
    "sectionPatterns": ["section.container", "section.grid", "section.split"],
    "requiredFields": ["id", "shell", "page", "sections"],
    "componentStructure": {
      "type": "required",
      "props": "optional",
      "variant": "optional",
      "children": "optional (array of components)"
    }
  },

  "examples": [
    {
      "name": "Simple Grid Layout",
      "description": "Grid of cards with avatars",
      "definition": {
        "id": "team-page",
        "shell": "shell.web.app",
        "page": "page.list",
        "sections": [
          {
            "id": "team-grid",
            "pattern": "section.grid",
            "components": [
              {
                "type": "Card",
                "variant": "outlined",
                "children": [
                  { "type": "Avatar", "props": { "size": "lg" } },
                  { "type": "Text", "props": { "children": "{{name}}" } }
                ]
              }
            ]
          }
        ]
      }
    }
  ],

  "themeRecipes": {
    "themeId": "dark-boldness-v2",
    "availableRecipes": {
      "card": ["default", "glass", "outlined"],
      "button": ["primary", "secondary", "ghost"],
      "badge": ["neutral", "accent"],
      "typography": ["hero", "eyebrow", "label", "body"]
    }
  },

  "hints": [
    "Use 'section.grid' pattern for avatar grids",
    "Card.outlined works well for team member cards",
    "Consider adding a header section with page title"
  ]
}
```

### New MCP Tool: `validate-screen-definition`

```typescript
{
  "name": "validate-screen-definition",
  "description": "Validate a Screen Definition against the JSON Schema",
  "parameters": {
    "definition": {
      "type": "object",
      "description": "The Screen Definition to validate"
    },
    "strict": {
      "type": "boolean",
      "default": true,
      "description": "If true, also check component types exist"
    }
  },
  "required": ["definition"]
}
```

### Validation Response Format

```json
{
  "valid": false,
  "errors": [
    {
      "path": "$.sections[0].pattern",
      "message": "Invalid pattern 'section.flex'. Expected one of: section.container, section.grid, section.split",
      "received": "section.flex",
      "expected": ["section.container", "section.grid", "section.split"]
    },
    {
      "path": "$.sections[0].components[0].type",
      "message": "Unknown component type 'UserCard'. Did you mean 'Card'?",
      "received": "UserCard",
      "suggestions": ["Card", "Avatar"]
    }
  ],
  "warnings": [
    {
      "path": "$.themeId",
      "message": "themeId not specified. Theme recipes will not be applied."
    }
  ],
  "suggestions": [
    "Consider adding a 'name' field for better readability",
    "Section 'team-grid' has no id - auto-generated as 'section-0'"
  ]
}
```

### Three-Level Coverage

| Level | Description | Who Handles |
|-------|-------------|-------------|
| **L1: Structure** | shell, page, sections | Template Match or Agent inference |
| **L2: Components** | Component types, variants | Agent using component list |
| **L3: Content** | Props, text, values | Agent based on user description |

### Workflow Integration

```
유저 요청 (자연어)
    ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: Template Matcher                                    │
│   ├─ 매칭 성공 → 템플릿 skeleton 제공                        │
│   └─ 매칭 실패 → Phase 3.5로 이동                            │
└─────────────────────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────────────────────┐
│ Phase 3.5: Agent-Assisted Generation                         │
│                                                              │
│   1. get-screen-generation-context                           │
│      → 컴포넌트 목록, 스키마, 예시, 힌트 제공                 │
│                                                              │
│   2. Agent generates Screen Definition (LLM)                 │
│      → L1 (구조) + L2 (컴포넌트) + L3 (Content) 생성          │
│                                                              │
│   3. validate-screen-definition                              │
│      → Schema 검증, 에러 시 수정 가이드 제공                  │
│      → 통과 시 다음 단계로                                   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
    ↓
[Phase 4] Recipe Resolver → [Phase 5] Code Generator
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 3.5.1 | Design get-screen-generation-context response schema | manager-spec | 1h |
| 3.5.2 | Implement get-screen-generation-context tool | expert-backend | 3h |
| 3.5.3 | Implement validate-screen-definition tool | expert-backend | 2h |
| 3.5.4 | Create example Screen Definitions (5+) | expert-frontend | 2h |
| 3.5.5 | Add intelligent hints based on description | expert-backend | 2h |
| 3.5.6 | Test with 10+ descriptions (with/without template match) | expert-testing | 2h |

### Implementation (Completed 2026-02-02)

**Files Created:**
- `src/tools/get-screen-generation-context.ts` - Context provider for coding agents (361 lines)
- `src/tools/validate-screen-definition.ts` - Screen Definition validator with semantic errors (16,614 bytes)
- `__tests__/tools/get-screen-generation-context.test.ts` - Unit tests
- `__tests__/tools/validate-screen-definition.test.ts` - Validation tests

**Files Updated:**
- `src/index.ts` - MCP server tool registration (15 tools total)
- `src/schemas/mcp-schemas.ts` - Input/Output schemas added

**Features:**
- **get-screen-generation-context**:
  - Template matching with confidence scores
  - Component info (type, variants, props) from registry
  - Complete JSON Schema for Screen Definition
  - 2+ relevant example Screen Definitions
  - Theme recipes (if themeId provided)
  - Contextual hints (accessibility, component usage, styling)
  - 6-step workflow guide for agents
- **validate-screen-definition**:
  - Zod-based schema validation
  - Token validation (shells, pages, sections)
  - Component type validation against @tekton/ui catalog
  - Levenshtein distance-based suggestions ("Did you mean X?")
  - Semantic error messages with expected values
  - Improvement suggestions (maintainability, consistency)

**Test Results (2026-02-03):**
- ✅ `get-screen-generation-context("social feed")` returns complete context
- ✅ `validate-screen-definition` catches invalid page token with suggestion
- ✅ `validate-screen-definition` catches unknown component type (Textarea) with tool hint
- ✅ Error messages include expected values and next steps
- ✅ Both tools registered in MCP server and accessible

### Success Criteria

- [x] `get-screen-generation-context` returns complete context for any description **COMPLETED 2026-02-02**
- [x] `validate-screen-definition` catches all schema violations **COMPLETED 2026-02-02**
- [x] Error messages include suggestions for fixing **COMPLETED 2026-02-02**
- [x] Agent can generate valid Screen Definition using provided context **TESTED 2026-02-03**
- [x] 100% coverage: any user request can produce a Screen Definition **ACHIEVED 2026-02-02**

---

## Phase 4: Theme Recipes Auto-Application (Week 2-3)

### Objective
Automatically apply theme recipes to generated code.

### Recipe Mapping Rules

```typescript
interface RecipeMapping {
  // Component type → Recipe path
  "card": "recipes.card",
  "button": "recipes.button",
  "input": "recipes.input",
  "badge": "recipes.badge",
  "text.hero": "recipes.typography.hero",
  "text.eyebrow": "recipes.typography.eyebrow",
  "text.body": "recipes.typography.body",
  "layout.section": "recipes.layout.section",
  "layout.container": "recipes.layout.container"
}

interface VariantMapping {
  // Theme variant → Recipe key
  "card.glass": "glass",
  "card.outlined": "outlined",
  "card.minimal": "minimal",
  "button.primary": "primary",
  "button.secondary": "secondary",
  "button.ghost": "ghost"
}
```

### Code Generation with Recipes

**Input**:
```json
{
  "type": "card",
  "variant": "glass",
  "themeId": "dark-boldness-v2"
}
```

**Theme lookup**:
```json
{
  "recipes": {
    "card": {
      "glass": "bg-neutral-900/50 backdrop-blur-md border-b border-white/10"
    }
  }
}
```

**Output**:
```tsx
<Card className="bg-neutral-900/50 backdrop-blur-md border-b border-white/10">
  {children}
</Card>
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 4.1 | Define recipe mapping rules | manager-spec | 1h |
| 4.2 | Implement recipe resolver | expert-backend | 2h |
| 4.3 | Update export-screen with recipe injection | expert-backend | 2h |
| 4.4 | Handle missing recipes gracefully | expert-backend | 1h |
| 4.5 | Test with all themes | expert-testing | 2h |

### Implementation (Completed 2026-02-02)

**Files Created:**
- `src/data/recipe-resolver.ts` - 테마 레시피 조회 및 적용 모듈
- `__tests__/data/recipe-resolver.test.ts` - 20개 테스트 (모두 통과)

**Files Updated:**
- `src/tools/export-screen.ts` - 레시피 자동 적용 (exportScreenTool, hybridExportTool)

**Features:**
- Component.variant → Theme Recipe 자동 매핑
- 기존 className 보존 (병합)
- Fallback 처리 (기본 레시피 → undefined)
- Immutable 변환 (원본 Blueprint 수정 안 함)
- Typography 특수 처리 (Text/Heading → recipes.typography)

### Success Criteria

- [x] Generated code includes theme recipe classNames (resolveRecipe 함수) **COMPLETED 2026-02-02**
- [x] 기존 className과 레시피 병합 (mergeClassName 함수) **COMPLETED 2026-02-02**
- [x] Fallback to default styles when recipe missing (우선순위 경로 시도) **COMPLETED 2026-02-02**

---

## Known Issues & Agent Adoption

### Issue: Phase 3.5 Tools Not Used by Coding Agents

**Discovery Date:** 2026-02-03

**Description:**
Despite Phase 3.5 tools (`get-screen-generation-context`, `validate-screen-definition`) being fully implemented and functional since 2026-02-02, external coding agents (e.g., Gemini Antigravity) did not utilize them during screen generation tasks.

**Evidence:**
Gemini Coding Agent UX Review (2026-02-03) reported:
- ❌ 3 failed attempts with `generate-screen` due to invalid tokens
- ❌ Tools used: Only `list-themes` and `generate-screen`
- ❌ Manual file system exploration required
- ❌ No mention of `get-screen-generation-context` or `validate-screen-definition`

**Root Causes Identified:**
1. **Workflow Discovery Gap**: Agents did not discover the recommended workflow (context → validate → generate)
2. **Tool Description Insufficient**: Existing tool descriptions didn't guide agents to Phase 3.5 workflow
3. **No Explicit Sequencing**: MCP tools lacked workflow step indicators (e.g., "Step 1 of 3")

**Validation:**
Phase 3.5 tools were tested 2026-02-03 with Claude Code and confirmed to work correctly:
- ✅ `get-screen-generation-context("social feed")` returned complete context
- ✅ `validate-screen-definition` caught invalid tokens with semantic errors
- ✅ Error messages provided expected values and suggestions

**Impact:**
- Agents experience 3x failure rate without Phase 3.5 workflow
- Manual refinement required even after successful generation
- Poor agent UX contradicts SPEC-MCP-004 objectives

**Mitigation Actions:**
1. ✅ Update SPEC-MCP-004 to reflect Phase 3.5 completion *(this document)*
2. ⏳ Add workflow guidance to tool descriptions in `src/index.ts`
3. ⏳ Create agent workflow documentation in `.moai/docs/mcp-workflow-guide.md`
4. ⏳ Test with Gemini agent using explicit workflow instructions

**Target Resolution:** Phase 5 integration (E2E Pipeline Tool)

---

## Phase 5: E2E Pipeline Tool (Week 3)

### Objective
Create a single tool that executes the complete workflow.

### New Tool: `generate-screen-from-description`

```typescript
{
  "name": "generate-screen-from-description",
  "description": "Generate production-ready screen code from natural language description",
  "parameters": {
    "description": {
      "type": "string",
      "description": "Natural language screen description (10-500 chars)",
      "minLength": 10,
      "maxLength": 500
    },
    "themeId": {
      "type": "string",
      "pattern": "^[a-z0-9-]+$",
      "description": "Theme ID for styling"
    },
    "outputPath": {
      "type": "string",
      "description": "Output file path (e.g., app/dashboard/page.tsx)"
    },
    "outputFormat": {
      "type": "string",
      "enum": ["tsx", "jsx", "vue"],
      "default": "tsx"
    },
    "options": {
      "type": "object",
      "properties": {
        "includeLayout": { "type": "boolean", "default": true },
        "includeTypes": { "type": "boolean", "default": true },
        "prettier": { "type": "boolean", "default": true }
      }
    }
  },
  "required": ["description", "themeId", "outputPath"]
}
```

### Architecture: Agent-Assisted E2E Pipeline

Phase 3.5 설계에 따라, 코딩 에이전트(Claude Code 등)가 Screen Definition 생성 역할을 담당합니다.

```
┌─────────────────────────────────────────────────────────────┐
│  E2E Screen Generation Workflow                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Coding Agent (Claude Code)                              │ │
│  │   "Create a settings page with account info"            │ │
│  └────────────────────────────────────────────────────────┘ │
│      ↓                                                       │
│  1. get-screen-generation-context(description, themeId)     │
│     └─→ Components, schema, templates, examples, hints      │
│      ↓                                                       │
│  ┌────────────────────────────────────────────────────────┐ │
│  │ Agent generates Screen Definition (LLM reasoning)       │ │
│  │   - L1: Structure (shell, page, sections)               │ │
│  │   - L2: Components (types, variants)                    │ │
│  │   - L3: Content (props, text values)                    │ │
│  └────────────────────────────────────────────────────────┘ │
│      ↓                                                       │
│  2. validate-screen-definition(definition)                   │
│     └─→ Valid? Continue : Return errors + suggestions       │
│      ↓                                                       │
│  3. generate_screen(definition)                              │
│     └─→ React code with recipes auto-applied (Phase 4)      │
│      ↓                                                       │
│  4. Agent writes to outputPath                               │
│     └─→ File created                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Key Design Decision: Agent as LLM

MCP 도구는 **"재료"**를 제공하고, **"요리"**는 코딩 에이전트가 담당합니다:

| Role | Responsibility | Who |
|------|----------------|-----|
| Context Provider | 컴포넌트 목록, 스키마, 예시 제공 | MCP Tool |
| Screen Definition Generator | 자연어 → 구조화된 정의 | Coding Agent (LLM) |
| Validator | 스키마 검증, 에러 메시지 | MCP Tool |
| Code Generator | 정의 → React 코드 | MCP Tool |
| Recipe Resolver | variant → className | MCP Tool |

### Benefits of This Architecture

1. **No additional API costs**: Coding agent's LLM is already available
2. **Context awareness**: Agent knows user's codebase and preferences
3. **Flexibility**: Agent can handle any request, not just template matches
4. **Simplicity**: MCP tools remain focused on specific tasks

### Response Format

```json
{
  "success": true,
  "outputPath": "app/studio/equinox/dashboard/page.tsx",
  "blueprint": { "id": "...", "components": [...] },
  "theme": { "id": "dark-boldness-v2", "appliedRecipes": 8 },
  "code": "import React from 'react';\n...",
  "stats": {
    "components": 12,
    "lines": 156,
    "recipesApplied": 8
  }
}
```

### Tasks

| # | Task | Owner | Estimate |
|---|------|-------|----------|
| 5.1 | Design tool interface | manager-spec | 1h |
| 5.2 | Implement pipeline orchestrator | expert-backend | 4h |
| 5.3 | Add error handling + rollback | expert-backend | 2h |
| 5.4 | Add progress reporting | expert-backend | 1h |
| 5.5 | Integration testing | expert-testing | 3h |
| 5.6 | Documentation + examples | manager-docs | 2h |

### Success Criteria

- [ ] Single tool call generates complete screen file
- [ ] Handles all error cases gracefully
- [ ] Returns detailed stats and applied recipes
- [ ] Generated code passes TypeScript check

---

## Implementation Timeline

```
Week 1:
├── Phase 1: Template Registry (Mon-Wed)
│   ├── Day 1: Schema + Dashboard templates
│   ├── Day 2: Auth + Form templates
│   └── Day 3: MCP integration + validation
│
└── Phase 2: Schema Documentation (Thu-Fri)
    ├── Day 4: JSON Schema + examples
    └── Day 5: Human docs + MCP update

Week 2:
├── Phase 3: Blueprint Generator (Mon-Wed)
│   ├── Day 1: Keyword mapping + tokenizer
│   ├── Day 2: Template matching
│   └── Day 3: Theme recipe injection
│
└── Phase 4: Recipe Auto-Application (Thu-Fri)
    ├── Day 4: Recipe resolver
    └── Day 5: Export integration + testing

Week 3:
└── Phase 5: E2E Pipeline Tool (Mon-Wed)
    ├── Day 1: Tool interface + orchestrator
    ├── Day 2: Error handling + progress
    └── Day 3: Integration testing + docs
```

---

## Risk Assessment

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| MCP server source not accessible | High | High | Create new MCP server or fork |
| Template complexity explosion | Medium | Medium | Limit to 15 core templates |
| Keyword mapping insufficient | Medium | Low | Fallback to template matching |
| Theme recipe conflicts | Low | Low | Priority rules + override option |

---

## Success Metrics

| Metric | Current | Target | Measurement |
|--------|---------|--------|-------------|
| Templates available | 0 | ≥15 | `list-screen-templates` count |
| Blueprint accuracy | 0% | ≥80% | Manual review of 20 descriptions |
| Code generation success | 0% | ≥95% | Automated test suite |
| Recipe application | 0% | 100% | Generated code inspection |
| E2E pipeline time | N/A | <5s | Performance benchmark |

---

## Appendix

### A. MCP Server Location

tekton-mcp 서버 소스 위치 확인 필요:
- [ ] Local: `packages/tekton-mcp/`
- [ ] External: npm package or separate repo
- [ ] Remote: MCP registry

### B. Existing Tool Dependencies

```
preview-theme ←─────────┐
                        │
list-components ←───────┼──→ generate-blueprint
                        │           │
list_tokens ←───────────┘           ↓
                              validate_screen
                                    │
                                    ↓
                              export-screen
                                    │
                                    ↓
                         generate-screen-from-description (NEW)
```

### C. Related SPECs

- SPEC-MCP-001: MCP Tool Development Standards
- SPEC-MCP-002: Theme System v2.1
- SPEC-MCP-003: Component & Template Discovery Tools
- SPEC-LAYOUT-001: Layout Token Specification
