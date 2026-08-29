"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  Wrench,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { key: "overview", label: "Overview", icon: LayoutDashboard, href: "/admin" },
  { key: "products", label: "Products", icon: Box, href: "/admin/products" },
  { key: "services", label: "Services", icon: Server, href: "/admin/services" },
  { key: "incidents", label: "Incidents", icon: AlertTriangle, href: "/admin/incidents" },
  { key: "members", label: "Members", icon: Users, href: "/admin/members" },
  { key: "audit", label: "Audit Log", icon: ScrollText, href: "/admin/audit" },
  { key: "settings", label: "Settings", icon: Settings, href: "/admin/settings" },
  { key: "operator", label: "Operator", icon: Wrench, href: "/admin/operator" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
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
            onClick={() => router.push("/login")}
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
    navItems.find((item) => item.href === pathname)?.key ?? "overview";

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center">
              <NevolloIcon size={36} className="transition-transform group-hover:scale-105" />
            </Link>
            <span className="hidden h-6 w-px bg-border sm:block" />
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/launcher"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Launcher
              </Link>
              <Link
                href="/admin"
                className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-foreground"
              >
                Admin
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {user && (
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 rounded-full bg-surface-sunken px-3 py-1.5 text-xs font-medium text-muted-foreground">
                  <User className="size-3.5" />
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : user.username}
                </span>
                <button
                  onClick={logout}
                  className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  title="Sign out"
                >
                  <LogOut className="size-4" />
                </button>
              </div>
            )}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary sm:hidden"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Tab strip */}
      <div className="border-b border-border bg-background">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="-mb-px hidden items-center gap-1 sm:flex" role="tablist">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = item.key === activeKey;
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  role="tab"
                  aria-selected={active}
                  className={cn(
                    "relative flex items-center gap-2 whitespace-nowrap px-3 py-3 text-sm font-medium transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon size={15} />
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {mobileOpen && (
        <div className="border-b border-border bg-background p-2 sm:hidden">
          <nav className="space-y-0.5">
            <Link
              href="/launcher"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary"
            >
              Launcher
            </Link>
            {navItems.map((item) => {
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
                      ? "bg-secondary font-medium text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                  )}
                >
                  <Icon size={16} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}

      <main className="mx-auto max-w-6xl px-6 py-8">{children}</main>
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
    <div className="mb-8 flex items-start justify-between">
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
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
