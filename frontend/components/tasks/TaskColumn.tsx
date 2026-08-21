'use client';

import { Plus, MoreHorizontal } from 'lucide-react';
import { Task, TaskStatus, STATUS_LABEL } from '@/lib/types';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
}

const accentDot: Record<TaskStatus, string> = {
  todo: 'bg-muted',
  doing: 'bg-primary',
  completed: 'bg-success',
  'on-hold': 'bg-warning',
};

/** One column of the board. Reusable: TaskBoard just renders four of these, one per status. */
export function TaskColumn({ status, tasks, onAddTask }: TaskColumnProps) {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-3">
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${accentDot[status]}`} />
          <h2 className="font-display text-sm font-semibold text-ink">
            {STATUS_LABEL[status]}
          </h2>
          <span className="text-xs text-muted">{tasks.length}</span>
        </div>
        <button
          className="rounded-lg p-1 text-muted hover:bg-surface-hover hover:text-ink"
          aria-label={`${STATUS_LABEL[status]} column menu`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        <button
          onClick={() => onAddTask(status)}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-left text-sm text-muted transition-colors hover:bg-surface-hover hover:text-ink"
        >
          <Plus className="h-4 w-4" />
          Add Task
        </button>
      </div>
    </div>
  );
}
