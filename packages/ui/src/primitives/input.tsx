/**
 * @tekton/ui - Input Component
 * [SPEC-COMPONENT-001-C] [PRIMITIVE]
 *
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 *
 * WHY: 코드 품질 및 추적성을 보장
 * IMPACT: TAG 누락 시 요구사항 추적 불가
 */

import * as React from 'react';
import { cn } from '../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * Error state for validation
   */
  error?: boolean;
}

/**
 * Input component following SPEC-COMPONENT-001-B schema
 * - CSS Variables theming
 * - Error state styling
 * - WCAG 2.1 AA compliant
 */
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          'flex h-10 w-full rounded-[var(--radius-md)] px-3 py-2 text-sm',
          'transition-colors',
          'file:border-0 file:bg-transparent file:text-sm file:font-medium',
          'placeholder:text-[var(--input-placeholder)]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Themeable properties via CSS Variables
          'bg-[var(--input-background)]',
          'text-[var(--input-foreground)]',
          'border border-[var(--input-border)]',
          // Error state
          error
            ? 'border-[var(--input-error-border)] focus-visible:ring-[var(--input-error-ring)]'
            : 'focus-visible:ring-[var(--input-focus-ring)]',
          className
        )}
        ref={ref}
        aria-invalid={error}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };
