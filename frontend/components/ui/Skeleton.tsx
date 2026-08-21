'use client';
import { cn } from '@/lib/cn';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
}

export function Skeleton({ className, variant = 'rectangular' }: SkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-border/60',
        variant === 'text' && 'h-4 w-full rounded',
        variant === 'circular' && 'rounded-full',
        variant === 'rectangular' && 'rounded-xl',
        className,
      )}
    />
  );
}

/** Mimics a TaskCard layout for loading states */
export function SkeletonCard() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-border bg-surface p-4 shadow-sm">
      <Skeleton className="h-5 w-3/4" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
      <div className="mt-2 flex items-center justify-between">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-8 w-8" variant="circular" />
      </div>
    </div>
  );
}

/** Mimics a TaskList table row for loading states */
export function SkeletonList() {
  return (
    <div className="flex items-center gap-4 border-b border-border p-4">
      <Skeleton className="h-5 flex-1" />
      <Skeleton className="h-5 w-24" />
      <Skeleton className="h-6 w-20 rounded-full" />
      <Skeleton className="h-8 w-8" variant="circular" />
      <Skeleton className="h-5 w-24" />
    </div>
  );
}
