import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Globe, Cpu, Database, Monitor } from 'lucide-react';

const DesktopIcon = ({ icon: Icon, label, onClick, delay = 0 }) => (
  <motion.button
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, type: 'spring', damping: 15 }}
    onClick={onClick}
    className="group flex flex-col items-center gap-1.5 p-4 rounded-xl hover:bg-white/5 transition-all w-24"
  >
    <div className="w-16 h-16 rounded-2xl bg-[#111]/80 backdrop-blur-md border border-white/5 flex items-center justify-center group-hover:border-[#1793d1]/40 group-hover:bg-[#1793d1]/5 group-hover:shadow-[0_0_25px_rgba(23,147,209,0.15)] transition-all">
      <Icon className="w-8 h-8 text-zinc-400 group-hover:text-[#1793d1] transition-colors" />
    </div>
    <span className="text-[10px] uppercase tracking-[0.25em] font-black text-zinc-600 group-hover:text-[#1793d1] transition-colors text-center">
      {label}
    </span>
  </motion.button>
);

export default function Desktop({ onOpenTerminal, onOpenGUI }) {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex flex-col font-mono text-[#1793d1]">
      {/* Background Layer - Minimalist Grid Only */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.01] pointer-events-none select-none">
        <Monitor className="w-[40%] h-auto text-[#1793d1]" />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1793d1 1px, transparent 1px), linear-gradient(90deg, #1793d1 1px, transparent 1px)`,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Top Bar - Cleaned Up */}
      <div className="h-10 bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5 px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-emerald-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold tracking-widest">WiFi: CONNECTED</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-[10px] font-bold bg-[#1793d1]/10 px-3 py-1 rounded border border-[#1793d1]/20">
            {formattedDate}
          </div>
        </div>
      </div>

      {/* Central Visual: Identity & Skeleton */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-6"
        >
          {/* Skeleton Visual (Skull Icon) */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#1793d1]/20 blur-xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-32 h-32 md:w-48 md:h-48 flex items-center justify-center border border-[#1793d1]/20 rounded-full bg-[#050505]">
              <svg viewBox="0 0 24 24" className="w-16 h-16 md:w-24 md:h-24 fill-[#1793d1]/40 stroke-[#1793d1] stroke-1">
                <path d="M12 2C7.03 2 3 6.03 3 11c0 2.5 1 4.75 2.62 6.38l.38.37V21a1 1 0 001 1h10a1 1 0 001-1v-3.25l.38-.37C19.98 15.75 21 13.5 21 11c0-4.97-4.03-9-9-9zm-3 11a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm6 0a1.5 1.5 0 110-3 1.5 1.5 0 010 3z" />
              </svg>
            </div>
          </div>
          
          <div className="text-center space-y-1">
            <h1 className="text-4xl md:text-6xl font-black tracking-[0.3em] text-[#1793d1] drop-shadow-[0_0_15px_rgba(23,147,209,0.3)]">
              AAYUSH NEPAL
            </h1>
            <p className="text-[10px] md:text-xs text-[#1793d1]/40 tracking-[0.5em] font-bold uppercase">
              Cyber Security Student
            </p>
          </div>
        </motion.div>
      </div>

      {/* Desktop Area Icons */}
      <div className="flex-1 p-8 grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 relative z-10 overflow-hidden">
        <div className="flex flex-col gap-4">
          <DesktopIcon 
            icon={Monitor}
            label="System" 
            onClick={onOpenTerminal} 
            delay={0.1}
          />
          <DesktopIcon 
            icon={Globe} 
            label="Visual" 
            onClick={onOpenGUI} 
            delay={0.2}
          />
        </div>
      </div>

      <div className="scanlines opacity-20" />
    </div>
  );
}
