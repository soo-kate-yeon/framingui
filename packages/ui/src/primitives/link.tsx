/**
 * @tekton/ui - Link Component
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

const linkVariants = cva(
  'transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'text-[var(--link-foreground)] hover:text-[var(--link-hover-foreground)] underline-offset-4 hover:underline',
        muted:
          'text-[var(--link-muted-foreground)] hover:text-[var(--link-muted-hover-foreground)] underline-offset-4 hover:underline',
        subtle:
          'text-[var(--link-subtle-foreground)] hover:text-[var(--link-subtle-hover-foreground)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface LinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof linkVariants> {}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, ...props }, ref) => {
    return <a className={cn(linkVariants({ variant, className }))} ref={ref} {...props} />;
  }
);
Link.displayName = 'Link';

export { Link, linkVariants };
