"use client";

import { useCallback, useEffect, useState } from "react";
import { brandIconBg } from "@/lib/apps";
import { cn } from "@/lib/utils";
import type { AppStatus, StatusResponse, StoredProduct } from "@/types";
import { PageHeader, Panel, StatusPill } from "@/components/admin/admin-shell";
import { Sparkline } from "@/components/admin/sparkline";
import { Box, Activity, Server, ArrowUpRight, Loader2 } from "lucide-react";

function generateSparkData(len = 12) {
  const base = 90 + Math.random() * 10;
  return Array.from({ length: len }, () =>
    Math.max(0, base + (Math.random() - 0.5) * 20),
  );
}

export default function AdminOverview() {
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>({});
  const [sparkData, setSparkData] = useState<Record<string, number[]>>({});

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) return;
        const data: { products: StoredProduct[] } = await res.json();
        if (!cancelled) {
          setProducts(data.products);
          setSparkData(
            Object.fromEntries(
              data.products.map((p) => [p.id, generateSparkData()]),
            ),
          );
        }
      } catch {
        // Keep empty on error
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

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

  const operational = Object.values(statuses).filter((s) => s === "up").length;
  const total = products.length;

  const stats = [
    { label: "Total Products", value: total, icon: Box },
    { label: "Operational", value: operational, icon: Activity },
    { label: "Internal Services", value: 21, icon: Server },
  ];

  return (
    <>
      <PageHeader
        title="Overview"
        description="Platform health and product status at a glance."
      />

      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-xl border border-border bg-card p-5 shadow-card"
            >
              <div className="mb-3 flex items-center gap-2 text-muted-foreground">
                <Icon size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <p className="text-3xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <Panel title="Products">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 size={20} className="animate-spin" />
            <span className="ml-2 text-sm">Loading products...</span>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {products.map((app) => {
              const status = statuses[app.id] ?? "unknown";
              const bg = brandIconBg[app.color] ?? "bg-brand-blue";
              const spark = sparkData[app.id] ?? [];
              const tone =
                status === "up"
                  ? "up"
                  : status === "degraded"
                    ? "degraded"
                    : status === "down"
                      ? "down"
                      : "neutral";

              return (
                <div
                  key={app.id}
                  className="flex items-center gap-4 py-3 first:pt-0 last:pb-0"
                >
                  <div
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white",
                      bg,
                    )}
                  >
                    {app.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{app.name}</p>
                    <p className="truncate text-xs text-muted-foreground">
                      {app.domain}
                    </p>
                  </div>
                  <Sparkline data={spark} tone={tone} className="hidden sm:inline-block" />
                  <StatusPill status={status} />
                  {app.url && (
                    <a
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-lg p-1.5 text-subtle-foreground transition-colors hover:text-foreground"
                    >
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </Panel>
    </>
  );
}
