import { apps } from "./apps";
import type { AppStatus, AppStatusResult, StatusResponse } from "@/types";

const CACHE_TTL_MS = 30_000;
const PROBE_TIMEOUT_MS = 5_000;
const DEGRADED_THRESHOLD_MS = 3_000;

let cachedResponse: StatusResponse | null = null;

async function probeApp(
  healthUrl: string | null,
  id: string,
): Promise<AppStatusResult> {
  const now = new Date().toISOString();

  if (!healthUrl) {
    return { id, status: "unknown", latencyMs: 0, lastChecked: now };
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), PROBE_TIMEOUT_MS);
  const start = performance.now();

  try {
    const res = await fetch(healthUrl, {
      method: "HEAD",
      signal: controller.signal,
      redirect: "follow",
    });

    const latencyMs = Math.round(performance.now() - start);
    let status: AppStatus;

    if (res.ok) {
      status = latencyMs > DEGRADED_THRESHOLD_MS ? "degraded" : "up";
    } else {
      const getRes = await fetch(healthUrl, {
        signal: controller.signal,
        redirect: "follow",
      });
      const getLatency = Math.round(performance.now() - start);
      status = getRes.ok
        ? getLatency > DEGRADED_THRESHOLD_MS
          ? "degraded"
          : "up"
        : "down";
      return { id, status, latencyMs: getLatency, lastChecked: now };
    }

    return { id, status, latencyMs, lastChecked: now };
  } catch {
    const latencyMs = Math.round(performance.now() - start);
    return { id, status: "down", latencyMs, lastChecked: now };
  } finally {
    clearTimeout(timeout);
  }
}

export async function getStatus(): Promise<StatusResponse> {
  if (
    cachedResponse &&
    Date.now() - new Date(cachedResponse.cachedAt).getTime() < CACHE_TTL_MS
  ) {
    return { ...cachedResponse, cached: true };
  }

  const results = await Promise.allSettled(
    apps.map((app) => probeApp(app.healthUrl, app.id)),
  );

  const appStatuses: AppStatusResult[] = results.map((result, i) =>
    result.status === "fulfilled"
      ? result.value
      : {
          id: apps[i].id,
          status: "down" as AppStatus,
          latencyMs: 0,
          lastChecked: new Date().toISOString(),
        },
  );

  cachedResponse = {
    apps: appStatuses,
    cachedAt: new Date().toISOString(),
    cached: false,
  };

  return cachedResponse;
}
