import { useState, useEffect } from 'react';
import { APP_CONFIG } from '../constants/config';

type Theme = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.THEME);
    return (savedTheme as Theme) || 'light';
  });

  useEffect(() => {
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.THEME, theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return { theme, toggleTheme };
};