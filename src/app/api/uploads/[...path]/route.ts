import { NextResponse } from "next/server";
import { getUpload } from "@/lib/upload-store";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const filename = path[path.length - 1];

  if (!filename) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const result = getUpload(filename);
  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(result.buffer), {
    headers: {
      "Content-Type": result.mimeType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
