'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Pencil } from 'lucide-react';
import { SettingsSidebar, SettingsSection } from '@/components/settings/SettingsSidebar';
import { SettingsRow } from '@/components/settings/SettingsRow';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const [section, setSection] = useState<SettingsSection>('profile');
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) router.replace('/login');
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="flex min-h-screen items-center justify-center text-muted">Loading…</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg sm:flex-row">
      <SettingsSidebar active={section} onSelect={setSection} />

      <main className="flex-1 px-6 py-10 sm:px-12">
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-semibold text-ink">
            {section === 'profile' ? 'Profile' : 'Theme'}
          </h1>

          {section === 'profile' ? <ProfileSection /> : <ThemeSection />}
        </div>
      </main>
    </div>
  );
}

function ProfileSection() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.displayName ?? '');
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState(user?.username ?? '');

  return (
    <>
      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface">
        <SettingsRow label="Profile picture">
          <div className="h-9 w-9 overflow-hidden rounded-full bg-gradient-to-br from-primary to-muted" />
        </SettingsRow>

        <SettingsRow label="Email">
          <div className="flex items-center gap-2">
            <span className="text-sm text-ink">
              {user?.isGuest ? 'guest — no email' : 'you@example.com'}
            </span>
            <button
              className="rounded-lg border border-border p-1.5 text-muted hover:bg-surface-hover hover:text-ink"
              aria-label="Edit email"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
          </div>
        </SettingsRow>

        <SettingsRow label="Full name">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-56 bg-input border-transparent"
          />
        </SettingsRow>

        <SettingsRow label="Title" helper="Your job title or role">
          <Input
            placeholder="Designer"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-56 bg-input border-transparent"
          />
        </SettingsRow>

        <SettingsRow label="Username" helper="One word, like a nickname or first name">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-56 bg-input border-transparent"
          />
        </SettingsRow>
      </div>

      <h2 className="mt-10 font-display text-xl font-semibold text-ink">Workspace access</h2>
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface">
        <SettingsRow label="Remove yourself from the workspace">
          <Button
            variant="ghost"
            size="sm"
            className="rounded-full bg-danger-soft text-danger hover:opacity-80"
          >
            Leave Workspace
          </Button>
        </SettingsRow>
      </div>
    </>
  );
}

function ThemeSection() {
  return (
    <p className="mt-6 text-sm text-muted">
      Pick a mode from the &quot;Theme&quot; panel in the sidebar — your choice is
      saved automatically and stays applied after a refresh.
    </p>
  );
}
