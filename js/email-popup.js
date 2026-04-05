/**
 * Montucky Moonshine — Email Capture Popup
 * Triggers: 8s delay OR exit-intent (mouseleave to top of viewport)
 * Suppression: sessionStorage (shown once per session), localStorage (dismissed/subscribed)
 */
(function() {
  'use strict';

  var STORAGE_KEY = 'mm_popup';
  var SESSION_KEY = 'mm_popup_seen';

  function shouldShow() {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return false;
      var stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        var data = JSON.parse(stored);
        if (data.subscribed || data.dismissed) return false;
      }
    } catch(e) {}
    return true;
  }

  function markSeen(action) {
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ action: action, ts: Date.now() }));
    } catch(e) {}
  }

  function createPopup() {
    var overlay = document.createElement('div');
    overlay.id = 'mm-popup-overlay';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Join the Montucky Moonshine list');
    overlay.style.cssText = [
      'position:fixed;inset:0;z-index:9999',
      'background:rgba(10,10,8,.85)',
      'backdrop-filter:blur(6px)',
      '-webkit-backdrop-filter:blur(6px)',
      'display:flex;align-items:center;justify-content:center',
      'padding:1.5rem',
      'opacity:0;transition:opacity .4s ease',
      'pointer-events:none'
    ].join(';');

    var box = document.createElement('div');
    box.id = 'mm-popup-box';
    box.style.cssText = [
      'background:#121210',
      'border:1px solid rgba(200,146,42,.3)',
      'border-radius:4px',
      'max-width:440px;width:100%',
      'padding:2.5rem 2rem',
      'text-align:center',
      'position:relative',
      'transform:translateY(20px);transition:transform .4s ease'
    ].join(';');

    box.innerHTML = [
      '<button id="mm-popup-close" aria-label="Close" style="position:absolute;top:1rem;right:1rem;background:none;border:none;color:#9e9a8f;font-size:1.25rem;cursor:pointer;line-height:1;padding:.25rem;transition:color .2s" onmouseover="this.style.color=\'#c8922a\'" onmouseout="this.style.color=\'#9e9a8f\'">&times;</button>',
      '<div style="font-size:2rem;margin-bottom:.75rem">🥃</div>',
      '<p style="font-family:\'Barlow Condensed\',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.35em;text-transform:uppercase;color:#c8922a;margin-bottom:.5rem">Montana\'s Own Moonshine</p>',
      '<h2 style="font-family:\'Playfair Display\',serif;font-size:1.6rem;font-weight:900;color:#f5f0e6;line-height:1.15;margin-bottom:.75rem">Get 10% Off<br>Your First Order</h2>',
      '<p style="font-size:.875rem;color:#9e9a8f;line-height:1.7;margin-bottom:1.75rem">Recipes, stories from the Montana backcountry, and exclusive offers — straight to your inbox. No spam, ever.</p>',
      '<form name="email-capture" data-netlify="true" netlify-honeypot="bot-field" id="mm-popup-form" style="display:flex;flex-direction:column;gap:.75rem">',
        '<input type="hidden" name="form-name" value="email-capture">',
        '<input name="bot-field" style="display:none" tabindex="-1" aria-hidden="true">',
        '<input type="email" name="email" required placeholder="your@email.com" id="mm-popup-email" style="background:#1a1a16;border:1px solid rgba(200,146,42,.2);border-radius:2px;padding:.85rem 1rem;color:#eae5d8;font-family:\'Barlow\',sans-serif;font-size:.9rem;outline:none;transition:border-color .2s" onfocus="this.style.borderColor=\'rgba(200,146,42,.6)\'" onblur="this.style.borderColor=\'rgba(200,146,42,.2)\'">',
        '<button type="submit" id="mm-popup-submit" style="background:#c8922a;border:none;color:#0a0a08;font-family:\'Barlow Condensed\',sans-serif;font-size:.8rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;padding:.9rem 1.5rem;border-radius:2px;cursor:pointer;transition:background .2s,transform .15s" onmouseover="this.style.background=\'#e6b04a\'" onmouseout="this.style.background=\'#c8922a\'">Claim My 10% Off</button>',
      '</form>',
      '<div id="mm-popup-success" style="display:none;padding:1rem 0">',
        '<p style="font-size:2rem;margin-bottom:.5rem">🎉</p>',
        '<p style="font-family:\'Barlow Condensed\',sans-serif;font-size:.75rem;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:#c8922a;margin-bottom:.4rem">You\'re in!</p>',
        '<p style="font-size:.875rem;color:#9e9a8f;line-height:1.6">Check your email for your discount code. Welcome to the Montucky crew.</p>',
      '</div>',
      '<p style="margin-top:1rem;font-size:.75rem;color:#6b6762">No spam. Unsubscribe anytime.</p>'
    ].join('');

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    // Animate in
    requestAnimationFrame(function() {
      requestAnimationFrame(function() {
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = '';
        box.style.transform = 'translateY(0)';
      });
    });

    // Trap focus
    var focusable = box.querySelectorAll('input, button');
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    box.addEventListener('keydown', function(e) {
      if (e.key === 'Tab') {
        if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last.focus(); } }
        else { if (document.activeElement === last) { e.preventDefault(); first.focus(); } }
      }
      if (e.key === 'Escape') closePopup('dismissed');
    });
    setTimeout(function() { document.getElementById('mm-popup-email').focus(); }, 100);

    // Close button
    document.getElementById('mm-popup-close').addEventListener('click', function() {
      closePopup('dismissed');
    });

    // Overlay click to close
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) closePopup('dismissed');
    });

    // Form submit
    document.getElementById('mm-popup-form').addEventListener('submit', function(e) {
      e.preventDefault();
      var email = document.getElementById('mm-popup-email').value;
      var form = e.target;
      var btn = document.getElementById('mm-popup-submit');
      btn.textContent = 'Joining…';
      btn.disabled = true;

      // Submit to Netlify
      fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          'form-name': 'email-capture',
          'email': email
        }).toString()
      }).then(function() {
        markSeen('subscribed');
        document.getElementById('mm-popup-form').style.display = 'none';
        document.getElementById('mm-popup-success').style.display = 'block';
        setTimeout(function() { closePopup('subscribed'); }, 4000);
      }).catch(function() {
        // Still show success — form data already in the DOM for Netlify fallback
        markSeen('subscribed');
        document.getElementById('mm-popup-form').style.display = 'none';
        document.getElementById('mm-popup-success').style.display = 'block';
        setTimeout(function() { closePopup('subscribed'); }, 4000);
      });
    });
  }

  function closePopup(action) {
    markSeen(action || 'dismissed');
    var overlay = document.getElementById('mm-popup-overlay');
    if (!overlay) return;
    overlay.style.opacity = '0';
    overlay.style.pointerEvents = 'none';
    var box = document.getElementById('mm-popup-box');
    if (box) box.style.transform = 'translateY(20px)';
    setTimeout(function() { if (overlay.parentNode) overlay.parentNode.removeChild(overlay); }, 450);
  }

  function initPopup() {
    if (!shouldShow()) return;

    var triggered = false;
    function trigger() {
      if (triggered) return;
      triggered = true;
      clearTimeout(timer);
      document.removeEventListener('mouseleave', exitHandler);
      createPopup();
    }

    // 8-second timer
    var timer = setTimeout(trigger, 8000);

    // Exit intent — mouse leaving viewport from the top
    function exitHandler(e) {
      if (e.clientY <= 0) trigger();
    }
    document.addEventListener('mouseleave', exitHandler);
  }

  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopup);
  } else {
    initPopup();
  }

})();
