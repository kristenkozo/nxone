"use client";

import { useState } from "react";
import { services, serviceGroups } from "@/lib/apps";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/admin/admin-shell";
import { ArrowUpRight, Search } from "lucide-react";

export default function ServicesPage() {
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const filtered = services.filter((svc) => {
    const matchesSearch =
      !search ||
      svc.name.toLowerCase().includes(search.toLowerCase()) ||
      svc.url.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = !activeGroup || svc.group === activeGroup;
    return matchesSearch && matchesGroup;
  });

  return (
    <>
      <PageHeader
        title="Services"
        description="Internal services directory across the cluster."
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search size={16} className="text-subtle-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-subtle-foreground"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveGroup(null)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              !activeGroup
                ? "bg-primary text-primary-foreground"
                : "bg-surface-sunken text-muted-foreground hover:text-foreground",
            )}
          >
            All ({services.length})
          </button>
          {serviceGroups.map((group) => {
            const count = services.filter((s) => s.group === group).length;
            return (
              <button
                key={group}
                onClick={() =>
                  setActiveGroup((prev) => (prev === group ? null : group))
                }
                className={cn(
                  "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                  activeGroup === group
                    ? "bg-primary text-primary-foreground"
                    : "bg-surface-sunken text-muted-foreground hover:text-foreground",
                )}
              >
                {group} ({count})
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((svc) => (
          <a
            key={svc.url}
            href={svc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-raised hover:-translate-y-0.5"
          >
            <div>
              <p className="text-sm font-medium">{svc.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {svc.group}
              </p>
            </div>
            <ArrowUpRight
              size={16}
              className="text-subtle-foreground transition-colors group-hover:text-foreground"
            />
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-muted-foreground">
          No services match your search.
        </p>
      )}
    </>
  );
}
