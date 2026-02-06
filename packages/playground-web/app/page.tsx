'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { LandingPage } from '../components/landing/LandingPage';

export default function HomePage() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    // 인증 상태 로딩 중에는 아무것도 하지 않음
    if (isLoading) {
      return;
    }

    // 로그인된 사용자 → /studio로 리디렉션
    if (user) {
      router.push('/studio');
    }
  }, [user, isLoading, router]);

  // 로딩 중이거나 로그인된 사용자(리디렉션 대기 중)는 로딩 화면 표시
  if (isLoading || user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-2xl font-bold tracking-tighter mb-4 animate-pulse">TEKTON</div>
        </div>
      </div>
    );
  }

  // 비로그인 사용자는 랜딩 페이지 표시
  return <LandingPage />;
}
