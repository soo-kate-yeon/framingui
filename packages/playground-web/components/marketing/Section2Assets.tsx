'use client';

import { motion } from 'framer-motion';

// --- MCP Versatility Asset ---
const platforms = [
  { name: 'Next.js', color: 'bg-black' },
  { name: 'Vite', color: 'bg-gradient-to-tr from-blue-500 to-yellow-400' },
  { name: 'React', color: 'bg-blue-500' },
  { name: 'Astro', color: 'bg-orange-600' },
];

export const MCPVersatilityAsset = () => {
  return (
    <div className="relative w-full aspect-square bg-white rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center">
        {/* Connection Lines (Energy Flow) */}
        {platforms.map((_, i) => (
          <motion.div
            key={i}
            className="absolute origin-center h-[2px] bg-gradient-to-r from-blue-500/0 via-blue-500/50 to-blue-500/0"
            style={{
              width: '140px',
              rotate: i * 90 + 45,
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 1 + i * 0.5, duration: 0.8 }}
          >
            <motion.div
              className="w-10 h-full bg-blue-400 blur-sm"
              animate={{ x: [-70, 70] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
            />
          </motion.div>
        ))}

        {/* Central MCP Core */}
        <motion.div
          className="z-20 w-16 h-16 bg-white border-4 border-slate-900 rounded-2xl shadow-2xl flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-xs">
            MCP
          </div>
        </motion.div>

        {/* Platform Icons (Stylized Buttons with Full Names) */}
        {platforms.map((p, i) => (
          <motion.div
            key={p.name}
            className={`absolute px-3 h-8 ${p.color} border border-white/20 rounded-lg shadow-lg flex items-center justify-center text-[10px] font-bold text-white whitespace-nowrap`}
            style={{
              x: Math.cos((i * 90 + 45) * (Math.PI / 180)) * 95,
              y: Math.sin((i * 90 + 45) * (Math.PI / 180)) * 95,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5 + i * 0.5, type: 'spring', stiffness: 200, damping: 15 }}
          >
            {p.name}
          </motion.div>
        ))}
      </div>

      {/* Removed bottom label */}
    </div>
  );
};


// --- TS Code Export Asset ---
const codeLines = [
  'interface ButtonProps {',
  "  variant: 'primary' | 'ghost';",
  "  size: 'sm' | 'md' | 'lg';",
  '  loading?: boolean;',
  '}',
  '',
  'export const Button = () => {',
  '  return <button ... />',
  '}',
];

export const TSCodeExportAsset = () => {
  return (
    <div className="relative w-full aspect-square bg-[#0b0e14] rounded-2xl border border-slate-800 flex flex-col overflow-hidden group">
      {/* Code Header */}
      <div className="flex items-center gap-1.5 px-4 h-10 border-b border-slate-800/50 bg-[#0b0e14]/50">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
        <div className="ml-2 text-[10px] font-mono text-slate-500">Button.tsx</div>
      </div>

      {/* Code Content */}
      <div className="p-5 font-mono text-[11px] leading-relaxed">
        {codeLines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.4, duration: 0.3 }}
            className="flex min-h-[1.5em]"
          >
            <span className="text-slate-600 mr-4 w-3 text-right select-none">{i + 1}</span>
            <TypingLine text={line} delay={i * 0.4} />
          </motion.div>
        ))}
      </div>

      {/* Removed bottom label */}
    </div>
  );
};

const TypingLine = ({ text, delay }: { text: string; delay: number }) => {
  return (
    <div className="flex">
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ display: 'none' }}
          animate={{ display: 'inline' }}
          transition={{ delay: delay + i * 0.02 }}
          className={i < text.indexOf(':') ? 'text-blue-300' : 'text-slate-300'}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};
