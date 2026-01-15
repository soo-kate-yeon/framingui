import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useDivider } from '../../src/hooks/useDivider';

describe('useDivider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Orientation', () => {
    it('should default to horizontal orientation', () => {
      const { result } = renderHook(() => useDivider());
      expect(result.current.orientation).toBe('horizontal');
    });

    it('should support vertical orientation', () => {
      const { result } = renderHook(() => useDivider({ orientation: 'vertical' }));
      expect(result.current.orientation).toBe('vertical');
    });

    it('should set aria-orientation for semantic dividers', () => {
      const { result } = renderHook(() => useDivider({ decorative: false }));
      expect(result.current.dividerProps['aria-orientation']).toBe('horizontal');
    });

    it('should not set aria-orientation for decorative dividers', () => {
      const { result } = renderHook(() => useDivider({ decorative: true }));
      expect(result.current.dividerProps['aria-orientation']).toBeUndefined();
    });
  });

  describe('Decorative Mode', () => {
    it('should set role="presentation" when decorative', () => {
      const { result } = renderHook(() => useDivider({ decorative: true }));
      expect(result.current.dividerProps.role).toBe('presentation');
    });

    it('should not set role when not decorative', () => {
      const { result } = renderHook(() => useDivider({ decorative: false }));
      expect(result.current.dividerProps.role).toBe('separator');
    });

    it('should return isDecorative flag', () => {
      const { result: decorative } = renderHook(() => useDivider({ decorative: true }));
      expect(decorative.current.isDecorative).toBe(true);

      const { result: semantic } = renderHook(() => useDivider({ decorative: false }));
      expect(semantic.current.isDecorative).toBe(false);
    });
  });

  describe('Semantic Mode', () => {
    it('should set role="separator" when not decorative', () => {
      const { result } = renderHook(() => useDivider({ decorative: false }));
      expect(result.current.dividerProps.role).toBe('separator');
    });

    it('should include aria-label when label provided', () => {
      const { result } = renderHook(() => useDivider({ label: 'Section divider' }));
      expect(result.current.dividerProps['aria-label']).toBe('Section divider');
    });

    it('should include aria-orientation when semantic', () => {
      const { result } = renderHook(() => useDivider({ decorative: false, orientation: 'vertical' }));
      expect(result.current.dividerProps['aria-orientation']).toBe('vertical');
    });
  });

  describe('ID Generation', () => {
    it('should generate unique ID', () => {
      const { result } = renderHook(() => useDivider());
      expect(result.current.dividerProps.id).toBeDefined();
      expect(typeof result.current.dividerProps.id).toBe('string');
    });

    it('should use custom ID when provided', () => {
      const { result } = renderHook(() => useDivider({ id: 'custom-divider' }));
      expect(result.current.dividerProps.id).toBe('custom-divider');
    });
  });
});
