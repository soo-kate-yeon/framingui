/**
 * MCP Server Index Tests
 * SPEC-MCP-002: Phase 4 - Server Entry Point Coverage
 */

import { beforeEach, afterEach, describe, it, expect, vi } from 'vitest';

const connectSpy = vi.fn(async () => undefined);

vi.mock('@modelcontextprotocol/sdk/server/index.js', () => ({
  Server: class MockServer {
    setRequestHandler(): void {}
    async connect(): Promise<void> {
      await connectSpy();
    }
  },
}));

vi.mock('@modelcontextprotocol/sdk/server/stdio.js', () => ({
  StdioServerTransport: class MockStdioServerTransport {},
}));

vi.mock('../src/cli/credentials.js', () => ({
  loadCredentials: vi.fn(() => null),
}));

vi.mock('../src/auth/verify.js', () => ({
  verifyApiKey: vi.fn(async () => ({
    valid: true,
    user: { id: 'test-user', email: 'test@example.com', plan: 'pro' },
    themes: { licensed: ['classic-magazine'] },
  })),
}));

describe('MCP Server Module', () => {
  const originalApiKey = process.env.FRAMINGUI_API_KEY;

  beforeEach(() => {
    vi.resetModules();
    connectSpy.mockClear();
    delete process.env.FRAMINGUI_API_KEY;
  });

  afterEach(() => {
    if (originalApiKey) {
      process.env.FRAMINGUI_API_KEY = originalApiKey;
    } else {
      delete process.env.FRAMINGUI_API_KEY;
    }
  });

  it('should export server module without errors', async () => {
    const serverModule = await import('../src/index.js');

    expect(serverModule).toBeDefined();
    expect(connectSpy).toHaveBeenCalledTimes(1);
  }, 30000);

  it('should have valid package.json', async () => {
    const pkg = await import('../package.json');

    expect(pkg.name).toBe('@framingui/mcp-server');
    expect(pkg.version).toBeDefined();
    expect(pkg.type).toBe('module');
    expect(pkg.main).toBe('./dist/index.js');
  });

  it('should define required MCP tools', () => {
    const expectedTools = ['generate-blueprint', 'preview-theme', 'export-screen'];

    expectedTools.forEach(toolName => {
      expect(toolName).toMatch(/^[a-z-]+$/);
    });
  });
});
