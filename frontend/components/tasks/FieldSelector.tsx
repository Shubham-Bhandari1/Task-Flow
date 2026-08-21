import { SlidersHorizontal } from 'lucide-react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';

export interface FieldVisibility {
  priority: boolean;
  members: boolean;
  dueDate: boolean;
  labels: boolean;
  status: boolean;
  reporter: boolean;
}

export const DEFAULT_FIELDS: FieldVisibility = {
  priority: true,
  members: true,
  dueDate: true,
  labels: true,
  status: false, // redundant in Board view / grouped List view, off by default
  reporter: false,
};

const fieldLabels: { key: keyof FieldVisibility; label: string }[] = [
  { key: 'priority', label: 'Priority' },
  { key: 'members', label: 'Members' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'labels', label: 'Labels' },
  { key: 'status', label: 'Status' },
  { key: 'reporter', label: 'Reporter' },
];

interface FieldSelectorProps {
  value: FieldVisibility;
  onChange: (value: FieldVisibility) => void;
}

/** Determines which task properties appear as columns in List view. */
export function FieldSelector({ value, onChange }: FieldSelectorProps) {
  return (
    <DropdownMenu
      align="right"
      trigger={
        <Button variant="secondary" size="sm">
          <SlidersHorizontal className="h-3.5 w-3.5" />
          Fields
        </Button>
      }
    >
      <div className="flex flex-col gap-1 p-1">
        {fieldLabels.map(({ key, label }) => (
          <div key={key} className="rounded-lg px-2 py-1.5 hover:bg-surface-hover">
            <Checkbox
              label={label}
              checked={value[key]}
              onChange={(e) => onChange({ ...value, [key]: e.target.checked })}
            />
          </div>
        ))}
      </div>
    </DropdownMenu>
  );
}
