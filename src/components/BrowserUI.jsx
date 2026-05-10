import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronLeft, ChevronRight, RotateCw, Home, Search, 
  Terminal as TerminalIcon, ShieldCheck, Mail, Github, 
  Linkedin, Twitter, ExternalLink, User, Briefcase, Code2, 
  Award, GraduationCap, Laptop, Cpu, Menu, X, Monitor
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';

// Tab Components
import SummaryTab from './tabs/SummaryTab';
import ExperienceTab from './tabs/ExperienceTab';
import ProjectsTab from './tabs/ProjectsTab';
import CertsTab from './tabs/CertsTab';
import SkillsTab from './tabs/SkillsTab';
import EducationTab from './tabs/EducationTab';

const SECTIONS = {
  SUMMARY: 'summary',
  EXPERIENCE: 'experience',
  PROJECTS: 'projects',
  SKILLS: 'skills',
  CERTIFICATIONS: 'certifications',
  EDUCATION: 'education'
};

export default function BrowserUI({ onBackToTerminal, onBackToDesktop, hideTerminalButton, isMobile }) {
  const [activeTab, setActiveTab] = useState(SECTIONS.SUMMARY);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const baseLocation = window.location.origin + window.location.pathname;
  const [url, setUrl] = useState(`${baseLocation}${baseLocation.endsWith('/') ? '' : '/'}${SECTIONS.SUMMARY}`);

  const navigate = (id) => {
    setActiveTab(id);
    setUrl(`${baseLocation}${baseLocation.endsWith('/') ? '' : '/'}${id}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full h-screen bg-[#050505] flex flex-col font-sans text-zinc-400 selection:bg-[#1793d1]/30 overflow-hidden">
      {/* Browser Bar - Refined & Responsive */}
      <div className="bg-[#0a0a0a] px-4 md:px-6 py-3 flex items-center gap-4 md:gap-6 border-b border-white/[0.03] z-50">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-zinc-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>

          <Button 
            variant="ghost" 
            size="icon" 
            className="text-zinc-400 hover:text-[#1793d1] hover:bg-[#1793d1]/10 transition-all rounded-lg"
            onClick={onBackToDesktop}
            title="Exit to Desktop"
          >
            <Monitor className="w-5 h-5" />
          </Button>
        </div>
        
        <div className="flex-1 bg-white/[0.02] border border-white/[0.05] rounded-full h-10 px-3 md:px-5 flex items-center gap-2 md:gap-3 text-[10px] md:text-[11px] font-mono tracking-tight text-zinc-500 group hover:border-[#1793d1]/20 transition-all truncate">
          <ShieldCheck className="w-3.5 h-3.5 text-[#1793d1]/60 transition-colors group-hover:text-[#1793d1] shrink-0" />
          <div className="flex items-center gap-1 truncate">
            <span className="opacity-40 select-none hidden xs:inline">https://</span>
            <span className="text-zinc-400 font-medium truncate">{url.replace('https://', '').replace('http://', '')}</span>
          </div>
          <div className="flex-1" />
        </div>

        {!hideTerminalButton && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onBackToTerminal}
            className="text-zinc-500 hover:text-[#1793d1] hover:bg-[#1793d1]/10 font-mono text-[10px] tracking-widest px-3 md:px-4 h-10 rounded-full border border-transparent hover:border-[#1793d1]/20 transition-all uppercase shrink-0 gap-2"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/a/af/Tux.png" 
              alt="Linux" 
              className="w-4 h-4 object-contain brightness-90 group-hover:brightness-100"
              referrerPolicy="no-referrer"
            />
            <span className="hidden md:inline">TERMINAL</span>
          </Button>
        )}
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar - Desktop */}
        <div className="hidden md:flex w-72 bg-[#080808] border-r border-white/[0.03] p-6 flex-col gap-1.5 shrink-0">
          <div className="px-2 mb-10 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative mb-6"
            >
              <div className="w-24 h-24 rounded-[32px] bg-gradient-to-tr from-[#1793d1]/20 via-[#1793d1]/40 to-blue-500/20 p-[1px] shadow-2xl shadow-[#1793d1]/10">
                <div className="w-full h-full bg-[#050505] rounded-[32px] overflow-hidden">
                  <img 
                    src="https://github.com/Aayushnepal11.png" 
                    alt="Aayush Nepal"
                    className="w-full h-full object-cover grayscale opacity-90 transition-all hover:grayscale-0 hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#1793d1] border-4 border-[#080808] shadow-lg shadow-[#1793d1]/50" />
            </motion.div>
            <h1 className="text-white font-display text-xl font-bold tracking-tight">Aayush Nepal</h1>
            <div className="flex items-center gap-2 mt-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#1793d1] animate-pulse" />
              <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-[0.25em]">Cybersecurity & AI</p>
            </div>
          </div>

          <div className="space-y-1">
            <SidebarButton 
              active={activeTab === SECTIONS.SUMMARY} 
              onClick={() => navigate(SECTIONS.SUMMARY)}
              icon={<Home className="w-4 h-4" />}
              label="Overview"
            />
            <SidebarButton 
              active={activeTab === SECTIONS.EXPERIENCE} 
              onClick={() => navigate(SECTIONS.EXPERIENCE)}
              icon={<Briefcase className="w-4 h-4" />}
              label="Experience"
            />
            <SidebarButton 
              active={activeTab === SECTIONS.PROJECTS} 
              onClick={() => navigate(SECTIONS.PROJECTS)}
              icon={<Code2 className="w-4 h-4" />}
              label="Projects"
            />
            <SidebarButton 
              active={activeTab === SECTIONS.CERTIFICATIONS} 
              onClick={() => navigate(SECTIONS.CERTIFICATIONS)}
              icon={<Award className="w-4 h-4" />}
              label="Certifications"
            />
            <SidebarButton 
              active={activeTab === SECTIONS.SKILLS} 
              onClick={() => navigate(SECTIONS.SKILLS)}
              icon={<Laptop className="w-4 h-4" />}
              label="Skills"
            />
            <SidebarButton 
              active={activeTab === SECTIONS.EDUCATION} 
              onClick={() => navigate(SECTIONS.EDUCATION)}
              icon={<GraduationCap className="w-4 h-4" />}
              label="Education"
            />
          </div>

          <div className="mt-auto px-4 py-8 space-y-5 border-t border-white/[0.03]">
            <SocialLink href="https://github.com/Aayushnepal11" icon={<Github className="w-4 h-4" />} label="Aayushnepal11" />
            <SocialLink href="https://www.linkedin.com/in/aayush-nepal-427957302/" icon={<Linkedin className="w-4 h-4" />} label="Aayush Nepal" />
            <SocialLink href="https://twitter.com/AAYUSHN97018184" icon={<Twitter className="w-3.5 h-3.5" />} label="@AAYUSHN97018184" />
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              className="absolute inset-0 bg-[#080808] z-40 p-8 flex flex-col md:hidden"
            >
              <div className="space-y-4 mt-8">
                {Object.entries(SECTIONS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => navigate(value)}
                    className={`w-full text-left p-4 rounded-xl text-lg font-medium tracking-tight ${activeTab === value ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-500'}`}
                  >
                    {value.charAt(0).toUpperCase() + value.slice(1)}
                  </button>
                ))}
              </div>
              
              <div className="mt-auto pt-8 border-t border-white/[0.05] space-y-6">
                <SocialLink href="https://github.com/Aayushnepal11" icon={<Github className="w-5 h-5" />} label="GitHub: Aayushnepal11" />
                <SocialLink href="https://www.linkedin.com/in/aayush-nepal-427957302/" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn: Aayush Nepal" />
                <SocialLink href="https://twitter.com/AAYUSHN97018184" icon={<Twitter className="w-5 h-5" />} label="X: @AAYUSHN97018184" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Area - Refined Typography and Spacing */}
        <div className="flex-1 bg-[#050505] overflow-hidden relative">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.03),transparent_50%)] pointer-events-none" />
          <ScrollArea className="h-full w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="p-6 md:p-16 w-full max-w-6xl mx-auto"
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
        flex items-center gap-3 w-full px-4 py-3 rounded-xl text-[13px] font-medium tracking-tight transition-all duration-300 group relative
        ${active 
          ? 'text-white' 
          : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/[0.02]'
        }
      `}
    >
      {active && (
        <motion.div 
          layoutId="sidebar-active"
          className="absolute inset-0 bg-white/[0.03] border border-white/[0.05] rounded-xl"
          transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
        />
      )}
      <div className={`relative z-10 p-1.5 rounded-lg transition-colors ${active ? 'text-[#1793d1] bg-[#1793d1]/10' : 'text-zinc-600 group-hover:text-zinc-400'}`}>
        {React.cloneElement(icon, { size: 16 })}
      </div>
      <span className="relative z-10">{label}</span>
      {active && (
        <div className="absolute right-4 w-1 h-1 rounded-full bg-[#1793d1] shadow-[0_0_8px_#1793d1] relative z-10" />
      )}
    </button>
  );
}

function SocialLink({ href, icon, label }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 text-zinc-600 hover:text-[#1793d1] transition-all cursor-pointer group">
      <div className="w-8 h-8 rounded-lg bg-zinc-900/50 flex items-center justify-center border border-white/[0.05] group-hover:border-[#1793d1]/20 group-hover:bg-[#1793d1]/5">
        {icon}
      </div>
      <span className="text-[11px] font-medium tracking-tight">{label}</span>
    </a>
  );
}
