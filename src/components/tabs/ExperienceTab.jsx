import React from 'react';
import { motion } from 'motion/react';

export default function ExperienceTab() {
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
    <div className="space-y-12 pb-20 select-none">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">Career <span className="bg-gradient-to-r from-[#1793d1]/50 to-[#1793d1]/10 bg-clip-text text-transparent">Trajectory.</span></h2>
        <p className="text-zinc-500 text-base md:text-lg font-light max-w-xl">A detailed trajectory of professional roles, instructor experience, and technical contributions.</p>
      </div>

      <div className="space-y-10 relative before:content-[''] before:absolute before:left-0 md:before:left-4 before:top-2 before:bottom-0 before:w-px before:bg-white/[0.05] ml-2">
        {data.map((item, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="relative pl-10 md:pl-16 group"
          >
            <div className="absolute left-[-4px] md:left-[12px] top-2 w-2 h-2 rounded-full bg-[#1793d1]/20 border border-[#1793d1]/40 group-hover:bg-[#1793d1] group-hover:shadow-[0_0_15px_#1793d1] transition-all duration-500" />
            
            <div className="flex flex-col space-y-2">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-[#1793d1] transition-colors">{item.title}</h3>
                <span className="text-[#1793d1]/60 font-mono text-[10px] md:text-xs uppercase tracking-widest font-bold bg-[#1793d1]/5 px-3 py-1 rounded-full border border-[#1793d1]/10 self-start md:self-auto">{item.date}</span>
              </div>
              <p className="text-[#1793d1]/60 text-xs font-mono uppercase tracking-[0.2em] font-bold mb-4">{item.comp}</p>
              
              <ul className="grid grid-cols-1 gap-3 mt-4">
                {item.points.map((p, j) => (
                  <li key={j} className="text-[13px] text-zinc-500 leading-relaxed font-light flex gap-3">
                    <span className="text-[#1793d1]/20 shrink-0 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">▹</span>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
