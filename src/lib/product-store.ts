import { randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { dirname } from "path";

export interface StoredProduct {
  id: string;
  name: string;
  initials: string;
  description: string;
  tagline: string;
  url: string | null;
  domain: string;
  healthUrl: string | null;
  icon: string;
  color: string;
  tags: string[];
  category: string;
  visible: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

const DB_PATH = process.env.NXONE_PRODUCTS_PATH || "/data/products.json";

function readDb(): StoredProduct[] {
  try {
    if (!existsSync(DB_PATH)) return [];
    return JSON.parse(readFileSync(DB_PATH, "utf-8"));
  } catch {
    return [];
  }
}

function writeDb(products: StoredProduct[]) {
  const dir = dirname(DB_PATH);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(DB_PATH, JSON.stringify(products, null, 2));
}

function generateId(): string {
  return randomBytes(8).toString("hex");
}

function ensureSeeded(): StoredProduct[] {
  let products = readDb();
  if (products.length > 0) return products;

  const now = new Date().toISOString();

  const seedData: Omit<StoredProduct, "createdAt" | "updatedAt">[] = [
    {
      id: "dxdata",
      name: "DXData",
      initials: "Dx",
      description:
        "Enterprise lakehouse platform — SQL worksheets, data catalog, dashboards, and governance",
      tagline: "Enterprise lakehouse platform",
      url: "https://dxdata.dev",
      domain: "dxdata.dev",
      healthUrl: "https://dxdata.dev/api/health",
      icon: "/icons/dxdata.svg",
      color: "blue",
      tags: ["data", "analytics"],
      category: "Data platform",
      visible: true,
      sortOrder: 0,
    },
    {
      id: "voulix",
      name: "Voulix",
      initials: "Vx",
      description:
        "AI-native CRM — Salesforce-grade depth with modern-tool polish",
      tagline: "AI-native CRM",
      url: "https://voulix.com",
      domain: "voulix.com",
      healthUrl: "https://voulix.com",
      icon: "/icons/voulix.svg",
      color: "indigo",
      tags: ["crm", "sales"],
      category: "CRM",
      visible: true,
      sortOrder: 1,
    },
    {
      id: "nxmcp",
      name: "nxMCP",
      initials: "Mc",
      description:
        "MCP server platform — tool registry, Kubernetes management, and admin console",
      tagline: "MCP server platform",
      url: "https://nxmcp.nevollo.com",
      domain: "nxmcp.nevollo.com",
      healthUrl: "https://nxmcp.nevollo.com",
      icon: "/icons/nxmcp.svg",
      color: "violet",
      tags: ["platform", "mcp"],
      category: "Developer platform",
      visible: true,
      sortOrder: 2,
    },
    {
      id: "nxcontext",
      name: "nxContext",
      initials: "Cx",
      description:
        "Codebase knowledge graph — code search, graph traversal, and context packs",
      tagline: "Codebase knowledge graph",
      url: "https://mcp.nevollo.com",
      domain: "mcp.nevollo.com",
      healthUrl: "https://mcp.nevollo.com",
      icon: "/icons/nxcontext.svg",
      color: "emerald",
      tags: ["dev-tools", "search"],
      category: "Developer tools",
      visible: true,
      sortOrder: 3,
    },
    {
      id: "nxmail",
      name: "nxMail",
      initials: "Mx",
      description:
        "Email deliverability platform — transactional email, DKIM/SPF/DMARC, and webhooks",
      tagline: "Email deliverability platform",
      url: "https://nx-mail.com",
      domain: "nx-mail.com",
      healthUrl: "https://nx-mail.com",
      icon: "/icons/nxmail.svg",
      color: "amber",
      tags: ["email", "infrastructure"],
      category: "Email infrastructure",
      visible: true,
      sortOrder: 4,
    },
    {
      id: "nxtransit",
      name: "nxTransit",
      initials: "Tr",
      description:
        "Multimodal transit platform — NJ/NYC real-time departures and trip planning",
      tagline: "Multimodal transit platform",
      url: "https://nxtransit.us",
      domain: "nxtransit.us",
      healthUrl: "https://nxtransit.us",
      icon: "/icons/nxtransit.svg",
      color: "teal",
      tags: ["transit", "maps"],
      category: "Transit",
      visible: true,
      sortOrder: 5,
    },
    {
      id: "neurave",
      name: "Neurave",
      initials: "Nr",
      description:
        "fNIRS neurofeedback platform — real-time brain analysis and adaptive protocols",
      tagline: "fNIRS neurofeedback platform",
      url: "https://neurave.io",
      domain: "neurave.io",
      healthUrl: "https://neurave.io",
      icon: "/icons/neurave.svg",
      color: "rose",
      tags: ["health", "neuroscience"],
      category: "Neuroscience platform",
      visible: true,
      sortOrder: 6,
    },
  ];

  products = seedData.map((data) => ({
    ...data,
    createdAt: now,
    updatedAt: now,
  }));

  try {
    writeDb(products);
  } catch {
    // Build-time or read-only filesystem — return seed data without persisting
  }
  return products;
}

export function getProducts(): StoredProduct[] {
  return ensureSeeded().sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getVisibleProducts(): StoredProduct[] {
  return getProducts().filter((p) => p.visible);
}

export function getProduct(id: string): StoredProduct | undefined {
  return ensureSeeded().find((p) => p.id === id);
}

export function createProduct(
  data: Omit<StoredProduct, "id" | "createdAt" | "updatedAt">,
): StoredProduct {
  const products = ensureSeeded();
  const now = new Date().toISOString();

  const product: StoredProduct = {
    ...data,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  };

  products.push(product);
  writeDb(products);
  return product;
}

export function updateProduct(
  id: string,
  updates: Partial<Omit<StoredProduct, "id" | "createdAt">>,
): StoredProduct | null {
  const products = ensureSeeded();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  products[index] = {
    ...products[index],
    ...updates,
    id: products[index].id,
    createdAt: products[index].createdAt,
    updatedAt: new Date().toISOString(),
  };

  writeDb(products);
  return products[index];
}

export function deleteProduct(id: string): boolean {
  const products = ensureSeeded();
  const filtered = products.filter((p) => p.id !== id);
  if (filtered.length === products.length) return false;
  writeDb(filtered);
  return true;
}

export function reorderProducts(ids: string[]): void {
  const products = ensureSeeded();
  const now = new Date().toISOString();

  for (let i = 0; i < ids.length; i++) {
    const product = products.find((p) => p.id === ids[i]);
    if (product) {
      product.sortOrder = i;
      product.updatedAt = now;
    }
  }

  writeDb(products);
}
