'use client';

import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Task } from '@/lib/types';
import { PriorityBadge } from './PrioritySelector';
import { Avatar } from '@/components/ui/Avatar';

interface TaskCardProps {
  task: Task;
}

/**
 * Compact card used on the board. Clicking it navigates to the task
 * details page (/tasks/[id]) — editing/deleting live there rather than
 * cluttering the card with hover actions, matching the spec's flow of
 * "click a card -> full details page".
 */
export function TaskCard({ task }: TaskCardProps) {
  return (
    <Link
      href={`/tasks/${task.id}`}
      className="block rounded-card border border-border bg-surface p-3.5 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <h3 className="text-sm font-medium leading-snug text-ink">{task.title}</h3>

      {task.labels && task.labels.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {task.labels.map((label) => (
            <span
              key={label}
              className="rounded-full bg-surface-hover px-2 py-0.5 text-[11px] font-medium text-muted"
            >
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-center justify-between gap-2">
        <PriorityBadge priority={task.priority} />
        <div className="flex items-center gap-2">
          {task.dueDate && (
            <span className="flex items-center gap-1 text-xs text-muted">
              <Calendar className="h-3.5 w-3.5" />
              {new Date(task.dueDate).toLocaleDateString(undefined, {
                month: 'short',
                day: 'numeric',
              })}
            </span>
          )}
          {task.assignee && <Avatar name={task.assignee} size="sm" />}
        </div>
      </div>
    </Link>
  );
}
