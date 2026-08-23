"use client";

import { cn } from "@/lib/utils";

export function PageHero({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="hero-surface relative overflow-hidden pb-24 pt-32">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h1 className="animate-rise font-display text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle && (
          <p className="animate-rise mt-6 text-lg text-muted-foreground [animation-delay:100ms]">
            {subtitle}
          </p>
        )}
        {children && (
          <div className="animate-rise mt-10 [animation-delay:200ms]">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  label,
  title,
  description,
  className,
}: {
  label?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto max-w-2xl text-center", className)}>
      {label && (
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
          {label}
        </p>
      )}
      <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export function CTABand({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <section className="px-6 py-24">
      <div className="brand-surface mx-auto max-w-4xl rounded-2xl px-8 py-16 text-center shadow-overlay">
        <h2 className="font-display text-3xl font-bold tracking-tight text-white sm:text-4xl">
          {title}
        </h2>
        <p className="mt-4 text-lg text-white/80">{description}</p>
        {action && <div className="mt-8">{action}</div>}
      </div>
    </section>
  );
}

export function MarketingPage({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
