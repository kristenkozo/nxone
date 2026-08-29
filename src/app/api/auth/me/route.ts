import { NextRequest, NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getUser, toProfile, updateUser } from "@/lib/users";

export async function GET() {
  const username = await getSessionUser();
  if (!username) return NextResponse.json({ user: null });

  const stored = getUser(username);
  if (!stored) return NextResponse.json({ user: null });

  return NextResponse.json({ user: toProfile(stored) });
}

export async function PUT(request: NextRequest) {
  const username = await getSessionUser();
  if (!username) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { firstName, lastName } = body;

  const updated = updateUser(username, {
    firstName: typeof firstName === "string" ? firstName.trim() : undefined,
    lastName: typeof lastName === "string" ? lastName.trim() : undefined,
  });

  if (!updated) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user: toProfile(updated) });
}
