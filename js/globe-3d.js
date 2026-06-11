/**
 * 清寰纪行 Lucent Voyage — 3D 交互地球仪 v5 · 精装版
 * 紫色调地球：紫罗兰/薰衣草色调，与樱花粉背景协调，无背景框
 */
const Globe3D = {
  _c: null, _x: null, _w: 0, _h: 0, _r: 0, _cx: 0, _cy: 0,
  _ry: 0, _rx: 0.35, _auto: true, _drag: false,
  _mx: 0, _my: 0, _hi: -1, _dests: [], _dots: [], _stars: [], _af: null, _t: 0,

  _continents: [
    [[68,-165],[64,-165],[60,-145],[55,-135],[50,-128],[47,-124],[42,-124],[37,-122],[33,-118],[28,-115],[25,-112],[25,-97],[20,-97],[18,-90],[15,-88],[12,-83],[8,-80],[8,-75],[9,-70],[12,-65],[15,-60],[22,-55],[30,-55],[40,-60],[50,-65],[55,-68],[60,-70],[65,-85],[68,-110],[68,-165]],
    [[12,-72],[8,-76],[5,-80],[0,-80],[-5,-78],[-10,-75],[-15,-73],[-20,-70],[-23,-68],[-25,-65],[-30,-58],[-35,-55],[-38,-57],[-40,-62],[-45,-65],[-48,-68],[-52,-70],[-54,-68],[-54,-65],[-50,-58],[-45,-50],[-40,-43],[-35,-38],[-30,-40],[-23,-44],[-18,-48],[-15,-52],[-8,-55],[-5,-58],[-2,-60],[2,-55],[5,-50],[8,-55],[10,-65],[12,-72]],
    [[70,-25],[68,-15],[65,-5],[62,5],[58,8],[55,10],[52,5],[48,2],[45,-2],[43,-8],[42,-9],[38,-9],[36,-6],[36,0],[35,5],[37,12],[37,22],[35,25],[38,28],[42,28],[45,25],[50,22],[55,18],[58,10],[62,5],[65,0],[68,-10],[70,-20],[70,-25]],
    [[37,12],[35,18],[32,20],[30,25],[28,30],[25,34],[22,36],[18,38],[15,38],[10,38],[5,40],[0,40],[-5,38],[-10,35],[-15,30],[-18,28],[-20,25],[-25,28],[-30,30],[-33,28],[-35,22],[-33,18],[-30,15],[-25,12],[-20,10],[-15,8],[-10,6],[-5,4],[0,5],[5,8],[10,6],[15,2],[20,5],[25,10],[30,12],[35,15],[37,12]],
    [[70,25],[68,40],[65,55],[62,90],[60,120],[58,140],[55,155],[50,160],[45,160],[40,155],[35,150],[30,140],[25,145],[22,140],[15,140],[10,135],[5,130],[0,125],[-5,120],[-8,110],[-5,105],[0,100],[5,95],[10,90],[15,85],[20,80],[25,75],[30,70],[35,65],[40,60],[45,50],[50,40],[55,30],[60,28],[65,30],[70,25]],
    [[-12,130],[-14,126],[-16,124],[-20,118],[-22,114],[-25,113],[-30,115],[-33,120],[-35,125],[-35,135],[-38,142],[-37,148],[-34,152],[-30,153],[-25,152],[-20,148],[-15,145],[-12,140],[-12,130]],
    [[-70,-170],[-70,-130],[-72,-90],[-74,-50],[-75,-10],[-75,30],[-75,80],[-75,130],[-75,170],[-70,-170]],
  ],
  // Island dots [lat, lng]
  _islands: [
    [21,-157],[20,-155],[19,-81],[18,-77],[18,-66],[14,-61],[10,-85],[9,-79],[-5,-80],[-17,-150],[-18,178],[47,180],[44,145],[36,140],[33,130],[25,122],[23,120],
    [-8,115],[-8,110],[-20,57],[55,-4],[53,-8],[65,-20],[62,-6],[-38,145],[-42,148],[-21,55],[40,-8],[39,3],[36,25],[70,-20],[78,18],[66,-18],
    [28,-17],[28,-15],[32,-13],[36,-5],[38,0],[38,12],[42,9],[43,3],[45,-12],[42,-8],[40,-28],[38,-28],
  ],

  init(id, dests) {
    this._c = document.getElementById(id);
    if (!this._c) return;
    this._x = this._c.getContext('2d');
    this._dests = dests || [];
    this._t = performance.now();
    this._size();
    window.addEventListener('resize', () => this._size());
    for (let i = 0; i < 100; i++) this._stars.push({ x: Math.random() * 800 - 400, y: Math.random() * 800 - 400, r: Math.random() * 1.2 + 0.3, p: Math.random() * 99, sp: 0.005 + Math.random() * 0.02 });
    this._dots = this._dests.map(d => this._lla(d.lat, d.lng));
    this._c.addEventListener('mousedown', e => { this._drag = true; this._auto = false; this._mx = e.clientX; this._my = e.clientY; this._c.style.cursor = 'grabbing'; });
    window.addEventListener('mousemove', e => {
      if (this._drag) { this._ry += (e.clientX - this._mx) * 0.005; this._rx += (e.clientY - this._my) * 0.005; this._rx = Math.max(-1.2, Math.min(1.2, this._rx)); this._mx = e.clientX; this._my = e.clientY; }
      const r = this._c.getBoundingClientRect();
      this._hover((e.clientX - r.left) * (window.devicePixelRatio || 1), (e.clientY - r.top) * (window.devicePixelRatio || 1));
    });
    window.addEventListener('mouseup', () => { this._drag = false; this._auto = true; this._c.style.cursor = this._hi >= 0 ? 'pointer' : 'grab'; });
    this._c.addEventListener('touchstart', e => { e.preventDefault(); this._drag = true; this._auto = false; this._mx = e.touches[0].clientX; this._my = e.touches[0].clientY; }, { passive: false });
    window.addEventListener('touchmove', e => { if (!this._drag) return; e.preventDefault(); this._ry += (e.touches[0].clientX - this._mx) * 0.005; this._rx += (e.touches[0].clientY - this._my) * 0.005; this._rx = Math.max(-1.2, Math.min(1.2, this._rx)); this._mx = e.touches[0].clientX; this._my = e.touches[0].clientY; }, { passive: false });
    window.addEventListener('touchend', () => { this._drag = false; this._auto = true; });
    this._c.addEventListener('click', e => {
      if (this._hi < 0) return;
      const d = this._dests[this._hi];
      if (d) { if (window.ThemeEngine) ThemeEngine.apply(d); if (window.Storage) Storage.addRecent(d.id); window.location.href = 'destination.html?dest=' + d.id; }
    });
    this._c.style.cursor = 'grab';
    this._loop();
  },

  _size() {
    const s = Math.min(this._c.parentElement.getBoundingClientRect().width, 480);
    const dpr = window.devicePixelRatio || 1;
    this._w = this._c.width = s * dpr; this._h = this._c.height = s * dpr;
    this._c.style.width = s + 'px'; this._c.style.height = s + 'px';
    this._cx = this._w / 2; this._cy = this._h / 2;
    this._r = s * 0.36 * dpr;
  },

  _lla(lat, lng) {
    const p = (90 - lat) * Math.PI / 180, t = (lng + 180) * Math.PI / 180, sr = this._r;
    return { x: -sr * Math.sin(p) * Math.cos(t), y: sr * Math.cos(p), z: sr * Math.sin(p) * Math.sin(t) };
  },

  _rot(p) {
    const cY = Math.cos(this._ry), sY = Math.sin(this._ry), x1 = p.x * cY - p.z * sY, z1 = p.x * sY + p.z * cY;
    const cX = Math.cos(this._rx), sX = Math.sin(this._rx);
    return { x: x1, y: p.y * cX - z1 * sX, z: p.y * sX + z1 * cX };
  },

  _proj(p3) {
    const s = this._r / (this._r * 1.5 + p3.z);
    return { x: this._cx + p3.x * s, y: this._cy - p3.y * s, z: p3.z };
  },

  _hover(mx, my) {
    let best = Infinity; this._hi = -1;
    for (let i = 0; i < this._dots.length; i++) {
      const p3 = this._rot(this._dots[i]);
      if (p3.z < -this._r * 0.5) continue;
      const p2 = this._proj(p3);
      const d = Math.hypot(mx - p2.x, my - p2.y);
      if (d < 26 && d < best) { best = d; this._hi = i; }
    }
    this._c.style.cursor = this._hi >= 0 ? 'pointer' : this._drag ? 'grabbing' : 'grab';
  },

  _loop() {
    this._af = requestAnimationFrame(() => this._loop());
    const n = performance.now(), dt = Math.min((n - this._t) / 1000, 0.1); this._t = n;
    if (this._auto) this._ry += dt * 0.22;
    this._draw(n);
  },

  _drawContinentPoly(x, poly) {
    let first = true, hasFront = false;
    const pts = [];
    for (let i = 0; i < poly.length; i++) {
      const p3 = this._rot(this._lla(poly[i][0], poly[i][1]));
      if (p3.z > -this._r * 0.3) hasFront = true;
      const p2 = this._proj(p3);
      pts.push(p2);
    }
    if (!hasFront && pts.every(p => p.z < -this._r * 0.1)) return;
    x.beginPath();
    pts.forEach((p, i) => i === 0 ? x.moveTo(p.x, p.y) : x.lineTo(p.x, p.y));
    x.closePath();
    // Fill with lavender gradient
    const bounds = pts.reduce((b, p) => ({ minX: Math.min(b.minX, p.x), maxX: Math.max(b.maxX, p.x), minY: Math.min(b.minY, p.y), maxY: Math.max(b.maxY, p.y) }), { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity });
    const cg = x.createLinearGradient(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    cg.addColorStop(0, 'rgba(240,225,250,0.42)');
    cg.addColorStop(0.5, 'rgba(220,200,235,0.32)');
    cg.addColorStop(1, 'rgba(195,170,215,0.26)');
    x.fillStyle = cg;
    x.fill();
    x.strokeStyle = 'rgba(235,220,248,0.18)';
    x.lineWidth = 0.5;
    x.stroke();
  },

  _draw(t) {
    const x = this._x, w = this._w, h = this._h, cx = this._cx, cy = this._cy, r = this._r;
    x.clearRect(0, 0, w, h);

    // Stars with lavender twinkle
    this._stars.forEach(s => {
      const sx = cx + s.x * 0.5, sy = cy + s.y * 0.5;
      if (sx < 0 || sx > w || sy < 0 || sy > h) return;
      const a = 0.2 + 0.35 * Math.sin(s.p + t * s.sp);
      x.fillStyle = 'rgba(210,195,235,' + a + ')';
      x.beginPath(); x.arc(sx, sy, s.r, 0, Math.PI * 2); x.fill();
      if (a > 0.45) {
        x.strokeStyle = 'rgba(235,225,250,' + (a - 0.45) * 2 + ')';
        x.lineWidth = 0.3;
        x.beginPath(); x.moveTo(sx - s.r * 3, sy); x.lineTo(sx + s.r * 3, sy); x.stroke();
        x.beginPath(); x.moveTo(sx, sy - s.r * 3); x.lineTo(sx, sy + s.r * 3); x.stroke();
      }
    });

    // Ocean sphere — plum/mauve purple gradient
    const sg = x.createRadialGradient(cx - r * 0.22, cy - r * 0.28, r * 0.05, cx, cy, r);
    sg.addColorStop(0, 'rgba(245,235,252,0.75)');
    sg.addColorStop(0.15, 'rgba(210,185,225,0.9)');
    sg.addColorStop(0.5, 'rgba(160,130,185,0.95)');
    sg.addColorStop(0.85, 'rgba(120,90,150,0.98)');
    sg.addColorStop(1, 'rgba(85,55,120,1)');
    x.fillStyle = sg;
    x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.fill();

    // Specular dot
    x.fillStyle = 'rgba(255,255,255,0.10)';
    x.beginPath(); x.arc(cx - r * 0.28, cy - r * 0.32, r * 0.1, 0, Math.PI * 2); x.fill();

    // Clip to sphere
    x.save(); x.beginPath(); x.arc(cx, cy, r, 0, Math.PI * 2); x.clip();

    // Continents
    this._continents.forEach(poly => this._drawContinentPoly(x, poly));

    // Islands
    x.fillStyle = 'rgba(235,220,248,0.20)';
    this._islands.forEach(([lat, lng]) => {
      const p3 = this._rot(this._lla(lat, lng));
      if (p3.z < -this._r * 0.5) return;
      const p2 = this._proj(p3);
      if (p2.z > this._r * 0.3) {
        x.beginPath(); x.arc(p2.x, p2.y, 1.2, 0, Math.PI * 2); x.fill();
      }
    });

    // Grid — subtle lavender lines
    x.strokeStyle = 'rgba(220,210,245,0.05)'; x.lineWidth = 0.35;
    for (let lat = -60; lat <= 60; lat += 30) {
      const p = (90 - lat) * Math.PI / 180;
      x.beginPath(); x.ellipse(cx, cy - r * Math.sin(p), r * Math.cos(p), r * Math.cos(p) * 0.28, 0, 0, Math.PI * 2); x.stroke();
    }
    for (let lng = 0; lng < 360; lng += 30) {
      x.beginPath();
      for (let lat = -85; lat <= 85; lat += 3) {
        const p3 = this._rot(this._lla(lat, lng));
        const p2 = this._proj(p3);
        lat === -85 ? x.moveTo(p2.x, p2.y) : x.lineTo(p2.x, p2.y);
      }
      x.stroke();
    }

    x.restore();

    // Destination markers — magenta/fuchsia
    const tm = t * 0.001;
    for (let i = 0; i < this._dots.length; i++) {
      const p3 = this._rot(this._dots[i]);
      if (p3.z < -this._r * 0.4) continue;
      const p2 = this._proj(p3), hov = i === this._hi;
      const pulse = 1 + Math.sin(tm * 2.8 + i * 0.7) * 0.3;
      const gr = (hov ? 9 : 4) * pulse;

      // Outer pulse ring — magenta
      if (hov) {
        const pr = x.createRadialGradient(p2.x, p2.y, gr * 0.6, p2.x, p2.y, gr * 1.6);
        pr.addColorStop(0, 'rgba(220,130,180,0.3)');
        pr.addColorStop(1, 'rgba(0,0,0,0)');
        x.fillStyle = pr; x.beginPath(); x.arc(p2.x, p2.y, gr * 1.6, 0, Math.PI * 2); x.fill();
      }

      // Core glow — fuchsia
      const gg = x.createRadialGradient(p2.x, p2.y, 0, p2.x, p2.y, gr);
      gg.addColorStop(0, 'rgba(255,238,248,' + (hov ? 1 : 0.65) + ')');
      gg.addColorStop(0.4, 'rgba(210,120,170,' + (hov ? 0.6 : 0.25) + ')');
      gg.addColorStop(1, 'rgba(0,0,0,0)');
      x.fillStyle = gg; x.beginPath(); x.arc(p2.x, p2.y, gr, 0, Math.PI * 2); x.fill();

      // Center dot — magenta
      x.fillStyle = hov ? '#fff' : '#d4689e';
      x.beginPath(); x.arc(p2.x, p2.y, hov ? 2.8 : 1.5, 0, Math.PI * 2); x.fill();

      // Hover: ring + tooltip — purple palette
      if (hov) {
        x.strokeStyle = 'rgba(255,255,255,0.7)'; x.lineWidth = 1.5;
        x.beginPath(); x.arc(p2.x, p2.y, gr + 2, 0, Math.PI * 2); x.stroke();

        const txt = (this._dests[i].flag || '') + ' ' + this._dests[i].nameCN;
        x.font = 'bold 13px "Noto Sans SC", sans-serif';
        const tw = x.measureText(txt).width + 16, tx = Math.max(4, Math.min(w - tw, p2.x - tw / 2)), ty = p2.y - gr - 34;
        const rh = 24, rx = 8;
        x.fillStyle = 'rgba(250,242,252,0.96)'; x.strokeStyle = 'rgba(190,140,200,0.7)'; x.lineWidth = 1.2;
        x.beginPath(); x.moveTo(tx + rx, ty); x.lineTo(tx + tw - rx, ty);
        x.quadraticCurveTo(tx + tw, ty, tx + tw, ty + rx); x.lineTo(tx + tw, ty + rh - rx);
        x.quadraticCurveTo(tx + tw, ty + rh, tx + tw - rx, ty + rh); x.lineTo(tx + rx, ty + rh);
        x.quadraticCurveTo(tx, ty + rh, tx, ty + rh - rx); x.lineTo(tx, ty + rx);
        x.quadraticCurveTo(tx, ty, tx + rx, ty); x.closePath(); x.fill(); x.stroke();
        x.fillStyle = '#3a2540'; x.textAlign = 'left';
        x.fillText(txt, tx + 8, ty + 18); x.textAlign = 'start';
      }
    }
  },

  destroy() { if (this._af) cancelAnimationFrame(this._af); }
};
if (typeof window !== 'undefined') window.Globe3D = Globe3D;
