"use client";

import { motion } from "framer-motion";
import BackgroundGlows from "./BackgroundGlows";

function AcademicBlock({ items }: { items: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="p-6 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-400/20 transition-all flex flex-col gap-8 md:gap-10 h-full"
    >
      <div className="border-b border-white/5 pb-6">
        <h3 className="font-syne text-[11px] uppercase tracking-[0.4em] text-white/30">Academic Foundations</h3>
      </div>
      
      {items.map((item, i) => (
        <div key={i} className={`flex flex-col gap-4 ${i !== items.length - 1 ? "border-b border-white/5 pb-10" : ""}`}>
          <div className="flex justify-between items-start">
            <span className="font-syne text-[10px] uppercase tracking-widest text-blue-400">{item.institution}</span>
            <span className="font-syne text-[9px] uppercase tracking-widest text-white/20">{item.period}</span>
          </div>
          <div>
            <h4 className="font-playfair italic text-2xl md:text-3xl text-white mb-2">{item.title}</h4>
            {item.metric && <p className="font-syne text-[10px] uppercase tracking-widest text-white/40">{item.metric}</p>}
          </div>
          <p className="font-syne text-[11px] text-white/50 leading-relaxed max-w-[400px]">
            {item.description}
          </p>
        </div>
      ))}
    </motion.div>
  );
}

export default function Education() {
  const academicItems = [
    {
      institution: "University of Management and Technology",
      title: "Software Engineering",
      period: "2022 – 2026",
      metric: "GPA 3.8 / 4.0",
      description: "Focus on advanced software architecture, AI integration, and production-scale system design. Core coursework in Algorithms, Database Systems, and Machine Learning."
    },
    {
      institution: "Punjab College",
      title: "Pre-Medical",
      period: "2020 – 2022",
      description: "Strong scientific and analytical foundation. Reframed into technical architecture and software engineering with a focus on problem-solving."
    }
  ];

  const certificationItems = [
    {
      institution: "IBM",
      title: "SQL & Relational Databases",
      period: "Aug 2024",
      description: "Relational database management, SQL querying, and schema design for production-scale AI applications."
    },
    {
      institution: "IBM",
      title: "Statistics for Data Science",
      period: "Jul 2025",
      description: "Advanced statistical analysis, probability theory, and data modeling for robust AI pipelines."
    }
  ];

  return (
    <section id="education" className="py-24 relative">
      
      <div className="px-6 md:px-12 mb-16 relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-syne text-[11px] uppercase tracking-[0.3em] text-white/30 mb-4"
        >
          Credentials.
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="font-playfair italic text-[clamp(40px,6vw,60px)] text-white leading-none"
        >
          Education & Specialized Skills.
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-12 relative z-10 items-stretch">
        {/* LEFT: Education */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="pb-4">
            <h3 className="font-syne text-[11px] uppercase tracking-[0.4em] text-white/20">Academic Foundations</h3>
          </div>
          {academicItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-blue-400/20 transition-all flex flex-col gap-6 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="font-syne text-[10px] uppercase tracking-widest text-blue-400">{item.institution}</span>
                <span className="font-syne text-[9px] uppercase tracking-widest text-white/20">{item.period}</span>
              </div>
              <div>
                <h4 className="font-playfair italic text-2xl md:text-3xl text-white mb-2">{item.title}</h4>
                {item.metric && <p className="font-syne text-[10px] uppercase tracking-widest text-white/40">{item.metric}</p>}
              </div>
              <p className="font-syne text-[11px] text-white/50 leading-relaxed max-w-[400px]">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* RIGHT: Certifications */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="pb-4">
            <h3 className="font-syne text-[11px] uppercase tracking-[0.4em] text-white/20">Professional Certifications</h3>
          </div>
          {certificationItems.map((cert, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-6 md:p-10 rounded-3xl bg-white/5 border border-white/10 hover:border-purple-400/20 transition-all flex flex-col gap-6 h-full"
            >
              <div className="flex justify-between items-start">
                <span className="font-syne text-[10px] uppercase tracking-widest text-purple-400">{cert.institution}</span>
                <span className="font-syne text-[9px] uppercase tracking-widest text-white/20">{cert.period}</span>
              </div>
              <div>
                <h3 className="font-playfair italic text-2xl md:text-3xl text-white mb-2">{cert.title}</h3>
                <p className="font-syne text-[10px] uppercase tracking-widest text-white/40">IBM Professional Certification</p>
              </div>
              <p className="font-syne text-[11px] text-white/50 leading-relaxed max-w-[400px]">
                {cert.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
