/**
 * 寰宇·人文清寰纪行 — 本地存储与用户偏好
 * localStorage-based favorites, recently viewed, and user preferences
 */

const Storage = {
  _favKey: 'atlas_favorites',
  _recentKey: 'atlas_recent',
  _maxRecent: 12,

  /** ── Favorites ── */

  /** Get all favorite destination IDs */
  getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(this._favKey) || '[]');
    } catch { return []; }
  },

  /** Check if a destination is favorited */
  isFavorite(destId) {
    return this.getFavorites().includes(destId);
  },

  /** Toggle favorite status. Returns new state (true = added, false = removed) */
  toggleFavorite(destId) {
    const favs = this.getFavorites();
    const idx = favs.indexOf(destId);
    if (idx >= 0) {
      favs.splice(idx, 1);
      localStorage.setItem(this._favKey, JSON.stringify(favs));
      return false;
    } else {
      favs.push(destId);
      localStorage.setItem(this._favKey, JSON.stringify(favs));
      return true;
    }
  },

  /** Get full destination objects for all favorites */
  getFavoriteDestinations() {
    const ids = this.getFavorites();
    if (!window.DESTINATIONS) return [];
    return ids.map(id => window.DESTINATIONS.find(d => d.id === id)).filter(Boolean);
  },

  /** ── Recently Viewed ── */

  /** Add a destination to recently viewed */
  addRecent(destId) {
    let recent = this.getRecent();
    // Remove duplicate
    recent = recent.filter(id => id !== destId);
    // Add to front
    recent.unshift(destId);
    // Trim
    recent = recent.slice(0, this._maxRecent);
    localStorage.setItem(this._recentKey, JSON.stringify(recent));
  },

  /** Get recently viewed destination IDs */
  getRecent() {
    try {
      return JSON.parse(localStorage.getItem(this._recentKey) || '[]');
    } catch { return []; }
  },

  /** Get full destination objects for recently viewed */
  getRecentDestinations() {
    const ids = this.getRecent();
    if (!window.DESTINATIONS) return [];
    return ids.map(id => window.DESTINATIONS.find(d => d.id === id)).filter(Boolean);
  },

  /** ── Random ── */
  getRandomDestination() {
    if (!window.DESTINATIONS?.length) return null;
    const idx = Math.floor(Math.random() * window.DESTINATIONS.length);
    return window.DESTINATIONS[idx];
  },

  /** ── Clear All ── */
  clearAll() {
    localStorage.removeItem(this._favKey);
    localStorage.removeItem(this._recentKey);
  }
};

if (typeof module !== 'undefined') module.exports = Storage;
window.Storage = Storage;
