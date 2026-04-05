/* ============================================================
   Montucky Moonshine — Shopify Friends Theme Audio
   Fetches Daryl's cover track from Shopify CDN files API.
   Plays as ambient background on venue/events pages with
   full user-controlled player UI.
   ============================================================ */

(function MontuckyAudio() {
  'use strict';

  // ── CONFIG ───────────────────────────────────────────────
  // Shopify CDN base — Daryl's store files
  // The Friends cover track should be uploaded to Shopify Files
  // and the URL updated here. Fallback to silence if not found.
  var TRACK = {
    url: 'https://montuckymoonshine.com/cdn/shop/files/friends_cover.mp3',
    title: "Friends (Montucky Cover)",
    artist: "Daryl's Cover",
    art: 'https://montuckymoonshine.com/cdn/shop/files/hat1-6_180x.png?v=1614732107'
  };

  var PAGES_ENABLED = ['venue', 'events', 'lifestyle'];

  // ── CHECK if current page should have audio ──────────────
  function isEnabledPage() {
    var path = window.location.pathname;
    return PAGES_ENABLED.some(function(p) { return path.indexOf(p) !== -1; }) ||
           document.body.hasAttribute('data-ambient-audio');
  }

  if (!isEnabledPage()) return;

  // ── PLAYER STATE ─────────────────────────────────────────
  var audio = null;
  var playerEl = null;
  var isPlaying = false;
  var dismissed = false;

  // ── CREATE AUDIO ELEMENT ──────────────────────────────────
  function initAudio() {
    audio = new Audio(TRACK.url);
    audio.loop = true;
    audio.volume = 0;
    audio.preload = 'none'; // Don't auto-download

    audio.addEventListener('error', function() {
      console.warn('[MontuckyAudio] Track not found at:', TRACK.url);
      // Gracefully hide player if track missing
      if (playerEl) playerEl.style.display = 'none';
    });
  }

  // ── FADE HELPERS ─────────────────────────────────────────
  function fadeTo(targetVol, duration, cb) {
    if (!audio) return;
    var start = audio.volume;
    var steps = 20;
    var stepTime = duration / steps;
    var step = 0;
    var interval = setInterval(function() {
      step++;
      audio.volume = Math.max(0, Math.min(1, start + (targetVol - start) * (step / steps)));
      if (step >= steps) {
        clearInterval(interval);
        audio.volume = targetVol;
        if (cb) cb();
      }
    }, stepTime);
  }

  function play() {
    if (!audio) return;
    audio.play().then(function() {
      isPlaying = true;
      fadeTo(0.28, 1200);
      updatePlayerUI();
    }).catch(function(e) {
      console.warn('[MontuckyAudio] Autoplay blocked:', e);
    });
  }

  function pause() {
    fadeTo(0, 600, function() {
      audio.pause();
      isPlaying = false;
      updatePlayerUI();
    });
  }

  function toggle() {
    if (isPlaying) pause();
    else play();
  }

  // ── PLAYER UI ────────────────────────────────────────────
  function buildPlayer() {
    var wrap = document.createElement('div');
    wrap.id = 'ma-player';
    wrap.setAttribute('role', 'region');
    wrap.setAttribute('aria-label', 'Background music player');
    wrap.innerHTML = [
      '<div class="ma-art">',
        '<img src="' + TRACK.art + '" alt="Montucky" width="36" height="36">',
      '</div>',
      '<div class="ma-info">',
        '<div class="ma-title">' + TRACK.title + '</div>',
        '<div class="ma-artist">' + TRACK.artist + '</div>',
      '</div>',
      '<button id="ma-play" aria-label="Play music" class="ma-ctrl">',
        '<svg id="ma-play-icon" width="16" height="16" viewBox="0 0 16 16"><polygon points="4,2 14,8 4,14" fill="currentColor"/></svg>',
        '<svg id="ma-pause-icon" width="16" height="16" viewBox="0 0 16 16" style="display:none"><rect x="3" y="2" width="4" height="12" fill="currentColor"/><rect x="9" y="2" width="4" height="12" fill="currentColor"/></svg>',
      '</button>',
      '<input id="ma-vol" type="range" min="0" max="100" value="28" aria-label="Volume" class="ma-vol">',
      '<button id="ma-dismiss" aria-label="Dismiss player" class="ma-dismiss">×</button>'
    ].join('');

    // Styles
    var style = document.createElement('style');
    style.textContent = [
      '#ma-player{position:fixed;bottom:80px;left:24px;z-index:8900;',
      'display:flex;align-items:center;gap:10px;',
      'background:rgba(18,18,16,0.95);backdrop-filter:blur(12px);',
      'border:1px solid rgba(200,146,42,0.3);border-radius:40px;',
      'padding:8px 14px 8px 10px;box-shadow:0 8px 32px rgba(0,0,0,0.6);',
      'animation:ma-in .4s ease both;}',
      '@keyframes ma-in{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}',
      '#ma-player.ma-out{animation:ma-out .3s ease both;}',
      '@keyframes ma-out{to{transform:translateY(20px);opacity:0}}',
      '.ma-art img{border-radius:50%;width:36px;height:36px;object-fit:cover;}',
      '.ma-info{min-width:0;}',
      '.ma-title{font-size:.75rem;font-weight:600;color:#eae5d8;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:140px;}',
      '.ma-artist{font-size:.62rem;color:#9e9a8f;margin-top:1px;}',
      '.ma-ctrl{background:rgba(200,146,42,0.15);border:1px solid rgba(200,146,42,0.4);',
      'border-radius:50%;width:32px;height:32px;display:flex;align-items:center;justify-content:center;',
      'cursor:pointer;color:#c8922a;flex-shrink:0;transition:all .2s;}',
      '.ma-ctrl:hover{background:rgba(200,146,42,0.3);}',
      '.ma-vol{width:70px;height:3px;accent-color:#c8922a;cursor:pointer;}',
      '.ma-dismiss{background:none;border:none;color:#9e9a8f;cursor:pointer;font-size:1.1rem;',
      'padding:0 2px;line-height:1;transition:color .15s;flex-shrink:0;}',
      '.ma-dismiss:hover{color:#eae5d8;}'
    ].join('');
    document.head.appendChild(style);

    document.body.appendChild(wrap);
    playerEl = wrap;

    // Events
    document.getElementById('ma-play').addEventListener('click', function() {
      toggle();
    });

    document.getElementById('ma-vol').addEventListener('input', function() {
      if (audio) audio.volume = this.value / 100;
    });

    document.getElementById('ma-dismiss').addEventListener('click', function() {
      dismissed = true;
      if (isPlaying) pause();
      wrap.classList.add('ma-out');
      setTimeout(function() { wrap.remove(); }, 350);
    });
  }

  function updatePlayerUI() {
    if (!playerEl) return;
    var playIcon = document.getElementById('ma-play-icon');
    var pauseIcon = document.getElementById('ma-pause-icon');
    var btn = document.getElementById('ma-play');
    if (!playIcon || !pauseIcon) return;
    if (isPlaying) {
      playIcon.style.display = 'none';
      pauseIcon.style.display = '';
      btn.setAttribute('aria-label', 'Pause music');
    } else {
      playIcon.style.display = '';
      pauseIcon.style.display = 'none';
      btn.setAttribute('aria-label', 'Play music');
    }
  }

  // ── INIT on first user interaction ───────────────────────
  function init() {
    initAudio();
    buildPlayer();
  }

  function onFirstInteraction() {
    document.removeEventListener('click', onFirstInteraction);
    document.removeEventListener('scroll', onFirstInteraction);
    document.removeEventListener('touchstart', onFirstInteraction);
    if (!dismissed) play();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Show player immediately, play on first interaction
  document.addEventListener('click', onFirstInteraction, { once: true });
  document.addEventListener('scroll', onFirstInteraction, { once: true });
  document.addEventListener('touchstart', onFirstInteraction, { once: true });

})();
