import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Cpu, ShieldCheck } from 'lucide-react';

export default function SummaryTab() {
  return (
    <div className="space-y-12 select-none">
      <div className="space-y-6">
        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">
          Dossier 01 // Overview
        </Badge>
        <h2 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tighter leading-[0.95]">
          Securing the <br />
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Digital Frontier.</span>
        </h2>
        <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl font-light">
          Passionate about <span className="text-white font-medium border-b border-emerald-500/30">Cybersecurity and Python</span>. 
          Specializing in secure infrastructure, rigorous penetration tests, 
          and developing specialized security tooling. Committed to joining 
          forward-thinking organizations where expertise meets impact.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-12">
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05] space-y-4 hover:bg-white/[0.04] transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center transition-colors group-hover:bg-emerald-500/20">
            <Cpu className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-white font-display text-xl font-bold tracking-tight">Python Specialist</h3>
          <p className="text-sm text-zinc-500 leading-loose">Developing high-performance CLI tools for automation, port-scanning, web-enumeration, and advanced code injection analysis.</p>
        </div>
        <div className="p-8 rounded-[32px] bg-white/[0.02] border border-white/[0.05] space-y-4 hover:bg-white/[0.04] transition-all group">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 flex items-center justify-center transition-colors group-hover:bg-cyan-500/20">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
          </div>
          <h3 className="text-white font-display text-xl font-bold tracking-tight">Network Defense</h3>
          <p className="text-sm text-zinc-500 leading-loose">Proficient in Cisco GNS3 emulation, secure VLAN segmentation, and complex Inter-VLAN routing protocols for enterprise environments.</p>
        </div>
      </div>
    </div>
  );
}
