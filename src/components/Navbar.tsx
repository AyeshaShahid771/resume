"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Work", href: "#projects" },
    { name: "About", href: "#identity" },
    { name: "Stack", href: "#stack" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-400 px-6 md:px-12 py-5 flex justify-between items-center ${
        scrolled 
          ? "bg-[#121212]/85 backdrop-blur-[20px] border-b border-white/5 py-4" 
          : "bg-transparent"
      }`}
    >
      {/* LEFT: Branding/Logo Placeholder */}
      <div className="font-playfair italic text-xl text-white opacity-80">
        AS.
      </div>

      {/* CENTER: Links */}
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
      
      {/* RIGHT: Status Indicator */}
      <div className="flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-syne text-[8px] uppercase tracking-widest text-white/30 hidden sm:block">Available for projects</span>
      </div>

    </motion.nav>
  );
}
