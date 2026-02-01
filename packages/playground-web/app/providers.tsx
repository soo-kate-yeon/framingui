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
 * 전역 Provider 컴포넌트
 *
 * NextAuth SessionProvider와 AuthContext, ThemeContext를 통합
 */
export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <AuthProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </AuthProvider>
    </SessionProvider>
  );
}
