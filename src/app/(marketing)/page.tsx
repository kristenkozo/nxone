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
import { ArrowRight, Zap, Shield, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Unified Launcher",
    description:
      "Access every Nevollo product from a single dashboard with real-time health monitoring.",
  },
  {
    icon: Shield,
    title: "Admin Console",
    description:
      "Manage products, services, and incidents with a purpose-built admin interface.",
  },
  {
    icon: BarChart3,
    title: "Live Health Probes",
    description:
      "Automated health checks across all products with status history and uptime tracking.",
  },
];

export default function LandingPage() {
  return (
    <MarketingPage>
      <PageHero
        title="Your entire platform, one dashboard."
        subtitle="nxOne brings every Nevollo product together — real-time health monitoring, service management, and a unified launcher for your entire stack."
      >
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/launcher"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-raised transition-colors hover:bg-primary-hover"
          >
            Launch Apps
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-medium transition-colors hover:bg-surface-sunken"
          >
            Admin Console
          </Link>
        </div>
      </PageHero>

      <section className="relative -mt-12 px-6 pb-24">
        <ConsoleMock className="animate-rise [animation-delay:300ms]" />
      </section>

      <section className="px-6 py-24">
        <SectionHeading
          label="Products"
          title="The Nevollo ecosystem"
          description="Seven products, one platform. Each built to be best-in-class."
        />
        <div className="mx-auto mt-16 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                    "mb-4 flex h-10 w-10 items-center justify-center rounded-lg text-xs font-bold text-white",
                    bg,
                  )}
                >
                  {app.initials}
                </div>
                <h3 className="font-semibold">{app.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {app.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-surface px-6 py-24">
        <SectionHeading
          label="Features"
          title="Everything you need"
          description="A complete operations hub for the entire Nevollo stack."
        />
        <div className="mx-auto mt-16 grid max-w-4xl gap-8 sm:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="animate-rise text-center"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon size={24} />
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <CTABand
        title="Ready to get started?"
        description="Sign in to access the full nxOne experience — launcher, admin console, and service management."
        action={
          <Link
            href="/launcher"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-gray-900 shadow-raised transition-colors hover:bg-gray-100"
          >
            Open Launcher
            <ArrowRight size={16} />
          </Link>
        }
      />
    </MarketingPage>
  );
}
