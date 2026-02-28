/**
 * FreeTrialModal - 무료 체험 시작 모달 (Bottom Sheet)
 *
 * 기능:
 * - 라이선스가 없는 사용자에게 표시
 * - localStorage로 중복 표시 방지
 * - 로그인 상태에 따라 분기 (로그인 → 템플릿 선택, 미로그인 → 로그인 플로우)
 */

'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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

export function FreeTrialModal({ isOpen, onClose, onStartTrial }: FreeTrialModalProps) {
  const { user, login } = useAuth();
  const [isClosing, setIsClosing] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // 모달이 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // 로그인 완료 시 자동으로 템플릿 선택 모달로 진입
  useEffect(() => {
    if (isOpen && user && !isLoggingIn) {
      console.log('[FreeTrialModal] User logged in, proceeding to template selection');
      onStartTrial();
    }
  }, [user, isOpen, isLoggingIn, onStartTrial]);

  const handleClose = () => {
    setIsClosing(true);
    // localStorage에 "본 적 있음" 표시
    localStorage.setItem(LOCAL_STORAGE_KEY, 'true');
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200);
  };

  const handleCTA = async () => {
    console.log('[FreeTrialModal] CTA clicked, user:', user ? 'logged in' : 'not logged in');

    if (user) {
      // 이미 로그인된 경우: 바로 템플릿 선택 모달로
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
    <div className="fixed inset-0 z-[100] flex items-end justify-center pointer-events-none">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-neutral-950/20 backdrop-blur-sm transition-opacity duration-200 pointer-events-auto ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Bottom Sheet */}
      <div
        className={`relative w-full max-w-2xl bg-white rounded-t-3xl sm:rounded-3xl sm:mb-6 shadow-2xl overflow-hidden pointer-events-auto transition-all duration-300 ${
          isClosing ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100 animate-slide-up'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors z-10"
          aria-label="닫기"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 md:gap-8">
            {/* Left: Content */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 mb-3">
                3일 무료체험으로 시작하세요
              </h2>
              <p className="text-base sm:text-lg text-neutral-600 leading-relaxed mb-6">
                Full 기능을 3일간 무료로 체험해보세요. 카드 등록 없이 바로 시작!
              </p>

              {/* CTA Button */}
              <button
                onClick={handleCTA}
                disabled={isLoggingIn}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-neutral-800 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {isLoggingIn ? '로그인 중...' : user ? '테마 선택하기' : '무료로 시작하기'}
              </button>

              <p className="text-xs text-neutral-500 mt-4">
                {user ? '이미 로그인되어 있습니다' : 'Google 계정으로 간편하게 시작할 수 있어요'}
              </p>
            </div>

            {/* Right: Image Placeholder (responsive) */}
            <div className="hidden md:flex items-center justify-center">
              <div className="w-full aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-2">🎨</div>
                  <p className="text-sm text-neutral-500 font-medium">Free Trial</p>
                </div>
              </div>
            </div>
          </div>
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
