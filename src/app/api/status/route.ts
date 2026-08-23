import { getStatus } from "@/lib/health";

export const dynamic = "force-dynamic";

export async function GET() {
  const status = await getStatus();

  return Response.json(status, {
    headers: {
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}
