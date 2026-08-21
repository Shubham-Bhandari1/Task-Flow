'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Trash2, Plus, Check, Send } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { PrioritySelector } from '@/components/tasks/PrioritySelector';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Avatar } from '@/components/ui/Avatar';
import { api, ApiError } from '@/lib/api';
import { Task, Comment, STATUS_LABEL, TaskStatus } from '@/lib/types';
import { toDateInput } from '@/lib/dates';
import { useAuth } from '@/context/AuthContext';

export default function TaskDetailsPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const router = useRouter();
  const { user } = useAuth();

  const [task, setTask] = useState<Task | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [reply, setReply] = useState('');
  const [newSubtask, setNewSubtask] = useState('');

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [t, c] = await Promise.all([
          api.get<Task>(`/tasks/${id}`),
          api.get<Comment[]>(`/tasks/${id}/comments`),
        ]);
        if (!cancelled) {
          setTask(t);
          setComments(c);
        }
      } catch (err) {
        if (!cancelled) setError(err instanceof ApiError ? err.message : 'Failed to load task');
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const patch = async (payload: Partial<Task>) => {
    if (!task) return;
    const previous = task;
    setTask({ ...task, ...payload });
    try {
      const updated = await api.patch<Task>(`/tasks/${id}`, payload);
      setTask(updated);
    } catch {
      setTask(previous);
    }
  };

  const deleteTask = async () => {
    await api.delete(`/tasks/${id}`);
    router.push('/tasks');
  };

  const submitReply = async () => {
    if (!reply.trim() || !user) return;
    const created = await api.post<Comment>(`/tasks/${id}/comments`, { body: reply.trim() });
    setComments((prev) => [...prev, created]);
    setReply('');
  };

  const addSubtask = async () => {
    if (!newSubtask.trim() || !task) return;
    const subtasks = [
      ...(task.subtasks ?? []),
      { id: crypto.randomUUID(), title: newSubtask.trim(), done: false },
    ];
    setNewSubtask('');
    await patch({ subtasks });
  };

  const toggleSubtask = async (subtaskId: string) => {
    if (!task) return;
    const subtasks = (task.subtasks ?? []).map((s) =>
      s.id === subtaskId ? { ...s, done: !s.done } : s,
    );
    await patch({ subtasks });
  };

  return (
    <AppLayout title="Task details">
      <button
        onClick={() => router.push('/tasks')}
        className="mb-4 flex items-center gap-1.5 text-sm text-muted hover:text-ink"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to tasks
      </button>

      {isLoading && <p className="text-sm text-muted">Loading…</p>}
      {error && <p className="text-sm text-danger">{error}</p>}

      {task && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
          {/* Main column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-3">
              <input
                value={task.title}
                onChange={(e) => setTask({ ...task, title: e.target.value })}
                onBlur={(e) => patch({ title: e.target.value })}
                className="w-full bg-transparent font-display text-2xl font-semibold text-ink focus:outline-none"
              />
              <Button variant="ghost" size="sm" onClick={deleteTask}>
                <Trash2 className="h-4 w-4 text-danger" />
              </Button>
            </div>

            <Textarea
              placeholder="Add a description..."
              value={task.description ?? ''}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              onBlur={(e) => patch({ description: e.target.value })}
              rows={4}
            />

            {/* Subtasks */}
            <section>
              <h2 className="mb-2 font-display text-sm font-semibold text-ink">Subtasks</h2>
              <div className="flex flex-col gap-1.5">
                {(task.subtasks ?? []).map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleSubtask(s.id)}
                    className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 text-left hover:bg-surface-hover"
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-md border ${
                        s.done ? 'border-ink bg-ink' : 'border-border'
                      }`}
                    >
                      {s.done && <Check className="h-3 w-3 text-bg" />}
                    </span>
                    <span className={`text-sm ${s.done ? 'text-muted line-through' : 'text-ink'}`}>
                      {s.title}
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-2 flex gap-2">
                <Input
                  placeholder="Add a subtask..."
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSubtask()}
                  className="h-9"
                />
                <Button variant="secondary" size="sm" onClick={addSubtask}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </section>

            {/* Comments */}
            <section>
              <h2 className="mb-2 font-display text-sm font-semibold text-ink">Comments</h2>
              <div className="flex flex-col gap-3">
                {comments.map((c) => (
                  <div key={c.id} className="flex gap-2.5">
                    <Avatar name={c.authorName} size="sm" />
                    <div className="min-w-0 flex-1 rounded-card border border-border bg-surface p-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-sm font-medium text-ink">{c.authorName}</span>
                        <span className="text-xs text-muted">
                          {new Date(c.createdAt).toLocaleString(undefined, {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-ink">{c.body}</p>
                    </div>
                  </div>
                ))}
                {comments.length === 0 && (
                  <p className="text-sm text-muted">No comments yet.</p>
                )}
              </div>
              <div className="mt-3 flex gap-2">
                <Input
                  placeholder="Leave a reply..."
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submitReply()}
                  className="h-9"
                />
                <Button variant="secondary" size="sm" onClick={submitReply}>
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </section>
          </div>

          {/* Details panel */}
          <aside className="flex flex-col gap-4 rounded-card border border-border bg-surface p-4 h-fit">
            <h2 className="font-display text-sm font-semibold text-ink">Details</h2>

            <DetailRow label="Status">
              <Select
                value={task.status}
                onChange={(e) => patch({ status: e.target.value as TaskStatus })}
                className="h-8 text-sm"
              >
                {(['todo', 'doing', 'completed', 'on-hold'] as TaskStatus[]).map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABEL[s]}
                  </option>
                ))}
              </Select>
            </DetailRow>

            <DetailRow label="Priority">
              <PrioritySelector value={task.priority} onChange={(priority) => patch({ priority })} />
            </DetailRow>

            <DetailRow label="Assignee">
              <Input
                value={task.assignee ?? ''}
                onChange={(e) => setTask({ ...task, assignee: e.target.value })}
                onBlur={(e) => patch({ assignee: e.target.value })}
                className="h-8 text-sm"
                placeholder="Unassigned"
              />
            </DetailRow>

            <DetailRow label="Due date">
              <Input
                type="date"
                value={toDateInput(task.dueDate)}
                onChange={(e) => patch({ dueDate: e.target.value || null })}
                className="h-8 text-sm"
              />
            </DetailRow>

            <DetailRow label="Labels">
              <Input
                value={(task.labels ?? []).join(', ')}
                onChange={(e) =>
                  setTask({
                    ...task,
                    labels: e.target.value.split(',').map((l) => l.trim()).filter(Boolean),
                  })
                }
                onBlur={(e) =>
                  patch({
                    labels: e.target.value.split(',').map((l) => l.trim()).filter(Boolean),
                  })
                }
                className="h-8 text-sm"
                placeholder="comma-separated"
              />
            </DetailRow>

            <DetailRow label="Reporter">
              <Input
                value={task.reporter ?? ''}
                onChange={(e) => setTask({ ...task, reporter: e.target.value })}
                onBlur={(e) => patch({ reporter: e.target.value })}
                className="h-8 text-sm"
                placeholder="Unset"
              />
            </DetailRow>
          </aside>
        </div>
      )}
    </AppLayout>
  );
}

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{label}</span>
      {children}
    </div>
  );
}
