"use client";

import { useState } from "react";
import { useAuth } from "./auth-provider";
import { LoginDialog } from "./login-dialog";
import { ThemeToggle } from "./theme-toggle";
import { LogOut, User } from "lucide-react";

export function Header() {
  const { user, loading, logout } = useAuth();
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <header className="flex items-center justify-between px-6 py-6 md:px-8">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-accent-violet to-accent-blue">
          <span className="text-lg font-bold text-white">n</span>
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight">nxOne</h1>
          <p className="text-xs text-text-faint">Nevollo Services</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {!loading && (
          user ? (
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-lg bg-surface-sunken px-2.5 py-1.5 text-xs font-medium text-text-muted">
                <User size={13} />
                {user}
              </span>
              <button
                onClick={logout}
                className="rounded-lg p-1.5 text-text-faint transition-colors hover:text-text"
                title="Sign out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setLoginOpen(true)}
              className="rounded-lg bg-surface-sunken px-3 py-1.5 text-xs font-medium text-text-muted transition-colors hover:text-text"
            >
              Sign In
            </button>
          )
        )}
        <ThemeToggle />
      </div>

      <LoginDialog open={loginOpen} onClose={() => setLoginOpen(false)} />
    </header>
  );
}
