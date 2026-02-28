import { describe, expect, it } from 'vitest';
import { resolveAppOrigin } from '@/lib/auth/redirect-origin';

describe('resolveAppOrigin', () => {
  it('uses request origin for localhost development', () => {
    const result = resolveAppOrigin('http://localhost:3001', 'https://framingui.com');
    expect(result.origin).toBe('http://localhost:3001');
    expect(result.source).toBe('request');
  });

  it('prefers configured app origin in non-local environments', () => {
    const result = resolveAppOrigin('https://dev.framingui.com', 'https://framingui.com');
    expect(result.origin).toBe('https://framingui.com');
    expect(result.source).toBe('configured');
  });

  it('migrates legacy tekton-ui.com configured origin', () => {
    const result = resolveAppOrigin('https://framingui.com', 'https://tekton-ui.com');
    expect(result.origin).toBe('https://framingui.com');
    expect(result.reasons.some((r) => r.includes('legacy'))).toBe(true);
  });

  it('falls back to default origin when both origins are invalid', () => {
    const result = resolveAppOrigin('not-a-url', 'also-not-a-url');
    expect(result.origin).toBe('https://framingui.com');
    expect(result.source).toBe('default');
  });
});
