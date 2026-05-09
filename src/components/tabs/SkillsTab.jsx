import React from 'react';
import { motion } from 'motion/react';
import { 
  Radar, RadarChart, PolarGrid, 
  PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer 
} from 'recharts';

export default function SkillsTab() {
  const chartData = [
    { area: "Nessus", A: 85 },
    { area: "Linux/OS", A: 90 },
    { area: "Exploitation", A: 75 },
    { area: "OSINT", A: 80 },
    { area: "Active Directory", A: 70 },
    { area: "Cloud Sec", A: 82 },
    { area: "Security Dev", A: 78 }
  ];

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
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">System Proficiency <span className="text-[#1793d1]/50">Map.</span></h2>
          <p className="text-zinc-400 text-base md:text-lg font-light max-w-xl">A technical analysis of security domain expertise and operational readiness.</p>
        </div>

        {/* Radar Chart Section */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] bg-white/[0.02] border border-white/[0.05] rounded-[40px] p-4 md:p-8 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(23,147,209,0.05),transparent)] pointer-events-none" />
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
              <PolarGrid stroke="#ffffff10" />
              <PolarAngleAxis dataKey="area" tick={{ fill: '#71717a', fontSize: 10, fontWeight: '500' }} />
              <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
              <Radar
                name="Proficiency"
                dataKey="A"
                stroke="#1793d1"
                fill="#1793d1"
                fillOpacity={0.3}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {skills.map((s, i) => (
             <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-[32px] bg-white/[0.01] border border-white/[0.03] flex flex-col sm:flex-row gap-4 sm:gap-12 sm:items-center hover:bg-white/[0.03] hover:border-[#1793d1]/20 transition-all duration-500 group"
             >
                <div className="sm:w-48 shrink-0">
                  <span className="text-[#1793d1] font-bold group-hover:text-[#1793d1]/80 transition-colors uppercase text-xs tracking-[0.2em]">{s.area}</span>
                  <div className="h-0.5 w-8 bg-[#1793d1]/20 mt-1 group-hover:w-12 transition-all duration-500" />
                </div>
                <p className="text-[15px] text-zinc-400 leading-relaxed font-light group-hover:text-zinc-300 transition-colors">{s.detail}</p>
             </motion.div>
          ))}
        </div>
    </div>
  );
}
