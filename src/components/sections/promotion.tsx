"use client";

import { SmartImage } from "@/components/ui/smart-image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

const pad = (n: number) => n.toString().padStart(2, "0");

function useCountdown(durationMs: number) {
  const [remaining, setRemaining] = useState(durationMs);

  useEffect(() => {
    const target = Date.now() + durationMs;
    const tick = () => setRemaining(Math.max(0, target - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [durationMs]);

  const days = Math.floor(remaining / 86_400_000);
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return { days, hours, minutes, seconds };
}

export function Promotion() {
  const { days, hours, minutes, seconds } = useCountdown(
    2 * 86_400_000 + 14 * 3_600_000
  );

  const units = [
    { label: "Days", value: days },
    { label: "Hours", value: hours },
    { label: "Minutes", value: minutes },
    { label: "Seconds", value: seconds },
  ];

  return (
    <section className="relative px-6 py-12 md:px-10">
      <Reveal blur className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2.5rem]">
          <SmartImage
            src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1800&q=80"
            alt="Seasonal promotion"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />

          <div className="relative grid gap-10 px-8 py-16 md:grid-cols-2 md:items-center md:px-16 md:py-24">
            <div>
              <span className="eyebrow text-white/70">Limited time</span>
              <h2 className="display-xl mt-4 text-white">
                The Mid-Season
                <br />
                <span className="text-white/60">Event — up to 40% off</span>
              </h2>
              <p className="mt-5 max-w-md text-white/70">
                Select coats, knitwear and tailoring at archive pricing. Once
                they&apos;re gone, they&apos;re gone.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-black hover:bg-white"
                >
                  Shop the Event
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="glass" className="text-white">
                  View lookbook
                </Button>
              </div>
            </div>

            {/* Countdown */}
            <div className="flex gap-3 md:justify-end">
              {units.map((u) => (
                <div
                  key={u.label}
                  className="glass flex aspect-square w-[72px] flex-col items-center justify-center rounded-3xl md:w-24"
                >
                  <motion.span
                    key={u.value}
                    initial={{ y: -12, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="font-display text-2xl font-semibold text-white md:text-4xl"
                  >
                    {pad(u.value)}
                  </motion.span>
                  <span className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                    {u.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
