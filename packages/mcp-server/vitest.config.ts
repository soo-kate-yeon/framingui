import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@framingui/ui': resolve(__dirname, '../ui/src/index.ts'),
      '@framingui/core': resolve(__dirname, '../core/src/index.ts'),
    },
  },
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/schemas/**', 'src/storage/**', 'src/tools/**', 'src/utils/**'],
      exclude: ['**/*.d.ts', '**/*.test.ts', '**/*.test.js'],
      thresholds: {
        lines: 85,
        functions: 85,
        branches: 85,
        statements: 85,
      },
    },
  },
});
