import { InputHTMLAttributes, forwardRef } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

/** A styled checkbox — native input underneath for accessibility, custom box on top. */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, checked, ...props }, ref) => {
    const checkboxId = id ?? label?.toLowerCase().replace(/\s+/g, '-');
    return (
      <label
        htmlFor={checkboxId}
        className="flex cursor-pointer items-center gap-2.5 select-none"
      >
        <span className="relative flex h-4 w-4 shrink-0 items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            className="peer absolute inset-0 h-4 w-4 cursor-pointer appearance-none rounded-md border border-border bg-surface checked:border-ink checked:bg-ink"
            {...props}
          />
          <Check className="pointer-events-none absolute h-3 w-3 text-bg opacity-0 peer-checked:opacity-100" />
        </span>
        {label && <span className={cn('text-sm text-ink', className)}>{label}</span>}
      </label>
    );
  },
);
Checkbox.displayName = 'Checkbox';
