/**
 * Auth Context for WebView Studio
 * [SPEC-AUTH-001][TAG-AUTH-001-U001]
 *
 * 사용자 인증 상태 및 라이선스 정보 관리
 * Supabase Auth 통합
 */

'use client';

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import type { User, UserData, License } from '../lib/types/user';
import type { UserLicense } from '../lib/db/types';
import {
  signInWithGoogle,
  signInWithGitHub,
  signOut as supabaseSignOut,
  onAuthStateChange,
} from '../lib/auth/supabase-auth';
import { createClient } from '../lib/supabase/client';
import type { User as SupabaseUser } from '@supabase/supabase-js';

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

  /** 로그인 (Supabase OAuth) */
  login: (provider: 'google' | 'github') => Promise<void>;

  /** 로그아웃 */
  logout: () => Promise<void>;

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
// Helper Functions
// ============================================================================

/**
 * UserLicense (DB 타입)를 License (App 타입)로 변환
 */
function convertUserLicenseToLicense(userLicense: UserLicense): License {
  return {
    id: userLicense.id,
    templateId: userLicense.theme_id,
    key: '', // 클라이언트에서는 라이선스 키를 노출하지 않음
    purchasedAt: new Date(userLicense.purchased_at),
    expiresAt: userLicense.expires_at ? new Date(userLicense.expires_at) : undefined,
    status: userLicense.is_active ? 'active' : 'expired',
  };
}

/**
 * Supabase User를 App User로 변환
 */
function convertSupabaseUserToUser(supabaseUser: SupabaseUser): User {
  // user_metadata에서 provider 정보 추출
  const provider =
    (supabaseUser.app_metadata.provider as 'google' | 'github') || 'google';

  return {
    id: supabaseUser.id,
    email: supabaseUser.email || '',
    name: supabaseUser.user_metadata.name || supabaseUser.email?.split('@')[0] || 'User',
    image: supabaseUser.user_metadata.avatar_url || supabaseUser.user_metadata.picture,
    provider,
    createdAt: new Date(supabaseUser.created_at),
    updatedAt: new Date(supabaseUser.updated_at || supabaseUser.created_at),
  };
}

/**
 * 사용자의 라이선스 목록 조회
 */
async function fetchUserLicenses(userId: string): Promise<License[]> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('user_licenses')
      .select('*')
      .eq('user_id', userId)
      .order('purchased_at', { ascending: false });

    if (error) {
      console.error('Failed to fetch user licenses:', error.message);
      return [];
    }

    return (data as UserLicense[]).map(convertUserLicenseToLicense);
  } catch (error) {
    console.error('Unexpected error fetching licenses:', error);
    return [];
  }
}

// ============================================================================
// Provider
// ============================================================================

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true); // 초기 로딩 true
  const [error, setError] = useState<string | null>(null);

  // ============================================================================
  // 인증 상태 변경 리스너
  // ============================================================================

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (event, session) => {
      setIsLoading(true);
      setError(null);

      try {
        if (event === 'SIGNED_IN' && session?.user) {
          // 사용자 로그인
          const appUser = convertSupabaseUserToUser(session.user);
          setUser(appUser);

          // 라이선스 로드
          const licenses = await fetchUserLicenses(session.user.id);

          // UserData 설정
          const data: UserData = {
            userId: session.user.id,
            licenses,
            likedTemplates: [], // TODO: 향후 구현
            savedThemes: [], // TODO: 향후 구현
          };

          setUserData(data);
        } else if (event === 'SIGNED_OUT') {
          // 사용자 로그아웃
          setUser(null);
          setUserData(null);
        } else if (event === 'TOKEN_REFRESHED' && session?.user) {
          // 토큰 갱신 (사용자 정보 업데이트)
          const appUser = convertSupabaseUserToUser(session.user);
          setUser(appUser);
        } else if (event === 'USER_UPDATED' && session?.user) {
          // 사용자 정보 업데이트
          const appUser = convertSupabaseUserToUser(session.user);
          setUser(appUser);
        }
      } catch (err) {
        console.error('Auth state change error:', err);
        setError(err instanceof Error ? err.message : 'Authentication error');
      } finally {
        setIsLoading(false);
      }
    });

    // 초기 세션 체크
    const initAuth = async () => {
      try {
        const supabase = createClient();
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error('Failed to get initial session:', sessionError.message);
          setIsLoading(false);
          return;
        }

        if (data.session?.user) {
          // 세션이 있으면 사용자 정보 로드
          const appUser = convertSupabaseUserToUser(data.session.user);
          setUser(appUser);

          // 라이선스 로드
          const licenses = await fetchUserLicenses(data.session.user.id);

          const userData: UserData = {
            userId: data.session.user.id,
            licenses,
            likedTemplates: [],
            savedThemes: [],
          };

          setUserData(userData);
        }
      } catch (err) {
        console.error('Failed to initialize auth:', err);
        setError(err instanceof Error ? err.message : 'Failed to initialize authentication');
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    // 클린업: 리스너 구독 해제
    return () => {
      unsubscribe();
    };
  }, []);

  // ============================================================================
  // 로그인
  // ============================================================================

  const login = useCallback(async (provider: 'google' | 'github') => {
    setIsLoading(true);
    setError(null);

    try {
      const result =
        provider === 'google' ? await signInWithGoogle() : await signInWithGitHub();

      if (result.error) {
        throw new Error(result.error.message);
      }

      // OAuth 리다이렉트가 발생하므로 여기서는 상태 변경 불필요
      // onAuthStateChange 리스너가 콜백에서 처리
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // 로그아웃
  // ============================================================================

  const logout = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { error: signOutError } = await supabaseSignOut();

      if (signOutError) {
        throw new Error(signOutError.message);
      }

      // onAuthStateChange 리스너가 SIGNED_OUT 이벤트 처리
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Logout failed');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // ============================================================================
  // 라이선스 확인
  // ============================================================================

  const hasLicense = useCallback(
    (templateId: string): boolean => {
      if (!userData) {return false;}

      return userData.licenses.some(
        (license) => license.templateId === templateId && license.status === 'active'
      );
    },
    [userData]
  );

  // ============================================================================
  // 템플릿 좋아요 토글
  // ============================================================================

  const toggleLike = useCallback((templateId: string) => {
    setUserData((prev) => {
      if (!prev) {return null;}

      const isLiked = prev.likedTemplates.includes(templateId);

      return {
        ...prev,
        likedTemplates: isLiked
          ? prev.likedTemplates.filter((id) => id !== templateId)
          : [...prev.likedTemplates, templateId],
      };
    });

    // TODO: 백엔드 API 호출하여 좋아요 상태 영구 저장
  }, []);

  // ============================================================================
  // Context Value
  // ============================================================================

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
