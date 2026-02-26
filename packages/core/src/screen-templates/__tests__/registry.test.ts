/**
 * @framingui/core - TemplateRegistry Tests
 * [SPEC-UI-002] [TAG-UI002-004] Template Registry Testing
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { TemplateRegistry } from '../registry.js';
import type { ScreenTemplate } from '../types.js';

// Mock template for testing
const mockTemplate: ScreenTemplate = {
  id: 'test.mock',
  name: 'Mock Template',
  category: 'auth',
  description: 'A mock template for testing',
  skeleton: {
    shell: 'shell.web.app',
    page: 'page.auth',
    sections: [
      {
        id: 'form',
        name: 'Form',
        required: true,
      },
    ],
  },
  customizable: {
    texts: ['title'],
    optional: [],
    slots: [],
  },
  requiredComponents: ['Button', 'Input'],
  layout: {
    type: 'centered',
    maxWidth: 'sm',
    responsive: {
      desktop: {
        padding: 'atomic.spacing.64',
        gap: 'atomic.spacing.32',
        direction: 'column',
      },
      tablet: {
        padding: 'atomic.spacing.32',
        gap: 'atomic.spacing.24',
        direction: 'column',
      },
      mobile: {
        padding: 'atomic.spacing.16',
        gap: 'atomic.spacing.16',
        direction: 'column',
      },
    },
  },
  Component: () => null as any,
};

describe('TemplateRegistry', () => {
  let registry: TemplateRegistry;

  beforeEach(() => {
    registry = TemplateRegistry.getInstance();
    registry.clear();
  });

  describe('Singleton Pattern', () => {
    it('should return the same instance', () => {
      const instance1 = TemplateRegistry.getInstance();
      const instance2 = TemplateRegistry.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Template Registration', () => {
    it('should register a valid template', () => {
      expect(() => registry.register(mockTemplate)).not.toThrow();
      expect(registry.has('test.mock')).toBe(true);
    });

    it('should throw error for invalid template (missing required components)', () => {
      const invalidTemplate = {
        ...mockTemplate,
        requiredComponents: [],
      };
      expect(() => registry.register(invalidTemplate)).toThrow();
    });

    it('should throw error for invalid template (missing sections)', () => {
      const invalidTemplate = {
        ...mockTemplate,
        skeleton: {
          ...mockTemplate.skeleton,
          sections: [],
        },
      };
      expect(() => registry.register(invalidTemplate)).toThrow();
    });

    it('should throw error for invalid template (missing responsive config)', () => {
      const invalidTemplate = {
        ...mockTemplate,
        layout: {
          ...mockTemplate.layout,
          responsive: undefined as any,
        },
      };
      expect(() => registry.register(invalidTemplate)).toThrow();
    });

    it('should register multiple templates', () => {
      const template2 = { ...mockTemplate, id: 'test.mock2' };
      registry.registerAll([mockTemplate, template2]);
      expect(registry.count()).toBe(2);
    });
  });

  describe('Template Retrieval', () => {
    beforeEach(() => {
      registry.register(mockTemplate);
    });

    it('should get template by ID', () => {
      const template = registry.get('test.mock');
      expect(template).toBeDefined();
      expect(template?.id).toBe('test.mock');
    });

    it('should return undefined for non-existent template', () => {
      const template = registry.get('non.existent');
      expect(template).toBeUndefined();
    });

    it('should get all templates', () => {
      const templates = registry.getAll();
      expect(templates).toHaveLength(1);
      expect(templates[0].id).toBe('test.mock');
    });

    it('should get templates by category', () => {
      const authTemplates = registry.getByCategory('auth');
      expect(authTemplates).toHaveLength(1);
      expect(authTemplates[0].category).toBe('auth');
    });

    it('should return empty array for non-existent category', () => {
      const templates = registry.getByCategory('dashboard');
      expect(templates).toHaveLength(0);
    });
  });

  describe('Template Search', () => {
    beforeEach(() => {
      registry.register(mockTemplate);
    });

    it('should find templates by required components', () => {
      const templates = registry.findByRequiredComponents(['Button']);
      expect(templates).toHaveLength(1);
      expect(templates[0].id).toBe('test.mock');
    });

    it('should find templates requiring all specified components', () => {
      const templates = registry.findByRequiredComponents(['Button', 'Input']);
      expect(templates).toHaveLength(1);
    });

    it('should return empty array if components not found', () => {
      const templates = registry.findByRequiredComponents(['NonExistent']);
      expect(templates).toHaveLength(0);
    });
  });

  describe('Template Management', () => {
    beforeEach(() => {
      registry.register(mockTemplate);
    });

    it('should check if template exists', () => {
      expect(registry.has('test.mock')).toBe(true);
      expect(registry.has('non.existent')).toBe(false);
    });

    it('should unregister a template', () => {
      const result = registry.unregister('test.mock');
      expect(result).toBe(true);
      expect(registry.has('test.mock')).toBe(false);
    });

    it('should return false when unregistering non-existent template', () => {
      const result = registry.unregister('non.existent');
      expect(result).toBe(false);
    });

    it('should clear all templates', () => {
      registry.clear();
      expect(registry.count()).toBe(0);
    });

    it('should get template count', () => {
      expect(registry.count()).toBe(1);
      registry.register({ ...mockTemplate, id: 'test.mock2' });
      expect(registry.count()).toBe(2);
    });
  });

  describe('Template Validation', () => {
    it('should validate template with all required fields', () => {
      const result = registry.validateTemplate(mockTemplate);
      expect(result.valid).toBe(true);
      expect(result.errors).toBeUndefined();
    });

    it('should invalidate template without required components', () => {
      const invalidTemplate = {
        ...mockTemplate,
        requiredComponents: [],
      };
      const result = registry.validateTemplate(invalidTemplate);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
      expect(result.errors?.[0].type).toBe('missing_component');
    });

    it('should invalidate template without sections', () => {
      const invalidTemplate = {
        ...mockTemplate,
        skeleton: {
          ...mockTemplate.skeleton,
          sections: [],
        },
      };
      const result = registry.validateTemplate(invalidTemplate);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('should invalidate template without responsive config', () => {
      const invalidTemplate = {
        ...mockTemplate,
        layout: {
          ...mockTemplate.layout,
          responsive: undefined as any,
        },
      };
      const result = registry.validateTemplate(invalidTemplate);
      expect(result.valid).toBe(false);
      expect(result.errors).toBeDefined();
    });
  });

  describe('Template Metadata', () => {
    beforeEach(() => {
      registry.register(mockTemplate);
    });

    it('should get template metadata without Component', () => {
      const metadata = registry.getMetadata('test.mock');
      expect(metadata).toBeDefined();
      expect(metadata?.id).toBe('test.mock');
      expect('Component' in (metadata || {})).toBe(false);
    });

    it('should return undefined for non-existent template metadata', () => {
      const metadata = registry.getMetadata('non.existent');
      expect(metadata).toBeUndefined();
    });

    it('should get IDs by category', () => {
      const ids = registry.getIdsByCategory('auth');
      expect(ids).toHaveLength(1);
      expect(ids[0]).toBe('test.mock');
    });

    it('should export templates to JSON', () => {
      const json = registry.exportToJSON();
      expect(json).toBeDefined();
      const parsed = JSON.parse(json);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe('test.mock');
      expect('Component' in parsed[0]).toBe(false);
    });
  });
});
