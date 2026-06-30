"use client";

import { SmartImage } from "@/components/ui/smart-image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Quote } from "lucide-react";
import { testimonials } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % testimonials.length),
      5200
    );
    return () => clearInterval(id);
  }, []);

  const t = testimonials[index];

  return (
    <section className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <SectionHeading
          align="center"
          eyebrow="Words from our community"
          title={
            <>
              Loved, worn, <span className="text-muted">repeated</span>
            </>
          }
          className="mx-auto"
        />

        <Reveal delay={0.1} className="mt-14">
          <div className="glass relative mx-auto overflow-hidden rounded-glass px-8 py-14 md:px-16">
            <Quote className="mx-auto h-10 w-10 text-foreground/15" />
            <div className="relative mt-6 min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.figure
                  key={t.id}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight md:text-[1.9rem]">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-8 flex items-center justify-center gap-4">
                    <span className="relative h-12 w-12 overflow-hidden rounded-full border border-[var(--glass-border)]">
                      <SmartImage
                        src={t.avatar}
                        alt={t.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                    <span className="text-left">
                      <p className="font-medium">{t.name}</p>
                      <p className="text-sm text-muted">{t.role}</p>
                    </span>
                  </figcaption>
                </motion.figure>
              </AnimatePresence>
            </div>

            <div className="mt-10 flex items-center justify-center gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  aria-label={`Show testimonial ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className="h-2 rounded-full transition-all duration-500"
                  style={{
                    width: i === index ? 28 : 8,
                    background:
                      i === index ? "var(--accent)" : "var(--ring)",
                  }}
                />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
