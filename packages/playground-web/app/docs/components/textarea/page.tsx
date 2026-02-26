/**
 * Textarea Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Textarea | framingui',
  description:
    'Textarea component for multi-line text input with auto-resize and character count support.',
};

export default function TextareaPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Textarea</h1>
        <p className="text-xl text-neutral-600">
          Multi-line text input. Supports auto-resize, character limits, and validation states.
        </p>
      </header>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          {`import { Textarea } from '@framingui/ui';`}
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Textarea 
  placeholder="Enter your message..." 
/>`}
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Label</h2>
        <p className="text-neutral-600">Combine with Label component for accessible forms.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<div className="space-y-2">
  <Label htmlFor="bio">Bio</Label>
  <Textarea 
    id="bio"
    placeholder="Tell us about yourself"
  />
</div>`}
        </pre>
      </section>

      {/* Auto Resize */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Auto Resize</h2>
        <p className="text-neutral-600">Automatically grows with content.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Textarea 
  autoResize
  minRows={3}
  maxRows={10}
  placeholder="Start typing..."
/>`}
        </pre>
      </section>

      {/* Character Count */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Character Count</h2>
        <p className="text-neutral-600">Show remaining characters for limited input.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Textarea 
  maxLength={280}
  showCount
  placeholder="What's happening?"
/>`}
        </pre>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">States</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Disabled
<Textarea disabled placeholder="Cannot edit" />

// Read-only
<Textarea readOnly value="This is read-only content" />

// Error state
<Textarea error placeholder="Something went wrong" />

// Success state
<Textarea success placeholder="Looks good!" />`}
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Sizes</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Textarea size="sm" placeholder="Small textarea" />
<Textarea size="md" placeholder="Medium (default)" />
<Textarea size="lg" placeholder="Large textarea" />`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 px-4 font-semibold">Prop</th>
                <th className="text-left py-3 px-4 font-semibold">Type</th>
                <th className="text-left py-3 px-4 font-semibold">Default</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">size</td>
                <td className="py-3 px-4 text-neutral-600">
                  &apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;
                </td>
                <td className="py-3 px-4 text-neutral-500">&apos;md&apos;</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">autoResize</td>
                <td className="py-3 px-4 text-neutral-600">boolean</td>
                <td className="py-3 px-4 text-neutral-500">false</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">minRows</td>
                <td className="py-3 px-4 text-neutral-600">number</td>
                <td className="py-3 px-4 text-neutral-500">3</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">maxRows</td>
                <td className="py-3 px-4 text-neutral-600">number</td>
                <td className="py-3 px-4 text-neutral-500">-</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">showCount</td>
                <td className="py-3 px-4 text-neutral-600">boolean</td>
                <td className="py-3 px-4 text-neutral-500">false</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">error</td>
                <td className="py-3 px-4 text-neutral-600">boolean</td>
                <td className="py-3 px-4 text-neutral-500">false</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Accessibility</h2>
        <ul className="list-disc list-inside text-neutral-600 space-y-2">
          <li>Uses native textarea element</li>
          <li>Support for aria-invalid on error state</li>
          <li>Character count announced to screen readers</li>
          <li>Proper label association via htmlFor</li>
        </ul>
      </section>
    </div>
  );
}
