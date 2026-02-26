/**
 * Tabs Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tabs | tekton/ui',
  description:
    'Tabs component for organizing content into switchable panels with accessibility support.',
};

export default function TabsPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Tabs</h1>
        <p className="text-xl text-neutral-600">
          Organize content into switchable panels. Fully accessible with keyboard navigation.
        </p>
      </header>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          {`import { Tabs, TabsList, TabsTrigger, TabsContent } from '@tekton-ui/ui';`}
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Tabs defaultValue="account">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">
    <p>Account settings go here.</p>
  </TabsContent>
  <TabsContent value="password">
    <p>Password settings go here.</p>
  </TabsContent>
</Tabs>`}
        </pre>
      </section>

      {/* Controlled */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Controlled</h2>
        <p className="text-neutral-600">Control the active tab externally with state.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`function ControlledTabs() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="analytics">Analytics content</TabsContent>
      <TabsContent value="reports">Reports content</TabsContent>
    </Tabs>
  );
}`}
        </pre>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Icons</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { User, CreditCard, Settings, Bell } from 'lucide-react';

<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">
      <User className="w-4 h-4 mr-2" />
      Profile
    </TabsTrigger>
    <TabsTrigger value="billing">
      <CreditCard className="w-4 h-4 mr-2" />
      Billing
    </TabsTrigger>
    <TabsTrigger value="settings">
      <Settings className="w-4 h-4 mr-2" />
      Settings
    </TabsTrigger>
    <TabsTrigger value="notifications">
      <Bell className="w-4 h-4 mr-2" />
      Notifications
    </TabsTrigger>
  </TabsList>
  {/* Tab content */}
</Tabs>`}
        </pre>
      </section>

      {/* Icon Only */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Icon Only</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Tabs defaultValue="grid">
  <TabsList>
    <TabsTrigger value="grid" aria-label="Grid view">
      <Grid className="w-4 h-4" />
    </TabsTrigger>
    <TabsTrigger value="list" aria-label="List view">
      <List className="w-4 h-4" />
    </TabsTrigger>
    <TabsTrigger value="kanban" aria-label="Kanban view">
      <Kanban className="w-4 h-4" />
    </TabsTrigger>
  </TabsList>
</Tabs>`}
        </pre>
      </section>

      {/* With Badges */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Badges</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Tabs defaultValue="all">
  <TabsList>
    <TabsTrigger value="all">
      All
      <Badge className="ml-2" variant="secondary">128</Badge>
    </TabsTrigger>
    <TabsTrigger value="unread">
      Unread
      <Badge className="ml-2" variant="destructive">12</Badge>
    </TabsTrigger>
    <TabsTrigger value="archived">
      Archived
    </TabsTrigger>
  </TabsList>
</Tabs>`}
        </pre>
      </section>

      {/* Disabled Tabs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Disabled Tabs</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Tabs defaultValue="active">
  <TabsList>
    <TabsTrigger value="active">Active</TabsTrigger>
    <TabsTrigger value="pending">Pending</TabsTrigger>
    <TabsTrigger value="beta" disabled>
      Beta
      <Badge className="ml-2" variant="outline">Coming Soon</Badge>
    </TabsTrigger>
  </TabsList>
</Tabs>`}
        </pre>
      </section>

      {/* Full Width */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Full Width</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Tabs defaultValue="monthly" className="w-full">
  <TabsList className="w-full">
    <TabsTrigger value="monthly" className="flex-1">Monthly</TabsTrigger>
    <TabsTrigger value="yearly" className="flex-1">Yearly</TabsTrigger>
  </TabsList>
  <TabsContent value="monthly">
    Monthly pricing options
  </TabsContent>
  <TabsContent value="yearly">
    Yearly pricing (save 20%)
  </TabsContent>
</Tabs>`}
        </pre>
      </section>

      {/* Vertical Tabs */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Vertical Layout</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Tabs defaultValue="general" orientation="vertical" className="flex gap-4">
  <TabsList className="flex-col h-auto">
    <TabsTrigger value="general">General</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
    <TabsTrigger value="integrations">Integrations</TabsTrigger>
    <TabsTrigger value="advanced">Advanced</TabsTrigger>
  </TabsList>
  <div className="flex-1">
    <TabsContent value="general">General settings</TabsContent>
    <TabsContent value="security">Security settings</TabsContent>
    <TabsContent value="integrations">Integration settings</TabsContent>
    <TabsContent value="advanced">Advanced settings</TabsContent>
  </div>
</Tabs>`}
        </pre>
      </section>

      {/* Real World Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Real World Examples</h2>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Code Editor Tabs</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Tabs defaultValue="preview" className="border rounded-lg">
  <div className="border-b px-4">
    <TabsList className="bg-transparent">
      <TabsTrigger value="preview">Preview</TabsTrigger>
      <TabsTrigger value="code">Code</TabsTrigger>
    </TabsList>
  </div>
  <TabsContent value="preview" className="p-4">
    <ComponentPreview />
  </TabsContent>
  <TabsContent value="code" className="p-0">
    <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-b-lg">
      {codeString}
    </pre>
  </TabsContent>
</Tabs>`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Settings Panel</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<div className="max-w-4xl mx-auto">
  <h1 className="text-2xl font-bold mb-6">Settings</h1>
  <Tabs defaultValue="profile" className="flex gap-8">
    <TabsList className="flex-col h-auto w-48 bg-transparent">
      <TabsTrigger value="profile" className="justify-start">
        <User className="w-4 h-4 mr-2" /> Profile
      </TabsTrigger>
      <TabsTrigger value="account" className="justify-start">
        <Settings className="w-4 h-4 mr-2" /> Account
      </TabsTrigger>
      <TabsTrigger value="notifications" className="justify-start">
        <Bell className="w-4 h-4 mr-2" /> Notifications
      </TabsTrigger>
      <TabsTrigger value="billing" className="justify-start">
        <CreditCard className="w-4 h-4 mr-2" /> Billing
      </TabsTrigger>
    </TabsList>
    <div className="flex-1">
      <TabsContent value="profile">
        <Card>
          <CardHeader>
            <CardTitle>Profile Settings</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Profile form */}
          </CardContent>
        </Card>
      </TabsContent>
      {/* Other tab contents */}
    </div>
  </Tabs>
</div>`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Analytics Dashboard</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Tabs defaultValue="7d">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-xl font-semibold">Analytics Overview</h2>
    <TabsList>
      <TabsTrigger value="24h">24h</TabsTrigger>
      <TabsTrigger value="7d">7 days</TabsTrigger>
      <TabsTrigger value="30d">30 days</TabsTrigger>
      <TabsTrigger value="90d">90 days</TabsTrigger>
    </TabsList>
  </div>
  <TabsContent value="24h"><Chart data={last24Hours} /></TabsContent>
  <TabsContent value="7d"><Chart data={last7Days} /></TabsContent>
  <TabsContent value="30d"><Chart data={last30Days} /></TabsContent>
  <TabsContent value="90d"><Chart data={last90Days} /></TabsContent>
</Tabs>`}
        </pre>
      </section>

      {/* Keyboard Navigation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Keyboard Navigation</h2>
        <p className="text-neutral-600">Tabs are fully accessible with keyboard support:</p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 pr-4 font-semibold">Key</th>
                <th className="text-left py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">Tab</td>
                <td className="py-3">Move focus to/from tabs</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">Arrow Left/Right</td>
                <td className="py-3">Navigate between tabs (horizontal)</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">Arrow Up/Down</td>
                <td className="py-3">Navigate between tabs (vertical)</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">Home</td>
                <td className="py-3">Go to first tab</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">End</td>
                <td className="py-3">Go to last tab</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">Enter/Space</td>
                <td className="py-3">Activate focused tab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Props</h2>

        <h3 className="text-lg font-semibold text-neutral-700">Tabs</h3>
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
                <td className="py-3 pr-4 font-mono text-sm">defaultValue</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3 pr-4 font-mono text-sm">-</td>
                <td className="py-3">Initially active tab (uncontrolled)</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">value</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3 pr-4 font-mono text-sm">-</td>
                <td className="py-3">Active tab (controlled)</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">onValueChange</td>
                <td className="py-3 pr-4 font-mono text-xs">(value: string) =&gt; void</td>
                <td className="py-3 pr-4 font-mono text-sm">-</td>
                <td className="py-3">Called when tab changes</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">orientation</td>
                <td className="py-3 pr-4 font-mono text-xs">horizontal | vertical</td>
                <td className="py-3 pr-4 font-mono text-sm">horizontal</td>
                <td className="py-3">Layout direction</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">TabsTrigger</h3>
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
                <td className="py-3 pr-4 font-mono text-sm">value</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3 pr-4 font-mono text-sm">required</td>
                <td className="py-3">Unique identifier for this tab</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">disabled</td>
                <td className="py-3 pr-4 font-mono text-sm">boolean</td>
                <td className="py-3 pr-4 font-mono text-sm">false</td>
                <td className="py-3">Disable this tab</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
