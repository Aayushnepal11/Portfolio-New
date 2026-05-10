import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, TerminalSquare, ShieldCheck, HardDrive, Cpu, Globe, ChevronRight, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

const USER = "aayush";
const HOST = "10.10.10.20";
const PROMPT = `${USER}@${HOST} ~ > `;

export default function Terminal({ onLaunchGUI, onExit }) {
  const [history, setHistory] = useState([
    { type: 'output', content: " " },
    { type: 'output', content: "            .---." },
    { type: 'output', content: "           /     \\" },
    { type: 'output', content: "          (  @ @  )" },
    { type: 'output', content: "           )  ^  (" },
    { type: 'output', content: "          /       \\" },
    { type: 'output', content: "         /         \\" },
    { type: 'output', content: "        (  /     \\  )" },
    { type: 'output', content: "         \\(___|_(___/" },
    { type: 'output', content: " " },
    { type: 'output', content: "Welcome to Aayush's Portfolio Terminal." },
    { type: 'output', content: "Type 'help' for a list of commands." },
    { type: 'output', content: " " }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const COMMANDS = {
    help: () => [
      "AVAILABLE COMMANDS:",
      "  whoami       - About me",
      "  ls           - List folders",
      "  cat <file>   - Read folder content",
      "  gui          - Open the visual website",
      "  clear        - Clear the screen",
      "  contact      - How to reach me",
      "  exit         - Return to desktop"
    ],
    whoami: () => [
      "NAME: Aayush Nepal",
      "ROLE: Cybersecurity Specialist / AI",
      "GOAL: Improving security through research and technology."
    ],
    exit: () => {
      onExit();
      return ["Terminating session..."];
    },
    ls: () => ["experience.log", "projects.db", "certifications.txt", "skills.yml", "education.edu", "contact.txt"],
    gui: () => {
      onLaunchGUI();
      return ["Opening visual interface..."];
    },
    contact: () => [
      "CONTACT INFO:",
      "Email:    nepalaayush88@gmail.com",
      "GitHub:   github.com/Aayushnepal11",
      "LinkedIn: linkedin.com/in/aayush-nepal-427957302",
      "X:        x.com/AAYUSHN97018184"
    ],
    cat: (args) => {
      const fileName = args[0]?.toLowerCase();
      if (!fileName) return ["Error: Argument missing."];
      
      const fileSystem = {
        "experience.log": [
          "Computer Network Instructor (2025)",
          "Freelance Full-Stack Developer (2023)",
          "PHP Developer (2022)"
        ],
        "projects.db": [
          "Network Monitor App (Python/Django/Nmap)",
          "E-Commerce Security (Django/MySQL/Authz)",
          "Secure Email Meta-Analysis (Gmail API)"
        ],
        "certifications.txt": [
          "CompTIA Security+",
          "ISC2 - Certified In Cyber Security (CC)",
          "Google Cybersecurity Professional Certificate",
          "Google AI Essentials (Professional Certificate)",
          "GitHub Foundation Certificate",
          "API Pentesting (APISec University)"
        ],
        "skills.yml": [
          "Vulnerability Analysis: Nessus, CVE Analysis",
          "Pentesting: Metasploit, Soloris, RedHawk",
          "Network: Cisco GNS3, VLAN, Subnetting",
          "OSINT: Google Dorking, Reconnaissance",
          "Languages: Python (Security Automation), PHP"
        ],
        "education.edu": [
          "Bachelor's Degree (BCA) - Divya Gyan College",
          "NEB Class 12th - Kathmandu Bernhardt College",
          "SEE Class 10th - Laboratory Higher Secondary School"
        ],
        "contact.txt": [
          "Email:    nepalaayush88@gmail.com",
          "GitHub:   github.com/Aayushnepal11",
          "LinkedIn: linkedin.com/in/aayush-nepal-427957302",
          "X:        x.com/AAYUSHN97018184"
        ]
      };

      if (fileSystem[fileName]) {
        return fileSystem[fileName];
      }
      
      // Check if they forgot the extension but the base name matches
      const baseName = fileName.split('.')[0];
      const validFiles = Object.keys(fileSystem);
      const isBaseMatch = validFiles.some(f => f.startsWith(baseName));
      
      if (isBaseMatch) {
        return [`cat: ${fileName}: No such file or directory (Did you forget the extension?)`];
      }
      
      return [`cat: ${fileName}: No such file or directory`];
    }
  };

  const [formattedDateTime, setFormattedDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yy = String(now.getFullYear()).slice(-2);
      const hh = String(now.getHours()).padStart(2, '0');
      const mins = String(now.getMinutes()).padStart(2, '0');
      const ss = String(now.getSeconds()).padStart(2, '0');
      setFormattedDateTime(`${dd}/${mm}/${yy} ${hh}:${mins}:${ss}`);
    };
    updateDateTime();
    const timer = setInterval(updateDateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (e) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const [cmd, ...args] = trimmedInput.split(' ');
    const lowerCmd = cmd.toLowerCase();
    const newHistory = [...history, { type: 'input', content: input }];

    if (lowerCmd === 'clear') {
      setHistory([]);
      setInput("");
      return;
    }

    if (COMMANDS[lowerCmd]) {
      const output = COMMANDS[lowerCmd](args);
      output.forEach(line => newHistory.push({ type: 'output', content: line }));
    } else {
      newHistory.push({ type: 'output', content: `fish: Unknown command '${cmd}'` });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div 
      className="min-h-screen bg-[#050505] font-mono relative overflow-hidden flex items-center justify-center cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Background Layer - Enhanced Hacker Theme */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(#1793d1 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#1793d1 1px, transparent 1px), linear-gradient(90deg, #1793d1 1px, transparent 1px)`,
            backgroundSize: '128px 128px'
          }}
        />
        <div 
          className="absolute inset-0 opacity-10 grayscale brightness-50"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            mixBlendMode: 'screen'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-[#1793d1]/5 pointer-events-none" />
      <div className="scanlines opacity-50" />
      
      <div className="w-full h-screen flex flex-col bg-[#050505]/60 backdrop-blur-[2px] relative z-10 overflow-hidden">
        
        <div className="bg-[#111]/80 backdrop-blur-md p-4 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onExit}
            className="text-[#1793d1]/60 hover:text-[#1793d1] hover:bg-[#1793d1]/10 gap-2 h-8 px-3 rounded-md transition-all"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="text-[10px] font-bold tracking-widest uppercase">Desktop</span>
          </Button>
          <div className="text-[12px] text-[#1793d1] font-mono font-bold pr-4">
            {formattedDateTime}
          </div>
        </div>

        <div className="block md:hidden absolute inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#1793d1]/10 flex items-center justify-center border border-[#1793d1]/20">
            <TerminalIcon className="w-8 h-8 text-[#1793d1]" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Desktop View Recommended</h2>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[240px]">
              This terminal works best on larger screens. Please use the GUI for the best mobile experience.
            </p>
          </div>
          <Button 
            onClick={onLaunchGUI}
            className="bg-[#1793d1] text-white hover:bg-[#1793d1]/80 font-bold px-8 h-12 rounded-xl text-xs tracking-widest"
          >
            INITIALIZE GUI
          </Button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-12 space-y-3 scrollbar-hide text-lg md:text-xl">
          <AnimatePresence>
            {history.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                className={`${line.type === 'input' ? 'text-white' : 'text-[#1793d1]/90'} whitespace-pre-wrap flex gap-4`}
              >
                {line.type === 'input' ? (
                  <span className="text-[#1793d1] font-bold">{PROMPT}</span>
                ) : (
                  <div className="text-[#1793d1]/30 mt-2 shrink-0"><ChevronRight className="w-4 h-4" /></div>
                )}
                <span className={line.type === 'input' ? 'font-bold' : ''}>{line.content}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <form onSubmit={handleCommand} className="flex items-center gap-4">
            <span className="text-[#1793d1] font-bold whitespace-nowrap">{PROMPT}</span>
            <input
              ref={inputRef} type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white caret-transparent font-bold"
              autoFocus spellCheck="false" autoComplete="off"
            />
            <motion.div 
              animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-3 h-7 bg-[#1793d1] shadow-[0_0_15px_#1793d1]"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
