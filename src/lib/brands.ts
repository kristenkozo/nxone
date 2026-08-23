export interface Brand {
  slug: string;
  name: string;
  tagline: string;
  initials: string;
  color: string;
  url: string | null;
}

export const brands: Brand[] = [
  { slug: "dxdata", name: "DXData", tagline: "Enterprise lakehouse platform", initials: "Dx", color: "blue", url: "https://dxdata.dev" },
  { slug: "voulix", name: "Voulix", tagline: "AI-native CRM", initials: "Vx", color: "indigo", url: "https://voulix.com" },
  { slug: "nxmcp", name: "nxMCP", tagline: "MCP server platform", initials: "Mc", color: "violet", url: "https://nxmcp.nevollo.com" },
  { slug: "nxcontext", name: "nxContext", tagline: "Codebase knowledge graph", initials: "Cx", color: "emerald", url: null },
  { slug: "nxmail", name: "nxMail", tagline: "Email deliverability platform", initials: "Mx", color: "amber", url: "https://nx-mail.com" },
  { slug: "nxtransit", name: "nxTransit", tagline: "Multimodal transit platform", initials: "Tr", color: "teal", url: "https://nxtransit.us" },
  { slug: "neurave", name: "Neurave", tagline: "fNIRS neurofeedback platform", initials: "Nr", color: "rose", url: "https://neurave.io" },
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
