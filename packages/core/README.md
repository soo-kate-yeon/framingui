# @framingui/core

> Core design system pipeline: Theme → Blueprint → Screen generation

[![npm](https://img.shields.io/npm/v/@framingui/core)](https://www.npmjs.com/package/@framingui/core)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Installation

```bash
npm install @framingui/core
```

## Quick Start

```typescript
import { loadTheme, createBlueprint, render } from '@framingui/core';

// 1. Load theme
const theme = loadTheme('calm-wellness');

// 2. Create blueprint
const blueprint = createBlueprint({
  name: 'Dashboard',
  themeId: theme.id,
  layout: 'dashboard',
  components: [
    { type: 'Heading', props: { level: 1 }, children: ['Welcome'] },
    {
      type: 'Card',
      children: [
        { type: 'Text', children: ['Your stats here'] },
        { type: 'Button', props: { variant: 'primary' }, children: ['View More'] },
      ],
    },
  ],
});

// 3. Render to JSX
const result = render(blueprint);
console.log(result.code);
```

## Key Features

- **3-Layer Token System**: Atomic → Semantic → Component architecture
- **Type-Safe**: Full TypeScript support with Zod validation
- **OKLCH Color System**: Perceptually uniform colors with WCAG validation
- **Dark Mode**: Built-in dark mode support
- **Zero Dependencies**: Only Zod for runtime validation

## Documentation

See the [official documentation](https://framingui.com/docs) for:

- [Token System Guide](https://framingui.com/docs/guides/tokens)
- [Theme Configuration](https://framingui.com/docs/guides/theming)
- [Blueprint API](https://framingui.com/docs/api/blueprint)
- [Screen Generation](https://framingui.com/docs/guides/screen-generation)

## License

MIT
