import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { listUsers, createUser, deleteUser, getUser } from "@/lib/users";

export async function GET() {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = getUser(session);
  if (!user || user.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return NextResponse.json({ users: listUsers() });
}

export async function POST(request: Request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = getUser(session);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const { username, password, role } = body;

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password required" }, { status: 400 });
  }

  if (username.length < 2 || password.length < 6) {
    return NextResponse.json(
      { error: "Username must be 2+ chars, password 6+ chars" },
      { status: 400 },
    );
  }

  const created = createUser(username, password, role || "member");
  if (!created) {
    return NextResponse.json({ error: "Username already exists" }, { status: 409 });
  }

  return NextResponse.json({
    user: { username: created.username, role: created.role, createdAt: created.createdAt },
  });
}

export async function DELETE(request: Request) {
  const session = await getSessionUser();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const admin = getUser(session);
  if (!admin || admin.role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username required" }, { status: 400 });
  }

  if (username === session) {
    return NextResponse.json({ error: "Cannot delete yourself" }, { status: 400 });
  }

  const deleted = deleteUser(username);
  if (!deleted) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ deleted: true });
}
