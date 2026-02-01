/**
 * Auth Context for WebView Studio
 * [SPEC-UI-003][TAG-UI003-054]
 *
 * 사용자 인증 상태 및 라이선스 정보 관리
 * Mock 데이터 사용 (NextAuth 통합은 추후 구현)
 */

'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, UserData, License } from '../lib/types/user';

// ============================================================================
// Context Types
// ============================================================================

interface AuthContextValue {
  /** 현재 사용자 (null이면 미로그인) */
  user: User | null;

  /** 사용자 데이터 (라이선스, 좋아요 목록 등) */
  userData: UserData | null;

  /** 로딩 상태 */
  isLoading: boolean;

  /** 에러 메시지 */
  error: string | null;

  /** 로그인 (Mock) */
  login: (email: string, provider: 'google' | 'github') => Promise<void>;

  /** 로그아웃 */
  logout: () => void;

  /** 특정 템플릿에 대한 라이선스 확인 */
  hasLicense: (templateId: string) => boolean;

  /** 템플릿 좋아요 토글 */
  toggleLike: (templateId: string) => void;
}

// ============================================================================
// Context
// ============================================================================

const AuthContext = createContext<AuthContextValue | null>(null);

// ============================================================================
// Mock Data (개발용)
// ============================================================================

const MOCK_LICENSES: License[] = [
  {
    id: 'lic-001',
    templateId: 'linear-minimal-v1',
    key: 'MOCK-KEY-001',
    purchasedAt: new Date('2024-01-15'),
    status: 'active',
  },
  {
    id: 'lic-002',
    templateId: 'dashboard-pro',
    key: 'MOCK-KEY-002',
    purchasedAt: new Date('2024-02-01'),
    status: 'active',
  },
  {
    id: 'lic-003',
    templateId: 'round-minimal-v1',
    key: 'MOCK-KEY-003',
    purchasedAt: new Date('2024-02-01'),
    status: 'active',
  },
];

// ============================================================================
// Provider
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 로그인 (Mock)
  const login = useCallback(async (email: string, provider: 'google' | 'github') => {
    setIsLoading(true);
    setError(null);

    try {
      // Mock 사용자 생성
      const mockUser: User = {
        id: `user-${Date.now()}`,
        email,
        name: email.split('@')[0] ?? 'User',
        image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        provider,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Mock 사용자 데이터
      const mockUserData: UserData = {
        userId: mockUser.id,
        licenses: MOCK_LICENSES,
        likedTemplates: ['linear-minimal-v1'],
        savedThemes: [],
      };

      setUser(mockUser);
      setUserData(mockUserData);

      // 실제 구현 시:
      // - NextAuth signIn() 호출
      // - 백엔드 API에서 UserData 로드
      // - 세션 저장
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 로그아웃
  const logout = useCallback(() => {
    setUser(null);
    setUserData(null);
    setError(null);

    // 실제 구현 시:
    // - NextAuth signOut() 호출
    // - 세션 삭제
  }, []);

  // 라이선스 확인 [TAG-UI003-011]
  const hasLicense = useCallback(
    (templateId: string): boolean => {
      if (!userData) return false;
      return userData.licenses.some(
        (license) => license.templateId === templateId && license.status === 'active'
      );
    },
    [userData]
  );

  // 템플릿 좋아요 토글
  const toggleLike = useCallback((templateId: string) => {
    setUserData((prev) => {
      if (!prev) return null;

      const isLiked = prev.likedTemplates.includes(templateId);
      return {
        ...prev,
        likedTemplates: isLiked
          ? prev.likedTemplates.filter((id) => id !== templateId)
          : [...prev.likedTemplates, templateId],
      };
    });

    // 실제 구현 시:
    // - 백엔드 API 호출하여 좋아요 상태 업데이트
  }, []);

  const value: AuthContextValue = {
    user,
    userData,
    isLoading,
    error,
    login,
    logout,
    hasLicense,
    toggleLike,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ============================================================================
// Hook
// ============================================================================

/**
 * Auth Context 사용 Hook
 *
 * @throws {Error} AuthProvider 외부에서 사용 시 에러
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
