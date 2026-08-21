'use client';

import { FormEvent, useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '@/lib/types';
import { toDateInput } from '@/lib/dates';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface TaskFormProps {
  initialTask?: Partial<Task> | null;
  onSubmit: (payload: Partial<Task>) => Promise<void>;
  onCancel: () => void;
}

/** One form for both create and edit — the only difference is whether initialTask is passed. */
export function TaskForm({ initialTask, onSubmit, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(initialTask?.title ?? '');
  const [description, setDescription] = useState(initialTask?.description ?? '');
  const [status, setStatus] = useState<TaskStatus>(initialTask?.status ?? 'todo');
  const [priority, setPriority] = useState<TaskPriority>(initialTask?.priority ?? 'no-priority');
  const [assignee, setAssignee] = useState(initialTask?.assignee ?? '');
  const [labels, setLabels] = useState((initialTask?.labels ?? []).join(', '));
  const [dueDate, setDueDate] = useState(toDateInput(initialTask?.dueDate));
  const [titleError, setTitleError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setTitleError('Title is required');
      return;
    }
    setTitleError('');
    setIsSubmitting(true);
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim() || undefined,
        status,
        priority,
        assignee: assignee.trim() || undefined,
        labels: labels
          .split(',')
          .map((l) => l.trim())
          .filter(Boolean),
        dueDate: dueDate || undefined,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Title"
        placeholder="e.g. Write API documentation"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={titleError}
        autoFocus
      />
      <Textarea
        label="Description"
        placeholder="Add more detail (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <div className="grid grid-cols-2 gap-3">
        <Select label="Status" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="completed">Completed</option>
          <option value="on-hold">On Hold</option>
        </Select>
        <Select
          label="Priority"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TaskPriority)}
        >
          <option value="no-priority">No Priority</option>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input
          label="Assignee"
          placeholder="e.g. Dexter"
          value={assignee}
          onChange={(e) => setAssignee(e.target.value)}
        />
        <Input
          label="Due date"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </div>
      <Input
        label="Labels"
        placeholder="comma-separated, e.g. frontend, urgent"
        value={labels}
        onChange={(e) => setLabels(e.target.value)}
      />

      <div className="mt-2 flex justify-end gap-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {initialTask?.id ? 'Save changes' : 'Create task'}
        </Button>
      </div>
    </form>
  );
}
