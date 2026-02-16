'use client';

import Link from 'next/link';
import { useMemo, useState, useEffect } from 'react';
import { useGlobalLanguage } from '../../contexts/GlobalLanguageContext';
import { getFooterContent } from '../../data/i18n/footer';

interface FooterProps {
  className?: string;
}

/**
 * 배경색의 밝기를 계산하여 dark 모드인지 판단
 * @param color - RGB 또는 Hex 색상 문자열
 * @returns dark 모드 여부
 */
function isDarkColor(color: string): boolean {
  let r = 0,
    g = 0,
    b = 0;

  // RGB 형식 처리
  const rgbMatch = color.match(/\d+/g);
  if (rgbMatch && rgbMatch.length >= 3) {
    [r, g, b] = rgbMatch.slice(0, 3).map(Number) as [number, number, number];
  }
  // Hex 형식 처리 (#FFFFFF)
  else if (color.startsWith('#')) {
    const hex = color.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else {
    return false;
  }

  // 상대적 밝기 계산 (YIQ formula)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // 128 이하면 dark, 초과면 light
  return brightness <= 128;
}

export function Footer({ className = '' }: FooterProps) {
  const { locale } = useGlobalLanguage();
  const content = useMemo(() => getFooterContent(locale), [locale]);
  const [isDark, setIsDark] = useState(false); // 기본값: light

  const LEGAL_LINKS = useMemo(
    () => [
      { href: '/pricing', label: content.links.pricing },
      { href: '/blog', label: content.links.blog },
      { href: '/legal/terms-of-service', label: content.links.terms },
      { href: '/legal/privacy-policy', label: content.links.privacy },
      { href: '/legal/refund-policy', label: content.links.refund },
    ],
    [content]
  );

  useEffect(() => {
    let retryCount = 0;
    const MAX_RETRIES = 10; // 최대 10번 재시도 (2초)
    const RETRY_INTERVAL = 200; // 200ms 간격

    // 배경색 감지 - CSS 변수 또는 실제 배경색
    const detectBackgroundColor = () => {
      const rootStyles = window.getComputedStyle(document.documentElement);

      // 1. CSS 변수 --tekton-bg-canvas 확인
      let bgColor = rootStyles.getPropertyValue('--tekton-bg-canvas').trim();

      // CSS 변수가 없고 재시도 가능하면 재시도
      if (!bgColor && retryCount < MAX_RETRIES) {
        retryCount++;
        setTimeout(detectBackgroundColor, RETRY_INTERVAL);
        return;
      }

      // 2. CSS 변수가 없으면 body의 배경색 확인
      if (!bgColor) {
        bgColor = window.getComputedStyle(document.body).backgroundColor;
      }

      // 3. 여전히 없으면 첫 번째 자식 div의 배경색 확인
      if (!bgColor || bgColor === 'rgba(0, 0, 0, 0)' || bgColor === 'transparent') {
        const mainElement = document.querySelector('[class*="bg-"]');
        if (mainElement) {
          bgColor = window.getComputedStyle(mainElement).backgroundColor;
        }
      }

      if (bgColor) {
        setIsDark(isDarkColor(bgColor));
      }
    };

    // 초기 감지 (약간의 딜레이)
    const timer = setTimeout(detectBackgroundColor, 100);

    // 테마 변경 감지를 위한 Observer
    const observer = new MutationObserver(() => {
      retryCount = 0; // 재시도 카운터 리셋
      setTimeout(detectBackgroundColor, 50);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style', 'class'],
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  // 동적 클래스 생성
  const footerClasses = `border-t py-12 transition-colors ${
    isDark
      ? 'bg-neutral-900 text-neutral-100 border-neutral-800'
      : 'bg-white text-neutral-900 border-neutral-200'
  } ${className}`;

  return (
    <footer className={footerClasses}>
      <div className="container mx-auto px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          {/* Brand & Copyright */}
          <div>
            <div className="text-xl font-bold tracking-tighter mb-4">{content.brandName}</div>
            <p className={`text-sm mb-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              &copy; {new Date().getFullYear()} {content.copyright}
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-6 text-sm font-medium">
            {LEGAL_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${isDark ? 'hover:text-neutral-100' : 'hover:text-neutral-900'}`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Business Info (Legal Requirement) */}
        <div
          className={`pt-8 border-t text-xs space-y-1 ${isDark ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-400'}`}
        >
          <p className={`font-semibold ${isDark ? 'text-neutral-500' : 'text-neutral-500'}`}>
            {content.businessInfo.operatedBy}
          </p>
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-4">
            <p>{content.businessInfo.representative}</p>
          </div>
          <p>{content.businessInfo.address}</p>
          <p>{content.businessInfo.email}</p>
        </div>
      </div>
    </footer>
  );
}
