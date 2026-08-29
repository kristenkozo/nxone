import { randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export interface StoredService {
  id: string;
  name: string;
  url: string;
  icon: string | null;
  group: string;
  description: string;
  visible: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const DB_PATH = process.env.NXONE_SERVICES_PATH || "/data/services.json";

function readDb(): StoredService[] {
  try {
    if (!existsSync(DB_PATH)) return [];
    return JSON.parse(readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeDb(services: StoredService[]) {
  const dir = dirname(DB_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DB_PATH, JSON.stringify(services, null, 2));
}

function generateId(): string {
  return randomBytes(8).toString("hex");
}

const TS = "dzo-acrux.ts.net";

const SEED: Omit<StoredService, "id" | "createdAt" | "updatedAt">[] = [
  { name: "GitLab", url: "https://glab.nevollo.com", icon: null, group: "DevOps", description: "Source control and CI/CD", visible: true, sortOrder: 0 },
  { name: "GitLab Registry", url: "https://registry.nevollo.com", icon: null, group: "DevOps", description: "Container registry", visible: true, sortOrder: 1 },
  { name: "Coder", url: "https://clab.nevollo.com", icon: null, group: "DevOps", description: "Cloud development environments", visible: true, sortOrder: 2 },
  { name: "nxConstruct", url: "https://nxc.dxdata.dev", icon: null, group: "DevOps", description: "Build pipeline manager", visible: true, sortOrder: 3 },
  { name: "Grafana", url: `https://grafana-tailscale.${TS}`, icon: null, group: "Monitoring", description: "Dashboards and alerting", visible: true, sortOrder: 4 },
  { name: "Headlamp", url: `https://headlamp-tailscale.${TS}`, icon: null, group: "DevOps", description: "Kubernetes dashboard", visible: true, sortOrder: 5 },
  { name: "Rancher", url: `https://rancher-tailscale.${TS}`, icon: null, group: "DevOps", description: "Cluster management", visible: true, sortOrder: 6 },
  { name: "MinIO", url: `https://minio-console-tailscale.${TS}`, icon: null, group: "DevOps", description: "Object storage console", visible: true, sortOrder: 7 },
  { name: "Trino", url: `https://trino-tailscale.${TS}`, icon: null, group: "Data Platform", description: "Distributed SQL query engine", visible: true, sortOrder: 8 },
  { name: "Superset", url: `https://superset-tailscale.${TS}`, icon: null, group: "Data Platform", description: "Data visualization", visible: true, sortOrder: 9 },
  { name: "Dagster", url: `https://dagster-tailscale.${TS}`, icon: null, group: "Data Platform", description: "Data orchestration", visible: true, sortOrder: 10 },
  { name: "Nessie", url: `https://nessie-tailscale.${TS}`, icon: null, group: "Data Platform", description: "Data lake catalog (Iceberg)", visible: true, sortOrder: 11 },
  { name: "OpenMetadata", url: `https://openmetadata-tailscale.${TS}`, icon: null, group: "Data Platform", description: "Metadata catalog", visible: true, sortOrder: 12 },
  { name: "Elementary", url: `https://elementary-tailscale.${TS}`, icon: null, group: "Data Platform", description: "Data observability", visible: true, sortOrder: 13 },
  { name: "Jellyfin", url: `https://jellyfin.${TS}`, icon: null, group: "Media", description: "Media streaming server", visible: true, sortOrder: 14 },
  { name: "Sonarr", url: `https://sonarr-tailscale.${TS}`, icon: null, group: "Media", description: "TV series management", visible: true, sortOrder: 15 },
  { name: "Radarr", url: `https://radarr-tailscale.${TS}`, icon: null, group: "Media", description: "Movie management", visible: true, sortOrder: 16 },
  { name: "Prowlarr", url: `https://prowlarr-tailscale.${TS}`, icon: null, group: "Media", description: "Indexer management", visible: true, sortOrder: 17 },
  { name: "qBittorrent", url: `https://qbittorrent-tailscale.${TS}`, icon: null, group: "Media", description: "Download client", visible: true, sortOrder: 18 },
  { name: "Ruvocal", url: `https://ruvocal-tailscale.${TS}`, icon: null, group: "AI & ML", description: "Voice transcription", visible: true, sortOrder: 19 },
  { name: "Qdrant", url: `https://qdrant-tailscale.${TS}`, icon: null, group: "AI & ML", description: "Vector database", visible: true, sortOrder: 20 },
  { name: "Minecraft Map", url: "https://mc-map.invo-ke.com", icon: null, group: "Games", description: "Dynmap world viewer", visible: true, sortOrder: 21 },
  { name: "Minecraft Admin", url: "https://mcc.invo-ke.com", icon: null, group: "Games", description: "Server admin console", visible: true, sortOrder: 22 },
];

function ensureSeeded(): StoredService[] {
  let services = readDb();
  if (services.length > 0) return services;

  const now = new Date().toISOString();
  services = SEED.map((s, i) => ({
    ...s,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }));

  try {
    writeDb(services);
  } catch {}
  return services;
}

export function getServices(): StoredService[] {
  return ensureSeeded().sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getVisibleServices(): StoredService[] {
  return getServices().filter((s) => s.visible);
}

export function getService(id: string): StoredService | undefined {
  return ensureSeeded().find((s) => s.id === id);
}

export function getServiceGroups(): string[] {
  const groups = new Set(getServices().map((s) => s.group));
  return Array.from(groups).sort();
}

export function createService(
  data: Omit<StoredService, "id" | "createdAt" | "updatedAt">,
): StoredService {
  const services = ensureSeeded();
  const now = new Date().toISOString();
  const service: StoredService = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };
  services.push(service);
  writeDb(services);
  return service;
}

export function updateService(
  id: string,
  updates: Partial<Omit<StoredService, "id" | "createdAt">>,
): StoredService | null {
  const services = ensureSeeded();
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) return null;

  services[index] = {
    ...services[index],
    ...updates,
    id: services[index].id,
    createdAt: services[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  writeDb(services);
  return services[index];
}

export function deleteService(id: string): boolean {
  const services = ensureSeeded();
  const filtered = services.filter((s) => s.id !== id);
  if (filtered.length === services.length) return false;
  writeDb(filtered);
  return true;
}
