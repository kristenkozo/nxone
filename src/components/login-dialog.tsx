"use client";

import { useState } from "react";
import { useAuth } from "./auth-provider";
import { NevolloIcon } from "./nevollo-icon";
import { Command, X } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function LoginDialog({ open, onClose }: Props) {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSubmitting(true);
    const ok = await login(username, password);
    setSubmitting(false);
    if (ok) {
      setUsername("");
      setPassword("");
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md animate-rise overflow-hidden rounded-2xl border border-border/60 bg-background shadow-overlay">
        <div className="border-b border-border px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <NevolloIcon size={36} className="shadow-card" />
              <div>
                <h2 className="text-lg font-semibold">Sign in to nxOne</h2>
                <p className="text-xs text-muted-foreground">
                  Access your dashboard and services
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-6">
            {error && (
              <div className="rounded-xl border border-destructive/20 bg-destructive/10 px-4 py-3">
                <p className="text-sm font-medium text-destructive">
                  Invalid username or password
                </p>
              </div>
            )}

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
                placeholder="Enter your username"
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="Enter your password"
                className="h-11 w-full rounded-xl border border-border bg-surface px-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>

          <div className="border-t border-border px-6 py-4">
            <button
              type="submit"
              disabled={!username || !password || submitting}
              className="interactive h-11 w-full rounded-xl bg-primary text-sm font-semibold text-primary-foreground shadow-md transition-colors hover:bg-primary-hover active:scale-[0.98] disabled:opacity-40"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
