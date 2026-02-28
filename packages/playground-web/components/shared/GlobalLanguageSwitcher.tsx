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
          compact ? 'h-8 px-2' : 'h-10 px-3'
        } w-[110px] sm:w-[120px] items-center justify-between rounded-none border border-neutral-200 bg-white text-sm text-neutral-950 shadow-none outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 ${className}`}
      >
        <span className="flex items-center gap-2 truncate">
          <Globe2 className="h-3.5 w-3.5 opacity-60 shrink-0" />
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent className="z-50 min-w-[8rem] overflow-hidden rounded-none border border-neutral-200 bg-white p-1 text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
        <SelectItem
          value="ko"
          className="rounded-none focus:bg-neutral-100 dark:focus:bg-neutral-800"
        >
          한국어
        </SelectItem>
        <SelectItem
          value="en"
          className="rounded-none focus:bg-neutral-100 dark:focus:bg-neutral-800"
        >
          English
        </SelectItem>
        <SelectItem
          value="ja"
          className="rounded-none focus:bg-neutral-100 dark:focus:bg-neutral-800"
        >
          日本語
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
