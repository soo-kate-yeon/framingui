/**
 * Button Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Button | tekton/ui',
  description: 'Button component with variants, sizes, and examples.',
};

export default function ButtonPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">
          Button
        </h1>
        <p className="text-xl text-neutral-600">
          Trigger actions and events. Supports multiple variants, sizes, and states.
        </p>
      </header>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
{`import { Button } from '@tekton-ui/ui';`}
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Button>Click me</Button>`}
        </pre>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Variants</h2>
        <p className="text-neutral-600">5 built-in variants for different contexts.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Default - Primary actions
<Button variant="default">Save Changes</Button>

// Secondary - Less prominent actions
<Button variant="secondary">Cancel</Button>

// Outline - Bordered style
<Button variant="outline">Learn More</Button>

// Ghost - Minimal, no background
<Button variant="ghost">Skip</Button>

// Destructive - Dangerous actions
<Button variant="destructive">Delete Account</Button>`}
        </pre>
      </section>

      {/* Sizes */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Sizes</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><PlusIcon /></Button>`}
        </pre>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Icons</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Plus, ArrowRight, Loader2 } from 'lucide-react';

// Icon on the left
<Button>
  <Plus className="w-4 h-4 mr-2" />
  Add Item
</Button>

// Icon on the right
<Button>
  Continue
  <ArrowRight className="w-4 h-4 ml-2" />
</Button>

// Icon only
<Button size="icon" variant="outline">
  <Plus className="w-4 h-4" />
</Button>`}
        </pre>
      </section>

      {/* Loading State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Loading State</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Loader2 } from 'lucide-react';

<Button disabled>
  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
  Please wait
</Button>`}
        </pre>
      </section>

      {/* As Link */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">As Link</h2>
        <p className="text-neutral-600">Use asChild to render as a different element.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import Link from 'next/link';

<Button asChild>
  <Link href="/dashboard">Go to Dashboard</Link>
</Button>

<Button asChild variant="outline">
  <a href="https://github.com" target="_blank">
    View on GitHub
  </a>
</Button>`}
        </pre>
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Full Width</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Button className="w-full">
  Sign In
</Button>`}
        </pre>
      </section>

      {/* Button Group */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Button Group</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<div className="flex gap-2">
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</div>

// Stacked on mobile, inline on desktop
<div className="flex flex-col sm:flex-row gap-2">
  <Button variant="outline" className="w-full sm:w-auto">Cancel</Button>
  <Button className="w-full sm:w-auto">Confirm</Button>
</div>`}
        </pre>
      </section>

      {/* Real World Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Real World Examples</h2>
        
        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Form Submit Button</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>
    </form>
  );
}`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">CTA Section</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<div className="text-center space-y-4">
  <h2 className="text-3xl font-bold">Ready to get started?</h2>
  <p className="text-neutral-600">Start your free trial today.</p>
  <div className="flex justify-center gap-4">
    <Button size="lg">Start Free Trial</Button>
    <Button size="lg" variant="outline">Schedule Demo</Button>
  </div>
</div>`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Danger Zone</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<div className="border border-red-200 rounded-lg p-4 bg-red-50">
  <h3 className="font-semibold text-red-900">Delete Account</h3>
  <p className="text-sm text-red-700 mt-1">
    This action cannot be undone.
  </p>
  <Button variant="destructive" className="mt-4">
    Delete My Account
  </Button>
</div>`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 pr-4 font-semibold">Prop</th>
                <th className="text-left py-3 pr-4 font-semibold">Type</th>
                <th className="text-left py-3 pr-4 font-semibold">Default</th>
                <th className="text-left py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">variant</td>
                <td className="py-3 pr-4 font-mono text-xs">default | secondary | outline | ghost | destructive</td>
                <td className="py-3 pr-4 font-mono text-sm">default</td>
                <td className="py-3">Visual style</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">size</td>
                <td className="py-3 pr-4 font-mono text-xs">sm | default | lg | icon</td>
                <td className="py-3 pr-4 font-mono text-sm">default</td>
                <td className="py-3">Button size</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">asChild</td>
                <td className="py-3 pr-4 font-mono text-sm">boolean</td>
                <td className="py-3 pr-4 font-mono text-sm">false</td>
                <td className="py-3">Render as child element</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">disabled</td>
                <td className="py-3 pr-4 font-mono text-sm">boolean</td>
                <td className="py-3 pr-4 font-mono text-sm">false</td>
                <td className="py-3">Disable interactions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
