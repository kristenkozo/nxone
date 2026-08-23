import type { AppDefinition } from "@/types";

export const apps: AppDefinition[] = [
  {
    id: "dxdata",
    name: "DXData",
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
