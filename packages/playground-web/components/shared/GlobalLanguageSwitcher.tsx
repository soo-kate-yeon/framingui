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
          compact ? 'h-8 px-2.5' : 'h-10 px-3.5'
        } w-[110px] sm:w-[120px] inline-flex items-center justify-between border border-neutral-200 bg-white !font-sans !leading-none text-sm font-medium tracking-tight text-neutral-950 shadow-none outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100 ${className}`}
      >
        <div className="flex items-center gap-1.5 truncate">
          <Globe2 className="h-3.5 w-3.5 opacity-60 shrink-0" />
          <SelectValue className="truncate !font-sans !leading-none mt-0.5" />
        </div>
      </SelectTrigger>
      <SelectContent className="z-50 min-w-[8rem] overflow-hidden rounded-2xl border border-neutral-200 bg-white p-1 text-neutral-950 shadow-md dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
        <SelectItem
          value="ko"
          className="rounded-lg focus:bg-neutral-100 dark:focus:bg-neutral-800 !font-sans"
        >
          한국어
        </SelectItem>
        <SelectItem
          value="en"
          className="rounded-lg focus:bg-neutral-100 dark:focus:bg-neutral-800 !font-sans"
        >
          English
        </SelectItem>
        <SelectItem
          value="ja"
          className="rounded-lg focus:bg-neutral-100 dark:focus:bg-neutral-800 !font-sans"
        >
          日本語
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
