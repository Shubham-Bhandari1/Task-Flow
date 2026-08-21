import { cn } from '@/lib/cn';

interface AvatarProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizeClasses = {
  sm: 'h-5 w-5 text-[10px]',
  md: 'h-8 w-8 text-xs',
  lg: 'h-14 w-14 text-lg',
};

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

/** Every place a person is shown (assignee, reporter, profile pic) uses this — one initials-avatar implementation. */
export function Avatar({ name, size = 'md', className }: AvatarProps) {
  return (
    <div
      title={name}
      className={cn(
        'flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-muted font-medium text-primary-foreground',
        sizeClasses[size],
        className,
      )}
    >
      {initials(name)}
    </div>
  );
}
