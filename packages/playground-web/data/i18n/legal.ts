/**
 * Legal Pages i18n Content
 *
 * 법적 페이지(Terms, Privacy, Refund)의 메타데이터 및 UI 라벨 관리
 * 실제 법적 콘텐츠는 docs/legal/en 및 docs/legal/ko에 마크다운으로 저장
 */

import type { GlobalLocale } from '../../contexts/GlobalLanguageContext';

export interface LegalPageContent {
  // 페이지 메타데이터
  pages: {
    terms: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
    refund: {
      title: string;
      description: string;
    };
  };
  // UI 라벨
  ui: {
    backButton: string;
    darkModeToggle: string;
    languageToggle: string;
    tocToggle: string;
    tocHeading: string;
    lastUpdated: string;
    effectiveDate: string;
    contactUs: string;
  };
  // 공통 법적 고지
  notices: {
    languageDisclaimer: string;
    copyrightNotice: string;
  };
}

export const legalPageContent: Record<GlobalLocale, LegalPageContent> = {
  en: {
    pages: {
      terms: {
        title: 'Terms of Service',
        description:
          'Terms and conditions governing your use of Tekton services, including account registration, licensing, intellectual property rights, and dispute resolution.',
      },
      privacy: {
        title: 'Privacy Policy',
        description:
          'How Tekton collects, uses, and protects your personal information, including data retention, user rights, and cross-border data transfers.',
      },
      refund: {
        title: 'Refund Policy',
        description:
          'Refund eligibility and process for digital products purchased on Tekton, including subscription cancellation policies and chargeback guidelines.',
      },
    },
    ui: {
      backButton: 'Go back',
      darkModeToggle: 'Toggle dark mode',
      languageToggle: 'Toggle language',
      tocToggle: 'Toggle table of contents',
      tocHeading: 'On This Page',
      lastUpdated: 'Last Updated',
      effectiveDate: 'Effective Date',
      contactUs: 'Contact Us',
    },
    notices: {
      languageDisclaimer:
        'This document is provided in both English and Korean. In case of discrepancy, the Korean version shall prevail for users in the Republic of Korea.',
      copyrightNotice: '© 2026 Morak. All rights reserved.',
    },
  },
  ko: {
    pages: {
      terms: {
        title: '이용약관',
        description:
          'Tekton 서비스 이용에 관한 약관으로, 계정 등록, 라이선스, 지적재산권, 분쟁 해결 등의 내용을 포함합니다.',
      },
      privacy: {
        title: '개인정보처리방침',
        description:
          'Tekton이 개인정보를 수집, 이용, 보호하는 방법으로, 데이터 보유 기간, 정보주체의 권리, 국외 이전 등의 내용을 포함합니다.',
      },
      refund: {
        title: '환불정책',
        description:
          'Tekton에서 구매한 디지털 상품의 환불 자격 및 절차로, 구독 취소 정책 및 지불 거절 가이드라인을 포함합니다.',
      },
    },
    ui: {
      backButton: '뒤로가기',
      darkModeToggle: '다크모드 전환',
      languageToggle: '언어 전환',
      tocToggle: '목차 토글',
      tocHeading: '목차',
      lastUpdated: '최종 수정일',
      effectiveDate: '시행일',
      contactUs: '문의처',
    },
    notices: {
      languageDisclaimer:
        '본 문서는 한국어와 영어로 제공됩니다. 내용의 불일치가 있을 경우, 대한민국 이용자에 대해서는 한국어 버전이 우선합니다.',
      copyrightNotice: '© 2026 모락. 모든 권리 보유.',
    },
  },
};

export function getLegalPageContent(locale: GlobalLocale): LegalPageContent {
  return legalPageContent[locale];
}

// 타입 헬퍼: slug를 기반으로 페이지 콘텐츠 추출
export type LegalSlug = 'terms-of-service' | 'privacy-policy' | 'refund-policy';

export function getLegalPageMeta(slug: LegalSlug, locale: GlobalLocale) {
  const content = getLegalPageContent(locale);
  const slugMap: Record<LegalSlug, keyof LegalPageContent['pages']> = {
    'terms-of-service': 'terms',
    'privacy-policy': 'privacy',
    'refund-policy': 'refund',
  };
  const pageKey = slugMap[slug];
  return content.pages[pageKey];
}
