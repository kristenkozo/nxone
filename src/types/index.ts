export type { StoredProduct } from "@/lib/product-store";
export type { StoredService } from "@/lib/service-store-server";
export type { UserProfile } from "@/lib/users";

export type AppStatus = "up" | "degraded" | "down" | "unknown";

export interface AppDefinition {
  id: string;
  name: string;
  initials: string;
  description: string;
  url: string | null;
  domain: string;
  healthUrl: string | null;
  icon: string;
  color: string;
  tags: string[];
}

export interface AppStatusResult {
  id: string;
  status: AppStatus;
  latencyMs: number;
  lastChecked: string;
}

export interface StatusResponse {
  apps: AppStatusResult[];
  cachedAt: string;
  cached: boolean;
}

export interface CustomService {
  id: string;
  name: string;
  url: string;
  favicon: string | null;
  group: string;
  createdAt: string;
}
