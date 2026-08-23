import type { CustomService } from "@/types";

const STORAGE_KEY = "nxone-services";

export function getServices(): CustomService[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(services: CustomService[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}

export function addService(data: Omit<CustomService, "id" | "createdAt">): CustomService {
  const services = getServices();
  const service: CustomService = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  services.push(service);
  save(services);
  return service;
}

export function updateService(id: string, updates: Partial<Omit<CustomService, "id" | "createdAt">>) {
  const services = getServices();
  const idx = services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  services[idx] = { ...services[idx], ...updates };
  save(services);
  return services[idx];
}

export function deleteService(id: string) {
  const services = getServices().filter((s) => s.id !== id);
  save(services);
}

export function getGroups(services: CustomService[]): string[] {
  const groups = new Set(services.map((s) => s.group).filter(Boolean));
  return Array.from(groups).sort();
}
