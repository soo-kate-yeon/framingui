'use client';

import { Play, Clock, Star, ChevronRight, Filter } from 'lucide-react';
import Link from 'next/link';

/**
 * Equinox Fitness V2 - Personal Library Dashboard
 * Theme: Elite luxury night gym / Streaming Library
 */
export default function EquinoxDashboardPage() {
  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-12 space-y-12 md:space-y-16 pb-32">
      {/* Hero / Continuing Section */}
      <section className="relative h-[400px] w-full bg-neutral-900 border border-white/5 overflow-hidden flex items-center p-12 group cursor-pointer">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />

        <div className="relative z-10 max-w-xl">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-4 block">
            Continue Watching
          </span>
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
            Hypertrophy
            <br />
            Volume III
          </h2>
          <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 mb-8">
            <span className="flex items-center gap-1">
              <Clock size={12} /> 45 MIN REMAINING
            </span>
            <span className="w-1 h-1 bg-neutral-700" />
            <span>EPISODE 04: THE PULL</span>
          </div>

          <div className="space-y-4">
            <div className="h-[2px] bg-neutral-800 w-full max-w-xs overflow-hidden">
              <div className="h-full bg-white w-[65%]" />
            </div>
            <button className="bg-white text-black h-12 px-10 uppercase tracking-[0.2em] text-xs font-black hover:bg-neutral-200 transition-all flex items-center gap-3 active:scale-95">
              <Play fill="currentColor" size={14} />
              Resume Session
            </button>
          </div>
        </div>
      </section>

      {/* Stats Row - Glass Cards mini */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatMini label="Active Streak" value="18d" />
        <StatMini label="Weekly Target" value="85%" isProgress />
        <StatMini label="Total Hours" value="124h" />
        <StatMini label="Achievements" value="12" />
      </div>

      {/* Library Sections */}
      <div className="space-y-16">
        <LibraryRow
          title="Your Favorites"
          items={[
            {
              title: 'Peak Power',
              author: 'Marcus Thorne',
              image:
                'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000',
              rating: 4.9,
            },
            {
              title: 'Metabolic Flow',
              author: 'Elena Vance',
              image:
                'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1000',
              rating: 4.8,
            },
            {
              title: 'Hypertrophy V2',
              author: 'Julian Cross',
              image:
                'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=1000',
              rating: 5.0,
            },
            {
              title: 'Cognitive Endurance',
              author: 'Sarah Linn',
              image:
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000',
              rating: 4.7,
            },
          ]}
        />

        <LibraryRow
          title="Recommended for You"
          items={[
            {
              title: 'Olympic Movement',
              author: 'K. Sato',
              image:
                'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1000',
              rating: 4.9,
            },
            {
              title: 'Vertical Blast',
              author: 'Air Crew',
              image:
                'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=1000',
              rating: 4.6,
            },
            {
              title: 'Endurance Protocol',
              author: 'Miles',
              image:
                'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=1000',
              rating: 4.8,
            },
            {
              title: 'Barbell Masterclass',
              author: 'Iron Team',
              image:
                'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=1000',
              rating: 5.0,
            },
          ]}
        />
      </div>
    </div>
  );
}

function StatMini({
  label,
  value,
  isProgress = false,
}: {
  label: string;
  value: string;
  isProgress?: boolean;
}) {
  return (
    <div className="bg-neutral-900/50 border-b border-white/5 p-6">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 mb-2 block">
        {label}
      </span>
      <div className="text-2xl font-black tracking-tighter text-white">{value}</div>
      {isProgress && (
        <div className="h-[1px] bg-neutral-800 w-full mt-3">
          <div className="h-full bg-white w-[85%]" />
        </div>
      )}
    </div>
  );
}

function LibraryRow({
  title,
  items,
}: {
  title: string;
  items: { title: string; author: string; image: string; rating: number }[];
}) {
  return (
    <section>
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-xl font-black uppercase tracking-tighter text-white">{title}</h2>
        <div className="flex gap-4">
          <button className="text-neutral-400 hover:text-white transition-colors">
            <Filter size={16} />
          </button>
          <Link
            href="#"
            className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors whitespace-nowrap"
          >
            Explore All <ChevronRight size={12} />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="aspect-video w-full bg-neutral-900 overflow-hidden relative mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 opacity-60 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 text-[8px] font-black tracking-widest text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                PREVIEW
              </div>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xs font-black uppercase tracking-tighter mb-1 text-white group-hover:underline underline-offset-4 decoration-white/30">
                  {item.title}
                </h3>
                <p className="text-[8px] text-neutral-400 uppercase tracking-[0.2em]">
                  {item.author}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Star size={8} fill="white" className="text-white" />
                <span className="text-[10px] font-black text-white">{item.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
