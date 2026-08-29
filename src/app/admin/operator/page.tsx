"use client";

import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { StoredProduct } from "@/types";
import { PageHeader } from "@/components/admin/admin-shell";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  EyeOff,
  X,
  Save,
  Loader2,
} from "lucide-react";

const brandIconBg: Record<string, string> = {
  blue: "bg-brand-blue",
  indigo: "bg-brand-indigo",
  violet: "bg-brand-violet",
  emerald: "bg-brand-emerald",
  amber: "bg-brand-amber",
  teal: "bg-brand-teal",
  rose: "bg-brand-rose",
};

const COLOR_OPTIONS = [
  { value: "blue", label: "Blue" },
  { value: "indigo", label: "Indigo" },
  { value: "violet", label: "Violet" },
  { value: "emerald", label: "Emerald" },
  { value: "amber", label: "Amber" },
  { value: "teal", label: "Teal" },
  { value: "rose", label: "Rose" },
];

interface ProductFormData {
  name: string;
  initials: string;
  description: string;
  tagline: string;
  url: string;
  domain: string;
  healthUrl: string;
  color: string;
  tags: string;
  category: string;
  visible: boolean;
  sortOrder: number;
}

const emptyForm: ProductFormData = {
  name: "",
  initials: "",
  description: "",
  tagline: "",
  url: "",
  domain: "",
  healthUrl: "",
  color: "blue",
  tags: "",
  category: "",
  visible: true,
  sortOrder: 999,
};

function formFromProduct(p: StoredProduct): ProductFormData {
  return {
    name: p.name,
    initials: p.initials,
    description: p.description,
    tagline: p.tagline,
    url: p.url ?? "",
    domain: p.domain,
    healthUrl: p.healthUrl ?? "",
    color: p.color,
    tags: p.tags.join(", "),
    category: p.category,
    visible: p.visible,
    sortOrder: p.sortOrder,
  };
}

const inputClass =
  "h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20";
const btnPrimary =
  "rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover disabled:opacity-50";
const btnSecondary =
  "rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-secondary disabled:opacity-50";
const btnDestructive =
  "rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground hover:bg-destructive/90 disabled:opacity-50";

export default function OperatorPage() {
  const [products, setProducts] = useState<StoredProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductFormData>(emptyForm);

  // Delete confirm state
  const [deleteTarget, setDeleteTarget] = useState<StoredProduct | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) return;
      const data = await res.json();
      setProducts(data.products ?? []);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const visibleCount = products.filter((p) => p.visible).length;

  // --- Handlers ---

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  }

  function openEdit(product: StoredProduct) {
    setEditingId(product.id);
    setForm(formFromProduct(product));
    setDialogOpen(true);
  }

  function closeDialog() {
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        name: form.name,
        initials: form.initials,
        description: form.description,
        tagline: form.tagline,
        url: form.url.trim() || null,
        domain: form.domain,
        healthUrl: form.healthUrl.trim() || null,
        icon: "",
        color: form.color,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
        category: form.category,
        visible: form.visible,
        sortOrder: form.sortOrder,
      };

      const url = editingId ? `/api/products/${editingId}` : "/api/products";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        closeDialog();
        await fetchProducts();
      }
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/products/${deleteTarget.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteTarget(null);
        await fetchProducts();
      }
    } finally {
      setDeleting(false);
    }
  }

  async function toggleVisibility(product: StoredProduct) {
    await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !product.visible }),
    });
    await fetchProducts();
  }

  function updateField<K extends keyof ProductFormData>(
    key: K,
    value: ProductFormData[K],
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  // --- Render ---

  if (loading) {
    return (
      <>
        <PageHeader
          title="Operator Console"
          description="Manage products, visibility, and configuration."
        />
        <div className="flex items-center justify-center py-20">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      </>
    );
  }

  return (
    <>
      <PageHeader
        title="Operator Console"
        description="Manage products, visibility, and configuration."
        actions={
          <button className={btnPrimary} onClick={openCreate}>
            <span className="flex items-center gap-2">
              <Plus size={16} />
              Add Product
            </span>
          </button>
        }
      />

      {/* Summary */}
      <div className="mb-6 text-sm text-muted-foreground">
        {products.length} product{products.length !== 1 ? "s" : ""} ({visibleCount}{" "}
        visible)
      </div>

      {/* Product cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products
          .sort((a, b) => a.sortOrder - b.sortOrder)
          .map((product) => {
            const bg = brandIconBg[product.color] ?? "bg-brand-blue";
            return (
              <div
                key={product.id}
                className={cn(
                  "rounded-xl border border-border bg-card p-5 shadow-card transition-opacity",
                  !product.visible && "opacity-60",
                )}
              >
                {/* Header row */}
                <div className="mb-3 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white",
                        bg,
                      )}
                    >
                      {product.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold">{product.name}</p>
                      <p className="truncate text-xs text-muted-foreground">
                        {product.domain}
                      </p>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-md bg-surface-sunken px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                    #{product.sortOrder}
                  </span>
                </div>

                {/* Category */}
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {product.category}
                </p>

                {/* Tags */}
                {product.tags.length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-1">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-medium text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-1 border-t border-border pt-3">
                  <button
                    onClick={() => toggleVisibility(product)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    title={product.visible ? "Hide product" : "Show product"}
                  >
                    {product.visible ? (
                      <Eye size={15} />
                    ) : (
                      <EyeOff size={15} />
                    )}
                  </button>
                  <button
                    onClick={() => openEdit(product)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    title="Edit product"
                  >
                    <Pencil size={15} />
                  </button>
                  <button
                    onClick={() => setDeleteTarget(product)}
                    className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                    title="Delete product"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {products.length === 0 && (
        <div className="rounded-xl border border-border bg-card p-12 text-center shadow-card">
          <p className="text-sm text-muted-foreground">
            No products yet. Click &quot;Add Product&quot; to create one.
          </p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      {dialogOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/50 p-4 pt-[10vh]">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {editingId ? "Edit Product" : "Add Product"}
              </h2>
              <button
                onClick={closeDialog}
                className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Name *
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Product name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              {/* Initials + Color row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Initials * (max 2)
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Dx"
                    maxLength={2}
                    value={form.initials}
                    onChange={(e) => updateField("initials", e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Color *
                  </label>
                  <div className="relative">
                    <select
                      className={cn(inputClass, "appearance-none pr-10")}
                      value={form.color}
                      onChange={(e) => updateField("color", e.target.value)}
                    >
                      {COLOR_OPTIONS.map((c) => (
                        <option key={c.value} value={c.value}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                    <span
                      className={cn(
                        "pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full",
                        brandIconBg[form.color] ?? "bg-brand-blue",
                      )}
                    />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Description *
                </label>
                <textarea
                  className={cn(inputClass, "h-20 resize-none py-3")}
                  placeholder="What does this product do?"
                  value={form.description}
                  onChange={(e) => updateField("description", e.target.value)}
                />
              </div>

              {/* Tagline */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Tagline
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Short tagline"
                  value={form.tagline}
                  onChange={(e) => updateField("tagline", e.target.value)}
                />
              </div>

              {/* Domain + Category row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Domain *
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="example.com"
                    value={form.domain}
                    onChange={(e) => updateField("domain", e.target.value)}
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Category *
                  </label>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="platform"
                    value={form.category}
                    onChange={(e) => updateField("category", e.target.value)}
                  />
                </div>
              </div>

              {/* URL */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  URL (empty = internal)
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="https://..."
                  value={form.url}
                  onChange={(e) => updateField("url", e.target.value)}
                />
              </div>

              {/* Health URL */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Health URL
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="https://example.com/api/health"
                  value={form.healthUrl}
                  onChange={(e) => updateField("healthUrl", e.target.value)}
                />
              </div>

              {/* Tags */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                  Tags (comma-separated)
                </label>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="data, analytics, platform"
                  value={form.tags}
                  onChange={(e) => updateField("tags", e.target.value)}
                />
              </div>

              {/* Sort Order + Visible row */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-muted-foreground">
                    Sort Order
                  </label>
                  <input
                    type="number"
                    className={inputClass}
                    value={form.sortOrder}
                    onChange={(e) =>
                      updateField("sortOrder", parseInt(e.target.value) || 0)
                    }
                  />
                </div>
                <div className="flex items-end pb-2.5">
                  <label className="flex cursor-pointer items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={form.visible}
                      onChange={(e) => updateField("visible", e.target.checked)}
                      className="h-4 w-4 rounded border-border text-primary accent-primary"
                    />
                    <span className="text-sm font-medium">Visible</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Dialog actions */}
            <div className="mt-6 flex items-center justify-end gap-2">
              <button
                className={btnSecondary}
                onClick={closeDialog}
                disabled={saving}
              >
                Cancel
              </button>
              <button
                className={btnPrimary}
                onClick={handleSave}
                disabled={saving || !form.name || !form.initials || !form.description || !form.domain || !form.category}
              >
                <span className="flex items-center gap-2">
                  {saving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  {editingId ? "Save Changes" : "Create Product"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-6 shadow-xl">
            <h3 className="mb-2 text-base font-semibold">Delete Product</h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Are you sure you want to delete{" "}
              <span className="font-medium text-foreground">
                {deleteTarget.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex items-center justify-end gap-2">
              <button
                className={btnSecondary}
                onClick={() => setDeleteTarget(null)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                className={btnDestructive}
                onClick={handleDelete}
                disabled={deleting}
              >
                <span className="flex items-center gap-2">
                  {deleting ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Trash2 size={14} />
                  )}
                  Delete
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
