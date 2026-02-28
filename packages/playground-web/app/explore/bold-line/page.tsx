'use client';

import {
  DollarSign,
  Users,
  Activity,
  CreditCard,
  Menu,
  X,
  TrendingUp,
  ArrowUpRight,
  LayoutDashboard,
  BarChart2,
  Settings,
  Bell,
  Search,
} from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { useTektonTheme } from '@/hooks/useTektonTheme';
import { PreviewBanner } from '@/components/explore/PreviewBanner';
import { useExploreLanguage } from '@/contexts/ExploreLanguageContext';
import { ComponentGallery } from '@/components/explore/ComponentGallery';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

// Bold-line theme: 흰색 배경, 검정 텍스트, 4px 굵은 테두리, 0px 라디우스, 그린 액센트
const BOLD_LINE_FALLBACK: Record<string, string> = {
  '--tekton-bg-canvas': '#FFFFFF',
  '--tekton-bg-surface': '#FAFAFA',
  '--tekton-text-primary': '#000000',
  '--tekton-text-secondary': '#525252',
  '--tekton-text-tertiary': '#A3A3A3',
  '--tekton-border-default': '#000000',
  '--tekton-border-emphasis': '#000000',
  '--tekton-action-primary': '#000000',
  '--tekton-action-primary-text': '#FFFFFF',

  '--tekton-bg-background': '#FFFFFF',
  '--tekton-bg-foreground': '#000000',
  '--tekton-bg-card': '#FFFFFF',
  '--tekton-bg-card-foreground': '#000000',
  '--tekton-bg-popover': '#FFFFFF',
  '--tekton-bg-popover-foreground': '#000000',
  '--tekton-bg-primary': '#000000',
  '--tekton-bg-primary-foreground': '#FFFFFF',
  '--tekton-bg-secondary': '#F5F5F5',
  '--tekton-bg-secondary-foreground': '#000000',
  '--tekton-bg-muted': '#F5F5F5',
  '--tekton-bg-muted-foreground': '#525252',
  '--tekton-bg-accent': '#F0FDF4',
  '--tekton-bg-accent-foreground': '#000000',
  '--tekton-bg-destructive': '#DC2626',
  '--tekton-bg-destructive-foreground': '#FFFFFF',
  '--tekton-border-input': '#000000',
  '--tekton-border-ring': '#000000',

  // 브랜드 액센트 (그린)
  '--tekton-color-brand': '#22C55E',
  '--tekton-color-brand-text': '#16A34A',

  '--tekton-radius-sm': '0px',
  '--tekton-radius-md': '0px',
  '--tekton-radius-lg': '0px',
  '--tekton-radius-xl': '0px',
  '--tekton-radius-none': '0px',
  '--tekton-radius-full': '0px',
};

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', labelKo: '대시보드', tab: 'page' as const },
  {
    icon: BarChart2,
    label: 'Component Gallery',
    labelKo: '컴포넌트 갤러리',
    tab: 'component' as const,
  },
];

export default function BoldLineDemo() {
  const [activeTab, setActiveTab] = useState<'page' | 'component'>('page');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { loaded: themeLoaded } = useTektonTheme('bold-line', {
    fallback: BOLD_LINE_FALLBACK,
  });
  const { locale } = useExploreLanguage();

  return (
    <div
      className={`h-screen overflow-hidden flex flex-col md:flex-row bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] font-sans transition-opacity duration-500 pt-12 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <PreviewBanner templateId="bold-line" templateName="Bold Line" />

      {/* 데스크탑 사이드바 */}
      <aside className="hidden md:flex flex-col w-72 lg:w-80 border-r-0 bg-white h-full overflow-y-auto shrink-0 relative z-20">
        <div className="p-10 border-b-0">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 mb-12 hover:opacity-60 transition-opacity"
          >
            <span className="text-3xl font-black tracking-tighter text-black">framingui</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black flex items-center justify-center text-white text-lg font-black rounded-none">
              BL
            </div>
            <div>
              <p className="font-black text-lg tracking-tight leading-none mb-1">Bold Corp.</p>
              <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-[0.2em]">Master Plan</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-10 flex flex-col gap-4">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-fit text-xl font-black transition-all text-left flex items-center gap-2 pb-1 border-b-2 ${isActive
                  ? 'text-black border-black'
                  : 'text-neutral-400 border-transparent hover:text-black'
                  }`}
              >
                <span>{locale === 'ko' ? item.labelKo : item.label}</span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--tekton-color-brand)] ml-1" />
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-10 border-t-0">
          <button className="flex items-center gap-3 text-sm font-black text-neutral-400 hover:text-black transition-all">
            <Settings size={18} strokeWidth={3} />
            <span>{locale === 'ko' ? '설정' : 'Settings'}</span>
          </button>
        </div>
      </aside>

      {/* 모바일 헤더 */}
      <header className="md:hidden shrink-0 border-b-4 border-black bg-white flex items-center justify-between px-4 h-16 z-40 relative">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs font-black">
            BL
          </div>
          <span className="font-black tracking-tight text-base">Bold Corp.</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -mr-2 text-black hover:bg-black hover:text-white transition-colors border-2 border-transparent"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* 모바일 메뉴 드로어 */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-[112px] bottom-0 bg-white z-50 overflow-y-auto border-t-4 border-black">
          <nav className="flex flex-col gap-2 p-6">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-xl font-black px-6 py-5 transition-all text-left flex items-center gap-4 border-[3px] ${isActive
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black'
                    }`}
                >
                  <item.icon size={24} strokeWidth={3} />
                  <span>{locale === 'ko' ? item.labelKo : item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      )}

      {/* 메인 콘텐츠 */}
      <main className="flex-1 overflow-y-auto h-full bg-white relative">
        {/* 상단 툴바 */}
        <div className="sticky top-0 z-10 bg-white border-b-0 px-6 md:px-12 h-24 flex items-center justify-between">
          <div className="relative hidden sm:flex items-center flex-1 max-w-xl">
            <Search size={22} strokeWidth={3} className="absolute left-0 text-black" />
            <input
              type="text"
              placeholder={locale === 'ko' ? '검색...' : 'Search...'}
              className="w-full pl-10 pr-4 py-4 text-xl font-black bg-transparent border-b-[2px] border-black focus:outline-none focus:bg-[var(--tekton-color-brand)]/5 transition-all placeholder:text-neutral-300"
            />
          </div>
          <div className="flex items-center gap-8 ml-auto">
            <button className="relative group">
              <Bell size={26} strokeWidth={3} className="text-black group-hover:scale-110 transition-transform" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-[var(--tekton-color-brand)] border-2 border-white rounded-full" />
            </button>
            <div className="w-12 h-12 bg-black flex items-center justify-center text-white text-base font-black rounded-none">
              BC
            </div>
          </div>
        </div>

        <div className="md:hidden p-4 border-b-0">
          <h1 className="text-4xl font-black tracking-tighter">Dashboard</h1>
        </div>

        <div className="p-6 md:p-12 lg:p-16 pb-24">
          <div className="max-w-[1400px] mx-auto">
            {activeTab === 'page' && <OverviewDashboard locale={locale} />}
            {activeTab === 'component' && <ComponentGallery />}
          </div>
        </div>
      </main>
    </div>
  );
}

// ============================================================================
// Dashboard 콘텐츠
// ============================================================================

function OverviewDashboard({ locale }: { locale: string }) {
  return (
    <div className="space-y-16">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 pb-12 border-b-0">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-neutral-400 mb-4">
            {locale === 'ko' ? '개요' : 'Overview'}
          </p>
          <h2 className="text-6xl md:text-7xl font-black tracking-tighter leading-none">
            {locale === 'ko' ? '대시보드' : 'Dashboard'}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="h-14 px-8 bg-transparent border-[2px] border-black text-base font-black hover:bg-neutral-100 transition-all rounded-none">
            {locale === 'ko' ? '내보내기' : 'Export'}
          </button>
          <button className="h-14 px-8 bg-black text-white border-[2px] border-black text-base font-black hover:bg-neutral-800 transition-all rounded-none">
            {locale === 'ko' ? '새 프로젝트' : 'New Project'}
          </button>
        </div>
      </div>

      {/* 스탯 카드 */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: locale === 'ko' ? '총 수익' : 'Total Revenue',
            value: '$45,231',
            sub: '+20.1%',
            icon: DollarSign,
            accent: true,
          },
          {
            title: locale === 'ko' ? '구독자' : 'Subscriptions',
            value: '2,350',
            sub: '+180.1%',
            icon: Users,
            accent: false,
          },
          {
            title: locale === 'ko' ? '판매' : 'Sales',
            value: '12,234',
            sub: '+19.2%',
            icon: CreditCard,
            accent: false,
          },
          {
            title: locale === 'ko' ? '현재 접속' : 'Active Now',
            value: '573',
            sub: '+201',
            icon: Activity,
            accent: false,
          },
        ].map((stat) => (
          <div
            key={stat.title}
            className={`border-[2px] border-black min-w-0 group hover:-translate-y-1 transition-all ${stat.accent ? 'bg-[var(--tekton-color-brand)]/10' : 'bg-white'}`}
          >
            <div className="p-8 flex flex-col justify-between h-full min-h-[180px]">
              <div className="flex items-start justify-between">
                <p className={`text-xs font-black uppercase tracking-[0.2em] truncate ${stat.accent ? 'text-black' : 'text-neutral-400'}`}>
                  {stat.title}
                </p>
                <div className={`p-2 border-[2px] border-black ${stat.accent ? 'bg-black text-white' : 'bg-white text-black'}`}>
                  <stat.icon size={20} strokeWidth={3} />
                </div>
              </div>
              <div className="relative">
                <div className="text-4xl font-black tabular-nums tracking-tighter leading-none my-3">
                  {stat.value}
                </div>
                {stat.accent && (
                  <div className="absolute -right-2 top-0 w-2 h-2 rounded-full bg-[var(--tekton-color-brand)]" />
                )}
                <div className="flex items-center gap-1.5">
                  <TrendingUp size={16} strokeWidth={4} className="text-black" />
                  <p className="text-sm font-black text-black">{stat.sub}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 차트 + 최근 활동 */}
      <div className="grid gap-16 grid-cols-1 lg:grid-cols-7">
        {/* 차트 */}
        <div className="lg:col-span-4 border-[2px] border-black bg-white overflow-hidden">
          <div className="flex items-center justify-between p-8 border-b-0">
            <div>
              <h3 className="font-black text-2xl tracking-tight">
                {locale === 'ko' ? '수익 개요' : 'Revenue Overview'}
              </h3>
              <p className="text-xs font-black text-neutral-400 mt-1 uppercase tracking-widest">
                {locale === 'ko' ? '최근 12개월 성장 지표' : 'Last 12 months growth'}
              </p>
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] border-[2px] border-black px-3 py-1 bg-white">
              {locale === 'ko' ? '연간' : 'Annual'}
            </span>
          </div>
          <div className="p-8 pt-0">
            <BoldLineChart />
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="lg:col-span-3 border-[2px] border-black bg-white">
          <div className="p-8 border-b-0 flex items-center justify-between">
            <div>
              <h3 className="font-black text-2xl tracking-tight">
                {locale === 'ko' ? '최근 활동' : 'Recent Activity'}
              </h3>
            </div>
            <ArrowUpRight size={24} strokeWidth={3} className="text-black" />
          </div>
          <div className="divide-y-[1px] divide-neutral-100 px-2 pb-2">
            {[
              { name: 'Olivia Martin', email: 'olivia@email.com', amount: '+$1,999', tag: 'NEW' },
              { name: 'Jackson Lee', email: 'jackson@email.com', amount: '+$39', tag: null },
              { name: 'Isabella Nguyen', email: 'isabella@email.com', amount: '+$299', tag: null },
              { name: 'William Kim', email: 'will@email.com', amount: '+$99', tag: null },
              { name: 'Sofia Davis', email: 'sofia@email.com', amount: '+$39', tag: null },
            ].map((user) => (
              <div
                key={user.email}
                className="flex items-center gap-4 p-4 hover:bg-[var(--tekton-color-brand)]/5 transition-colors min-w-0"
              >
                <div className="w-10 h-10 bg-black text-white flex items-center justify-center text-base font-black shrink-0">
                  {user.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-black truncate">{user.name}</p>
                    {user.tag && (
                      <span className="text-[8px] font-black uppercase tracking-widest border-[1px] border-black bg-[var(--tekton-color-brand)] px-1.5 py-0 shrink-0">
                        {user.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-neutral-400 font-bold truncate">{user.email}</p>
                </div>
                <div className="shrink-0 font-black text-base tabular-nums">{user.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 거래 내역 테이블 */}
      <div className="border-[2px] border-black bg-white">
        <div className="flex items-center justify-between p-8 border-b-0">
          <div>
            <h3 className="font-black text-2xl tracking-tight">
              {locale === 'ko' ? '최근 거래' : 'Recent Transactions'}
            </h3>
          </div>
        </div>
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-[2px] border-black">
                <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 py-4 px-4">
                  {locale === 'ko' ? '청구서' : 'Invoice'}
                </th>
                <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 py-4 px-4">
                  {locale === 'ko' ? '상태' : 'Status'}
                </th>
                <th className="text-left text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 py-4 px-4 hidden sm:table-cell">
                  {locale === 'ko' ? '결제수단' : 'Method'}
                </th>
                <th className="text-right text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 py-4 px-4">
                  {locale === 'ko' ? '금액' : 'Amount'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-[1px] divide-neutral-100">
              {[
                { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
                { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
                { invoice: 'INV-003', status: 'Paid', method: 'Bank Transfer', amount: '$350.00' },
                { invoice: 'INV-004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
                { invoice: 'INV-005', status: 'Refunded', method: 'PayPal', amount: '$550.00' },
              ].map((tx) => (
                <tr
                  key={tx.invoice}
                  className="hover:bg-[var(--tekton-color-brand)]/5 transition-colors"
                >
                  <td className="py-5 px-4 font-black">{tx.invoice}</td>
                  <td className="py-5 px-4">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="py-5 px-4 text-neutral-400 font-bold text-xs hidden sm:table-cell">
                    {tx.method}
                  </td>
                  <td className="py-5 px-4 text-right font-black tabular-nums text-base">{tx.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Paid') {
    return (
      <span className="inline-flex items-center bg-[var(--tekton-color-brand)] text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
        {status}
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center bg-neutral-100 text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center bg-black text-white px-2 py-0.5 text-[10px] font-black uppercase tracking-wider">
      {status}
    </span>
  );
}

// ============================================================================
// 차트 컴포넌트 (Bold-line 스타일)
// ============================================================================

function BoldLineChart() {
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
    <div className="w-full mt-4">
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="boldLineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--tekton-color-brand)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="var(--tekton-color-brand)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="#f8f8f8" vertical={false} strokeWidth={1} />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'neutral-400', fontSize: 10, fontWeight: 900 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: 'neutral-400', fontSize: 10, fontWeight: 900 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              border: '2px solid black',
              borderRadius: '0px',
              padding: '8px 12px',
            }}
            labelStyle={{
              color: 'black',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: 10,
              letterSpacing: '0.1em',
              marginBottom: '2px',
            }}
            itemStyle={{ color: 'black', fontWeight: 900, fontSize: 12 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="black"
            strokeWidth={2}
            fill="url(#boldLineGradient)"
            dot={false}
            activeDot={{ r: 4, fill: 'var(--tekton-color-brand)', stroke: 'black', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
