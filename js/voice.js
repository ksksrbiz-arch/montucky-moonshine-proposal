/* ============================================================
   Montucky Moonshine — ElevenLabs Voice Spots
   Lazy-loads audio per trigger element. No audio until user
   interaction (browser autoplay policy compliant).
   
   Usage: add data-voice="bertie|josephine|bootlegger|opener"
   to any element. Audio fires once on first intersection.
   ============================================================ */

(function MontuckyVoice() {
  'use strict';

  // ── CONFIG ──────────────────────────────────────────────
  var ELEVEN_KEY = 'sk_edeb3f3d89d7d5151a67c22c347ee80b36a59660ec77f796';
  var VOICE_ID   = 'pNInz6obpgDQGcFmaJgB'; // "Adam" - deep, gravelly, aged
  // Swap to: '29vD33N1BO60XplBxEhW' (Josh) or 'VR6AewLTigWG4xSOukaG' (Arnold) if preferred

  // ── SCRIPTS per trigger key ─────────────────────────────
  var SCRIPTS = {
    opener: "Welcome to Montana moonshine country. Pull up a chair — this story's been aging since before you were born.",
    bertie: "Bertie Brown made the best moonshine in all of Fergus County. Folks said her likker was the safest you'd ever drink. She never saw the day it went legal.",
    josephine: "One toot on the train whistle meant one quart. Two toots meant two. Josephine Doody had the whole Great Northern Railroad running on moonshine schedule.",
    bootlegger: "A full car of Canadian whiskey could fetch two thousand, five hundred dollars — twice what a working man earned in a year. Out here, a fast car and a dark road were a man's best business plan.",
    whiskey_rebellion: "Seven hundred armed men burned down a tax collector's home. George Washington himself rode out with thirteen thousand troops to put them down. All over a tax on corn whiskey.",
    montana_repeal: "Montana voted Prohibition in two full years before the rest of the country. Then, when it wasn't working, they voted themselves back out. That's Montana for you — principled enough to try it, independent enough to know when to quit."
  };

  // ── AUDIO CACHE — one blob URL per script key ───────────
  var cache = {};
  var pending = {};
  var userHasInteracted = false;

  // Track first user interaction for autoplay compliance
  function markInteraction() {
    userHasInteracted = true;
    document.removeEventListener('click', markInteraction);
    document.removeEventListener('keydown', markInteraction);
    document.removeEventListener('touchstart', markInteraction);
  }
  document.addEventListener('click', markInteraction);
  document.addEventListener('keydown', markInteraction);
  document.addEventListener('touchstart', markInteraction);

  // ── FETCH from ElevenLabs ────────────────────────────────
  function fetchVoice(key, callback) {
    if (cache[key]) { callback(cache[key]); return; }
    if (pending[key]) { pending[key].push(callback); return; }

    pending[key] = [callback];
    var text = SCRIPTS[key];
    if (!text) return;

    fetch('https://api.elevenlabs.io/v1/text-to-speech/' + VOICE_ID + '/stream', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVEN_KEY,
        'Content-Type': 'application/json',
        'Accept': 'audio/mpeg'
      },
      body: JSON.stringify({
        text: text,
        model_id: 'eleven_turbo_v2',
        voice_settings: { stability: 0.45, similarity_boost: 0.82, style: 0.35, use_speaker_boost: true }
      })
    })
    .then(function(r) { return r.blob(); })
    .then(function(blob) {
      var url = URL.createObjectURL(blob);
      cache[key] = url;
      (pending[key] || []).forEach(function(cb) { cb(url); });
      delete pending[key];
    })
    .catch(function(e) {
      console.warn('[MontuckyVoice] fetch failed for key:', key, e);
      delete pending[key];
    });
  }

  // ── PLAY ─────────────────────────────────────────────────
  function playVoice(key, btn) {
    fetchVoice(key, function(url) {
      var audio = new Audio(url);
      audio.volume = 0.88;
      
      if (btn) {
        btn.classList.add('mv-playing');
        btn.setAttribute('aria-label', 'Playing…');
        audio.addEventListener('ended', function() {
          btn.classList.remove('mv-playing');
          btn.setAttribute('aria-label', 'Play audio');
        });
      }

      // Fade in
      audio.volume = 0;
      audio.play().then(function() {
        var vol = 0;
        var fade = setInterval(function() {
          vol = Math.min(vol + 0.08, 0.88);
          audio.volume = vol;
          if (vol >= 0.88) clearInterval(fade);
        }, 40);
      }).catch(function(e) {
        console.warn('[MontuckyVoice] play blocked:', e);
        if (btn) btn.classList.remove('mv-playing');
      });
    });
  }

  // ── BUTTON FACTORY ───────────────────────────────────────
  function createButton(key, theme) {
    var btn = document.createElement('button');
    btn.className = 'mv-btn' + (theme === 'light' ? ' mv-btn--light' : '');
    btn.setAttribute('aria-label', 'Play audio');
    btn.setAttribute('data-voice-key', key);
    btn.innerHTML =
      '<span class="mv-icon">' +
        '<svg width="14" height="14" viewBox="0 0 14 14" fill="none">' +
          '<polygon points="3,1 13,7 3,13" fill="currentColor"/>' +
        '</svg>' +
      '</span>' +
      '<span class="mv-label">Hear it</span>' +
      '<span class="mv-waves">' +
        '<span></span><span></span><span></span>' +
      '</span>';

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!userHasInteracted) userHasInteracted = true;
      playVoice(key, btn);
    });
    return btn;
  }

  // ── INJECT STYLES ────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = [
    '.mv-btn{display:inline-flex;align-items:center;gap:7px;padding:6px 14px 6px 10px;',
    'background:rgba(200,146,42,0.12);border:1px solid rgba(200,146,42,0.35);border-radius:20px;',
    'color:#c8922a;font-size:.72rem;font-weight:600;letter-spacing:.06em;text-transform:uppercase;',
    'cursor:pointer;transition:all .2s;font-family:inherit;vertical-align:middle;margin-left:10px;}',
    '.mv-btn:hover{background:rgba(200,146,42,0.22);border-color:rgba(200,146,42,0.6);}',
    '.mv-btn--light{background:rgba(200,146,42,0.08);color:#8a6820;}',
    '.mv-waves{display:none;gap:2px;align-items:center;}',
    '.mv-waves span{width:2px;border-radius:2px;background:#c8922a;animation:mv-wave 0.7s ease-in-out infinite;}',
    '.mv-waves span:nth-child(1){height:6px;animation-delay:0s;}',
    '.mv-waves span:nth-child(2){height:10px;animation-delay:.15s;}',
    '.mv-waves span:nth-child(3){height:6px;animation-delay:.3s;}',
    '.mv-btn.mv-playing .mv-waves{display:flex;}',
    '.mv-btn.mv-playing .mv-icon{display:none;}',
    '.mv-btn.mv-playing .mv-label{display:none;}',
    '@keyframes mv-wave{0%,100%{transform:scaleY(1)}50%{transform:scaleY(1.8)}}',
    '.mv-opener{position:fixed;bottom:24px;right:24px;z-index:9000;',
    'background:linear-gradient(135deg,#1a1a16,#2a2a1e);border:1px solid rgba(200,146,42,0.4);',
    'border-radius:12px;padding:12px 18px;display:flex;align-items:center;gap:10px;',
    'box-shadow:0 8px 32px rgba(0,0,0,0.6);cursor:pointer;transition:all .25s;',
    'animation:mv-slide-in .5s ease both;}',
    '.mv-opener:hover{transform:translateY(-2px);box-shadow:0 12px 40px rgba(0,0,0,0.7);}',
    '.mv-opener-text{font-size:.78rem;color:#eae5d8;font-weight:500;}',
    '.mv-opener-sub{font-size:.65rem;color:#9e9a8f;margin-top:1px;}',
    '@keyframes mv-slide-in{from{transform:translateX(120%);opacity:0}to{transform:translateX(0);opacity:1}}',
    '.mv-opener.dismissed{animation:mv-slide-out .3s ease both;}',
    '@keyframes mv-slide-out{to{transform:translateX(120%);opacity:0}}'
  ].join('');
  document.head.appendChild(style);

  // ── WIRE UP data-voice ELEMENTS ──────────────────────────
  function wireElements() {
    var els = document.querySelectorAll('[data-voice]');
    els.forEach(function(el) {
      var key = el.getAttribute('data-voice');
      if (!SCRIPTS[key]) return;
      var theme = el.getAttribute('data-voice-theme') || 'dark';
      var btn = createButton(key, theme);

      // Inject after the nearest heading or inline
      var heading = el.querySelector('h2,h3,h4') || el;
      if (heading.parentNode) {
        heading.appendChild(btn);
      }

      // Prefetch on hover for instant play
      el.addEventListener('mouseenter', function() { fetchVoice(key, function(){}); }, { once: true });
    });
  }

  // ── PAGE OPENER — fires 2s after load (history page) ────
  function maybeShowOpener() {
    if (!document.body.hasAttribute('data-voice-page')) return;
    var openerKey = document.body.getAttribute('data-voice-page');
    if (!SCRIPTS[openerKey]) return;

    // Prefetch immediately
    fetchVoice(openerKey, function(){});

    // Show floating prompt after 2s
    setTimeout(function() {
      var opener = document.createElement('div');
      opener.className = 'mv-opener';
      opener.setAttribute('role', 'button');
      opener.setAttribute('tabindex', '0');
      opener.innerHTML =
        '<span style="font-size:1.4rem">🥃</span>' +
        '<div>' +
          '<div class="mv-opener-text">Hear the story</div>' +
          '<div class="mv-opener-sub">Old moonshiner · 30 sec</div>' +
        '</div>' +
        '<div class="mv-btn" style="pointer-events:none;padding:5px 10px;">' +
          '<span class="mv-icon"><svg width="10" height="10" viewBox="0 0 14 14" fill="none"><polygon points="3,1 13,7 3,13" fill="currentColor"/></svg></span>' +
        '</div>';

      document.body.appendChild(opener);

      var played = false;
      opener.addEventListener('click', function() {
        if (played) return;
        played = true;
        opener.classList.add('dismissed');
        userHasInteracted = true;
        playVoice(openerKey, null);
        setTimeout(function() { opener.remove(); }, 400);
      });
      opener.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') opener.click();
      });

      // Auto-dismiss after 12s if ignored
      setTimeout(function() {
        if (!played) {
          opener.classList.add('dismissed');
          setTimeout(function() { opener.remove(); }, 400);
        }
      }, 12000);
    }, 2000);
  }

  // ── INIT ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      wireElements();
      maybeShowOpener();
    });
  } else {
    wireElements();
    maybeShowOpener();
  }

})();
