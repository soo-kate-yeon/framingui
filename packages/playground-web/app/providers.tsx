/**
 * Client-side Providers
 * SPEC-UI-003: Session and Auth Context Providers
 */

'use client';

import { SessionProvider } from 'next-auth/react';
import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * 인증 활성화 여부 확인
 * AUTH_SECRET이 설정되지 않으면 인증 기능 비활성화
 */
const isAuthEnabled = process.env.NEXT_PUBLIC_ENABLE_AUTH === 'true';

/**
 * 전역 Provider 컴포넌트
 *
 * NextAuth SessionProvider와 AuthContext, ThemeContext를 통합
 * 인증이 비활성화된 경우 SessionProvider만 건너뜀 (AuthProvider는 Mock 모드로 유지)
 */
export function Providers({ children }: ProvidersProps) {
  // 인증 비활성화 시 SessionProvider 없이 렌더링 (AuthProvider는 Mock 모드로 유지)
  if (!isAuthEnabled) {
    return (
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    );
  }

  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
