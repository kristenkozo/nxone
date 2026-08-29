import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getProducts, createProduct } from "@/lib/product-store";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ products: getProducts() });
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      name,
      initials,
      description,
      tagline,
      url,
      domain,
      healthUrl,
      icon,
      color,
      tags,
      category,
      visible,
      sortOrder,
    } = body;

    if (!name || !initials || !description || !domain || !color || !category) {
      return NextResponse.json(
        { error: "Missing required fields: name, initials, description, domain, color, category" },
        { status: 400 },
      );
    }

    const product = createProduct({
      name,
      initials,
      description,
      tagline: tagline || "",
      url: url ?? null,
      domain,
      healthUrl: healthUrl ?? null,
      icon: icon || "",
      color,
      tags: tags || [],
      category,
      visible: visible !== undefined ? visible : true,
      sortOrder: sortOrder !== undefined ? sortOrder : 999,
    });

    return NextResponse.json({ product });
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }
}
