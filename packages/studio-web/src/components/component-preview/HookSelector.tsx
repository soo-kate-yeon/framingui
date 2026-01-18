'use client';

import { forwardRef, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';
import { HOOK_METADATA, type HookName, type HookMeta } from '@/lib/component-preview';

export interface HookSelectorProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value: HookName | null;
  onChange: (hookName: HookName) => void;
}

const HookSelector = forwardRef<HTMLDivElement, HookSelectorProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const categories = [
      { key: 'form', label: 'Form' },
      { key: 'complex', label: 'Complex' },
      { key: 'overlay', label: 'Overlay' },
      { key: 'display', label: 'Display' },
    ] as const;

    const hooksByCategory = HOOK_METADATA.reduce((acc, hook) => {
      if (!acc[hook.category]) {
        acc[hook.category] = [];
      }
      acc[hook.category].push(hook);
      return acc;
    }, {} as Record<string, HookMeta[]>);

    return (
      <div ref={ref} className={cn('space-y-5', className)} {...props}>
        {categories.map((cat) => (
          <div key={cat.key}>
            <h4 className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.1em] mb-2.5 pb-1.5 border-b border-border/50">
              {cat.label}
            </h4>
            <div className="space-y-1.5">
              {hooksByCategory[cat.key]?.map((hook) => (
                <button
                  key={hook.name}
                  onClick={() => onChange(hook.name)}
                  className={cn(
                    'w-full px-3 py-2.5 rounded-lg text-left text-sm transition-all',
                    'hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-ring/50',
                    value === hook.name
                      ? 'bg-primary/10 text-foreground ring-1 ring-primary/20'
                      : 'bg-transparent hover:bg-muted/50'
                  )}
                >
                  <div className={cn(
                    'font-medium text-[13px]',
                    value === hook.name ? 'text-primary' : ''
                  )}>
                    {hook.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                    {hook.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
);
HookSelector.displayName = 'HookSelector';

export { HookSelector };
