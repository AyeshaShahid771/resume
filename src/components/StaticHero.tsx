"use client";

import { motion } from "framer-motion";

export default function StaticHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#121212]">
      {/* Static Background Image */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url(/homepage/frame_02_delay-0.066s.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="pointer-events-none absolute inset-0 z-10 text-white flex flex-col items-center justify-between text-center px-4 md:px-6 pt-[60vh] md:pt-[48vh] pb-8 md:pb-4">
        <div className="space-y-4 max-w-5xl">
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
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            style={{
              WebkitTextStroke: "0.6px rgba(255, 255, 255, 0.6)",
              color: "transparent",
            }}
            className="text-xl font-syne font-bold uppercase tracking-[.25em] md:text-4xl leading-[1.1]"
          >
            AI ENGINEER & ARCHITECT.
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: "circOut" }}
            className="h-[1px] w-12 bg-[#64b4ff]/60 mx-auto mt-4 mb-6 origin-center"
          />
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-playfair italic text-white/70 text-xs md:text-base tracking-wide max-w-xl mx-auto"
          >
            &quot;Crafting intelligent voice agents & RAG-powered chatbots.&quot;
          </motion.p>
        </div>

        {/* Responsive Indicator */}
        <div className="flex flex-col items-center z-20">
          {/* Desktop Indicator - Simple & Elegant */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="hidden md:flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-white/40 uppercase tracking-[0.3em] font-syne">
              Scroll
            </span>
            <svg
              className="w-4 h-4 text-white/30"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>

          {/* Mobile Indicator - "Something Different": Animated Gesture Hint */}
          <div className="md:hidden flex flex-col items-center gap-4">
            <div className="relative w-[1px] h-12 bg-white/10 overflow-hidden">
              <motion.div
                animate={{ 
                  y: ["-100%", "100%"],
                  opacity: [0, 1, 0] 
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-blue-400 to-transparent"
              />
            </div>
            <span className="text-[8px] text-white/20 uppercase tracking-[0.4em] font-syne">
              Swipe to Explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
