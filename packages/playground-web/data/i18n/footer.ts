/**
 * Footer i18n Content
 *
 * Footer 컴포넌트의 모든 텍스트 콘텐츠를 영어/한국어/일본어로 관리
 */

import type { GlobalLocale } from '../../contexts/GlobalLanguageContext';

export interface FooterContent {
  brandName: string;
  copyright: string;
  links: {
    pricing: string;
    docs: string;
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
    brandName: 'framingui',
    copyright: 'framingui. All rights reserved.',
    links: {
      pricing: 'Pricing',
      docs: 'Docs',
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
    brandName: 'framingui',
    copyright: 'framingui. 모든 권리 보유.',
    links: {
      pricing: '가격',
      docs: '문서',
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
  ja: {
    brandName: 'framingui',
    copyright: 'framingui. All rights reserved.',
    links: {
      pricing: '料金',
      docs: 'ドキュメント',
      blog: 'ブログ',
      terms: '利用規約',
      privacy: 'プライバシー',
      refund: '返金ポリシー',
    },
    businessInfo: {
      operatedBy: '運営: Morak',
      representative: '代表: Sooyeon Kim',
      address: '住所: 30, Art Center-daero 97beon-gil, Yeonsu-gu, Incheon, Republic of Korea',
      email: 'メール: soo.kate.yeon@gmail.com',
    },
  },
};

export function getFooterContent(locale: GlobalLocale): FooterContent {
  return footerContent[locale];
}
