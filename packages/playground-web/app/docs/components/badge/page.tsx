/**
 * Badge Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Badge | tekton/ui',
  description: 'Badge component for status indicators, labels, and counts with multiple variants.',
};

export default function BadgePage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Badge</h1>
        <p className="text-xl text-neutral-600">
          Display status indicators, labels, counts, and tags. Compact and versatile.
        </p>
      </header>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          {`import { Badge } from '@tekton-ui/ui';`}
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Badge>New</Badge>`}
        </pre>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Variants</h2>
        <p className="text-neutral-600">5 built-in variants for different contexts.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Default - Primary/neutral style
<Badge variant="default">Default</Badge>

// Secondary - Less prominent
<Badge variant="secondary">Secondary</Badge>

// Outline - Bordered style
<Badge variant="outline">Outline</Badge>

// Destructive - Errors, warnings
<Badge variant="destructive">Error</Badge>

// Success - Positive states
<Badge variant="success">Active</Badge>`}
        </pre>
      </section>

      {/* Status Indicators */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Status Indicators</h2>
        <p className="text-neutral-600">Use badges to show item status.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Order status
<Badge variant="secondary">Pending</Badge>
<Badge variant="default">Processing</Badge>
<Badge variant="success">Shipped</Badge>
<Badge variant="outline">Delivered</Badge>

// User status
<Badge variant="success">Online</Badge>
<Badge variant="secondary">Away</Badge>
<Badge variant="outline">Offline</Badge>

// Subscription tiers
<Badge variant="outline">Free</Badge>
<Badge variant="default">Pro</Badge>
<Badge variant="secondary">Enterprise</Badge>`}
        </pre>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Icons</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Check, X, Clock, Star } from 'lucide-react';

// Icon before text
<Badge variant="success">
  <Check className="w-3 h-3 mr-1" />
  Verified
</Badge>

// Icon after text
<Badge variant="destructive">
  Failed
  <X className="w-3 h-3 ml-1" />
</Badge>

// Status with icon
<Badge variant="secondary">
  <Clock className="w-3 h-3 mr-1" />
  Pending Review
</Badge>

// Featured badge
<Badge variant="default">
  <Star className="w-3 h-3 mr-1" />
  Featured
</Badge>`}
        </pre>
      </section>

      {/* Count Badges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Count Badges</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Notification count
<Badge>3</Badge>

// Large count (truncate)
<Badge>99+</Badge>

// With label
<div className="flex items-center gap-2">
  <span>Messages</span>
  <Badge variant="destructive">5</Badge>
</div>

// On icon (absolute positioning)
<div className="relative inline-block">
  <BellIcon className="w-6 h-6" />
  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs flex items-center justify-center">
    3
  </Badge>
</div>`}
        </pre>
      </section>

      {/* Tags */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">As Tags</h2>
        <p className="text-neutral-600">Use badges as removable tags.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { X } from 'lucide-react';

// Single tag
<Badge variant="secondary" className="cursor-pointer hover:bg-neutral-200">
  React
  <X className="w-3 h-3 ml-1" />
</Badge>

// Tag list
<div className="flex flex-wrap gap-2">
  {tags.map(tag => (
    <Badge key={tag} variant="outline">
      {tag}
      <button onClick={() => removeTag(tag)} className="ml-1">
        <X className="w-3 h-3" />
      </button>
    </Badge>
  ))}
</div>`}
        </pre>
      </section>

      {/* In Lists */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">In Lists</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Navigation with counts
<nav className="space-y-1">
  <a className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100">
    <span>Inbox</span>
    <Badge>12</Badge>
  </a>
  <a className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100">
    <span>Drafts</span>
    <Badge variant="secondary">3</Badge>
  </a>
</nav>

// Table row status
<tr>
  <td>Order #1234</td>
  <td>$99.00</td>
  <td><Badge variant="success">Paid</Badge></td>
</tr>`}
        </pre>
      </section>

      {/* Real World Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Real World Examples</h2>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Product Card</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<div className="relative rounded-lg border p-4">
  <Badge className="absolute top-2 right-2">New</Badge>
  <img src="/product.jpg" alt="Product" className="rounded" />
  <h3 className="mt-4 font-semibold">Premium Headphones</h3>
  <div className="flex items-center gap-2 mt-2">
    <Badge variant="success">In Stock</Badge>
    <Badge variant="outline">Free Shipping</Badge>
  </div>
</div>`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">User Profile</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<div className="flex items-center gap-3">
  <Avatar src="/avatar.jpg" />
  <div>
    <div className="flex items-center gap-2">
      <span className="font-semibold">Jane Doe</span>
      <Badge variant="default" className="text-xs">Pro</Badge>
    </div>
    <p className="text-sm text-neutral-500">Software Engineer</p>
  </div>
</div>`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Feature Comparison</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<div className="flex items-center justify-between py-3 border-b">
  <span>API Access</span>
  <div className="flex gap-2">
    <Badge variant="outline">Free: Limited</Badge>
    <Badge variant="default">Pro: Unlimited</Badge>
  </div>
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
                <td className="py-3 pr-4 font-mono text-xs">
                  default | secondary | outline | destructive | success
                </td>
                <td className="py-3 pr-4 font-mono text-sm">default</td>
                <td className="py-3">Visual style</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">className</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3 pr-4 font-mono text-sm">-</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">children</td>
                <td className="py-3 pr-4 font-mono text-sm">ReactNode</td>
                <td className="py-3 pr-4 font-mono text-sm">-</td>
                <td className="py-3">Badge content</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
