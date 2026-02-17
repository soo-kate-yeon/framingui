'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { LandingPage } from './LandingPage';

/**
 * Landing Page Wrapper
 *
 * Server Component인 app/page.tsx와 Client Component인 LandingPage 사이의 다리
 * - 인증 체크 로직 처리 (hydration 후)
 * - 로그인 사용자 → /studio 리디렉션
 * - 비로그인 사용자 → 랜딩 페이지 표시
 *
 * ✅ 핵심: 초기 HTML에는 항상 <LandingPage /> 포함
 * ✅ Googlebot이 실제 콘텐츠를 즉시 인덱싱 가능
 */
export function LandingPageWrapper() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // Hydration 완료 후 인증 체크
    if (!isLoading && user) {
      // 로그인 사용자는 /studio로 리디렉션
      router.push('/studio');
    }
  }, [user, isLoading, router]);

  // ✅ 항상 랜딩 페이지 렌더링
  // - 초기 HTML에 포함 → Bot이 콘텐츠 인덱싱
  // - 로그인 사용자는 hydration 후 리디렉션 (깜빡임 최소화)
  return <LandingPage />;
}
