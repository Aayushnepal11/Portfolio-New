import React from 'react';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Code2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function ProjectsTab() {
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
    <div className="space-y-12 pb-20 select-none">
       <div className="space-y-4">
         <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full">Secure Archive</Badge>
         <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">Security <span className="text-zinc-500">Artifacts.</span></h2>
         <p className="text-zinc-500 text-base md:text-lg font-light max-w-xl">A technical database of developed tools, security implementations, and cryptographic projects.</p>
       </div>

       <div className="grid grid-cols-1 gap-8">
        {projects.map((p, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 md:p-10 rounded-[32px] bg-white/[0.02] border border-white/[0.05] hover:border-emerald-500/30 transition-all duration-500 group relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Code2 className="w-32 h-32 text-emerald-500" />
            </div>
            
            <div className="relative z-10 flex justify-between items-start mb-6">
              <div className="space-y-1">
                <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-emerald-400 transition-colors">{p.name}</h3>
                <p className="text-[10px] text-emerald-500/60 font-mono uppercase tracking-[0.2em] font-bold">{p.role}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/[0.05] flex items-center justify-center border border-white/[0.1] group-hover:border-emerald-500/40 group-hover:bg-emerald-500/10 transition-all">
                <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-emerald-400" />
              </div>
            </div>

            <p className="relative z-10 text-zinc-400 mb-10 leading-relaxed font-light max-w-2xl">{p.desc}</p>
            
            <div className="relative z-10 flex flex-wrap gap-2">
              {p.tags.map(t => (
                <Badge key={t} variant="secondary" className="bg-emerald-500/5 hover:bg-emerald-500/10 border border-emerald-500/10 text-emerald-500/70 font-mono text-[10px] px-3 py-1 rounded-full transition-colors">
                  {t}
                </Badge>
              ))}
            </div>
          </motion.div>
        ))}
       </div>
    </div>
  );
}
