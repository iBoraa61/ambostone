/* header.js – shared across all BORASTONE pages
   Handles: mobile nav + scroll darkening + announcement bar + search overlay
*/

// -------------------------
// 0. Mobile Burger Menu (einheitlich wie Waschbecken/Badewannen)
// -------------------------
(() => {
  const btn = document.querySelector('.navToggle');
  const overlay = document.getElementById('navOverlay') || document.querySelector('.navOverlay');
  const closeBtn = overlay?.querySelector('.navClose') || document.querySelector('.navClose');

  if (!btn || !overlay) return;

  // Overlay an body hängen, damit position:fixed immer viewport-füllend ist
  // (Header mit backdrop-filter erzeugt sonst einen Containing Block)
  if (overlay.parentElement !== document.body) {
    document.body.appendChild(overlay);
  }

  const openNav = () => {
    overlay.hidden = false;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
  };

  const closeNav = () => {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';
    overlay.hidden = true;
  };

  btn.addEventListener('click', (e) => {
    e.preventDefault();
    overlay.classList.contains('is-open') ? closeNav() : openNav();
  });

  closeBtn?.addEventListener('click', closeNav);

  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeNav();
  });

  overlay.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeNav));

  // Accordion: Waschbecken / Stone Living
  overlay.querySelectorAll('.navMobile__toggle').forEach((toggle) => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const group = toggle.closest('.navMobile__group');
      const panel = group?.querySelector('.navMobile__sub');
      if (!group || !panel) return;

      const willOpen = !group.classList.contains('is-open');
      group.classList.toggle('is-open', willOpen);
      toggle.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
      panel.hidden = !willOpen;
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeNav();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980 && overlay.classList.contains('is-open')) closeNav();
  });
})();

// -------------------------
// 1. Scroll: dark header + hide announcement bar (+ home atelier)
// -------------------------
(() => {
  const header = document.getElementById('mainHeader');
  const bar    = document.getElementById('announceBar');
  const atelier = document.getElementById('atelier');
  if (!header) return;

  let ticking = false;

  const update = () => {
    if (window.scrollY > 60) {
      header.classList.add('is-scrolled');
      bar?.classList.add('announce-bar--hidden');
    } else {
      header.classList.remove('is-scrolled');
      bar?.classList.remove('announce-bar--hidden');
    }

    if (atelier) {
      const y = window.scrollY;
      const start = atelier.offsetTop - 120;
      const end = atelier.offsetTop + atelier.offsetHeight - 120;
      document.body.classList.toggle('page--home2Active', y >= start && y < end);
    }

    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });

  if (atelier) {
    window.addEventListener('resize', update, { passive: true });
    update();
  }
})();

// -------------------------
// 2. Product Search overlay
// -------------------------
(() => {
  const PRODUCTS = [
    { name: 'Standwaschbecken',        category: 'Waschbecken',   url: 'waschbecken.html' },
    { name: 'Wandwaschbecken',         category: 'Waschbecken',   url: 'waschbecken.html#wand' },
    { name: 'Freistehende Badewannen', category: 'Badewannen',    url: 'bad.html' },
    { name: 'Beistelltische',          category: 'Stone Living',  url: 'beistelltische.html' },
    { name: 'Leuchten',                category: 'Stone Living',  url: 'leuchten.html' },
    { name: 'Spiegel',                 category: 'Stone Living',  url: 'spiegel.html' },
    { name: 'Badregale',               category: 'Stone Living',  url: 'badregale.html' },
    { name: 'Serviertabletts',         category: 'Stone Living',  url: 'serviertabletts.html' },
    { name: 'Vasen',                   category: 'Stone Living',  url: 'vasen.html' },
    { name: 'Marmor Waschbecken',      category: 'Waschbecken',   url: 'waschbecken.html' },
    { name: 'Naturstein Badewanne',    category: 'Badewannen',    url: 'bad.html' },
    { name: 'Stone Living Kollektion', category: 'Stone Living',  url: 'fliesen.html' },
  ];

  const overlay   = document.getElementById('searchOverlay');
  const input     = document.getElementById('searchInput');
  const results   = document.getElementById('searchResults');
  const toggleBtn = document.getElementById('searchToggle');
  const closeBtn  = document.getElementById('searchClose');

  if (!overlay) return;

  const openSearch = () => {
    overlay.removeAttribute('hidden');
    requestAnimationFrame(() => input?.focus());
    document.documentElement.style.overflow = 'hidden';
  };

  const closeSearch = () => {
    overlay.setAttribute('hidden', '');
    if (input)   input.value = '';
    if (results) results.innerHTML = '';
    document.documentElement.style.overflow = '';
  };

  const render = (items) => {
    if (!results) return;
    if (!items.length) {
      results.innerHTML = '<p class="search-empty">Keine Ergebnisse gefunden</p>';
      return;
    }
    results.innerHTML = items.map(p =>
      `<a class="search-result" href="${p.url}">
        <span class="search-result__name">${p.name}</span>
        <span class="search-result__cat">${p.category}</span>
      </a>`
    ).join('');
  };

  const doSearch = (q) => {
    const lq = q.trim().toLowerCase();
    if (!lq) { results.innerHTML = ''; return; }
    render(PRODUCTS.filter(p =>
      p.name.toLowerCase().includes(lq) || p.category.toLowerCase().includes(lq)
    ));
  };

  toggleBtn?.addEventListener('click', openSearch);
  closeBtn?.addEventListener('click', closeSearch);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
  input?.addEventListener('input', () => doSearch(input.value));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) closeSearch();
  });
})();
