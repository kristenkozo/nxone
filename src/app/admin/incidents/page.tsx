"use client";

import { PageHeader, Panel } from "@/components/admin/admin-shell";
import { AlertTriangle } from "lucide-react";

export default function IncidentsPage() {
  return (
    <>
      <PageHeader
        title="Incidents"
        description="Track and manage service incidents."
      />
      <Panel>
        <div className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-status-up/10 text-status-up">
            <AlertTriangle size={24} />
          </div>
          <h3 className="font-semibold">All systems operational</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            No active incidents. Past incidents will appear here.
          </p>
        </div>
      </Panel>
    </>
  );
}
