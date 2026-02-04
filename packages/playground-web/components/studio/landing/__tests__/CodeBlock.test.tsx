/**
 * CodeBlock Component Tests
 * SPEC-STUDIO-001: TAG-STUDIO-001-E004
 *
 * Tests for code block with copy-to-clipboard functionality
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { CodeBlock } from '../CodeBlock';

// Mock clipboard API
const mockWriteText = vi.fn(() => Promise.resolve());

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: mockWriteText,
  },
  writable: true,
  configurable: true,
});

describe('CodeBlock', () => {
  const sampleCode = 'npm install @example/package';

  describe('Content Rendering', () => {
    it('should render code content', () => {
      render(<CodeBlock code={sampleCode} />);
      expect(screen.getByText(sampleCode)).toBeInTheDocument();
    });

    it('should render with optional language label', () => {
      render(<CodeBlock code={sampleCode} language="bash" />);
      expect(screen.getByText('bash')).toBeInTheDocument();
    });

    it('should render without language label when not provided', () => {
      render(<CodeBlock code={sampleCode} />);
      const languageLabel = screen.queryByText('bash');
      expect(languageLabel).not.toBeInTheDocument();
    });
  });

  describe('[TAG-STUDIO-001-E004] Copy to Clipboard Functionality', () => {
    it('should render copy button', () => {
      render(<CodeBlock code={sampleCode} />);
      const copyButton = screen.getByRole('button');
      expect(copyButton).toHaveAttribute('aria-label', 'Copy code to clipboard');
    });

    it('should show success feedback after copying', async () => {
      const user = userEvent.setup();
      render(<CodeBlock code={sampleCode} />);

      const copyButton = screen.getByRole('button');
      await user.click(copyButton);

      await waitFor(() => {
        expect(copyButton).toHaveAttribute('aria-label', 'Copied!');
      });
    });
  });

  describe('Styling', () => {
    it('should have monospace font for code', () => {
      const { container } = render(<CodeBlock code={sampleCode} />);
      const codeElement = container.querySelector('code');
      expect(codeElement).toHaveClass('font-mono');
    });

    it('should have responsive padding', () => {
      const { container } = render(<CodeBlock code={sampleCode} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('p-4');
    });

    it('should apply custom className', () => {
      const { container } = render(<CodeBlock code={sampleCode} className="custom-class" />);
      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('should have accessible button label', () => {
      render(<CodeBlock code={sampleCode} />);
      const copyButton = screen.getByRole('button');
      expect(copyButton).toHaveAttribute('aria-label', 'Copy code to clipboard');
    });

    it('should be keyboard navigable', () => {
      render(<CodeBlock code={sampleCode} />);
      const copyButton = screen.getByRole('button');
      copyButton.focus();
      expect(copyButton).toHaveFocus();
    });
  });
});
