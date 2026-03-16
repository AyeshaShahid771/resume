"use client";

import { useRef } from "react";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
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
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <main className="relative min-h-screen">
      <Navbar />
      <BackgroundGlows />
      {/* Scroll Section */}
      <section ref={heroRef} className="relative">
        <ScrollyCanvas totalFrames={75}>
          <Overlay scrollTarget={heroRef} />
        </ScrollyCanvas>
      </section>

      {/* Identity Section */}
      <Identity />

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
