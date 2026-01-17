import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useCheckbox } from "../../src/hooks/useCheckbox";

describe("useCheckbox", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Initialization", () => {
    it("should initialize as unchecked by default", () => {
      const { result } = renderHook(() => useCheckbox());
      expect(result.current.checked).toBe(false);
      expect(result.current.checkboxProps["aria-checked"]).toBe(false);
    });

    it("should initialize with defaultChecked", () => {
      const { result } = renderHook(() =>
        useCheckbox({ defaultChecked: true }),
      );
      expect(result.current.checked).toBe(true);
      expect(result.current.checkboxProps["aria-checked"]).toBe(true);
    });

    it("should generate unique ID", () => {
      const { result } = renderHook(() => useCheckbox());
      expect(result.current.checkboxProps.id).toBeDefined();
      expect(typeof result.current.checkboxProps.id).toBe("string");
    });

    it("should use custom ID when provided", () => {
      const { result } = renderHook(() =>
        useCheckbox({ id: "custom-checkbox" }),
      );
      expect(result.current.checkboxProps.id).toBe("custom-checkbox");
    });
  });

  describe("Controlled Mode", () => {
    it("should work in controlled mode", () => {
      const { result } = renderHook(() => useCheckbox({ checked: true }));
      expect(result.current.checked).toBe(true);
    });

    it("should call onChange when toggled", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useCheckbox({ checked: false, onChange }),
      );

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(onChange).toHaveBeenCalledWith(true);
    });

    it("should not update internal state in controlled mode", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useCheckbox({ checked: false, onChange }),
      );

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(result.current.checked).toBe(false);
    });
  });

  describe("Uncontrolled Mode", () => {
    it("should work in uncontrolled mode", () => {
      const { result } = renderHook(() =>
        useCheckbox({ defaultChecked: false }),
      );
      expect(result.current.checked).toBe(false);
    });

    it("should toggle state on click", () => {
      const { result } = renderHook(() => useCheckbox());

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(result.current.checked).toBe(true);

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(result.current.checked).toBe(false);
    });

    it("should call onChange callback", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useCheckbox({ onChange }));

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(onChange).toHaveBeenCalledWith(true);
    });
  });

  describe("Toggle Functionality", () => {
    it("should toggle from unchecked to checked", () => {
      const { result } = renderHook(() => useCheckbox());

      act(() => {
        result.current.toggle();
      });

      expect(result.current.checked).toBe(true);
    });

    it("should toggle from checked to unchecked", () => {
      const { result } = renderHook(() =>
        useCheckbox({ defaultChecked: true }),
      );

      act(() => {
        result.current.toggle();
      });

      expect(result.current.checked).toBe(false);
    });

    it("should toggle with toggle() function", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useCheckbox({ onChange }));

      act(() => {
        result.current.toggle();
      });

      expect(onChange).toHaveBeenCalledWith(true);
      expect(result.current.checked).toBe(true);
    });
  });

  describe("Indeterminate State", () => {
    it('should set aria-checked="mixed" when indeterminate', () => {
      const { result } = renderHook(() => useCheckbox({ indeterminate: true }));
      expect(result.current.checkboxProps["aria-checked"]).toBe("mixed");
    });

    it("should clear indeterminate when toggled", () => {
      const onIndeterminateChange = vi.fn();
      const { result } = renderHook(() =>
        useCheckbox({ indeterminate: true, onIndeterminateChange }),
      );

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(onIndeterminateChange).toHaveBeenCalledWith(false);
    });

    it("should prioritize indeterminate in aria-checked", () => {
      const { result } = renderHook(() =>
        useCheckbox({ checked: true, indeterminate: true }),
      );
      expect(result.current.checkboxProps["aria-checked"]).toBe("mixed");
    });
  });

  describe("Keyboard Navigation", () => {
    it("should toggle on Space key", () => {
      const { result } = renderHook(() => useCheckbox());

      const event = {
        key: " ",
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.checkboxProps.onKeyDown(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(result.current.checked).toBe(true);
    });

    it("should not toggle on Enter key", () => {
      const { result } = renderHook(() => useCheckbox());

      const event = {
        key: "Enter",
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.checkboxProps.onKeyDown(event);
      });

      expect(event.preventDefault).not.toHaveBeenCalled();
      expect(result.current.checked).toBe(false);
    });

    it("should not toggle when disabled", () => {
      const { result } = renderHook(() => useCheckbox({ disabled: true }));

      const event = {
        key: " ",
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.checkboxProps.onKeyDown(event);
      });

      expect(result.current.checked).toBe(false);
    });

    it("should prevent default on Space key", () => {
      const { result } = renderHook(() => useCheckbox());

      const event = {
        key: " ",
        preventDefault: vi.fn(),
      } as any;

      act(() => {
        result.current.checkboxProps.onKeyDown(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
    });
  });

  describe("Click Events", () => {
    it("should toggle on click", () => {
      const { result } = renderHook(() => useCheckbox());

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(result.current.checked).toBe(true);
    });

    it("should not toggle when disabled", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useCheckbox({ disabled: true, onChange }),
      );

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(result.current.checked).toBe(false);
      expect(onChange).not.toHaveBeenCalled();
    });
  });

  describe("Disabled State", () => {
    it("should set aria-disabled when disabled", () => {
      const { result } = renderHook(() => useCheckbox({ disabled: true }));
      expect(result.current.checkboxProps["aria-disabled"]).toBe(true);
    });

    it("should not call onChange when disabled", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() =>
        useCheckbox({ disabled: true, onChange }),
      );

      act(() => {
        result.current.checkboxProps.onClick({} as any);
      });

      expect(onChange).not.toHaveBeenCalled();
    });

    it("should still be keyboard focusable when disabled", () => {
      const { result } = renderHook(() => useCheckbox({ disabled: true }));
      expect(result.current.checkboxProps.tabIndex).toBe(0);
    });
  });

  describe("Required State", () => {
    it("should set aria-required when required", () => {
      const { result } = renderHook(() => useCheckbox({ required: true }));
      expect(result.current.checkboxProps["aria-required"]).toBe(true);
    });
  });

  describe("ARIA Attributes", () => {
    it('should set role="checkbox"', () => {
      const { result } = renderHook(() => useCheckbox());
      expect(result.current.checkboxProps.role).toBe("checkbox");
    });

    it("should set aria-checked based on checked state", () => {
      const { result: uncheckedResult } = renderHook(() => useCheckbox());
      expect(uncheckedResult.current.checkboxProps["aria-checked"]).toBe(false);

      const { result: checkedResult } = renderHook(() =>
        useCheckbox({ checked: true }),
      );
      expect(checkedResult.current.checkboxProps["aria-checked"]).toBe(true);
    });

    it("should include aria-label when provided", () => {
      const { result } = renderHook(() =>
        useCheckbox({ "aria-label": "Accept terms" }),
      );
      expect(result.current.checkboxProps["aria-label"]).toBe("Accept terms");
    });

    it("should merge custom ARIA attributes", () => {
      const { result } = renderHook(() =>
        useCheckbox({
          "aria-label": "Test",
          "aria-describedby": "desc-1",
        }),
      );
      expect(result.current.checkboxProps["aria-label"]).toBe("Test");
      expect(result.current.checkboxProps["aria-describedby"]).toBe("desc-1");
    });

    it("should set tabIndex=0 for keyboard focus", () => {
      const { result } = renderHook(() => useCheckbox());
      expect(result.current.checkboxProps.tabIndex).toBe(0);
    });
  });

  describe("Programmatic Control", () => {
    it("should set checked with setChecked()", () => {
      const { result } = renderHook(() => useCheckbox());

      act(() => {
        result.current.setChecked(true);
      });

      expect(result.current.checked).toBe(true);
    });

    it("should call onChange when using setChecked()", () => {
      const onChange = vi.fn();
      const { result } = renderHook(() => useCheckbox({ onChange }));

      act(() => {
        result.current.setChecked(true);
      });

      expect(onChange).toHaveBeenCalledWith(true);
    });
  });
});
