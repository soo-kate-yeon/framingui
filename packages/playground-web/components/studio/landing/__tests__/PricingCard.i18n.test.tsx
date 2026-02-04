/**
 * TAG: TAG-STUDIO-001-E006 (Pricing Display)
 * TAG: TAG-STUDIO-001-S001 (License Management)
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * Tests for PricingCardI18n component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { PricingCardI18n } from '../PricingCard.i18n';

const messages = {
  studio: {
    landing: {
      pricing: {
        single: {
          tier: 'Single',
          features: ['1 template license', '1 year of updates', 'Email support'],
        },
        buyNow: 'Buy Now',
        manageLicense: 'Manage License',
      },
    },
  },
};

const messagesKo = {
  studio: {
    landing: {
      pricing: {
        single: {
          tier: '싱글',
          features: ['템플릿 라이선스 1개', '1년 업데이트', '이메일 지원'],
        },
        buyNow: '지금 구매',
        manageLicense: '라이선스 관리',
      },
    },
  },
};

function renderWithIntl(ui: React.ReactElement, locale = 'en') {
  return render(
    <NextIntlClientProvider locale={locale} messages={locale === 'ko' ? messagesKo : messages}>
      {ui}
    </NextIntlClientProvider>
  );
}

describe('PricingCardI18n', () => {
  describe('English translations', () => {
    it('should render tier name and price in English', () => {
      renderWithIntl(<PricingCardI18n tier="Single" price={59} />);

      expect(screen.getByText('Single')).toBeInTheDocument();
      expect(screen.getByText('$59')).toBeInTheDocument();
    });

    it('should render features in English', () => {
      renderWithIntl(<PricingCardI18n tier="Single" price={59} />);

      expect(screen.getByText('1 template license')).toBeInTheDocument();
      expect(screen.getByText('1 year of updates')).toBeInTheDocument();
      expect(screen.getByText('Email support')).toBeInTheDocument();
    });

    it('should show "Buy Now" button in English when no license', () => {
      renderWithIntl(<PricingCardI18n tier="Single" price={59} hasLicense={false} />);

      expect(screen.getByText('Buy Now')).toBeInTheDocument();
    });

    it('should show "Manage License" button in English when has license', () => {
      renderWithIntl(<PricingCardI18n tier="Single" price={59} hasLicense={true} />);

      expect(screen.getByText('Manage License')).toBeInTheDocument();
    });
  });

  describe('Korean translations', () => {
    it('should render tier name and features in Korean', () => {
      renderWithIntl(<PricingCardI18n tier="Single" price={59} />, 'ko');

      expect(screen.getByText('싱글')).toBeInTheDocument();
      expect(screen.getByText('템플릿 라이선스 1개')).toBeInTheDocument();
    });

    it('should show "지금 구매" button in Korean', () => {
      renderWithIntl(<PricingCardI18n tier="Single" price={59} hasLicense={false} />, 'ko');

      expect(screen.getByText('지금 구매')).toBeInTheDocument();
    });

    it('should show "라이선스 관리" button in Korean', () => {
      renderWithIntl(<PricingCardI18n tier="Single" price={59} hasLicense={true} />, 'ko');

      expect(screen.getByText('라이선스 관리')).toBeInTheDocument();
    });
  });

  describe('Interactivity', () => {
    it('should call onPurchase when buy button is clicked', async () => {
      const user = userEvent.setup();
      const onPurchase = vi.fn();
      renderWithIntl(
        <PricingCardI18n tier="Single" price={59} onPurchase={onPurchase} />
      );

      await user.click(screen.getByText('Buy Now'));
      expect(onPurchase).toHaveBeenCalledWith('Single');
    });

    it('should call onManage when manage button is clicked', async () => {
      const user = userEvent.setup();
      const onManage = vi.fn();
      renderWithIntl(
        <PricingCardI18n tier="Single" price={59} hasLicense={true} onManage={onManage} />
      );

      await user.click(screen.getByText('Manage License'));
      expect(onManage).toHaveBeenCalledOnce();
    });
  });
});
