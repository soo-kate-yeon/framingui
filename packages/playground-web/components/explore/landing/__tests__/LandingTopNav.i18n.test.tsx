/**
 * TAG: TAG-STUDIO-001-U002 (Top Navigation)
 * TAG: TAG-STUDIO-001-U003 (Internationalization Support)
 *
 * Tests for LandingTopNavI18n component
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import { LandingTopNavI18n } from '../LandingTopNav.i18n';

const messages = {
  studio: {
    landing: {
      nav: {
        about: 'About',
        howToUse: 'How to use',
        documentation: 'Documentation',
        demo: 'DEMO',
        buy: 'BUY',
      },
    },
  },
};

const messagesKo = {
  studio: {
    landing: {
      nav: {
        about: '소개',
        howToUse: '사용 방법',
        documentation: '문서',
        demo: '데모',
        buy: '구매',
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

describe('LandingTopNavI18n', () => {
  describe('English translations', () => {
    it('should render navigation links in English', () => {
      renderWithIntl(<LandingTopNavI18n />);

      expect(screen.getByText('About')).toBeInTheDocument();
      expect(screen.getByText('How to use')).toBeInTheDocument();
      expect(screen.getByText('Documentation')).toBeInTheDocument();
    });

    it('should render buttons in English', () => {
      renderWithIntl(<LandingTopNavI18n />);

      expect(screen.getByText('DEMO')).toBeInTheDocument();
      expect(screen.getByText('BUY')).toBeInTheDocument();
    });
  });

  describe('Korean translations', () => {
    it('should render navigation links in Korean', () => {
      renderWithIntl(<LandingTopNavI18n />, 'ko');

      expect(screen.getByText('소개')).toBeInTheDocument();
      expect(screen.getByText('사용 방법')).toBeInTheDocument();
      expect(screen.getByText('문서')).toBeInTheDocument();
    });

    it('should render buttons in Korean', () => {
      renderWithIntl(<LandingTopNavI18n />, 'ko');

      expect(screen.getByText('데모')).toBeInTheDocument();
      expect(screen.getByText('구매')).toBeInTheDocument();
    });
  });

  describe('Interactivity', () => {
    it('should call onDemoClick when DEMO button is clicked', async () => {
      const user = userEvent.setup();
      const onDemoClick = vi.fn();
      renderWithIntl(<LandingTopNavI18n onDemoClick={onDemoClick} />);

      await user.click(screen.getByText('DEMO'));
      expect(onDemoClick).toHaveBeenCalledOnce();
    });

    it('should call onBuyClick when BUY button is clicked', async () => {
      const user = userEvent.setup();
      const onBuyClick = vi.fn();
      renderWithIntl(<LandingTopNavI18n onBuyClick={onBuyClick} />);

      await user.click(screen.getByText('BUY'));
      expect(onBuyClick).toHaveBeenCalledOnce();
    });
  });
});
