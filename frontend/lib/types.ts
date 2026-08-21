export type TaskStatus = 'todo' | 'doing' | 'completed' | 'on-hold';
export type TaskPriority = 'no-priority' | 'urgent' | 'high' | 'medium' | 'low';

export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string | null;
  labels?: string[] | null;
  reporter?: string | null;
  dueDate?: string | null;
  subtasks?: Subtask[] | null;
  projectId?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  taskId: string;
  authorId: string;
  authorName: string;
  body: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  color?: string | null;
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  displayName: string;
  isGuest: boolean;
}

export interface TaskSummary {
  total: number;
  todo: number;
  doing: number;
  completed: number;
  onHold: number;
}

export const STATUS_LABEL: Record<TaskStatus, string> = {
  todo: 'To Do',
  doing: 'Doing',
  completed: 'Completed',
  'on-hold': 'On Hold',
};

export const PRIORITY_LABEL: Record<TaskPriority, string> = {
  'no-priority': 'No Priority',
  urgent: 'Urgent',
  high: 'High',
  medium: 'Medium',
  low: 'Low',
};
