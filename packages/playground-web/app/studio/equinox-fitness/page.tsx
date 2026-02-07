'use client';

import Link from 'next/link';
import { Play, Info, ChevronRight, Star } from 'lucide-react';

/**
 * Equinox Fitness V2 - MasterClass Inspired Landing Page
 * Theme: Elite luxury night gym / Media Streaming
 * Design DNA: True Black (#000000), 0px Radius, Immersive Media
 */
export default function EquinoxFitnessLanding() {
  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black scroll-smooth">
      {/* Immersive Hero Section */}
      <section className="relative h-screen w-full flex flex-col justify-end pb-24 px-8 md:px-16 overflow-hidden">
        {/* Background "Video" Placeholder / Image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10" />
          {/* Placeholder for high-end fitness video/imagery */}
          <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale opacity-50 scale-105 animate-pulse-slow" />
        </div>

        <div className="relative z-20 max-w-4xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-white text-black px-2 py-0.5 text-[10px] font-black uppercase tracking-tighter">
              Original Series
            </span>
            <span className="text-neutral-400 text-[10px] uppercase tracking-widest font-bold">
              Equinox MasterSeries
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6">
            The Art of
            <br />
            Elite Performance
          </h1>

          <p className="text-lg md:text-xl text-neutral-200 max-w-2xl mb-10 leading-relaxed font-light">
            Join the world's most elite trainers as they reveal the discipline, technique, and
            mindset required to reach the absolute pinnacle of human potential.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/studio/equinox-fitness/dashboard"
              className="bg-white text-black h-12 md:h-14 px-8 md:px-12 uppercase tracking-[0.2em] text-[10px] md:text-xs font-black hover:bg-neutral-200 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              <Play fill="currentColor" size={16} />
              Start Training
            </Link>
            <button className="bg-neutral-900/80 backdrop-blur-md border border-white/20 text-white h-12 md:h-14 px-8 md:px-12 uppercase tracking-[0.2em] text-[10px] md:text-xs font-black hover:bg-white/10 transition-all flex items-center justify-center gap-3 active:scale-95">
              <Info size={16} />
              Preview Trailer
            </button>
          </div>
        </div>

        {/* Vertical Indicator */}
        <div className="absolute right-16 bottom-24 hidden lg:flex flex-col items-center gap-4">
          <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent" />
          <span className="[writing-mode:vertical-lr] text-[10px] uppercase tracking-[0.3em] font-bold text-neutral-500">
            Scroll to Explore
          </span>
        </div>
      </section>

      {/* Content Discovery Rows */}
      <main className="relative z-20 -mt-12 space-y-20 pb-32">
        <ContentRow
          title="Legendary Instructors"
          items={[
            {
              title: 'Peak Power',
              instructor: 'Marcus Thorne',
              image:
                'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1000',
            },
            {
              title: 'Metabolic Flow',
              instructor: 'Elena Vance',
              image:
                'https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&q=80&w=1000',
            },
            {
              title: 'Hypertrophy V2',
              instructor: 'Julian Cross',
              image:
                'https://images.unsplash.com/photo-1534367598536-19363914a1e9?auto=format&fit=crop&q=80&w=1000',
            },
            {
              title: 'Cognitive Endurance',
              instructor: 'Sarah Linn',
              image:
                'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&q=80&w=1000',
            },
          ]}
        />

        <ContentRow
          title="Strength & Conditioning"
          subtitle="Push beyond the threshold of ordinary."
          items={[
            {
              title: 'Barbell Masterclass',
              instructor: 'Iron Team',
              image:
                'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=1000',
            },
            {
              title: 'Olympic Lifting',
              instructor: 'K. Sato',
              image:
                'https://images.unsplash.com/photo-1599058917232-d750c1859d7c?auto=format&fit=crop&q=80&w=1000',
            },
            {
              title: 'The Vertical Jump',
              instructor: 'Air Crew',
              image:
                'https://images.unsplash.com/photo-1434608519344-49d77a699e1d?auto=format&fit=crop&q=80&w=1000',
            },
            {
              title: 'Endurance Protocol',
              instructor: 'Miles',
              image:
                'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?auto=format&fit=crop&q=80&w=1000',
            },
          ]}
        />

        {/* Featured "Ad" section */}
        <section className="px-4 md:px-16">
          <div className="bg-neutral-900 min-h-[400px] w-full relative flex items-center p-8 md:p-12 overflow-hidden border border-white/5">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-30 mix-blend-overlay" />
            <div className="relative z-10 max-w-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-4 block">
                Limited Enrollment
              </span>
              <h2 className="text-2xl md:text-4xl font-bold uppercase tracking-tighter mb-4 italic">
                The 10-Week Transformation
              </h2>
              <p className="text-neutral-300 text-xs md:text-sm mb-8 leading-relaxed">
                A scientific approach to body composition. No shortcuts. Just data-driven
                programming for those ready to commit to radical change.
              </p>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black h-10 px-8 hover:bg-neutral-200 transition-colors">
                Apply Now
              </button>
            </div>
          </div>
        </section>

        <ContentRow
          title="Recovery & Wellness"
          items={[
            {
              title: 'Sleep Sanctuary',
              instructor: 'Dr. Aris',
              image:
                'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=2040&auto=format&fit=crop',
            },
            {
              title: 'Dynamic Mobility',
              instructor: 'L. Reed',
              image:
                'https://images.unsplash.com/photo-1552196563-55cd4e45efb3?q=80&w=1926&auto=format&fit=crop',
            },
            {
              title: 'Breathwork Mastery',
              instructor: 'Zen Center',
              image:
                'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1999&auto=format&fit=crop',
            },
            {
              title: 'Nutrition for Pros',
              instructor: 'M. Galt',
              image:
                'https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=2064&auto=format&fit=crop',
            },
          ]}
        />
      </main>

      {/* Footer */}
      <footer className="py-24 px-8 md:px-16 border-t border-neutral-900 bg-black">
        <div className="flex flex-col md:flex-row justify-between gap-12">
          <div className="max-w-xs">
            <div className="text-2xl font-black tracking-tighter mb-6">EQUINOX</div>
            <p className="text-neutral-400 text-[10px] leading-relaxed uppercase tracking-wider">
              Built for those who demand excellence. Proprietary training methodologies for the
              elite mover.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
            <FooterCol title="Platform" links={['Discovery', 'Dashboard', 'Series', 'Trainers']} />
            <FooterCol title="Studio" links={['About Tekton', 'MCP Integration', 'Design DNA']} />
            <FooterCol title="Legal" links={['Privacy', 'Terms', 'Support']} />
          </div>
        </div>
        <div className="mt-20 md:mt-24 pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em] text-center md:text-left">
          <span>© 2026 Tekton Studio x Equinox</span>
          <span className="flex gap-4">
            <Link
              href="/studio/equinox-fitness/docs"
              className="hover:text-white transition-colors"
            >
              Docs
            </Link>
            <span>Schema v2.2</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

function ContentRow({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: { title: string; instructor: string; image: string }[];
}) {
  return (
    <section className="px-4 md:px-16">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tighter mb-1 text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-neutral-400 text-[10px] md:text-xs uppercase tracking-widest">
              {subtitle}
            </p>
          )}
        </div>
        <Link
          href="#"
          className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-white flex items-center gap-1 transition-colors whitespace-nowrap"
        >
          View All <ChevronRight size={12} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {items.map((item, idx) => (
          <div key={idx} className="group cursor-pointer">
            <div className="aspect-[16/9] w-full bg-neutral-900 overflow-hidden relative mb-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0 opacity-70 group-hover:opacity-100"
              />
              <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-gradient-to-t from-black to-transparent">
                <button className="w-full bg-white text-black py-2 text-[10px] font-black uppercase tracking-widest">
                  Quick Preview
                </button>
              </div>
              <div className="absolute top-2 right-2 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={8} fill="white" className="text-white opacity-40" />
                ))}
              </div>
            </div>
            <h3 className="text-sm font-bold uppercase tracking-tight mb-1 group-hover:text-white transition-colors">
              {item.title}
            </h3>
            <p className="text-[10px] text-neutral-400 uppercase tracking-widest leading-none">
              {item.instructor}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">
        {title}
      </h4>
      <div className="flex flex-col gap-2">
        {links.map((link) => (
          <Link
            key={link}
            href="#"
            className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 hover:text-white transition-colors"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
}
