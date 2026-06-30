"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef, useRef } from "react";

const buttonVariants = cva(
  "btn-shine relative inline-flex items-center justify-center gap-2 rounded-full font-sans font-semibold tracking-tight transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:opacity-50 disabled:pointer-events-none select-none",
  {
    variants: {
      variant: {
        primary:
          "bg-accent text-accent-foreground hover:shadow-[0_12px_30px_-8px_var(--ring)] hover:-translate-y-0.5 active:translate-y-0",
        glass:
          "glass-soft text-foreground hover:shadow-[0_10px_28px_-10px_var(--glass-shadow)] hover:-translate-y-0.5",
        outline:
          "border border-[var(--ring)] text-foreground hover:bg-foreground hover:text-background",
        ghost: "text-foreground/80 hover:text-foreground hover:bg-foreground/5",
      },
      size: {
        sm: "h-10 px-5 text-sm",
        md: "h-12 px-7 text-sm",
        lg: "h-14 px-9 text-base",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  ripple?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, ripple = true, children, onClick, ...props },
    ref
  ) => {
    const localRef = useRef<HTMLButtonElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (ripple) {
        const btn = localRef.current;
        if (btn) {
          const circle = document.createElement("span");
          const diameter = Math.max(btn.clientWidth, btn.clientHeight);
          const rect = btn.getBoundingClientRect();
          circle.style.width = circle.style.height = `${diameter}px`;
          circle.style.left = `${e.clientX - rect.left - diameter / 2}px`;
          circle.style.top = `${e.clientY - rect.top - diameter / 2}px`;
          circle.style.position = "absolute";
          circle.style.borderRadius = "9999px";
          circle.style.background = "currentColor";
          circle.style.opacity = "0.25";
          circle.style.transform = "scale(0)";
          circle.style.pointerEvents = "none";
          circle.style.animation = "ripple 0.6s ease-out forwards";
          btn.appendChild(circle);
          setTimeout(() => circle.remove(), 650);
        }
      }
      onClick?.(e);
    };

    return (
      <button
        ref={(node) => {
          localRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(buttonVariants({ variant, size, className }))}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
