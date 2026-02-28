/**
 * TAG: TAG-STUDIO-001-E004 (Code Display)
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * Code block component with copy functionality and i18n support
 */

'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';

export interface CodeBlockI18nProps {
  code: string;
  language?: string;
  className?: string;
}

export function CodeBlockI18n({ code, language, className }: CodeBlockI18nProps) {
  const t = useTranslations('studio.landing.codeBlock');
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
    <div className={clsx('relative p-4 bg-neutral-900 rounded-lg overflow-x-auto', className)}>
      {language && (
        <div className="absolute top-2 left-4 text-xs uppercase tracking-wider text-neutral-400">
          {language}
        </div>
      )}
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? t('copied') : t('copy')}
        className="absolute top-2 right-4 p-2 text-neutral-400 hover:text-neutral-100 transition-colors"
      >
        {copied ? <Check size={18} /> : <Copy size={18} />}
      </button>
      <pre className="mt-6">
        <code className="font-mono text-sm text-neutral-100">{code}</code>
      </pre>
    </div>
  );
}
