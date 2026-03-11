import { describe, expect, it } from 'vitest';
import { DEFAULT_CHECKOUT_SUCCESS_PATH, buildCheckoutSuccessUrl } from '@/lib/paddle/urls';

describe('buildCheckoutSuccessUrl', () => {
  it('uses the default billing success path when no return path is provided', () => {
    expect(buildCheckoutSuccessUrl('https://framingui.com')).toBe(
      `https://framingui.com${DEFAULT_CHECKOUT_SUCCESS_PATH}`
    );
  });

  it('builds an absolute url for route-specific success paths', () => {
    expect(buildCheckoutSuccessUrl('https://framingui.com', '/pricing?checkout=success')).toBe(
      'https://framingui.com/pricing?checkout=success'
    );
  });
});
