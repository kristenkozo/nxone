"use client";

import { apps } from "@/lib/apps";
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

export function ConsoleMock({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "overflow-hidden rounded-2xl border border-border bg-card shadow-mock",
        className,
      )}
    >
      <div className="flex h-11 items-center gap-1.5 border-b border-border bg-surface px-4">
        {["bg-brand-rose", "bg-brand-amber", "bg-status-up"].map((c) => (
          <span
            key={c}
            className={cn("h-2.5 w-2.5 rounded-full opacity-30", c)}
          />
        ))}
        <span className="mx-auto rounded-md border border-border bg-card px-3 py-1 font-mono text-[11px] leading-none text-subtle-foreground">
          one.nevollo.com
        </span>
        <span className="w-[46px]" />
      </div>

      <div className="grid grid-cols-[124px_1fr] bg-surface/60">
        <div className="hidden flex-col gap-0.5 border-r border-border p-3 sm:flex">
          {["Overview", "Products", "Services", "Incidents", "Members"].map(
            (l, i) => (
              <span
                key={l}
                className={cn(
                  "flex h-7 items-center rounded-md px-2 text-[11px] font-medium",
                  i === 0
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                )}
              >
                {l}
              </span>
            ),
          )}
        </div>

        <div className="p-4">
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { k: "Services", v: "31" },
              { k: "Operational", v: "29" },
              { k: "p95 latency", v: "142ms" },
            ].map((m) => (
              <div
                key={m.k}
                className="rounded-lg border border-border bg-card px-3 py-2.5"
              >
                <p className="text-[9.5px] font-medium uppercase tracking-[0.1em] text-subtle-foreground">
                  {m.k}
                </p>
                <p className="mt-0.5 font-display text-base font-semibold leading-tight tracking-tight">
                  {m.v}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-2.5 space-y-2">
            {apps.slice(0, 5).map((a) => (
              <div
                key={a.id}
                className="flex h-[46px] items-center gap-2.5 rounded-lg border border-border bg-card px-3"
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-primary-foreground",
                    iconBg[a.color],
                  )}
                >
                  {a.initials}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[11px] font-semibold leading-tight">
                    {a.name}
                  </span>
                  <span className="block truncate font-mono text-[10px] leading-tight text-subtle-foreground">
                    {a.domain}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-status-up/25 bg-status-up/10 px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                  <span className="h-1.5 w-1.5 rounded-full bg-status-up" />
                  Live
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
