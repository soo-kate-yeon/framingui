/**
 * @framingui/core - Screen Templates Tests
 * [SPEC-UI-002] Validate all 12 P0 templates
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TemplateRegistry } from '../registry.js';
import {
  loginTemplate,
  signupTemplate,
  forgotPasswordTemplate,
  verificationTemplate,
  landingTemplate,
  preferencesTemplate,
  profileTemplate,
  loadingTemplate,
  errorTemplate,
  emptyTemplate,
  confirmationTemplate,
  successTemplate,
  allTemplates,
} from '../index.js';

describe('Screen Templates', () => {
  let registry: TemplateRegistry;

  beforeEach(() => {
    registry = TemplateRegistry.getInstance();
    registry.clear();
  });

  describe('Template Count', () => {
    it('should have exactly 12 templates', () => {
      expect(allTemplates).toHaveLength(12);
    });

    it('should include all auth templates (4)', () => {
      const authTemplates = allTemplates.filter(t => t.category === 'auth');
      expect(authTemplates).toHaveLength(4);
    });

    it('should include all feedback templates (5)', () => {
      const feedbackTemplates = allTemplates.filter(t => t.category === 'feedback');
      expect(feedbackTemplates).toHaveLength(5);
    });
  });

  describe('Auth Templates', () => {
    it('should validate auth.login template', () => {
      expect(loginTemplate.id).toBe('auth.login');
      expect(loginTemplate.category).toBe('auth');
      expect(loginTemplate.requiredComponents).toContain('Button');
      expect(loginTemplate.requiredComponents).toContain('Input');
      expect(loginTemplate.layout.type).toBe('centered');

      const result = registry.validateTemplate(loginTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate auth.signup template', () => {
      expect(signupTemplate.id).toBe('auth.signup');
      expect(signupTemplate.requiredComponents).toContain('Checkbox');

      const result = registry.validateTemplate(signupTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate auth.forgot-password template', () => {
      expect(forgotPasswordTemplate.id).toBe('auth.forgot-password');
      expect(forgotPasswordTemplate.layout.type).toBe('centered');

      const result = registry.validateTemplate(forgotPasswordTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate auth.verification template', () => {
      expect(verificationTemplate.id).toBe('auth.verification');
      expect(verificationTemplate.requiredComponents).toContain('Badge');

      const result = registry.validateTemplate(verificationTemplate);
      expect(result.valid).toBe(true);
    });
  });

  describe('Core Templates', () => {
    it('should validate home.landing template', () => {
      expect(landingTemplate.id).toBe('home.landing');
      expect(landingTemplate.category).toBe('content');
      expect(landingTemplate.layout.type).toBe('sidebar');

      const result = registry.validateTemplate(landingTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate settings.preferences template', () => {
      expect(preferencesTemplate.id).toBe('settings.preferences');
      expect(preferencesTemplate.requiredComponents).toContain('Switch');
      expect(preferencesTemplate.requiredComponents).toContain('Select');

      const result = registry.validateTemplate(preferencesTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate account.profile template', () => {
      expect(profileTemplate.id).toBe('account.profile');
      expect(profileTemplate.requiredComponents).toContain('Avatar');

      const result = registry.validateTemplate(profileTemplate);
      expect(result.valid).toBe(true);
    });
  });

  describe('Feedback Templates', () => {
    it('should validate feedback.loading template', () => {
      expect(loadingTemplate.id).toBe('feedback.loading');
      expect(loadingTemplate.category).toBe('feedback');
      expect(loadingTemplate.requiredComponents).toContain('Skeleton');

      const result = registry.validateTemplate(loadingTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate feedback.error template', () => {
      expect(errorTemplate.id).toBe('feedback.error');
      expect(errorTemplate.requiredComponents).toContain('Badge');

      const result = registry.validateTemplate(errorTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate feedback.empty template', () => {
      expect(emptyTemplate.id).toBe('feedback.empty');
      expect(emptyTemplate.layout.type).toBe('centered');

      const result = registry.validateTemplate(emptyTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate feedback.confirmation template', () => {
      expect(confirmationTemplate.id).toBe('feedback.confirmation');
      expect(confirmationTemplate.requiredComponents).toContain('Dialog');

      const result = registry.validateTemplate(confirmationTemplate);
      expect(result.valid).toBe(true);
    });

    it('should validate feedback.success template', () => {
      expect(successTemplate.id).toBe('feedback.success');
      expect(successTemplate.requiredComponents).toContain('Toast');

      const result = registry.validateTemplate(successTemplate);
      expect(result.valid).toBe(true);
    });
  });

  describe('Responsive Layout [TAG-UI002-005]', () => {
    it('should have responsive layouts for all templates', () => {
      allTemplates.forEach(template => {
        expect(template.layout.responsive).toBeDefined();
        expect(template.layout.responsive.desktop).toBeDefined();
        expect(template.layout.responsive.tablet).toBeDefined();
        expect(template.layout.responsive.mobile).toBeDefined();
      });
    });

    it('should use layout tokens (not hardcoded values)', () => {
      allTemplates.forEach(template => {
        const { desktop, tablet, mobile } = template.layout.responsive;

        // Check that padding/gap use token references
        if (desktop.padding) {
          expect(desktop.padding).toMatch(/^atomic\./);
        }
        if (tablet.padding) {
          expect(tablet.padding).toMatch(/^atomic\./);
        }
        if (mobile.padding) {
          expect(mobile.padding).toMatch(/^atomic\./);
        }
      });
    });
  });

  describe('AI Customization [TAG-UI002-003]', () => {
    it('should define customizable areas for all templates', () => {
      allTemplates.forEach(template => {
        expect(template.customizable).toBeDefined();
        expect(template.customizable.texts).toBeDefined();
        expect(template.customizable.optional).toBeDefined();
        expect(template.customizable.slots).toBeDefined();
      });
    });

    it('should have at least one customizable text', () => {
      allTemplates.forEach(template => {
        expect(template.customizable.texts.length).toBeGreaterThan(0);
      });
    });
  });

  describe('Required Components [TAG-UI002-004]', () => {
    it('should specify required components for all templates', () => {
      allTemplates.forEach(template => {
        expect(template.requiredComponents).toBeDefined();
        expect(template.requiredComponents.length).toBeGreaterThan(0);
      });
    });

    it('should have Button component in most templates', () => {
      const templatesWithButton = allTemplates.filter(t => t.requiredComponents.includes('Button'));
      expect(templatesWithButton.length).toBeGreaterThan(8);
    });
  });

  describe('Template Registration', () => {
    it('should register all templates without errors', () => {
      expect(() => {
        allTemplates.forEach(template => registry.register(template));
      }).not.toThrow();

      expect(registry.count()).toBe(12);
    });

    it('should retrieve all templates by category', () => {
      allTemplates.forEach(template => registry.register(template));

      const authTemplates = registry.getByCategory('auth');
      expect(authTemplates).toHaveLength(4);

      const feedbackTemplates = registry.getByCategory('feedback');
      expect(feedbackTemplates).toHaveLength(5);
    });
  });
});
