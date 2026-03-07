import { beforeEach, describe, expect, it, vi } from 'vitest';
import { NextRequest } from 'next/server';

const { mockUnmarshal, mockRateLimitWebhooks, mockCreateRateLimitErrorResponse } = vi.hoisted(
  () => ({
    mockUnmarshal: vi.fn(),
    mockRateLimitWebhooks: vi.fn(),
    mockCreateRateLimitErrorResponse: vi.fn(),
  })
);

const mockInsert = vi.fn();
const mockLimit = vi.fn();
const mockEqSubscriptionId = vi.fn();
const mockEqUserId = vi.fn();
const mockSelect = vi.fn();
const mockFrom = vi.fn();

vi.mock('@paddle/paddle-node-sdk', () => ({
  Environment: { production: 'production', sandbox: 'sandbox' },
  EventName: {
    TransactionCompleted: 'transaction.completed',
    SubscriptionActivated: 'subscription.activated',
    SubscriptionCanceled: 'subscription.canceled',
    SubscriptionPastDue: 'subscription.past_due',
    AdjustmentCreated: 'adjustment.created',
  },
  Paddle: vi.fn().mockImplementation(() => ({
    webhooks: {
      unmarshal: mockUnmarshal,
    },
  })),
}));

vi.mock('@supabase/supabase-js', () => ({
  createClient: vi.fn(() => ({
    from: mockFrom,
  })),
}));

vi.mock('@/lib/security/rate-limit', () => ({
  rateLimitWebhooks: mockRateLimitWebhooks,
  getClientIp: vi.fn(() => '127.0.0.1'),
  createRateLimitErrorResponse: mockCreateRateLimitErrorResponse,
}));

describe('POST /api/webhooks/paddle', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    process.env.PADDLE_API_KEY = 'pdl_test_key';
    process.env.PADDLE_WEBHOOK_SECRET = 'pdl_whsec_test';
    process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT = 'sandbox';
    process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://example.supabase.co';
    process.env.SUPABASE_SERVICE_ROLE_KEY = 'service-role';
    process.env.NEXT_PUBLIC_PADDLE_PRICE_SINGLE = 'pri_single';
    process.env.NEXT_PUBLIC_PADDLE_PRICE_DOUBLE = 'pri_double';
    process.env.NEXT_PUBLIC_PADDLE_PRICE_CREATOR = 'pri_creator';

    mockRateLimitWebhooks.mockResolvedValue({
      success: true,
      limit: 60,
      remaining: 59,
      reset: Date.now() + 60_000,
    });

    mockFrom.mockImplementation((table: string) => {
      if (table !== 'user_licenses') {
        throw new Error(`Unexpected table: ${table}`);
      }

      return {
        select: mockSelect,
        insert: mockInsert,
      };
    });

    mockSelect.mockReturnValue({ eq: mockEqUserId });
    mockEqUserId.mockReturnValue({ eq: mockEqSubscriptionId });
    mockEqSubscriptionId.mockReturnValue({ limit: mockLimit });
    mockLimit.mockResolvedValue({ data: [] });
    mockInsert.mockResolvedValue({ error: null });
  });

  it('stores creator purchases as explicit all-access licenses when theme_id is omitted', async () => {
    const { POST } = await import('@/app/api/webhooks/paddle/route');

    mockUnmarshal.mockResolvedValue({
      eventType: 'transaction.completed',
      data: {
        id: 'txn_123',
        customData: {
          user_id: 'user-1',
        },
        items: [{ price: { id: 'pri_creator' } }],
      },
    });

    const request = new NextRequest('http://localhost:3001/api/webhooks/paddle', {
      method: 'POST',
      headers: { 'paddle-signature': 'sig_test' },
      body: JSON.stringify({ ok: true }),
    });

    const response = await POST(request);

    expect(response.status).toBe(200);
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: 'user-1',
        theme_id: 'creator-all-access',
        tier: 'creator',
      })
    );
  });

  it('rejects single purchases when theme_id is missing instead of writing default', async () => {
    const { POST } = await import('@/app/api/webhooks/paddle/route');

    mockUnmarshal.mockResolvedValue({
      eventType: 'transaction.completed',
      data: {
        id: 'txn_456',
        customData: {
          user_id: 'user-1',
        },
        items: [{ price: { id: 'pri_single' } }],
      },
    });

    const request = new NextRequest('http://localhost:3001/api/webhooks/paddle', {
      method: 'POST',
      headers: { 'paddle-signature': 'sig_test' },
      body: JSON.stringify({ ok: true }),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('missing_theme_id');
    expect(mockInsert).not.toHaveBeenCalled();
  });
});
