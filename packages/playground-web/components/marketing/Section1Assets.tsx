'use client';

import { motion } from 'framer-motion';

export const ColorTokenAsset = () => {
  return (
    <motion.div
      className="relative w-full aspect-square bg-[#F8FAFC] rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden cursor-pointer"
      initial="initial"
      whileHover="hover"
      whileInView="hover"
      viewport={{ once: false, margin: '-20%' }}
    >
      {/* Background Mesh Gradient */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-emerald-400/20 rounded-full blur-[50px]"
          variants={{
            initial: { scale: 0.8, opacity: 0.5 },
            hover: { scale: 1.2, opacity: 0.8 },
          }}
          transition={{ duration: 1 }}
        />
      </div>

      <div className="relative flex items-center justify-center w-full h-full">
        {/* Draw SVG Lines */}
        <svg className="absolute w-[300px] h-[300px] pointer-events-none" viewBox="0 0 300 300">
          <motion.path
            d="M 120 150 C 160 150, 160 85, 210 85"
            fill="none"
            stroke="url(#line-grad-light)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              hover: { pathLength: 1, opacity: 0.6 },
            }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
          <motion.path
            d="M 120 150 C 160 150, 160 215, 210 215"
            fill="none"
            stroke="url(#line-grad-dark)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
            variants={{
              initial: { pathLength: 0, opacity: 0 },
              hover: { pathLength: 1, opacity: 0.6 },
            }}
            transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          />
          <defs>
            <linearGradient id="line-grad-light" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="line-grad-dark" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#D1D5DB" />
            </linearGradient>
          </defs>
        </svg>

        {/* Light Mode Node (Top Right) */}
        <motion.div
          className="absolute z-10 flex flex-col items-center justify-center w-[84px] h-[84px] bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-full"
          variants={{
            initial: { x: -30, y: 0, opacity: 0, scale: 0.5 },
            hover: { x: 60, y: -65, opacity: 1, scale: 1 },
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.05 }}
        >
          <div className="w-8 h-8 bg-slate-900 rounded-full shadow-inner border border-slate-700 flex items-center justify-center mb-1" />
          <span className="text-[9px] font-bold text-slate-800">#111111</span>
          <span className="text-[7px] text-slate-500 font-medium">Light Mode</span>
        </motion.div>

        {/* Dark Mode Node (Bottom Right) */}
        <motion.div
          className="absolute z-10 flex flex-col items-center justify-center w-[84px] h-[84px] bg-white/60 backdrop-blur-xl border border-white shadow-xl rounded-full"
          variants={{
            initial: { x: -30, y: 0, opacity: 0, scale: 0.5 },
            hover: { x: 60, y: 65, opacity: 1, scale: 1 },
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200, delay: 0.15 }}
        >
          <div className="w-8 h-8 bg-white rounded-full shadow-inner border border-slate-200 flex items-center justify-center mb-1" />
          <span className="text-[9px] font-bold text-slate-800">#FFFFFF</span>
          <span className="text-[7px] text-slate-500 font-medium">Dark Mode</span>
        </motion.div>

        {/* Semantic Color Node (Center / Left side when expanded) */}
        <motion.div
          className="absolute z-20 flex flex-col items-center justify-center w-24 h-24 bg-[#10B981]/90 backdrop-blur-md border border-[#34D399]/50 shadow-[0_15px_30px_-10px_rgba(16,185,129,0.5)] rounded-full"
          variants={{
            initial: { x: 0, scale: 1 },
            hover: { x: -40, scale: 1.05 },
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        >
          <span className="text-[11px] font-bold text-white mb-0.5 tracking-wide">primaryText</span>
          <span className="text-[8px] text-emerald-100/90 font-medium uppercase tracking-widest">
            Semantic
          </span>
        </motion.div>
      </div>

      {/* Removed bottom label */}
    </motion.div>
  );
};

export const LayoutTokenAsset = () => {
  return (
    <div className="relative w-full aspect-square bg-[#F8FAFC] rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden">
      {/* Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-[60px]" />
      </div>

      <div className="relative w-full h-full flex flex-col items-center justify-center p-8">
        <style>{`
          .demo-app-container {
            container-type: inline-size;
            container-name: app;
          }
          
          .demo-shell {
            display: flex;
            flex-direction: column;
            gap: 12px;
            padding: 12px;
            height: 220px;
            background: white;
            border-radius: 12px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 20px 40px -15px rgba(0,0,0,0.05);
            transition: all 0.3s ease;
            overflow: hidden;
          }
          
          .demo-nav {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 10px;
            padding: 0 12px;
            background: #f8fafc;
            border-radius: 8px;
            height: 48px;
            width: 100%;
            flex-shrink: 0;
            transition: all 0.3s ease;
          }
          
          .demo-main {
            display: flex;
            flex-direction: column;
            gap: 12px;
            flex: 1;
            transition: all 0.3s ease;
            overflow: hidden;
          }
          
          .demo-aside {
            display: none;
            width: 70px;
            background: #f8fafc;
            border-radius: 8px;
            height: 100%;
            flex-shrink: 0;
            transition: all 0.3s ease;
          }

          .demo-logo { width: 20px; height: 20px; }
          .demo-nav-items { flex-direction: row; }

          @container app (min-width: 200px) {
            .demo-shell { flex-direction: row; padding: 14px; gap: 14px; }
            .demo-nav { 
              flex-direction: column; 
              width: 50px; 
              height: 100%; 
              padding: 14px 0; 
              justify-content: flex-start;
            }
            .demo-logo { width: 24px; height: 24px; }
            .demo-nav-items { flex-direction: column; }
          }
          
          @container app (min-width: 280px) {
            .demo-main { flex-direction: row; }
            .demo-aside { display: flex; }
          }

          .label-mobile { display: inline; }
          .label-tablet { display: none; }
          .label-desktop { display: none; }
          
          @container app (min-width: 200px) {
            .label-mobile { display: none; }
            .label-tablet { display: inline; }
          }
          @container app (min-width: 280px) {
            .label-tablet { display: none; }
            .label-desktop { display: inline; }
          }
        `}</style>

        {/* Removed device label */}

        {/* Resizing App Wrapper */}
        <motion.div
          className="relative flex flex-col items-center demo-app-container w-full"
          animate={{ width: [300, 140, 300] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="demo-shell w-full">
            {/* Nav / Sidebar */}
            <div className="demo-nav border border-slate-100">
              <div className="bg-blue-500 rounded-md shrink-0 demo-logo transition-all" />
              <div className="flex gap-2 flex-1 demo-nav-items items-center transition-all">
                <div className="bg-slate-200 rounded-full shrink-0 w-3 h-3" />
                <div className="bg-slate-200 rounded-full shrink-0 w-3 h-3" />
                <div className="bg-slate-200 rounded-full shrink-0 w-3 h-3" />
              </div>
            </div>

            {/* Main Content */}
            <div className="demo-main">
              {/* Feed Column */}
              <div className="flex-1 flex flex-col gap-2 min-w-0">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="w-full bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex flex-col gap-1.5 shrink-0"
                  >
                    <div className="w-1/3 h-2 bg-slate-200 rounded-full" />
                    <div className="w-full h-1.5 bg-slate-100 rounded-full" />
                    <div className="w-4/5 h-1.5 bg-slate-100 rounded-full" />
                  </div>
                ))}
              </div>

              {/* Aside Column (Desktop only) */}
              <div className="demo-aside p-2.5 flex-col gap-2 border border-slate-100">
                <div className="w-full h-8 bg-slate-200 rounded-md" />
                <div className="w-full h-8 bg-slate-200 rounded-md" />
                <div className="w-full h-8 bg-slate-200 rounded-md" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Removed bottom label */}
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
    <motion.div
      className="relative w-full aspect-square bg-white rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden cursor-pointer group"
      initial="initial"
      whileInView="animate"
      whileHover="animate"
      viewport={{ once: false, margin: '-20%' }}
    >
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      <div className="relative w-full h-full flex items-center justify-center scale-90">
        {/* Orbit Rings (Decorative) */}
        <motion.div
          className="absolute w-[130px] h-[130px] border border-slate-100 rounded-full pointer-events-none"
          variants={{ initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 0.5 } }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-[190px] h-[190px] border border-slate-100 rounded-full pointer-events-none"
          variants={{ initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 0.4 } }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        />
        <motion.div
          className="absolute w-[250px] h-[250px] border border-slate-100 rounded-full pointer-events-none"
          variants={{ initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 0.3 } }}
          transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
        />

        {componentsList.map((name, i) => {
          // Distribute components into 3 different orbits
          const orbitIdx = i % 3;
          const radius = [65, 95, 125][orbitIdx] || 95;
          const startAngle = (i * 360) / componentsList.length;

          // Round values to avoid hydration mismatch between server and client floating point math
          const endX = Number((Math.cos(startAngle * (Math.PI / 180)) * radius).toFixed(2));
          const endY = Number((Math.sin(startAngle * (Math.PI / 180)) * radius).toFixed(2));

          return (
            <motion.div
              key={name}
              className="absolute px-2.5 py-1 bg-white/80 backdrop-blur-sm border border-slate-100 rounded-lg shadow-sm text-[9px] font-medium text-slate-500 whitespace-nowrap"
              variants={{
                initial: { x: 0, y: 0, opacity: 0, scale: 0 },
                animate: { x: endX, y: endY, opacity: 1, scale: 1 },
              }}
              transition={{
                type: 'spring',
                damping: 12,
                stiffness: 150,
                delay: 0.2 + i * 0.05, // staggered
              }}
            >
              {name}
            </motion.div>
          );
        })}

        {/* Central Core */}
        <motion.div
          className="z-10 bg-white border border-slate-200 shadow-2xl rounded-full p-1"
          variants={{
            initial: { scale: 0, opacity: 0 },
            animate: { scale: 1, opacity: 1 },
          }}
          transition={{ type: 'spring', damping: 15, stiffness: 200 }}
        >
          <div className="bg-slate-900 px-4 py-2 rounded-full border border-slate-700 shadow-inner text-[11px] font-bold text-white group-hover:scale-110 transition-transform duration-300">
            +30 Components
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
