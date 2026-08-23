"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "./auth-provider";
import { LoginDialog } from "./login-dialog";
import { ThemeToggle } from "./theme-toggle";
import { LogOut, User, ArrowLeft } from "lucide-react";

export function Header() {
  const { user, loading, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center gap-2.5">
              <span className="brand-surface flex h-8 w-8 items-center justify-center rounded-lg text-base font-bold text-primary-foreground shadow-card transition-transform group-hover:scale-105">
                n
              </span>
              <span className="font-display text-xl font-semibold tracking-tight">
                Nevollo
              </span>
            </Link>
            <span className="hidden h-6 w-px bg-border sm:block" />
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/launcher"
                className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-foreground"
              >
                Launcher
              </Link>
              <Link
                href="/admin"
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Admin
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1.5 rounded-full bg-surface-sunken px-3 py-1.5 text-xs font-medium text-muted-foreground">
                      <User className="size-3.5" />
                      {user}
                    </span>
                    <button
                      onClick={logout}
                      className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                      title="Sign out"
                    >
                      <LogOut className="size-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setLoginOpen(true)}
                    className="interactive h-9 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-md hover:bg-primary-hover active:scale-[0.97]"
                  >
                    Sign in
                  </button>
                )}
              </>
            )}
          </div>
        </div>
      </header>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}
