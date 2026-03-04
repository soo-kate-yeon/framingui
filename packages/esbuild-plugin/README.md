# @framingui/esbuild-plugin

> esbuild plugin for build-time token compliance validation

[![npm](https://img.shields.io/npm/v/@framingui/esbuild-plugin)](https://www.npmjs.com/package/@framingui/esbuild-plugin)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Installation

```bash
npm install -D @framingui/esbuild-plugin
```

## Usage

```javascript
import { build } from 'esbuild';
import { framinguiPlugin } from '@framingui/esbuild-plugin';

await build({
  entryPoints: ['src/index.ts'],
  bundle: true,
  plugins: [
    framinguiPlugin({
      strict: true, // Fail build on violations
      threshold: 100, // Required compliance percentage
    }),
  ],
});
```

## Features

- **AST Analysis**: Babel-based styled-components template scanning
- **Pattern Detection**: Identifies hardcoded colors and spacing
- **Build Enforcement**: Fails build when compliance < threshold
- **Detailed Reports**: File location, line number, and suggestions

## License

MIT
