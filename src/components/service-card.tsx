"use client";

import type { CustomService } from "@/types";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
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

function getDomain(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

interface Props {
  service: CustomService;
  onEdit: () => void;
  onDelete: () => void;
}

export function ServiceCard({ service, onEdit, onDelete }: Props) {
  const initials = service.name.slice(0, 2).toUpperCase();

  return (
    <a
      href={service.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 transition-all hover:border-border-strong hover:shadow-sm hover:-translate-y-px"
      style={{ animation: "grid-fade 0.3s ease-out backwards" }}
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg">
        {service.favicon ? (
          <img src={service.favicon} alt="" className="h-9 w-9 object-contain" />
        ) : (
          <span className={cn("flex h-9 w-9 items-center justify-center rounded-lg text-xs font-bold text-white", initialsColor(service.name))}>
            {initials}
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="truncate text-sm font-medium">{service.name}</span>
          <ExternalLink
            size={12}
            className="shrink-0 text-subtle-foreground opacity-0 transition-opacity group-hover:opacity-100"
          />
        </div>
        <div className="flex items-center gap-1.5 text-xs text-subtle-foreground">
          <span className="truncate">{getDomain(service.url)}</span>
          {service.group && service.group !== "Uncategorized" && (
            <>
              <span>·</span>
              <span className="truncate">{service.group}</span>
            </>
          )}
        </div>
      </div>

      <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onEdit(); }}
          className="rounded-md p-2 -m-0.5 text-subtle-foreground transition-colors hover:bg-surface-sunken hover:text-foreground"
          title="Edit"
        >
          <Pencil size={14} />
        </button>
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); onDelete(); }}
          className="rounded-md p-2 -m-0.5 text-subtle-foreground transition-colors hover:bg-surface-sunken hover:text-status-down"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </a>
  );
}
