import Link from "next/link";
import { MarketingPage, CTABand } from "@/components/marketing/section";
import { ConsoleMock } from "@/components/marketing/console-mock";
import { apps, brandIconBg } from "@/lib/apps";
import { brands } from "@/lib/brands";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  GitBranch,
  Heart,
  LayoutGrid,
  Lock,
  Quote,
  Repeat,
  Search,
  Server,
  Settings,
  Shield,
  Zap,
} from "lucide-react";

const brandDotColor: Record<string, string> = {
  blue: "bg-brand-blue",
  indigo: "bg-brand-indigo",
  violet: "bg-brand-violet",
  emerald: "bg-brand-emerald",
  amber: "bg-brand-amber",
  teal: "bg-brand-teal",
  rose: "bg-brand-rose",
};

const categoryLabel: Record<string, string> = {
  dxdata: "Data platform",
  voulix: "CRM",
  nxmcp: "Developer platform",
  nxcontext: "Developer tools",
  nxmail: "Email infrastructure",
  nxtransit: "Transit",
  neurave: "Neuroscience platform",
};

const nxoneFeatures = [
  "Unified launcher for products and 30+ internal services.",
  "Live health probes with degraded-state and connectivity checks.",
  "Search and grouping on instantly loadable bookmarks.",
  "Admin console for incidents, members and audit history.",
];

const steps = [
  {
    num: "01",
    title: "Register",
    body: "Point nxOne at a URL with a health endpoint. Public products, private services and Tailscale services all use the same contract.",
  },
  {
    num: "02",
    title: "Probe",
    body: "Every service is checked on a 60-second interval for response time, degraded or unreachable — no dashboards to configure in datadog.",
  },
  {
    num: "03",
    title: "Launch",
    body: "Your team gets one searchable page for all applications — right-click reachable, no VPN slogging, search for a company.",
  },
  {
    num: "04",
    title: "Govern",
    body: "Incidents, members and audit history are a click away in the health plane that produced them.",
  },
];

const platformFeatures = [
  {
    icon: Database,
    title: "One shared foundation",
    body: "Every Nevollo product ships on the same identity, permissions and routing layer. An integration just setting — not needles.",
  },
  {
    icon: Server,
    title: "Lakehouses by default",
    body: "Product telemetry lands in an open Iceberg lakehouse, accessible from Trino for analytics or alerting.",
  },
  {
    icon: Shield,
    title: "Secure by construction",
    body: "Tridev provisioning, scoped tokens and audited service accounts for every single fleet.",
  },
  {
    icon: Heart,
    title: "Continuous health",
    body: "Every endpoint is probed on a loop, with change-point detection for shifts in the uptime statistics.",
  },
  {
    icon: GitBranch,
    title: "Automation-first",
    body: "MQTT trailing and Xpand APIs let agents and partners join the platform's entity model.",
  },
  {
    icon: Settings,
    title: "At where it earns its place",
    body: "Sophisticated models inside the products that benefit — not a horizontal model store nobody owns.",
  },
];

const stats = [
  { value: "7", label: "Products in the family" },
  { value: "30+", label: "Services under one roof" },
  { value: "60s", label: "Health check interval" },
  { value: "99.98%", label: "Trailing 90-day fleet uptime" },
];

export default function LandingPage() {
  return (
    <MarketingPage>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="hero-surface relative -mt-20 overflow-hidden border-b border-border">
        <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-16 pt-[10rem] md:pb-20 md:pt-[12rem] lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
          <div>
            <h1 className="animate-rise text-4xl font-bold leading-[1.08] md:text-[3.5rem]">
              Seven products.
              <br />
              <span className="text-brand-blue">
                One platform
                <br />
                behind them.
              </span>
            </h1>
            <p
              className="animate-rise mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
              style={{ animationDelay: "80ms" }}
            >
              Nevollo builds software for data, revenue, infrastructure and
              applied research — each product deep enough to stand alone, all of
              them sharing one foundation. nxOne is how your team reaches every
              one of them.
            </p>
            <div
              className="animate-rise mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "140ms" }}
            >
              <Link
                href="/launcher"
                className="interactive inline-flex h-11 items-center gap-2 rounded-lg bg-foreground px-5 text-sm font-semibold text-background shadow-md hover:opacity-90 active:scale-[0.97]"
              >
                Explore nxOne
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="#brands"
                className="interactive inline-flex h-11 items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold hover:bg-secondary active:scale-[0.97]"
              >
                See the brands
              </Link>
            </div>
            <div
              className="animate-rise mt-10 flex gap-10"
              style={{ animationDelay: "200ms" }}
            >
              {[
                { value: "7", label: "Products in the family" },
                { value: "30+", label: "Services under one roof" },
                { value: "60s", label: "Health check interval" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-2xl font-bold">{s.value}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div
            className="animate-rise hidden lg:block"
            style={{ animationDelay: "200ms" }}
          >
            <ConsoleMock />
          </div>
        </div>
      </section>

      {/* ── Brand ticker ────────────────────────────────── */}
      <section className="overflow-hidden border-b border-border bg-surface py-4">
        <div className="flex animate-[scroll_30s_linear_infinite] items-center gap-8 whitespace-nowrap">
          {[...brands, ...brands].map((b, i) => (
            <span
              key={`${b.slug}-${i}`}
              className="flex shrink-0 items-center gap-2.5 text-sm font-medium text-muted-foreground"
            >
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-bold text-white",
                  brandIconBg[b.color] ?? "bg-brand-blue",
                )}
              >
                {b.initials}
              </span>
              {b.name}
            </span>
          ))}
        </div>
      </section>

      {/* ── Products that go deep ───────────────────────── */}
      <section id="brands" className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                The Family
              </p>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                Products that go deep, not wide
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                Each brand owns a hard problem end to end. Shared plumbing means
                they also work together out of the box.
              </p>
            </div>
            <Link
              href="/launcher"
              className="hidden items-center gap-1 text-sm font-semibold text-primary transition-colors hover:text-primary-hover md:inline-flex"
            >
              All brands <ArrowRight className="size-3.5" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apps.map((app, i) => {
              const bg = brandIconBg[app.color] ?? "bg-brand-blue";
              const clickable = app.url !== null;
              const Tag = clickable ? "a" : "div";
              return (
                <Tag
                  key={app.id}
                  {...(clickable
                    ? {
                        href: app.url!,
                        target: "_blank",
                        rel: "noreferrer",
                      }
                    : {})}
                  className={cn(
                    "animate-rise group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-card transition-all",
                    clickable &&
                      "hover:-translate-y-0.5 hover:border-border-strong hover:shadow-raised",
                  )}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="flex items-start justify-between">
                    <span
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold text-primary-foreground",
                        bg,
                      )}
                    >
                      {app.initials}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      {categoryLabel[app.id] ?? "Platform"}
                    </span>
                  </div>
                  <h3 className="mt-4 flex items-center gap-1.5 text-base font-semibold">
                    {app.name}
                    {clickable ? (
                      <ArrowUpRight className="size-3.5 text-subtle-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    ) : (
                      <Lock className="size-3 text-subtle-foreground" />
                    )}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {app.description}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
                    <span className="font-mono text-[11px] text-subtle-foreground">
                      {app.domain}
                    </span>
                    {app.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </Tag>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Meet nxOne ──────────────────────────────────── */}
      <section className="border-y border-border bg-surface px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Meet nxOne
            </p>
            <h2 className="mt-4 max-w-md text-3xl font-bold leading-tight md:text-4xl">
              The front door to everything Nevollo runs
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
              One place to launch products, browse internal services and see
              what&apos;s healthy — with an admin console for the people who
              keep it all running.
            </p>
            <ul className="mt-6 space-y-3">
              {nxoneFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 text-sm text-muted-foreground"
                >
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded bg-primary/10 text-primary">
                    <Zap className="size-2.5" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/launcher"
                className="interactive inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary-hover active:scale-[0.97]"
              >
                Why nxOne
                <ArrowRight className="size-3.5" />
              </Link>
              <Link
                href="/launcher"
                className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-semibold hover:bg-secondary"
              >
                Open the launcher
              </Link>
            </div>
          </div>
          <div className="hidden lg:block">
            <ConsoleMock />
          </div>
        </div>
      </section>

      {/* ── How it works ────────────────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            How it works
          </p>
          <h2 className="mt-4 max-w-lg text-3xl font-bold leading-tight md:text-5xl">
            Four steps from scattered to single pane
          </h2>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="animate-rise flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="font-mono text-xs text-subtle-foreground">
                  {s.num}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Platform ────────────────────────────────── */}
      <section className="border-y border-border bg-surface px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              The Platform
            </p>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              What every product inherits
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              The unglamorous parts are built once and shared, so each product
              team spends its time on the problem it actually solves.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {platformFeatures.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="animate-rise flex items-start gap-4"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold">{f.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {f.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 grid grid-cols-2 gap-8 border-t border-border pt-12 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl font-bold md:text-4xl">{s.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonial + Case study ────────────────────── */}
      <section className="px-6 py-16">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-2">
          <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card">
            <Quote className="size-8 text-primary" />
            <blockquote className="mt-6 flex-1 text-xl font-semibold leading-relaxed">
              &ldquo;The first week we found four services nobody knew were
              still running. The second week we found the one that mattered
              before a customer did.&rdquo;
            </blockquote>
            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                SO
              </span>
              <div>
                <p className="text-sm font-semibold">Sara Ortiz</p>
                <p className="text-xs text-muted-foreground">
                  Director of Platform Operations, Northmont Logistics
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col rounded-2xl border border-border bg-card p-8 shadow-card">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Product &amp; Logistics
            </p>
            <h3 className="mt-3 text-xl font-bold">
              Cut incident response from 40 minutes to 6
            </h3>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { value: "6 min", label: "Mean time to detection" },
                { value: "34", label: "Services monitored" },
                { value: "11 → 1", label: "Dashboards in daily use" },
              ].map((m) => (
                <div key={m.label}>
                  <p className="text-2xl font-bold">{m.value}</p>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 flex-1 text-sm leading-relaxed text-muted-foreground">
              3 customer stories across logistics, healthcare and software —
              each with the probe contract, automations and rollout they used.
            </p>
            <Link
              href="/launcher"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-hover"
            >
              Read the case studies
              <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA band ────────────────────────────────────── */}
      <CTABand
        title="Start where your team already works"
        body="Open nxOne, find the app you need, and get on with it. Everything else — health, access, history — is already handled."
        primary={{ label: "Open nxOne", href: "/launcher" }}
        secondary={{ label: "See pricing", href: "/#pricing" }}
      />
    </MarketingPage>
  );
}
