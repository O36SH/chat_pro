const CACHE_PREFIX = 'app_cache_';
const DEFAULT_EXPIRY = 5 * 60 * 1000; // 5 minutes

export const cache = {
  set: (key: string, data: any, expiryMs: number = DEFAULT_EXPIRY) => {
    const item = {
      data,
      expiry: Date.now() + expiryMs,
    };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(item));
  },

  get: (key: string) => {
    const item = localStorage.getItem(CACHE_PREFIX + key);
    if (!item) return null;

    const { data, expiry } = JSON.parse(item);
    if (Date.now() > expiry) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return null;
    }

    return data;
  },

  remove: (key: string) => {
    localStorage.removeItem(CACHE_PREFIX + key);
  },

  clear: () => {
    Object.keys(localStorage)
      .filter(key => key.startsWith(CACHE_PREFIX))
      .forEach(key => localStorage.removeItem(key));
  },
};