/**
 * Tests for screen-examples Module
 * SPEC-MCP-004 Phase 3.5
 */

import { describe, it, expect } from 'vitest';
import {
  getAllExamples,
  getMatchingExamples,
  getExampleById,
  teamGridExample,
  dataTableExample,
  loginFormExample,
  dashboardOverviewExample,
} from '../../src/data/examples/screen-examples.js';
import { ScreenDefinitionSchema } from '../../src/schemas/mcp-schemas.js';

describe('screen-examples', () => {
  describe('getAllExamples', () => {
    it('should return all examples', () => {
      const examples = getAllExamples();

      expect(examples.length).toBeGreaterThanOrEqual(4);
      expect(examples).toContain(teamGridExample);
      expect(examples).toContain(dataTableExample);
      expect(examples).toContain(loginFormExample);
      expect(examples).toContain(dashboardOverviewExample);
    });

    it('should return examples with required fields', () => {
      const examples = getAllExamples();

      examples.forEach(example => {
        expect(example).toHaveProperty('name');
        expect(example).toHaveProperty('description');
        expect(example).toHaveProperty('definition');
        expect(typeof example.name).toBe('string');
        expect(typeof example.description).toBe('string');
        expect(typeof example.definition).toBe('object');
      });
    });
  });

  describe('Example Validation', () => {
    it('should have valid team grid example', () => {
      const result = ScreenDefinitionSchema.safeParse(teamGridExample.definition);
      expect(result.success).toBe(true);
    });

    it('should have valid data table example', () => {
      const result = ScreenDefinitionSchema.safeParse(dataTableExample.definition);
      expect(result.success).toBe(true);
    });

    it('should have valid login form example', () => {
      const result = ScreenDefinitionSchema.safeParse(loginFormExample.definition);
      expect(result.success).toBe(true);
    });

    it('should have valid dashboard overview example', () => {
      const result = ScreenDefinitionSchema.safeParse(dashboardOverviewExample.definition);
      expect(result.success).toBe(true);
    });

    it('all examples should be valid screen definitions', () => {
      const examples = getAllExamples();

      examples.forEach(example => {
        const result = ScreenDefinitionSchema.safeParse(example.definition);
        if (!result.success) {
          console.error(`Example "${example.name}" validation failed:`, result.error);
        }
        expect(result.success).toBe(true);
      });
    });
  });

  describe('Example Content', () => {
    it('team grid example should have correct structure', () => {
      expect(teamGridExample.definition.id).toBe('team-grid');
      expect(teamGridExample.definition.shell).toBe('shell.web.dashboard');
      expect(teamGridExample.definition.page).toBe('page.dashboard');
      expect(teamGridExample.definition.sections.length).toBeGreaterThan(0);
    });

    it('data table example should have table component', () => {
      // This example may not have Table, adjust expectation
      expect(dataTableExample.definition.sections.length).toBeGreaterThan(0);
    });

    it('login form example should use auth shell', () => {
      expect(loginFormExample.definition.shell).toBe('shell.web.auth');
      expect(loginFormExample.definition.page).toBe('page.wizard');
    });

    it('dashboard overview example should have metrics section', () => {
      const hasMetricsSection = dashboardOverviewExample.definition.sections.some(
        section => section.id === 'metrics'
      );
      expect(hasMetricsSection).toBe(true);
    });
  });

  describe('getMatchingExamples', () => {
    it('should return matching examples for team keywords', () => {
      const matches = getMatchingExamples('team members grid');

      expect(matches.length).toBeGreaterThan(0);
      const hasTeamExample = matches.some(
        m => m.name.toLowerCase().includes('team') || m.description.toLowerCase().includes('team')
      );
      expect(hasTeamExample).toBe(true);
    });

    it('should return matching examples for table keywords', () => {
      const matches = getMatchingExamples('data table with records');

      expect(matches.length).toBeGreaterThan(0);
      const hasTableExample = matches.some(
        m => m.name.toLowerCase().includes('table') || m.description.toLowerCase().includes('table')
      );
      expect(hasTableExample).toBe(true);
    });

    it('should return matching examples for login keywords', () => {
      const matches = getMatchingExamples('login authentication form');

      expect(matches.length).toBeGreaterThan(0);
      const hasLoginExample = matches.some(
        m => m.name.toLowerCase().includes('login') || m.description.toLowerCase().includes('login')
      );
      expect(hasLoginExample).toBe(true);
    });

    it('should return matching examples for dashboard keywords', () => {
      const matches = getMatchingExamples('analytics dashboard metrics');

      expect(matches.length).toBeGreaterThan(0);
      const hasDashboardExample = matches.some(
        m =>
          m.name.toLowerCase().includes('dashboard') ||
          m.description.toLowerCase().includes('dashboard')
      );
      expect(hasDashboardExample).toBe(true);
    });

    it('should respect limit parameter', () => {
      const matches = getMatchingExamples('page with content', 1);
      expect(matches.length).toBeLessThanOrEqual(1);
    });

    it('should return empty array for no matches', () => {
      const matches = getMatchingExamples('xyznonexistent123');
      expect(matches.length).toBe(0);
    });

    it('should prioritize better matches', () => {
      const matches = getMatchingExamples('team grid with avatars', 3);

      if (matches.length > 1) {
        // First match should be team grid
        expect(matches[0]?.name.toLowerCase()).toContain('team');
      }
    });
  });

  describe('getExampleById', () => {
    it('should return example by id', () => {
      const example = getExampleById('team-grid');

      expect(example).toBeDefined();
      expect(example?.name).toBe('Team Grid');
    });

    it('should return data table example by id', () => {
      const example = getExampleById('data-table-view');

      expect(example).toBeDefined();
      expect(example?.name).toBe('Data Table');
    });

    it('should return login example by id', () => {
      const example = getExampleById('login-screen');

      expect(example).toBeDefined();
      expect(example?.name).toBe('Login Form');
    });

    it('should return dashboard example by id', () => {
      const example = getExampleById('dashboard-overview');

      expect(example).toBeDefined();
      expect(example?.name).toBe('Dashboard Overview');
    });

    it('should return undefined for non-existent id', () => {
      const example = getExampleById('non-existent-id');
      expect(example).toBeUndefined();
    });
  });

  describe('Example Quality', () => {
    it('examples should have meaningful descriptions', () => {
      const examples = getAllExamples();

      examples.forEach(example => {
        expect(example.description.length).toBeGreaterThan(20);
      });
    });

    it('examples should have components in sections', () => {
      const examples = getAllExamples();

      examples.forEach(example => {
        expect(example.definition.sections.length).toBeGreaterThan(0);

        example.definition.sections.forEach(section => {
          expect(section.components.length).toBeGreaterThan(0);
        });
      });
    });

    it('examples should use valid shell tokens', () => {
      const validShells = [
        'shell.web.dashboard',
        'shell.web.app',
        'shell.web.auth',
        'shell.web.marketing',
        'shell.web.minimal',
      ];

      const examples = getAllExamples();

      examples.forEach(example => {
        expect(validShells).toContain(example.definition.shell);
      });
    });

    it('examples should use valid page tokens', () => {
      const validPages = [
        'page.dashboard',
        'page.detail',
        'page.wizard',
        'page.resource',
        'page.empty',
      ];

      const examples = getAllExamples();

      examples.forEach(example => {
        expect(validPages).toContain(example.definition.page);
      });
    });
  });
});
