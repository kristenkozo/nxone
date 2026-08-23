"use client";

import { PageHeader, Panel } from "@/components/admin/admin-shell";
import { ThemeToggle } from "@/components/theme-toggle";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        title="Settings"
        description="Configure your nxOne instance."
      />
      <div className="space-y-4">
        <Panel title="Appearance">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Theme</p>
              <p className="text-xs text-muted-foreground">
                Switch between light and dark mode.
              </p>
            </div>
            <ThemeToggle />
          </div>
        </Panel>

        <Panel title="Health Probes">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Polling interval</p>
                <p className="text-xs text-muted-foreground">
                  How often health checks run.
                </p>
              </div>
              <span className="rounded-md bg-surface-sunken px-2.5 py-1 text-xs font-medium text-muted-foreground">
                30 seconds
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Cache TTL</p>
                <p className="text-xs text-muted-foreground">
                  Server-side result cache duration.
                </p>
              </div>
              <span className="rounded-md bg-surface-sunken px-2.5 py-1 text-xs font-medium text-muted-foreground">
                30 seconds
              </span>
            </div>
          </div>
        </Panel>
      </div>
    </>
  );
}
