# CLAUDE.md

## Project Overview

Montucky Moonshine proposal site — a premium storefront and venue showcase for a Montana-based brand. Built as a client proposal to redesign their web presence. Deployed on Netlify as a multi-page static site.

**Business:** D & V Enterprises LLC (Montucky Moonshine), 3420 Byron Road, Helena MT 59602

## Repository Structure

```
.
├── index.html          # Home — hero, photo strip, featured products, venue teaser, about teaser
├── shop.html           # Shop — category filter tabs, full product grid, Shopify CTA
├── venue.html          # Venue — immersive hero, gallery with lightbox, features, booking form
├── about.html          # About — brand story, timeline, values, CTA
├── refund.html         # Refund policy (legal)
├── privacy.html        # Privacy policy (legal)
├── terms.html          # Terms of service (legal)
├── 404.html            # Custom 404 page
├── css/
│   └── style.css       # Shared stylesheet — tokens, components, animations, premium effects
├── js/
│   └── main.js         # Shared JavaScript — preloader, parallax, lightbox, filters, forms
├── venue/              # Local venue photos (6 WebP images, 1215x911, ~200-250KB each)
│   ├── bar.webp
│   ├── bar_long.webp
│   ├── bar_right.webp
│   ├── barback.webp
│   ├── lounge.webp
│   └── pool_table.webp
├── admin.jsx           # React admin dashboard prototype (not deployed)
├── netlify.toml        # Netlify config — redirects, security headers, caching
└── README.md
```

## Tech Stack

- **No build system** — pure static HTML5, CSS3, vanilla JavaScript
- **No frameworks** — no React, no bundler, no npm (except admin.jsx which is a standalone prototype)
- **Fonts:** Google Fonts — Playfair Display (headings), Barlow (body), Barlow Condensed (labels/UI)
- **Deployment:** Netlify with auto-deploy from this repo
- **E-commerce:** All "Buy Now" links route to existing Shopify store (no checkout on this site)
- **Forms:** Netlify Forms with honeypot spam protection and AJAX submission

## Architecture

### Multi-Page Structure
Each HTML page is a standalone document referencing shared `css/style.css` and `js/main.js`. Navigation is standard `<a>` links between pages. Netlify provides clean URL redirects (e.g., `/shop` → `/shop.html`).

### css/style.css
- CSS custom properties (design tokens) in `:root`
- Dark theme: backgrounds (#0a0a08, #121210, #1a1a16), amber accents (#c8922a), cream text (#f5f0e6)
- Font tokens: `--ff-d` (display), `--ff-b` (body), `--ff-c` (condensed)
- Component styles: nav, hero, buttons, cards, product grid, venue gallery, forms, footer, legal
- Premium effects: scroll reveals, parallax, skeleton loading, lightbox, particles, custom cursor, gradient text, glassmorphism, tilt cards, split text animations
- WCAG 2.2 AA: focus-visible outlines, prefers-reduced-motion, 44px min touch targets
- Mobile-first breakpoints: 480px, 640px, 768px, 1024px

### js/main.js
- Wrapped in IIFE, `'use strict'`, all selectors defensive (null checks)
- Preloader with progress bar
- Scroll progress indicator
- Nav scroll effect (glassmorphism intensifies)
- Active nav link detection from current filename
- IntersectionObserver scroll reveals with stagger
- Parallax engine (rAF, respects reduced-motion)
- Hero floating particles
- Counter animations (cubic ease-out)
- Lightbox with keyboard nav (Escape, Arrow keys)
- Magnetic button hover effect (--mx/--my CSS vars)
- Product grid rendering from data array (13 products)
- Category filter tabs (all, mugs, tees, merchandise)
- Booking form AJAX submit with success state
- Custom cursor glow (non-touch only)
- Split text character animations
- Tilt card 3D effect
- Dynamic copyright year
- Smooth scroll for anchor links

### Key Patterns
- Images use skeleton loading: `.img-wrap` with shimmer → `.loaded` class on `onload`
- Scroll reveals: `.reveal` elements get `.visible` via IntersectionObserver
- All external links use `target="_blank" rel="noopener noreferrer"`
- Product links go to `montuckymoonshine.com/products/...` (Shopify)
- Booking form uses Netlify Forms (`data-netlify="true"`) with honeypot spam protection
- Product count in venue stats is dynamically set from the `products` array length
- Copyright year in footer is dynamically generated

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
- **Domain:** montucky-moonshine-proposal.netlify.app
- **Config:** `netlify.toml` — clean URL redirects, custom 404, security headers, tiered caching
- **Security headers:** X-Frame-Options DENY, X-Content-Type-Options nosniff, CSP, strict Referrer-Policy
- **Caching:** 1hr HTML, 24hr CSS/JS, 7d venue images

## Development Workflow

1. Edit files directly — no build step required
2. Test by opening any `.html` file in a browser (or use a local server for proper routing)
3. Commit and push to trigger Netlify deploy
4. All product images are hosted on Shopify CDN (`montuckymoonshine.com/cdn/...`)
5. Venue photos are local in `/venue/` directory (WebP format, 1215x911)

## Important Notes for AI Assistants

- **No build tools** — do not introduce npm, webpack, vite, or any build system
- **Multi-page architecture** — each page is a standalone HTML file referencing shared CSS/JS
- **Shared nav/footer** — duplicated across pages; changes must be made in ALL HTML files
- **Shopify is external** — this site does not handle checkout; all purchase flows link to Shopify
- **admin.jsx is separate** — it's a React prototype, not connected to the main site
- **Venue images are real photos** — do not replace with placeholders
- **Business info is real** — D & V Enterprises LLC, Helena MT address, email are actual business details
- **Products are defined in js/main.js** — the product data array lives in the shared JS file
- **JSON-LD structured data** is in `index.html` `<head>` for LocalBusiness schema
- **SEO meta tags** (Open Graph, Twitter Cards, canonical) are on every page
