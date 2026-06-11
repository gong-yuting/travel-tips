/**
 * 清寰纪行 Lucent Voyage — Canvas 图片生成器 v2
 * 每张图 = 目的地专属：主题色渐变 + 国旗 + 地名 + 区域纹理
 */
const AtlasImage = {
  _cache: {},

  card(dest)   { return this._make(dest, 640, 360, 0); },
  hero(dest)   { return this._make(dest, 1920, 1080, 1); },
  gallery(dest, i) {
    const sz = [[600,800],[800,800],[800,600],[600,800],[800,800],[800,600]];
    return this._make(dest, sz[i][0], sz[i][1], i + 2);
  },
  story(dest)  { return this._make(dest, 800, 400, 99); },

  _make(dest, w, h, seed) {
    const key = dest.id + '-' + w + 'x' + h + '-' + seed;
    if (this._cache[key]) return this._cache[key];

    const c = document.createElement('canvas');
    c.width = w; c.height = h;
    const x = c.getContext('2d');
    const t = dest.theme || {};
    const rnd = (n) => Math.sin(seed * 99 + n * 127.1) * 0.5 + 0.5;

    // 1. 深色底层
    const g1 = x.createLinearGradient(0, 0, w, h);
    g1.addColorStop(0, t.bg || '#f8f0f5');
    g1.addColorStop(0.6, t.accent || '#b0d0c8');
    g1.addColorStop(1, t.primary || '#d090a8');
    x.fillStyle = g1;
    x.fillRect(0, 0, w, h);

    // 2. 亮色光斑
    for (let i = 0; i < 5; i++) {
      const g = x.createRadialGradient(
        w * rnd(i * 3), h * rnd(i * 3 + 1), 0,
        w * rnd(i * 3), h * rnd(i * 3 + 1), w * 0.35
      );
      g.addColorStop(0, 'rgba(255,255,255,0.12)');
      g.addColorStop(1, 'rgba(255,255,255,0)');
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
    }

    // 3. 对角线装饰
    x.strokeStyle = 'rgba(255,255,255,0.04)';
    x.lineWidth = w * 0.004;
    for (let i = 0; i < 8; i++) {
      const ox = i * w * 0.15;
      x.beginPath(); x.moveTo(ox, 0); x.lineTo(ox + h * 0.7, h); x.stroke();
    }

    // 4. 圆点装饰
    x.fillStyle = 'rgba(255,255,255,0.06)';
    for (let i = 0; i < 12; i++) {
      x.beginPath();
      x.arc(w * rnd(i * 7 + seed), h * rnd(i * 11 + seed), w * 0.04 * rnd(i * 5), 0, Math.PI * 2);
      x.fill();
    }

    // 5. 国旗（大）
    x.shadowColor = 'rgba(0,0,0,0.25)';
    x.shadowBlur = w * 0.03;
    x.font = (w * 0.16) + 'px sans-serif';
    x.textAlign = 'center';
    x.textBaseline = 'middle';
    x.fillText(dest.flag || '🌍', w / 2, h * 0.42);
    x.shadowBlur = 0;

    // 6. 中文地名
    x.fillStyle = 'rgba(255,255,255,0.9)';
    x.font = 'bold ' + (w * 0.07) + 'px "Noto Sans SC", "PingFang SC", sans-serif';
    x.fillText(dest.nameCN, w / 2, h * 0.68);

    // 7. 英文地名 + 国家
    x.fillStyle = 'rgba(255,255,255,0.55)';
    x.font = (w * 0.035) + 'px "Inter", "Noto Sans SC", sans-serif';
    x.fillText(dest.name + ' · ' + (dest.country || ''), w / 2, h * 0.80);

    // 8. 标签句
    if (dest.tagline) {
      x.fillStyle = 'rgba(255,255,255,0.35)';
      x.font = (w * 0.026) + 'px "Noto Sans SC", sans-serif';
      const short = dest.tagline.length > 24 ? dest.tagline.slice(0, 24) + '…' : dest.tagline;
      x.fillText(short, w / 2, h * 0.90);
    }

    const url = c.toDataURL('image/jpeg', 0.9);
    this._cache[key] = url;
    return url;
  }
};
if (typeof window !== 'undefined') window.AtlasImage = AtlasImage;
