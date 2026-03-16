"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundGlows from "./BackgroundGlows";

const categories = ["ALL", "AI/ML", "BACKEND", "FRONTEND", "CLOUD", "DATABASE"];

const techData = [
  // AI/ML
  { name: "LLMs", category: "AI/ML" },
  { name: "RAG", category: "AI/ML" },
  { name: "AI Agents", category: "AI/ML" },
  { name: "LangChain", category: "AI/ML" },
  { name: "LangGraph", category: "AI/ML" },
  { name: "VAPI", category: "AI/ML" },
  { name: "MCP", category: "AI/ML" },
  { name: "OpenAI", category: "AI/ML" },
  { name: "Anthropic", category: "AI/ML" },
  // BACKEND
  { name: "Python", category: "BACKEND" },
  { name: "FastAPI", category: "BACKEND" },
  { name: "SQLAlchemy", category: "BACKEND" },
  { name: "JWT", category: "BACKEND" },
  { name: "OAuth 2.0", category: "BACKEND" },
  { name: "Stripe", category: "BACKEND" },
  { name: "WebSockets", category: "BACKEND" },
  { name: "PyOTP", category: "BACKEND" },
  // FRONTEND
  { name: "Next.js", category: "FRONTEND" },
  { name: "TypeScript", category: "FRONTEND" },
  { name: "Vercel", category: "FRONTEND" },
  { name: "Clerk", category: "FRONTEND" },
  { name: "Tailwind", category: "FRONTEND" },
  { name: "React", category: "FRONTEND" },
  { name: "Web Push", category: "FRONTEND" },
  // CLOUD
  { name: "GCP", category: "CLOUD" },
  { name: "Cloud Run", category: "CLOUD" },
  { name: "AWS", category: "CLOUD" },
  { name: "Docker", category: "CLOUD" },
  { name: "CI/CD", category: "CLOUD" },
  { name: "Cloud Build", category: "CLOUD" },
  { name: "Nginx", category: "CLOUD" },
  { name: "Artifact Registry", category: "CLOUD" },
  // DATABASE
  { name: "PostgreSQL", category: "DATABASE" },
  { name: "MySQL", category: "DATABASE" },
  { name: "Supabase", category: "DATABASE" },
  { name: "Pinecone", category: "DATABASE" },
  { name: "Convex", category: "DATABASE" },
  { name: "SQL Server", category: "DATABASE" },
  { name: "Redis", category: "DATABASE" }
];

function TechPill({ tech }: { tech: { name: string, category: string } }) {
  return (
    <div className="relative group">
      <motion.div 
        whileHover={{ scale: 1.05 }}
        className="relative px-6 md:px-10 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center justify-center bg-white/[0.02] backdrop-blur-md transition-all duration-500 overflow-hidden min-w-[130px] md:min-w-[200px]"
      >
        {/* Animated Border SVG Path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
          <rect
            x="0.5"
            y="0.5"
            width="99"
            height="99"
            rx="16"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="3" // More prominent
            strokeDasharray="40 20" // Fuller (longer dashes)
            fillOpacity="0"
            className="opacity-50 group-hover:opacity-100 transition-opacity duration-300"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="120"
              dur="3s"
              repeatCount="indefinite"
            />
          </rect>
          {/* Static thin boundary for structure */}
          <rect
            x="0.5"
            y="0.5"
            width="99"
            height="99"
            rx="16"
            fill="none"
            stroke="#121212"
            strokeWidth="1"
            className="z-0"
          />
        </svg>

        {/* Micro-Glow Effect */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500"
          style={{ background: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)' }}
        />
        
        {/* Content */}
        <span className="font-syne text-[11px] md:text-[13px] text-white/80 group-hover:text-white uppercase tracking-[0.2em] transition-colors relative z-10 px-2 text-center leading-tight font-semibold">
          {tech.name}
        </span>
      </motion.div>
    </div>
  );
}

export default function Stack() {
  const [activeCategory, setActiveCategory] = useState("ALL");

  const filteredTech = activeCategory === "ALL" 
    ? techData 
    : techData.filter(t => t.category === activeCategory);

  // Normalize speed: shorter list = shorter duration to maintain pixels-per-second
  const baseDuration = 60;
  const normalizedDuration = (filteredTech.length / techData.length) * baseDuration;
  const minDuration = 15; // Don't move too fast even for small lists
  const finalDuration = Math.max(normalizedDuration, minDuration);

  return (
    <section id="stack" className="py-32 bg-[#121212] relative z-40 overflow-hidden">
      {/* Localized Atmospheric Glows */}
      <div className="absolute inset-0 pointer-events-none mix-blend-screen -z-10">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-600/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-orange-600/5 blur-[130px] rounded-full" />
      </div>
      
      <div className="px-6 md:px-12 mb-16 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-syne text-[10px] uppercase tracking-[0.3em] text-white/30 mb-4 text-center md:text-left"
        >
          Every tool I've used in production.
        </motion.p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-playfair italic text-[clamp(40px,6vw,72px)] text-white leading-none text-center md:text-left"
          >
            The Stack.
          </motion.h2>

          {/* Categories */}
          <div className="flex flex-wrap justify-center md:justify-end gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-1.5 rounded-full font-syne text-[9px] tracking-widest uppercase transition-all border ${
                  activeCategory === cat
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/40 border-white/10 hover:border-white/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Single Marquee Row */}
      <div className="relative z-10 w-full overflow-hidden py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex"
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                duration: finalDuration,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex gap-4 md:gap-8 items-center px-10 whitespace-nowrap"
            >
              {/* Multiply items for a dense loop */}
              {[...filteredTech, ...filteredTech, ...filteredTech].map((tech, i) => (
                <TechPill key={`${activeCategory}-${tech.name}-${i}`} tech={tech} />
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
