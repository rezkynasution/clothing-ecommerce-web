"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { catalog, categoryNav, getProductsByCategory } from "@/lib/data";
import { ProductCard } from "@/components/ui/product-card";
import { cn, formatPrice } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { key: SortKey; label: string }[] = [
  { key: "featured", label: "Featured" },
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "rating", label: "Top Rated" },
];

const maxCatalogPrice = Math.max(...catalog.map((p) => p.price));

export function ShopView() {
  const params = useSearchParams();
  const initialCategory = params.get("category") ?? "all";

  const [category, setCategory] = useState(initialCategory);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [maxPrice, setMaxPrice] = useState(maxCatalogPrice);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Keep state in sync when arriving via a category link
  useEffect(() => {
    setCategory(params.get("category") ?? "all");
  }, [params]);

  // Reflect category in the URL without a full navigation
  useEffect(() => {
    const url =
      category === "all" ? "/shop" : `/shop?category=${category}`;
    window.history.replaceState(null, "", url);
  }, [category]);

  const products = useMemo(() => {
    let list = getProductsByCategory(category);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    list = list.filter((p) => p.price <= maxPrice);

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort(
          (a, b) => Number(b.featured ?? 0) - Number(a.featured ?? 0)
        );
    }
    return sorted;
  }, [category, query, sort, maxPrice]);

  const activeName =
    category === "all"
      ? "All Products"
      : categoryNav.find((c) => c.id === category)?.name ?? "Shop";

  return (
    <main className="relative mx-auto max-w-7xl px-6 pb-28 pt-28 md:px-10 md:pt-36">
      {/* Breadcrumb */}
      <motion.nav
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 text-sm text-muted"
      >
        <Link href="/" className="transition-colors hover:text-foreground">
          Home
        </Link>
        <span>/</span>
        <Link href="/shop" className="transition-colors hover:text-foreground">
          Shop
        </Link>
        {category !== "all" && (
          <>
            <span>/</span>
            <span className="text-foreground">{activeName}</span>
          </>
        )}
      </motion.nav>

      {/* Title */}
      <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <motion.h1
            key={activeName}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="display-xl"
          >
            {activeName}
          </motion.h1>
          <p className="mt-3 text-muted">
            {products.length}{" "}
            {products.length === 1 ? "piece" : "pieces"} — considered, crafted,
            built to last.
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="mt-10 flex flex-col gap-3 lg:flex-row lg:items-center">
        {/* Search */}
        <div className="glass-soft flex h-12 flex-1 items-center gap-3 rounded-full px-5">
          <Search className="h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pieces…"
            className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="grid h-6 w-6 place-items-center rounded-full hover:bg-foreground/10"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {/* Filter */}
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className={cn(
              "flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all",
              filtersOpen
                ? "bg-accent text-accent-foreground"
                : "glass-soft hover:-translate-y-0.5"
            )}
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filter
          </button>

          {/* Sort */}
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence initial={false}>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="glass mt-4 flex flex-col gap-5 rounded-glass p-6 md:flex-row md:items-center md:justify-between">
              <div className="w-full max-w-sm">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Max price</span>
                  <span className="text-muted">{formatPrice(maxPrice)}</span>
                </div>
                <input
                  type="range"
                  min={50}
                  max={maxCatalogPrice}
                  step={10}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="mt-3 w-full accent-[var(--accent)]"
                />
              </div>
              <button
                onClick={() => {
                  setMaxPrice(maxCatalogPrice);
                  setQuery("");
                  setSort("featured");
                }}
                className="self-start rounded-full border border-[var(--ring)] px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background md:self-auto"
              >
                Reset filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category nav */}
      <div className="no-scrollbar mt-8 flex gap-2 overflow-x-auto pb-2">
        {[{ id: "all", name: "All" }, ...categoryNav].map((c) => {
          const active = c.id === category;
          return (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={cn(
                "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                active ? "text-accent-foreground" : "text-muted hover:text-foreground"
              )}
            >
              {active && (
                <motion.span
                  layoutId="category-pill"
                  transition={{ type: "spring", stiffness: 350, damping: 32 }}
                  className="absolute inset-0 rounded-full bg-accent"
                />
              )}
              <span className="relative z-10">{c.name}</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <motion.div
        layout
        className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {products.map((p) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProductCard product={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {products.length === 0 && (
        <div className="mt-16 text-center text-muted">
          <p className="font-display text-2xl text-foreground">Nothing here yet</p>
          <p className="mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </main>
  );
}

function SortDropdown({
  value,
  onChange,
}: {
  value: SortKey;
  onChange: (v: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const current = sortOptions.find((o) => o.key === value)?.label;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="glass-soft flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium transition-all hover:-translate-y-0.5"
      >
        <span className="hidden text-muted sm:inline">Sort:</span>
        {current}
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-300",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute right-0 z-30 mt-2 w-56 overflow-hidden rounded-2xl p-1.5"
          >
            {sortOptions.map((o) => (
              <li key={o.key}>
                <button
                  onClick={() => {
                    onChange(o.key);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm transition-colors",
                    o.key === value
                      ? "bg-foreground/10 font-medium"
                      : "hover:bg-foreground/5"
                  )}
                >
                  {o.label}
                  {o.key === value && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
