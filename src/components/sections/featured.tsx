"use client";

import Link from "next/link";
import { featuredProducts } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProductCardMotion } from "@/components/ui/product-card";
import { StaggerContainer, Reveal } from "@/components/ui/reveal";
import { ArrowRight } from "lucide-react";

export function Featured() {
  return (
    <section
      id="featured"
      className="relative px-6 py-24 md:px-10 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Hand-picked this week"
          title={
            <>
              Featured <span className="text-muted">pieces</span>
            </>
          }
          description="A rotating edit of the season's most considered designs — selected for cut, material, and longevity."
        />

        <StaggerContainer
          className="mt-14 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
          stagger={0.07}
        >
          {featuredProducts.map((p) => (
            <ProductCardMotion key={p.id} product={p} />
          ))}
        </StaggerContainer>

        <Reveal className="mt-16 flex justify-center" delay={0.1}>
          <Link
            href="/shop"
            className="btn-shine group inline-flex h-14 items-center justify-center gap-2 rounded-full border border-[var(--ring)] px-9 text-base font-semibold tracking-tight transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            View all products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
