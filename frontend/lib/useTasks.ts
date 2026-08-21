'use client';

import { useCallback, useEffect, useState } from 'react';
import { api, ApiError } from './api';
import { Task } from './types';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.get<Task[]>('/tasks');
      setTasks(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const createTask = async (payload: Partial<Task>) => {
    const created = await api.post<Task>('/tasks', payload);
    setTasks((prev) => [created, ...prev]);
    return created;
  };

  const updateTask = async (id: string, payload: Partial<Task>) => {
    let previous: Task[] = [];
    setTasks((prev) => {
      previous = prev;
      return prev.map((t) => (t.id === id ? { ...t, ...payload } : t));
    });
    try {
      const updated = await api.patch<Task>(`/tasks/${id}`, payload);
      setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
      return updated;
    } catch (err) {
      setTasks(previous);
      throw err;
    }
  };

  const deleteTask = async (id: string) => {
    let previous: Task[] = [];
    setTasks((prev) => {
      previous = prev;
      return prev.filter((t) => t.id !== id);
    });
    try {
      await api.delete(`/tasks/${id}`);
    } catch (err) {
      setTasks(previous);
      throw err;
    }
  };

  return { tasks, isLoading, error, refresh, createTask, updateTask, deleteTask };
}
