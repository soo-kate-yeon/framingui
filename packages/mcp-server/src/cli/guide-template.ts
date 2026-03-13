export type Framework = 'nextjs' | 'vite';

export function generateGuide(framework: Framework): string {
  const appFile = framework === 'nextjs' ? 'app/page.tsx' : 'src/App.tsx';

  return `# FramingUI Guide

FramingUI is installed in this project as an MCP-assisted design system for production UI work.

## Authentication

Authenticate before using licensed themes:

\`\`\`bash
framingui-mcp login
\`\`\`

Check the current state with:

\`\`\`bash
framingui-mcp status
\`\`\`

## Recommended Workflow

1. Decide the style contract for this project:
   - \`host-utility\`
   - \`framingui-native\`
   - \`migrate\`
2. Inspect theme and component contracts before drafting:
   - \`preview-theme\`
   - \`preview-component\`
   - \`list-icon-libraries\` when icons are needed
3. Call \`get-screen-generation-context\`
4. Validate the generated definition with \`validate-screen-definition\`
5. Write React code from the validated definition
6. Run \`validate-environment\` with \`sourceFiles\` before handoff

## Style Contract Rules

### host-utility

Keep utility classes explicit. Do not rely on FramingUI default variants unless you intentionally migrate.

### framingui-native

Your global stylesheet should import:

\`\`\`css
@import '@framingui/ui/styles';
\`\`\`

Your root app entry should also mount \`FramingUIProvider\` with the generated \`framingui-theme\` module.

This contract assumes:

- \`tailwindcss-animate\` is installed
- the stylesheet import happens exactly once at the app root
- \`FramingUIProvider\` is mounted exactly once near the root
- the generated \`framingui-theme\` module is the source of truth for theme tokens

For Tailwind v4 projects, \`@import '@framingui/ui/styles';\` already provides FramingUI package source scanning and the animate plugin hook. Do not copy manual \`@source\` blocks for \`@framingui/ui\` into app CSS unless you are debugging the package itself.

Do not:

- duplicate \`FramingUIProvider\` inside pages or sections
- re-declare FramingUI theme tokens by hand in \`globals.css\`
- mix \`framingui-native\` and ad hoc host-utility overrides without intent
- diagnose missing padding or height first as a theme bug; check the runtime contract before editing recipes

## Runtime Contract Checklist

When FramingUI components look unstyled or partially styled, check these first:

1. \`@import '@framingui/ui/styles';\` exists in the global stylesheet and only once.
2. \`tailwindcss-animate\` is installed.
3. The app root mounts \`FramingUIProvider theme={framinguiTheme}\`.
4. The project uses the generated \`framingui-theme\` module instead of copied CSS variables.
5. Host CSS is not overriding \`body\`, \`button\`, \`input\`, or other primitives in a way that defeats the theme contract.
6. Page code is not reimplementing FramingUI recipes with stale utility classes.

## Slash Commands

FramingUI guidance is available for:

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

## Example Component Usage

\`\`\`tsx
// ${appFile}
import { FramingUIProvider, Button, Card, CardContent, CardHeader, CardTitle } from '@framingui/ui';
import framinguiTheme from './framingui-theme';

export default function Page() {
  return (
    <FramingUIProvider theme={framinguiTheme}>
      <Card>
        <CardHeader>
          <CardTitle>FramingUI is ready</CardTitle>
        </CardHeader>
        <CardContent>
          <Button>Continue</Button>
        </CardContent>
      </Card>
    </FramingUIProvider>
  );
}
\`\`\`

## Guardrails

- Do not claim that a component is unavailable without checking the catalog.
- Treat templates as hints, not the final structure.
- Treat the validated screen definition as the production contract.
- Keep semantic wrappers as HTML only when there is no FramingUI primitive to replace them.
- Treat \`@framingui/ui/styles\` and \`framingui-theme\` as the installation contract for \`framingui-native\`.
- If a Tailwind v4 app shows broken shape or missing motion, check the runtime contract before editing component code.
`;
}
