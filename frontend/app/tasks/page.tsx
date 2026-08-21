'use client';

import { useMemo, useState } from 'react';
import { Search as SearchIcon, Plus } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { TaskBoard } from '@/components/tasks/TaskBoard';
import { TaskList } from '@/components/tasks/TaskList';
import { TaskForm } from '@/components/tasks/TaskForm';
import { FieldSelector, DEFAULT_FIELDS, FieldVisibility } from '@/components/tasks/FieldSelector';
import { TaskFilters, EMPTY_FILTERS, TaskFilterState } from '@/components/tasks/TaskFilters';
import { Toggle } from '@/components/ui/Toggle';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { useTasks } from '@/lib/useTasks';
import { Task, TaskStatus } from '@/lib/types';

type ViewMode = 'board' | 'list';

export default function TasksPage() {
  const { tasks, isLoading, error, createTask } = useTasks();
  const [view, setView] = useState<ViewMode>('board');
  const [search, setSearch] = useState('');
  const [fields, setFields] = useState<FieldVisibility>(DEFAULT_FIELDS);
  const [filters, setFilters] = useState<TaskFilterState>(EMPTY_FILTERS);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('todo');

  // Client-side filtering — search + the filter panel. Small enough dataset
  // that this beats round-tripping to the server on every keystroke.
  const visibleTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          task.title.toLowerCase().includes(q) ||
          task.assignee?.toLowerCase().includes(q) ||
          task.labels?.some((l) => l.toLowerCase().includes(q));
        if (!matches) return false;
      }
      if (filters.statuses.length && !filters.statuses.includes(task.status)) return false;
      if (filters.priorities.length && !filters.priorities.includes(task.priority)) return false;
      if (filters.hasDueDate && !task.dueDate) return false;
      if (filters.hasLabels && !(task.labels && task.labels.length > 0)) return false;
      if (filters.hasAssignee && !task.assignee) return false;
      if (filters.hasReporter && !task.reporter) return false;
      return true;
    });
  }, [tasks, search, filters]);

  const openAddTask = (status: TaskStatus) => {
    setNewTaskStatus(status);
    setModalOpen(true);
  };

  const handleCreate = async (payload: Partial<Task>) => {
    await createTask({ ...payload, status: payload.status ?? newTaskStatus });
    setModalOpen(false);
  };

  return (
    <AppLayout
      title="Tasks"
      headerActions={
        <>
          <div className="relative hidden sm:block">
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              placeholder="Search tasks..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-9 w-48 rounded-lg border border-border bg-surface pl-9 pr-3 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-primary"
            />
          </div>
          {view === 'list' && <FieldSelector value={fields} onChange={setFields} />}
          <TaskFilters value={filters} onChange={setFilters} />
          <Toggle
            value={view}
            onChange={setView}
            options={[
              { value: 'board', label: 'Board' },
              { value: 'list', label: 'List' },
            ]}
          />
          <Button size="sm" onClick={() => openAddTask('todo')}>
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </>
      }
    >
      {isLoading && <p className="text-sm text-muted">Loading tasks…</p>}
      {error && <p className="text-sm text-danger">{error}</p>}

      {!isLoading && !error && (
        <>
          {view === 'board' ? (
            <TaskBoard tasks={visibleTasks} onAddTask={openAddTask} />
          ) : (
            <TaskList tasks={visibleTasks} fields={fields} />
          )}
        </>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="New task">
        <TaskForm
          initialTask={{ status: newTaskStatus }}
          onSubmit={handleCreate}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </AppLayout>
  );
}
