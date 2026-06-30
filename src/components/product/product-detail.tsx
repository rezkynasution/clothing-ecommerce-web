"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Heart,
  Minus,
  Plus,
  Ruler,
  ShoppingBag,
  Star,
  Truck,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import type { Product, Review } from "@/lib/data";
import { cn, formatPrice } from "@/lib/utils";
import { useCart } from "@/components/providers/cart-provider";
import { SmartImage } from "@/components/ui/smart-image";
import { ProductCard } from "@/components/ui/product-card";
import { Reveal } from "@/components/ui/reveal";
import { SizeChartModal } from "@/components/product/size-chart-modal";

export function ProductDetail({
  product,
  reviews,
  related,
}: {
  product: Product;
  reviews: Review[];
  related: Product[];
}) {
  const { addItem, toggleWishlist, isWished } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [color, setColor] = useState(product.colors[0]?.name);
  const [size, setSize] = useState("M");
  const [qty, setQty] = useState(1);
  const [zoom, setZoom] = useState(false);
  const [origin, setOrigin] = useState("50% 50%");
  const [chartOpen, setChartOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [buying, setBuying] = useState(false);

  const wished = isWished(product.id);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  const handleAdd = () => {
    addItem(qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuy = () => {
    addItem(qty);
    setBuying(true);
    setTimeout(() => setBuying(false), 2200);
  };

  return (
    <main className="relative mx-auto max-w-7xl px-6 pb-28 pt-28 md:px-10 md:pt-36">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted">
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="transition-colors hover:text-foreground">
          Shop
        </Link>
        <span>/</span>
        <Link
          href={`/shop?category=${product.categoryId}`}
          className="transition-colors hover:text-foreground"
        >
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <Link
        href="/shop"
        className="mt-6 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to shop
      </Link>

      <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
            onMouseMove={onMove}
            className="relative aspect-[4/5] cursor-zoom-in overflow-hidden rounded-glass border border-[var(--glass-border)] bg-foreground/5"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 transition-transform duration-500 ease-out"
                style={{
                  transformOrigin: origin,
                  transform: zoom ? "scale(1.8)" : "scale(1)",
                }}
              >
                <SmartImage
                  src={product.images[activeImg]}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width:1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {product.badge && (
              <span className="absolute left-4 top-4 z-10 rounded-full glass-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider">
                {product.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3">
            {product.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setActiveImg(i)}
                aria-label={`View image ${i + 1}`}
                className={cn(
                  "relative aspect-[4/5] w-20 overflow-hidden rounded-2xl border transition-all duration-300 md:w-24",
                  i === activeImg
                    ? "border-foreground ring-2 ring-[var(--ring)]"
                    : "border-[var(--glass-border)] opacity-60 hover:opacity-100"
                )}
              >
                <SmartImage
                  src={src}
                  alt={`${product.name} ${i + 1}`}
                  fill
                  sizes="100px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="lg:py-2">
          <span className="eyebrow text-muted">{product.category}</span>
          <h1 className="display-xl mt-3">{product.name}</h1>

          {/* Rating */}
          <a
            href="#reviews"
            className="mt-4 inline-flex items-center gap-2 text-sm"
          >
            <span className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.round(product.rating)
                      ? "fill-amber-400 stroke-amber-400"
                      : "stroke-muted"
                  )}
                />
              ))}
            </span>
            <span className="font-medium">{product.rating.toFixed(1)}</span>
            <span className="text-muted underline-offset-4 hover:underline">
              {product.reviews} reviews
            </span>
          </a>

          {/* Price */}
          <div className="mt-6 flex items-center gap-3">
            <span className="font-display text-3xl font-semibold">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-muted line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="rounded-full bg-red-500/10 px-2.5 py-1 text-xs font-semibold text-red-500">
                  Save {formatPrice(product.oldPrice - product.price)}
                </span>
              </>
            )}
          </div>

          <p className="mt-6 max-w-md leading-relaxed text-muted">
            {product.description}
          </p>

          {/* Colors */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                Colour — <span className="text-muted">{color}</span>
              </span>
            </div>
            <div className="mt-3 flex gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c.name)}
                  aria-label={c.name}
                  className={cn(
                    "relative h-9 w-9 rounded-full border transition-transform duration-300 hover:scale-110",
                    color === c.name
                      ? "border-foreground ring-2 ring-offset-2 ring-[var(--ring)] ring-offset-background"
                      : "border-[var(--glass-border)]"
                  )}
                  style={{ background: c.hex }}
                />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mt-8">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Size</span>
              <button
                onClick={() => setChartOpen(true)}
                className="inline-flex items-center gap-1.5 text-sm text-muted underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                <Ruler className="h-4 w-4" />
                Size chart
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2.5">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={cn(
                    "h-12 min-w-[3rem] rounded-2xl px-4 text-sm font-medium transition-all duration-300",
                    size === s
                      ? "bg-accent text-accent-foreground"
                      : "glass-soft hover:-translate-y-0.5"
                  )}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <div className="glass-soft flex h-14 items-center rounded-full px-2">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Decrease quantity"
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-foreground/10 active:scale-95"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center font-display text-lg font-semibold">
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Increase quantity"
                className="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-foreground/10 active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Add to wishlist"
              className="glass-soft grid h-14 w-14 place-items-center rounded-full transition-transform hover:-translate-y-0.5 active:scale-95"
            >
              <Heart
                className={cn(
                  "h-5 w-5 transition-all",
                  wished && "fill-red-500 stroke-red-500"
                )}
              />
            </button>
          </div>

          <div className="mt-3 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={handleAdd}
              className="btn-shine relative flex h-14 flex-1 items-center justify-center gap-2 rounded-full bg-accent text-base font-semibold text-accent-foreground transition-transform active:scale-[0.99]"
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    <Check className="h-5 w-5" /> Added to cart
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex items-center gap-2"
                  >
                    <ShoppingBag className="h-5 w-5" /> Add to Cart
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button
              onClick={handleBuy}
              className="btn-shine glass relative flex h-14 flex-1 items-center justify-center gap-2 rounded-full text-base font-semibold transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
            >
              {buying ? (
                <span className="flex items-center gap-2">
                  <Check className="h-5 w-5" /> Order placed
                </span>
              ) : (
                "Purchase Now"
              )}
            </button>
          </div>

          {/* Assurances */}
          <div className="mt-9 grid grid-cols-1 gap-3 border-t border-[var(--hairline)] pt-7 sm:grid-cols-3">
            {[
              { icon: Truck, label: "Free shipping" },
              { icon: RotateCcw, label: "30-day returns" },
              { icon: ShieldCheck, label: "2-year warranty" },
            ].map((f) => (
              <div key={f.label} className="flex items-center gap-2.5 text-sm">
                <f.icon className="h-5 w-5 text-muted" strokeWidth={1.6} />
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <section id="reviews" className="mt-24 scroll-mt-28">
        <Reveal>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="eyebrow text-muted">What people say</span>
              <h2 className="display-xl mt-3">Customer reviews</h2>
            </div>
            <div className="glass flex items-center gap-4 rounded-glass px-6 py-4">
              <span className="font-display text-4xl font-semibold">
                {product.rating.toFixed(1)}
              </span>
              <div>
                <span className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.round(product.rating)
                          ? "fill-amber-400 stroke-amber-400"
                          : "stroke-muted"
                      )}
                    />
                  ))}
                </span>
                <span className="text-sm text-muted">
                  Based on {product.reviews} reviews
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <Reveal key={r.id} delay={i * 0.06}>
              <article className="glass h-full rounded-glass p-6">
                <div className="flex items-center gap-3">
                  <span className="relative h-11 w-11 overflow-hidden rounded-full border border-[var(--glass-border)]">
                    <SmartImage
                      src={r.avatar}
                      alt={r.name}
                      fill
                      sizes="44px"
                      className="object-cover"
                    />
                  </span>
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="text-xs text-muted">
                      {r.role} · {r.date}
                    </p>
                  </div>
                  <span className="ml-auto flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={cn(
                          "h-3.5 w-3.5",
                          j < r.rating
                            ? "fill-amber-400 stroke-amber-400"
                            : "stroke-muted"
                        )}
                      />
                    ))}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-lg font-medium">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {r.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Related */}
      <section className="mt-24">
        <Reveal>
          <span className="eyebrow text-muted">You may also like</span>
          <h2 className="display-xl mt-3">Related products</h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
          {related.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <SizeChartModal open={chartOpen} onClose={() => setChartOpen(false)} />
    </main>
  );
}
