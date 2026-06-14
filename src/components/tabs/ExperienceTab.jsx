import React from 'react';
import { motion } from 'motion/react';

export default function ExperienceTab() {
  const data = [
    {
      title: "Computer Network Instructor (TA)",
      comp: "Divya Gyan College",
      date: "2024 – 2025",
      desc: "Assisted in academic and practical network administration teaching",
      points: [
        "Assisted in teaching computer networking concepts, including TCP/IP, routing, and security fundamentals.",
        "Guided students in practical labs and hands-on security tasks.",
        "Helped develop curriculum content focused on network defense and monitoring."
      ]
    },
    {
      title: "Network Penetration Tester",
      comp: "Divya Gyan College",
      date: "2023 – 2024",
      desc: "Conducted institutional network assessment and remediation planning",
      points: [
        "Performed penetration testing on institutional networks, including web applications and Active Directory.",
        "Discovered misconfigurations and privilege escalation opportunities in Linux and Windows servers.",
        "Prepared detailed security assessment reports with remediation steps."
      ]
    },
    {
      title: "Information Security Officer",
      comp: "One Cover Pvt. Ltd.",
      date: "2022 – 2023",
      desc: "Managed endpoint protection and real-time threat analysis",
      points: [
        "Managed Kaspersky Cloud Security Suite for enterprise security monitoring and endpoint protection.",
        "Implemented fraud detection measures to protect digital assets and customer data.",
        "Conducted vulnerability assessments and recommended mitigation strategies."
      ]
    },
    {
      title: "PHP Developer & Application Security Intern",
      comp: "Divya Gyan College",
      date: "2021 – 2022",
      desc: "Developed applications with strict focus on secure SDLC integration",
      points: [
        "Developed PHP applications with a focus on secure coding practices.",
        "Assisted in conducting application security assessments to identify vulnerabilities.",
        "Implemented fixes for SQL injection, XSS, and authentication flaws."
      ]
    },
    {
      title: "PHP Developer Intern",
      comp: "Iners Tech",
      date: "2019 – 2021",
      desc: "Built foundational programming modules and logic validations",
      points: [
        "Developed PHP applications with a focus on secure coding practices.",
        "Implemented logic validations and safety modules within core development flows."
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
              <p className="text-[#1793d1]/60 text-xs font-mono uppercase tracking-[0.2em] font-bold">{item.comp}</p>
              
              {item.desc && (
                <p className="text-zinc-400 text-sm italic font-light tracking-wide mt-1 mb-2">
                  {item.desc}
                </p>
              )}
              
              <ul className="grid grid-cols-1 gap-3 mt-2">
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
