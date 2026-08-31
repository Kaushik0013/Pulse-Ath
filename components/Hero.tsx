"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, Zap, Activity } from "lucide-react";

const TOTAL_FRAMES = 36;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Track scroll progress through the hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Ensure headline is prominent and visible
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.8, 1], [0, 0, -40]);

  // Preload frame images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(3, "0");
      img.src = `/frames/frame_${frameNum}.jpg`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === TOTAL_FRAMES) {
          setImagesLoaded(true);
        }
      };
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Render canvas frame based on scroll progress
  useEffect(() => {
    const renderFrame = (progress: number) => {
      const canvas = canvasRef.current;
      if (!canvas || images.length === 0) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Map scroll progress across 36 frames
      const animProgress = Math.min(1, Math.max(0, progress / 0.85));
      let frameIndex = Math.floor(animProgress * (TOTAL_FRAMES - 1));
      frameIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));

      const img = images[frameIndex];
      if (!img || !img.complete) return;

      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const imgWidth = img.naturalWidth || img.width;
      const imgHeight = img.naturalHeight || img.height;

      // Cover mode scaling
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
      
      const initialOffsetY = (1 - animProgress) * (imgHeight * scale * 0.15);
      const x = (canvasWidth - imgWidth * scale) / 2;
      const y = (canvasHeight - imgHeight * scale) / 2 - initialOffsetY;

      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
    };

    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        renderFrame(scrollYProgress.get());
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const unsubscribe = scrollYProgress.on("change", (latest) => {
      renderFrame(latest);
    });

    return () => {
      window.removeEventListener("resize", handleResize);
      unsubscribe();
    };
  }, [images, scrollYProgress]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-[300vh] bg-black text-white"
    >
      {/* Sticky Pinned Viewport Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between items-center py-16 px-4">
        
        {/* Background Layer: Pull-up Canvas Sequence */}
        <div className="absolute inset-0 z-0">
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover filter contrast-125 brightness-90 opacity-65"
          />
          {/* Layered Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-black/50 to-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-500/15 via-transparent to-transparent" />
        </div>

        {/* Foreground Text Overlay: Prominent Headline */}
        <motion.div
          style={{ opacity: headlineOpacity, y: headlineY }}
          className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center justify-center my-auto px-4 select-none"
        >
          {/* Main Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter uppercase leading-none text-white">
            <span className="block text-white">TRAIN WITH</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-400 to-red-600 drop-shadow-[0_0_35px_rgba(255,59,0,0.4)]">
              PURPOSE
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-zinc-300 max-w-2xl font-light leading-relaxed">
            Precision Athletic Engineering.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <a
              href="#muscle-activation"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-400 hover:to-red-500 text-black font-extrabold text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-orange-500/30 hover:scale-105 flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 fill-black" />
              <span>EXPLORE ANATOMY ENGINE</span>
            </a>
            <a
              href="#lead-capture"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Activity className="w-4 h-4 text-orange-500" />
              <span>START TRANSFORMATION</span>
            </a>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="relative z-10 flex flex-col items-center gap-2"
        >
          <a
            href="#muscle-activation"
            className="flex flex-col items-center gap-2 text-zinc-400 hover:text-orange-400 transition-colors group cursor-pointer"
          >
            <span className="text-xs font-mono tracking-widest uppercase font-semibold text-zinc-400 group-hover:text-orange-400">
              DISCOVER ANATOMY
            </span>
            <div className="w-8 h-12 rounded-full border-2 border-zinc-600 group-hover:border-orange-500 flex items-start justify-center p-1.5 transition-colors">
              <motion.div
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                className="w-1.5 h-3 rounded-full bg-orange-500 shadow-md shadow-orange-500/80"
              />
            </div>
            <ChevronDown className="w-4 h-4 text-orange-500 animate-bounce -mt-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
