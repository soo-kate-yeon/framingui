/**
 * Hint Generator Module
 * SPEC-MCP-004 Phase 3.5: Generates contextual hints for coding agents
 *
 * Provides guidance on layout, components, styling, accessibility, and best practices
 */

import type { GenerationHint } from '../schemas/mcp-schemas.js';

/**
 * Keyword patterns for hint generation
 */
const LAYOUT_KEYWORDS = {
  dashboard: ['dashboard', 'analytics', 'metrics', 'admin', 'kpi', 'stats'],
  form: ['form', 'input', 'submit', 'register', 'signup', 'contact'],
  auth: ['login', 'signin', 'signup', 'auth', 'password', 'verification'],
  table: ['table', 'list', 'data', 'records', 'grid', 'rows'],
  landing: ['landing', 'hero', 'marketing', 'homepage', 'home'],
  profile: ['profile', 'user', 'account', 'settings', 'preferences'],
};

const COMPONENT_KEYWORDS = {
  Card: ['card', 'panel', 'container', 'box'],
  Table: ['table', 'data', 'records', 'rows', 'columns'],
  Form: ['form', 'input', 'submit', 'field'],
  Avatar: ['avatar', 'profile', 'user', 'photo'],
  Badge: ['badge', 'tag', 'label', 'status'],
  Button: ['button', 'action', 'cta', 'submit'],
  Modal: ['modal', 'dialog', 'popup', 'overlay'],
  Tabs: ['tabs', 'tabbed', 'sections', 'panels'],
  Chart: ['chart', 'graph', 'visualization', 'analytics'],
};

/**
 * Generate layout hints based on description
 */
function generateLayoutHints(description: string): GenerationHint[] {
  const hints: GenerationHint[] = [];
  const lowerDesc = description.toLowerCase();

  // Dashboard layout hints
  if (LAYOUT_KEYWORDS.dashboard.some(kw => lowerDesc.includes(kw))) {
    hints.push({
      category: 'layout',
      priority: 'high',
      message:
        'Use shell.web.dashboard with page.dashboard for admin-style layouts with sidebar navigation',
      example: 'shell: "shell.web.dashboard", page: "page.dashboard"',
    });
    hints.push({
      category: 'layout',
      priority: 'medium',
      message: 'Consider section.grid-4 for KPI cards at the top of the dashboard',
    });
  }

  // Form layout hints
  if (LAYOUT_KEYWORDS.form.some(kw => lowerDesc.includes(kw))) {
    hints.push({
      category: 'layout',
      priority: 'high',
      message: 'Use section.container for form content with appropriate max-width',
      example: 'pattern: "section.container"',
    });
    hints.push({
      category: 'best-practice',
      priority: 'medium',
      message: 'Group related form fields together and use clear labels',
    });
  }

  // Auth layout hints
  if (LAYOUT_KEYWORDS.auth.some(kw => lowerDesc.includes(kw))) {
    hints.push({
      category: 'layout',
      priority: 'high',
      message: 'Use shell.web.auth with page.wizard for centered authentication flows',
      example: 'shell: "shell.web.auth", page: "page.wizard"',
    });
    hints.push({
      category: 'layout',
      priority: 'medium',
      message: 'Use section.centered to center the authentication card vertically and horizontally',
    });
  }

  // Table layout hints
  if (LAYOUT_KEYWORDS.table.some(kw => lowerDesc.includes(kw))) {
    hints.push({
      category: 'layout',
      priority: 'high',
      message: 'Use shell.web.app with page.resource for data table views',
      example: 'shell: "shell.web.app", page: "page.resource"',
    });
    hints.push({
      category: 'component',
      priority: 'medium',
      message: 'Include a toolbar section with search and filter controls above the table',
    });
  }

  // Landing page hints
  if (LAYOUT_KEYWORDS.landing.some(kw => lowerDesc.includes(kw))) {
    hints.push({
      category: 'layout',
      priority: 'high',
      message: 'Use shell.web.marketing with page.detail for full-width marketing layouts',
      example: 'shell: "shell.web.marketing", page: "page.detail"',
    });
  }

  return hints;
}

/**
 * Generate component hints based on description
 */
function generateComponentHints(description: string): GenerationHint[] {
  const hints: GenerationHint[] = [];
  const lowerDesc = description.toLowerCase();
  const detectedComponents: string[] = [];

  // Detect components from description
  for (const [component, keywords] of Object.entries(COMPONENT_KEYWORDS)) {
    if (keywords.some(kw => lowerDesc.includes(kw))) {
      detectedComponents.push(component);
    }
  }

  // Add hints for detected components
  if (detectedComponents.includes('Card')) {
    hints.push({
      category: 'component',
      priority: 'medium',
      message:
        'Use Card with variant="elevated" for prominent content or variant="outline" for subtle containers',
      example: '{ type: "Card", props: { variant: "elevated" } }',
    });
  }

  if (detectedComponents.includes('Table')) {
    hints.push({
      category: 'component',
      priority: 'high',
      message:
        'Define table columns with key, header, and sortable properties for interactive tables',
      example: 'columns: [{ key: "name", header: "Name", sortable: true }]',
    });
    hints.push({
      category: 'accessibility',
      priority: 'high',
      message: 'Ensure tables have proper column headers for screen reader accessibility',
    });
  }

  if (detectedComponents.includes('Form')) {
    hints.push({
      category: 'component',
      priority: 'high',
      message: 'Use Input components with proper label and type props for form fields',
      example: '{ type: "Input", props: { type: "email", label: "Email", required: true } }',
    });
    hints.push({
      category: 'accessibility',
      priority: 'high',
      message: 'All form inputs must have associated labels for accessibility',
    });
  }

  if (detectedComponents.includes('Avatar')) {
    hints.push({
      category: 'component',
      priority: 'medium',
      message: 'Always provide alt text for Avatar components',
      example: '{ type: "Avatar", props: { src: "...", alt: "User Name", size: "lg" } }',
    });
  }

  if (detectedComponents.includes('Button')) {
    hints.push({
      category: 'component',
      priority: 'medium',
      message:
        'Use variant="primary" for main actions and variant="secondary" or variant="outline" for secondary actions',
    });
  }

  if (detectedComponents.includes('Modal')) {
    hints.push({
      category: 'accessibility',
      priority: 'high',
      message: 'Modals should trap focus and be dismissible with Escape key',
    });
  }

  return hints;
}

/**
 * Generate styling hints based on theme
 */
function generateStylingHints(themeId?: string): GenerationHint[] {
  const hints: GenerationHint[] = [];

  hints.push({
    category: 'styling',
    priority: 'medium',
    message: 'Use theme recipes for consistent component styling instead of custom classes',
    example: 'Recipe classes are automatically applied based on component variant props',
  });

  if (themeId) {
    hints.push({
      category: 'styling',
      priority: 'low',
      message: `Theme "${themeId}" is selected - component variants will use this theme's recipe classes`,
    });
  } else {
    hints.push({
      category: 'styling',
      priority: 'medium',
      message: 'Consider specifying a themeId to enable automatic recipe class application',
    });
  }

  return hints;
}

/**
 * Generate accessibility hints
 */
function generateAccessibilityHints(description: string): GenerationHint[] {
  const hints: GenerationHint[] = [];
  const lowerDesc = description.toLowerCase();

  // Always include basic accessibility hints
  hints.push({
    category: 'accessibility',
    priority: 'high',
    message:
      'Use semantic HTML elements (Heading for titles, List for lists) for proper document structure',
  });

  // Add context-specific accessibility hints
  if (lowerDesc.includes('image') || lowerDesc.includes('photo') || lowerDesc.includes('avatar')) {
    hints.push({
      category: 'accessibility',
      priority: 'high',
      message: 'All images must have descriptive alt text',
      example: 'props: { alt: "Description of the image content" }',
    });
  }

  if (lowerDesc.includes('form') || lowerDesc.includes('input')) {
    hints.push({
      category: 'accessibility',
      priority: 'high',
      message: 'Form inputs should have clear error messages and validation feedback',
    });
  }

  if (lowerDesc.includes('button') || lowerDesc.includes('click')) {
    hints.push({
      category: 'accessibility',
      priority: 'medium',
      message: 'Interactive elements should have clear focus states and be keyboard accessible',
    });
  }

  return hints;
}

/**
 * Generate best practice hints
 */
function generateBestPracticeHints(description: string): GenerationHint[] {
  const hints: GenerationHint[] = [];
  const lowerDesc = description.toLowerCase();

  hints.push({
    category: 'best-practice',
    priority: 'medium',
    message: 'Use meaningful section IDs that describe the content purpose',
    example: 'id: "user-profile-header" instead of id: "section-1"',
  });

  hints.push({
    category: 'best-practice',
    priority: 'low',
    message:
      'Assign sections to appropriate slots (header, main, sidebar, footer) for proper layout positioning',
  });

  // Add context-specific best practices
  if (lowerDesc.includes('list') || lowerDesc.includes('grid') || lowerDesc.includes('cards')) {
    hints.push({
      category: 'best-practice',
      priority: 'medium',
      message: 'For repeating content, define one component structure as a template pattern',
    });
  }

  if (lowerDesc.includes('navigation') || lowerDesc.includes('menu')) {
    hints.push({
      category: 'best-practice',
      priority: 'medium',
      message: 'Use consistent navigation patterns across related screens',
    });
  }

  return hints;
}

/**
 * Generate all contextual hints based on description and theme
 */
export function generateHints(description: string, themeId?: string): GenerationHint[] {
  const allHints: GenerationHint[] = [
    ...generateLayoutHints(description),
    ...generateComponentHints(description),
    ...generateStylingHints(themeId),
    ...generateAccessibilityHints(description),
    ...generateBestPracticeHints(description),
  ];

  // Sort by priority (high first, then medium, then low)
  const priorityOrder = { high: 0, medium: 1, low: 2 };
  allHints.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);

  // Remove duplicates and limit total hints
  const uniqueHints = allHints.filter(
    (hint, index, self) => index === self.findIndex(h => h.message === hint.message)
  );

  // Return top 10 hints to avoid overwhelming the agent
  return uniqueHints.slice(0, 10);
}

/**
 * Generate hints for a specific category
 */
export function generateCategoryHints(
  description: string,
  category: GenerationHint['category'],
  themeId?: string
): GenerationHint[] {
  const allHints = generateHints(description, themeId);
  return allHints.filter(hint => hint.category === category);
}
