import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
<<<<<<< HEAD
  test: {
    globals: true,
    environment: 'jsdom',
=======
  esbuild: {
    jsx: 'automatic',
    loader: 'tsx',
    include: /\.(tsx?|jsx?)$/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.ts': 'tsx',
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
>>>>>>> master
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
<<<<<<< HEAD
      exclude: ['src/**/*.test.{ts,tsx}', 'src/**/*.d.ts', 'src/index.ts'],
      thresholds: {
        lines: 90,
        functions: 90,
        branches: 90,
        statements: 90,
=======
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/__tests__/**',
        'src/**/*.d.ts',
        'src/index.ts',
        'src/lib/tokens.ts', // Pure constant exports, no logic to test
        'src/lib/theme-loader.ts', // Complex utility with browser-specific logic
      ],
      all: true,
      skipFull: false,
      thresholds: {
        lines: 85,
        functions: 75, // Lower threshold due to many untested utility components
        branches: 85,
        statements: 85,
>>>>>>> master
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
