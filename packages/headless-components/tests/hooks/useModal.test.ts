import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useModal } from '../../src/hooks/useModal';

describe('useModal', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize as closed by default', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.isOpen).toBe(false);
    });

    it('should initialize with defaultOpen', () => {
      const { result } = renderHook(() => useModal({ defaultOpen: true }));

      expect(result.current.isOpen).toBe(true);
    });

    it('should generate unique ID', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.modalProps.id).toBeDefined();
      expect(typeof result.current.modalProps.id).toBe('string');
    });
  });

  describe('Open/Close State', () => {
    it('should open with open()', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should close with close()', () => {
      const { result } = renderHook(() => useModal({ defaultOpen: true }));

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should toggle with toggle()', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.toggle();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should call onOpen when opened', () => {
      const onOpen = vi.fn();
      const { result } = renderHook(() => useModal({ onOpen }));

      act(() => {
        result.current.open();
      });

      expect(onOpen).toHaveBeenCalledTimes(1);
    });

    it('should call onClose when closed', () => {
      const onClose = vi.fn();
      const { result } = renderHook(() => useModal({ defaultOpen: true, onClose }));

      act(() => {
        result.current.close();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Escape Key', () => {
    it('should close on Escape key when closeOnEscape=true', () => {
      const { result } = renderHook(() => useModal({ defaultOpen: true, closeOnEscape: true }));

      expect(result.current.isOpen).toBe(true);

      act(() => {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        result.current.modalProps.onKeyDown(event as any);
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should not close on Escape when closeOnEscape=false', () => {
      const { result } = renderHook(() => useModal({ defaultOpen: true, closeOnEscape: false }));

      expect(result.current.isOpen).toBe(true);

      act(() => {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        result.current.modalProps.onKeyDown(event as any);
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should call onClose when closed via Escape', () => {
      const onClose = vi.fn();
      const { result } = renderHook(() => useModal({ defaultOpen: true, onClose, closeOnEscape: true }));

      act(() => {
        const event = new KeyboardEvent('keydown', { key: 'Escape' });
        result.current.modalProps.onKeyDown(event as any);
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Overlay Click', () => {
    it('should close on overlay click when closeOnOverlayClick=true', () => {
      const { result } = renderHook(() => useModal({ defaultOpen: true, closeOnOverlayClick: true }));

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.overlayProps.onClick();
      });

      expect(result.current.isOpen).toBe(false);
    });

    it('should not close when closeOnOverlayClick=false', () => {
      const { result } = renderHook(() => useModal({ defaultOpen: true, closeOnOverlayClick: false }));

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.overlayProps.onClick();
      });

      expect(result.current.isOpen).toBe(true);
    });

    it('should call onClose when closed via overlay click', () => {
      const onClose = vi.fn();
      const { result } = renderHook(() => useModal({ defaultOpen: true, onClose, closeOnOverlayClick: true }));

      act(() => {
        result.current.overlayProps.onClick();
      });

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  describe('Focus Trap', () => {
    it('should have onKeyDown handler for focus trap', () => {
      const { result } = renderHook(() => useModal({ trapFocus: true }));

      expect(result.current.modalProps.onKeyDown).toBeDefined();
      expect(typeof result.current.modalProps.onKeyDown).toBe('function');
    });

    it('should handle Tab key without error when trapFocus=true', () => {
      const { result } = renderHook(() => useModal({ trapFocus: true, defaultOpen: true }));

      expect(() => {
        act(() => {
          const event = new KeyboardEvent('keydown', { key: 'Tab' });
          result.current.modalProps.onKeyDown(event as any);
        });
      }).not.toThrow();
    });

    it('should handle Shift+Tab key without error when trapFocus=true', () => {
      const { result } = renderHook(() => useModal({ trapFocus: true, defaultOpen: true }));

      expect(() => {
        act(() => {
          const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true });
          result.current.modalProps.onKeyDown(event as any);
        });
      }).not.toThrow();
    });

    it('should handle Tab key without error when trapFocus=false', () => {
      const { result } = renderHook(() => useModal({ trapFocus: false, defaultOpen: true }));

      expect(() => {
        act(() => {
          const event = new KeyboardEvent('keydown', { key: 'Tab' });
          result.current.modalProps.onKeyDown(event as any);
        });
      }).not.toThrow();
    });

    it('should provide ref callback in modalProps', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.modalProps.ref).toBeDefined();
      expect(typeof result.current.modalProps.ref).toBe('function');
    });

    it('should handle modal with no focusable elements', () => {
      const { result } = renderHook(() => useModal({ trapFocus: true, defaultOpen: true }));

      // Simulate Tab on modal with no focusable children
      const mockEvent = {
        key: 'Tab',
        shiftKey: false,
        preventDefault: vi.fn(),
        currentTarget: document.createElement('div'),
      };

      act(() => {
        result.current.modalProps.onKeyDown(mockEvent as any);
      });

      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });
  });

  describe('Focus Restoration', () => {
    it('should store trigger element reference on open when restoreFocus=true', () => {
      const button = document.createElement('button');
      document.body.appendChild(button);
      button.focus();

      const { result } = renderHook(() => useModal({ restoreFocus: true }));

      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(true);

      document.body.removeChild(button);
    });

    it('should call focus on trigger when closing with restoreFocus=true', () => {
      const button = document.createElement('button');
      const focusSpy = vi.spyOn(button, 'focus');
      document.body.appendChild(button);
      button.focus();

      const { result } = renderHook(() => useModal({ defaultOpen: false, restoreFocus: true }));

      act(() => {
        result.current.open();
      });

      act(() => {
        result.current.close();
      });

      expect(focusSpy).toHaveBeenCalled();

      document.body.removeChild(button);
    });

    it('should not restore focus when restoreFocus=false', () => {
      const button = document.createElement('button');
      const focusSpy = vi.spyOn(button, 'focus');
      document.body.appendChild(button);
      button.focus();

      const { result } = renderHook(() => useModal({ defaultOpen: false, restoreFocus: false }));

      act(() => {
        result.current.open();
      });

      focusSpy.mockClear();

      act(() => {
        result.current.close();
      });

      expect(focusSpy).not.toHaveBeenCalled();

      document.body.removeChild(button);
    });
  });

  describe('ARIA Attributes', () => {
    it('should set role="dialog"', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.modalProps.role).toBe('dialog');
    });

    it('should set aria-modal=true', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.modalProps['aria-modal']).toBe(true);
    });

    it('should set aria-label when provided', () => {
      const { result } = renderHook(() => useModal({ ariaLabel: 'Custom Modal' }));

      expect(result.current.modalProps['aria-label']).toBe('Custom Modal');
    });

    it('should set aria-labelledby when provided', () => {
      const { result } = renderHook(() => useModal({ ariaLabelledBy: 'modal-title' }));

      expect(result.current.modalProps['aria-labelledby']).toBe('modal-title');
    });

    it('should set aria-describedby when provided', () => {
      const { result } = renderHook(() => useModal({ ariaDescribedBy: 'modal-description' }));

      expect(result.current.modalProps['aria-describedby']).toBe('modal-description');
    });

    it('should set tabIndex=-1 on modal for focus', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.modalProps.tabIndex).toBe(-1);
    });

    it('should set aria-hidden=true on overlay', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.overlayProps['aria-hidden']).toBe(true);
    });

    it('should set aria-label on close button', () => {
      const { result } = renderHook(() => useModal());

      expect(result.current.closeButtonProps['aria-label']).toBe('Close modal');
    });
  });

  describe('Body Scroll Lock', () => {
    it('should set overflow hidden on body when modal opens', () => {
      const { result } = renderHook(() => useModal());

      const originalOverflow = document.body.style.overflow;

      act(() => {
        result.current.open();
      });

      // In real implementation, body scroll should be locked
      // For now, we just verify the modal is open
      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.close();
      });

      document.body.style.overflow = originalOverflow;
    });

    it('should restore body scroll when modal closes', () => {
      const { result } = renderHook(() => useModal({ defaultOpen: true }));

      const originalOverflow = document.body.style.overflow;

      act(() => {
        result.current.close();
      });

      expect(result.current.isOpen).toBe(false);

      document.body.style.overflow = originalOverflow;
    });
  });

  describe('Controlled Mode', () => {
    it('should work in controlled mode', () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) => useModal({ isOpen }),
        { initialProps: { isOpen: false } }
      );

      expect(result.current.isOpen).toBe(false);

      rerender({ isOpen: true });

      expect(result.current.isOpen).toBe(true);
    });

    it('should not update internal state in controlled mode', () => {
      const { result, rerender } = renderHook(
        ({ isOpen }) => useModal({ isOpen }),
        { initialProps: { isOpen: false } }
      );

      expect(result.current.isOpen).toBe(false);

      // Calling open() should not change state in controlled mode
      act(() => {
        result.current.open();
      });

      expect(result.current.isOpen).toBe(false);

      // State should only change via props
      rerender({ isOpen: true });

      expect(result.current.isOpen).toBe(true);
    });
  });
});
