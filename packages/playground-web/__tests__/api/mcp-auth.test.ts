/**
 * MCP Authentication Endpoint Tests
 * SPEC-AUTH-001: Task #11 - MCP 인증 엔드포인트
 *
 * WHY: API 엔드포인트의 요청 검증, 응답 형식, 에러 처리를 테스트
 * IMPACT: 품질 게이트 충족 및 회귀 방지
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST, OPTIONS } from '@/app/api/mcp/auth/route';
import { NextRequest } from 'next/server';

// Supabase 클라이언트 모킹
const mockSignInWithOAuth = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
    },
  })),
}));

describe('POST /api/mcp/auth', () => {
  const validRequest = {
    client_id: 'mcp-cursor-client',
    redirect_uri: 'http://localhost:3000/mcp/callback',
    state: 'random-csrf-token-12345',
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Request Validation', () => {
    it('should return 400 when client_id is missing', async () => {
      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify({
          redirect_uri: validRequest.redirect_uri,
          state: validRequest.state,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('validation_error');
      expect(data.details).toBeDefined();
    });

    it('should return 400 when redirect_uri is not a valid URL', async () => {
      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify({
          client_id: validRequest.client_id,
          redirect_uri: 'not-a-valid-url',
          state: validRequest.state,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('validation_error');
      expect(data.message).toContain('Invalid request body');
    });

    it('should return 400 when state is missing', async () => {
      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify({
          client_id: validRequest.client_id,
          redirect_uri: validRequest.redirect_uri,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('validation_error');
    });

    it('should return 400 when client_id is empty string', async () => {
      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify({
          client_id: '',
          redirect_uri: validRequest.redirect_uri,
          state: validRequest.state,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('validation_error');
    });
  });

  describe('Successful OAuth URL Generation', () => {
    it('should return 200 with auth_url, state, and expires_in', async () => {
      mockSignInWithOAuth.mockResolvedValue({
        data: {
          url: 'https://accounts.google.com/o/oauth2/auth?state=random-csrf-token-12345',
          provider: 'google',
        },
        error: null,
      });

      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data).toHaveProperty('auth_url');
      expect(data).toHaveProperty('state', validRequest.state);
      expect(data).toHaveProperty('expires_in', 300);
      expect(data.auth_url).toContain('google');
    });

    it('should preserve the state parameter in response', async () => {
      mockSignInWithOAuth.mockResolvedValue({
        data: {
          url: 'https://accounts.google.com/o/oauth2/auth',
          provider: 'google',
        },
        error: null,
      });

      const customState = 'custom-state-token-xyz';
      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify({
          ...validRequest,
          state: customState,
        }),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(data.state).toBe(customState);
    });
  });

  describe('Error Handling', () => {
    it('should return 500 when Supabase returns an error', async () => {
      mockSignInWithOAuth.mockResolvedValue({
        data: { url: null, provider: 'google' },
        error: {
          message: 'OAuth provider configuration error',
          name: 'AuthError',
          status: 500,
        },
      });

      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('oauth_url_generation_failed');
      expect(data.message).toContain('Failed to generate OAuth URL');
    });

    it('should return 500 when OAuth URL is missing', async () => {
      mockSignInWithOAuth.mockResolvedValue({
        data: { url: null, provider: 'google' },
        error: null,
      });

      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('oauth_url_missing');
    });

    it('should handle unexpected errors gracefully', async () => {
      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: 'invalid-json',
      });

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toBe('internal_server_error');
      expect(data.message).toContain('unexpected error');
    });
  });

  describe('Response Format', () => {
    it('should return correct TypeScript interface shape', async () => {
      mockSignInWithOAuth.mockResolvedValue({
        data: {
          url: 'https://accounts.google.com/o/oauth2/auth',
          provider: 'google',
        },
        error: null,
      });

      const request = new NextRequest('http://localhost:3001/api/mcp/auth', {
        method: 'POST',
        body: JSON.stringify(validRequest),
      });

      const response = await POST(request);
      const data = await response.json();

      // MCPAuthResponse interface 검증
      expect(typeof data.auth_url).toBe('string');
      expect(typeof data.state).toBe('string');
      expect(typeof data.expires_in).toBe('number');
      expect(data.expires_in).toBe(300);
    });
  });
});

describe('OPTIONS /api/mcp/auth (CORS)', () => {
  it('should return CORS headers for preflight request', async () => {
    const response = await OPTIONS();

    expect(response.status).toBe(200);
    expect(response.headers.get('Access-Control-Allow-Origin')).toBe('*');
    expect(response.headers.get('Access-Control-Allow-Methods')).toContain('POST');
    expect(response.headers.get('Access-Control-Allow-Headers')).toContain('Content-Type');
  });
});
