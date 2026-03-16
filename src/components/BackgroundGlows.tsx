"use client";

import { motion } from "framer-motion";

export default function BackgroundGlows() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 mix-blend-screen">
      {/* Top Left: Blue Aura (100% span, heavy blur) */}
      <motion.div
        animate={{
          opacity: [0.3, 0.4, 0.3],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-20%] left-[-20%] w-[120%] h-[100%] bg-blue-600/10 blur-[150px] rounded-full"
      />

      {/* Bottom Right: Warm Orange Tint */}
      <motion.div
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-orange-600/5 blur-[120px] rounded-full"
      />

      {/* Center: Extremely faint Purple glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-purple-900/[0.03] blur-[130px] rounded-full" />
    </div>
  );
}
