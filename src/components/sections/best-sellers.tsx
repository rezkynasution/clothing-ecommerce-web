"use client";

import Link from "next/link";
import { SmartImage } from "@/components/ui/smart-image";
import { bestSellers } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { formatPrice } from "@/lib/utils";
import { Star } from "lucide-react";

export function BestSellers() {
  const loop = [...bestSellers, ...bestSellers];

  return (
    <section id="bestsellers" className="relative overflow-hidden py-24 md:py-32">
      <div className="mx-auto mb-14 max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Loved by thousands"
          title={
            <>
              Best <span className="text-muted">sellers</span>
            </>
          }
          description="The pieces our community returns to season after season."
        />
      </div>

      <div className="marquee-paused group relative">
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />

        <div
          className="animate-marquee flex w-max gap-6 px-6"
          style={{ ["--marquee-duration" as string]: "45s" }}
        >
          {loop.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              href={`/product/${p.id}`}
              className="group/card glass block w-[300px] shrink-0 overflow-hidden rounded-glass p-3 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <SmartImage
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="300px"
                  className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                />
              </div>
              <div className="flex items-center justify-between px-2 pt-4">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
                    {p.category}
                  </p>
                  <h3 className="mt-1 font-display text-base font-medium">
                    {p.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
                  {p.rating.toFixed(1)}
                </div>
              </div>
              <div className="flex items-center justify-between px-2 pb-2 pt-3">
                <span className="font-display text-lg font-semibold">
                  {formatPrice(p.price)}
                </span>
                <span className="text-xs text-muted">{p.reviews} reviews</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
