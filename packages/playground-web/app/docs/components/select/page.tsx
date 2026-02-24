/**
 * Select Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Select | tekton/ui',
  description: 'Dropdown select component for choosing from options.',
};

export default function SelectPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Select</h1>
        <p className="text-xl text-neutral-600">
          Dropdown component for selecting from a list of options.
        </p>
      </header>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from '@tekton-ui/ui';`}
        </pre>
      </section>

      {/* Basic */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select a fruit" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">Apple</SelectItem>
    <SelectItem value="banana">Banana</SelectItem>
    <SelectItem value="orange">Orange</SelectItem>
  </SelectContent>
</Select>`}
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Label</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<div className="space-y-2">
  <Label htmlFor="country">Country</Label>
  <Select>
    <SelectTrigger id="country">
      <SelectValue placeholder="Select country" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="us">United States</SelectItem>
      <SelectItem value="uk">United Kingdom</SelectItem>
      <SelectItem value="ca">Canada</SelectItem>
      <SelectItem value="au">Australia</SelectItem>
    </SelectContent>
  </Select>
</div>`}
        </pre>
      </section>

      {/* With Groups */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Grouped Options</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Select>
  <SelectTrigger className="w-[280px]">
    <SelectValue placeholder="Select a timezone" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>North America</SelectLabel>
      <SelectItem value="est">Eastern (EST)</SelectItem>
      <SelectItem value="cst">Central (CST)</SelectItem>
      <SelectItem value="pst">Pacific (PST)</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Europe</SelectLabel>
      <SelectItem value="gmt">GMT</SelectItem>
      <SelectItem value="cet">Central European (CET)</SelectItem>
    </SelectGroup>
    <SelectGroup>
      <SelectLabel>Asia</SelectLabel>
      <SelectItem value="jst">Japan (JST)</SelectItem>
      <SelectItem value="kst">Korea (KST)</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}
        </pre>
      </section>

      {/* Controlled */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Controlled Select</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`function ControlledSelect() {
  const [value, setValue] = useState('');

  return (
    <div className="space-y-4">
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger>
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="draft">Draft</SelectItem>
          <SelectItem value="published">Published</SelectItem>
          <SelectItem value="archived">Archived</SelectItem>
        </SelectContent>
      </Select>
      <p className="text-sm text-neutral-500">
        Selected: {value || 'none'}
      </p>
    </div>
  );
}`}
        </pre>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Icons</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="Select priority" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="low">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        Low
      </div>
    </SelectItem>
    <SelectItem value="medium">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-yellow-500" />
        Medium
      </div>
    </SelectItem>
    <SelectItem value="high">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-red-500" />
        High
      </div>
    </SelectItem>
  </SelectContent>
</Select>`}
        </pre>
      </section>

      {/* Disabled */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Disabled States</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Disabled select
<Select disabled>
  <SelectTrigger>
    <SelectValue placeholder="Disabled" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="1">Option 1</SelectItem>
  </SelectContent>
</Select>

// Disabled option
<Select>
  <SelectTrigger>
    <SelectValue placeholder="Choose plan" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="free">Free</SelectItem>
    <SelectItem value="pro">Pro</SelectItem>
    <SelectItem value="enterprise" disabled>
      Enterprise (Coming soon)
    </SelectItem>
  </SelectContent>
</Select>`}
        </pre>
      </section>

      {/* Form Integration */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Form Integration</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useForm, Controller } from 'react-hook-form';

function ProfileForm() {
  const { control, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label>Role</Label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <Button type="submit">Save</Button>
    </form>
  );
}`}
        </pre>
      </section>

      {/* Filterable */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Searchable Select (Combobox)</h2>
        <p className="text-neutral-600">
          For searchable/filterable dropdowns, use the Combobox component instead.
        </p>
        <pre className="bg-neutral-100 text-neutral-700 p-4 rounded-lg overflow-x-auto text-sm">
{`// Use Combobox for searchable select
import { Combobox } from '@tekton-ui/ui';

// See Combobox documentation for usage`}
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
                <th className="text-left py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">value</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3">Controlled value</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">onValueChange</td>
                <td className="py-3 pr-4 font-mono text-sm">(value: string) =&gt; void</td>
                <td className="py-3">Change handler</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">defaultValue</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3">Default value (uncontrolled)</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">disabled</td>
                <td className="py-3 pr-4 font-mono text-sm">boolean</td>
                <td className="py-3">Disable select</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
