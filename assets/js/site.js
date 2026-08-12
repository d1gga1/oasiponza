/* ============================================================
   OASI B&B — Ponza
   Shared chrome (header/footer) + motion engine
   ============================================================ */
(function () {
  'use strict';

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- Config: navigazione ---------------- */
  var NAV = [
    { href: 'index.html',            it: 'Home',             en: 'Home' },
    { href: 'lo-stabile.html',       it: 'Lo Stabile',       en: 'The House' },
    { href: 'camere.html',           it: 'Camere',           en: 'Rooms' },
    { href: 'servizi.html',          it: 'Servizi',          en: 'Services' },
    { href: 'arcipelago.html',       it: "L'Arcipelago",     en: 'The Archipelago' },
    { href: 'come-raggiungerci.html',it: 'Come raggiungerci',en: 'Getting Here' },
    { href: 'info-utili.html',       it: 'Info Utili',       en: 'Useful Info' },
    { href: 'info-e-prezzi.html',    it: 'Info e Prezzi',    en: 'Info & Rates' },
    { href: 'contatti.html',         it: 'Contatti',         en: 'Contact' }
  ];

  var CURRENT = (function () {
    var p = location.pathname.split('/').pop();
    return (!p || p === '') ? 'index.html' : p;
  })();

  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* ============================================================
     1. CHROME — header, drawer, footer, curtain, fab
     ============================================================ */
  var MARK = '<svg class="brand-mark" viewBox="0 0 40 40" fill="none" aria-hidden="true">' +
    '<circle cx="20" cy="20" r="18.5" stroke="currentColor" stroke-width="1" opacity=".45"/>' +
    '<path d="M20 8c-4.2 4.4-6.3 8.2-6.3 11.6 0 3.9 2.8 6.9 6.3 6.9s6.3-3 6.3-6.9C26.3 16.2 24.2 12.4 20 8z" stroke="currentColor" stroke-width="1.1" stroke-linejoin="round"/>' +
    '<path d="M11 30.5c2.4-1.6 4.2-1.6 6 0 1.8 1.6 3.2 1.6 5 0 1.8-1.6 3.6-1.6 6 0" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/>' +
    '<path d="M20 26.5V32" stroke="currentColor" stroke-width="1.1" stroke-linecap="round"/></svg>';

  function buildHeader() {
    var links = NAV.map(function (n) {
      var cur = n.href === CURRENT ? ' aria-current="page"' : '';
      return '<a href="' + n.href + '"' + cur + '><span data-lang="it">' + n.it + '</span><span data-lang="en">' + n.en + '</span></a>';
    }).join('');

    var drawerLinks = NAV.map(function (n, i) {
      var cur = n.href === CURRENT ? ' aria-current="page"' : '';
      return '<a href="' + n.href + '" style="--i:' + i + '"' + cur + '><span data-lang="it">' + n.it + '</span><span data-lang="en">' + n.en + '</span></a>';
    }).join('');

    var lang = '<div class="lang" role="group" aria-label="Lingua / Language">' +
      '<button type="button" data-setlang="it">IT</button><s>/</s><button type="button" data-setlang="en">EN</button></div>';

    return '' +
      '<header class="hdr" id="hdr"><div class="hdr-in">' +
        '<a class="brand" href="index.html" aria-label="Oasi B&amp;B Ponza — Home">' + MARK +
          '<span class="brand-txt"><b>OASI</b><i>B&amp;B · Ponza</i></span></a>' +
        '<nav class="nav" aria-label="Principale">' + links + '</nav>' +
        '<div class="hdr-act">' + lang +
          '<button class="burger" id="burger" aria-label="Menu" aria-expanded="false"><i></i><i></i></button>' +
        '</div>' +
      '</div></header>' +
      '<div class="drawer" id="drawer">' +
        '<nav aria-label="Menu mobile">' + drawerLinks + '</nav>' +
        '<div class="drawer-foot">' +
          '<a href="tel:+390771808787">+39 0771 80 787</a>' +
          '<a href="tel:+393387603427">+39 338 76 03 427</a>' +
          '<a href="mailto:silviairis@libero.it">silviairis@libero.it</a>' +
          '<span style="display:block;margin-top:.8rem;opacity:.6">Via Pezza · Santa Maria · 04027 Ponza (LT)</span>' +
        '</div>' +
      '</div>';
  }

  function buildFooter() {
    var col2 = NAV.slice(0, 5).map(function (n) {
      return '<li><a href="' + n.href + '"><span data-lang="it">' + n.it + '</span><span data-lang="en">' + n.en + '</span></a></li>';
    }).join('');
    var col3 = NAV.slice(5).map(function (n) {
      return '<li><a href="' + n.href + '"><span data-lang="it">' + n.it + '</span><span data-lang="en">' + n.en + '</span></a></li>';
    }).join('');

    return '' +
    '<footer class="ftr"><div class="wrap">' +
      '<div class="ftr-top">' +
        '<div class="f-brand" data-reveal>' +
          '<b>OASI</b><i>Bed &amp; Breakfast · Ponza</i>' +
          '<p data-lang="it">Una tipica casa ponzese di fine ’800, immersa nel verde di Santa Maria, a pochi passi dal mare.</p>' +
          '<p data-lang="en">A typical late-19th-century Ponza house, wrapped in the greenery of Santa Maria, steps from the sea.</p>' +
          '<div class="socials">' +
            '<a href="https://www.facebook.com/bedbreakfastoasi.ponza" target="_blank" rel="noopener" aria-label="Facebook">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H8v3h2v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1z"/></svg></a>' +
            '<a href="mailto:silviairis@libero.it" aria-label="Email">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg></a>' +
            '<a href="tel:+393387603427" aria-label="Telefono">' +
              '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z"/></svg></a>' +
          '</div>' +
        '</div>' +
        '<div data-reveal><h4><span data-lang="it">Naviga</span><span data-lang="en">Explore</span></h4><ul>' + col2 + '</ul></div>' +
        '<div data-reveal><h4><span data-lang="it">Informazioni</span><span data-lang="en">Information</span></h4><ul>' + col3 + '</ul></div>' +
        '<div data-reveal>' +
          '<h4><span data-lang="it">Dove siamo</span><span data-lang="en">Find us</span></h4>' +
          '<ul>' +
            '<li>OASI B&amp;B</li><li>Via Pezza snc</li>' +
            '<li><span data-lang="it">Località Santa Maria</span><span data-lang="en">Santa Maria</span></li>' +
            '<li>04027 Ponza (LT) — Italy</li>' +
          '</ul>' +
          '<h4 style="margin-top:2rem"><span data-lang="it">Contatti</span><span data-lang="en">Contact</span></h4>' +
          '<ul>' +
            '<li><a href="tel:+390771808787">+39 0771 80 787</a></li>' +
            '<li><a href="tel:+393387603427">+39 338 76 03 427</a></li>' +
            '<li><a href="mailto:silviairis@libero.it">silviairis@libero.it</a></li>' +
          '</ul>' +
        '</div>' +
      '</div>' +
      '<div class="ftr-bot">' +
        '<span>© ' + new Date().getFullYear() + ' Oasi B&amp;B Ponza — <span data-lang="it">Tutti i diritti riservati</span><span data-lang="en">All rights reserved</span></span>' +
        '<span style="display:flex;gap:1.4rem;flex-wrap:wrap">' +
          '<a href="http://www.latinaturismo.it/" target="_blank" rel="noopener">APT Latina Turismo</a>' +
          '<a href="http://www.ponza.it/" target="_blank" rel="noopener">Ponza.it</a>' +
          '<a href="http://www.prolocodiponza.it/" target="_blank" rel="noopener">ProLoco di Ponza</a>' +
        '</span>' +
      '</div>' +
    '</div></footer>';
  }

  function mountChrome() {
    var h = document.getElementById('site-header');
    if (h) h.outerHTML = buildHeader();
    var f = document.getElementById('site-footer');
    if (f) f.outerHTML = buildFooter();

    // curtain + progress + cursor + fab
    var extras = document.createElement('div');
    extras.innerHTML =
      '<div id="curtain" aria-hidden="true"><b></b><b></b><b></b><b></b><b></b></div>' +
      '<div id="progress"></div>' +
      '<div id="cursor"></div><div id="cursor-dot"></div>' +
      '<a class="fab" id="fab" href="info-e-prezzi.html"><i></i>' +
        '<span data-lang="it">Prenota il tuo soggiorno</span><span data-lang="en">Book your stay</span></a>' +
      '<div id="lb" role="dialog" aria-modal="true" aria-label="Galleria">' +
        '<img alt="">' +
        '<button class="lb-x" aria-label="Chiudi">✕</button>' +
        '<button class="lb-p" aria-label="Precedente">‹</button>' +
        '<button class="lb-n" aria-label="Successiva">›</button>' +
        '<span class="lb-c"></span></div>';
    while (extras.firstChild) document.body.appendChild(extras.firstChild);
  }

  /* ============================================================
     2. LINGUA
     ============================================================ */
  function initLang() {
    var saved = null;
    try { saved = localStorage.getItem('oasi-lang'); } catch (e) {}
    var lang = saved || (navigator.language || 'it').slice(0, 2).toLowerCase();
    if (lang !== 'en') lang = 'it';
    setLang(lang, true);

    $$('[data-setlang]').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.getAttribute('data-setlang')); });
    });
  }

  function setLang(l, silent) {
    document.documentElement.setAttribute('lang', l);
    try { localStorage.setItem('oasi-lang', l); } catch (e) {}
    $$('[data-setlang]').forEach(function (b) {
      b.classList.toggle('on', b.getAttribute('data-setlang') === l);
    });
    if (!silent) {
      document.body.style.transition = 'opacity .28s ease';
      document.body.style.opacity = '.55';
      setTimeout(function () { document.body.style.opacity = '1'; }, 190);
    }
  }

  /* ============================================================
     3. LOADER + PAGE TRANSITIONS
     ============================================================ */
  function initLoader() {
    var l = document.getElementById('loader');
    var curtain = document.getElementById('curtain');

    function reveal() {
      if (l) l.classList.add('done');
      if (curtain) {
        curtain.classList.add('out');
        setTimeout(function () { curtain.classList.remove('out'); }, 900);
      }
      document.body.classList.add('ready');
      // trigger first-screen animations
      setTimeout(function () {
        $$('.hero [data-reveal], .phero [data-reveal]').forEach(function (el, i) {
          setTimeout(function () { el.classList.add('in'); }, i * 90);
        });
        $$('.hero .split-line, .phero .split-line').forEach(function (el, i) {
          setTimeout(function () { el.classList.add('in'); }, 120 + i * 100);
        });
      }, 120);
    }

    // Intro lunga solo alla prima visita della sessione; poi si passa veloci.
    var seen = false;
    try { seen = sessionStorage.getItem('oasi-seen') === '1'; sessionStorage.setItem('oasi-seen', '1'); } catch (e) {}
    var min = REDUCED ? 150 : (seen ? 380 : 1150);
    var t0 = Date.now();
    window.addEventListener('load', function () {
      setTimeout(reveal, Math.max(0, min - (Date.now() - t0)));
    });
    // safety net
    setTimeout(reveal, 3200);
  }

  function initTransitions() {
    if (REDUCED) return;
    var curtain = document.getElementById('curtain');
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a') : null;
      if (!a) return;
      var href = a.getAttribute('href');
      if (!href || href.charAt(0) === '#' || a.target === '_blank') return;
      if (/^(mailto:|tel:|https?:)/i.test(href)) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      document.body.classList.remove('menu-open');
      curtain.classList.remove('out');
      curtain.classList.add('in');
      setTimeout(function () { location.href = href; }, 620);
    });
    window.addEventListener('pageshow', function (ev) {
      if (ev.persisted) { curtain.classList.remove('in'); curtain.classList.add('out'); }
    });
  }

  /* ============================================================
     4. HEADER BEHAVIOUR
     ============================================================ */
  function initHeader() {
    var hdr = document.getElementById('hdr');
    var burger = document.getElementById('burger');
    var fab = document.getElementById('fab');
    var last = 0;

    burger.addEventListener('click', function () {
      var open = document.body.classList.toggle('menu-open');
      document.body.classList.toggle('is-locked', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.body.classList.remove('menu-open', 'is-locked');
        burger.setAttribute('aria-expanded', 'false');
        closeLb();
      }
    });

    function onScroll() {
      var y = window.pageYOffset;
      hdr.classList.toggle('stuck', y > 60);
      hdr.classList.toggle('hide', y > 420 && y > last && !document.body.classList.contains('menu-open'));
      if (fab) fab.classList.toggle('on', y > 640);
      last = y;
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ============================================================
     5. SCROLL PROGRESS + PARALLAX (rAF)
     ============================================================ */
  function initScrollFx() {
    var bar = document.getElementById('progress');
    var px = $$('[data-parallax]');
    var ticking = false;

    function frame() {
      var y = window.pageYOffset;
      var h = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = 'scaleX(' + (h > 0 ? Math.min(1, y / h) : 0) + ')';

      if (!REDUCED) {
        var vh = window.innerHeight;
        for (var i = 0; i < px.length; i++) {
          var el = px[i];
          var r = el.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          var speed = parseFloat(el.getAttribute('data-parallax')) || 0.14;
          var mid = r.top + r.height / 2 - vh / 2;
          el.style.transform = 'translate3d(0,' + (-mid * speed).toFixed(2) + 'px,0)';
        }
      }
      ticking = false;
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    window.addEventListener('scroll', req, { passive: true });
    window.addEventListener('resize', req);
    req();
  }

  /* ============================================================
     6. REVEAL OBSERVER
     ============================================================ */
  function initReveal() {
    var sel = '[data-reveal], .clipwrap, .stagger, .gal figure, .split-line, .step, .steps';
    var items = $$(sel).filter(function (el) {
      return !el.closest('.hero') && !el.closest('.phero');
    });

    if (!('IntersectionObserver' in window) || REDUCED) {
      items.forEach(function (el) { el.classList.add('in'); });
      $$('.steps').forEach(function (s) { s.style.setProperty('--fill', '100%'); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target;
        var d = parseInt(el.getAttribute('data-reveal-delay') || '0', 10);
        setTimeout(function () {
          el.classList.add('in');
          if (el.classList.contains('steps')) el.style.setProperty('--fill', '100%');
        }, d);
        io.unobserve(el);
      });
    }, { rootMargin: '0px 0px -9% 0px', threshold: 0.08 });

    items.forEach(function (el) { io.observe(el); });

    // gallery figures get an index-based stagger
    $$('.gal').forEach(function (g) {
      $$('figure', g).forEach(function (f, i) {
        f.style.transitionDelay = (i % 6) * 0.07 + 's';
      });
    });

    // counters
    var counters = $$('[data-count]');
    if (counters.length) {
      var co = new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (!en.isIntersecting) return;
          countUp(en.target);
          co.unobserve(en.target);
        });
      }, { threshold: .4 });
      counters.forEach(function (c) { co.observe(c); });
    }
  }

  function countUp(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1500, t0 = performance.now();
    function step(now) {
      var p = Math.min(1, (now - t0) / dur);
      var e = 1 - Math.pow(1 - p, 3);
      var v = target * e;
      el.textContent = (target % 1 ? v.toFixed(1) : Math.round(v)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  /* ============================================================
     7. CURSOR + MAGNETIC
     ============================================================ */
  function initCursor() {
    if (REDUCED || window.matchMedia('(hover:none)').matches || window.innerWidth < 900) return;
    var c = document.getElementById('cursor'), d = document.getElementById('cursor-dot');
    if (!c) return;
    var mx = innerWidth / 2, my = innerHeight / 2, cx = mx, cy = my;

    document.addEventListener('mousemove', function (e) {
      mx = e.clientX; my = e.clientY;
      d.style.transform = 'translate3d(' + mx + 'px,' + my + 'px,0)';
    });
    (function loop() {
      cx += (mx - cx) * 0.16; cy += (my - cy) * 0.16;
      c.style.transform = 'translate3d(' + cx.toFixed(2) + 'px,' + cy.toFixed(2) + 'px,0)';
      requestAnimationFrame(loop);
    })();

    document.addEventListener('mouseover', function (e) {
      var t = e.target.closest ? e.target.closest('a,button,.gal figure,.card,input,textarea,.acc-head') : null;
      c.classList.toggle('hot', !!t);
    });

    // magnetic buttons
    $$('.btn, .socials a, .hero-dots button').forEach(function (el) {
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var x = e.clientX - r.left - r.width / 2;
        var y = e.clientY - r.top - r.height / 2;
        el.style.transform = 'translate(' + x * 0.22 + 'px,' + y * 0.3 + 'px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ============================================================
     8. HERO SLIDESHOW
     ============================================================ */
  function initHero() {
    var bg = $('.hero-bg');
    if (!bg) return;
    var slides = $$('.slide', bg);
    var dots = $$('.hero-dots button');
    if (!slides.length) return;
    var i = 0, timer;

    function go(n) {
      slides[i].classList.remove('on');
      if (dots[i]) dots[i].classList.remove('on');
      i = (n + slides.length) % slides.length;
      var s = slides[i];
      s.style.animation = 'none';
      // force reflow so ken-burns restarts
      void s.offsetWidth;
      s.style.animation = '';
      s.classList.add('on');
      if (dots[i]) dots[i].classList.add('on');
    }
    function play() { clearInterval(timer); timer = setInterval(function () { go(i + 1); }, 6200); }

    slides[0].classList.add('on');
    if (dots[0]) dots[0].classList.add('on');
    dots.forEach(function (b, n) { b.addEventListener('click', function () { go(n); play(); }); });
    if (!REDUCED) play();
  }

  /* ============================================================
     9. LIGHTBOX
     ============================================================ */
  var lbItems = [], lbIdx = 0;
  function initLightbox() {
    var lb = document.getElementById('lb');
    if (!lb) return;
    var img = $('img', lb), cap = $('.lb-c', lb);

    $$('.gal figure').forEach(function (f) {
      lbItems.push(f);
      f.addEventListener('click', function () { openLb(lbItems.indexOf(f)); });
    });

    function show() {
      var f = lbItems[lbIdx];
      var src = f.getAttribute('data-full') || $('img', f).getAttribute('src');
      img.src = src;
      img.alt = $('img', f).alt || '';
      cap.textContent = (lbIdx + 1) + ' / ' + lbItems.length;
    }
    window.openLb = function (n) {
      lbIdx = n; show();
      lb.classList.add('on');
      document.body.classList.add('is-locked');
    };
    window.closeLb = function () { lb.classList.remove('on'); document.body.classList.remove('is-locked'); };
    $('.lb-x', lb).addEventListener('click', closeLb);
    $('.lb-n', lb).addEventListener('click', function (e) { e.stopPropagation(); lbIdx = (lbIdx + 1) % lbItems.length; show(); });
    $('.lb-p', lb).addEventListener('click', function (e) { e.stopPropagation(); lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length; show(); });
    lb.addEventListener('click', function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('on')) return;
      if (e.key === 'ArrowRight') { lbIdx = (lbIdx + 1) % lbItems.length; show(); }
      if (e.key === 'ArrowLeft') { lbIdx = (lbIdx - 1 + lbItems.length) % lbItems.length; show(); }
    });
  }
  function closeLb() { if (window.closeLb) window.closeLb(); }

  /* ============================================================
     10. ACCORDION
     ============================================================ */
  function initAcc() {
    $$('.acc-head').forEach(function (h) {
      h.addEventListener('click', function () {
        var item = h.closest('.acc-item');
        var body = $('.acc-body', item);
        var open = item.classList.toggle('open');
        body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
        h.setAttribute('aria-expanded', open ? 'true' : 'false');
      });
      h.setAttribute('aria-expanded', 'false');
    });
    window.addEventListener('resize', function () {
      $$('.acc-item.open .acc-body').forEach(function (b) { b.style.maxHeight = b.scrollHeight + 'px'; });
    });
  }

  /* ============================================================
     11. FORM
     ============================================================ */
  function initForm() {
    var f = $('#booking-form');
    if (!f) return;
    f.addEventListener('submit', function (e) {
      e.preventDefault();
      var d = new FormData(f);
      var lang = document.documentElement.getAttribute('lang');
      var body = [
        (lang === 'en' ? 'Name' : 'Nome') + ': ' + (d.get('nome') || ''),
        'Email: ' + (d.get('email') || ''),
        (lang === 'en' ? 'Phone' : 'Telefono') + ': ' + (d.get('tel') || ''),
        'Check-in: ' + (d.get('checkin') || ''),
        'Check-out: ' + (d.get('checkout') || ''),
        (lang === 'en' ? 'Guests' : 'Ospiti') + ': ' + (d.get('ospiti') || ''),
        '', (lang === 'en' ? 'Message' : 'Richiesta') + ':', (d.get('messaggio') || '')
      ].join('\n');
      var subject = encodeURIComponent((d.get('oggetto') || 'Richiesta prenotazione — Oasi B&B Ponza'));
      window.location.href = 'mailto:silviairis@libero.it?subject=' + subject + '&body=' + encodeURIComponent(body);
      var ok = $('#form-ok');
      if (ok) { ok.classList.add('on'); ok.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }

  /* ============================================================
     12. VIDEO — play solo quando visibile, audio on/off
     ============================================================ */
  function initVideo() {
    var vids = $$('video[data-auto]');
    if (!vids.length) return;

    vids.forEach(function (v) {
      v.muted = true; v.loop = true; v.playsInline = true;
      v.setAttribute('muted', ''); v.setAttribute('playsinline', '');
    });

    if (!('IntersectionObserver' in window)) {
      vids.forEach(function (v) { v.play().catch(function () {}); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          var v = en.target;
          if (en.isIntersecting) {
            if (v.preload === 'none') v.preload = 'auto';
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else if (!v.paused) {
            v.pause();
          }
        });
      }, { threshold: 0.25 });
      vids.forEach(function (v) { io.observe(v); });
    }

    // pulsante audio della banda video
    $$('[data-sound]').forEach(function (btn) {
      var v = document.getElementById(btn.getAttribute('data-sound'));
      if (!v) return;
      btn.addEventListener('click', function () {
        v.muted = !v.muted;
        btn.classList.toggle('on', !v.muted);
        $$('[data-lang]', btn).forEach(function (s) {
          s.textContent = v.muted ? s.getAttribute('data-off') : s.getAttribute('data-on');
        });
        if (v.paused) v.play().catch(function () {});
      });
    });
  }

  /* ============================================================
     13. TILT
     ============================================================ */
  function initTilt() {
    if (REDUCED || window.matchMedia('(hover:none)').matches) return;
    $$('[data-tilt]').forEach(function (el) {
      el.style.transformStyle = 'preserve-3d';
      el.addEventListener('mousemove', function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - .5;
        var py = (e.clientY - r.top) / r.height - .5;
        el.style.transform = 'perspective(900px) rotateY(' + (px * 7).toFixed(2) + 'deg) rotateX(' + (-py * 7).toFixed(2) + 'deg) translateY(-6px)';
      });
      el.addEventListener('mouseleave', function () { el.style.transform = ''; });
    });
  }

  /* ============================================================
     BOOT
     ============================================================ */
  function boot() {
    mountChrome();
    initLang();
    initHeader();
    initTransitions();
    initScrollFx();
    initReveal();
    initCursor();
    initHero();
    initLightbox();
    initAcc();
    initForm();
    initVideo();
    initTilt();
    initLoader();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
})();
