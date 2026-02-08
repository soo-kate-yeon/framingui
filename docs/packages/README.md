# Tekton UI Design System - 패키지 개요

Tekton UI는 **디자인 토큰 기반의 엔드투엔드 UI 디자인 시스템**입니다. TypeScript 타입 안전성부터 AI 통합까지, 디자인 시스템의 전체 파이프라인을 6개 패키지로 제공합니다.

모든 패키지는 `@tekton-ui` 스코프 아래 npm에 퍼블리시되며, 독립적으로 또는 조합하여 사용할 수 있습니다.

---

## 패키지 의존성 그래프

```
@tekton-ui/tokens (기반 - 의존성 없음)
    |
    +---> @tekton-ui/core (파이프라인 엔진)
    +---> @tekton-ui/styled (토큰 강제 스타일링)
              |
              v
         @tekton-ui/ui (React 컴포넌트 라이브러리)
              |
              v
         @tekton-ui/mcp-server (AI 통합)

@tekton-ui/esbuild-plugin (독립 빌드 도구)
```

**의존성 흐름 설명:**

- `@tekton-ui/tokens`는 순수 TypeScript 타입만 제공하며, 런타임 의존성이 없습니다.
- `@tekton-ui/core`와 `@tekton-ui/styled`는 각각 tokens의 타입 정의를 활용합니다.
- `@tekton-ui/ui`는 tokens를 직접 의존하며, Radix UI + Tailwind CSS 기반의 컴포넌트를 제공합니다.
- `@tekton-ui/mcp-server`는 core와 ui를 모두 활용하여 AI 에이전트에게 디자인 시스템 도구를 제공합니다.
- `@tekton-ui/esbuild-plugin`은 독립적으로 동작하며, 빌드 시 토큰 준수 여부를 검증합니다.

---

## 패키지 비교표

| 패키지                                             | 역할               | 핵심 기능                                       | 의존성                                      |
| -------------------------------------------------- | ------------------ | ----------------------------------------------- | ------------------------------------------- |
| [`@tekton-ui/tokens`](./tokens.md)                 | 타입 정의          | CSS 변수 기반 디자인 토큰의 TypeScript 타입     | 없음 (zero dependencies)                    |
| [`@tekton-ui/core`](./core.md)                     | 파이프라인 엔진    | Theme, Blueprint, Screen 생성 전체 흐름         | `zod`                                       |
| [`@tekton-ui/ui`](./ui.md)                         | React 컴포넌트     | 30+ 프로덕션 레디 컴포넌트 + 13개 스크린 템플릿 | `@tekton-ui/tokens`, Radix UI, Tailwind CSS |
| [`@tekton-ui/styled`](./styled.md)                 | 토큰 강제 스타일링 | styled-components 래퍼, 하드코딩 방지           | `@tekton-ui/tokens`, `styled-components`    |
| [`@tekton-ui/esbuild-plugin`](./esbuild-plugin.md) | 빌드 검증          | AST 기반 토큰 준수율 분석                       | `@babel/parser`, `@babel/traverse`          |
| [`@tekton-ui/mcp-server`](./mcp-server.md)         | AI 통합            | Claude Code용 MCP 서버, 16개 도구               | `@tekton-ui/core`, `@tekton-ui/ui`          |

---

## 빠른 시작

### 1. React 프로젝트에서 UI 컴포넌트 사용하기

```bash
npm install @tekton-ui/ui
```

```tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@tekton-ui/ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>환영합니다</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>시작하기</Button>
      </CardContent>
    </Card>
  );
}
```

### 2. styled-components에서 토큰 강제하기

```bash
npm install @tekton-ui/styled styled-components
```

```tsx
import { styled, tokens } from '@tekton-ui/styled';

const Container = styled.div`
  background: ${tokens.bg.surface.default};
  padding: ${tokens.spacing[4]};
  border-radius: ${tokens.radius.md};
`;
```

### 3. AI 에이전트와 함께 사용하기

```bash
npx @tekton-ui/mcp-server
```

Claude Code의 `.claude/mcp.json`에 설정을 추가하면, AI가 Tekton 디자인 시스템을 직접 활용하여 스크린을 생성할 수 있습니다.

---

## 기술 요구사항

- **Node.js**: >= 20.0.0
- **TypeScript**: >= 5.7
- **React** (ui 패키지): ^18.0.0
- **라이선스**: MIT

---

## 개별 패키지 문서

- [**@tekton-ui/tokens**](./tokens.md) - 디자인 토큰 타입 정의
- [**@tekton-ui/core**](./core.md) - 디자인 시스템 파이프라인 엔진
- [**@tekton-ui/ui**](./ui.md) - React 컴포넌트 라이브러리
- [**@tekton-ui/styled**](./styled.md) - 토큰 강제 styled-components 래퍼
- [**@tekton-ui/esbuild-plugin**](./esbuild-plugin.md) - 빌드 타임 토큰 검증
- [**@tekton-ui/mcp-server**](./mcp-server.md) - Claude Code MCP 서버
