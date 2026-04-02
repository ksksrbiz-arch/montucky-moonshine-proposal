# CLAUDE.md

## Project Overview

Montucky Moonshine proposal site — a premium storefront and venue showcase for a Montana-based brand. Built as a client proposal to redesign their web presence. The site is a static HTML/CSS/JS site deployed on Netlify.

**Business:** D & V Enterprises LLC (Montucky Moonshine), 3420 Byron Road, Helena MT 59602

## Repository Structure

```
.
├── index.html        # Main site — all pages, styles, and JS in one file (729 lines)
├── admin.jsx         # React admin dashboard prototype (424 lines, not deployed)
├── netlify.toml      # Netlify deployment config (SPA routing, security headers, caching)
├── venue/            # Local venue photos (6 WebP images, ~200-250KB each)
│   ├── bar.webp
│   ├── bar_long.webp
│   ├── bar_right.webp
│   ├── barback.webp
│   ├── lounge.webp
│   └── pool_table.webp
└── README.md
```

## Tech Stack

- **No build system** — pure static HTML5, CSS3, vanilla JavaScript
- **No frameworks** — no React, no bundler, no npm (except admin.jsx which is a standalone prototype)
- **Fonts:** Google Fonts — Playfair Display (headings), Barlow (body), Barlow Condensed (labels/UI)
- **Deployment:** Netlify with auto-deploy from this repo
- **E-commerce:** All "Buy Now" links route to existing Shopify store (no checkout on this site)

## Architecture of index.html

The entire public site lives in `index.html` as a single-page application:

### CSS (lines 1-284)
- CSS custom properties (design tokens) defined in `:root`
- Dark theme with amber (#c8922a) accent color
- Key color tokens: `--bg`, `--card`, `--amber`, `--cream`, `--t1/t2/t3`, `--bdr`
- Font families: `--ff-d` (display), `--ff-b` (body), `--ff-c` (condensed)
- WCAG 2.2 AA compliant focus states
- `prefers-reduced-motion` respected throughout
- Mobile-first responsive breakpoints: 480px, 640px, 768px, 1024px
- All touch targets >= 44px

### HTML Pages (lines 286-493)
Client-side page routing via `.page` / `.page.active` classes:
- `page-home` — Hero, photo strip, product grid, venue gallery, about, booking form
- `page-refund` — Refund policy (legal)
- `page-privacy` — Privacy policy (legal)
- `page-terms` — Terms of service (legal)

### JavaScript (lines 534-727)
- Product data array rendered into `#productGrid` via template literals
- `showPage(id)` — client-side page router
- Preloader with progress bar
- Scroll progress indicator
- Intersection Observer for scroll-reveal animations
- Parallax engine on hero background (`data-parallax` attribute)
- Hero floating particles (respects reduced-motion)
- Counter animation on venue stats
- Lightbox with keyboard nav (Escape, Arrow keys)
- Magnetic button hover effect

### Key Patterns
- Images use skeleton loading: `.img-wrap` with shimmer → `.loaded` class on `onload`
- Scroll reveals: `.reveal` elements get `.visible` via IntersectionObserver
- All external links use `target="_blank" rel="noopener noreferrer"`
- Product links go to `montuckymoonshine.com/products/...` (Shopify)

## admin.jsx (Not Deployed)

A React/JSX admin dashboard prototype using:
- React hooks (`useState`)
- Recharts for data visualization
- Lucide React icons
- Tailwind CSS classes

Contains these dashboard sections:
- **Dashboard** — KPIs, revenue chart, traffic sources, quick actions
- **Social Hub** — Meta/IG/TikTok management tabs
- **Shopify Sync** — Products, orders, inventory tabs
- **Automations** — Workflow automation management
- **SEO Analytics** — Keywords, health radar, AI actions
- **Product Studio** — AI photo generator, listing optimizer
- **Learning Center** — Educational content about LLMs, APIs, MCP
- **Setup Wizards** — Guided integration setup flows
- **Legal Pages** — Refund, Privacy, Terms components

This file is a standalone design prototype; it is **not** bundled or served.

## Design Conventions

- **Color palette:** Dark backgrounds (#0a0a08, #121210, #1a1a16), amber accents (#c8922a), cream text (#f5f0e6)
- **Typography:** Playfair Display for headings, Barlow for body, Barlow Condensed for labels/buttons
- **UI elements:** 2px border-radius, subtle borders with amber at 12% opacity, uppercase tracking on labels
- **Buttons:** `.btn-p` (primary/amber fill), `.btn-o` (outline/ghost)
- **Accessibility:** Skip-to-content link, ARIA labels, focus-visible outlines, 44px min touch targets

## Deployment

- **Host:** Netlify
- **Config:** `netlify.toml` — publishes root directory, SPA fallback to `/index.html`
- **Security headers:** X-Frame-Options DENY, X-Content-Type-Options nosniff, strict Referrer-Policy
- **Caching:** 1-hour public cache on all assets

## Development Workflow

1. Edit files directly — no build step required
2. Test by opening `index.html` in a browser
3. Commit and push to trigger Netlify deploy
4. All product images are hosted on Shopify CDN (`montuckymoonshine.com/cdn/...`)
5. Venue photos are local in `/venue/` directory (WebP format)

## Important Notes for AI Assistants

- **No build tools** — do not introduce npm, webpack, vite, or any build system
- **Single-file architecture** — all styles and scripts are inline in `index.html`; keep it that way
- **Shopify is external** — this site does not handle checkout; all purchase flows link to Shopify
- **admin.jsx is separate** — it's a React prototype, not connected to the main site
- **Venue images are real photos** — do not replace with placeholders
- **Business info is real** — D & V Enterprises LLC, Helena MT address, email are actual business details
- **JSON-LD structured data** is present in `<head>` for LocalBusiness schema
- **SEO meta tags** (Open Graph, description, canonical) are configured in `<head>`
