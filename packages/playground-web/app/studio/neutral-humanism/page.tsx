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
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@tekton-ui/ui';
import { useTektonTheme } from '@/hooks/useTektonTheme';

const NEUTRAL_HUMANISM_FALLBACK: Record<string, string> = {
  '--tekton-bg-canvas': '#F9F7F2',
  '--tekton-bg-surface': '#FDFCFA',
  '--tekton-text-primary': '#1F1E1C',
  '--tekton-text-secondary': '#6B665E',
  '--tekton-border-default': '#EAE6DA',
  '--tekton-action-primary': '#1F1E1C',
  '--tekton-action-primary-text': '#FDFCFA',
  '--tekton-radius-md': '8px',
  '--tekton-radius-lg': '12px',
};

/**
 * Neutral Humanism Workspace Demo
 * Replicating the Minimal Workspace IA with the Neutral Humanism theme.
 */
export default function NeutralHumanismDemo() {
  const [currentView, setCurrentView] = useState<'overview' | 'customers' | 'settings'>('overview');
  const { loaded: themeLoaded } = useTektonTheme('neutral-humanism', {
    fallback: NEUTRAL_HUMANISM_FALLBACK,
  });

  return (
    <div
      className={`min-h-screen bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] font-sans transition-opacity duration-500 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Header */}
      <header className="border-b border-[var(--tekton-border-default)] sticky top-0 bg-[var(--tekton-bg-surface)]/80 backdrop-blur-md z-50">
        <div className="flex h-16 items-center px-4 md:px-6 gap-4">
          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 -ml-2 text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] transition-colors">
                  <Menu size={20} />
                </button>
              </SheetTrigger>
              <SheetContent
                side="left"
                className="w-[300px] sm:w-[400px] bg-[var(--tekton-bg-surface)] border-r border-[var(--tekton-border-default)] shadow-2xl p-0"
              >
                <SheetHeader className="text-left px-6 py-6 border-b border-[var(--tekton-border-default)] bg-[var(--tekton-bg-canvas)]">
                  <SheetTitle className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[var(--tekton-action-primary)]"></div>
                    <span className="font-bold tracking-tight">Neutral Org</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2 px-4 pt-6">
                  <button
                    onClick={() => setCurrentView('overview')}
                    className={`text-sm font-medium px-4 py-3 rounded-[var(--tekton-radius-lg)] transition-colors text-left ${currentView === 'overview' ? 'bg-[var(--tekton-border-default)] text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)]'}`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setCurrentView('customers')}
                    className={`text-sm font-medium px-4 py-3 rounded-[var(--tekton-radius-lg)] transition-colors text-left ${currentView === 'customers' ? 'bg-[var(--tekton-border-default)] text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)]'}`}
                  >
                    Customers
                  </button>
                  <button
                    onClick={() => setCurrentView('settings')}
                    className={`text-sm font-medium px-4 py-3 rounded-[var(--tekton-radius-lg)] transition-colors text-left ${currentView === 'settings' ? 'bg-[var(--tekton-border-default)] text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)]'}`}
                  >
                    Settings
                  </button>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Team Switcher Simulation - Hidden on Mobile */}
          <button className="hidden md:flex w-56 h-9 items-center justify-between border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-md)] px-3 bg-[var(--tekton-bg-surface)] hover:bg-[var(--tekton-bg-canvas)] transition-colors">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[var(--tekton-action-primary)]"></div>
              <span className="text-sm font-medium">Neutral Org</span>
            </div>
            <ChevronDown size={14} className="text-[var(--tekton-text-secondary)]" />
          </button>

          {/* Nav - Hidden on Mobile */}
          <nav className="hidden lg:flex items-center gap-6 ml-4">
            <button
              onClick={() => setCurrentView('overview')}
              className={`text-sm font-medium transition-colors ${currentView === 'overview' ? 'text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)]'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setCurrentView('customers')}
              className={`text-sm font-medium transition-colors ${currentView === 'customers' ? 'text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)]'}`}
            >
              Customers
            </button>
            <button
              onClick={() => setCurrentView('settings')}
              className={`text-sm font-medium transition-colors ${currentView === 'settings' ? 'text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)]'}`}
            >
              Settings
            </button>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:gap-4">
            <div className="relative group">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-[var(--tekton-text-secondary)] group-focus-within:text-[var(--tekton-text-primary)] transition-colors" />
              <input
                className="h-9 w-9 md:w-64 rounded-[var(--tekton-radius-md)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] pl-9 md:pr-4 py-2 text-sm outline-none placeholder:text-[var(--tekton-text-secondary)] focus:ring-1 focus:ring-[var(--tekton-text-primary)] transition-all cursor-pointer md:cursor-text"
                placeholder="Search workspace..."
              />
            </div>
            <button className="w-8 h-8 md:w-9 md:h-9 rounded-full overflow-hidden border border-[var(--tekton-border-default)] flex-shrink-0">
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

function OverviewDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center gap-2">
          <button className="flex-1 sm:flex-none h-9 px-4 py-2 bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-[var(--tekton-radius-md)] text-sm font-medium hover:bg-[var(--tekton-bg-canvas)] transition-colors">
            Download Export
          </button>
          <button className="flex-1 sm:flex-none h-9 px-4 py-2 bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)] rounded-[var(--tekton-radius-md)] text-sm font-medium hover:opacity-90 transition-opacity">
            New Project
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 whitespace-nowrap">
        {[
          {
            title: 'Total Revenue',
            value: '$45,231.89',
            icon: DollarSign,
            sub: '+20.1% from last month',
          },
          { title: 'Subscriptions', value: '+2,350', icon: Users, sub: '+180.1% from last month' },
          { title: 'Sales', value: '+12,234', icon: CreditCard, sub: '+19.2% from last month' },
          { title: 'Active Now', value: '+573', icon: Activity, sub: '+201 since last hour' },
        ].map((stat) => (
          <div
            key={stat.title}
            className="rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)] shadow-sm"
          >
            <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-sm font-medium">{stat.title}</h3>
              <stat.icon className="h-4 w-4 text-[var(--tekton-text-secondary)]" />
            </div>
            <div className="p-6 pt-0">
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-[var(--tekton-text-secondary)]">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        {/* Chart Section */}
        <div className="lg:col-span-4 rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)] shadow-sm overflow-hidden">
          <div className="flex flex-col space-y-1.5 p-6 pb-2">
            <h3 className="font-semibold leading-none tracking-tight">Revenue Overview</h3>
            <p className="text-xs text-[var(--tekton-text-secondary)]">
              Growth metrics for the past 12 months.
            </p>
          </div>
          <div className="p-6 pt-0">
            <OverviewChart />
          </div>
        </div>

        {/* Recent Items */}
        <div className="lg:col-span-3 rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)] shadow-sm">
          <div className="flex flex-col space-y-1.5 p-6">
            <h3 className="font-semibold leading-none tracking-tight">Recent Activity</h3>
            <p className="text-sm text-[var(--tekton-text-secondary)]">
              24 new sales recorded today.
            </p>
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
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-[var(--tekton-bg-canvas)] items-center justify-center border border-[var(--tekton-border-default)] text-[var(--tekton-text-secondary)] font-bold">
                    {user.name[0]}
                  </span>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{user.name}</p>
                    <p className="text-sm text-[var(--tekton-text-secondary)]">{user.email}</p>
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

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
      const y = height - ((val / maxVal) * (height - 2 * padding) + padding);
      return `${x},${y}`;
    })
    .join(' ');

  const areaPoints = `${padding},${height} ${points} ${width - padding},${height}`;
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
        <defs>
          <linearGradient id="neutral-gradient" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--tekton-action-primary)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--tekton-bg-surface)" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid Lines */}
        {[0, 0.5, 1].map((scale) => {
          const y = height - (scale * (height - 2 * padding) + padding);
          return (
            <g key={scale}>
              <line
                x1={padding}
                y1={y}
                x2={width - padding}
                y2={y}
                className="stroke-[var(--tekton-border-default)]"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding - 20}
                y={y + 4}
                className="text-[12px] fill-[var(--tekton-text-secondary)] font-medium"
              >
                {Math.round(scale * maxVal)}
              </text>
            </g>
          );
        })}

        {/* X Axis Labels */}
        {months.map((m, i) => {
          const x = (i / (data.length - 1)) * (width - 2 * padding) + padding;
          return (
            <text
              key={m}
              x={x}
              y={height + 25}
              textAnchor="middle"
              className="text-[12px] md:text-[10px] fill-[var(--tekton-text-secondary)] font-medium"
            >
              {m}
            </text>
          );
        })}

        <polyline points={areaPoints} fill="url(#neutral-gradient)" />
        <polyline
          points={points}
          fill="none"
          stroke="var(--tekton-action-primary)"
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
              className="fill-[var(--tekton-bg-surface)] stroke-[var(--tekton-action-primary)] group cursor-pointer hover:r-6 transition-all"
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
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Active Customers</h2>
        <div className="flex items-center gap-2">
          <button className="h-9 px-4 py-2 bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)] rounded-[var(--tekton-radius-md)] text-sm font-medium hover:opacity-90">
            Add Customer
          </button>
        </div>
      </div>

      <div className="rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--tekton-border-default)] bg-[var(--tekton-bg-canvas)]/30">
                <th className="p-4 font-semibold text-[var(--tekton-text-primary)]">Customer</th>
                <th className="p-4 font-semibold text-[var(--tekton-text-primary)]">Status</th>
                <th className="p-4 font-semibold text-[var(--tekton-text-primary)]">Plan</th>
                <th className="p-4 font-semibold text-[var(--tekton-text-primary)]">Revenue</th>
                <th className="p-4 font-semibold text-[var(--tekton-text-primary)] text-right">
                  Activity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--tekton-border-default)] opacity-90">
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
                  name: 'Sarah Linn',
                  email: 'sarah@email.com',
                  status: 'Active',
                  plan: 'Enterprise',
                  revenue: '$4,800.00',
                  last: '12m ago',
                },
              ].map((customer) => (
                <tr
                  key={customer.email}
                  className="hover:bg-[var(--tekton-bg-canvas)] transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--tekton-bg-canvas)] border border-[var(--tekton-border-default)] flex items-center justify-center font-bold text-[var(--tekton-text-secondary)]">
                        {customer.name[0]}
                      </div>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-xs text-[var(--tekton-text-secondary)]">
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        customer.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                          : 'bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-secondary)] border border-[var(--tekton-border-default)]'
                      }`}
                    >
                      {customer.status}
                    </div>
                  </td>
                  <td className="p-4 text-[var(--tekton-text-secondary)]">{customer.plan}</td>
                  <td className="p-4 font-medium">{customer.revenue}</td>
                  <td className="p-4 text-right text-[var(--tekton-text-secondary)]">
                    {customer.last}
                  </td>
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
      <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Workspace Settings</h2>

      <div className="space-y-6">
        <section>
          <h3 className="text-sm font-bold text-[var(--tekton-text-secondary)] uppercase tracking-widest mb-4 px-1">
            Identity & Security
          </h3>
          <div className="rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] overflow-hidden">
            <SettingItem
              icon={<User size={18} />}
              label="Profile Information"
              value="Neutral Humanism"
            />
            <SettingItem
              icon={<CreditCard size={18} />}
              label="Credits & Billing"
              value="On-demand"
            />
            <SettingItem icon={<ShieldCheck size={18} />} label="Auth & Security" />
          </div>
        </section>

        <section>
          <h3 className="text-sm font-bold text-[var(--tekton-text-secondary)] uppercase tracking-widest mb-4 px-1">
            Engagement
          </h3>
          <div className="rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] overflow-hidden">
            <SettingItem icon={<Bell size={18} />} label="Email Notifications" value="Standard" />
            <SettingItem
              icon={<Globe size={18} />}
              label="Language / Region"
              value="Global (Auto)"
            />
          </div>
        </section>

        <div className="pt-4">
          <button className="w-full flex items-center justify-center gap-2 h-11 rounded-[var(--tekton-radius-lg)] bg-[var(--tekton-bg-canvas)] border border-[var(--tekton-border-default)] text-[var(--tekton-text-secondary)] font-bold hover:bg-rose-50 hover:text-rose-700 hover:border-rose-100 transition-all group">
            <LogOut size={18} className="group-hover:translate-x-0.5 transition-transform" />
            Log Out of Workspace
          </button>
        </div>

        <div className="flex justify-center pt-8">
          <a
            href="https://example.com"
            className="flex items-center gap-1.5 text-xs text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] transition-colors"
          >
            Documentation <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
}

function SettingItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-[var(--tekton-bg-canvas)] transition-colors border-b border-[var(--tekton-border-default)] last:border-0 group text-left">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-[var(--tekton-radius-md)] bg-[var(--tekton-bg-canvas)] border border-[var(--tekton-border-default)] group-hover:bg-[var(--tekton-bg-surface)] transition-colors text-[var(--tekton-text-secondary)]">
          {icon}
        </div>
        <span className="font-medium">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        {value && <span className="text-sm text-[var(--tekton-text-secondary)]">{value}</span>}
        <ChevronRight
          size={16}
          className="text-[var(--tekton-text-secondary)] opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </button>
  );
}
