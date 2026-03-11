/**
 * Validate Environment Tool Tests
 * SPEC-MCP-005 Phase 4: Comprehensive tests for environment validation
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { validateEnvironmentTool } from '../../src/tools/validate-environment.js';
import * as packageJsonReader from '../../src/utils/package-json-reader.js';

// package-json-reader 모듈 모킹
vi.mock('../../src/utils/package-json-reader.js');

describe('validateEnvironmentTool', () => {
  beforeEach(() => {
    // 각 테스트 전에 모든 mock 초기화
    vi.clearAllMocks();
  });

  describe('성공 케이스', () => {
    it('모든 패키지가 설치되어 있을 때 성공을 반환해야 함', async () => {
      // Arrange: readPackageJson이 모든 패키지가 설치된 것으로 반환하도록 설정
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          dependencies: {
            react: '^19.0.0',
            'framer-motion': '^11.0.0',
          },
        },
        installedPackages: {
          react: '^19.0.0',
          'framer-motion': '^11.0.0',
        },
      });

      // Act: 환경 검증 실행
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['react', 'framer-motion'],
      });

      // Assert: 모든 패키지가 설치되어 있고 누락된 패키지가 없어야 함
      expect(result.success).toBe(true);
      expect(result.installed).toEqual({
        react: '^19.0.0',
        'framer-motion': '^11.0.0',
      });
      expect(result.missing).toEqual([]);
      expect(result.installCommands?.npm).toBe('');
    });

    it('일부 패키지가 누락되었을 때 누락된 패키지를 식별해야 함', async () => {
      // Arrange: react만 설치되어 있고 다른 패키지는 없음
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          dependencies: {
            react: '^19.0.0',
          },
        },
        installedPackages: {
          react: '^19.0.0',
        },
      });

      // Act: 여러 패키지 요구
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['react', 'framer-motion', '@radix-ui/react-slot'],
      });

      // Assert: 설치된 패키지와 누락된 패키지가 올바르게 구분되어야 함
      expect(result.success).toBe(true);
      expect(result.installed).toEqual({ react: '^19.0.0' });
      expect(result.missing).toContain('framer-motion');
      expect(result.missing).toContain('@radix-ui/react-slot');
      expect(result.missing).toHaveLength(2);
    });

    it('devDependencies에 있는 패키지도 설치된 것으로 인식해야 함', async () => {
      // Arrange: devDependencies에 있는 패키지 설정
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          devDependencies: {
            vitest: '^2.0.0',
          },
        },
        installedPackages: {
          vitest: '^2.0.0',
        },
      });

      // Act: devDependencies 패키지 검증
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['vitest'],
      });

      // Assert: devDependencies 패키지가 설치된 것으로 인식되어야 함
      expect(result.success).toBe(true);
      expect(result.installed).toEqual({ vitest: '^2.0.0' });
      expect(result.missing).toEqual([]);
    });

    it('빈 필수 패키지 배열을 처리해야 함', async () => {
      // Arrange: 빈 package.json
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {},
        installedPackages: {},
      });

      // Act: 빈 필수 패키지 배열로 검증
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: [],
      });

      // Assert: 누락된 패키지가 없고 설치 명령이 비어있어야 함
      expect(result.success).toBe(true);
      expect(result.missing).toEqual([]);
      expect(result.installCommands?.npm).toBe('');
    });

    it('모든 패키지가 누락되었을 때를 처리해야 함', async () => {
      // Arrange: 아무 패키지도 설치되지 않음
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {},
        installedPackages: {},
      });

      // Act: 여러 패키지 요구
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['react', 'framer-motion'],
      });

      // Assert: 모든 패키지가 누락되어야 함
      expect(result.success).toBe(true);
      expect(result.installed).toEqual({});
      expect(result.missing).toEqual(['react', 'framer-motion']);
    });
  });

  describe('설치 명령 생성', () => {
    it('누락된 패키지에 대한 설치 명령을 생성해야 함', async () => {
      // Arrange: 아무 패키지도 설치되지 않음
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {},
        installedPackages: {},
      });

      // Act: 패키지 요구
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['framer-motion', '@radix-ui/react-slot'],
      });

      // Assert: 모든 패키지 매니저에 대한 설치 명령이 생성되어야 함
      expect(result.installCommands?.npm).toBe('npm install framer-motion @radix-ui/react-slot');
      expect(result.installCommands?.yarn).toBe('yarn add framer-motion @radix-ui/react-slot');
      expect(result.installCommands?.pnpm).toBe('pnpm add framer-motion @radix-ui/react-slot');
      expect(result.installCommands?.bun).toBe('bun add framer-motion @radix-ui/react-slot');
    });

    it('누락된 패키지가 없을 때 빈 설치 명령을 생성해야 함', async () => {
      // Arrange: 모든 패키지가 설치됨
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          dependencies: {
            react: '^19.0.0',
          },
        },
        installedPackages: {
          react: '^19.0.0',
        },
      });

      // Act: 설치된 패키지만 요구
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['react'],
      });

      // Assert: 설치 명령이 모두 빈 문자열이어야 함
      expect(result.installCommands?.npm).toBe('');
      expect(result.installCommands?.yarn).toBe('');
      expect(result.installCommands?.pnpm).toBe('');
      expect(result.installCommands?.bun).toBe('');
    });
  });

  describe('오류 처리', () => {
    it('package.json을 읽을 수 없을 때 오류를 반환해야 함', async () => {
      // Arrange: readPackageJson이 실패를 반환하도록 설정
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: false,
        error: 'package.json not found',
      });

      // Act: 환경 검증 시도
      const result = await validateEnvironmentTool({
        projectPath: '/nonexistent',
        requiredPackages: ['react'],
      });

      // Assert: 오류가 반환되어야 함
      expect(result.success).toBe(false);
      expect(result.error).toContain('not found');
    });

    it('예상치 못한 오류를 정상적으로 처리해야 함', async () => {
      // Arrange: readPackageJson이 예외를 던지도록 설정
      vi.mocked(packageJsonReader.readPackageJson).mockImplementation(() => {
        throw new Error('Unexpected error');
      });

      // Act: 환경 검증 시도
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['react'],
      });

      // Assert: 오류가 정상적으로 처리되어야 함
      expect(result.success).toBe(false);
      expect(result.error).toBeDefined();
    });
  });

  describe('프로젝트 경로 처리', () => {
    it('projectPath를 readPackageJson에 전달해야 함', async () => {
      // Arrange: mock 설정
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {},
        installedPackages: {},
      });

      // Act: 특정 경로로 검증
      await validateEnvironmentTool({
        projectPath: '/custom/project/path',
        requiredPackages: ['react'],
      });

      // Assert: readPackageJson이 올바른 경로로 호출되어야 함
      expect(packageJsonReader.readPackageJson).toHaveBeenCalledWith('/custom/project/path');
    });
  });

  describe('대소문자 구분', () => {
    it('패키지 이름을 대소문자 구분하여 처리해야 함', async () => {
      // Arrange: 잘못된 대소문자의 패키지 설정
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          dependencies: {
            React: '^19.0.0', // 잘못된 대소문자
          },
        },
        installedPackages: {
          React: '^19.0.0',
        },
      });

      // Act: 올바른 대소문자로 패키지 요구
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['react'], // 올바른 대소문자
      });

      // Assert: 대소문자가 다르므로 누락된 것으로 인식되어야 함
      expect(result.missing).toContain('react');
      expect(result.installed).not.toHaveProperty('react');
    });
  });

  describe('복합 시나리오', () => {
    it('dependencies와 devDependencies가 혼합된 경우를 처리해야 함', async () => {
      // Arrange: 다양한 종류의 dependencies
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          dependencies: {
            react: '^19.0.0',
            'react-dom': '^19.0.0',
          },
          devDependencies: {
            vitest: '^2.0.0',
            '@testing-library/react': '^14.0.0',
          },
        },
        installedPackages: {
          react: '^19.0.0',
          'react-dom': '^19.0.0',
          vitest: '^2.0.0',
          '@testing-library/react': '^14.0.0',
        },
      });

      // Act: 모든 종류의 패키지 요구
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: [
          'react',
          'react-dom',
          'vitest',
          '@testing-library/react',
          'missing-package',
        ],
      });

      // Assert: 설치된 패키지와 누락된 패키지가 올바르게 구분되어야 함
      expect(result.success).toBe(true);
      expect(result.installed).toEqual({
        react: '^19.0.0',
        'react-dom': '^19.0.0',
        vitest: '^2.0.0',
        '@testing-library/react': '^14.0.0',
      });
      expect(result.missing).toEqual(['missing-package']);
      expect(result.installCommands?.npm).toBe('npm install missing-package');
    });

    it('scoped 패키지(@로 시작하는 패키지)를 올바르게 처리해야 함', async () => {
      // Arrange: scoped 패키지들
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          dependencies: {
            '@radix-ui/react-slot': '^1.0.0',
          },
        },
        installedPackages: {
          '@radix-ui/react-slot': '^1.0.0',
        },
      });

      // Act: scoped 패키지 검증
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['@radix-ui/react-slot', '@radix-ui/react-dialog'],
      });

      // Assert: scoped 패키지가 올바르게 처리되어야 함
      expect(result.success).toBe(true);
      expect(result.installed).toHaveProperty('@radix-ui/react-slot');
      expect(result.missing).toContain('@radix-ui/react-dialog');
    });
  });

  describe('Tailwind compatibility', () => {
    it('Tailwind v4를 현재 FramingUI screen-generation setup과 비호환으로 보고해야 함', async () => {
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          dependencies: {
            '@framingui/ui': '^0.6.5',
            tailwindcss: '^4.1.0',
          },
        },
        installedPackages: {
          '@framingui/ui': '^0.6.5',
          tailwindcss: '^4.1.0',
        },
      });

      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['@framingui/ui'],
        checkTailwind: true,
      });

      expect(result.success).toBe(true);
      expect(
        result.tailwind?.issues.some(issue => issue.includes('tailwindcss@^4.1.0 detected'))
      ).toBe(true);
      expect(result.tailwind?.fixes.some(fix => fix.includes('tailwindcss@^3.4.17'))).toBe(true);
    });
  });

  describe('버전 정보', () => {
    it('설치된 패키지의 버전 정보를 포함해야 함', async () => {
      // Arrange: 다양한 버전 형식의 패키지들
      vi.mocked(packageJsonReader.readPackageJson).mockReturnValue({
        success: true,
        packageJson: {
          dependencies: {
            react: '^19.0.0',
            lodash: '~4.17.21',
            axios: '1.6.0',
            typescript: '>=5.0.0',
          },
        },
        installedPackages: {
          react: '^19.0.0',
          lodash: '~4.17.21',
          axios: '1.6.0',
          typescript: '>=5.0.0',
        },
      });

      // Act: 패키지 검증
      const result = await validateEnvironmentTool({
        projectPath: '/project',
        requiredPackages: ['react', 'lodash', 'axios', 'typescript'],
      });

      // Assert: 각 패키지의 버전 정보가 정확하게 포함되어야 함
      expect(result.success).toBe(true);
      expect(result.installed).toEqual({
        react: '^19.0.0',
        lodash: '~4.17.21',
        axios: '1.6.0',
        typescript: '>=5.0.0',
      });
    });
  });
});
