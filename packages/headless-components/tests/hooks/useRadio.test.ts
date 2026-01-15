import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRadio, useRadioGroup } from '../../src/hooks/useRadio';

describe('useRadio', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize as unchecked when value does not match', () => {
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', selectedValue: 'option2' })
      );
      expect(result.current.checked).toBe(false);
      expect(result.current.radioProps['aria-checked']).toBe(false);
    });

    it('should initialize as checked when value matches selectedValue', () => {
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', selectedValue: 'option1' })
      );
      expect(result.current.checked).toBe(true);
      expect(result.current.radioProps['aria-checked']).toBe(true);
    });

    it('should require value prop', () => {
      const { result } = renderHook(() => useRadio({ value: 'test' }));
      expect(result.current.radioProps.value).toBe('test');
    });

    it('should generate unique ID', () => {
      const { result } = renderHook(() => useRadio({ value: 'option1' }));
      expect(result.current.radioProps.id).toBeDefined();
      expect(typeof result.current.radioProps.id).toBe('string');
    });
  });

  describe('Selection', () => {
    it('should call onChange with value when selected', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', onChange })
      );

      act(() => {
        result.current.radioProps.onClick({} as any);
      });

      expect(onChange).toHaveBeenCalledWith('option1');
    });

    it('should select on click', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', onChange })
      );

      act(() => {
        result.current.radioProps.onClick({} as any);
      });

      expect(onChange).toHaveBeenCalled();
    });

    it('should select on Space key', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', onChange })
      );

      const event = {
        key: ' ',
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.radioProps.onKeyDown(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalledWith('option1');
    });
  });

  describe('Checked State', () => {
    it('should be checked when value matches selectedValue', () => {
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', selectedValue: 'option1' })
      );
      expect(result.current.checked).toBe(true);
    });

    it('should be unchecked when value does not match', () => {
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', selectedValue: 'option2' })
      );
      expect(result.current.checked).toBe(false);
    });

    it('should update checked state when selectedValue changes', () => {
      const { result, rerender } = renderHook(
        ({ selectedValue }) => useRadio({ value: 'option1', selectedValue }),
        { initialProps: { selectedValue: 'option2' } }
      );

      expect(result.current.checked).toBe(false);

      rerender({ selectedValue: 'option1' });

      expect(result.current.checked).toBe(true);
    });
  });

  describe('Disabled State', () => {
    it('should set aria-disabled when disabled', () => {
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', disabled: true })
      );
      expect(result.current.radioProps['aria-disabled']).toBe(true);
    });

    it('should not call onChange when disabled', () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', disabled: true, onChange })
      );

      act(() => {
        result.current.radioProps.onClick({} as any);
      });

      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe('ARIA Attributes', () => {
    it('should set role="radio"', () => {
      const { result } = renderHook(() => useRadio({ value: 'option1' }));
      expect(result.current.radioProps.role).toBe('radio');
    });

    it('should set aria-checked based on checked state', () => {
      const { result: uncheckedResult } = renderHook(() =>
        useRadio({ value: 'option1', selectedValue: 'option2' })
      );
      expect(uncheckedResult.current.radioProps['aria-checked']).toBe(false);

      const { result: checkedResult } = renderHook(() =>
        useRadio({ value: 'option1', selectedValue: 'option1' })
      );
      expect(checkedResult.current.radioProps['aria-checked']).toBe(true);
    });

    it('should set tabIndex=0 when checked', () => {
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', selectedValue: 'option1' })
      );
      expect(result.current.radioProps.tabIndex).toBe(0);
    });

    it('should set tabIndex=-1 when not checked', () => {
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', selectedValue: 'option2' })
      );
      expect(result.current.radioProps.tabIndex).toBe(-1);
    });

    it('should include aria-label when provided', () => {
      const { result } = renderHook(() =>
        useRadio({ value: 'option1', 'aria-label': 'Option 1' })
      );
      expect(result.current.radioProps['aria-label']).toBe('Option 1');
    });
  });
});

describe('useRadioGroup', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should initialize with empty value by default', () => {
      const { result } = renderHook(() => useRadioGroup());
      expect(result.current.value).toBe('');
    });

    it('should initialize with defaultValue', () => {
      const { result } = renderHook(() => useRadioGroup({ defaultValue: 'option1' }));
      expect(result.current.value).toBe('option1');
    });

    it('should generate unique ID for group', () => {
      const { result } = renderHook(() => useRadioGroup());
      expect(result.current.groupProps.id).toBeDefined();
      expect(typeof result.current.groupProps.id).toBe('string');
    });
  });

  describe('Controlled Mode', () => {
    it('should work in controlled mode', () => {
      const { result } = renderHook(() => useRadioGroup({ value: 'option1' }));
      expect(result.current.value).toBe('option1');
    });

    it('should call onChange when value changes', () => {
      const onChange = vi.fn();
      const { result: groupResult } = renderHook(() => useRadioGroup({ value: 'option1', onChange }));

      const radioInputProps = groupResult.current.getRadioProps({ value: 'option2' });
      const { result: radioResult } = renderHook(() => useRadio(radioInputProps));

      act(() => {
        radioResult.current.radioProps.onClick({} as any);
      });

      expect(onChange).toHaveBeenCalledWith('option2');
    });
  });

  describe('Uncontrolled Mode', () => {
    it('should work in uncontrolled mode', () => {
      const { result } = renderHook(() => useRadioGroup({ defaultValue: 'option1' }));
      expect(result.current.value).toBe('option1');
    });

    it('should update value when radio selected', () => {
      const { result: groupResult } = renderHook(() => useRadioGroup());

      const radioInputProps = groupResult.current.getRadioProps({ value: 'option1' });
      const { result: radioResult } = renderHook(() => useRadio(radioInputProps));

      act(() => {
        radioResult.current.radioProps.onClick({} as any);
      });

      expect(groupResult.current.value).toBe('option1');
    });
  });

  describe('getRadioProps', () => {
    it('should create radio props with correct checked state', () => {
      const { result } = renderHook(() => useRadioGroup({ value: 'option1' }));

      const radio1Props = result.current.getRadioProps({ value: 'option1' });
      const radio2Props = result.current.getRadioProps({ value: 'option2' });

      expect(radio1Props.selectedValue).toBe('option1');
      expect(radio2Props.selectedValue).toBe('option1');
    });

    it('should pass group disabled state to radios', () => {
      const { result } = renderHook(() => useRadioGroup({ disabled: true }));

      const radioProps = result.current.getRadioProps({ value: 'option1' });

      expect(radioProps.disabled).toBe(true);
    });

    it('should pass group required state to radios', () => {
      const { result } = renderHook(() => useRadioGroup({ required: true }));

      const radioProps = result.current.getRadioProps({ value: 'option1' });

      expect(radioProps.required).toBe(true);
    });

    it('should pass group name to radios', () => {
      const { result } = renderHook(() => useRadioGroup({ name: 'my-group' }));

      const radioProps = result.current.getRadioProps({ value: 'option1' });

      expect(radioProps.name).toBe('my-group');
    });
  });

  describe('ARIA Attributes', () => {
    it('should set role="radiogroup" on group', () => {
      const { result } = renderHook(() => useRadioGroup());
      expect(result.current.groupProps.role).toBe('radiogroup');
    });

    it('should set aria-required on group when required', () => {
      const { result } = renderHook(() => useRadioGroup({ required: true }));
      expect(result.current.groupProps['aria-required']).toBe(true);
    });

    it('should set aria-disabled on group when disabled', () => {
      const { result } = renderHook(() => useRadioGroup({ disabled: true }));
      expect(result.current.groupProps['aria-disabled']).toBe(true);
    });

    it('should include aria-label on group when provided', () => {
      const { result } = renderHook(() => useRadioGroup({ 'aria-label': 'Choose option' }));
      expect(result.current.groupProps['aria-label']).toBe('Choose option');
    });
  });
});
