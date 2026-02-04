/**
 * LandingTopNav Component Tests
 * SPEC-STUDIO-001: TAG-STUDIO-001-U002, TAG-STUDIO-001-E001, TAG-STUDIO-001-E002
 *
 * Tests for landing page top navigation with anchor links and CTA buttons
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { LandingTopNav } from '../LandingTopNav';

describe('LandingTopNav', () => {
  describe('[TAG-STUDIO-001-U002] Navigation Links', () => {
    it('should render About anchor link', () => {
      render(<LandingTopNav />);
      const aboutLink = screen.getByRole('link', { name: /about/i });
      expect(aboutLink).toBeInTheDocument();
      expect(aboutLink).toHaveAttribute('href', '#about');
    });

    it('should render How to use anchor link', () => {
      render(<LandingTopNav />);
      const howToUseLink = screen.getByRole('link', { name: /how to use/i });
      expect(howToUseLink).toBeInTheDocument();
      expect(howToUseLink).toHaveAttribute('href', '#how-to-use');
    });

    it('should render Documentation anchor link', () => {
      render(<LandingTopNav />);
      const docsLink = screen.getByRole('link', { name: /documentation/i });
      expect(docsLink).toBeInTheDocument();
      expect(docsLink).toHaveAttribute('href', '#documentation');
    });
  });

  describe('[TAG-STUDIO-001-E001] DEMO Button Interaction', () => {
    it('should render DEMO CTA button', () => {
      render(<LandingTopNav />);
      const demoButton = screen.getByRole('button', { name: /demo/i });
      expect(demoButton).toBeInTheDocument();
    });

    it('should call onDemoClick when DEMO button is clicked', async () => {
      const user = userEvent.setup();
      const onDemoClick = vi.fn();
      render(<LandingTopNav onDemoClick={onDemoClick} />);

      const demoButton = screen.getByRole('button', { name: /demo/i });
      await user.click(demoButton);

      expect(onDemoClick).toHaveBeenCalledOnce();
    });
  });

  describe('[TAG-STUDIO-001-E002] BUY Button Interaction', () => {
    it('should render BUY CTA button', () => {
      render(<LandingTopNav />);
      const buyButton = screen.getByRole('button', { name: /buy/i });
      expect(buyButton).toBeInTheDocument();
    });

    it('should call onBuyClick when BUY button is clicked', async () => {
      const user = userEvent.setup();
      const onBuyClick = vi.fn();
      render(<LandingTopNav onBuyClick={onBuyClick} />);

      const buyButton = screen.getByRole('button', { name: /buy/i });
      await user.click(buyButton);

      expect(onBuyClick).toHaveBeenCalledOnce();
    });
  });

  describe('Responsive Design', () => {
    it('should render with responsive styles', () => {
      const { container } = render(<LandingTopNav />);
      const nav = container.querySelector('nav');
      expect(nav).toHaveClass('flex', 'items-center', 'justify-between');
    });

    it('should render logo', () => {
      render(<LandingTopNav templateName="Test Template" />);
      expect(screen.getByText(/test template/i)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA labels', () => {
      render(<LandingTopNav />);
      const nav = screen.getByRole('navigation');
      expect(nav).toBeInTheDocument();
    });

    it('should be keyboard navigable', async () => {
      const user = userEvent.setup();
      const onDemoClick = vi.fn();
      render(<LandingTopNav onDemoClick={onDemoClick} />);

      const demoButton = screen.getByRole('button', { name: /demo/i });
      demoButton.focus();
      expect(demoButton).toHaveFocus();

      await user.keyboard('{Enter}');
      expect(onDemoClick).toHaveBeenCalledOnce();
    });
  });
});
