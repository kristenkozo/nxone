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
          "rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          activeGroup === null
            ? "bg-primary text-primary-foreground shadow-sm active:scale-[0.97]"
            : "bg-surface-sunken text-muted-foreground hover:text-foreground hover:bg-surface-sunken/80 active:scale-[0.97]",
        )}
      >
        All ({totalCount})
      </button>
      {groups.map((group) => (
        <button
          key={group}
          onClick={() => onSelect(activeGroup === group ? null : group)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            activeGroup === group
              ? "bg-primary text-primary-foreground shadow-sm active:scale-[0.97]"
              : "bg-surface-sunken text-muted-foreground hover:text-foreground hover:bg-surface-sunken/80 active:scale-[0.97]",
          )}
        >
          {group} ({countByGroup[group] || 0})
        </button>
      ))}
    </div>
  );
}
