import { describe, expect, it } from 'vitest';
import { addMcpUtmParams } from '../../src/utils/url-utils.js';

describe('addMcpUtmParams', () => {
  it('adds UTM parameters to a URL without query string', () => {
    const result = addMcpUtmParams('https://framingui.com/pricing', 'whoami');
    expect(result).toBe(
      'https://framingui.com/pricing?utm_source=ai&utm_medium=mcp&utm_content=whoami'
    );
  });

  it('adds UTM parameters to a URL with existing query string', () => {
    const result = addMcpUtmParams('https://framingui.com/pricing?ref=test', 'whoami');
    expect(result).toContain('utm_source=ai');
    expect(result).toContain('utm_medium=mcp');
    expect(result).toContain('utm_content=whoami');
    expect(result).toContain('ref=test');
  });

  it('handles different tool names correctly', () => {
    const result = addMcpUtmParams('https://framingui.com', 'preview-theme');
    expect(result).toBe(
      'https://framingui.com/?utm_source=ai&utm_medium=mcp&utm_content=preview-theme'
    );
  });

  it('handles base URL without trailing slash', () => {
    const result = addMcpUtmParams('https://framingui.com', 'list-themes');
    expect(result).toContain('utm_source=ai');
    expect(result).toContain('utm_medium=mcp');
    expect(result).toContain('utm_content=list-themes');
  });

  it('handles base URL with trailing slash', () => {
    const result = addMcpUtmParams('https://framingui.com/', 'generate-screen');
    expect(result).toContain('utm_source=ai');
    expect(result).toContain('utm_medium=mcp');
    expect(result).toContain('utm_content=generate-screen');
  });

  it('handles complex paths', () => {
    const result = addMcpUtmParams('https://framingui.com/docs/getting-started', 'whoami');
    expect(result).toBe(
      'https://framingui.com/docs/getting-started?utm_source=ai&utm_medium=mcp&utm_content=whoami'
    );
  });

  it('handles URL with hash fragment', () => {
    const result = addMcpUtmParams('https://framingui.com/pricing#features', 'whoami');
    expect(result).toContain('utm_source=ai');
    expect(result).toContain('utm_medium=mcp');
    expect(result).toContain('utm_content=whoami');
    expect(result).toContain('#features');
  });

  it('falls back gracefully for invalid URLs', () => {
    const result = addMcpUtmParams('not-a-valid-url', 'whoami');
    expect(result).toContain('utm_source=ai');
    expect(result).toContain('utm_medium=mcp');
    expect(result).toContain('utm_content=whoami');
  });
});
