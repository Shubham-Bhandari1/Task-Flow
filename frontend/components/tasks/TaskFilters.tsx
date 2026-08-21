import { Filter } from 'lucide-react';
import { DropdownMenu } from '@/components/ui/DropdownMenu';
import { Checkbox } from '@/components/ui/Checkbox';
import { Button } from '@/components/ui/Button';
import { TaskStatus, TaskPriority, STATUS_LABEL, PRIORITY_LABEL } from '@/lib/types';

export interface TaskFilterState {
  statuses: TaskStatus[];
  priorities: TaskPriority[];
  hasDueDate: boolean;
  hasLabels: boolean;
  hasAssignee: boolean;
  hasReporter: boolean;
}

export const EMPTY_FILTERS: TaskFilterState = {
  statuses: [],
  priorities: [],
  hasDueDate: false,
  hasLabels: false,
  hasAssignee: false,
  hasReporter: false,
};

export function isFilterActive(f: TaskFilterState) {
  return (
    f.statuses.length > 0 ||
    f.priorities.length > 0 ||
    f.hasDueDate ||
    f.hasLabels ||
    f.hasAssignee ||
    f.hasReporter
  );
}

const allStatuses: TaskStatus[] = ['todo', 'doing', 'completed', 'on-hold'];
const allPriorities: TaskPriority[] = ['no-priority', 'urgent', 'high', 'medium', 'low'];

interface TaskFiltersProps {
  value: TaskFilterState;
  onChange: (value: TaskFilterState) => void;
}

/**
 * The spec's "Priority / Members / Due Date / Labels / Status / Reporter"
 * filter panel. Members and Labels filter by "has a value at all" rather
 * than a specific person/tag list — a lightweight first pass that's easy
 * to extend into per-value filtering once real user/label data exists.
 */
export function TaskFilters({ value, onChange }: TaskFiltersProps) {
  const toggleStatus = (s: TaskStatus) =>
    onChange({
      ...value,
      statuses: value.statuses.includes(s)
        ? value.statuses.filter((x) => x !== s)
        : [...value.statuses, s],
    });

  const togglePriority = (p: TaskPriority) =>
    onChange({
      ...value,
      priorities: value.priorities.includes(p)
        ? value.priorities.filter((x) => x !== p)
        : [...value.priorities, p],
    });

  return (
    <DropdownMenu
      align="right"
      panelClassName="w-64"
      trigger={
        <Button variant="secondary" size="sm">
          <Filter className="h-3.5 w-3.5" />
          Filter
          {isFilterActive(value) && (
            <span className="ml-1 h-1.5 w-1.5 rounded-full bg-primary" />
          )}
        </Button>
      }
    >
      <div className="flex flex-col gap-3 p-2">
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            Status
          </p>
          <div className="flex flex-col gap-1.5">
            {allStatuses.map((s) => (
              <Checkbox
                key={s}
                label={STATUS_LABEL[s]}
                checked={value.statuses.includes(s)}
                onChange={() => toggleStatus(s)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            Priority
          </p>
          <div className="flex flex-col gap-1.5">
            {allPriorities.map((p) => (
              <Checkbox
                key={p}
                label={PRIORITY_LABEL[p]}
                checked={value.priorities.includes(p)}
                onChange={() => togglePriority(p)}
              />
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted">
            Other
          </p>
          <div className="flex flex-col gap-1.5">
            <Checkbox
              label="Has due date"
              checked={value.hasDueDate}
              onChange={(e) => onChange({ ...value, hasDueDate: e.target.checked })}
            />
            <Checkbox
              label="Has labels"
              checked={value.hasLabels}
              onChange={(e) => onChange({ ...value, hasLabels: e.target.checked })}
            />
            <Checkbox
              label="Has member"
              checked={value.hasAssignee}
              onChange={(e) => onChange({ ...value, hasAssignee: e.target.checked })}
            />
            <Checkbox
              label="Has reporter"
              checked={value.hasReporter}
              onChange={(e) => onChange({ ...value, hasReporter: e.target.checked })}
            />
          </div>
        </div>

        {isFilterActive(value) && (
          <button
            onClick={() => onChange(EMPTY_FILTERS)}
            className="rounded-lg px-2 py-1.5 text-left text-sm text-muted hover:bg-surface-hover hover:text-ink"
          >
            Clear all filters
          </button>
        )}
      </div>
    </DropdownMenu>
  );
}
