/**
 * ComponentOverview Component Tests
 * SPEC-STUDIO-001: TAG-STUDIO-001-U004 (Responsive Design)
 *
 * Tests for component preview grid with responsive layout
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ComponentOverview } from '../ComponentOverview';

describe('ComponentOverview', () => {
  const mockComponents = [
    { id: 'dashboard', name: 'Dashboard', category: 'core' as const },
    { id: 'login', name: 'Login', category: 'auth' as const },
    { id: 'profile', name: 'Profile', category: 'user' as const },
  ];

  describe('Content Rendering', () => {
    it('should render all component cards', () => {
      render(<ComponentOverview components={mockComponents} />);
      expect(screen.getByText('Dashboard')).toBeInTheDocument();
      expect(screen.getByText('Login')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
    });

    it('should render empty state when no components', () => {
      render(<ComponentOverview components={[]} />);
      expect(screen.getByText(/no components/i)).toBeInTheDocument();
    });

    it('should render component categories', () => {
      render(<ComponentOverview components={mockComponents} />);
      expect(screen.getByText('core')).toBeInTheDocument();
      expect(screen.getByText('auth')).toBeInTheDocument();
      expect(screen.getByText('user')).toBeInTheDocument();
    });
  });

  describe('[TAG-STUDIO-001-U004] Responsive Grid Layout', () => {
    it('should have responsive grid classes', () => {
      const { container } = render(<ComponentOverview components={mockComponents} />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toHaveClass('grid');
    });

    it('should apply single column for mobile', () => {
      const { container } = render(<ComponentOverview components={mockComponents} />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid).toHaveClass('grid-cols-1');
    });

    it('should apply two columns for tablet', () => {
      const { container } = render(<ComponentOverview components={mockComponents} />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/md:grid-cols-2/);
    });

    it('should apply three columns for desktop', () => {
      const { container } = render(<ComponentOverview components={mockComponents} />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/lg:grid-cols-3/);
    });
  });

  describe('Component Cards', () => {
    it('should render component preview placeholder', () => {
      render(<ComponentOverview components={mockComponents} />);
      const cards = screen.getAllByTestId('component-card');
      expect(cards).toHaveLength(3);
    });

    it('should show component names as headings', () => {
      render(<ComponentOverview components={mockComponents} />);
      expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Login' })).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should apply gap between grid items', () => {
      const { container } = render(<ComponentOverview components={mockComponents} />);
      const grid = container.querySelector('[class*="grid"]');
      expect(grid?.className).toMatch(/gap-/);
    });

    it('should apply custom className', () => {
      const { container } = render(
        <ComponentOverview components={mockComponents} className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('should use semantic heading structure', () => {
      render(<ComponentOverview components={mockComponents} />);
      const headings = screen.getAllByRole('heading', { level: 3 });
      expect(headings).toHaveLength(3);
    });

    it('should have descriptive test ids', () => {
      render(<ComponentOverview components={mockComponents} />);
      const cards = screen.getAllByTestId('component-card');
      expect(cards[0]).toHaveAttribute('data-component-id', 'dashboard');
    });
  });
});
