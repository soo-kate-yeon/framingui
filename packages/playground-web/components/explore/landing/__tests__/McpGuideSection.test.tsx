/**
 * McpGuideSection Component Tests
 * SPEC-STUDIO-001: Installation guide with CodeBlock integration
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { McpGuideSection } from '../McpGuideSection';

describe('McpGuideSection', () => {
  describe('Content Rendering', () => {
    it('should render section heading', () => {
      render(<McpGuideSection />);
      expect(screen.getByRole('heading', { name: /how to use/i })).toBeInTheDocument();
    });

    it('should render installation code block', () => {
      render(<McpGuideSection />);
      expect(screen.getByText(/npx @claude\/mcp-client/i)).toBeInTheDocument();
    });

    it('should render usage instructions', () => {
      render(<McpGuideSection />);
      expect(screen.getByText(/usage/i)).toBeInTheDocument();
    });
  });

  describe('Styling', () => {
    it('should have section id for anchor navigation', () => {
      const { container } = render(<McpGuideSection />);
      const section = container.querySelector('#how-to-use');
      expect(section).toBeInTheDocument();
    });
  });
});
