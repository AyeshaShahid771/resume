"use client";

import StaticHero from "@/components/StaticHero";
import Identity from "@/components/Identity";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import Experience from "@/components/Experience";
import Stats from "@/components/Stats";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Navbar from "@/components/Navbar";
import BackgroundGlows from "@/components/BackgroundGlows";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full">
      <Navbar />
      <BackgroundGlows />

      {/* Static Hero Section */}
      <StaticHero />

      {/* Identity Section */}
      <div className="relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
        <Identity />
      </div>

      {/* Projects Section */}
      <Projects />
      <Stack />
      <Experience />
      <Stats />
      <Education />

      <Contact />
    </main>
  );
}
