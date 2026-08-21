'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CheckSquare, ListTodo, FolderKanban, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import { WorkspaceMenu } from './WorkspaceMenu';

const navItems = [
  { href: '/tasks', label: 'Tasks', icon: ListTodo },
  { href: '/projects', label: 'Projects', icon: FolderKanban },
];

interface SidebarProps {
  open: boolean; // whether it's shown as an overlay on mobile/tablet
  onClose: () => void;
}

/**
 * Persistent 256px column on desktop; slides in as an overlay on smaller
 * screens (controlled by `open`, toggled from the Header's menu button).
 * Same component renders both — no separate "MobileSidebar".
 */
export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile/tablet overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-sidebar transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/tasks" className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ink text-bg">
              <CheckSquare className="h-4 w-4" />
            </div>
            <span className="font-display text-base font-semibold text-ink">Pyramid</span>
          </Link>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-muted hover:bg-surface-hover lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <WorkspaceMenu />

        <nav className="flex flex-col gap-1 p-3">
          <p className="px-2.5 pb-1 pt-2 text-xs font-medium uppercase tracking-wide text-muted">
            Workspace
          </p>
          {navItems.map((item) => {
            const active = pathname?.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium transition-colors',
                  active
                    ? 'bg-surface text-ink shadow-card'
                    : 'text-muted hover:bg-surface-hover hover:text-ink',
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
