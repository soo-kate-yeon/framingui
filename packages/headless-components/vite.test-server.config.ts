import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Vite configuration for E2E test server
 * Serves test application for Playwright automation
 */
export default defineConfig({
  plugins: [react()],
  root: './tests/fixtures',
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    outDir: '../../dist-test',
  },
});
