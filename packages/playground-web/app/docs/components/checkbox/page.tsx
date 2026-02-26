/**
 * Checkbox Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkbox | tekton/ui',
  description: 'Checkbox component for boolean inputs with label support and accessible design.',
};

export default function CheckboxPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Checkbox</h1>
        <p className="text-xl text-neutral-600">
          Boolean input for selecting options. Supports labels, disabled state, and indeterminate
          mode.
        </p>
      </header>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          {`import { Checkbox } from '@tekton-ui/ui';`}
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Checkbox id="terms">
  I agree to the terms and conditions
</Checkbox>`}
        </pre>
      </section>

      {/* Controlled */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Controlled</h2>
        <p className="text-neutral-600">Use state to control the checkbox value.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`const [checked, setChecked] = useState(false);

<Checkbox 
  checked={checked} 
  onCheckedChange={setChecked}
>
  Subscribe to newsletter
</Checkbox>`}
        </pre>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">States</h2>
        <p className="text-neutral-600">Checkbox supports multiple visual states.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Default
<Checkbox>Default checkbox</Checkbox>

// Checked
<Checkbox defaultChecked>Checked by default</Checkbox>

// Disabled
<Checkbox disabled>Cannot interact</Checkbox>

// Indeterminate (for parent checkboxes)
<Checkbox indeterminate>Select all</Checkbox>`}
        </pre>
      </section>

      {/* With Description */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Description</h2>
        <p className="text-neutral-600">Add helper text below the label.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Checkbox 
  id="marketing"
  description="We'll send you occasional updates about new features."
>
  Marketing emails
</Checkbox>`}
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
                <td className="py-3 px-4 font-mono text-sm">checked</td>
                <td className="py-3 px-4 text-neutral-600">boolean</td>
                <td className="py-3 px-4 text-neutral-500">-</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">defaultChecked</td>
                <td className="py-3 px-4 text-neutral-600">boolean</td>
                <td className="py-3 px-4 text-neutral-500">false</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">disabled</td>
                <td className="py-3 px-4 text-neutral-600">boolean</td>
                <td className="py-3 px-4 text-neutral-500">false</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">indeterminate</td>
                <td className="py-3 px-4 text-neutral-600">boolean</td>
                <td className="py-3 px-4 text-neutral-500">false</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 px-4 font-mono text-sm">onCheckedChange</td>
                <td className="py-3 px-4 text-neutral-600">(checked: boolean) =&gt; void</td>
                <td className="py-3 px-4 text-neutral-500">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Accessibility */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Accessibility</h2>
        <ul className="list-disc list-inside text-neutral-600 space-y-2">
          <li>Uses native checkbox element for full keyboard support</li>
          <li>Properly associates label with input via htmlFor</li>
          <li>Supports aria-describedby for description text</li>
          <li>Focus ring visible on keyboard navigation</li>
        </ul>
      </section>
    </div>
  );
}
