"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion";
import BackgroundGlows from "./BackgroundGlows";

const stats = [
  { value: 99.9, suffix: "%", label: "System Scalability" },
  { value: 95, suffix: "%", label: "RAG Retrieval Precision" },
  { value: 93, suffix: "%", label: "Voice Agent Accuracy" },
  { value: 1, suffix: "M+", label: "Monthly RAG Queries" },
  { value: 200, suffix: "ms", label: "Generation Latency" }
];

function Counter({ stat }: { stat: typeof stats[0] }) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const count = useMotionValue<number>(0);
  const rounded = useTransform<number, string>(count, (latest) => {
    if (stat.value % 1 === 0) return Math.floor(latest).toString();
    return latest.toFixed(1);
  });
  const isInView = useInView(nodeRef, { once: true, margin: "-50px", amount: 0.1 });

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, stat.value, { 
        duration: 2, 
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.2
      });
      return controls.stop;
    }
  }, [isInView, count, stat.value]);

  return (
    <motion.div 
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      viewport={{ once: true, amount: 0.1 }}
      className="flex flex-col items-center flex-1 px-8 py-10 min-w-[180px]"
    >
      <div className="flex items-baseline">
        <motion.span 
          ref={nodeRef}
          className="font-playfair italic text-4xl md:text-5xl text-white"
        >
          {rounded}
        </motion.span>
        {stat.suffix && <span className="font-playfair italic text-2xl text-white/50 ml-1">{stat.suffix}</span>}
      </div>
      <p className="font-syne text-[9px] uppercase tracking-[0.2em] text-white/30 mt-4 text-center">
        {stat.label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="bg-[#121212] relative z-[60]">
      <BackgroundGlows />
      
      <div className="relative z-10 py-12 md:py-6">
        {/* Stats Main Bar */}
        <div className="flex flex-wrap md:flex-nowrap md:divide-x md:divide-white/5 gap-y-12 md:gap-y-0">
          {stats.map((stat, i) => (
            <Counter key={i} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
