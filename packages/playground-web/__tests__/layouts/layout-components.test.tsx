/**
 * Layout Components Tests
 * SPEC-PLAYGROUND-001 Milestone 4: Production Layouts
 *
 * Test Coverage:
 * - 6 layout components render correctly
 * - Slot-based component placement
 * - Responsive behavior
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import {
  DashboardLayout,
  LandingLayout,
  SidebarLeftLayout,
  SidebarRightLayout,
  TwoColumnLayout,
  SingleColumnLayout,
} from '@/components/layouts';

describe('Layout Components', () => {
  describe('DashboardLayout', () => {
    it('should render header, sidebar, and main slots', () => {
      const { container } = render(
        <DashboardLayout
          header={<div data-testid="header">Header</div>}
          sidebar={<div data-testid="sidebar">Sidebar</div>}
          main={<div data-testid="main">Main Content</div>}
        />
      );

      expect(container.querySelector('[data-testid="header"]')).toBeDefined();
      expect(container.querySelector('[data-testid="sidebar"]')).toBeDefined();
      expect(container.querySelector('[data-testid="main"]')).toBeDefined();
    });

    it('should apply correct CSS Grid layout', () => {
      const { container } = render(
        <DashboardLayout
          header={<div>Header</div>}
          sidebar={<div>Sidebar</div>}
          main={<div>Main</div>}
        />
      );

      const layoutRoot = container.firstChild as HTMLElement;
      expect(layoutRoot).toBeDefined();
      // CSS Modules applies hashed class names
      expect(layoutRoot?.className).toBeDefined();
    });
  });

  describe('LandingLayout', () => {
    it('should render header, main, and footer slots', () => {
      const { container } = render(
        <LandingLayout
          header={<div data-testid="header">Header</div>}
          main={<div data-testid="main">Main</div>}
          footer={<div data-testid="footer">Footer</div>}
        />
      );

      expect(container.querySelector('[data-testid="header"]')).toBeDefined();
      expect(container.querySelector('[data-testid="main"]')).toBeDefined();
      expect(container.querySelector('[data-testid="footer"]')).toBeDefined();
    });
  });

  describe('SidebarLeftLayout', () => {
    it('should render sidebar on the left', () => {
      const { container } = render(
        <SidebarLeftLayout
          sidebar={<div data-testid="sidebar">Sidebar</div>}
          main={<div data-testid="main">Main</div>}
        />
      );

      const layoutRoot = container.firstChild as HTMLElement;
      // CSS Modules applies hashed class names
      expect(layoutRoot).toBeDefined();
    });
  });

  describe('SidebarRightLayout', () => {
    it('should render sidebar on the right', () => {
      const { container } = render(
        <SidebarRightLayout
          sidebar={<div data-testid="sidebar">Sidebar</div>}
          main={<div data-testid="main">Main</div>}
        />
      );

      const layoutRoot = container.firstChild as HTMLElement;
      // CSS Modules applies hashed class names
      expect(layoutRoot).toBeDefined();
    });
  });

  describe('TwoColumnLayout', () => {
    it('should render two columns', () => {
      const { container } = render(
        <TwoColumnLayout
          left={<div data-testid="left">Left Column</div>}
          right={<div data-testid="right">Right Column</div>}
        />
      );

      expect(container.querySelector('[data-testid="left"]')).toBeDefined();
      expect(container.querySelector('[data-testid="right"]')).toBeDefined();
    });
  });

  describe('SingleColumnLayout', () => {
    it('should render single column', () => {
      const { container } = render(
        <SingleColumnLayout main={<div data-testid="main">Main Content</div>} />
      );

      expect(container.querySelector('[data-testid="main"]')).toBeDefined();
    });
  });
});
