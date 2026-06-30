"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  /** How strongly the button follows the cursor (0-1). */
  strength?: number;
  ariaLabel?: string;
}

/**
 * Premium glassmorphism CTA with a magnetic cursor pull, ripple click, soft
 * glow and shine. Renders a Link when `href` is provided, otherwise a button.
 */
export function MagneticButton({
  children,
  href,
  onClick,
  className,
  strength = 0.4,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    x.set(relX * strength);
    y.set(relY * strength);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const spawnRipple = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const circle = document.createElement("span");
    const d = Math.max(rect.width, rect.height);
    circle.style.cssText = `position:absolute;width:${d}px;height:${d}px;left:${
      e.clientX - rect.left - d / 2
    }px;top:${
      e.clientY - rect.top - d / 2
    }px;border-radius:9999px;background:currentColor;opacity:0.25;transform:scale(0);pointer-events:none;animation:ripple 0.65s ease-out forwards;`;
    el.appendChild(circle);
    setTimeout(() => circle.remove(), 680);
  };

  const content = (
    <span className="relative z-10 flex items-center gap-2">{children}</span>
  );

  const baseClass = cn(
    "btn-shine group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-full px-9 text-base font-semibold tracking-tight",
    "glass text-foreground",
    "shadow-[0_18px_50px_-15px_var(--glass-shadow)]",
    "transition-[transform,box-shadow,background] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
    "hover:shadow-[0_26px_70px_-18px_var(--glass-shadow)]",
    className
  );

  const glow = (
    <span
      aria-hidden
      className="pointer-events-none absolute -inset-2 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-60"
      style={{
        background:
          "radial-gradient(closest-side, var(--ring), transparent 70%)",
      }}
    />
  );

  if (href) {
    return (
      <motion.div
        style={{ x: sx, y: sy }}
        onMouseMove={handleMove}
        onMouseLeave={reset}
        className="inline-block"
      >
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          aria-label={ariaLabel}
          onMouseDown={spawnRipple}
          className={baseClass}
        >
          {glow}
          {content}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      style={{ x: sx, y: sy }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className="inline-block"
    >
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        aria-label={ariaLabel}
        onMouseDown={spawnRipple}
        onClick={onClick}
        className={baseClass}
      >
        {glow}
        {content}
      </button>
    </motion.div>
  );
}
