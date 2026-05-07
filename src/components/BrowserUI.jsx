import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, RotateCw, Home, Search, 
  Terminal as TerminalIcon, ShieldCheck, Mail, Github, 
  Linkedin, ExternalLink, User, Briefcase, Code2, 
  Award, GraduationCap, Laptop, Cpu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

const SECTIONS = {
  SUMMARY: 'summary',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CERTIFICATIONS: 'certifications',
  EDUCATION: 'education'
};

export default function BrowserUI({ onBackToTerminal }) {
  const [activeTab, setActiveTab] = useState(SECTIONS.SUMMARY);
  const baseLocation = window.location.origin + window.location.pathname;
  const [url, setUrl] = useState(`${baseLocation}${baseLocation.endsWith('/') ? '' : '/'}${SECTIONS.SUMMARY}`);

  const navigate = (id) => {
    setActiveTab(id);
    setUrl(`${baseLocation}${baseLocation.endsWith('/') ? '' : '/'}${id}`);
  };

  return (
    <div className="w-full max-w-6xl h-[90vh] bg-[#121212] border border-white/10 rounded-xl overflow-hidden shadow-2xl flex flex-col font-sans text-zinc-300">
      {/* Browser Bar */}
      <div className="bg-[#1a1a1a] p-3 flex items-center gap-4 border-b border-white/5">
        <div className="flex gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
          <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
        </div>
        
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white/5 text-zinc-500">
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white/5 text-zinc-500">
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full hover:bg-white/5 text-zinc-500">
            <RotateCw className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 bg-[#0a0a0a] border border-white/10 rounded-lg h-9 px-4 flex items-center gap-2 text-xs font-mono text-zinc-500">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
          <span className="opacity-60">https://</span>
          <span className="text-zinc-300">{url.replace('http://', '')}</span>
          <div className="flex-1" />
          <RotateCw className="w-3 h-3 opacity-40" />
        </div>

        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBackToTerminal}
          className="border-emerald-500/20 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500 hover:text-black font-mono text-xs"
        >
          <TerminalIcon className="w-3.5 h-3.5 mr-2" /> EXIT_GUI
        </Button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#161616] border-r border-white/5 p-4 flex flex-col gap-1">
          <div className="px-3 mb-6 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-500 to-cyan-500 p-0.5 mb-4">
              <div className="w-full h-full bg-[#121212] rounded-2xl flex items-center justify-center">
                <User className="w-10 h-10 text-emerald-500" />
              </div>
            </div>
            <h1 className="text-white font-bold tracking-tight">Aayush Nepal</h1>
            <p className="text-[10px] text-emerald-500 font-mono uppercase tracking-[0.2em] mt-1">Cyber Security Pro</p>
          </div>

          <SidebarButton 
            active={activeTab === SECTIONS.SUMMARY} 
            onClick={() => navigate(SECTIONS.SUMMARY)}
            icon={<Home className="w-4 h-4" />}
            label="System Summary"
          />
          <SidebarButton 
            active={activeTab === SECTIONS.EXPERIENCE} 
            onClick={() => navigate(SECTIONS.EXPERIENCE)}
            icon={<Briefcase className="w-4 h-4" />}
            label="Work History"
          />
          <SidebarButton 
            active={activeTab === SECTIONS.PROJECTS} 
            onClick={() => navigate(SECTIONS.PROJECTS)}
            icon={<Code2 className="w-4 h-4" />}
            label="Binary Artifacts"
          />
          <SidebarButton 
            active={activeTab === SECTIONS.CERTIFICATIONS} 
            onClick={() => navigate(SECTIONS.CERTIFICATIONS)}
            icon={<Award className="w-4 h-4" />}
            label="Credentials"
          />
          <SidebarButton 
            active={activeTab === SECTIONS.SKILLS} 
            onClick={() => navigate(SECTIONS.SKILLS)}
            icon={<Laptop className="w-4 h-4" />}
            label="Weaponry (Skills)"
          />
          <SidebarButton 
            active={activeTab === SECTIONS.EDUCATION} 
            onClick={() => navigate(SECTIONS.EDUCATION)}
            icon={<GraduationCap className="w-4 h-4" />}
            label="Academic logs"
          />

          <div className="mt-auto px-4 py-8 space-y-4">
            <div className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <Github className="w-4 h-4" /> <span className="text-xs">Aayushnepal11</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <Linkedin className="w-4 h-4" /> <span className="text-xs">aayush-nepal</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-500 hover:text-white transition-colors cursor-pointer">
              <Mail className="w-4 h-4" /> <span className="text-xs text-[10px]">nepalaayush88@gmail.com</span>
            </div>
          </div>
        </div>

        {/* Browser Content */}
        <div className="flex-1 bg-[#0a0a0a] overflow-hidden relative">
          <ScrollArea className="h-full w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-10 max-w-4xl mx-auto"
              >
                {activeTab === SECTIONS.SUMMARY && <SummaryTab />}
                {activeTab === SECTIONS.EXPERIENCE && <ExperienceTab />}
                {activeTab === SECTIONS.PROJECTS && <ProjectsTab />}
                {activeTab === SECTIONS.CERTIFICATIONS && <CertsTab />}
                {activeTab === SECTIONS.SKILLS && <SkillsTab />}
                {activeTab === SECTIONS.EDUCATION && <EducationTab />}
              </motion.div>
            </AnimatePresence>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all group
        ${active ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-300'}
      `}
    >
      <div className={`${active ? 'text-emerald-500' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
        {icon}
      </div>
      {label}
    </button>
  );
}

function SummaryTab() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Badge className="bg-emerald-500/10 text-emerald-500 border-none px-3 py-1 text-[10px] tracking-widest uppercase">Overview</Badge>
        <h2 className="text-4xl font-bold text-white tracking-tight">Securing the digital <br /><span className="text-emerald-500">frontier.</span></h2>
        <p className="text-lg text-zinc-400 leading-relaxed max-w-2xl">
          Deeply passionate about <span className="text-white font-medium">Cybersecurity and Python</span>. 
          I specialize in building secure infrastructure, conducting rigorous penetration tests, 
          and developing specialized security tooling. I intent to join a forward-thinking 
          organization where I can apply my expertise to contribute to real-world security solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-12">
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
          <Cpu className="w-6 h-6 text-emerald-500" />
          <h3 className="text-white font-bold">Python Specialist</h3>
          <p className="text-xs text-zinc-500">Developing CLI tools for automation, port-scanning, web-enumeration, and code injection analysis.</p>
        </div>
        <div className="p-6 rounded-2xl bg-[#121212] border border-white/5 space-y-3">
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
          <h3 className="text-white font-bold">Network Expert</h3>
          <p className="text-xs text-zinc-500">Proficient in Cisco GNS3 emulation, VLAN segmentation, and Inter-VLAN routing protocols.</p>
        </div>
      </div>
    </div>
  );
}

function ExperienceTab() {
  const data = [
    {
      title: "Computer Network Instructor",
      comp: "Educational Institute",
      date: "Mar 2025 - Jul 2025",
      points: [
        "Simulated core protocols (SSH, HTTP, SNMP) via GNS3.",
        "Guided students on Cisco Configuration (FLSM, VLSM, CIDR notation).",
        "Instructed security tools: Kali Linux, XG Firewalls, Burp Suite."
      ]
    },
    {
      title: "Freelance Full-Stack Developer",
      comp: "Self-Employed",
      date: "Apr 2023 - May 2023",
      points: [
        "Architected Django applications for email data visualization.",
        "Engineered Gmail API integrations for secure metadata analysis.",
        "Collaborated via Git/GitHub for synchronized deployment."
      ]
    },
    {
      title: "PHP Developer",
      comp: "Web Tech",
      date: "Sep 2022 - Mar 2023",
      points: [
        "Implemented Incremental SDLC for dynamic web applications.",
        "Engineered responsive frontends using HTML5, SCSS, and Bootstrap.",
        "Managed branch strategies for iterative feature rollout."
      ]
    }
  ];

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-white tracking-tight border-b border-white/5 pb-4">Professional Dossier</h2>
      <div className="space-y-10 relative before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-px before:bg-white/10 ml-2">
        {data.map((item, i) => (
          <div key={i} className="relative pl-8 group">
            <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-emerald-500 group-hover:shadow-[0_0_8px_#10b981] transition-all" />
            <div className="text-emerald-500 font-mono text-[10px] uppercase mb-1">{item.date}</div>
            <h3 className="text-lg font-bold text-white">{item.title}</h3>
            <p className="text-zinc-500 text-sm mb-4 font-medium">{item.comp}</p>
            <ul className="space-y-2">
              {item.points.map((p, j) => (
                <li key={j} className="text-xs text-zinc-400 leading-relaxed">• {p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProjectsTab() {
  const projects = [
    {
      name: "Network Monitor App",
      tags: ["Python", "Django", "Nmap", "React"],
      desc: "Built to observe and report on network activity, featuring integrated Nmap for detailed port scanning.",
      role: "Lead security developer"
    },
    {
      name: "E-Commerce Security",
      tags: ["Django", "MySQL", "Authz"],
      desc: "Full-functional platform with robust user authentication, authorization, and secure payment integrations.",
      role: "Full-Stack Security Dev"
    }
  ];

  return (
    <div className="space-y-12">
       <h2 className="text-3xl font-bold text-white tracking-tight">Security Artifacts</h2>
       <div className="grid grid-cols-1 gap-6">
        {projects.map((p, i) => (
          <div key={i} className="p-8 rounded-3xl bg-[#121212] border border-white/10 hover:border-emerald-500/40 transition-all group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white group-hover:text-emerald-500 transition-colors">{p.name}</h3>
              <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-emerald-500" />
            </div>
            <p className="text-sm text-zinc-400 mb-6">{p.desc}</p>
            <div className="flex gap-2">
              {p.tags.map(t => <Badge key={t} variant="secondary" className="bg-white/5 border-none text-zinc-500 font-mono text-[10px]">{t}</Badge>)}
            </div>
          </div>
        ))}
       </div>
    </div>
  );
}

function CertsTab() {
  const certs = [
    "ISC2 - Certified In Cyber Security (CC)",
    "Google Cybersecurity Professional Certificate",
    "Google AI Essentials (Professional Certificate)",
    "Microsoft Azure (AZ-900) Azure Fundamentals",
    "GitHub Foundation Certificate",
    "API Pentesting (APISec University)",
    "Practical Ethical Hacking (TCM Security)",
    "CompTIA Network+ (Udemy)",
    "Network Security Specialist (Coursera)",
    "Wireshark packet analysis mastery",
    "ICCA (Cloud Associate - INE)",
    "AI for Everybody (DeepLearning.AI)",
    "TryHackMe - SEC1 (Cyber Security 101)",
    "TryHackMe - SEC0 (Pre Security)"
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-white tracking-tight">Verified Credentials</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {certs.map((c, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 text-xs text-zinc-300 font-medium hover:bg-emerald-500/5 hover:border-emerald-500/20 transition-all">
            <Award className="w-4 h-4 text-emerald-500 shrink-0" />
            {c}
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsTab() {
  const skills = [
    { area: "Nessus", detail: "Vulnerability scanning, CVE analysis, risk mitigation." },
    { area: "Termux/Linux", detail: "Hands-on pentesting using Soloris and RedHawk." },
    { area: "Metasploit", detail: "Exploiting vulns (EternalBlue), access control mechanisms." },
    { area: "OSINT", detail: "Google Dorking, reconnaissance, target information gathering." },
    { area: "Active Directory", detail: "Enumeration using Mimikatz in controlled labs." },
    { area: "Cloud Security", detail: "GCP/Azure IAM, Security Groups, S3/Bucket hardening." },
    { area: "Python", detail: "Security automation, CLI tool development, port-scanning." }
  ];

  return (
    <div className="space-y-8">
        <h2 className="text-3xl font-bold text-white tracking-tight">System Capabilities</h2>
        <div className="space-y-4">
          {skills.map((s, i) => (
             <div key={i} className="p-6 rounded-2xl bg-[#121212] border border-white/5 flex flex-col md:flex-row gap-4 items-baseline">
                <span className="text-emerald-500 font-bold w-40 shrink-0">{s.area}</span>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.detail}</p>
             </div>
          ))}
        </div>
    </div>
  );
}

function EducationTab() {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-white tracking-tight">Academic Records</h2>
      <div className="space-y-8">
        {[
          { year: "2019-2025", deg: "Bachelor's Degree (BCA)", inst: "Divya Gyan College" },
          { year: "2018", deg: "NEB Class 12th (Management)", inst: "Kathmandu Bernhardt College" },
          { year: "2017", deg: "SEE Class 10th", inst: "Laboratory Higher Secondary School" }
        ].map((ed, i) => (
          <div key={i} className="flex gap-8 group">
            <div className="text-emerald-500/40 font-mono text-sm w-32 shrink-0 group-hover:text-emerald-500 transition-colors">{ed.year}</div>
            <div className="space-y-1">
              <h4 className="text-white font-bold">{ed.deg}</h4>
              <p className="text-zinc-500 text-sm">{ed.inst}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
