import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCard } from '../../src/hooks/useCard';

describe('useCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Non-Interactive Mode', () => {
    it('should not include role when not interactive', () => {
      const { result } = renderHook(() => useCard({ interactive: false }));
      expect(result.current.cardProps.role).toBeUndefined();
    });

    it('should not include tabIndex when not interactive', () => {
      const { result } = renderHook(() => useCard({ interactive: false }));
      expect(result.current.cardProps.tabIndex).toBeUndefined();
    });

    it('should not handle clicks when not interactive', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() => useCard({ interactive: false, onClick }));
      expect(result.current.cardProps.onClick).toBeUndefined();
    });
  });

  describe('Interactive Mode', () => {
    it('should set role="button" when interactive', () => {
      const { result } = renderHook(() => useCard({ interactive: true }));
      expect(result.current.cardProps.role).toBe('button');
    });

    it('should set tabIndex=0 when interactive', () => {
      const { result } = renderHook(() => useCard({ interactive: true }));
      expect(result.current.cardProps.tabIndex).toBe(0);
    });

    it('should call onClick on click', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() => useCard({ interactive: true, onClick }));

      act(() => {
        result.current.cardProps.onClick?.();
      });

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick on Enter key', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() => useCard({ interactive: true, onClick }));

      act(() => {
        result.current.cardProps.onKeyDown?.({ key: 'Enter', preventDefault: vi.fn() } as any);
      });

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should call onClick on Space key', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() => useCard({ interactive: true, onClick }));

      act(() => {
        result.current.cardProps.onKeyDown?.({ key: ' ', preventDefault: vi.fn() } as any);
      });

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should not respond when disabled', () => {
      const onClick = vi.fn();
      const { result } = renderHook(() => useCard({ interactive: true, onClick, disabled: true }));

      act(() => {
        result.current.cardProps.onClick?.();
      });

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe('Selection State', () => {
    it('should initialize with defaultSelected', () => {
      const { result } = renderHook(() => useCard({ defaultSelected: true }));
      expect(result.current.selected).toBe(true);
    });

    it('should toggle selection with toggleSelection()', () => {
      const { result } = renderHook(() => useCard({ defaultSelected: false }));

      expect(result.current.selected).toBe(false);

      act(() => {
        result.current.toggleSelection();
      });

      expect(result.current.selected).toBe(true);

      act(() => {
        result.current.toggleSelection();
      });

      expect(result.current.selected).toBe(false);
    });

    it('should set selection with setSelected()', () => {
      const { result } = renderHook(() => useCard({ defaultSelected: false }));

      act(() => {
        result.current.setSelected(true);
      });

      expect(result.current.selected).toBe(true);

      act(() => {
        result.current.setSelected(false);
      });

      expect(result.current.selected).toBe(false);
    });

    it('should set aria-pressed when interactive and selectable', () => {
      const { result } = renderHook(() => useCard({ interactive: true, defaultSelected: false }));
      expect(result.current.cardProps['aria-pressed']).toBe(false);

      act(() => {
        result.current.toggleSelection();
      });

      expect(result.current.cardProps['aria-pressed']).toBe(true);
    });

    it('should call onSelectionChange when selection changes', () => {
      const onSelectionChange = vi.fn();
      const { result } = renderHook(() => useCard({ defaultSelected: false, onSelectionChange }));

      act(() => {
        result.current.toggleSelection();
      });

      expect(onSelectionChange).toHaveBeenCalledWith(true);

      act(() => {
        result.current.toggleSelection();
      });

      expect(onSelectionChange).toHaveBeenCalledWith(false);
    });
  });

  describe('ARIA Attributes', () => {
    it('should generate unique ID', () => {
      const { result } = renderHook(() => useCard());
      expect(result.current.cardProps.id).toBeDefined();
      expect(typeof result.current.cardProps.id).toBe('string');
    });

    it('should include aria-label when provided', () => {
      const { result } = renderHook(() => useCard({ ariaLabel: 'Product card' }));
      expect(result.current.cardProps['aria-label']).toBe('Product card');
    });

    it('should set aria-disabled when disabled', () => {
      const { result } = renderHook(() => useCard({ interactive: true, disabled: true }));
      expect(result.current.cardProps['aria-disabled']).toBe(true);
    });
  });
});
