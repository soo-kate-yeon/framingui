import { describe, it, expect, beforeEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useProgress } from "../../src/hooks/useProgress";

describe("useProgress", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Determinate Mode", () => {
    it("should calculate percentage correctly", () => {
      const { result } = renderHook(() =>
        useProgress({ value: 45, min: 0, max: 100 }),
      );
      expect(result.current.percentage).toBe(45);
    });

    it("should set aria-valuenow to current value", () => {
      const { result } = renderHook(() => useProgress({ value: 45 }));
      expect(result.current.progressProps["aria-valuenow"]).toBe(45);
    });

    it("should set aria-valuemin", () => {
      const { result } = renderHook(() => useProgress({ value: 50, min: 10 }));
      expect(result.current.progressProps["aria-valuemin"]).toBe(10);
    });

    it("should set aria-valuemax", () => {
      const { result } = renderHook(() => useProgress({ value: 50, max: 200 }));
      expect(result.current.progressProps["aria-valuemax"]).toBe(200);
    });

    it("should handle custom min and max", () => {
      const { result } = renderHook(() =>
        useProgress({ value: 50, min: 0, max: 200 }),
      );
      expect(result.current.percentage).toBe(25);
    });

    it("should clamp value within min/max", () => {
      const { result: below } = renderHook(() =>
        useProgress({ value: -10, min: 0, max: 100 }),
      );
      expect(below.current.value).toBe(0);

      const { result: above } = renderHook(() =>
        useProgress({ value: 150, min: 0, max: 100 }),
      );
      expect(above.current.value).toBe(100);
    });
  });

  describe("Indeterminate Mode", () => {
    it("should set isIndeterminate=true when indeterminate", () => {
      const { result } = renderHook(() => useProgress({ indeterminate: true }));
      expect(result.current.isIndeterminate).toBe(true);
    });

    it("should not include aria-valuenow when indeterminate", () => {
      const { result } = renderHook(() => useProgress({ indeterminate: true }));
      expect(result.current.progressProps["aria-valuenow"]).toBeUndefined();
    });

    it("should not include aria-valuemin when indeterminate", () => {
      const { result } = renderHook(() => useProgress({ indeterminate: true }));
      expect(result.current.progressProps["aria-valuemin"]).toBeUndefined();
    });

    it("should not include aria-valuemax when indeterminate", () => {
      const { result } = renderHook(() => useProgress({ indeterminate: true }));
      expect(result.current.progressProps["aria-valuemax"]).toBeUndefined();
    });
  });

  describe("Completion", () => {
    it("should set isComplete=true when value >= max", () => {
      const { result } = renderHook(() =>
        useProgress({ value: 100, max: 100 }),
      );
      expect(result.current.isComplete).toBe(true);
    });

    it("should set isComplete=false when value < max", () => {
      const { result } = renderHook(() => useProgress({ value: 50, max: 100 }));
      expect(result.current.isComplete).toBe(false);
    });

    it("should show 100% when complete", () => {
      const { result } = renderHook(() =>
        useProgress({ value: 100, max: 100 }),
      );
      expect(result.current.percentage).toBe(100);
    });
  });

  describe("ARIA Attributes", () => {
    it('should set role="progressbar"', () => {
      const { result } = renderHook(() => useProgress({ value: 50 }));
      expect(result.current.progressProps.role).toBe("progressbar");
    });

    it("should include aria-label when provided", () => {
      const { result } = renderHook(() =>
        useProgress({ value: 50, ariaLabel: "Loading progress" }),
      );
      expect(result.current.progressProps["aria-label"]).toBe(
        "Loading progress",
      );
    });

    it("should include aria-labelledby when provided", () => {
      const { result } = renderHook(() =>
        useProgress({ value: 50, ariaLabelledBy: "progress-label" }),
      );
      expect(result.current.progressProps["aria-labelledby"]).toBe(
        "progress-label",
      );
    });

    it("should generate unique ID", () => {
      const { result } = renderHook(() => useProgress({ value: 50 }));
      expect(result.current.progressProps.id).toBeDefined();
      expect(typeof result.current.progressProps.id).toBe("string");
    });
  });

  describe("Edge Cases", () => {
    it("should handle zero value", () => {
      const { result } = renderHook(() => useProgress({ value: 0 }));
      expect(result.current.percentage).toBe(0);
      expect(result.current.value).toBe(0);
    });

    it("should handle negative values", () => {
      const { result } = renderHook(() =>
        useProgress({ value: -10, min: 0, max: 100 }),
      );
      expect(result.current.value).toBe(0);
      expect(result.current.percentage).toBe(0);
    });

    it("should handle values exceeding max", () => {
      const { result } = renderHook(() =>
        useProgress({ value: 150, min: 0, max: 100 }),
      );
      expect(result.current.value).toBe(100);
      expect(result.current.percentage).toBe(100);
    });
  });
});
