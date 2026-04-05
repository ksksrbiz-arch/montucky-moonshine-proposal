# Montucky Moonshine — Shopify Liquid Snippets

Copy-paste ready snippets for the Montucky Moonshine Shopify theme. All snippets use inline styles with Montucky's design tokens — no theme CSS dependencies required.

## Snippets

### `announcement-bar.liquid`
**Placement:** `theme.liquid`, immediately after `<body>` tag, before the header section.

Scrolling announcement ticker with message array, close button (suppressed for session), and hover-to-pause animation.

**Usage:**
```liquid
{% render 'announcement-bar' %}
```

**To customize messages:** Edit the `bar_messages` variable at the top of the snippet. Messages are pipe-separated.

---

### `trust-bar.liquid`
**Placement:** `index.liquid` below the hero section, or `theme.liquid` directly below header.

Five horizontal trust signals: Free shipping · Made in Montana · 5-star rated · Secure checkout · Easy returns.

**Usage:**
```liquid
{% render 'trust-bar' %}
```

---

### `free-shipping-bar.liquid`
**Placement:** Cart drawer template (`cart-drawer.liquid`), Cart page (`cart.liquid`), or Cart notification.

Animated progress bar showing how much more the customer needs to spend for free shipping. Updates visually based on live cart total.

**Usage:**
```liquid
{% render 'free-shipping-bar', cart_total: cart.total_price %}
```

**Default threshold:** $75.00 (7500 cents). Change `threshold_cents` at the top of the snippet.

---

### `product-trust-signals.liquid`
**Placement:** `product.liquid` or `main-product.liquid`, below the "Add to Cart" button.

2x2 grid of trust icons (Free Shipping · Easy Returns · Secure Checkout · Made in Montana) plus payment method badges.

**Usage:**
```liquid
{% render 'product-trust-signals' %}
```

---

## Installation

1. In Shopify Admin, go to **Online Store → Themes → Edit Code**
2. In the **Snippets** folder, click **Add a new snippet**
3. Name the snippet exactly as the filename (without `.liquid`)
4. Paste the snippet contents and save
5. Add `{% render 'snippet-name' %}` to the appropriate template file

## Design Tokens (Color Reference)

| Variable | Value | Usage |
|---|---|---|
| Background | `#0a0a08` | Page background |
| Card | `#1a1a16` | Card/surface |
| Amber | `#c8922a` | Primary accent |
| Amber Light | `#e6b04a` | Hover state |
| Cream | `#f5f0e6` | Primary text |
| Muted | `#9e9a8f` | Secondary text |
| Border | `rgba(200,146,42,0.12)` | Subtle borders |

