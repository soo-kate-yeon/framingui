'use client';

import { DollarSign, Users, Activity, Menu, ChevronRight, CreditCard, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTektonTheme } from '@/hooks/useTektonTheme';
import { PreviewBanner } from '@/components/studio/PreviewBanner';
import { useStudioLanguage } from '@/contexts/StudioLanguageContext';
import { ComponentGallery } from '@/components/studio/ComponentGallery';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const PEBBLE_FALLBACK: Record<string, string> = {
  '--tekton-bg-canvas': '#F3F5F7',
  '--tekton-bg-surface': '#FFFFFF',
  '--tekton-text-primary': '#111827',
  '--tekton-text-secondary': '#6B7280',
  '--tekton-text-tertiary': '#9CA3AF',
  '--tekton-border-default': '#E5E7EB',
  '--tekton-border-emphasis': '#D1D5DB',
  '--tekton-action-primary': '#3B82F6',
  '--tekton-action-primary-text': '#FFFFFF',

  '--tekton-bg-background': '#F3F5F7',
  '--tekton-bg-foreground': '#111827',
  '--tekton-bg-card': '#FFFFFF',
  '--tekton-bg-card-foreground': '#111827',
  '--tekton-bg-popover': '#FFFFFF',
  '--tekton-bg-popover-foreground': '#111827',
  '--tekton-bg-primary': '#3B82F6',
  '--tekton-bg-primary-foreground': '#FFFFFF',
  '--tekton-bg-secondary': '#E5E7EB',
  '--tekton-bg-secondary-foreground': '#111827',
  '--tekton-bg-muted': '#E5E7EB',
  '--tekton-bg-muted-foreground': '#6B7280',
  '--tekton-bg-accent': '#DBEAFE',
  '--tekton-bg-accent-foreground': '#1E40AF',
  '--tekton-bg-destructive': '#EF4444',
  '--tekton-bg-destructive-foreground': '#FFFFFF',
  '--tekton-border-input': '#E5E7EB',
  '--tekton-border-ring': '#3B82F6',

  '--tekton-radius-sm': '12px',
  '--tekton-radius-md': '16px',
  '--tekton-radius-lg': '24px',
  '--tekton-radius-xl': '32px',
  '--tekton-radius-none': '0',
  '--tekton-radius-full': '9999px',
  '--tekton-spacing-0': '0',
  '--tekton-spacing-1': '4px',
  '--tekton-spacing-2': '8px',
  '--tekton-spacing-3': '12px',
  '--tekton-spacing-4': '16px',
  '--tekton-spacing-5': '20px',
  '--tekton-spacing-6': '24px',
  '--tekton-spacing-8': '32px',
  '--tekton-spacing-10': '40px',
  '--tekton-spacing-12': '48px',
  '--tekton-spacing-16': '64px',
};

export default function PebbleDemo() {
  const [activeTab, setActiveTab] = useState<'page' | 'component'>('page');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loaded: themeLoaded } = useTektonTheme('pebble', {
    fallback: PEBBLE_FALLBACK,
  });
  const { locale } = useStudioLanguage();

  return (
    <div
      className={`h-screen overflow-hidden flex flex-col md:flex-row bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] font-sans transition-opacity duration-500 pt-12 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <PreviewBanner templateId="pebble" templateName="Pebble" />

      <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] h-full overflow-y-auto shrink-0">
        <div className="p-6">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 mb-10 hover:opacity-70 transition-opacity"
          >
            <span className="text-xl font-bold tracking-tighter text-[var(--tekton-text-primary)]">
              framingui
            </span>
            <span className="text-xs font-medium text-[var(--tekton-text-secondary)]">studio</span>
          </Link>
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="w-6 h-6 rounded-full bg-[var(--tekton-action-primary)] shadow-sm"></div>
            <span className="font-bold tracking-tight truncate">Pebble Co.</span>
          </div>
        </div>
        <nav className="flex-1 px-4 flex flex-col gap-2">
          <button
            onClick={() => setActiveTab('page')}
            className={`text-sm font-medium px-4 py-3 rounded-[var(--tekton-radius-lg)] transition-colors text-left flex items-center justify-between group ${activeTab === 'page' ? 'bg-[var(--tekton-border-default)] text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)]'}`}
          >
            <span>{locale === 'ko' ? '페이지 예시' : 'Page Example'}</span>
            <ChevronRight
              size={16}
              className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === 'page' ? 'opacity-100' : ''}`}
            />
          </button>
          <button
            onClick={() => setActiveTab('component')}
            className={`text-sm font-medium px-4 py-3 rounded-[var(--tekton-radius-lg)] transition-colors text-left flex items-center justify-between group ${activeTab === 'component' ? 'bg-[var(--tekton-border-default)] text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)]'}`}
          >
            <span>{locale === 'ko' ? '컴포넌트 갤러리' : 'Component Gallery'}</span>
            <ChevronRight
              size={16}
              className={`opacity-0 group-hover:opacity-100 transition-opacity ${activeTab === 'component' ? 'opacity-100' : ''}`}
            />
          </button>
        </nav>
      </aside>

      <header className="md:hidden shrink-0 border-b border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] flex items-center justify-between px-4 h-14 z-40 relative">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--tekton-action-primary)] shadow-sm"></div>
          <span className="font-bold tracking-tight text-sm">Pebble Co.</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -mr-2 text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-[104px] bottom-0 bg-[var(--tekton-bg-surface)] z-50 overflow-y-auto shadow-xl">
          <nav className="flex flex-col gap-2 p-4">
            <button
              onClick={() => {
                setActiveTab('page');
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium px-4 py-4 rounded-[var(--tekton-radius-lg)] transition-colors text-left ${activeTab === 'page' ? 'bg-[var(--tekton-border-default)] text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)]'}`}
            >
              {locale === 'ko' ? '페이지 예시' : 'Page Example'}
            </button>
            <button
              onClick={() => {
                setActiveTab('component');
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium px-4 py-4 rounded-[var(--tekton-radius-lg)] transition-colors text-left ${activeTab === 'component' ? 'bg-[var(--tekton-border-default)] text-[var(--tekton-text-primary)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)]'}`}
            >
              {locale === 'ko' ? '컴포넌트 갤러리' : 'Component Gallery'}
            </button>
          </nav>
        </div>
      )}

      <main className="flex-1 overflow-y-auto h-full p-4 md:p-8 lg:p-12 pb-8 relative">
        <div className="max-w-[1200px] mx-auto">
          {activeTab === 'page' && <OverviewDashboard />}
          {activeTab === 'component' && <ComponentGallery />}
        </div>
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

      <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
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
            className="rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)] shadow-sm min-w-0"
          >
            <div className="p-4 md:p-6 flex flex-row items-center justify-between space-y-0 pb-2">
              <h3 className="tracking-tight text-xs md:text-sm font-medium truncate pr-2">
                {stat.title}
              </h3>
              <stat.icon className="h-4 w-4 text-[var(--tekton-text-secondary)] shrink-0" />
            </div>
            <div className="px-4 md:px-6 pb-4 md:pb-6 pt-0">
              <div className="text-lg md:text-2xl font-bold tabular-nums truncate">
                {stat.value}
              </div>
              <p className="text-xs text-[var(--tekton-text-secondary)] truncate">{stat.sub}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
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
                <div key={user.email} className="flex items-center gap-3 min-w-0">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-[var(--tekton-bg-canvas)] items-center justify-center border border-[var(--tekton-border-default)] text-[var(--tekton-text-secondary)] font-bold">
                    {user.name[0]}
                  </span>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                    <p className="text-xs text-[var(--tekton-text-secondary)] truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="shrink-0 font-medium text-sm tabular-nums">{user.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-[var(--tekton-radius-lg)] border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] shadow-sm">
        <div className="flex flex-col space-y-1.5 p-6">
          <h3 className="font-semibold leading-none tracking-tight">Recent Transactions</h3>
          <p className="text-sm text-[var(--tekton-text-secondary)]">
            A summary of your latest transactions.
          </p>
        </div>
        <div className="px-6 pb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--tekton-border-default)]">
                  <th className="text-left font-medium text-[var(--tekton-text-secondary)] pb-3">
                    Invoice
                  </th>
                  <th className="text-left font-medium text-[var(--tekton-text-secondary)] pb-3">
                    Status
                  </th>
                  <th className="text-left font-medium text-[var(--tekton-text-secondary)] pb-3">
                    Method
                  </th>
                  <th className="text-right font-medium text-[var(--tekton-text-secondary)] pb-3">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
                  { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
                  {
                    invoice: 'INV-003',
                    status: 'Paid',
                    method: 'Bank Transfer',
                    amount: '$350.00',
                  },
                  { invoice: 'INV-004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
                  { invoice: 'INV-005', status: 'Refunded', method: 'PayPal', amount: '$550.00' },
                ].map((tx) => (
                  <tr
                    key={tx.invoice}
                    className="border-b border-[var(--tekton-border-default)] last:border-0"
                  >
                    <td className="py-3 font-medium">{tx.invoice}</td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center rounded-[var(--tekton-radius-full)] px-2.5 py-0.5 text-xs font-medium ${tx.status === 'Paid' ? 'bg-green-100 text-green-800' : tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 text-[var(--tekton-text-secondary)]">{tx.method}</td>
                    <td className="py-3 text-right font-medium">{tx.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function OverviewChart() {
  const chartData = [
    { month: 'Jan', value: 120 },
    { month: 'Feb', value: 150 },
    { month: 'Mar', value: 180 },
    { month: 'Apr', value: 160 },
    { month: 'May', value: 210 },
    { month: 'Jun', value: 250 },
    { month: 'Jul', value: 230 },
    { month: 'Aug', value: 280 },
    { month: 'Sep', value: 320 },
    { month: 'Oct', value: 300 },
    { month: 'Nov', value: 340 },
    { month: 'Dec', value: 380 },
  ];

  return (
    <div className="w-full mt-8">
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="pebbleColorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#E5E7EB" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B7280', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#111827', fontWeight: 600 }}
            itemStyle={{ color: '#6B7280' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#3B82F6"
            strokeWidth={3}
            fill="url(#pebbleColorValue)"
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6, fill: '#3B82F6' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
