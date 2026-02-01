/**
 * ThemeContext unit tests
 * SPEC-UI-003: Theme State Management
 * [TAG-UI003-053]
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';

// Test component that uses useTheme hook
function TestComponent() {
  const {
    theme,
    setColorPreset,
    setTypographyPreset,
    setSpacingPreset,
    setCustomOverride,
    applyTheme,
    exportTheme,
    resetTheme,
  } = useTheme();

  return (
    <div>
      <div data-testid="color-preset">{theme.colorPreset}</div>
      <div data-testid="typography-preset">{theme.typographyPreset}</div>
      <div data-testid="spacing-preset">{theme.spacingPreset}</div>
      <button onClick={() => setColorPreset('color-forest')}>
        Set Color Forest
      </button>
      <button onClick={() => setTypographyPreset('typo-classic')}>
        Set Typography Classic
      </button>
      <button onClick={() => setSpacingPreset('spacing-spacious')}>
        Set Spacing Spacious
      </button>
      <button onClick={() => setCustomOverride('--custom-var', 'test-value')}>
        Set Custom Override
      </button>
      <button onClick={applyTheme}>Apply Theme</button>
      <button
        onClick={() => {
          const json = exportTheme();
          // JSON을 data attribute에 저장 (테스트 확인용)
          document.body.setAttribute('data-exported', JSON.stringify(json));
        }}
      >
        Export Theme
      </button>
      <button onClick={resetTheme}>Reset Theme</button>
    </div>
  );
}

describe('ThemeContext', () => {
  // Mock document.documentElement.style.setProperty
  let styleSetPropertyMock: any;

  beforeEach(() => {
    styleSetPropertyMock = vi.fn();
    Object.defineProperty(document.documentElement, 'style', {
      value: {
        setProperty: styleSetPropertyMock,
      },
      writable: true,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('ThemeProvider', () => {
    it('기본 테마 상태로 초기화', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      expect(screen.getByTestId('color-preset')).toHaveTextContent('color-ocean');
      expect(screen.getByTestId('typography-preset')).toHaveTextContent(
        'typo-modern',
      );
      expect(screen.getByTestId('spacing-preset')).toHaveTextContent(
        'spacing-comfortable',
      );
    });

    it('setColorPreset() 호출 시 상태 업데이트', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      act(() => {
        screen.getByText('Set Color Forest').click();
      });

      expect(screen.getByTestId('color-preset')).toHaveTextContent('color-forest');
    });

    it('setTypographyPreset() 호출 시 상태 업데이트', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      act(() => {
        screen.getByText('Set Typography Classic').click();
      });

      expect(screen.getByTestId('typography-preset')).toHaveTextContent(
        'typo-classic',
      );
    });

    it('setSpacingPreset() 호출 시 상태 업데이트', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      act(() => {
        screen.getByText('Set Spacing Spacious').click();
      });

      expect(screen.getByTestId('spacing-preset')).toHaveTextContent(
        'spacing-spacious',
      );
    });

    it('applyTheme() 호출 시 CSS Variables 설정 [TAG-UI003-007]', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      act(() => {
        screen.getByText('Apply Theme').click();
      });

      // CSS setProperty가 호출되었는지 확인
      expect(styleSetPropertyMock).toHaveBeenCalled();

      // --tekton- 으로 시작하는 CSS Variable이 설정되었는지 확인
      const calls = styleSetPropertyMock.mock.calls;
      const hasValidCall = calls.some(
        (call: [string, string]) => call[0].startsWith('--tekton-'),
      );
      expect(hasValidCall).toBe(true);
    });

    it('exportTheme() 호출 시 유효한 MCP JSON 생성 [TAG-UI003-013]', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      // 버튼 클릭을 각각 act로 감싸기
      await act(async () => {
        screen.getByText('Set Color Forest').click();
      });

      await act(async () => {
        screen.getByText('Export Theme').click();
      });

      const exportedData = document.body.getAttribute('data-exported');
      expect(exportedData).toBeTruthy();

      const json = JSON.parse(exportedData!);

      // MCP JSON 형식 검증
      expect(json).toHaveProperty('version');
      expect(json).toHaveProperty('presets');
      expect(json).toHaveProperty('overrides');
      expect(json).toHaveProperty('exportedAt');

      expect(json.version).toBe('1.0.0');
      expect(json.presets.color).toBe('color-forest');
      expect(json.presets.typography).toBe('typo-modern');
      expect(json.presets.spacing).toBe('spacing-comfortable');
    });

    it('resetTheme() 호출 시 기본값으로 재설정', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      // 프리셋 변경
      act(() => {
        screen.getByText('Set Color Forest').click();
        screen.getByText('Set Typography Classic').click();
        screen.getByText('Set Spacing Spacious').click();
      });

      expect(screen.getByTestId('color-preset')).toHaveTextContent('color-forest');

      // 리셋
      act(() => {
        screen.getByText('Reset Theme').click();
      });

      expect(screen.getByTestId('color-preset')).toHaveTextContent('color-ocean');
      expect(screen.getByTestId('typography-preset')).toHaveTextContent(
        'typo-modern',
      );
      expect(screen.getByTestId('spacing-preset')).toHaveTextContent(
        'spacing-comfortable',
      );
    });

    it('customOverrides가 프리셋보다 우선 적용', async () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      await act(async () => {
        screen.getByText('Set Custom Override').click();
      });

      await act(async () => {
        screen.getByText('Apply Theme').click();
      });

      // Custom override가 CSS setProperty로 호출되었는지 확인
      const calls = styleSetPropertyMock.mock.calls;
      const customVarCall = calls.find(
        (call: [string, string]) =>
          call[0] === '--custom-var' && call[1] === 'test-value',
      );
      expect(customVarCall).toBeDefined();
    });
  });

  describe('useTheme hook', () => {
    it('Provider 외부에서 사용 시 에러 발생', () => {
      // Suppress console.error for this test
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      expect(() => {
        render(<TestComponent />);
      }).toThrow('useTheme must be used within ThemeProvider');

      consoleSpy.mockRestore();
    });
  });

  describe('Exported JSON format', () => {
    it('exportedAt이 ISO 8601 형식', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      act(() => {
        screen.getByText('Export Theme').click();
      });

      const exportedData = document.body.getAttribute('data-exported');
      const json = JSON.parse(exportedData!);

      // ISO 8601 형식 검증
      expect(json.exportedAt).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
      );
    });

    it('overrides 필드가 빈 객체로 초기화', () => {
      render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );

      act(() => {
        screen.getByText('Export Theme').click();
      });

      const exportedData = document.body.getAttribute('data-exported');
      const json = JSON.parse(exportedData!);

      expect(json.overrides).toEqual({});
    });
  });
});
