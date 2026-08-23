import type { LinkCategory } from "@/types";

const TS = "dzo-acrux.ts.net";

export const linkCategories: LinkCategory[] = [
  {
    id: "devops",
    label: "DevOps & Infrastructure",
    links: [
      { name: "GitLab", url: "https://glab.nevollo.com", description: "Source control & CI/CD" },
      { name: "GitLab Registry", url: "https://registry.nevollo.com", description: "Container images" },
      { name: "Coder", url: "https://clab.nevollo.com", description: "Cloud dev environments" },
      { name: "nxConstruct", url: "https://nxc.dxdata.dev", description: "AI build platform" },
      { name: "Grafana", url: `https://grafana-tailscale.${TS}`, description: "Monitoring dashboards", internal: true },
      { name: "Headlamp", url: `https://headlamp-tailscale.${TS}`, description: "Kubernetes dashboard", internal: true },
      { name: "Rancher", url: `https://rancher-tailscale.${TS}`, description: "Cluster management", internal: true },
      { name: "MinIO", url: `https://minio-console-tailscale.${TS}`, description: "Object storage console", internal: true },
    ],
  },
  {
    id: "data",
    label: "Data Platform",
    links: [
      { name: "Trino", url: `https://trino-tailscale.${TS}`, description: "Distributed SQL engine", internal: true },
      { name: "Superset", url: `https://superset-tailscale.${TS}`, description: "BI & visualization", internal: true },
      { name: "Dagster", url: `https://dagster-tailscale.${TS}`, description: "Data orchestration", internal: true },
      { name: "Nessie", url: `https://nessie-tailscale.${TS}`, description: "Data catalog (Iceberg)", internal: true },
      { name: "OpenMetadata", url: `https://openmetadata-tailscale.${TS}`, description: "Metadata & lineage", internal: true },
      { name: "Elementary", url: `https://elementary-tailscale.${TS}`, description: "Data observability", internal: true },
    ],
  },
  {
    id: "media",
    label: "Media",
    links: [
      { name: "Jellyfin", url: `https://jellyfin.${TS}`, description: "Media server", internal: true },
      { name: "Sonarr", url: `https://sonarr-tailscale.${TS}`, description: "TV series management", internal: true },
      { name: "Radarr", url: `https://radarr-tailscale.${TS}`, description: "Movie management", internal: true },
      { name: "Prowlarr", url: `https://prowlarr-tailscale.${TS}`, description: "Indexer manager", internal: true },
      { name: "qBittorrent", url: `https://qbittorrent-tailscale.${TS}`, description: "Download client", internal: true },
    ],
  },
  {
    id: "games",
    label: "Games",
    links: [
      { name: "Minecraft Map", url: "https://mc-map.invo-ke.com", description: "BlueMap 3D world viewer" },
      { name: "Minecraft Admin", url: "https://mcc.invo-ke.com", description: "Server management panel" },
    ],
  },
  {
    id: "ai",
    label: "AI & ML",
    links: [
      { name: "Ruvocal", url: `https://ruvocal-tailscale.${TS}`, description: "Voice AI platform", internal: true },
      { name: "Qdrant", url: `https://qdrant-tailscale.${TS}`, description: "Vector database", internal: true },
    ],
  },
];
