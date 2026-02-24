/**
 * Input Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Input | tekton/ui',
  description: 'Input component for text entry.',
};

export default function InputPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Input</h1>
        <p className="text-xl text-neutral-600">
          Text input field for forms and user entry.
        </p>
      </header>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
{`import { Input } from '@tekton-ui/ui';`}
        </pre>
      </section>

      {/* Basic */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Input placeholder="Enter your email" />`}
        </pre>
      </section>

      {/* Types */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Input Types</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Input type="text" placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="tel" placeholder="Phone" />
<Input type="url" placeholder="URL" />
<Input type="search" placeholder="Search..." />
<Input type="date" />
<Input type="time" />`}
        </pre>
      </section>

      {/* With Label */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Label</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Label } from '@tekton-ui/ui';

<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input id="email" type="email" placeholder="you@example.com" />
</div>`}
        </pre>
      </section>

      {/* With Icon */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Icon</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { Search, Mail, Lock } from 'lucide-react';

// Icon on left
<div className="relative">
  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
  <Input className="pl-10" placeholder="Search..." />
</div>

// Icon on right
<div className="relative">
  <Input type="email" placeholder="Email" />
  <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
</div>`}
        </pre>
      </section>

      {/* States */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">States</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`// Disabled
<Input disabled placeholder="Disabled input" />

// Read only
<Input readOnly value="Read only value" />

// Error state (via className)
<Input className="border-red-500 focus:ring-red-500" placeholder="Error" />

// With error message
<div className="space-y-1">
  <Input className="border-red-500" placeholder="Email" />
  <p className="text-sm text-red-500">Please enter a valid email</p>
</div>`}
        </pre>
      </section>

      {/* Form Example */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Form Example</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<form className="space-y-4">
  <div className="space-y-2">
    <Label htmlFor="name">Full Name</Label>
    <Input id="name" placeholder="John Doe" />
  </div>
  
  <div className="space-y-2">
    <Label htmlFor="email">Email</Label>
    <Input id="email" type="email" placeholder="john@example.com" />
  </div>
  
  <div className="space-y-2">
    <Label htmlFor="password">Password</Label>
    <Input id="password" type="password" placeholder="••••••••" />
  </div>
  
  <Button type="submit" className="w-full">
    Create Account
  </Button>
</form>`}
        </pre>
      </section>

      {/* With React Hook Form */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With React Hook Form</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Input {...register('email')} placeholder="Email" />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>
      
      <div className="space-y-1">
        <Input {...register('password')} type="password" placeholder="Password" />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>
      
      <Button type="submit">Sign In</Button>
    </form>
  );
}`}
        </pre>
      </section>

      {/* Search Input */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Search Input</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`function SearchInput() {
  const [query, setQuery] = useState('');

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10 pr-10"
      />
      {query && (
        <button
          onClick={() => setQuery('')}
          className="absolute right-3 top-1/2 -translate-y-1/2"
        >
          <X className="w-4 h-4 text-neutral-400 hover:text-neutral-600" />
        </button>
      )}
    </div>
  );
}`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Props</h2>
        <p className="text-neutral-600">
          Input accepts all standard input element props.
        </p>
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
                <td className="py-3 pr-4 font-mono text-sm">type</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3">HTML input type</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">placeholder</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3">Placeholder text</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">disabled</td>
                <td className="py-3 pr-4 font-mono text-sm">boolean</td>
                <td className="py-3">Disable input</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
