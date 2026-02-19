'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Constraint Reliability Asset (No-Hallucination) ---
export const ConstraintReliabilityAsset = () => {
  return (
    <div className="relative w-full aspect-square bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden group">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Mock Screen with Components */}
      <div className="relative w-4/5 h-4/5 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden p-4 flex flex-col gap-4">
        {/* Mock Header */}
        <div className="h-6 w-full bg-slate-100 rounded-md animate-pulse" />

        {/* Mock Content */}
        <div className="flex gap-4">
          <div className="h-20 w-1/3 bg-slate-50 border border-slate-100 rounded-md" />
          <div className="flex-1 flex flex-col gap-2">
            <div className="h-4 w-full bg-slate-50 border border-slate-100 rounded-sm" />
            <div className="h-4 w-3/4 bg-slate-50 border border-slate-100 rounded-sm" />
            <div className="h-4 w-1/2 bg-slate-50 border border-slate-100 rounded-sm" />
          </div>
        </div>

        {/* Scan Line (Laser) */}
        <motion.div
          className="absolute left-0 right-0 h-1 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.8)] z-20"
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />

        {/* Diagnostic Overlay (Appears on scan) */}
        <motion.div
          className="absolute inset-0 bg-blue-500/5 mix-blend-overlay pointer-events-none z-10"
          animate={{ opacity: [0, 0.2, 0] }}
          transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 0.2 }}
        />

        {/* Success Tags */}
        <motion.div
          className="absolute top-10 left-10 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-lg z-30"
          animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          TYPES OK
        </motion.div>

        <motion.div
          className="absolute bottom-20 right-10 bg-emerald-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow-lg z-30"
          animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 2.5 }}
        >
          CONSTRAINTS MET
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="text-xs font-bold text-slate-900">Constraint Reliability</div>
        <div className="text-[10px] text-slate-400">0% Hallucination Policy</div>
      </div>
    </div>
  );
};

// --- Template Efficiency Asset ---
const themes = [
  {
    id: 'dark-minimalism',
    name: 'Dark Minimalism',
    color: 'bg-[#0a0a0a]',
    text: 'text-white',
    border: 'border-white/10',
  },
  {
    id: 'classic-magazine',
    name: 'Classic Magazine',
    color: 'bg-[#fdfcfb]',
    text: 'text-stone-900',
    border: 'border-black/5',
  },
  {
    id: 'minimal-workspace',
    name: 'Minimal Workspace',
    color: 'bg-[#f8f9fa]',
    text: 'text-slate-900',
    border: 'border-slate-200',
  },
  {
    id: 'neutral-humanism',
    name: 'Neutral Humanism',
    color: 'bg-[#faf9f6]',
    text: 'text-orange-950',
    border: 'border-orange-100',
  },
  {
    id: 'round-minimal',
    name: 'Round Minimal',
    color: 'bg-white',
    text: 'text-slate-900',
    border: 'border-slate-100',
  },
  {
    id: 'square-minimalism',
    name: 'Square Minimalism',
    color: 'bg-white',
    text: 'text-black',
    border: 'border-black/10',
  },
];

export const TemplateEfficiencyAsset = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev: number) => (prev + 1) % themes.length);
    }, 500); // 0.5s swipe interval
    return () => clearInterval(timer);
  }, []);

  const visibleThemes = [
    themes[(index + 2) % themes.length],
    themes[(index + 1) % themes.length],
    themes[index],
  ].filter(Boolean) as typeof themes;

  return (
    <div className="relative w-full aspect-square bg-slate-100/50 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative w-64 h-80 flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {visibleThemes.map((theme, i) => (
            <motion.div
              key={theme.id}
              className={`absolute w-56 h-72 ${theme.color} ${theme.text} border ${theme.border} rounded-2xl shadow-2xl p-5 flex flex-col gap-4 overflow-hidden`}
              style={{
                zIndex: i,
              }}
              initial={{
                scale: 0.9 + i * 0.05,
                y: (2 - i) * 15,
                opacity: i === 0 ? 0 : 1,
                x: 0,
              }}
              animate={{
                scale: 0.9 + i * 0.05,
                y: (2 - i) * 15,
                opacity: 1,
                x: 0,
                rotate: 0,
              }}
              exit={{
                x: 400,
                rotate: 25,
                opacity: 0,
                transition: { duration: 0.3, ease: 'circIn' },
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Theme Mini-UI Preview */}
              <div className="flex-1 flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <div className="w-8 h-8 rounded-lg bg-current opacity-10" />
                  <div className="flex gap-1">
                    <div className="w-10 h-2 bg-current opacity-5 rounded-full" />
                    <div className="w-6 h-2 bg-current opacity-5 rounded-full" />
                  </div>
                </div>
                <div className="w-full h-32 rounded-xl bg-current opacity-5 flex items-center justify-center border border-current opacity-10">
                  <div className="w-12 h-12 rounded-full bg-current opacity-20 border-4 border-white/20" />
                </div>
                <div className="space-y-2">
                  <div className="w-3/4 h-2 bg-current opacity-10 rounded-full" />
                  <div className="w-1/2 h-2 bg-current opacity-5 rounded-full" />
                </div>
              </div>

              {/* Theme Footer */}
              <div className="mt-auto pt-3 pb-2 border-t border-current opacity-10 space-y-0.5">
                <div className="text-[9px] font-mono opacity-40 uppercase tracking-widest leading-none">
                  Theme
                </div>
                <div className="text-[13px] font-bold opacity-100 truncate leading-tight">
                  {theme.name}
                </div>
              </div>

              {/* Decorative accent for certain themes */}
              {theme.id.includes('minimalism') && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/10 blur-3xl rounded-full" />
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-4 z-50">
        <div className="text-xs font-bold text-slate-900 uppercase tracking-tighter">
          Theme Registry
        </div>
        <div className="text-[10px] text-slate-400 font-medium">Synced with .moai/themes</div>
      </div>
    </div>
  );
};

// --- Verification Logic Asset ---
export const VerificationLogicAsset = () => {
  return (
    <div className="relative w-full aspect-square bg-black rounded-2xl border border-slate-800 flex flex-col overflow-hidden font-mono text-[10px]">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 h-8 bg-slate-900/50 border-b border-white/5">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-red-500/30" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/30" />
          <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
        </div>
        <div className="text-slate-500 text-[9px]">Tekton CI/CD</div>
      </div>

      {/* Terminal Output */}
      <div className="p-4 space-y-2.5">
        <div className="flex gap-2">
          <span className="text-slate-500">➜</span>
          <span className="text-slate-300">tekton verify package...</span>
        </div>

        <div className="space-y-1.5 pt-2">
          <CheckItem label="Scanning design tokens" delay={1} />
          <CheckItem label="Validating React 19 compatibility" delay={2} />
          <CheckItem label="Constraint check: 'marketing-hero'" delay={3} />
          <CheckItem label="Linting @tekton-ui/core" delay={4} />
          <CheckItem label="Accessibility (WCAG 2.1) Audit" delay={5} />
        </div>

        <motion.div
          className="pt-4 text-emerald-400 font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 6 }}
        >
          ✓ Verification Passed. 0 vulnerabilities found.
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="text-xs font-bold text-white">Verification Logic</div>
        <div className="text-[10px] text-slate-500">Bulletproof System Reliability</div>
      </div>
    </div>
  );
};

const CheckItem = ({ label, delay }: { label: string; delay: number }) => (
  <motion.div
    className="flex items-center gap-2"
    initial={{ opacity: 0, x: -5 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay }}
  >
    <motion.span
      className="text-emerald-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: delay + 0.5 }}
    >
      ✓
    </motion.span>
    <span className="text-slate-400">{label}</span>
    <motion.div
      className="flex-1 h-[1px] bg-white/5 mx-2"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay: delay + 0.2, duration: 0.5 }}
    />
  </motion.div>
);
