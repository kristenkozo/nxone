"use client";

import { useState } from "react";
import { linkCategories } from "@/lib/links";
import type { LinkCategory, ServiceLink } from "@/types";
import { ExternalLink, Lock, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

function LinkItem({ link }: { link: ServiceLink }) {
  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-3 rounded-lg border border-border-subtle bg-surface-raised px-3.5 py-2.5 transition-all hover:border-border hover:shadow-sm hover:-translate-y-px"
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium truncate">{link.name}</span>
          {link.internal && (
            <Lock size={11} className="shrink-0 text-text-faint" />
          )}
        </div>
        {link.description && (
          <p className="text-xs text-text-faint truncate">{link.description}</p>
        )}
      </div>
      <ExternalLink
        size={13}
        className="shrink-0 text-text-faint opacity-0 transition-opacity group-hover:opacity-100"
      />
    </a>
  );
}

function CategorySection({ category }: { category: LinkCategory }) {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="mb-3 flex w-full items-center gap-2 text-left"
      >
        <h3 className="text-xs font-semibold uppercase tracking-wider text-text-faint">
          {category.label}
        </h3>
        <div className="h-px flex-1 bg-border-subtle" />
        <ChevronDown
          size={14}
          className={cn(
            "text-text-faint transition-transform",
            !open && "-rotate-90",
          )}
        />
      </button>
      {open && (
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {category.links.map((link) => (
            <LinkItem key={link.url} link={link} />
          ))}
        </div>
      )}
    </div>
  );
}

export function LinkGrid() {
  return (
    <div className="px-6 pb-12 md:px-8">
      <div className="mb-6 flex items-center gap-3">
        <h2 className="text-base font-semibold">All Services</h2>
        <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-xs text-text-faint">
          {linkCategories.reduce((n, c) => n + c.links.length, 0)}
        </span>
      </div>
      <div className="flex flex-col gap-6">
        {linkCategories.map((category) => (
          <CategorySection key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
