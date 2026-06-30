"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, Heart, Plus, Star } from "lucide-react";
import type { Product } from "@/lib/data";
import { formatPrice, cn } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { SmartImage } from "@/components/ui/smart-image";

export function ProductCard({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { addItem, toggleWishlist, isWished } = useCart();
  const wished = isWished(product.id);
  const href = `/product/${product.id}`;

  return (
    <div
      className={cn(
        "group relative flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5",
        className
      )}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-glass border border-[var(--glass-border)] bg-foreground/5 transition-shadow duration-500 group-hover:shadow-[0_30px_60px_-25px_var(--glass-shadow)]">
        <SmartImage
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width:768px) 50vw, 25vw"
          className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08]"
        />

        {/* Navigation overlay (sits above image, below the action buttons) */}
        <Link
          href={href}
          aria-label={`View ${product.name}`}
          className="absolute inset-0 z-[1]"
        />

        {/* Hover glass overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Badge */}
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full glass-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground">
            {product.badge}
          </span>
        )}

        {/* Wishlist */}
        <button
          aria-label="Add to wishlist"
          onClick={() => toggleWishlist(product.id)}
          className="absolute right-3 top-3 z-10 grid h-10 w-10 place-items-center rounded-full glass-soft text-foreground transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-all",
              wished && "fill-red-500 stroke-red-500"
            )}
          />
        </button>

        {/* Action bar */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex translate-y-4 items-center gap-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addItem()}
            className="btn-shine flex h-11 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-sm font-semibold text-accent-foreground transition-transform active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Add to Cart
          </button>
          <Link
            href={href}
            aria-label="Quick view"
            className="grid h-11 w-11 place-items-center rounded-full glass text-foreground transition-transform hover:scale-105 active:scale-95"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Meta */}
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted">
            {product.category}
          </p>
          <h3 className="mt-1 font-display text-base font-medium leading-snug">
            <Link
              href={href}
              className="transition-colors hover:text-muted"
            >
              {product.name}
            </Link>
          </h3>
        </div>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-3.5 w-3.5 fill-amber-400 stroke-amber-400" />
          <span className="font-medium">{product.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="font-display text-lg font-semibold">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice && (
          <span className="text-sm text-muted line-through">
            {formatPrice(product.oldPrice)}
          </span>
        )}
        <span className="ml-auto text-xs text-muted">
          {product.reviews} reviews
        </span>
      </div>
    </div>
  );
}

export function ProductCardMotion({ product }: { product: Product }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
        visible: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      <ProductCard product={product} />
    </motion.div>
  );
}
