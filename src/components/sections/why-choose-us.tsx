"use client";

import { motion } from "framer-motion";
import { Gem, ShieldCheck, Timer, Truck } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, staggerItem } from "@/components/ui/reveal";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    desc: "Complimentary carbon-neutral delivery on every order, worldwide.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    desc: "256-bit encrypted checkout with all major methods supported.",
  },
  {
    icon: Timer,
    title: "Fast Delivery",
    desc: "Dispatched within 24 hours, at your door in two to four days.",
  },
  {
    icon: Gem,
    title: "Premium Quality",
    desc: "Responsibly sourced fabrics, finished by master craftspeople.",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          align="center"
          eyebrow="The MAISON promise"
          title={
            <>
              Crafted to a higher <span className="text-muted">standard</span>
            </>
          }
          className="mx-auto"
        />

        <StaggerContainer className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={staggerItem}
              className="group glass flex flex-col items-start rounded-glass p-8 hover-lift"
            >
              <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-foreground/5 transition-colors duration-500 group-hover:bg-accent group-hover:text-accent-foreground">
                <motion.span
                  whileHover={{ rotate: -8, scale: 1.08 }}
                  transition={{ type: "spring", stiffness: 300, damping: 12 }}
                >
                  <f.icon className="h-6 w-6" strokeWidth={1.6} />
                </motion.span>
              </div>
              <h3 className="mt-6 font-display text-xl font-medium">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
