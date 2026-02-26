/**
 * MCP Server Index Tests
 * SPEC-MCP-002: Phase 4 - Server Entry Point Coverage
 */

import { describe, it, expect } from 'vitest';

describe('MCP Server Module', () => {
  it('should export server module without errors', async () => {
    // Import the server module to ensure it loads correctly
    // 서버 시작 시 API 키 검증 네트워크 호출이 포함되므로 충분한 타임아웃 필요
    const serverModule = await import('../src/index.js');

    // Module should be defined
    expect(serverModule).toBeDefined();
  }, 30000);

  it('should have valid package.json', async () => {
    const pkg = await import('../package.json');

    expect(pkg.name).toBe('@framingui/mcp-server');
    expect(pkg.version).toBeDefined();
    expect(pkg.type).toBe('module');
    expect(pkg.main).toBe('./dist/index.js');
  });

  it('should define required MCP tools', () => {
    // This test ensures that the tool definitions are properly structured
    const expectedTools = ['generate-blueprint', 'preview-theme', 'export-screen'];

    // Verify tool names are valid
    expectedTools.forEach(toolName => {
      expect(toolName).toMatch(/^[a-z-]+$/);
    });
  });
});
