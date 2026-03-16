"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

interface ScrollyCanvasProps {
  totalFrames: number;
  children?: React.ReactNode;
}

export default function ScrollyCanvas({
  totalFrames,
  children,
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastRenderedIndex = useRef<number>(-1);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Pre-calculated dimensions to avoid math in render loop
  const layoutRef = useRef({
    drawWidth: 0,
    drawHeight: 0,
    offsetX: 0,
    offsetY: 0,
  });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth spring for better animation visibility (less snappy)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 50,
    restDelta: 0.0001,
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, totalFrames - 1]);

  // Pre-calculate layout once on resize
  const updateLayout = useCallback(
    (img: HTMLImageElement, canvas: HTMLCanvasElement) => {
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

      layoutRef.current = { drawWidth, drawHeight, offsetX, offsetY };
    },
    [],
  );

  const renderFrame = useCallback((index: number) => {
    const roundedIndex = Math.round(index);
    // CRITICAL: Skip if we are still on the same frame to save CPU
    if (roundedIndex === lastRenderedIndex.current) return;

    const img = imagesRef.current[roundedIndex];
    if (!img || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // Optimization: no alpha
    if (!ctx) return;

    const { drawWidth, drawHeight, offsetX, offsetY } = layoutRef.current;

    // Render directly without nested RAF - prevents stuttering
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    lastRenderedIndex.current = roundedIndex;
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    const preloadImages = () => {
      for (let i = 0; i < totalFrames; i++) {
        const img = new Image();
        const frameName = `frame_${i.toString().padStart(2, "0")}_delay-0.066s.png`;
        img.src = `/homepage/${frameName}`;
        // Priority load first 5 frames immediately, rest lazy load
        if (i < 5) {
          img.loading = "eager";
        }
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

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      // Cap DPR on mobile for better performance
      let dpr = window.devicePixelRatio || 1;
      if (isMobile && dpr > 1.5) {
        dpr = 1.5;
      }

      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      // Update core layout data
      if (imagesRef.current[0]) {
        updateLayout(imagesRef.current[0], canvas);
      }

      // Force immediate redraw
      lastRenderedIndex.current = -1;
      renderFrame(frameIndex.get());
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      renderFrame(latest);
    });

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [imagesLoaded, frameIndex, renderFrame, updateLayout]);

  return (
    <div ref={containerRef} className="relative h-[300vh] w-full bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center will-change-transform">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          style={{
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            WebkitFontSmoothing: "antialiased",
          }}
        />
        {children}
        {!imagesLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#121212]">
            <p className="text-sm font-light uppercase tracking-widest text-white/50 animate-pulse">
              Loading Experience...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
