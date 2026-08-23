"use client";

import type { AppStatus } from "@/types";
import { cn } from "@/lib/utils";

const statusConfig: Record<AppStatus, { bg: string; label: string }> = {
  up: { bg: "bg-status-up", label: "Operational" },
  degraded: { bg: "bg-status-degraded", label: "Degraded" },
  down: { bg: "bg-status-down", label: "Down" },
  unknown: { bg: "bg-status-unknown", label: "Unknown" },
};

export function StatusDot({ status }: { status: AppStatus }) {
  const config = statusConfig[status];

  return (
    <span className="relative flex items-center gap-1.5" title={config.label}>
      <span className="relative flex h-2.5 w-2.5">
        {status === "up" && (
          <span
            className={cn(
              "absolute inset-0 rounded-full opacity-75",
              config.bg,
            )}
            style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
          />
        )}
        <span
          className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", config.bg)}
        />
      </span>
      <span className="text-xs text-text-faint">{config.label}</span>
    </span>
  );
}
