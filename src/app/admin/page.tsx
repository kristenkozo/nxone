"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { brandIconBg } from "@/lib/apps";
import { cn } from "@/lib/utils";
import type { AppStatus, StatusResponse, StoredProduct } from "@/types";
import { PageHeader, Panel, StatusPill } from "@/components/admin/admin-shell";
import { Sparkline } from "@/components/admin/sparkline";
import { Box, Activity, Server, ArrowUpRight, Loader2, AlertTriangle, ScrollText } from "lucide-react";

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
    { label: "Total Products", value: total, icon: Box, accent: "border-l-brand-blue" },
    { label: "Operational", value: `${operational}/${total}`, icon: Activity, accent: "border-l-status-up" },
    { label: "Internal Services", value: 21, icon: Server, accent: "border-l-brand-violet" },
  ];

  const degraded = products.filter(
    (p) => (statuses[p.id] ?? "unknown") !== "up",
  );

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
              className={cn(
                "rounded-xl border border-border border-l-[3px] bg-card px-5 py-4 shadow-card",
                stat.accent,
              )}
            >
              <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                <Icon size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
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
        ) : degraded.length === 0 ? (
          <div>
            <div className="flex items-center gap-2 py-2">
              <span className="h-2 w-2 rounded-full bg-status-up animate-status-pulse" />
              <span className="text-sm text-muted-foreground">
                All {products.length} products operational
              </span>
            </div>
            <Link
              href="/admin/products"
              className="mt-3 block text-center text-xs text-primary hover:text-primary-hover"
            >
              View all {products.length} products
            </Link>
          </div>
        ) : (
          <div>
            <div className="divide-y divide-border">
              {degraded.map((app) => {
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
                    className="group flex items-center gap-4 py-3 first:pt-0 last:pb-0 -mx-3 px-3 rounded-lg transition-colors hover:bg-surface-sunken/50"
                  >
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-bold text-white",
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
                        className="rounded-lg p-2 text-subtle-foreground transition-all hover:bg-surface-sunken hover:text-foreground group-hover:text-foreground"
                      >
                        <ArrowUpRight size={15} />
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
            <Link
              href="/admin/products"
              className="mt-3 block text-center text-xs text-primary hover:text-primary-hover"
            >
              View all {products.length} products
            </Link>
          </div>
        )}
      </Panel>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Recent Incidents">
          <div className="flex flex-col items-center justify-center py-8">
            <AlertTriangle size={24} className="mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No recent incidents</p>
          </div>
        </Panel>
        <Panel title="Recent Activity">
          <div className="flex flex-col items-center justify-center py-8">
            <ScrollText size={24} className="mb-2 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No recent activity</p>
          </div>
        </Panel>
      </div>
    </>
  );
}
