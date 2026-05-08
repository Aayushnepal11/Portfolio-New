import React from 'react';
import { Badge } from '@/components/ui/badge';
import { motion } from 'motion/react';

export default function SkillsTab() {
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
    <div className="space-y-12 pb-20 select-none">
        <div className="space-y-4">
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">Capability Matrix</Badge>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">System <span className="text-zinc-500">Capabilities.</span></h2>
          <p className="text-zinc-500 text-base md:text-lg font-light max-w-xl">A mapped landscape of technical expertise, security tools, and operational proficiencies.</p>
        </div>

        <div className="space-y-4">
          {skills.map((s, i) => (
             <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-[32px] bg-white/[0.01] border border-white/[0.03] flex flex-col sm:flex-row gap-4 sm:gap-12 sm:items-center hover:bg-white/[0.03] hover:border-emerald-500/20 transition-all duration-500 group"
             >
                <div className="sm:w-48 shrink-0">
                  <span className="text-emerald-500 font-bold group-hover:text-emerald-400 transition-colors uppercase text-xs tracking-[0.2em]">{s.area}</span>
                  <div className="h-0.5 w-8 bg-emerald-500/20 mt-1 group-hover:w-12 transition-all duration-500" />
                </div>
                <p className="text-[15px] text-zinc-500 leading-relaxed font-light group-hover:text-zinc-400 transition-colors">{s.detail}</p>
             </motion.div>
          ))}
        </div>
    </div>
  );
}
