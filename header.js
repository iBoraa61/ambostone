/* header.js – shared across all AMBOSTONE pages
   Handles: scroll darkening + announcement bar + search overlay
   Mobile nav is handled by each page's own JS (or inline script)
*/

// -------------------------
// 1. Scroll: dark header + hide announcement bar
// -------------------------
(() => {
  const header = document.getElementById('mainHeader');
  const bar    = document.getElementById('announceBar');
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
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(update); ticking = true; }
  }, { passive: true });
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
