'use client';

import {
  Home,
  Compass,
  Plus,
  Bell,
  MessageCircle,
  Search,
  ChevronDown,
  MoreHorizontal,
  Share2,
  ArrowUpRight,
} from 'lucide-react';
import { useState } from 'react';
import { useTektonTheme } from '@/hooks/useTektonTheme';

const ROUND_MINIMAL_FALLBACK: Record<string, string> = {
  '--tekton-bg-canvas': '#F3F5F7', // Cool gray background
  '--tekton-bg-surface': '#FFFFFF',
  '--tekton-text-primary': '#111827',
  '--tekton-text-secondary': '#6B7280',
  '--tekton-border-default': '#E5E7EB',
  '--tekton-primary': '#E60023', // Pinterest Red-ish (or Brand Blue based on previous file) -> Let's stick to the JSON's "brand" which was blue-ish in previous file, but "Pinterest" implies red. I'll stick to a neutral/brand generic or the JSON's defined brand (blue 500). Let's use neutral dark for primary UI and a brand color for accents.
  '--tekton-radius-xl': '24px',
  '--tekton-radius-2xl': '32px',
  '--tekton-radius-full': '9999px',
};

// Mock Data for Pins
const PINS = [
  {
    id: 1,
    title: 'Minimalist Workspace Desk Setup',
    image:
      'https://images.unsplash.com/photo-1493934558415-9d19f0b2b4d2?auto=format&fit=crop&w=800&q=80',
    height: 400,
  },
  {
    id: 2,
    title: 'Abstract 3D Shapes',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    height: 600,
  },
  {
    id: 3,
    title: 'Swiss Style Typography',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80',
    height: 300,
  },
  {
    id: 4,
    title: 'Modern Interior Design',
    image:
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    height: 500,
  },
  {
    id: 5,
    title: 'Ceramic Textures',
    image:
      'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
    height: 350,
  },
  {
    id: 6,
    title: 'Architectural Details',
    image:
      'https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=800&q=80',
    height: 450,
  },
  {
    id: 7,
    title: 'Gradient Grids',
    image:
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80',
    height: 400,
  },
  {
    id: 8,
    title: 'Neon Light Experiment',
    image:
      'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80',
    height: 550,
  },
  {
    id: 9,
    title: 'Plant Aesthetics',
    image:
      'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&w=800&q=80',
    height: 300,
  },
  {
    id: 10,
    title: 'Tech Gadgets Flatlay',
    image:
      'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=800&q=80',
    height: 400,
  },
  {
    id: 11,
    title: 'Coffee Culture',
    image:
      'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=800&q=80',
    height: 350,
  },
  {
    id: 12,
    title: 'Urban Photography',
    image:
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&w=800&q=80',
    height: 500,
  },
];

const CATEGORIES = [
  'All',
  'UI Design',
  'Interior',
  'Photography',
  'Typography',
  'Branding',
  'Fashion',
  'Architecture',
  'Art',
  'Travel',
  'Food',
];

export default function RoundMinimalTemplate() {
  const { loaded: themeLoaded } = useTektonTheme('round-minimal', {
    fallback: ROUND_MINIMAL_FALLBACK,
  });
  const [selectedCategory, setSelectedCategory] = useState('All');

  return (
    // Fixed height container to allow inner scrolling
    <div
      className={`flex h-[calc(100vh)] bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] font-sans transition-opacity duration-500 ${themeLoaded ? 'opacity-100' : 'opacity-0'} overflow-hidden`}
    >
      {/* Left Sidebar (Collapsed) - Desktop Only */}
      <aside className="w-[88px] hidden md:flex flex-col items-center py-6 bg-[var(--tekton-bg-surface)] border-r border-transparent h-full shrink-0 overflow-y-auto no-scrollbar">
        <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center mb-8 cursor-pointer hover:bg-red-700 transition-colors shrink-0">
          <span className="font-bold text-lg">P</span>
        </div>

        <nav className="flex flex-col gap-6 w-full items-center flex-1">
          <SidebarItem icon={<Home size={24} />} active />
          <SidebarItem icon={<Compass size={24} />} />
          <SidebarItem icon={<Plus size={24} />} />
        </nav>

        <div className="mt-auto flex flex-col gap-6 items-center w-full">
          <SidebarItem icon={<Bell size={24} />} />
          <SidebarItem icon={<MessageCircle size={24} />} />
          <div className="w-8 h-8 rounded-full bg-neutral-200 overflow-hidden cursor-pointer hover:ring-4 hover:ring-neutral-100 transition-all">
            <img src="https://github.com/shadcn.png" alt="User" />
          </div>
          <button className="text-[var(--tekton-text-secondary)] hover:bg-[var(--tekton-bg-canvas)] p-3 rounded-full transition-colors">
            <ChevronDown size={20} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 w-full h-full flex flex-col min-w-0 overflow-hidden">
        {/* Header Section (Static) */}
        <header className="bg-[var(--tekton-bg-surface)]/95 backdrop-blur-md z-40 pt-4 pb-2 px-4 shadow-[0_4px_20px_rgba(0,0,0,0.02)] shrink-0">
          {/* Top Bar: Mobile Logo + Search + Profile */}
          <div className="flex items-center gap-4 mb-4">
            {/* Mobile Menu Button / Logo */}
            <div className="md:hidden w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0">
              <span className="font-bold">P</span>
            </div>

            {/* Search Bar (Pill) */}
            <div className="flex-1 relative group">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--tekton-text-secondary)] group-focus-within:text-[var(--tekton-text-primary)] transition-colors">
                <Search size={20} strokeWidth={2.5} />
              </div>
              <input
                type="text"
                placeholder="Search for ideas..."
                className="w-full h-12 rounded-[var(--tekton-radius-full)] bg-[var(--tekton-bg-canvas)] pl-12 pr-6 text-lg placeholder:text-neutral-400 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:bg-white border-2 border-transparent focus:border-blue-200 transition-all"
              />
            </div>

            {/* Right Actions (Desktop & Mobile) */}
            <div className="flex items-center gap-2">
              <div className="md:hidden w-10 h-10 rounded-full bg-neutral-200 overflow-hidden">
                <img src="https://github.com/shadcn.png" alt="User" />
              </div>
            </div>
          </div>

          {/* Category Chips (Scrollable) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar pl-1">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2.5 rounded-[16px] font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-black text-white hover:bg-neutral-800'
                    : 'bg-[var(--tekton-bg-canvas)] text-[var(--tekton-text-primary)] hover:bg-neutral-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </header>

        {/* Masonry Grid Content (Scrollable) */}
        <div className="p-4 md:p-6 lg:px-12 flex-1 overflow-y-auto custom-scrollbar">
          <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-4 space-y-4 pb-20">
            {PINS.map((pin) => (
              <div
                key={pin.id}
                className="break-inside-avoid mb-4 group relative rounded-[var(--tekton-radius-xl)] overflow-hidden cursor-zoom-in"
              >
                <img
                  src={pin.image}
                  alt={pin.title}
                  className="w-full object-cover rounded-[var(--tekton-radius-xl)]"
                  style={{ height: 'auto', minHeight: pin.height / 2 }} // approximate ratio aspect
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
                  <div className="flex justify-end">
                    <button className="bg-red-600 text-white px-4 py-2 rounded-[var(--tekton-radius-full)] font-bold shadow-sm hover:bg-red-700 transition-colors">
                      Save
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors">
                      <ArrowUpRight size={16} />
                    </button>
                    <div className="flex gap-2">
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors">
                        <Share2 size={16} />
                      </button>
                      <button className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:bg-white text-black transition-colors">
                        <MoreHorizontal size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[var(--tekton-border-default)] px-6 py-3 flex justify-between items-center z-50">
          <Home size={28} className="text-black" />
          <Search size={28} className="text-neutral-400" />
          <Plus size={28} className="text-neutral-400" />
          <MessageCircle size={28} className="text-neutral-400" />
          <div className="w-7 h-7 rounded-full bg-neutral-200 overflow-hidden">
            <img src="https://github.com/shadcn.png" alt="User" />
          </div>
        </nav>
      </main>
    </div>
  );
}

function SidebarItem({ icon, active }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={`w-14 h-14 rounded-[var(--tekton-radius-full)] flex items-center justify-center transition-all ${
        active
          ? 'bg-black text-white hover:bg-neutral-800 shadow-md'
          : 'text-[var(--tekton-text-secondary)] hover:bg-[var(--tekton-bg-canvas)] hover:text-[var(--tekton-text-primary)]'
      }`}
    >
      {icon}
    </button>
  );
}
