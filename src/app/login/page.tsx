"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/components/auth-provider";
import { NevolloIcon } from "@/components/nevollo-icon";
import {
  ArrowRight,
  Lock,
  Shield,
  Zap,
  Activity,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "One front door",
    body: "Every Nevollo product and internal service, launchable in a keystroke.",
  },
  {
    icon: Activity,
    title: "Live health probes",
    body: "Uptime, latency, and incident state resolved before you click through.",
  },
  {
    icon: Shield,
    title: "Built for operators",
    body: "Role-aware access, audit trails, and a console that stays out of your way.",
  },
];

export default function LoginPage() {
  const { user, loading, login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/launcher");
    }
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    const ok = await login(username, password);
    setSubmitting(false);
    if (ok) {
      router.push("/launcher");
    } else {
      setError(true);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-teal/8 via-transparent to-brand-violet/8" />

      <header className="relative z-10 px-6 py-5">
        <Link href="/" className="inline-flex items-center">
          <NevolloIcon size={36} />
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-center px-6 py-12">
        <div className="mx-auto grid w-full max-w-6xl gap-16 lg:grid-cols-[1fr_420px] lg:items-center">
          {/* Left column */}
          <div className="hidden lg:block">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground shadow-card">
              <span className="relative flex size-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/70" />
                <span className="relative size-2 rounded-full bg-emerald-500" />
              </span>
              ALL SYSTEMS OPERATIONAL
            </div>

            <h1 className="mt-8 text-4xl font-bold leading-[1.1] md:text-[3.25rem]">
              The whole Nevollo fleet,
              <br />
              <span className="text-primary">behind one sign-in.</span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground">
              nxOne is the launcher and control plane for every product, internal
              tool, and service we run — with health, ownership, and access in
              one place.
            </p>

            <div className="mt-10 space-y-6">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div key={f.title} className="flex items-start gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                      <Icon className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-semibold">{f.title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {f.body}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right column — auth card */}
          <div className="mx-auto w-full max-w-[420px]">
            <div className="rounded-2xl border border-border/60 bg-card p-8 shadow-overlay">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                <Lock className="size-3.5" />
                nxOne Access
              </div>

              <h2 className="mt-4 text-2xl font-bold">
                Sign in to the launcher
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                One front door for every Nevollo product and internal service.
              </p>

              <form onSubmit={handleSubmit} className="mt-8">
                {error && (
                  <div className="mb-5 rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3">
                    <p className="text-sm font-medium text-destructive">
                      Invalid username or password
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      autoFocus
                      autoComplete="username"
                      placeholder="you@nevollo.com"
                      className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <label className="text-sm font-medium">Password</label>
                      <span className="text-xs font-medium text-primary">
                        Forgot password?
                      </span>
                    </div>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      placeholder="••••••••"
                      className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={!username || !password || submitting}
                  className="interactive mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-md transition-all hover:bg-primary-hover active:scale-[0.98] disabled:opacity-40"
                >
                  {submitting ? "Signing in..." : "Sign in"}
                  {!submitting && <ArrowRight className="size-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 px-6 py-5 text-center">
        <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Shield className="size-3" />
          Protected by nxOne access control. Sessions expire automatically.
        </p>
      </footer>
    </div>
  );
}
