/**
 * 寰宇·人文清寰纪行 — 应用主逻辑
 * Atlas of Humane Horizons — App Core
 */

const App = {
  _activeFilter: 'all',
  _searchQuery: '',

  /** Initialize the application */
  init() {
    // Ensure global destinations data exists
    if (!window.DESTINATIONS || !window.DESTINATIONS.length) {
      console.warn('No destinations data found. Ensure destinations.js is loaded.');
      return;
    }

    this._setupSearch();
    this._setupFilters();
    this._setupNavScroll();
    this._setupScrollReveal();
    this._renderHubPage();
    this._setupKeyboardNav();

    // Auto-apply theme if on sub-page
    if (window.location.pathname.includes('destination')) {
      this._initSubPage();
    }

    console.log(`🗺️ Atlas loaded — ${window.DESTINATIONS.length} destinations ready`);
  },

  /** ── Hub Page: Render destination cards ── */
  _renderHubPage() {
    const grid = document.querySelector('#dest-grid');
    if (!grid) return;

    const filtered = this._getFiltered();
    grid.innerHTML = '';

    if (!filtered.length) {
      grid.innerHTML = `<div class="section__desc" style="grid-column:1/-1;text-align:center;padding:var(--space-xl)">
        <p>没有找到匹配的目的地</p><p style="color:var(--color-muted)">试试调整搜索或筛选项</p>
      </div>`;
      return;
    }

    filtered.forEach(dest => {
      const card = document.createElement('article');
      card.className = 'dest-card';
      card.tabIndex = 0;
      card.setAttribute('role', 'link');
      card.setAttribute('aria-label', `探索 ${dest.nameCN} — ${dest.tagline}`);
      card.innerHTML = `
        <img class="dest-card__image"
             src="https://images.unsplash.com/${dest.heroImage}?auto=format&fit=crop&w=600&q=80"
             alt="${dest.nameCN}${dest.name !== dest.nameCN ? ' ' + dest.name : ''}"
             loading="lazy"
             onerror="this.style.display='none'">
        <span class="dest-card__flag">${dest.flag || ''}</span>
        <div class="dest-card__body">
          <div class="dest-card__region">${dest.countryCN || ''} · ${this._regionLabel(dest.region)}</div>
          <h3 class="dest-card__name">${dest.nameCN}</h3>
          <p class="dest-card__tagline">${dest.tagline || ''}</p>
        </div>
      `;

      card.addEventListener('click', () => this._navigateTo(dest));
      card.addEventListener('keydown', e => { if (e.key === 'Enter') this._navigateTo(dest); });

      grid.appendChild(card);
    });

    // Update count
    const countEl = document.querySelector('#dest-count');
    if (countEl) countEl.textContent = `${filtered.length} 个目的地`;
  },

  /** Navigate to destination sub-page */
  _navigateTo(dest) {
    // Apply theme immediately for perceived performance
    if (window.ThemeEngine) {
      ThemeEngine.apply(dest);
    }
    // Navigate
    window.location.href = `destination.html?dest=${dest.id}`;
  },

  /** ── Search ── */
  _setupSearch() {
    const input = document.querySelector('#search-input');
    if (!input) return;

    input.addEventListener('input', () => {
      this._searchQuery = input.value.trim().toLowerCase();
      this._renderHubPage();
    });

    // Clear on Escape
    input.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        input.value = '';
        this._searchQuery = '';
        this._renderHubPage();
        input.blur();
      }
    });
  },

  /** ── Filters ── */
  _setupFilters() {
    const container = document.querySelector('#filter-pills');
    if (!container) return;

    const regions = [
      { id: 'all', label: '全部' },
      { id: 'east-asia', label: '东亚' },
      { id: 'southeast-asia', label: '东南亚' },
      { id: 'south-asia', label: '南亚' },
      { id: 'central-asia', label: '中亚' },
      { id: 'middle-east', label: '中东' },
      { id: 'europe', label: '欧洲' },
      { id: 'americas', label: '美洲' },
      { id: 'africa', label: '非洲' },
      { id: 'oceania', label: '大洋洲' },
    ];

    regions.forEach(r => {
      const pill = document.createElement('button');
      pill.className = `filter-pill${r.id === 'all' ? ' filter-pill--active' : ''}`;
      pill.textContent = r.label;
      pill.setAttribute('aria-pressed', r.id === 'all' ? 'true' : 'false');
      pill.addEventListener('click', () => {
        this._activeFilter = r.id;
        container.querySelectorAll('.filter-pill').forEach(p => {
          p.classList.toggle('filter-pill--active', p === pill);
          p.setAttribute('aria-pressed', p === pill ? 'true' : 'false');
        });
        this._renderHubPage();
      });
      container.appendChild(pill);
    });
  },

  /** Get filtered + searched destinations */
  _getFiltered() {
    let list = window.DESTINATIONS || [];
    if (this._activeFilter !== 'all') {
      list = list.filter(d => d.region === this._activeFilter);
    }
    if (this._searchQuery) {
      const q = this._searchQuery;
      list = list.filter(d =>
        d.nameCN?.includes(q) ||
        d.name?.toLowerCase().includes(q) ||
        d.countryCN?.includes(q) ||
        d.country?.toLowerCase().includes(q) ||
        d.tagline?.includes(q) ||
        (d.keywords || []).some(k => k.includes(q))
      );
    }
    return list;
  },

  /** ── Navigation scroll effect ── */
  _setupNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    }, { passive: true });
  },

  /** ── Scroll reveal ── */
  _setupScrollReveal() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.7s var(--ease-out-expo), transform 0.7s var(--ease-out-expo)';
      observer.observe(el);
    });
  },

  /** ── Keyboard navigation ── */
  _setupKeyboardNav() {
    document.addEventListener('keydown', e => {
      // '/' to focus search
      if (e.key === '/' && document.activeElement === document.body) {
        e.preventDefault();
        document.querySelector('#search-input')?.focus();
      }
    });
  },

  /** ── Sub-page initialization ── */
  _initSubPage() {
    const destId = new URLSearchParams(window.location.search).get('dest');
    if (!destId) return;

    const dest = window.DESTINATIONS?.find(d => d.id === destId);
    if (!dest) {
      console.warn(`Destination not found: ${destId}`);
      return;
    }

    // Apply theme
    if (window.ThemeEngine) ThemeEngine.apply(dest);

    // Populate hero
    const heroEl = document.querySelector('#hero-bg');
    if (heroEl && dest.heroImage) {
      heroEl.style.backgroundImage = `url(https://images.unsplash.com/${dest.heroImage}?auto=format&fit=crop&w=1920&q=80)`;
    }

    // Populate text
    document.querySelectorAll('[data-field]').forEach(el => {
      const field = el.dataset.field;
      const keys = field.split('.');
      let val = dest;
      for (const k of keys) { val = val?.[k]; }
      if (val !== undefined && val !== null) {
        el.textContent = typeof val === 'object' ? JSON.stringify(val) : val;
      }
    });

    // Render routes
    this._renderRoutes(dest);
    // Render foods
    this._renderFoods(dest);
    // Render heritage
    this._renderHeritage(dest);
    // Render bento guide
    this._renderBentoGuide(dest);

    document.title = `${dest.nameCN} — ${dest.tagline || '人文旅游门户'} | 寰宇·人文清寰纪行`;
  },

  _renderRoutes(dest) {
    const container = document.querySelector('#routes-list');
    if (!container || !dest.routes?.length) return;
    container.innerHTML = dest.routes.map((r, i) => `
      <div class="bento-card bento-card--2x1" style="animation-delay:${i*0.1}s">
        <span class="bento-card__icon">🗺️</span>
        <span class="bento-card__title">${r.name}</span>
        <span class="bento-card__content" style="color:var(--color-muted);font-size:0.8rem">${r.days}天</span>
        <p style="color:var(--color-muted);font-size:0.85rem;margin-top:4px">${(r.highlights||[]).join(' · ')}</p>
      </div>
    `).join('');
  },

  _renderFoods(dest) {
    const container = document.querySelector('#foods-list');
    if (!container || !dest.foods?.length) return;
    container.innerHTML = dest.foods.map(f => `
      <div class="bento-card">
        <span class="bento-card__icon">🍽️</span>
        <span class="bento-card__title">${f.name}</span>
        <span style="color:var(--color-primary);font-size:0.75rem">${f.type}</span>
        <p style="color:var(--color-muted);font-size:0.82rem;margin-top:4px">${f.desc}</p>
      </div>
    `).join('');
  },

  _renderHeritage(dest) {
    const container = document.querySelector('#heritage-list');
    if (!container || !dest.heritage?.length) return;
    container.innerHTML = dest.heritage.map((h, i) => `
      <article class="glass" style="padding:var(--space-md);margin-bottom:var(--space-md);animation-delay:${i*0.15}s">
        <h4 style="color:var(--color-primary);margin-bottom:var(--space-xs)">${h.title}</h4>
        <p style="color:var(--color-muted)">${h.story}</p>
        ${h.media ? `<img src="https://images.unsplash.com/${h.media}?auto=format&fit=crop&w=800&q=80" alt="${h.title}" loading="lazy" style="width:100%;border-radius:var(--bento-radius);margin-top:var(--space-sm);opacity:0.7">` : ''}
      </article>
    `).join('');
  },

  _renderBentoGuide(dest) {
    const container = document.querySelector('#bento-guide');
    if (!container) return;

    const season = dest.stats?.bestSeason || '全年';
    const visitors = dest.stats?.annualVisitors || '—';
    const unesco = dest.stats?.unesco || '—';

    container.innerHTML = `
      <div class="bento-card bento-card--2x1" id="guide-weather">
        <div class="bento-card__icon">🌤️</div>
        <div class="bento-card__title">实时天气</div>
        <div class="bento-card__content" id="weather-data">
          <div class="loader" style="width:20px;height:20px;margin:8px 0"></div>
          <span style="font-size:0.75rem;color:var(--color-muted)">加载中…</span>
        </div>
      </div>
      <div class="bento-card">
        <div class="bento-card__icon">📅</div>
        <div class="bento-card__title">最佳季节</div>
        <div class="bento-card__content">${season}</div>
      </div>
      <div class="bento-card">
        <div class="bento-card__icon">👥</div>
        <div class="bento-card__title">年游客量</div>
        <div class="bento-card__content">${visitors}</div>
      </div>
      <div class="bento-card">
        <div class="bento-card__icon">🏛️</div>
        <div class="bento-card__title">UNESCO</div>
        <div class="bento-card__content">${unesco === '—' ? '—' : unesco + '年'}</div>
      </div>
      ${dest.festivals?.map((f, i) => `
        <div class="bento-card">
          <div class="bento-card__icon">🎉</div>
          <div class="bento-card__title">${f.name}</div>
          <div class="bento-card__content" style="font-size:0.78rem">${f.month}月 · ${f.desc}</div>
        </div>
      `).join('') || ''}
    `;

    // Fetch weather
    this._fetchWeather(dest);
  },

  async _fetchWeather(dest) {
    if (!dest.weather) return;
    try {
      // Using Open-Meteo (free, no API key)
      const { lat, lng } = dest;
      const resp = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code,wind_speed_10m&timezone=${encodeURIComponent(dest.weather.tz)}`
      );
      if (!resp.ok) throw new Error('Weather API error');
      const data = await resp.json();
      const current = data.current;
      const weatherCode = current.weather_code;
      const temp = Math.round(current.temperature_2m);
      const emoji = this._weatherEmoji(weatherCode);

      const el = document.querySelector('#weather-data');
      if (el) {
        el.innerHTML = `<span style="font-size:1.5rem">${emoji}</span>
          <strong style="font-size:1.2rem;display:block">${temp}°C</strong>
          <span style="font-size:0.75rem;color:var(--color-muted)">${dest.weather.city}</span>`;
      }
    } catch (e) {
      console.warn('Weather fetch failed:', e.message);
      const el = document.querySelector('#weather-data');
      if (el) el.innerHTML = '<span style="color:var(--color-muted);font-size:0.8rem">天气数据暂不可用</span>';
    }
  },

  _weatherEmoji(code) {
    if (code <= 3) return '☀️';
    if (code <= 49) return '🌥️';
    if (code <= 59) return '🌧️';
    if (code <= 69) return '❄️';
    if (code <= 79) return '🌨️';
    if (code <= 82) return '🌧️';
    if (code <= 86) return '🌨️';
    if (code <= 99) return '⛈️';
    return '🌤️';
  },

  _regionLabel(region) {
    const map = {
      'east-asia': '东亚', 'southeast-asia': '东南亚', 'south-asia': '南亚',
      'central-asia': '中亚', 'middle-east': '中东', 'europe': '欧洲',
      'americas': '美洲', 'africa': '非洲', 'oceania': '大洋洲'
    };
    return map[region] || '';
  }
};

// ── Boot on DOM ready ──
document.addEventListener('DOMContentLoaded', () => App.init());
