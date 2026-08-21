'use client';

import Link from 'next/link';
import { ChevronDown, Sun, Moon, Settings, Check } from 'lucide-react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { Avatar } from '@/components/ui/Avatar';
import { useTheme, ACCENTS } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';

/**
 * The "Dexter ⌄" workspace switcher at the top of the sidebar. Opens a
 * menu with a "Change Theme" section — light/dark mode plus the accent
 * color swatches — and a link to the full Profile/Settings page. This is
 * the feature the reference screenshot's "Change Theme -> Color Mode"
 * flyout was showing; it lives here instead of a nested flyout since a
 * single-level menu is more reliable across screen sizes.
 */
export function WorkspaceMenu() {
  const { user } = useAuth();
  const { theme, setTheme, accent, setAccent } = useTheme();

  if (!user) return null;

  return (
    <DropdownMenu
      panelClassName="w-64"
      trigger={
        <button className="flex w-full items-center gap-2.5 border-b border-border px-4 py-3 text-left hover:bg-surface-hover">
          <Avatar name={user.displayName} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-ink">{user.displayName}</p>
            <p className="truncate text-xs text-muted">
              {user.isGuest ? 'Guest workspace' : user.username}
            </p>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 text-muted" />
        </button>
      }
    >
      {(close) => (
        <div className="flex flex-col gap-3 p-2">
          <div>
            <p className="mb-1.5 px-1 text-xs font-medium uppercase tracking-wide text-muted">
              Mode
            </p>
            <div className="flex gap-1.5">
              <button
                onClick={() => setTheme('light')}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-sm ${
                  theme === 'light' ? 'border-primary text-ink' : 'border-border text-muted'
                }`}
              >
                <Sun className="h-3.5 w-3.5" />
                Light
              </button>
              <button
                onClick={() => setTheme('dark')}
                className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-2 py-1.5 text-sm ${
                  theme === 'dark' ? 'border-primary text-ink' : 'border-border text-muted'
                }`}
              >
                <Moon className="h-3.5 w-3.5" />
                Dark
              </button>
            </div>
          </div>

          <div>
            <p className="mb-1.5 px-1 text-xs font-medium uppercase tracking-wide text-muted">
              Color Mode
            </p>
            <div className="flex flex-col gap-0.5">
              {ACCENTS.map((a) => (
                <button
                  key={a.value}
                  onClick={() => setAccent(a.value)}
                  className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-ink hover:bg-surface-hover"
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
          </div>

          <Link
            href="/profile"
            onClick={close}
            className="flex items-center gap-2 rounded-lg border-t border-border px-2 pt-2.5 text-sm text-muted hover:text-ink"
          >
            <Settings className="h-3.5 w-3.5" />
            Settings
          </Link>
        </div>
      )}
    </DropdownMenu>
  );
}
