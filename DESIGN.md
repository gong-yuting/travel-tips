# Design System — 寰宇·人文清寰纪行

## Visual Theme

**暗夜洞窟美学 (Dark Cave Aesthetic)** — 屏幕如莫高窟内壁般深邃，色彩从黑暗中浮现，如同手电筒照亮千年壁画。强制暗色模式，OKLCH 全色域。

### Color Tokens

所有色彩由 ThemeEngine 动态注入 `:root`。每个目的地拥有独立的 OKLCH 调色板。默认（敦煌）基准：

```css
--color-bg:               oklch(0.07 0.003 60)    /* 洞窟暗壁 — 近黑暖调 */
--color-surface:          oklch(0.13 0.006 55)    /* 砂岩面板 — 卡片/段背景 */
--color-surface-elevated: oklch(0.18 0.01 50)     /* 抬升面板 — 悬停态/下拉 */
--color-primary:          oklch(0.58 0.16 72)     /* 沙漠金 — CTA/强调/品牌锚 */
--color-accent:           oklch(0.52 0.13 200)    /* 壁画石青蓝 — 链接/徽章 */
--color-secondary:        oklch(0.48 0.18 28)     /* 朱砂红 — 高亮/警告 */
--color-ink:              oklch(0.93 0.003 70)    /* 经文白 — 正文 (≥7:1 vs bg) */
--color-muted:            oklch(0.58 0.015 75)    /* 弱化文 — 辅助信息 (≥3.5:1) */
```

**Color Strategy**: `drenched` (56 destinations) / `committed` (14 destinations)

### Glassmorphism

```css
--glass-bg:     rgba(18, 15, 10, 0.65)
--glass-border: rgba(200, 160, 80, 0.18)
--glass-blur:   20px (drenched) / 12px (committed)
```

适用于：Bento 卡片、导航栏（滚动态）、搜索栏、灯箱背景。

## Typography

### Font Stack

| 角色 | 字体 | Weight | 用途 |
|------|------|--------|------|
| Display (亚洲) | Noto Serif SC | 900/700 | Hero 标题、段标题 |
| Display (拉丁) | Playfair Display | 900/700 | 欧洲/美洲/非洲/大洋洲目的地 |
| Body (亚洲) | Noto Sans SC | 400/300 | 正文、卡片内容 |
| Body (拉丁) | Inter | 400/300 | 欧洲/美洲/非洲/大洋洲目的地 |

### Scale (Modular, ratio ≥1.25)

```
h1: clamp(2.5rem, 5vw, 5.5rem)   letter-spacing: -0.03em
h2: clamp(2rem, 3.5vw, 3.5rem)   letter-spacing: -0.02em
h3: clamp(1.5rem, 2.5vw, 2.25rem)
h4: clamp(1.2rem, 1.8vw, 1.6rem)
body: clamp(15px, 1.05vw, 18px)  line-height: 1.7, max-width: 65ch
```

## Spacing Scale

```css
--space-xs:  clamp(4px, 0.5vw, 8px)
--space-sm:  clamp(8px, 1vw, 16px)
--space-md:  clamp(16px, 2vw, 32px)
--space-lg:  clamp(32px, 4vw, 64px)
--space-xl:  clamp(48px, 6vw, 96px)
--space-2xl: clamp(64px, 8vw, 160px)
```

## Components

### Bento Card Grid

4 列 CSS Grid，6 种尺寸变体，3D 景深悬停。

```css
.bento-grid { grid-template-columns: repeat(4, 1fr); gap: var(--bento-gap); }
.bento-card { glass + border-radius + 3D perspective }
.bento-card:hover { translateY(-4px) rotateX(2deg) + box-shadow }
/* Size variants: 1x1, 2x1, 1x2, 2x2, 3x1, full */
```

### Destination Card

`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))` — 自适应无断点网格。

### Glass Panels

```css
.glass {
  background: var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--glass-border);
  border-radius: var(--bento-radius);
}
```

### Search Bar

全圆角 (100px)，毛玻璃背景，`:focus` 时 primary 色光晕。

## Motion

| 用途 | Duration | Easing |
|------|----------|--------|
| 页面入场 | 700ms | ease-out-expo |
| 卡片悬停 | 400ms | ease-out-expo |
| 主题切换 | 600ms | ease-out-expo |
| 视差滚动 | continuous | linear (JS-driven) |
| 粒子动画 | 60fps | requestAnimationFrame |

**Reduced Motion**: 所有动画包在 `@media (prefers-reduced-motion: reduce)` 中降级为瞬时过渡或静态。

## Z-Index Scale

```
--z-dropdown: 100   (搜索建议、筛选下拉)
--z-sticky:   200   (导航栏、段内导航点、回到顶部)
--z-overlay:  300   (遮罩)
--z-modal:    400   (灯箱)
--z-toast:    500   (通知)
--z-tooltip:  600   (工具提示)
```

## Responsive Breakpoints

| 断点 | 变化 |
|------|------|
| >768px | 完整 4 列 Bento + 段内导航点 + 桌面导航 |
| ≤768px | 2 列 Bento + 隐藏段内导航点 + 隐藏桌面导航链接 |
| ≤480px | 1 列 Bento + 隐藏视图切换 + 单列画廊 |

## Cultural Texture Engine

9 种 Canvas 生成的程序化纹理：
`sand-ripple`, `mandala`, `fresco-gold`, `zen-circle`, `washi`,
`iznik-tile`, `neon-grid`, `marble-vein`, `water-ripple`

注入为 `--texture-bg: url(data:)` 背景图案，opacity 0.3。

## Icons

EMOJI 原生渲染 — 无需图标库。跨平台一致。

## Performance

- 字体: Google Fonts `display=swap` + 按需加载
- 图片: Unsplash CDN + `loading=lazy` + `w` 参数自适应
- 天气: Open-Meteo 免费 API，客户端 fetch
- CSS: 单一文件，无构建步骤
- JS: 原生 ES6，零依赖
