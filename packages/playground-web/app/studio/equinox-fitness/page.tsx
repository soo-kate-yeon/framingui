"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Dumbbell, Zap, Trophy } from "lucide-react";

/**
 * Equinox Fitness V2 Theme Landing Page
 * Theme: Elite luxury night gym
 * Design DNA: True Black (#000000) Canvas, 0px Radius, Typography as Hierarchy
 */
export default function EquinoxFitnessPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col justify-center px-12 relative">
                <div className="max-w-4xl">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4 block">
                        Equinox Fitness V2
                    </span>
                    <h1 className="text-7xl font-bold uppercase tracking-tighter leading-none mb-6">
                        Elite<br />Performance<br />Design
                    </h1>
                    <p className="text-lg text-neutral-400 max-w-xl mb-12 leading-relaxed">
                        A premium fitness dashboard experience. True Black canvas, razor-sharp geometry,
                        and typography that commands attention. Built for those who demand excellence.
                    </p>

                    <div className="flex gap-4">
                        <Link
                            href="/studio/equinox-fitness/dashboard"
                            className="bg-white text-black h-14 px-10 uppercase tracking-widest text-xs font-bold hover:bg-neutral-200 transition-colors inline-flex items-center gap-3"
                        >
                            Enter Dashboard
                            <ArrowRight size={16} />
                        </Link>
                        <Link
                            href="/studio/equinox-fitness/docs"
                            className="bg-transparent border border-white/30 text-white h-14 px-10 uppercase tracking-widest text-xs font-bold hover:bg-white/10 transition-colors inline-flex items-center"
                        >
                            Documentation
                        </Link>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="absolute right-12 top-1/2 -translate-y-1/2 opacity-5">
                    <div className="text-[400px] font-bold leading-none tracking-tighter">
                        EQ
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 px-12 border-t border-neutral-800">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-8 block">
                    Design Principles
                </span>

                <div className="grid grid-cols-3 gap-12">
                    <FeatureCard
                        icon={<div className="w-3 h-3 bg-white" />}
                        title="True Black Canvas"
                        description="Pure #000000 background creates maximum contrast and visual impact. Every element commands attention."
                    />
                    <FeatureCard
                        icon={<div className="w-12 h-[2px] bg-white" />}
                        title="0px Radius"
                        description="Absolute precision with zero border radius. Sharp edges convey power, discipline, and elite aesthetics."
                    />
                    <FeatureCard
                        icon={<div className="text-2xl font-bold">Aa</div>}
                        title="Typography Hierarchy"
                        description="Bold uppercase headlines, tight tracking, and deliberate spacing create unmistakable visual hierarchy."
                    />
                </div>
            </section>

            {/* Stats Preview */}
            <section className="py-24 px-12 border-t border-neutral-800">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 mb-4 block">
                            Dashboard Preview
                        </span>
                        <h2 className="text-4xl font-bold uppercase tracking-tighter">
                            Track Excellence
                        </h2>
                    </div>
                    <Link
                        href="/studio/equinox-fitness/dashboard"
                        className="text-[10px] uppercase font-bold tracking-widest text-neutral-500 hover:text-white border-b border-transparent hover:border-white pb-px transition-all flex items-center gap-2"
                    >
                        Open Dashboard
                        <ArrowRight size={12} />
                    </Link>
                </div>

                <div className="grid grid-cols-4 gap-6">
                    <PreviewCard icon={<Zap size={24} />} label="Workouts" value="12" />
                    <PreviewCard icon={<Dumbbell size={24} />} label="Calories" value="4.8K" />
                    <PreviewCard icon={<Trophy size={24} />} label="Streak" value="18d" />
                    <PreviewCard label="Progress" value="90%" isProgress />
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 px-12 border-t border-neutral-800">
                <div className="flex justify-between items-center">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-500">
                        Tekton Design System — Equinox Fitness V2 Theme
                    </div>
                    <div className="flex gap-6">
                        <span className="text-[10px] uppercase tracking-widest text-neutral-600">
                            Schema v2.1
                        </span>
                        <span className="text-[10px] uppercase tracking-widest text-neutral-600">
                            Brand Tone: Elite
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

function FeatureCard({
    icon,
    title,
    description
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
}) {
    return (
        <div className="group">
            <div className="h-16 flex items-center mb-6 text-neutral-500 group-hover:text-white transition-colors">
                {icon}
            </div>
            <h3 className="text-lg font-bold uppercase tracking-tight mb-3">{title}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">{description}</p>
        </div>
    );
}

function PreviewCard({
    icon,
    label,
    value,
    isProgress = false
}: {
    icon?: React.ReactNode;
    label: string;
    value: string;
    isProgress?: boolean;
}) {
    return (
        <div className="bg-neutral-900/50 backdrop-blur-md border-b border-white/10 p-6 hover:bg-neutral-900/80 transition-colors">
            {icon && (
                <div className="text-neutral-500 mb-4">
                    {icon}
                </div>
            )}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-500 block mb-2">
                {label}
            </span>
            {isProgress ? (
                <div>
                    <div className="text-3xl font-bold tracking-tight mb-2">{value}</div>
                    <div className="h-[2px] bg-neutral-800 w-full">
                        <div className="h-full bg-white" style={{ width: value }}></div>
                    </div>
                </div>
            ) : (
                <div className="text-3xl font-bold tracking-tight">{value}</div>
            )}
        </div>
    );
}
