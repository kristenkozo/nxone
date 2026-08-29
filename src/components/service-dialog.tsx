"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CustomService } from "@/types";
import { Camera, Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = [
  "bg-brand-blue",
  "bg-brand-indigo",
  "bg-brand-violet",
  "bg-brand-emerald",
  "bg-brand-amber",
  "bg-brand-teal",
  "bg-brand-rose",
];

function initialsColor(name: string) {
  let hash = 0;
  for (const c of name) hash = ((hash << 5) - hash + c.charCodeAt(0)) | 0;
  return ACCENT_COLORS[Math.abs(hash) % ACCENT_COLORS.length];
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: { name: string; url: string; favicon: string | null; group: string }) => void;
  service?: CustomService | null;
  existingGroups: string[];
}

export function ServiceDialog({ open, onClose, onSave, service, existingGroups }: Props) {
  const [url, setUrl] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [favicon, setFavicon] = useState<string | null>(null);
  const [fetching, setFetching] = useState(false);
  const [fetchedOnce, setFetchedOnce] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setUrl(service?.url || "");
      setName(service?.name || "");
      setGroup(service?.group || "");
      setFavicon(service?.favicon || null);
      setFetchedOnce(!!service);
      setTimeout(() => urlRef.current?.focus(), 50);
    }
  }, [open, service]);

  const fetchSiteInfo = useCallback(async (targetUrl: string) => {
    if (!targetUrl || fetching) return;
    setFetching(true);
    try {
      const res = await fetch(`/api/site-info?url=${encodeURIComponent(targetUrl)}`);
      const data = await res.json();
      if (data.title && !name) setName(data.title);
      if (data.favicon) setFavicon(data.favicon);
      setFetchedOnce(true);
    } catch {}
    setFetching(false);
  }, [fetching, name]);

  const handleUrlBlur = () => {
    if (url && !fetchedOnce) fetchSiteInfo(url);
  };

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file || file.size > 2_000_000) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      if (res.ok) {
        const { path } = await res.json();
        setFavicon(path);
      }
    } catch {} finally {
      setUploading(false);
    }
  }

  const handleSave = () => {
    if (!url || !name) return;
    const normalizedUrl = /^https?:\/\//i.test(url) ? url : `https://${url}`;
    onSave({ name, url: normalizedUrl, favicon, group: group || "Uncategorized" });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "Enter" && url && name) handleSave();
  };

  if (!open) return null;

  const initials = name ? name.slice(0, 2).toUpperCase() : "?";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      onKeyDown={handleKeyDown}
    >
      <div className="w-full max-w-md animate-dropdown origin-center rounded-xl border border-border bg-card shadow-overlay">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-base font-semibold">
            {service ? "Edit Service" : "Add Service"}
          </h2>
          <button onClick={onClose} className="rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5">
          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">URL</label>
            <input
              ref={urlRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={handleUrlBlur}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Service"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Group</label>
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="e.g. DevOps, Media, Data"
              list="service-groups"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
            />
            <datalist id="service-groups">
              {existingGroups.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mb-1.5 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">Icon</label>
            <div className="flex items-center gap-3">
              <div className="group relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-surface-sunken">
                {fetching || uploading ? (
                  <Loader2 size={18} className="animate-spin text-muted-foreground" />
                ) : favicon ? (
                  <img src={favicon} alt="" className="h-full w-full object-contain p-1" />
                ) : (
                  <span className={cn("flex h-full w-full items-center justify-center text-sm font-bold text-white", initialsColor(name || "?"))}>
                    {initials}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Camera className="size-3.5 text-white" />
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <Upload size={12} />
                  Upload
                </button>
                {!fetchedOnce && url && (
                  <button
                    type="button"
                    onClick={() => fetchSiteInfo(url)}
                    disabled={fetching}
                    className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                  >
                    Fetch
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
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
            disabled={!url || !name}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
          >
            {service ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
