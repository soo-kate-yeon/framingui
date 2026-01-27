/**
 * BlueprintRenderer Tests
 * SPEC-PLAYGROUND-001 Milestone 5: Blueprint Renderer
 *
 * Test Coverage:
 * - Component resolution from @tekton/ui
 * - Recursive rendering of ComponentNode tree
 * - Props passing
 * - Unknown component handling
 */

import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BlueprintRenderer } from '@/components/renderer/blueprint-renderer';
import type { ComponentNode } from '@/lib/schemas';

describe('BlueprintRenderer', () => {
  it('should render Button component from @tekton/ui', () => {
    const node: ComponentNode = {
      type: 'Button',
      props: { variant: 'primary', children: 'Click Me' },
    };

    const { getByRole } = render(<BlueprintRenderer node={node} />);
    const button = getByRole('button');

    expect(button).toBeDefined();
    expect(button.textContent).toBe('Click Me');
  });

  it('should render Card component with nested children', () => {
    const node: ComponentNode = {
      type: 'Card',
      children: [
        {
          type: 'CardHeader',
          children: [{ type: 'CardTitle', props: { children: 'Test Card' } }],
        },
        {
          type: 'CardContent',
          props: { children: 'Card content here' },
        },
      ],
    };

    const { getByText } = render(<BlueprintRenderer node={node} />);

    expect(getByText('Test Card')).toBeDefined();
    expect(getByText('Card content here')).toBeDefined();
  });

  it('should handle text nodes in children array', () => {
    const node: ComponentNode = {
      type: 'Text',
      children: ['Plain text content'],
    };

    const { getByText } = render(<BlueprintRenderer node={node} />);
    expect(getByText('Plain text content')).toBeDefined();
  });

  it('should render unknown components with fallback', () => {
    const node: ComponentNode = {
      type: 'UnknownComponent',
      props: { id: 'test' },
    };

    const { container } = render(<BlueprintRenderer node={node} />);

    // Fallback should render a div with warning
    const fallback = container.querySelector('[data-unknown-component]');
    expect(fallback).toBeDefined();
    expect(fallback?.textContent).toContain('UnknownComponent');
  });

  it('should pass props correctly to components', () => {
    const node: ComponentNode = {
      type: 'Badge',
      props: { variant: 'success', children: 'New' },
    };

    const { container } = render(<BlueprintRenderer node={node} />);
    const badge = container.firstChild as HTMLElement;

    expect(badge).toBeDefined();
    expect(badge.textContent).toBe('New');
  });

  it('should handle deeply nested component trees', () => {
    const node: ComponentNode = {
      type: 'Card',
      children: [
        {
          type: 'CardContent',
          children: [
            {
              type: 'Form',
              children: [
                {
                  type: 'FormField',
                  children: [
                    {
                      type: 'Input',
                      props: { placeholder: 'Enter text' },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };

    const { container } = render(<BlueprintRenderer node={node} />);
    const input = container.querySelector('input');

    expect(input).toBeDefined();
    expect(input?.placeholder).toBe('Enter text');
  });
});
