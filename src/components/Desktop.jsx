import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, Globe, Cpu, Database, Monitor, Activity, Shield, ShieldAlert, Zap } from 'lucide-react';

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

const ThreatLog = ({ logs }) => {
  const scrollRef = React.useRef(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="relative md:absolute md:top-16 md:right-6 w-[260px] md:w-64 h-32 md:h-48 bg-black/90 backdrop-blur-3xl border border-white/10 rounded-lg overflow-hidden flex flex-col z-40 shadow-[0_0_40px_rgba(0,0,0,0.5)] transition-all duration-500">
      <div className="px-3 py-1.5 border-b border-white/5 bg-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Activity className="w-2.5 h-2.5 md:w-3 md:h-3 text-[#1793d1]" />
          <span className="text-[8px] md:text-[9px] font-bold tracking-widest text-[#1793d1]/80 uppercase">AI Security Agent</span>
        </div>
        <div className="flex gap-1">
          <motion.div animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity }} className="w-1 h-1 rounded-full bg-emerald-500" />
        </div>
      </div>
      <div 
        ref={scrollRef}
        className="flex-1 p-2 font-mono text-[7px] md:text-[8px] space-y-1.5 overflow-y-auto scrollbar-hide scroll-smooth"
      >
        {logs.map((log, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`flex gap-2 ${log.type === 'attack' ? 'text-rose-500' : 'text-[#1793d1]'}`}
          >
            <span className="opacity-40 shrink-0">[{log.time}]</span>
            <span className="font-bold leading-tight">{log.msg}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default function Desktop({ onOpenTerminal, onOpenGUI }) {
  const [logs, setLogs] = useState([]);
  const [battleState, setBattleState] = useState('idle'); // idle, attack, defense
  const [activeThreat, setActiveThreat] = useState(null);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  }).format(new Date());

  // Simulation State Engine
  useEffect(() => {
    const scenarios = [
      { threat: "SQL Injection Probe", defense: "AI Sandbox Quarantine", impact: "High" },
      { threat: "Zero-Day Vector detected", defense: "Heuristic Patching", impact: "Critical" },
      { threat: "DDoS Swarm incoming", defense: "Adaptive Load Balancing", impact: "Medium" },
      { threat: "Shell Access Attempt", defense: "RSA-4096 Re-keying", impact: "Warning" },
    ];

    const simulateCycle = () => {
      const scene = scenarios[Math.floor(Math.random() * scenarios.length)];
      const time = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });

      // PHASE 1: Detection (RED)
      setBattleState('attack');
      setActiveThreat(scene);
      setLogs(prev => [...prev, { type: 'attack', msg: `DETECTION: ${scene.threat}`, time }].slice(-30));

      // PHASE 2: AI Counter-Attack (BLUE)
      setTimeout(() => {
        setBattleState('defense');
        setLogs(prev => [...prev, { type: 'defense', msg: `AI DEPLOY: ${scene.defense}`, time }].slice(-30));
      }, 2500);

      // PHASE 3: Neutralized
      setTimeout(() => {
        setBattleState('idle');
        setActiveThreat(null);
        setLogs(prev => [...prev, { type: 'defense', msg: "VULNERABILITY_FIXED::OK", time }].slice(-30));
      }, 6000);
    };

    const timer = setInterval(simulateCycle, 9000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden flex flex-col font-mono text-[#1793d1]">
      
      {/* Background Grid Layer */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#1793d1 1px, transparent 1px), linear-gradient(90deg, #1793d1 1px, transparent 1px)`,
          backgroundSize: '120px 120px'
        }}
      />

      {/* Top Navigation Bar */}
      <div className="h-10 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5 px-3 md:px-6 flex items-center justify-between z-50">
        <div className="flex items-center gap-4 md:gap-6">
          <div className="flex items-center gap-2">
            <motion.div 
              animate={battleState === 'attack' ? { scale: [1, 1.2, 1] } : {}}
              className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full ${battleState === 'attack' ? 'bg-rose-500 shadow-[0_0_10px_#f43f5e]' : battleState === 'defense' ? 'bg-amber-400' : 'bg-emerald-500'}`}
            />
            <span className={`text-[8px] md:text-[10px] font-black tracking-widest uppercase items-center flex gap-1 ${battleState === 'attack' ? 'text-rose-500' : ''}`}>
               {battleState === 'attack' ? 'CRITICAL_ALERT' : 'NODE_SECURE'}
               {battleState === 'attack' && <Zap className="w-2.5 h-2.5 md:w-3 h-3 animate-bounce" />}
            </span>
          </div>
          {activeThreat && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[8px] md:text-[10px] font-bold text-zinc-500 hidden sm:block"
            >
              MITIGATING: {"<< "} <span className="text-[#1793d1] italic underline">{activeThreat.threat}</span> {" >>"}
            </motion.div>
          )}
        </div>

        <div className="text-[8px] md:text-[10px] font-bold bg-[#1793d1]/5 px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-[#1793d1]/10">
          {formattedDate}
        </div>
      </div>

      <style>
        {`
          @keyframes glitch {
            0% { transform: translate(0); }
            10% { transform: translate(-3px, 1px); }
            30% { transform: translate(1px, -2px); }
            100% { transform: translate(0); }
          }
          @keyframes shockwave {
            0% { transform: scale(0.5); opacity: 0.8; }
            100% { transform: scale(2); opacity: 0; }
          }
          @keyframes float-particle {
            0% { transform: translateY(0) translateX(0); opacity: 0; }
            50% { opacity: 0.3; }
            100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
          }
          .glitch-text:hover {
            animation: glitch 0.3s cubic-bezier(.25,.46,.45,.94) both infinite;
          }
          .bg-grid {
            background-size: 60px 60px;
            background-image: 
              linear-gradient(to right, rgba(23, 147, 209, 0.02) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(23, 147, 209, 0.02) 1px, transparent 1px);
          }
        `}
      </style>

      {/* Global Ambient Animations */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        
        {/* Floating Hex Data Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-[7px] font-mono text-[#1793d1]/20 select-none animate-[float-particle_25s_linear_infinite]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${100 + Math.random() * 20}%`,
              animationDelay: `${Math.random() * 25}s`
            }}
          >
            {Math.random().toString(16).substring(2, 6).toUpperCase()}
          </div>
        ))}

        {/* Attack Shockwave Visualization */}
        <AnimatePresence>
          {battleState === 'attack' && (
            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 flex items-center justify-center p-20"
            >
              <div className="w-[800px] h-[800px] border-[40px] border-rose-500/5 rounded-full animate-[shockwave_3s_linear_infinite]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Scanline Effect */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#1793d1]/10 to-transparent animate-[shockwave_12s_linear_infinite]" />
      </div>

      {/* Central Visual: Identity & Core Security Research Center */}
      <div className="absolute inset-0 flex flex-col pointer-events-none z-10 transition-transform duration-1000">
        <motion.div 
          animate={battleState === 'attack' ? { x: [0, -3, 3, -3, 0] } : {}}
          className="flex flex-col h-full w-full p-6 md:p-12 items-center justify-center md:gap-10 lg:gap-12"
        >
          {/* researcher Core Center Piece - Mobile: Top Right, Desktop: Center */}
          <div className="relative group scale-[0.4] sm:scale-65 md:scale-85 lg:scale-100 self-end md:self-auto -mt-10 md:mt-0">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className={`w-64 h-64 md:w-[500px] md:h-[500px] lg:w-[600px] lg:h-[600px] blur-[80px] md:blur-[120px] lg:blur-[150px] rounded-full transition-all duration-1000 ${battleState === 'attack' ? 'bg-rose-500/15 scale-110' : battleState === 'defense' ? 'bg-[#1793d1]/15 scale-105' : 'bg-[#1793d1]/5'}`} />
            </div>

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className={`w-[240px] h-[240px] md:w-[380px] md:h-[380px] lg:w-[450px] lg:h-[450px] border border-dashed rounded-full opacity-10 ${battleState === 'attack' ? 'border-rose-400' : 'border-[#1793d1]'}`}
              />
            </div>
            
            <div className={`relative w-48 h-48 md:w-[320px] md:h-[320px] lg:w-[400px] lg:h-[400px] flex items-center justify-center rounded-full overflow-hidden border transition-colors duration-1000 ${battleState === 'attack' ? 'border-rose-500/30' : 'border-[#1793d1]/20'} bg-black/50 backdrop-blur-xl`}>
              <div className="absolute inset-0 z-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%)] bg-[length:100%_2px] pointer-events-none opacity-50" />
              
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full opacity-10">
                <circle cx="50" cy="50" r="45" stroke={battleState === 'attack' ? '#f43f5e' : '#1793d1'} strokeWidth="0.05" />
                <circle cx="50" cy="50" r="30" stroke={battleState === 'attack' ? '#f43f5e' : '#1793d1'} strokeWidth="0.05" />
                {Array.from({ length: 12 }).map((_, i) => (
                  <motion.line 
                    key={i}
                    x1="50" y1="50"
                    x2={50 + 45 * Math.cos(i * (Math.PI / 6))}
                    y2={50 + 45 * Math.sin(i * (Math.PI / 6))}
                    stroke={battleState === 'attack' ? '#f43f5e' : '#1793d1'}
                    strokeWidth="0.02"
                    animate={{ opacity: [0.1, 0.4, 0.1] }}
                    transition={{ duration: 3, delay: i * 0.2, repeat: Infinity }}
                  />
                ))}
              </svg>
              
              <svg viewBox="0 0 100 100" className={`w-56 h-56 md:w-[320px] md:h-[320px] fill-none transition-all duration-1000 ${battleState === 'attack' ? 'stroke-rose-500 drop-shadow-[0_0_40px_rgba(244,63,94,0.7)]' : 'stroke-[#1793d1] drop-shadow-[0_0_30px_rgba(23,147,209,0.5)]'}`}>
                <motion.path 
                  d="M50 12 L85 24 V55 C85 78 50 88 50 88 C50 88 15 78 15 55 V24 L50 12Z" 
                  className={`stroke-[0.3] transition-all duration-1000 ${battleState === 'defense' ? 'fill-white/10 stroke-[0.8] stroke-white' : 'fill-[#1793d1]/5'}`} 
                />
                
                <g className="filter brightness-150">
                  <circle cx="50" cy="40" r="1.2" className="fill-current" />
                  <circle cx="40" cy="55" r="1.2" className="fill-current" />
                  <circle cx="60" cy="55" r="1.2" className="fill-current" />
                  
                  <motion.circle 
                    r="0.8" fill="#fff"
                    animate={{ opacity: [0, 1, 0], scale: battleState === 'attack' ? [1, 2.5, 1] : 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <animateMotion 
                      path="M50 40 L40 55" 
                      dur="1s" 
                      repeatCount="indefinite" 
                    />
                  </motion.circle>
                </g>

                <motion.circle 
                  cx="50" cy="50" r="12" 
                  className="stroke-current stroke-[0.1]"
                  animate={{ scale: [1, 3.5], opacity: [0.8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
                />
              </svg>
            </div>
          </div>
          
          <div className="flex-1" />

          {/* Bottom Content Wrapper (Mobile View) */}
          <div className="text-center space-y-6 md:space-y-12 mb-10 md:mb-0 w-full flex flex-col items-center">
            
            {/* AI Security HUD for Mobile (Placed here to avoid overlap) */}
            <div className="md:hidden w-full flex justify-center mb-4">
               <ThreatLog logs={logs} />
            </div>

            {/* AI Security HUD for Desktop (Absolute Positioned elsewhere if not here) */}
            <div className="hidden md:block">
               <ThreatLog logs={logs} />
            </div>

            <motion.div className="flex flex-wrap justify-center overflow-hidden">
              {"AAYUSH NEPAL".split("").map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    scale: battleState === 'attack' ? [1, 1.05, 1] : 1,
                  }}
                  transition={{ 
                    delay: 0.3 + index * 0.05,
                    scale: { duration: 0.2, repeat: battleState === 'attack' ? Infinity : 0 }
                  }}
                  className={`glitch-text text-4xl sm:text-6xl md:text-7xl lg:text-[10rem] font-display font-black transition-colors duration-1000 tracking-[-0.05em] leading-none cursor-default ${battleState === 'attack' ? 'text-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)]' : 'text-[#1793d1]'} ${char === " " ? "mr-4 md:mr-10" : ""}`}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>

            <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="flex flex-col items-center gap-4 md:gap-6 w-full"
            >
              <div className="flex items-center justify-center gap-3 md:gap-8 overflow-hidden mx-auto w-full max-w-5xl px-4 md:px-12">
                <div className={`h-[1px] flex-1 transition-all duration-1000 ${battleState === 'attack' ? 'bg-rose-500/50' : 'bg-[#1793d1]/30'}`} />
                <motion.p 
                  animate={battleState === 'attack' ? { letterSpacing: ["0.4em", "0.2em", "0.4em"] } : { letterSpacing: "0.6em" }}
                  className={`text-[9px] sm:text-xs md:text-base lg:text-lg font-bold uppercase font-mono tracking-tight whitespace-nowrap transition-colors duration-1000 ${battleState === 'attack' ? 'text-rose-500' : 'text-[#1793d1]/90'}`}
                >
                  {battleState === 'attack' ? 'THREAT_SCAN' : 'Cyber Security Researcher'}
                </motion.p>
                <div className={`h-[1px] flex-1 transition-all duration-1000 ${battleState === 'attack' ? 'bg-rose-500/50' : 'bg-[#1793d1]/30'}`} />
              </div>
              
              <div className="flex gap-4 md:gap-6 items-center">
                 <div className={`px-2 md:px-4 py-1 text-[7px] md:text-[8px] font-black tracking-widest border transition-all duration-500 ${battleState === 'attack' ? 'border-rose-500 text-rose-500 bg-rose-500/10' : 'border-[#1793d1]/20 text-[#1793d1]/60'}`}>
                    AI_NEURAL_LINK: ACTIVE
                 </div>
                 {battleState === 'attack' && (
                    <motion.div 
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.1, repeat: Infinity }}
                      className="text-[8px] font-black text-rose-500 tracking-[0.5em] uppercase"
                    >
                      ! TRACE_DETECTED !
                    </motion.div>
                 )}
              </div>
            </motion.div>
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
