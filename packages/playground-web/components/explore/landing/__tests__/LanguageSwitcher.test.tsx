/**
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * Tests for LanguageSwitcher component
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageSwitcher } from '../LanguageSwitcher';

// Mock next/navigation
const mockPush = vi.fn();
const mockPathname = '/explore/template/test';
const mockParams = { locale: 'en' };

vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
  usePathname: () => mockPathname,
  useParams: () => mockParams,
}));

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render language selector', () => {
    render(<LanguageSwitcher />);

    const selector = screen.getByLabelText('Select language');
    expect(selector).toBeInTheDocument();
  });

  it('should display both English and Korean options', () => {
    render(<LanguageSwitcher />);

    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('한국어')).toBeInTheDocument();
  });

  it('should show current locale as selected', () => {
    render(<LanguageSwitcher />);

    const selector = screen.getByLabelText('Select language') as HTMLSelectElement;
    expect(selector.value).toBe('en');
  });

  it('should call router.push when locale changes', async () => {
    const user = userEvent.setup();
    render(<LanguageSwitcher />);

    const selector = screen.getByLabelText('Select language');
    await user.selectOptions(selector, 'ko');

    // Wait for transition to complete
    await vi.waitFor(() => {
      expect(mockPush).toHaveBeenCalled();
    });
  });

  it('should be accessible with aria-label', () => {
    render(<LanguageSwitcher />);

    const selector = screen.getByLabelText('Select language');
    expect(selector).toHaveAttribute('aria-label', 'Select language');
  });
});
