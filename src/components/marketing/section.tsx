import type { ReactNode } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  body,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="hero-surface relative -mt-20 overflow-hidden border-b border-border">
      <div className="grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div
        className={cn(
          "relative mx-auto max-w-6xl px-6 pb-20 pt-[10rem] md:pb-28 md:pt-[12rem]",
          align === "center" && "max-w-4xl text-center",
        )}
      >
        {eyebrow && (
          <p className="animate-rise text-sm font-semibold uppercase tracking-[0.16em] text-accent-foreground">
            {eyebrow}
          </p>
        )}
        <h1
          className="animate-rise mt-5 max-w-3xl text-4xl font-bold leading-[1.05] md:text-6xl"
          style={{
            animationDelay: "60ms",
            ...(align === "center" ? { margin: "1.25rem auto 0" } : {}),
          }}
        >
          {title}
        </h1>
        {body && (
          <p
            className={cn(
              "animate-rise mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground",
              align === "center" && "mx-auto",
            )}
            style={{ animationDelay: "120ms" }}
          >
            {body}
          </p>
        )}
        {children && (
          <div
            className={cn(
              "animate-rise mt-9 flex flex-wrap gap-3",
              align === "center" && "justify-center",
            )}
            style={{ animationDelay: "180ms" }}
          >
            {children}
          </div>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
      )}
    >
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-accent-foreground">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 text-3xl font-bold md:text-5xl">{title}</h2>
      {body && (
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          {body}
        </p>
      )}
    </div>
  );
}

export function CTABand({
  title,
  body,
  primary,
  secondary,
}: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-16">
      <div className="brand-surface rounded-3xl px-8 py-16 text-center shadow-overlay md:px-16">
        <h2 className="text-3xl font-bold text-primary-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-primary-foreground/85">
          {body}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href={primary.href}
            className="rounded-md bg-card px-5 py-3 text-sm font-semibold text-foreground shadow-raised transition-transform hover:-translate-y-0.5"
          >
            {primary.label}
          </Link>
          {secondary && (
            <Link
              href={secondary.href}
              className="rounded-md border border-primary-foreground/40 px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
            >
              {secondary.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

export function MarketingPage({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-background">{children}</div>;
}
