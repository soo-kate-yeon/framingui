/**
 * Template Database Operations Tests
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * WHY: 템플릿 조회 및 접근 권한 확인 로직의 동작 검증
 * IMPACT: 무료 템플릿 관리 및 라이선스 검증의 품질 보장
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  getFreeTemplates,
  getTemplateById,
  isFreeTemplate,
  checkMultipleTemplates,
  canAccessTemplate,
  getFreeTemplateCount,
} from '@/lib/db/templates';
import type { FreeScreenTemplate } from '@/lib/db/types';

// Mock Supabase server client
const mockFrom = vi.fn();
const mockSelect = vi.fn();
const mockEq = vi.fn();
const mockIn = vi.fn();
const mockOrder = vi.fn();
const mockSingle = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    from: mockFrom,
  })),
}));

describe('getFreeTemplates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ order: mockOrder });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully get all free templates', async () => {
    const mockTemplates: FreeScreenTemplate[] = [
      {
        id: 'template-1',
        template_id: 'landing-basic',
        name: 'Basic Landing Page',
        description: 'Simple landing page template',
        is_free: true,
        created_at: '2024-01-01T00:00:00Z',
      },
      {
        id: 'template-2',
        template_id: 'signup-form',
        name: 'Signup Form',
        description: 'User registration form',
        is_free: true,
        created_at: '2024-01-02T00:00:00Z',
      },
    ];

    mockOrder.mockResolvedValue({
      data: mockTemplates,
      error: null,
    });

    const result = await getFreeTemplates();

    expect(mockFrom).toHaveBeenCalledWith('free_screen_templates');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('is_free', true);
    expect(mockOrder).toHaveBeenCalledWith('created_at', { ascending: true });
    expect(result).toEqual(mockTemplates);
  });

  it('should return empty array when no free templates exist', async () => {
    mockOrder.mockResolvedValue({
      data: [],
      error: null,
    });

    const result = await getFreeTemplates();

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

    await expect(getFreeTemplates()).rejects.toMatchObject({
      message: 'Failed to get free templates',
      code: '500',
      details: 'Database connection failed',
    });
  });

  it('should handle unexpected errors', async () => {
    mockOrder.mockRejectedValue(new Error('Network timeout'));

    await expect(getFreeTemplates()).rejects.toMatchObject({
      message: 'Unexpected error getting free templates',
      details: 'Network timeout',
    });
  });
});

describe('getTemplateById', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue({ single: mockSingle });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully get template by ID', async () => {
    const mockTemplate: FreeScreenTemplate = {
      id: 'template-1',
      template_id: 'landing-basic',
      name: 'Basic Landing Page',
      description: 'Simple landing page template',
      is_free: true,
      created_at: '2024-01-01T00:00:00Z',
    };

    mockSingle.mockResolvedValue({
      data: mockTemplate,
      error: null,
    });

    const result = await getTemplateById('landing-basic');

    expect(mockFrom).toHaveBeenCalledWith('free_screen_templates');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('template_id', 'landing-basic');
    expect(result).toEqual(mockTemplate);
  });

  it('should return null when template not found', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        code: 'PGRST116',
        message: 'Not found',
      },
    });

    const result = await getTemplateById('non-existent-template');

    expect(result).toBeNull();
  });

  it('should throw DatabaseError when fetch fails', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        message: 'Database error',
        code: '500',
      },
    });

    await expect(getTemplateById('landing-basic')).rejects.toMatchObject({
      message: 'Failed to get template by ID',
      code: '500',
      details: 'Database error',
    });
  });

  it('should handle template with null description', async () => {
    const mockTemplate: FreeScreenTemplate = {
      id: 'template-1',
      template_id: 'landing-basic',
      name: 'Basic Landing Page',
      description: null,
      is_free: true,
      created_at: '2024-01-01T00:00:00Z',
    };

    mockSingle.mockResolvedValue({
      data: mockTemplate,
      error: null,
    });

    const result = await getTemplateById('landing-basic');

    expect(result?.description).toBeNull();
  });

  it('should handle unexpected errors', async () => {
    mockSingle.mockRejectedValue(new Error('Connection timeout'));

    await expect(getTemplateById('landing-basic')).rejects.toMatchObject({
      message: 'Unexpected error getting template',
      details: 'Connection timeout',
    });
  });
});

describe('isFreeTemplate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockImplementation(() => ({ eq: mockEq, single: mockSingle }));
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return true for free template', async () => {
    mockSingle.mockResolvedValue({
      data: {
        is_free: true,
      },
      error: null,
    });

    const result = await isFreeTemplate('landing-basic');

    expect(mockFrom).toHaveBeenCalledWith('free_screen_templates');
    expect(mockSelect).toHaveBeenCalledWith('is_free');
    expect(result).toBe(true);
  });

  it('should return false when template not found', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        code: 'PGRST116',
        message: 'Not found',
      },
    });

    const result = await isFreeTemplate('non-existent-template');

    expect(result).toBe(false);
  });

  it('should return false when template is not free', async () => {
    mockSingle.mockResolvedValue({
      data: {
        is_free: false,
      },
      error: null,
    });

    const result = await isFreeTemplate('premium-dashboard');

    expect(result).toBe(false);
  });

  it('should return false when database error occurs', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: {
        message: 'Database error',
        code: '500',
      },
    });

    const result = await isFreeTemplate('landing-basic');

    expect(result).toBe(false);
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle unexpected errors', async () => {
    mockSingle.mockRejectedValue(new Error('Network error'));

    const result = await isFreeTemplate('landing-basic');

    expect(result).toBe(false);
  });
});

describe('checkMultipleTemplates', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ in: mockIn });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully check multiple templates', async () => {
    const templateIds = ['landing-basic', 'signup-form', 'premium-dashboard'];
    const mockData = [
      { template_id: 'landing-basic', is_free: true },
      { template_id: 'signup-form', is_free: true },
      { template_id: 'premium-dashboard', is_free: false },
    ];

    mockIn.mockResolvedValue({
      data: mockData,
      error: null,
    });

    const result = await checkMultipleTemplates(templateIds);

    expect(mockFrom).toHaveBeenCalledWith('free_screen_templates');
    expect(mockSelect).toHaveBeenCalledWith('template_id, is_free');
    expect(mockIn).toHaveBeenCalledWith('template_id', templateIds);
    expect(result).toEqual({
      'landing-basic': true,
      'signup-form': true,
      'premium-dashboard': false,
    });
  });

  it('should return false for templates not in database', async () => {
    const templateIds = ['landing-basic', 'non-existent-template'];
    const mockData = [{ template_id: 'landing-basic', is_free: true }];

    mockIn.mockResolvedValue({
      data: mockData,
      error: null,
    });

    const result = await checkMultipleTemplates(templateIds);

    expect(result).toEqual({
      'landing-basic': true,
      'non-existent-template': false,
    });
  });

  it('should return all false when database error occurs', async () => {
    const templateIds = ['landing-basic', 'signup-form'];

    mockIn.mockResolvedValue({
      data: null,
      error: {
        message: 'Database error',
        code: '500',
      },
    });

    const result = await checkMultipleTemplates(templateIds);

    expect(result).toEqual({
      'landing-basic': false,
      'signup-form': false,
    });
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle empty template list', async () => {
    const result = await checkMultipleTemplates([]);

    expect(result).toEqual({});
  });

  it('should handle unexpected errors', async () => {
    const templateIds = ['landing-basic'];

    mockIn.mockRejectedValue(new Error('Network error'));

    const result = await checkMultipleTemplates(templateIds);

    expect(result).toEqual({
      'landing-basic': false,
    });
  });
});

describe('canAccessTemplate', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return true for free template', async () => {
    const mockEqChain = vi.fn();
    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEqChain });
    mockEqChain.mockImplementation(() => ({ eq: mockEqChain, single: mockSingle }));

    // First call: isFreeTemplate check
    mockSingle.mockResolvedValueOnce({
      data: { is_free: true },
      error: null,
    });

    const result = await canAccessTemplate('user-123', 'landing-basic');

    expect(result).toBe(true);
  });

  it('should return true when user has active license for paid template', async () => {
    const mockEqReturn = {
      eq: vi.fn(),
      single: mockSingle,
    };

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue(mockEqReturn);
    mockEqReturn.eq.mockReturnValue(mockEqReturn);

    // First call: isFreeTemplate check (2 .eq() calls)
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116' },
    });

    // Second call: license check (3 .eq() calls)
    mockSingle.mockResolvedValueOnce({
      data: {
        id: 'license-1',
        is_active: true,
        expires_at: '2027-12-31T23:59:59Z',
      },
      error: null,
    });

    const result = await canAccessTemplate('user-123', 'premium-dashboard');

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

    // First call: isFreeTemplate check
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116' },
    });

    // Second call: license check
    mockSingle.mockResolvedValueOnce({
      data: {
        id: 'license-1',
        is_active: true,
        expires_at: null,
      },
      error: null,
    });

    const result = await canAccessTemplate('user-123', 'premium-dashboard');

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

    // First call: isFreeTemplate check
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116' },
    });

    // Second call: license check
    mockSingle.mockResolvedValueOnce({
      data: {
        id: 'license-1',
        is_active: true,
        expires_at: pastDate,
      },
      error: null,
    });

    const result = await canAccessTemplate('user-123', 'premium-dashboard');

    expect(result).toBe(false);
  });

  it('should return false when user has no license for paid template', async () => {
    const mockEqReturn = {
      eq: vi.fn(),
      single: mockSingle,
    };

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
    mockEq.mockReturnValue(mockEqReturn);
    mockEqReturn.eq.mockReturnValue(mockEqReturn);

    // First call: isFreeTemplate check
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116' },
    });

    // Second call: license check
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116' },
    });

    const result = await canAccessTemplate('user-123', 'premium-dashboard');

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

    // First call: isFreeTemplate check
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: 'PGRST116' },
    });

    // Second call: license check fails
    mockSingle.mockResolvedValueOnce({
      data: null,
      error: { code: '500', message: 'Database error' },
    });

    const result = await canAccessTemplate('user-123', 'premium-dashboard');

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

    const result = await canAccessTemplate('user-123', 'premium-dashboard');

    expect(result).toBe(false);
  });
});

describe('getFreeTemplateCount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({ select: mockSelect });
    mockSelect.mockReturnValue({ eq: mockEq });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should return count of free templates', async () => {
    mockEq.mockResolvedValue({
      count: 12,
      error: null,
    });

    const result = await getFreeTemplateCount();

    expect(mockFrom).toHaveBeenCalledWith('free_screen_templates');
    expect(mockSelect).toHaveBeenCalledWith('*', { count: 'exact', head: true });
    expect(mockEq).toHaveBeenCalledWith('is_free', true);
    expect(result).toBe(12);
  });

  it('should return 0 when no free templates exist', async () => {
    mockEq.mockResolvedValue({
      count: 0,
      error: null,
    });

    const result = await getFreeTemplateCount();

    expect(result).toBe(0);
  });

  it('should return 0 when database error occurs', async () => {
    mockEq.mockResolvedValue({
      count: null,
      error: {
        message: 'Database error',
      },
    });

    const result = await getFreeTemplateCount();

    expect(result).toBe(0);
    expect(console.error).toHaveBeenCalled();
  });

  it('should handle unexpected errors', async () => {
    mockEq.mockRejectedValue(new Error('Network error'));

    const result = await getFreeTemplateCount();

    expect(result).toBe(0);
  });
});
