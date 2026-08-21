import { Task, TaskStatus } from '@/lib/types';
import { TaskColumn } from './TaskColumn';

const columns: TaskStatus[] = ['todo', 'doing', 'completed', 'on-hold'];

interface TaskBoardProps {
  tasks: Task[];
  onAddTask: (status: TaskStatus) => void;
}

/**
 * Groups the flat task list into the four status columns and lays them
 * out side by side. `overflow-x-auto` on the wrapper is what gives the
 * "horizontal scroll on small screens" behavior from the spec, instead of
 * squeezing columns down to an unusable width.
 */
export function TaskBoard({ tasks, onAddTask }: TaskBoardProps) {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4" role="region" aria-label="Task board">
      {columns.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter((t) => t.status === status)}
          onAddTask={onAddTask}
        />
      ))}
    </div>
  );
}
