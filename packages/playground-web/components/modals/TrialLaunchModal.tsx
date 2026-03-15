'use client';

/**
 * TrialLaunchModal
 *
 * 랜딩 히어로 "3일 무료체험" CTA 클릭 후 표시되는 모달.
 * Step 1: 템플릿 선택 (하나만 가능)
 * Step 2: 확인 → POST /api/licenses/trial → 성공 시 onActivated 호출
 */

import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { useGlobalLanguage } from '../../contexts/GlobalLanguageContext';

interface Template {
  id: string;
  name: string;
  thumbnail?: string;
}

interface TrialLaunchModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: Template[];
  /** 체험 활성화 성공 시 선택된 templateId 전달 */
  onActivated: (templateId: string, templateName: string) => void;
}

const CONTENT = {
  en: {
    title: 'Start Your 3-Day Free Trial',
    subtitle: 'Pick one template to try for free.',
    notice: 'Free trial is limited to 1 template. Choose carefully.',
    step2Title: 'Start free trial with this template?',
    step2Desc: (name: string) =>
      `You'll get full access to "${name}" for 3 days. This is a one-time offer.`,
    selectBtn: 'Next',
    confirmBtn: 'Start Free Trial',
    back: 'Back',
    activating: 'Activating…',
    errorAlready: 'You have already used your free trial.',
    errorGeneric: 'Something went wrong. Please try again.',
  },
  ko: {
    title: '3일 무료체험 시작하기',
    subtitle: '체험할 템플릿 하나를 선택해주세요.',
    notice: '무료체험은 템플릿 1개에 대해서만 가능해요. 신중하게 선택해주세요.',
    step2Title: '이 템플릿으로 무료체험을 시작할까요?',
    step2Desc: (name: string) =>
      `"${name}"을 3일간 무료로 사용할 수 있어요. 무료체험은 1회만 제공됩니다.`,
    selectBtn: '다음',
    confirmBtn: '무료체험 시작',
    back: '뒤로',
    activating: '활성화 중…',
    errorAlready: '이미 무료체험을 사용하셨어요.',
    errorGeneric: '오류가 발생했어요. 다시 시도해주세요.',
  },
};

export function TrialLaunchModal({
  isOpen,
  onClose,
  templates,
  onActivated,
}: TrialLaunchModalProps) {
  const { locale } = useGlobalLanguage();
  const c = CONTENT[locale];
  const [step, setStep] = useState<'select' | 'confirm'>('select');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isActivating, setIsActivating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) {
    return null;
  }

  const selectedTemplate = templates.find((t) => t.id === selectedId);

  const handleClose = () => {
    setStep('select');
    setSelectedId(null);
    setError(null);
    onClose();
  };

  const handleConfirm = async () => {
    if (!selectedTemplate) {
      return;
    }
    setIsActivating(true);
    setError(null);

    try {
      const res = await fetch('/api/licenses/trial', { method: 'POST' });
      if (res.ok) {
        onActivated(selectedTemplate.id, selectedTemplate.name);
        handleClose();
      } else {
        const body = (await res.json().catch(() => ({}))) as { error?: string };
        if (res.status === 409 || body.error === 'trial_already_exists') {
          setError(c.errorAlready);
        } else {
          setError(c.errorGeneric);
        }
      }
    } catch {
      setError(c.errorGeneric);
    } finally {
      setIsActivating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-950/30 backdrop-blur-sm" onClick={handleClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Close */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 transition-colors z-10"
        >
          <X size={18} />
        </button>

        <div className="p-6 sm:p-8">
          {step === 'select' ? (
            <>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-1">
                {c.title}
              </h2>
              <p className="text-sm text-neutral-500 mb-1">{c.subtitle}</p>
              {/* Notice */}
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2 mb-5">
                <span className="text-amber-500 mt-0.5 shrink-0">⚠</span>
                <p className="text-xs text-amber-700 leading-relaxed">{c.notice}</p>
              </div>

              {/* Template list */}
              <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1 mb-6">
                {templates.map((t) => {
                  const isSelected = selectedId === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setSelectedId(t.id)}
                      className={`flex items-center gap-3 w-full text-left px-4 py-3 rounded-2xl border transition-all ${
                        isSelected
                          ? 'border-neutral-950 bg-neutral-950 text-white'
                          : 'border-neutral-200 bg-white hover:border-neutral-400 text-neutral-950'
                      }`}
                    >
                      <span className="flex-1 text-sm font-medium">{t.name}</span>
                      {isSelected && <Check size={16} className="shrink-0 text-white" />}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setStep('confirm')}
                disabled={!selectedId}
                className="w-full inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {c.selectBtn}
              </button>
            </>
          ) : (
            <>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">
                {c.step2Title}
              </h2>
              <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                {c.step2Desc(selectedTemplate?.name ?? '')}
              </p>

              {error && <p className="text-sm text-red-600 font-medium mb-4">{error}</p>}

              <div className="flex flex-col gap-2">
                <button
                  onClick={handleConfirm}
                  disabled={isActivating}
                  className="w-full inline-flex items-center justify-center rounded-full bg-neutral-950 px-6 py-3.5 text-sm font-semibold text-white hover:bg-neutral-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isActivating ? c.activating : c.confirmBtn}
                </button>
                <button
                  onClick={() => {
                    setStep('select');
                    setError(null);
                  }}
                  className="w-full inline-flex items-center justify-center rounded-full border border-neutral-200 px-6 py-3.5 text-sm font-medium text-neutral-600 hover:bg-neutral-50 transition-colors"
                >
                  {c.back}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
