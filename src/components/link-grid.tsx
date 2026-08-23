"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CustomService } from "@/types";
import { getServices, addService, updateService, deleteService, getGroups, seedIfEmpty } from "@/lib/service-store";
import { SEED_SERVICES } from "@/lib/seed-services";
import { useAuth } from "./auth-provider";
import { ServiceCard } from "./service-card";
import { ServiceDialog } from "./service-dialog";
import { GroupFilter } from "./group-filter";
import { Plus, LayoutGrid } from "lucide-react";

export function LinkGrid() {
  const { user, loading: authLoading } = useAuth();
  const [services, setServices] = useState<CustomService[]>([]);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CustomService | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (authLoading) return;

    if (user && SEED_SERVICES[user]) {
      seedIfEmpty(SEED_SERVICES[user], user);
    }

    setServices(getServices(user));
    setMounted(true);
  }, [user, authLoading]);

  const groups = useMemo(() => getGroups(services), [services]);
  const countByGroup = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const s of services) counts[s.group] = (counts[s.group] || 0) + 1;
    return counts;
  }, [services]);

  const filtered = useMemo(
    () => (activeGroup ? services.filter((s) => s.group === activeGroup) : services),
    [services, activeGroup],
  );

  const refresh = useCallback(() => setServices(getServices(user)), [user]);

  const handleSave = useCallback(
    (data: { name: string; url: string; favicon: string | null; group: string }) => {
      if (editing) {
        updateService(editing.id, data, user);
      } else {
        addService(data, user);
      }
      refresh();
      setDialogOpen(false);
      setEditing(null);
    },
    [editing, refresh, user],
  );

  const handleEdit = useCallback((service: CustomService) => {
    setEditing(service);
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm("Remove this service?")) return;
      deleteService(id, user);
      refresh();
    },
    [refresh, user],
  );

  const handleAdd = useCallback(() => {
    setEditing(null);
    setDialogOpen(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="px-6 pb-12 md:px-8">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LayoutGrid size={16} className="text-text-faint" />
          <h2 className="text-base font-semibold">My Services</h2>
          {services.length > 0 && (
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs text-text-faint">
              {services.length}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 rounded-lg bg-accent-violet px-3 py-1.5 text-xs font-medium text-white transition-colors hover:opacity-90"
        >
          <Plus size={14} />
          Add Service
        </button>
      </div>

      {services.length > 0 && (
        <div className="mb-4">
          <GroupFilter
            groups={groups}
            activeGroup={activeGroup}
            onSelect={setActiveGroup}
            totalCount={services.length}
            countByGroup={countByGroup}
          />
        </div>
      )}

      {filtered.length > 0 ? (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((service, i) => (
            <div key={service.id} style={{ animationDelay: `${i * 40}ms` }}>
              <ServiceCard
                service={service}
                onEdit={() => handleEdit(service)}
                onDelete={() => handleDelete(service.id)}
              />
            </div>
          ))}
        </div>
      ) : services.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border-subtle py-16">
          <LayoutGrid size={32} className="mb-3 text-text-faint" />
          <p className="mb-1 text-sm font-medium text-text-muted">No services yet</p>
          <p className="mb-5 text-xs text-text-faint">
            Add links to your frequently used services and tools.
          </p>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 rounded-lg bg-accent-violet px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-text-faint">
          No services in &quot;{activeGroup}&quot;
        </p>
      )}

      <ServiceDialog
        open={dialogOpen}
        onClose={() => { setDialogOpen(false); setEditing(null); }}
        onSave={handleSave}
        service={editing}
        existingGroups={groups}
      />
    </div>
  );
}
