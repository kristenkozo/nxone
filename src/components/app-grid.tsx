"use client";

import { useCallback, useEffect, useState } from "react";
import { apps } from "@/lib/apps";
import type { AppStatus, StatusResponse } from "@/types";
import { AppCard } from "./app-card";

const POLL_INTERVAL_MS = 30_000;

export function AppGrid() {
  const [statuses, setStatuses] = useState<Record<string, AppStatus>>({});
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);

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

  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app, i) => (
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
