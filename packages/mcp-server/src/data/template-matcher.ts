/**
 * Template Matcher Module
 * SPEC-MCP-004 Phase 3.5: Match user descriptions to screen templates
 *
 * Analyzes user input description and finds matching templates from the registry
 * using keyword-based scoring and semantic matching.
 */

import { templateRegistry } from '@tekton/ui';

/**
 * Template match result with confidence scoring
 */
export interface TemplateMatch {
  templateId: string;
  templateName: string;
  category: string;
  confidence: number; // 0-100
  matchedKeywords: string[];
}

/**
 * Category keywords for better matching
 */
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  auth: ['login', 'signin', 'signup', 'register', 'authentication', 'password', 'forgot', 'reset', 'verify', 'verification', 'email', 'otp', 'two-factor', '2fa', 'sso'],
  dashboard: ['dashboard', 'overview', 'analytics', 'metrics', 'stats', 'statistics', 'chart', 'graph', 'kpi', 'report', 'summary', 'panel', 'admin', 'workspace'],
  form: ['form', 'input', 'settings', 'profile', 'preferences', 'configuration', 'edit', 'update', 'account', 'personal', 'user', 'information'],
  marketing: ['landing', 'hero', 'cta', 'call-to-action', 'pricing', 'feature', 'benefits', 'testimonial', 'showcase', 'promote', 'marketing', 'sales'],
  feedback: ['loading', 'error', 'success', 'empty', 'not-found', '404', '500', 'confirmation', 'message', 'alert', 'notification', 'state'],
};

/**
 * Component-related keywords for additional matching
 */
const COMPONENT_KEYWORDS: Record<string, string[]> = {
  card: ['card', 'box', 'container', 'panel'],
  form: ['form', 'input', 'field', 'textbox', 'textarea'],
  button: ['button', 'cta', 'action', 'submit', 'click'],
  table: ['table', 'list', 'grid', 'data', 'row', 'column'],
  navigation: ['nav', 'menu', 'sidebar', 'header', 'navigation'],
  chart: ['chart', 'graph', 'visualization', 'data-viz'],
};

/**
 * Extract keywords from description
 * Normalizes and tokenizes the input text
 */
function extractKeywords(description: string): string[] {
  const normalized = description
    .toLowerCase()
    .replace(/[^\w\s-]/g, ' ') // Remove special chars except hyphen
    .trim();

  const words = normalized.split(/\s+/);

  // Filter out common stop words
  const stopWords = new Set(['a', 'an', 'the', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'up', 'about', 'into', 'through', 'during', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can']);

  return words.filter(word => word.length > 2 && !stopWords.has(word));
}

/**
 * Calculate confidence score for a template match
 * Based on keyword matching, category relevance, and template metadata
 */
function calculateConfidence(
  template: any,
  descriptionKeywords: string[],
  matchedKeywords: string[]
): number {
  let score = 0;

  // Base score from matched keywords (0-50 points)
  const keywordScore = Math.min(50, (matchedKeywords.length / descriptionKeywords.length) * 50);
  score += keywordScore;

  // Category relevance bonus (0-20 points)
  const categoryKeywords = CATEGORY_KEYWORDS[template.category] || [];
  const categoryMatches = descriptionKeywords.filter(kw =>
    categoryKeywords.some(ck => ck.includes(kw) || kw.includes(ck))
  ).length;
  const categoryScore = Math.min(20, categoryMatches * 5);
  score += categoryScore;

  // Component match bonus (0-20 points)
  const requiredComponents = template.requiredComponents || [];
  const componentMatches = descriptionKeywords.filter(kw =>
    requiredComponents.some((comp: string) =>
      comp.toLowerCase().includes(kw) || kw.includes(comp.toLowerCase())
    ) ||
    Object.entries(COMPONENT_KEYWORDS).some(([comp, keywords]) =>
      keywords.includes(kw) && requiredComponents.includes(comp)
    )
  ).length;
  const componentScore = Math.min(20, componentMatches * 5);
  score += componentScore;

  // Name/description match bonus (0-10 points)
  const templateText = `${template.name} ${template.description}`.toLowerCase();
  const directMatches = descriptionKeywords.filter(kw => templateText.includes(kw)).length;
  const directScore = Math.min(10, directMatches * 2);
  score += directScore;

  return Math.min(100, Math.round(score));
}

/**
 * Match templates based on user description
 * Returns top matching templates sorted by confidence score
 *
 * @param description - User's natural language description of desired screen
 * @param limit - Maximum number of results to return (default: 5)
 * @returns Array of template matches sorted by confidence (highest first)
 */
export function matchTemplates(description: string, limit: number = 5): TemplateMatch[] {
  // Extract keywords from description
  const descriptionKeywords = extractKeywords(description);

  if (descriptionKeywords.length === 0) {
    return [];
  }

  // Get all templates from registry
  const allTemplates = templateRegistry.getAll();

  if (allTemplates.length === 0) {
    return [];
  }

  // Score each template
  const matches: TemplateMatch[] = [];

  for (const template of allTemplates) {
    const matchedKeywords: string[] = [];

    // Check category keywords
    const categoryKeywords = CATEGORY_KEYWORDS[template.category] || [];
    for (const keyword of descriptionKeywords) {
      if (categoryKeywords.some(ck => ck.includes(keyword) || keyword.includes(ck))) {
        matchedKeywords.push(keyword);
      }
    }

    // Check template name and description
    const templateText = `${template.name} ${template.description}`.toLowerCase();
    for (const keyword of descriptionKeywords) {
      if (templateText.includes(keyword) && !matchedKeywords.includes(keyword)) {
        matchedKeywords.push(keyword);
      }
    }

    // Check template tags
    if (template.tags) {
      for (const keyword of descriptionKeywords) {
        if (template.tags.some(tag => tag.toLowerCase().includes(keyword)) && !matchedKeywords.includes(keyword)) {
          matchedKeywords.push(keyword);
        }
      }
    }

    // Only include templates with at least one match
    if (matchedKeywords.length > 0) {
      const confidence = calculateConfidence(template, descriptionKeywords, matchedKeywords);

      matches.push({
        templateId: template.id,
        templateName: template.name,
        category: template.category,
        confidence,
        matchedKeywords,
      });
    }
  }

  // Sort by confidence (descending) and return top results
  return matches
    .sort((a, b) => b.confidence - a.confidence)
    .slice(0, limit);
}
