/* Web edition behaviour: theme, navigation drawer, reading progress,
   "on this page" highlighting and offline full-text search. */
(function () {
  'use strict';
  var root = document.documentElement;
  var body = document.body;

  function store(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  function currentTheme() {
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-action]');
    if (!el) {
      if (body.classList.contains('nav-open') && e.target.closest('.side-link')) body.classList.remove('nav-open');
      return;
    }
    var action = el.getAttribute('data-action');
    if (action === 'theme') {
      var next = currentTheme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      store('psd-theme', next);
    } else if (action === 'nav') {
      body.classList.toggle('nav-open');
    }
  });

  // Keep the active chapter visible in the sidebar.
  var active = document.querySelector('.side-link.active');
  if (active && active.scrollIntoView) active.scrollIntoView({ block: 'center' });

  // Reading progress.
  var bar = document.getElementById('progress');
  function onScroll() {
    if (!bar) return;
    var h = document.documentElement;
    var max = h.scrollHeight - h.clientHeight;
    bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // "On this page" highlighting.
  var links = Array.prototype.slice.call(document.querySelectorAll('.onpage a'));
  if (links.length && 'IntersectionObserver' in window) {
    var byId = {};
    links.forEach(function (a) { byId[decodeURIComponent(a.getAttribute('href').slice(1))] = a; });
    var visible = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting; });
      var ids = Object.keys(byId);
      var current = null;
      for (var i = 0; i < ids.length; i++) {
        var el = document.getElementById(ids[i]);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.35) current = ids[i];
      }
      links.forEach(function (a) { a.classList.remove('active'); });
      if (current && byId[current]) byId[current].classList.add('active');
    }, { rootMargin: '0px 0px -60% 0px' });
    Object.keys(byId).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  // Search (index is loaded lazily on first use; works from file:// too).
  var input = document.getElementById('search');
  var box = document.getElementById('search-results');
  var loading = false;
  var selected = -1;

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; });
  }
  function loadIndex(cb) {
    if (window.BOOK_SEARCH) return cb();
    if (loading) return;
    loading = true;
    var s = document.createElement('script');
    s.src = 'assets/js/search-index.js';
    s.onload = function () { loading = false; cb(); };
    s.onerror = function () { loading = false; box.innerHTML = '<div class="sr-empty">সার্চ ইনডেক্স লোড হয়নি।</div>'; };
    document.head.appendChild(s);
  }
  function snippet(text, term) {
    var lower = text.toLowerCase();
    var i = lower.indexOf(term);
    var start = Math.max(0, i - 70);
    var out = (start > 0 ? '…' : '') + text.slice(start, start + 200) + (start + 200 < text.length ? '…' : '');
    var safe = esc(out);
    if (term) {
      var re = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      safe = safe.replace(re, function (m) { return '<mark>' + m + '</mark>'; });
    }
    return safe;
  }
  function run() {
    var q = input.value.trim().toLowerCase();
    selected = -1;
    if (q.length < 2) { box.classList.remove('open'); box.innerHTML = ''; return; }
    var terms = q.split(/\s+/);
    var hits = [];
    var idx = window.BOOK_SEARCH || [];
    for (var i = 0; i < idx.length; i++) {
      var e = idx[i];
      var hay = (e.h + ' ' + e.x).toLowerCase();
      var ok = true, score = 0;
      for (var t = 0; t < terms.length; t++) {
        var p = hay.indexOf(terms[t]);
        if (p < 0) { ok = false; break; }
        if (e.h.toLowerCase().indexOf(terms[t]) >= 0) score += 10;
        score += 1;
      }
      if (ok) hits.push({ e: e, s: score });
    }
    hits.sort(function (a, b) { return b.s - a.s; });
    hits = hits.slice(0, 14);
    box.innerHTML = hits.length
      ? hits.map(function (h) {
          return '<a href="' + esc(h.e.u) + '"><div class="sr-doc">' + esc(h.e.d) + '</div><div class="sr-head">' + esc(h.e.h) +
            '</div><div class="sr-snip">' + snippet(h.e.x, terms[0]) + '</div></a>';
        }).join('')
      : '<div class="sr-empty">“' + esc(q) + '” পাওয়া যায়নি।</div>';
    box.classList.add('open');
  }
  if (input && box) {
    input.addEventListener('focus', function () { loadIndex(function () { if (input.value) run(); }); });
    input.addEventListener('input', function () { loadIndex(run); });
    input.addEventListener('keydown', function (e) {
      var items = box.querySelectorAll('a');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (!items.length) return;
        e.preventDefault();
        selected = (selected + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
        items.forEach(function (a, i) { a.classList.toggle('sel', i === selected); });
        items[selected].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter' && items.length) {
        window.location.href = items[Math.max(0, selected)].getAttribute('href');
      } else if (e.key === 'Escape') {
        box.classList.remove('open');
        input.blur();
      }
    });
    document.addEventListener('click', function (e) { if (!e.target.closest('.search')) box.classList.remove('open'); });
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== input && !/input|textarea/i.test(document.activeElement.tagName)) {
        e.preventDefault();
        input.focus();
      }
    });
  }
})();
