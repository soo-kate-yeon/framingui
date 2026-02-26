/**
 * Card Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Card | framingui',
  description: 'Card component for grouping related content.',
};

export default function CardPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Card</h1>
        <p className="text-xl text-neutral-600">
          Container for grouping related content and actions.
        </p>
      </header>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from '@framingui/ui';`}
        </pre>
      </section>

      {/* Basic */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Your content here</p>
  </CardContent>
</Card>`}
        </pre>
      </section>

      {/* With Footer */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Footer</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Card>
  <CardHeader>
    <CardTitle>Account Settings</CardTitle>
    <CardDescription>Manage your account preferences</CardDescription>
  </CardHeader>
  <CardContent>
    <Input placeholder="Display name" />
  </CardContent>
  <CardFooter className="flex justify-end gap-2">
    <Button variant="outline">Cancel</Button>
    <Button>Save</Button>
  </CardFooter>
</Card>`}
        </pre>
      </section>

      {/* Simple Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Simple Card (No Subcomponents)</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Card className="p-6">
  <h3 className="font-semibold">Quick Stats</h3>
  <p className="text-3xl font-bold mt-2">1,234</p>
  <p className="text-sm text-neutral-500">Total users</p>
</Card>`}
        </pre>
      </section>

      {/* Pricing Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Pricing Card</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Card className="relative">
  <div className="absolute -top-3 left-4 px-2 py-1 bg-neutral-900 text-white text-xs rounded-full">
    Most Popular
  </div>
  <CardHeader>
    <CardTitle>Pro Plan</CardTitle>
    <CardDescription>For growing teams</CardDescription>
    <div className="mt-4">
      <span className="text-4xl font-bold">$29</span>
      <span className="text-neutral-500">/month</span>
    </div>
  </CardHeader>
  <CardContent>
    <ul className="space-y-2 text-sm">
      <li className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-600" /> Unlimited projects
      </li>
      <li className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-600" /> Priority support
      </li>
      <li className="flex items-center gap-2">
        <Check className="w-4 h-4 text-green-600" /> Advanced analytics
      </li>
    </ul>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Get Started</Button>
  </CardFooter>
</Card>`}
        </pre>
      </section>

      {/* Feature Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Feature Card</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Card className="p-6 hover:shadow-md transition-shadow">
  <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-center justify-center mb-4">
    <Zap className="w-6 h-6 text-neutral-600" />
  </div>
  <h3 className="font-semibold text-lg">Lightning Fast</h3>
  <p className="text-neutral-500 mt-2">
    Built for performance. Your pages load in milliseconds.
  </p>
</Card>`}
        </pre>
      </section>

      {/* Card Grid */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Card Grid</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {items.map((item) => (
    <Card key={item.id} className="p-4">
      <img 
        src={item.image} 
        alt={item.title}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="font-semibold mt-4">{item.title}</h3>
      <p className="text-sm text-neutral-500">{item.description}</p>
    </Card>
  ))}
</div>`}
        </pre>
      </section>

      {/* Interactive Card */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Interactive Card (as Link)</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
{`<Link href="/projects/123">
  <Card className="p-4 hover:border-neutral-400 transition-colors cursor-pointer">
    <div className="flex items-center justify-between">
      <div>
        <h3 className="font-semibold">Project Alpha</h3>
        <p className="text-sm text-neutral-500">Updated 2 hours ago</p>
      </div>
      <ChevronRight className="w-5 h-5 text-neutral-400" />
    </div>
  </Card>
</Link>`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Props</h2>
        <p className="text-neutral-600">
          Card accepts all standard div props. Use className for custom styling.
        </p>
        <pre className="bg-neutral-100 text-neutral-700 p-4 rounded-lg overflow-x-auto text-sm">
{`// All Card subcomponents
<Card />          // Main container
<CardHeader />    // Header section
<CardTitle />     // h3 element
<CardDescription /> // p element with muted style
<CardContent />   // Main content area
<CardFooter />    // Footer with flex layout`}
        </pre>
      </section>
    </div>
  );
}
