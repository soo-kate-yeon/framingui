/**
 * @framingui/ui API Reference
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '@framingui/ui API | framingui',
  description: 'API reference for @framingui/ui components.',
};

const COMPONENTS = [
  { name: 'Button', category: 'Actions' },
  { name: 'IconButton', category: 'Actions' },
  { name: 'Card', category: 'Layout' },
  { name: 'Dialog', category: 'Overlay' },
  { name: 'AlertDialog', category: 'Overlay' },
  { name: 'Popover', category: 'Overlay' },
  { name: 'Tooltip', category: 'Overlay' },
  { name: 'Input', category: 'Forms' },
  { name: 'Textarea', category: 'Forms' },
  { name: 'Select', category: 'Forms' },
  { name: 'Checkbox', category: 'Forms' },
  { name: 'Switch', category: 'Forms' },
  { name: 'RadioGroup', category: 'Forms' },
  { name: 'Slider', category: 'Forms' },
  { name: 'DatePicker', category: 'Forms' },
  { name: 'Tabs', category: 'Navigation' },
  { name: 'NavigationMenu', category: 'Navigation' },
  { name: 'DropdownMenu', category: 'Navigation' },
  { name: 'Avatar', category: 'Data Display' },
  { name: 'Badge', category: 'Data Display' },
  { name: 'Progress', category: 'Data Display' },
  { name: 'Separator', category: 'Data Display' },
  { name: 'ScrollArea', category: 'Data Display' },
  { name: 'Toast', category: 'Feedback' },
  { name: 'Skeleton', category: 'Feedback' },
];

export default function UIAPIPage() {
  const categories = [...new Set(COMPONENTS.map(c => c.category))];

  return (
    <div className="space-y-10">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">API Reference</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 font-mono">
          @framingui/ui
        </h1>
        <p className="text-xl text-neutral-600">
          30+ accessible React components built on Radix UI primitives.
        </p>
      </header>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Installation</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          <code>npm install @framingui/ui</code>
        </pre>
      </section>

      {/* Quick Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Quick Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Button, Card, Input } from '@framingui/ui';

export function LoginForm() {
  return (
    <Card className="p-6 space-y-4">
      <Input placeholder="Email" type="email" />
      <Input placeholder="Password" type="password" />
      <Button className="w-full">Sign In</Button>
    </Card>
  );
}`}
        </pre>
      </section>

      {/* Components List */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-neutral-900">Components</h2>
        
        {categories.map((category) => (
          <div key={category} className="space-y-3">
            <h3 className="text-lg font-semibold text-neutral-700">{category}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {COMPONENTS.filter(c => c.category === category).map((comp) => (
                <div
                  key={comp.name}
                  className="px-3 py-2 bg-white border border-neutral-200 rounded-lg text-sm font-mono text-neutral-700"
                >
                  {comp.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Button Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Button</h2>
        <p className="text-neutral-600">
          Primary action component with multiple variants and sizes.
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Button } from '@framingui/ui';

// Variants
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>

// With icon
<Button>
  <PlusIcon className="w-4 h-4 mr-2" />
  Add Item
</Button>`}
        </pre>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Prop</th>
                <th className="text-left py-3 pr-4 font-semibold text-neutral-900">Type</th>
                <th className="text-left py-3 font-semibold text-neutral-900">Default</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">variant</td>
                <td className="py-3 pr-4 font-mono text-sm text-xs">&apos;default&apos; | &apos;secondary&apos; | &apos;outline&apos; | &apos;ghost&apos; | &apos;destructive&apos;</td>
                <td className="py-3 font-mono text-sm">&apos;default&apos;</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">size</td>
                <td className="py-3 pr-4 font-mono text-sm">&apos;sm&apos; | &apos;default&apos; | &apos;lg&apos; | &apos;icon&apos;</td>
                <td className="py-3 font-mono text-sm">&apos;default&apos;</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">disabled</td>
                <td className="py-3 pr-4 font-mono text-sm">boolean</td>
                <td className="py-3 font-mono text-sm">false</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">asChild</td>
                <td className="py-3 pr-4 font-mono text-sm">boolean</td>
                <td className="py-3 font-mono text-sm">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Card Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Card</h2>
        <p className="text-neutral-600">
          Container component for grouping related content.
        </p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@framingui/ui';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Main content area</p>
  </CardContent>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>`}
        </pre>
      </section>

      {/* Theming */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Theming</h2>
        <p className="text-neutral-600">
          Components automatically inherit theme tokens via CSS custom properties.
        </p>
        <pre className="bg-neutral-100 text-neutral-700 p-4 rounded-lg overflow-x-auto text-sm">
{`/* Components use semantic tokens */
.button-primary {
  background: var(--color-brand-500);
  color: var(--color-brand-50);
  padding: var(--spacing-sm) var(--spacing-md);
  border-radius: var(--radius-md);
}

/* Theme-specific overrides applied automatically */
[data-theme="editorial-tech"] .button-primary {
  border-radius: var(--radius-full); /* pill buttons */
}`}
        </pre>
      </section>
    </div>
  );
}
