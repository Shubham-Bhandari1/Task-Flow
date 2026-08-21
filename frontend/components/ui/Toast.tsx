'use client';
import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/cn';
import type { ToastType } from '@/context/ToastContext';

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onDismiss: () => void;
}

export function Toast({ message, type, duration = 4000, onDismiss }: ToastProps) {
  useEffect(() => {
    if (duration === Infinity) return;
    const timer = setTimeout(onDismiss, duration);
    return () => clearTimeout(timer);
  }, [duration, onDismiss]);

  const Icon = type === 'success' ? CheckCircle : type === 'error' ? XCircle : Info;

  return (
    <div
      role="alert"
      className={cn(
        'flex w-80 max-w-[90vw] items-center justify-between gap-3 rounded-card border bg-surface p-4 shadow-card-hover',
        'animate-[slideInRight_200ms_ease]',
        type === 'success' && 'border-green-500/30',
        type === 'error' && 'border-red-500/30',
        type === 'info' && 'border-blue-500/30',
      )}
    >
      <div className="flex items-center gap-3">
        <Icon
          className={cn(
            'h-5 w-5 shrink-0',
            type === 'success' && 'text-green-500',
            type === 'error' && 'text-red-500',
            type === 'info' && 'text-blue-500',
          )}
        />
        <p className="text-sm font-medium text-ink">{message}</p>
      </div>
      <button
        onClick={onDismiss}
        aria-label="Close notification"
        className="shrink-0 rounded-lg p-1 text-muted transition-colors hover:bg-surface-hover hover:text-ink"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
