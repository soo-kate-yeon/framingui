'use client';

import {
  ArrowUpRight,
  ArrowDownLeft,
  Plus,
  MoreHorizontal,
  Bell,
  Settings,
  ShoppingBag,
  Car,
  Tv,
  User,
} from 'lucide-react';
import { useTektonTheme } from '@/hooks/useTektonTheme';

const BOLD_LINE_FALLBACK: Record<string, string> = {
  '--bg-canvas': '#FFFFFF',
  '--bg-surface': '#FAFAFA',
  '--text-primary': '#000000',
  '--text-secondary': '#525252',
  '--text-tertiary': '#A3A3A3',
  '--border-default': '#000000',
  '--border-emphasis': '#000000',
  '--action-primary': '#000000',
  '--action-primary-text': '#FFFFFF',
  '--bg-background': '#FFFFFF',
  '--bg-foreground': '#000000',
  '--bg-card': '#FFFFFF',
  '--bg-card-foreground': '#000000',
  '--bg-popover': '#FFFFFF',
  '--bg-popover-foreground': '#000000',
  '--bg-primary': '#000000',
  '--bg-primary-foreground': '#FFFFFF',
  '--bg-secondary': '#F5F5F5',
  '--bg-secondary-foreground': '#000000',
  '--bg-muted': '#F5F5F5',
  '--bg-muted-foreground': '#525252',
  '--bg-accent': '#F0FDF4',
  '--bg-accent-foreground': '#000000',
  '--bg-destructive': '#DC2626',
  '--bg-destructive-foreground': '#FFFFFF',
  '--border-input': '#000000',
  '--border-ring': '#000000',
  '--color-brand': '#22C55E',
  '--color-brand-text': '#16A34A',
  '--radius-sm': '0px',
  '--radius-md': '0px',
  '--radius-lg': '0px',
  '--radius-xl': '0px',
  '--radius-none': '0px',
  '--radius-full': '0px',
};

const GREEN_ACCENT = 'oklch(0.94 0.22 120)';

const QUICK_SEND_CONTACTS = [
  { name: 'Alex', initials: 'A' },
  { name: 'Sarah', initials: 'S' },
  { name: 'Mike', initials: 'M' },
  { name: 'Emma', initials: 'E' },
];

const TRANSACTIONS = [
  {
    icon: Tv,
    name: 'Netflix Subscription',
    date: 'Mar 20',
    amount: '-$15.99',
    badge: 'Recurring',
    positive: false,
  },
  {
    icon: User,
    name: 'Sarah Johnson',
    date: 'Mar 19',
    amount: '+$500.00',
    badge: 'Received',
    positive: true,
  },
  {
    icon: Car,
    name: 'Uber Ride',
    date: 'Mar 18',
    amount: '-$24.50',
    badge: 'Transport',
    positive: false,
  },
  {
    icon: ShoppingBag,
    name: 'Apple Store',
    date: 'Mar 17',
    amount: '-$199.00',
    badge: 'Shopping',
    positive: false,
  },
  {
    icon: User,
    name: 'Mike Chen',
    date: 'Mar 16',
    amount: '+$120.00',
    badge: 'Received',
    positive: true,
  },
];

export default function BoldLineFintechPage() {
  const { loaded: themeLoaded } = useTektonTheme('bold-line', {
    fallback: BOLD_LINE_FALLBACK,
  });

  return (
    <div
      className={`min-h-screen bg-white text-black transition-opacity duration-500 ${themeLoaded ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-black px-5 md:px-8 h-14 flex items-center justify-between">
        <span className="text-sm md:text-base font-black uppercase tracking-widest">
          FRAMINGUI PAY
        </span>
        <div className="flex items-center gap-4">
          <button className="relative">
            <Bell size={20} strokeWidth={3} />
            <span
              className="absolute -top-1 -right-1 w-2.5 h-2.5 border-2 border-white"
              style={{ backgroundColor: GREEN_ACCENT }}
            />
          </button>
          <button>
            <Settings size={20} strokeWidth={3} />
          </button>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-5 md:px-8 pb-20">
        {/* Balance Section */}
        <section className="py-10 md:py-14 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-3">
            TOTAL BALANCE
          </p>
          <h1 className="text-5xl md:text-6xl font-black tracking-tighter leading-none mb-3">
            $24,830.50
          </h1>
          <p className="text-sm font-bold" style={{ color: GREEN_ACCENT }}>
            +$1,245.20 this month
          </p>
        </section>

        {/* Action Buttons */}
        <section className="grid grid-cols-4 gap-3 mb-10">
          {[
            { icon: ArrowUpRight, label: 'Send', primary: true },
            { icon: ArrowDownLeft, label: 'Receive', primary: false },
            { icon: Plus, label: 'Add Money', primary: false },
            { icon: MoreHorizontal, label: 'More', primary: false },
          ].map((action) => (
            <button
              key={action.label}
              className={`w-full aspect-square border-2 border-black flex flex-col items-center justify-center gap-2 transition-all hover:-translate-y-0.5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${
                action.primary ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <action.icon size={22} strokeWidth={3} />
              <span className="text-[9px] font-black uppercase tracking-widest">
                {action.label}
              </span>
            </button>
          ))}
        </section>

        {/* Quick Send */}
        <section className="mb-10">
          <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-4">
            QUICK SEND
          </h2>
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            {QUICK_SEND_CONTACTS.map((contact) => (
              <div key={contact.name} className="flex flex-col items-center gap-1.5 shrink-0">
                <div className="w-12 h-12 bg-black text-white border-2 border-black flex items-center justify-center font-black text-sm">
                  {contact.initials}
                </div>
                <span className="text-[9px] font-black uppercase tracking-wider">
                  {contact.name}
                </span>
              </div>
            ))}
            <div className="flex flex-col items-center gap-1.5 shrink-0">
              <button className="w-12 h-12 bg-white text-black border-2 border-dashed border-black flex items-center justify-center hover:bg-neutral-50 transition-colors">
                <Plus size={20} strokeWidth={3} />
              </button>
              <span className="text-[9px] font-black uppercase tracking-wider text-neutral-400">
                Add
              </span>
            </div>
          </div>
        </section>

        {/* Transactions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">
              RECENT TRANSACTIONS
            </h2>
            <button className="text-[10px] font-black uppercase tracking-widest hover:underline underline-offset-4">
              See All
            </button>
          </div>

          <div className="border-2 border-black bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {TRANSACTIONS.map((tx, index) => (
              <div
                key={tx.name + tx.date}
                className={`flex items-center gap-3 px-4 py-3.5 hover:bg-neutral-50 transition-colors ${
                  index < TRANSACTIONS.length - 1 ? 'border-b border-neutral-200' : ''
                }`}
              >
                {/* Icon */}
                <div className="w-10 h-10 border-2 border-black bg-white flex items-center justify-center shrink-0">
                  <tx.icon size={16} strokeWidth={3} />
                </div>

                {/* Name + Date */}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-black truncate">{tx.name}</p>
                  <p className="text-[10px] text-neutral-400 font-bold">{tx.date}</p>
                </div>

                {/* Amount + Badge */}
                <div className="text-right shrink-0">
                  <p
                    className="text-sm font-black tabular-nums"
                    style={tx.positive ? { color: GREEN_ACCENT } : undefined}
                  >
                    {tx.amount}
                  </p>
                  <span
                    className={`inline-block text-[8px] font-black uppercase tracking-wider px-1.5 py-0.5 mt-0.5 ${
                      tx.positive ? 'text-black' : 'bg-neutral-100 text-neutral-600'
                    }`}
                    style={tx.positive ? { backgroundColor: GREEN_ACCENT } : undefined}
                  >
                    {tx.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
