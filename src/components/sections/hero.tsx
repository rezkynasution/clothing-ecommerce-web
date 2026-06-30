"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { SmartImage } from "@/components/ui/smart-image";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { heroSlides } from "@/lib/data";
import { MagneticButton } from "@/components/ui/magnetic-button";

const AUTOPLAY_MS = 5000;

export function Hero() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mouse parallax
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 20 });
  const sy = useSpring(my, { stiffness: 60, damping: 20 });
  const imgX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const imgY = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const contentX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const contentY = useTransform(sy, [-0.5, 0.5], [8, -8]);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setIndex((prev) => (prev + dir + heroSlides.length) % heroSlides.length);
  }, []);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > index ? 1 : -1);
      setIndex(i);
    },
    [index]
  );

  useEffect(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => paginate(1), AUTOPLAY_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [index, paginate]);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const slide = heroSlides[index];

  return (
    <section
      id="top"
      onMouseMove={onMouseMove}
      className="relative h-svh min-h-[640px] w-full overflow-hidden"
    >
      {/* Background slides */}
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={slide.id}
          custom={direction}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <motion.div
            style={{ x: imgX, y: imgY }}
            className="absolute inset-[-6%]"
          >
            <div className="animate-kenburns relative h-full w-full">
              <SmartImage
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Gradient + glass overlays for legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-6 pb-24 md:px-10 md:pb-28">
        <motion.div style={{ x: contentX, y: contentY }} className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="eyebrow text-white/80">{slide.eyebrow}</span>
              <h1 className="display-hero mt-5 text-white">
                {slide.title}
                <br />
                <span className="text-white/70">{slide.highlight}</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
                {slide.description}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton
              href="/shop"
              ariaLabel="Shop the collection"
              className="border-white/30 bg-white/15 text-white hover:bg-white/25"
            >
              Shop Now
              <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>
        </motion.div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className="group relative h-1 overflow-hidden rounded-full bg-white/25 transition-all duration-500"
                style={{ width: i === index ? 56 : 22 }}
              >
                {i === index && (
                  <motion.span
                    key={index}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    className="absolute inset-0 origin-left bg-white"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              aria-label="Previous slide"
              onClick={() => paginate(-1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Next slide"
              onClick={() => paginate(1)}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/25 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-black"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-white/60 md:flex"
      >
        <span className="text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="h-8 w-px bg-white/40"
        />
      </motion.div>
    </section>
  );
}
