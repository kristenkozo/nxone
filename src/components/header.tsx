"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "./auth-provider";
import { LoginDialog } from "./login-dialog";
import { NevolloIcon } from "./nevollo-icon";
import { UserMenu } from "./user-menu";

export function Header() {
  const { user, loading, logout, updateProfile } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
      <header className="border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-6">
            <Link href="/" className="group flex items-center">
              <NevolloIcon size={36} className="transition-transform group-hover:scale-105" />
            </Link>
            <span className="hidden h-6 w-px bg-border sm:block" />
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/launcher"
                className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium text-foreground transition-colors"
              >
                Launcher
              </Link>
              {user && (
                <Link
                  href="/admin"
                  className="rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  Admin
                </Link>
              )}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <UserMenu
                    user={user}
                    logout={logout}
                    updateProfile={updateProfile}
                  />
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
