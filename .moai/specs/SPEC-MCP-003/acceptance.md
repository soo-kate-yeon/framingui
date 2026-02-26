---
id: SPEC-MCP-003
document: acceptance
version: "1.0.0"
created: "2026-02-01"
updated: "2026-02-01"
author: soo-kate-yeon
---

# SPEC-MCP-003: Acceptance Criteria

## 1. Overview

This document defines the acceptance criteria and test scenarios for SPEC-MCP-003: Component & Template Discovery MCP Tools.

---

## 2. Acceptance Criteria

### AC-001: list-components Tool

| Criterion | Description | Priority |
|-----------|-------------|----------|
| AC-001-01 | Returns all 30+ components when category='all' | Must |
| AC-001-02 | Filters components by category (core/complex/advanced) | Must |
| AC-001-03 | Returns component count and category breakdown | Must |
| AC-001-04 | Search filters components by name or description | Should |
| AC-001-05 | Returns valid JSON-RPC 2.0 response | Must |
| AC-001-06 | Handles empty search results gracefully | Must |

### AC-002: preview-component Tool

| Criterion | Description | Priority |
|-----------|-------------|----------|
| AC-002-01 | Returns detailed component info for valid componentId | Must |
| AC-002-02 | Returns props interface with types and defaults | Must |
| AC-002-03 | Returns variants array for components with variants | Should |
| AC-002-04 | Returns sub-components for composite components | Should |
| AC-002-05 | Returns import statement | Must |
| AC-002-06 | Returns error with available components when componentId invalid | Must |
| AC-002-07 | Includes examples when includeExamples=true | Should |
| AC-002-08 | Includes dependencies when includeDependencies=true | Should |

### AC-003: list-screen-templates Tool

| Criterion | Description | Priority |
|-----------|-------------|----------|
| AC-003-01 | Returns all 13 templates when category='all' | Must |
| AC-003-02 | Filters templates by category (auth/dashboard/form/marketing/feedback) | Must |
| AC-003-03 | Returns template count and category breakdown | Must |
| AC-003-04 | Search filters templates by name or description | Should |
| AC-003-05 | Returns valid JSON-RPC 2.0 response | Must |
| AC-003-06 | Integrates with existing templateRegistry | Must |

### AC-004: preview-screen-template Tool

| Criterion | Description | Priority |
|-----------|-------------|----------|
| AC-004-01 | Returns detailed template info for valid templateId | Must |
| AC-004-02 | Returns skeleton structure (shell, page, sections) | Must |
| AC-004-03 | Returns customization boundaries (texts, optional, slots) | Must |
| AC-004-04 | Returns required components list | Must |
| AC-004-05 | Returns import statement | Must |
| AC-004-06 | Returns error with available templates when templateId invalid | Must |
| AC-004-07 | Includes responsive layout tokens when includeLayoutTokens=true | Should |

### AC-005: Integration & Compatibility

| Criterion | Description | Priority |
|-----------|-------------|----------|
| AC-005-01 | All 13 tools listed in ListTools response | Must |
| AC-005-02 | Existing 9 tools continue to work without changes | Must |
| AC-005-03 | All tools follow consistent response structure | Must |
| AC-005-04 | Test coverage >= 85% | Should |
| AC-005-05 | TypeScript strict mode compilation passes | Must |

---

## 3. Test Scenarios (Given-When-Then)

### Scenario 1: List All Components

```gherkin
Feature: list-components Tool
  As an AI agent
  I want to list all available UI components
  So that I can discover components to use in screen generation

  Scenario: List all components successfully
    Given the MCP server is running
    And @framingui has 30+ registered components
    When I call list-components with category='all'
    Then the response should have success=true
    And the response should contain 30+ components
    And each component should have id, name, category, tier
    And the categories count should show core>=15, complex>=10, advanced>=5

  Scenario: Filter components by category
    Given the MCP server is running
    When I call list-components with category='core'
    Then the response should have success=true
    And all returned components should have category='core'
    And the count should be >= 15

  Scenario: Search components by name
    Given the MCP server is running
    When I call list-components with search='button'
    Then the response should have success=true
    And the response should include the Button component
```

### Scenario 2: Preview Component

```gherkin
Feature: preview-component Tool
  As an AI agent
  I want to preview a specific component
  So that I can understand its props and usage

  Scenario: Preview existing component successfully
    Given the MCP server is running
    And the 'button' component exists in the registry
    When I call preview-component with componentId='button'
    Then the response should have success=true
    And the component name should be 'Button'
    And the component should have props array with at least 3 props
    And the component should have variants array
    And the importStatement should contain '@framingui'

  Scenario: Preview component with sub-components
    Given the MCP server is running
    And the 'card' component has sub-components
    When I call preview-component with componentId='card'
    Then the response should have success=true
    And subComponents should include ['CardHeader', 'CardContent', 'CardFooter', 'CardTitle', 'CardDescription']

  Scenario: Preview non-existent component
    Given the MCP server is running
    When I call preview-component with componentId='non-existent'
    Then the response should have success=false
    And the error should mention 'not found'
    And the error should include list of available component IDs

  Scenario: Preview component with examples
    Given the MCP server is running
    When I call preview-component with componentId='button' and includeExamples=true
    Then the response should have success=true
    And the examples array should have at least 1 example
    And each example should have title and code
```

### Scenario 3: List All Screen Templates

```gherkin
Feature: list-screen-templates Tool
  As an AI agent
  I want to list all available screen templates
  So that I can discover templates to use for screen generation

  Scenario: List all templates successfully
    Given the MCP server is running
    And templateRegistry has 13 registered templates
    When I call list-screen-templates with category='all'
    Then the response should have success=true
    And the response should contain 13 templates
    And each template should have id, name, category, layoutType
    And the categories should show auth=4, feedback=5, form=2, dashboard=1, marketing=1

  Scenario: Filter templates by category
    Given the MCP server is running
    When I call list-screen-templates with category='auth'
    Then the response should have success=true
    And all returned templates should have category='auth'
    And the count should be 4

  Scenario: Search templates by name
    Given the MCP server is running
    When I call list-screen-templates with search='login'
    Then the response should have success=true
    And the response should include template with id='auth.login'
```

### Scenario 4: Preview Screen Template

```gherkin
Feature: preview-screen-template Tool
  As an AI agent
  I want to preview a specific screen template
  So that I can understand its structure and customization options

  Scenario: Preview login template successfully
    Given the MCP server is running
    And the 'auth.login' template exists in the registry
    When I call preview-screen-template with templateId='auth.login'
    Then the response should have success=true
    And the template name should be 'Login'
    And the skeleton should have shell='centered-card'
    And the customizable.texts should include ['title', 'subtitle', 'button_label']
    And the customizable.slots should include ['logo', 'forgotPassword', 'socialLogin', 'footer']
    And requiredComponents should include ['Button', 'Input', 'Form', 'Card', 'Label']

  Scenario: Preview template with layout tokens
    Given the MCP server is running
    When I call preview-screen-template with templateId='auth.login' and includeLayoutTokens=true
    Then the response should have success=true
    And layout.responsive should have mobile, tablet, desktop configurations
    And each responsive config should have padding, gap, columns

  Scenario: Preview non-existent template
    Given the MCP server is running
    When I call preview-screen-template with templateId='non-existent'
    Then the response should have success=false
    And the error should mention 'not found'
    And the error should include list of available template IDs
```

### Scenario 5: Integration Tests

```gherkin
Feature: MCP Server Integration
  As a system administrator
  I want all MCP tools to work together
  So that AI agents can use the full functionality

  Scenario: List tools returns all 13 tools
    Given the MCP server is running
    When I call ListTools
    Then the response should contain 13 tools
    And the tools should include 'list-components'
    And the tools should include 'preview-component'
    And the tools should include 'list-screen-templates'
    And the tools should include 'preview-screen-template'
    And the existing 9 tools should still be present

  Scenario: Existing tools still work
    Given the MCP server is running with new tools
    When I call list-themes (existing tool)
    Then the response should have success=true
    And the response format should be unchanged

  Scenario: Component to Template workflow
    Given the MCP server is running
    When I call list-screen-templates with category='auth'
    And I identify 'auth.login' template
    And I call preview-screen-template with templateId='auth.login'
    And I see requiredComponents includes 'Button'
    And I call preview-component with componentId='button'
    Then I should have all information needed to customize the template
```

---

## 4. Error Handling Tests

### 4.1 Invalid Input Tests

| Test Case | Input | Expected Error |
|-----------|-------|----------------|
| Invalid category | category='invalid' | Invalid enum value |
| Empty componentId | componentId='' | Component ID must not be empty |
| Invalid componentId format | componentId='Button' | Component ID must be lowercase with hyphens |
| Invalid templateId format | templateId='login' | Template ID must be in format category.name |
| Null input | null | Invalid input |

### 4.2 Not Found Tests

| Test Case | Input | Expected Response |
|-----------|-------|-------------------|
| Component not found | componentId='xyz' | error with available components |
| Template not found | templateId='auth.xyz' | error with available templates |

---

## 5. Performance Criteria

| Metric | Target | Measurement |
|--------|--------|-------------|
| list-components response time | < 50ms | Average of 100 calls |
| preview-component response time | < 30ms | Average of 100 calls |
| list-screen-templates response time | < 50ms | Average of 100 calls |
| preview-screen-template response time | < 30ms | Average of 100 calls |

---

## 6. Definition of Done Checklist

### Code Quality
- [ ] TypeScript strict mode: no errors
- [ ] ESLint: no warnings
- [ ] Test coverage >= 85%
- [ ] All test scenarios pass

### Functionality
- [ ] list-components returns all 30+ components
- [ ] preview-component shows props, variants, examples
- [ ] list-screen-templates returns all 13 templates
- [ ] preview-screen-template shows skeleton, customization, layout
- [ ] All 13 tools listed in ListTools response
- [ ] Existing 9 tools unchanged

### Documentation
- [ ] Tool descriptions clear and accurate
- [ ] Input schemas documented
- [ ] Output schemas documented
- [ ] Examples provided in README

### Integration
- [ ] Works with existing @framingui
- [ ] Uses existing templateRegistry
- [ ] Follows MCP JSON-RPC 2.0 protocol
- [ ] Error messages are helpful

---

## 7. Test Data

### Sample Components for Testing

```typescript
// Core components to verify
const coreComponents = [
  'button', 'input', 'label', 'card', 'badge',
  'avatar', 'separator', 'checkbox', 'radio-group', 'switch',
  'textarea', 'skeleton', 'scroll-area', 'form', 'select'
];

// Complex components to verify
const complexComponents = [
  'dialog', 'dropdown-menu', 'table', 'tabs', 'toast',
  'tooltip', 'popover', 'sheet', 'alert-dialog', 'progress'
];

// Advanced components to verify
const advancedComponents = [
  'sidebar', 'navigation-menu', 'breadcrumb', 'command', 'calendar'
];
```

### Sample Templates for Testing

```typescript
// All 13 templates to verify
const allTemplates = [
  // Auth (4)
  'auth.login', 'auth.signup', 'auth.forgot-password', 'auth.verification',
  // Core (3) - mapped to form/marketing
  'core.landing', 'core.preferences', 'core.profile',
  // Feedback (5)
  'feedback.loading', 'feedback.error', 'feedback.empty', 'feedback.confirmation', 'feedback.success',
  // Dashboard (1)
  'dashboard.overview'
];
```

---

**Related Documents:**
- [spec.md](./spec.md) - Requirements specification
- [plan.md](./plan.md) - Implementation plan
