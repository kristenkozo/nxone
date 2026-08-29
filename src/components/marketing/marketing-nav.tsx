"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth-provider";
import { LoginDialog } from "@/components/login-dialog";
import { NevolloIcon } from "@/components/nevollo-icon";
import { brandIconBg } from "@/lib/brands";

interface BrandItem {
  slug: string;
  name: string;
  tagline: string;
  initials: string;
  color: string;
  url: string | null;
}
import {
  Activity,
  ArrowRight,
  BookOpen,
  Building2,
  ChevronDown,
  CircleHelp,
  Command,
  History,
  LayoutGrid,
  MailOpen,
  Menu,
  Newspaper,
  Plug,
  ShieldCheck,
  Sparkles,
  Tag,
  Users,
  X,
} from "lucide-react";

const nxoneGroups = [
  {
    heading: "Platform",
    items: [
      {
        label: "Overview",
        href: "/",
        icon: Command,
        desc: "One front door for every app your team runs.",
      },
      {
        label: "Features",
        href: "/#features",
        icon: LayoutGrid,
        desc: "Launcher, live health, access and audit history.",
      },
      {
        label: "Pricing",
        href: "/#pricing",
        icon: Tag,
        desc: "Simple per-workspace plans, no seat math.",
      },
    ],
  },
  {
    heading: "Extend",
    items: [
      {
        label: "Integrations",
        href: "/#integrations",
        icon: Plug,
        desc: "Connect the tools already in your stack.",
      },
      {
        label: "Docs",
        href: "/#docs",
        icon: BookOpen,
        desc: "Register apps, probes and API reference.",
      },
      {
        label: "Changelog",
        href: "/#changelog",
        icon: History,
        desc: "What shipped, release by release.",
      },
    ],
  },
  {
    heading: "Proof",
    items: [
      {
        label: "Customers",
        href: "/#customers",
        icon: CircleHelp,
        desc: "Case studies from teams running nxOne.",
      },
      {
        label: "FAQ",
        href: "/#faq",
        icon: CircleHelp,
        desc: "Answers on access, hosting and security.",
      },
    ],
  },
];

const companyGroups = [
  {
    heading: "Company",
    items: [
      {
        label: "About",
        href: "/",
        icon: Building2,
        desc: "Why Nevollo builds one platform, seven products.",
      },
      {
        label: "Careers",
        href: "/",
        icon: Users,
        desc: "Open roles across platform, data and design.",
      },
    ],
  },
  {
    heading: "Newsroom",
    items: [
      {
        label: "Press & updates",
        href: "/",
        icon: Newspaper,
        desc: "Launches, milestones and company announcements.",
      },
      {
        label: "Contact",
        href: "/",
        icon: MailOpen,
        desc: "Talk to sales, support or the platform team.",
      },
    ],
  },
  {
    heading: "Trust",
    items: [
      {
        label: "System status",
        href: "/login",
        icon: Activity,
        desc: "Sign in to view live availability for every Nevollo service.",
      },
      {
        label: "Trust center",
        href: "/",
        icon: ShieldCheck,
        desc: "Security posture, privacy and terms.",
      },
    ],
  },
];

export function MarketingNav() {
  const { user, loading, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menu, setMenu] = useState<"brands" | "nxone" | "company" | null>(
    null,
  );
  const [brands, setBrands] = useState<BrandItem[]>([]);

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        const items: BrandItem[] = (data.products ?? []).map(
          (p: { id: string; name: string; tagline: string; initials: string; color: string; url: string | null }) => ({
            slug: p.id,
            name: p.name,
            tagline: p.tagline,
            initials: p.initials,
            color: p.color,
            url: p.url,
          }),
        );
        setBrands(items);
      })
      .catch(() => {});
  }, []);

  const trigger = (id: "brands" | "nxone" | "company", label: string) => (
    <button
      type="button"
      onClick={() => setMenu((m) => (m === id ? null : id))}
      className={cn(
        "flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-medium transition-all hover:bg-secondary hover:text-foreground",
        menu === id ? "bg-secondary text-foreground" : "text-muted-foreground",
      )}
    >
      {label}
      <ChevronDown
        className={cn(
          "size-4 opacity-50 transition-transform",
          menu === id && "rotate-180 opacity-100",
        )}
      />
    </button>
  );

  return (
    <>
      <header
        className="sticky top-0 z-50 px-4 pt-4"
        onMouseLeave={() => setMenu(null)}
      >
        <div className="relative mx-auto max-w-7xl rounded-2xl border border-border/60 bg-background/80 shadow-card backdrop-blur-xl">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-10">
              <Link href="/" className="group flex items-center">
                <NevolloIcon size={36} className="transition-transform group-hover:scale-105" />
              </Link>

              <nav className="hidden items-center gap-1 md:flex">
                {trigger("nxone", "nxOne")}
                {trigger("brands", "Brands")}
                {trigger("company", "Company")}
              </nav>
            </div>

            <div className="flex items-center gap-1.5">
              {!loading && (
                <>
                  {user ? (
                    <>
                      <button
                        type="button"
                        onClick={logout}
                        className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground lg:inline-flex"
                      >
                        Sign out
                      </button>
                      <Link
                        href="/launcher"
                        className="interactive ml-1 hidden h-9 items-center justify-center gap-1.5 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.97] sm:inline-flex"
                      >
                        <LayoutGrid className="size-3.5" />
                        Launcher
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/login"
                        className="hidden rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-secondary hover:text-foreground lg:inline-flex"
                      >
                        Sign in
                      </Link>
                      <Link
                        href="/login"
                        className="interactive ml-2 hidden h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary-hover hover:shadow-md active:scale-[0.97] sm:inline-flex"
                      >
                        Get started
                      </Link>
                    </>
                  )}
                </>
              )}
              <button
                type="button"
                aria-label="Toggle menu"
                onClick={() => setMobileOpen((v) => !v)}
                className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary md:hidden"
              >
                {mobileOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </button>
            </div>
          </div>

          {/* Mega dropdown panels */}
          {menu && (
            <div className="absolute left-0 right-0 top-full mt-2 hidden rounded-2xl border border-border/60 bg-background shadow-overlay md:block">
              <div className="px-6 py-7">
                {menu === "brands" && (
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {brands.map((b) => (
                      <a
                        key={b.slug}
                        href={b.url ?? "#"}
                        target={b.url ? "_blank" : undefined}
                        rel={b.url ? "noopener noreferrer" : undefined}
                        onClick={() => setMenu(null)}
                        className="flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                      >
                        <span
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-primary-foreground",
                            brandIconBg[b.color] ?? "bg-brand-blue",
                          )}
                        >
                          {b.initials}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold">
                            {b.name}
                          </span>
                          <span className="block truncate text-xs text-muted-foreground">
                            {b.tagline}
                          </span>
                        </span>
                      </a>
                    ))}
                  </div>
                )}

                {menu === "nxone" && (
                  <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
                    {nxoneGroups.map((group) => (
                      <div key={group.heading}>
                        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                          {group.heading}
                        </p>
                        <div className="mt-2 space-y-0.5">
                          {group.items.map((l) => (
                            <Link
                              key={l.label}
                              href={l.href}
                              onClick={() => setMenu(null)}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <l.icon className="size-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold">
                                  {l.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                  {l.desc}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="rounded-2xl border border-border/60 bg-surface p-5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-card">
                        <Sparkles className="size-4" />
                      </span>
                      <p className="mt-4 text-sm font-semibold">
                        Start with nxOne free
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        Register your apps, invite the team and watch fleet
                        health in minutes.
                      </p>
                      <Link
                        href="/login"
                        onClick={() => setMenu(null)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
                      >
                        Sign in
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                )}

                {menu === "company" && (
                  <div className="grid gap-8 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
                    {companyGroups.map((group) => (
                      <div key={group.heading}>
                        <p className="px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground/70">
                          {group.heading}
                        </p>
                        <div className="mt-2 space-y-0.5">
                          {group.items.map((l) => (
                            <Link
                              key={l.label}
                              href={l.href}
                              onClick={() => setMenu(null)}
                              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-secondary"
                            >
                              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                <l.icon className="size-4" />
                              </span>
                              <span className="min-w-0">
                                <span className="block text-sm font-semibold">
                                  {l.label}
                                </span>
                                <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                                  {l.desc}
                                </span>
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="rounded-2xl border border-border/60 bg-surface p-5">
                      <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-2.5 py-1 text-[11px] font-semibold text-muted-foreground">
                        <span className="relative flex size-1.5">
                          <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />
                          <span className="relative size-1.5 rounded-full bg-emerald-500" />
                        </span>
                        All systems operational
                      </span>
                      <p className="mt-4 text-sm font-semibold">
                        Working at Nevollo
                      </p>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        Small teams, real ownership, and a platform used by
                        everyone who builds on it.
                      </p>
                      <Link
                        href="/"
                        onClick={() => setMenu(null)}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary-hover"
                      >
                        See open roles
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Mobile menu */}
          {mobileOpen && (
            <nav className="absolute left-0 right-0 top-full mt-2 max-h-[70vh] overflow-y-auto rounded-2xl border border-border/60 bg-background px-4 py-4 shadow-overlay md:hidden">
              {[
                { label: "Brands", href: "/" },
                { label: "nxOne Overview", href: "/" },
                { label: "Features", href: "/#features" },
                { label: "About", href: "/" },
                { label: "Contact", href: "/" },
              ].map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              {!loading && !user && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setLoginOpen(true);
                  }}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  Sign in
                </button>
              )}
              {!loading && user && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    logout();
                  }}
                  className="block w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  Sign out
                </button>
              )}
            </nav>
          )}
        </div>
      </header>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
