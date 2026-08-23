"use client";

import type { AppDefinition, AppStatus } from "@/types";
import { cn } from "@/lib/utils";
import { brandIconBg } from "@/lib/apps";
import { ArrowUpRight, Lock } from "lucide-react";

const statusConfig: Record<
  AppStatus,
  { label: string; dot: string; bg: string; text: string }
> = {
  up: { label: "Operational", dot: "bg-status-up", bg: "bg-status-up/10", text: "text-status-up" },
  degraded: { label: "Degraded", dot: "bg-status-degraded", bg: "bg-status-degraded/10", text: "text-status-degraded" },
  down: { label: "Unreachable", dot: "bg-status-down", bg: "bg-status-down/10", text: "text-status-down" },
  unknown: { label: "Unknown", dot: "bg-status-unknown", bg: "bg-status-unknown/10", text: "text-status-unknown" },
};

export function AppCard({
  app,
  status,
}: {
  app: AppDefinition;
  status: AppStatus;
}) {
  const iconBg = brandIconBg[app.color] ?? "bg-brand-blue";
  const isClickable = app.url !== null;
  const sc = statusConfig[status];

  const card = (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-200 animate-rise",
        isClickable &&
          "cursor-pointer hover:shadow-raised hover:-translate-y-0.5",
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-white",
            iconBg,
          )}
        >
          {app.initials}
        </div>
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
            sc.bg,
            sc.text,
          )}
        >
          <span className={cn("h-1.5 w-1.5 rounded-full", sc.dot)} />
          {sc.label}
        </span>
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">{app.name}</h2>
          {isClickable ? (
            <ArrowUpRight
              size={14}
              className="text-subtle-foreground opacity-0 transition-opacity group-hover:opacity-100"
            />
          ) : (
            <Lock size={12} className="text-subtle-foreground" />
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {app.description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-md bg-surface-sunken px-2 py-0.5 font-mono text-xs text-subtle-foreground">
          {app.domain}
        </span>
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-sunken px-2 py-0.5 text-xs text-subtle-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  if (!isClickable) return card;

  return (
    <a href={app.url!} target="_blank" rel="noopener noreferrer">
      {card}
    </a>
  );
}
