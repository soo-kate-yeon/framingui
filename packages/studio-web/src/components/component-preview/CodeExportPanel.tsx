'use client';

import { forwardRef, type HTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils/cn';
import { useClipboard } from '@/hooks/useClipboard';
import type { GeneratedCode, CodeFormat } from '@/hooks/useCodeGeneration';

export interface CodeExportPanelProps extends HTMLAttributes<HTMLDivElement> {
  code: GeneratedCode;
}

const CodeExportPanel = forwardRef<HTMLDivElement, CodeExportPanelProps>(
  ({ className, code, ...props }, ref) => {
    const [activeTab, setActiveTab] = useState<CodeFormat>('jsx');
    const { copy, isCopied } = useClipboard();

    const tabs: { key: CodeFormat; label: string }[] = [
      { key: 'jsx', label: 'JSX' },
      { key: 'html', label: 'HTML' },
      { key: 'css', label: 'CSS' },
    ];

    const currentCode = code[activeTab];

    const handleCopy = async () => {
      await copy(currentCode);
    };

    return (
      <div
        ref={ref}
        className={cn('rounded-lg border overflow-hidden', className)}
        {...props}
      >
        {/* Tabs */}
        <div className="flex items-center justify-between border-b bg-muted/20">
          <div className="flex">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'px-5 py-3 text-xs font-medium uppercase tracking-wide transition-colors relative',
                  activeTab === tab.key
                    ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <button
            onClick={handleCopy}
            className={cn(
              'px-4 py-1.5 mr-3 text-xs font-medium rounded-md transition-all',
              isCopied
                ? 'bg-emerald-500/10 text-emerald-600'
                : 'bg-muted hover:bg-muted/80 text-muted-foreground hover:text-foreground'
            )}
          >
            {isCopied ? 'Copied!' : 'Copy Code'}
          </button>
        </div>

        {/* Code Display */}
        <pre className="p-5 overflow-auto text-sm bg-muted/10 max-h-[280px]">
          <code className="font-mono text-[13px] leading-relaxed text-foreground/90 whitespace-pre">
            {currentCode}
          </code>
        </pre>
      </div>
    );
  }
);
CodeExportPanel.displayName = 'CodeExportPanel';

export { CodeExportPanel };
