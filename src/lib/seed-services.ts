import type { CustomService } from "@/types";

const TS = "dzo-acrux.ts.net";

type SeedEntry = Omit<CustomService, "id" | "createdAt">;

export const SEED_SERVICES: Record<string, SeedEntry[]> = {
  kristen: [
    { name: "GitLab", url: "https://glab.nevollo.com", favicon: null, group: "DevOps" },
    { name: "GitLab Registry", url: "https://registry.nevollo.com", favicon: null, group: "DevOps" },
    { name: "Coder", url: "https://clab.nevollo.com", favicon: null, group: "DevOps" },
    { name: "nxConstruct", url: "https://nxc.dxdata.dev", favicon: null, group: "DevOps" },
    { name: "Grafana", url: `https://grafana-tailscale.${TS}`, favicon: null, group: "DevOps" },
    { name: "Headlamp", url: `https://headlamp-tailscale.${TS}`, favicon: null, group: "DevOps" },
    { name: "Rancher", url: `https://rancher-tailscale.${TS}`, favicon: null, group: "DevOps" },
    { name: "MinIO", url: `https://minio-console-tailscale.${TS}`, favicon: null, group: "DevOps" },

    { name: "Trino", url: `https://trino-tailscale.${TS}`, favicon: null, group: "Data Platform" },
    { name: "Superset", url: `https://superset-tailscale.${TS}`, favicon: null, group: "Data Platform" },
    { name: "Dagster", url: `https://dagster-tailscale.${TS}`, favicon: null, group: "Data Platform" },
    { name: "Nessie", url: `https://nessie-tailscale.${TS}`, favicon: null, group: "Data Platform" },
    { name: "OpenMetadata", url: `https://openmetadata-tailscale.${TS}`, favicon: null, group: "Data Platform" },
    { name: "Elementary", url: `https://elementary-tailscale.${TS}`, favicon: null, group: "Data Platform" },

    { name: "Jellyfin", url: `https://jellyfin.${TS}`, favicon: null, group: "Media" },
    { name: "Sonarr", url: `https://sonarr-tailscale.${TS}`, favicon: null, group: "Media" },
    { name: "Radarr", url: `https://radarr-tailscale.${TS}`, favicon: null, group: "Media" },
    { name: "Prowlarr", url: `https://prowlarr-tailscale.${TS}`, favicon: null, group: "Media" },
    { name: "qBittorrent", url: `https://qbittorrent-tailscale.${TS}`, favicon: null, group: "Media" },

    { name: "Minecraft Map", url: "https://mc-map.invo-ke.com", favicon: null, group: "Games" },
    { name: "Minecraft Admin", url: "https://mcc.invo-ke.com", favicon: null, group: "Games" },

    { name: "Ruvocal", url: `https://ruvocal-tailscale.${TS}`, favicon: null, group: "AI & ML" },
    { name: "Qdrant", url: `https://qdrant-tailscale.${TS}`, favicon: null, group: "AI & ML" },
  ],
};
