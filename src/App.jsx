import React, { useState, useEffect } from 'react';
import Terminal from './components/Terminal';
import BrowserUI from './components/BrowserUI';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [view, setView] = useState('terminal'); // 'terminal' or 'gui'
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (mobile && view === 'terminal') {
        setView('gui');
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [view]);

  return (
    <main className="min-h-screen bg-[#050505] text-[#00ff41] font-mono selection:bg-[#00ff41] selection:text-black">
      <AnimatePresence mode="wait">
        {view === 'terminal' && !isMobile ? (
          <motion.div
            key="terminal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 0.5 }}
          >
            <Terminal onLaunchGUI={() => setView('gui')} />
          </motion.div>
        ) : (
          <motion.div
            key="gui"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="min-h-screen bg-[#0a0a0a]"
          >
            <BrowserUI 
              onBackToTerminal={() => {
                if (!isMobile) setView('terminal');
              }} 
              hideTerminalButton={isMobile}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
