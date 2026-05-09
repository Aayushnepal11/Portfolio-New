import React from 'react';
import { motion } from 'motion/react';

export default function EducationTab() {
  return (
    <div className="space-y-12 pb-20 select-none">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">Scholastic <span className="bg-gradient-to-r from-[#1793d1]/50 to-[#1793d1]/10 bg-clip-text text-transparent">History.</span></h2>
        <p className="text-zinc-500 text-base md:text-lg font-light max-w-xl">A chronological record of academic achievements and foundational training.</p>
      </div>

      <div className="space-y-6">
        {[
          { year: "2019-2025", deg: "Bachelor's Degree (BCA)", inst: "Divya Gyan College", desc: "Specializing in Computer Applications with a focus on system security." },
          { year: "2018", deg: "NEB Class 12th (Management)", inst: "Kathmandu Bernhardt College", desc: "Foundational business and management principles." },
          { year: "2017", deg: "SEE Class 10th", inst: "Laboratory Higher Secondary School", desc: "General secondary education." }
        ].map((ed, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col sm:flex-row sm:gap-12 p-8 rounded-[32px] bg-white/[0.01] border border-white/[0.03] hover:bg-white/[0.03] transition-all group"
          >
            <div className="text-[#1793d1] font-mono text-xs sm:w-32 shrink-0 group-hover:text-[#1793d1]/80 transition-colors mb-2 sm:mb-0 pt-1 font-bold tracking-[0.1em]">{ed.year}</div>
            <div className="space-y-2">
              <h4 className="text-xl md:text-2xl text-white font-display font-bold tracking-tight">{ed.deg}</h4>
              <p className="text-[#1793d1]/60 text-xs font-mono uppercase tracking-widest font-bold">{ed.inst}</p>
              <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-lg mt-4">{ed.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
