"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useMotionValueEvent,
} from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: "01",
    category: "AI SAAS MARKETPLACE",
    name: "Tiger Leads.",
    oneliner: "$50K MONTHLY. 99.9% UPTIME. ZERO COMPROMISES.",
    description:
      "Production-grade contractor marketplace with Stripe billing, JWT+2FA security, real-time analytics, and GCP deployments processing $50K+ monthly.",
    stats: [
      { value: "$50K+", label: "MONTHLY" },
      { value: "99.9%", label: "UPTIME" },
      { value: "<200ms", label: "RESPONSE" },
    ],
    stack: ["FastAPI", "PostgreSQL", "GCP", "Docker", "Stripe", "JWT"],
    accent: "rgba(251, 146, 60, 0.8)",
    screenshot: "/projects/image copy.png",
  },
  {
    id: "02",
    category: "AI PERSONAL TRAINER APP",
    name: "FitnessFlex.",
    oneliner: "YOUR AI TRAINER THAT ACTUALLY LISTENS — LITERALLY.",
    description:
      "Voice-powered fitness coach with LangGraph agentic workflows and VAPI real-time voice — personalized plans delivered in under 250ms.",
    stats: [
      { value: "92%", label: "VOICE ACCURACY" },
      { value: "40%", label: "FASTER PLANS" },
      { value: "250ms", label: "RESPONSE" },
    ],
    stack: ["Next.js", "LangGraph", "VAPI", "FastAPI", "Convex", "Docker"],
    accent: "rgba(34, 211, 238, 0.8)",
    screenshot: "/projects/fit (1).png",
  },
  {
    id: "03",
    category: "AI CRM LEAD GENERATOR",
    name: "Carbon Savers.",
    oneliner: "ALWAYS ONLINE. NEVER MISSES A LEAD.",
    description:
      "Multi-agent CRM with Sales Agent, Issue Resolver & RAG Knowledge Base — voice-powered by Deepgram, automated lead conversion boosted by 35%.",
    stats: [
      { value: "35%", label: "LEAD BOOST" },
      { value: "60%", label: "AUTOMATED" },
      { value: "3", label: "AI AGENTS" },
      { value: "45%", label: "LESS MANUAL" },
    ],
    stack: ["LangGraph", "Deepgram", "Supabase", "MCP", "RAG", "LiveToolkit"],
    accent: "rgba(52, 211, 153, 0.8)",
    screenshot: "/projects/AI receptionist.PNG",
  },
  {
    id: "04",
    category: "AI CONSTRUCTION SAAS",
    name: "Alliance Permitting.",
    oneliner: "AI THAT UNBLOCKS CONSTRUCTION PROJECTS.",
    description:
      "Enterprise permitting platform combining AI automation with human expertise — reducing permit processing time and eliminating errors at scale.",
    stats: [
      { value: "90%", label: "FASTER PERMITS" },
      { value: "100%", label: "ERROR REDUCTION" },
      { value: "3x", label: "FASTER START" },
      { value: "24/7", label: "AI AVAILABLE" },
    ],
    stack: ["Next.js", "FastAPI", "PostgreSQL", "GCP", "Docker", "CI/CD"],
    accent: "rgba(16, 185, 129, 0.8)",
    screenshot: "/projects/image.png",
  },
  {
    id: "05",
    category: "RAG CHAT PLATFORM",
    name: "Afryvo AI.",
    oneliner: "YOUR DOCUMENTS. INSTANTLY SEARCHABLE BY AI.",
    description:
      "Full-stack RAG chat platform with three AI modes — tools chatbot, developer Q&A engine with 1M+ answers, and document knowledge base with Pinecone vector search.",
    stats: [
      { value: "1M+", label: "Q&A ANSWERS" },
      { value: "40%", label: "FASTER RETRIEVAL" },
      { value: "3", label: "AI MODES" },
      { value: "95%", label: "ACCURACY" },
    ],
    stack: [
      "LangChain",
      "Pinecone",
      "FastAPI",
      "WebSockets",
      "Next.js",
      "Docker",
    ],
    accent: "rgba(167, 139, 250, 0.8)",
    screenshot: "/projects/rag.PNG",
  },
];

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const indexValue = useTransform(
    scrollYProgress,
    [0, 0.1, 0.15, 0.3, 0.35, 0.5, 0.55, 0.7, 0.75, 0.9, 0.95, 1],
    [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 4, 4],
  );

  useMotionValueEvent(indexValue, "change", (latest) => {
    const floor = Math.floor(latest);
    if (floor !== activeIndex) {
      setActiveIndex(floor);
    }
  });

  const activeProject = projects[activeIndex];

  return (
    <section id="work" className="relative z-20">
      {/* Dynamic Background Sync handled by page-level BackgroundGlows */}

      {/* Title Section */}
      <div className="relative z-10 h-[40vh] flex flex-col justify-end pl-[clamp(30px,5vw,80px)] pb-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4"
        >
          All shipped. All in production.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-playfair italic text-[clamp(48px,8vw,72px)] text-white leading-none"
        >
          Things I&apos;ve Built.
        </motion.h2>
      </div>

      {/* Unified Sticky Wrapper */}
      <div ref={containerRef} className="relative h-[400vh] md:h-[500vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col md:grid md:grid-cols-2">
          {/* Scroll Indicator (Desktop Only) */}
          <div className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-20">
            <div className="h-32 w-[1px] bg-white/5 relative overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 w-full"
                style={{
                  height: "100%",
                  scaleY: scrollYProgress,
                  originY: 0,
                  backgroundColor: activeProject.accent,
                }}
              />
            </div>
            <span className="font-syne text-[9px] text-white/10 tracking-[0.2em] -rotate-90 origin-center mt-4">
              {activeProject.id} / 05
            </span>
          </div>

          {/* LEFT SIDE - Text Panel */}
          <div className="flex-1 px-6 md:pl-[clamp(60px,10vw,140px)] md:pr-[clamp(20px,5vw,60px)] flex flex-col justify-center order-2 md:order-1 pt-4 md:pt-0">
            <AnimatePresence mode="popLayout">
              <motion.div
                key={activeProject.id}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -30, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="max-w-[520px] pb-12 md:pb-0"
              >
                <p
                  className="font-syne uppercase text-[9px] md:text-[10px] tracking-[0.2em] mb-2 md:mb-3"
                  style={{ color: activeProject.accent }}
                >
                  {activeProject.category}
                </p>
                <h3 className="font-playfair italic text-[28px] md:text-[clamp(36px,5vw,58px)] text-white leading-[1.1] mb-2">
                  {activeProject.name}
                </h3>
                <p className="font-syne uppercase text-[10px] md:text-[11px] text-white/35 tracking-[0.15em] mb-4 md:mb-6">
                  {activeProject.oneliner}
                </p>

                <div className="hidden md:block w-10 h-[1px] bg-white/20 mb-6" />

                <p className="font-inter text-[13px] md:text-[15px] text-white/55 leading-[1.6] md:leading-[1.7] mb-6 md:mb-8 line-clamp-3 md:line-clamp-none">
                  {activeProject.description}
                </p>

                <div className="grid grid-cols-2 gap-y-4 md:gap-y-6 gap-x-4 mb-6 md:mb-8">
                  {activeProject.stats.map((stat, i) => (
                    <div key={i} className="flex flex-col">
                      <span className="font-playfair italic text-xl md:text-2xl text-white">
                        {stat.value}
                      </span>
                      <span className="font-syne text-[8px] md:text-[9px] uppercase tracking-wider text-white/40">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {activeProject.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full border border-white/10 font-syne text-[8px] md:text-[10px] text-white/60 bg-white/5"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* RIGHT SIDE - Image Panel */}
          <div className="flex-1 relative flex items-center justify-center p-6 md:p-12 order-1 md:order-2 h-[35vh] md:h-screen">
            <div className="w-full max-w-[580px] aspect-[16/10] rounded-xl relative">
              <div className="h-6 md:h-8 flex items-center px-4 gap-1.5 md:gap-2 z-10 relative">
                <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#ff5f57]" />
                <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#febc2e]" />
                <div className="w-1.5 md:w-2.5 h-1.5 md:h-2.5 rounded-full bg-[#28c840]" />
              </div>

              <div className="relative w-full h-[calc(100%-24px)] md:h-[calc(100%-32px)] overflow-hidden">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.div
                    key={activeProject.id}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{
                      duration: 0.7,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.1,
                    }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={activeProject.screenshot}
                      alt={activeProject.name}
                      fill
                      className="object-contain object-top"
                      quality={100}
                      priority
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Smudge Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a1120] to-transparent pointer-events-none z-30" />
    </section>
  );
}
