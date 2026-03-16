"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import BackgroundGlows from "./BackgroundGlows";

function MagneticButton({ children, href, subtext, copyValue }: { children: React.ReactNode, href: string, subtext?: string, copyValue?: string }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [copied, setCopied] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const sx = useSpring(x, springConfig);
  const sy = useSpring(y, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current?.getBoundingClientRect() || { left: 0, top: 0, width: 0, height: 0 };
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    
    // Magnetic pull radius 100px
    if (Math.abs(distanceX) < 100 && Math.abs(distanceY) < 100) {
      x.set(distanceX * 0.3);
      y.set(distanceY * 0.3);
    } else {
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!copyValue) return;
    
    try {
      await navigator.clipboard.writeText(copyValue);
    } catch (err) {
      // Fallback
    }
    
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center gap-4 min-w-[200px] relative">
      <motion.a
        ref={ref}
        href={href}
        target="_blank"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: sx, y: sy }}
        className="px-8 py-4 rounded-full flex items-center justify-center font-syne text-[11px] uppercase tracking-widest text-white/80 hover:text-white transition-all relative group overflow-hidden w-full bg-white/[0.02] backdrop-blur-md"
      >
        {/* Animated Border SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            rx="50"
            fill="none"
            stroke="#8b5cf6"
            strokeWidth="2.5"
            strokeDasharray="120 40"
            className="opacity-40 group-hover:opacity-100 transition-opacity duration-300"
            pathLength={100}
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="200"
              dur="4s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>

        <span className="relative z-10">{children}</span>
      </motion.a>
      
      {subtext && (
        <div className="relative flex flex-col items-center w-full">
          <button 
            onClick={handleCopy}
            className="font-syne text-[9px] text-white/30 hover:text-white transition-all tracking-widest uppercase cursor-pointer text-center max-w-full px-2 py-1 rounded-md hover:bg-white/5"
          >
            {subtext}
          </button>
          
          <AnimatePresence>
            {copied && (
              <motion.span
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                className="absolute bottom-full mb-3 bg-blue-500 text-white text-[9px] px-3 py-1.5 rounded-full uppercase tracking-tighter flex items-center gap-1.5 shadow-xl shadow-blue-500/40 z-[110] whitespace-nowrap pointer-events-none"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

export default function Contact() {
  const email = "ayeshashahid771771@gmail.com";
  const github = "https://github.com/AyeshaShahid771";
  const githubDisplay = "github.com/AyeshaShahid771";
  const linkedin = "https://www.linkedin.com/in/ayesha-shahid-data-analysts-datascientist/";
  const linkedinDisplay = "linkedin.com/in/ayesha-shahid-data-analysts-datascientist/";

  return (
    <section id="contact" className="py-24 bg-[#121212] flex items-center justify-center relative overflow-hidden">
      <BackgroundGlows />
      
      {/* Conic Background Animation */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 animate-slow-spin bg-[conic-gradient(from_0deg_at_50%_50%,rgba(139,92,246,0.15),rgba(59,130,246,0.15),rgba(236,72,153,0.15),rgba(139,92,246,0.15))]" />
        <div className="absolute inset-0 backdrop-blur-[120px]" />
      </div>

      <div className="relative z-10 text-center px-6 w-full max-w-6xl pt-12">
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           viewport={{ once: true }}
           className="flex flex-col items-center mb-10 md:mb-12"
        >
          <span className="font-syne text-[10px] md:text-[11px] uppercase tracking-[0.4em] text-white/30">LET'S CONNECT</span>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ duration: 1, delay: 0.5 }}
            viewport={{ once: true }}
            className="h-[1px] bg-white/20 mt-4" 
          />
        </motion.div>

        <h2 className="font-playfair italic text-[clamp(40px,7vw,80px)] text-white leading-[1.1] mb-10 md:mb-12 mx-auto max-w-4xl">
          {"Let's build something intelligent together.".split(" ").map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </h2>

        <p className="font-syne text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-white/30 mb-16 md:mb-20 px-4">
          Open to full-time roles · Freelance projects · Global collaborations
        </p>

        <div className="flex flex-wrap justify-center items-start gap-12 md:gap-20">
          <MagneticButton 
            href={`mailto:${email}`} 
            subtext={email} 
            copyValue={email}
          >
            Send Email
          </MagneticButton>
          <MagneticButton 
            href={github} 
            subtext={githubDisplay} 
            copyValue={github}
          >
            GitHub
          </MagneticButton>
          <MagneticButton 
            href={linkedin} 
            subtext={linkedinDisplay} 
            copyValue={linkedin}
          >
            LinkedIn
          </MagneticButton>
        </div>
      </div>

      <style jsx global>{`
        @keyframes rotateBg {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-slow-spin {
          animation: rotateBg 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
