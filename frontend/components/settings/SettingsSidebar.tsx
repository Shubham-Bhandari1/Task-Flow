'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { ArrowLeft, Search, User, SunMedium, Check } from 'lucide-react';
import { cn } from '@/lib/cn';
import { useTheme, Theme, ACCENTS } from '@/context/ThemeContext';

export type SettingsSection = 'profile' | 'theme';

interface SettingsSidebarProps {
  active: SettingsSection;
  onSelect: (section: SettingsSection) => void;
}

const themeOptions: { value: Theme; label: string; swatch: string }[] = [
  { value: 'light', label: 'Light', swatch: 'bg-white border border-border' },
  { value: 'dark', label: 'Dark', swatch: 'bg-neutral-900' },
];

/** Every top-level nav row, used both to render the list and to filter it by search. */
const navEntries: { section: SettingsSection; label: string; icon: typeof User }[] = [
  { section: 'profile', label: 'Profile', icon: User },
  { section: 'theme', label: 'Theme', icon: SunMedium },
];

export function SettingsSidebar({ active, onSelect }: SettingsSidebarProps) {
  const { theme, setTheme, accent, setAccent } = useTheme();
  const [themeExpanded, setThemeExpanded] = useState(active === 'theme');
  const [search, setSearch] = useState('');

  // Real filtering, not decorative: typing narrows which nav rows show.
  // With only two sections this is intentionally small-scale — it's the
  // same pattern a larger settings menu (many sections) would use.
  const visibleEntries = useMemo(
    () => navEntries.filter((e) => e.label.toLowerCase().includes(search.trim().toLowerCase())),
    [search],
  );

  return (
    <aside className="flex h-full w-full flex-col border-r border-border bg-sidebar sm:w-72">
      <div className="p-4">
        <Link
          href="/tasks"
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-muted hover:bg-surface-hover hover:text-ink transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to app
        </Link>
      </div>

      <div className="px-4 pb-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-full rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-primary"
          />
        </div>
      </div>

      <nav className="flex flex-col gap-1 px-4">
        {visibleEntries.length === 0 && (
          <p className="px-2.5 py-2 text-sm text-muted">No settings match &quot;{search}&quot;</p>
        )}

        {visibleEntries.map(({ section, label, icon: Icon }) => (
          <div key={section}>
            <button
              onClick={() => {
                onSelect(section);
                if (section === 'theme') setThemeExpanded((prev) => !prev);
              }}
              className={cn(
                'flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm font-medium transition-colors',
                active === section
                  ? 'bg-surface text-ink shadow-card'
                  : 'text-muted hover:bg-surface-hover hover:text-ink',
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>

            {section === 'theme' && themeExpanded && (
              <div className="ml-4 mt-0.5 flex flex-col gap-0.5 border-l border-border pl-4">
                {themeOptions.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => setTheme(opt.value)}
                    className={cn(
                      'flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm transition-colors',
                      theme === opt.value ? 'text-ink font-medium' : 'text-muted hover:text-ink',
                    )}
                  >
                    {opt.label}
                    <span className={cn('h-3.5 w-3.5 rounded-full', opt.swatch)} />
                  </button>
                ))}

                <p className="mt-2 px-2.5 text-xs font-medium uppercase tracking-wide text-muted">
                  Color
                </p>
                {ACCENTS.map((a) => (
                  <button
                    key={a.value}
                    onClick={() => setAccent(a.value)}
                    className="flex items-center justify-between rounded-lg px-2.5 py-2 text-left text-sm text-muted hover:text-ink"
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className="h-3.5 w-3.5 rounded-full"
                        style={{ backgroundColor: a.swatch }}
                      />
                      {a.label}
                    </span>
                    {accent === a.value && <Check className="h-3.5 w-3.5 text-primary" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
