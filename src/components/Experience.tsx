"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import BackgroundGlows from "./BackgroundGlows";

const experiences = [
  {
    company: "Afryvo Analytics",
    role: "Full Stack AI Engineer · Tech Lead",
    period: "Sep 2025 – Present",
    location: "Lahore",
    points: [
      "Multi-tenant SaaS apps as Tech Lead",
      "LLM integrations, RAG pipelines, voice agents",
      "GCP + AWS, Docker, CI/CD — 99.9% uptime",
      "Client requirements → technical specs",
    ],
    accent: "rgba(100,180,255,1)",
    side: "right",
    badge: "CURRENT ROLE",
  },
  {
    company: "Appsians",
    role: "Backend AI Engineer",
    period: "Sep 2025",
    location: "DHA Phase 4 Lahore",
    points: [
      "FastAPI backend with LLM automation",
      "Dockerized scalable cloud delivery",
    ],
    accent: "rgba(167,139,250,1)",
    side: "left",
  },
];

function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof experiences)[0];
  index: number;
}) {
  const isRight = exp.side === "right";

  return (
    <div
      className={`relative flex w-full mb-24 justify-center items-center ${isRight ? "md:justify-start md:pl-[50%]" : "md:justify-end md:pr-[50%]"}`}
    >
      {/* Timeline Dot */}
      <div
        className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-20 bg-[#121212] border-2 shadow-lg"
        style={{ borderColor: exp.accent }}
      >
        {/* Removed infinite animation - now just static glow effect */}
        <div
          className="absolute inset-0 rounded-full opacity-50 blur-sm"
          style={{ backgroundColor: exp.accent }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, x: isRight ? 100 : -100, scale: 0.9 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        viewport={{ once: true, margin: "-50px", amount: 0.1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className={`w-full max-w-[480px] p-6 md:p-8 rounded-2xl bg-white/5 border border-white/10 relative ${isRight ? "md:ml-12" : "md:mr-12"}`}
      >
        {exp.badge && (
          <span className="inline-block px-3 py-1 rounded-full text-[9px] font-syne tracking-widest mb-4 bg-blue-500/10 text-blue-400 border border-blue-500/20">
            {exp.badge}
          </span>
        )}

        <h3 className="font-playfair italic text-3xl text-white mb-2">
          {exp.company}
        </h3>
        <p
          className="font-syne uppercase text-[11px] tracking-wider mb-6"
          style={{ color: exp.accent }}
        >
          {exp.role}
        </p>

        <div className="flex justify-between text-[11px] font-syne text-white/30 tracking-widest uppercase mb-6">
          <span>{exp.period}</span>
          <span>{exp.location}</span>
        </div>

        <ul className="space-y-3">
          {exp.points.map((point, i) => (
            <li
              key={i}
              className="flex gap-3 text-sm text-white/50 leading-relaxed group"
            >
              <span className="text-white/20 transition-colors group-hover:text-blue-400">
                →
              </span>
              {point}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const pathLength = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const pathOpacity = useTransform(
    scrollYProgress,
    [0, 0.1, 0.9, 1],
    [0, 1, 1, 0],
  );

  return (
    <section
      id="experience"
      ref={containerRef}
      className="py-32 bg-[#121212] relative z-50"
    >
      <BackgroundGlows />
      <div className="px-6 md:px-12 mb-20 text-center md:text-left relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="font-syne text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4"
        >
          My professional journey.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="font-playfair italic text-[clamp(48px,8vw,72px)] text-white leading-none mb-12"
        >
          Where I've Worked.
        </motion.h2>
      </div>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Timeline Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/5 md:block hidden">
          <motion.div
            style={{ scaleY: pathLength, opacity: pathOpacity }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 origin-top shadow-[0_0_15px_rgba(100,180,255,0.4)]"
          />
          {/* Following Tip Glow */}
          <motion.div
            style={{
              top: useTransform(pathLength, (v) => `${v * 100}%`),
              opacity: pathOpacity,
            }}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_20px_#fff,0_0_40px_#60a5fa] z-30"
          />
        </div>

        {experiences.map((exp, i) => (
          <TimelineCard key={i} exp={exp} index={i} />
        ))}
      </div>

      {/* Open to Work Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-20 text-center"
      >
        <p className="font-playfair italic text-2xl text-white/40 animate-pulse">
          &quot;Currently open to full-time AI Engineering roles & freelance
          projects.&quot;
        </p>
      </motion.div>
    </section>
  );
}
