'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, Activity, Settings, Search, Bell } from 'lucide-react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#F0F0F0] font-sans selection:bg-neutral-900 selection:text-white flex">
      {/* [Template] Sidebar */}
      <aside className="hidden md:flex w-[280px] bg-white border-r border-neutral-200 flex-col fixed h-full z-20">
        <div className="p-8 border-b border-neutral-100">
          <div className="text-xl font-bold tracking-tighter">TEKTON</div>
          <span className="text-[10px] uppercase tracking-widest text-neutral-400 mt-1 block">
            Workspace
          </span>
        </div>

        <nav className="flex-1 p-6 space-y-2">
          {/* [Recipe] Button Ghost (used for nav items) */}
          <NavItem
            href="/studio/square-minimalism/dashboard"
            icon={<LayoutDashboard size={18} />}
            label="Overview"
            active={pathname === '/studio/square-minimalism/dashboard'}
          />
          <NavItem
            href="/studio/square-minimalism/dashboard/customers"
            icon={<Users size={18} />}
            label="Customers"
            active={pathname?.includes('/customers')}
          />
          <NavItem href="#" icon={<CreditCard size={18} />} label="Transactions" />
          <NavItem href="#" icon={<Activity size={18} />} label="Analytics" />
          <NavItem
            href="/studio/square-minimalism/dashboard/settings"
            icon={<Settings size={18} />}
            label="Settings"
            active={pathname?.includes('/settings')}
          />
        </nav>

        <div className="p-8 border-t border-neutral-100">
          <div className="bg-neutral-50 p-4 border border-neutral-100">
            <div className="text-xs font-bold uppercase tracking-wide text-neutral-500 mb-2">
              My Plan
            </div>
            <div className="text-sm font-semibold mb-3">Pro Plan</div>
            <div className="h-1 bg-neutral-200 w-full mb-1">
              <div className="h-full bg-neutral-900 w-[60%]"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* [Template] Main Content Area */}
      <main className="flex-1 md:ml-[280px] min-w-0">
        {/* [Template] Top Header (Shared) */}
        <header className="h-[60px] md:h-[80px] bg-white/80 backdrop-blur-md border-b border-white/20 sticky top-0 z-10 px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <span>Dashboard</span>
            <span className="text-neutral-300">/</span>
            <span className="text-neutral-900 font-medium uppercase tracking-wide text-xs">
              {pathname?.split('/').pop()}
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-0 top-1/2 -translate-y-1/2 text-neutral-400" />
              {/* [Recipe] Input Architectural */}
              <input
                type="text"
                placeholder="Search..."
                className="pl-6 bg-transparent border-b border-transparent focus:border-neutral-900 focus:outline-none py-1 text-sm w-48 transition-colors placeholder:text-neutral-300"
              />
            </div>
            <button className="relative">
              <Bell className="w-5 h-5 text-neutral-600" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-8 h-8 bg-neutral-900 text-white flex items-center justify-center text-xs font-bold shrink-0">
              SY
            </div>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}

function NavItem({
  href,
  icon,
  label,
  active = false,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${active ? 'bg-neutral-900 text-white' : 'text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50'}`}
    >
      {icon}
      {label}
    </Link>
  );
}
