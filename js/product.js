/* ============================================================
   product.js — Product detail page logic
   Reads ?id=SLUG from URL, renders product data
   ============================================================ */
(function(){
  'use strict';

  // ── Product database (mirrors main.js products) ───────────
  var PRODUCTS = [
    {
      slug:'moonshine-stein',
      name:'Moonshine Stein',
      cat:'Drinkware',
      price:25.00,
      rating:0,
      reviews:0,
      tag:'Bestseller',
      scarcity:'Only 8 left in stock',
      url:'https://montuckymoonshine.com/products/moonshine-stein',
      imgs:[
        'https://montuckymoonshine.com/cdn/shop/products/pns73k8a6h07stpkhj1y3d2g_1024x.png?v=1547450598',
        'assets/montucky-visuals/bottletucky.jpeg',
        'assets/montucky-visuals/08_vintage_label_medium.png',
        'venue/barback.webp'
      ],
      desc:'Hand-designed in Helena, the Moonshine Stein isn\'t just drinkware — it\'s a statement. Whether you\'re pouring your morning black or something stronger after sundown, this stein holds 16oz of whatever Montana demands. Thick walls, weighty base, built to outlast trends and bad days alike.\n\nEvery stein is a piece of the Montucky story. Bold graphic, dishwasher-safe, and made to be seen on every shelf and campfire ring from Bozeman to Billings.',
      reviewsList:[]
    },
    {
      slug:'funny-drink-drank-drunk-t-shirt',
      name:'Drink Drank Drunk Tee',
      cat:'Apparel',
      price:21.69,
      rating:0,
      reviews:0,
      tag:'Top Rated',
      scarcity:null,
      url:'https://montuckymoonshine.com/products/funny-drink-drank-drunk-t-shirt',
      imgs:[
        'https://montuckymoonshine.com/cdn/shop/files/15211927451420024901_2048_1024x.jpg?v=1738121468',
        'assets/montucky-visuals/06_grunge_90s_medium.png',
        'assets/montucky-visuals/04_tattoo_skull_medium.png'
      ],
      desc:'Montana doesn\'t do subtle — and neither does this tee. The Drink Drank Drunk graphic hits different on a Friday night or a Sunday morning. Soft, breathable cotton blend that holds up to Montana weather and back-to-back washes without fading the attitude.\n\nUnisex fit. Available S–3XL. Screen-printed graphic, not heat transfer — so it stays bold long after the first hundred wears.',
      reviewsList:[]
    },
    {
      slug:'wall-clock',
      name:'Wall Clock',
      cat:'Home Goods',
      price:35.00,
      rating:0,
      reviews:0,
      tag:'Top Rated',
      scarcity:'Only 5 left in stock',
      url:'https://montuckymoonshine.com/products/wall-clock',
      imgs:[
        'https://montuckymoonshine.com/cdn/shop/files/2096947309553618432_2048_1024x.jpg?v=1688013525',
        'assets/montucky-visuals/01_vintage_poster_medium.png',
        'venue/lounge.webp'
      ],
      desc:'The Montucky Wall Clock doesn\'t just tell time — it tells a story. Silent sweep movement so there\'s no tick to interrupt the quiet of a Montana morning. Bold face, clean numbers, wide enough to anchor any room without overwhelming it.\n\nWall-mount hardware included. 12-inch diameter. Runs on one AA battery. Built to look good in a cabin, a kitchen, or a man cave — because that\'s exactly the kind of place it belongs.',
      reviewsList:[]
    },
    {
      slug:'stainless-steel-flask-6oz',
      name:'Stainless Steel Flask',
      cat:'Drinkware',
      price:21.88,
      rating:0,
      reviews:0,
      tag:'New',
      scarcity:null,
      url:'https://montuckymoonshine.com/products/stainless-steel-flask-6oz',
      imgs:[
        'https://montuckymoonshine.com/cdn/shop/files/13314165464068572653_2048_1024x.jpg?v=1737535598',
        'assets/montucky-visuals/05_steampunk_medium.png',
        'venue/bar.webp'
      ],
      desc:'6oz stainless steel — the right size for a long walk or a short night. Leak-proof screw cap, polished finish, and the Montucky spirit embossed where it counts. Fits a back pocket, a jacket pocket, or a tackle box without complaint.\n\nFood-grade 304 stainless. Wide-mouth opening for easy filling. The kind of flask you keep, not lose.',
      reviewsList:[]
    },
    {
      slug:'unisex-heavyweight-hooded-sweatshirt',
      name:'Heavyweight Hoodie',
      cat:'Apparel',
      price:87.77,
      rating:0,
      reviews:0,
      tag:'Limited',
      scarcity:'Only 3 left in this size',
      url:'https://montuckymoonshine.com/products/unisex-heavyweight-hooded-sweatshirt',
      imgs:[
        'https://montuckymoonshine.com/cdn/shop/files/6909327151717644564_2048_1024x.jpg?v=1774545469',
        'assets/montucky-visuals/10_metal_80s_medium.png',
        'assets/montucky-visuals/07_wolf_mystical_medium.png'
      ],
      desc:'Not a hoodie. A statement. 14oz heavyweight fleece that laughs at wind, rain, and every season Montana throws at you. Double-stitched seams, kangaroo pocket deep enough for both hands and a flask, and a fit that works on the mountain or in town.\n\nLimited run — once these are gone, they\'re gone. Pre-shrunk cotton-polyester blend. Size up if you like an oversized fit.',
      reviewsList:[]
    }
  ];

  // ── Render stars ──────────────────────────────────────────
  function starHTML(r) {
    var s = '';
    for (var i = 1; i <= 5; i++) {
      s += '<svg class="star' + (i > r ? ' empty' : '') + '" viewBox="0 0 20 20" style="width:14px;height:14px"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>';
    }
    return s;
  }

  // ── Qty ───────────────────────────────────────────────────
  var qty = 1;
  window.changeQty = function(delta) {
    qty = Math.max(1, Math.min(10, qty + delta));
    document.getElementById('qtyVal').textContent = qty;
  };

  // ── Shipping progress ─────────────────────────────────────
  function updateShipping(price) {
    var fill = document.getElementById('prodShipFill');
    var msg  = document.getElementById('prodShipMsg');
    var amt  = document.getElementById('prodShipAmt');
    if (!fill) return;
    var THRESH = 40;
    var pct = Math.min((price / THRESH) * 100, 100);
    fill.style.width = pct + '%';
    var rem = (THRESH - price).toFixed(2);
    if (price >= THRESH) {
      msg.innerHTML = '<strong style="color:#4caf50">🎉 This order qualifies for FREE SHIPPING!</strong>';
    } else {
      msg.innerHTML = 'Add <span id="prodShipAmt">$' + rem + '</span> more for <strong style="color:var(--amber)">FREE SHIPPING</strong>';
    }
  }

  // ── Gallery ───────────────────────────────────────────────
  function buildGallery(imgs) {
    var main = document.getElementById('mainImgEl');
    var thumbs = document.getElementById('thumbsRow');
    if (!main || !thumbs || !imgs.length) return;
    main.src = imgs[0];
    main.alt = document.getElementById('prodTitle').textContent;
    thumbs.innerHTML = '';
    imgs.forEach(function(src, i) {
      var div = document.createElement('div');
      div.className = 'product-thumb img-wrap' + (i === 0 ? ' active loaded' : '');
      div.innerHTML = '<img src="' + src + '" alt="" loading="lazy" onload="this.parentElement.classList.add(\'loaded\')">';
      div.addEventListener('click', function() {
        main.src = src;
        document.querySelectorAll('.product-thumb').forEach(function(t){ t.classList.remove('active'); });
        div.classList.add('active');
      });
      thumbs.appendChild(div);
    });
  }

  // ── Reviews ───────────────────────────────────────────────
  function buildReviews(p) {
    var list = document.getElementById('reviewsList');
    var headline = document.getElementById('reviewsHeadline');
    var aggStars = document.getElementById('aggStars');
    var aggRating = document.getElementById('aggRating');
    var aggCount = document.getElementById('aggCount');
    if (headline) headline.innerHTML = p.reviews + ' reviews for <em>' + p.name + '</em>';
    if (aggStars) aggStars.innerHTML = starHTML(Math.round(p.rating));
    if (aggRating) aggRating.textContent = p.rating.toFixed(1) + ' / 5.0';
    if (aggCount) aggCount.textContent = '· ' + p.reviews + ' verified purchases';
    if (!list) return;
    list.innerHTML = '';
    p.reviewsList.forEach(function(r) {
      var div = document.createElement('div');
      div.className = 'review-card reveal from-scale';
      div.innerHTML =
        '<div class="review-head"><div><div class="review-name">' + r.name + ' <span style="color:var(--t3);font-weight:400">· ' + r.loc + '</span></div><div class="stars" style="margin-top:.3rem">' + starHTML(r.rating) + '</div></div><span class="review-date">' + r.date + '</span></div>' +
        '<div class="review-title">' + r.title + '</div>' +
        '<div class="review-body">' + r.body + '</div>' +
        '<div class="review-verified">Verified Purchase</div>';
      list.appendChild(div);
    });
  }

  // ── Recommendations ───────────────────────────────────────
  function buildRecs(current) {
    var grid = document.getElementById('recsGrid');
    if (!grid) return;
    var recs = PRODUCTS.filter(function(p){ return p.slug !== current; }).slice(0,4);
    grid.innerHTML = '';
    recs.forEach(function(p) {
      var a = document.createElement('a');
      a.className = 'p-card reveal from-scale';
      a.href = 'product.html?id=' + p.slug;
      a.innerHTML =
        '<div class="p-img img-wrap"><img src="' + p.imgs[0] + '" alt="' + p.name + '" loading="lazy" onload="this.parentElement.classList.add(\'loaded\')"><div class="p-hover"><span>View Product</span></div></div>' +
        '<div class="p-info">' +
          '<div class="p-tag">' + p.cat + '</div>' +
          '<div class="p-name">' + p.name + '</div>' +
          '<div class="p-price">$' + p.price.toFixed(2) + '</div>' +
          '<div class="p-rating"><div class="stars">' + starHTML(Math.round(p.rating)) + '</div><span class="review-count">(' + p.reviews + ')</span></div>' +
        '</div>';
      grid.appendChild(a);
    });
    // Re-run reveal observer for new elements
    if (window.revealObserver) {
      grid.querySelectorAll('.reveal').forEach(function(el){ window.revealObserver.observe(el); });
    }
  }

  // ── Schema ────────────────────────────────────────────────
  function injectSchema(p) {
    var el = document.getElementById('productSchema');
    if (!el) return;
    el.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "image": p.imgs[0],
      "description": p.desc.replace(/\n/g,' ').substring(0,300),
      "brand": {"@type":"Brand","name":"Montucky Moonshine"},
      "offers": {
        "@type": "Offer",
        "price": p.price.toFixed(2),
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "url": p.url
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": p.rating,
        "reviewCount": p.reviews
      }
    });
  }

  // ── Sticky cart on mobile ─────────────────────────────────
  function initStickyCart(p) {
    var sticky = document.getElementById('stickyCart');
    var stickyName = document.getElementById('stickyName');
    var stickyPrice = document.getElementById('stickyPrice');
    var stickyBtn = document.getElementById('stickyBtn');
    if (!sticky) return;
    if (stickyName) stickyName.textContent = p.name;
    if (stickyPrice) stickyPrice.textContent = '$' + p.price.toFixed(2);
    if (stickyBtn) stickyBtn.href = p.url;
    var buyBtn = document.getElementById('prodBuyBtn');
    if (!buyBtn) return;
    var observer = new IntersectionObserver(function(entries) {
      sticky.classList.toggle('visible', !entries[0].isIntersecting);
    }, { threshold: 0.1 });
    observer.observe(buyBtn);
  }

  // ── Init ──────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get('id') || 'moonshine-stein';
    var p = PRODUCTS.find(function(x){ return x.slug === id; }) || PRODUCTS[0];

    // Update page title + meta
    document.title = p.name + ' — Montucky Moonshine';
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = p.name + ' — handcrafted Montana merchandise. $' + p.price.toFixed(2) + '. ' + p.desc.substring(0,100);

    // Populate
    document.getElementById('prodCat').textContent = p.cat;
    document.getElementById('prodTitle').textContent = p.name;
    document.getElementById('prodStars').innerHTML = starHTML(Math.round(p.rating));
    document.getElementById('prodReviewCount').textContent = '(' + p.reviews + ' reviews)';
    document.getElementById('prodPrice').textContent = '$' + p.price.toFixed(2);
    document.getElementById('prodDesc').innerHTML = p.desc.replace(/\n\n/g,'</p><p>').replace(/^/,'<p>').replace(/$/, '</p>');

    var buyBtn = document.getElementById('prodBuyBtn');
    if (buyBtn) {
      buyBtn.href = p.url;
      buyBtn.textContent = 'Buy Now on Shopify — $' + p.price.toFixed(2) + ' →';
    }

    // Scarcity
    if (p.scarcity) {
      var sc = document.getElementById('prodScarcity');
      var st = document.getElementById('scarcityText');
      if (sc && st) { sc.style.display = 'flex'; st.textContent = p.scarcity; }
    }

    buildGallery(p.imgs);
    updateShipping(p.price);
    buildReviews(p);
    buildRecs(p.slug);
    injectSchema(p);
    initStickyCart(p);

    // Make product cards on shop page link here
  });

})();
