export type Framework = 'nextjs' | 'vite';

export function generateClaudeMdSection(framework: Framework): string {
  const importPath = framework === 'nextjs' ? 'app/page.tsx' : 'src/App.tsx';

  return `
## FramingUI Workflow

### Authentication

Before using licensed themes:

\`\`\`bash
framingui-mcp login
\`\`\`

### Production Screen Flow

1. Decide the style contract:
   - \`host-utility\`
   - \`framingui-native\`
   - \`migrate\`
2. Inspect the theme when defaults matter:
   - \`preview-theme\`
3. Gather generation context:
   - \`get-screen-generation-context\`
4. Resolve ambiguity before drafting:
   - \`preview-component\`
   - \`list-icon-libraries\` when icons are needed
5. Validate structure:
   - \`validate-screen-definition\`
6. Write React code from the validated definition
7. Verify project integration:
   - \`validate-environment\` with \`sourceFiles\`

### Style Contract Rules

- If the project stays \`host-utility\`, keep utility classes explicit.
- If the project uses \`framingui-native\`, ensure the global stylesheet imports \`@framingui/ui/styles\`, \`tailwindcss-animate\` is installed, and the app root mounts \`FramingUIProvider\` with the generated \`framingui-theme\`.
- In Tailwind v4 apps, do not add manual \`@source\` entries for \`@framingui/ui\` unless you are debugging the package itself. The shared styles import is the source of truth.
- Do not duplicate \`FramingUIProvider\` or re-declare theme tokens in app CSS.

### Runtime Contract

Before changing recipes or component code, verify:

1. \`@import '@framingui/ui/styles';\` exists exactly once in the global stylesheet.
2. \`tailwindcss-animate\` is installed.
3. The root layout or entry mounts \`FramingUIProvider theme={framinguiTheme}\`.
4. The generated \`framingui-theme\` module is still the theme source of truth.
5. Host CSS is not overriding base primitives in a way that defeats FramingUI styles.
6. Page code is not carrying stale copied recipe utilities.

### Slash Commands

- \`/screen\`
- \`/draft\`
- \`/section\`
- \`/responsive\`
- \`/a11y\`
- \`/theme-swap\`
- \`/doctor\`
- \`/install-check\`
- \`/export\`
- \`/update\`

### Component Rule

Do not claim a FramingUI component is unavailable without checking \`list-components\` or \`preview-component\`.

### Example

\`\`\`tsx
// ${importPath}
import { FramingUIProvider, Button, Card, CardContent, CardHeader, CardTitle } from '@framingui/ui';
import framinguiTheme from './framingui-theme';

export default function Page() {
  return (
    <FramingUIProvider theme={framinguiTheme}>
      <Card>
        <CardHeader>
          <CardTitle>Ready for MCP-assisted UI work</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Continue</Button>
        </CardContent>
      </Card>
    </FramingUIProvider>
  );
}
\`\`\`
`;
}

export function generateAgentsMdSection(framework: Framework): string {
  const importPath = framework === 'nextjs' ? 'app/page.tsx' : 'src/App.tsx';

  return `
## FramingUI Workflow

FramingUI is available in this project through MCP.

### Required Sequence

1. Confirm authentication if licensed themes are needed.
2. Decide the style contract before generation.
3. Use \`preview-theme\` when theme defaults or recipes matter.
4. Use \`get-screen-generation-context\` as the main entry point.
5. Use \`preview-component\` for any ambiguous component contract.
6. Use \`list-icon-libraries\` before adding icons.
7. Validate structure with \`validate-screen-definition\`.
8. Write React code directly from the validated definition.
9. Run \`validate-environment\` with \`sourceFiles\` before final handoff.

### Style Contract

- \`host-utility\`: keep explicit utility styling
- \`framingui-native\`: import \`@framingui/ui/styles\`, install \`tailwindcss-animate\`, mount \`FramingUIProvider\`, and treat the generated \`framingui-theme\` module as the source of truth
- \`migrate\`: stop and clarify the migration path

### Runtime Contract

- In Tailwind v4 apps, the shared FramingUI stylesheet import already handles package source scanning and animate plugin registration.
- Do not duplicate \`FramingUIProvider\` inside pages.
- Do not hand-copy FramingUI CSS variables into app stylesheets.
- If component shape or motion looks broken, check the install/runtime contract before editing recipes.

### Allowed HTML

Semantic wrappers such as \`header\`, \`nav\`, \`section\`, and \`footer\` may remain HTML.
Interactive and form primitives should use FramingUI components when they exist.

### Example

\`\`\`tsx
// ${importPath}
import { FramingUIProvider, Button, Card, CardContent, CardHeader, CardTitle } from '@framingui/ui';
import framinguiTheme from './framingui-theme';

export default function Page() {
  return (
    <FramingUIProvider theme={framinguiTheme}>
      <Card>
        <CardHeader>
          <CardTitle>FramingUI project setup</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Continue</Button>
        </CardContent>
      </Card>
    </FramingUIProvider>
  );
}
\`\`\`
`;
}
