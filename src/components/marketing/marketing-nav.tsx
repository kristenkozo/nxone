"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";
import { LoginDialog } from "@/components/login-dialog";
import { ThemeToggle } from "@/components/theme-toggle";
import { brands, brandIconBg } from "@/lib/brands";
import {
  ChevronDown,
  LayoutDashboard,
  Rocket,
  Shield,
  BarChart3,
  Users,
  LogOut,
  User,
} from "lucide-react";

function NavDropdown({
  label,
  children,
  open,
  onToggle,
}: {
  label: string;
  children: React.ReactNode;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        {label}
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={onToggle} />
          <div className="absolute left-0 top-full z-50 mt-2 min-w-[280px] rounded-xl border border-border bg-card p-2 shadow-overlay">
            {children}
          </div>
        </>
      )}
    </div>
  );
}

function DropdownItem({
  href,
  icon: Icon,
  title,
  description,
  onClick,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-surface-sunken"
    >
      <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Icon size={16} />
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </Link>
  );
}

export function MarketingNav() {
  const { user, loading, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggle = (key: string) =>
    setActiveDropdown((prev) => (prev === key ? null : key));
  const close = () => setActiveDropdown(null);

  return (
    <>
      <nav className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
        <div className="flex items-center gap-1 rounded-full border border-border bg-card/80 px-2 py-1.5 shadow-raised backdrop-blur-xl">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full px-3 py-1.5"
          >
            <div className="brand-surface flex h-6 w-6 items-center justify-center rounded-md">
              <span className="text-xs font-bold text-white">n</span>
            </div>
            <span className="font-display text-sm font-semibold tracking-tight">
              nxOne
            </span>
          </Link>

          <div className="hidden items-center md:flex">
            <NavDropdown
              label="Products"
              open={activeDropdown === "products"}
              onToggle={() => toggle("products")}
            >
              <div className="max-h-[320px] overflow-y-auto">
                {brands.map((brand) => {
                  const bg =
                    brandIconBg[brand.color] ?? "bg-brand-blue";
                  return (
                    <a
                      key={brand.slug}
                      href={brand.url ?? "#"}
                      target={brand.url ? "_blank" : undefined}
                      rel={brand.url ? "noopener noreferrer" : undefined}
                      onClick={close}
                      className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-surface-sunken"
                    >
                      <div
                        className={cn(
                          "flex h-8 w-8 items-center justify-center rounded-md text-xs font-bold text-white",
                          bg,
                        )}
                      >
                        {brand.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{brand.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {brand.tagline}
                        </p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </NavDropdown>

            <NavDropdown
              label="nxOne"
              open={activeDropdown === "nxone"}
              onToggle={() => toggle("nxone")}
            >
              <DropdownItem
                href="/launcher"
                icon={Rocket}
                title="Launch Apps"
                description="Access all Nevollo products"
                onClick={close}
              />
              <DropdownItem
                href="/admin"
                icon={LayoutDashboard}
                title="Admin Console"
                description="Manage products and services"
                onClick={close}
              />
              <DropdownItem
                href="/admin"
                icon={BarChart3}
                title="Health Status"
                description="Real-time service monitoring"
                onClick={close}
              />
            </NavDropdown>

            <NavDropdown
              label="Company"
              open={activeDropdown === "company"}
              onToggle={() => toggle("company")}
            >
              <DropdownItem
                href="/"
                icon={Users}
                title="About Nevollo"
                description="Our story and mission"
                onClick={close}
              />
              <DropdownItem
                href="/"
                icon={Shield}
                title="Security"
                description="Trust and compliance"
                onClick={close}
              />
            </NavDropdown>
          </div>

          <div className="flex items-center gap-1 pl-2">
            <ThemeToggle />
            {!loading && (
              user ? (
                <div className="flex items-center gap-1">
                  <Link
                    href="/admin"
                    className="flex items-center gap-1.5 rounded-full bg-surface-sunken px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <User size={13} />
                    {user}
                  </Link>
                  <button
                    onClick={logout}
                    className="rounded-full p-1.5 text-subtle-foreground transition-colors hover:text-foreground"
                    title="Sign out"
                  >
                    <LogOut size={14} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setLoginOpen(true)}
                  className="rounded-full bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  Sign In
                </button>
              )
            )}
          </div>
        </div>
      </nav>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
