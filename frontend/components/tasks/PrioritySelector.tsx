import { AlertCircle, ArrowUp, Equal, ArrowDown, Minus } from 'lucide-react';
import { cn } from '@/lib/cn';
import { TaskPriority, PRIORITY_LABEL } from '@/lib/types';
import { DropdownMenu } from '@/components/ui/DropdownMenu';

/**
 * Semantic priority colors, straight from the spec:
 * No Priority → neutral, Urgent → red, High → orange, Medium → yellow, Low → gray.
 */
const priorityStyle: Record<TaskPriority, { text: string; icon: typeof AlertCircle }> = {
  'no-priority': { text: 'text-muted', icon: Minus },
  urgent: { text: 'text-danger', icon: AlertCircle },
  high: { text: 'text-orange-500', icon: ArrowUp },
  medium: { text: 'text-yellow-500', icon: Equal },
  low: { text: 'text-muted', icon: ArrowDown },
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const { text, icon: Icon } = priorityStyle[priority];
  return (
    <span className={cn('inline-flex items-center gap-1 text-xs font-medium', text)}>
      <Icon className="h-3.5 w-3.5" />
      {PRIORITY_LABEL[priority]}
    </span>
  );
}

interface PrioritySelectorProps {
  value: TaskPriority;
  onChange: (value: TaskPriority) => void;
}

/** Dropdown used in the task form and the task details panel to change priority. */
export function PrioritySelector({ value, onChange }: PrioritySelectorProps) {
  const options: TaskPriority[] = ['no-priority', 'urgent', 'high', 'medium', 'low'];

  return (
    <DropdownMenu
      trigger={
        <button className="flex items-center gap-1.5 rounded-lg border border-border bg-surface px-2.5 py-1.5 hover:bg-surface-hover">
          <PriorityBadge priority={value} />
        </button>
      }
    >
      {(close) =>
        options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              onChange(opt);
              close();
            }}
            className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm hover:bg-surface-hover"
          >
            <PriorityBadge priority={opt} />
          </button>
        ))
      }
    </DropdownMenu>
  );
}
