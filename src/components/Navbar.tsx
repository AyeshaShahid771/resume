"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  // Smoothly transition from 0 to 0.95 opacity over 100px of scroll
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 0.8]);
  const borderOpacity = useTransform(scrollY, [0, 100], [0, 0.08]);
  const blurValue = useTransform(scrollY, [0, 100], [0, 16]);

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Work", href: "#work" },
    { name: "About", href: "#about" },
    { name: "Stack", href: "#stack" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          backgroundColor: useTransform(
            bgOpacity,
            (o) => `rgba(10, 17, 32, ${o})`,
          ),
          borderBottom: useTransform(
            borderOpacity,
            (o) => `1px solid rgba(255, 255, 255, ${o})`,
          ),
          backdropFilter: useTransform(blurValue, (v) => `blur(${v}px)`),
          WebkitBackdropFilter: useTransform(blurValue, (v) => `blur(${v}px)`),
        }}
        className="fixed top-0 left-0 w-full z-[100] transition-colors duration-400 px-6 md:px-12 py-4 md:py-5 flex justify-between items-center min-h-[64px] md:min-h-auto"
      >
        {/* LEFT: Branding/Logo */}
        <div className="font-playfair italic text-lg md:text-xl text-white opacity-80 flex-shrink-0 z-[110]">
          AYESHA.
        </div>

        {/* CENTER: Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-syne text-[10px] uppercase tracking-[0.15em] text-white/50 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* RIGHT: Status & Hamburger */}
        <div className="flex items-center gap-6 z-[110]">
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-syne text-[8px] uppercase tracking-widest text-white/30 whitespace-nowrap">
              Available
            </span>
          </div>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex flex-col gap-1.5 justify-center items-center w-8 h-8 md:hidden"
            aria-label="Toggle Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-white origin-center"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1px] bg-white"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-white origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-[#0a1120]/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center p-12"
          >
            <div className="flex flex-col items-center gap-8 w-full">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                  onClick={() => setIsOpen(false)}
                  className="font-playfair italic text-4xl text-white hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-12 pt-12 border-t border-white/5 w-full flex flex-col items-center gap-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-syne text-[10px] uppercase tracking-[0.3em] text-white/40">
                    Available for Work
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
