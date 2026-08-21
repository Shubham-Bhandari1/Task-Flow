'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';

interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode | ((close: () => void) => ReactNode);
  align?: 'left' | 'right'; // which side of the trigger the panel lines up with
  panelClassName?: string;
}

/**
 * A basic dropdown: click the trigger, a small panel appears below it.
 * Every menu in the app (Priority picker, Filter panel, Fields picker,
 * Workspace menu) is built on top of this one component.
 *
 * How it works, in plain terms:
 *  1. `open` is just a boolean in state — true means "show the panel".
 *  2. The panel is a plain <div style={position: absolute}> sitting right
 *     below the trigger. No portals, no manual coordinate math — CSS does
 *     the positioning for us.
 *  3. A `useEffect` listens for clicks anywhere in the document. If the
 *     click landed outside both the trigger and the panel, we close it.
 *  4. Escape key also closes it.
 *
 * One thing worth knowing if asked: an absolutely-positioned panel like
 * this can get visually clipped if a parent element scrolls
 * (`overflow-x-auto` etc). We avoid that by making sure no parent
 * container needs to scroll in the first place (see Header.tsx) — that's
 * simpler than working around it here.
 */
export function DropdownMenu({ trigger, children, align = 'left', panelClassName }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function handleOutsideClick(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <div className="relative inline-block" ref={wrapperRef}>
      <div
        onClick={() => setOpen((prev) => !prev)}
        role="button"
        aria-haspopup="true"
        aria-expanded={open}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((prev) => !prev);
          }
        }}
      >
        {trigger}
      </div>

      {open && (
        <div
          role="menu"
          className={cn(
            'absolute z-50 mt-2 min-w-[200px] rounded-xl border border-border bg-surface p-1.5 shadow-card-hover',
            align === 'right' ? 'right-0' : 'left-0',
            panelClassName,
          )}
        >
          {typeof children === 'function' ? children(() => setOpen(false)) : children}
        </div>
      )}
    </div>
  );
}
