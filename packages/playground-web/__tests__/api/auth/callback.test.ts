/**
 * OAuth Callback Route Tests
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * WHY: OAuth 콜백 처리 로직의 동작 검증 및 에러 처리 테스트
 * IMPACT: OAuth 플로우의 품질 보장 및 보안 강화
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { GET } from '@/app/api/auth/callback/route';
import { NextRequest } from 'next/server';
import type { User } from '@supabase/supabase-js';

// Mock Supabase server client
const mockExchangeCodeForSession = vi.fn();
const mockGetUserById = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    auth: {
      exchangeCodeForSession: mockExchangeCodeForSession,
      admin: {
        getUserById: mockGetUserById,
      },
    },
  })),
}));

// Mock createOrUpdateUser
const mockCreateOrUpdateUser = vi.fn();

vi.mock('@/lib/db/users', () => ({
  createOrUpdateUser: mockCreateOrUpdateUser,
}));

describe('GET /api/auth/callback', () => {
  const validCode = 'valid-authorization-code-12345';
  const validState = 'valid-csrf-state-token-67890';

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Parameter Validation', () => {
    it('should return error when state parameter is missing (CSRF protection)', async () => {
      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain('/auth/login?error=missing_state');
      expect(console.error).toHaveBeenCalledWith(
        '[OAuth Callback] Missing state parameter - CSRF protection failed'
      );
    });

    it('should return error when authorization code is missing', async () => {
      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain('/auth/login?error=missing_code');
      expect(console.error).toHaveBeenCalledWith(
        '[OAuth Callback] Missing authorization code'
      );
    });

    it('should return error when both code and state are missing', async () => {
      const request = new NextRequest('http://localhost:3000/api/auth/callback');

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain('/auth/login?error=missing_state');
    });
  });

  describe('Code Exchange', () => {
    it('should successfully exchange authorization code for session', async () => {
      const mockUser: User = {
        id: 'user-123',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: '2024-01-01T00:00:00Z',
      };

      mockExchangeCodeForSession.mockResolvedValue({
        data: {
          session: {
            access_token: 'access-token',
            refresh_token: 'refresh-token',
            expires_in: 3600,
            user: mockUser,
          },
          user: mockUser,
        },
        error: null,
      });

      mockCreateOrUpdateUser.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      });

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(mockExchangeCodeForSession).toHaveBeenCalledWith(validCode);
      expect(mockCreateOrUpdateUser).toHaveBeenCalledWith(mockUser);
      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain('/dashboard');
    });

    it('should return error when code exchange fails', async () => {
      mockExchangeCodeForSession.mockResolvedValue({
        data: {
          session: null,
          user: null,
        },
        error: {
          message: 'Invalid authorization code',
          code: '400',
        },
      });

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=invalid-code&state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain(
        '/auth/login?error=exchange_failed'
      );
      expect(console.error).toHaveBeenCalledWith(
        '[OAuth Callback] Code exchange failed:',
        expect.objectContaining({
          error: 'Invalid authorization code',
          code: '400',
        })
      );
    });

    it('should return error when session is null after exchange', async () => {
      mockExchangeCodeForSession.mockResolvedValue({
        data: {
          session: null,
          user: null,
        },
        error: null,
      });

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain(
        '/auth/login?error=invalid_session'
      );
    });

    it('should return error when user is null after exchange', async () => {
      mockExchangeCodeForSession.mockResolvedValue({
        data: {
          session: {
            access_token: 'token',
            refresh_token: 'refresh',
            expires_in: 3600,
          },
          user: null,
        },
        error: null,
      });

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain(
        '/auth/login?error=invalid_session'
      );
    });
  });

  describe('User Creation/Update', () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
    };

    beforeEach(() => {
      mockExchangeCodeForSession.mockResolvedValue({
        data: {
          session: {
            access_token: 'access-token',
            refresh_token: 'refresh-token',
            expires_in: 3600,
            user: mockUser,
          },
          user: mockUser,
        },
        error: null,
      });
    });

    it('should create or update user profile successfully', async () => {
      mockCreateOrUpdateUser.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      });

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(mockCreateOrUpdateUser).toHaveBeenCalledWith(mockUser);
      expect(console.log).toHaveBeenCalledWith(
        '[OAuth Callback] User authenticated successfully:',
        {
          userId: 'user-123',
          email: 'test@example.com',
        }
      );
      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain('/dashboard');
    });

    it('should return error when user creation returns null', async () => {
      mockCreateOrUpdateUser.mockResolvedValue(null);

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain(
        '/auth/login?error=user_creation_failed'
      );
      expect(console.error).toHaveBeenCalledWith(
        '[OAuth Callback] Failed to create/update user profile'
      );
    });

    it('should return error when user creation throws error', async () => {
      mockCreateOrUpdateUser.mockRejectedValue(new Error('Database connection failed'));

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain(
        '/auth/login?error=database_error'
      );
      expect(console.error).toHaveBeenCalledWith(
        '[OAuth Callback] Database error during user creation:',
        expect.any(Error)
      );
    });
  });

  describe('Redirect Behavior', () => {
    it('should redirect to dashboard on successful authentication', async () => {
      const mockUser: User = {
        id: 'user-123',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: '2024-01-01T00:00:00Z',
      };

      mockExchangeCodeForSession.mockResolvedValue({
        data: {
          session: {
            access_token: 'token',
            refresh_token: 'refresh',
            expires_in: 3600,
            user: mockUser,
          },
          user: mockUser,
        },
        error: null,
      });

      mockCreateOrUpdateUser.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      });

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toBe('http://localhost:3000/dashboard');
    });

    it('should redirect to login with error parameter on failures', async () => {
      mockExchangeCodeForSession.mockResolvedValue({
        data: {
          session: null,
          user: null,
        },
        error: {
          message: 'OAuth error',
        },
      });

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      const location = response.headers.get('Location') || '';
      expect(location).toContain('/auth/login');
      expect(location).toContain('error=');
    });
  });

  describe('Error Handling', () => {
    it('should handle unexpected errors gracefully', async () => {
      mockExchangeCodeForSession.mockRejectedValue(
        new Error('Unexpected network error')
      );

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain(
        '/auth/login?error=unexpected_error'
      );
      expect(console.error).toHaveBeenCalledWith(
        '[OAuth Callback] Unexpected error:',
        expect.any(Error)
      );
    });

    it('should preserve origin URL in redirects', async () => {
      const request = new NextRequest(
        `https://example.com/api/auth/callback?state=${validState}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      const location = response.headers.get('Location') || '';
      expect(location).toContain('https://example.com');
    });
  });

  describe('CSRF Protection', () => {
    it('should validate state parameter presence', async () => {
      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}`
      );

      const response = await GET(request);

      expect(response.status).toBe(302);
      expect(response.headers.get('Location')).toContain('error=missing_state');
      expect(console.error).toHaveBeenCalledWith(
        '[OAuth Callback] Missing state parameter - CSRF protection failed'
      );
    });

    it('should accept valid state parameter', async () => {
      const mockUser: User = {
        id: 'user-123',
        email: 'test@example.com',
        app_metadata: {},
        user_metadata: {},
        aud: 'authenticated',
        created_at: '2024-01-01T00:00:00Z',
      };

      mockExchangeCodeForSession.mockResolvedValue({
        data: {
          session: {
            access_token: 'token',
            refresh_token: 'refresh',
            expires_in: 3600,
            user: mockUser,
          },
          user: mockUser,
        },
        error: null,
      });

      mockCreateOrUpdateUser.mockResolvedValue({
        id: 'user-123',
        email: 'test@example.com',
        created_at: '2024-01-01T00:00:00Z',
        updated_at: '2024-01-01T00:00:00Z',
      });

      const request = new NextRequest(
        `http://localhost:3000/api/auth/callback?code=${validCode}&state=${validState}`
      );

      const response = await GET(request);

      // Should not fail due to state validation
      expect(response.headers.get('Location')).not.toContain('missing_state');
    });
  });
});
