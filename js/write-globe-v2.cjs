// Write enhanced globe-3d.js v2
const fs = require('fs');
const code = `/**
 * 寰宇·人文经纬 — 3D 交互地球仪 v2
 * Enhanced: starfield, atmosphere glow, continent silhouettes, pulsating markers
 */

const Globe3D = {
  _canvas: null, _ctx: null,
  _w: 0, _h: 0, _r: 0, _cx: 0, _cy: 0,
  _rotX: 0.35, _rotY: 0,
  _autoRotate: true, _dragging: false,
  _dragPrev: { x: 0, y: 0 }, _dragStart: { x: 0, y: 0 },
  _vx: 0, _vy: 0, _zoom: 1.0, _hoverIdx: -1,
  _dests: [], _dots3D: [], _stars: [],
  _af: null, _lt: 0,

  init(canvasId, destinations) {
    this._canvas = document.getElementById(canvasId);
    if (!this._canvas) return;
    this._ctx = this._canvas.getContext('2d');
    this._dests = destinations || [];
    this._lt = performance.now();
    this._resize();
    window.addEventListener('resize', () => this._resize());

    this._stars = [];
    for (let i = 0; i < 120; i++) {
      this._stars.push({
        x: Math.random() * 1200 - 600, y: Math.random() * 1200 - 600,
        r: Math.random() * 1.2 + 0.3,
        twinkle: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.02 + 0.005
      });
    }

    this._dots3D = this._dests.map(d => this._latLngTo3D(d.lat, d.lng));

    this._canvas.addEventListener('mousedown', e => this._onDown(e));
    window.addEventListener('mousemove', e => this._onMove(e));
    window.addEventListener('mouseup', () => this._onUp());
    this._canvas.addEventListener('touchstart', e => { e.preventDefault(); this._onDown(e.touches[0]); }, { passive: false });
    window.addEventListener('touchmove', e => { if (!this._dragging) return; e.preventDefault(); this._onMove(e.touches[0]); }, { passive: false });
    window.addEventListener('touchend', () => this._onUp());
    this._canvas.addEventListener('wheel', e => { e.preventDefault(); this._zoom = Math.max(0.55, Math.min(2.2, this._zoom - e.deltaY * 0.0008)); }, { passive: false });
    this._canvas.addEventListener('click', e => {
      if (this._dragging || this._hoverIdx < 0) return;
      if (Math.hypot(this._dragPrev.x - this._dragStart.x, this._dragPrev.y - this._dragStart.y) > 4) return;
      const d = this._dests[this._hoverIdx];
      if (d) {
        if (window.ThemeEngine) ThemeEngine.apply(d);
        window.Storage && Storage.addRecent(d.id);
        window.location.href = 'destination.html?dest=' + d.id;
      }
    });
    this._canvas.style.cursor = 'grab';
    this._animate();
  },

  _resize() {
    const rect = this._canvas.parentElement.getBoundingClientRect();
    const size = Math.min(rect.width, 480);
    const dpr = window.devicePixelRatio || 1;
    this._w = this._canvas.width = size * dpr;
    this._h = this._canvas.height = size * dpr;
    this._canvas.style.width = size + 'px';
    this._canvas.style.height = size + 'px';
    this._cx = this._w / 2; this._cy = this._h / 2;
    this._r = size * 0.36 * dpr;
  },

  _latLngTo3D(lat, lng) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + 180) * Math.PI / 180;
    const sr = this._r;
    return { x: -sr * Math.sin(phi) * Math.cos(theta), y: sr * Math.cos(phi), z: sr * Math.sin(phi) * Math.sin(theta) };
  },

  _rotate3D(p) {
    const cosY = Math.cos(this._rotY), sinY = Math.sin(this._rotY);
    const x1 = p.x * cosY - p.z * sinY, z1 = p.x * sinY + p.z * cosY;
    const cosX = Math.cos(this._rotX), sinX = Math.sin(this._rotX);
    return { x: x1, y: p.y * cosX - z1 * sinX, z: p.y * sinX + z1 * cosX };
  },

  _project(p3) {
    const s = this._zoom * this._r / (this._r * 1.6 + p3.z);
    return { x: this._cx + p3.x * s, y: this._cy - p3.y * s, z: p3.z, s };
  },

  _onDown(e) {
    this._dragging = true; this._autoRotate = false; this._vx = 0; this._vy = 0;
    this._dragStart.x = e.clientX; this._dragStart.y = e.clientY;
    this._dragPrev.x = e.clientX; this._dragPrev.y = e.clientY;
    this._canvas.style.cursor = 'grabbing';
  },

  _onMove(e) {
    if (this._dragging) {
      const dx = e.clientX - this._dragPrev.x, dy = e.clientY - this._dragPrev.y;
      this._rotY += dx * 0.004; this._rotX += dy * 0.004;
      this._rotX = Math.max(-1.3, Math.min(1.3, this._rotX));
      this._vx = dx * 0.004; this._vy = dy * 0.004;
      this._dragPrev.x = e.clientX; this._dragPrev.y = e.clientY;
    }
    const dpr = window.devicePixelRatio || 1;
    const rect = this._canvas.getBoundingClientRect();
    this._checkHover((e.clientX - rect.left) * dpr, (e.clientY - rect.top) * dpr);
  },

  _onUp() {
    this._dragging = false; this._autoRotate = true;
    this._canvas.style.cursor = this._hoverIdx >= 0 ? 'pointer' : 'grab';
  },

  _checkHover(mx, my) {
    let closest = -1, best = Infinity;
    for (let i = 0; i < this._dots3D.length; i++) {
      const p3 = this._rotate3D(this._dots3D[i]);
      if (p3.z < -this._r * 0.7) continue;
      const p2 = this._project(p3);
      const dist = Math.hypot(mx - p2.x, my - p2.y);
      if (dist < 24 && dist < best) { best = dist; closest = i; }
    }
    this._hoverIdx = closest;
    this._canvas.style.cursor = closest >= 0 ? 'pointer' : this._dragging ? 'grabbing' : 'grab';
  },

  _animate() {
    this._af = requestAnimationFrame(() => this._animate());
    const now = performance.now();
    const dt = Math.min((now - this._lt) / 1000, 0.1);
    this._lt = now;
    if (this._autoRotate && !this._dragging) {
      this._rotY += this._vx; this._rotX += this._vy;
      this._vx *= 0.96; this._vy *= 0.96;
      if (Math.abs(this._vx) < 0.00005 && Math.abs(this._vy) < 0.00005) this._rotY += dt * 0.18;
    }
    this._render(now);
  },

  _render(t) {
    const ctx = this._ctx, w = this._w, h = this._h, cx = this._cx, cy = this._cy;
    ctx.clearRect(0, 0, w, h);

    // Starfield
    this._stars.forEach(s => {
      const sx = cx + s.x * (this._zoom * 0.5 + 0.5), sy = cy + s.y * (this._zoom * 0.5 + 0.5);
      if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) return;
      const alpha = 0.3 + 0.4 * Math.sin(s.twinkle + t * 0.001 * s.speed);
      ctx.fillStyle = 'rgba(255,255,255,' + alpha + ')';
      ctx.beginPath(); ctx.arc(sx, sy, s.r, 0, Math.PI * 2); ctx.fill();
    });

    const r = this._r * this._zoom;
    // Atmosphere
    const ag = ctx.createRadialGradient(cx, cy, r * 0.92, cx, cy, r * 1.25);
    ag.addColorStop(0, 'rgba(180,140,70,0)'); ag.addColorStop(0.5, 'rgba(180,140,60,0.06)');
    ag.addColorStop(0.8, 'rgba(140,100,40,0.04)'); ag.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ag; ctx.beginPath(); ctx.arc(cx, cy, r * 1.25, 0, Math.PI * 2); ctx.fill();

    // Sphere
    const sg = ctx.createRadialGradient(cx - r * 0.18, cy - r * 0.22, r * 0.12, cx, cy, r);
    sg.addColorStop(0, 'rgba(55,48,35,0.92)'); sg.addColorStop(0.4, 'rgba(30,26,18,0.97)');
    sg.addColorStop(0.85, 'rgba(12,10,7,0.99)'); sg.addColorStop(1, 'rgba(6,5,3,1)');
    ctx.fillStyle = sg; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();

    // Continents
    ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = 'rgba(40,35,25,0.35)';
    this._ell(ctx, cx - r * 0.25, cy - r * 0.4, r * 0.35, r * 0.45, -0.15);
    this._ell(ctx, cx - r * 0.2, cy + r * 0.25, r * 0.15, r * 0.3, 0.1);
    this._ell(ctx, cx + r * 0.15, cy - r * 0.3, r * 0.25, r * 0.22, 0);
    this._ell(ctx, cx + r * 0.1, cy + r * 0.1, r * 0.2, r * 0.38, 0);
    this._ell(ctx, cx + r * 0.4, cy - r * 0.15, r * 0.4, r * 0.35, -0.1);
    this._ell(ctx, cx + r * 0.45, cy + r * 0.4, r * 0.12, r * 0.1, 0);
    ctx.fillStyle = 'rgba(220,220,230,0.05)';
    this._ell(ctx, cx, cy + r * 0.82, r * 0.7, r * 0.12, 0);
    ctx.restore();

    // Grid
    ctx.strokeStyle = 'rgba(180,150,90,0.05)'; ctx.lineWidth = 0.5;
    for (let lat = -60; lat <= 60; lat += 30) {
      const phi = (90 - lat) * Math.PI / 180;
      ctx.beginPath(); ctx.ellipse(cx, cy - r * Math.sin(phi) * this._zoom, r * Math.cos(phi) * this._zoom, r * Math.cos(phi) * this._zoom * 0.28, 0, 0, Math.PI * 2); ctx.stroke();
    }

    // Dots
    const time = t * 0.001;
    for (let i = 0; i < this._dots3D.length; i++) {
      const p3 = this._rotate3D(this._dots3D[i]);
      if (p3.z < -this._r * 0.55) continue;
      const p2 = this._project(p3);
      const hovered = i === this._hoverIdx;
      const pulse = 1 + Math.sin(time * 2.5 + i * 0.7) * 0.3;
      const gr = (hovered ? 7 : 3.5) * pulse;

      const gg = ctx.createRadialGradient(p2.x, p2.y, gr * 0.3, p2.x, p2.y, gr);
      gg.addColorStop(0, 'rgba(220,180,70,' + (hovered ? 0.9 : 0.5) + ')');
      gg.addColorStop(0.5, 'rgba(200,150,50,' + (hovered ? 0.4 : 0.15) + ')');
      gg.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(p2.x, p2.y, gr, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = hovered ? '#ffe8b0' : '#d4b44a';
      ctx.beginPath(); ctx.arc(p2.x, p2.y, hovered ? 3 : 1.6, 0, Math.PI * 2); ctx.fill();

      if (hovered) {
        const text = (this._dests[i].flag || '') + ' ' + this._dests[i].nameCN;
        ctx.font = '600 14px "Noto Sans SC", sans-serif';
        const tw = ctx.measureText(text).width, pad = 10, th = 26;
        const tx = Math.max(5, Math.min(w - tw - pad * 2, p2.x - tw / 2 - pad));
        const ty = p2.y - gr - th - 8;
        ctx.fillStyle = 'rgba(15,12,8,0.94)'; ctx.strokeStyle = 'rgba(200,150,50,0.5)'; ctx.lineWidth = 1;
        const rx = 6;
        ctx.beginPath(); ctx.moveTo(tx + rx, ty);
        ctx.lineTo(tx + tw + pad * 2 - rx, ty);
        ctx.quadraticCurveTo(tx + tw + pad * 2, ty, tx + tw + pad * 2, ty + rx);
        ctx.lineTo(tx + tw + pad * 2, ty + th - rx);
        ctx.quadraticCurveTo(tx + tw + pad * 2, ty + th, tx + tw + pad * 2 - rx, ty + th);
        ctx.lineTo(tx + rx, ty + th);
        ctx.quadraticCurveTo(tx, ty + th, tx, ty + th - rx);
        ctx.lineTo(tx, ty + rx); ctx.quadraticCurveTo(tx, ty, tx + rx, ty);
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#fff'; ctx.textAlign = 'left';
        ctx.fillText(text, tx + pad, ty + 18);
      }
    }

    // Rim
    ctx.strokeStyle = 'rgba(200,160,70,0.1)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  },

  _ell(ctx, cx, cy, rx, ry, rot) {
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(rot);
    ctx.beginPath(); ctx.ellipse(0, 0, rx, ry, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  },

  destroy() { if (this._af) cancelAnimationFrame(this._af); }
};

if (typeof module !== 'undefined') module.exports = Globe3D;
window.Globe3D = Globe3D;
`;

fs.writeFileSync('js/globe-3d.js', code);
console.log('Written globe-3d.js v2 (' + code.length + ' bytes)');
