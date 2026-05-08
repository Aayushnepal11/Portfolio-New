import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal as TerminalIcon, TerminalSquare, ShieldCheck, HardDrive, Cpu, Globe, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const USER = "aayush";
const HOST = "10.10.10.20";
const PROMPT = "aayush@10.10.10.20 ~ > ";

export default function Terminal({ onLaunchGUI }) {
  const [history, setHistory] = useState([
    { type: 'output', content: "SYSTEM 0x42: BOOTSTRAP COMPLETE" },
    { type: 'input', content: "ssh aayush@10.10.10.20 -i key.pem" },
    { type: 'output', content: "Authenticated with public key \"key.pem\"." },
    { type: 'output', content: "Last login: Fri May 08 00:45:12 2026 from 192.168.1.105" },
    { type: 'output', content: "Welcome to fish, the friendly interactive shell" },
    { type: 'output', content: "Type 'help' for system directives or 'gui' for visual interface." }
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  const COMMANDS = {
    help: () => [
      "FISH SHELL HELP SYSTEM:",
      "  GENERAL:",
      "    whoami       - Subject identity & professional summary",
      "    ls           - List available dossiers (experience, etc)",
      "    cat <file>   - Decrypt and read dossier contents",
      "    gui          - LAUNCH PROFESSIONAL VISUAL INTERFACE",
      "    clear        - Flush terminal buffer",
      "    neofetch     - Subject environment summary",
      "    contact      - Secure comms channels"
    ],
    whoami: () => [
      "IDENTITY: Aayush Nepal",
      "PROFESSION: Cybersecurity Researcher & Python Developer",
      "MISSION: Contributing expertise to high-impact security solutions."
    ],
    ls: () => ["experience.log", "projects.db", "certifications.txt", "skills.yml", "education.edu"],
    gui: () => {
      onLaunchGUI();
      return ["[!] Initializing GUI..."];
    },
    neofetch: () => [
      "          _              OS: AayushOS v2.0",
      "      _--' '--_          User: aayush",
      "     |_________|         Host: 10.10.10.20",
      "      |  _ _  |          Kernel: 6.5.0-security-an",
      "      | | | | |          Uptime: 100% Passion",
      "      |_|_|_|_|          Shell: Fish-Shell / React"
    ],
    contact: () => [
      "SECURE CHANNELS:",
      "Email: nepalaayush88@gmail.com",
      "Phone: +977.9861001374",
      "LinkedIn: aayush-nepal-427957302",
      "X (Twitter): @AAYUSHN97018184"
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
      <div className="scanlines" />
      
      <div className="w-full max-w-5xl h-[85vh] flex flex-col border border-cyan-500/20 bg-[#080808]/98 rounded-lg shadow-[0_0_60px_rgba(34,211,238,0.1)] terminal-glow relative z-10">
        
        <div className="bg-[#111] p-3 flex items-center justify-between border-b border-white/5 rounded-t-lg">
          <div className="flex gap-2 ml-2 pr-4">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <div className="flex-1 text-center">
            <div className="text-[11px] text-cyan-400 uppercase tracking-widest font-bold inline-flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5" /> 
              aayush@10.10.10.20: SSH_SESSION
            </div>
          </div>
          <div className="hidden sm:block text-[11px] text-cyan-400 font-mono font-bold pr-2">
            {formattedDateTime}
          </div>
        </div>

        <div className="block md:hidden absolute inset-0 z-50 bg-[#080808]/95 backdrop-blur-md flex flex-col items-center justify-center p-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
            <TerminalIcon className="w-8 h-8 text-cyan-400" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white tracking-tight">Console Restricted</h2>
            <p className="text-xs text-zinc-500 leading-relaxed max-w-[240px]">
              The secure terminal interface is exclusive to desktop and tablet environments. 
              Please launch the GUI for full mobile access.
            </p>
          </div>
          <Button 
            onClick={onLaunchGUI}
            className="bg-cyan-500 text-black hover:bg-cyan-400 font-bold px-8 h-12 rounded-xl text-xs tracking-widest"
          >
            LAUNCH VISUAL GUI
          </Button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-1.5 scrollbar-hide">
          <AnimatePresence>
            {history.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }}
                className={`${line.type === 'input' ? 'text-cyan-300' : 'text-cyan-400/90'} whitespace-pre-wrap flex gap-3`}
              >
                {line.type === 'input' ? (
                  <span className="text-cyan-500 font-bold">{PROMPT}</span>
                ) : (
                  <div className="text-cyan-500/40 mt-1.5 shrink-0"><ChevronRight className="w-3 h-3" /></div>
                )}
                <span className={line.type === 'input' ? 'font-bold' : ''}>{line.content}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <form onSubmit={handleCommand} className="flex items-center gap-3">
            <span className="text-cyan-500 font-bold whitespace-nowrap">{PROMPT}</span>
            <input
              ref={inputRef} type="text" value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-transparent border-none outline-none text-cyan-300 caret-transparent font-bold"
              autoFocus spellCheck="false" autoComplete="off"
            />
            <motion.div 
              animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-2.5 h-5 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
