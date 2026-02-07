"use client";


import { TrendingUp } from "lucide-react";

/**
 * [VERIFICATION] Screen Template + Theme Recipe Integration
 * Page: Overview
 */
export default function SquareDashboardPage() {
    return (
        <div className="p-12 max-w-[1600px] mx-auto">
            {/* [Template] Section: Hero / Stats */}
            <header className="mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-500 mb-4 block">
                    Tekton Studio
                </span>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900 mb-6">
                    OVERVIEW
                </h1>
                <p className="text-sm md:text-base text-neutral-500 max-w-2xl leading-relaxed">
                    Welcome back, here is what's happening today
                </p>
            </header>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Revenue" value="$48,290" trend="+12.5%" />
                <StatCard title="Active Users" value="2,490" trend="+5.2%" />
                <StatCard title="Bounce Rate" value="12%" trend="-2.1%" />
                <StatCard title="Avg. Session" value="4m 32s" trend="+0.8%" />
            </div>

            <div className="grid grid-cols-12 gap-8">
                {/* [Template] Main Chart Area (represented by glass card) */}
                <div className="col-span-8 bg-white/60 backdrop-blur-xl border border-white/40 p-8 h-[400px] flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="text-lg font-semibold tracking-tight">Revenue Trend</h3>
                            <p className="text-sm text-neutral-500 mt-1">Monthly recurring revenue</p>
                        </div>
                        <button className="text-xs uppercase font-bold tracking-widest text-neutral-400 hover:text-neutral-900 border-b border-transparent hover:border-neutral-900 pb-px transition-all">
                            View Report
                        </button>
                    </div>
                    <div className="flex-1 flex items-end gap-2 mt-8 pb-4 border-b border-neutral-200/50">
                        {/* Fake Chart Bars - Architectural Look */}
                        {[40, 60, 45, 70, 50, 80, 65, 85, 90, 75, 95, 100].map((h, i) => (
                            <div key={i} className="flex-1 bg-neutral-900/5 hover:bg-neutral-900/90 transition-colors relative group" style={{ height: `${h}%` }}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    ${h}k
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-neutral-400 mt-4 font-mono uppercase">
                        <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
                        <span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
                    </div>
                </div>

                {/* [Template] Side Panel / Activity */}
                <div className="col-span-4 space-y-6">
                    <div className="bg-white border border-neutral-200 p-6 h-full">
                        <h3 className="text-sm font-bold uppercase tracking-widest mb-6">Recent Activity</h3>
                        <div className="space-y-6">
                            <ActivityItem user="Sarah M." action="uploaded a file" time="2m ago" />
                            <ActivityItem user="Alex K." action="commented on project" time="15m ago" />
                            <ActivityItem user="James R." action="completed task" time="1h ago" />
                            <ActivityItem user="Mira L." action="joined the team" time="3h ago" />
                            <ActivityItem user="David B." action="updated settings" time="5h ago" />
                        </div>
                        <button className="w-full mt-8 py-3 border border-neutral-200 text-xs font-bold uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors">
                            View All Activity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, trend }: { title: string, value: string, trend: string }) {
    const isPositive = trend.startsWith('+');
    return (
        <div className="bg-white p-6 border-l-2 border-transparent hover:border-neutral-900 transition-all group cursor-default">
            <div className="text-xs font-bold uppercase tracking-widest text-neutral-400 mb-2 group-hover:text-neutral-600">{title}</div>
            <div className="flex justify-between items-end">
                <div className="text-3xl font-bold tracking-tight">{value}</div>
                <div className={`text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'} flex items-center gap-1`}>
                    {isPositive ? <TrendingUp size={12} /> : <TrendingUp size={12} className="rotate-180" />}
                    {trend}
                </div>
            </div>
        </div>
    )
}

function ActivityItem({ user, action, time }: { user: string, action: string, time: string }) {
    return (
        <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-600">
                {user.charAt(0)}
            </div>
            <div>
                <p className="text-sm text-neutral-900">
                    <span className="font-semibold">{user}</span> {action}
                </p>
                <p className="text-xs text-neutral-400 mt-0.5">{time}</p>
            </div>
        </div>
    )
}
