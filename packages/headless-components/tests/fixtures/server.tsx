import React from 'react';
import { createRoot } from 'react-dom/client';
import { TestApp } from './test-app';

/**
 * Development server for E2E testing
 * Renders TestApp for Playwright browser automation
 */

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = createRoot(container);
root.render(<TestApp />);
