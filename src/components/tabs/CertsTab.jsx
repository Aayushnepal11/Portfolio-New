import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Award, ExternalLink } from 'lucide-react';

/**
 * Reusable component for Credly Embeds
 */
function CredlyEmbed({ badgeId }) {
  const [loaded, setLoaded] = React.useState(false);

  useEffect(() => {
    // Credly script handles the rendering. We use a small timer to fade in since it doesn't give a callback
    const timer = setTimeout(() => setLoaded(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex justify-center p-4 bg-white/[0.02] rounded-3xl border border-white/[0.05] hover:border-[#1793d1]/30 transition-all duration-500 hover:shadow-2xl hover:shadow-[#1793d1]/5 group overflow-hidden min-h-[302px]">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-4">
          <div className="w-24 h-24 rounded-full bg-white/[0.03] animate-pulse" />
          <div className="w-full h-4 bg-white/[0.03] rounded animate-pulse" />
          <div className="w-2/3 h-4 bg-white/[0.03] rounded animate-pulse" />
        </div>
      )}
      <div 
        data-iframe-width="150" 
        data-iframe-height="270" 
        data-share-badge-id={badgeId} 
        data-share-badge-host="https://www.credly.com"
        className={`transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
      ></div>
    </div>
  );
}

/**
 * Component for Microsoft Learn Embeds
 */
function MicrosoftEmbed({ url }) {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <div className="relative w-full aspect-[3/4] bg-white/[0.02] rounded-3xl border border-white/[0.05] overflow-hidden hover:border-[#1793d1]/30 transition-all duration-500 group">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 space-y-6">
          <Award className="w-12 h-12 text-zinc-800 animate-pulse" />
          <div className="space-y-3 w-full">
            <div className="h-2 w-full bg-white/[0.03] rounded-full animate-pulse" />
            <div className="h-2 w-5/6 bg-white/[0.03] rounded-full animate-pulse mx-auto" />
          </div>
        </div>
      )}
      <iframe 
        src={url} 
        onLoad={() => setIsLoading(false)}
        className={`w-full h-full border-none transition-all duration-1000 group-hover:scale-[1.02] ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        title="Microsoft Certification"
      />
    </div>
  );
}

export default function CertsTab() {
  useEffect(() => {
    const scriptId = 'credly-embed-js';
    if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.id = scriptId;
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//cdn.credly.com/assets/utilities/embed.js';
      document.body.appendChild(script);
    } else {
      // If script exists, we might need to tell it to scan again if it supports it
      // External embed scripts usually scan on DOM insertion or periodically
    }
  }, []);
  const featuredCerts = [
    {
      name: "CompTIA Security+",
      issuer: "CompTIA",
      badgeId: "bf9db8b9-8d74-43cf-a02b-c3aed7f9ea43",
      isEmbed: true
    },
    {
      name: "Dual Credential: Google & CompTIA",
      issuer: "Google / CompTIA",
      badgeId: "bb22ffd7-2dcc-4b6a-b31d-1a95c8f77735",
      isEmbed: true
    },
    {
      name: "Google Cybersecurity Professional",
      issuer: "Google",
      badgeId: "d3c87308-bce5-49cb-ac49-5cbb27ca0a2d",
      isEmbed: true
    },
    {
      name: "API Pentesting",
      issuer: "APISec University",
      badgeId: "2c10c2f1-bbc7-449e-ad56-40536dbf9401",
      isEmbed: true
    },
    {
      name: "GitHub Foundations",
      issuer: "GitHub",
      badgeId: "4aacc205-059f-476c-8d19-cbc66a710f28",
      isEmbed: true
    },
    {
      name: "Google AI Essentials",
      issuer: "Google",
      badgeId: "32b3eed1-746c-4c11-b4ef-91efc8de659e",
      isEmbed: true
    },
    {
      name: "Cyber Security 101 (SEC1)",
      issuer: "TryHackMe",
      badgeId: "18dec6da-ef0a-48cb-989c-f81e399575cb",
      isEmbed: true
    },
    {
      name: "Pre Security (SEC0)",
      issuer: "TryHackMe",
      badgeId: "82f0e67a-41c4-47c7-9749-8acd4cbf4400",
      isEmbed: true
    },
    {
      name: "Cloud Associate (ICCA)",
      issuer: "INE",
      image: "https://api.accredible.com/v1/frontend/credential_website_embed_image/certificate/167860214",
      url: "https://certs.ine.com/6d853a0f-dd29-4f6c-a367-0e2c33cc497a#acc.bOMp3gC9",
    }
  ];

  const additionalCerts = [
    { name: "Azure Fundamentals (Microsoft)", url: "https://learn.microsoft.com/api/credentials/share/en-us/aayushnepal-0252/3ACA61A36EA2CA09?sharingId=85F613854A027CCD" },
    { name: "Certified in Cybersecurity (CC) (ISC2)" },
    { name: "Practical Ethical Hacking (TCM Security)" },
    { name: "CompTIA Network+ (Udemy)" },
    { name: "Network Security Specialist (Coursera)" },
    { name: "Wireshark packet analysis mastery" },
    { name: "AI for Everybody (DeepLearning.AI)" },
  ];

  return (
    <div className="space-y-16 pb-20 select-none">
      <div className="space-y-4">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tighter">Professional <span className="bg-gradient-to-r from-[#1793d1]/50 to-[#1793d1]/10 bg-clip-text text-transparent">Validators.</span></h2>
        <p className="text-zinc-500 text-base md:text-lg font-light max-w-xl">Curated collection of industry-recognized certifications and interactive security badges.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {featuredCerts.map((c, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {c.isEmbed ? (
              <div className="space-y-5">
                <CredlyEmbed badgeId={c.badgeId} />
                <div className="px-4">
                  <div className="text-[10px] text-[#1793d1]/60 font-mono uppercase tracking-widest mb-1">{c.issuer}</div>
                  <div className="text-sm font-bold text-white tracking-tight leading-snug">{c.name}</div>
                </div>
              </div>
            ) : c.isMS ? (
              <div className="space-y-5">
                <MicrosoftEmbed url={c.url} />
                <div className="px-4">
                  <div className="text-[10px] text-[#1793d1]/60 font-mono uppercase tracking-widest mb-1">{c.issuer}</div>
                  <div className="text-sm font-bold text-white tracking-tight">{c.name}</div>
                </div>
              </div>
            ) : (
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col p-6 rounded-[32px] bg-white/[0.02] border border-white/[0.05] hover:border-[#1793d1]/30 hover:bg-white/[0.04] transition-all duration-500 hover:shadow-2xl hover:shadow-[#1793d1]/5 h-full"
              >
                <div className="relative w-full aspect-square mb-6 flex items-center justify-center p-8 bg-black/20 rounded-2xl">
                  <img 
                    src={c.image} 
                    alt={c.name} 
                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#1793d1]/10 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity rounded-full" />
                </div>
                <div className="mt-auto">
                  <div className="text-[10px] text-[#1793d1]/60 font-mono uppercase tracking-widest mb-1">{c.issuer}</div>
                  <div className="text-sm font-bold text-white group-hover:text-[#1793d1] transition-colors tracking-tight leading-tight mb-2">{c.name}</div>
                  <div className="flex items-center gap-2 text-[10px] text-zinc-600 font-bold tracking-widest mt-4">
                    VERIFY AUTHENTICITY <ExternalLink className="w-3 h-3 translate-y-[-1px]" />
                  </div>
                </div>
              </a>
            )}
          </motion.div>
        ))}
      </div>

      <div className="pt-16 border-t border-white/[0.05]">
        <div className="flex items-center gap-4 mb-10">
          <div className="h-px flex-1 bg-white/[0.05]" />
          <h3 className="text-sm font-mono text-zinc-500 uppercase tracking-[0.3em] font-bold">Additional Specialized Training</h3>
          <div className="h-px flex-1 bg-white/[0.05]" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {additionalCerts.map((c, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 p-6 rounded-2xl bg-white/[0.01] border border-white/[0.03] transition-all hover:bg-white/[0.03] group overflow-hidden"
            >
              <div className="w-10 h-10 rounded-xl bg-[#1793d1]/5 flex items-center justify-center border border-white/[0.05] group-hover:border-[#1793d1]/20 group-hover:bg-[#1793d1]/10 transition-all shrink-0">
                <Award className="w-5 h-5 text-[#1793d1]/40 group-hover:text-[#1793d1] transition-colors" />
              </div>
              <div className="flex justify-between items-center w-full min-w-0">
                <span className="text-[13px] font-medium text-zinc-400 group-hover:text-zinc-200 transition-colors truncate pr-4">{c.name}</span>
                {c.url && (
                  <a 
                    href={c.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-[10px] font-bold text-[#1793d1]/60 hover:text-[#1793d1] uppercase tracking-widest border border-[#1793d1]/20 px-3 py-1.5 rounded-lg hover:bg-[#1793d1]/10 transition-all shrink-0"
                  >
                    Verify
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

