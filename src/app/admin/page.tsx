"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { brandIconBg } from "@/lib/apps";
import { cn } from "@/lib/utils";
import type { AppStatus, StatusResponse, StoredProduct } from "@/types";
import { PageHeader, Panel, StatusPill } from "@/components/admin/admin-shell";
import { Sparkline } from "@/components/admin/sparkline";
import {
  Box,
  Activity,
  Server,
  ArrowUpRight,
  Loader2,
  AlertTriangle,
  ScrollText,
  CheckCircle2,
} from "lucide-react";

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
  const allUp = total > 0 && operational === total;

  const stats = [
    {
      label: "Total Products",
      value: total,
      icon: Box,
      accent: "border-l-brand-blue",
      iconBg: "bg-brand-blue/10 text-brand-blue",
    },
    {
      label: "Operational",
      value: `${operational}/${total}`,
      icon: allUp ? CheckCircle2 : Activity,
      accent: allUp ? "border-l-status-up" : "border-l-status-degraded",
      iconBg: allUp
        ? "bg-status-up/10 text-status-up"
        : "bg-status-degraded/10 text-status-degraded",
    },
    {
      label: "Internal Services",
      value: 21,
      icon: Server,
      accent: "border-l-brand-violet",
      iconBg: "bg-brand-violet/10 text-brand-violet",
    },
  ];

  return (
    <>
      <PageHeader
        title="Overview"
        description="Platform health and product status at a glance."
      />

      {/* Stat cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={cn(
                "rounded-xl border border-border border-l-[3px] bg-card px-5 py-4 shadow-card transition-shadow hover:shadow-raised",
                stat.accent,
              )}
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </span>
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg",
                    stat.iconBg,
                  )}
                >
                  <Icon size={16} />
                </span>
              </div>
              <p className="text-2xl font-bold tabular-nums">{stat.value}</p>
            </div>
          );
        })}
      </div>

      {/* All products */}
      <Panel title="Products">
        {loading ? (
          <div className="flex items-center justify-center py-8 text-muted-foreground">
            <Loader2 size={20} className="animate-spin" />
            <span className="ml-2 text-sm">Loading products...</span>
          </div>
        ) : (
          <div className="divide-y divide-border/50">
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
                  className="group -mx-3 flex items-center gap-4 rounded-lg px-3 py-3 transition-colors hover:bg-surface-sunken/50"
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
                  <Sparkline
                    data={spark}
                    tone={tone}
                    className="hidden sm:inline-block"
                  />
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
        )}
      </Panel>

      {/* Bottom panels */}
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <Panel title="Recent Incidents">
          <div className="flex flex-col items-center justify-center py-10">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-sunken">
              <AlertTriangle size={20} className="text-muted-foreground" />
            </span>
            <p className="text-sm font-medium text-muted-foreground">
              No recent incidents
            </p>
            <p className="mt-1 text-xs text-subtle-foreground">
              Incidents will appear here when reported.
            </p>
          </div>
        </Panel>
        <Panel title="Recent Activity">
          <div className="flex flex-col items-center justify-center py-10">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-sunken">
              <ScrollText size={20} className="text-muted-foreground" />
            </span>
            <p className="text-sm font-medium text-muted-foreground">
              No recent activity
            </p>
            <p className="mt-1 text-xs text-subtle-foreground">
              Admin actions will be logged here.
            </p>
          </div>
        </Panel>
      </div>
    </>
  );
}
