# Tekton

OKLCH-based design token generator with WCAG AA compliance.

## Features

- **OKLCH Color Space**: Perceptually uniform color generation
- **WCAG AA Compliance**: Automatic accessibility validation
- **Design Token Generation**: Create scalable color systems
- **Component Presets**: Pre-configured tokens for common UI components
- **Multiple Output Formats**: CSS, JSON, JavaScript, TypeScript
- **Dark Mode Support**: Automatic dark theme generation
- **Deterministic**: Same input always produces same output

## Installation

```bash
npm install tekton
```

## Quick Start

```typescript
import { generateTokens } from 'tekton';

const tokens = generateTokens({
  primary: { l: 0.5, c: 0.15, h: 220 },
});
```

## Documentation

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines.

## License

MIT
