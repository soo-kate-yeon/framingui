/**
 * Footer i18n Content
 *
 * Footer 컴포넌트의 모든 텍스트 콘텐츠를 영어/한국어로 관리
 */

import type { GlobalLocale } from '../../contexts/GlobalLanguageContext';

export interface FooterContent {
  brandName: string;
  copyright: string;
  links: {
    pricing: string;
    blog: string;
    terms: string;
    privacy: string;
    refund: string;
  };
  businessInfo: {
    operatedBy: string;
    representative: string;
    address: string;
    email: string;
  };
}

export const footerContent: Record<GlobalLocale, FooterContent> = {
  en: {
    brandName: 'tekton/ui',
    copyright: 'tekton/ui. All rights reserved.',
    links: {
      pricing: 'Pricing',
      blog: 'Blog',
      terms: 'Terms',
      privacy: 'Privacy',
      refund: 'Refund',
    },
    businessInfo: {
      operatedBy: 'Operated by Morak',
      representative: 'Representative: Sooyeon Kim',
      address: 'Address: 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea',
      email: 'Email: soo.kate.yeon@gmail.com',
    },
  },
  ko: {
    brandName: 'tekton/ui',
    copyright: 'tekton/ui. 모든 권리 보유.',
    links: {
      pricing: '가격',
      blog: '블로그',
      terms: '이용약관',
      privacy: '개인정보처리방침',
      refund: '환불정책',
    },
    businessInfo: {
      operatedBy: '모락(Morak) 운영',
      representative: '대표: 김수연',
      address: '주소: 인천광역시 연수구 아트센터대로97번길 30',
      email: '이메일: soo.kate.yeon@gmail.com',
    },
  },
};

export function getFooterContent(locale: GlobalLocale): FooterContent {
  return footerContent[locale];
}
