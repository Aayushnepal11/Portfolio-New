import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import BrowserUI from './components/BrowserUI';
import Desktop from './components/Desktop';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [view, setView] = useState('desktop'); // 'desktop', 'terminal', or 'gui'
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileNotice, setShowMobileNotice] = useState(false);

  const requestTerminal = () => {
    if (isMobile) {
      setShowMobileNotice(true);
      setTimeout(() => setShowMobileNotice(false), 3000);
      return;
    }
    setView('terminal');
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On mobile, just use the GUI by default if they try to use terminal/desktop?
      // Actually, let's allow desktop on mobile too, but maybe with a warning or just GUI.
      // For now, let's keep it simple.
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-[#1793d1] font-mono selection:bg-[#1793d1] selection:text-white">
      <AnimatePresence mode="wait">
        {view === 'desktop' ? (
          <motion.div
            key="desktop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Desktop 
              onOpenTerminal={requestTerminal} 
              onOpenGUI={() => setView('gui')} 
            />
          </motion.div>
        ) : view === 'terminal' ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}
          >
            <Terminal 
              onLaunchGUI={() => setView('gui')} 
              onExit={() => setView('desktop')}
            />
          </motion.div>
        ) : (
          <motion.div
            key="gui"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="min-h-screen bg-[#0a0a0a]"
          >
            <BrowserUI 
              onBackToTerminal={requestTerminal} 
              onBackToDesktop={() => setView('desktop')}
              hideTerminalButton={false}
              isMobile={isMobile}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Mobile Notice */}
      <AnimatePresence>
        {showMobileNotice && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 bg-red-500/10 border border-red-500/50 backdrop-blur-md px-6 py-4 rounded-xl z-[100] text-center"
          >
            <div className="text-red-500 font-bold text-sm mb-1 uppercase tracking-widest">Access Denied</div>
            <div className="text-zinc-300 text-[10px] uppercase tracking-wider">Terminal requires Desktop or Tablet</div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
