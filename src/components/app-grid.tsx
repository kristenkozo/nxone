"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppStatus, StatusResponse, StoredProduct } from "@/types";
import { gridCols } from "@/lib/utils";
import { AppCard } from "./app-card";
import { Activity, Box } from "lucide-react";

const POLL_INTERVAL_MS = 30_000;

export function AppGrid() {
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) return;
        const data: { products: StoredProduct[] } = await res.json();
        if (!cancelled) {
          setProducts(data.products.filter((p) => p.visible));
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
      for (const app of data.apps) {
        map[app.id] = app.status;
      }
      setStatuses(map);
      setLastUpdated(data.cachedAt);
    } catch {
      // Keep stale data on error
    }
  }, []);

  useEffect(() => {
    fetchStatus();
    const interval = setInterval(fetchStatus, POLL_INTERVAL_MS);

    const handleVisibility = () => {
      if (document.visibilityState === "visible") fetchStatus();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [fetchStatus]);

  if (loading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <div className="flex items-start justify-between">
              <div className="h-12 w-12 rounded-xl bg-surface-sunken" />
              <div className="h-6 w-24 rounded-full bg-surface-sunken" />
            </div>
            <div className="mt-5 h-6 w-32 rounded bg-surface-sunken" />
            <div className="mt-3 h-4 w-full rounded bg-surface-sunken" />
            <div className="mt-2 h-4 w-2/3 rounded bg-surface-sunken" />
            <div className="mt-6 border-t border-border pt-4">
              <div className="h-4 w-24 rounded bg-surface-sunken" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
        <Box size={32} className="mb-3 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">
          No products configured
        </p>
        <p className="text-xs text-muted-foreground">
          Products will appear here once added.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-2.5">
        <Activity size={16} className="text-muted-foreground" />
        <h2 className="text-lg font-semibold">Products</h2>
        <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs text-muted-foreground">
          {products.length}
        </span>
      </div>

      <div className={`grid gap-4 ${gridCols(products.length)}`}>
        {products.map((app, i) => (
          <AppCard
            key={app.id}
            app={app}
            status={statuses[app.id] ?? "unknown"}
            index={i}
          />
        ))}
      </div>

      {lastUpdated && (
        <div className="mt-6 flex items-center justify-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-sunken px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-status-up animate-status-pulse" />
            Status checked{" "}
            <time dateTime={lastUpdated}>
              {new Date(lastUpdated).toLocaleTimeString()}
            </time>
          </span>
        </div>
      )}
    </div>
  );
}
