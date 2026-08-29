import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { saveUpload } from "@/lib/upload-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = saveUpload(buffer, file.name, file.type);

    if (!result) {
      return NextResponse.json(
        { error: "Invalid file type or too large (max 2MB)" },
        { status: 400 },
      );
    }

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
