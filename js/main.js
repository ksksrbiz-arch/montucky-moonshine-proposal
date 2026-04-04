/* ============================================================
   Montucky Moonshine — Main JavaScript
   Vanilla JS, no frameworks, no modules, no build tools.
   ============================================================ */

(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ----------------------------------------------------------
     1. Preloader
  ---------------------------------------------------------- */
  (function preloader() {
    var el = document.getElementById('preloader');
    var fill = document.getElementById('preloaderFill');
    if (!el || !fill) return;

    var progress = 0;
    var ticker = setInterval(function () {
      progress += Math.random() * 12;
      if (progress > 90) progress = 90;
      fill.style.width = progress + '%';
    }, 180);

    window.addEventListener('load', function () {
      clearInterval(ticker);
      fill.style.width = '100%';
      setTimeout(function () {
        el.classList.add('done');
      }, 400);
    });
  })();

  /* ----------------------------------------------------------
     2. Scroll Progress Bar  &  3. Nav Scroll Effect
  ---------------------------------------------------------- */
  (function scrollHandlers() {
    var progressBar = document.getElementById('scrollProgress');
    var navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function () {
      var scrollTop = window.scrollY || document.documentElement.scrollTop;

      // Scroll progress
      if (progressBar) {
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressBar.style.width = pct + '%';
      }

      // Nav scroll effect
      if (navbar) {
        if (scrollTop > 50) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    }, { passive: true });
  })();

  /* ----------------------------------------------------------
     4. Active Nav Link
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var path = window.location.pathname.split('/').pop() || 'index.html';
    var links = document.querySelectorAll('#navbar a, nav a');
    for (var i = 0; i < links.length; i++) {
      var href = links[i].getAttribute('href');
      if (href) {
        var linkFile = href.split('/').pop();
        if (linkFile === path) {
          links[i].classList.add('active');
        }
      }
    }
  });

  /* ----------------------------------------------------------
     5. Intersection Observer — Scroll Reveal
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');
          observer.unobserve(entries[i].target);
        }
      }
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    for (var i = 0; i < reveals.length; i++) {
      observer.observe(reveals[i]);
    }
  });

  /* ----------------------------------------------------------
     6. Parallax Engine
  ---------------------------------------------------------- */
  (function parallax() {
    if (reducedMotion) return;

    var els;
    var ticking = false;

    document.addEventListener('DOMContentLoaded', function () {
      els = document.querySelectorAll('[data-parallax]');
      if (!els.length) return;

      window.addEventListener('scroll', function () {
        if (!ticking) {
          window.requestAnimationFrame(function () {
            var scrollY = window.scrollY || window.pageYOffset;
            for (var i = 0; i < els.length; i++) {
              var speed = parseFloat(els[i].getAttribute('data-parallax')) || 0.3;
              els[i].style.transform = 'translateY(' + (scrollY * speed) + 'px) scale(1.1)';
            }
            ticking = false;
          });
          ticking = true;
        }
      }, { passive: true });
    });
  })();

  /* ----------------------------------------------------------
     7. Hero Floating Particles
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var container = document.getElementById('heroParticles');
    if (!container || reducedMotion) return;

    for (var i = 0; i < 25; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      var size = (Math.random() * 2 + 1).toFixed(1);
      p.style.cssText =
        'position:absolute;' +
        'left:' + (Math.random() * 100).toFixed(1) + '%;' +
        'animation-delay:' + (Math.random() * 8).toFixed(1) + 's;' +
        'animation-duration:' + (Math.random() * 6 + 6).toFixed(1) + 's;' +
        'width:' + size + 'px;' +
        'height:' + size + 'px;';
      container.appendChild(p);
    }
  });

  /* ----------------------------------------------------------
     8. Counter Animation
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var counters = document.querySelectorAll('.counter');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          animateCounter(entries[i].target);
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.5 });

    for (var i = 0; i < counters.length; i++) {
      observer.observe(counters[i]);
    }

    function animateCounter(el) {
      var target = parseInt(el.getAttribute('data-target'), 10) || 0;
      var duration = 2000;
      var start = performance.now();

      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) {
          requestAnimationFrame(tick);
        }
      }

      requestAnimationFrame(tick);
    }
  });

  /* ----------------------------------------------------------
     9. Lightbox
  ---------------------------------------------------------- */
  (function lightbox() {
    var venueImages = [
      { src: 'venue/bar_long.webp', title: 'The Bar', desc: 'Hand-built rustic counter with full spirits selection' },
      { src: 'venue/barback.webp', title: 'Back Bar', desc: 'Mason jar infusions & curated spirits' },
      { src: 'venue/bar_right.webp', title: 'Bar Seating', desc: 'Vintage Americana & warm wood tones' },
      { src: 'venue/lounge.webp', title: 'The Lounge', desc: 'Big screen, cozy seating, board games' },
      { src: 'venue/pool_table.webp', title: 'Game Room', desc: 'Pool table & chevron accent wall' },
      { src: 'venue/bar.webp', title: 'Private Bar', desc: '"We are always here, unless we are gone"' }
    ];

    var currentIndex = 0;

    function openLightbox(idx) {
      var lb = document.getElementById('lightbox');
      if (!lb) return;
      currentIndex = idx;
      var data = venueImages[idx];
      var img = lb.querySelector('.lightbox-img') || lb.querySelector('img');
      var title = lb.querySelector('.lightbox-title');
      var desc = lb.querySelector('.lightbox-desc');
      if (img) { img.src = data.src; img.alt = data.title; }
      if (title) title.textContent = data.title;
      if (desc) desc.textContent = data.desc;
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      var lb = document.getElementById('lightbox');
      if (!lb) return;
      lb.classList.remove('open');
      document.body.style.overflow = '';
    }

    function navigate(dir) {
      currentIndex = (currentIndex + dir + venueImages.length) % venueImages.length;
      openLightbox(currentIndex);
    }

    // Expose globally for inline onclick if needed
    window.openLightbox = openLightbox;
    window.closeLightbox = closeLightbox;

    document.addEventListener('DOMContentLoaded', function () {
      // Click triggers
      var triggers = document.querySelectorAll('[data-lightbox]');
      for (var i = 0; i < triggers.length; i++) {
        (function (index) {
          triggers[index].addEventListener('click', function (e) {
            e.preventDefault();
            openLightbox(index);
          });
        })(i);
      }

      var lb = document.getElementById('lightbox');
      if (!lb) return;

      // Close button
      var closeBtn = lb.querySelector('.lightbox-close');
      if (closeBtn) closeBtn.addEventListener('click', closeLightbox);

      // Click on backdrop
      lb.addEventListener('click', function (e) {
        if (e.target === lb) closeLightbox();
      });

      // Prev / Next buttons
      var prevBtn = lb.querySelector('.lightbox-prev');
      var nextBtn = lb.querySelector('.lightbox-next');
      if (prevBtn) prevBtn.addEventListener('click', function () { navigate(-1); });
      if (nextBtn) nextBtn.addEventListener('click', function () { navigate(1); });

      // Keyboard navigation
      document.addEventListener('keydown', function (e) {
        if (!lb.classList.contains('open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigate(-1);
        if (e.key === 'ArrowRight') navigate(1);
      });
    });
  })();

  /* ----------------------------------------------------------
     10. Magnetic Button Effect
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var btns = document.querySelectorAll('.btn');
    for (var i = 0; i < btns.length; i++) {
      btns[i].addEventListener('mousemove', function (e) {
        var rect = this.getBoundingClientRect();
        var mx = ((e.clientX - rect.left) / rect.width * 100).toFixed(1);
        var my = ((e.clientY - rect.top) / rect.height * 100).toFixed(1);
        this.style.setProperty('--mx', mx + '%');
        this.style.setProperty('--my', my + '%');
      });
    }
  });

  /* ----------------------------------------------------------
     11. Image Skeleton Loading
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var imgs = document.querySelectorAll('img[loading="lazy"]');
    for (var i = 0; i < imgs.length; i++) {
      if (imgs[i].complete) {
        var wrap = imgs[i].closest('.img-wrap');
        if (wrap) wrap.classList.add('loaded');
      }
    }
  });

  /* ----------------------------------------------------------
     12. Product Grid Rendering  &  13. Product Filtering
  ---------------------------------------------------------- */
  (function productModule() {
    var products = [
      {n:"Montucky Spirits E-Book",p:"$10.00",img:"https://montuckymoonshine.com/cdn/shop/products/bookcover_1024x.png?v=1642360814",url:"https://montuckymoonshine.com/products/montucky-moonshine-spirits-e-book",tag:"Digital",cat:"merchandise"},
      {n:"Wall Clock",p:"$35.00",img:"https://montuckymoonshine.com/cdn/shop/files/2096947309553618432_2048_1024x.jpg?v=1688013525",url:"https://montuckymoonshine.com/products/wall-clock",tag:"Home",cat:"merchandise"},
      {n:"Moonshine Stein",p:"$25.00",img:"https://montuckymoonshine.com/cdn/shop/products/pns73k8a6h07stpkhj1y3d2g_1024x.png?v=1547450598",url:"https://montuckymoonshine.com/products/moonshine-stein",tag:"Drinkware",cat:"mugs"},
      {n:"Sexy Coffee Mug",p:"$19.99",img:"https://montuckymoonshine.com/cdn/shop/files/12123678348230688733_2048_custom_1024x.jpg?v=1728695733",url:"https://montuckymoonshine.com/products/accent-coffee-mug-11-15oz-1",tag:"Drinkware",cat:"mugs"},
      {n:"Accent Coffee Mug",p:"$19.99",img:"https://montuckymoonshine.com/cdn/shop/files/15556593331530897933_2048_1024x.jpg?v=1728747048",url:"https://montuckymoonshine.com/products/accent-coffee-mug-11-15oz-2",tag:"Drinkware",cat:"mugs"},
      {n:"Stainless Steel Flask",p:"$21.88",img:"https://montuckymoonshine.com/cdn/shop/files/13314165464068572653_2048_1024x.jpg?v=1737535598",url:"https://montuckymoonshine.com/products/stainless-steel-flask-6oz",tag:"Drinkware",cat:"mugs"},
      {n:"Distressed Dad Hat",p:"$22.00",img:"https://montuckymoonshine.com/cdn/shop/products/mockup-b7a59b9d_1024x.jpg?v=1589435140",url:"https://montuckymoonshine.com/products/distressed-dad-hat",tag:"Accessories",cat:"merchandise"},
      {n:"Drink Drank Drunk Tee",p:"$21.69",img:"https://montuckymoonshine.com/cdn/shop/files/15211927451420024901_2048_1024x.jpg?v=1738121468",url:"https://montuckymoonshine.com/products/funny-drink-drank-drunk-t-shirt",tag:"Apparel",cat:"tees"},
      {n:"Hobby Carpenter Tee",p:"$29.27",img:"https://montuckymoonshine.com/cdn/shop/files/12475718121083323152_2048_1024x.jpg?v=1774545601",url:"https://montuckymoonshine.com/products/hobby-carpenter-t-shirt",tag:"Apparel",cat:"tees"},
      {n:"Bold Graphic Tee",p:"$33.32",img:"https://montuckymoonshine.com/cdn/shop/files/8382319889231594197_2048_1024x.jpg?v=1774642794",url:"https://montuckymoonshine.com/products/t-shirt-found-out-already",tag:"Apparel",cat:"tees"},
      {n:"Heavyweight Hoodie",p:"$87.77",img:"https://montuckymoonshine.com/cdn/shop/files/6909327151717644564_2048_1024x.jpg?v=1774545469",url:"https://montuckymoonshine.com/products/unisex-heavyweight-hooded-sweatshirt",tag:"Apparel",cat:"tees"},
      {n:"Jersey Tee",p:"$18.82",img:"https://montuckymoonshine.com/cdn/shop/files/8732487188133167477_2048_1024x.jpg?v=1774545435",url:"https://montuckymoonshine.com/products/unisex-jersey-short-sleeve-tee",tag:"Apparel",cat:"tees"},
      {n:"Velveteen Blanket",p:"$32.15",img:"https://montuckymoonshine.com/cdn/shop/products/09193d3b46d306ced28add4a23b3e67e_1024x.jpg?v=1666326356",url:"https://montuckymoonshine.com/products/velveteen-minky-blanket-two-sided-print",tag:"Home",cat:"merchandise"},
      {n:"WD & Duct Tape Tee",p:"$22.99",img:"https://montuckymoonshine.com/cdn/shop/files/5977245853495543666_2048_1024x.jpg?v=1774545663",url:"https://montuckymoonshine.com/products/wd-ducttape-tee",tag:"Apparel",cat:"tees"},
      {n:"Women's Thongs (AOP)",p:"$22.38",img:"https://montuckymoonshine.com/cdn/shop/files/3122953234843618473_2048_1024x.jpg?v=1738052717",url:"https://montuckymoonshine.com/products/womens-thongs-aop",tag:"Apparel",cat:"merchandise"}
    ];


  // ── Product slug mapping for detail pages ──────────────
  var PRODUCT_SLUGS = {
    'Moonshine Stein': 'moonshine-stein',
    'Drink Drank Drunk Tee': 'funny-drink-drank-drunk-t-shirt',
    'Wall Clock': 'wall-clock',
    'Stainless Steel Flask': 'stainless-steel-flask-6oz',
    'Heavyweight Hoodie': 'unisex-heavyweight-hooded-sweatshirt'
  };

    function renderProducts(list, container) {
      var html = '';
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        html +=
          (PRODUCT_SLUGS[item.n] ? '<a href="product.html?id=' + PRODUCT_SLUGS[item.n] + '"' : '<a href="' + item.url + '" target="_blank" rel="noopener noreferrer"') + ' class="product-card" data-cat="' + item.cat + '" style="animation-delay:' + (i * 60) + 'ms">' +
            '<div class="img-wrap">' +
              '<img src="' + item.img + '" alt="' + item.n + '" loading="lazy" onload="this.parentElement.classList.add(\'loaded\')">' +
              '<div class="product-overlay"><span class="btn btn-o">Buy Now</span></div>' +
            '</div>' +
            '<div class="product-info">' +
              '<span class="product-tag">' + item.tag + '</span>' +
              '<h3>' + item.n + '</h3>' +
              '<span class="product-price">' + item.p + '</span>' +
            '</div>' +
          '</a>';
      }
      container.innerHTML = html;
    }

    document.addEventListener('DOMContentLoaded', function () {
      var grid = document.getElementById('productGrid');
      if (!grid) return;

      renderProducts(products, grid);

      // Set product count data-target
      var countEl = document.getElementById('productCount');
      if (countEl) countEl.setAttribute('data-target', products.length);

      // Filter buttons
      var filterBtns = document.querySelectorAll('.filter-btn');
      if (!filterBtns.length) return;

      for (var i = 0; i < filterBtns.length; i++) {
        filterBtns[i].addEventListener('click', function () {
          // Remove active from all
          for (var j = 0; j < filterBtns.length; j++) {
            filterBtns[j].classList.remove('active');
          }
          this.classList.add('active');

          var cat = this.getAttribute('data-cat');
          var filtered;
          if (cat === 'all') {
            filtered = products;
          } else {
            filtered = [];
            for (var k = 0; k < products.length; k++) {
              if (products[k].cat === cat) filtered.push(products[k]);
            }
          }

          renderProducts(filtered, grid);

          // Staggered fade-in
          var cards = grid.querySelectorAll('.product-card');
          for (var m = 0; m < cards.length; m++) {
            cards[m].style.opacity = '0';
            cards[m].style.transform = 'translateY(20px)';
            (function (card, delay) {
              setTimeout(function () {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, delay);
            })(cards[m], m * 60);
          }
        });
      }
    });
  })();

  /* ----------------------------------------------------------
     14. Booking Form AJAX Submit
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('bookingForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);

      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString()
      })
      .then(function (res) {
        if (!res.ok) throw new Error('Network response was not ok');
        var fields = form.querySelector('.form-fields') || form.querySelector('div');
        if (fields) fields.style.display = 'none';
        var success = document.getElementById('formSuccess');
        if (success) success.style.display = 'block';
      })
      .catch(function () {
        alert('Something went wrong. Please email us directly at info@montuckymoonshine.com');
      });
    });
  });

  /* ----------------------------------------------------------
     15. Custom Cursor Glow
  ---------------------------------------------------------- */
  (function cursorGlow() {
    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) return;

    document.addEventListener('DOMContentLoaded', function () {
      var glow = document.createElement('div');
      glow.className = 'cursor-glow';
      document.body.appendChild(glow);

      var interactiveSelectors = '.btn, a, button, [role="button"]';

      document.addEventListener('mousemove', function (e) {
        glow.style.transform = 'translate(' + e.clientX + 'px, ' + e.clientY + 'px)';
      });

      // Enlarge on interactive elements
      document.addEventListener('mouseover', function (e) {
        if (e.target.closest(interactiveSelectors)) {
          glow.classList.add('cursor-glow--active');
        }
      });
      document.addEventListener('mouseout', function (e) {
        if (e.target.closest(interactiveSelectors)) {
          glow.classList.remove('cursor-glow--active');
        }
      });
    });
  })();

  /* ----------------------------------------------------------
     16. Split Text Animation
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var els = document.querySelectorAll('.split-text');
    if (!els.length) return;

    for (var i = 0; i < els.length; i++) {
      var text = els[i].textContent;
      els[i].textContent = '';
      els[i].setAttribute('aria-label', text);
      for (var j = 0; j < text.length; j++) {
        var span = document.createElement('span');
        span.textContent = text[j];
        span.style.opacity = '0';
        span.style.display = 'inline-block';
        span.style.transform = 'translateY(20px)';
        span.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        span.style.transitionDelay = (j * 30) + 'ms';
        if (text[j] === ' ') span.innerHTML = '&nbsp;';
        els[i].appendChild(span);
      }
    }

    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          var spans = entries[i].target.querySelectorAll('span');
          for (var j = 0; j < spans.length; j++) {
            spans[j].style.opacity = '1';
            spans[j].style.transform = 'translateY(0)';
          }
          observer.unobserve(entries[i].target);
        }
      }
    }, { threshold: 0.1 });

    for (var i = 0; i < els.length; i++) {
      observer.observe(els[i]);
    }
  });

  /* ----------------------------------------------------------
     17. Page Load Transition
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
      document.body.classList.add('page-loaded');
    }, 100);
  });

  /* ----------------------------------------------------------
     18. Tilt Card Effect
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (reducedMotion) return;

    var cards = document.querySelectorAll('.tilt-card');
    for (var i = 0; i < cards.length; i++) {
      cards[i].addEventListener('mousemove', function (e) {
        var rect = this.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width;
        var y = (e.clientY - rect.top) / rect.height;
        var rotateX = (0.5 - y) * 10; // max +-5deg
        var rotateY = (x - 0.5) * 10;
        this.style.transform = 'rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg)';
      });

      cards[i].addEventListener('mouseleave', function () {
        this.style.transition = 'transform 0.4s ease';
        this.style.transform = 'rotateX(0) rotateY(0)';
      });

      cards[i].addEventListener('mouseenter', function () {
        this.style.transition = 'none';
      });
    }
  });

  /* ----------------------------------------------------------
     19. Dynamic Copyright Year
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    var yearEl = document.getElementById('copyrightYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  });

  /* ----------------------------------------------------------
     20. Smooth Scroll for Anchor Links
  ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    if (reducedMotion) return;

    var anchors = document.querySelectorAll('a[href^="#"]');
    for (var i = 0; i < anchors.length; i++) {
      anchors[i].addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (!href || href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }
  });


  /* ----------------------------------------------------------
     21. Email Popup — fires after 8s, once per session
  ---------------------------------------------------------- */
  (function emailPopup() {
    if (sessionStorage.getItem('popup_shown')) return;
    var popup = document.getElementById('emailPopup');
    var closeBtn = document.getElementById('popupClose');
    if (!popup) return;

    var timer = setTimeout(function () {
      popup.classList.add('open');
      sessionStorage.setItem('popup_shown', '1');
    }, 8000);

    function closePopup() {
      popup.classList.remove('open');
    }

    if (closeBtn) closeBtn.addEventListener('click', closePopup);
    popup.addEventListener('click', function (e) {
      if (e.target === popup) closePopup();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closePopup();
    });

    // Exit intent (desktop only)
    document.addEventListener('mouseleave', function (e) {
      if (e.clientY <= 0 && !sessionStorage.getItem('popup_shown')) {
        clearTimeout(timer);
        popup.classList.add('open');
        sessionStorage.setItem('popup_shown', '1');
      }
    });
  })();

  /* ----------------------------------------------------------
     22. Shipping Progress Bar — interactive demo
     Accumulates cart value as user clicks "Buy Now" links
  ---------------------------------------------------------- */
  (function shippingProgress() {
    var THRESHOLD = 40;

    // Get cart total from sessionStorage
    var cartTotal = parseFloat(sessionStorage.getItem('mm_cart_total') || '0');

    function updateBar(val, fillId, msgId, amtId) {
      var fill = document.getElementById(fillId);
      var msg  = document.getElementById(msgId);
      var amt  = document.getElementById(amtId);
      if (!fill) return;
      var pct = Math.min((val / THRESHOLD) * 100, 100);
      fill.style.width = pct + '%';
      if (val >= THRESHOLD) {
        if (msg) msg.innerHTML = '<strong style="color:#4caf50">🎉 You qualify for FREE SHIPPING!</strong>';
      } else {
        var rem = Math.max(THRESHOLD - val, 0).toFixed(2);
        if (amt) amt.textContent = '$' + rem;
        if (msg && !amt) msg.innerHTML = 'Add <span>$' + rem + '</span> more for <strong style="color:var(--amber)">FREE SHIPPING</strong>';
      }
    }

    // Update both bars (shop page + product page)
    function refreshAll() {
      cartTotal = parseFloat(sessionStorage.getItem('mm_cart_total') || '0');
      updateBar(cartTotal, 'shipFill', 'shipMsg', 'shipAmt');
      updateBar(cartTotal, 'prodShipFill', 'prodShipMsg', 'prodShipAmt');
    }

    refreshAll();

    // Intercept clicks on product buy buttons to simulate adding to cart
    document.addEventListener('click', function(e) {
      var btn = e.target.closest('.btn-p, .btn.btn-p');
      if (!btn) return;
      var href = btn.getAttribute('href') || '';
      // Only intercept actual product links
      if (href.indexOf('montuckymoonshine.com/products') > -1 ||
          href.indexOf('montuckymoonshine.com/collections') > -1 ||
          href.indexOf('montuckymoonshine.com/cart') > -1) {
        // Extract price from sibling or parent if possible
        var priceEl = btn.closest('.product-info-col, .p-card, .bundle-body');
        var priceText = priceEl ? (priceEl.querySelector('.product-price, .p-price, .bundle-price-new') || {}).textContent || '' : '';
        var price = parseFloat(priceText.replace(/[^0-9.]/g,'')) || 25;
        var newTotal = Math.min(cartTotal + price, 120);
        sessionStorage.setItem('mm_cart_total', newTotal);
        cartTotal = newTotal;
        // Animate the bar
        setTimeout(refreshAll, 100);
      }
    });
  })();


  /* ----------------------------------------------------------
     24. Mobile hamburger menu
  ---------------------------------------------------------- */
  (function mobileNav() {
    var toggle = document.getElementById('navToggle');
    var menu   = document.getElementById('mobileMenu');
    if (!toggle || !menu) return;

    function close() {
      toggle.classList.remove('open');
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', close);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) close();
    });

    // Close on escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') close();
    });
  })();

  /* ----------------------------------------------------------
     25. Hero Carousel — auto-rotation, dot nav, pause-on-hover
  ---------------------------------------------------------- */
  (function heroCarousel() {
    var carousel = document.getElementById('heroCarousel');
    var dotsWrap = document.getElementById('heroDots');
    if (!carousel) return;

    var slides   = carousel.querySelectorAll('.hero-slide');
    var dots     = dotsWrap ? dotsWrap.querySelectorAll('.hero-dot') : [];
    var current  = 0;
    var total    = slides.length;
    var INTERVAL = 6000;
    var timer;
    var paused   = false;

    function goTo(idx) {
      // Remove active from current
      slides[current].classList.remove('active');
      if (dots[current]) {
        dots[current].classList.remove('active');
        dots[current].setAttribute('aria-selected', 'false');
      }
      // Reset img animation so ken-burns restarts on new slide
      var oldImg = slides[current].querySelector('img');
      if (oldImg) { oldImg.style.animation = 'none'; void oldImg.offsetWidth; oldImg.style.animation = ''; }

      current = (idx + total) % total;

      slides[current].classList.add('active');
      if (dots[current]) {
        dots[current].classList.add('active');
        dots[current].setAttribute('aria-selected', 'true');
      }
    }

    function next() { goTo(current + 1); }

    function startTimer() {
      clearInterval(timer);
      timer = setInterval(function () { if (!paused) next(); }, INTERVAL);
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); startTimer(); });
    });

    // Pause on hover/touch
    var hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('mouseenter', function () { paused = true; });
      hero.addEventListener('mouseleave', function () { paused = false; });
      hero.addEventListener('touchstart', function () { paused = true; }, { passive: true });
      hero.addEventListener('touchend',   function () { setTimeout(function () { paused = false; }, 3000); }, { passive: true });
    }

    document.addEventListener('visibilitychange', function () { paused = document.hidden; });

    startTimer();
  })();

  /* ----------------------------------------------------------
     26. Age Gate — sessionStorage, ARIA focus trap
  ---------------------------------------------------------- */
  (function ageGate() {
    var gate = document.getElementById('ageGate');
    if (!gate) return;

    if (sessionStorage.getItem('ag_verified') === '1') {
      gate.classList.add('dismissed');
      return;
    }

    var yesBtn  = document.getElementById('ageYes');
    var noBtn   = document.getElementById('ageNo');
    var btnWrap = document.getElementById('ageGateBtns');
    var denied  = document.getElementById('ageGateDenied');

    // Focus trap
    var focusEls = gate.querySelectorAll('button, a[href], input, [tabindex]:not([tabindex="-1"])');
    var firstEl  = focusEls[0];
    var lastEl   = focusEls[focusEls.length - 1];
    gate.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) { e.preventDefault(); lastEl.focus(); }
      } else {
        if (document.activeElement === lastEl)  { e.preventDefault(); firstEl.focus(); }
      }
    });

    document.body.style.overflow = 'hidden';

    function admit() {
      sessionStorage.setItem('ag_verified', '1');
      document.body.style.overflow = '';
      gate.classList.add('dismissed');
    }

    function deny() {
      btnWrap.style.display  = 'none';
      denied.style.display   = 'flex';
      var deniedLink = denied.querySelector('a');
      if (deniedLink) deniedLink.focus();
    }

    if (yesBtn) yesBtn.addEventListener('click', admit);
    if (noBtn)  noBtn.addEventListener('click', deny);

    setTimeout(function () { if (yesBtn) yesBtn.focus(); }, 200);
  })();

})();
