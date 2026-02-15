# Screen Definition Schema Documentation

> **Version**: 1.0.0
> **SPEC**: SPEC-MCP-004
> **Last Updated**: 2026-02-02

## Overview

Screen Definition은 Tekton MCP의 `generate_screen` 및 `validate_screen` 도구에서 사용하는 JSON 기반 화면 정의 형식입니다.

## Quick Start

```json
{
  "id": "my-dashboard",
  "shell": "shell.web.dashboard",
  "page": "page.dashboard",
  "sections": [
    {
      "id": "stats",
      "layout": "section.grid-4",
      "pattern": "stat-cards",
      "components": [
        { "type": "card", "variant": "glass" }
      ]
    }
  ]
}
```

## Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique screen identifier (lowercase, hyphens allowed) |
| `shell` | ShellToken | Layout shell defining page structure |
| `page` | PageToken | Page layout for content area |
| `sections` | Section[] | Array of content sections |

## Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `name` | string | Human-readable screen name |
| `description` | string | Brief description of the screen |
| `themeId` | string | Theme ID for recipe mapping |

---

## Shell Tokens

Shell tokens define the overall page structure including header, sidebar, and footer placement.

### Web Shells

| Token | Description | Use Case |
|-------|-------------|----------|
| `shell.web.app` | Standard app layout with header, sidebar, main | General applications |
| `shell.web.dashboard` | Admin dashboard with collapsible sidebar | Analytics, admin panels |
| `shell.web.auth` | Centered content layout | Login, signup, verification |
| `shell.web.marketing` | Full-width hero sections | Landing pages |
| `shell.web.admin` | Fixed sidebar with tabbed main | Complex admin interfaces |
| `shell.web.minimal` | Single main content area | Focus pages, modals |

### Mobile Shells

| Token | Description | Use Case |
|-------|-------------|----------|
| `shell.mobile.app` | Header, main, bottom tab | Standard mobile apps |
| `shell.mobile.fullscreen` | Full screen with safe area | Media, immersive content |
| `shell.mobile.modal` | Bottom sheet with handle | Quick actions, confirmations |
| `shell.mobile.tab` | Tab-based navigation | Multi-section apps |
| `shell.mobile.drawer` | Slide-out menu | Complex navigation |
| `shell.mobile.detail` | Detail view with action bar | Item details |

---

## Page Tokens

Page tokens define the content area structure.

| Token | Description | Use Case |
|-------|-------------|----------|
| `page.dashboard` | Metrics, charts, data tables | Analytics dashboards |
| `page.resource` | Toolbar, list, detail panel | CRUD operations |
| `page.settings` | Grouped form sections | Configuration pages |
| `page.detail` | Hero, content, related items | Item focus pages |
| `page.wizard` | Progress, step content, navigation | Multi-step flows |
| `page.job` | Header, main form, action buttons | Task execution |
| `page.empty` | Illustration and call-to-action | Empty states |
| `page.onboarding` | Welcome, steps, completion | First-run experience |

---

## Section Structure

Each section defines a content area with pattern (layout token) and components.

```json
{
  "id": "stats",
  "pattern": "section.grid-4",
  "components": [...]
}
```

### Section Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `id` | ✅ | string | Section identifier |
| `pattern` | ✅ | SectionToken | Grid/flex layout pattern |
| `components` | ✅ | Component[] | Array of components |
| `responsive` | ❌ | ResponsiveOverrides | Breakpoint-specific overrides |

### Section Layout Tokens

#### Grid Layouts

| Token | Description |
|-------|-------------|
| `section.grid-2` | 2-column responsive grid |
| `section.grid-3` | 3-column responsive grid |
| `section.grid-4` | 4-column responsive grid |
| `section.grid-auto` | Auto-fill responsive grid |

#### Flex Layouts

| Token | Description |
|-------|-------------|
| `section.split-30-70` | 30/70 split (sidebar + main) |
| `section.split-50-50` | Equal 50/50 split |
| `section.split-70-30` | 70/30 split (main + sidebar) |
| `section.stack-start` | Vertical stack, top aligned |
| `section.stack-center` | Vertical stack, center aligned |
| `section.stack-end` | Vertical stack, bottom aligned |
| `section.container` | Centered max-width container |

### Pattern Tokens

Patterns provide semantic context for component arrangement.

| Pattern | Description | Typical Components |
|---------|-------------|-------------------|
| `page-header` | Page title with breadcrumb | text, badge |
| `stat-cards` | Metrics display | card, text, badge |
| `chart-with-sidebar` | Main chart with side panel | chart, list, button |
| `data-table` | Sortable data grid | table |
| `form-sections` | Grouped form inputs | form, input, switch |
| `hero-cta` | Hero banner with actions | text, button |
| `feature-grid` | Feature highlights | card, icon, text |
| `activity-feed` | Recent activity list | list, avatar, text |
| `action-buttons` | Primary/secondary actions | button |
| `progress-section` | Progress indicator | progress, text |

---

## Component Structure

Components define individual UI elements.

```json
{
  "type": "card",
  "variant": "glass",
  "slot": "main",
  "props": { "className": "p-6" },
  "children": [
    { "type": "text", "variant": "eyebrow", "props": { "children": "LABEL" } }
  ]
}
```

### Component Fields

| Field | Required | Type | Description |
|-------|----------|------|-------------|
| `type` | ✅ | string | Component type from @tekton/ui |
| `variant` | ❌ | string | Style variant (maps to theme recipe) |
| `slot` | ❌ | string | Layout slot (main, sidebar, header, footer) |
| `props` | ❌ | object | Component props |
| `children` | ❌ | Component[] | Nested components |

### Available Component Types

#### Core (Tier 1)
`button`, `input`, `label`, `card`, `badge`, `avatar`, `separator`, `checkbox`, `radio-group`, `switch`, `textarea`, `skeleton`, `scroll-area`, `form`, `select`

#### Complex (Tier 2)
`dialog`, `dropdown-menu`, `table`, `tabs`, `toast`, `tooltip`, `popover`, `sheet`, `alert-dialog`, `progress`

#### Advanced (Tier 3)
`sidebar`, `navigation-menu`, `breadcrumb`, `command`, `calendar`

### Common Variants

| Component | Variants |
|-----------|----------|
| `card` | `glass`, `outlined`, `minimal`, `poster` |
| `button` | `primary`, `secondary`, `ghost`, `link` |
| `text` | `hero`, `eyebrow`, `body`, `label`, `muted` |
| `badge` | `neutral`, `accent`, `success`, `warning`, `error` |

---

## Theme Integration

When `themeId` is specified, component variants are automatically mapped to theme recipes.

```json
{
  "themeId": "equinox-fitness-v2",
  "sections": [
    {
      "components": [
        { "type": "card", "variant": "glass" }
        // → Applies: recipes.card.glass
        // → "bg-neutral-900/50 backdrop-blur-md border-b border-white/10"
      ]
    }
  ]
}
```

### Theme Mapping

| Component.Variant | Recipe Path |
|-------------------|-------------|
| `card.glass` | `recipes.card.glass` |
| `card.outlined` | `recipes.card.outlined` |
| `button.primary` | `recipes.button.primary` |
| `button.secondary` | `recipes.button.secondary` |
| `text.hero` | `recipes.typography.hero` |
| `text.eyebrow` | `recipes.typography.eyebrow` |
| `badge.neutral` | `recipes.badge.neutral` |
| `badge.accent` | `recipes.badge.accent` |

---

## Dynamic Content with Variables

Use `{{variable}}` syntax for dynamic content placeholders.

```json
{
  "type": "text",
  "props": { "children": "{{stats.label}}" }
}
```

### Repeat Configuration

```json
{
  "id": "stats",
  "repeat": { "count": 4, "variable": "stats" },
  "components": [
    { "type": "card", "props": { "title": "{{stats[i].label}}" } }
  ]
}
```

---

## Validation

Use `validate_screen` MCP tool to check your screen definition:

```
validate_screen({
  screenDefinition: { ... },
  strictMode: true
})
```

### Common Validation Errors

| Error | Solution |
|-------|----------|
| `shell: Required` | Add `shell` field with valid token |
| `page: Required` | Add `page` field with valid token |
| `sections.0.pattern: Required` | Add `pattern` field to section |
| `sections.0.components: Required` | Add at least one component |

---

## Examples

See the `examples/` directory for complete examples:

- `minimal.json` - Simplest valid screen definition
- `dashboard.json` - Full dashboard with stats and charts
- `with-theme.json` - Theme-integrated example

---

## Related Resources

- **SPEC-MCP-004**: Tekton MCP Workflow Optimization
- **SPEC-LAYOUT-001**: Layout Token Specification
- **@tekton/ui**: Component library documentation
