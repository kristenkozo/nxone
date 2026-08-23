"use client";

import { ArrowUpRight, Lock } from "lucide-react";
import type { AppDefinition, AppStatus } from "@/types";
import { cn } from "@/lib/utils";

const iconBg: Record<string, string> = {
  blue: "bg-brand-blue",
  indigo: "bg-brand-indigo",
  violet: "bg-brand-violet",
  emerald: "bg-brand-emerald",
  amber: "bg-brand-amber",
  teal: "bg-brand-teal",
  rose: "bg-brand-rose",
};

const statusLabel: Record<AppStatus, string> = {
  up: "Operational",
  degraded: "Degraded",
  down: "Unreachable",
  unknown: "Internal",
};

const statusColor: Record<AppStatus, string> = {
  up: "bg-status-up",
  degraded: "bg-status-degraded",
  down: "bg-status-down",
  unknown: "bg-status-unknown",
};

export function AppCard({
  app,
  status,
  index = 0,
}: {
  app: AppDefinition;
  status: AppStatus;
  index?: number;
}) {
  const clickable = app.url !== null;
  const Tag = clickable ? "a" : "div";

  return (
    <Tag
      {...(clickable
        ? { href: app.url!, target: "_blank", rel: "noreferrer" }
        : {})}
      className={cn(
        "animate-rise group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-200",
        clickable &&
          "hover:-translate-y-1 hover:border-border-strong hover:shadow-raised",
      )}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between">
        <span
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold text-primary-foreground",
            iconBg[app.color],
          )}
        >
          {app.initials}
        </span>
        <span className="flex items-center gap-2 rounded-full bg-surface-sunken px-2.5 py-1 text-xs font-medium text-muted-foreground">
          <span
            className={cn("h-1.5 w-1.5 rounded-full", statusColor[status])}
          />
          {statusLabel[status]}
        </span>
      </div>

      <h3 className="mt-5 flex items-center gap-1.5 text-xl font-semibold">
        {app.name}
        {clickable ? (
          <ArrowUpRight className="size-4 text-subtle-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        ) : (
          <Lock className="size-3.5 text-subtle-foreground" />
        )}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {app.description}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-4">
        <span className="font-mono text-xs text-subtle-foreground">
          {app.domain}
        </span>
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </Tag>
  );
}
