import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const mockCompare = vi.fn();
const mockRateLimitMcpVerify = vi.fn();
const mockCreateRateLimitErrorResponse = vi.fn();
const mockCreateRateLimitHeaders = vi.fn();
const mockGetUserById = vi.fn();
const mockFrom = vi.fn();

vi.mock('bcryptjs', () => ({
  compare: mockCompare,
}));

vi.mock('@framingui/core', () => ({
  listThemes: vi.fn(() => [{ id: 'pebble' }, { id: 'square-minimalism' }]),
}));

vi.mock('@/lib/security/rate-limit', () => ({
  rateLimitMcpVerify: mockRateLimitMcpVerify,
  createRateLimitErrorResponse: mockCreateRateLimitErrorResponse,
  createRateLimitHeaders: mockCreateRateLimitHeaders,
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
    auth: {
      admin: {
        getUserById: mockGetUserById,
      },
    },
  })),
}));

describe('GET /api/mcp/verify canonicalization', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role';

    mockRateLimitMcpVerify.mockResolvedValue({
      success: true,
      limit: 60,
      remaining: 59,
      reset: Date.now() + 60_000,
    });
    mockCreateRateLimitHeaders.mockReturnValue({});
    mockCompare.mockResolvedValue(true);
    mockGetUserById.mockResolvedValue({
      data: {
        user: {
          id: 'user-1',
          email: 'user@example.com',
        },
      },
      error: null,
    });

    mockFrom.mockImplementation((table: string) => {
      if (table === 'api_keys') {
        return {
          select: () => ({
            is: () => ({
              returns: () =>
                Promise.resolve({
                  data: [
                    {
                      id: 'key-1',
                      user_id: 'user-1',
                      key_hash: 'hashed',
                      revoked_at: null,
                      expires_at: null,
                      last_used_at: null,
                    },
                  ],
                  error: null,
                }),
            }),
          }),
          update: () => ({
            eq: () => Promise.resolve({ error: null }),
          }),
        };
      }

      if (table === 'user_profiles') {
        return {
          select: () => ({
            eq: () => ({
              single: () =>
                Promise.resolve({
                  data: { id: 'user-1', plan: 'free' },
                }),
            }),
          }),
        };
      }

      if (table === 'user_licenses') {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                returns: () =>
                  Promise.resolve({
                    data: [
                      {
                        id: 'lic-1',
                        user_id: 'user-1',
                        theme_id: 'default',
                        tier: 'double',
                        type: 'individual',
                        is_active: true,
                        expires_at: null,
                      },
                    ],
                    error: null,
                  }),
              }),
            }),
          }),
        };
      }

      throw new Error(`Unexpected table: ${table}`);
    });
  });

  it('returns canonical licensedThemes for legacy placeholder licenses', async () => {
    const { GET } = await import('@/app/api/mcp/verify/route');

    const request = new NextRequest('http://localhost:3001/api/mcp/verify', {
      headers: {
        authorization: `Bearer ${'tk_live_' + 'a'.repeat(64)}`,
      },
    });

    const response = await GET(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.themes.licensed).toEqual(['pebble', 'square-minimalism']);
    expect(data.themes.licensed).not.toContain('default');
    expect(data.licenses[0].themeId).toBe('default');
    expect(data.licenses[0].resolvedThemeIds).toEqual(['pebble', 'square-minimalism']);
  });
});
