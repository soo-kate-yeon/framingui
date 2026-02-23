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

const EDITORIAL_TECH_FALLBACK: Record<string, string> = {
  // 페이지 템플릿 변수 (인라인 스타일용) — 순수 grayscale, mono
  '--tekton-bg-canvas': '#FFFFFF',
  '--tekton-bg-surface': '#FFFFFF',
  '--tekton-text-primary': '#0A0A0A',
  '--tekton-text-secondary': '#737373',
  '--tekton-text-tertiary': '#A3A3A3',
  '--tekton-border-default': '#E5E5E5',
  '--tekton-border-emphasis': '#262626',
  '--tekton-action-primary': '#0A0A0A',
  '--tekton-action-primary-text': '#FFFFFF',

  // 컴포넌트 변수 (@tekton-ui/ui 컴포넌트용)
  '--tekton-bg-background': '#FFFFFF',
  '--tekton-bg-foreground': '#0A0A0A',
  '--tekton-bg-card': '#FFFFFF',
  '--tekton-bg-card-foreground': '#0A0A0A',
  '--tekton-bg-popover': '#FFFFFF',
  '--tekton-bg-popover-foreground': '#0A0A0A',
  '--tekton-bg-primary': '#0A0A0A',
  '--tekton-bg-primary-foreground': '#FFFFFF',
  '--tekton-bg-secondary': '#F5F5F5',
  '--tekton-bg-secondary-foreground': '#0A0A0A',
  '--tekton-bg-muted': '#FAFAFA',
  '--tekton-bg-muted-foreground': '#737373',
  '--tekton-bg-accent': '#F5F5F5',
  '--tekton-bg-accent-foreground': '#0A0A0A',
  '--tekton-bg-destructive': '#EF4444',
  '--tekton-bg-destructive-foreground': '#FFFFFF',
  '--tekton-border-input': '#D4D4D4',
  '--tekton-border-ring': '#0A0A0A',

  // 공유 토큰 — radius, spacing
  '--tekton-radius-sm': '4px',
  '--tekton-radius-md': '8px',
  '--tekton-radius-lg': '12px',
  '--tekton-radius-xl': '9999px',
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
 * Editorial Tech Live Demo
 * Theme: Mono grayscale, pill-shaped buttons/tabs, generous whitespace, typography-first
 * Design DNA: Blank canvas, zero chroma, pill accents, airy spacing
 */
export default function EditorialTechDemo() {
  const [activeTab, setActiveTab] = useState<'page' | 'component'>('page');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loaded: themeLoaded } = useTektonTheme('editorial-tech', {
    fallback: EDITORIAL_TECH_FALLBACK,
  });
  const { locale } = useStudioLanguage();

  return (
    <div
      className={`h-screen overflow-hidden flex flex-col md:flex-row bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] font-sans transition-opacity duration-500 pt-12 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <PreviewBanner templateId="editorial-tech" templateName="Editorial Tech" />

      {/* Sidebar (Desktop) — 넓은 패딩, 에디토리얼 느낌 */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] h-full overflow-y-auto shrink-0">
        <div className="p-8">
          <Link
            href="/studio"
            className="inline-flex items-center gap-2 mb-12 hover:opacity-70 transition-opacity"
          >
            <span className="text-xl font-bold tracking-tighter text-[var(--tekton-text-primary)]">
              tekton/ui
            </span>
            <span className="text-xs font-medium text-[var(--tekton-text-secondary)]">studio</span>
          </Link>
          <div className="flex items-center gap-3 mb-8 px-1">
            <div className="w-6 h-6 rounded-full bg-[var(--tekton-action-primary)]"></div>
            <span className="font-bold tracking-tight truncate">Lucid Lab</span>
          </div>
        </div>

        {/* 사이드바 탭 — pill 스타일 */}
        <nav className="flex-1 px-5 flex flex-col gap-1.5">
          <button
            onClick={() => setActiveTab('page')}
            className={`text-sm font-medium px-5 py-3 rounded-full transition-colors text-left flex items-center justify-between group ${activeTab === 'page' ? 'bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-muted)]'}`}
          >
            <span>{locale === 'ko' ? '페이지 예시' : 'Page Example'}</span>
            <ChevronRight
              size={16}
              className={`transition-opacity ${activeTab === 'page' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            />
          </button>
          <button
            onClick={() => setActiveTab('component')}
            className={`text-sm font-medium px-5 py-3 rounded-full transition-colors text-left flex items-center justify-between group ${activeTab === 'component' ? 'bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-muted)]'}`}
          >
            <span>{locale === 'ko' ? '컴포넌트 갤러리' : 'Component Gallery'}</span>
            <ChevronRight
              size={16}
              className={`transition-opacity ${activeTab === 'component' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
            />
          </button>
        </nav>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden shrink-0 border-b border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] flex items-center justify-between px-4 h-14 z-40 relative">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-[var(--tekton-action-primary)]"></div>
          <span className="font-bold tracking-tight text-sm">Lucid Lab</span>
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
              className={`text-lg font-medium px-5 py-4 rounded-full transition-colors text-left ${activeTab === 'page' ? 'bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-muted)]'}`}
            >
              {locale === 'ko' ? '페이지 예시' : 'Page Example'}
            </button>
            <button
              onClick={() => {
                setActiveTab('component');
                setMobileMenuOpen(false);
              }}
              className={`text-lg font-medium px-5 py-4 rounded-full transition-colors text-left ${activeTab === 'component' ? 'bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)]' : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)] hover:bg-[var(--tekton-bg-muted)]'}`}
            >
              {locale === 'ko' ? '컴포넌트 갤러리' : 'Component Gallery'}
            </button>
          </nav>
        </div>
      )}

      {/* Main Content — 넉넉한 여백 */}
      <main className="flex-1 overflow-y-auto h-full p-6 md:p-10 lg:p-16 pb-8 relative">
        <div className="max-w-[1100px] mx-auto">
          {activeTab === 'page' && <OverviewDashboard />}
          {activeTab === 'component' && <ComponentGallery />}
        </div>
      </main>
    </div>
  );
}

function OverviewDashboard() {
  return (
    <div className="space-y-12">
      {/* 헤더 — 큰 타이포그래피, 충분한 간격 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Dashboard</h2>
          <p className="mt-3 text-[var(--tekton-text-secondary)] text-base">
            Your business at a glance.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* pill 버튼 */}
          <button className="flex-1 sm:flex-none h-11 px-6 py-2 bg-[var(--tekton-bg-surface)] border border-[var(--tekton-border-default)] rounded-full text-sm font-medium hover:bg-[var(--tekton-bg-muted)] transition-colors">
            Export
          </button>
          <button className="flex-1 sm:flex-none h-11 px-6 py-2 bg-[var(--tekton-action-primary)] text-[var(--tekton-action-primary-text)] rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
            New Project
          </button>
        </div>
      </div>

      {/* pill 탭 바 */}
      <div className="inline-flex items-center gap-1 rounded-full bg-[#F5F5F5] p-1">
        {(['overview', 'analytics', 'reports'] as const).map((tab) => (
          <button
            key={tab}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              tab === 'overview'
                ? 'bg-white text-[var(--tekton-text-primary)] shadow-sm'
                : 'text-[var(--tekton-text-secondary)] hover:text-[var(--tekton-text-primary)]'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* KPIs — 넓은 갭 */}
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
            className="rounded-2xl border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)] min-w-0"
          >
            <div className="p-4 lg:p-7 flex flex-row items-center justify-between pb-2 lg:pb-3">
              <h3 className="tracking-tight text-xs lg:text-sm font-medium text-[var(--tekton-text-secondary)] truncate pr-2">
                {stat.title}
              </h3>
              <stat.icon className="h-4 w-4 text-[var(--tekton-text-tertiary)] shrink-0" />
            </div>
            <div className="px-4 lg:px-7 pb-4 lg:pb-7">
              <div className="text-xl lg:text-3xl font-bold tracking-tight tabular-nums">
                {stat.value}
              </div>
              <p className="text-xs text-[var(--tekton-text-secondary)] mt-1 truncate">
                {stat.sub}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
        {/* 차트 — 컨테이너는 rounded-2xl (pill이 아님) */}
        <div className="lg:col-span-4 rounded-2xl border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)] overflow-hidden">
          <div className="flex flex-col space-y-1.5 p-7 pb-2">
            <h3 className="text-lg font-semibold leading-none tracking-tight">Revenue Overview</h3>
            <p className="text-sm text-[var(--tekton-text-secondary)]">
              Growth metrics for the past 12 months.
            </p>
          </div>
          <div className="p-7 pt-0">
            <OverviewChart />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-3 rounded-2xl border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)] text-[var(--tekton-text-primary)]">
          <div className="flex flex-col space-y-1.5 p-7">
            <h3 className="text-lg font-semibold leading-none tracking-tight">Recent Activity</h3>
            <p className="text-sm text-[var(--tekton-text-secondary)]">
              24 new sales recorded today.
            </p>
          </div>
          <div className="p-7 pt-0">
            <div className="space-y-7">
              {[
                { name: 'Olivia Martin', email: 'olivia.martin@email.com', amount: '+$1,999.00' },
                { name: 'Jackson Lee', email: 'jackson.lee@email.com', amount: '+$39.00' },
                { name: 'Isabella Nguyen', email: 'isabella.nguyen@email.com', amount: '+$299.00' },
                { name: 'William Kim', email: 'will@email.com', amount: '+$99.00' },
                { name: 'Sofia Davis', email: 'sofia.davis@email.com', amount: '+$39.00' },
              ].map((user) => (
                <div key={user.email} className="flex items-center gap-3 min-w-0">
                  <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-[var(--tekton-bg-muted)] items-center justify-center text-[var(--tekton-text-secondary)] text-sm font-bold">
                    {user.name[0]}
                  </span>
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm font-medium leading-none truncate">{user.name}</p>
                    <p className="text-xs text-[var(--tekton-text-secondary)] truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="shrink-0 font-semibold tabular-nums text-sm">{user.amount}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table — 컨테이너는 rounded-2xl */}
      <div className="rounded-2xl border border-[var(--tekton-border-default)] bg-[var(--tekton-bg-surface)]">
        <div className="flex flex-col space-y-1.5 p-7">
          <h3 className="text-lg font-semibold leading-none tracking-tight">Recent Transactions</h3>
          <p className="text-sm text-[var(--tekton-text-secondary)]">
            A summary of your latest transactions.
          </p>
        </div>
        <div className="px-7 pb-7">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--tekton-border-default)]">
                  <th className="text-left font-medium text-[var(--tekton-text-secondary)] pb-4">
                    Invoice
                  </th>
                  <th className="text-left font-medium text-[var(--tekton-text-secondary)] pb-4">
                    Status
                  </th>
                  <th className="text-left font-medium text-[var(--tekton-text-secondary)] pb-4">
                    Method
                  </th>
                  <th className="text-right font-medium text-[var(--tekton-text-secondary)] pb-4">
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
                    <td className="py-4 font-medium">{tx.invoice}</td>
                    <td className="py-4">
                      {/* pill 배지 — grayscale만 사용 */}
                      <span
                        className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                          tx.status === 'Paid'
                            ? 'bg-[#F5F5F5] text-[#0A0A0A]'
                            : tx.status === 'Pending'
                              ? 'bg-[#FAFAFA] text-[#737373] border border-[#E5E5E5]'
                              : 'bg-[#FAFAFA] text-[#A3A3A3] line-through'
                        }`}
                      >
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-4 text-[var(--tekton-text-secondary)]">{tx.method}</td>
                    <td className="py-4 text-right font-semibold tabular-nums">{tx.amount}</td>
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
            <linearGradient id="editorialColorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0A0A0A" stopOpacity={0.08} />
              <stop offset="95%" stopColor="#0A0A0A" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#E5E5E5" vertical={false} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#737373', fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#737373', fontSize: 12 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '1px solid #E5E5E5',
              borderRadius: '9999px',
              padding: '6px 16px',
            }}
            labelStyle={{ color: '#0A0A0A', fontWeight: 600 }}
            itemStyle={{ color: '#737373' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#0A0A0A"
            strokeWidth={2}
            fill="url(#editorialColorValue)"
            dot={false}
            activeDot={{ r: 5, fill: '#0A0A0A', stroke: '#FFFFFF', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
