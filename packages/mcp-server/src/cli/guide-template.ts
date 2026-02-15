/**
 * TEKTON-GUIDE.md 콘텐츠 템플릿
 * 프레임워크별 맞춤 가이드 생성
 */

export type Framework = 'nextjs' | 'vite';

/**
 * TEKTON-GUIDE.md 콘텐츠 생성
 */
export function generateGuide(framework: Framework): string {
  const importExample =
    framework === 'nextjs'
      ? `// app/page.tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@tekton-ui/ui';

export default function HomePage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg">Get Started</Button>
      </CardContent>
    </Card>
  );
}`
      : `// src/App.tsx
import { Button, Card, CardHeader, CardTitle, CardContent } from '@tekton-ui/ui';

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="default" size="lg">Get Started</Button>
      </CardContent>
    </Card>
  );
}

export default App;`;

  return `# Tekton UI Guide

> AI-powered design system for building production-ready UIs.

---

## Authentication

Before generating screens, authenticate with your Tekton account:

\`\`\`bash
tekton-mcp login
\`\`\`

This opens your browser for OAuth authentication. Your credentials are stored in \`~/.tekton/credentials.json\`.

**Why authentication is required:**
- All 6 themes require valid licenses
- No free themes are available
- Authentication verifies your license status

**Check your authentication status:**

\`\`\`bash
tekton-mcp status
\`\`\`

---

## Screen Generation Workflow

Tekton provides a **3-step workflow** for production-ready screen generation:

### Step 1/3: Get Context

Claude Code calls \`get-screen-generation-context\` with your screen description:

\`\`\`
"Create a user dashboard with profile card and recent activity"
\`\`\`

Returns: Template matches, component suggestions with inline props/variants, Screen Definition schema

### Step 2/3: Validate Definition

Claude Code generates a Screen Definition JSON and calls \`validate-screen-definition\`:

Returns: Validation results, errors with auto-fix patches (if any), improvement suggestions

### After Validation: Write Code

Claude Code writes React code directly using the components and props from Step 1 context.

### Step 3/3: Validate Environment (Optional)

Claude Code calls \`validate-environment\` to check your project:

Returns: Missing packages, install commands, Tailwind CSS config validation

**Important:** Always check the dependencies and Tailwind configuration before running generated code.

---

## Quick Start

### Using Components

\`\`\`tsx
${importExample}
\`\`\`

### AI Screen Generation

Claude Code에서 MCP 서버가 연결되어 있으면, 자연어로 화면을 생성할 수 있습니다:

\`\`\`
"로그인 화면 만들어줘"
"대시보드 페이지를 카드 레이아웃으로 만들어줘"
"사용자 프로필 페이지를 만들어줘"
\`\`\`

---

## Components (30+)

### Core
Button, Input, Label, Card, Badge, Avatar, Separator, Checkbox, RadioGroup, Switch, Textarea, Skeleton, ScrollArea, Select, Progress

### Complex
Dialog, DropdownMenu, Table, Tabs, Toast, Tooltip, Popover, Sheet, AlertDialog, NavigationMenu

### Advanced
Sidebar, Breadcrumb, Command, Calendar, Form

### Usage

\`\`\`tsx
import { Button, Dialog, DialogTrigger, DialogContent } from '@tekton-ui/ui';
\`\`\`

---

## Screen Templates (13)

프로덕션에서 바로 사용할 수 있는 완성된 화면 템플릿:

| Category | Templates |
|----------|-----------|
| Auth | Login, Signup, ForgotPassword, Verification |
| Core | Landing, Preferences, Profile |
| Feedback | Loading, Error, Empty, Confirmation, Success |
| Dashboard | Dashboard |

---

## Themes (6)

| Theme ID | Description |
|----------|-------------|
| \`classic-magazine\` | Classic magazine style |
| \`equinox-fitness\` | Fitness & wellness |
| \`minimal-workspace\` | Minimal workspace |
| \`neutral-humanism\` | Neutral humanism |
| \`round-minimal\` | Round minimal |
| \`square-minimalism\` | Square minimalism |

### Applying a Theme

\`\`\`tsx
import { themeToCSS, injectThemeCSS } from '@tekton-ui/ui';

// Inject theme CSS at runtime
injectThemeCSS(themeData);
\`\`\`

---

## Utility: cn()

\`\`\`tsx
import { cn } from '@tekton-ui/ui';

<div className={cn('p-4 bg-white', isActive && 'bg-blue-500', className)} />
\`\`\`

---

## Links

- [npm: @tekton-ui/ui](https://www.npmjs.com/package/@tekton-ui/ui)
- [npm: @tekton-ui/mcp-server](https://www.npmjs.com/package/@tekton-ui/mcp-server)
`;
}
