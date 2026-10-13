/* Sukreen Hana Herman · site behaviour. Reads window.CV from data.js. */
(function () {
  'use strict';
  var CV = window.CV;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Research areas (keyword groups over titles) ---------- */
  var AREAS = [
    { id: 'sensors', name: 'Electrochemical & pH sensors', hue: '#0b7480',
      text: 'EGFET and ISFET devices that sense pH, nitrate and heavy-metal ions, including soil sensing and all-solid integrated electrodes.',
      re: /egfet|isfet|extended[- ]gate|\bph\b|nitrate|electrochemical|heavy metal|ion sens|glucose|immunosens/i,
      icon: '<path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4a2 2 0 0 0 1.8-3l-5-9V3"/><path d="M8 3h8M7 15h10"/>' },
    { id: 'memristor', name: 'Memristive & memory devices', hue: '#6550c9',
      text: 'Titania and ZnO memristors, resistive switching, phase-change memory and early neuromorphic circuit work.',
      re: /memris|resistive switching|switching behavio|phase-change memory|memory|neuromorphic/i,
      icon: '<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/>' },
    { id: 'films', name: 'Thin films & nanostructures', hue: '#b9811f',
      text: 'ZnO, TiO₂, polysilicon and YSZ films made by sputtering, sol-gel, CVD and electrospinning.',
      re: /thin film|film|nanorod|nanostructure|nanoparticle|nanotetrapod|nanoflower|nanocomposite|growth|sputter|sol-?gel|sol–gel|spin.?coat|nanofib|electrospin|cvd|deposit/i,
      icon: '<path d="M3 17l9 4 9-4M3 12l9 4 9-4M3 7l9 4 9-4-9-4z"/>' },
    { id: 'optics', name: 'Optical fibre & photonics', hue: '#2f6fd6',
      text: 'Fibre-optic oxygen and pH probes, surface plasmon resonance, OLEDs and RF/microwave components.',
      re: /optic|fluoresc|plasmon|light emitting|luminesc|bandpass|resonator|antenna|mmic|microwave/i,
      icon: '<path d="M2 12c3-6 7-6 10 0s7 6 10 0"/><circle cx="12" cy="12" r="1.5"/>' },
    { id: 'energy', name: 'Energy & smart materials', hue: '#2fa36b',
      text: 'Organic and hybrid solar cells, phase-change thermal storage, thermochromic smart windows and energy harvesting.',
      re: /solar|phase change material|\bpcm\b|thermochromic|smart window|energy|vanadium|thermal energy/i,
      icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M5 19l1.5-1.5M17.5 6.5 19 5"/>' },
    { id: 'stem', name: 'STEM education & inclusion', hue: '#d9434b',
      text: 'Robotics for special-needs learners, assistive devices for autism, women in STEM and community digital programmes.',
      re: /stem\b|steam|education|learning|autism|disabilit|robotic|tutorial|entrepreneur|community|manual|journey|innovator|supervisor matching|libatsama|fertilizer|what is a|introduction to/i,
      icon: '<path d="M22 9 12 4 2 9l10 5 10-5z"/><path d="M6 11v5c3 2 9 2 12 0v-5"/>' }
  ];
  CV.pubs.forEach(function (p, i) {
    p.id = i;
    p.areas = AREAS.filter(function (a) { return a.re.test(p.title); }).map(function (a) { return a.id; });
  });
  var areaById = {};
  AREAS.forEach(function (a) { areaById[a.id] = a; a.count = CV.pubs.filter(function (p) { return p.areas.indexOf(a.id) > -1; }).length; });

  var areasEl = $('#areas');
  areasEl.innerHTML = AREAS.map(function (a) {
    return '<button type="button" class="area reveal" style="--hue:' + a.hue + '" data-area="' + a.id + '">' +
      '<span class="area__icon"><svg viewBox="0 0 24 24" aria-hidden="true">' + a.icon + '</svg></span>' +
      '<h3>' + a.name + '</h3><p>' + a.text + '</p>' +
      '<span class="area__foot"><span><b>' + a.count + '</b> publications</span><span class="area__go">View →</span></span></button>';
  }).join('');
  areasEl.addEventListener('click', function (e) {
    var b = e.target.closest('[data-area]'); if (!b) return;
    state.area = b.dataset.area; state.limit = PAGE; renderAreaChips(); renderPubs();
    $('#publications').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Chart: publications per year ---------- */
  var kind = function (t) { return t === 'Journal' ? 'journal' : t === 'Proceeding' ? 'proc' : 'other'; };
  (function chart() {
    var years = CV.pubs.map(function (p) { return p.year; });
    var y0 = Math.min.apply(null, years), y1 = Math.max.apply(null, years);
    var rows = [];
    for (var y = y0; y <= y1; y++) rows.push({ y: y, journal: 0, proc: 0, other: 0 });
    CV.pubs.forEach(function (p) { rows[p.year - y0][kind(p.type)]++; });
    rows.forEach(function (r) { r.total = r.journal + r.proc + r.other; });
    var max = Math.max.apply(null, rows.map(function (r) { return r.total; }));
    var top = Math.ceil(max / 5) * 5;
    var W = 960, H = 280, L = 32, B = 26, T = 8, plotW = W - L - 8, plotH = H - B - T;
    var bw = plotW / rows.length, gap = Math.max(2, bw * .22);
    var s = '<svg viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="Publications per year from ' + y0 + ' to ' + y1 + '"><g class="grid">';
    for (var g = 0; g <= top; g += 5) {
      var gy = T + plotH - g / top * plotH;
      s += '<line x1="' + L + '" x2="' + (W - 8) + '" y1="' + gy + '" y2="' + gy + '"/><text x="' + (L - 8) + '" y="' + (gy + 4) + '" text-anchor="end">' + g + '</text>';
    }
    s += '</g>';
    var order = [['journal', 'var(--c-journal)'], ['proc', 'var(--c-proc)'], ['other', 'var(--c-other)']];
    rows.forEach(function (r, i) {
      var x = L + i * bw + gap / 2, w = bw - gap, base = T + plotH;
      s += '<g class="bar" data-i="' + i + '" tabindex="0" aria-label="' + r.y + ': ' + r.total + ' publications">';
      s += '<rect class="hit" x="' + (L + i * bw) + '" y="' + T + '" width="' + bw + '" height="' + plotH + '"/>';
      order.forEach(function (o) {
        var h = r[o[0]] / top * plotH; if (!h) return;
        base -= h;
        s += '<rect x="' + x + '" y="' + base + '" width="' + w + '" height="' + Math.max(h - 1, 1) + '" rx="2" style="fill:' + o[1] + '"/>';
      });
      s += '</g>';
      if (r.y % 5 === 0 || i === 0 || i === rows.length - 1) s += '<text x="' + (x + w / 2) + '" y="' + (H - 6) + '" text-anchor="middle">' + r.y + '</text>';
    });
    s += '</svg>';
    var plot = $('#chartPlot'), tip = $('#chartTip'), box = $('#chart');
    plot.innerHTML = s;
    $('#chartLegend').innerHTML = '<span><i style="background:var(--c-journal)"></i>Journal</span><span><i style="background:var(--c-proc)"></i>Proceeding</span><span><i style="background:var(--c-other)"></i>Other (exhibition, book, media…)</span>';
    var show = function (g) {
      var r = rows[+g.dataset.i];
      plot.querySelectorAll('.bar').forEach(function (b) { b.classList.toggle('is-hover', b === g); });
      plot.classList.add('has-hover');
      tip.innerHTML = '<b>' + r.y + '</b> · ' + r.total + ' total<br>' + r.journal + ' journal · ' + r.proc + ' proceeding · ' + r.other + ' other';
      var gr = g.getBoundingClientRect(), br = box.getBoundingClientRect();
      var cx = Math.min(Math.max(gr.left + gr.width / 2 - br.left, 110), br.width - 110);
      var stack = g.querySelectorAll('rect:not(.hit)');
      var topY = stack.length ? stack[stack.length - 1].getBoundingClientRect().top : gr.bottom;
      tip.style.left = cx + 'px'; tip.style.top = (topY - br.top - 6) + 'px';
      tip.classList.add('is-on');
    };
    var hide = function () { plot.classList.remove('has-hover'); tip.classList.remove('is-on'); };
    plot.addEventListener('mouseover', function (e) { var g = e.target.closest('.bar'); if (g) show(g); });
    plot.addEventListener('mouseleave', hide);
    plot.addEventListener('focusin', function (e) { var g = e.target.closest('.bar'); if (g) show(g); });
    plot.addEventListener('focusout', hide);
    plot.addEventListener('click', function (e) { var g = e.target.closest('.bar'); if (g) show(g); });

    var peak = rows.reduce(function (a, b) { return b.total > a.total ? b : a; });
    var firstPI = CV.grants.filter(function (g) { return g.role === 'Principal Investigator'; }).sort(function (a, b) { return a.year - b.year; })[0];
    var firstCon = CV.cons.slice().sort(function (a, b) { return a.year - b.year; })[0];
    var ms = [
      [y0, 'First publication: PZT/perovskite thin films'],
      [2009, 'PhD in Materials Science'],
      [firstPI.year, 'First grant as Principal Investigator'],
      [peak.y, 'Busiest year: ' + peak.total + ' publications'],
      [firstCon.year, 'First industry consultation (' + firstCon.client.replace(/ Corporation$/, '') + ')'],
      [y1, 'Latest work: EGFET pH sensing on flexible substrates']
    ].sort(function (a, b) { return a[0] - b[0]; });
    $('#milestones').innerHTML = ms.map(function (m) { return '<li><b>' + m[0] + '</b><span>' + esc(m[1]) + '</span></li>'; }).join('');
  })();

  /* ---------- Publications explorer ---------- */
  var PAGE = 12;
  var state = { q: '', type: 'all', area: 'all', sort: 'new', limit: PAGE };
  var journals = CV.pubs.filter(function (p) { return p.type === 'Journal'; }).length;
  var procs = CV.pubs.filter(function (p) { return p.type === 'Proceeding'; }).length;
  $('#pubTotals').textContent = CV.pubs.length + ' works: ' + journals + ' journal articles, ' + procs + ' conference papers and ' + (CV.pubs.length - journals - procs) + ' others. 123 of them are indexed.';

  function renderAreaChips() {
    var all = [{ id: 'all', name: 'All areas', hue: 'var(--ink)' }].concat(AREAS);
    $('#pubAreas').innerHTML = all.map(function (a) {
      return '<button type="button" style="--hue:' + a.hue + '" data-v="' + a.id + '" aria-pressed="' + (state.area === a.id) + '">' + (a.id === 'all' ? '' : '<i></i>') + a.name + '</button>';
    }).join('');
  }
  function highlight(t, q) {
    if (!q) return esc(t);
    var re = new RegExp('(' + q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'ig');
    return esc(t).replace(re, '<mark>$1</mark>');
  }
  function renderPubs() {
    var q = state.q.trim().toLowerCase();
    var list = CV.pubs.filter(function (p) {
      if (state.type === 'other' ? (p.type === 'Journal' || p.type === 'Proceeding') : (state.type !== 'all' && p.type !== state.type)) return false;
      if (state.area !== 'all' && p.areas.indexOf(state.area) < 0) return false;
      return !q || p.title.toLowerCase().indexOf(q) > -1 || String(p.year) === q;
    }).sort(function (a, b) { return state.sort === 'new' ? b.year - a.year || a.id - b.id : a.year - b.year || b.id - a.id; });
    var shown = list.slice(0, state.limit);
    $('#pubCount').textContent = list.length ? 'Showing ' + shown.length + ' of ' + list.length + (state.area !== 'all' ? ' in ' + areaById[state.area].name : '') : '';
    $('#pubList').innerHTML = shown.length ? shown.map(function (p) {
      var k = kind(p.type);
      return '<li class="pub"><span class="pub__yr">' + p.year + '</span><div><p class="pub__title">' + highlight(p.title, state.q.trim()) + '</p>' +
        '<div class="pub__meta"><span class="tag tag--' + k + '">' + esc(p.type) + '</span>' + (p.group === 'Indexed' ? '<span class="tag tag--idx">Indexed</span>' : '') + '</div></div>' +
        '<a class="pub__link" href="https://scholar.google.com/scholar?q=' + encodeURIComponent('"' + p.title + '"') + '" target="_blank" rel="noopener">Find on Scholar ↗</a></li>';
    }).join('') : '<li class="empty">No publications match. Try another keyword or clear the filters.</li>';
    $('#pubMore').hidden = list.length <= state.limit;
  }
  var t;
  $('#pubSearch').addEventListener('input', function (e) { clearTimeout(t); t = setTimeout(function () { state.q = e.target.value; state.limit = PAGE; renderPubs(); }, 120); });
  $('#pubSort').addEventListener('change', function (e) { state.sort = e.target.value; renderPubs(); });
  $('#pubMore').addEventListener('click', function () { state.limit += PAGE * 2; renderPubs(); });
  $('#pubAreas').addEventListener('click', function (e) { var b = e.target.closest('button'); if (!b) return; state.area = b.dataset.v; state.limit = PAGE; renderAreaChips(); renderPubs(); });
  function seg(el, cb) {
    el.addEventListener('click', function (e) {
      var b = e.target.closest('button'); if (!b) return;
      el.querySelectorAll('button').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
      cb(b.dataset.v);
    });
  }
  seg($('#pubType'), function (v) { state.type = v; state.limit = PAGE; renderPubs(); });
  renderAreaChips(); renderPubs();

  /* ---------- Grants ---------- */
  var gs = { role: 'all', scope: 'all', all: false };
  var pi = CV.grants.filter(function (g) { return g.role === 'Principal Investigator'; }).length;
  var fr = CV.grants.filter(function (g) { return /Fundamental Research/.test(g.scheme); }).length;
  $('#grantSummary').textContent = 'She led ' + pi + ' of them as Principal Investigator. ' + fr + ' were funded through the Fundamental Research Grant Scheme (FRGS), and 4 are international. Gold dots mark the projects she led.';
  function renderGrants() {
    var list = CV.grants.filter(function (g) { return (gs.role === 'all' || g.role === gs.role) && (gs.scope === 'all' || g.scope === gs.scope); });
    var total = list.length;
    if (!gs.all) list = list.slice(0, 12);
    var by = {};
    list.forEach(function (g) { (by[g.year] = by[g.year] || []).push(g); });
    var yrs = Object.keys(by).sort(function (a, b) { return b - a; });
    $('#grantList').innerHTML = yrs.length ? yrs.map(function (y) {
      return '<div class="yr"><div class="yr__label">' + y + '</div><div class="yr__items">' + by[y].map(function (g) {
        var isPI = g.role === 'Principal Investigator';
        return '<article class="grant' + (isPI ? ' is-pi' : '') + '"><h3>' + esc(g.title) + '</h3><div class="grant__meta">' +
          '<span class="tag' + (isPI ? ' tag--pi' : '') + '">' + g.role + '</span>' +
          (g.scope === 'International' ? '<span class="tag tag--intl">International</span>' : '') +
          '<span class="tag">' + esc(g.scheme) + '</span></div></article>';
      }).join('') + '</div></div>';
    }).join('') : '<p class="empty">No grants match these filters.</p>';
    var more = $('#grantMore');
    more.hidden = total <= 12;
    more.textContent = gs.all ? 'Show fewer' : 'Show all ' + total + ' grants';
  }
  $('#grantMore').addEventListener('click', function () {
    gs.all = !gs.all; renderGrants();
    if (!gs.all) $('#grants').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  seg($('#grantRole'), function (v) { gs.role = v; renderGrants(); });
  seg($('#grantScope'), function (v) { gs.scope = v; renderGrants(); });
  renderGrants();

  /* ---------- Supervision ---------- */
  var LEVELS = ['PhD Completed', 'PhD Ongoing', 'Master Completed'];
  var cur = LEVELS[0];
  function renderSups() {
    $('#supTabs').innerHTML = LEVELS.map(function (l) {
      var n = CV.sups.filter(function (s) { return s.level === l; }).length;
      return '<button type="button" role="tab" aria-selected="' + (l === cur) + '" data-v="' + l + '">' + l + '<b>' + n + '</b></button>';
    }).join('');
    $('#supList').innerHTML = CV.sups.filter(function (s) { return s.level === cur; }).map(function (s) {
      return '<article class="sup"><h3>' + esc(s.title) + '</h3><div class="sup__who">' + (s.level.indexOf('PhD') === 0 ? 'PhD thesis' : "Master's thesis") + ' · ' + s.level.split(' ')[1] + '</div></article>';
    }).join('');
  }
  $('#supTabs').addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) { cur = b.dataset.v; renderSups(); } });
  renderSups();

  /* ---------- Consultations ---------- */
  var partnerOf = function (c) {
    if (/Celcom|CelcomDigi/i.test(c)) return 'CelcomDigi / Celcom';
    if (/Maxis/i.test(c)) return 'Maxis';
    if (/Digital Economy/i.test(c)) return 'MDEC';
    if (/Malayan Banking/i.test(c)) return 'Maybank';
    if (/SSDU/i.test(c)) return 'SSDU Innovations';
    if (/Technology Development/i.test(c)) return 'MTDC';
    if (/CREST/i.test(c)) return 'CREST';
    return c.replace(/ Sdn\.? Bhd\.?/, '');
  };
  var pc = {};
  CV.cons.forEach(function (c) { var p = partnerOf(c.client); pc[p] = (pc[p] || 0) + 1; });
  $('#partners').innerHTML = Object.keys(pc).sort(function (a, b) { return pc[b] - pc[a]; }).map(function (p) { return '<span>' + esc(p) + '<b>' + pc[p] + '</b></span>'; }).join('');
  $('#consList').innerHTML = CV.cons.slice().sort(function (a, b) { return b.year - a.year; }).map(function (c) {
    return '<article class="con reveal"><div class="con__yr"><span>' + c.year + '</span>' + (c.status === 'Appointed' ? '<span class="live">Ongoing</span>' : '<span>Completed</span>') + '</div>' +
      '<h3>' + esc(c.title) + '</h3><p>' + esc(c.client) + '</p></article>';
  }).join('');

  /* ---------- Chrome: nav, theme, reveal, counters ---------- */
  $('#year').textContent = new Date().getFullYear();
  var nav = $('.nav'), links = $('#navLinks'), menu = $('#menuBtn');
  menu.addEventListener('click', function () {
    var open = links.classList.toggle('is-open');
    menu.setAttribute('aria-expanded', open); menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });
  links.addEventListener('click', function (e) { if (e.target.tagName === 'A') { links.classList.remove('is-open'); menu.setAttribute('aria-expanded', false); } });
  addEventListener('scroll', function () { nav.classList.toggle('is-scrolled', scrollY > 8); }, { passive: true });

  $('#themeBtn').addEventListener('click', function () {
    var root = document.documentElement;
    var dark = root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
    root.dataset.theme = dark ? 'light' : 'dark';
    try { localStorage.setItem('shh-theme', root.dataset.theme); } catch (e) {}
  });

  $('#copyMail').addEventListener('click', function () {
    var b = this, done = function () { b.textContent = 'Copied ✓'; setTimeout(function () { b.textContent = 'Copy email'; }, 1800); };
    if (navigator.clipboard) navigator.clipboard.writeText('hana1617@uitm.edu.my').then(done, function () {}); else done();
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: .12 });
    document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });

    var spy = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.querySelectorAll('a').forEach(function (a) { a.classList.toggle('is-active', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });

    if (!reduceMotion) {
      var counters = document.querySelectorAll('[data-count]');
      counters.forEach(function (el) { el.textContent = '0'; });
      var cio = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return;
          var el = e.target, to = +el.dataset.count, t0 = performance.now();
          (function step(now) {
            var k = Math.min((now - t0) / 1200, 1);
            el.textContent = Math.round(to * (1 - Math.pow(1 - k, 3)));
            if (k < 1) requestAnimationFrame(step);
          })(t0);
          cio.unobserve(el);
        });
      });
      counters.forEach(function (el) { cio.observe(el); });
    }
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }
})();
