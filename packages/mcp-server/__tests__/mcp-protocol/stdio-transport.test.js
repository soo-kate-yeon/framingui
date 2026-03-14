/**
 * stdio Transport Communication Tests
 * SPEC-MCP-002: Phase 4 - MCP Protocol Tests
 *
 * Tests stdio transport communication:
 * - Spawn server process and send JSON-RPC via stdin
 * - Read JSON-RPC from stdout
 * - Verify tools/list works
 * - Verify tools/call returns auth guard error without whoami
 */
import { describe, it, expect, beforeAll } from 'vitest';
import { spawn } from 'child_process';
import { mkdtempSync } from 'fs';
import { tmpdir } from 'os';
import { resolve as pathResolve } from 'path';
describe('stdio transport', () => {
    let serverPath;
    beforeAll(async () => {
        // Path to the built server
        serverPath = pathResolve(process.cwd(), 'dist/index.js');
    });
    async function terminateServer(server) {
        if (server.exitCode !== null || server.killed) {
            return;
        }
        await new Promise(resolve => {
            let settled = false;
            const finish = () => {
                if (settled) {
                    return;
                }
                settled = true;
                clearTimeout(forceClose);
                resolve();
            };
            const forceClose = setTimeout(() => {
                try {
                    server.kill('SIGKILL');
                }
                catch (_error) {
                    // Ignore follow-up termination errors during test cleanup.
                }
                finish();
            }, 1000);
            server.once('close', finish);
            server.once('exit', finish);
            try {
                server.kill('SIGKILL');
            }
            catch (_error) {
                finish();
            }
        });
    }
    /**
     * Helper function to spawn server and send/receive JSON-RPC messages
     */
    async function sendRequest(request) {
        return new Promise((resolve, reject) => {
            const isolatedHome = mkdtempSync(pathResolve(tmpdir(), 'framingui-mcp-stdio-'));
            const server = spawn('node', [serverPath], {
                env: {
                    ...process.env,
                    HOME: isolatedHome,
                    USERPROFILE: isolatedHome,
                    FRAMINGUI_API_KEY: '',
                },
            });
            let stdoutData = '';
            let _stderrData = '';
            let settled = false;
            const settle = (handler) => {
                if (settled) {
                    return;
                }
                settled = true;
                clearTimeout(timeout);
                void terminateServer(server).finally(handler);
            };
            const timeout = setTimeout(() => {
                settle(() => reject(new Error('Request timeout')));
            }, 5000);
            server.stdout?.on('data', data => {
                stdoutData += data.toString();
                // Try to parse complete JSON-RPC response
                try {
                    const lines = stdoutData.split('\n').filter(line => line.trim());
                    for (const line of lines) {
                        const response = JSON.parse(line);
                        settle(() => resolve(response));
                        return;
                    }
                }
                catch (e) {
                    // Continue accumulating data
                }
            });
            server.stderr?.on('data', data => {
                _stderrData += data.toString();
            });
            server.on('error', error => {
                settle(() => reject(error));
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
        expect(response.result.tools.length).toBeGreaterThanOrEqual(3);
        // Verify tool names
        const toolNames = response.result.tools.map((t) => t.name);
        expect(toolNames).toContain('generate-blueprint');
        expect(toolNames).toContain('preview-theme');
        expect(toolNames).toContain('export-screen');
    });
    it('should reject tools/call without whoami', async () => {
        const request = {
            jsonrpc: '2.0',
            id: 2,
            method: 'tools/call',
            params: {
                name: 'preview-theme',
                arguments: {
                    themeId: 'classic-magazine',
                },
            },
        };
        const response = await sendRequest(request);
        // Verify JSON-RPC 2.0 format
        expect(response).toHaveProperty('jsonrpc', '2.0');
        expect(response).toHaveProperty('id', 2);
        expect(response).toHaveProperty('result');
        // Verify auth guard error
        expect(response.result).toHaveProperty('content');
        expect(Array.isArray(response.result.content)).toBe(true);
        const toolResult = JSON.parse(response.result.content[0].text);
        expect(toolResult).toHaveProperty('success', false);
        expect(toolResult.error).toMatch(/Authentication required\.|Authentication required to use FramingUI MCP tools\.|whoami required\./);
        expect(response.result).toHaveProperty('isError', true);
    });
    it('should return auth guard error for all tool calls without whoami', async () => {
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
        // Verify JSON-RPC 2.0 error format
        expect(response).toHaveProperty('jsonrpc', '2.0');
        expect(response).toHaveProperty('id', 3);
        expect(response).toHaveProperty('result');
        const toolResult = JSON.parse(response.result.content[0].text);
        expect(toolResult).toHaveProperty('success', false);
        expect(toolResult.error).toMatch(/Authentication required\.|Authentication required to use FramingUI MCP tools\.|whoami required\./);
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
        // Should return error result
        expect(response).toHaveProperty('jsonrpc', '2.0');
        expect(response).toHaveProperty('id', 4);
        expect(response).toHaveProperty('result');
        const toolResult = JSON.parse(response.result.content[0].text);
        expect(toolResult).toHaveProperty('success', false);
        expect(toolResult).toHaveProperty('error');
    });
    it('should send logs to stderr, not stdout', async () => {
        return new Promise((resolve, reject) => {
            const isolatedHome = mkdtempSync(pathResolve(tmpdir(), 'framingui-mcp-stdio-'));
            const server = spawn('node', [serverPath], {
                env: {
                    ...process.env,
                    HOME: isolatedHome,
                    USERPROFILE: isolatedHome,
                    FRAMINGUI_API_KEY: '',
                },
            });
            const stdoutLines = [];
            const stderrLines = [];
            let receivedResponse = false;
            let settled = false;
            const settle = (handler) => {
                if (settled) {
                    return;
                }
                settled = true;
                clearTimeout(timeout);
                void terminateServer(server).finally(handler);
            };
            const timeout = setTimeout(() => {
                settle(() => {
                    // Verify stderr contains logs
                    expect(stderrLines.length).toBeGreaterThan(0);
                    expect(stderrLines.some(line => line.includes('[INFO]'))).toBe(true);
                    // Verify stdout only contains JSON-RPC
                    for (const line of stdoutLines) {
                        if (line.trim()) {
                            expect(() => JSON.parse(line)).not.toThrow();
                        }
                    }
                    resolve(undefined);
                });
            }, 3000);
            server.stdout?.on('data', data => {
                const lines = data
                    .toString()
                    .split('\n')
                    .filter((l) => l.trim());
                stdoutLines.push(...lines);
                if (!receivedResponse && lines.length > 0) {
                    receivedResponse = true;
                }
            });
            server.stderr?.on('data', data => {
                const lines = data
                    .toString()
                    .split('\n')
                    .filter((l) => l.trim());
                stderrLines.push(...lines);
            });
            server.on('error', error => {
                settle(() => reject(error));
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
    }, 30000);
});
