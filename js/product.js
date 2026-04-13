/* ============================================================
   product.js — Product detail page logic
   Reads ?id=SLUG from URL, renders product data
   ============================================================ */
(function(){
  'use strict';

  // ── Product database (mirrors main.js products) ───────────
    var PRODUCTS = [
    {
      slug:'redneck-mama-tee-mother-s-day-edition',
      name:"“Redneck Mama Tee – Mother’s Day Edition”",
      cat:'Apparel',
      price:18.82,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/redneck-mama-tee-mother-s-day-edition',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/15628738730638542610_2048.jpg?v=1776107209', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/3422895280969158669_2048.jpg?v=1776106820', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/11206527743403574738_2048.jpg?v=1776106826', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/15136287310639764311_2048.jpg?v=1776106831'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'country-boy-can-survive-tee-built-tough-raised-right',
      name:"Country Boy Can Survive Tee – Built Tough. Raised Right.",
      cat:'Apparel',
      price:26.99,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/country-boy-can-survive-tee-built-tough-raised-right',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/10049482373478645326_2048.jpg?v=1776102943', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/2860436907645783794_2048.jpg?v=1776102944', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/13186761294061866156_2048.jpg?v=1776102948', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/9596891194602915988_2048.jpg?v=1776102952'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'badass-ladies-tank-built-different-no-apologies',
      name:"BADASS LADIES Tank – Built Different. No Apologies.",
      cat:'Apparel',
      price:19.73,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/badass-ladies-tank-built-different-no-apologies',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/17932642799807370867_2048.jpg?v=1776103533', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/1184296937926334921_2048.jpg?v=1776103533', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/16885459886991459851_2048.jpg?v=1776103533', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/9176465919676978323_2048.jpg?v=1776101992'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'cute-grumpy-cat-briefs-printed-women-s-underwear-with-adorable-furry-face',
      name:"Grumpy Cat Briefs – Cute Face, Zero Patience",
      cat:'Merchandise',
      price:34.88,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/cute-grumpy-cat-briefs-printed-women-s-underwear-with-adorable-furry-face',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/10707598201589657427_2048.jpg?v=1776103989', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/13290451657310321967_2048.jpg?v=1776103989', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/11595437989746273590_2048.jpg?v=1776103989', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/6297163720258864387_2048.jpg?v=1776103331'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'👉-land-of-the-free-because-of-the-brave-no-apologies-tee',
      name:"👉 Land of the Free. Because of the Brave. No Apologies Tee",
      cat:'Apparel',
      price:24.99,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/👉-land-of-the-free-because-of-the-brave-no-apologies-tee',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/6225649910476172191_2048.jpg?v=1776061783', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/2559606160984929586_2048.jpg?v=1776061785', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/930428081760624157_2048.jpg?v=1776061786', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/30326133260072835_2048.jpg?v=1776061788'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'freedom-isn-t-free-eagle-patriotic-t-shirt',
      name:"Freedom Isn’t Free Eagle Patriotic T-Shirt",
      cat:'Apparel',
      price:57.1,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/freedom-isn-t-free-eagle-patriotic-t-shirt',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/16651166725178545673_2048.jpg?v=1776062114', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/2194806009530697400_2048.jpg?v=1776062114', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/12555319111342400452_2048.jpg?v=1776062114', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/4799384019787825163_2048.jpg?v=1776062114'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'patriotic-eagle-t-shirt-land-of-the-free-home-of-the-brave-graphic-tee',
      name:"Land of the Free – Home of the Brave Eagle Patriotic T-Shirt",
      cat:'Apparel',
      price:18.82,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/patriotic-eagle-t-shirt-land-of-the-free-home-of-the-brave-graphic-tee',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/10273427369884966969_2048.jpg?v=1776054818', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/10182264768523897407_2048.jpg?v=1776051332', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/102384947618196754_2048.jpg?v=1776051333', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/12233137167307724909_2048.jpg?v=1776051334'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'all-american-redneck-t-shirt-god-guns-trucks-country-graphic-tee',
      name:"All American Redneck T-Shirt — God • Guns • Trucks • Country Graphic T",
      cat:'Apparel',
      price:24.99,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/all-american-redneck-t-shirt-god-guns-trucks-country-graphic-tee',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/3405635865903304170_2048.jpg?v=1776044174', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/9099132152458745475_2048.jpg?v=1776044174', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/17076005797460995670_2048.jpg?v=1776044174', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/5705874335760071909_2048.jpg?v=1776044174'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'city-redneck-crewneck-sweatshirt-american-flag-truck-graphic',
      name:"City Redneck Sweatshirt – Concrete Country. Urban Outlaw.",
      cat:'Apparel',
      price:46.13,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/city-redneck-crewneck-sweatshirt-american-flag-truck-graphic',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/4118619051125259911_2048.jpg?v=1776112538', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/9811215469047788614_2048.jpg?v=1776112538', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/16206211440792728340_2048.jpg?v=1776112538', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/6791940905978683337_2048.jpg?v=1776112538'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'unisex-jersey-t-shirt',
      name:"AMERICAN PATRIOT EAGLE FLAG TEE",
      cat:'Apparel',
      price:22.65,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/unisex-jersey-t-shirt',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/14295507561928704730_2048.jpg?v=1776040720', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/5546675047843687344_2048.jpg?v=1776035160', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/15259278721428350516_2048.jpg?v=1776035166', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/13419688394788431902_2048.jpg?v=1776035172'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'unisex-lightweight-crewneck-sweatshirt-2',
      name:"Unisex Lightweight Crewneck Sweatshirt",
      cat:'Apparel',
      price:46.13,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/unisex-lightweight-crewneck-sweatshirt-2',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/16752402485044381852_2048.jpg?v=1776034421', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/9589292485544728907_2048.jpg?v=1776034427', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/297931046651032894_2048.jpg?v=1776034435', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/281909321470899309_2048.jpg?v=1776034441'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'unisex-lightweight-crewneck-sweatshirt-1',
      name:"Unisex Lightweight Crewneck Sweatshirt",
      cat:'Apparel',
      price:57.1,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/unisex-lightweight-crewneck-sweatshirt-1',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/10334560472660416522_2048.jpg?v=1776034104', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/18018811011943064450_2048.jpg?v=1776034110', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/15197720499310094896_2048.jpg?v=1776034116', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/10575296913816642630_2048.jpg?v=1776034122'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'unisex-cotton-crew-tee',
      name:"Unisex Cotton Crew Tee",
      cat:'Apparel',
      price:19.38,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/unisex-cotton-crew-tee',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/14808965551686405553_2048.jpg?v=1776045009', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/14507382867852386336_2048.jpg?v=1776033901', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/12691471544746319068_2048.jpg?v=1776033906', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/1201140850944105860_2048.jpg?v=1776033911'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'unisex-softstyle-t-shirt',
      name:"Unisex Softstyle T-Shirt",
      cat:'Apparel',
      price:28.99,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/unisex-softstyle-t-shirt',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/15838482797195193127_2048.jpg?v=1775936399', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/919382661235272800_2048.jpg?v=1775936401', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/4043026367296115002_2048.jpg?v=1775936402', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/3182300981790867129_2048.jpg?v=1775936403'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'unisex-lightweight-crewneck-sweatshirt',
      name:"Unisex Lightweight Crewneck Sweatshirt",
      cat:'Apparel',
      price:79.03,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/unisex-lightweight-crewneck-sweatshirt',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/2729647458206357742_2048.jpg?v=1775665278', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/938868868611908385_2048.jpg?v=1775665283', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/12501044905941758830_2048.jpg?v=1775665290', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/15126029198054567828_2048.jpg?v=1775665296'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'t-shirt-raising-my-little-assholes-and-killin-it-retro-mom-graphic',
      name:"T-Shirt — \"Raising My Little Assholes and Killin’ It\" Retro Mom Grap",
      cat:'Apparel',
      price:26.99,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/t-shirt-raising-my-little-assholes-and-killin-it-retro-mom-graphic',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/9370909973073489318_2048.jpg?v=1776041732'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'unisex-heavyweight-hooded-sweatshirt',
      name:"All American Redneck Hoodie – Built Loud, Worn Proud U.S.A.",
      cat:'Apparel',
      price:129.0,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/unisex-heavyweight-hooded-sweatshirt',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/16236272425178291705_2048.jpg?v=1776113332', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/11565909922293379368_2048.jpg?v=1776113340', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/13599244449809287433_2048.jpg?v=1776113347', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/14132011435265608634_2048.jpg?v=1776113353'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
      reviewsList:[]
    },
    {
      slug:'unisex-jersey-short-sleeve-tee',
      name:"Unisex Jersey Short Sleeve Tee",
      cat:'Apparel',
      price:18.82,
      rating:0,
      reviews:0,
      tag:'',
      scarcity:'',
      url:'https://montuckymoonshine.com/products/unisex-jersey-short-sleeve-tee',
      imgs:['https://cdn.shopify.com/s/files/1/0095/5065/9643/files/9448496551134210533_2048.jpg?v=1776046065', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/5599718759244493157_2048.jpg?v=1776045611', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/7859679543116690516_2048.jpg?v=1776045612', 'https://cdn.shopify.com/s/files/1/0095/5065/9643/files/2596718881683085980_2048.jpg?v=1776045614'],
      desc:'Montana-made. Built tough. Ships from Helena. Click to shop on Montucky Moonshine.',
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
