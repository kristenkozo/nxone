import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getServices, getServiceGroups, createService } from "@/lib/service-store-server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({
    services: getServices(),
    groups: getServiceGroups(),
  });
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, url, icon, group, description, visible, sortOrder } = body;

    if (!name || !url) {
      return NextResponse.json(
        { error: "Missing required fields: name, url" },
        { status: 400 },
      );
    }

    const service = createService({
      name,
      url,
      icon: icon ?? null,
      group: group || "Uncategorized",
      description: description || "",
      visible: visible !== undefined ? visible : true,
      sortOrder: sortOrder !== undefined ? sortOrder : 999,
    });

    return NextResponse.json({ service });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
