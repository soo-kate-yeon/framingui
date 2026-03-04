# @framingui/ui

> Production-ready React components with CSS Variables theming

[![npm](https://img.shields.io/npm/v/@framingui/ui)](https://www.npmjs.com/package/@framingui/ui)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](../../LICENSE)

## Installation

```bash
npm install @framingui/ui
```

## Quick Start

```tsx
import { Button, Input, Card } from '@framingui/ui';
import '@framingui/ui/styles';

export default function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome to FramingUI</CardTitle>
        <CardDescription>Build accessible UIs faster</CardDescription>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your email..." />
      </CardContent>
      <CardFooter>
        <Button variant="primary">Get Started</Button>
      </CardFooter>
    </Card>
  );
}
```

## Components

### Primitives (14)

Button, Input, Checkbox, Radio, Switch, Slider, Text, Heading, Badge, Avatar, Progress, Link, Image, List

### Composed (6)

Card, Form, Modal, Dropdown, Tabs, Table

## Key Features

- **WCAG 2.1 AA Compliant**: Fully accessible
- **CSS Variables**: 3-layer token system (Atomic → Semantic → Component)
- **Type-Safe**: Full TypeScript support
- **Zero Config**: Works out of the box
- **98%+ Test Coverage**: Production-ready quality

## Documentation

- [Component Reference](https://framingui.com/docs/components)
- [Theming Guide](https://framingui.com/docs/guides/theming)
- [CSS Variables Reference](https://framingui.com/docs/guides/css-variables)

## License

MIT
