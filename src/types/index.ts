export type AppStatus = "up" | "degraded" | "down" | "unknown";

export interface AppDefinition {
  id: string;
  name: string;
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

export interface ServiceLink {
  name: string;
  url: string;
  description?: string;
  internal?: boolean;
}

export interface LinkCategory {
  id: string;
  label: string;
  links: ServiceLink[];
}
