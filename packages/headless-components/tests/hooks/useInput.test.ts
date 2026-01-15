import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useInput } from '../../src/hooks/useInput';

describe('useInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with default value', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'test' }));
      expect(result.current.value).toBe('test');
    });

    it('should initialize with empty string when no defaultValue provided', () => {
      const { result } = renderHook(() => useInput());
      expect(result.current.value).toBe('');
    });

    it('should generate unique IDs for input element', () => {
      const { result } = renderHook(() => useInput());
      expect(result.current.inputProps.id).toBeDefined();
      expect(typeof result.current.inputProps.id).toBe('string');
    });

    it('should use custom ID when provided', () => {
      const { result } = renderHook(() => useInput({ id: 'custom-id' }));
      expect(result.current.inputProps.id).toBe('custom-id');
    });
  });

  describe('Controlled Mode', () => {
    it('should work in controlled mode with value prop', () => {
      const { result } = renderHook(() => useInput({ value: 'controlled' }));
      expect(result.current.value).toBe('controlled');
    });

    it('should call onChange with new value when input changes', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useInput({ value: 'initial', onChange }));

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'updated' },
        } as any);
      });

      expect(onChange).toHaveBeenCalledWith('updated');
    });

    it('should not update internal state in controlled mode', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useInput({ value: 'controlled', onChange }));

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'new' },
        } as any);
      });

      expect(result.current.value).toBe('controlled');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should work in uncontrolled mode without value prop', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'initial' }));
      expect(result.current.value).toBe('initial');
    });

    it('should update internal state when input changes', () => {
      const { result } = renderHook(() => useInput());

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'updated' },
        } as any);
      });

      expect(result.current.value).toBe('updated');
    });

    it('should call onChange callback in uncontrolled mode', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useInput({ onChange }));

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'test' },
        } as any);
      });

      expect(onChange).toHaveBeenCalledWith('test');
    });
  });

  describe('Value Management', () => {
    it('should update value with setValue function', () => {
      const { result } = renderHook(() => useInput());

      act(() => {
        result.current.setValue('new value');
      });

      expect(result.current.value).toBe('new value');
    });

    it('should clear value with clear function', () => {
      const { result } = renderHook(() => useInput({ defaultValue: 'test' }));

      act(() => {
        result.current.clear();
      });

      expect(result.current.value).toBe('');
    });

    it('should handle empty string values', () => {
      const { result } = renderHook(() => useInput({ defaultValue: '' }));
      expect(result.current.value).toBe('');
    });
  });

  describe('Input Types', () => {
    it('should set type="text" by default', () => {
      const { result } = renderHook(() => useInput());
      expect(result.current.inputProps.type).toBe('text');
    });

    it('should accept custom type (email, password, etc.)', () => {
      const { result: emailResult } = renderHook(() => useInput({ type: 'email' }));
      expect(emailResult.current.inputProps.type).toBe('email');

      const { result: passwordResult } = renderHook(() => useInput({ type: 'password' }));
      expect(passwordResult.current.inputProps.type).toBe('password');
    });

    it('should include placeholder when provided', () => {
      const { result } = renderHook(() => useInput({ placeholder: 'Enter text' }));
      expect(result.current.inputProps.placeholder).toBe('Enter text');
    });
  });

  describe('Disabled State', () => {
    it('should set disabled attribute when disabled=true', () => {
      const { result } = renderHook(() => useInput({ disabled: true }));
      expect(result.current.inputProps.disabled).toBe(true);
      expect(result.current.inputProps['aria-disabled']).toBe(true);
    });

    it('should not call onChange when disabled', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useInput({ disabled: true, onChange }));

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'test' },
        } as any);
      });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('Read-Only State', () => {
    it('should set readOnly attribute when readOnly=true', () => {
      const { result } = renderHook(() => useInput({ readOnly: true }));
      expect(result.current.inputProps.readOnly).toBe(true);
    });

    it('should not update value when readOnly', () => {
      const { result } = renderHook(() => useInput({ readOnly: true, defaultValue: 'initial' }));

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'new' },
        } as any);
      });

      expect(result.current.value).toBe('initial');
    });
  });

  describe('Required State', () => {
    it('should set required attribute when required=true', () => {
      const { result } = renderHook(() => useInput({ required: true }));
      expect(result.current.inputProps.required).toBe(true);
    });

    it('should include required in ARIA attributes', () => {
      const { result } = renderHook(() => useInput({ required: true }));
      expect(result.current.inputProps['aria-required']).toBe(true);
    });
  });

  describe('Validation State', () => {
    it('should set aria-invalid=false when no errorMessage', () => {
      const { result } = renderHook(() => useInput());
      expect(result.current.inputProps['aria-invalid']).toBe(false);
    });

    it('should set aria-invalid=true when errorMessage is provided', () => {
      const { result } = renderHook(() => useInput({ errorMessage: 'Error' }));
      expect(result.current.inputProps['aria-invalid']).toBe(true);
    });

    it('should set isInvalid based on errorMessage presence', () => {
      const { result: validResult } = renderHook(() => useInput());
      expect(validResult.current.isInvalid).toBe(false);

      const { result: invalidResult } = renderHook(() => useInput({ errorMessage: 'Error' }));
      expect(invalidResult.current.isInvalid).toBe(true);
    });

    it('should link input to error message with aria-errormessage', () => {
      const { result } = renderHook(() => useInput({ errorMessage: 'Error' }));
      const errorId = result.current.errorProps.id;
      expect(result.current.inputProps['aria-errormessage']).toBe(errorId);
    });

    it('should provide errorProps with correct role', () => {
      const { result } = renderHook(() => useInput({ errorMessage: 'Error' }));
      expect(result.current.errorProps.role).toBe('alert');
    });
  });

  describe('Focus/Blur Events', () => {
    it('should call onFocus callback when input gains focus', () => {
      const onFocus = vi.fn();
      const { result } = renderHook(() => useInput({ onFocus }));

      act(() => {
        result.current.inputProps.onFocus({} as any);
      });

      expect(onFocus).toHaveBeenCalledTimes(1);
    });

    it('should call onBlur callback when input loses focus', () => {
      const onBlur = vi.fn();
      const { result } = renderHook(() => useInput({ onBlur }));

      act(() => {
        result.current.inputProps.onBlur({} as any);
      });

      expect(onBlur).toHaveBeenCalledTimes(1);
    });

    it('should handle focus/blur without callbacks', () => {
      const { result } = renderHook(() => useInput());

      expect(() => {
        act(() => {
          result.current.inputProps.onFocus({} as any);
          result.current.inputProps.onBlur({} as any);
        });
      }).not.toThrow();
    });
  });

  describe('ARIA Attributes', () => {
    it('should include aria-label when provided', () => {
      const { result } = renderHook(() => useInput({ 'aria-label': 'Username' }));
      expect(result.current.inputProps['aria-label']).toBe('Username');
    });

    it('should merge custom ARIA attributes', () => {
      const { result } = renderHook(() =>
        useInput({
          'aria-label': 'Test',
          'aria-describedby': 'desc-1',
        })
      );
      expect(result.current.inputProps['aria-label']).toBe('Test');
      expect(result.current.inputProps['aria-describedby']).toBe('desc-1');
    });

    it('should not include aria-errormessage when no error', () => {
      const { result } = renderHook(() => useInput());
      expect(result.current.inputProps['aria-errormessage']).toBeUndefined();
    });
  });

  describe('Event Handling', () => {
    it('should extract value from ChangeEvent', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useInput({ onChange }));

      act(() => {
        result.current.inputProps.onChange({
          target: { value: 'extracted' },
        } as any);
      });

      expect(onChange).toHaveBeenCalledWith('extracted');
      expect(result.current.value).toBe('extracted');
    });

    it('should handle synthetic React events', () => {
      const { result } = renderHook(() => useInput());

      const mockEvent = {
        target: { value: 'test value' },
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.inputProps.onChange(mockEvent);
      });

      expect(result.current.value).toBe('test value');
    });
  });
});
