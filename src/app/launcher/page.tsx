"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { Header } from "@/components/header";
import { AppGrid } from "@/components/app-grid";
import { LinkGrid } from "@/components/link-grid";

export default function LauncherPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">App Launcher</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Access every Nevollo product and monitor real-time health status.
          </p>
        </div>
        <AppGrid />
        <div className="mt-14">
          <div className="mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-border to-transparent" />
          <div className="pt-10">
            <LinkGrid />
          </div>
        </div>
      </main>
    </div>
  );
}
