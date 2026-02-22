/**
 * SelectionBar Component
 * Double 패키지 선택 모드에서 하단에 표시되는 체크아웃 바
 *
 * 선택 상태 표시 + Paddle 체크아웃 연동
 */

'use client';

import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { usePaddle } from '../../hooks/usePaddle';
import { PADDLE_CONFIG } from '../../lib/paddle/config';
import { useStudioLanguage } from '../../contexts/StudioLanguageContext';

// ============================================================================
// Types
// ============================================================================

interface SelectionBarProps {
  /** 선택된 템플릿 ID 배열 */
  selectedTemplates: string[];
  /** 선택된 템플릿 이름 배열 */
  selectedNames: string[];
  /** 최대 선택 가능 수 */
  maxSelection: number;
}

// ============================================================================
// i18n
// ============================================================================

const messages = {
  en: {
    selected: (count: number, max: number) => `${count} of ${max} selected`,
    checkout: 'Checkout - $99',
    selectMore: (remaining: number) => `Select ${remaining} more`,
    loginRequired: 'Please log in to checkout',
  },
  ko: {
    selected: (count: number, max: number) => `${max}개 중 ${count}개 선택됨`,
    checkout: '결제하기 - $99',
    selectMore: (remaining: number) => `${remaining}개 더 선택하세요`,
    loginRequired: '결제하려면 로그인이 필요합니다',
  },
};

// ============================================================================
// Component
// ============================================================================

export function SelectionBar({
  selectedTemplates,
  selectedNames,
  maxSelection,
}: SelectionBarProps) {
  const { user } = useAuth();
  const { openCheckout, isReady: isPaddleReady } = usePaddle();
  const { locale } = useStudioLanguage();
  const t = messages[locale];

  const isComplete = selectedTemplates.length === maxSelection;
  const remaining = maxSelection - selectedTemplates.length;

  const handleCheckout = () => {
    if (!user) {
      alert(t.loginRequired);
      return;
    }

    if (!isPaddleReady) {
      console.error('[Paddle] Payment system is not ready');
      return;
    }

    const priceId = PADDLE_CONFIG.prices.double;
    if (!priceId) {
      console.error('[Paddle] Double price configuration missing');
      return;
    }

    openCheckout({
      priceId,
      userId: user.id,
      userEmail: user.email || '',
      themeId: selectedTemplates.join(','),
      tier: 'double',
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between gap-4">
        {/* 좌측: 선택 상태 */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-medium text-neutral-900">
            {t.selected(selectedTemplates.length, maxSelection)}
          </span>
          {selectedNames.length > 0 && (
            <span className="text-xs text-neutral-500 truncate">{selectedNames.join(', ')}</span>
          )}
        </div>

        {/* 우측: 체크아웃 버튼 */}
        <button
          onClick={handleCheckout}
          disabled={!isComplete}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-colors whitespace-nowrap ${
            isComplete
              ? 'bg-neutral-900 text-white hover:bg-neutral-800'
              : 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
          }`}
        >
          <ShoppingCart size={16} />
          {isComplete ? t.checkout : t.selectMore(remaining)}
        </button>
      </div>
    </div>
  );
}
