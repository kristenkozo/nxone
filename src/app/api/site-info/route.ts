import { NextRequest, NextResponse } from "next/server";

const FETCH_TIMEOUT_MS = 5_000;
const MAX_FAVICON_BYTES = 100_000;

export async function GET(request: NextRequest) {
  let targetUrl = request.nextUrl.searchParams.get("url");
  if (!targetUrl) {
    return NextResponse.json({ title: null, favicon: null });
  }

  if (!/^https?:\/\//i.test(targetUrl)) targetUrl = `https://${targetUrl}`;

  let origin: string;
  try {
    origin = new URL(targetUrl).origin;
  } catch {
    return NextResponse.json({ title: null, favicon: null });
  }

  let title: string | null = null;
  let favicon: string | null = null;

  try {
    const res = await fetch(targetUrl, {
      signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
      headers: { "User-Agent": "nxOne/1.0 (favicon fetch)" },
      redirect: "follow",
    });

    if (!res.ok) return NextResponse.json({ title: null, favicon: null });

    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    if (titleMatch) title = titleMatch[1].trim();

    const iconPatterns = [
      /<link[^>]*rel=["'](?:shortcut\s+)?icon["'][^>]*href=["']([^"']+)["']/gi,
      /<link[^>]*href=["']([^"']+)["'][^>]*rel=["'](?:shortcut\s+)?icon["']/gi,
      /<link[^>]*rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/gi,
    ];

    const candidates: string[] = [];
    for (const pattern of iconPatterns) {
      let match;
      while ((match = pattern.exec(html)) !== null) {
        candidates.push(match[1]);
      }
    }
    candidates.push("/favicon.ico");

    for (const raw of candidates) {
      let resolved = raw;
      if (resolved.startsWith("//")) resolved = "https:" + resolved;
      else if (resolved.startsWith("/")) resolved = origin + resolved;
      else if (!resolved.startsWith("http")) resolved = origin + "/" + resolved;

      const result = await fetchFaviconAsDataUri(resolved);
      if (result) {
        favicon = result;
        break;
      }
    }
  } catch {
    // Swallow — return whatever we have
  }

  return NextResponse.json({ title, favicon });
}

async function fetchFaviconAsDataUri(url: string): Promise<string | null> {
  try {
    const res = await fetch(url, {
      signal: AbortSignal.timeout(3_000),
      redirect: "follow",
    });
    if (!res.ok) return null;

    const contentType = res.headers.get("content-type") || "image/x-icon";
    if (!contentType.startsWith("image/") && !contentType.includes("svg")) {
      return null;
    }

    const buffer = await res.arrayBuffer();
    if (buffer.byteLength > MAX_FAVICON_BYTES) return null;

    const base64 = Buffer.from(buffer).toString("base64");
    const mime = contentType.split(";")[0].trim();
    return `data:${mime};base64,${base64}`;
  } catch {
    return null;
  }
}
