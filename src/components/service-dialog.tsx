"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CustomService } from "@/types";
import { Loader2, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

const ACCENT_COLORS = [
  "bg-accent-blue",
  "bg-accent-indigo",
  "bg-accent-violet",
  "bg-accent-emerald",
  "bg-accent-amber",
  "bg-accent-teal",
  "bg-accent-rose",
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
    } catch {
      // Silent
    }
    setFetching(false);
  }, [fetching, name]);

  const handleUrlBlur = () => {
    if (url && !fetchedOnce) fetchSiteInfo(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 500_000) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (file.type === "image/svg+xml") {
        setFavicon(reader.result as string);
        return;
      }
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, 64, 64);
        setFavicon(canvas.toDataURL("image/png"));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

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
      <div className="w-full max-w-md rounded-xl border border-border bg-surface-raised shadow-2xl">
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h2 className="text-base font-semibold">
            {service ? "Edit Service" : "Add Service"}
          </h2>
          <button onClick={onClose} className="rounded-md p-1 text-text-faint hover:text-text">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">URL</label>
            <input
              ref={urlRef}
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onBlur={handleUrlBlur}
              placeholder="https://example.com"
              className="w-full rounded-lg border border-border-subtle bg-surface-sunken px-3 py-2 text-sm outline-none transition-colors focus:border-accent-violet"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Service"
              className="w-full rounded-lg border border-border-subtle bg-surface-sunken px-3 py-2 text-sm outline-none transition-colors focus:border-accent-violet"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Group</label>
            <input
              type="text"
              value={group}
              onChange={(e) => setGroup(e.target.value)}
              placeholder="e.g. DevOps, Media, Data"
              list="service-groups"
              className="w-full rounded-lg border border-border-subtle bg-surface-sunken px-3 py-2 text-sm outline-none transition-colors focus:border-accent-violet"
            />
            <datalist id="service-groups">
              {existingGroups.map((g) => (
                <option key={g} value={g} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Icon</label>
            <div className="flex items-center gap-3">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border-subtle bg-surface-sunken">
                {fetching ? (
                  <Loader2 size={18} className="animate-spin text-text-faint" />
                ) : favicon ? (
                  <img src={favicon} alt="" className="h-full w-full object-contain p-1" />
                ) : (
                  <span className={cn("flex h-full w-full items-center justify-center text-sm font-bold text-white", initialsColor(name || "?"))}>
                    {initials}
                  </span>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-border hover:text-text"
                >
                  <Upload size={12} className="mr-1 inline" />
                  Upload
                </button>
                {!fetchedOnce && url && (
                  <button
                    type="button"
                    onClick={() => fetchSiteInfo(url)}
                    disabled={fetching}
                    className="rounded-lg border border-border-subtle px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:border-border hover:text-text disabled:opacity-50"
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

        <div className="flex justify-end gap-2 border-t border-border-subtle px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!url || !name}
            className="rounded-lg bg-accent-violet px-4 py-2 text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-40"
          >
            {service ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}
