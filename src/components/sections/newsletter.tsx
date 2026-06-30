"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setTimeout(() => {
      setDone(false);
      setEmail("");
    }, 2600);
  };

  return (
    <section className="relative px-6 py-20 md:px-10">
      <Reveal blur className="mx-auto max-w-5xl">
        <div className="glass mesh-bg relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center md:px-16 md:py-20">
          <span className="eyebrow text-muted">Stay in the loop</span>
          <h2 className="display-xl mx-auto mt-4 max-w-2xl">
            First access to new drops &amp; private sales
          </h2>
          <p className="mx-auto mt-5 max-w-md text-muted">
            Join 40,000+ members. Considered emails only — unsubscribe anytime.
          </p>

          <form
            onSubmit={submit}
            className="glass-soft mx-auto mt-10 flex max-w-md items-center gap-2 rounded-full p-2"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="h-12 flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-muted"
            />
            <button
              type="submit"
              className="btn-shine relative grid h-12 w-12 place-items-center overflow-hidden rounded-full bg-accent text-accent-foreground transition-transform active:scale-95 md:w-auto md:px-6"
            >
              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <motion.span
                    key="done"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <Check className="h-4 w-4" />
                    <span className="hidden md:inline">Subscribed</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="flex items-center gap-2 text-sm font-semibold"
                  >
                    <span className="hidden md:inline">Subscribe</span>
                    <ArrowRight className="h-4 w-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>
        </div>
      </Reveal>
    </section>
  );
}
