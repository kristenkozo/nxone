import type { CustomService } from "@/types";

const BASE_KEY = "nxone-services";

function key(user?: string | null) {
  return user ? `${BASE_KEY}-${user}` : BASE_KEY;
}

export function getServices(user?: string | null): CustomService[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key(user));
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function save(services: CustomService[], user?: string | null) {
  localStorage.setItem(key(user), JSON.stringify(services));
}

export function addService(
  data: Omit<CustomService, "id" | "createdAt">,
  user?: string | null,
): CustomService {
  const services = getServices(user);
  const service: CustomService = {
    ...data,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };
  services.push(service);
  save(services, user);
  return service;
}

export function updateService(
  id: string,
  updates: Partial<Omit<CustomService, "id" | "createdAt">>,
  user?: string | null,
) {
  const services = getServices(user);
  const idx = services.findIndex((s) => s.id === id);
  if (idx === -1) return null;
  services[idx] = { ...services[idx], ...updates };
  save(services, user);
  return services[idx];
}

export function deleteService(id: string, user?: string | null) {
  const services = getServices(user).filter((s) => s.id !== id);
  save(services, user);
}

export function getGroups(services: CustomService[]): string[] {
  const groups = new Set(services.map((s) => s.group).filter(Boolean));
  return Array.from(groups).sort();
}

export function seedIfEmpty(
  entries: Omit<CustomService, "id" | "createdAt">[],
  user: string,
) {
  if (getServices(user).length > 0) return;
  for (const entry of entries) addService(entry, user);
}
