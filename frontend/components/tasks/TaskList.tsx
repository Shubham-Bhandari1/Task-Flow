import Link from 'next/link';
import { Task, STATUS_LABEL } from '@/lib/types';
import { PriorityBadge } from './PrioritySelector';
import { Avatar } from '@/components/ui/Avatar';
import { FieldVisibility } from './FieldSelector';

interface TaskListProps {
  tasks: Task[];
  fields: FieldVisibility;
}

/** The List-view alternative to TaskBoard — a structured table, columns driven by FieldSelector. */
export function TaskList({ tasks, fields }: TaskListProps) {
  return (
    <div className="overflow-x-auto rounded-card border border-border">
      <table className="w-full min-w-[640px] text-sm" aria-label="Task list">
        <thead>
          <tr className="border-b border-border bg-surface-hover text-left text-xs font-medium uppercase tracking-wide text-muted">
            <th scope="col" className="px-4 py-2.5">Title</th>
            {fields.status && <th scope="col" className="px-4 py-2.5">Status</th>}
            {fields.priority && <th scope="col" className="px-4 py-2.5">Priority</th>}
            {fields.members && <th scope="col" className="px-4 py-2.5">Assignee</th>}
            {fields.dueDate && <th scope="col" className="px-4 py-2.5">Due Date</th>}
            {fields.labels && <th scope="col" className="px-4 py-2.5">Labels</th>}
            {fields.reporter && <th scope="col" className="px-4 py-2.5">Reporter</th>}
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id} className="border-b border-border last:border-b-0 hover:bg-surface-hover">
              <td className="px-4 py-2.5">
                <Link href={`/tasks/${task.id}`} className="font-medium text-ink hover:underline">
                  {task.title}
                </Link>
              </td>
              {fields.status && (
                <td className="px-4 py-2.5 text-muted">{STATUS_LABEL[task.status]}</td>
              )}
              {fields.priority && (
                <td className="px-4 py-2.5">
                  <PriorityBadge priority={task.priority} />
                </td>
              )}
              {fields.members && (
                <td className="px-4 py-2.5">
                  {task.assignee ? <Avatar name={task.assignee} size="sm" /> : <span className="text-muted">—</span>}
                </td>
              )}
              {fields.dueDate && (
                <td className="px-4 py-2.5 text-muted">
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
                    : '—'}
                </td>
              )}
              {fields.labels && (
                <td className="px-4 py-2.5">
                  <div className="flex flex-wrap gap-1">
                    {task.labels?.map((l) => (
                      <span key={l} className="rounded-full bg-surface-hover px-2 py-0.5 text-[11px] text-muted">
                        {l}
                      </span>
                    )) ?? <span className="text-muted">—</span>}
                  </div>
                </td>
              )}
              {fields.reporter && (
                <td className="px-4 py-2.5 text-muted">{task.reporter ?? '—'}</td>
              )}
            </tr>
          ))}
          {tasks.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-8 text-center text-muted">
                No tasks match the current filters.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
