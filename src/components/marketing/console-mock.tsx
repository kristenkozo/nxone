"use client";

import { cn } from "@/lib/utils";
import { apps, brandIconBg } from "@/lib/apps";

export function ConsoleMock({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "mx-auto max-w-4xl overflow-hidden rounded-xl border border-border-strong bg-card shadow-mock",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-status-down/60" />
          <div className="h-3 w-3 rounded-full bg-status-degraded/60" />
          <div className="h-3 w-3 rounded-full bg-status-up/60" />
        </div>
        <div className="ml-4 flex-1 rounded-md bg-surface-sunken px-3 py-1 text-center">
          <span className="text-xs text-subtle-foreground">
            one.nevollo.com/admin
          </span>
        </div>
      </div>

      <div className="flex min-h-[280px]">
        <div className="hidden w-48 border-r border-border bg-surface-sunken p-3 sm:block">
          <div className="mb-4 flex items-center gap-2 px-2">
            <div className="brand-surface h-6 w-6 rounded-md" />
            <span className="text-xs font-semibold">nxOne</span>
          </div>
          {["Overview", "Products", "Services", "Incidents"].map((item, i) => (
            <div
              key={item}
              className={cn(
                "mb-1 rounded-md px-2 py-1.5 text-xs",
                i === 0
                  ? "bg-primary/10 font-medium text-primary"
                  : "text-muted-foreground",
              )}
            >
              {item}
            </div>
          ))}
        </div>

        <div className="flex-1 p-4">
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { label: "Products", value: "7" },
              { label: "Operational", value: "6" },
              { label: "Services", value: "21" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg border border-border bg-surface p-3"
              >
                <p className="text-xs text-subtle-foreground">{stat.label}</p>
                <p className="mt-1 text-xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-2">
            {apps.slice(0, 4).map((app) => {
              const bg = brandIconBg[app.color] ?? "bg-brand-blue";
              return (
                <div
                  key={app.id}
                  className="flex items-center gap-3 rounded-lg border border-border bg-surface p-2.5"
                >
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold text-white",
                      bg,
                    )}
                  >
                    {app.initials}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-medium">{app.name}</p>
                    <p className="text-[10px] text-subtle-foreground">
                      {app.domain}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-status-up" />
                    <span className="text-[10px] text-muted-foreground">
                      Operational
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
