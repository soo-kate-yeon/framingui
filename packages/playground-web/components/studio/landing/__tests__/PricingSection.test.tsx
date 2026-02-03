/**
 * PricingSection Component Tests
 * SPEC-STUDIO-001: 3 pricing tiers section
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PricingSection } from '../PricingSection';

describe('PricingSection', () => {
  describe('Content Rendering', () => {
    it('should render section heading', () => {
      render(<PricingSection />);
      expect(screen.getByRole('heading', { name: /pricing/i })).toBeInTheDocument();
    });

    it('should render all three pricing tiers', () => {
      render(<PricingSection />);
      expect(screen.getByText('Single')).toBeInTheDocument();
      expect(screen.getByText('Double')).toBeInTheDocument();
      expect(screen.getByText('Creator Pass')).toBeInTheDocument();
    });

    it('should display correct prices', () => {
      render(<PricingSection />);
      expect(screen.getByText('$59')).toBeInTheDocument();
      expect(screen.getByText('$99')).toBeInTheDocument();
      expect(screen.getByText('$149')).toBeInTheDocument();
    });
  });

  describe('Responsive Layout', () => {
    it('should have responsive grid layout', () => {
      const { container } = render(<PricingSection />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toHaveClass('grid-cols-1', 'md:grid-cols-3');
    });

    it('should have section id for anchor navigation', () => {
      const { container } = render(<PricingSection />);
      const section = container.querySelector('#pricing');
      expect(section).toBeInTheDocument();
    });
  });
});
