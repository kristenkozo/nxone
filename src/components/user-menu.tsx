"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import type { UserProfile } from "./auth-provider";
import { cn } from "@/lib/utils";
import {
  Camera,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  Monitor,
  User,
  Mail,
  Briefcase,
  Check,
} from "lucide-react";

export function UserAvatar({
  user,
  size = 28,
  className,
}: {
  user: Pick<UserProfile, "firstName" | "lastName" | "username" | "avatar">;
  size?: number;
  className?: string;
}) {
  const initials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`
      : user.username.slice(0, 2);

  if (user.avatar) {
    return (
      <img
        src={user.avatar}
        alt=""
        style={{ width: size, height: size }}
        className={cn("rounded-full object-cover", className)}
      />
    );
  }

  return (
    <span
      style={{ width: size, height: size, fontSize: size * 0.38 }}
      className={cn(
        "flex items-center justify-center rounded-full bg-primary font-bold uppercase text-primary-foreground",
        className,
      )}
    >
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
    email?: string;
    title?: string;
    avatar?: string;
  }) => Promise<boolean | void>;
}) {
  const { theme, setTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [title, setTitle] = useState(user.title);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
    setEmail(user.email);
    setTitle(user.title);
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
    await updateProfile({ firstName, lastName, email, title });
    setSaving(false);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      setEditMode(false);
    }, 800);
  }

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/uploads", { method: "POST", body: formData });
      if (!res.ok) return;
      const { path } = await res.json();
      await updateProfile({ avatar: path });
    } catch {}
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
        <UserAvatar user={user} size={28} />
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
        <div className="absolute right-0 top-full z-50 mt-2 w-80 animate-dropdown origin-top-right rounded-xl border border-border bg-card shadow-overlay">
          {/* Profile header */}
          <div className="px-4 pb-3 pt-4">
            <div className="flex items-start gap-3">
              <div className="group relative">
                <UserAvatar user={user} size={44} />
                <button
                  type="button"
                  onClick={() => avatarInputRef.current?.click()}
                  className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50 opacity-0 transition-opacity group-hover:opacity-100"
                >
                  <Camera className="size-4 text-white" />
                </button>
                <input
                  ref={avatarInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarUpload}
                  className="hidden"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">
                  {displayName(user.firstName, user.lastName, user.username)}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  @{user.username}
                </p>
                {user.title && (
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {user.title}
                  </p>
                )}
                <span className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-border" />

          {/* Profile edit section */}
          <div className="px-4 py-3">
            {editMode ? (
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
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
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    <Mail className="size-3" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="h-8 w-full rounded-lg border border-border bg-background px-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-1 focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="mb-1 flex items-center gap-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                    <Briefcase className="size-3" />
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Platform Engineer"
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
                      setEmail(user.email);
                      setTitle(user.title);
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
                    {saved ? (
                      <>
                        <Check className="size-3" />
                        Saved
                      </>
                    ) : saving ? (
                      "Saving..."
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setEditMode(true)}
                className="flex w-full items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <User className="size-4" />
                Edit profile
              </button>
            )}
          </div>

          <div className="border-t border-border" />

          {/* Theme selector */}
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
