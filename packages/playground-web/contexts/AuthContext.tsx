/**
 * 인증 컨텍스트
 * SPEC-UI-003: Authentication Context Provider
 * [TAG-UI003-054]
 */

'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import type { User, License } from '@/lib/types/user';

/**
 * 인증 컨텍스트 값 인터페이스
 */
interface AuthContextValue {
  /** 현재 사용자 정보 */
  user: User | null;

  /** 사용자 라이선스 배열 */
  licenses: License[];

  /** 로딩 상태 */
  isLoading: boolean;

  /** 인증 여부 */
  isAuthenticated: boolean;

  /** 특정 템플릿 라이선스 보유 여부 확인 */
  hasLicense: (templateId: string) => boolean;
}

/**
 * 인증 컨텍스트 생성
 */
export const AuthContext = createContext<AuthContextValue | null>(null);

/**
 * 인증 컨텍스트 Provider Props
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * 인증 컨텍스트 Provider 컴포넌트
 *
 * NextAuth.js 세션을 기반으로 인증 상태 관리
 *
 * @example
 * ```tsx
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * ```
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!session?.user;

  // 세션에서 사용자 정보 추출
  const user: User | null = session?.user
    ? {
        id: (session.user as any).userId || session.user.id || '',
        email: session.user.email || '',
        name: session.user.name || '',
        image: session.user.image || undefined,
        provider: 'google', // TODO: 실제 provider 정보 사용
        createdAt: new Date(), // TODO: 실제 생성일 사용
        updatedAt: new Date(), // TODO: 실제 업데이트일 사용
      }
    : null;

  // 세션에서 라이선스 정보 추출
  const licenses: License[] = (session?.user as any)?.licenses || [];

  /**
   * 특정 템플릿에 대한 유효한 라이선스 보유 여부 확인
   *
   * @param templateId - 확인할 템플릿 ID
   * @returns 라이선스 보유 여부
   */
  const hasLicense = (templateId: string): boolean => {
    return licenses.some(
      (license) =>
        license.templateId === templateId && license.status === 'active',
    );
  };

  const value: AuthContextValue = {
    user,
    licenses,
    isLoading,
    isAuthenticated,
    hasLicense,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * 인증 컨텍스트 Hook
 *
 * @returns 인증 컨텍스트 값
 * @throws AuthContext가 Provider 외부에서 사용된 경우
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, hasLicense, isAuthenticated } = useAuth();
 *
 *   if (isAuthenticated && hasLicense('template-001')) {
 *     return <EditMode />;
 *   }
 *
 *   return <PreviewMode />;
 * }
 * ```
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
