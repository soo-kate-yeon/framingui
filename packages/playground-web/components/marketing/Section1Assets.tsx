'use client';

import { motion } from 'framer-motion';

const tokens = [
  { name: 'Primary', hex: '#0F172A', var: '--tekton-primary', color: 'bg-slate-900' },
  { name: 'Accent', hex: '#8B5CF6', var: '--tekton-accent', color: 'bg-violet-500' },
  { name: 'Success', hex: '#10B981', var: '--tekton-success', color: 'bg-emerald-500' },
  { name: 'Warning', hex: '#F59E0B', var: '--tekton-warning', color: 'bg-amber-500' },
];

export const ColorTokenAsset = () => {
  return (
    <div className="relative w-full aspect-square bg-white rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden group">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative h-64 w-48 flex items-center justify-center">
        {tokens.map((token, i) => (
          <motion.div
            key={token.name}
            className={`absolute w-32 h-44 ${token.color} rounded-xl shadow-2xl border-4 border-white flex flex-col justify-end p-4 text-white`}
            initial={{ rotate: i * 5 - 7.5, x: i * 10 - 15 }}
            whileHover={{
              rotate: (i - 1.5) * 20,
              x: (i - 1.5) * 50,
              y: -30,
              zIndex: 10,
            }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <div className="text-[10px] font-bold opacity-50 uppercase tracking-wider">
              {token.name}
            </div>
            <div className="text-xs font-mono">{token.hex}</div>
            <div className="mt-1 text-[8px] opacity-70 font-mono truncate">{token.var}</div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="text-xs font-bold text-slate-900">Color Palette</div>
        <div className="text-[10px] text-slate-400">Semantic & Scalable</div>
      </div>
    </div>
  );
};

export const LayoutTokenAsset = () => {
  return (
    <div className="relative w-full aspect-square bg-white rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden group">
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Main Container */}
      <motion.div
        className="relative border-2 border-dashed border-blue-400/30 rounded-xl bg-slate-50/50 flex gap-4 overflow-hidden"
        animate={{
          padding: [48, 16, 48],
          width: [240, 240, 240],
          height: [240, 240, 240],
        }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Padding Indicators */}
        <motion.div
          className="absolute top-0 left-0 right-0 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-center"
          animate={{ height: [48, 16, 48] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span
            className="text-[8px] font-mono text-blue-600 font-bold"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            p-12
          </motion.span>
          <motion.span
            className="absolute text-[8px] font-mono text-blue-600 font-bold"
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            p-4
          </motion.span>
        </motion.div>

        <motion.div
          className="absolute top-0 bottom-0 left-0 bg-blue-500/10 border-r border-blue-500/20"
          animate={{ width: [48, 16, 48] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Inner Content - Dynamic Children */}
        <div className="flex gap-4 w-full h-full">
          <motion.div
            className="h-full bg-white border border-slate-200 rounded-lg shadow-sm flex flex-col items-center justify-center p-2"
            animate={{ width: ['30%', '45%', '30%'] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="w-full h-1.5 bg-slate-100 rounded-full mb-1" />
            <div className="w-2/3 h-1.5 bg-slate-50 rounded-full" />
            <div className="mt-auto text-[7px] text-slate-300 font-mono">w-1/3</div>
          </motion.div>

          <motion.div className="flex-1 h-full bg-white border border-slate-200 rounded-lg shadow-sm relative flex flex-col items-center justify-center p-2">
            {/* Gap Indicator */}
            <motion.div
              className="absolute -left-4 top-0 bottom-0 w-4 bg-red-400/10 border-x border-red-400/20 flex items-center justify-center"
              animate={{
                width: [16, 16, 16],
                left: [-16, -16, -16],
              }}
            >
              <div className="h-full w-[1px] bg-red-400/30" />
            </motion.div>

            <div className="w-full h-1.5 bg-slate-100 rounded-full mb-1" />
            <div className="w-full h-1.5 bg-slate-50 rounded-full mb-1" />
            <div className="w-1/2 h-1.5 bg-slate-50 rounded-full" />
            <div className="mt-auto text-[7px] text-slate-300 font-mono">flex-1</div>
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute bottom-4 left-4">
        <div className="text-xs font-bold text-slate-900">Layout Engine</div>
        <div className="text-[10px] text-slate-400">Responsive & Consistent</div>
      </div>

      {/* Side Label */}
      <div className="absolute top-4 right-4 text-[10px] font-mono text-slate-300 rotate-90 origin-right">
        SPEC-LAYOUT-001
      </div>
    </div>
  );
};

const componentsList = [
  'Button',
  'Input',
  'Switch',
  'Calendar',
  'Card',
  'Badge',
  'Alert',
  'Menu',
  'Tabs',
  'ScrollArea',
  'Select',
  'Form',
  'Toast',
  'Tooltip',
  'Avatar',
  'Label',
];

export const ComponentGalleryAsset = () => {
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

      <div className="relative w-full h-full flex items-center justify-center scale-90">
        {componentsList.map((name, i) => {
          // Distribute components into 3 different orbits
          const orbitIdx = i % 3;
          const radius = [65, 95, 125][orbitIdx] || 95;
          const duration = [8, 12, 16][orbitIdx] || 12; // Speeds increased
          const startAngle = (i * 360) / componentsList.length;

          return (
            <motion.div
              key={name}
              className="absolute px-2.5 py-1 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-lg shadow-sm text-[9px] font-medium text-slate-500 whitespace-nowrap"
              initial={{
                x: Math.cos(startAngle * (Math.PI / 180)) * radius,
                y: Math.sin(startAngle * (Math.PI / 180)) * radius,
                opacity: 0,
              }}
              animate={{
                x: [
                  Math.cos(startAngle * (Math.PI / 180)) * radius,
                  Math.cos((startAngle + 360) * (Math.PI / 180)) * radius,
                ],
                y: [
                  Math.sin(startAngle * (Math.PI / 180)) * radius,
                  Math.sin((startAngle + 360) * (Math.PI / 180)) * radius,
                ],
                opacity: [0, 1, 1, 0],
                scale: [0.8, 1, 1, 0.8],
              }}
              transition={{
                duration,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.1,
              }}
            >
              {name}
            </motion.div>
          );
        })}

        {/* Central Core */}
        <motion.div
          className="z-10 bg-white border border-slate-200 shadow-2xl rounded-full p-1 group-hover:scale-110 transition-transform duration-500"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="bg-slate-900 px-4 py-2 rounded-full border border-slate-700 shadow-inner text-[11px] font-bold text-white">
            +30 Components
          </div>
        </motion.div>

        {/* Orbit Rings (Decorative) */}
        <div className="absolute w-[130px] h-[130px] border border-slate-100 rounded-full pointer-events-none opacity-50" />
        <div className="absolute w-[190px] h-[190px] border border-slate-100 rounded-full pointer-events-none opacity-40" />
        <div className="absolute w-[250px] h-[250px] border border-slate-100 rounded-full pointer-events-none opacity-30" />
      </div>

      <div className="absolute bottom-4 left-4">
        <div className="text-xs font-bold text-slate-900">UI Components</div>
        <div className="text-[10px] text-slate-400">Production-Ready Atoms</div>
      </div>
    </div>
  );
};
