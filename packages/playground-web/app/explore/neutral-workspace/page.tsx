'use client';

import { DollarSign, Users, Activity, Menu, ChevronRight, CreditCard, X } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTektonTheme } from '@/hooks/useTektonTheme';
import { PreviewBanner } from '@/components/explore/PreviewBanner';
import { useExploreLanguage } from '@/contexts/ExploreLanguageContext';
import { ComponentGallery } from '@/components/explore/ComponentGallery';
import { Badge } from '@framingui/ui';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

const NEUTRAL_HUMANISM_FALLBACK: Record<string, string> = {
  // 페이지 템플릿 변수 (인라인 스타일용)
  '--tekton-bg-canvas': '#F9F7F2',
  '--tekton-bg-surface': '#FDFCFA',
  '--tekton-text-primary': '#1F1E1C',
  '--tekton-text-secondary': '#6B665E',
  '--tekton-text-tertiary': '#A8A29E',
  '--tekton-border-default': '#EAE6DA',
  '--tekton-border-emphasis': '#D5D0C4',
  '--tekton-action-primary': '#1F1E1C',
  '--tekton-action-primary-text': '#FDFCFA',

  // 컴포넌트 변수 (@framingui/ui 컴포넌트용)
  '--tekton-bg-background': '#F9F7F2',
  '--tekton-bg-foreground': '#1F1E1C',
  '--tekton-bg-card': '#FDFCFA',
  '--tekton-bg-card-foreground': '#1F1E1C',
  '--tekton-bg-popover': '#FDFCFA',
  '--tekton-bg-popover-foreground': '#1F1E1C',
  '--tekton-bg-primary': '#1F1E1C',
  '--tekton-bg-primary-foreground': '#FDFCFA',
  '--tekton-bg-secondary': '#EAE6DA',
  '--tekton-bg-secondary-foreground': '#1F1E1C',
  '--tekton-bg-muted': '#F3F0E8',
  '--tekton-bg-muted-foreground': '#6B665E',
  '--tekton-bg-accent': '#EAE6DA',
  '--tekton-bg-accent-foreground': '#1F1E1C',
  '--tekton-bg-destructive': '#E54D2E',
  '--tekton-bg-destructive-foreground': '#FDFCFA',
  '--tekton-border-input': '#F3F0E8',
  '--tekton-border-ring': '#1F1E1C',

  // 공유 토큰 (컴포넌트 + 페이지)
  '--tekton-radius-sm': '6px',
  '--tekton-radius-md': '8px',
  '--tekton-radius-lg': '12px',
  '--tekton-radius-xl': '16px',
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

/**
 * Neutral Workspace Workspace Demo
 * Replicating the Minimal Workspace IA with the Neutral Workspace theme.
 */
export default function NeutralHumanismDemo() {
  const [activeTab, setActiveTab] = useState<'page' | 'component'>('page');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loaded: themeLoaded } = useTektonTheme('neutral-workspace', {
    fallback: NEUTRAL_HUMANISM_FALLBACK,
  });
  const { locale } = useExploreLanguage();

  return (
    <div
      className={`h-screen overflow-hidden flex flex-col md:flex-row bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] font-sans transition-opacity duration-500 pt-12 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Preview Banner */}
      <PreviewBanner templateId="neutral-workspace" templateName="Neutral Workspace" />

      {/* Local Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] h-full overflow-y-auto shrink-0">
        <div className="p-6">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 mb-10 hover:opacity-70 transition-opacity"
          >
            <span className="text-xl font-bold tracking-tighter text-[var(--tekton-text-primary)]">
              framingui
            </span>
            <span className="text-xs font-medium text-[var(--tekton-text-secondary)]">studio</span>
          </Link>
          <div className="flex items-center gap-3 mb-6 px-1">
            <div className="w-6 h-6 rounded-full bg-[var(--tekton-action-primary)] shadow-sm"></div>
            <span className="font-bold tracking-tight truncate">Neutral Org</span>
          </div>
        </div>

        {/* Navigation */}
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
          <Link
            href="/explore/neutral-workspace/kanban"
            className="text-sm font-medium px-4 py-3 rounded-[var(--tekton-radius-lg)] transition-colors text-left flex items-center justify-between group text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)]"
          >
            <span>{locale === 'ko' ? '이슈 트래커' : 'Issue Tracker'}</span>
            <Badge className="ml-2 bg-blue-500 text-white text-[10px] h-4 px-1 rounded-sm border-none">
              NEW
            </Badge>
            <ChevronRight
              size={16}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </Link>
        </nav>
      </aside>

      {/* Mobile Header (replaces sidebar on small screens) */}
      <header className="md:hidden shrink-0 border-b border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] flex items-center justify-between px-4 h-14 z-40 relative">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--tekton-action-primary)] shadow-sm"></div>
          <span className="font-bold tracking-tight text-sm">Neutral Org</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -mr-2 text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] transition-colors"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Dropdown */}
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
            <Link
              href="/explore/neutral-workspace/kanban"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium px-4 py-4 rounded-[var(--tekton-radius-lg)] transition-colors text-left text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-canvas)] flex items-center justify-between"
            >
              <span>{locale === 'ko' ? '이슈 트래커' : 'Issue Tracker'}</span>
              <Badge className="bg-blue-500 text-white text-[10px] h-5 px-1.5 rounded-sm border-none">
                NEW
              </Badge>
            </Link>
          </nav>
        </div>
      )}

      {/* Main Content */}
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

      {/* KPIs */}
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

      {/* Transactions Table */}
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
                        className={`inline-flex items-center rounded-[var(--tekton-radius-full)] px-2.5 py-0.5 text-xs font-medium ${
                          tx.status === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : tx.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                        }`}
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
            <linearGradient id="neutralColorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1F1E1C" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#1F1E1C" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#EAE6DA" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B665E', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#6B665E', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FDFCFA',
              border: '1px solid #EAE6DA',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            labelStyle={{ color: '#1F1E1C', fontWeight: 600 }}
            itemStyle={{ color: '#6B665E' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#1F1E1C"
            strokeWidth={3}
            fill="url(#neutralColorValue)"
            dot={{ fill: '#1F1E1C', r: 4 }}
            activeDot={{ r: 6, fill: '#1F1E1C' }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
