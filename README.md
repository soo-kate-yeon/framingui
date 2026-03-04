# FramingUI

> Agent-First Design System. 0% hallucination by design.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/soo-kate-yeon/framingui)
[![Coverage](https://img.shields.io/badge/coverage-73.23%25-yellow)](https://github.com/soo-kate-yeon/framingui)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)

## What is FramingUI?

FramingUI는 AI 에이전트가 절대 헛소리(hallucination)를 하지 못하도록 설계된 디자인 시스템입니다. 완전한 타입 안전성과 구조화된 컴포넌트 지식 시스템을 통해 Claude, Cursor 같은 AI 도구가 항상 일관되고 정확한 UI를 생성하도록 보장합니다.

AI가 디자인 토큰을 준수하도록 강제하는 3-Layer 검증 시스템으로 하드코딩된 값(#fff, 16px)을 원천 차단하고, OKLCH 색상 공간 기반의 지각적으로 균일한 색상 시스템과 WCAG AA/AAA 자동 검증으로 접근성을 보장합니다.

## Installation

```bash
npm install @framingui/core @framingui/ui
```

## Quick Start

```typescript
import { loadTheme } from '@framingui/core';
import { Button, Card } from '@framingui/ui';

// 1. Load theme tokens
const theme = loadTheme('calm-wellness');

// 2. Use theme in your components
function App() {
  return (
    <Card>
      <Button variant="primary">Click me</Button>
    </Card>
  );
}
```

## Key Features

- **AI-Friendly Component Knowledge**: MCP 통합으로 Claude/Cursor가 컴포넌트 구조를 정확히 이해
- **OKLCH Color System**: 지각적으로 균일한 색상 생성과 WCAG 자동 준수
- **Token-Enforced Styling**: 컴파일 타임 + 런타임 + 빌드 타임 3-Layer 검증으로 100% 토큰 준수 보장
- **Type-Safe**: TypeScript 기반 완전한 타입 지원
- **Production Ready**: 73%+ 테스트 커버리지, 엄격한 품질 기준

## Documentation

전체 문서는 공식 사이트에서 확인하세요:

**[https://framingui.com/docs](https://framingui.com/docs)**

주요 가이드:

- [Getting Started](https://framingui.com/docs/guides/getting-started)
- [MCP Setup for Claude/Cursor](https://framingui.com/docs/guides/mcp-setup)
- [Component Reference](https://framingui.com/docs/components)
- [Theming Guide](https://framingui.com/docs/guides/theming)

## License

MIT © 2026

---

**Built with** [MoAI-ADK](https://github.com/asleep/moai-adk) - AI-Driven Development Kit
