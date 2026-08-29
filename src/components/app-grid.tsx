"use client";

import { useCallback, useEffect, useState } from "react";
import type { AppStatus, StatusResponse, StoredProduct } from "@/types";
import { AppCard } from "./app-card";

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

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Status checked{" "}
          <time dateTime={lastUpdated}>
            {new Date(lastUpdated).toLocaleTimeString()}
          </time>
        </p>
      )}
    </div>
  );
}
