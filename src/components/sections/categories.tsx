"use client";

import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerContainer, staggerItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const MotionLink = motion.create(Link);

export function Categories() {
  return (
    <section id="categories" className="relative px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Browse the wardrobe"
            title={
              <>
                Shop by <span className="text-muted">category</span>
              </>
            }
          />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Eight essential families, each refined to a small, perfect
            selection. No noise — only the pieces worth keeping.
          </p>
        </div>

        <StaggerContainer className="mt-14 grid auto-rows-[200px] grid-cols-2 gap-4 md:auto-rows-[230px] md:grid-cols-4">
          {categories.map((cat) => (
            <MotionLink
              key={cat.id}
              href={`/shop?category=${cat.id}`}
              variants={staggerItem}
              className={cn(
                "group relative overflow-hidden rounded-glass border border-[var(--glass-border)] hover-lift",
                cat.span === "tall" && "row-span-2",
                cat.span === "wide" && "col-span-2"
              )}
            >
              <SmartImage
                src={cat.image}
                alt={cat.name}
                fill
                sizes="(max-width:768px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/75" />

              {/* Glass label */}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-between rounded-2xl glass-soft px-4 py-3 transition-all duration-500 group-hover:translate-y-0">
                <div>
                  <p className="font-display text-lg font-medium leading-none text-white">
                    {cat.name}
                  </p>
                  <p className="mt-1 text-xs text-white/70">
                    {cat.count} pieces
                  </p>
                </div>
                <span className="grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white transition-all duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-black">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </MotionLink>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
