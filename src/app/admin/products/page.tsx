"use client";

import { useCallback, useEffect, useState } from "react";
import { apps, brandIconBg } from "@/lib/apps";
import { cn } from "@/lib/utils";
import type { AppStatus, StatusResponse } from "@/types";
import { PageHeader, StatusPill } from "@/components/admin/admin-shell";
import { ArrowUpRight, Lock } from "lucide-react";

export default function ProductsPage() {
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>({});

  const fetchStatus = useCallback(async () => {
    try {
      const res = await fetch("/api/status");
      if (!res.ok) return;
      const data: StatusResponse = await res.json();
      const map: Record<string, AppStatus> = {};
      for (const app of data.apps) map[app.id] = app.status;
      setStatuses(map);
    } catch {}
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, 30_000);
    return () => clearInterval(interval);
  }, [fetchStatus]);

  return (
    <>
      <PageHeader
        title="Products"
        description="All Nevollo products and their current status."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => {
          const bg = brandIconBg[app.color] ?? "bg-brand-blue";
          const status = statuses[app.id] ?? "unknown";

          return (
            <div
              key={app.id}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="mb-4 flex items-center justify-between">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold text-white",
                    bg,
                  )}
                >
                  {app.initials}
                </div>
                <StatusPill status={status} />
              </div>

              <h3 className="font-semibold">{app.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {app.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="font-mono text-xs text-subtle-foreground">
                  {app.domain}
                </span>
                {app.url ? (
                  <a
                    href={app.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-xs text-primary transition-colors hover:text-primary-hover"
                  >
                    Visit <ArrowUpRight size={12} />
                  </a>
                ) : (
                  <span className="flex items-center gap-1 text-xs text-subtle-foreground">
                    <Lock size={12} /> Internal
                  </span>
                )}
              </div>

              <div className="mt-3 flex gap-1.5">
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
        })}
      </div>
    </>
  );
}
