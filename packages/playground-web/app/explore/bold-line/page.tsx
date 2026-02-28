'use client';

import {
  DollarSign,
  Users,
  Activity,
  Menu,
  CreditCard,
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

// Bold-line theme: 흰색 배경, 검정 텍스트, 2px 굵은 테두리, 0px 라디우스, 그린 액센트
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

  '--tekton-radius-sm': '0px',
  '--tekton-radius-md': '0px',
  '--tekton-radius-lg': '0px',
  '--tekton-radius-xl': '0px',
  '--tekton-radius-none': '0px',
  '--tekton-radius-full': '0px',
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
      className={`h-screen overflow-hidden flex flex-col md:flex-row bg-white text-black font-sans transition-opacity duration-500 pt-12 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      <PreviewBanner templateId="bold-line" templateName="Bold Line" />

      {/* 데스크탑 사이드바 */}
      <aside className="hidden md:flex flex-col w-64 lg:w-72 border-r-2 border-black bg-white h-full overflow-y-auto shrink-0">
        <div className="p-6 border-b-2 border-black">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 mb-8 hover:opacity-60 transition-opacity"
          >
            <span className="text-xl font-black tracking-tighter text-black">framingui</span>
            <span className="text-xs font-bold text-[#525252] uppercase tracking-widest">
              studio
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs font-black">
              BL
            </div>
            <div>
              <p className="font-black text-sm tracking-tight">Bold Corp.</p>
              <p className="text-xs text-[#525252] font-bold uppercase tracking-widest">Pro Plan</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.tab;
            return (
              <button
                key={item.tab}
                onClick={() => setActiveTab(item.tab)}
                className={`w-full text-sm font-bold px-4 py-3 transition-all text-left flex items-center gap-3 border-2 ${
                  isActive
                    ? 'bg-black text-white border-black'
                    : 'bg-transparent text-black border-transparent hover:border-black'
                }`}
              >
                <item.icon size={16} />
                <span>{locale === 'ko' ? item.labelKo : item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t-2 border-black">
          <button className="w-full flex items-center gap-3 px-4 py-3 text-sm font-bold text-[#525252] hover:text-black border-2 border-transparent hover:border-black transition-all">
            <Settings size={16} />
            <span>{locale === 'ko' ? '설정' : 'Settings'}</span>
          </button>
        </div>
      </aside>

      {/* 모바일 헤더 */}
      <header className="md:hidden shrink-0 border-b-2 border-black bg-white flex items-center justify-between px-4 h-14 z-40 relative">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-black flex items-center justify-center text-white text-[10px] font-black">
            BL
          </div>
          <span className="font-black tracking-tight text-sm">Bold Corp.</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 -mr-2 text-black hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-black"
          aria-label="메뉴 열기/닫기"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* 모바일 메뉴 드로어 */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute inset-x-0 top-[104px] bottom-0 bg-white z-50 overflow-y-auto border-r-0">
          <nav className="flex flex-col gap-2 p-4">
            {NAV_ITEMS.map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  onClick={() => {
                    setActiveTab(item.tab);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-lg font-black px-4 py-4 transition-all text-left flex items-center gap-3 border-2 ${
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'bg-white text-black border-black'
                  }`}
                >
                  <item.icon size={20} />
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
        <div className="sticky top-0 z-10 bg-white border-b-2 border-black px-4 md:px-8 h-14 flex items-center justify-between">
          <div className="relative hidden sm:flex items-center">
            <Search size={14} className="absolute left-3 text-[#525252]" />
            <input
              type="text"
              placeholder={locale === 'ko' ? '검색...' : 'Search...'}
              className="pl-9 pr-4 py-1.5 text-sm font-medium bg-white border-2 border-black focus:outline-none focus:bg-[#F0FDF4] transition-colors w-48 lg:w-64 placeholder:text-[#A3A3A3]"
            />
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <button className="p-2 border-2 border-transparent hover:border-black transition-all relative">
              <Bell size={18} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#22C55E]" />
            </button>
            <div className="w-8 h-8 bg-black flex items-center justify-center text-white text-xs font-black">
              BC
            </div>
          </div>
        </div>

        <div className="p-4 md:p-8 lg:p-10 pb-12">
          <div className="max-w-[1200px] mx-auto">
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
    <div className="space-y-8">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b-2 border-black">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#525252] mb-1">
            {locale === 'ko' ? '개요' : 'Overview'}
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">
            {locale === 'ko' ? '대시보드' : 'Dashboard'}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-11 px-5 bg-white border-2 border-black text-sm font-bold hover:bg-black hover:text-white transition-all">
            {locale === 'ko' ? '내보내기' : 'Export'}
          </button>
          <button className="h-11 px-5 bg-black text-white border-2 border-black text-sm font-bold hover:bg-[#1A1A1A] transition-all">
            {locale === 'ko' ? '새 프로젝트' : 'New Project'}
          </button>
        </div>
      </div>

      {/* 스탯 카드 */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
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
            className={`border-2 border-black bg-white min-w-0 group hover:-translate-y-0.5 transition-transform ${stat.accent ? 'bg-[#F0FDF4]' : ''}`}
          >
            <div className="p-4 md:p-5 flex flex-row items-start justify-between">
              <div className="min-w-0 flex-1">
                <p className="text-[10px] md:text-xs font-bold text-[#525252] uppercase tracking-widest truncate mb-3">
                  {stat.title}
                </p>
                <div className="text-xl md:text-3xl font-black tabular-nums tracking-tight truncate">
                  {stat.value}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp size={10} className="text-[#22C55E] shrink-0" />
                  <p className="text-xs font-bold text-[#22C55E]">{stat.sub}</p>
                </div>
              </div>
              <div className="p-2 border-2 border-black ml-2 shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                <stat.icon className="h-4 w-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 차트 + 최근 활동 */}
      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        {/* 차트 */}
        <div className="lg:col-span-4 border-2 border-black bg-white overflow-hidden">
          <div className="flex items-center justify-between p-5 border-b-2 border-black">
            <div>
              <h3 className="font-black text-base tracking-tight">
                {locale === 'ko' ? '수익 개요' : 'Revenue Overview'}
              </h3>
              <p className="text-xs font-bold text-[#525252] mt-0.5">
                {locale === 'ko'
                  ? '최근 12개월 성장 지표'
                  : 'Growth metrics for the past 12 months'}
              </p>
            </div>
            <span className="text-xs font-bold uppercase tracking-widest border-2 border-[#22C55E] text-[#16A34A] px-2 py-1 bg-[#F0FDF4]">
              {locale === 'ko' ? '연간' : 'Annual'}
            </span>
          </div>
          <div className="p-5">
            <BoldLineChart />
          </div>
        </div>

        {/* 최근 활동 */}
        <div className="lg:col-span-3 border-2 border-black bg-white">
          <div className="p-5 border-b-2 border-black flex items-center justify-between">
            <div>
              <h3 className="font-black text-base tracking-tight">
                {locale === 'ko' ? '최근 활동' : 'Recent Activity'}
              </h3>
              <p className="text-xs font-bold text-[#525252] mt-0.5">
                {locale === 'ko' ? '오늘 24건의 신규 거래' : '24 new sales today'}
              </p>
            </div>
            <ArrowUpRight size={18} className="text-[#525252]" />
          </div>
          <div className="divide-y-2 divide-black">
            {[
              { name: 'Olivia Martin', email: 'olivia@email.com', amount: '+$1,999', tag: 'NEW' },
              { name: 'Jackson Lee', email: 'jackson@email.com', amount: '+$39', tag: null },
              { name: 'Isabella Nguyen', email: 'isabella@email.com', amount: '+$299', tag: null },
              { name: 'William Kim', email: 'will@email.com', amount: '+$99', tag: null },
              { name: 'Sofia Davis', email: 'sofia@email.com', amount: '+$39', tag: null },
            ].map((user) => (
              <div
                key={user.email}
                className="flex items-center gap-3 p-4 hover:bg-[#F5F5F5] transition-colors min-w-0"
              >
                <div className="w-9 h-9 bg-black text-white flex items-center justify-center text-sm font-black shrink-0">
                  {user.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-bold truncate">{user.name}</p>
                    {user.tag && (
                      <span className="text-[9px] font-black uppercase tracking-widest border-2 border-[#22C55E] bg-[#F0FDF4] text-[#16A34A] px-1.5 py-0.5 shrink-0">
                        {user.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#525252] font-medium truncate">{user.email}</p>
                </div>
                <div className="shrink-0 font-black text-sm tabular-nums">{user.amount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 거래 내역 테이블 */}
      <div className="border-2 border-black bg-white">
        <div className="flex items-center justify-between p-5 border-b-2 border-black">
          <div>
            <h3 className="font-black text-base tracking-tight">
              {locale === 'ko' ? '최근 거래' : 'Recent Transactions'}
            </h3>
            <p className="text-xs font-bold text-[#525252] mt-0.5">
              {locale === 'ko' ? '최근 거래 내역 요약' : 'Summary of your latest transactions'}
            </p>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-black bg-[#F5F5F5]">
                <th className="text-left text-xs font-black uppercase tracking-widest text-black py-4 px-5">
                  {locale === 'ko' ? '청구서' : 'Invoice'}
                </th>
                <th className="text-left text-xs font-black uppercase tracking-widest text-black py-4 px-5">
                  {locale === 'ko' ? '상태' : 'Status'}
                </th>
                <th className="text-left text-xs font-black uppercase tracking-widest text-black py-4 px-5 hidden sm:table-cell">
                  {locale === 'ko' ? '결제수단' : 'Method'}
                </th>
                <th className="text-right text-xs font-black uppercase tracking-widest text-black py-4 px-5">
                  {locale === 'ko' ? '금액' : 'Amount'}
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { invoice: 'INV-001', status: 'Paid', method: 'Credit Card', amount: '$250.00' },
                { invoice: 'INV-002', status: 'Pending', method: 'PayPal', amount: '$150.00' },
                { invoice: 'INV-003', status: 'Paid', method: 'Bank Transfer', amount: '$350.00' },
                { invoice: 'INV-004', status: 'Paid', method: 'Credit Card', amount: '$450.00' },
                { invoice: 'INV-005', status: 'Refunded', method: 'PayPal', amount: '$550.00' },
              ].map((tx) => (
                <tr
                  key={tx.invoice}
                  className="border-b-2 border-black/10 last:border-0 hover:bg-[#F5F5F5] transition-colors"
                >
                  <td className="py-4 px-5 font-bold">{tx.invoice}</td>
                  <td className="py-4 px-5">
                    <StatusBadge status={tx.status} />
                  </td>
                  <td className="py-4 px-5 text-[#525252] font-medium hidden sm:table-cell">
                    {tx.method}
                  </td>
                  <td className="py-4 px-5 text-right font-black tabular-nums">{tx.amount}</td>
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
      <span className="inline-flex items-center border-2 border-[#22C55E] bg-[#F0FDF4] text-[#16A34A] px-2.5 py-0.5 text-xs font-black uppercase tracking-wider">
        {status}
      </span>
    );
  }
  if (status === 'Pending') {
    return (
      <span className="inline-flex items-center border-2 border-black bg-[#F5F5F5] text-black px-2.5 py-0.5 text-xs font-black uppercase tracking-wider">
        {status}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center border-2 border-[#DC2626] bg-[#FEF2F2] text-[#DC2626] px-2.5 py-0.5 text-xs font-black uppercase tracking-wider">
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
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="boldLineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22C55E" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="0" stroke="#E5E5E5" vertical={false} strokeWidth={1} />
          <XAxis
            dataKey="month"
            axisLine={{ stroke: '#000000', strokeWidth: 2 }}
            tickLine={false}
            tick={{ fill: '#525252', fontSize: 11, fontWeight: 700 }}
            dy={10}
          />
          <YAxis
            axisLine={{ stroke: '#000000', strokeWidth: 2 }}
            tickLine={false}
            tick={{ fill: '#525252', fontSize: 11, fontWeight: 700 }}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#FFFFFF',
              border: '2px solid #000000',
              borderRadius: '0px',
              padding: '8px 12px',
            }}
            labelStyle={{
              color: '#000000',
              fontWeight: 900,
              textTransform: 'uppercase',
              fontSize: 11,
              letterSpacing: '0.05em',
            }}
            itemStyle={{ color: '#525252', fontWeight: 700 }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#000000"
            strokeWidth={3}
            fill="url(#boldLineGradient)"
            dot={{ fill: '#000000', r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6, fill: '#22C55E', stroke: '#000000', strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
