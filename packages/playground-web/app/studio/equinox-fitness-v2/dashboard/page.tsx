"use client";


import { TrendingUp, Flame, Clock, Zap, ChevronRight } from "lucide-react";

/**
 * Equinox Fitness V2 - Workout Stats Dashboard
 * Theme: Elite luxury night gym
 * Design DNA: True Black (#000000) Canvas, 0px Radius, Typography as Hierarchy
 */
export default function EquinoxDashboardPage() {
    return (
        <div className="p-8 max-w-[1600px] mx-auto">

            {/* Hero Section */}
            <div className="mb-12">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2 block">
                    Member Portal
                </span>
                <h1 className="text-5xl font-bold uppercase tracking-tighter text-white leading-none">
                    Your Performance
                </h1>
                <p className="text-sm font-normal text-neutral-400 leading-relaxed mt-3">
                    Track your progress. Push your limits. Achieve excellence.
                </p>
            </div>

            {/* Stats Grid - Glass Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard
                    icon={<Zap size={20} />}
                    label="Workouts This Week"
                    value="12"
                    change="+3"
                    changeLabel="from last week"
                    positive
                />
                <StatCard
                    icon={<Flame size={20} />}
                    label="Calories Burned"
                    value="4,820"
                    change="687"
                    changeLabel="daily average"
                />
                <StatCard
                    icon={<Clock size={20} />}
                    label="Active Minutes"
                    value="540"
                    change="90%"
                    changeLabel="of 600 goal"
                />
                <StatCard
                    icon={<TrendingUp size={20} />}
                    label="Current Streak"
                    value="18"
                    change="days"
                    changeLabel="personal best!"
                    positive
                />
            </div>

            {/* Progress Section */}
            <div className="bg-transparent border border-neutral-800 p-8 mb-8">
                <div className="flex justify-between items-center mb-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                        Weekly Goal Progress
                    </span>
                    <span className="text-white font-bold text-sm">90%</span>
                </div>
                <div className="h-[3px] bg-neutral-800 w-full">
                    <div className="h-full bg-white transition-all duration-500" style={{ width: '90%' }}></div>
                </div>
                <p className="text-sm text-neutral-400 mt-4">
                    1 more workout to hit your weekly goal
                </p>
            </div>

            <div className="grid grid-cols-12 gap-8">

                {/* Weekly Activity Chart */}
                <div className="col-span-8 bg-neutral-900/50 backdrop-blur-md border-b border-white/10 p-8">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                                Weekly Activity
                            </span>
                            <h3 className="text-lg font-bold text-white uppercase tracking-tight">Workout Intensity</h3>
                        </div>
                        <button className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 hover:text-white border-b border-transparent hover:border-white pb-px transition-all">
                            View Details
                        </button>
                    </div>

                    {/* Chart Bars */}
                    <div className="flex items-end gap-3 h-[200px] mb-4">
                        {[
                            { day: 'Mon', value: 85, type: 'strength' },
                            { day: 'Tue', value: 60, type: 'cardio' },
                            { day: 'Wed', value: 0, type: 'rest' },
                            { day: 'Thu', value: 95, type: 'hiit' },
                            { day: 'Fri', value: 70, type: 'strength' },
                            { day: 'Sat', value: 100, type: 'hiit' },
                            { day: 'Sun', value: 45, type: 'cardio' },
                        ].map((item, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                <div
                                    className={`w-full transition-all duration-300 group relative ${
                                        item.value === 0
                                            ? 'bg-neutral-800/50'
                                            : 'bg-white/10 hover:bg-white'
                                    }`}
                                    style={{ height: `${Math.max(item.value, 5)}%` }}
                                >
                                    {item.value > 0 && (
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] py-1 px-2 font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                            {item.value}% INT
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                        <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                    </div>
                </div>

                {/* Recent Workouts */}
                <div className="col-span-4 bg-black border border-neutral-800 p-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block mb-6">
                        Recent Activity
                    </span>

                    <div className="space-y-4">
                        <WorkoutItem
                            type="HIIT Training"
                            duration="45 min"
                            calories="520"
                            time="Today, 7:30 AM"
                        />
                        <WorkoutItem
                            type="Strength Training"
                            duration="60 min"
                            calories="380"
                            time="Yesterday, 6:00 PM"
                        />
                        <WorkoutItem
                            type="Cycling"
                            duration="30 min"
                            calories="280"
                            time="2 days ago"
                        />
                        <WorkoutItem
                            type="Yoga Flow"
                            duration="45 min"
                            calories="150"
                            time="3 days ago"
                        />
                    </div>

                    <button className="w-full mt-6 bg-transparent border border-white/30 text-white h-12 px-8 uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors flex items-center justify-center gap-2">
                        View All
                        <ChevronRight size={14} />
                    </button>
                </div>
            </div>

            {/* CTA Section */}
            <div className="mt-8 flex gap-4">
                <button className="bg-white text-black h-12 px-8 uppercase tracking-widest text-xs font-bold hover:bg-neutral-200 transition-colors">
                    Start Workout
                </button>
                <button className="bg-transparent border border-white/30 text-white h-12 px-8 uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors">
                    Book a Class
                </button>
            </div>
        </div>
    );
}

function StatCard({
    icon,
    label,
    value,
    change,
    changeLabel,
    positive = false
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    change: string;
    changeLabel: string;
    positive?: boolean;
}) {
    return (
        <div className="bg-neutral-900/50 backdrop-blur-md border-b border-white/10 p-6 group hover:bg-neutral-900/80 transition-colors">
            <div className="flex items-center gap-2 mb-4">
                <div className="text-neutral-500 group-hover:text-white transition-colors">
                    {icon}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500">
                    {label}
                </span>
            </div>
            <div className="text-4xl font-bold text-white tracking-tight mb-2">
                {value}
            </div>
            <div className="flex items-center gap-2">
                {positive && (
                    <span className="inline-flex items-center bg-white text-black px-2 py-0.5 text-[10px] uppercase font-bold tracking-wide">
                        {change}
                    </span>
                )}
                {!positive && (
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wide">
                        {change}
                    </span>
                )}
                <span className="text-[10px] text-neutral-500">{changeLabel}</span>
            </div>
        </div>
    );
}

function WorkoutItem({
    type,
    duration,
    calories,
    time
}: {
    type: string;
    duration: string;
    calories: string;
    time: string;
}) {
    return (
        <div className="border-b border-neutral-800 pb-4 last:border-0 last:pb-0 group cursor-pointer">
            <div className="flex justify-between items-start">
                <div>
                    <h4 className="text-sm font-bold text-white uppercase tracking-wide group-hover:text-neutral-200">
                        {type}
                    </h4>
                    <p className="text-[10px] text-neutral-500 mt-1">{time}</p>
                </div>
                <div className="text-right">
                    <p className="text-sm font-bold text-white">{duration}</p>
                    <p className="text-[10px] text-neutral-500">{calories} cal</p>
                </div>
            </div>
        </div>
    );
}
