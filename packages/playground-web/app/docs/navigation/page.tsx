/**
 * NavigationMenu Component Documentation
 */

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'NavigationMenu | framingui',
  description: 'Accessible horizontal navigation with keyboard support and dropdown menus.',
};

export default function NavigationPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <div className="text-sm font-medium text-neutral-500">Components</div>
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900">NavigationMenu</h1>
        <p className="text-xl text-neutral-600">
          Horizontal navigation menu with accessible dropdown panels and keyboard navigation.
        </p>
      </header>

      {/* Import */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Import</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto">
          {`import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from '@framingui/ui';`}
        </pre>
      </section>

      {/* Basic Usage */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Basic Usage</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
        Home
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/about" className={navigationMenuTriggerStyle()}>
        About
      </NavigationMenuLink>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuLink href="/contact" className={navigationMenuTriggerStyle()}>
        Contact
      </NavigationMenuLink>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        </pre>
      </section>

      {/* With Dropdown */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Dropdown</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[400px]">
          <li>
            <NavigationMenuLink href="/products/widgets">
              <div className="text-sm font-medium">Widgets</div>
              <p className="text-sm text-neutral-500">
                High-quality widgets for your needs
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/products/gadgets">
              <div className="text-sm font-medium">Gadgets</div>
              <p className="text-sm text-neutral-500">
                Innovative gadgets and tools
              </p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        </pre>
      </section>

      {/* Grid Layout */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Grid Layout Dropdown</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid grid-cols-2 gap-3 p-4 w-[600px]">
          <li>
            <NavigationMenuLink href="/solutions/analytics">
              <div className="text-sm font-medium">Analytics</div>
              <p className="text-xs text-neutral-500">
                Data insights and reporting
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/solutions/automation">
              <div className="text-sm font-medium">Automation</div>
              <p className="text-xs text-neutral-500">
                Workflow automation tools
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/solutions/integrations">
              <div className="text-sm font-medium">Integrations</div>
              <p className="text-xs text-neutral-500">
                Connect with your tools
              </p>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink href="/solutions/security">
              <div className="text-sm font-medium">Security</div>
              <p className="text-xs text-neutral-500">
                Enterprise-grade security
              </p>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        </pre>
      </section>

      {/* With Icons */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Icons</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Layers, Zap, Shield, BarChart } from 'lucide-react';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Features</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-6 w-[500px]">
          <li>
            <NavigationMenuLink
              href="/features/layers"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50"
            >
              <Layers className="w-5 h-5 text-neutral-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Layers</div>
                <p className="text-xs text-neutral-500">
                  Organize your content in layers
                </p>
              </div>
            </NavigationMenuLink>
          </li>
          <li>
            <NavigationMenuLink
              href="/features/performance"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50"
            >
              <Zap className="w-5 h-5 text-neutral-600 mt-0.5" />
              <div>
                <div className="text-sm font-medium">Performance</div>
                <p className="text-xs text-neutral-500">
                  Lightning-fast performance
                </p>
              </div>
            </NavigationMenuLink>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        </pre>
      </section>

      {/* With Next.js Link */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">With Next.js Link</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import Link from 'next/link';

<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <Link href="/docs" legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
          Documentation
        </NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid gap-3 p-4 w-[400px]">
          <li>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink className="block p-3 rounded-lg hover:bg-neutral-50">
                <div className="text-sm font-medium">Blog</div>
                <p className="text-xs text-neutral-500">Latest updates</p>
              </NavigationMenuLink>
            </Link>
          </li>
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        </pre>
      </section>

      {/* Featured Content */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Featured Content Panel</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Company</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="flex w-[700px]">
          <div className="w-1/2 p-6 bg-gradient-to-br from-neutral-50 to-neutral-100">
            <h3 className="text-lg font-semibold mb-2">About Us</h3>
            <p className="text-sm text-neutral-600 mb-4">
              Learn about our mission, values, and the team behind the product.
            </p>
            <NavigationMenuLink
              href="/about"
              className="inline-flex items-center text-sm font-medium hover:underline"
            >
              Learn more →
            </NavigationMenuLink>
          </div>
          <ul className="w-1/2 p-6 space-y-3">
            <li>
              <NavigationMenuLink href="/careers">Careers</NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="/press">Press Kit</NavigationMenuLink>
            </li>
            <li>
              <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
            </li>
          </ul>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        </pre>
      </section>

      {/* Full Width Panel */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Full Width Panel</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`<NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuTrigger>Products</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className="w-screen max-w-6xl p-6">
          <div className="grid grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold mb-3">For Business</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <NavigationMenuLink href="/enterprise">
                    Enterprise
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/teams">
                    Teams
                  </NavigationMenuLink>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">For Developers</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <NavigationMenuLink href="/api">API</NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink href="/sdk">SDK</NavigationMenuLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>`}
        </pre>
      </section>

      {/* Active State */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Active State</h2>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { usePathname } from 'next/navigation';

function Navigation() {
  const pathname = usePathname();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              data-active={pathname === '/'}
            >
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/products" legacyBehavior passHref>
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              data-active={pathname.startsWith('/products')}
            >
              Products
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}`}
        </pre>
      </section>

      {/* Real World Examples */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Real World Examples</h2>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Marketing Site Navigation</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import Link from 'next/link';
import { Button } from '@framingui/ui';

function MarketingNav() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-xl font-bold">
              FramingUI
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[500px] lg:grid-cols-2">
                      <li>
                        <NavigationMenuLink href="/products/design">
                          <div className="font-medium">Design System</div>
                          <p className="text-sm text-neutral-500">
                            Complete design tokens and components
                          </p>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink href="/products/ui">
                          <div className="font-medium">UI Components</div>
                          <p className="text-sm text-neutral-500">
                            30+ accessible React components
                          </p>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/pricing" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Pricing
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/docs" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Docs
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Dashboard Navigation</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`import { Home, Users, Settings, BarChart } from 'lucide-react';

function DashboardNav() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/dashboard" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <Users className="w-4 h-4 mr-2" />
            Users
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 w-[300px]">
              <li>
                <NavigationMenuLink href="/users/all">
                  All Users
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/users/admins">
                  Administrators
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink href="/users/invite">
                  Invite Users
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/analytics" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <BarChart className="w-4 h-4 mr-2" />
              Analytics
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}`}
        </pre>

        <h3 className="text-lg font-semibold text-neutral-700 mt-6">Mega Menu</h3>
        <pre className="bg-neutral-900 text-neutral-100 p-4 rounded-lg overflow-x-auto text-sm">
          {`function MegaMenu() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>All Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="w-screen max-w-7xl p-8">
              <div className="grid grid-cols-5 gap-8">
                <div>
                  <h4 className="font-semibold mb-4 text-neutral-900">Analytics</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <NavigationMenuLink
                        href="/analytics/web"
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        Web Analytics
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/analytics/mobile"
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        Mobile Analytics
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-neutral-900">Marketing</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <NavigationMenuLink
                        href="/marketing/email"
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        Email Campaigns
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink
                        href="/marketing/social"
                        className="text-neutral-600 hover:text-neutral-900"
                      >
                        Social Media
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </div>
                <div className="col-span-2 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-2 text-neutral-900">
                    New: AI-Powered Insights
                  </h4>
                  <p className="text-sm text-neutral-600 mb-4">
                    Get intelligent recommendations based on your data
                  </p>
                  <Button size="sm">Learn More</Button>
                </div>
              </div>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}`}
        </pre>
      </section>

      {/* Props */}
      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-neutral-900">Props</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="text-left py-3 pr-4 font-semibold">Component</th>
                <th className="text-left py-3 pr-4 font-semibold">Extends</th>
                <th className="text-left py-3 font-semibold">Description</th>
              </tr>
            </thead>
            <tbody className="text-neutral-600">
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">NavigationMenu</td>
                <td className="py-3 pr-4 font-mono text-xs">Radix NavigationMenu.Root</td>
                <td className="py-3">Root navigation menu component</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">NavigationMenuList</td>
                <td className="py-3 pr-4 font-mono text-xs">Radix NavigationMenu.List</td>
                <td className="py-3">List container for navigation items</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">NavigationMenuItem</td>
                <td className="py-3 pr-4 font-mono text-xs">Radix NavigationMenu.Item</td>
                <td className="py-3">Individual navigation menu item</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">NavigationMenuTrigger</td>
                <td className="py-3 pr-4 font-mono text-xs">Radix NavigationMenu.Trigger</td>
                <td className="py-3">Trigger button for dropdown content</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">NavigationMenuContent</td>
                <td className="py-3 pr-4 font-mono text-xs">Radix NavigationMenu.Content</td>
                <td className="py-3">Dropdown panel content container</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">NavigationMenuLink</td>
                <td className="py-3 pr-4 font-mono text-xs">Radix NavigationMenu.Link</td>
                <td className="py-3">Link element within navigation</td>
              </tr>
              <tr className="border-b border-neutral-100">
                <td className="py-3 pr-4 font-mono text-sm">navigationMenuTriggerStyle</td>
                <td className="py-3 pr-4 font-mono text-sm">CVA function</td>
                <td className="py-3">Style helper for consistent link styling</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
