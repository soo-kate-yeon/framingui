"use client";


import {
    Navigation,
    Clock,
    Search,
    Star,
    ChevronRight,
    User,
    ArrowRight
} from "lucide-react";

/**
 * Round Minimal Landing Page (Revised)
 * Theme: Waymo-like Mobility App
 * Aesthetic: Cool Gray Background, White Surface, Super Rounds
 */
export default function RoundMinimalDemo() {
    return (
        <div className="min-h-screen bg-[#F3F5F7] text-neutral-900 font-sans selection:bg-blue-100">

            {/* Navigation (Floating Pill) */}
            <nav className="fixed top-6 left-0 right-0 z-50 px-6 flex justify-center">
                <div className="bg-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] rounded-full pl-6 pr-2 py-2 flex items-center gap-12 max-w-lg w-full justify-between">
                    <div className="font-bold text-xl tracking-tight text-neutral-900">
                        Waygo
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center hover:bg-neutral-200 transition-colors">
                            <Search size={20} className="text-neutral-600" />
                        </button>
                        <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg shadow-blue-600/20">
                            <User size={20} />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <main className="pt-40 pb-20 px-6 max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-neutral-900 mb-6 leading-[1.1]">
                        Your ride is<br />
                        <span className="text-blue-600">here in 2 min.</span>
                    </h1>
                    <p className="text-xl text-neutral-500 max-w-2xl mx-auto mb-10 font-medium">
                        Safe, autonomous, and designed for comfort.
                        Experience the future of mobility with Round Minimal.
                    </p>

                    {/* Search Input (Chunky) */}
                    <div className="max-w-xl mx-auto relative group">
                        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-900">
                            <Search size={24} strokeWidth={2.5} />
                        </div>
                        <input
                            type="text"
                            placeholder="Where to?"
                            className="w-full bg-white h-20 pl-16 pr-6 rounded-[32px] text-2xl font-bold shadow-[0_4px_24px_rgba(0,0,0,0.06)] border-none outline-none focus:ring-4 focus:ring-blue-500/10 transition-all placeholder:text-neutral-300"
                        />
                    </div>
                </div>

                {/* Feature Grid (Square Minimalism Structure, Round Aesthetic) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">

                    {/* Card 1: Map/Location */}
                    <div className="bg-white rounded-[48px] p-8 shadow-sm h-[500px] relative overflow-hidden flex flex-col justify-end group">
                        {/* Map Background Simulation */}
                        <div className="absolute inset-0 bg-[#E5E9F0] opacity-50">
                            <div className="absolute top-1/4 left-1/4 w-32 h-64 bg-white -rotate-12" />
                            <div className="absolute top-1/3 right-1/4 w-96 h-32 bg-white -rotate-12" />
                        </div>

                        {/* UI Overlay */}
                        <div className="relative z-10 bg-white/80 backdrop-blur-md rounded-[32px] p-6 shadow-lg">
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">Pickup</div>
                                    <div className="text-lg font-bold text-neutral-900">Mezze and Mooore</div>
                                </div>
                                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                    <Navigation size={24} fill="currentColor" />
                                </div>
                            </div>
                            <button className="w-full bg-blue-600 text-white h-14 rounded-[24px] font-bold text-lg shadow-lg shadow-blue-600/20 active:scale-95 transition-transform">
                                Confirm Pickup
                            </button>
                        </div>
                    </div>

                    {/* Card 2: Profile/Menu */}
                    <div className="bg-white rounded-[48px] p-10 shadow-sm flex flex-col h-[500px]">
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-20 h-20 bg-neutral-200 rounded-full" />
                            <div>
                                <div className="text-2xl font-bold text-neutral-900">Sam Lee</div>
                                <div className="flex items-center gap-2 text-neutral-500 font-medium">
                                    <Star size={16} fill="currentColor" className="text-yellow-400" />
                                    5.0 Rating
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3 flex-1">
                            {['History', 'Wallet', 'Offers & promotions', 'Edit account'].map((item) => (
                                <button key={item} className="w-full flex items-center justify-between p-4 hover:bg-neutral-50 rounded-[20px] transition-colors group">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center text-neutral-600 group-hover:bg-white group-hover:shadow-sm transition-all">
                                            <Clock size={20} />
                                        </div>
                                        <span className="font-bold text-lg text-neutral-800">{item}</span>
                                    </div>
                                    <ChevronRight size={20} className="text-neutral-300" />
                                </button>
                            ))}
                        </div>

                        <div className="mt-8 pt-8 border-t border-neutral-100 flex justify-between text-neutral-400 font-medium">
                            <span>v4.0.2</span>
                            <span>Sign out</span>
                        </div>
                    </div>

                    {/* Card 3: Support/Chat */}
                    <div className="md:col-span-2 bg-[#1A1C24] rounded-[48px] p-12 text-white relative overflow-hidden">
                        <div className="max-w-lg relative z-10">
                            <h2 className="text-4xl font-bold mb-6">How can we help?</h2>
                            <div className="space-y-4">
                                {['Chat', 'Email', 'Call'].map((action) => (
                                    <button key={action} className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-[28px] p-6 flex items-center justify-between transition-all group">
                                        <div className="flex items-center gap-4">
                                            <div className="font-bold text-xl">{action}</div>
                                        </div>
                                        <div className="w-10 h-10 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                                            <ArrowRight size={20} />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute right-[-50px] top-[-50px] w-96 h-96 bg-blue-600 rounded-full blur-[100px] opacity-30" />
                    </div>

                </div>

            </main>
        </div>
    );
}
