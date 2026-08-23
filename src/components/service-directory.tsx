"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { services, serviceGroups } from "@/lib/apps";
import { cn } from "@/lib/utils";

export function ServiceDirectory() {
  const [group, setGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter(
      (s) =>
        (!group || s.group === group) &&
        (!q || s.name.toLowerCase().includes(q) || s.url.toLowerCase().includes(q)),
    );
  }, [group, query]);

  return (
    <section id="services" className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Internal services</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              The full homelab directory — DevOps, data platform, AI, media and games,
              grouped so you never have to remember a hostname again.
            </p>
          </div>
          <label className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services"
              className="w-full rounded-md border border-border bg-card py-2.5 pl-9 pr-3 text-sm shadow-card outline-none transition-colors placeholder:text-subtle-foreground focus:border-primary"
            />
          </label>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {[null, ...serviceGroups].map((g) => (
            <button
              key={g ?? "all"}
              onClick={() => setGroup(g)}
              className={cn(
                "rounded-full px-4 py-1.5 text-sm font-medium transition-colors",
                group === g
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground shadow-card hover:text-foreground",
              )}
            >
              {g ?? "All"}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service) => (
            <a
              key={service.url}
              href={service.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3.5 shadow-card transition-all hover:-translate-y-0.5 hover:border-border-strong hover:shadow-raised"
            >
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{service.name}</span>
                <span className="mt-0.5 block truncate font-mono text-xs text-subtle-foreground">
                  {service.url.replace("https://", "")}
                </span>
              </span>
              <ArrowUpRight className="size-4 shrink-0 text-subtle-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            No services match that search.
          </p>
        )}
      </div>
    </section>
  );
}
