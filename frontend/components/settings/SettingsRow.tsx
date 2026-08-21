import { ReactNode } from 'react';

interface SettingsRowProps {
  label: string;
  helper?: string;
  children: ReactNode;
}

/**
 * Every row in the profile/workspace cards — "Email", "Full name", "Title",
 * etc. — is label + optional helper text on the left, a control on the
 * right, and a hairline divider between rows. One component keeps every
 * row's spacing identical instead of hand-tuning each one.
 */
export function SettingsRow({ label, helper, children }: SettingsRowProps) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-border px-6 py-5 last:border-b-0">
      <div>
        <p className="text-sm font-medium text-ink">{label}</p>
        {helper && <p className="text-sm text-muted">{helper}</p>}
      </div>
      <div className="shrink-0">{children}</div>
    </div>
  );
}
