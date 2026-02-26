/**
 * List Screen Templates Tool Tests
 * SPEC-MCP-003: AC-003 List Screen Templates
 * [TAG-MCP003-008] List all available screen templates
 */

import { describe, it, expect, vi } from 'vitest';
import { listScreenTemplatesTool } from '../../src/tools/list-screen-templates.js';

// Mock @framingui/ui templateRegistry
vi.mock('@framingui/ui', () => ({
  templateRegistry: {
    getAll: vi.fn(() => [
      {
        id: 'auth.login',
        name: 'Login',
        category: 'auth',
        description: 'Login screen with authentication',
        requiredComponents: ['Button', 'Input', 'Form', 'Card', 'Label'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['auth', 'login'],
      },
      {
        id: 'auth.signup',
        name: 'Signup',
        category: 'auth',
        description: 'User registration screen',
        requiredComponents: ['Button', 'Input', 'Form', 'Card'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['auth', 'signup'],
      },
      {
        id: 'auth.forgot-password',
        name: 'Forgot Password',
        category: 'auth',
        description: 'Password recovery screen',
        requiredComponents: ['Button', 'Input', 'Form', 'Card'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['auth', 'password'],
      },
      {
        id: 'auth.verification',
        name: 'Verification',
        category: 'auth',
        description: 'Email verification screen',
        requiredComponents: ['Button', 'Input', 'Card'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['auth', 'verify'],
      },
      {
        id: 'feedback.loading',
        name: 'Loading',
        category: 'feedback',
        description: 'Loading state screen',
        requiredComponents: ['Skeleton', 'Card'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['feedback', 'loading'],
      },
      {
        id: 'feedback.error',
        name: 'Error',
        category: 'feedback',
        description: 'Error state screen',
        requiredComponents: ['Button', 'Card'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['feedback', 'error'],
      },
      {
        id: 'feedback.empty',
        name: 'Empty',
        category: 'feedback',
        description: 'Empty state screen',
        requiredComponents: ['Button', 'Card'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['feedback', 'empty'],
      },
      {
        id: 'feedback.confirmation',
        name: 'Confirmation',
        category: 'feedback',
        description: 'Confirmation dialog screen',
        requiredComponents: ['Button', 'Card', 'Dialog'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['feedback', 'confirmation'],
      },
      {
        id: 'feedback.success',
        name: 'Success',
        category: 'feedback',
        description: 'Success state screen',
        requiredComponents: ['Button', 'Card'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['feedback', 'success'],
      },
      {
        id: 'dashboard.overview',
        name: 'Dashboard Overview',
        category: 'dashboard',
        description: 'Main dashboard overview',
        requiredComponents: ['Card', 'Table', 'Button'],
        layout: { type: 'sidebar' },
        version: '1.0.0',
        tags: ['dashboard', 'overview'],
      },
      {
        id: 'form.contact',
        name: 'Contact Form',
        category: 'form',
        description: 'Contact form screen',
        requiredComponents: ['Button', 'Input', 'Form', 'Textarea'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['form', 'contact'],
      },
      {
        id: 'form.survey',
        name: 'Survey Form',
        category: 'form',
        description: 'Survey collection form',
        requiredComponents: ['Button', 'Input', 'Form', 'RadioGroup'],
        layout: { type: 'centered' },
        version: '1.0.0',
        tags: ['form', 'survey'],
      },
      {
        id: 'marketing.landing',
        name: 'Landing Page',
        category: 'marketing',
        description: 'Marketing landing page',
        requiredComponents: ['Button', 'Card'],
        layout: { type: 'full' },
        version: '1.0.0',
        tags: ['marketing', 'landing'],
      },
    ]),
    getByCategory: vi.fn((category: string) => {
      const allTemplates = [
        {
          id: 'auth.login',
          name: 'Login',
          category: 'auth',
          description: 'Login screen with authentication',
          requiredComponents: ['Button', 'Input', 'Form', 'Card', 'Label'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['auth', 'login'],
        },
        {
          id: 'auth.signup',
          name: 'Signup',
          category: 'auth',
          description: 'User registration screen',
          requiredComponents: ['Button', 'Input', 'Form', 'Card'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['auth', 'signup'],
        },
        {
          id: 'auth.forgot-password',
          name: 'Forgot Password',
          category: 'auth',
          description: 'Password recovery screen',
          requiredComponents: ['Button', 'Input', 'Form', 'Card'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['auth', 'password'],
        },
        {
          id: 'auth.verification',
          name: 'Verification',
          category: 'auth',
          description: 'Email verification screen',
          requiredComponents: ['Button', 'Input', 'Card'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['auth', 'verify'],
        },
        {
          id: 'feedback.loading',
          name: 'Loading',
          category: 'feedback',
          description: 'Loading state screen',
          requiredComponents: ['Skeleton', 'Card'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['feedback', 'loading'],
        },
        {
          id: 'feedback.error',
          name: 'Error',
          category: 'feedback',
          description: 'Error state screen',
          requiredComponents: ['Button', 'Card'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['feedback', 'error'],
        },
        {
          id: 'feedback.empty',
          name: 'Empty',
          category: 'feedback',
          description: 'Empty state screen',
          requiredComponents: ['Button', 'Card'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['feedback', 'empty'],
        },
        {
          id: 'feedback.confirmation',
          name: 'Confirmation',
          category: 'feedback',
          description: 'Confirmation dialog screen',
          requiredComponents: ['Button', 'Card', 'Dialog'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['feedback', 'confirmation'],
        },
        {
          id: 'feedback.success',
          name: 'Success',
          category: 'feedback',
          description: 'Success state screen',
          requiredComponents: ['Button', 'Card'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['feedback', 'success'],
        },
        {
          id: 'dashboard.overview',
          name: 'Dashboard Overview',
          category: 'dashboard',
          description: 'Main dashboard overview',
          requiredComponents: ['Card', 'Table', 'Button'],
          layout: { type: 'sidebar' },
          version: '1.0.0',
          tags: ['dashboard', 'overview'],
        },
        {
          id: 'form.contact',
          name: 'Contact Form',
          category: 'form',
          description: 'Contact form screen',
          requiredComponents: ['Button', 'Input', 'Form', 'Textarea'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['form', 'contact'],
        },
        {
          id: 'form.survey',
          name: 'Survey Form',
          category: 'form',
          description: 'Survey collection form',
          requiredComponents: ['Button', 'Input', 'Form', 'RadioGroup'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['form', 'survey'],
        },
        {
          id: 'marketing.landing',
          name: 'Landing Page',
          category: 'marketing',
          description: 'Marketing landing page',
          requiredComponents: ['Button', 'Card'],
          layout: { type: 'full' },
          version: '1.0.0',
          tags: ['marketing', 'landing'],
        },
      ];
      return allTemplates.filter((t: any) => t.category === category);
    }),
    search: vi.fn((keyword: string) => {
      const allTemplates = [
        {
          id: 'auth.login',
          name: 'Login',
          category: 'auth',
          description: 'Login screen with authentication',
          requiredComponents: ['Button', 'Input', 'Form', 'Card', 'Label'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['auth', 'login'],
        },
        {
          id: 'auth.signup',
          name: 'Signup',
          category: 'auth',
          description: 'User registration screen',
          requiredComponents: ['Button', 'Input', 'Form', 'Card'],
          layout: { type: 'centered' },
          version: '1.0.0',
          tags: ['auth', 'signup'],
        },
      ];
      const lower = keyword.toLowerCase();
      return allTemplates.filter(
        (t: any) =>
          t.id.toLowerCase().includes(lower) ||
          t.name.toLowerCase().includes(lower) ||
          t.description.toLowerCase().includes(lower)
      );
    }),
  },
}));

describe('listScreenTemplatesTool', () => {
  // ========================================
  // Positive Cases: Normal Operation
  // ========================================
  describe('Positive Cases', () => {
    it('should return all 13 templates when category is "all"', async () => {
      // Arrange
      const input = { category: 'all' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.templates?.length).toBeGreaterThanOrEqual(13);
      expect(result.count).toBe(result.templates?.length);
    });

    it('should filter templates by category "auth"', async () => {
      // Arrange
      const input = { category: 'auth' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.templates?.every(t => t.category === 'auth')).toBe(true);
      expect(result.count).toBeGreaterThanOrEqual(4);
    });

    it('should filter templates by category "feedback"', async () => {
      // Arrange
      const input = { category: 'feedback' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.templates?.every(t => t.category === 'feedback')).toBe(true);
      expect(result.count).toBeGreaterThanOrEqual(5);
    });

    it('should filter templates by category "dashboard"', async () => {
      // Arrange
      const input = { category: 'dashboard' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.templates?.every(t => t.category === 'dashboard')).toBe(true);
      expect(result.count).toBeGreaterThanOrEqual(1);
    });

    it('should return category breakdown counts', async () => {
      // Arrange
      const input = { category: 'all' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.categories).toBeDefined();
      expect(result.categories?.auth).toBeGreaterThanOrEqual(4);
      expect(result.categories?.feedback).toBeGreaterThanOrEqual(5);
      expect(result.categories?.dashboard).toBeGreaterThanOrEqual(1);
    });

    it('should search templates by keyword "login"', async () => {
      // Arrange
      const input = { category: 'all' as const, search: 'login' };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.templates?.some(t => t.id === 'auth.login')).toBe(true);
      expect(result.count).toBeGreaterThan(0);
    });

    it('should ensure all templates have required metadata fields', async () => {
      // Arrange
      const input = { category: 'all' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();

      result.templates?.forEach(template => {
        expect(template.id).toBeDefined();
        expect(template.name).toBeDefined();
        expect(template.category).toBeDefined();
        expect(template.description).toBeDefined();
        expect(template.requiredComponentsCount).toBeDefined();
        expect(template.layoutType).toBeDefined();
        expect(template.version).toBeDefined();
      });
    });
  });

  // ========================================
  // Negative Cases: Error Handling
  // ========================================
  describe('Negative Cases', () => {
    it('should return empty results for non-matching search', async () => {
      // Arrange
      const input = { category: 'all' as const, search: 'xyz-nonexistent-template-9999' };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.count).toBe(0);
      expect(result.templates?.length).toBe(0);
    });
  });

  // ========================================
  // Edge Cases: Boundary Conditions
  // ========================================
  describe('Edge Cases', () => {
    it('should handle category filter combined with search', async () => {
      // Arrange
      const input = { category: 'auth' as const, search: 'login' };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.templates?.every(t => t.category === 'auth')).toBe(true);
      expect(result.templates?.some(t => t.id === 'auth.login')).toBe(true);
    });

    it('should handle empty search string', async () => {
      // Arrange
      const input = { category: 'all' as const, search: '' };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.templates?.length).toBeGreaterThanOrEqual(13);
    });

    it('should handle case-insensitive search', async () => {
      // Arrange
      const input = { category: 'all' as const, search: 'LOGIN' };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();
      expect(result.templates?.some(t => t.id === 'auth.login')).toBe(true);
    });

    it('should verify total template count matches expected', async () => {
      // Arrange
      const input = { category: 'all' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.count).toBe(result.templates?.length);

      // Verify category counts sum to total
      const categorySum =
        (result.categories?.auth || 0) +
        (result.categories?.dashboard || 0) +
        (result.categories?.form || 0) +
        (result.categories?.marketing || 0) +
        (result.categories?.feedback || 0);

      expect(categorySum).toBe(result.count);
    });

    it('should verify template IDs follow category.name format', async () => {
      // Arrange
      const input = { category: 'all' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();

      result.templates?.forEach(template => {
        expect(template.id).toMatch(/^[a-z]+\.[a-z-]+$/);
      });
    });

    it('should verify layoutType values are valid', async () => {
      // Arrange
      const input = { category: 'all' as const };

      // Act
      const result = await listScreenTemplatesTool(input);

      // Assert
      expect(result.success).toBe(true);
      expect(result.templates).toBeDefined();

      const validLayoutTypes = ['centered', 'sidebar', 'full'];
      result.templates?.forEach(template => {
        expect(validLayoutTypes).toContain(template.layoutType);
      });
    });
  });
});
