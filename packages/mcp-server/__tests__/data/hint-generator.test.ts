/**
 * Tests for hint-generator Module
 * SPEC-MCP-004 Phase 3.5
 */

import { describe, it, expect } from 'vitest';
import { generateHints, generateCategoryHints } from '../../src/data/hint-generator.js';

describe('hint-generator', () => {
  describe('generateHints', () => {
    it('should generate layout hints for dashboard descriptions', () => {
      const hints = generateHints('Admin dashboard with analytics');

      expect(hints.length).toBeGreaterThan(0);

      const layoutHints = hints.filter(h => h.category === 'layout');
      expect(layoutHints.length).toBeGreaterThan(0);

      const dashboardHint = layoutHints.find(
        h => h.message.includes('dashboard') || h.example?.includes('dashboard')
      );
      expect(dashboardHint).toBeDefined();
    });

    it('should generate layout hints for auth descriptions', () => {
      const hints = generateHints('User login page with authentication');

      const layoutHints = hints.filter(h => h.category === 'layout');
      const authHint = layoutHints.find(
        h => h.message.includes('auth') || h.example?.includes('auth')
      );
      expect(authHint).toBeDefined();
    });

    it('should generate component hints when specific components detected', () => {
      const hints = generateHints('Page with data table and cards');

      const componentHints = hints.filter(h => h.category === 'component');
      expect(componentHints.length).toBeGreaterThan(0);
    });

    it('should generate accessibility hints for forms', () => {
      const hints = generateHints('Contact form with input fields');

      const accessibilityHints = hints.filter(h => h.category === 'accessibility');
      expect(accessibilityHints.length).toBeGreaterThan(0);

      const formAccessibilityHint = accessibilityHints.find(
        h =>
          h.message.toLowerCase().includes('form') ||
          h.message.toLowerCase().includes('input') ||
          h.message.toLowerCase().includes('label')
      );
      expect(formAccessibilityHint).toBeDefined();
    });

    it('should generate accessibility hints for images', () => {
      const hints = generateHints('Gallery page with images and photos');

      const accessibilityHints = hints.filter(h => h.category === 'accessibility');
      const imageAccessibilityHint = accessibilityHints.find(h =>
        h.message.toLowerCase().includes('alt')
      );
      expect(imageAccessibilityHint).toBeDefined();
    });

    it('should generate best practice hints', () => {
      const hints = generateHints('Any screen description');

      const bestPracticeHints = hints.filter(h => h.category === 'best-practice');
      expect(bestPracticeHints.length).toBeGreaterThan(0);
    });

    it('should include styling hints', () => {
      const hints = generateHints('Dashboard screen');

      const stylingHints = hints.filter(h => h.category === 'styling');
      expect(stylingHints.length).toBeGreaterThan(0);
    });

    it('should mention theme when themeId provided', () => {
      const hintsWithTheme = generateHints('Dashboard', 'my-theme');

      const themeHint = hintsWithTheme.find(h => h.message.includes('my-theme'));
      expect(themeHint).toBeDefined();
    });

    it('should suggest adding theme when themeId not provided', () => {
      const hintsWithoutTheme = generateHints('Dashboard');

      const suggestThemeHint = hintsWithoutTheme.find(
        h => h.message.includes('themeId') && h.priority === 'medium'
      );
      expect(suggestThemeHint).toBeDefined();
    });

    it('should prioritize high priority hints first', () => {
      const hints = generateHints('Complex dashboard with forms and tables');

      // First hints should be high priority
      if (hints.length >= 2) {
        expect(hints[0]?.priority).toBe('high');
      }
    });

    it('should limit hints to avoid overwhelming', () => {
      const hints = generateHints(
        'Complex dashboard with analytics, forms, tables, cards, avatars, modals, and more'
      );

      expect(hints.length).toBeLessThanOrEqual(10);
    });

    it('should not duplicate hints', () => {
      const hints = generateHints('Dashboard dashboard dashboard');

      const messages = hints.map(h => h.message);
      const uniqueMessages = [...new Set(messages)];
      expect(messages.length).toBe(uniqueMessages.length);
    });
  });

  describe('generateCategoryHints', () => {
    it('should filter hints by layout category', () => {
      const layoutHints = generateCategoryHints('Dashboard page', 'layout');

      layoutHints.forEach(hint => {
        expect(hint.category).toBe('layout');
      });
    });

    it('should filter hints by accessibility category', () => {
      const accessibilityHints = generateCategoryHints(
        'Form with inputs and images',
        'accessibility'
      );

      accessibilityHints.forEach(hint => {
        expect(hint.category).toBe('accessibility');
      });
    });

    it('should filter hints by component category', () => {
      const componentHints = generateCategoryHints(
        'Page with table and card components',
        'component'
      );

      componentHints.forEach(hint => {
        expect(hint.category).toBe('component');
      });
    });

    it('should filter hints by styling category', () => {
      const stylingHints = generateCategoryHints('Dashboard', 'styling');

      stylingHints.forEach(hint => {
        expect(hint.category).toBe('styling');
      });
    });

    it('should filter hints by best-practice category', () => {
      const bestPracticeHints = generateCategoryHints('Any page', 'best-practice');

      bestPracticeHints.forEach(hint => {
        expect(hint.category).toBe('best-practice');
      });
    });
  });

  describe('Hint Content Quality', () => {
    it('should include examples for layout hints', () => {
      const hints = generateHints('Dashboard with sidebar');

      const layoutHintsWithExamples = hints.filter(h => h.category === 'layout' && h.example);
      expect(layoutHintsWithExamples.length).toBeGreaterThan(0);
    });

    it('should include examples for component hints', () => {
      const hints = generateHints('Page with avatar and card');

      const componentHintsWithExamples = hints.filter(h => h.category === 'component' && h.example);
      expect(componentHintsWithExamples.length).toBeGreaterThan(0);
    });

    it('should have actionable messages', () => {
      const hints = generateHints('Form page');

      // At least some hints should have actionable words
      const actionableWords = [
        'use',
        'consider',
        'ensure',
        'add',
        'include',
        'define',
        'assign',
        'group',
        'check',
        'theme',
        'recipe',
      ];
      const hintsWithActionable = hints.filter(hint => {
        return actionableWords.some(word => hint.message.toLowerCase().includes(word));
      });

      // Most hints should be actionable (at least 50%)
      expect(hintsWithActionable.length).toBeGreaterThan(hints.length / 2);

      // All hints should have meaningful length
      hints.forEach(hint => {
        expect(hint.message.length).toBeGreaterThan(10);
      });
    });
  });

  describe('Keyword Detection', () => {
    it('should detect form-related keywords', () => {
      const descriptions = ['registration form', 'contact form page', 'signup with input fields'];

      descriptions.forEach(desc => {
        const hints = generateHints(desc);
        const formHints = hints.filter(
          h => h.message.toLowerCase().includes('form') || h.message.toLowerCase().includes('input')
        );
        expect(formHints.length).toBeGreaterThan(0);
      });
    });

    it('should detect table-related keywords', () => {
      const descriptions = ['data table view', 'list of records', 'grid with data'];

      descriptions.forEach(desc => {
        const hints = generateHints(desc);
        const tableHints = hints.filter(
          h =>
            h.message.toLowerCase().includes('table') ||
            h.message.toLowerCase().includes('resource')
        );
        expect(tableHints.length).toBeGreaterThan(0);
      });
    });

    it('should detect landing page keywords', () => {
      const hints = generateHints('Landing page with hero section');

      const landingHints = hints.filter(
        h => h.message.toLowerCase().includes('marketing') || h.example?.includes('marketing')
      );
      expect(landingHints.length).toBeGreaterThan(0);
    });
  });
});
