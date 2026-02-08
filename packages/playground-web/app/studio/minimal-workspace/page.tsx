'use client';

import {
  DollarSign,
  Users,
  Activity,
  Search,
  ChevronDown,
  Menu,
  ChevronRight,
  User,
  CreditCard,
  Bell,
  Globe,
  ShieldCheck,
  Smartphone,
  LogOut,
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@tekton-ui/ui';
/**
 * Minimal Workspace Landing Page
 * Theme: Modern SaaS Dashboard
 */
export default function MinimalWorkspaceDemo() {
  const [currentView, setCurrentView] = useState<'overview' | 'customers' | 'settings'>('overview');

  return (
    <div className="min-h-screen bg-white text-neutral-950 font-sans selection:bg-neutral-100">
      {/* Header */}
      <header className="border-b border-neutral-200 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex h-16 items-center px-4 md:px-6 gap-4">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -ml-2 text-neutral-500 hover:text-neutral-950 transition-colors">
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-white border-r border-neutral-200 shadow-2xl p-0"
              >
                <SheetHeader className="text-left px-6 py-6 border-b border-neutral-100 bg-neutral-50/30">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-neutral-900"></div>
                    <span className="font-bold tracking-tight">Acme Inc.</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 px-4 pt-6">
                  <button
                    onClick={() => setCurrentView('overview')}
                    className={`text-sm font-medium px-4 py-3 rounded-xl transition-colors text-left ${currentView === 'overview' ? 'bg-neutral-100 text-neutral-950' : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50'}`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setCurrentView('customers')}
                    className={`text-sm font-medium px-4 py-3 rounded-xl transition-colors text-left ${currentView === 'customers' ? 'bg-neutral-100 text-neutral-950' : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50'}`}
                  >
                    Customers
                  </button>
                  <button
                    onClick={() => setCurrentView('settings')}
                    className={`text-sm font-medium px-4 py-3 rounded-xl transition-colors text-left ${currentView === 'settings' ? 'bg-neutral-100 text-neutral-950' : 'text-neutral-500 hover:text-neutral-950 hover:bg-neutral-50'}`}
                  >
                    Settings
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Team Switcher Simulation - Hidden on Mobile */}
          <button className="hidden md:flex w-56 h-9 items-center justify-between border border-neutral-200 rounded-md px-3 hover:bg-neutral-100 transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-neutral-900"></div>
              <span className="text-sm font-medium">Acme Inc.</span>
            </div>
            <ChevronDown size={14} className="text-neutral-500" />
          </button>

          {/* Nav - Hidden on Mobile */}
          <nav className="hidden lg:flex items-center gap-6 ml-4">
            <button
              onClick={() => setCurrentView('overview')}
              className={`text-sm font-medium transition-colors ${currentView === 'overview' ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setCurrentView('customers')}
              className={`text-sm font-medium transition-colors ${currentView === 'customers' ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'}`}
            >
              Customers
            </button>
            <button
              onClick={() => setCurrentView('settings')}
              className={`text-sm font-medium transition-colors ${currentView === 'settings' ? 'text-neutral-950' : 'text-neutral-500 hover:text-neutral-950'}`}
            >
              Settings
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-4">
            {/* Search - Icon only on small mobile, expanded on Tablet/Desktop */}
            <div className="relative group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-neutral-500 group-focus-within:text-neutral-950 transition-colors" />
              <input
                className="h-9 w-9 md:w-64 rounded-md border border-neutral-200 bg-white pl-9 md:pr-4 py-2 text-sm outline-none placeholder:text-neutral-500 focus:ring-1 focus:ring-neutral-950 transition-all cursor-pointer md:cursor-text"
                placeholder="Search..."
              />
            </div>
            <button className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-neutral-200 flex-shrink-0">
              <img src="https://github.com/shadcn.png" alt="User" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4 md:p-8 max-w-[1600px] mx-auto space-y-6 md:space-y-8 min-h-[calc(100vh-64px)]">
        {currentView === 'overview' && <OverviewDashboard />}
        {currentView === 'customers' && <CustomersView />}
        {currentView === 'settings' && <SettingsView />}
      </main>
    </div>
  );
}

// Placeholder Components for different views
function OverviewDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <button className="flex-1 sm:flex-none h-9 px-4 py-2 bg-white border border-neutral-200 rounded-md text-sm font-medium hover:bg-neutral-100 transition-colors">
            Download
          </button>
          <button className="flex-1 sm:flex-none h-9 px-4 py-2 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-900/90 transition-colors">
            New Report
          </button>
        </div>
      </div>

      {/* Dashboard KPIs Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {[
          {
            title: 'Total Revenue',
            value: '$45,231.89',
            icon: DollarSign,
            sub: '+20.1% from last month',
          },
          { title: 'Subscriptions', value: '+2350', icon: Users, sub: '+180.1% from last month' },
          { title: 'Sales', value: '+12,234', icon: CreditCard, sub: '+19% from last month' },
          { title: 'Active Now', value: '+573', icon: Activity, sub: '+201 since last hour' },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm"
          >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">{stat.title}</h3>
              <stat.icon className="h-4 w-4 text-neutral-500" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-neutral-500">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        {/* Custom SVG Overview Chart */}
        <div className="lg:col-span-4 rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm overflow-hidden">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="font-semibold leading-none tracking-tight">Overview</h3>
            <p className="text-xs text-neutral-500">Revenue growth over the last 12 months.</p>
          </div>
          <div className="p-6 pt-0">
            <OverviewChart />
          </div>
        </div>

        {/* Recent Sales - Now wider and cleaner */}
        <div className="lg:col-span-3 rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Recent Sales</h3>
            <p className="text-sm text-neutral-500">You made 265 sales this month.</p>
          </div>
          <div className="p-6 pt-0">
            <div className="space-y-8">
              {[
                { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
                { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
                { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
                { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
                { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
              ].map((user) => (
                <div key={user.email} className="flex items-center">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-neutral-100 items-center justify-center border border-neutral-200">
                    {user.name[0]}
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-neutral-500">{user.email}</p>
                  </div>
                  <div className="ml-auto font-medium">{user.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewChart() {
  const data = [120, 150, 180, 160, 210, 250, 230, 280, 320, 300, 340, 380];
  const maxVal = Math.max(...data);
  const height = 300;
  const width = 600;
  const padding = 20;

  // Calculate points for the stroke path
  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
      const y = height - ((val / maxVal) * (height - 2 * padding) + padding);
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${padding},${height} ${points} ${width - padding},${height}`;

  // Responsive month labels - only show every other month on small screens
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  return (
    <div className="w-full h-full min-h-[250px] md:min-h-[300px] mt-8 relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto overflow-visible select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Horizontal Grid Lines */}
        {[0, 0.5, 1].map((scale) => {
          const y = height - (scale * (height - 2 * padding) + padding);
          return (
            <g key={scale}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                className="stroke-neutral-100"
                strokeWidth="1"
              />
              <text x={padding - 20} y={y + 4} className="text-[12px] fill-neutral-400 font-medium">
                {Math.round(scale * maxVal)}
              </text>
            </g>
          );
        })}

        {/* Vertical labels - Simplified for small viewports via viewBox scaling */}
        {months.map((m, i) => {
          const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
          // Hide some labels if we want more space, but SVG scales naturally
          return (
            <text
              key={m}
              x={x}
              y={height + 25}
              textAnchor="middle"
              className="text-[12px] md:text-[10px] fill-neutral-400 font-medium md:block"
            >
              {m}
            </text>
          );
        })}

        <polyline points={areaPoints} fill="url(#gradient)" className="opacity-20" />

        <defs>
          <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="#171717" />
            <stop offset="100%" stopColor="#fff" />
          </linearGradient>
        </defs>

        <polyline
          points={points}
          fill="none"
          stroke="#171717"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {data.map((val, i) => {
          const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
          const y = height - ((val / maxVal) * (height - 2 * padding) + padding);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              className="fill-white stroke-neutral-900 group cursor-pointer hover:r-6 transition-all"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
}

function CustomersView() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Customers</h2>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 py-2 bg-neutral-900 text-white rounded-md text-sm font-medium hover:bg-neutral-900/90 transition-colors">
            Add Customer
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="p-4 font-semibold text-neutral-700">Customer</th>
                <th className="p-4 font-semibold text-neutral-700">Status</th>
                <th className="p-4 font-semibold text-neutral-700">Subscription</th>
                <th className="p-4 font-semibold text-neutral-700">Revenue</th>
                <th className="p-4 font-semibold text-neutral-700 text-right">Last Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {[
                {
                  name: 'Olivia Martin',
                  email: 'olivia.martin@email.com',
                  status: 'Active',
                  plan: 'Enterprise',
                  revenue: '$2,400.00',
                  last: '2h ago',
                },
                {
                  name: 'Jackson Lee',
                  email: 'jackson.lee@email.com',
                  status: 'Active',
                  plan: 'Professional',
                  revenue: '$1,200.00',
                  last: '5h ago',
                },
                {
                  name: 'Isabella Nguyen',
                  email: 'isabella.nguyen@email.com',
                  status: 'Inactive',
                  plan: 'Starter',
                  revenue: '$400.00',
                  last: '2d ago',
                },
                {
                  name: 'William Kim',
                  email: 'will@email.com',
                  status: 'Active',
                  plan: 'Enterprise',
                  revenue: '$3,600.00',
                  last: '1h ago',
                },
                {
                  name: 'Sofia Davis',
                  email: 'sofia.davis@email.com',
                  status: 'Active',
                  plan: 'Professional',
                  revenue: '$900.00',
                  last: '4h ago',
                },
                {
                  name: 'Julian Cross',
                  email: 'julian@email.com',
                  status: 'Inactive',
                  plan: 'Starter',
                  revenue: '$400.00',
                  last: '1w ago',
                },
                {
                  name: 'Sarah Linn',
                  email: 'sarah@email.com',
                  status: 'Active',
                  plan: 'Enterprise',
                  revenue: '$4,800.00',
                  last: '12m ago',
                },
              ].map((customer) => (
                <tr key={customer.email} className="hover:bg-neutral-50/80 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center font-bold text-neutral-600">
                        {customer.name[0]}
                      </div>
                      <div>
                        <div className="font-medium text-neutral-900">{customer.name}</div>
                        <div className="text-xs text-neutral-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        customer.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-neutral-100 text-neutral-500 border border-neutral-200'
                      }`}
                    >
                      {customer.status}
                    </div>
                  </td>
                  <td className="p-4 text-neutral-600 font-medium">{customer.plan}</td>
                  <td className="p-4 font-mono font-medium text-neutral-900">{customer.revenue}</td>
                  <td className="p-4 text-right text-neutral-500">{customer.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-32">
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Settings</h2>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-1">
            Account & Profile
          </h3>
          <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
            <SettingItem
              icon={<User size={18} />}
              label="Personal Information"
              value="Olivia Martin"
            />
            <SettingItem
              icon={<CreditCard size={18} />}
              label="Billing & Subscription"
              value="Enterprise Plan"
            />
            <SettingItem icon={<ShieldCheck size={18} />} label="Security & Password" />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mb-4 px-1">
            Preferences
          </h3>
          <div className="rounded-xl border border-neutral-200 bg-white overflow-hidden">
            <SettingItem icon={<Bell size={18} />} label="Notifications" value="All enabled" />
            <SettingItem
              icon={<Globe size={18} />}
              label="Language & Region"
              value="English (US)"
            />
            <SettingItem
              icon={<Smartphone size={18} />}
              label="Mobile Devices"
              value="2 connected"
            />
          </div>
        </section>

        <div className="pt-4">
          <button className="w-full flex items-center justify-center gap-2 h-11 rounded-xl bg-neutral-50 border border-neutral-200 text-neutral-600 font-medium hover:bg-red-50 hover:text-red-700 hover:border-red-100 transition-all group">
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            Sign Out of Workspace
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingItem({
  icon,
  label,
  value,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
  color?: string;
}) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 transition-colors border-b border-neutral-100 last:border-0 group text-left">
      <div className="flex items-center gap-3">
        <div
          className={`p-2 rounded-lg bg-neutral-100 border border-neutral-100 group-hover:bg-white group-hover:border-neutral-200 transition-colors ${color ? color : 'text-neutral-600'}`}
        >
          {icon}
        </div>
        <span className="font-medium text-neutral-900">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {value && <span className="text-sm text-neutral-500">{value}</span>}
        <ChevronRight
          size={16}
          className="text-neutral-400 group-hover:text-neutral-900 group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </button>
  );
}
