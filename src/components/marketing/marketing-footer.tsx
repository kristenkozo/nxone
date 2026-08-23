import Link from "next/link";
import { brands } from "@/lib/brands";

const footerLinks = {
  products: brands.map((b) => ({
    label: b.name,
    href: b.url ?? "#",
    external: !!b.url,
  })),
  nxOne: [
    { label: "Launch Apps", href: "/launcher", external: false },
    { label: "Admin Console", href: "/admin", external: false },
    { label: "Health Status", href: "/admin", external: false },
  ],
  company: [
    { label: "About", href: "/", external: false },
    { label: "Security", href: "/", external: false },
    { label: "Privacy", href: "/", external: false },
    { label: "Terms", href: "/", external: false },
  ],
};

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string; external: boolean }[];
}) {
  return (
    <div>
      <h3 className="mb-4 text-sm font-semibold">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MarketingFooter() {
  return (
    <footer className="border-t border-border bg-surface-sunken">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="brand-surface flex h-7 w-7 items-center justify-center rounded-lg">
                <span className="text-sm font-bold text-white">n</span>
              </div>
              <span className="font-display text-lg font-semibold tracking-tight">
                Nevollo
              </span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Building the next generation of enterprise software — from data
              platforms to AI-native CRM.
            </p>
          </div>

          <FooterSection title="Products" links={footerLinks.products} />
          <FooterSection title="nxOne" links={footerLinks.nxOne} />
          <FooterSection title="Company" links={footerLinks.company} />
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-subtle-foreground">
            &copy; {new Date().getFullYear()} Nevollo. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link
              href="/"
              className="text-xs text-subtle-foreground transition-colors hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/"
              className="text-xs text-subtle-foreground transition-colors hover:text-foreground"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
