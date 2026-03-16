"use client";

import { motion, useScroll, useTransform } from "framer-motion";

interface OverlayProps {
  scrollTarget: React.RefObject<HTMLElement>;
}

export default function Overlay({ scrollTarget }: OverlayProps) {
  const { scrollYProgress } = useScroll({
    target: scrollTarget,
    offset: ["start start", "end end"]
  });

  // Phase 1: Editorial Hero
  // These timings are now relative (0 to 1 of the Hero section)
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const yHero = useTransform(scrollYProgress, [0, 0.3], ["0vh", "-10vh"]);

  // Phase 2: RAG Focus (15% to 55%)
  const opacity2 = useTransform(scrollYProgress, [0.15, 0.2, 0.5, 0.51], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.15, 0.51], [20, 0]);

  // Phase 3: Engineering Prowess (60% to 95%)
  const opacity3 = useTransform(scrollYProgress, [0.6, 0.65, 0.9, 0.91], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.6, 0.91], [-20, 0]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden text-white">
      {/* Phase 1: Editorial Hero */}
      <motion.section
        style={{ opacity: opacityHero, y: yHero }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 md:px-6"
      >
        <div className="space-y-4 max-w-5xl mt-[35vh] md:mt-[45vh]">
          <motion.h1
            initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl md:text-7xl font-playfair italic text-white drop-shadow-2xl leading-[1.1] md:mb-1"
          >
            Ayesha Shahid.
          </motion.h1>

          <motion.h2
            initial={{ y: 40, opacity: 0, filter: "blur(8px)" }}
            animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            style={{
              WebkitTextStroke: "0.6px rgba(255, 255, 255, 0.6)",
              color: "transparent"
            }}
            className="text-xl font-syne font-bold uppercase tracking-[.25em] md:text-4xl leading-[1.1]"
          >
            AI ENGINEER & ARCHITECT.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.8, ease: "circOut" }}
            className="h-[1px] w-12 bg-[#64b4ff]/60 mx-auto mt-4 mb-6 origin-center"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="font-playfair italic text-white/70 text-xs md:text-base tracking-wide max-w-xl mx-auto"
          >
            &quot;Crafting intelligent voice agents & RAG-powered chatbots.&quot;
          </motion.p>
        </div>
      </motion.section>

      {/* Phase 2: RAG Focus */}
      <motion.section
        style={{ opacity: opacity2, x: x2 }}
        className="absolute inset-0 flex flex-col justify-center items-start px-8 md:px-12"
      >
        <div className="text-left space-y-4 max-w-[85vw] md:max-w-none">
          <h2 className="text-xl md:text-5xl font-playfair font-bold italic leading-tight text-white">
            Engineering <span className="text-[#64b4ff]">Intelligent</span> <br />
            RAG Pipelines.
          </h2>
          <p className="font-syne text-[11px] uppercase tracking-[0.18em] text-white/70">
            OPTIMIZED FOR BUSINESS CONTEXT. AUTONOMOUS AGENTS. LLM REASONING.
          </p>
        </div>
      </motion.section>

      {/* Phase 3: Engineering Prowess */}
      <motion.section
        style={{ opacity: opacity3, x: x3 }}
        className="absolute inset-0 flex flex-col justify-center items-end px-8 md:px-12"
      >
        <div className="text-right space-y-4 max-w-[85vw] md:max-w-none">
          <h2 className="text-xl md:text-5xl font-playfair font-bold italic leading-tight text-white">
            Bridging <span className="text-white/40">Scalability</span> <br />
            And <span className="text-[#64b4ff]">Reasoning.</span>
          </h2>
          <p className="font-syne text-[11px] uppercase tracking-[0.18em] text-white/70">
            FASTAPI BACKENDS. DOCKER CONTAINERS. ZERO DOWNTIME. ALWAYS.
          </p>
        </div>
      </motion.section>
    </div>
  );
}
