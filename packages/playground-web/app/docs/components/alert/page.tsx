/**
 * Alert Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Alert | framingui',
  description:
    'Alert component for displaying important messages, warnings, errors, and success states.',
};

export default function AlertPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">Alert</h1>
        <p className="text-xl text-neutral-600">
          Display important messages to users. Supports info, success, warning, and error states.
        </p>
      </header>

      {/* Installation */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          {`import { Alert, AlertTitle, AlertDescription } from '@framingui/ui';`}
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Alert>
  <AlertTitle>Heads up!</AlertTitle>
  <AlertDescription>
    You can add components to your app using the CLI.
  </AlertDescription>
</Alert>`}
        </pre>
      </section>

      {/* Variants */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Variants</h2>
        <p className="text-neutral-600">4 built-in variants for different message types.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Default - General information
<Alert>
  <AlertTitle>Note</AlertTitle>
  <AlertDescription>This is a default alert.</AlertDescription>
</Alert>

// Success - Positive confirmation
<Alert variant="success">
  <AlertTitle>Success!</AlertTitle>
  <AlertDescription>Your changes have been saved.</AlertDescription>
</Alert>

// Warning - Caution needed
<Alert variant="warning">
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Your session will expire in 5 minutes.</AlertDescription>
</Alert>

// Destructive - Error or critical
<Alert variant="destructive">
  <AlertTitle>Error</AlertTitle>
  <AlertDescription>Failed to save changes. Please try again.</AlertDescription>
</Alert>`}
        </pre>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Icons</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

// Info alert
<Alert>
  <Info className="h-4 w-4" />
  <AlertTitle>Did you know?</AlertTitle>
  <AlertDescription>
    You can use keyboard shortcuts to navigate faster.
  </AlertDescription>
</Alert>

// Success alert
<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Payment successful</AlertTitle>
  <AlertDescription>
    Your payment of $99.00 has been processed.
  </AlertDescription>
</Alert>

// Warning alert
<Alert variant="warning">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Storage almost full</AlertTitle>
  <AlertDescription>
    You've used 90% of your storage. Upgrade now to get more space.
  </AlertDescription>
</Alert>

// Error alert
<Alert variant="destructive">
  <XCircle className="h-4 w-4" />
  <AlertTitle>Connection failed</AlertTitle>
  <AlertDescription>
    Unable to connect to the server. Check your internet connection.
  </AlertDescription>
</Alert>`}
        </pre>
      </section>

      {/* Title Only */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Title Only</h2>
        <p className="text-neutral-600">For brief messages, use just the title.</p>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Alert variant="success">
  <CheckCircle className="h-4 w-4" />
  <AlertTitle>Changes saved successfully</AlertTitle>
</Alert>`}
        </pre>
      </section>

      {/* With Actions */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Actions</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Single action
<Alert>
  <AlertTriangle className="h-4 w-4" />
  <div className="flex-1">
    <AlertTitle>Update available</AlertTitle>
    <AlertDescription>
      A new version is available. Update now to get the latest features.
    </AlertDescription>
  </div>
  <Button size="sm">Update</Button>
</Alert>

// Multiple actions
<Alert variant="destructive">
  <XCircle className="h-4 w-4" />
  <div className="flex-1">
    <AlertTitle>Delete this item?</AlertTitle>
    <AlertDescription>This action cannot be undone.</AlertDescription>
  </div>
  <div className="flex gap-2">
    <Button size="sm" variant="outline">Cancel</Button>
    <Button size="sm" variant="destructive">Delete</Button>
  </div>
</Alert>`}
        </pre>
      </section>

      {/* Dismissible */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Dismissible</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { X } from 'lucide-react';

function DismissibleAlert() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert>
      <Info className="h-4 w-4" />
      <div className="flex-1">
        <AlertTitle>Welcome back!</AlertTitle>
        <AlertDescription>
          Check out what's new since your last visit.
        </AlertDescription>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="p-1 hover:bg-neutral-200 rounded"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
}`}
        </pre>
      </section>

      {/* In Forms */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">In Forms</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`// Form error summary
<form onSubmit={handleSubmit}>
  {errors.length > 0 && (
    <Alert variant="destructive" className="mb-4">
      <XCircle className="h-4 w-4" />
      <AlertTitle>Please fix the following errors:</AlertTitle>
      <AlertDescription>
        <ul className="list-disc list-inside mt-2">
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </AlertDescription>
    </Alert>
  )}
  
  {/* form fields */}
</form>

// Success after submission
{isSubmitted && (
  <Alert variant="success">
    <CheckCircle className="h-4 w-4" />
    <AlertTitle>Form submitted successfully!</AlertTitle>
    <AlertDescription>
      We'll get back to you within 24 hours.
    </AlertDescription>
  </Alert>
)}`}
        </pre>
      </section>

      {/* Real World Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Real World Examples</h2>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">System Status Banner</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Alert variant="warning" className="rounded-none border-x-0">
  <AlertTriangle className="h-4 w-4" />
  <AlertTitle>Scheduled maintenance</AlertTitle>
  <AlertDescription>
    Our services will be temporarily unavailable on March 1st, 2-4 AM UTC.
  </AlertDescription>
</Alert>`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Trial Expiration</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Alert>
  <Info className="h-4 w-4" />
  <div className="flex-1">
    <AlertTitle>Your trial ends in 3 days</AlertTitle>
    <AlertDescription>
      Upgrade to Pro to keep access to all features.
    </AlertDescription>
  </div>
  <Button size="sm">Upgrade Now</Button>
</Alert>`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">API Rate Limit</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<Alert variant="destructive">
  <XCircle className="h-4 w-4" />
  <AlertTitle>Rate limit exceeded</AlertTitle>
  <AlertDescription>
    You've exceeded your API quota. Requests will resume in 42 minutes.
    <a href="/pricing" className="underline ml-1">Upgrade your plan</a>
  </AlertDescription>
</Alert>`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Props</h2>

        <h3 className="text-lg font-semibold text-neutral-700">Alert</h3>
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
                  default | success | warning | destructive
                </td>
                <td className="py-3 pr-4 font-mono text-sm">default</td>
                <td className="py-3">Visual style and color</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">className</td>
                <td className="py-3 pr-4 font-mono text-sm">string</td>
                <td className="py-3 pr-4 font-mono text-sm">-</td>
                <td className="py-3">Additional CSS classes</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">
          AlertTitle & AlertDescription
        </h3>
        <p className="text-neutral-600">
          Both components accept standard HTML props and className for styling.
        </p>
      </section>
    </div>
  );
}
