'use client';

/**
 * Social Feed Interface
 * Theme: Pebble (v2.1)
 * Principles: Surface over Border, Maximum Radius, Chunky Padding
 */
export default function SocialFeedPage() {
  const brandColor = 'oklch(0.50 0.25 220)';
  const canvasColor = 'oklch(0.96 0.01 210)'; // neutral.cool.50
  const textColorPrimary = 'oklch(0.10 0.05 210)'; // neutral.cool.900

  return (
    <main
      className={`min-h-screen py-16 px-6 font-sans`}
      style={{ backgroundColor: canvasColor, color: textColorPrimary }}
    >
      <div className="max-w-xl mx-auto flex flex-col gap-10">
        {/* Header */}
        <header className="px-4 flex justify-between items-center">
          <div>
            <h1
              className="text-5xl font-black tracking-tighter mb-2"
              style={{ color: textColorPrimary }}
            >
              Feed
            </h1>
            <p className="text-lg font-medium opacity-60">Pebble Exploration</p>
          </div>
          <a
            href="/social-feed/account"
            className="w-16 h-16 rounded-full bg-white shadow-lg overflow-hidden flex items-center justify-center transform hover:scale-110 transition-transform active:scale-95 border-4 border-white"
          >
            <img
              src="https://i.pravatar.cc/150?u=me"
              alt="My Profile"
              className="w-full h-full object-cover"
            />
          </a>
        </header>

        {/* Composer - Recipe: input.default + button.primary */}
        <section className="bg-white rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col gap-6">
          <textarea
            className="w-full bg-[oklch(0.96_0.01_210)] rounded-[24px] min-h-[120px] p-6 text-xl border-none placeholder:text-neutral-400 focus:ring-4 focus:ring-[oklch(0.50_0.25_220/0.1)] transition-all outline-none resize-none font-medium"
            placeholder="What's on your mind?"
            style={{ color: textColorPrimary }}
          />
          <div className="flex justify-end">
            <button className="bg-[oklch(0.50_0.25_220)] text-white rounded-full h-14 px-10 text-lg font-bold shadow-lg shadow-[oklch(0.50_0.25_220/0.2)] hover:scale-105 active:scale-95 transition-all">
              Post
            </button>
          </div>
        </section>

        {/* Feed - Recipe: card.default */}
        <section className="flex flex-col gap-8">
          <div
            onClick={() => (window.location.href = '/social-feed/post-1')}
            className="bg-white rounded-[32px] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex flex-col gap-6 cursor-pointer hover:shadow-[0_12px_48px_rgba(0,0,0,0.06)] transition-all transform hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[oklch(0.50_0.25_220/0.1)] flex items-center justify-center overflow-hidden">
                <img
                  src="https://i.pravatar.cc/150?u=round1"
                  alt="Alex"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: textColorPrimary }}>
                  Alex Doe
                </h3>
                <p className="text-sm font-semibold opacity-40">2 hours ago</p>
              </div>
            </div>

            <p className="text-xl font-medium leading-relaxed" style={{ color: textColorPrimary }}>
              Exploring the new Tekton design system! The{' '}
              <span style={{ color: brandColor }}>#pebble</span> theme is so approachable. Chunky
              padding makes everything feel so tactile.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="bg-[oklch(0.96_0.01_210)] text-[oklch(0.50_0.25_220)] rounded-full h-12 px-6 font-bold hover:bg-[oklch(0.93_0.02_210)] transition-colors">
                Joyful Like
              </button>
              <button className="bg-transparent text-neutral-400 rounded-full h-12 px-6 font-bold hover:bg-[oklch(0.96_0.01_210)] transition-colors">
                Share
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[40px] p-10 shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col gap-6 transform hover:-translate-y-1 transition-transform cursor-pointer border border-[oklch(0.50_0.25_220/0.05)]">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-[oklch(0.50_0.25_220/0.1)] flex items-center justify-center overflow-hidden">
                <img
                  src="https://i.pravatar.cc/150?u=round2"
                  alt="Jane"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: textColorPrimary }}>
                  Jane Smith
                </h3>
                <p className="text-sm font-semibold opacity-40">5 hours ago</p>
              </div>
            </div>

            <p className="text-xl font-medium leading-relaxed" style={{ color: textColorPrimary }}>
              Maximum radius everywhere! Super-ellipse is the way to go. Friendly and modern
              atmosphere achieved effortlessly.
            </p>

            <div className="flex gap-4 pt-4">
              <button className="bg-[oklch(0.50_0.25_220)] text-white rounded-full h-12 px-8 font-bold shadow-md transition-all">
                Love it
              </button>
            </div>
          </div>
        </section>

        {/* Trending */}
        <section className="bg-[oklch(0.93_0.02_210)] rounded-[32px] p-8">
          <h3 className="text-xl font-black mb-6" style={{ color: textColorPrimary }}>
            JOYFUL TOPICS
          </h3>
          <div className="flex flex-wrap gap-3">
            {['#joyful_clarity', '#round_minimal', '#tekton', '#oklch'].map((tag) => (
              <span
                key={tag}
                className="bg-white text-[oklch(0.50_0.25_220)] px-6 py-3 rounded-full font-bold shadow-sm cursor-pointer hover:bg-[oklch(0.50_0.25_220)] hover:text-white transition-all"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom App Bar */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md bg-white/80 backdrop-blur-xl rounded-[40px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex justify-around items-center border border-white/20">
        <button className="w-14 h-14 rounded-full flex items-center justify-center bg-[oklch(0.50_0.25_220)] text-white shadow-lg shadow-[oklch(0.50_0.25_220/0.3)]">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </button>
        <button className="w-14 h-14 rounded-full flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
        <button className="w-14 h-14 rounded-full flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-colors">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
        </button>
        <a
          href="/social-feed/account"
          className="w-14 h-14 rounded-full flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-colors"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </a>
      </nav>
    </main>
  );
}
