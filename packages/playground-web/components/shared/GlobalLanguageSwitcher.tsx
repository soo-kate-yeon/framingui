/**
 * Global Language Switcher
 *
 * 전역 언어 전환 컴포넌트 (메인 페이지, 랜딩, Footer 등)
 */

'use client';

import { Globe2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@framingui/ui';
import { useGlobalLanguage, type GlobalLocale } from '../../contexts/GlobalLanguageContext';

interface GlobalLanguageSwitcherProps {
  className?: string;
  compact?: boolean;
}

export function GlobalLanguageSwitcher({
  className = '',
  compact = false,
}: GlobalLanguageSwitcherProps) {
  const { locale, setLocale } = useGlobalLanguage();

  return (
    <Select value={locale} onValueChange={(value) => setLocale(value as GlobalLocale)}>
      <SelectTrigger
        aria-label="Select language"
        className={`${
          compact ? 'h-8 px-2.5 text-xs' : 'h-9 px-3 text-sm'
        } w-[110px] sm:w-[120px] rounded-none border-neutral-200 bg-white text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 font-medium tracking-tight shadow-none hover:border-neutral-900 focus:ring-neutral-950 ${className}`}
      >
        <span className="flex items-center gap-2 truncate">
          <Globe2 className="h-3.5 w-3.5 opacity-60 shrink-0" />
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent className="rounded-none border-neutral-200 bg-white text-neutral-950 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
        <SelectItem value="ko">한국어</SelectItem>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="ja">日本語</SelectItem>
      </SelectContent>
    </Select>
  );
}
