"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { StoredService } from "@/lib/service-store-server";
import { PageHeader, Panel } from "@/components/admin/admin-shell";
import {
  ArrowUpRight,
  Camera,
  Loader2,
  Pencil,
  Plus,
  Search,
  Server,
  Trash2,
  Upload,
  X,
} from "lucide-react";

export default function ServicesPage() {
  const [services, setServices] = useState<StoredService[]>([]);
  const [groups, setGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<StoredService | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const fetchServices = useCallback(async () => {
    try {
      const res = await fetch("/api/services");
      if (!res.ok) return;
      const data = await res.json();
      setServices(data.services);
      setGroups(data.groups);
    } catch {} finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchServices(); }, [fetchServices]);

  const handleDelete = async (id: string) => {
    await fetch(`/api/services/${id}`, { method: "DELETE" });
    setDeleteConfirm(null);
    fetchServices();
  };

  const filtered = services.filter((svc) => {
    const matchesSearch =
      !search ||
      svc.name.toLowerCase().includes(search.toLowerCase()) ||
      svc.url.toLowerCase().includes(search.toLowerCase()) ||
      svc.description.toLowerCase().includes(search.toLowerCase());
    const matchesGroup = !activeGroup || svc.group === activeGroup;
    return matchesSearch && matchesGroup;
  });

  const groupCounts = services.reduce<Record<string, number>>((acc, s) => {
    acc[s.group] = (acc[s.group] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <PageHeader
        title="Services"
        description="Manage internal services across the cluster."
        actions={
          <button
            onClick={() => {
              setEditingService(null);
              setDialogOpen(true);
            }}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            <Plus size={16} />
            Add Service
          </button>
        }
      />

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-border bg-card px-3 py-2">
          <Search size={16} className="text-subtle-foreground" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search services..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-subtle-foreground"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          <button
            onClick={() => setActiveGroup(null)}
            className={cn(
              "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
              !activeGroup
                ? "bg-primary text-primary-foreground"
                : "bg-surface-sunken text-muted-foreground hover:text-foreground",
            )}
          >
            All ({services.length})
          </button>
          {groups.map((group) => (
            <button
              key={group}
              onClick={() =>
                setActiveGroup((prev) => (prev === group ? null : group))
              }
              className={cn(
                "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
                activeGroup === group
                  ? "bg-primary text-primary-foreground"
                  : "bg-surface-sunken text-muted-foreground hover:text-foreground",
              )}
            >
              {group} ({groupCounts[group] || 0})
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12 text-muted-foreground">
          <Loader2 size={20} className="animate-spin" />
          <span className="ml-2 text-sm">Loading services...</span>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((svc) => (
            <div
              key={svc.id}
              className="group relative rounded-xl border border-border bg-card p-4 shadow-card transition-all hover:shadow-raised"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-sunken">
                  {svc.icon ? (
                    <img
                      src={svc.icon}
                      alt=""
                      className="h-full w-full object-contain p-1"
                    />
                  ) : (
                    <Server size={18} className="text-muted-foreground" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium">{svc.name}</p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {svc.description || svc.group}
                  </p>
                </div>
                <a
                  href={svc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-subtle-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
                >
                  <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="mt-3 flex items-center justify-between">
                <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {svc.group}
                </span>
                <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    onClick={() => {
                      setEditingService(svc);
                      setDialogOpen(true);
                    }}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(svc.id)}
                    className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-500/10 hover:text-red-500"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              {deleteConfirm === svc.id && (
                <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-card/95 backdrop-blur-sm">
                  <div className="text-center">
                    <p className="mb-3 text-sm font-medium">
                      Delete {svc.name}?
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleDelete(svc.id)}
                        className="rounded-lg bg-red-500 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12">
          <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-surface-sunken">
            <Server size={20} className="text-muted-foreground" />
          </span>
          <p className="text-sm font-medium text-muted-foreground">
            {search ? "No services match your search." : "No services yet."}
          </p>
        </div>
      )}

      <ServiceDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          setEditingService(null);
        }}
        onSaved={() => {
          setDialogOpen(false);
          setEditingService(null);
          fetchServices();
        }}
        service={editingService}
        existingGroups={groups}
      />
    </>
  );
}

function ServiceDialog({
  open,
  onClose,
  onSaved,
  service,
  existingGroups,
}: {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  service: StoredService | null;
  existingGroups: string[];
}) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setName(service?.name || "");
      setUrl(service?.url || "");
      setGroup(service?.group || "");
      setDescription(service?.description || "");
      setIcon(service?.icon || null);
    }
  }, [open, service]);

  async function handleIconUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      if (res.ok) {
        const { path } = await res.json();
        setIcon(path);
      }
    } catch {} finally {
      setUploading(false);
    }
  }

  async function handleSave() {
    if (!name || !url) return;
    setSaving(true);

    const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    const body = { name, url: normalizedUrl, icon, group: group || "Uncategorized", description };

    try {
      if (service) {
        await fetch(`/api/services/${service.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/services", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      onSaved();
    } catch {} finally {
      setSaving(false);
    }
  }

  if (!open) return null;

  const initials = name ? name.slice(0, 2).toUpperCase() : "?";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
        if (e.key === "Enter" && name && url) handleSave();
      }}
    >
      <div className="w-full max-w-md animate-dropdown origin-center rounded-xl border border-border bg-card shadow-overlay">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold">
            {service ? "Edit Service" : "Add Service"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5">
          {/* Icon */}
          <div className="flex items-center gap-4">
            <div className="group relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-sunken">
              {uploading ? (
                <Loader2 size={18} className="animate-spin text-muted-foreground" />
              ) : icon ? (
                <img src={icon} alt="" className="h-full w-full object-contain p-1.5" />
              ) : (
                <span className="text-sm font-bold text-muted-foreground">
                  {initials}
                </span>
              )}
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center rounded-xl bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Camera className="size-4 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="inline-flex items-center gap-1 rounded-lg border border-border px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                <Upload size={12} />
                Upload icon
              </button>
              {icon && (
                <button
                  type="button"
                  onClick={() => setIcon(null)}
                  className="text-left text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Remove
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleIconUpload}
              className="hidden"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Grafana"
              autoFocus
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              URL
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://grafana.example.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Group
            </label>
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="e.g. DevOps, Monitoring"
              list="admin-service-groups"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
            <datalist id="admin-service-groups">
              {existingGroups.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!url || !name || saving}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {saving ? "Saving..." : service ? "Update" : "Add Service"}
          </button>
        </div>
      </div>
    </div>
  );
}
