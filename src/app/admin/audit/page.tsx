"use client";

import { PageHeader, Panel } from "@/components/admin/admin-shell";
import { ScrollText } from "lucide-react";

export default function AuditPage() {
  return (
    <>
      <PageHeader
        title="Audit Log"
        description="Activity history for your nxOne instance."
      />
      <Panel>
        <div className="flex flex-col items-center py-12 text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-surface-sunken text-muted-foreground">
            <ScrollText size={24} />
          </div>
          <h3 className="font-semibold">No entries yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Audit log entries will appear here as actions are taken.
          </p>
        </div>
      </Panel>
    </>
  );
}
