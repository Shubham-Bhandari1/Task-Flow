import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combine conditional classes AND resolve conflicting Tailwind utilities
 * (e.g. a component's default `bg-surface` vs. a caller's `bg-input`) so
 * the last one always wins, predictably. Every reusable UI component uses
 * this instead of raw clsx() so consumers can safely override styles via
 * `className` without fighting the component's defaults.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
