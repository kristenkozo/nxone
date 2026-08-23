import { Header } from "@/components/header";
import { AppGrid } from "@/components/app-grid";
import { LinkGrid } from "@/components/link-grid";

export default function LauncherPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold">App Launcher</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Access every Nevollo product and monitor real-time health status.
          </p>
        </div>
        <AppGrid />
        <div className="mt-12">
          <LinkGrid />
        </div>
      </main>
    </div>
  );
}
