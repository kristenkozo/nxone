import Link from "next/link";
import { NevolloIcon } from "@/components/nevollo-icon";
import { brands } from "@/lib/brands";

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            <NevolloIcon size={36} />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A family of products for data, revenue, infrastructure and applied
              research — built on one shared platform.
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle-foreground">
              Brands
            </h3>
            <ul className="mt-4 space-y-2.5">
              {brands.map((b) => (
                <li key={b.slug}>
                  {b.url ? (
                    <a
                      href={b.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {b.name}
                    </a>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {b.name}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle-foreground">
              nxOne
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "Overview", href: "/" },
                { label: "Features", href: "/#features" },
                { label: "Pricing", href: "/#pricing" },
                { label: "Integrations", href: "/#integrations" },
                { label: "Docs", href: "/#docs" },
                { label: "FAQ", href: "/#faq" },
                { label: "Changelog", href: "/#changelog" },
                { label: "Sign in", href: "/login" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-subtle-foreground">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5">
              {[
                { label: "About", href: "/" },
                { label: "Careers", href: "/" },
                { label: "Newsroom", href: "/" },
                { label: "Contact", href: "/" },
                { label: "Status", href: "/login" },
              ].map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-xs text-subtle-foreground">
            © 2026 Nevollo. All rights reserved.
          </span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {[
              { label: "Privacy", href: "/" },
              { label: "Terms", href: "/" },
              { label: "Security", href: "/" },
              { label: "DPA", href: "/" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-xs text-subtle-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </Link>
            ))}
            <span className="font-mono text-xs text-subtle-foreground">
              one.nevollo.com
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
