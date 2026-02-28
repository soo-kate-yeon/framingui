/**
 * FreeTrialModal - 무료 체험 시작 모달 (우측 하단 팝업)
 *
 * 기능:
 * - 라이선스가 없는 사용자에게 표시
 * - localStorage로 중복 표시 방지
 * - 로그인 상태에 따라 분기 (로그인 → 템플릿 선택, 미로그인 → 로그인 플로우)
 */

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { trackFunnelPrimaryCtaClick } from '../../lib/analytics';

// ============================================================================
// Types
// ============================================================================

interface FreeTrialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartTrial: () => void; // 로그인 완료 후 템플릿 선택 모달로 진입
}

// ============================================================================
// Constants
// ============================================================================

const LOCAL_STORAGE_KEY = 'hasSeenFreeTrial';

// ============================================================================
// Component
// ============================================================================

export function FreeTrialModal({ isOpen, onClose: _onClose, onStartTrial }: FreeTrialModalProps) {
  const { user, login } = useAuth();
  const [isClosing] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // 로그인 완료 시 자동으로 템플릿 선택 모달로 진입
  useEffect(() => {
    if (isOpen && user && !isLoggingIn) {
      console.log('[FreeTrialModal] User logged in, proceeding to template selection');
      // localStorage에 "본 적 있음" 표시
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      onStartTrial();
    }
  }, [user, isOpen, isLoggingIn, onStartTrial]);

  const handleCTA = async () => {
    console.log('[FreeTrialModal] CTA clicked, user:', user ? 'logged in' : 'not logged in');
    trackFunnelPrimaryCtaClick({
      cta_id: user ? 'free_trial_select_template' : 'free_trial_start_free',
      cta_label: user ? '테마 선택하기' : '무료로 시작하기',
      location: 'free_trial_modal',
      destination: user ? '/explore' : '/auth/login',
      cta_variant: 'free-start',
    });

    if (user) {
      // 이미 로그인된 경우: 바로 템플릿 선택 모달로
      localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
      onStartTrial();
    } else {
      // 미로그인: Google OAuth 로그인 시작
      setIsLoggingIn(true);
      try {
        await login('google');
        // login()은 리다이렉트를 발생시키므로 여기서는 실행되지 않음
        // 리다이렉트 후 돌아오면 useEffect에서 user 상태 변화를 감지하여 onStartTrial() 호출
      } catch (error) {
        console.error('[FreeTrialModal] Login failed:', error);
        setIsLoggingIn(false);
      }
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[100] pointer-events-auto">
      {/* Card */}
      <div
        className={`w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200 transition-all duration-300 ${
          isClosing ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100 animate-slide-up'
        }`}
      >
        <div className="p-6 flex flex-col items-center text-center">
          {/* Title */}
          <h2 className="text-xl font-bold text-neutral-950 mb-2">3일 무료체험으로 시작하세요</h2>

          {/* Subtitle */}
          <p className="text-sm text-neutral-600 leading-relaxed mb-4">
            Full 기능을 3일간 무료로 체험해보세요.
            <br />
            카드 등록 없이 바로 시작!
          </p>

          {/* Image */}
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-xl flex items-center justify-center mb-4">
            <div className="text-center">
              <div className="text-5xl mb-1">🎨</div>
              <p className="text-xs text-neutral-500 font-medium">디자인 시스템</p>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleCTA}
            disabled={isLoggingIn}
            className="w-full inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-neutral-800 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {isLoggingIn ? '로그인 중...' : user ? '테마 선택하기' : '무료로 시작하기'}
          </button>

          <p className="text-xs text-neutral-400 mt-3">
            {user ? '이미 로그인되어 있습니다' : 'Google 계정으로 간편하게 시작'}
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Helper: localStorage에서 무료 체험 모달을 본 적이 있는지 확인
 */
export function hasSeenFreeTrialModal(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }
  return localStorage.getItem(LOCAL_STORAGE_KEY) === 'true';
}
