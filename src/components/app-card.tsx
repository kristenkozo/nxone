"use client";

import { ArrowUpRight, Lock } from "lucide-react";
import type { AppDefinition, AppStatus } from "@/types";
import { StatusPill } from "./status-pill";
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
          "hover:-translate-y-1 hover:border-border-strong hover:shadow-card-hover",
        !clickable && "cursor-default opacity-75",
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
        <StatusPill status={status} />
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

      <div className="mt-6 space-y-2.5 border-t border-border pt-4">
        <span className="block font-mono text-xs text-subtle-foreground">
          {app.domain}
        </span>
        {app.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {app.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Tag>
  );
}
