"use client";

import { useState } from "react";
import { useAuth } from "./auth-provider";
import { X } from "lucide-react";

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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-xl border border-border bg-surface-raised shadow-2xl"
      >
        <div className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <h2 className="text-base font-semibold">Sign In</h2>
          <button type="button" onClick={onClose} className="rounded-md p-1 text-text-faint hover:text-text">
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 px-5 py-5">
          {error && (
            <p className="rounded-lg bg-status-down/10 px-3 py-2 text-xs text-status-down">
              Invalid username or password
            </p>
          )}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              autoComplete="username"
              className="w-full rounded-lg border border-border-subtle bg-surface-sunken px-3 py-2 text-sm outline-none focus:border-accent-violet"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-text-muted">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="w-full rounded-lg border border-border-subtle bg-surface-sunken px-3 py-2 text-sm outline-none focus:border-accent-violet"
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t border-border-subtle px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm font-medium text-text-muted hover:text-text"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!username || !password || submitting}
            className="rounded-lg bg-accent-violet px-4 py-2 text-sm font-medium text-white hover:opacity-90 disabled:opacity-40"
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </form>
    </div>
  );
}
