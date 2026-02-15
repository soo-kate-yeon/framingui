/**
<<<<<<< HEAD
 * @tekton/ui - Card Component
 * [SPEC-COMPONENT-001-C] [COMPOSED]
=======
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 *
 * WHY: 코드 품질 및 추적성을 보장
 * IMPACT: TAG 누락 시 요구사항 추적 불가
 * @tekton-ui/ui - Card Component
 * SPEC-UI-001: shadcn-ui Fork & Token Integration
>>>>>>> master
 */

import * as React from 'react';
import { cn } from '../lib/utils';

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
<<<<<<< HEAD
        'rounded-[var(--radius-md)] p-6',
        'bg-[var(--card-background)]',
        'text-[var(--card-foreground)]',
        'border border-[var(--card-border)]',
        'shadow-[var(--card-shadow)]',
=======
        'rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-card)] text-[var(--tekton-bg-card-foreground)] shadow-sm',
>>>>>>> master
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
<<<<<<< HEAD
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
=======
    <div
      ref={ref}
      className={cn(
        'flex flex-col space-y-[var(--tekton-spacing-2)] p-[var(--tekton-spacing-6)]',
        className
      )}
      {...props}
    />
>>>>>>> master
  )
);
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
<<<<<<< HEAD
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        'text-[var(--card-title-foreground)]',
        className
      )}
=======
      className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
>>>>>>> master
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
<<<<<<< HEAD
    className={cn('text-sm', 'text-[var(--card-description-foreground)]', className)}
=======
    className={cn('text-sm text-[var(--tekton-bg-muted-foreground)]', className)}
>>>>>>> master
    {...props}
  />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
<<<<<<< HEAD
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
=======
    <div ref={ref} className={cn('p-[var(--tekton-spacing-6)] pt-0', className)} {...props} />
>>>>>>> master
  )
);
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
<<<<<<< HEAD
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
=======
    <div
      ref={ref}
      className={cn('flex items-center p-[var(--tekton-spacing-6)] pt-0', className)}
      {...props}
    />
>>>>>>> master
  )
);
CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
