/**
 * CodeBlock Component
 * SPEC-STUDIO-001: TAG-STUDIO-001-E004
 *
 * Code block with copy-to-clipboard functionality
 */

'use client';

import { useState } from 'react';
import { clsx } from 'clsx';
import { Copy, Check } from 'lucide-react';

export interface CodeBlockProps {
  /** Code content to display */
  code: string;
  /** Programming language (optional label) */
  language?: string;
  /** Additional CSS classes */
  className?: string;
}

/**
 * CodeBlock - Display code with copy button
 * [TAG-STUDIO-001-E004] Clipboard copy with success feedback
 */
export function CodeBlock({ code, language, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  return (
    <div
      className={clsx(
        'relative p-3 sm:p-4 bg-neutral-900 rounded-lg overflow-x-auto',
        className
      )}
    >
      {/* Language Label */}
      {language && (
        <div className="absolute top-2 left-3 sm:left-4 text-xs uppercase tracking-wider text-neutral-400">
          {language}
        </div>
      )}

      {/* Copy Button */}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? 'Copied!' : 'Copy code to clipboard'}
        className="absolute top-2 right-2 p-1.5 sm:p-2 text-neutral-400 hover:text-white transition-colors rounded"
      >
        {copied ? <Check size={16} /> : <Copy size={16} />}
      </button>

      {/* Code Content - Mobile Optimized */}
      <pre className="mt-6 overflow-x-auto">
        <code className="font-mono text-xs sm:text-sm text-neutral-100 break-all sm:break-normal">
          {code}
        </code>
      </pre>
    </div>
  );
}
