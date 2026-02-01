/**
 * Test utilities for playground-web
 * SPEC-UI-003: WebView Studio MVP Test Utilities
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { AuthProvider } from '@/contexts/AuthContext';
import type { License, User } from '@/lib/types/user';

/**
 * Mock user for testing
 */
export const mockUser: User = {
  id: 'test-user-123',
  email: 'test@example.com',
  name: 'Test User',
  image: 'https://example.com/avatar.jpg',
  provider: 'google',
  createdAt: new Date('2025-01-01'),
  updatedAt: new Date('2025-01-01'),
};

/**
 * Mock active license for testing
 */
export const mockActiveLicense: License = {
  id: 'license-001',
  templateId: 'template-001',
  key: 'TEST-KEY-123-ACTIVE',
  purchasedAt: new Date('2025-01-01'),
  status: 'active',
};

/**
 * Mock expired license for testing
 */
export const mockExpiredLicense: License = {
  id: 'license-002',
  templateId: 'template-002',
  key: 'TEST-KEY-456-EXPIRED',
  purchasedAt: new Date('2024-01-01'),
  expiresAt: new Date('2024-12-31'),
  status: 'expired',
};

/**
 * Mock revoked license for testing
 */
export const mockRevokedLicense: License = {
  id: 'license-003',
  templateId: 'template-003',
  key: 'TEST-KEY-789-REVOKED',
  purchasedAt: new Date('2024-01-01'),
  status: 'revoked',
};

/**
 * Render with providers
 * @param ui - React element to render
 * @param options - Render options
 */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );

  return render(ui, { wrapper: Wrapper, ...options });
}

/**
 * Mock NextAuth useSession hook
 */
export function mockUseSession(data: {
  user: User | null;
  licenses?: License[];
  status?: 'authenticated' | 'loading' | 'unauthenticated';
}) {
  return {
    data: data.user
      ? {
          user: {
            ...data.user,
            id: data.user.id,
            userId: data.user.id,
            licenses: data.licenses || [],
            likedTemplates: [],
            savedThemes: [],
          },
        }
      : null,
    status: data.status || (data.user ? 'authenticated' : 'unauthenticated'),
  };
}

/**
 * Wait for async updates
 */
export const waitForAsync = () => new Promise((resolve) => setTimeout(resolve, 0));
