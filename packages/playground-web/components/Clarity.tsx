/**
 * Microsoft Clarity Component
 *
 * Usage: Add <Clarity /> in layout.tsx
 * Required env: NEXT_PUBLIC_CLARITY_PROJECT_ID
 *
 * WHY: 사용자 세션 녹화 및 히트맵 분석
 * IMPACT: UX 개선을 위한 사용자 행동 분석
 */

'use client';

import { useEffect } from 'react';
import Clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

export function ClarityProvider() {
  useEffect(() => {
    if (CLARITY_PROJECT_ID) {
      Clarity.init(CLARITY_PROJECT_ID);
    }
  }, []);

  return null;
}

// 커스텀 이벤트 추적 유틸리티
export const clarityEvent = {
  // 커스텀 태그 설정 (사용자 세그먼트용)
  setTag: (key: string, value: string) => {
    if (typeof window !== 'undefined' && CLARITY_PROJECT_ID) {
      Clarity.setTag(key, value);
    }
  },
  // 사용자 식별 (로그인 시)
  identify: (userId: string, sessionId?: string, pageId?: string) => {
    if (typeof window !== 'undefined' && CLARITY_PROJECT_ID) {
      Clarity.identify(userId, sessionId, pageId);
    }
  },
  // 동의 설정 (GDPR 등)
  consent: () => {
    if (typeof window !== 'undefined' && CLARITY_PROJECT_ID) {
      Clarity.consent();
    }
  },
  // 업그레이드 세션 (중요 사용자 표시)
  upgrade: (reason: string) => {
    if (typeof window !== 'undefined' && CLARITY_PROJECT_ID) {
      Clarity.upgrade(reason);
    }
  },
};
