/**
 * 寰宇·人文清寰纪行 — 动态文化主题引擎
 * Dynamic Cultural Theme Engine
 *
 * 核心功能：
 * - CSS 变量全量注入 (:root 动态覆盖)
 * - 文化纹理 Canvas 生成
 * - 字体动态加载 (Google Fonts API)
 * - 毛玻璃参数自适应
 * - 页面转场微动效
 */

const ThemeEngine = {
  _currentId: null,
  _fontLoaded: {},

  /**
   * Apply a destination theme — full site visual reconstruction
   * @param {Object} dest - destination object from DESTINATIONS
   */
  apply(dest) {
    if (!dest || !dest.theme) return;
    this._currentId = dest.id;
    const t = dest.theme;
    const root = document.documentElement;

    // ── Core palette ──
    root.style.setProperty('--color-bg', t.bg);
    root.style.setProperty('--color-surface', t.surface);
    root.style.setProperty('--color-surface-elevated', t.surfaceElevated);
    root.style.setProperty('--color-primary', t.primary);
    root.style.setProperty('--color-accent', t.accent);
    root.style.setProperty('--color-secondary', t.secondary);
    root.style.setProperty('--color-ink', t.ink);
    root.style.setProperty('--color-muted', t.muted);

    // ── Glassmorphism ──
    root.style.setProperty('--glass-bg', t.glassBg);
    root.style.setProperty('--glass-border', t.glassBorder);
    root.style.setProperty('--glass-blur', t.strategy === 'drenched' ? '20px' : '12px');

    // ── Typography ──
    if (dest.typography) {
      const ty = dest.typography;
      root.style.setProperty('--font-display', `'${ty.display}', serif`);
      root.style.setProperty('--font-body', `'${ty.body}', sans-serif`);
      root.style.setProperty('--font-display-weight', ty.displayW || 700);
      root.style.setProperty('--font-body-weight', ty.bodyW || 400);
      root.style.setProperty('--type-scale', ty.scale || 1.25);
      this._loadFont(ty.display, ty.body);
    }

    // ── Color strategy adjustments ──
    root.style.setProperty('--color-strategy', t.strategy);
    if (t.strategy === 'drenched') {
      root.style.setProperty('--surface-opacity', '0.85');
      root.style.setProperty('--border-strength', '0.18');
    } else {
      root.style.setProperty('--surface-opacity', '0.5');
      root.style.setProperty('--border-strength', '0.10');
    }

    // ── Cultural texture generation ──
    if (dest.textures && dest.textures.length) {
      this._generateTexture(dest.textures, t);
    }

    // ── Update meta theme-color ──
    this._updateMetaTheme(t);

    // ── Trigger transition animation ──
    this._triggerTransition();

    // ── Dispatch event ──
    window.dispatchEvent(new CustomEvent('themeChanged', { detail: dest }));

    console.log(`🎨 Theme applied: ${dest.nameCN || dest.name} [${t.strategy}]`);
  },

  /** Get current theme from URL or default */
  getFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('dest') || 'dunhuang';
  },

  /** Find destination by id */
  find(id) {
    return window.DESTINATIONS?.find(d => d.id === id) || null;
  },

  /** Load fonts dynamically via Google Fonts */
  _loadFont(display, body) {
    const key = `${display}|${body}`;
    if (this._fontLoaded[key]) return;
    this._fontLoaded[key] = true;

    const families = [];
    if (display && !this._fontLoaded[display]) {
      families.push(`family=${encodeURIComponent(display)}:wght@400;700;900`);
      this._fontLoaded[display] = true;
    }
    if (body && body !== display && !this._fontLoaded[body]) {
      families.push(`family=${encodeURIComponent(body)}:wght@300;400;500;700`);
      this._fontLoaded[body] = true;
    }
    if (!families.length) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?${families.join('&')}&display=swap`;
    document.head.appendChild(link);
  },

  /** Generate cultural texture as subtle background pattern */
  _generateTexture(textures, theme) {
    const canvas = document.createElement('canvas');
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext('2d');

    // Clear
    ctx.clearRect(0, 0, 400, 400);

    textures.forEach(tex => {
      switch (tex) {
        case 'sand-ripple':
          this._drawSandRipple(ctx);
          break;
        case 'mandala':
          this._drawMandala(ctx);
          break;
        case 'fresco-gold':
          this._drawFrescoGold(ctx);
          break;
        case 'zen-circle':
          this._drawZenCircle(ctx);
          break;
        case 'washi':
          this._drawWashi(ctx);
          break;
        case 'iznik-tile':
          this._drawIznik(ctx);
          break;
        case 'neon-grid':
          this._drawNeonGrid(ctx);
          break;
        case 'marble-vein':
          this._drawMarbleVein(ctx);
          break;
        case 'water-ripple':
          this._drawWaterRipple(ctx);
          break;
        case 'desert-dune':
          this._drawDesertDune(ctx);
          break;
        default:
          // default: subtle noise
          this._drawNoise(ctx);
      }
    });

    const dataURL = canvas.toDataURL();
    document.documentElement.style.setProperty('--texture-bg', `url(${dataURL})`);
  },

  _drawNoise(ctx) {
    const imgData = ctx.createImageData(400, 400);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const v = Math.random() * 15;
      imgData.data[i] = v;
      imgData.data[i+1] = v;
      imgData.data[i+2] = v;
      imgData.data[i+3] = 8;
    }
    ctx.putImageData(imgData, 0, 0);
  },

  _drawSandRipple(ctx) {
    ctx.strokeStyle = 'rgba(200,160,80,0.06)';
    ctx.lineWidth = 0.5;
    for (let y = 0; y < 400; y += 8) {
      ctx.beginPath();
      for (let x = 0; x <= 400; x += 4) {
        const yy = y + Math.sin(x * 0.05) * 15 + Math.sin(x * 0.02 + y * 0.03) * 8;
        x === 0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
      }
      ctx.stroke();
    }
  },

  _drawMandala(ctx) {
    ctx.strokeStyle = 'rgba(200,160,80,0.04)';
    ctx.lineWidth = 0.3;
    const cx = 200, cy = 200;
    for (let r = 20; r <= 180; r += 20) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (let a = 0; a < Math.PI * 2; a += Math.PI / 12) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(a) * 180, cy + Math.sin(a) * 180);
      ctx.stroke();
    }
  },

  _drawFrescoGold(ctx) {
    ctx.fillStyle = 'rgba(200,160,60,0.03)';
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * 400, y = Math.random() * 400;
      const r = Math.random() * 30 + 5;
      ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
    }
  },

  _drawZenCircle(ctx) {
    ctx.strokeStyle = 'rgba(150,140,120,0.04)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(200, 200, 120, 0, Math.PI * 1.6); ctx.stroke();
    ctx.beginPath(); ctx.arc(120, 260, 60, 0, Math.PI * 1.3); ctx.stroke();
    ctx.beginPath(); ctx.arc(280, 140, 80, 0, Math.PI * 1.8); ctx.stroke();
  },

  _drawWashi(ctx) {
    ctx.fillStyle = 'rgba(200,190,170,0.02)';
    for (let i = 0; i < 200; i++) {
      ctx.fillRect(Math.random() * 400, Math.random() * 400, Math.random() * 20 + 2, 0.5);
    }
  },

  _drawIznik(ctx) {
    ctx.strokeStyle = 'rgba(57,120,160,0.04)';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < 400; x += 40) {
      for (let y = 0; y < 400; y += 40) {
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const r = 16 + Math.sin(a * 6) * 6;
          const px = x + 20 + Math.cos(a) * r;
          const py = y + 20 + Math.sin(a) * r;
          a === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath(); ctx.stroke();
      }
    }
  },

  _drawNeonGrid(ctx) {
    ctx.strokeStyle = 'rgba(255,60,120,0.03)';
    ctx.lineWidth = 0.3;
    for (let i = 0; i < 400; i += 40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, 400); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(400, i); ctx.stroke();
    }
  },

  _drawMarbleVein(ctx) {
    ctx.strokeStyle = 'rgba(240,240,235,0.03)';
    ctx.lineWidth = 0.4;
    for (let i = 0; i < 10; i++) {
      ctx.beginPath();
      let y = Math.random() * 400;
      for (let x = 0; x <= 400; x += 4) {
        y += (Math.random() - 0.5) * 6;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();
    }
  },

  _drawWaterRipple(ctx) {
    ctx.strokeStyle = 'rgba(100,200,220,0.04)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 6; i++) {
      const r = 40 + i * 35;
      ctx.beginPath(); ctx.arc(200, 200, r, 0, Math.PI * 2); ctx.stroke();
    }
  },

  _drawDesertDune(ctx) {
    ctx.fillStyle = 'rgba(200,160,80,0.04)';
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      const baseY = 80 + i * 60;
      ctx.moveTo(0, 400);
      for (let x = 0; x <= 400; x += 4) {
        const y = baseY + Math.sin(x * 0.03 + i) * 50 + Math.sin(x * 0.015) * 30;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(400, 400); ctx.closePath(); ctx.fill();
    }
  },

  _updateMetaTheme(t) {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.content = t.bg;
  },

  _triggerTransition() {
    document.body.classList.add('theme-transitioning');
    clearTimeout(this._transitionTimer);
    this._transitionTimer = setTimeout(() => {
      document.body.classList.remove('theme-transitioning');
    }, 600);
  }
};

// ── Export ──
if (typeof module !== 'undefined') module.exports = ThemeEngine;
window.ThemeEngine = ThemeEngine;
