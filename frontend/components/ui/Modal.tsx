'use client';

import { ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * A minimal, accessible modal: traps focus visually with an overlay,
 * closes on Escape or overlay click, and locks body scroll while open.
 * No external dialog library needed for a scope this size.
 */
export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus trap: focus the first focusable element inside the dialog
    const dialog = document.querySelector('[role="dialog"]') as HTMLElement;
    if (dialog) {
      const focusable = dialog.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }

      const handleTabTrap = (e: KeyboardEvent) => {
        if (e.key !== 'Tab' || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      document.addEventListener('keydown', handleTabTrap);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('keydown', handleTabTrap);
        document.body.style.overflow = '';
      };
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-[fadeIn_150ms_ease]"
        onClick={onClose}
      />
      <div className="relative z-10 w-full max-w-md rounded-card border border-border bg-surface p-6 shadow-card-hover animate-[slideUp_180ms_ease]">
        <div className="mb-5 flex items-center justify-between">
          <h2 id="modal-title" className="font-display text-lg font-semibold text-ink">
            {title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded-lg p-1.5 text-muted hover:bg-surface-hover hover:text-ink transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
