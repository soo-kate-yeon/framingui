/**
 * Preview Screen Template Tool Tests
 * SPEC-MCP-003: AC-004 Preview Screen Template
 * [TAG-MCP003-009] Preview template with detailed structure
 * [TAG-MCP003-013] Template not found error handling
 */

import { describe, it, expect, vi } from 'vitest';
import { previewScreenTemplateTool } from '../../src/tools/preview-screen-template.js';

// Mock @tekton/ui templateRegistry
vi.mock('@tekton/ui', () => ({
  templateRegistry: {
    get: vi.fn((id: string) => {
      const templates: Record<string, any> = {
        'auth.login': {
          id: 'auth.login',
          name: 'Login',
          category: 'auth',
          description: 'Login screen with authentication',
          version: '1.0.0',
          skeleton: {
            shell: 'centered-card',
            page: 'auth-page',
            sections: [
              { id: 'header', name: 'Header', slot: 'header', required: true },
              { id: 'form', name: 'Form', slot: 'content', required: true },
              { id: 'footer', name: 'Footer', slot: 'footer', required: false },
            ],
          },
          layout: {
            type: 'centered',
            responsive: {
              mobile: { padding: '1rem', gap: '1rem', columns: 1 },
              tablet: { padding: '2rem', gap: '1.5rem', columns: 1 },
              desktop: { padding: '3rem', gap: '2rem', columns: 1 },
            },
          },
          customizable: {
            texts: ['title', 'subtitle', 'button_label'],
            optional: ['social_login', 'remember_me'],
            slots: ['logo', 'forgotPassword', 'socialLogin', 'footer'],
          },
          requiredComponents: ['Button', 'Input', 'Form', 'Card', 'Label'],
          exampleProps: {
            texts: { title: 'Welcome Back', subtitle: 'Sign in to your account' },
            options: { social_login: true, remember_me: true },
            slots: ['logo', 'footer'],
          },
          created: '2024-01-01T00:00:00Z',
          updated: '2024-01-01T00:00:00Z',
          tags: ['auth', 'login'],
        },
        'feedback.loading': {
          id: 'feedback.loading',
          name: 'Loading',
          category: 'feedback',
          description: 'Loading state screen',
          version: '1.0.0',
          skeleton: {
            shell: 'centered-card',
            page: 'feedback-page',
            sections: [{ id: 'content', name: 'Content', slot: 'content', required: true }],
          },
          layout: {
            type: 'centered',
            responsive: {
              mobile: { padding: '1rem', gap: '1rem', columns: 1 },
              tablet: { padding: '2rem', gap: '1.5rem', columns: 1 },
              desktop: { padding: '3rem', gap: '2rem', columns: 1 },
            },
          },
          customizable: {
            texts: ['message'],
            optional: [],
            slots: ['icon'],
          },
          requiredComponents: ['Skeleton', 'Card'],
          created: '2024-01-01T00:00:00Z',
          updated: '2024-01-01T00:00:00Z',
          tags: ['feedback', 'loading'],
        },
        'dashboard.overview': {
          id: 'dashboard.overview',
          name: 'Dashboard Overview',
          category: 'dashboard',
          description: 'Main dashboard overview',
          version: '1.0.0',
          skeleton: {
            shell: 'sidebar-layout',
            page: 'dashboard-page',
            sections: [
              { id: 'sidebar', name: 'Sidebar', slot: 'sidebar', required: true },
              { id: 'main', name: 'Main Content', slot: 'content', required: true },
            ],
          },
          layout: {
            type: 'sidebar',
            responsive: {
              mobile: { padding: '1rem', gap: '1rem', columns: 1 },
              tablet: { padding: '2rem', gap: '1.5rem', columns: 2 },
              desktop: { padding: '3rem', gap: '2rem', columns: 3 },
            },
          },
          customizable: {
            texts: ['welcome_message'],
            optional: ['sidebar_toggle'],
            slots: ['header', 'footer'],
          },
          requiredComponents: ['Card', 'Table', 'Button', 'Sidebar'],
          created: '2024-01-01T00:00:00Z',
          updated: '2024-01-01T00:00:00Z',
          tags: ['dashboard', 'overview'],
        },
      };
      return templates[id] || null;
    }),
    getAll: vi.fn(() => [
      { id: 'auth.login' },
      { id: 'auth.signup' },
      { id: 'feedback.loading' },
      { id: 'dashboard.overview' },
    ]),
  },
}));

describe('previewScreenTemplateTool', () => {
  // ========================================
  // Positive Cases: Normal Operation
  // ========================================
  describe('Positive Cases', () => {
    it('should return valid template details for "auth.login"', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template).toBeDefined();
      expect(result.template?.id).toBe('auth.login');
      expect(result.template?.name).toBe('Login');
      expect(result.template?.category).toBe('auth');
    });

    it('should return skeleton structure with shell, page, and sections', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.skeleton).toBeDefined();
      expect(result.template?.skeleton.shell).toBeDefined();
      expect(result.template?.skeleton.page).toBeDefined();
      expect(result.template?.skeleton.sections).toBeDefined();
      expect(Array.isArray(result.template?.skeleton.sections)).toBe(true);

      // Verify section structure
      result.template?.skeleton.sections.forEach(section => {
        expect(section.id).toBeDefined();
        expect(section.name).toBeDefined();
        expect(section.slot).toBeDefined();
        expect(typeof section.required).toBe('boolean');
      });
    });

    it('should return customization boundaries (texts, optional, slots)', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.customizable).toBeDefined();
      expect(result.template?.customizable.texts).toBeDefined();
      expect(result.template?.customizable.optional).toBeDefined();
      expect(result.template?.customizable.slots).toBeDefined();
      expect(Array.isArray(result.template?.customizable.texts)).toBe(true);
      expect(Array.isArray(result.template?.customizable.optional)).toBe(true);
      expect(Array.isArray(result.template?.customizable.slots)).toBe(true);
    });

    it('should return required components list', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.requiredComponents).toBeDefined();
      expect(Array.isArray(result.template?.requiredComponents)).toBe(true);
      expect(result.template?.requiredComponents.length).toBeGreaterThan(0);

      // Login template should include Button, Input, Form, Card, Label
      expect(result.template?.requiredComponents).toContain('Button');
      expect(result.template?.requiredComponents).toContain('Input');
    });

    it('should return import statement', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.importStatement).toBeDefined();
      expect(result.template?.importStatement).toContain('@tekton/ui');
      expect(result.template?.importStatement).toContain('Template');
    });

    it('should include responsive layout tokens when includeLayoutTokens=true', async () => {
      // Arrange
      const input = { templateId: 'auth.login', includeLayoutTokens: true };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.layout.responsive).toBeDefined();
      expect(result.template?.layout.responsive?.mobile).toBeDefined();
      expect(result.template?.layout.responsive?.tablet).toBeDefined();
      expect(result.template?.layout.responsive?.desktop).toBeDefined();

      // Verify responsive config structure
      ['mobile', 'tablet', 'desktop'].forEach(breakpoint => {
        const config =
          result.template?.layout.responsive?.[breakpoint as 'mobile' | 'tablet' | 'desktop'];
        expect(config?.padding).toBeDefined();
        expect(config?.gap).toBeDefined();
        expect(config?.columns).toBeDefined();
      });
    });

    it('should return layout type', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.layout.type).toBeDefined();
      const validLayoutTypes = ['centered', 'sidebar', 'full'];
      expect(validLayoutTypes).toContain(result.template?.layout.type);
    });

    it('should return version and timestamps', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.version).toBeDefined();
      expect(result.template?.created).toBeDefined();
      expect(result.template?.updated).toBeDefined();
    });
  });

  // ========================================
  // Negative Cases: Error Handling
  // ========================================
  describe('Negative Cases', () => {
    it('should return error for non-existent template', async () => {
      // Arrange
      const input = { templateId: 'xyz.nonexistent' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('not found');
      expect(result.error).toContain('xyz.nonexistent');
    });

    it('should return error with available templates list', async () => {
      // Arrange
      const input = { templateId: 'invalid.template' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
      expect(result.error).toContain('Available templates:');
      expect(result.error).toContain('auth.login');
    });

    it('should return error for invalid template ID format', async () => {
      // Arrange
      const input = { templateId: 'invalid-format-without-dot' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  // ========================================
  // Edge Cases: Boundary Conditions
  // ========================================
  describe('Edge Cases', () => {
    it('should not include responsive layout when includeLayoutTokens=false', async () => {
      // Arrange
      const input = { templateId: 'auth.login', includeLayoutTokens: false };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.layout.responsive).toBeUndefined();
    });

    it('should handle template with example props', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      if (result.template?.exampleProps) {
        expect(result.template.exampleProps.texts).toBeDefined();
        expect(result.template.exampleProps.options).toBeDefined();
      }
    });

    it('should verify customizable texts include common fields', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.customizable.texts).toBeDefined();

      // Login should have title, subtitle, button_label
      const texts = result.template?.customizable.texts || [];
      expect(texts).toContain('title');
      expect(texts).toContain('subtitle');
      expect(texts).toContain('button_label');
    });

    it('should verify customizable slots include common slots', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.customizable.slots).toBeDefined();

      // Login should have logo, footer, socialLogin slots
      const slots = result.template?.customizable.slots || [];
      expect(slots.length).toBeGreaterThan(0);
    });

    it('should handle different template categories', async () => {
      // Arrange
      const templates = [
        { id: 'feedback.loading', expectedCategory: 'feedback' },
        { id: 'dashboard.overview', expectedCategory: 'dashboard' },
      ];

      for (const template of templates) {
        // Act
        const result = await previewScreenTemplateTool({ templateId: template.id });

        // Assert
        expect(result.success).toBe(true);
        expect(result.template?.category).toBe(template.expectedCategory);
      }
    });

    it('should verify skeleton sections have required field', async () => {
      // Arrange
      const input = { templateId: 'auth.login' };

      // Act
      const result = await previewScreenTemplateTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.template?.skeleton.sections).toBeDefined();

      // At least one section should be required
      const hasRequiredSection = result.template?.skeleton.sections.some(s => s.required);
      expect(hasRequiredSection).toBe(true);
    });
  });
});
