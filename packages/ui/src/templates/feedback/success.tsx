/**
 * @tekton/ui - Success Template
 * SPEC-UI-002: Feedback Screen Template
 *
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 * [TAG-UI002-035] 성공 상태 템플릿 구현
 * [TAG-UI002-001] ScreenTemplate interface 준수
 * [TAG-UI002-002] Tekton 레이아웃 토큰 사용
 * [TAG-UI002-003] AI 커스터마이징 경계 정의 (texts, options, slots)
 * [TAG-UI002-004] 필수 컴포넌트 검증 (Button)
 * [TAG-UI002-005] 반응형 브레이크포인트 지원
 * [TAG-UI002-006] WCAG 2.1 AA 준수
 *
 * WHY: 성공 템플릿이 작업 완료 피드백 UX를 보장
 * IMPACT: 템플릿 오류 시 사용자 작업 성공 인지 불가
 */

import { Button } from '../../components/button';
import type { ScreenTemplate, ScreenTemplateProps } from '../types';
import { DEFAULT_RESPONSIVE_LAYOUT } from '../types';

/**
 * Success Template Component
 */
export function SuccessTemplateComponent({
  children,
  className = '',
  slots = {},
  texts = {},
  options = {},
}: ScreenTemplateProps) {
  const title = texts.title || 'Success!';
  const message = texts.message || 'Your action was completed successfully';
  const ctaLabel = texts.cta_label || 'Continue';
  const showCta = options.show_cta ?? true;

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-[var(--tekton-spacing-4)] ${className}`}
    >
      <div className="max-w-md text-center space-y-[var(--tekton-spacing-6)]">
        {/* Success Icon */}
        {slots.icon || (
          <div className="flex justify-center">
            <div className="rounded-full bg-[var(--tekton-bg-success)] bg-opacity-10 p-[var(--tekton-spacing-4)]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-[var(--tekton-text-success)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        )}

        {/* Success Message */}
        <div className="space-y-[var(--tekton-spacing-2)]">
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-[var(--tekton-text-muted-foreground)]">{message}</p>
        </div>

        {/* Success Details */}
        {slots.details && (
          <div className="text-left bg-[var(--tekton-bg-muted)] p-[var(--tekton-spacing-4)] rounded-[var(--tekton-radius-md)] text-sm">
            {slots.details}
          </div>
        )}

        {/* CTA Button */}
        {showCta && (
          <div>
            <Button className="w-full" size="lg">
              {ctaLabel}
            </Button>
          </div>
        )}

        {/* Additional Actions */}
        {slots.additionalActions && (
          <div className="flex flex-col gap-[var(--tekton-spacing-3)]">
            {slots.additionalActions}
          </div>
        )}
      </div>
      {children}
    </div>
  );
}

/**
 * Success Template Definition
 */
export const SuccessTemplate: ScreenTemplate = {
  id: 'feedback.success',
  name: 'Success',
  category: 'feedback',
  description: 'Success state screen with confirmation message',

  skeleton: {
    shell: 'centered',
    page: 'feedback-page',
    sections: [
      {
        id: 'success-message',
        name: 'Success Message',
        slot: 'main',
        required: true,
        Component: SuccessTemplateComponent,
      },
    ],
  },

  layout: {
    type: 'centered',
    responsive: DEFAULT_RESPONSIVE_LAYOUT,
  },

  customizable: {
    texts: ['title', 'message', 'cta_label'],
    optional: ['show_cta'],
    slots: ['icon', 'details', 'additionalActions'],
  },

  requiredComponents: ['Button'],

  Component: SuccessTemplateComponent,

  version: '1.0.0',
  created: '2026-02-01',
  updated: '2026-02-01',
  tags: ['feedback', 'success', 'confirmation', 'state'],
};
