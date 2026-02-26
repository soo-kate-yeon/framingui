/**
 * Dependency Extractor Tests
 * SPEC-MCP-005 Phase 4: 의존성 추출 유틸리티 테스트
 */

import { describe, it, expect } from 'vitest';
import { extractDependencies } from '../../src/utils/dependency-extractor.js';

describe('extractDependencies', () => {
  describe('기본 외부 패키지 추출', () => {
    it('import 구문에서 외부 패키지를 추출해야 함', () => {
      const code = `
        import { motion } from 'framer-motion';
        import { Slot } from '@radix-ui/react-slot';
      `;
      const result = extractDependencies(code);

      expect(result.external).toContain('framer-motion');
      expect(result.external).toContain('@radix-ui/react-slot');
      expect(result.external).toHaveLength(2);
    });
  });

  describe('내부 패키지 추출', () => {
    it('@tekton 패키지를 internal로 추출해야 함', () => {
      const code = `
        import { Button } from '@framingui/ui';
        import { resolveScreen } from '@framingui/core';
      `;
      const result = extractDependencies(code);

      expect(result.internal).toContain('@framingui/ui');
      expect(result.internal).toContain('@framingui/core');
      expect(result.internal).toHaveLength(2);
      expect(result.external).not.toContain('@framingui/ui');
      expect(result.external).not.toContain('@framingui/core');
    });
  });

  describe('내장 모듈 제외', () => {
    it('Node.js 내장 모듈을 제외해야 함', () => {
      const code = `
        import fs from 'fs';
        import path from 'path';
        import { readFile } from 'node:fs';
      `;
      const result = extractDependencies(code);

      expect(result.external).not.toContain('fs');
      expect(result.external).not.toContain('path');
      expect(result.external).not.toContain('node:fs');
      expect(result.external).toHaveLength(0);
    });
  });

  describe('상대 경로 import 제외', () => {
    it('상대 경로 import를 제외해야 함', () => {
      const code = `
        import { MyComponent } from './MyComponent';
        import { utils } from '../utils';
        import { config } from '/absolute/path';
      `;
      const result = extractDependencies(code);

      expect(result.external).toHaveLength(0);
      expect(result.internal).toHaveLength(0);
    });
  });

  describe('동적 import 처리', () => {
    it('동적 import에서 의존성을 추출해야 함', () => {
      const code = `
        const module = await import('framer-motion');
        import('@radix-ui/react-dialog').then(m => m.Dialog);
      `;
      const result = extractDependencies(code);

      expect(result.external).toContain('framer-motion');
      expect(result.external).toContain('@radix-ui/react-dialog');
      expect(result.external).toHaveLength(2);
    });

    it('동적 import에서 상대 경로와 내장 모듈을 제외해야 함', () => {
      const code = `
        import('./local-module');
        import('fs');
      `;
      const result = extractDependencies(code);

      expect(result.external).toHaveLength(0);
    });
  });

  describe('서브패스에서 패키지 이름 추출', () => {
    it('서브패스 import에서 패키지 이름을 추출해야 함', () => {
      const code = `
        import { Button } from '@framingui/ui/components/Button';
        import { motion } from 'framer-motion/dist/framer-motion';
      `;
      const result = extractDependencies(code);

      expect(result.internal).toContain('@framingui/ui');
      expect(result.internal).not.toContain('@framingui/ui/components/Button');
      expect(result.external).toContain('framer-motion');
      expect(result.external).not.toContain('framer-motion/dist/framer-motion');
    });
  });

  describe('설치 명령어 생성', () => {
    it('모든 패키지 매니저에 대한 설치 명령어를 생성해야 함', () => {
      const code = `import { motion } from 'framer-motion';`;
      const result = extractDependencies(code);

      expect(result.installCommands.npm).toBe('npm install framer-motion');
      expect(result.installCommands.yarn).toBe('yarn add framer-motion');
      expect(result.installCommands.pnpm).toBe('pnpm add framer-motion');
      expect(result.installCommands.bun).toBe('bun add framer-motion');
    });

    it('여러 패키지에 대한 설치 명령어를 생성해야 함', () => {
      const code = `
        import { motion } from 'framer-motion';
        import { Slot } from '@radix-ui/react-slot';
      `;
      const result = extractDependencies(code);

      expect(result.installCommands.npm).toBe('npm install @radix-ui/react-slot framer-motion');
      expect(result.installCommands.yarn).toBe('yarn add @radix-ui/react-slot framer-motion');
      expect(result.installCommands.pnpm).toBe('pnpm add @radix-ui/react-slot framer-motion');
      expect(result.installCommands.bun).toBe('bun add @radix-ui/react-slot framer-motion');
    });

    it('패키지가 없을 때 빈 설치 명령어를 반환해야 함', () => {
      const code = `const x = 1;`;
      const result = extractDependencies(code);

      expect(result.installCommands.npm).toBe('');
      expect(result.installCommands.yarn).toBe('');
      expect(result.installCommands.pnpm).toBe('');
      expect(result.installCommands.bun).toBe('');
    });
  });

  describe('호환성 정보', () => {
    it('알려진 패키지의 호환성 정보를 포함해야 함', () => {
      const code = `import { motion } from 'framer-motion';`;
      const result = extractDependencies(code);

      expect(result.compatibility).toBeDefined();
      expect(result.compatibility?.react).toBe('^18.0.0 || ^19.0.0');
      expect(result.compatibility?.node).toBe('>=18.0.0');
    });

    it('호환성 정보가 없는 패키지의 경우 undefined여야 함', () => {
      const code = `import { something } from 'unknown-package';`;
      const result = extractDependencies(code);

      expect(result.compatibility).toBeUndefined();
    });

    it('여러 패키지의 호환성 정보를 통합해야 함', () => {
      const code = `
        import { motion } from 'framer-motion';
        import { Slot } from '@radix-ui/react-slot';
      `;
      const result = extractDependencies(code);

      expect(result.compatibility).toBeDefined();
      expect(result.compatibility?.react).toBe('^18.0.0 || ^19.0.0');
      expect(result.compatibility?.node).toBe('>=18.0.0');
    });
  });

  describe('호환성 노트', () => {
    it('특별한 요구사항이 있는 패키지의 노트를 포함해야 함', () => {
      const code = `import { motion } from 'framer-motion';`;
      const result = extractDependencies(code);

      expect(result.notes).toBeDefined();
      expect(result.notes).toContain('framer-motion requires React 18+ for concurrent features');
    });

    it('여러 패키지의 노트를 포함해야 함', () => {
      const code = `
        import { motion } from 'framer-motion';
        import { Slot } from '@radix-ui/react-slot';
      `;
      const result = extractDependencies(code);

      expect(result.notes).toBeDefined();
      expect(result.notes?.length).toBeGreaterThan(0);
      expect(result.notes).toContain('framer-motion requires React 18+ for concurrent features');
      expect(result.notes).toContain('@radix-ui/react-slot is a peer dependency of @framingui/ui');
    });

    it('노트가 없는 패키지의 경우 undefined여야 함', () => {
      const code = `import { something } from 'unknown-package';`;
      const result = extractDependencies(code);

      expect(result.notes).toBeUndefined();
    });
  });

  describe('에러 처리', () => {
    it('잘못된 코드를 안전하게 처리해야 함', () => {
      const code = `this is not valid javascript!!!`;
      const result = extractDependencies(code);

      expect(result.external).toEqual([]);
      expect(result.internal).toEqual([]);
      expect(result.installCommands.npm).toBe('');
    });

    it('파싱 에러 시 빈 의존성을 반환해야 함', () => {
      const code = `function broken( { missing closing brace`;
      const result = extractDependencies(code);

      expect(result.external).toEqual([]);
      expect(result.internal).toEqual([]);
      expect(result.installCommands.npm).toBe('');
      expect(result.installCommands.yarn).toBe('');
      expect(result.installCommands.pnpm).toBe('');
      expect(result.installCommands.bun).toBe('');
    });
  });

  describe('빈 코드 처리', () => {
    it('빈 코드를 처리해야 함', () => {
      const code = '';
      const result = extractDependencies(code);

      expect(result.external).toEqual([]);
      expect(result.internal).toEqual([]);
      expect(result.installCommands.npm).toBe('');
    });

    it('공백만 있는 코드를 처리해야 함', () => {
      const code = '   \n   \t   ';
      const result = extractDependencies(code);

      expect(result.external).toEqual([]);
      expect(result.internal).toEqual([]);
    });

    it('주석만 있는 코드를 처리해야 함', () => {
      const code = `
        // This is a comment
        /* Multi-line
           comment */
      `;
      const result = extractDependencies(code);

      expect(result.external).toEqual([]);
      expect(result.internal).toEqual([]);
    });
  });

  describe('다중 패키지 및 중복 제거', () => {
    it('여러 패키지를 처리하고 중복을 제거해야 함', () => {
      const code = `
        import { motion } from 'framer-motion';
        import { AnimatePresence } from 'framer-motion';
        import { Button } from '@framingui/ui';
        import { Card } from '@framingui/ui/components/Card';
      `;
      const result = extractDependencies(code);

      expect(result.external).toEqual(['framer-motion']);
      expect(result.internal).toEqual(['@framingui/ui']);
    });

    it('정렬된 결과를 반환해야 함', () => {
      const code = `
        import { z } from 'zod';
        import { motion } from 'framer-motion';
        import { Slot } from '@radix-ui/react-slot';
      `;
      const result = extractDependencies(code);

      // 알파벳 순서로 정렬되어야 함
      expect(result.external).toEqual(['@radix-ui/react-slot', 'framer-motion', 'zod']);
    });

    it('혼합된 import 형식을 처리해야 함', () => {
      const code = `
        import React from 'react';
        import { useState } from 'react';
        import * as ReactDOM from 'react-dom';
        import type { FC } from 'react';
      `;
      const result = extractDependencies(code);

      // react와 react-dom이 중복 없이 추출되어야 함
      expect(result.external).toEqual(['react', 'react-dom']);
    });
  });

  describe('복잡한 시나리오', () => {
    it('모든 케이스가 혼합된 복잡한 코드를 처리해야 함', () => {
      const code = `
        // 외부 패키지
        import { motion } from 'framer-motion';
        import { Slot } from '@radix-ui/react-slot';

        // 내부 패키지
        import { Button } from '@framingui/ui/components/Button';
        import { resolveScreen } from '@framingui/core';

        // 내장 모듈 (제외되어야 함)
        import fs from 'fs';
        import path from 'path';

        // 상대 경로 (제외되어야 함)
        import { MyComponent } from './MyComponent';
        import { utils } from '../utils';

        // 동적 import
        const module = await import('zod');

        // 중복 (제거되어야 함)
        import { AnimatePresence } from 'framer-motion';
      `;
      const result = extractDependencies(code);

      expect(result.external).toEqual(['@radix-ui/react-slot', 'framer-motion', 'zod']);
      expect(result.internal).toEqual(['@framingui/core', '@framingui/ui']);
      expect(result.installCommands.npm).toBe('npm install @radix-ui/react-slot framer-motion zod');
      expect(result.compatibility).toBeDefined();
      expect(result.notes).toBeDefined();
    });

    it('TypeScript 코드를 올바르게 파싱해야 함', () => {
      const code = `
        import type { ComponentType } from 'react';
        import { useState } from 'react';
        import type { User } from '@framingui/core/types';
        import { motion } from 'framer-motion';

        interface Props {
          name: string;
        }

        const Component: ComponentType<Props> = ({ name }) => {
          const [state, setState] = useState<string>('');
          return <motion.div>{name}</motion.div>;
        };
      `;
      const result = extractDependencies(code);

      expect(result.external).toEqual(['framer-motion', 'react']);
      expect(result.internal).toEqual(['@framingui/core']);
    });

    it('JSX 코드를 올바르게 파싱해야 함', () => {
      const code = `
        import { motion } from 'framer-motion';
        import { Button } from '@framingui/ui';

        export default function App() {
          return (
            <motion.div>
              <Button>Click me</Button>
            </motion.div>
          );
        }
      `;
      const result = extractDependencies(code);

      expect(result.external).toEqual(['framer-motion']);
      expect(result.internal).toEqual(['@framingui/ui']);
    });
  });
});
