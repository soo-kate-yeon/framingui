'use client';

/**
 * Account Page
 * Theme: Round Minimal (v2.1)
 */
export default function AccountPage() {
  const canvasColor = 'oklch(0.96 0.01 210)';
  const textColorPrimary = 'oklch(0.10 0.05 210)';

  return (
    <main
      className="min-h-screen py-16 px-6 font-sans"
      style={{ backgroundColor: canvasColor, color: textColorPrimary }}
    >
      <div className="max-w-xl mx-auto flex flex-col gap-10 pb-32">
        {/* Header with Back Button */}
        <header className="px-4 flex items-center gap-6">
          <button
            onClick={() => window.history.back()}
            className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center transform hover:scale-105 transition-all active:scale-95"
          >
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.5}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="text-4xl font-black tracking-tighter" style={{ color: textColorPrimary }}>
            Account
          </h1>
        </header>

        {/* Profile Section */}
        <section className="bg-white rounded-[40px] p-10 shadow-[0_12px_48px_rgba(0,0,0,0.06)] flex flex-col items-center gap-6">
          <div className="w-32 h-32 rounded-full border-8 border-[oklch(0.96_0.01_210)] overflow-hidden shadow-inner">
            <img
              src="https://i.pravatar.cc/150?u=me"
              alt="My Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-black" style={{ color: textColorPrimary }}>
              Soo Yeon
            </h2>
            <p className="text-lg font-semibold opacity-40">@sooyeon_dev</p>
          </div>
          <p className="text-xl font-medium text-center leading-relaxed max-w-sm opacity-70">
            Building beautiful experiences with Tekton. Passionate about minimal UI and round
            corners.
          </p>

          <div className="flex gap-10 pt-4">
            <div className="text-center">
              <p className="text-2xl font-black">128</p>
              <p className="text-sm font-bold opacity-30 uppercase tracking-widest">Posts</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black">12.5k</p>
              <p className="text-sm font-bold opacity-30 uppercase tracking-widest">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-black">450</p>
              <p className="text-sm font-bold opacity-30 uppercase tracking-widest">Following</p>
            </div>
          </div>

          <button className="w-full bg-[oklch(0.50_0.25_220)] text-white rounded-full h-16 text-xl font-black shadow-xl shadow-[oklch(0.50_0.25_220/0.2)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-4">
            Edit Profile
          </button>
        </section>

        {/* Recent Posts Section */}
        <section className="flex flex-col gap-6">
          <h3 className="px-4 text-2xl font-black opacity-40">RECENT POSTS</h3>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square bg-white rounded-[32px] shadow-sm overflow-hidden hover:scale-[1.02] transition-transform cursor-pointer"
              >
                <img
                  src={`https://picsum.photos/seed/${i + 10}/400/400`}
                  alt={`Post ${i}`}
                  className="w-full h-full object-cover opacity-90"
                />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom App Bar (Shared) */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] max-w-md bg-white/80 backdrop-blur-xl rounded-[40px] p-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] flex justify-around items-center border border-white/20">
        <a
          href="/social-feed"
          className="w-14 h-14 rounded-full flex items-center justify-center text-neutral-400 hover:bg-neutral-100 transition-colors"
        >
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
        </a>
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
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-[oklch(0.50_0.25_220)] text-white shadow-lg shadow-[oklch(0.50_0.25_220/0.3)]">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
        </div>
      </nav>
    </main>
  );
}
