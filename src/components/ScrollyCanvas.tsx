"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollyCanvasProps {
  totalFrames: number;
  children?: React.ReactNode;
}

export default function ScrollyCanvas({ totalFrames, children }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  
  // Use the container itself as target for relative scroll (0 at start, 1 at end)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Add weight and momentum to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 40,
    restDelta: 0.001
  });
  
  // Map smooth progress to frame index
  const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const preloadImages = () => {
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        const frameName = `frame_${i.toString().padStart(2, '0')}_delay-0.066s.png`;
        img.src = `/homepage/${frameName}`;
        img.onload = () => {
          loadedCount++;
          if (loadedCount === totalFrames) {
            setImagesLoaded(true);
          }
        };
        imagesRef.current[i] = img;
      }
    };

    preloadImages();
  }, [totalFrames]);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const renderFrame = (index: number) => {
      const img = imagesRef.current[Math.round(index)];
      if (!img) return;

      const dpr = window.devicePixelRatio || 1;
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.width;
      const imgHeight = img.height;

      const imgRatio = imgWidth / imgHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgRatio > canvasRatio) {
        drawHeight = canvasHeight;
        drawWidth = canvasHeight * imgRatio;
        offsetX = -(drawWidth - canvasWidth) / 2;
        offsetY = 0;
      } else {
        drawWidth = canvasWidth;
        drawHeight = canvasWidth / imgRatio;
        offsetX = 0;
        offsetY = -(drawHeight - canvasHeight) / 2;
      }

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Listen to frameIndex change
    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(latest);
    });

    // Initial render
    renderFrame(frameIndex.get());

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      renderFrame(frameIndex.get());
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesLoaded, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
        {children}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
            <p className="text-sm font-light uppercase tracking-widest text-white/50">
              Loading Experience...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
