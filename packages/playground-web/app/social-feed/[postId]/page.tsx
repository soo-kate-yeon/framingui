'use client';




/**
 * Post Detail Page
 * Theme: Round Minimal (v2.1)
 */
export default function PostDetailPage() {
    const canvasColor = 'oklch(0.96 0.01 210)';
    const textColorPrimary = 'oklch(0.10 0.05 210)';
    const brandColor = 'oklch(0.50_0.25_220)';

    return (
        <main className="min-h-screen py-16 px-6 font-sans" style={{ backgroundColor: canvasColor, color: textColorPrimary }}>
            <div className="max-w-xl mx-auto flex flex-col gap-10 pb-32">

                {/* Header with Back Button */}
                <header className="px-4 flex items-center gap-6">
                    <button
                        onClick={() => window.history.back()}
                        className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center transform hover:scale-105 transition-all active:scale-95"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <h1 className="text-4xl font-black tracking-tighter" style={{ color: textColorPrimary }}>Post</h1>
                </header>

                {/* Main Post Section */}
                <article className="bg-white rounded-[40px] p-10 shadow-[0_12px_48px_rgba(0,0,0,0.06)] flex flex-col gap-8">
                    <div className="flex items-center gap-5">
                        <div className="w-16 h-16 rounded-full bg-neutral-100 overflow-hidden border-4 border-[oklch(0.96_0.01_210)]">
                            <img src="https://i.pravatar.cc/150?u=round1" alt="Alex" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-black" style={{ color: textColorPrimary }}>Alex Doe</h3>
                            <p className="text-base font-semibold opacity-40">Posted 2 hours ago</p>
                        </div>
                    </div>

                    <p className="text-2xl font-medium leading-relaxed" style={{ color: textColorPrimary }}>
                        Exploring the new Tekton design system! The <span style={{ color: brandColor }} className="font-black">#round-minimal</span> theme is so approachable. Chunky padding makes everything feel so tactile and friendly.
                    </p>

                    <div className="h-[400px] rounded-[32px] overflow-hidden bg-neutral-100">
                        <img src="https://picsum.photos/seed/tekton/800/600" alt="Post content" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[oklch(0.96_0.01_210)]">
                        <div className="flex -space-x-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-[oklch(0.96_0.01_210)] flex items-center justify-center overflow-hidden shadow-sm">
                                    <img src={`https://i.pravatar.cc/150?u=${i + 20}`} alt="Liker" />
                                </div>
                            ))}
                        </div>
                        <p className="text-lg font-bold opacity-40">24 Likes • 12 Comments</p>
                    </div>
                </article>

                {/* Comment Section */}
                <section className="flex flex-col gap-6">
                    <h3 className="px-4 text-2xl font-black opacity-40 uppercase tracking-widest">Comments</h3>

                    <div className="flex flex-col gap-6">
                        {/* New Comment Interface */}
                        <div className="bg-white rounded-[32px] p-6 shadow-sm flex flex-col gap-4">
                            <textarea
                                className="w-full bg-[oklch(0.96_0.01_210)] rounded-[24px] p-5 text-lg font-medium border-none placeholder:text-neutral-400 focus:ring-4 focus:ring-[oklch(0.50_0.25_220/0.1)] transition-all outline-none resize-none min-h-[100px]"
                                placeholder="Add a comment..."
                            />
                            <div className="flex justify-end">
                                <button className="bg-[oklch(0.50_0.25_220)] text-white rounded-full h-12 px-8 font-black shadow-lg shadow-[oklch(0.50_0.25_220/0.2)] hover:scale-105 active:scale-95 transition-all">
                                    Post Comment
                                </button>
                            </div>
                        </div>

                        {/* Existing Comments */}
                        <div className="flex flex-col gap-4">
                            {[1, 2].map(i => (
                                <div key={i} className="flex gap-4 px-4 py-2">
                                    <div className="w-12 h-12 rounded-full bg-white shadow-sm overflow-hidden flex-shrink-0">
                                        <img src={`https://i.pravatar.cc/150?u=user${i + 5}`} alt="User" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold">User {i}</span>
                                            <span className="text-xs opacity-30 font-black">1H AGO</span>
                                        </div>
                                        <p className="text-lg font-medium opacity-70 leading-snug">
                                            {i === 1 ? "Absolutely love the radius on these cards! Feels so modern." : "Great post! Can't wait to see more from you."}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
