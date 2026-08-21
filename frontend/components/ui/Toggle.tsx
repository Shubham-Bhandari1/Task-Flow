import { cn } from '@/lib/cn';

interface ToggleOption<T extends string> {
  value: T;
  label: string;
}

interface ToggleProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: ToggleOption<T>[];
}

/** A reusable segmented-control toggle. Used for Board/List but generic enough for any 2-3 option switch. */
export function Toggle<T extends string>({ value, onChange, options }: ToggleProps<T>) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-surface p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            value === opt.value
              ? 'bg-ink text-bg'
              : 'text-muted hover:text-ink',
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
