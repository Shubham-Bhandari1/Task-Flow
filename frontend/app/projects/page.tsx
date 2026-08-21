'use client';

import { useEffect, useState } from 'react';
import { Plus, FolderKanban } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { api, ApiError } from '@/lib/api';
import { Project } from '@/lib/types';

const swatches = ['#4C5FD5', '#E5484D', '#F5A524', '#2B8A4E', '#8B5CF6', '#0EA5E9'];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [color, setColor] = useState(swatches[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    api
      .get<Project[]>('/projects')
      .then(setProjects)
      .catch((err) => setError(err instanceof ApiError ? err.message : 'Failed to load projects'))
      .finally(() => setIsLoading(false));
  }, []);

  const handleCreate = async () => {
    if (!name.trim()) return;
    setIsSubmitting(true);
    try {
      const created = await api.post<Project>('/projects', { name: name.trim(), color });
      setProjects((prev) => [...prev, created]);
      setName('');
      setModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AppLayout
      title="Projects"
      headerActions={
        <Button size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      }
    >
      {isLoading && <p className="text-sm text-muted">Loading…</p>}
      {error && <p className="text-sm text-danger">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div
              key={project.id}
              className="flex items-center gap-3 rounded-card border border-border bg-surface p-4 shadow-card"
            >
              <span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${project.color ?? '#999'}22`, color: project.color ?? undefined }}
              >
                <FolderKanban className="h-4 w-4" />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{project.name}</p>
                <p className="text-xs text-muted">
                  Created {new Date(project.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="col-span-full rounded-card border border-dashed border-border p-8 text-center text-sm text-muted">
              No projects yet. Create one to start grouping tasks.
            </div>
          )}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="New project">
        <div className="flex flex-col gap-4">
          <Input
            label="Name"
            placeholder="e.g. Website Redesign"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div>
            <p className="mb-1.5 text-sm font-medium text-ink">Color</p>
            <div className="flex gap-2">
              {swatches.map((c) => (
                <button
                  key={c}
                  onClick={() => setColor(c)}
                  className="h-7 w-7 rounded-full border-2 transition-transform hover:scale-110"
                  style={{ backgroundColor: c, borderColor: color === c ? 'rgb(var(--color-ink))' : 'transparent' }}
                  aria-label={`Choose color ${c}`}
                />
              ))}
            </div>
          </div>
          <div className="mt-2 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} isLoading={isSubmitting}>
              Create project
            </Button>
          </div>
        </div>
      </Modal>
    </AppLayout>
  );
}
