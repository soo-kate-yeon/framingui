/**
 * @tekton/ui - List Component
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

const List = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement> & { ordered?: boolean }
>(({ className, ordered = false, ...props }, ref) => {
  const Comp = ordered ? 'ol' : 'ul';

  return (
    <Comp
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={cn(
        'space-y-2',
        ordered ? 'list-decimal' : 'list-disc',
        'pl-6',
        'text-[var(--list-foreground)]',
        className
      )}
      {...props}
    />
  );
});
List.displayName = 'List';

const ListItem = React.forwardRef<HTMLLIElement, React.HTMLAttributes<HTMLLIElement>>(
  ({ className, ...props }, ref) => {
    return (
      <li ref={ref} className={cn('text-[var(--list-item-foreground)]', className)} {...props} />
    );
  }
);
ListItem.displayName = 'ListItem';

export { List, ListItem };
