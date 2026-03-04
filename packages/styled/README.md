# @framingui/styled

> Token-enforced styled-components wrapper with runtime validation

[![npm](https://img.shields.io/npm/v/@framingui/styled)](https://www.npmjs.com/package/@framingui/styled)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Installation

```bash
npm install @framingui/styled styled-components
```

## Usage

```typescript
import { styled, tokens } from '@framingui/styled';

// ✅ Valid: Using tokens
const Card = styled.div`
  background: ${tokens.bg.surface.elevated};
  padding: ${tokens.spacing[6]};
  border-radius: ${tokens.radius.lg};
  box-shadow: ${tokens.shadow.md};
`;

// ❌ Invalid: Hardcoded values throw runtime errors
const Bad = styled.div`
  background: #ffffff; // Error: Hardcoded value detected
  padding: 16px; // Error: Hardcoded value detected
`;
```

## Features

- **Compile-time Type Safety**: TypeScript enforces token types
- **Runtime Validation**: Detects hardcoded colors and spacing values
- **IDE Autocomplete**: Full IntelliSense support
- **styled-components Compatible**: Works with all styled-components features

## License

MIT
