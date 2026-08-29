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

    const uid = user?.username ?? null;
    if (uid && SEED_SERVICES[uid]) {
      seedIfEmpty(SEED_SERVICES[uid], uid);
    }

    setServices(getServices(uid));
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

  const uid = user?.username ?? null;

  const refresh = useCallback(() => setServices(getServices(uid)), [uid]);

  const handleSave = useCallback(
    (data: { name: string; url: string; favicon: string | null; group: string }) => {
      if (editing) {
        updateService(editing.id, data, uid);
      } else {
        addService(data, uid);
      }
      refresh();
      setDialogOpen(false);
      setEditing(null);
    },
    [editing, refresh, uid],
  );

  const handleEdit = useCallback((service: CustomService) => {
    setEditing(service);
    setDialogOpen(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      if (!confirm("Remove this service?")) return;
      deleteService(id, uid);
      refresh();
    },
    [refresh, uid],
  );

  const handleAdd = useCallback(() => {
    setEditing(null);
    setDialogOpen(true);
  }, []);

  if (!mounted) {
    return (
      <div>
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="h-4 w-4 rounded bg-surface-sunken" />
            <div className="h-5 w-28 rounded bg-surface-sunken" />
          </div>
          <div className="h-9 w-28 rounded-xl bg-surface-sunken" />
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="flex animate-pulse items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
            >
              <div className="h-9 w-9 rounded-lg bg-surface-sunken" />
              <div className="flex-1 space-y-2">
                <div className="h-4 w-24 rounded bg-surface-sunken" />
                <div className="h-3 w-32 rounded bg-surface-sunken" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <LayoutGrid size={16} className="text-muted-foreground" />
          <h2 className="text-lg font-semibold">My Services</h2>
          {services.length > 0 && (
            <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs text-muted-foreground">
              {services.length}
            </span>
          )}
        </div>
        <button
          onClick={handleAdd}
          className="interactive flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary-hover active:scale-[0.97]"
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
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-16">
          <LayoutGrid size={32} className="mb-3 text-muted-foreground" />
          <p className="mb-1 text-sm font-medium text-muted-foreground">No services yet</p>
          <p className="mb-5 text-xs text-muted-foreground">
            Add links to your frequently used services and tools.
          </p>
          <button
            onClick={handleAdd}
            className="interactive flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary-hover active:scale-[0.97]"
          >
            <Plus size={16} />
            Add Service
          </button>
        </div>
      ) : (
        <p className="py-8 text-center text-sm text-muted-foreground">
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
