'use client';

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

/**
 * A single toggle covers light/dark since that's what the Figma defines.
 * If the design turns out to have more than two themes, swap this for a
 * small dropdown using the same useTheme().setTheme(name) call — the
 * CSS-variable token system in globals.css already supports N themes.
 */
export function ThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="relative flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-ink hover:bg-surface-hover transition-colors"
    >
      {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
