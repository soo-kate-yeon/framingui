/**
<<<<<<< HEAD
 * @tekton/ui - Table Component
 * [SPEC-COMPONENT-001-C] [COMPOSED]
=======
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 *
 * WHY: 코드 품질 및 추적성을 보장
 * IMPACT: TAG 누락 시 요구사항 추적 불가
 * @tekton-ui/ui - Table Component
 * SPEC-UI-001: shadcn-ui Fork & Token Integration
>>>>>>> master
 */

import * as React from 'react';
import { cn } from '../lib/utils';

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
<<<<<<< HEAD
      <table
        ref={ref}
        className={cn('w-full caption-bottom text-sm', 'text-[var(--table-foreground)]', className)}
        {...props}
      />
=======
      <table ref={ref} className={cn('w-full caption-bottom text-sm', className)} {...props} />
>>>>>>> master
    </div>
  )
);
Table.displayName = 'Table';

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
<<<<<<< HEAD
  <thead
    ref={ref}
    className={cn('[&_tr]:border-b', '[&_tr]:border-[var(--table-border)]', className)}
    {...props}
  />
=======
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
>>>>>>> master
));
TableHeader.displayName = 'TableHeader';

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn('[&_tr:last-child]:border-0', className)} {...props} />
));
TableBody.displayName = 'TableBody';

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
<<<<<<< HEAD
      'border-t border-[var(--table-border)]',
      'bg-[var(--table-footer-background)]',
      'font-medium',
      '[&>tr]:last:border-b-0',
=======
      'border-t bg-[var(--tekton-bg-muted)]/50 font-medium [&>tr]:last:border-b-0',
>>>>>>> master
      className
    )}
    {...props}
  />
));
TableFooter.displayName = 'TableFooter';

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
<<<<<<< HEAD
        'border-b border-[var(--table-border)]',
        'transition-colors',
        'hover:bg-[var(--table-row-hover-background)]',
        'data-[state=selected]:bg-[var(--table-row-selected-background)]',
=======
        'border-b border-[var(--tekton-border-default)] transition-colors hover:bg-[var(--tekton-bg-muted)]/50 data-[state=selected]:bg-[var(--tekton-bg-muted)]',
>>>>>>> master
        className
      )}
      {...props}
    />
  )
);
TableRow.displayName = 'TableRow';

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
<<<<<<< HEAD
      'h-12 px-4 text-left align-middle font-medium',
      'text-[var(--table-head-foreground)]',
      '[&:has([role=checkbox])]:pr-0',
=======
      'h-12 px-[var(--tekton-spacing-4)] text-left align-middle font-medium text-[var(--tekton-bg-muted-foreground)] [&:has([role=checkbox])]:pr-0',
>>>>>>> master
      className
    )}
    {...props}
  />
));
TableHead.displayName = 'TableHead';

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
<<<<<<< HEAD
    className={cn('p-4 align-middle', '[&:has([role=checkbox])]:pr-0', className)}
=======
    className={cn(
      'p-[var(--tekton-spacing-4)] align-middle [&:has([role=checkbox])]:pr-0',
      className
    )}
>>>>>>> master
    {...props}
  />
));
TableCell.displayName = 'TableCell';

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
<<<<<<< HEAD
    className={cn('mt-4 text-sm', 'text-[var(--table-caption-foreground)]', className)}
=======
    className={cn(
      'mt-[var(--tekton-spacing-4)] text-sm text-[var(--tekton-bg-muted-foreground)]',
      className
    )}
>>>>>>> master
    {...props}
  />
));
TableCaption.displayName = 'TableCaption';

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption };
