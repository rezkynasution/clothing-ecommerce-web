# MAISON — Premium Fashion E‑Commerce

An Awwwards‑style, luxury fashion storefront built as an immersive digital
experience: glassmorphism, cinematic smooth scrolling, premium motion design,
and pixel‑perfect responsive layouts.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (class‑based theming via a custom `dark` variant)
- **Framer Motion** — section reveals, slider, micro‑interactions
- **Lenis** — buttery smooth / cinematic scrolling
- **GSAP** & **SplitType** — available for advanced text/scroll effects
- **lucide-react** — iconography
- Fonts: **Space Grotesk** (display) + **Inter** (body)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Features

- Floating navbar that turns to glassmorphism on scroll, full‑screen menu,
  command‑style search overlay, animated theme toggle, live cart badge.
- 100vh hero slider: autoplay (5s), manual arrows, animated pagination,
  fade transitions, Ken Burns zoom, and mouse/parallax movement.
- Glass category grid, featured product grid with hover quick‑view / wishlist /
  add‑to‑cart, countdown promotion banner, infinite best‑seller marquee,
  animated "why choose us", auto‑sliding testimonials, Instagram masonry,
  glass newsletter and a minimal oversized‑logo footer.
- Light & dark themes with a smooth animated transition (persisted to
  `localStorage`, respects system preference, no flash on load).
- Scroll‑reveal (fade / blur / stagger / parallax) throughout.

## Project structure

```
src/
  app/                  # layout, page, global design tokens
  components/
    layout/             # navbar, footer
    providers/          # theme, cart, Lenis smooth scroll
    sections/           # hero, categories, featured, promotion, …
    ui/                 # button, reveal, product-card, smart-image, …
  lib/                  # data (mock catalog) + utils
```

## Notes

- Imagery is served from Unsplash via `next/image`. `SmartImage`
  (`src/components/ui/smart-image.tsx`) shows a shimmer while loading and an
  elegant gradient fallback if any remote image fails — the layout never breaks.
- Remote image hosts are whitelisted in `next.config.ts`.
- All motion respects `prefers-reduced-motion`.
