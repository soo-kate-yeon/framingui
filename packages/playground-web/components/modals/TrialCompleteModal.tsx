/**
 * TrialCompleteModal - 무료 체험 시작 완료 모달
 *
 * 기능:
 * - 선택된 템플릿 정보 표시
 * - MCP 설정 가이드 제공
 * - localStorage에 trial license 저장 (TODO: 백엔드 API로 교체 필요)
 */

'use client';

import { useEffect, useState } from 'react';
import { X, Copy, CheckCircle2 } from 'lucide-react';
import type { TemplateData } from '../../data/templates';

// ============================================================================
// Types
// ============================================================================

interface TrialCompleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTemplate: TemplateData | null;
}

// ============================================================================
// Constants
// ============================================================================

const MCP_COMMAND = 'npx @framingui/cli init';

// ============================================================================
// Component
// ============================================================================

export function TrialCompleteModal({ isOpen, onClose, selectedTemplate }: TrialCompleteModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  const [copied, setCopied] = useState(false);

  // 모달이 열릴 때 trial license 생성 및 body 스크롤 잠금
  useEffect(() => {
    if (isOpen && selectedTemplate) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);

      // TODO: Replace with backend API call to create trial license
      // POST /api/licenses/trial { userId, templateId, durationDays: 3 }
      const startDate = new Date();
      const endDate = new Date();
      endDate.setDate(endDate.getDate() + 3); // 3일 후

      const trialLicense = {
        templateId: selectedTemplate.id,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        status: 'active',
      };

      // localStorage에 임시 저장 (백엔드 구현 전까지 mock)
      localStorage.setItem(`trialLicense_${selectedTemplate.id}`, JSON.stringify(trialLicense));

      console.log('[TrialCompleteModal] Trial license created:', trialLicense);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, selectedTemplate]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      // 페이지 새로고침하여 라이선스 상태 반영
      window.location.reload();
    }, 200);
  };

  const handleCopyCommand = async () => {
    try {
      await navigator.clipboard.writeText(MCP_COMMAND);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('[TrialCompleteModal] Failed to copy command:', error);
    }
  };

  if (!isOpen || !selectedTemplate) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-neutral-950/20 backdrop-blur-sm transition-opacity duration-200 ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={handleClose}
      />

      {/* Modal Container */}
      <div
        className={`relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-200 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-scaleIn'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors z-10"
          aria-label="닫기"
        >
          <X size={20} />
        </button>

        <div className="p-6 sm:p-8 md:p-10">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-emerald-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 text-center mb-2">
            무료체험이 시작되었습니다! 🎉
          </h2>

          {/* Body */}
          <p className="text-base sm:text-lg text-neutral-600 text-center mb-8">
            3일간 <span className="font-semibold text-neutral-950">{selectedTemplate.name}</span>의
            모든 기능을 사용할 수 있어요.
          </p>

          {/* MCP Setup Guide */}
          <div className="bg-neutral-50 rounded-2xl p-6 mb-6 border border-neutral-200">
            <h3 className="text-lg font-semibold text-neutral-950 mb-3">
              Claude Code / Cursor에서 MCP 연결하기
            </h3>

            <p className="text-sm text-neutral-600 mb-4 leading-relaxed">
              아래 명령어를 터미널에서 실행하여 FramingUI CLI를 설치하세요. 설치 후 Claude Code 또는
              Cursor에서 MCP 서버를 연결하면 자연어로 UI를 생성할 수 있어요.
            </p>

            {/* Command Block */}
            <div className="relative">
              <pre className="p-4 rounded-xl bg-neutral-950 text-neutral-50 text-sm font-mono overflow-x-auto">
                <code>{MCP_COMMAND}</code>
              </pre>
              <button
                onClick={handleCopyCommand}
                className="absolute top-2 right-2 p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 transition-colors"
                aria-label="명령어 복사"
              >
                {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
              </button>
            </div>

            {/* Brief Instructions */}
            <ol className="mt-4 space-y-2 text-sm text-neutral-600">
              <li className="flex gap-2">
                <span className="font-semibold text-neutral-950 shrink-0">1.</span>
                <span>터미널에서 위 명령어를 실행하여 FramingUI CLI를 설치합니다.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-neutral-950 shrink-0">2.</span>
                <span>
                  Claude Code 또는 Cursor의 MCP 설정에서{' '}
                  <code className="px-1.5 py-0.5 rounded bg-neutral-200 text-neutral-950 text-xs font-mono">
                    @framingui/cli
                  </code>{' '}
                  서버를 추가합니다.
                </span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-neutral-950 shrink-0">3.</span>
                <span>
                  "Use generate-blueprint tool with themeId: {selectedTemplate.id}"와 같이 요청하여
                  UI를 생성하세요!
                </span>
              </li>
            </ol>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleClose}
            className="w-full inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-4 text-base font-medium text-white shadow-lg hover:bg-neutral-800 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
          >
            시작하기
          </button>

          <p className="text-xs text-neutral-500 text-center mt-4">
            체험 기간은 {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('ko-KR')}
            까지입니다
          </p>
        </div>
      </div>
    </div>
  );
}
