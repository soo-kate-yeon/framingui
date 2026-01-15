import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAvatar } from '../../src/hooks/useAvatar';

describe('useAvatar', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Image Loading', () => {
    it('should show image when src provided and loaded', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));

      // Initially loading
      expect(result.current.showImage).toBe(false);
      expect(result.current.isLoading).toBe(true);

      // Simulate successful load
      act(() => {
        result.current.imageProps.onLoad();
      });

      expect(result.current.showImage).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });

    it('should set isLoading while image loading', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));
      expect(result.current.isLoading).toBe(true);
    });

    it('should call onLoad when image loads', () => {
      const onLoad = vi.fn();
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User', onLoad }));

      act(() => {
        result.current.imageProps.onLoad();
      });

      expect(onLoad).toHaveBeenCalledTimes(1);
    });

    it('should set isLoading=false after load', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));

      act(() => {
        result.current.imageProps.onLoad();
      });

      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Image Error Handling', () => {
    it('should show fallback when image fails to load', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));

      act(() => {
        result.current.imageProps.onError();
      });

      expect(result.current.showImage).toBe(false);
      expect(result.current.hasError).toBe(true);
    });

    it('should call onError when image fails', () => {
      const onError = vi.fn();
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User', onError }));

      act(() => {
        result.current.imageProps.onError();
      });

      expect(onError).toHaveBeenCalledTimes(1);
    });

    it('should set hasError=true on error', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));

      act(() => {
        result.current.imageProps.onError();
      });

      expect(result.current.hasError).toBe(true);
      expect(result.current.isLoading).toBe(false);
    });
  });

  describe('Fallback', () => {
    it('should show fallback when no src provided', () => {
      const { result } = renderHook(() => useAvatar({ alt: 'User' }));
      expect(result.current.showImage).toBe(false);
    });

    it('should set role="img" on fallback', () => {
      const { result } = renderHook(() => useAvatar({ alt: 'User' }));
      expect(result.current.fallbackProps.role).toBe('img');
    });

    it('should set aria-label on fallback', () => {
      const { result } = renderHook(() => useAvatar({ alt: 'User Avatar' }));
      expect(result.current.fallbackProps['aria-label']).toBe('User Avatar');
    });
  });

  describe('Retry', () => {
    it('should retry loading image with retry()', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));

      // Trigger error
      act(() => {
        result.current.imageProps.onError();
      });

      expect(result.current.hasError).toBe(true);
      expect(result.current.showImage).toBe(false);

      // Retry
      act(() => {
        result.current.retry();
      });

      expect(result.current.hasError).toBe(false);
      expect(result.current.isLoading).toBe(true);
    });

    it('should reset error state on retry', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));

      act(() => {
        result.current.imageProps.onError();
      });

      expect(result.current.hasError).toBe(true);

      act(() => {
        result.current.retry();
      });

      expect(result.current.hasError).toBe(false);
    });
  });

  describe('Image Props', () => {
    it('should include src in imageProps', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));
      expect(result.current.imageProps.src).toBe('/avatar.jpg');
    });

    it('should include alt in imageProps', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User Avatar' }));
      expect(result.current.imageProps.alt).toBe('User Avatar');
    });

    it('should include load/error handlers in imageProps', () => {
      const { result } = renderHook(() => useAvatar({ src: '/avatar.jpg', alt: 'User' }));
      expect(typeof result.current.imageProps.onLoad).toBe('function');
      expect(typeof result.current.imageProps.onError).toBe('function');
    });
  });
});
