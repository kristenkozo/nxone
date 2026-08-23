"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";
import { LoginDialog } from "@/components/login-dialog";
import { NevolloIcon } from "@/components/nevollo-icon";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LayoutDashboard,
  Box,
  Server,
  AlertTriangle,
  Users,
  ScrollText,
  Settings,
  Search,
  Bell,
  LogOut,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";

const sidebarItems = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin" },
  { key: "products", label: "Products", icon: Box, href: "/admin/products" },
  { key: "services", label: "Services", icon: Server, href: "/admin/services" },
  { key: "incidents", label: "Incidents", icon: AlertTriangle, href: "/admin/incidents" },
  { key: "members", label: "Members", icon: Users, href: "/admin/members" },
  { key: "audit", label: "Audit Log", icon: ScrollText, href: "/admin/audit" },
  { key: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!loading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <NevolloIcon size={48} className="mx-auto mb-6 rounded-xl" />
          <h1 className="mb-2 text-xl font-semibold">Admin Console</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Sign in to access the nxOne admin panel.
          </p>
          <button
            onClick={() => setLoginOpen(true)}
            className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
          >
            Sign In
          </button>
          <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  const activeKey =
    sidebarItems.find((item) => item.href === pathname)?.key ?? "overview";

  return (
    <div className="flex min-h-screen bg-surface-sunken">
      <aside className="hidden w-56 shrink-0 border-r border-border bg-card lg:block">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-2 border-b border-border px-4 py-4">
            <Link href="/" className="flex items-center gap-2">
              <NevolloIcon size={28} />
              <span className="font-display text-sm font-semibold tracking-tight">
                nxOne
              </span>
            </Link>
            <span className="rounded-md bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
              Admin
            </span>
          </div>

          <nav className="flex-1 space-y-0.5 p-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = item.key === activeKey;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-surface-sunken hover:text-foreground",
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-border p-3">
            <Link
              href="/launcher"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft size={14} />
              Back to Launcher
            </Link>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-card px-4 py-3 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-1.5 text-muted-foreground lg:hidden"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="hidden items-center gap-2 rounded-lg bg-surface-sunken px-3 py-1.5 sm:flex">
              <Search size={14} className="text-subtle-foreground" />
              <span className="text-xs text-subtle-foreground">Search...</span>
              <kbd className="rounded border border-border bg-card px-1.5 py-0.5 text-[10px] text-subtle-foreground">
                /
              </kbd>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button className="relative rounded-lg p-1.5 text-muted-foreground transition-colors hover:text-foreground">
              <Bell size={16} />
            </button>
            {user && (
              <div className="flex items-center gap-1.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.slice(0, 2).toUpperCase()}
                </div>
                <button
                  onClick={logout}
                  className="rounded-lg p-1.5 text-subtle-foreground transition-colors hover:text-foreground"
                  title="Sign out"
                >
                  <LogOut size={14} />
                </button>
              </div>
            )}
          </div>
        </header>

        {mobileOpen && (
          <div className="border-b border-border bg-card p-2 lg:hidden">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const active = item.key === activeKey;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors",
                    active
                      ? "bg-primary/10 font-medium text-primary"
                      : "text-muted-foreground hover:bg-surface-sunken",
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        )}

        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex items-start justify-between">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function Panel({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card shadow-card",
        className,
      )}
    >
      {title && (
        <div className="border-b border-border px-5 py-3">
          <h3 className="text-sm font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function StatusPill({
  status,
}: {
  status: "up" | "degraded" | "down" | "unknown";
}) {
  const config = {
    up: { label: "Operational", dot: "bg-status-up", bg: "bg-status-up/10", text: "text-status-up" },
    degraded: { label: "Degraded", dot: "bg-status-degraded", bg: "bg-status-degraded/10", text: "text-status-degraded" },
    down: { label: "Unreachable", dot: "bg-status-down", bg: "bg-status-down/10", text: "text-status-down" },
    unknown: { label: "Unknown", dot: "bg-status-unknown", bg: "bg-status-unknown/10", text: "text-status-unknown" },
  };
  const c = config[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        c.bg,
        c.text,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", c.dot)} />
      {c.label}
    </span>
  );
}
