"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useCart } from "@/components/providers/cart-provider";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "New In", href: "#categories" },
  { label: "Featured", href: "#featured" },
  { label: "Best Sellers", href: "#bestsellers" },
  { label: "About", href: "#why" },
  { label: "Journal", href: "#instagram" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      >
        <nav
          className={cn(
            "flex w-full max-w-7xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:px-4",
            scrolled
              ? "glass-nav scale-100"
              : "border border-transparent bg-transparent shadow-none"
          )}
        >
          {/* Left: hamburger */}
          <div className="flex items-center gap-1">
            <IconButton
              label="Open menu"
              onClick={() => setMenuOpen(true)}
              className="md:h-11 md:w-11"
            >
              <Menu className="h-[18px] w-[18px]" />
            </IconButton>
            <span className="hidden text-xs font-medium tracking-[0.2em] text-muted md:inline">
              MENU
            </span>
          </div>

          {/* Center: logo */}
          <a
            href="#top"
            className="font-display text-xl tracking-[0.18em] md:text-2xl"
            style={{ fontWeight: 700 }}
          >
            MAISON
          </a>

          {/* Right cluster */}
          <div className="flex items-center gap-0.5 md:gap-1">
            <button className="btn-shine relative mr-1 hidden h-10 items-center rounded-full border border-[var(--ring)] px-5 text-sm font-medium transition-colors hover:bg-foreground hover:text-background sm:inline-flex">
              Login
            </button>
            <ThemeToggle />
            <IconButton label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="h-[18px] w-[18px]" />
            </IconButton>
            <IconButton label="Cart" className="relative">
              <ShoppingBag className="h-[18px] w-[18px]" />
              <AnimatePresence>
                {count > 0 && (
                  <motion.span
                    key={count}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 18 }}
                    className="absolute -right-0.5 -top-0.5 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground"
                  >
                    {count}
                  </motion.span>
                )}
              </AnimatePresence>
            </IconButton>
          </div>
        </nav>
      </motion.header>

      {/* Full screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <MenuOverlay onClose={() => setMenuOpen(false)} />
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <AnimatePresence>
        {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

function IconButton({
  children,
  label,
  onClick,
  className,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      aria-label={label}
      onClick={onClick}
      className={cn(
        "grid h-11 w-11 place-items-center rounded-full transition-colors duration-300 hover:bg-foreground/5 active:scale-95",
        className
      )}
    >
      {children}
    </button>
  );
}

function MenuOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[60] flex"
    >
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: 0 }}
        exit={{ y: "-100%" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="glass relative flex h-full w-full flex-col px-6 py-6 md:px-12"
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-2xl tracking-[0.18em]" style={{ fontWeight: 700 }}>
            MAISON
          </span>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="grid h-12 w-12 place-items-center rounded-full transition-colors hover:bg-foreground/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-auto mb-auto">
          <ul className="space-y-1">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  delay: 0.15 + i * 0.07,
                  duration: 0.6,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-baseline gap-4 py-1"
                >
                  <span className="font-mono text-xs text-muted">
                    0{i + 1}
                  </span>
                  <span className="font-display text-5xl font-medium tracking-tight transition-all duration-300 group-hover:translate-x-3 group-hover:opacity-60 md:text-7xl">
                    {link.label}
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted"
        >
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Instagram
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Pinterest
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              TikTok
            </a>
          </div>
          <span>hello@maison.studio</span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function SearchOverlay({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-32"
      style={{ background: "rgba(0,0,0,0.25)" }}
    >
      <motion.div
        initial={{ y: -20, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: -20, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass w-full max-w-2xl rounded-glass p-2"
      >
        <div className="flex items-center gap-3 px-4">
          <Search className="h-5 w-5 text-muted" />
          <input
            autoFocus
            placeholder="Search for pieces, collections…"
            className="h-14 w-full bg-transparent text-lg outline-none placeholder:text-muted"
          />
          <button
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-full transition-colors hover:bg-foreground/10"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2 px-4 pb-3 pt-1">
          {["Wool Coat", "Cashmere", "Sneakers", "Linen"].map((t) => (
            <span
              key={t}
              className="rounded-full border border-[var(--ring)] px-3 py-1 text-xs text-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
