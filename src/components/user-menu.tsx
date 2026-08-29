"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { UserProfile } from "./auth-provider";
import { cn } from "@/lib/utils";
import { ChevronDown, LogOut, Moon, Sun, Monitor } from "lucide-react";

export function UserInitials({
  firstName,
  lastName,
  username,
}: {
  firstName: string;
  lastName: string;
  username: string;
}) {
  const initials =
    firstName && lastName
      ? `${firstName[0]}${lastName[0]}`
      : username.slice(0, 2);
  return (
    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-[11px] font-bold uppercase text-primary-foreground">
      {initials}
    </span>
  );
}

export function displayName(
  firstName: string,
  lastName: string,
  username: string,
) {
  if (firstName && lastName) return `${firstName} ${lastName}`;
  if (firstName) return firstName;
  return username;
}

const themeOptions = [
  { key: "light", label: "Light", icon: Sun },
  { key: "dark", label: "Dark", icon: Moon },
  { key: "system", label: "System", icon: Monitor },
] as const;

export function UserMenu({
  user,
  logout,
  updateProfile,
}: {
  user: UserProfile;
  logout: () => void;
  updateProfile: (data: {
    firstName?: string;
    lastName?: string;
  }) => Promise<boolean | void>;
}) {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [saving, setSaving] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user]);

  useEffect(() => {
    if (!menuOpen) return;
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
        setEditMode(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  async function handleSave() {
    setSaving(true);
    await updateProfile({ firstName, lastName });
    setSaving(false);
    setEditMode(false);
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => {
          setMenuOpen((v) => !v);
          setEditMode(false);
        }}
        className={cn(
          "flex items-center gap-2 rounded-full py-1 pl-1 pr-2.5 transition-colors hover:bg-secondary",
          menuOpen && "bg-secondary",
        )}
      >
        <UserInitials
          firstName={user.firstName}
          lastName={user.lastName}
          username={user.username}
        />
        <span className="hidden text-sm font-medium sm:block">
          {displayName(user.firstName, user.lastName, user.username)}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 text-muted-foreground transition-transform",
            menuOpen && "rotate-180",
          )}
        />
      </button>

      {menuOpen && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 animate-dropdown origin-top-right rounded-xl border border-border bg-card shadow-overlay">
          <div className="px-4 pb-3 pt-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold uppercase text-primary-foreground">
                {user.firstName && user.lastName
                  ? `${user.firstName[0]}${user.lastName[0]}`
                  : user.username.slice(0, 2)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {displayName(user.firstName, user.lastName, user.username)}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  @{user.username} &middot; {user.role}
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          <div className="px-4 py-3">
            {editMode ? (
              <div className="space-y-2.5">
                <div>
                  <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    First name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First name"
                    autoFocus
                    className="h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last name"
                    className="h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setEditMode(false);
                      setFirstName(user.firstName);
                      setLastName(user.lastName);
                    }}
                    className="rounded-lg px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={saving}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary-hover disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="w-full rounded-lg px-2 py-1.5 text-left text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                Edit profile
              </button>
            )}
          </div>

          <div className="border-t border-border" />

          {mounted && (
            <div className="px-4 py-3">
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Appearance
              </p>
              <div className="flex gap-1 rounded-lg bg-surface-sunken p-1">
                {themeOptions.map((opt) => {
                  const Icon = opt.icon;
                  const active = theme === opt.key;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setTheme(opt.key)}
                      className={cn(
                        "flex flex-1 items-center justify-center gap-1.5 rounded-md py-1.5 text-xs font-medium transition-all",
                        active
                          ? "bg-card text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      <Icon className="size-3.5" />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="border-t border-border" />

          <div className="px-2 py-2">
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
