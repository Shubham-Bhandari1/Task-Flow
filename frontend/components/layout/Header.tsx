'use client';

import { Menu } from 'lucide-react';
import { ReactNode } from 'react';
import { ThemeSwitcher } from './ThemeSwitcher';

interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  actions?: ReactNode; // page-specific controls: search, fields, filter, +Add Task, etc.
}

/**
 * The top bar shown on every logged-in page. The hamburger button only
 * does anything on small screens (see the `lg:hidden` class) — on desktop
 * the sidebar is always visible, so there's nothing to toggle.
 *
 * Note: the actions row uses `flex-wrap` instead of a horizontal scrollbar.
 * That's a deliberate choice, not an oversight — if this row scrolled
 * (`overflow-x-auto`), any dropdown menu opened from inside it (Filter,
 * Fields, etc.) would get visually clipped by that scroll container. By
 * letting the buttons wrap onto a second line on narrow screens instead,
 * there's no scroll container to clip anything, and dropdowns stay simple.
 */
export function Header({ title, onMenuClick, actions }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b border-border bg-bg/80 px-4 py-3 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-lg p-1.5 text-muted hover:bg-surface-hover hover:text-ink lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>
        <h1 className="font-display text-lg font-semibold text-ink">{title}</h1>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        {actions}
        <ThemeSwitcher />
      </div>
    </header>
  );
}
