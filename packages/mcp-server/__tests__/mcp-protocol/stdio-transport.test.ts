/**
 * stdio Transport Communication Tests
 * SPEC-MCP-002: Phase 4 - MCP Protocol Tests
 *
 * Tests stdio transport communication:
 * - Spawn server process and send JSON-RPC via stdin
 * - Read JSON-RPC from stdout
 * - Verify tools/list works
 * - Verify tools/call returns auth error without credentials
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { spawn, ChildProcess } from 'child_process';
import { resolve } from 'path';

describe('stdio transport', () => {
  let serverPath: string;

  beforeAll(async () => {
    // Path to the built server
    serverPath = resolve(process.cwd(), 'dist/index.js');
  });

  /**
   * Helper function to spawn server and send/receive JSON-RPC messages
   */
  async function sendRequest(request: object): Promise<any> {
    return new Promise((resolve, reject) => {
      const server: ChildProcess = spawn('node', [serverPath]);

      let stdoutData = '';
      let _stderrData = '';

      const timeout = setTimeout(() => {
        server.kill();
        reject(new Error('Request timeout'));
      }, 5000);

      server.stdout?.on('data', data => {
        stdoutData += data.toString();

        // Try to parse complete JSON-RPC response
        try {
          const lines = stdoutData.split('\n').filter(line => line.trim());
          for (const line of lines) {
            const response = JSON.parse(line);
            clearTimeout(timeout);
            server.kill();
            resolve(response);
          }
        } catch (_e) {
          // Continue accumulating data
        }
      });

      server.stderr?.on('data', data => {
        _stderrData += data.toString();
      });

      server.on('error', error => {
        clearTimeout(timeout);
        reject(error);
      });

      // Send request via stdin
      server.stdin?.write(JSON.stringify(request) + '\n');
      server.stdin?.end();
    });
  }

  it('should handle tools/list request', async () => {
    const request = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {},
    };

    const response = await sendRequest(request);

    // Verify JSON-RPC 2.0 format
    expect(response).toHaveProperty('jsonrpc', '2.0');
    expect(response).toHaveProperty('id', 1);
    expect(response).toHaveProperty('result');

    // Verify tools list
    expect(response.result).toHaveProperty('tools');
    expect(Array.isArray(response.result.tools)).toBe(true);
    // MCP server now has more tools - check for at least the core 3
    expect(response.result.tools.length).toBeGreaterThanOrEqual(3);

    // Verify core tool names are present
    const toolNames = response.result.tools.map((t: any) => t.name);
    expect(toolNames).toContain('generate-blueprint');
    expect(toolNames).toContain('preview-theme');
    expect(toolNames).toContain('export-screen');
  });

  it('should require authentication for tools/call', async () => {
    // 인증 없이 tools/call 요청 → 인증 에러 반환
    const request = {
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: 'preview-theme',
        arguments: {
          themeId: 'classic-magazine-v1',
        },
      },
    };

    const response = await sendRequest(request);

    // Verify JSON-RPC 2.0 format
    expect(response).toHaveProperty('jsonrpc', '2.0');
    expect(response).toHaveProperty('id', 2);
    expect(response).toHaveProperty('result');

    // Verify auth error
    expect(response.result).toHaveProperty('content');
    const toolResult = JSON.parse(response.result.content[0].text);
    expect(toolResult).toHaveProperty('success', false);
    expect(toolResult).toHaveProperty('error', 'Authentication required.');
    expect(toolResult).toHaveProperty('hint');
    expect(response.result).toHaveProperty('isError', true);
  });

  it('should return auth error for all tool calls without credentials', async () => {
    // 존재하지 않는 도구 호출도 인증 가드에서 먼저 걸림
    const request = {
      jsonrpc: '2.0',
      id: 3,
      method: 'tools/call',
      params: {
        name: 'non-existent-tool',
        arguments: {},
      },
    };

    const response = await sendRequest(request);

    expect(response).toHaveProperty('jsonrpc', '2.0');
    expect(response).toHaveProperty('id', 3);

    const toolResult = JSON.parse(response.result.content[0].text);
    expect(toolResult).toHaveProperty('success', false);
    expect(toolResult).toHaveProperty('error', 'Authentication required.');
  });

  it('should handle tools/call with missing required parameters', async () => {
    const request = {
      jsonrpc: '2.0',
      id: 4,
      method: 'tools/call',
      params: {
        name: 'preview-theme',
        arguments: {},
      },
    };

    const response = await sendRequest(request);

    // Should return error result (auth error since no credentials)
    expect(response).toHaveProperty('jsonrpc', '2.0');
    expect(response).toHaveProperty('id', 4);
    expect(response).toHaveProperty('result');

    const toolResult = JSON.parse(response.result.content[0].text);
    expect(toolResult).toHaveProperty('success', false);
    expect(toolResult).toHaveProperty('error');
  });

  it('should send logs to stderr, not stdout', async () => {
    return new Promise((resolve, reject) => {
      const server: ChildProcess = spawn('node', [serverPath]);

      const stdoutLines: string[] = [];
      const stderrLines: string[] = [];

      const timeout = setTimeout(() => {
        server.kill();

        // Verify stderr contains logs
        expect(stderrLines.length).toBeGreaterThan(0);
        expect(stderrLines.some(line => line.includes('[INFO]'))).toBe(true);

        // Verify stdout only contains valid JSON-RPC (no log lines)
        for (const line of stdoutLines) {
          if (line.trim()) {
            const parsed = JSON.parse(line);
            expect(parsed).toHaveProperty('jsonrpc');
          }
        }

        resolve(undefined);
      }, 3000);

      server.stdout?.on('data', data => {
        const lines = data
          .toString()
          .split('\n')
          .filter((l: string) => l.trim());
        stdoutLines.push(...lines);
      });

      server.stderr?.on('data', data => {
        const lines = data
          .toString()
          .split('\n')
          .filter((l: string) => l.trim());
        stderrLines.push(...lines);
      });

      server.on('error', error => {
        clearTimeout(timeout);
        reject(error);
      });

      // Send a request to trigger logs
      const request = {
        jsonrpc: '2.0',
        id: 1,
        method: 'tools/list',
        params: {},
      };

      server.stdin?.write(JSON.stringify(request) + '\n');
      server.stdin?.end();
    });
  }, 10000);
});
