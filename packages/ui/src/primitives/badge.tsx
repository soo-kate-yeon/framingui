/**
 * @tekton/ui - Badge Component
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
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-[var(--badge-default-background)] text-[var(--badge-default-foreground)]',
        secondary:
          'border-transparent bg-[var(--badge-secondary-background)] text-[var(--badge-secondary-foreground)]',
        destructive:
          'border-transparent bg-[var(--badge-destructive-background)] text-[var(--badge-destructive-foreground)]',
        outline: 'border-[var(--badge-outline-border)] text-[var(--badge-outline-foreground)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
