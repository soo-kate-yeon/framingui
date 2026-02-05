/**
 * User Database Operations Tests
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * WHY: 사용자 CRUD 작업의 동작 검증 및 에러 처리 테스트
 * IMPACT: 사용자 데이터 관리의 품질 보장
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { createOrUpdateUser, getUserById, updateUser, getCurrentUser } from '@/lib/db/users';
import type { User } from '@supabase/supabase-js';

// Mock Supabase server client
const mockGetUser = vi.fn();
const mockGetUserById = vi.fn();
const mockUpdateUserById = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    auth: {
      getUser: mockGetUser,
      admin: {
        getUserById: mockGetUserById,
        updateUserById: mockUpdateUserById,
      },
    },
  })),
}));

describe('createOrUpdateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully create user profile from Supabase user', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    };

    const result = await createOrUpdateUser(mockUser);

    expect(result).toEqual({
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    });
  });

  it('should handle user without email', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: null,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
    };

    const result = await createOrUpdateUser(mockUser);

    expect(result).toEqual({
      id: 'user-123',
      email: '',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    });
  });

  it('should use created_at as updated_at when updated_at is missing', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: null,
    };

    const result = await createOrUpdateUser(mockUser);

    expect(result?.updated_at).toBe('2024-01-01T00:00:00Z');
  });

  it('should throw DatabaseError when operation fails', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
    };

    // Force an error by making the user object invalid
    vi.spyOn(mockUser, 'id', 'get').mockImplementation(() => {
      throw new Error('Database connection failed');
    });

    await expect(createOrUpdateUser(mockUser)).rejects.toMatchObject({
      message: 'Failed to create or update user',
      details: 'Database connection failed',
    });
  });
});

describe('getUserById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully get user by ID', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    };

    mockGetUserById.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await getUserById('user-123');

    expect(mockGetUserById).toHaveBeenCalledWith('user-123');
    expect(result).toEqual({
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    });
  });

  it('should return null when user not found', async () => {
    mockGetUserById.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    const result = await getUserById('non-existent-user');

    expect(result).toBeNull();
  });

  it('should throw DatabaseError when fetch fails', async () => {
    mockGetUserById.mockResolvedValue({
      data: { user: null },
      error: {
        message: 'User not found',
        code: '404',
      },
    });

    await expect(getUserById('user-123')).rejects.toMatchObject({
      message: 'Failed to get user by ID',
      code: '404',
      details: 'User not found',
    });
  });

  it('should handle unexpected errors', async () => {
    mockGetUserById.mockRejectedValue(new Error('Network error'));

    await expect(getUserById('user-123')).rejects.toMatchObject({
      message: 'Unexpected error getting user',
      details: 'Network error',
    });
  });

  it('should handle user without email', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: null,
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
    };

    mockGetUserById.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await getUserById('user-123');

    expect(result?.email).toBe('');
  });
});

describe('updateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully update user email', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'newemail@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-03T00:00:00Z',
    };

    mockUpdateUserById.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await updateUser('user-123', {
      email: 'newemail@example.com',
    });

    expect(mockUpdateUserById).toHaveBeenCalledWith('user-123', {
      email: 'newemail@example.com',
      user_metadata: undefined,
    });
    expect(result).toEqual({
      id: 'user-123',
      email: 'newemail@example.com',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-03T00:00:00Z',
    });
  });

  it('should successfully update user metadata', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: { display_name: 'John Doe' },
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-03T00:00:00Z',
    };

    mockUpdateUserById.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await updateUser('user-123', {
      metadata: { display_name: 'John Doe' },
    });

    expect(mockUpdateUserById).toHaveBeenCalledWith('user-123', {
      email: undefined,
      user_metadata: { display_name: 'John Doe' },
    });
    expect(result?.id).toBe('user-123');
  });

  it('should return null when user not found', async () => {
    mockUpdateUserById.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    const result = await updateUser('non-existent-user', {
      email: 'test@example.com',
    });

    expect(result).toBeNull();
  });

  it('should throw DatabaseError when update fails', async () => {
    mockUpdateUserById.mockResolvedValue({
      data: { user: null },
      error: {
        message: 'Invalid email format',
        code: '400',
      },
    });

    await expect(updateUser('user-123', { email: 'invalid-email' })).rejects.toMatchObject({
      message: 'Failed to update user',
      code: '400',
      details: 'Invalid email format',
    });
  });

  it('should handle unexpected errors', async () => {
    mockUpdateUserById.mockRejectedValue(new Error('Database timeout'));

    await expect(updateUser('user-123', { email: 'test@example.com' })).rejects.toMatchObject({
      message: 'Unexpected error updating user',
      details: 'Database timeout',
    });
  });
});

describe('getCurrentUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully get current authenticated user', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    };

    mockGetUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await getCurrentUser();

    expect(mockGetUser).toHaveBeenCalled();
    expect(result).toEqual({
      id: 'user-123',
      email: 'test@example.com',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-02T00:00:00Z',
    });
  });

  it('should return null when no user is authenticated', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: null,
    });

    const result = await getCurrentUser();

    expect(result).toBeNull();
  });

  it('should return null when authentication fails', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: {
        message: 'Invalid token',
      },
    });

    const result = await getCurrentUser();

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Failed to get current user:', 'Invalid token');
  });

  it('should handle unexpected errors', async () => {
    mockGetUser.mockRejectedValue(new Error('Connection timeout'));

    const result = await getCurrentUser();

    expect(result).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle user without updated_at', async () => {
    const mockUser: User = {
      id: 'user-123',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      aud: 'authenticated',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: null,
    };

    mockGetUser.mockResolvedValue({
      data: { user: mockUser },
      error: null,
    });

    const result = await getCurrentUser();

    expect(result?.updated_at).toBe('2024-01-01T00:00:00Z');
  });
});
