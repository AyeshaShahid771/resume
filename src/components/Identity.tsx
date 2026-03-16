"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGlows from "./BackgroundGlows";

const identityPills = [
  "Full Stack AI Engineer",
  "Tech Lead @ Afryvo Analytics",
  "LangChain & LangGraph",
  "Voice Agent Architect",
  "GCP + AWS Deployments",
  "RAG Pipeline Engineer",
  "UMT — GPA 3.8 / 4.0"
];

const stats = [
  { value: "2+", label: "YEARS EXPERIENCE" },
  { value: "95%", label: "AI ACCURACY" },
  { value: "<200ms", label: "AGENT LATENCY" }
];

function FlipNumber() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % stats.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const current = stats[index];

  return (
    <div className="flex flex-col items-center md:items-start">
      <div className="relative h-[70px] md:h-[90px] w-full perspective-1000">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.value}
            initial={{ rotateX: 90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: -90, opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="font-playfair italic text-5xl md:text-[80px] leading-none text-white origin-center"
          >
            {current.value}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="h-6 mt-4 relative w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={current.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="font-syne text-[9px] md:text-[11px] uppercase tracking-[0.3em] text-white/30"
          >
            {current.label}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  
  return (
    <div className="flex flex-wrap gap-x-[0.3em] gap-y-0">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-visible pb-1 px-[2px]">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: i * 0.04, 
              ease: [0.25, 0.46, 0.45, 0.94] 
            }}
            viewport={{ once: true }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}

export default function Identity() {
  return (
    <section id="about" className="py-24 md:py-[20vh] border-t border-white/5 relative z-30">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
        
        {/* LEFT: Statement */}
        <div className="space-y-8 md:space-y-12 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="font-playfair italic text-[clamp(28px,4vw,48px)] text-white leading-[1.2] max-w-[600px]">
            <WordReveal text="I don't just integrate AI — I architect systems that run in production." />
          </div>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            className="font-inter text-[14px] md:text-[15px] text-white/50 leading-[1.8] max-w-[480px]"
          >
            Currently Tech Lead at Afryvo Analytics, leading
            cross-functional teams shipping multi-tenant SaaS
            platforms. Specialized in LLM integrations,
            RAG pipelines, voice agents, and cloud deployments.
          </motion.p>
        </div>

        {/* RIGHT: Stack & Counter */}
        <div className="flex flex-col gap-12 md:gap-16 items-center md:items-start">
          <FlipNumber />

          <div className="flex flex-wrap justify-center md:justify-start gap-3">
            {identityPills.map((pill, i) => (
              <motion.span
                key={pill}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.1 }}
                className="group relative p-[1px] rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05]"
              >
                {/* Always-on Flowing Perimeter Beam */}
                <div className="absolute inset-[-1000%] opacity-100 animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0_70%,#64b4ff_100%)] pointer-events-none" />
                
                <div className="relative px-6 py-2 rounded-full bg-[#121212] border border-white/5 font-syne text-[9px] md:text-[10px] tracking-widest uppercase flex items-center justify-center transition-all duration-500 group-hover:bg-[#121212] shadow-[0_0_15px_rgba(100,180,255,0.05)] group-hover:shadow-[0_0_25px_rgba(100,180,255,0.15)]">
                  <span className="text-white/40 group-hover:text-white transition-colors duration-500 whitespace-nowrap">
                    {pill}
                  </span>
                </div>
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
