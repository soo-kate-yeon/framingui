# @framingui/tokens

> TypeScript token type definitions with compile-time enforcement

[![npm](https://img.shields.io/npm/v/@framingui/tokens)](https://www.npmjs.com/package/@framingui/tokens)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Installation

```bash
npm install @framingui/tokens
```

## Usage

```typescript
import type { FramingUITokens, TokenReference } from '@framingui/tokens';

// TokenReference ensures only CSS variables are allowed
const background: TokenReference = 'var(--framingui-bg-surface-default)';

// TypeScript error: Type '"#ffffff"' is not assignable to type 'TokenReference'
// const invalid: TokenReference = '#ffffff';
```

## Token Categories

- **BgTokens**: Background colors
- **FgTokens**: Foreground/text colors
- **SpacingTokens**: Spacing scale
- **RadiusTokens**: Border radius
- **TypographyTokens**: Font properties
- **ShadowTokens**: Box shadows

## License

MIT
