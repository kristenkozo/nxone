import Link from "next/link";
import {
  MarketingPage,
  PageHero,
  SectionHeading,
  CTABand,
} from "@/components/marketing/section";
import { ConsoleMock } from "@/components/marketing/console-mock";
import { apps, brandIconBg } from "@/lib/apps";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Zap,
  Shield,
  BarChart3,
  LayoutGrid,
  Users,
  Clock,
} from "lucide-react";

const features = [
  {
    icon: LayoutGrid,
    title: "Unified Launcher",
    description:
      "One front door for every product. Launch any app, see its status, and jump straight in — no bookmarks required.",
  },
  {
    icon: Shield,
    title: "Admin Console",
    description:
      "Manage products, services, members and incidents with a purpose-built admin interface that stays out of your way.",
  },
  {
    icon: BarChart3,
    title: "Live Health Probes",
    description:
      "Automated probes across every product with latency, uptime history and degraded-state detection — updated every 30 seconds.",
  },
  {
    icon: Users,
    title: "Team Access",
    description:
      "Role-based access with admin and member tiers. Add people in seconds, audit who has access at a glance.",
  },
  {
    icon: Zap,
    title: "Instant Deploy",
    description:
      "Zero-config onboarding for new products. Register a URL and health endpoint, and nxOne starts monitoring immediately.",
  },
  {
    icon: Clock,
    title: "Audit Trail",
    description:
      "Every sign-in, every change. A full audit log so you always know what happened and when.",
  },
];

export default function LandingPage() {
  return (
    <MarketingPage>
      <PageHero
        eyebrow="nxOne Platform"
        title={
          <>
            Your entire platform,
            <br />
            <span className="text-primary">one dashboard.</span>
          </>
        }
        body="nxOne brings every Nevollo product together — real-time health monitoring, service management, and a unified launcher for your entire stack."
        align="center"
      >
        <Link
          href="/launcher"
          className="interactive inline-flex h-12 items-center gap-2 rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary-hover active:scale-[0.97]"
        >
          Open Launcher
          <ArrowRight className="size-4" />
        </Link>
        <Link
          href="/admin"
          className="interactive inline-flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-6 text-sm font-semibold shadow-card hover:bg-secondary active:scale-[0.97]"
        >
          Admin Console
        </Link>
      </PageHero>

      <section className="relative -mt-12 px-6 pb-24">
        <div className="mx-auto max-w-5xl">
          <ConsoleMock className="animate-rise [animation-delay:300ms]" />
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Products"
            title="The Nevollo ecosystem"
            body="Seven products, one platform. Each built to be best-in-class, all connected through nxOne."
            align="center"
          />
          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {apps.map((app, i) => {
              const bg = brandIconBg[app.color] ?? "bg-brand-blue";
              return (
                <div
                  key={app.id}
                  className="animate-rise rounded-xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-raised"
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <div
                    className={cn(
                      "mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-primary-foreground",
                      bg,
                    )}
                  >
                    {app.initials}
                  </div>
                  <h3 className="font-semibold">{app.name}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {app.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="Features"
            title="Everything you need"
            body="A complete operations hub for the entire Nevollo stack."
            align="center"
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="animate-rise"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <div className="pt-24">
        <CTABand
          title="Ready to get started?"
          body="Sign in to access the full nxOne experience — launcher, admin console, and real-time service monitoring."
          primary={{ label: "Open Launcher", href: "/launcher" }}
          secondary={{ label: "Admin Console", href: "/admin" }}
        />
      </div>
    </MarketingPage>
  );
}
