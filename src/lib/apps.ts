import type { AppDefinition } from "@/types";

export const apps: AppDefinition[] = [
  {
    id: "dxdata",
    name: "DXData",
    initials: "Dx",
    description:
      "Enterprise lakehouse platform — SQL worksheets, data catalog, dashboards, and governance",
    url: "https://dxdata.dev",
    domain: "dxdata.dev",
    healthUrl: "https://dxdata.dev/api/health",
    icon: "/icons/dxdata.svg",
    color: "blue",
    tags: ["data", "analytics"],
  },
  {
    id: "voulix",
    name: "Voulix",
    initials: "Vx",
    description:
      "AI-native CRM — Salesforce-grade depth with modern-tool polish",
    url: "https://voulix.com",
    domain: "voulix.com",
    healthUrl: "https://voulix.com",
    icon: "/icons/voulix.svg",
    color: "indigo",
    tags: ["crm", "sales"],
  },
  {
    id: "nxmcp",
    name: "nxMCP",
    initials: "Mc",
    description:
      "MCP server platform — tool registry, Kubernetes management, and admin console",
    url: "https://nxmcp.nevollo.com",
    domain: "nxmcp.nevollo.com",
    healthUrl: "https://nxmcp.nevollo.com",
    icon: "/icons/nxmcp.svg",
    color: "violet",
    tags: ["platform", "mcp"],
  },
  {
    id: "nxcontext",
    name: "nxContext",
    initials: "Cx",
    description:
      "Codebase knowledge graph — code search, graph traversal, and context packs",
    url: null,
    domain: "internal",
    healthUrl: null,
    icon: "/icons/nxcontext.svg",
    color: "emerald",
    tags: ["dev-tools", "search"],
  },
  {
    id: "nxmail",
    name: "nxMail",
    initials: "Mx",
    description:
      "Email deliverability platform — transactional email, DKIM/SPF/DMARC, and webhooks",
    url: "https://nx-mail.com",
    domain: "nx-mail.com",
    healthUrl: "https://nx-mail.com",
    icon: "/icons/nxmail.svg",
    color: "amber",
    tags: ["email", "infrastructure"],
  },
  {
    id: "nxtransit",
    name: "nxTransit",
    initials: "Tr",
    description:
      "Multimodal transit platform — NJ/NYC real-time departures and trip planning",
    url: "https://nxtransit.us",
    domain: "nxtransit.us",
    healthUrl: "https://nxtransit.us",
    icon: "/icons/nxtransit.svg",
    color: "teal",
    tags: ["transit", "maps"],
  },
  {
    id: "neurave",
    name: "Neurave",
    initials: "Nr",
    description:
      "fNIRS neurofeedback platform — real-time brain analysis and adaptive protocols",
    url: "https://neurave.io",
    domain: "neurave.io",
    healthUrl: "https://neurave.io",
    icon: "/icons/neurave.svg",
    color: "rose",
    tags: ["health", "neuroscience"],
  },
];

export interface InternalService {
  name: string;
  url: string;
  group: string;
}

export const serviceGroups = [
  "DevOps",
  "Data Platform",
  "Media",
  "Monitoring",
  "AI & ML",
] as const;

export const services: InternalService[] = [
  { name: "GitLab", url: "https://glab.nevollo.com", group: "DevOps" },
  { name: "Argo CD", url: "https://argocd-tailscale.dzo-acrux.ts.net", group: "DevOps" },
  { name: "Harbor", url: "https://harbor-tailscale.dzo-acrux.ts.net", group: "DevOps" },
  { name: "Vault", url: "https://vault-tailscale.dzo-acrux.ts.net", group: "DevOps" },
  { name: "Grafana", url: "https://grafana-tailscale.dzo-acrux.ts.net", group: "Monitoring" },
  { name: "Prometheus", url: "https://prometheus-tailscale.dzo-acrux.ts.net", group: "Monitoring" },
  { name: "Alertmanager", url: "https://alertmanager-tailscale.dzo-acrux.ts.net", group: "Monitoring" },
  { name: "Longhorn", url: "https://longhorn-tailscale.dzo-acrux.ts.net", group: "DevOps" },
  { name: "Trino", url: "https://trino-tailscale.dzo-acrux.ts.net", group: "Data Platform" },
  { name: "Superset", url: "https://superset-tailscale.dzo-acrux.ts.net", group: "Data Platform" },
  { name: "OpenMetadata", url: "https://openmetadata-tailscale.dzo-acrux.ts.net", group: "Data Platform" },
  { name: "Dagster", url: "https://dagster-tailscale.dzo-acrux.ts.net", group: "Data Platform" },
  { name: "Nessie", url: "https://nessie-tailscale.dzo-acrux.ts.net", group: "Data Platform" },
  { name: "Elementary", url: "https://elementary-tailscale.dzo-acrux.ts.net", group: "Data Platform" },
  { name: "Jellyfin", url: "https://jellyfin-tailscale.dzo-acrux.ts.net", group: "Media" },
  { name: "Sonarr", url: "https://sonarr-tailscale.dzo-acrux.ts.net", group: "Media" },
  { name: "Radarr", url: "https://radarr-tailscale.dzo-acrux.ts.net", group: "Media" },
  { name: "Prowlarr", url: "https://prowlarr-tailscale.dzo-acrux.ts.net", group: "Media" },
  { name: "qBittorrent", url: "https://qbittorrent-tailscale.dzo-acrux.ts.net", group: "Media" },
  { name: "Ollama", url: "https://ollama-tailscale.dzo-acrux.ts.net", group: "AI & ML" },
  { name: "Open WebUI", url: "https://openwebui-tailscale.dzo-acrux.ts.net", group: "AI & ML" },
];

export const brandIconBg: Record<string, string> = {
  blue: "bg-brand-blue",
  indigo: "bg-brand-indigo",
  violet: "bg-brand-violet",
  emerald: "bg-brand-emerald",
  amber: "bg-brand-amber",
  teal: "bg-brand-teal",
  rose: "bg-brand-rose",
};
