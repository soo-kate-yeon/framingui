import { describe, expect, it } from 'vitest';
import { DEFAULT_API_URL, resolveFraminguiApiUrl } from '../../src/utils/api-url.js';

describe('resolveFraminguiApiUrl', () => {
  it('returns default URL when input is missing', () => {
    const result = resolveFraminguiApiUrl(undefined);
    expect(result.apiUrl).toBe(DEFAULT_API_URL);
    expect(result.wasNormalized).toBe(false);
  });

  it('migrates legacy tekton-ui.com host to framingui.com', () => {
    const result = resolveFraminguiApiUrl('https://tekton-ui.com');
    expect(result.apiUrl).toBe(DEFAULT_API_URL);
    expect(result.wasNormalized).toBe(true);
    expect(result.reason).toContain('Legacy API host');
  });

  it('normalizes URL with path/query to origin only', () => {
    const result = resolveFraminguiApiUrl('https://framingui.com/mcp/auth?x=1');
    expect(result.apiUrl).toBe(DEFAULT_API_URL);
    expect(result.wasNormalized).toBe(true);
    expect(result.reason).toContain('normalized');
  });

  it('keeps valid custom origins for local development', () => {
    const result = resolveFraminguiApiUrl('http://localhost:3000');
    expect(result.apiUrl).toBe('http://localhost:3000');
    expect(result.wasNormalized).toBe(false);
  });

  it('falls back to default URL when input is invalid', () => {
    const result = resolveFraminguiApiUrl('not-a-url');
    expect(result.apiUrl).toBe(DEFAULT_API_URL);
    expect(result.wasNormalized).toBe(true);
    expect(result.reason).toContain('Invalid API URL');
  });
});
