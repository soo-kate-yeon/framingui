/**
 * [TAG-005] Calendar Component - Date selection component
 * [TAG-Q-001] 모든 요구사항 TAG 주석 포함
 * [TAG-Q-002] TypeScript strict mode 오류 없이 컴파일
 * [TAG-Q-004] TRUST 5 Framework 5개 Pillar 준수
 *
 * WHY: Provides accessible date selection with keyboard navigation
 * IMPACT: Improves date input UX and accessibility compliance
 *
 * @tekton-ui/ui - Calendar Component
 * SPEC-UI-001: shadcn-ui Fork & Token Integration
 *
 * Pattern: react-day-picker v9 + Tekton tokens
 */

import { DayPicker, type DayPickerProps } from 'react-day-picker';
import { cn } from '../lib/utils';

export type CalendarProps = DayPickerProps;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'relative flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        month_caption: 'flex justify-center items-center h-7',
        caption_label: 'text-sm font-medium text-[var(--tekton-bg-foreground)]',
        nav: 'absolute top-0 inset-x-0 flex items-center justify-between h-7 z-10',
        button_previous: cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--tekton-radius-md)] text-sm font-medium ring-offset-[var(--tekton-bg-background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tekton-border-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          'hover:bg-[var(--tekton-bg-accent)] hover:text-[var(--tekton-bg-accent-foreground)]',
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        button_next: cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--tekton-radius-md)] text-sm font-medium ring-offset-[var(--tekton-bg-background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tekton-border-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          'hover:bg-[var(--tekton-bg-accent)] hover:text-[var(--tekton-bg-accent-foreground)]',
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        month_grid: 'w-full border-collapse space-y-1',
        weekdays: 'flex',
        weekday:
          'text-[var(--tekton-bg-muted-foreground)] rounded-[var(--tekton-radius-md)] w-9 font-normal text-[0.8rem]',
        week: 'flex w-full mt-2',
        day: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-[var(--tekton-radius-md)] [&:has([aria-selected].day-outside)]:bg-[var(--tekton-bg-accent)]/50 [&:has([aria-selected])]:bg-[var(--tekton-bg-accent)] first:[&:has([aria-selected])]:rounded-l-[var(--tekton-radius-md)] last:[&:has([aria-selected])]:rounded-r-[var(--tekton-radius-md)] focus-within:relative focus-within:z-20',
        day_button: cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-[var(--tekton-radius-md)] text-sm font-medium ring-offset-[var(--tekton-bg-background)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--tekton-border-ring)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          'hover:bg-[var(--tekton-bg-accent)] hover:text-[var(--tekton-bg-accent-foreground)]',
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        range_end: 'day-range-end',
        selected:
          'rounded-[var(--tekton-radius-md)] bg-[var(--tekton-bg-primary)] text-[var(--tekton-bg-primary-foreground)] hover:bg-[var(--tekton-bg-primary)] hover:text-[var(--tekton-bg-primary-foreground)] focus:bg-[var(--tekton-bg-primary)] focus:text-[var(--tekton-bg-primary-foreground)]',
        today:
          'rounded-[var(--tekton-radius-md)] bg-[var(--tekton-bg-accent)] text-[var(--tekton-bg-accent-foreground)]',
        outside:
          'day-outside text-[var(--tekton-bg-muted-foreground)] opacity-50 aria-selected:bg-[var(--tekton-bg-accent)]/50 aria-selected:text-[var(--tekton-bg-muted-foreground)] aria-selected:opacity-30',
        disabled: 'text-[var(--tekton-bg-muted-foreground)] opacity-50',
        range_middle:
          'aria-selected:bg-[var(--tekton-bg-accent)] aria-selected:text-[var(--tekton-bg-accent-foreground)]',
        hidden: 'invisible',
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation }) => {
          if (orientation === 'left') {
            return (
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                />
              </svg>
            );
          }
          return (
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
            >
              <path
                d="M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          );
        },
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
