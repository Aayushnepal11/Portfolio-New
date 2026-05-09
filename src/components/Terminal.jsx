import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, TerminalSquare, ShieldCheck, HardDrive, Cpu, Globe, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const USER = "aayush";
const HOST = "10.10.10.20";
const PROMPT = `${USER}@${HOST} ~ > `;

export default function Terminal({ onLaunchGUI }) {
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
      "  contact      - How to reach me"
    ],
    whoami: () => [
      "NAME: Aayush Nepal",
      "ROLE: Cybersecurity Specialist / AI",
      "GOAL: Improving security through research and technology."
    ],
    ls: () => ["experience.log", "projects.db", "certifications.txt", "skills.yml", "education.edu"],
    gui: () => {
      onLaunchGUI();
      return ["Opening visual interface..."];
    },
    contact: () => [
      "CONTACT INFO:",
      "Email: nepalaayush88@gmail.com",
      "Tel: +977.9861001374",
      "Web: github.com/aayushnepal"
    ],
    cat: (args) => {
      const fileName = args[0]?.toLowerCase();
      if (!fileName) return ["Error: Argument missing."];
      
      const dossiers = {
        "experience.log": [
          "[+] Decrypting Experience Dossier...",
          "- Computer Network Instructor (2025)",
          "- Freelance Full-Stack Developer (2023)",
          "- PHP Developer (2022)"
        ],
        "projects.db": [
          "[+] Decrypting Project Artifacts...",
          "- Network Monitor App (Python/Django/Nmap)",
          "- E-Commerce Security (Django/MySQL/Authz)",
          "- Secure Email Meta-Analysis (Gmail API)"
        ],
        "certifications.txt": [
          "[+] Decrypting Credentials...",
          "- CompTIA Security+",
          "- ISC2 - Certified In Cyber Security (CC)",
          "- Google Cybersecurity Professional Certificate",
          "- Google AI Essentials (Professional Certificate)",
          "- GitHub Foundation Certificate",
          "- API Pentesting (APISec University)"
        ],
        "skills.yml": [
          "[+] Decrypting Capability Matrix...",
          "- Vulnerability Analysis: Nessus, CVE Analysis",
          "- Pentesting: Metasploit, Soloris, RedHawk",
          "- Network: Cisco GNS3, VLAN, Subnetting",
          "- OSINT: Google Dorking, Reconnaissance",
          "- Languages: Python (Security Automation), PHP"
        ],
        "education.edu": [
          "[+] Decrypting Academic Records...",
          "- Bachelor's Degree (BCA) - Divya Gyan College",
          "- NEB Class 12th - Kathmandu Bernhardt College",
          "- SEE Class 10th - Laboratory Higher Secondary School"
        ]
      };

      if (dossiers[fileName]) {
        return ["[OK] Access Granted.", ...dossiers[fileName]];
      }
      
      // Check if they forgot the extension but the base name matches
      const baseName = fileName.split('.')[0];
      const validFiles = Object.keys(dossiers);
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
      className="min-h-screen bg-[#050505] p-2 md:p-8 font-mono relative overflow-hidden flex items-center justify-center cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Background Layer */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none grayscale brightness-50 contrast-125"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=2000')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'luminosity'
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#050505] via-transparent to-[#1793d1]/10 pointer-events-none" />
      <div className="scanlines" />
      
      <div className="w-full max-w-5xl h-[85vh] flex flex-col border border-[#1793d1]/30 bg-[#080808]/90 backdrop-blur-sm rounded-lg shadow-[0_0_100px_rgba(23,147,209,0.15)] terminal-glow relative z-10 overflow-hidden">
        
        <div className="bg-[#111] p-3 flex items-center justify-between border-b border-[#1793d1]/20 rounded-t-lg">
          <div className="flex gap-2 ml-2 pr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#1793d1]" />
          </div>
          <div className="flex-1 text-center font-mono">
            <div className="text-[11px] text-[#1793d1] uppercase tracking-widest font-bold inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" /> 
              {USER}@{HOST}
            </div>
          </div>
          <div className="hidden sm:block text-[11px] text-[#1793d1]/80 font-mono font-bold pr-2">
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

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-2 scrollbar-hide">
          <AnimatePresence>
            {history.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                className={`${line.type === 'input' ? 'text-white' : 'text-[#1793d1]/90'} whitespace-pre-wrap flex gap-3`}
              >
                {line.type === 'input' ? (
                  <span className="text-[#1793d1] font-bold">{PROMPT}</span>
                ) : (
                  <div className="text-[#1793d1]/30 mt-1.5 shrink-0"><ChevronRight className="w-3 h-3" /></div>
                )}
                <span className={line.type === 'input' ? 'font-bold' : ''}>{line.content}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <form onSubmit={handleCommand} className="flex items-center gap-3">
            <span className="text-[#1793d1] font-bold whitespace-nowrap">{PROMPT}</span>
            <input
              ref={inputRef} type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-white caret-transparent font-bold"
              autoFocus spellCheck="false" autoComplete="off"
            />
            <motion.div 
              animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2.5 h-5 bg-[#1793d1] shadow-[0_0_10px_#1793d1]"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
