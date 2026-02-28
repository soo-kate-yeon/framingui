/**
 * PricingCard Component Tests
 * SPEC-STUDIO-001: TAG-STUDIO-001-S001 (License-aware UI)
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { PricingCard } from '../PricingCard';

describe('PricingCard', () => {
  const defaultProps = {
    tier: 'Single' as const,
    price: 59,
    features: ['1 template', '1 year updates'],
  };

  describe('Content Rendering', () => {
    it('should render tier name', () => {
      render(<PricingCard {...defaultProps} />);
      expect(screen.getByText('Single')).toBeInTheDocument();
    });

    it('should render price', () => {
      render(<PricingCard {...defaultProps} />);
      expect(screen.getByText('$59')).toBeInTheDocument();
    });

    it('should render all features', () => {
      render(<PricingCard {...defaultProps} />);
      expect(screen.getByText('1 template')).toBeInTheDocument();
      expect(screen.getByText('1 year updates')).toBeInTheDocument();
    });
  });

  describe('[TAG-STUDIO-001-S001] License State UI', () => {
    it('should show Buy Now button when no license', () => {
      render(<PricingCard {...defaultProps} hasLicense={false} />);
      expect(screen.getByRole('button', { name: /buy now/i })).toBeInTheDocument();
    });

    it('should show Manage License button when has license', () => {
      render(<PricingCard {...defaultProps} hasLicense={true} />);
      expect(screen.getByRole('button', { name: /manage license/i })).toBeInTheDocument();
    });

    it('should call onPurchase when Buy Now clicked', async () => {
      const user = userEvent.setup();
      const onPurchase = vi.fn();
      render(<PricingCard {...defaultProps} onPurchase={onPurchase} />);

      await user.click(screen.getByRole('button', { name: /buy now/i }));
      expect(onPurchase).toHaveBeenCalledWith('Single');
    });
  });

  describe('Styling', () => {
    it('should highlight featured tier', () => {
      const { container } = render(<PricingCard {...defaultProps} featured />);
      const card = container.firstChild;
      expect(card).toHaveClass('ring-2');
    });
  });
});
