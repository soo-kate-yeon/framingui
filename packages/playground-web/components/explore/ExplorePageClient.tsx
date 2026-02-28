/**
 * ExplorePageClient - Explore 페이지 클라이언트 로직
 *
 * 기능:
 * - 무료 체험 모달 플로우 관리
 * - 사용자 인증 상태 및 라이선스 확인
 * - localStorage 기반 중복 표시 방지
 */

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  FreeTrialModal,
  hasSeenFreeTrialModal,
  TemplateSelectModal,
  TrialCompleteModal,
} from '../modals';
import type { TemplateData } from '../../data/templates';

// ============================================================================
// Types
// ============================================================================

type ModalState = 'free-trial' | 'template-select' | 'trial-complete' | null;

interface ExplorePageClientProps {
  children: React.ReactNode;
}

// ============================================================================
// Component
// ============================================================================

export function ExplorePageClient({ children }: ExplorePageClientProps) {
  const { user, userData, isLoading } = useAuth();
  const [currentModal, setCurrentModal] = useState<ModalState>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);

  // 무료 체험 모달 표시 조건 체크
  useEffect(() => {
    // 로딩 중이면 대기
    if (isLoading) {
      return undefined;
    }

    // 이미 모달을 본 경우 표시 안 함
    if (hasSeenFreeTrialModal()) {
      console.log('[ExplorePageClient] User has already seen free trial modal');
      return undefined;
    }

    // 조건 확인:
    // 1. 미로그인 OR
    // 2. 로그인했지만 라이선스가 하나도 없는 경우
    const hasAnyLicense = userData?.licenses && userData.licenses.length > 0;
    const shouldShowModal = !user || !hasAnyLicense;

    if (shouldShowModal) {
      console.log(
        '[ExplorePageClient] Showing free trial modal after delay',
        'user:',
        user ? 'logged in' : 'not logged in',
        'hasLicense:',
        hasAnyLicense
      );

      // 1-2초 후 모달 표시
      const timer = setTimeout(() => {
        setCurrentModal('free-trial');
      }, 1500); // 1.5초 후 표시

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [user, userData, isLoading]);

  // 모달 플로우 핸들러
  const handleStartTrial = () => {
    console.log('[ExplorePageClient] Moving to template selection');
    setCurrentModal('template-select');
  };

  const handleTemplateSelected = (template: TemplateData) => {
    console.log('[ExplorePageClient] Template selected:', template.id);
    setSelectedTemplate(template);
    setCurrentModal('trial-complete');
  };

  const handleCloseModal = () => {
    console.log('[ExplorePageClient] Closing modal:', currentModal);
    setCurrentModal(null);
    setSelectedTemplate(null);
  };

  return (
    <>
      {/* 원래 페이지 콘텐츠 */}
      {children}

      {/* 무료 체험 모달 플로우 */}
      <FreeTrialModal
        isOpen={currentModal === 'free-trial'}
        onClose={handleCloseModal}
        onStartTrial={handleStartTrial}
      />

      <TemplateSelectModal
        isOpen={currentModal === 'template-select'}
        onClose={handleCloseModal}
        onContinue={handleTemplateSelected}
      />

      <TrialCompleteModal
        isOpen={currentModal === 'trial-complete'}
        onClose={handleCloseModal}
        selectedTemplate={selectedTemplate}
      />
    </>
  );
}
