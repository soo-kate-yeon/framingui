'use client';

import { cn } from '../../lib/utils'; // Adjust path if needed or use standard clsx/tailwind-merge

// Mock Switch
export const MockSwitch = ({ checked = true }: { checked?: boolean }) => (
  <div
    className={cn(
      'w-11 h-6 rounded-full transition-colors duration-200 border-2 border-transparent',
      checked ? 'bg-slate-900' : 'bg-slate-200'
    )}
  >
    <div
      className={cn(
        'w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200',
        checked ? 'translate-x-5' : 'translate-x-0'
      )}
    />
  </div>
);

// Mock Avatar
export const MockAvatar = ({ src, fallback }: { src?: string; fallback: string }) => (
  <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-100 flex items-center justify-center">
    {src ? (
      <img src={src} className="w-full h-full object-cover" />
    ) : (
      <span className="text-xs font-bold text-slate-500">{fallback}</span>
    )}
  </div>
);

// Mock Calendar (Mini version)
export const MockCalendar = () => (
  <div className="p-3 bg-white border border-slate-100 rounded-2xl shadow-xl w-48">
    <div className="flex justify-between items-center mb-4">
      <div className="w-12 h-2 bg-slate-100 rounded-full" />
      <div className="flex gap-1">
        <div className="w-4 h-4 rounded bg-slate-50" />
        <div className="w-4 h-4 rounded bg-slate-50" />
      </div>
    </div>
    <div className="grid grid-cols-7 gap-1">
      {[...Array(21)].map((_, i) => (
        <div
          key={i}
          className={cn(
            'aspect-square rounded-sm flex items-center justify-center text-[8px]',
            i === 10 ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-400'
          )}
        >
          {i + 1}
        </div>
      ))}
    </div>
  </div>
);

// Mock Dropdown Menu (Open state)
export const MockDropdown = () => (
  <div className="w-40 bg-white border border-slate-100 rounded-xl shadow-2xl p-1 overflow-hidden">
    <div className="px-2 py-1.5 text-[10px] font-semibold text-slate-400">Settings</div>
    <div className="space-y-0.5">
      <div className="flex items-center gap-2 px-2 py-1.5 bg-slate-50 rounded-md">
        <div className="w-3 h-3 rounded-full bg-slate-200" />
        <div className="w-16 h-1.5 bg-slate-300 rounded-full" />
      </div>
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md">
        <div className="w-3 h-3 rounded-full bg-slate-100" />
        <div className="w-20 h-1.5 bg-slate-100 rounded-full" />
      </div>
      <div className="h-px bg-slate-50 my-1" />
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md">
        <div className="w-3 h-3 rounded-full bg-slate-100" />
        <div className="w-12 h-1.5 bg-slate-100 rounded-full" />
      </div>
    </div>
  </div>
);

// Mock Tabs
export const MockTabs = () => (
  <div className="inline-flex p-1 bg-slate-100 rounded-lg shadow-inner">
    <div className="px-4 py-1.5 bg-white rounded-md shadow-sm text-[10px] font-medium text-slate-900">
      Design
    </div>
    <div className="px-4 py-1.5 text-[10px] font-medium text-slate-400">Code</div>
    <div className="px-4 py-1.5 text-[10px] font-medium text-slate-400">Assets</div>
  </div>
);
