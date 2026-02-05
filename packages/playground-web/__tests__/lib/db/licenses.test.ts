/**
 * License Database Operations Tests
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * WHY: 라이선스 CRUD 및 검증 로직의 동작 검증
 * IMPACT: 템플릿 접근 권한 제어의 품질 보장
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getUserLicenses,
  createLicense,
  checkLicense,
  updateLicense,
  getActiveLicenseCount,
  deactivateExpiredLicenses,
} from '@/lib/db/licenses';
import type { UserLicense } from '@/lib/db/types';

// Mock Supabase server client
const mockFrom = vi.fn();
const mockSelect = vi.fn();
const mockInsert = vi.fn();
const mockUpdate = vi.fn();
const mockEq = vi.fn();
const mockLt = vi.fn();
const mockNot = vi.fn();
const mockOrder = vi.fn();
const mockSingle = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    from: mockFrom,
  })),
}));

describe('getUserLicenses', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Setup chain
    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ order: mockOrder });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully get user licenses', async () => {
    const mockLicenses: UserLicense[] = [
      {
        id: 'license-1',
        user_id: 'user-123',
        theme_id: 'premium-dashboard',
        tier: 'single',
        paddle_subscription_id: 'sub_123',
        purchased_at: '2024-01-01T00:00:00Z',
        expires_at: '2025-01-01T00:00:00Z',
        is_active: true,
      },
      {
        id: 'license-2',
        user_id: 'user-123',
        theme_id: 'basic-landing',
        tier: 'creator',
        paddle_subscription_id: null,
        purchased_at: '2024-02-01T00:00:00Z',
        expires_at: null,
        is_active: true,
      },
    ];

    mockOrder.mockResolvedValue({
      data: mockLicenses,
      error: null,
    });

    const result = await getUserLicenses('user-123');

    expect(mockFrom).toHaveBeenCalledWith('user_licenses');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('user_id', 'user-123');
    expect(mockOrder).toHaveBeenCalledWith('purchased_at', { ascending: false });
    expect(result).toEqual(mockLicenses);
  });

  it('should return empty array when user has no licenses', async () => {
    mockOrder.mockResolvedValue({
      data: [],
      error: null,
    });

    const result = await getUserLicenses('user-123');

    expect(result).toEqual([]);
  });

  it('should throw DatabaseError when fetch fails', async () => {
    mockOrder.mockResolvedValue({
      data: null,
      error: {
        message: 'Database connection failed',
        code: '500',
      },
    });

    await expect(getUserLicenses('user-123')).rejects.toMatchObject({
      message: 'Failed to get user licenses',
      code: '500',
      details: 'Database connection failed',
    });
  });

  it('should handle unexpected errors', async () => {
    mockOrder.mockRejectedValue(new Error('Network timeout'));

    await expect(getUserLicenses('user-123')).rejects.toMatchObject({
      message: 'Unexpected error getting user licenses',
      details: 'Network timeout',
    });
  });
});

describe('createLicense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ insert: mockInsert });
    mockInsert.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ single: mockSingle });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully create a new license', async () => {
    const mockLicense: UserLicense = {
      id: 'license-1',
      user_id: 'user-123',
      theme_id: 'premium-dashboard',
      tier: 'single',
      paddle_subscription_id: 'sub_123',
      purchased_at: '2024-01-01T00:00:00Z',
      expires_at: '2025-01-01T00:00:00Z',
      is_active: true,
    };

    mockSingle.mockResolvedValue({
      data: mockLicense,
      error: null,
    });

    const result = await createLicense({
      user_id: 'user-123',
      theme_id: 'premium-dashboard',
      tier: 'single',
      paddle_subscription_id: 'sub_123',
      expires_at: '2025-01-01T00:00:00Z',
    });

    expect(mockFrom).toHaveBeenCalledWith('user_licenses');
    expect(mockInsert).toHaveBeenCalledWith({
      user_id: 'user-123',
      theme_id: 'premium-dashboard',
      tier: 'single',
      paddle_subscription_id: 'sub_123',
      expires_at: '2025-01-01T00:00:00Z',
    });
    expect(result).toEqual(mockLicense);
  });

  it('should handle license creation with null expires_at (permanent license)', async () => {
    const mockLicense: UserLicense = {
      id: 'license-1',
      user_id: 'user-123',
      theme_id: 'basic-landing',
      tier: 'creator',
      paddle_subscription_id: null,
      purchased_at: '2024-01-01T00:00:00Z',
      expires_at: null,
      is_active: true,
    };

    mockSingle.mockResolvedValue({
      data: mockLicense,
      error: null,
    });

    const result = await createLicense({
      user_id: 'user-123',
      theme_id: 'basic-landing',
      tier: 'creator',
    });

    expect(result.expires_at).toBeNull();
    expect(result.paddle_subscription_id).toBeNull();
  });

  it('should throw DatabaseError when duplicate license exists', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        message: 'duplicate key value violates unique constraint',
        code: '23505',
      },
    });

    await expect(
      createLicense({
        user_id: 'user-123',
        theme_id: 'premium-dashboard',
        tier: 'single',
      })
    ).rejects.toMatchObject({
      message: 'License already exists for this user and theme',
      code: '23505',
      details: 'UNIQUE constraint violation',
    });
  });

  it('should throw DatabaseError when no data returned', async () => {
    // Reset mocks to ensure clean state
    vi.clearAllMocks();

    mockFrom.mockReturnValue({ insert: mockInsert });
    mockInsert.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ single: mockSingle });

    mockSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(
      createLicense({
        user_id: 'user-123',
        theme_id: 'premium-dashboard',
        tier: 'single',
      })
    ).rejects.toMatchObject({
      message: 'No data returned after license creation',
      details: 'Insert operation succeeded but no data returned',
    });
  });

  it('should handle unexpected errors', async () => {
    mockSingle.mockRejectedValue(new Error('Database timeout'));

    await expect(
      createLicense({
        user_id: 'user-123',
        theme_id: 'premium-dashboard',
        tier: 'single',
      })
    ).rejects.toMatchObject({
      message: 'Unexpected error creating license',
      details: 'Database timeout',
    });
  });
});

describe('checkLicense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return true when active license exists', async () => {
    // Setup complete chain: .from().select().eq().eq().eq().single()
    const mockEqReturn = {
      eq: vi.fn(),
      single: mockSingle,
    };

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue(mockEqReturn);
    mockEqReturn.eq.mockReturnValue(mockEqReturn);

    mockSingle.mockResolvedValue({
      data: {
        id: 'license-1',
        is_active: true,
        expires_at: '2025-12-31T23:59:59Z',
      },
      error: null,
    });

    const result = await checkLicense('user-123', 'premium-dashboard');

    expect(result).toBe(true);
  });

  it('should return true for permanent license without expiry', async () => {
    const mockEqReturn = {
      eq: vi.fn(),
      single: mockSingle,
    };

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue(mockEqReturn);
    mockEqReturn.eq.mockReturnValue(mockEqReturn);

    mockSingle.mockResolvedValue({
      data: {
        id: 'license-1',
        is_active: true,
        expires_at: null,
      },
      error: null,
    });

    const result = await checkLicense('user-123', 'premium-dashboard');

    expect(result).toBe(true);
  });

  it('should return false when license is expired', async () => {
    const mockEqReturn = {
      eq: vi.fn(),
      single: mockSingle,
    };

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue(mockEqReturn);
    mockEqReturn.eq.mockReturnValue(mockEqReturn);

    const pastDate = new Date('2020-01-01T00:00:00Z').toISOString();

    mockSingle.mockResolvedValue({
      data: {
        id: 'license-1',
        is_active: true,
        expires_at: pastDate,
      },
      error: null,
    });

    const result = await checkLicense('user-123', 'premium-dashboard');

    expect(result).toBe(false);
  });

  it('should return false when license not found', async () => {
    const mockEqReturn = {
      eq: vi.fn(),
      single: mockSingle,
    };

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue(mockEqReturn);
    mockEqReturn.eq.mockReturnValue(mockEqReturn);

    mockSingle.mockResolvedValue({
      data: null,
      error: {
        code: 'PGRST116',
        message: 'Not found',
      },
    });

    const result = await checkLicense('user-123', 'non-existent-theme');

    expect(result).toBe(false);
  });

  it('should return false when database error occurs', async () => {
    const mockEqReturn = {
      eq: vi.fn(),
      single: mockSingle,
    };

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue(mockEqReturn);
    mockEqReturn.eq.mockReturnValue(mockEqReturn);

    mockSingle.mockResolvedValue({
      data: null,
      error: {
        code: '500',
        message: 'Database error',
      },
    });

    const result = await checkLicense('user-123', 'premium-dashboard');

    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle unexpected errors', async () => {
    const mockEqReturn = {
      eq: vi.fn(),
      single: mockSingle,
    };

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue(mockEqReturn);
    mockEqReturn.eq.mockReturnValue(mockEqReturn);

    mockSingle.mockRejectedValue(new Error('Network error'));

    const result = await checkLicense('user-123', 'premium-dashboard');

    expect(result).toBe(false);
  });
});

describe('updateLicense', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ update: mockUpdate });
    mockUpdate.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ single: mockSingle });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully update license tier', async () => {
    const mockLicense: UserLicense = {
      id: 'license-1',
      user_id: 'user-123',
      theme_id: 'premium-dashboard',
      tier: 'creator',
      paddle_subscription_id: 'sub_123',
      purchased_at: '2024-01-01T00:00:00Z',
      expires_at: '2025-12-31T23:59:59Z',
      is_active: true,
    };

    mockSingle.mockResolvedValue({
      data: mockLicense,
      error: null,
    });

    const result = await updateLicense('license-1', {
      tier: 'creator',
      expires_at: '2025-12-31T23:59:59Z',
    });

    expect(mockFrom).toHaveBeenCalledWith('user_licenses');
    expect(mockUpdate).toHaveBeenCalledWith({
      tier: 'creator',
      expires_at: '2025-12-31T23:59:59Z',
    });
    expect(mockEq).toHaveBeenCalledWith('id', 'license-1');
    expect(result).toEqual(mockLicense);
  });

  it('should successfully deactivate license', async () => {
    const mockLicense: UserLicense = {
      id: 'license-1',
      user_id: 'user-123',
      theme_id: 'premium-dashboard',
      tier: 'single',
      paddle_subscription_id: 'sub_123',
      purchased_at: '2024-01-01T00:00:00Z',
      expires_at: null,
      is_active: false,
    };

    mockSingle.mockResolvedValue({
      data: mockLicense,
      error: null,
    });

    const result = await updateLicense('license-1', { is_active: false });

    expect(result.is_active).toBe(false);
  });

  it('should throw DatabaseError when license not found', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: null,
    });

    await expect(updateLicense('non-existent-license', { is_active: false })).rejects.toMatchObject(
      {
        message: 'License not found',
        code: 'PGRST116',
        details: 'No license found with the given ID',
      }
    );
  });

  it('should throw DatabaseError when update fails', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        message: 'Invalid tier value',
        code: '400',
      },
    });

    await expect(updateLicense('license-1', { tier: 'invalid' as any })).rejects.toMatchObject({
      message: 'Failed to update license',
      code: '400',
      details: 'Invalid tier value',
    });
  });

  it('should handle unexpected errors', async () => {
    mockSingle.mockRejectedValue(new Error('Connection lost'));

    await expect(updateLicense('license-1', { is_active: false })).rejects.toMatchObject({
      message: 'Unexpected error updating license',
      details: 'Connection lost',
    });
  });
});

describe('getActiveLicenseCount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return count of active licenses', async () => {
    mockEq.mockImplementation(() => ({
      eq: vi.fn().mockResolvedValue({
        count: 5,
        error: null,
      }),
    }));

    const result = await getActiveLicenseCount('user-123');

    expect(mockFrom).toHaveBeenCalledWith('user_licenses');
    expect(mockSelect).toHaveBeenCalledWith('*', { count: 'exact', head: true });
    expect(result).toBe(5);
  });

  it('should return 0 when user has no active licenses', async () => {
    mockEq.mockImplementation(() => ({
      eq: vi.fn().mockResolvedValue({
        count: 0,
        error: null,
      }),
    }));

    const result = await getActiveLicenseCount('user-123');

    expect(result).toBe(0);
  });

  it('should return 0 when database error occurs', async () => {
    mockEq.mockImplementation(() => ({
      eq: vi.fn().mockResolvedValue({
        count: null,
        error: {
          message: 'Database error',
        },
      }),
    }));

    const result = await getActiveLicenseCount('user-123');

    expect(result).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle unexpected errors', async () => {
    mockEq.mockImplementation(() => ({
      eq: vi.fn().mockRejectedValue(new Error('Network error')),
    }));

    const result = await getActiveLicenseCount('user-123');

    expect(result).toBe(0);
  });
});

describe('deactivateExpiredLicenses', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ update: mockUpdate });
    mockUpdate.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ lt: mockLt });
    mockLt.mockReturnValue({ not: mockNot });
    mockNot.mockReturnValue({ select: mockSelect });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully deactivate expired licenses', async () => {
    const deactivatedLicenses = [{ id: 'license-1' }, { id: 'license-2' }, { id: 'license-3' }];

    mockSelect.mockResolvedValue({
      data: deactivatedLicenses,
      error: null,
    });

    const result = await deactivateExpiredLicenses();

    expect(mockFrom).toHaveBeenCalledWith('user_licenses');
    expect(mockUpdate).toHaveBeenCalledWith({ is_active: false });
    expect(mockEq).toHaveBeenCalledWith('is_active', true);
    expect(result).toBe(3);
  });

  it('should return 0 when no expired licenses found', async () => {
    mockSelect.mockResolvedValue({
      data: [],
      error: null,
    });

    const result = await deactivateExpiredLicenses();

    expect(result).toBe(0);
  });

  it('should throw DatabaseError when operation fails', async () => {
    mockSelect.mockResolvedValue({
      data: null,
      error: {
        message: 'Database error',
        code: '500',
      },
    });

    await expect(deactivateExpiredLicenses()).rejects.toMatchObject({
      message: 'Failed to deactivate expired licenses',
      code: '500',
      details: 'Database error',
    });
  });

  it('should handle unexpected errors', async () => {
    mockSelect.mockRejectedValue(new Error('Connection timeout'));

    await expect(deactivateExpiredLicenses()).rejects.toMatchObject({
      message: 'Unexpected error deactivating licenses',
      details: 'Connection timeout',
    });
  });
});
