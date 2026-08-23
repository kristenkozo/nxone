"use client";

import { cn } from "@/lib/utils";

interface Props {
  groups: string[];
  activeGroup: string | null;
  onSelect: (group: string | null) => void;
  totalCount: number;
  countByGroup: Record<string, number>;
}

export function GroupFilter({ groups, activeGroup, onSelect, totalCount, countByGroup }: Props) {
  if (groups.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onSelect(null)}
        className={cn(
          "rounded-full px-3 py-1 text-xs font-medium transition-colors",
          activeGroup === null
            ? "bg-accent-violet text-white"
            : "bg-surface-sunken text-text-muted hover:text-text",
        )}
      >
        All ({totalCount})
      </button>
      {groups.map((group) => (
        <button
          key={group}
          onClick={() => onSelect(activeGroup === group ? null : group)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-colors",
            activeGroup === group
              ? "bg-accent-violet text-white"
              : "bg-surface-sunken text-text-muted hover:text-text",
          )}
        >
          {group} ({countByGroup[group] || 0})
        </button>
      ))}
    </div>
  );
}
