/**
 * AuthContext unit tests
 * SPEC-UI-003: Authentication Context Provider
 * [TAG-UI003-054]
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { useSession } from 'next-auth/react';
import { mockUser, mockActiveLicense, mockUseSession } from '../utils/test-utils';

// Mock next-auth
vi.mock('next-auth/react', () => ({
  useSession: vi.fn(),
}));

// Test component that uses useAuth hook
function TestComponent() {
  const { user, licenses, isLoading, isAuthenticated, hasLicense } = useAuth();

  return (
    <div>
      <div data-testid="loading">{isLoading ? 'loading' : 'loaded'}</div>
      <div data-testid="authenticated">{isAuthenticated ? 'yes' : 'no'}</div>
      <div data-testid="user-email">{user?.email || 'none'}</div>
      <div data-testid="licenses-count">{licenses.length}</div>
      <div data-testid="has-template-001">
        {hasLicense('template-001') ? 'yes' : 'no'}
      </div>
    </div>
  );
}

describe('AuthContext', () => {
  describe('AuthProvider', () => {
    it('초기 로딩 상태 표시', () => {
      (useSession as any).mockReturnValue({ data: null, status: 'loading' });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      expect(screen.getByTestId('loading')).toHaveTextContent('loading');
      expect(screen.getByTestId('authenticated')).toHaveTextContent('no');
    });

    it('비인증 상태 처리', () => {
      (useSession as any).mockReturnValue({ data: null, status: 'unauthenticated' });

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      expect(screen.getByTestId('authenticated')).toHaveTextContent('no');
      expect(screen.getByTestId('user-email')).toHaveTextContent('none');
      expect(screen.getByTestId('licenses-count')).toHaveTextContent('0');
    });

    it('인증된 사용자 정보 표시', () => {
      const sessionData = mockUseSession({
        user: mockUser,
        licenses: [mockActiveLicense],
      });

      (useSession as any).mockReturnValue(sessionData);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      expect(screen.getByTestId('loading')).toHaveTextContent('loaded');
      expect(screen.getByTestId('authenticated')).toHaveTextContent('yes');
      expect(screen.getByTestId('user-email')).toHaveTextContent(mockUser.email);
      expect(screen.getByTestId('licenses-count')).toHaveTextContent('1');
    });

    it('라이선스 보유 확인 - 보유한 경우', () => {
      const sessionData = mockUseSession({
        user: mockUser,
        licenses: [mockActiveLicense],
      });

      (useSession as any).mockReturnValue(sessionData);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      expect(screen.getByTestId('has-template-001')).toHaveTextContent('yes');
    });

    it('라이선스 보유 확인 - 보유하지 않은 경우', () => {
      const sessionData = mockUseSession({
        user: mockUser,
        licenses: [],
      });

      (useSession as any).mockReturnValue(sessionData);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      expect(screen.getByTestId('has-template-001')).toHaveTextContent('no');
    });

    it('inactive 라이선스는 보유로 인정하지 않음', () => {
      const inactiveLicense = {
        ...mockActiveLicense,
        status: 'expired' as const,
      };

      const sessionData = mockUseSession({
        user: mockUser,
        licenses: [inactiveLicense],
      });

      (useSession as any).mockReturnValue(sessionData);

      render(
        <AuthProvider>
          <TestComponent />
        </AuthProvider>,
      );

      expect(screen.getByTestId('has-template-001')).toHaveTextContent('no');
    });
  });

  describe('useAuth hook', () => {
    it('Provider 외부에서 사용 시 에러 발생', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within AuthProvider');

      consoleSpy.mockRestore();
    });
  });
});
