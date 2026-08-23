"use client";

import type { AppDefinition, AppStatus } from "@/types";
import { cn } from "@/lib/utils";
import { StatusDot } from "./status-dot";
import { ExternalLink } from "lucide-react";

const colorMap: Record<string, string> = {
  blue: "from-accent-blue/15 to-accent-blue/5 dark:from-accent-blue/10 dark:to-accent-blue/5",
  indigo: "from-accent-indigo/15 to-accent-indigo/5 dark:from-accent-indigo/10 dark:to-accent-indigo/5",
  violet: "from-accent-violet/15 to-accent-violet/5 dark:from-accent-violet/10 dark:to-accent-violet/5",
  emerald: "from-accent-emerald/15 to-accent-emerald/5 dark:from-accent-emerald/10 dark:to-accent-emerald/5",
  amber: "from-accent-amber/15 to-accent-amber/5 dark:from-accent-amber/10 dark:to-accent-amber/5",
  teal: "from-accent-teal/15 to-accent-teal/5 dark:from-accent-teal/10 dark:to-accent-teal/5",
  rose: "from-accent-rose/15 to-accent-rose/5 dark:from-accent-rose/10 dark:to-accent-rose/5",
};

const iconBgMap: Record<string, string> = {
  blue: "bg-accent-blue",
  indigo: "bg-accent-indigo",
  violet: "bg-accent-violet",
  emerald: "bg-accent-emerald",
  amber: "bg-accent-amber",
  teal: "bg-accent-teal",
  rose: "bg-accent-rose",
};

const initialMap: Record<string, string> = {
  dxdata: "Dx",
  voulix: "Vx",
  nxmcp: "Mc",
  nxcontext: "Cx",
  nxmail: "Mx",
  nxtransit: "Tr",
  neurave: "Nr",
};

export function AppCard({
  app,
  status,
}: {
  app: AppDefinition;
  status: AppStatus;
}) {
  const gradient = colorMap[app.color] ?? colorMap.blue;
  const iconBg = iconBgMap[app.color] ?? iconBgMap.blue;
  const initial = initialMap[app.id] ?? app.name.slice(0, 2);
  const isClickable = app.url !== null;

  const content = (
    <div
      className={cn(
        "group relative flex flex-col gap-4 rounded-xl border border-border-subtle bg-gradient-to-br p-5 transition-all duration-200",
        gradient,
        isClickable && "cursor-pointer hover:border-border hover:shadow-lg hover:-translate-y-0.5",
      )}
      style={{ animation: "grid-fade 0.4s ease-out backwards" }}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-lg text-sm font-bold text-white shadow-sm",
            iconBg,
          )}
        >
          {initial}
        </div>
        <StatusDot status={status} />
      </div>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold">{app.name}</h2>
          {isClickable && (
            <ExternalLink
              size={14}
              className="text-text-faint opacity-0 transition-opacity group-hover:opacity-100"
            />
          )}
        </div>
        <p className="mt-1 text-sm leading-relaxed text-text-muted">
          {app.description}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <span className="rounded-md bg-surface-sunken px-2 py-0.5 font-mono text-xs text-text-faint">
          {app.domain}
        </span>
        {app.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-md bg-surface-sunken px-2 py-0.5 text-xs text-text-faint"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  if (!isClickable) return content;

  return (
    <a href={app.url!} target="_blank" rel="noopener noreferrer">
      {content}
    </a>
  );
}
