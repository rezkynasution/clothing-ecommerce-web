"use client";

import { ArrowUpRight } from "lucide-react";

const columns = [
  {
    title: "Shop",
    links: ["New In", "Featured", "Best Sellers", "Sale", "Gift Cards"],
  },
  {
    title: "Company",
    links: ["About", "Sustainability", "Careers", "Press", "Stores"],
  },
  {
    title: "Support",
    links: ["Contact", "Shipping", "Returns", "Size Guide", "FAQ"],
  },
];

const socials = ["Instagram", "Pinterest", "TikTok", "YouTube"];

export function Footer() {
  return (
    <footer className="relative px-6 pb-10 pt-24 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-t border-[var(--hairline)] pt-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="text-sm text-muted">Modern fashion house</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s}
                  href="#"
                  className="group inline-flex items-center gap-1 rounded-full border border-[var(--ring)] px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"
                >
                  {s}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs uppercase tracking-[0.2em] text-muted">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-foreground/70 transition-colors hover:text-foreground"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Giant logo */}
        <div className="mt-20 select-none overflow-hidden">
          <h2
            className="font-display font-bold leading-none tracking-tight text-foreground/90"
            style={{ fontSize: "clamp(3.5rem, 17vw, 16rem)" }}
          >
            MAISON
          </h2>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-4 border-t border-[var(--hairline)] pt-8 text-sm text-muted md:flex-row md:items-center">
          <p>© {new Date().getFullYear()} MAISON Studio. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-foreground">
              Privacy
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
