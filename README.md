# Montucky Moonshine — Proposal Site & Commerce Platform

A premium, multi-page storefront and venue showcase for [Montucky Moonshine](https://montuckymoonshine.com), built as a client proposal by 1Commerce LLC. Includes a companion admin dashboard prototype demonstrating the Sovereign Command Center architecture.

## Live URLs

- **Storefront:** [ksksrbiz-arch.github.io/montucky-moonshine-proposal](https://ksksrbiz-arch.github.io/montucky-moonshine-proposal/)
- **Netlify:** [montucky-moonshine-proposal.netlify.app](https://montucky-moonshine-proposal.netlify.app/)
- **GitHub Repo:** [github.com/ksksrbiz-arch/montucky-moonshine-proposal](https://github.com/ksksrbiz-arch/montucky-moonshine-proposal)

## Architecture

Multi-page static site — no build system, no frameworks, no npm. Pure HTML5, CSS3, vanilla JavaScript.

```
├── index.html          # Home — hero, photo strip, featured products, venue teaser
├── shop.html           # Shop — category filters, 15-product grid, Shopify checkout
├── venue.html          # Venue — gallery with lightbox, booking form (Netlify Forms)
├── about.html          # About — brand story, timeline, values
├── refund.html         # Refund Policy (legal)
├── privacy.html        # Privacy Policy (legal)
├── terms.html          # Terms of Service (legal)
├── 404.html            # Custom 404
├── deliverables.html   # Proposal hub — Sovereign Architecture, all deliverable links
├── css/style.css       # Shared stylesheet (tokens, components, premium effects)
├── js/main.js          # Shared JS (preloader, parallax, lightbox, filters, forms)
├── venue/              # 6 venue photos (WebP, ~200KB each)
├── admin.jsx           # React admin dashboard prototype (renders in Claude artifacts)
├── CLAUDE.md           # Agent documentation
├── netlify.toml        # Clean URLs, CSP headers, tiered caching
└── README.md
```

## Features

- **15 products** from Shopify store with direct checkout links
- **6 real venue photos** — rustic private bar in Helena, Montana
- **Lightbox gallery** with keyboard navigation (Escape, Arrow keys)
- **Category filter tabs** (All / Mugs / Tees / Merchandise)
- **Booking inquiry form** via Netlify Forms with honeypot spam protection
- **Premium effects** — preloader, parallax, scroll reveals, floating particles, magnetic buttons, custom cursor, split text animations, tilt cards
- **Private venue framing** — "Not a commercial bar" disclaimer throughout
- **Legal pages** — full Refund/Privacy/Terms with real D&V Enterprises LLC info
- **SEO** — JSON-LD LocalBusiness schema, OG/Twitter meta, canonical URLs
- **2026 mobile** — dvh, safe-area insets, focus-visible, reduced-motion, 44px+ touch targets
- **WCAG 2.2 AA** — skip links, landmarks, contrast ratios, aria attributes
- **CSP headers** — Content-Security-Policy, X-Frame-Options, tiered caching

## Commerce Command Center (admin.jsx)

React prototype demonstrating the Sovereign Architecture — 8 admin sections:
Dashboard, Social Hub (Meta/IG/TikTok), Shopify Sync, Automation Matrix, SEO & Analytics, AI Product Studio, Learning Center (LLMs/APIs/MCPs), Setup Wizards (8 integrations).

## Business

**D & V Enterprises LLC** (Montucky Moonshine)
3420 Byron Road, Helena MT 59602
montuckymoonshine@gmail.com

## Engineered by [1Commerce LLC](https://1commercesolutions.com)
