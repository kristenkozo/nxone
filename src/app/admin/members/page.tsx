"use client";

import { PageHeader, Panel } from "@/components/admin/admin-shell";
import { useAuth } from "@/components/auth-provider";

export default function MembersPage() {
  const { user } = useAuth();

  return (
    <>
      <PageHeader
        title="Members"
        description="Team members with access to nxOne."
      />
      <Panel>
        <div className="divide-y divide-border">
          <div className="flex items-center gap-3 py-3 first:pt-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {user?.slice(0, 2).toUpperCase() ?? "??"}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user ?? "Unknown"}</p>
              <p className="text-xs text-muted-foreground">Owner</p>
            </div>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              Admin
            </span>
          </div>
        </div>
      </Panel>
    </>
  );
}
