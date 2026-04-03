# Montucky Moonshine - Visual Asset Implementation Guide

## 📦 Package Contents

### High-Resolution Assets (Print/Design)
All original 4K quality images in `/high-res/` directory

### Web-Optimized Assets (Multiple Sizes)
Organized by size tier in `/web-optimized/` directory:
- **Hero** (1920px) - Homepage headers, full-screen sections
- **Large** (1200px) - Feature sections, lightbox previews  
- **Medium** (800px) - Grid layouts, blog headers
- **Thumbnail** (400px) - Card components, mobile previews

## 🎨 Design Suite Overview

### 1. **Vintage Poster** (01_vintage_poster)
- Old West moonshine advertisement aesthetic
- Copper still centerpiece with skull motifs
- Aged parchment texture with distressed edges
- Perfect for: Hero sections, print materials, retro branding

### 2. **Neon Sign** (02_neon_sign)
- Electric neon signage against brick wall
- Urban nightlife vibe with venue atmosphere
- Glowing moonshine jar illustration
- Perfect for: Event promotions, bar/venue pages, modern sections

### 3. **Psychedelic Concert** (03_psychedelic)
- Trippy 60s/70s rock poster styling
- Mountain silhouettes with aurora effects
- Festival/live music energy
- Perfect for: Events page, music venue integration, artistic sections

### 4. **Tattoo Skull** (04_tattoo_skull)
- Traditional tattoo art aesthetic
- Montana wilderness with wildlife (bears, mountains)
- Skull and cowboy hat iconography
- Perfect for: Brand story, heritage sections, merchandise

### 5. **Steampunk Bottle** (05_steampunk)
- Industrial Victorian machinery
- Intricate copper pipes and gears
- Futuristic-retro fusion
- Perfect for: Distillery tour pages, process explanation, premium product shots

### 6. **Grunge 90s** (06_grunge_90s)
- Torn poster layering effects
- Forest distillery scene
- DIY punk aesthetic
- Perfect for: Blog headers, about page, authentic craftsman story

### 7. **Wolf Mystical** (07_wolf_mystical)
- Northern lights and mystical atmosphere
- Wolf howling at moon
- Montana wilderness spirit
- Perfect for: Brand mythology, environmental storytelling, romantic sections

### 8. **Vintage Label** (08_vintage_label)
- Classic liquor label design
- Hops and wheat agricultural motifs
- "100 Proof" badge prominently featured
- Perfect for: Product pages, label inspiration, traditional sections

### 9. **Hero Bar Scene** (09_hero_bar)
- Wide panoramic bar interior
- Warm wood tones and honey jars
- Rustic authentic atmosphere
- Perfect for: Homepage hero, location pages, immersive headers

### 10. **Metal 80s** (10_metal_80s)
- Heavy metal concert poster vibes
- Chains, lightning, dramatic effects
- Antlers and skull with attitude
- Perfect for: Bold sections, music tie-ins, edgy marketing

## 🚀 Implementation Examples

### HTML with Picture Element (Responsive + Modern)
```html
<picture>
  <source 
    srcset="images/01_vintage_poster_hero.webp" 
    type="image/webp"
    media="(min-width: 1200px)">
  <source 
    srcset="images/01_vintage_poster_large.webp" 
    type="image/webp"
    media="(min-width: 768px)">
  <source 
    srcset="images/01_vintage_poster_medium.webp" 
    type="image/webp">
  <img 
    src="images/01_vintage_poster_large.png" 
    alt="Montucky Moonshine Vintage Poster"
    loading="lazy">
</picture>
```

### CSS Background Implementation
```css
.hero-section {
  background-image: 
    image-set(
      url('images/09_hero_bar_hero.webp') type('image/webp'),
      url('images/09_hero_bar_hero.png') type('image/png')
    );
  background-size: cover;
  background-position: center;
}

@media (max-width: 768px) {
  .hero-section {
    background-image: 
      image-set(
        url('images/09_hero_bar_medium.webp') type('image/webp'),
        url('images/09_hero_bar_medium.png') type('image/png')
      );
  }
}
```

### React/Next.js Implementation
```jsx
import Image from 'next/image'

export default function HeroSection() {
  return (
    <div className="hero">
      <Image
        src="/images/high-res/02_neon_sign.png"
        alt="Montucky Moonshine Neon Sign"
        width={1920}
        height={2560}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
        quality={90}
        priority
      />
    </div>
  )
}
```

### Shopify Liquid Template
```liquid
{% assign image_name = '06_grunge_90s' %}
<picture>
  <source 
    srcset="{{ image_name }}_hero.webp" 
    type="image/webp"
    media="(min-width: 1200px)">
  <source 
    srcset="{{ image_name }}_large.webp" 
    type="image/webp"
    media="(min-width: 768px)">
  <img 
    src="{{ image_name }}_large.png" 
    alt="{{ section.settings.alt_text }}"
    loading="lazy">
</picture>
```

## 📊 File Size Reference

### Average Sizes per Variant
- **Hero PNG**: ~5.5MB | **WebP**: ~400KB (93% smaller)
- **Large PNG**: ~2.7MB | **WebP**: ~230KB (92% smaller)
- **Medium PNG**: ~1.4MB | **WebP**: ~140KB (90% smaller)  
- **Thumbnail PNG**: ~400KB | **WebP**: ~55KB (86% smaller)

### When to Use Which Format
- **WebP**: Modern browsers (Chrome, Edge, Firefox, Safari 14+)
- **PNG**: Universal fallback, iOS Safari <14, legacy support
- Always provide both formats using `<picture>` or CSS `image-set()`

## 🎯 Recommended Usage by Page

### Homepage
- **Hero**: `09_hero_bar` (panoramic bar scene)
- **About Section**: `01_vintage_poster` or `07_wolf_mystical`
- **Process**: `05_steampunk` (distillery mechanics)

### Events Page
- **Header**: `03_psychedelic` (concert poster vibe)
- **Venue Info**: `02_neon_sign` (bar atmosphere)
- **Music Section**: `10_metal_80s` (rock energy)

### Products Page
- **Labels**: `08_vintage_label` (classic bottle design)
- **Premium Bottles**: `05_steampunk` (high-end presentation)
- **Heritage Story**: `04_tattoo_skull` (Montana tradition)

### About/Story Page
- **Origins**: `07_wolf_mystical` (Montana wilderness spirit)
- **Craft Process**: `06_grunge_90s` (authentic DIY ethos)
- **Timeline**: `01_vintage_poster` (historical feel)

## 🔧 Performance Tips

1. **Use WebP as Primary**: 85-93% smaller files, dramatically faster load times
2. **Lazy Load Below Fold**: Add `loading="lazy"` to images not immediately visible
3. **Size-Appropriate Loading**: Don't load hero images on mobile - use medium/thumbnail
4. **Preload Critical Images**: Add `<link rel="preload">` for above-fold hero images
5. **CDN Delivery**: Upload to Cloudflare, Netlify, or Vercel for edge caching

## 🎨 Design System Integration

### Color Palette Extraction
Each image features these dominant colors:
- **Copper/Bronze**: #B87333, #CD7F32
- **Deep Blues**: #1A2332, #2C3E50
- **Neon Cyan**: #00D9FF, #4DEEEA
- **Aged Parchment**: #F4E4C1, #E8D5B5
- **Blood Red**: #8B0000, #DC143C

### Typography Recommendations
- **Headlines**: Bebas Neue, Oswald, Playfair Display
- **Body**: Montserrat, Open Sans, Lato
- **Accent**: Permanent Marker, Special Elite (grunge)

## 📱 Responsive Breakpoints

```css
/* Mobile First Approach */
.image-container {
  background-image: url('thumbnail_400px.webp');
}

@media (min-width: 768px) {
  .image-container {
    background-image: url('medium_800px.webp');
  }
}

@media (min-width: 1200px) {
  .image-container {
    background-image: url('large_1200px.webp');
  }
}

@media (min-width: 1920px) {
  .image-container {
    background-image: url('hero_1920px.webp');
  }
}
```

## 🚨 Important Notes

- All images are 4:3 aspect ratio (portrait) except `09_hero_bar` (panoramic ~2.3:1)
- Original resolution: 1728x2304px or 1696x2304px
- Optimized with Lanczos resampling for maximum quality
- WebP quality set to 85 (sweet spot for size/quality)
- PNG optimized with compression level 9

## 📦 Directory Structure
```
output/
├── high-res/               # Original 4K quality
│   ├── 01_vintage_poster.png
│   ├── 02_neon_sign.png
│   └── ...
│
└── web-optimized/         # Production-ready
    ├── hero/              # 1920px (desktop headers)
    ├── large/             # 1200px (tablet/features)
    ├── medium/            # 800px (mobile/grid)
    └── thumbnail/         # 400px (cards/previews)
        ├── *.png          # Universal fallback
        └── *.webp         # Modern browsers
```

---

**Total Assets**: 90 files  
**10 Designs** × **4 Sizes** × **2 Formats** + 10 High-Res Originals

Ready for immediate deployment! 🚀
