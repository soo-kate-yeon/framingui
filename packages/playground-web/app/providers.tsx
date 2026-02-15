/**
 * Client-side Providers
 * SPEC-AUTH-001: Supabase 인증 통합
 *
 * [TAG-AUTH-001-U001] Supabase Auth를 단독 인증 제공자로 사용
 *
 * WHY: Supabase Auth로 인증 시스템 단일화
 * IMPACT: AuthProvider가 Supabase Auth 기반 세션 관리 제공
 */

'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { ThemeProvider } from '@/contexts/ThemeContext';
import type { ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * 전역 Provider 컴포넌트
 *
 * AuthProvider (Supabase Auth)와 ThemeContext를 통합
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </AuthProvider>
  );
}
