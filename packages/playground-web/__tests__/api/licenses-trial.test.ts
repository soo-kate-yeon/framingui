/**
 * Free Trial License API Tests
 *
 * WHY: 무료 체험 생성 API의 에러/성공 시나리오를 검증해 회귀를 방지한다.
 * IMPACT: 무료 체험 시작 플로우 안정성 향상
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '@/app/api/licenses/trial/route';

const mockGetUser = vi.fn();
const mockFrom = vi.fn();
const mockSelect = vi.fn();
const mockEqUserId = vi.fn();
const mockEqType = vi.fn();
const mockMaybeSingle = vi.fn();
const mockInsert = vi.fn();
const mockInsertSelect = vi.fn();
const mockInsertSingle = vi.fn();

vi.mock('@/lib/supabase/server', () => ({
  createClient: vi.fn(async () => ({
    auth: {
      getUser: mockGetUser,
    },
    from: mockFrom,
  })),
}));

describe('POST /api/licenses/trial', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => {});

    mockFrom.mockReturnValue({
      select: mockSelect,
      insert: mockInsert,
    });

    mockSelect.mockReturnValue({ eq: mockEqUserId });
    mockEqUserId.mockReturnValue({ eq: mockEqType });
    mockEqType.mockReturnValue({ maybeSingle: mockMaybeSingle });

    mockInsert.mockReturnValue({ select: mockInsertSelect });
    mockInsertSelect.mockReturnValue({ single: mockInsertSingle });
  });

  it('인증되지 않은 사용자는 401을 반환한다', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: null },
      error: { message: 'No session' },
    });

    const response = await POST();
    const data = await response.json();

    expect(response.status).toBe(401);
    expect(data).toEqual({ error: 'unauthorized' });
  });

  it('이미 trial 라이선스가 있으면 409를 반환한다', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
      error: null,
    });
    mockMaybeSingle.mockResolvedValue({
      data: { id: 'trial-1', type: 'trial', expires_at: '2099-01-01T00:00:00.000Z' },
      error: null,
    });

    const response = await POST();
    const data = await response.json();

    expect(response.status).toBe(409);
    expect(data.error).toBe('trial_already_exists');
    expect(data.existing_trial.expires_at).toBe('2099-01-01T00:00:00.000Z');
  });

  it('trial 생성에 성공하면 201을 반환한다', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
      error: null,
    });
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });
    mockInsertSingle.mockResolvedValue({
      data: { id: 'trial-new', type: 'trial', expires_at: '2099-01-01T00:00:00.000Z' },
      error: null,
    });

    const response = await POST();
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.success).toBe(true);
    expect(data.trial.id).toBe('trial-new');
    expect(data.trial.type).toBe('trial');
  });

  it('trial 생성 DB 오류 시 500을 반환한다', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
      error: null,
    });
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });
    mockInsertSingle.mockResolvedValue({
      data: null,
      error: { message: 'insert failed' },
    });

    const response = await POST();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('creation_failed');
    expect(data.message).toBe('insert failed');
    expect(data.debug.code).toBeUndefined();
  });

  it('예상치 못한 예외 발생 시 500 internal_error를 반환한다', async () => {
    mockGetUser.mockRejectedValue(new Error('boom'));

    const response = await POST();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data).toEqual({ error: 'internal_error' });
  });

  it('RLS 정책 위반(42501) 시 reason=rls_denied를 반환한다', async () => {
    mockGetUser.mockResolvedValue({
      data: { user: { id: 'user-1' } },
      error: null,
    });
    mockMaybeSingle.mockResolvedValue({
      data: null,
      error: null,
    });
    mockInsertSingle.mockResolvedValue({
      data: null,
      error: { message: 'new row violates row-level security policy', code: '42501' },
    });

    const response = await POST();
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('creation_failed');
    expect(data.reason).toBe('rls_denied');
    expect(data.debug.code).toBe('42501');
  });
});
