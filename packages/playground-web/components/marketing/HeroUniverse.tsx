'use client';

import { useRef } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FloatingAsset } from './FloatingAsset';
import { MockSwitch, MockAvatar, MockCalendar, MockDropdown, MockTabs } from './MockComponents';

export const HeroUniverse = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mouseX.set(e.clientX - rect.left - rect.width / 2);
      mouseY.set(e.clientY - rect.top - rect.height / 2);
    }
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Parallax transforms for different layers
  const x1 = useTransform(smoothMouseX, (v) => v / 15);
  const y1 = useTransform(smoothMouseY, (v) => v / 15);
  const x2 = useTransform(smoothMouseX, (v) => v / 30);
  const y2 = useTransform(smoothMouseY, (v) => v / 30);
  const x3 = useTransform(smoothMouseX, (v) => v / 50);
  const y3 = useTransform(smoothMouseY, (v) => v / 50);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full aspect-[4/5] md:aspect-[16/7] overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50/20 rounded-3xl border border-slate-200 flex items-center justify-center p-4 md:p-8"
    >
      {/* Background Aura Layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-100/30 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-purple-100/20 blur-[80px] md:blur-[120px] rounded-full" />
      </div>

      {/* Grid Lines Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Central Title */}
      <div className="relative z-20 text-center pointer-events-none px-4">
        <motion.h1
          className="text-4xl md:text-8xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-slate-900 via-slate-800 to-slate-600 leading-tight md:leading-tight"
          style={{ x: x3, y: y3 }}
        >
          Tekton Agentic
          <br className="md:block" />
          Design System
        </motion.h1>
      </div>

      {/* Floating Elements - Layer 1 (Active/High Depth) */}
      <motion.div style={{ x: x1, y: y1 }} className="absolute inset-0 pointer-events-none">
        <FloatingAsset
          className="absolute top-[5%] left-[5%] md:top-[8%] md:left-[5%] scale-75 md:scale-100"
          range={15}
          delay={0.2}
          rotateRange={2}
        >
          <MockDropdown />
        </FloatingAsset>

        <FloatingAsset
          className="absolute bottom-[20%] right-[5%] md:bottom-[10%] md:right-[3%] scale-75 md:scale-100"
          range={20}
          delay={0.5}
          rotateRange={-3}
        >
          <MockCalendar />
        </FloatingAsset>

        {/* Status Badge - Fixed for Mobile */}
        <FloatingAsset
          className="absolute top-[18%] right-[5%] md:top-[12%] md:right-[10%] scale-90 md:scale-100"
          range={10}
          delay={0.8}
        >
          <div className="px-3 py-1.5 md:px-5 md:py-2.5 bg-slate-900 text-white rounded-full shadow-2xl text-[10px] md:text-xs font-semibold flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Active
          </div>
        </FloatingAsset>

        <FloatingAsset
          className="absolute bottom-[8%] left-[10%] hidden md:block"
          range={12}
          delay={1.2}
        >
          <MockTabs />
        </FloatingAsset>
      </motion.div>

      {/* Floating Elements - Layer 2 (Utility/Medium Depth) */}
      <motion.div style={{ x: x2, y: y2 }} className="absolute inset-0 pointer-events-none">
        <FloatingAsset
          className="absolute top-[35%] left-[8%] hidden md:block"
          range={8}
          delay={1.5}
          rotateRange={5}
        >
          <MockSwitch />
        </FloatingAsset>

        <FloatingAsset
          className="absolute top-[22%] left-[40%] md:top-[20%] md:right-[35%] scale-75 md:scale-100"
          range={10}
          delay={0.1}
        >
          <MockAvatar fallback="TK" />
        </FloatingAsset>

        <FloatingAsset
          className="absolute bottom-[35%] right-[12%] hidden md:block"
          range={15}
          delay={2}
          rotateRange={-5}
        >
          <div className="w-8 h-8 rounded-full bg-white shadow-xl flex items-center justify-center p-2 border border-slate-100">
            <div className="w-full h-full bg-slate-900 rounded-sm" />
          </div>
        </FloatingAsset>

        {/* Floating status badge for mobile */}
        <FloatingAsset
          className="absolute bottom-[10%] left-[20%] md:top-[45%] md:left-[80%] scale-90 md:scale-100"
          range={10}
          delay={2.5}
        >
          <div className="px-3 py-1 bg-white/50 backdrop-blur-sm border border-slate-200/50 rounded-full shadow-lg flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <div className="w-10 md:w-12 h-1 bg-slate-200 rounded-full" />
          </div>
        </FloatingAsset>
      </motion.div>

      {/* Decorative Orbs & Tokens (Deep Layer) */}
      <motion.div
        style={{ x: x3, y: y3 }}
        className="absolute inset-0 pointer-events-none opacity-20"
      >
        <div className="absolute top-[20%] left-[45%] w-4 h-4 rounded-full border border-slate-300" />
        <div className="absolute bottom-[25%] left-[5%] w-6 h-6 rounded-full border border-slate-200 hidden md:block" />
        <div className="absolute top-[60%] right-[30%] w-3 h-3 rounded-full bg-slate-200 hidden md:block" />
      </motion.div>
    </div>
  );
};
