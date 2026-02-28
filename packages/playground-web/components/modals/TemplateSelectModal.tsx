/**
 * TemplateSelectModal - 템플릿 선택 모달
 *
 * 기능:
 * - 모든 템플릿을 그리드로 표시
 * - 단일 선택 (only one selectable)
 * - Continue 버튼 활성화
 */

'use client';

import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';
import { getAllTemplates, type TemplateData } from '../../data/templates';

// ============================================================================
// Types
// ============================================================================

interface TemplateSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (template: TemplateData) => void; // 선택된 템플릿과 함께 진행
}

// ============================================================================
// Component
// ============================================================================

export function TemplateSelectModal({ isOpen, onClose, onContinue }: TemplateSelectModalProps) {
  const [templates] = useState<TemplateData[]>(getAllTemplates());
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);
  const [isClosing, setIsClosing] = useState(false);

  // 모달이 열릴 때 body 스크롤 잠금 및 선택 초기화
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
      setSelectedTemplate(null); // 모달 열릴 때마다 선택 초기화
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setSelectedTemplate(null);
    }, 200);
  };

  const handleContinue = () => {
    if (!selectedTemplate) {
      return;
    }

    console.log('[TemplateSelectModal] Selected template:', selectedTemplate.id);
    onContinue(selectedTemplate);
  };

  if (!isOpen) {
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
        className={`relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-200 ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100 animate-scaleIn'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-b border-neutral-200">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950">
              사용해보고 싶은 테마를 선택하세요
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-2">
              3일간 무제한으로 사용할 수 있어요
            </p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors"
            aria-label="닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {templates.map((template) => {
              const isSelected = selectedTemplate?.id === template.id;
              return (
                <button
                  key={template.id}
                  onClick={() => setSelectedTemplate(template)}
                  className={`relative group text-left rounded-2xl border-2 transition-all overflow-hidden ${
                    isSelected
                      ? 'border-neutral-950 bg-neutral-50 shadow-lg'
                      : 'border-neutral-200 bg-white hover:border-neutral-400 hover:shadow-md'
                  }`}
                >
                  {/* Thumbnail */}
                  <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <img
                      src={template.screenshots[0]}
                      alt={template.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        const placeholder = document.createElement('div');
                        placeholder.className =
                          'absolute inset-0 flex flex-col items-center justify-center bg-neutral-100';
                        placeholder.innerHTML = `
                          <span class="text-xs text-neutral-500 uppercase tracking-widest font-medium">${template.name}</span>
                          <span class="text-[10px] text-neutral-400 mt-1">Thumbnail</span>
                        `;
                        e.currentTarget.parentElement?.appendChild(placeholder);
                      }}
                    />

                    {/* Selection Indicator */}
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-neutral-950 flex items-center justify-center shadow-lg animate-scaleIn">
                        <Check size={16} className="text-white" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-neutral-950 mb-1 tracking-tight">
                      {template.name}
                    </h3>
                    <p className="text-sm text-neutral-600 line-clamp-2">
                      {template.taglineKo || template.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 sm:p-8 border-t border-neutral-200 bg-neutral-50">
          <p className="text-sm text-neutral-600">
            {selectedTemplate ? (
              <>
                <span className="font-semibold text-neutral-950">{selectedTemplate.name}</span>{' '}
                선택됨
              </>
            ) : (
              '테마를 선택해주세요'
            )}
          </p>
          <button
            onClick={handleContinue}
            disabled={!selectedTemplate}
            className="inline-flex items-center justify-center rounded-full bg-neutral-950 px-8 py-3 text-base font-medium text-white shadow-lg hover:bg-neutral-800 hover:-translate-y-0.5 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            계속하기
          </button>
        </div>
      </div>
    </div>
  );
}
