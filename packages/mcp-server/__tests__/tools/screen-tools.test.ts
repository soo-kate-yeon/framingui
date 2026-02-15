/**
 * Tests for SPEC-LAYOUT-002 Phase 4 Screen Tools
 * Tests: validate_screen, list_tokens
 */

import { describe, it, expect } from 'vitest';
import { validateScreenTool } from '../../src/tools/validate-screen.js';
import { listTokensTool } from '../../src/tools/list-tokens.js';

describe('validate_screen Tool', () => {
  it('should validate correct screen definition', async () => {
    const validScreen = {
      id: 'valid-screen',
      name: 'Valid Screen',
      shell: 'shell.web.dashboard',
      page: 'page.dashboard',
      sections: [
        {
          id: 'main',
          pattern: 'section.container',
          components: [
            {
              type: 'Text',
              props: { children: 'Content' },
            },
          ],
        },
      ],
    };

    const result = await validateScreenTool({
      screenDefinition: validScreen,
      strictMode: false,
    });

    expect(result.success).toBe(true);
    expect(result.valid).toBe(true);
    expect(result.errors).toBeUndefined();
  });

  it('should return error details for invalid shell token', async () => {
    const invalidShellScreen = {
      id: 'test',
      name: 'Test',
      shell: 'invalid.token', // Invalid format
      page: 'page.dashboard',
      sections: [],
    };

    const result = await validateScreenTool({
      screenDefinition: invalidShellScreen,
      strictMode: true,
    });

    expect(result.success).toBe(true);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.suggestions).toBeDefined();
  });

  it('should return error details for unknown component type', async () => {
    const unknownComponentScreen = {
      id: 'test',
      name: 'Test',
      shell: 'shell.web.app',
      page: 'page.detail',
      sections: [
        {
          id: 'section1',
          pattern: 'section.container',
          components: [
            {
              type: 'UnknownComponent', // Invalid component type
              props: {},
            },
          ],
        },
      ],
    };

    const result = await validateScreenTool({
      screenDefinition: unknownComponentScreen,
      strictMode: false,
    });

    expect(result.success).toBe(true);
    expect(result.valid).toBe(false);
    expect(result.errors).toBeDefined();
    expect(result.suggestions).toBeDefined();

    // Check that suggestion mentions component catalog
    const componentSuggestion = result.suggestions?.find(s =>
      s.message.toLowerCase().includes('component')
    );
    expect(componentSuggestion).toBeDefined();
  });

  it('should provide helpful suggestions for validation errors', async () => {
    const invalidScreen = {
      id: 'test',
      shell: 'wrong-format',
      page: 'also-wrong',
      sections: [],
    };

    const result = await validateScreenTool({
      screenDefinition: invalidScreen,
      strictMode: false,
    });

    expect(result.success).toBe(true);
    expect(result.suggestions).toBeDefined();
    expect(result.suggestions!.length).toBeGreaterThan(0);
  });
});

describe('list_tokens Tool', () => {
  it('should list all tokens when tokenType is "all"', async () => {
    const result = await listTokensTool({
      tokenType: 'all',
    });

    expect(result.success).toBe(true);
    expect(result.shells).toBeDefined();
    expect(result.pages).toBeDefined();
    expect(result.sections).toBeDefined();
    expect(result.metadata).toBeDefined();
    expect(result.metadata!.total).toBeGreaterThan(0);
  });

  it('should list only shell tokens when tokenType is "shell"', async () => {
    const result = await listTokensTool({
      tokenType: 'shell',
    });

    expect(result.success).toBe(true);
    expect(result.shells).toBeDefined();
    expect(result.pages).toBeUndefined();
    expect(result.sections).toBeUndefined();
  });

  it('should list only page tokens when tokenType is "page"', async () => {
    const result = await listTokensTool({
      tokenType: 'page',
    });

    expect(result.success).toBe(true);
    expect(result.shells).toBeUndefined();
    expect(result.pages).toBeDefined();
    expect(result.sections).toBeUndefined();
  });

  it('should list only section tokens when tokenType is "section"', async () => {
    const result = await listTokensTool({
      tokenType: 'section',
    });

    expect(result.success).toBe(true);
    expect(result.shells).toBeUndefined();
    expect(result.pages).toBeUndefined();
    expect(result.sections).toBeDefined();
  });

  it('should filter tokens by pattern', async () => {
    const result = await listTokensTool({
      tokenType: 'all',
      filter: 'dashboard',
    });

    expect(result.success).toBe(true);
    expect(result.metadata?.filtered).toBeDefined();

    // Check that all returned tokens contain 'dashboard'
    const allTokens = [
      ...(result.shells || []),
      ...(result.pages || []),
      ...(result.sections || []),
    ];

    allTokens.forEach(token => {
      const hasMatch =
        token.id.toLowerCase().includes('dashboard') ||
        token.name?.toLowerCase().includes('dashboard') ||
        token.description?.toLowerCase().includes('dashboard');
      expect(hasMatch).toBe(true);
    });
  });

  it('should return token metadata with correct structure', async () => {
    const result = await listTokensTool({
      tokenType: 'shell',
    });

    expect(result.success).toBe(true);
    expect(result.shells).toBeDefined();

    const firstShell = result.shells![0]!;
    expect(firstShell).toHaveProperty('id');
    expect(firstShell).toHaveProperty('platform');
    expect(typeof firstShell.id).toBe('string');
  });

  // ===== SPEC-LAYOUT-004 Mobile Shell Token Tests =====
  it('should include mobile shell tokens from SPEC-LAYOUT-004', async () => {
    const result = await listTokensTool({
      tokenType: 'shell',
    });

    expect(result.success).toBe(true);
    expect(result.shells).toBeDefined();

    const shellIds = result.shells!.map(s => s.id);

    // Verify web shells (SPEC-LAYOUT-001)
    expect(shellIds).toContain('shell.web.app');
    expect(shellIds).toContain('shell.web.dashboard');

    // Verify mobile shells (SPEC-LAYOUT-004)
    expect(shellIds).toContain('shell.mobile.app');
    expect(shellIds).toContain('shell.mobile.fullscreen');
    expect(shellIds).toContain('shell.mobile.modal');
    expect(shellIds).toContain('shell.mobile.tab');
    expect(shellIds).toContain('shell.mobile.drawer');
    expect(shellIds).toContain('shell.mobile.detail');
  });

  it('should correctly identify mobile shells by platform', async () => {
    const result = await listTokensTool({
      tokenType: 'shell',
    });

    expect(result.success).toBe(true);
    expect(result.shells).toBeDefined();

    const mobileShells = result.shells!.filter(s => s.platform === 'mobile');
    const webShells = result.shells!.filter(s => s.platform === 'web');

    // Should have both web and mobile shells
    expect(webShells.length).toBeGreaterThan(0);
    expect(mobileShells.length).toBeGreaterThan(0);

    // Mobile shells should have mobile platform
    mobileShells.forEach(shell => {
      expect(shell.platform).toBe('mobile');
      expect(shell.id).toMatch(/^shell\.mobile\./);
    });
  });

  it('should filter mobile shells by name pattern', async () => {
    const result = await listTokensTool({
      tokenType: 'shell',
      filter: 'mobile',
    });

    expect(result.success).toBe(true);
    expect(result.shells).toBeDefined();

    // All returned shells should be mobile shells
    result.shells!.forEach(shell => {
      expect(shell.id).toMatch(/mobile/);
    });

    // Should include at least the 6 mobile shells from SPEC-LAYOUT-004
    expect(result.shells!.length).toBeGreaterThanOrEqual(6);
  });
});
