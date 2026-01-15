import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useBadge } from '../../src/hooks/useBadge';

describe('useBadge', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Content Formatting', () => {
    it('should display content as-is when under max', () => {
      const { result } = renderHook(() => useBadge({ content: 42, max: 99 }));
      expect(result.current.displayContent).toBe('42');
    });

    it('should format content with + when exceeding max', () => {
      const { result } = renderHook(() => useBadge({ content: 150, max: 99 }));
      expect(result.current.displayContent).toBe('99+');
    });

    it('should handle string content', () => {
      const { result } = renderHook(() => useBadge({ content: 'NEW' }));
      expect(result.current.displayContent).toBe('NEW');
    });

    it('should handle numeric content', () => {
      const { result } = renderHook(() => useBadge({ content: 5 }));
      expect(result.current.displayContent).toBe('5');
    });
  });

  describe('Visibility', () => {
    it('should be visible when content is non-zero', () => {
      const { result } = renderHook(() => useBadge({ content: 5 }));
      expect(result.current.isVisible).toBe(true);
    });

    it('should hide when content is zero and showZero=false', () => {
      const { result } = renderHook(() => useBadge({ content: 0, showZero: false }));
      expect(result.current.isVisible).toBe(false);
    });

    it('should show when content is zero and showZero=true', () => {
      const { result } = renderHook(() => useBadge({ content: 0, showZero: true }));
      expect(result.current.isVisible).toBe(true);
    });

    it('should respect visible prop', () => {
      const { result } = renderHook(() => useBadge({ content: 5, visible: false }));
      expect(result.current.isVisible).toBe(false);
    });

    it('should be visible when content is undefined but visible=true', () => {
      const { result } = renderHook(() => useBadge({ visible: true }));
      expect(result.current.isVisible).toBe(true);
    });
  });

  describe('Max Value', () => {
    it('should use default max of 99', () => {
      const { result } = renderHook(() => useBadge({ content: 150 }));
      expect(result.current.displayContent).toBe('99+');
    });

    it('should use custom max value', () => {
      const { result } = renderHook(() => useBadge({ content: 150, max: 50 }));
      expect(result.current.displayContent).toBe('50+');
    });

    it('should format as "99+" when content is 100 and max is 99', () => {
      const { result } = renderHook(() => useBadge({ content: 100, max: 99 }));
      expect(result.current.displayContent).toBe('99+');
    });
  });

  describe('ARIA Attributes', () => {
    it('should set role="status"', () => {
      const { result } = renderHook(() => useBadge({ content: 5 }));
      expect(result.current.badgeProps.role).toBe('status');
    });

    it('should include aria-label when provided', () => {
      const { result } = renderHook(() => useBadge({ content: 5, ariaLabel: '5 notifications' }));
      expect(result.current.badgeProps['aria-label']).toBe('5 notifications');
    });

    it('should generate aria-label from content', () => {
      const { result } = renderHook(() => useBadge({ content: 5 }));
      expect(result.current.badgeProps['aria-label']).toBeDefined();
    });
  });
});
