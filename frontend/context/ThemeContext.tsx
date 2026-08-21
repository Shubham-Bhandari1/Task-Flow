'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export type Theme = 'light' | 'dark';
export type Accent = 'blue' | 'amber' | 'pink' | 'rose' | 'emerald' | 'black';

const THEME_KEY = 'taskflow-theme';
const ACCENT_KEY = 'taskflow-accent';

export const ACCENTS: { value: Accent; label: string; swatch: string }[] = [
  { value: 'amber', label: 'Amber', swatch: '#F59E0B' },
  { value: 'blue', label: 'Blue', swatch: '#4C5FD5' },
  { value: 'pink', label: 'Pink', swatch: '#EC4899' },
  { value: 'rose', label: 'Rose', swatch: '#F43F5E' },
  { value: 'emerald', label: 'Emerald', swatch: '#10B981' },
  { value: 'black', label: 'Black', swatch: '#171717' },
];

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  accent: Accent;
  setAccent: (accent: Accent) => void;
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

/**
 * Wraps the app once (in app/layout.tsx). Manages two independent, both
 * persisted, both applied as attributes on <html>:
 *  - data-theme="light|dark"   -> light/dark mode (globals.css [data-theme] blocks)
 *  - data-accent="blue|amber|..." -> which accent color powers --color-primary
 *    (globals.css [data-accent] blocks, layered on top of the theme's base tokens)
 *
 * The actual *first paint* values (before React hydrates) are set by the
 * inline script in layout.tsx — this provider takes over from there.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');
  const [accent, setAccentState] = useState<Accent>('blue');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(THEME_KEY) as Theme | null;
    const storedAccent = window.localStorage.getItem(ACCENT_KEY) as Accent | null;
    const initialTheme =
      storedTheme ??
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    const initialAccent = storedAccent ?? 'blue';

    setThemeState(initialTheme);
    setAccentState(initialAccent);
    document.documentElement.setAttribute('data-theme', initialTheme);
    document.documentElement.setAttribute('data-accent', initialAccent);
  }, []);

  const setTheme = (next: Theme) => {
    setThemeState(next);
    document.documentElement.setAttribute('data-theme', next);
    window.localStorage.setItem(THEME_KEY, next);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  const setAccent = (next: Accent) => {
    setAccentState(next);
    document.documentElement.setAttribute('data-accent', next);
    window.localStorage.setItem(ACCENT_KEY, next);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, accent, setAccent }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
