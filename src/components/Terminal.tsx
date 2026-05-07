import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TerminalSquare, ShieldCheck, HardDrive, Cpu, Globe, ChevronRight } from 'lucide-react';

const USER = "aayush";
const HOST = "crypt-node";
const PROMPT = `${USER}@${HOST}:~$ `;

export default function Terminal({ onLaunchGUI }) {
  const [history, setHistory] = useState([
    { type: 'output', content: "SYSTEM BOOTSTRAP COMPLETE. BIOS VER 4.2.1-AN" },
    { type: 'output', content: "Aayush Nepal's secure dossier decrypted and ready." },
    { type: 'output', content: "Type 'help' for system directives or 'gui' for visual interface." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const COMMANDS = {
    help: () => [
      "SYSTEM ACCESS GRANTED. AVAILABLE COMMANDS:",
      "  whoami       - Subject identity & professional summary",
      "  ls           - List available dossiers (experience, etc)",
      "  cat <file>   - Decrypt and read dossier contents",
      "  gui          - LAUNCH PROFESSIONAL VISUAL INTERFACE (Virtual Browser)",
      "  clear        - Flush terminal buffer",
      "  neofetch     - Subject environment summary",
      "  contact      - Secure comms channels"
    ],
    whoami: () => [
      "IDENTITY: Aayush Nepal",
      "PROFESSION: Cybersecurity Researcher & Python Developer",
      "MISSION: Contributing expertise to high-impact security solutions."
    ],
    ls: () => ["experience", "projects", "certifications", "skills", "education"],
    gui: () => {
      onLaunchGUI();
      return ["[!] Initializing GUI..."];
    },
    neofetch: () => [
      "          _              OS: AayushOS v2.0",
      "      _--' '--_          User: Aayush Nepal",
      "     |_________|         Location: Kathmandu, Nepal",
      "      |  _ _  |          Shell: React / Vite",
      "      | | | | |          Uptime: 100% Passion",
      "      |_|_|_|_|          Focus: Offensive Sec / Cloud"
    ],
    contact: () => [
      "SECURE CHANNELS:",
      "Email: nepalaayush88@gmail.com",
      "Phone: +977.9861001374",
      "LinkedIn: aayush-nepal"
    ],
    cat: (args) => {
      const file = args[0]?.toLowerCase();
      if (!file) return ["Error: Argument missing."];
      
      const dossiers = {
        experience: [
          "[+] Decrypting Experience Dossier...",
          "- Computer Network Instructor (2025)",
          "- Freelance Full-Stack Developer (2023)",
          "- PHP Developer (2022)"
        ],
        projects: [
          "[+] Decrypting Project Artifacts...",
          "- Network Monitor App (Python/Django/Nmap)",
          "- E-Commerce Security (Django/MySQL/Authz)",
          "- Secure Email Meta-Analysis (Gmail API)"
        ],
        certifications: [
          "[+] Decrypting Credentials...",
          "- ISC2 - Certified In Cyber Security (CC)",
          "- Google Cybersecurity Professional Certificate",
          "- Google AI Essentials (Professional Certificate)",
          "- Microsoft Azure (AZ-900) Fundamentals",
          "- GitHub Foundation Certificate",
          "- Practical Ethical Hacking (TCM Security)"
        ],
        certs: [
          "[+] Decrypting Credentials...",
          "- ISC2 - Certified In Cyber Security (CC)",
          "- Google Cybersecurity Professional Certificate",
          "- Google AI Essentials (Professional Certificate)",
          "- Microsoft Azure (AZ-900) Fundamentals",
          "- GitHub Foundation Certificate",
          "- Practical Ethical Hacking (TCM Security)"
        ],
        skills: [
          "[+] Decrypting Capability Matrix...",
          "- Vulnerability Analysis: Nessus, CVE Analysis",
          "- Pentesting: Metasploit, Soloris, RedHawk",
          "- Network: Cisco GNS3, VLAN, Subnetting",
          "- OSINT: Google Dorking, Reconnaissance",
          "- Languages: Python (Security Automation), PHP"
        ],
        education: [
          "[+] Decrypting Academic Records...",
          "- Bachelor's Degree (BCA) - Divya Gyan College",
          "- NEB Class 12th - Kathmandu Bernhardt College",
          "- SEE Class 10th - Laboratory Higher Secondary School"
        ]
      };

      if (dossiers[file]) return ["[OK] Access Granted.", ...dossiers[file]];
      return [`Error: Access denied. Dossier '${file}' not found.`];
    }
  };

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
      newHistory.push({ type: 'output', content: `sh: command not found: ${cmd}` });
    }

    setHistory(newHistory);
    setInput("");
  };

  return (
    <div 
      className="min-h-screen bg-[#050505] p-2 md:p-8 font-mono relative overflow-hidden flex items-center justify-center cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="scanlines" />
      
      <div className="w-full max-w-5xl h-[85vh] flex flex-col border border-emerald-500/10 bg-[#080808]/90 rounded-lg shadow-[0_0_50px_rgba(16,185,129,0.05)] terminal-glow relative z-10">
        
        <div className="bg-[#111] p-3 flex items-center justify-between border-b border-white/5 rounded-t-lg">
          <div className="flex gap-2 ml-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]/60" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]/60" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]/60" />
          </div>
          <div className="text-[10px] text-emerald-500/40 uppercase tracking-widest font-bold">
            <TerminalSquare className="w-3.5 h-3.5 inline mr-2" /> SSH@AAYUSH_CORE
          </div>
          <div className="w-16" />
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-2 scrollbar-hide">
          <AnimatePresence>
            {history.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                className={`${line.type === 'input' ? 'text-emerald-500' : 'text-emerald-500/70'} whitespace-pre-wrap flex gap-3`}
              >
                {line.type === 'input' ? (
                  <span className="opacity-40">{PROMPT}</span>
                ) : (
                  <div className="opacity-20 mt-1.5 shrink-0"><ChevronRight className="w-3 h-3" /></div>
                )}
                <span>{line.content}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <form onSubmit={handleCommand} className="flex items-center gap-3">
            <span className="opacity-40 group-hover:opacity-100 transition-opacity whitespace-nowrap">{PROMPT}</span>
            <input
              ref={inputRef} type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-emerald-500 caret-transparent"
              autoFocus spellCheck="false" autoComplete="off"
            />
            <motion.div 
              animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2.5 h-5 bg-emerald-500 shadow-[0_0_8px_#10b981]"
            />
          </form>
        </div>

        <div className="bg-[#0a0a0a] border-t border-white/5 p-2.5 px-8 flex justify-between items-center text-[9px] uppercase font-bold text-emerald-500/30">
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><HardDrive className="w-3 h-3" /> DRIVE: SECURE_NVME</span>
            <span className="flex items-center gap-2"><Cpu className="w-3 h-3" /> CORES: 16 (ACTIVE)</span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-2"><Globe className="w-3 h-3" /> SYNC: GLOBAL</span>
            <span className="text-emerald-500/60 transition-colors">VER: 0x2A1F</span>
          </div>
        </div>
      </div>
    </div>
  );
}
