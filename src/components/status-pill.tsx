"use client";

import { cn } from "@/lib/utils";

const statusConfig = {
  up: {
    label: "Operational",
    dot: "bg-status-up",
    bg: "bg-status-up/10",
    text: "text-status-up",
  },
  degraded: {
    label: "Degraded",
    dot: "bg-status-degraded",
    bg: "bg-status-degraded/10",
    text: "text-status-degraded",
  },
  down: {
    label: "Unreachable",
    dot: "bg-status-down",
    bg: "bg-status-down/10",
    text: "text-status-down",
  },
  unknown: {
    label: "Unknown",
    dot: "bg-status-unknown",
    bg: "bg-status-unknown/10",
    text: "text-status-unknown",
  },
};

export { statusConfig };

export function StatusPill({
  status,
}: {
  status: "up" | "degraded" | "down" | "unknown";
}) {
  const c = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        c.bg,
        c.text,
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          c.dot,
          status === "up" && "animate-status-pulse",
        )}
      />
      {c.label}
    </span>
  );
}
